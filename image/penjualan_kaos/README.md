# 👕 Penjualan Kaos

![PHP](https://img.shields.io/badge/PHP-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-%23FF6384.svg?style=for-the-badge&logo=chartdotjs&logoColor=white)

Sistem informasi penjualan kaos online berbasis **PHP Native** dengan antarmuka modern menggunakan **Tailwind CSS**. Aplikasi ini mencakup panel pelanggan dan panel admin yang lengkap.

---

## ✨ Fitur

### 🛒 Panel Pelanggan
- Registrasi & login dengan verifikasi email (PHPMailer)
- Reset password via email
- Katalog produk dengan pencarian
- Detail produk & varian (ukuran, warna)
- Keranjang belanja
- Checkout dengan pilihan alamat pengiriman
- Pembayaran (Transfer Bank, COD, E-Wallet, QRIS)
- Riwayat pesanan
- Manajemen profil & alamat

### 🔧 Panel Admin
- Dashboard dengan statistik & grafik penjualan (Chart.js)
- Manajemen produk & varian
- Manajemen pesanan
- Konfirmasi pembayaran
- Manajemen pengguna & admin
- Laporan penjualan & cetak laporan
- Pengaturan toko

---

## 🛠️ Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Backend | PHP 8.x (Native) |
| Database | MySQL 8.0 |
| Frontend | HTML, Tailwind CSS (CDN), JavaScript |
| Email | PHPMailer 6.x |
| Chart | Chart.js |
| Server | Laragon / XAMPP / WAMP |

---

## 📦 Instalasi

### Prasyarat
- PHP 8.0+
- MySQL 8.0+
- Composer
- Web server lokal (Laragon / XAMPP / WAMP)

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/abdkupang/penjualan_kaos.git
   ```

2. **Pindahkan** ke direktori web server (contoh: `htdocs` atau `www`)

3. **Import database**
   - Buat database baru dengan nama `db_penjualan_kaos`
   - Import file `db_penjualan_kaos.sql` melalui phpMyAdmin atau CLI:
     ```bash
     mysql -u root -p db_penjualan_kaos < db_penjualan_kaos.sql
     ```

4. **Konfigurasi koneksi database**
   - Salin `conn.example.php` menjadi `conn.php`
   - Sesuaikan kredensial database di `conn.php`:
     ```php
     $host = "localhost";
     $user = "root";
     $pass = "";
     $db   = "db_penjualan_kaos";
     ```

5. **Install dependensi PHP**
   ```bash
   composer install
   ```

6. **Konfigurasi email (opsional)**
   - Edit pengaturan SMTP di `login.php` untuk fitur verifikasi dan reset password

7. **Akses aplikasi**
   ```
   http://localhost/penjualan_kaos/
   ```

---

## 📁 Struktur Proyek

```
penjualan_kaos/
├── admin/                  # Panel admin
│   ├── dashboard.php       # Dashboard statistik
│   ├── produk.php          # Manajemen produk
│   ├── produk_varian.php   # Manajemen varian produk
│   ├── pesanan.php         # Manajemen pesanan
│   ├── pembayaran.php      # Konfirmasi pembayaran
│   ├── users.php           # Manajemen pengguna
│   ├── admins.php          # Manajemen admin
│   ├── laporan.php         # Laporan penjualan
│   ├── laporan_print.php   # Cetak laporan
│   ├── settings.php        # Pengaturan toko
│   └── sidebar.php         # Sidebar navigasi
├── pelanggan/              # Panel pelanggan
│   ├── dashboard.php       # Beranda toko
│   ├── produk.php          # Katalog produk
│   ├── produk_detail.php   # Detail produk
│   ├── keranjang.php       # Keranjang belanja
│   ├── checkout.php        # Proses checkout
│   ├── payment.php         # Pembayaran
│   ├── riwayat.php         # Riwayat pesanan
│   ├── profil.php          # Profil pengguna
│   ├── alamat.php          # Alamat pengiriman
│   └── add_to_cart.php     # Tambah ke keranjang
├── assets/                 # File aset (gambar)
├── uploads/                # Upload file (produk, bukti bayar)
├── conn.php                # Koneksi database
├── conn.example.php        # Template koneksi
├── index.php               # Redirect ke login
├── login.php               # Halaman login
├── register.php            # Halaman registrasi
├── aktivasi.php            # Aktivasi akun via email
├── logout.php              # Logout
├── db_penjualan_kaos.sql   # File SQL database
├── composer.json           # Dependensi PHP
└── .gitignore              # File yang diabaikan Git
```

---

## 👤 Akun Default

| Role | Email | Password |
|------|-------|----------|
| Admin | putriadmin@gmail.com | *(sesuai saat registrasi)* |
| Pelanggan | putripelanggan@gmail.com | *(sesuai saat registrasi)* |

---

## 📸 Screenshot

> *Screenshot akan ditambahkan kemudian.*

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 👨‍💻 Author

**Abdillah** — [@abdkupang](https://github.com/abdkupang)
