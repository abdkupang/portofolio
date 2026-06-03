# FreshCheck

Deteksi kesegaran buah dan sayur secara instan menggunakan machine learning berbasis browser.

![FreshCheck Banner](https://placehold.co/1200x400/1E3A0F/DFF0C8?text=FreshCheck+—+AI+Freshness+Detection)

## Daftar Isi

- [Demo](#demo)
- [Fitur](#fitur)
- [Dataset](#dataset)
- [Model AI](#model-ai)
- [Instalasi](#instalasi)
- [Struktur Folder](#struktur-folder)
- [Keamanan](#keamanan)
- [Performa](#performa)
- [Deployment](#deployment)

---

## Demo

Live: `https://freshcheck.vercel.app` _(setelah deploy)_

Scan buah langsung di browser tanpa install apapun. Model berjalan 100% on-device.

---

## Fitur

| Fitur | Keterangan |
|---|---|
| Upload / Drag & Drop | Gambar JPG, PNG, WebP maks. 10MB |
| Kamera Realtime | Foto langsung dari kamera perangkat |
| Deteksi AI | MobileNetV2, inference < 1 detik |
| Confidence Score | Persentase keyakinan model |
| Estimasi Masa Simpan | Berapa hari bahan masih layak |
| Riwayat Scan | Tersimpan lokal, maks. 100 entri |
| Tips Penyimpanan | Per jenis buah/sayur |
| Rekomendasi AI | Saran konsumsi berdasarkan status |
| Mode Offline | Setelah model dimuat, bisa tanpa internet |

---

## Dataset

```
Sumber: Kaggle — Fresh and Stale Images of Fruits and Vegetables
URL: https://www.kaggle.com/datasets/swoyam2609/fresh-and-stale-images-of-fruits-and-vegetables

Total gambar : 13.599
Kelas        : 10 (5 buah × 2 kondisi)
Split        : 80% training / 20% validasi
Resolusi     : Diubah ke 224×224 px
```

Dataset tambahan (opsional untuk augmentasi):
- [Fruits-360](https://github.com/Horea94/Fruit-Images-Dataset)
- [Roboflow Fruits Freshness](https://universe.roboflow.com)

---

## Model AI

### Arsitektur

```
Input: 224×224×3 (RGB, normalized [-1, 1])
  └── MobileNetV2 (pretrained ImageNet, backbone frozen)
        └── GlobalAveragePooling2D
              └── Dropout(0.3)
                    └── Dense(128, ReLU)
                          └── Dense(10, Softmax)
Output: 10 kelas probabilitas
```

### Kelas Output

| Index | Label | Deskripsi |
|---|---|---|
| 0 | freshapples | Apel Segar |
| 1 | freshbanana | Pisang Segar |
| 2 | freshchillies | Cabai Segar |
| 3 | freshoranges | Jeruk Segar |
| 4 | freshtomato | Tomat Segar |
| 5 | rottenapples | Apel Busuk |
| 6 | rottenbanana | Pisang Busuk |
| 7 | rottenchillies | Cabai Busuk |
| 8 | rottenoranges | Jeruk Busuk |
| 9 | rottentomato | Tomat Busuk |

### Training

```bash
# Contoh training dengan Python + TensorFlow
pip install tensorflow tensorflow-datasets

python scripts/train.py \
  --dataset_path ./data \
  --epochs 30 \
  --batch_size 32 \
  --learning_rate 0.001 \
  --output_dir ./models
```

Konversi ke TensorFlow.js:

```bash
pip install tensorflowjs

tensorflowjs_converter \
  --input_format keras \
  --quantize_float16 \
  saved_model/ \
  public/models/
```

### Performa Model

| Metrik | Nilai |
|---|---|
| Akurasi Validasi | ~94.7% |
| Ukuran Model | ~8MB (quantized) |
| Waktu Inferensi | 200–800ms (CPU/GPU) |
| Framework | TensorFlow.js 4.x |
| Backend | WebGL (GPU) |

---

## Instalasi

### Prasyarat

- Node.js 18+
- npm / yarn / pnpm

### Langkah

```bash
# 1. Clone repository
git clone https://github.com/username/freshcheck.git
cd freshcheck

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. (Opsional) Tempatkan model di /public/models/
# Tanpa model: aplikasi berjalan dalam mode demo

# 5. Jalankan development server
npm run dev
```

Buka `http://localhost:3000`

### Menambahkan Model Nyata

1. Latih model menggunakan notebook di `scripts/`
2. Ekspor ke TensorFlow.js format (LayersModel)
3. Tempatkan `model.json` dan file shard di `public/models/`
4. Model otomatis dimuat saat halaman detect dibuka

---

## Struktur Folder

```
freshcheck/
├── public/
│   └── models/              # TensorFlow.js model files
│       ├── model.json
│       └── group1-shard*.bin
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Landing page
│   │   ├── detect/          # Halaman deteksi
│   │   ├── history/         # Riwayat scan
│   │   ├── about/           # Tentang model AI
│   │   ├── tips/            # Tips penyimpanan
│   │   └── layout.tsx       # Root layout
│   ├── components/
│   │   ├── detect/          # Komponen halaman deteksi
│   │   │   ├── UploadZone.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   ├── StorageTips.tsx
│   │   │   └── ModelLoader.tsx
│   │   └── layout/          # Navbar, Footer
│   ├── lib/
│   │   ├── ml/
│   │   │   ├── model.ts     # TF.js inference engine
│   │   │   └── labels.ts    # Kelas & metadata buah
│   │   └── utils.ts         # Utilities
│   ├── store/
│   │   └── useScanStore.ts  # Zustand state management
│   └── types/
│       └── index.ts         # TypeScript types
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Keamanan

### Implementasi

| Aspek | Implementasi |
|---|---|
| Upload Validation | Hanya JPEG, PNG, WebP; maks. 10MB |
| MIME Validation | Cek `file.type` sebelum proses |
| Rate Limiting | 10 scan/menit per sesi (in-memory) |
| XSS Protection | Sanitasi semua string user-facing |
| CSP Header | Content-Security-Policy via next.config |
| No Server Upload | Gambar tidak pernah ke server |

### Security Headers (next.config.ts)

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: ...
```

---

## Performa

### Strategi

- **Lazy load model** — Model hanya dimuat saat halaman detect dibuka
- **WebGL backend** — GPU acceleration via `@tensorflow/tfjs-backend-webgl`
- **Image compression** — Gambar dikompres ke 640px / 75% quality sebelum disimpan
- **Zustand persist** — History tersimpan di localStorage, tidak ada re-fetch
- **Skeleton loading** — Placeholder selama model dimuat
- **Next.js Image** — Optimasi gambar otomatis

### Lighthouse Target

| Metrik | Target |
|---|---|
| Performance | > 90 |
| Accessibility | > 95 |
| Best Practices | > 90 |
| SEO | > 90 |

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables (Production)

Isi semua variabel dari `.env.example` di dashboard Vercel/platform deployment.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Animation | Framer Motion |
| ML | TensorFlow.js, MobileNetV2 |
| State | Zustand (persisted) |
| Charts | Recharts |
| Icons | Lucide React |
| Storage | localStorage (client-side) |

---

## Tags

```
#nextjs #tensorflowjs #machinelearning #imageclassification
#freshnessdetection #tailwindcss #modernwebapp #responsivewebdesign
#portfolioai #onnxruntime #teachablemachine #framermotion
#zustand #websecurity #draganddropupload
```

---

Dibuat untuk keperluan portfolio dan edukasi AI. Lisensi MIT.
