# ✧ Personal Portfolio Website

Personal portfolio website yang interaktif, modern, dan responsif. Berfungsi sebagai galeri utama untuk seluruh proyek, tech stack, dan informasi personal.

## 🌟 Fitur Utama

- **Single Source of Truth**: Data seluruh proyek dikelola terpusat pada file JS dan dimuat secara dinamis.
- **Interaktivitas Kelas Premium**: Dilengkapi dengan custom interactive cursor game, particle trail, dan layout 3D yang dinamis.
- **Responsive Layout**: Optimal untuk desktop, tablet, dan smartphone dengan visual screenshot desktop & mobile mockup.
- **Physics & Motion**: Animasi hover magnetik pada tombol dan tautan untuk interaksi mikro yang memikat.
- **Markdown Documentation Integration**: Halaman detail proyek memuat file dokumentasi README secara langsung.

## 🛠️ Tech Stack & Tools

- **Frontend**: HTML5, Vanilla CSS3, Vanilla JavaScript (ES6)
- **Animasi & Interaksi**: Custom lightweight physics engine
- **Tipografi**: Outfit & Inter (Google Fonts)

## 📂 Struktur Direktori

```
├── index.html          # Halaman Utama (Home)
├── projects.html       # Halaman Daftar Semua Proyek
├── project-detail.html # Halaman Detail Proyek (Dinamis)
├── style.css           # Styling Utama (CSS Grid/Flexbox)
├── detail.css          # Styling Khusus Halaman Detail
├── script.js           # Logika Web & Routing Dinamis
├── data.js             # Single Source of Truth (Data Proyek & Person)
├── physics.js          # Custom Physics & Micro-interactions
├── tech-icons.js       # SVG Icon Badge untuk Tech Stack
└── image/              # Folder Asset Screenshot Proyek
```

## 🚀 Memulai (Local Setup)

Cukup clone repository ini dan jalankan local server (atau buka file `index.html` langsung di browser Anda):

```bash
git clone https://github.com/abdkupang/portofolio.git
cd portofolio
```

Jika Anda menggunakan **Laragon**, letakkan di folder `www` Anda:
```bash
C:\laragon\www\portofolio
```
Akses via browser di `http://localhost/portofolio` atau `http://portofolio.test`.
