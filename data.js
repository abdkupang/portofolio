/**
 * PORTFOLIO DATA — Single source of truth
 * Tags extracted from README.md of each project
 */
const PROJECTS = [
  {
    id: "taskflow-lite",
    title: "TaskFlow Lite",
    subtitle: "Habit & Daily Planner App",
    desc: "Modern habit tracker & daily planner dengan Kanban view, Pomodoro timer, analytics, dan calendar — dibangun sebagai PWA yang bisa diinstall secara offline.",
    status: "wip",
    progress: 70,
    github: "https://github.com/abdkupang/taskflow-lite",
    hasMobile: true,
    folder: "TaskFlowLite",
    featured: false,
    tags: {
      primary: ["Next.js 15", "TypeScript", "Supabase"],
      full: ["Next.js 15", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Recharts", "Supabase", "PostgreSQL", "PWA", "Vercel"]
    },
    readme: `# TaskFlow Lite

Modern Habit & Daily Planner App — dibangun dengan Next.js 15, TypeScript, Tailwind CSS, dan Supabase. Dirancang sebagai PWA (Progressive Web App) yang bisa diinstall dan bekerja secara offline.

## Fitur Unggulan

| Fitur | Deskripsi |
|---|---|
| Task Management | Buat, edit, hapus, reorder task dengan Kanban-style views |
| Habit Tracker | Daily habit tracking dengan streak counter dan weekly progress |
| Focus Timer | Pomodoro-style timer dengan session history |
| Analytics | Weekly productivity charts, radar charts, category breakdowns |
| Calendar View | Monthly calendar dengan task deadlines dan habit completion |
| PWA | Installable, works offline, local-first |
| Dark/Light Mode | System-aware theme switching |
| Productivity Score | Dynamic score berdasarkan tasks, habits, dan focus time |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand (with persistence)
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **PWA**: next-pwa
- **Deployment**: Vercel

## Instalasi

\`\`\`bash
git clone https://github.com/abdkupang/taskflow-lite.git
cd taskflow-lite
npm install
cp .env.example .env.local
# Isi Supabase credentials di .env.local
npm run dev
\`\`\`

## Database Schema

\`\`\`sql
profiles           -- User profiles and settings
tasks              -- Task management
habits             -- Habit definitions
habit_logs         -- Daily habit completions
focus_sessions     -- Pomodoro session history
notifications      -- In-app notifications
productivity_stats -- Daily productivity data
\`\`\`

## Arsitektur

| Keputusan | Alasan |
|---|---|
| Local-first dengan Zustand + persist | Fast UX, works offline, mudah di-extend dengan Supabase sync |
| App Router | Server components, layouts, better DX |
| Tailwind CSS | Rapid styling, consistent design tokens |
| Recharts | Lightweight, composable charts untuk React |
| Framer Motion | Smooth animations tanpa overhead performa |`
  },
  {
    id: "autopost",
    title: "AutoPost",
    subtitle: "Discord Auto-Message Manager",
    desc: "Platform SaaS untuk mengotomasi pengiriman pesan ke channel Discord secara terjadwal, dengan sistem pembayaran Midtrans, multi-akun, dan monitoring real-time via SSE.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/autopost",
    hasMobile: true,
    folder: "autopost",
    featured: false,
    tags: {
      primary: ["PHP", "Discord API", "Midtrans"],
      full: ["PHP 8.x", "MySQL", "Discord API v10", "Midtrans", "Fonnte WhatsApp", "PWA", "SSE Real-time", "PHPMailer", "OAuth2", "JavaScript"]
    },
    readme: `# AutoPost — Discord Auto-Message Manager

Platform SaaS berbasis web untuk mengelola dan mengotomatisasi pengiriman pesan ke channel Discord secara terjadwal, dilengkapi dengan sistem pembayaran, manajemen akun, dan monitoring real-time.

## Fitur Utama

| Fitur | Deskripsi |
|---|---|
| Auto-Post Terjadwal | Kirim pesan ke channel Discord otomatis dengan interval kustomisasi |
| Slowmode Auto-Detect | Deteksi dan sesuaikan interval mengikuti slowmode Discord |
| Multi-Akun Discord | Kelola beberapa akun Discord dalam satu dashboard |
| Dashboard Real-time | Monitoring via SSE (Server-Sent Events) |
| Sistem Langganan | Integrasi Midtrans (QRIS, Transfer Bank, E-Wallet) |
| Login Discord OAuth2 | Autentikasi satu klik dengan akun Discord |
| PWA | Dapat diinstall sebagai aplikasi di mobile |
| Panel Admin | Manajemen pengguna dan monitoring sistem |

## Teknologi

- **Backend**: PHP 8.x (Native)
- **Database**: MySQL 8.x
- **Discord API**: v10 (OAuth2 + Bot Token)
- **Payment Gateway**: Midtrans
- **WhatsApp**: Fonnte API
- **Real-time**: Server-Sent Events (SSE)
- **PWA**: Web App Manifest + Service Worker

## Instalasi

\`\`\`bash
git clone https://github.com/abdkupang/autopost.git
cd autopost
mysql -u root -p < autopost.sql
# Edit config.php dengan kredensial Anda
php worker.php  # Jalankan worker background
\`\`\`

## Struktur Database

| Tabel | Deskripsi |
|---|---|
| users | Data pengguna (email, role, premium_until) |
| discord_accounts | Token akun Discord pengguna |
| autopost_jobs | Konfigurasi job (channel, pesan, interval) |
| logs | Riwayat seluruh aktivitas pengiriman |
| payments | Riwayat transaksi pembayaran |`
  },
  {
    id: "ai-video-generator",
    title: "AI Video Generator",
    subtitle: "Multi-Provider AI Video Platform",
    desc: "Generator video AI yang mendukung multiple provider — Google Veo 2, Kling AI, Replicate, dan Hugging Face (gratis). Text-to-video dan image-to-video dengan dashboard dan galeri terintegrasi.",
    status: "wip",
    progress: 70,
    github: "https://github.com/abdkupang/ai-video-generator",
    hasMobile: true,
    folder: "ai-video-generator",
    featured: false,
    tags: {
      primary: ["Next.js 13", "Google Veo 2", "Kling AI"],
      full: ["Next.js 13", "React 18", "JavaScript", "Hugging Face API", "Google Gemini", "Kling AI", "Replicate", "Node.js", "CSS3"]
    },
    readme: `# AI Video Generator

Generator video AI multi-provider yang mendukung Google Veo 2, Kling AI, Replicate, dan Hugging Face (gratis). Tersedia pilihan text-to-video dan image-to-video.

## Provider yang Didukung

| Model | Provider | Tipe | Biaya |
|---|---|---|---|
| Wan 2.1 T2V 1.3B | Hugging Face | Text → Video | GRATIS |
| Wan 2.1 I2V 14B | Hugging Face | Image → Video | GRATIS |
| Google Veo 2 | Google Gemini | Text & Image | Berbayar |
| Kling AI v1.6 | Kling AI | Text & Image | Berbayar |
| Wan 2.1 14B T2V | Replicate | Text → Video | Berbayar |

## Fitur Utama

- **Multi-Provider** — Pilih provider AI sesuai kebutuhan dan budget
- **Text to Video** — Generate video dari prompt teks
- **Image to Video** — Animasikan gambar statis menjadi video
- **Dashboard** — Statistik: total video, completed, failed, disk usage
- **Gallery** — Browse dan kelola semua video yang digenerate
- **Settings** — Konfigurasi API key lewat UI
- **Real-time Polling** — Track progress generasi secara live

## Tech Stack

| Teknologi | Kegunaan |
|---|---|
| Next.js 13 | Full-stack React framework |
| React 18 | UI library |
| @google/genai | Google Gemini / Veo 2 SDK |
| replicate | Replicate SDK |
| jsonwebtoken | Kling AI JWT auth |
| uuid | Unique video IDs |

## Instalasi

\`\`\`bash
git clone https://github.com/abdkupang/ai-video-generator.git
cd ai-video-generator
npm install
cp .env.example .env.local
# Minimal: isi HF_TOKEN untuk tier gratis
npm run dev
\`\`\``
  },
  {
    id: "aeterna-project",
    title: "Aeterna Project",
    subtitle: "Premium Clothing & Custom Print",
    desc: "E-commerce fullstack untuk toko baju polos + jasa sablon custom. Fitur katalog produk, custom print order, manajemen pesanan, dan panel admin lengkap dengan Vue 3 + Node.js.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/aeterna-project",
    hasMobile: true,
    folder: "aeterna-project",
    featured: false,
    tags: {
      primary: ["Vue 3", "Node.js", "Express.js"],
      full: ["Vue 3", "Vite", "Tailwind CSS", "Pinia", "Node.js", "Express.js", "MySQL", "JWT", "Multer", "Axios"]
    },
    readme: `# AETERNA — Premium Clothing & Custom Print

Full-stack e-commerce website untuk toko baju polos + jasa sablon custom. Dibangun dengan Vue 3 + Vite (frontend) dan Node.js + Express.js (backend).

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Vue 3 + Composition API + Vite |
| Styling | Tailwind CSS |
| State | Pinia |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MySQL |
| Auth | JWT + bcrypt |
| Upload | Multer |

## Fitur Utama

- Katalog produk dengan filter dan pencarian
- Custom print order dengan upload desain
- Keranjang belanja dan checkout
- Manajemen pesanan dengan tracking status
- Panel admin lengkap (CRUD produk, pesanan, users)
- JWT authentication dengan role-based access

## Akun Demo

| Role | Email | Password |
|---|---|---|
| Admin | admin@aeterna.id | password |
| User | budi@example.com | password |

## Instalasi

\`\`\`bash
# Database
mysql -u root -p < database.sql

# Backend
cd aeterna-backend && npm install && npm run dev

# Frontend  
cd aeterna-frontend && npm install && npm run dev
\`\`\``
  },
  {
    id: "aeterna-pool",
    title: "AeternaPool",
    subtitle: "Premium Billiard Booking System",
    desc: "Sistem reservasi meja bilyard online dengan Vue 3 + Node.js. Fitur booking wizard 3 langkah, cek ketersediaan real-time, upload bukti pembayaran, dan dashboard admin statistik lengkap.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/AeternaPool",
    hasMobile: true,
    folder: "AeternaPool",
    featured: false,
    tags: {
      primary: ["Vue 3", "Node.js", "MySQL"],
      full: ["Vue 3", "Vite", "Pinia", "Vue Router", "Tailwind CSS", "Node.js", "Express.js", "MySQL 8+", "JWT", "bcrypt", "Multer", "Axios"]
    },
    readme: `# AeternaPool — Premium Billiard Booking System

Sistem reservasi meja bilyard online yang modern dan responsif. Dibangun dengan Vue 3 + Vite (frontend) dan Node.js + Express (backend), menggunakan MySQL sebagai database.

## Fitur Lengkap

### Public
- Landing page premium (Hero, Gallery, Pricing, Testimonials)
- Daftar meja dengan filter tipe
- Halaman harga

### User
- Booking wizard 3 langkah
- Cek ketersediaan real-time
- Pencegahan double booking
- Kalkulasi harga otomatis
- Upload bukti pembayaran
- Riwayat booking

### Admin
- Dashboard statistik lengkap
- Grafik pendapatan 6 bulan
- CRUD meja bilyard dengan upload foto
- Verifikasi pembayaran dengan lightbox preview
- Manajemen user

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | Vue 3, Vite, Pinia, Vue Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js, JWT, bcrypt, Multer |
| Database | MySQL 8+ |

## Keamanan

- JWT Authentication dengan expiry
- bcrypt password hashing (salt rounds: 10)
- MySQL prepared statements
- Validasi tipe file upload
- CORS dikonfigurasi untuk domain tertentu`
  },
  {
    id: "komikstation",
    title: "KomikStation",
    subtitle: "Online Comic Reading Platform",
    desc: "Platform baca komik online gratis dengan dark mode premium, mendukung Manga, Manhwa, dan Manhua. Fitur reader interaktif, bookmark, rating, komentar, dan admin panel.",
    status: "wip",
    progress: 85,
    github: "https://github.com/abdkupang/komikstation",
    hasMobile: true,
    folder: "komikstation",
    featured: false,
    tags: {
      primary: ["PHP", "MySQL", "Dark Mode"],
      full: ["PHP 8.x", "MySQL", "MariaDB", "HTML5", "CSS3", "Vanilla JavaScript", "Glassmorphism", "Apache"]
    },
    readme: `# KomikStation — Online Comic Platform

Platform baca komik online gratis dengan desain modern bertema gelap (dark mode). Mendukung koleksi Manga, Manhwa, dan Manhua.

## Fitur Utama

- **Dark Mode Premium** — Glassmorphism, gradient neon, animasi halus
- **Reader Komik** — Baca chapter langsung di browser (horizontal/vertikal)
- **Filter & Kategori** — Genre, origin (Manga/Manhwa/Manhua), status
- **Rating & Komentar** — Interaksi komunitas pembaca
- **Bookmark** — Simpan favorit untuk dibaca nanti
- **Admin Panel** — Kelola komik, chapter, dan pengguna

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Backend | PHP 8.x (Native) |
| Database | MySQL / MariaDB |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Server | Apache (Laragon/XAMPP) |

## Desain

- **Warna utama**: Cyan neon (#00f0ff) dan Ungu (#7c3aed)
- **Background**: Deep navy (#0a0a14)
- **Efek**: Glassmorphism, gradient, hover animations

## Instalasi

\`\`\`bash
git clone https://github.com/abdkupang/komikstation.git
# Pindahkan ke htdocs/www
# Akses: http://localhost/komikstation/setup.php
\`\`\``
  },
  {
    id: "nontonfilm",
    title: "NontonFilm",
    subtitle: "Social Media Video Platform",
    desc: "Platform social media berbasis video & reels yang terinspirasi dari Instagram & TikTok. Fitur upload video, stories 24 jam, direct messaging, notifikasi, dan dark/light theme toggle.",
    status: "wip",
    progress: 60,
    github: "https://github.com/abdkupang/nontonfilm",
    hasMobile: true,
    folder: "nontonfilm",
    featured: false,
    tags: {
      primary: ["PHP", "MySQL", "Social Media"],
      full: ["PHP 8+", "MySQL", "MariaDB", "Vanilla JavaScript", "HTML5", "CSS3", "Apache", "Session Auth", "PDO", "htaccess Router"]
    },
    readme: `# NontonFilm — Social Media Video Platform

Platform social media untuk berbagi video, reels, dan stories — dibangun dengan vanilla PHP, MySQL, dan JavaScript. Terinspirasi dari Instagram & TikTok.

## Fitur Utama

- **Video & Reel Upload** — Upload video, reels, dan gambar dengan caption, hashtag, dan music info
- **Stories** — Stories 24 jam dengan text overlay dan background color
- **Direct Messaging** — Real-time chat antar pengguna
- **Notifikasi** — Notif untuk likes, comments, follows, reposts, dan messages
- **Search & Explore** — Temukan users, videos, dan trending hashtags
- **Social Interactions** — Like, comment, save, repost, follow/unfollow
- **Report & Block** — Content moderation
- **Dark/Light Theme** — Toggle theme dengan localStorage persistence

## Tech Stack

| Layer | Teknologi |
|---|---|
| Backend | PHP 8+ (vanilla, tanpa framework) |
| Database | MySQL / MariaDB |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Server | Apache dengan mod_rewrite |
| Auth | Session-based dengan password_hash |

## Database

14 tabel utama: users, posts, stories, likes, comments, saves, reposts, follows, messages, notifications, hashtags, post_hashtags, story_views, comment_likes`
  },
  {
    id: "fs31",
    title: "FS31 Soccer School",
    subtitle: "Sistem Manajemen Kelas Sepak Bola",
    desc: "Sistem manajemen kelas sepak bola berbasis web untuk FS31 Soccer School Makassar. Fitur algoritma K-Means untuk clustering pemain, multi-role (Admin/Pelatih/Wali), export Excel/PDF.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/fs-31",
    hasMobile: true,
    folder: "fs31",
    featured: false,
    tags: {
      primary: ["PHP", "K-Means", "Bootstrap 5"],
      full: ["PHP Native", "MySQL", "Bootstrap 5.3", "FontAwesome 6.4", "Composer", "PhpSpreadsheet", "mPDF", "PDO", "K-Means Algorithm"]
    },
    readme: `# FS31 Soccer School — Sistem Manajemen Kelas Sepak Bola

**Proyek Tugas Akhir S1 Teknik Informatika — Universitas Dipa Makassar**

Sistem manajemen kelas sepak bola berbasis web untuk FS 31 Soccer School Makassar, dilengkapi algoritma K-Means untuk clustering pemain.

## Fitur Utama

- **Landing Page Interaktif** — Profil, galeri, jadwal, dan prestasi SSB
- **Multi-Role Authentication** — Login berbeda untuk Admin, Pelatih, dan Wali
- **Algoritma K-Means** — Pengelompokan pemain otomatis berdasarkan:
  - Kecepatan & kelincahan
  - Teknik dasar (passing, shooting, dribbling)
  - Stamina dan fisik
- **Export Excel** — PhpSpreadsheet untuk laporan data
- **Cetak PDF** — mPDF untuk laporan dokumen

## Teknologi

| Komponen | Teknologi |
|---|---|
| Backend | PHP Native + PDO |
| Database | MySQL |
| CSS Framework | Bootstrap 5.3.0 |
| Icons | FontAwesome 6.4.0 |
| Excel | phpoffice/phpspreadsheet |
| PDF | mpdf/mpdf |

## Implementasi K-Means

Algoritma digunakan untuk:
1. Mengelompokkan pemain ke dalam K kelompok berdasarkan performa
2. Menentukan kelompok optimal menggunakan metode Elbow
3. Visualisasi cluster dalam bentuk grafik interaktif`
  },
  {
    id: "aksesoris",
    title: "Toko Aksesoris",
    subtitle: "E-Commerce Platform",
    desc: "Aplikasi e-commerce untuk penjualan aksesoris online dengan PHP native. Fitur verifikasi email, rating & komentar, upload bukti transfer, dan dashboard admin lengkap.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/aksesoris_project",
    hasMobile: true,
    folder: "aksesoris-project",
    featured: false,
    tags: {
      primary: ["PHP", "Tailwind CSS", "PHPMailer"],
      full: ["PHP 8.x", "MySQL 8.x", "Tailwind CSS", "JavaScript", "HTML5", "PHPMailer", "Composer", "Laragon", "Apache"]
    },
    readme: `# Toko Aksesoris Online

Aplikasi web e-commerce untuk penjualan aksesoris secara online. Dibangun menggunakan PHP native dengan database MySQL, berjalan di atas Laragon.

## Fitur Utama

### Pembeli
- Registrasi & Login dengan verifikasi email
- Katalog produk dengan filter/pencarian dan galeri gambar
- Keranjang belanja — tambah, ubah jumlah, hapus item
- Checkout & pemesanan dengan data pengiriman
- Upload bukti transfer
- Riwayat pesanan dengan tracking real-time
- Komentar & Rating produk

### Admin
- Dashboard dengan ringkasan statistik toko
- CRUD produk dengan upload gambar
- Kelola kategori, pesanan, dan pelanggan
- Verifikasi bukti transfer — setujui atau tolak

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Backend | PHP 8.x (Native) |
| Database | MySQL 8.x |
| Frontend | HTML, CSS, JavaScript |
| Email | PHPMailer |
| Server | Laragon (Apache) |`
  },
  {
    id: "rekam-medis",
    title: "SIMRS Rekam Medis",
    subtitle: "Sistem Informasi Manajemen Rumah Sakit",
    desc: "Platform digital manajemen rumah sakit (SIMRS) Sinar Kasih Tana Toraja. Fitur rekam medis digital, resep elektronik, jadwal dokter, dan multi-role (Admin/Dokter/Pasien).",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/rekam-medis",
    hasMobile: true,
    folder: "rekam-medis",
    featured: false,
    tags: {
      primary: ["PHP", "MySQL", "FontAwesome"],
      full: ["PHP 7.4+", "MySQL", "MariaDB", "HTML5", "CSS3", "JavaScript ES6", "FontAwesome 6", "Google Fonts"]
    },
    readme: `# SIMRS Sinar Kasih Tana Toraja

Platform digital manajemen rumah sakit berbasis web untuk mengelola rekam medis, resep obat, jadwal dokter, dan kunjungan pasien secara terintegrasi.

## Tiga Portal Akses

### Portal Dokter
- Akses data pasien yang ditangani
- Kelola rekam medis (diagnosa, keluhan, tindakan)
- Manajemen resep elektronik

### Portal Admin
- Manajemen data master (pengguna, dokter, obat, poli)
- Monitoring seluruh rekam medis
- Registrasi pasien dan pengaturan jadwal

### Portal Pasien
- Riwayat pemeriksaan medis personal
- Riwayat resep obat yang diterima
- Informasi dokter yang tersedia

## Teknologi

- **Backend**: PHP Native
- **Database**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript ES6
- **Icons**: FontAwesome 6, Google Fonts (Inter)
- **Server**: Apache (XAMPP/Laragon)`
  },
  {
    id: "toko-sembako",
    title: "Toko Sembako",
    subtitle: "Sistem Penjualan & Manajemen Stok",
    desc: "Aplikasi manajemen toko sembako dengan 3 peran — Admin, Pelanggan, dan Gudang. Fitur POS, monitoring stok, laporan cetak, grafik penjualan Chart.js, dan permintaan restok.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/toko_sembako",
    hasMobile: true,
    folder: "toko_sembako",
    featured: false,
    tags: {
      primary: ["PHP", "Tailwind CSS", "Chart.js"],
      full: ["PHP 8.x", "MySQL 8.0", "Tailwind CSS (CDN)", "Chart.js", "HTML5", "JavaScript", "Apache", "Laragon"]
    },
    readme: `# Toko Sembako — Sistem Penjualan & Manajemen Stok

Aplikasi web berbasis PHP untuk manajemen toko sembako dengan fitur penjualan, manajemen stok, dan pengelolaan gudang. Mendukung 3 peran: Admin, Pelanggan, dan Gudang.

## Fitur Per Role

### Admin
- Dashboard statistik + grafik penjualan mingguan (Chart.js)
- CRUD barang dengan upload gambar
- Kelola pesanan, konfirmasi pembayaran
- Stok monitoring & permintaan restok ke gudang
- Laporan penjualan dengan cetak

### Pelanggan
- Jelajahi dan tambah barang ke keranjang
- Checkout & pemesanan
- Tracking status pesanan

### Gudang
- Monitoring stok barang
- Manajemen pengiriman ke toko
- Riwayat pembelian & laporan

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Backend | PHP 8.x |
| Database | MySQL 8.0 |
| Frontend | HTML, Tailwind CSS (CDN) |
| Chart | Chart.js |`
  },
  {
    id: "penjualan-buku",
    title: "Penjualan Buku",
    subtitle: "E-Commerce Sistem Penjualan Buku",
    desc: "Sistem penjualan buku online dengan custom MVC routing, autentikasi OTP via email, manajemen inventori, dan laporan penjualan. Dibangun dengan PHP Native menggunakan single entry point.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/penjualan_buku",
    hasMobile: true,
    folder: "penjualan_buku",
    featured: false,
    tags: {
      primary: ["PHP", "Custom MVC", "PHPMailer"],
      full: ["PHP 8.x", "MySQL", "HTML5", "CSS3 Vanilla", "JavaScript", "FontAwesome", "Composer", "PHPMailer", "Custom MVC Pattern"]
    },
    readme: `# Sistem Penjualan Buku Premium

Aplikasi e-commerce buku berbasis web dengan PHP Native dan konsep MVC sederhana melalui custom routing. Menyediakan fungsionalitas e-commerce lengkap dari manajemen katalog hingga proses checkout.

## Arsitektur

Custom MVC Pattern dengan Single Entry Point (index.php) dan URL Rewrite via .htaccess.

## Fitur

- Katalog buku dengan pencarian dan filter kategori
- Keranjang belanja dan checkout
- OTP via email untuk registrasi (PHPMailer)
- Reset password via email
- Panel admin: CRUD buku, kelola pesanan, data pelanggan
- Laporan penjualan

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Language | PHP Native 8.x |
| Database | MySQL |
| Frontend | HTML5, CSS3 (Vanilla), JavaScript |
| Icons | FontAwesome 6.x |
| Mailing | PHPMailer |
| Architecture | Custom MVC (Single Entry Point) |`
  },
  {
    id: "penjualan-kaos",
    title: "Penjualan Kaos",
    subtitle: "Sistem Informasi Penjualan Online",
    desc: "Sistem penjualan kaos custom online dengan panel admin (Chart.js analytics, laporan cetak) dan panel pelanggan lengkap. Mendukung varian produk, multiple metode pembayaran.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/penjualan_kaos",
    hasMobile: false,
    folder: "penjualan_kaos",
    featured: false,
    tags: {
      primary: ["PHP", "Tailwind CSS", "Chart.js"],
      full: ["PHP 8.x", "MySQL 8.0", "Tailwind CSS", "JavaScript", "Chart.js", "PHPMailer", "Composer", "Apache"]
    },
    readme: `# Penjualan Kaos

Sistem informasi penjualan kaos online berbasis PHP Native dengan antarmuka modern menggunakan Tailwind CSS. Mencakup panel pelanggan dan panel admin yang lengkap.

## Fitur

### Panel Pelanggan
- Registrasi & login dengan verifikasi email (PHPMailer)
- Katalog produk dengan varian (ukuran, warna)
- Keranjang dan checkout
- Pembayaran (Transfer Bank, COD, E-Wallet, QRIS)
- Riwayat pesanan

### Panel Admin
- Dashboard statistik & grafik penjualan (Chart.js)
- Manajemen produk & varian
- Konfirmasi pembayaran
- Laporan penjualan & cetak

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Backend | PHP 8.x (Native) |
| Database | MySQL 8.0 |
| Frontend | HTML, Tailwind CSS (CDN), JavaScript |
| Email | PHPMailer 6.x |
| Chart | Chart.js |`
  },
  {
    id: "penyewaan-camp",
    title: "CampRent",
    subtitle: "Sistem Penyewaan Alat Camping",
    desc: "Aplikasi web penyewaan alat camping online dengan panel admin lengkap — CRUD alat, multi-gambar, verifikasi pembayaran, laporan PDF, log maintenance, dan dashboard statistik.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/penyewaan-alat-camp",
    hasMobile: false,
    folder: "penyewaan_alat_camp",
    featured: false,
    tags: {
      primary: ["PHP", "Tailwind CSS", "PHPMailer"],
      full: ["PHP 8.0+", "MySQL 8.0+", "Tailwind CSS", "JavaScript", "Composer", "PHPMailer SMTP", "Apache", "MySQLi"]
    },
    readme: `# CampRent — Sistem Penyewaan Alat Camping

Aplikasi web berbasis PHP untuk manajemen penyewaan alat camping secara online dengan panel admin dan halaman pelanggan yang responsif.

## Fitur

### Pelanggan
- Registrasi & login dengan verifikasi email
- Katalog alat camping dengan gambar & detail lengkap
- Keranjang & checkout
- Upload bukti pembayaran
- Riwayat pemesanan & tracking status

### Admin
- Dashboard statistik (total alat, pemesanan, pendapatan)
- CRUD alat camping & kategori
- Manajemen gambar alat (multi-gambar)
- Verifikasi pembayaran pelanggan
- Laporan pemesanan & pendapatan (cetak PDF)
- Log maintenance alat

- **Backend**: PHP 8, MySQLi
- **Frontend**: HTML5, TailwindCSS (CDN), JavaScript
- **Email**: PHPMailer (SMTP Gmail)
- **Database**: MySQL 8.0`
  },
  {
    id: "sepatu",
    title: "SepatuStore",
    subtitle: "E-Commerce Toko Sepatu Online",
    desc: "Aplikasi e-commerce toko sepatu dengan 6 kategori produk, sistem pesanan lengkap, dashboard admin dengan statistik penjualan, dan download laporan Excel.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/sepatu",
    hasMobile: false,
    folder: "sepatu",
    featured: false,
    tags: {
      primary: ["PHP", "MySQL", "JavaScript"],
      full: ["PHP 8.0+", "MySQL 8.0+", "HTML5", "CSS3", "JavaScript", "Apache", "Laragon"]
    },
    readme: `# SepatuStore — E-Commerce Toko Sepatu Online

Aplikasi web e-commerce toko sepatu online berbasis PHP dan MySQL. Sistem penjualan sepatu lengkap dengan panel admin dan pelanggan.

## Kategori Produk

| Kategori | Deskripsi |
|---|---|
| Sepatu Lari | Untuk berlari dan olahraga |
| Sepatu Gunung | Untuk mendaki dan outdoor |
| Sepatu Sekolah | Aktivitas sehari-hari |
| Sepatu Futsal | Olahraga futsal indoor |
| Sepatu Casual | Penggunaan santai |
| Sepatu Formal | Acara formal/kerja |

## Fitur

### Pelanggan
- Katalog produk berdasarkan kategori
- Detail produk (harga, stok, ukuran, warna)
- Sistem pesanan & pembayaran
- Riwayat pesanan

### Admin
- Dashboard statistik penjualan
- Kelola produk, pengguna, penjualan
- Download laporan Excel

## Tech Stack: PHP, MySQL, HTML/CSS, JavaScript`
  },
  {
    id: "aetherroom",
    title: "AetherRoom",
    subtitle: "AI-Powered Interior Design Platform",
    desc: "Platform desain interior premium dengan canvas editor Figma-like, AI assistant berbasis Gemini, real-time collaboration via WebSocket, dan pseudo-3D room preview. Monorepo dengan Next.js, NestJS, dan FastAPI.",
    status: "wip",
    progress: 75,
    github: "https://github.com/abdkupang/AetherRoom",
    hasMobile: true,
    folder: "AetherRoom",
    featured: false,
    tags: {
      primary: ["Next.js 15", "NestJS", "FastAPI"],
      full: ["Next.js 15", "TypeScript", "NestJS 10", "FastAPI", "PostgreSQL 16", "Prisma ORM", "Socket.io", "React Konva", "Three.js", "Google Gemini", "Docker", "Nginx", "Supabase Storage", "Framer Motion", "GSAP"]
    },
    readme: `# AetherRoom — AI-Powered Interior Design Platform

Platform desain interior premium yang menggabungkan canvas editor Figma-like, AI design assistant berbasis Google Gemini, dan real-time collaboration.

## Fitur Unggulan

### Room Editor
- **Drag & Drop** furniture dari katalog ke canvas
- **Resize & Rotate** dengan transform handles
- **Snap to Grid** dengan configurable grid size
- **Layer Management** — reorder, lock, hide objects
- **Undo/Redo** (50 levels of history)
- **2D → Pseudo-3D** preview toggle (Three.js / React Three Fiber)

### AI Design Assistant (Gemini 1.5 Flash)
- **Layout Generation** — full room layouts dari dimensi + style
- **Color Palette Generator** — harmonious palettes by mood/style
- **Furniture Placement** — AI-optimized positioning suggestions
- **Interior Style Chat** — conversational design advisor

### Collaboration
- **Real-time multi-user editing** via Socket.io WebSocket
- **Live cursors** dengan user presence indicators
- **Role-based access** (Owner / Editor / Viewer)
- **Invite system** via email atau shareable link

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP + Lenis, React Konva, Three.js + R3F |
| State | Zustand + Immer, TanStack Query, Socket.io Client |
| Backend | NestJS 10, Prisma ORM, PostgreSQL 16, JWT + Passport |
| AI Service | FastAPI, Google Gemini 1.5 Flash, Pydantic |
| Storage | Supabase Storage |
| Infra | Docker + Compose, Nginx |

## Arsitektur

\`\`\`
apps/web/        → Next.js 15 frontend
apps/api/        → NestJS backend
apps/ai-service/ → Python FastAPI AI service
\`\`\`

## Quick Start

\`\`\`bash
git clone https://github.com/your-org/aetherroom.git
npm install
cp .env.example .env
# Setup database
cd apps/api && npx prisma migrate dev
# Start all services
npm run dev  # Frontend :3000, API :3001, AI :8000
\`\`\``
  },
  {
    id: "kosthub",
    title: "KostHub",
    subtitle: "Platform Informasi & Manajemen Kost",
    desc: "Platform properti-tech modern untuk pencarian dan manajemen kost. Arsitektur production-grade dengan Next.js 15 + Laravel 12, pencarian berbasis peta Leaflet, review terverifikasi, dan dashboard multi-role lengkap.",
    status: "wip",
    progress: 80,
    github: "https://github.com/abdkupang/KostHub",
    hasMobile: true,
    folder: "KostHub",
    featured: false,
    tags: {
      primary: ["Next.js 15", "Laravel 12", "PostgreSQL"],
      full: ["Next.js 15", "TypeScript", "Laravel 12", "Laravel Sanctum", "PostgreSQL 16", "Redis", "MinIO", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis", "TanStack Query", "Zustand", "React Leaflet", "Docker", "Nginx"]
    },
    readme: `# KostHub — Platform Informasi & Manajemen Kost

Platform properti-tech modern untuk pencarian dan manajemen kost. Dibangun dengan arsitektur full-stack production-grade, mendukung sistem multi-role, pencarian berbasis peta, review terverifikasi, dan dashboard manajemen lengkap.

## Fitur Lengkap

### Pencarian & Listing
- Realtime search dengan debounce
- Filter: harga, gender, fasilitas, lokasi, radius
- Map view interaktif (OpenStreetMap/Leaflet)
- Nearby kost berdasarkan geolocation
- SEO-friendly URL & metadata dinamis

### Multi-Role System
| Role | Kemampuan |
|------|-----------|
| Admin | Kelola semua user, moderasi review, monitoring platform |
| Owner | CRUD kost & kamar, upload galeri, kelola booking, reply review |
| User | Cari kost, favorit, booking survey, tulis review |
| Guest | Browse, search, lihat detail (read-only) |

### Keamanan
| Mekanisme | Implementasi |
|-----------|--------------|
| Authentication | Laravel Sanctum (Token-based) |
| OAuth | Google OAuth via Laravel Socialite |
| Rate Limiting | Nginx zone + Laravel throttle middleware |
| File Upload | Validasi MIME, resize, convert ke WebP |
| Role-based Access | Policy & Gate + CheckRole middleware |

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis, TanStack Query, Zustand |
| Backend | Laravel 12, Sanctum, Socialite, Queue, Intervention Image |
| Database | PostgreSQL 16, Redis 7 |
| Storage | MinIO / Flysystem S3 |
| Infra | Docker, Nginx |

## Quick Start (Docker)

\`\`\`bash
git clone https://github.com/yourusername/kosthub.git
cp frontend/.env.example frontend/.env.local
cp backend/.env.example  backend/.env
docker-compose up -d --build
docker-compose exec backend php artisan migrate --seed
# Frontend :3000, API :8000, MinIO :9001
\`\`\``
  },
  {
    id: "pulsedesk",
    title: "PulseDesk",
    subtitle: "AI-Powered Workspace for Software Teams",
    desc: "Platform produktivitas all-in-one untuk tim software modern. Menggabungkan Kanban board real-time, AI assistant berbasis Claude, client portal, invoice system, time tracking, dan analytics dalam satu workspace premium.",
    status: "wip",
    progress: 70,
    github: "https://github.com/abdkupang/PulseDesk",
    hasMobile: true,
    folder: "PulseDesk",
    featured: true,
    tags: {
      primary: ["Next.js 15", "NestJS", "Claude AI"],
      full: ["Next.js 15", "TypeScript", "NestJS", "Prisma ORM", "PostgreSQL 16", "Redis", "MinIO", "Tailwind CSS", "Framer Motion", "Zustand", "React Query", "Anthropic Claude", "Docker", "Turborepo", "GitHub Actions"]
    },
    readme: `# PulseDesk — AI-Powered Workspace

Platform produktivitas all-in-one untuk tim software modern. Menggabungkan project management, AI assistant, client portal, invoicing, time tracking, dan real-time collaboration.

## Fitur Utama

- **Kanban Board** — Real-time drag-and-drop dengan WebSocket sync
- **AI Assistant** — Claude-powered task breakdown, sprint planning, bug explanation, docs generation
- **Client Portal** — Shared workspace dengan approval system dan file sharing
- **Invoice System** — Generate, send, dan track invoices dengan PDF export
- **Time Tracking** — Start/stop timer dengan project-based reporting
- **Analytics** — Productivity metrics, velocity tracking, revenue charts
- **Real-time Notifications** — WebSocket-based notification center
- **Auth** — JWT, OAuth (Google/GitHub), 2FA dengan TOTP
- **File Management** — MinIO storage dengan drag-and-drop upload

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Zustand, React Query |
| Backend | NestJS, Prisma ORM, REST + WebSocket |
| Database | PostgreSQL 16, Redis 7 |
| Storage | MinIO |
| Auth | JWT + Refresh Tokens, OAuth 2.0, TOTP 2FA |
| AI | Anthropic Claude API |
| DevOps | Docker, Docker Compose, Nginx, GitHub Actions |
| Monorepo | Turborepo |

## Quick Start

\`\`\`bash
git clone https://github.com/yourusername/pulsedesk.git
cp .env.example .env
docker-compose up -d
npm run db:migrate && npm run db:seed
# Frontend :3000, API :3001, Swagger :3001/api/docs
\`\`\``
  },
  {
    id: "freshcheck",
    title: "FreshCheck",
    subtitle: "AI Freshness Detection — Buah & Sayur",
    desc: "Deteksi kesegaran buah dan sayur secara instan menggunakan machine learning berbasis browser. Model MobileNetV2 berjalan 100% on-device via TensorFlow.js dengan akurasi ~94.7%, estimasi masa simpan, dan mode kamera realtime.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/freshcheck",
    hasMobile: true,
    folder: "freshcheck",
    featured: false,
    tags: {
      primary: ["Next.js 15", "TensorFlow.js", "MobileNetV2"],
      full: ["Next.js 15", "TypeScript", "Tailwind CSS", "TensorFlow.js 4.x", "MobileNetV2", "Framer Motion", "Zustand", "Recharts", "Lucide React", "Vercel"]
    },
    readme: `# FreshCheck — AI Freshness Detection

Deteksi kesegaran buah dan sayur secara instan menggunakan machine learning berbasis browser. Model berjalan 100% on-device via TensorFlow.js.

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
| Mode Offline | Setelah model dimuat, bisa tanpa internet |

## Model AI

| Metrik | Nilai |
|---|---|
| Akurasi Validasi | ~94.7% |
| Ukuran Model | ~8MB (quantized float16) |
| Waktu Inferensi | 200–800ms (WebGL GPU) |
| Dataset | 13.599 gambar, 10 kelas (5 buah × fresh/rotten) |

Arsitektur: MobileNetV2 (pretrained ImageNet) → GlobalAveragePooling2D → Dropout(0.3) → Dense(128, ReLU) → Dense(10, Softmax)

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Animation | Framer Motion |
| ML | TensorFlow.js 4.x, MobileNetV2 |
| State | Zustand (persisted localStorage) |
| Charts | Recharts |

## Instalasi

\`\`\`bash
git clone https://github.com/abdkupang/freshcheck.git
cd freshcheck && npm install
cp .env.example .env.local
npm run dev
# Tempatkan model.json + shard files di /public/models/
\`\`\``
  },
  {
    id: "langithari",
    title: "LangitHari",
    subtitle: "Prediksi Cuaca & Rekomendasi Aktivitas Harian",
    desc: "Platform cuaca modern berbasis Next.js 15 dengan atmosfer dinamis (efek hujan canvas, sun flare, fog drift), rekomendasi aktivitas kontekstual rule-based, kualitas udara AQI, UV gauge, kompas angin SVG, dan visualisasi Recharts.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/langithari",
    hasMobile: true,
    folder: "langithari",
    featured: true,
    tags: {
      primary: ["Next.js 15", "OpenWeatherMap", "Clerk Auth"],
      full: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis", "Zustand", "TanStack Query v5", "Prisma ORM", "PostgreSQL", "Clerk Auth", "Upstash Redis", "Recharts", "React Leaflet", "Vercel"]
    },
    readme: `# LangitHari — Prediksi Cuaca & Rekomendasi Aktivitas

Platform cuaca modern dengan atmosfer dinamis, rekomendasi aktivitas kontekstual, dan visualisasi yang human-centered.

## Fitur Utama

| Fitur | Keterangan |
|---|---|
| Cari kota | Autocomplete + debounce 350ms + sanitasi input |
| Deteksi lokasi otomatis | Browser Geolocation API |
| Prediksi cuaca harian | 7 hari ke depan suhu min/max |
| Prediksi per jam | 24 jam + Recharts AreaChart interaktif |
| Simpan kota favorit | PostgreSQL (wajib login), optimistic update |
| Rekomendasi aktivitas | Engine rule-based 6 parameter dengan confidence score |
| Sunrise & sunset tracker | Progress bar visual + countdown |
| Kualitas udara (AQI) | AQI + breakdown PM2.5, PM10, O3, NO2 |
| UV index | Gauge + saran proteksi kulit |
| Kompas angin | SVG animated compass needle |
| Dynamic background | Gradient + efek berubah per kondisi cuaca |
| Cursor parallax | GSAP 3-layer depth pada hero section |

## Dynamic Atmosphere States

| Kondisi | Tema UI | Efek Visual |
|---|---|---|
| Cerah (siang) | Warm blue sky | Sunflare + awan lambat |
| Fajar (05–07) | Purple-orange gradient | Soft glow, awan tipis |
| Senja (17–19) | Orange-rose-purple | Warm flare, golden |
| Hujan | Deep blue-gray | Canvas rain 80 tetes |
| Badai | Near-black | Heavy rain + dark |
| Malam | Dark navy | Minimal, gelap |

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP + Lenis |
| State | Zustand 5, TanStack Query v5 |
| Backend | Next.js Server Actions, Prisma ORM 5, PostgreSQL |
| Auth | Clerk Auth |
| Rate Limiting | Upstash Redis sliding window |
| API | OpenWeatherMap One Call 3.0, Air Pollution, Geocoding |
| Charts | Recharts (AreaChart + RadarChart) |

## Instalasi

\`\`\`bash
git clone https://github.com/abdkupang/langithari.git
npm install && cp .env.example .env.local
# Isi OPENWEATHER_API_KEY, Clerk keys, DATABASE_URL
npx prisma migrate dev && npm run db:seed
npm run dev
\`\`\``
  },
  {
    id: "pantai-akkarena",
    title: "Pantai Akkarena",
    subtitle: "Sistem Reservasi Wisata Online",
    desc: "Sistem reservasi tiket wisata online berbasis Laravel 12 untuk Pantai Akkarena Makassar. Fitur QR code tiket terenkripsi, tiket PDF bergaya bioskop, sistem check-in scan QR, dan dashboard multi-role (Admin/Petugas/Pengunjung).",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/pantai-akkarena",
    hasMobile: true,
    folder: "pantai-akkarena",
    featured: false,
    tags: {
      primary: ["Laravel 12", "Tailwind CSS", "Alpine.js"],
      full: ["Laravel 12", "PHP 8.2+", "MySQL 8.0+", "Tailwind CSS (CDN)", "Alpine.js", "Laravel Breeze", "simple-qrcode", "laravel-dompdf", "jsQR", "Chart.js"]
    },
    readme: `# Pantai Akkarena — Sistem Reservasi Wisata Online

Sistem reservasi tiket wisata online berbasis Laravel 12 untuk Pantai Akkarena, Makassar.

## Fitur Utama

- **Landing Page Premium** — Hero section, galeri, harga tiket, testimoni, peta lokasi
- **Autentikasi Lengkap** — Register, Login, Forgot Password, 3 Role (Admin, Petugas, Pengunjung)
- **Sistem Reservasi** — Pilih tanggal, kategori & jumlah tiket, cek kuota real-time
- **Pembayaran** — Upload bukti transfer, verifikasi/tolak oleh Admin
- **QR Code Tiket** — Generate QR unik terenkripsi per reservasi
- **Tiket PDF** — Download tiket digital bergaya bioskop/event
- **Sistem Check-in** — Scan QR via kamera atau input manual booking code
- **Dashboard Admin** — Statistik, grafik, manajemen semua data

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Backend | Laravel 12, PHP 8.2+ |
| Database | MySQL 8.0+ |
| Frontend | Blade + Tailwind CSS (CDN) + Alpine.js |
| Auth | Laravel Breeze (Custom) |
| QR Code | simplesoftwareio/simple-qrcode |
| PDF | barryvdh/laravel-dompdf |
| JS Scanner | jsQR library |
| Charts | Chart.js |

## Akun Demo

| Role | Email | Password |
|---|---|---|
| Admin | admin@akkarena.com | password |
| Petugas Check-in | petugas@akkarena.com | password |
| Pengunjung | ahmad@example.com | password |

## Instalasi

\`\`\`bash
composer install
cp .env.example .env && php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
\`\`\``
  },
  {
    id: "ruangbaca",
    title: "RuangBaca",
    subtitle: "Platform Review & Koleksi Buku Pribadi",
    desc: "Platform membaca pribadi yang hangat dan modern. Kelola koleksi buku, lacak progress membaca per halaman, log sesi harian, tulis review dengan mood tag, wishlist, custom bookshelf, reading streak, dan rekomendasi berbasis mood.",
    status: "done",
    progress: 100,
    github: "https://github.com/abdkupang/ruangbaca",
    hasMobile: true,
    folder: "ruangbaca",
    featured: true,
    tags: {
      primary: ["Next.js 15", "Supabase", "TypeScript"],
      full: ["Next.js 15", "TypeScript", "Tailwind CSS v3", "ShadCN UI", "Radix UI", "Framer Motion", "GSAP", "Lenis", "Zustand", "TanStack Query v5", "Supabase Auth", "Supabase Storage", "PostgreSQL", "Recharts", "Zod", "reCAPTCHA v3", "Vercel"]
    },
    readme: `# RuangBaca — Platform Review & Koleksi Buku Pribadi

Platform membaca pribadi yang hangat, nyaman, dan modern. Kelola koleksi buku, lacak progress membaca, tulis review, dan temukan buku baru bersama komunitas.

## Fitur User

- Koleksi buku pribadi dengan status (Sedang Dibaca / Selesai / Wishlist / Belum Dimulai)
- Reading progress tracker per halaman
- Log sesi membaca harian dengan durasi & catatan
- Rating & review dengan mood tag, spoiler warning, kutipan favorit
- Wishlist & favorite books
- Custom bookshelf (rak virtual)
- Reading streak & statistik bulanan
- Target membaca tahunan
- Mood-based recommendation (rule-based engine)

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3, ShadCN UI, Radix UI |
| Animation | Framer Motion, GSAP, Lenis |
| State | Zustand, TanStack Query v5 |
| Backend | Supabase (Auth, DB, Storage, Realtime) |
| Database | PostgreSQL (via Supabase) |
| Charts | Recharts |
| Security | reCAPTCHA v3, Rate Limiting, XSS Protection |

## Database Schema

| Tabel | Keterangan |
|-------|-----------|
| profiles | Extended user data |
| books | Katalog buku |
| user_books | Koleksi buku per user (status, progress) |
| reviews | Review & rating buku |
| bookshelves | Custom rak buku per user |
| reading_sessions | Log sesi membaca harian |
| reading_goals | Target membaca tahunan |

## Instalasi

\`\`\`bash
git clone https://github.com/abdkupang/ruangbaca.git
npm install && cp .env.local.example .env.local
# Isi Supabase URL, anon key, reCAPTCHA keys
# Jalankan migration di Supabase SQL Editor
npm run dev
\`\`\``
  }
];

// Personal info
const PERSON = {
  name: "Abdillah Mukhair Ismail",
  initials: "AMI",
  title: "Full-Stack Web Developer",
  subtitle: "AI-Powered Coder",
  bio: "Lulusan S1 Teknik Informatika Universitas Dipa Makassar. Passionate membangun aplikasi web modern dengan memanfaatkan AI sebagai mitra development — pendekatan yang dikenal sebagai Vibes Coding.",
  bio2: "Pengalaman meliputi magang di Komdigi (sistem jadwal & buku tamu digital berbasis Laravel) dan menjadi asisten dosen selama 1 semester. Tugas akhir membangun Sistem Manajemen Kelas Sepak Bola dengan algoritma K-Means untuk FS31 Soccer School.",
  email: "abdkupang46@gmail.com",
  github: "https://github.com/abdkupang",
  location: "Makassar, Indonesia",
  born: "Kupang, 21 Des 2004",
  university: "Univ. Dipa Makassar",
  major: "S1 Teknik Informatika",
  stats: { exp: "2+", projects: "22+", clients: "10+" }
};

const SKILLS = [
  { name: "HTML / CSS", pct: 90 },
  { name: "PHP / MySQL", pct: 84 },
  { name: "JavaScript / TypeScript", pct: 80 },
  { name: "Next.js / React", pct: 76 },
  { name: "API Integration", pct: 74 },
  { name: "Laravel", pct: 70 },
  { name: "Node.js / NestJS", pct: 66 },
  { name: "Vue.js", pct: 62 },
  { name: "Docker / DevOps", pct: 55 },
  { name: "AI / ML Integration", pct: 60 },
];

/* Expose to window for cross-file access */
window.PROJECTS = PROJECTS;
window.SKILLS   = SKILLS;
window.PERSON   = PERSON;
