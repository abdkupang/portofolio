# 🏪 Toko Sembako — Sistem Penjualan & Manajemen Stok

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

Aplikasi web berbasis PHP untuk manajemen toko sembako dengan fitur penjualan, manajemen stok, dan pengelolaan gudang. Mendukung 3 peran pengguna: **Admin**, **Pelanggan**, dan **Gudang**.

---

## 📸 Fitur Utama

### 🔐 Autentikasi
- Login & registrasi pelanggan
- Manajemen sesi berbasis role (Admin, Pelanggan, Gudang)
- Password hashing menggunakan `password_hash()`

### 👨‍💼 Panel Admin
- **Dashboard** — Statistik pengguna, barang, stok menipis, transaksi hari ini, dan grafik penjualan mingguan
- **Data Barang** — CRUD barang dengan upload gambar
- **Data User** — Kelola pengguna dan status akun
- **Kelola Pesanan** — Konfirmasi dan proses pesanan pelanggan
- **Stok** — Monitoring stok dan permintaan restok ke gudang
- **Penjualan** — Riwayat penjualan dengan detail transaksi
- **Laporan** — Cetak laporan penjualan per periode

### 🛒 Panel Pelanggan
- **Dashboard** — Ringkasan pesanan pelanggan
- **Belanja** — Jelajahi dan tambahkan barang ke keranjang
- **Pesan Barang** — Checkout dan pemesanan barang
- **Pesanan** — Lacak status pesanan
- **Profil** — Edit data profil pelanggan

### 🏭 Panel Gudang
- **Dashboard** — Ringkasan aktivitas gudang
- **Stok Barang** — Monitoring stok barang
- **Pembelian** — Riwayat pembelian barang
- **Pengiriman** — Kelola pengiriman barang ke toko
- **Laporan** — Cetak laporan stok dan pengiriman

---

## 🛠️ Teknologi

| Komponen       | Teknologi                          |
| -------------- | ---------------------------------- |
| Backend        | PHP 8.x                           |
| Database       | MySQL 8.0                          |
| Frontend       | HTML, Tailwind CSS (CDN)           |
| Grafik         | Chart.js                           |
| Server Lokal   | Laragon / XAMPP / WAMP             |

---

## 📋 Persyaratan Sistem

- PHP >= 8.0
- MySQL >= 5.7
- Web server (Apache/Nginx)
- Ekstensi PHP: `mysqli`, `session`

---

## 🚀 Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/abdkupang/toko_sembako.git
   ```

2. **Pindahkan ke direktori web server**
   ```bash
   # Laragon
   cp -r toko_sembako/ C:/laragon/www/

   # XAMPP
   cp -r toko_sembako/ C:/xampp/htdocs/
   ```

3. **Buat database**
   - Buka phpMyAdmin atau MySQL CLI
   - Buat database baru dengan nama `toko_sembako`
   - Import file `toko_sembako.sql`

4. **Konfigurasi koneksi database**
   - Salin `koneksi.example.php` menjadi `koneksi.php`
   - Sesuaikan kredensial database:
     ```php
     $host = "localhost";
     $user = "root";
     $pass = "";
     $db   = "toko_sembako";
     ```

5. **Akses aplikasi**
   ```
   http://localhost/toko_sembako/
   ```

---

## 👤 Akun Default

| Role      | Username    | Password  |
| --------- | ----------- | --------- |
| Admin     | elsi        | (sesuai)  |
| Gudang    | akmal       | (sesuai)  |
| Pelanggan | pelanggan   | (sesuai)  |

> **Catatan:** Password di-hash menggunakan `password_hash()`. Silakan registrasi akun baru atau reset password melalui database.

---

## 📁 Struktur Proyek

```
toko_sembako/
├── admin/                  # Panel admin
│   ├── dashboard.php       # Dashboard admin + grafik
│   ├── data_barang.php     # CRUD barang
│   ├── data_user.php       # Kelola pengguna
│   ├── kelola_pesanan.php  # Kelola pesanan
│   ├── stok.php            # Manajemen stok
│   ├── penjualan.php       # Riwayat penjualan
│   ├── laporan.php         # Laporan penjualan
│   ├── cetak_laporan.php   # Cetak laporan
│   ├── cetak_penjualan.php # Cetak penjualan
│   ├── lihat_detail_pesanan.php
│   └── sidebar.php         # Sidebar navigasi
├── pelanggan/              # Panel pelanggan
│   ├── dashboard.php       # Dashboard pelanggan
│   ├── belanja.php         # Halaman belanja
│   ├── pesan_barang.php    # Form pemesanan
│   ├── pesanan.php         # Daftar pesanan
│   ├── profil.php          # Edit profil
│   └── sidebar.php
├── gudang/                 # Panel gudang/supplier
│   ├── dashboard.php       # Dashboard gudang
│   ├── stok_barang.php     # Stok barang
│   ├── pembelian.php       # Riwayat pembelian
│   ├── detail_pembelian.php
│   ├── pengiriman.php      # Manajemen pengiriman
│   ├── proses_pengiriman.php
│   ├── proses_kirim_pesanan.php
│   ├── ajukan_pengiriman.php
│   ├── laporan.php         # Laporan gudang
│   ├── cetak_laporan.php
│   └── sidebar.php
├── gambar/
│   ├── assets/             # Asset gambar (bg, side image)
│   └── barang/             # Upload gambar barang
├── index.php               # Redirect ke login
├── login.php               # Halaman login
├── register.php            # Halaman registrasi
├── koneksi.php             # Konfigurasi database (jangan di-commit)
├── koneksi.example.php     # Template konfigurasi database
├── toko_sembako.sql        # Database SQL dump
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📊 Skema Database

Aplikasi menggunakan **8 tabel** utama:

- `user` — Data pengguna (Admin, Pelanggan, Gudang)
- `barang` — Data produk/barang
- `transaksi` — Transaksi penjualan
- `detail_transaksi` — Detail item per transaksi
- `gudang` — Data gudang/supplier
- `permintaan_restok` — Permintaan restok barang
- `riwayat_stok` — Riwayat perubahan stok
- `laporan_penjualan` — Laporan penjualan
- `stok_menipis` (VIEW) — Barang dengan stok ≤ 5

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan buat **Pull Request** atau buka **Issue** untuk diskusi.

1. Fork repository ini
2. Buat branch fitur (`git checkout -b fitur/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur/fitur-baru`)
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 📬 Kontak

Jika ada pertanyaan atau saran, silakan hubungi melalui [GitHub Issues](https://github.com/abdkupang/toko_sembako/issues).
