# 🤖 AutoPost — Discord Auto-Message Manager

> Platform SaaS berbasis web untuk mengelola dan mengotomatisasi pengiriman pesan ke channel Discord secara terjadwal, dilengkapi dengan sistem pembayaran, manajemen akun, dan monitoring real-time.

![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?style=flat-square&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat-square&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Discord API](https://img.shields.io/badge/Discord%20API-v10-5865F2?style=flat-square&logo=discord&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Supported-5A0FC8?style=flat-square&logo=pwa&logoColor=white)
![Midtrans](https://img.shields.io/badge/Payment-Midtrans-00A9E0?style=flat-square)
![Fonnte](https://img.shields.io/badge/WhatsApp-Fonnte-25D366?style=flat-square&logo=whatsapp&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Direktori](#-struktur-direktori)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Worker](#-menjalankan-worker)
- [Struktur Database](#-struktur-database)
- [API Endpoints](#-api-endpoints)
- [Sistem Pembayaran](#-sistem-pembayaran)
- [Autentikasi](#-autentikasi)
- [Kontribusi](#-kontribusi)

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🔁 **Auto-Post Terjadwal** | Kirim pesan ke channel Discord secara otomatis dengan interval yang dapat dikustomisasi |
| 🐌 **Slowmode Auto-Detect** | Mendeteksi dan menyesuaikan interval pengiriman secara otomatis mengikuti slowmode Discord |
| 👥 **Multi-Akun Discord** | Kelola beberapa akun Discord dalam satu dashboard |
| 📊 **Dashboard Real-time** | Monitoring aktivitas pengiriman pesan secara langsung via SSE (Server-Sent Events) |
| 💰 **Sistem Langganan** | Integrasi pembayaran dengan Midtrans (QRIS, Transfer Bank, E-Wallet) |
| 🔐 **Login Discord OAuth2** | Autentikasi mudah menggunakan akun Discord |
| 📱 **Progressive Web App (PWA)** | Dapat diinstall sebagai aplikasi di perangkat mobile |
| 📧 **Notifikasi Email** | Email verifikasi dan notifikasi pembayaran otomatis |
| 🛡️ **Panel Admin** | Manajemen pengguna, monitoring sistem, dan kontrol superadmin |
| 📜 **Riwayat Log** | Log lengkap seluruh aktivitas pengiriman pesan |

---

## 🛠 Teknologi

- **Backend**: PHP 8.x (Native, tanpa framework)
- **Database**: MySQL 8.x / MariaDB
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Discord API**: v10 (OAuth2 + Bot Token)
- **Payment Gateway**: [Midtrans](https://midtrans.com)
- **WhatsApp Notifikasi**: [Fonnte API](https://fonnte.com)
- **Email**: PHPMailer / SMTP
- **Real-time**: Server-Sent Events (SSE)
- **PWA**: Web App Manifest + Service Worker

---

## 📁 Struktur Direktori

```
autopost/
├── api/                    # REST API endpoints
│   ├── auth.php            # Endpoint autentikasi
│   ├── autopost-jobs.php   # CRUD autopost jobs
│   ├── dashboard.php       # Data statistik dashboard
│   ├── discord-accounts.php# Manajemen akun Discord
│   ├── logs.php            # Riwayat log
│   ├── midtrans-webhook.php# Webhook pembayaran Midtrans
│   ├── payment.php         # Endpoint pembayaran
│   ├── sse.php             # Server-Sent Events (real-time)
│   └── delete.php          # Endpoint hapus data
├── auth/                   # Autentikasi OAuth2
│   ├── discord-login.php   # Redirect ke Discord OAuth
│   └── discord-callback.php# Callback OAuth2 Discord
├── assets/                 # Static files
│   ├── css/style.css       # Stylesheet utama
│   └── js/app.js           # JavaScript utama
├── includes/               # Library & helpers
│   ├── auth.php            # Middleware autentikasi sesi
│   ├── db.php              # Koneksi database PDO
│   ├── discord.php         # Discord API helper
│   └── mailer.php          # Email helper
├── config.php              # Konfigurasi utama
├── dashboard.php           # Halaman dashboard
├── admin.php               # Panel admin
├── payment.php             # Halaman pembayaran
├── accounts.php            # Manajemen akun Discord
├── logs.php                # Halaman riwayat log
├── login.php               # Halaman login/register
├── worker.php              # Background worker (CLI/Web)
├── autopost.sql            # Skema database
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker PWA
└── .htaccess               # Apache rewrite rules
```

---

## 🖥 Persyaratan Sistem

- **PHP** >= 8.0 dengan ekstensi: `pdo_mysql`, `curl`, `json`, `mbstring`
- **MySQL** >= 8.0 atau **MariaDB** >= 10.4
- **Web Server**: Apache (dengan `mod_rewrite`) atau Nginx
- **Composer** (opsional, untuk dependensi tambahan)
- Akun **Discord Developer** (untuk OAuth2)
- Akun **Midtrans** (untuk payment gateway)

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/abdkupang46/autopost.git
cd autopost
```

### 2. Setup Database

Import skema database ke MySQL:

```bash
mysql -u root -p < autopost.sql
```

Atau buka `phpMyAdmin` → buat database `autopost` → import file `autopost.sql`.

### 3. Konfigurasi Aplikasi

Salin dan edit file konfigurasi:

```bash
cp config.php config.php.bak
```

Edit `config.php` sesuai environment kamu (lihat bagian [Konfigurasi](#-konfigurasi)).

### 4. Jalankan Worker

Untuk mengaktifkan pengiriman pesan otomatis:

```bash
# CLI (direkomendasikan, jalankan terus-menerus)
php worker.php

# Atau via Windows Task Scheduler / cron job
# Setiap 2 detik
* * * * * php /path/to/autopost/worker.php
```

---

## ⚙️ Konfigurasi

Edit file `config.php`:

```php
// === DATABASE ===
define('DB_HOST', 'localhost');
define('DB_NAME', 'autopost');        // Nama database
define('DB_USER', 'root');            // Username MySQL
define('DB_PASS', '');                // Password MySQL

// === APLIKASI ===
define('APP_NAME', 'AutoPost');
define('APP_URL', 'http://localhost/autopost'); // URL aplikasi
define('APP_VERSION', '1.0.0');

// === DISCORD OAUTH2 ===
// Buat aplikasi di: https://discord.com/developers/applications
define('DISCORD_CLIENT_ID', 'YOUR_CLIENT_ID');
define('DISCORD_CLIENT_SECRET', 'YOUR_CLIENT_SECRET');
define('DISCORD_REDIRECT_URI', APP_URL . '/auth/discord-callback.php');

// === PAYMENT GATEWAY (Midtrans) ===
// Daftar di: https://dashboard.midtrans.com
define('MIDTRANS_SERVER_KEY', 'YOUR_SERVER_KEY');
define('MIDTRANS_CLIENT_KEY', 'YOUR_CLIENT_KEY');
define('MIDTRANS_IS_PRODUCTION', false); // true untuk production

// === WHATSAPP NOTIFIKASI (Fonnte) ===
define('FONNTE_TOKEN', 'YOUR_FONNTE_TOKEN');
```

> ⚠️ **PENTING**: Jangan pernah commit `config.php` yang berisi credential asli ke repository publik!

---

## 🔄 Menjalankan Worker

Worker adalah proses background yang bertugas mengirim pesan terjadwal ke Discord.

### Via CLI (Direkomendasikan)

```bash
php worker.php
```

Output:
```
=== AutoPost Worker Started ===
Time: 2026-04-30 13:00:00
Press Ctrl+C to stop.

[13:00:02] Found 3 job(s) to process
[13:00:02] Sending message to channel 123456789 via MyAccount...
[13:00:02] Message sent successfully!
```

### Via Windows (run_worker.bat)

Klik dua kali file `run_worker.bat` atau jalankan:

```batch
run_worker.bat
```

### Via Web (satu siklus)

```
GET /worker.php?key=autopost_secret
```

---

## 🗄 Struktur Database

Tabel utama:

| Tabel | Deskripsi |
|-------|-----------|
| `users` | Data pengguna (email, role, premium_until) |
| `discord_accounts` | Token akun Discord pengguna |
| `autopost_jobs` | Konfigurasi job autopost (channel, pesan, interval) |
| `logs` | Riwayat seluruh aktivitas pengiriman |
| `payments` | Riwayat transaksi pembayaran |

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/dashboard.php` | Statistik dashboard |
| `GET/POST` | `/api/autopost-jobs.php` | Kelola autopost jobs |
| `GET/POST` | `/api/discord-accounts.php` | Kelola akun Discord |
| `GET` | `/api/logs.php` | Riwayat log |
| `POST` | `/api/payment.php` | Buat transaksi pembayaran |
| `POST` | `/api/midtrans-webhook.php` | Webhook notifikasi Midtrans |
| `GET` | `/api/sse.php` | Server-Sent Events (real-time) |
| `GET` | `/api/auth.php` | Info sesi pengguna |

---

## 💳 Sistem Pembayaran

AutoPost menggunakan **Midtrans** sebagai payment gateway dengan dukungan:

- 💳 Kartu Kredit/Debit
- 🏦 Transfer Bank (BCA, BRI, BNI, Mandiri, Permata)
- 📱 QRIS (semua e-wallet)
- 💚 GoPay & ShopeePay

### Setup Webhook Midtrans

Di dashboard Midtrans → Pengaturan → Konfigurasi:
- **Payment Notification URL**: `https://yourdomain.com/api/midtrans-webhook.php`

---

## 🔐 Autentikasi

AutoPost mendukung dua metode login:

1. **Email & Password** — Registrasi dan login dengan email
2. **Discord OAuth2** — Login satu klik dengan akun Discord

### Setup Discord OAuth2

1. Buka [Discord Developer Portal](https://discord.com/developers/applications)
2. Buat aplikasi baru
3. Di menu **OAuth2**, tambahkan Redirect URI: `http://yourdomain.com/auth/discord-callback.php`
4. Salin **Client ID** dan **Client Secret** ke `config.php`

---

## 👥 Role Pengguna

| Role | Kemampuan |
|------|-----------|
| `user` | Akses dashboard, kelola akun & job sendiri (butuh premium) |
| `superadmin` | Akses semua fitur tanpa batas waktu premium |

---

## 🤝 Kontribusi

Pull request sangat diterima! Untuk perubahan besar, harap buka issue terlebih dahulu.

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/NamaFitur`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur X'`)
4. Push ke branch (`git push origin feature/NamaFitur`)
5. Buat Pull Request

---

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Developer

**Abdillah Mukhair Ismail**  
📧 abdkupang46@gmail.com  
🐙 GitHub: [@abdkupang46](https://github.com/abdkupang46)

---

> Made with ❤️ for Discord automation enthusiasts
