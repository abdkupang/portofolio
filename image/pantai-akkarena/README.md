# 🌊 Pantai Akkarena - Sistem Reservasi Wisata Online

Sistem reservasi tiket wisata online berbasis Laravel 12 untuk Pantai Akkarena, Makassar.

---

## 🚀 Fitur Utama

- **Landing Page Premium** — Hero section, galeri, harga tiket, testimoni, peta lokasi
- **Autentikasi Lengkap** — Register, Login, Forgot Password, 3 Role (Admin, Petugas, Pengunjung)
- **Sistem Reservasi** — Pilih tanggal, kategori & jumlah tiket, cek kuota real-time
- **Pembayaran** — Upload bukti transfer, verifikasi/tolak oleh Admin
- **QR Code Tiket** — Generate QR unik terenkripsi per reservasi
- **Tiket PDF** — Download tiket digital bergaya bioskop/event
- **Sistem Check-in** — Scan QR via kamera atau input manual booking code
- **Dashboard Admin** — Statistik, grafik, manajemen semua data
- **Dashboard Pengunjung** — Riwayat reservasi, download tiket, edit profil
- **Dashboard Petugas** — Scan QR, riwayat check-in harian

---

## 🛠️ Teknologi

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

---

## 📋 Persyaratan Sistem

- PHP >= 8.2
- Composer
- MySQL >= 8.0
- Node.js >= 18 (opsional, untuk asset build)
- Extension PHP: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML

---

## ⚙️ Instalasi

### 1. Clone / Extract Project

```bash
# Extract ZIP
unzip Pantai-Akkarena.zip -d pantai-akkarena
cd pantai-akkarena
```

### 2. Install Dependensi PHP

```bash
composer install
```

### 3. Konfigurasi Environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit file `.env`:

```env
APP_NAME="Pantai Akkarena"
APP_URL=http://localhost:8000
APP_TIMEZONE=Asia/Makassar

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pantai_akkarena
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 4. Buat Database

```sql
CREATE DATABASE pantai_akkarena CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Jalankan Migration & Seeder

```bash
php artisan migrate --seed
```

Atau gunakan file SQL langsung:
```bash
mysql -u root -p pantai_akkarena < database.sql
```

### 6. Buat Storage Link

```bash
php artisan storage:link
```

### 7. Buat Direktori Storage

```bash
mkdir -p storage/app/public/{payments,qrcodes,tickets,avatars}
chmod -R 775 storage bootstrap/cache
```

### 8. Jalankan Server

```bash
php artisan serve
```

Akses: **http://localhost:8000**

---

## 👤 Akun Demo

| Role | Email | Password |
|---|---|---|
| 🔴 Admin | admin@akkarena.com | password |
| 🟡 Petugas Check-in | petugas@akkarena.com | password |
| 🟢 Pengunjung | ahmad@example.com | password |

---

## 🗺️ Struktur URL

| URL | Deskripsi |
|---|---|
| `/` | Landing Page |
| `/login` | Halaman Login |
| `/register` | Halaman Daftar |
| `/dashboard` | Dashboard Pengunjung |
| `/dashboard/reservations` | Daftar Reservasi |
| `/dashboard/reservations/create` | Buat Reservasi Baru |
| `/admin` | Dashboard Admin |
| `/admin/reservations` | Manajemen Reservasi |
| `/admin/tickets` | Manajemen Tiket |
| `/admin/users` | Manajemen Pengunjung |
| `/admin/officers` | Manajemen Petugas |
| `/checkin` | Dashboard Petugas |
| `/checkin/scan` | Scan QR Code |
| `/checkin/history` | Riwayat Check-in |

---

## 📁 Struktur Project

```
pantai-akkarena/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # Controller admin
│   │   │   ├── Auth/           # Controller autentikasi
│   │   │   ├── Checkin/        # Controller petugas
│   │   │   ├── Visitor/        # Controller pengunjung
│   │   │   └── HomeController.php
│   │   └── Middleware/
│   │       ├── RoleMiddleware.php
│   │       └── ActiveUserMiddleware.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Role.php
│   │   ├── Reservation.php
│   │   ├── ReservationDetail.php
│   │   ├── TicketCategory.php
│   │   ├── Payment.php
│   │   ├── Checkin.php
│   │   └── Testimonial.php
│   └── Services/
│       ├── ReservationService.php  # Logic reservasi & pembayaran
│       ├── CheckinService.php      # Logic QR check-in
│       └── TicketService.php       # Generate PDF tiket
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── database.sql               # Full SQL dump
├── resources/
│   └── views/
│       ├── admin/                 # Views admin panel
│       ├── auth/                  # Views autentikasi
│       ├── checkin/               # Views petugas
│       ├── components/            # Reusable components
│       ├── layouts/               # Layout templates
│       ├── tickets/               # PDF tiket
│       └── visitor/               # Views pengunjung
├── routes/
│   └── web.php
├── .env.example
├── composer.json
└── README.md
```

---

## 🔒 Keamanan

- CSRF Protection pada semua form POST
- Password hashing dengan Bcrypt (cost 12)
- QR Code terenkripsi menggunakan `encrypt()` Laravel
- Middleware role-based access control
- SQL Injection protection via Eloquent ORM
- XSS protection via Blade templating

---

## 📊 Database Schema

```
roles ──────────── users
                     │
                     ├── reservations ── reservation_details ── ticket_categories
                     │        │
                     │        ├── payments
                     │        └── checkins
                     └── testimonials
```

---

## 🐛 Troubleshooting

**Error: Class not found**
```bash
composer dump-autoload
```

**Error: Key not generated**
```bash
php artisan key:generate
```

**Storage tidak bisa diakses**
```bash
php artisan storage:link
chmod -R 775 storage
```

**Error QR Code**
```bash
composer require simplesoftwareio/simple-qrcode
# Pastikan GD atau Imagick extension aktif
```

**Error PDF**
```bash
composer require barryvdh/laravel-dompdf
```

---

## 📞 Support

**Pantai Akkarena**  
Jl. Penghibur No.1, Losari, Makassar  
📞 (0411) 873 000  
📧 info@akkarena.com  
🌐 www.akkarena.com

---

*Sistem ini dibangun dengan Laravel 12 dan dirancang untuk production-ready deployment.*
