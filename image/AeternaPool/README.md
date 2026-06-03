# 🎱 Aeterna Pool — Premium Billiard Booking System

Sistem reservasi meja bilyard online yang modern, responsif, dan siap pakai. Dibangun dengan Vue 3 + Vite (frontend) dan Node.js + Express (backend), menggunakan MySQL sebagai database.

**Tags:** `Vue 3`, `Vite`, `Node.js`, `Express.js`, `MySQL`, `Tailwind CSS`, `JavaScript`, `HTML5`, `CSS3`, `Pinia`, `Vue Router`, `Booking System`, `Billiard`, `Fullstack`, `Web Application`

---

## 🛠 Teknologi

| Layer | Stack |
|---|---|
| Frontend | Vue 3, Vite, Pinia, Vue Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js, JWT, bcrypt, Multer |
| Database | MySQL 8+ |

---

## 📁 Struktur Project

```
AeternaPool/
├── frontend/
│   ├── src/
│   │   ├── views/
│   │   │   ├── public/       # Landing, Tables, Pricing, About, Contact
│   │   │   ├── auth/         # Login, Register
│   │   │   ├── user/         # Dashboard, Booking, MyBookings, Profile
│   │   │   └── admin/        # Dashboard, Tables, Bookings, Payments, Users
│   │   ├── components/
│   │   │   └── common/       # Navbar, Footer
│   │   ├── layouts/          # UserLayout, AdminLayout
│   │   ├── router/           # Vue Router config
│   │   ├── stores/           # Pinia stores (auth)
│   │   ├── services/         # Axios instance
│   │   └── assets/           # CSS global
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── database.js       # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── tableController.js
│   │   ├── bookingController.js
│   │   ├── paymentController.js
│   │   ├── userController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT middleware
│   │   └── upload.js         # Multer file upload
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tables.js
│   │   ├── bookings.js
│   │   ├── payments.js
│   │   ├── users.js
│   │   └── dashboard.js
│   ├── uploads/              # File upload storage
│   │   ├── payments/
│   │   └── tables/
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── database.sql
└── README.md
```

---

## ⚡ Cara Instalasi & Menjalankan

### 1. Clone / Extract Project

```bash
unzip AeternaPool.zip
cd AeternaPool
```

### 2. Setup Database

```bash
# Login ke MySQL
mysql -u root -p

# Import database
source /path/to/AeternaPool/database.sql
# atau
mysql -u root -p < database.sql
```

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Buat file .env dari contoh
cp .env.example .env

# Edit .env sesuai konfigurasi Anda
nano .env
```

Isi file `.env`:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=aeterna_pool

JWT_SECRET=change_this_to_a_very_long_random_string_in_production
JWT_EXPIRES_IN=7d

UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

FRONTEND_URL=http://localhost:5173
```

```bash
# Jalankan backend
npm run dev
# Backend berjalan di http://localhost:3000
```

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Jalankan frontend
npm run dev
# Frontend berjalan di http://localhost:5173
```

### 5. Akses Aplikasi

Buka browser ke: **http://localhost:5173**

---

## 🔐 Akun Demo

| Role | Email | Password |
|---|---|---|
| Admin | admin@aeterna.com | password |
| User | budi@example.com | password |
| User | siti@example.com | password |
| User | andi@example.com | password |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/api/auth/register` | Daftar user baru |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Info user login |
| PUT | `/api/auth/profile` | Update profil |
| PUT | `/api/auth/change-password` | Ubah password |

### Tables
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/tables` | Daftar semua meja |
| GET | `/api/tables/:id` | Detail meja |
| GET | `/api/tables/availability` | Cek ketersediaan |
| POST | `/api/tables` | Tambah meja (admin) |
| PUT | `/api/tables/:id` | Edit meja (admin) |
| DELETE | `/api/tables/:id` | Hapus meja (admin) |

### Bookings
| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/api/bookings` | Buat booking baru |
| GET | `/api/bookings/my` | Booking milik user |
| GET | `/api/bookings/:id` | Detail booking |
| POST | `/api/bookings/:id/cancel` | Batalkan booking |
| GET | `/api/bookings` | Semua booking (admin) |
| POST | `/api/bookings/:id/confirm` | Konfirmasi (admin) |

### Payments
| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/api/payments/upload` | Upload bukti transfer |
| GET | `/api/payments` | Daftar pembayaran (admin) |
| POST | `/api/payments/:id/verify` | Verifikasi (admin) |
| POST | `/api/payments/:id/reject` | Tolak (admin) |

### Users (Admin)
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/users` | Daftar semua user |
| POST | `/api/users/:id/toggle` | Aktif/nonaktifkan user |

### Dashboard (Admin)
| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/dashboard/stats` | Statistik dashboard |

---

## 📦 Contoh Request API

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@aeterna.com","password":"password"}'
```

### Buat Booking (dengan token)
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "table_id": 1,
    "booking_date": "2024-02-15",
    "start_time": "10:00",
    "duration_hours": 2,
    "notes": "Butuh stik ekstra"
  }'
```

### Upload Bukti Pembayaran
```bash
curl -X POST http://localhost:3000/api/payments/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "booking_id=1" \
  -F "payment_proof=@/path/to/bukti.jpg" \
  -F "notes=Transfer dari BCA"
```

---

## 🚀 Build untuk Production

### Frontend
```bash
cd frontend
npm run build
# Output di folder dist/
```

### Backend
```bash
cd backend
NODE_ENV=production node server.js
```

---

## 📋 Fitur Lengkap

### Public
- ✅ Landing page premium (Hero, About, Gallery, Pricing, Steps, Testimonials, CTA)
- ✅ Daftar meja dengan filter tipe
- ✅ Detail meja
- ✅ Halaman harga
- ✅ Tentang kami
- ✅ Form kontak

### Autentikasi
- ✅ Register dengan validasi
- ✅ Login dengan JWT
- ✅ Role-based access (admin/user)
- ✅ Protected routes
- ✅ Persistent login (localStorage)

### User
- ✅ Dashboard dengan statistik booking
- ✅ Booking meja (wizard 3 langkah)
- ✅ Cek ketersediaan real-time
- ✅ Pencegahan double booking
- ✅ Kalkulasi harga otomatis
- ✅ Riwayat booking dengan filter
- ✅ Detail booking
- ✅ Upload bukti pembayaran
- ✅ Batalkan booking
- ✅ Edit profil & ubah password

### Admin
- ✅ Dashboard statistik lengkap
- ✅ Grafik pendapatan 6 bulan
- ✅ CRUD meja bilyard
- ✅ Upload foto meja
- ✅ Manajemen status meja
- ✅ Kelola semua booking
- ✅ Konfirmasi & batalkan booking
- ✅ Verifikasi pembayaran
- ✅ Tolak pembayaran dengan alasan
- ✅ Lightbox preview bukti transfer
- ✅ Manajemen user (aktif/nonaktifkan)

---

## 🔒 Keamanan

- JWT Authentication dengan expiry
- bcrypt password hashing (salt rounds: 10)
- MySQL prepared statements (anti SQL Injection)
- Validasi tipe file upload (hanya gambar)
- Role-based middleware
- CORS dikonfigurasi untuk domain tertentu
- Token verification pada setiap request protected

---

## 📞 Support

Jika ada pertanyaan atau masalah, hubungi: info@aeterna-pool.id
