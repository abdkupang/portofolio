# 👟 SepatuStore

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Aplikasi web e-commerce toko sepatu online berbasis **PHP** dan **MySQL**. Dibangun sebagai sistem penjualan sepatu lengkap dengan panel admin, panel pelanggan, katalog produk, dan sistem pembayaran.

---

## ✨ Fitur

### 🛒 Pelanggan
- Registrasi & Login akun pelanggan
- Melihat katalog produk berdasarkan kategori
- Detail produk lengkap (harga, stok, ukuran, warna)
- Sistem pemesanan & pembayaran
- Dashboard pelanggan dengan riwayat pesanan
- Pengaturan profil akun

### 🔧 Admin
- Dashboard admin dengan statistik penjualan
- Kelola produk (tambah, edit, hapus)
- Kelola pengguna (admin & pelanggan)
- Kelola data penjualan
- Unduh laporan penjualan (Excel)

---

## 📁 Struktur Proyek

```
sepatu/
├── admin/                  # Panel admin
│   ├── dashboard.php       # Dashboard statistik
│   ├── kelola_produk.php   # Manajemen produk
│   ├── kelola_pengguna.php # Manajemen pengguna
│   ├── kelola_penjualan.php# Manajemen penjualan
│   ├── laporan.php         # Halaman laporan
│   ├── unduh_laporan.php   # Unduh laporan Excel
│   ├── tambah_produk.php   # Form tambah produk
│   ├── edit_produk.php     # Form edit produk
│   ├── edit_pengguna.php   # Form edit pengguna
│   ├── edit_penjualan.php  # Form edit penjualan
│   └── sidebar.php         # Navigasi sidebar
├── assets/
│   ├── image/              # Gambar produk
│   ├── banner.php          # Komponen banner
│   ├── footer.php          # Komponen footer
│   └── navbar.php          # Komponen navbar
├── pelanggan/              # Panel pelanggan
│   ├── dashboard.php       # Dashboard pelanggan
│   ├── pesanan.php         # Riwayat pesanan
│   ├── laporan.php         # Laporan pelanggan
│   ├── pengaturan.php      # Pengaturan profil
│   └── sidebar.php         # Navigasi sidebar
├── index.php               # Halaman utama
├── login.php               # Halaman login
├── register.php            # Halaman registrasi
├── detail_produk.php       # Detail produk
├── kategori.php            # Halaman kategori
├── produk.php              # Daftar produk
├── pesanan.php             # Halaman pesanan
├── bayar.php               # Halaman pembayaran
├── pembayaran.php          # Proses pembayaran
├── pembayaran_sukses.php   # Konfirmasi pembayaran sukses
├── koneksi.example.php     # Template konfigurasi database
├── penjualansepatu.sql     # File database SQL
├── LICENSE                 # Lisensi MIT
└── README.md               # Dokumentasi
```

---

## 🛠️ Teknologi

| Teknologi | Keterangan |
|-----------|------------|
| **PHP** | Bahasa pemrograman server-side |
| **MySQL** | Database relasional |
| **HTML/CSS** | Struktur & tampilan halaman |
| **JavaScript** | Interaktivitas client-side |
| **Laragon** | Local development environment |

---

## ⚙️ Instalasi & Konfigurasi

### Prasyarat
- PHP 8.0+
- MySQL 8.0+
- Web server (Apache/Nginx) atau **Laragon**

### Langkah Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/USERNAME/sepatu.git
   ```

2. **Pindahkan ke direktori web server:**
   ```bash
   # Contoh untuk Laragon:
   cp -r sepatu/ C:/laragon/www/
   ```

3. **Buat database:**
   - Buka **phpMyAdmin** atau MySQL CLI
   - Buat database baru bernama `penjualansepatu`
   - Import file `penjualansepatu.sql`
   ```sql
   CREATE DATABASE penjualansepatu;
   USE penjualansepatu;
   SOURCE penjualansepatu.sql;
   ```

4. **Konfigurasi database:**
   ```bash
   cp koneksi.example.php koneksi.php
   ```
   Edit `koneksi.php` dan sesuaikan kredensial database Anda:
   ```php
   $host = 'localhost';
   $username = 'root';
   $password = '';
   $database = 'penjualansepatu';
   ```

5. **Akses aplikasi:**
   ```
   http://localhost/sepatu/
   ```

---

## 🗄️ Struktur Database

Aplikasi menggunakan database `penjualansepatu` dengan tabel berikut:

| Tabel | Deskripsi |
|-------|-----------|
| `admin` | Data administrator sistem |
| `pelanggan` | Data pelanggan terdaftar |
| `produk` | Katalog produk sepatu |
| `kategori` | Kategori produk (Lari, Gunung, Sekolah, Futsal, Casual, Formal) |
| `pesanan` | Data pesanan pelanggan |

---

## 📸 Kategori Produk

| Kategori | Deskripsi |
|----------|-----------|
| 🏃 Sepatu Lari | Untuk keperluan berlari dan olahraga |
| ⛰️ Sepatu Gunung | Untuk mendaki dan kegiatan outdoor |
| 🎒 Sepatu Sekolah | Untuk aktivitas sehari-hari di sekolah |
| ⚽ Sepatu Futsal | Untuk olahraga futsal di lapangan indoor |
| 👟 Sepatu Casual | Untuk penggunaan sehari-hari santai |
| 👞 Sepatu Formal | Untuk acara formal atau keperluan kerja |

---

## 🔐 Akun Default

### Admin
| Field | Value |
|-------|-------|
| Username | `kasalle` |
| Password | `kasalle` |

### Pelanggan
| Field | Value |
|-------|-------|
| Username | `daniel` |
| Password | `daniel` |

> ⚠️ **Peringatan:** Segera ubah password default setelah instalasi!

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — lihat file [LICENSE](LICENSE) untuk detail.

---

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan buat **Pull Request** atau buka **Issue** untuk melaporkan bug dan saran perbaikan.

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b fitur/FiturBaru`)
3. Commit perubahan (`git commit -m 'Menambahkan FiturBaru'`)
4. Push ke branch (`git push origin fitur/FiturBaru`)
5. Buat Pull Request
