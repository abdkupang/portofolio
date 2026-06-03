# 🏕️ CampRent — Sistem Penyewaan Alat Camping

![PHP](https://img.shields.io/badge/PHP-8.0+-777BB4?style=flat&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Composer](https://img.shields.io/badge/Composer-885630?style=flat&logo=composer&logoColor=white)

Aplikasi web berbasis PHP untuk manajemen penyewaan alat camping secara online. Dilengkapi dengan panel admin dan halaman pelanggan yang responsif.

## ✨ Fitur Utama

### 👤 Pelanggan
- Registrasi & login dengan verifikasi email
- Reset password via email
- Katalog alat camping dengan gambar & detail lengkap
- Keranjang belanja (cart) & checkout
- Upload bukti pembayaran
- Riwayat pemesanan & tracking status

### 🛠️ Admin
- Dashboard statistik (total alat, pemesanan, pendapatan)
- CRUD alat camping & kategori
- Manajemen gambar alat (multi-gambar)
- Verifikasi pembayaran pelanggan
- Laporan pemesanan & pendapatan (cetak PDF)
- Manajemen pengguna
- Log maintenance alat

## 📋 Prasyarat

- **PHP** >= 8.0
- **MySQL** >= 8.0
- **Composer** (untuk dependency management)
- **Web Server** (Apache/Nginx/Laragon)

## 🚀 Cara Install

1. **Clone repository**
   ```bash
   git clone https://github.com/USERNAME/penyewaan-alat-camp.git
   cd penyewaan-alat-camp
   ```

2. **Install dependency PHP**
   ```bash
   composer install
   ```

3. **Buat database**
   - Buat database baru bernama `db_penyewaan_alat_camp`
   - Import file `db_penyewaan_alat_camp.sql`
   ```bash
   mysql -u root -p db_penyewaan_alat_camp < db_penyewaan_alat_camp.sql
   ```

4. **Konfigurasi koneksi database**
   ```bash
   cp conn.example.php conn.php
   ```
   Edit `conn.php` dan isi kredensial database Anda.

5. **Konfigurasi SMTP Email** (opsional)
   - Edit konfigurasi SMTP di `login.php` dan `register.php`
   - Sesuaikan `Username` dan `Password` dengan akun Gmail Anda
   - Pastikan *App Password* diaktifkan di Google Account

6. **Jalankan aplikasi**
   - Akses melalui browser: `http://localhost/penyewaan_alat_camp/`

## 📁 Struktur Folder

```
penyewaan_alat_camp/
├── admin/                  # Panel admin
│   ├── dashboard.php       # Dashboard statistik
│   ├── alat.php            # CRUD alat camping
│   ├── kategori.php        # CRUD kategori
│   ├── gambar_alat.php     # Manajemen gambar alat
│   ├── pemesanan.php       # Manajemen pemesanan
│   ├── pembayaran.php      # Verifikasi pembayaran
│   ├── pengguna.php        # Manajemen pengguna
│   ├── maintenance.php     # Log maintenance alat
│   ├── laporan_pemesanan.php
│   ├── laporan_pendapatan.php
│   ├── cetak_pemesanan.php
│   ├── cetak_pendapatan.php
│   ├── profil.php
│   ├── ubah_password.php
│   └── sidebar.php
├── pelanggan/              # Halaman pelanggan
│   ├── dashboard.php       # Katalog alat
│   ├── product_detail.php  # Detail produk
│   ├── add_to_cart.php     # Tambah ke keranjang
│   ├── cart.php            # Keranjang belanja
│   ├── checkout.php        # Checkout & pemesanan
│   ├── payment_upload.php  # Upload bukti bayar
│   ├── orders.php          # Riwayat pesanan
│   └── profile.php         # Profil pelanggan
├── uploads/                # File upload (gitignored)
│   ├── alat/               # Gambar alat camping
│   └── payments/           # Bukti pembayaran
├── assets/                 # Asset statis
├── conn.example.php        # Template koneksi database
├── db_penyewaan_alat_camp.sql  # Database SQL dump
├── index.php               # Entry point (redirect ke login)
├── login.php               # Halaman login
├── register.php            # Halaman registrasi
├── verifikasi.php          # Verifikasi email
├── reset_password.php      # Reset password
├── logout.php              # Logout handler
├── composer.json           # Dependency PHP
└── LICENSE                 # Lisensi MIT
```

## 🔑 Akun Default

| Role      | Email                | Password     |
|-----------|----------------------|--------------|
| Admin     | admin@gmail.com      | admin        |
| Pelanggan | pelanggan@gmail.com  | pelanggan    |

> ⚠️ **Penting:** Segera ganti password default setelah instalasi!

## 🛡️ Teknologi

- **Backend:** PHP 8, MySQLi
- **Frontend:** HTML5, TailwindCSS (CDN), JavaScript
- **Email:** PHPMailer (SMTP Gmail)
- **Database:** MySQL 8.0

## 📄 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by CampRent Indonesia
</p>
