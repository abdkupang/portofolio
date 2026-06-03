# Sistem Penjualan Buku Premium

Sistem Penjualan Buku Premium adalah aplikasi berbasis web yang dibangun menggunakan PHP Native (tanpa framework) dengan konsep MVC sederhana melalui custom routing. Aplikasi ini menyediakan fungsionalitas e-commerce lengkap, mulai dari manajemen katalog buku oleh admin hingga proses pemesanan dan checkout oleh pelanggan.

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🗂️ Struktur Proyek

```text
penjualan_buku/
├── admin/                  # Halaman panel kontrol untuk admin (Kelola buku, pesanan, pelanggan)
├── assets/                 # File statis (CSS, JS, Gambar, Font)
├── auth/                   # Modul autentikasi (Login, Register, OTP, Reset Password)
├── config/                 # File konfigurasi (Koneksi Database)
├── customer/               # Halaman khusus pelanggan (Keranjang, Checkout, Riwayat Pesanan)
├── includes/               # Potongan kode yang digunakan berulang (Header, Footer)
├── uploads/                # Direktori penyimpanan file yang diunggah (Gambar cover buku, Bukti bayar)
├── vendor/                 # Dependensi yang diinstal melalui Composer (PHPMailer)
├── .htaccess               # Konfigurasi Apache untuk URL Rewrite
├── index.php               # File utama dan custom router
├── database.sql            # Skema database MySQL dan data awal (dummy data)
├── composer.json           # File manifest Composer
└── ...                     # File tampilan lainnya seperti landing, katalog, profile, dll
```

## 🚀 Cara Set Up (Local Development)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda (menggunakan Laragon, XAMPP, dsb.):

### 1. Kebutuhan Sistem
*   **Web Server**: Apache/Nginx (Rekomendasi: Laragon atau XAMPP)
*   **PHP**: Versi 8.0 atau lebih baru (Disarankan PHP 8.1+)
*   **Database**: MySQL (Disarankan MySQL 8.0+) atau MariaDB
*   **Composer**: Diperlukan untuk menginstal dependensi tambahan (PHPMailer)

### 2. Instalasi Proyek
1.  **Clone atau Pindahkan Folder Proyek**
    Pindahkan folder `penjualan_buku` ke dalam direktori root server lokal Anda (misalnya `C:\laragon\www\` untuk Laragon, atau `C:\xampp\htdocs\` untuk XAMPP).
2.  **Instal Dependensi (Composer)**
    Buka terminal (Command Prompt/PowerShell) arahkan ke direktori proyek, lalu jalankan:
    ```bash
    composer install
    ```

### 3. Konfigurasi Database
1.  Buka phpMyAdmin atau aplikasi manajemen database lainnya.
2.  Buat database baru dengan nama `db_penjualan_buku`.
3.  Import file `database.sql` yang ada di root direktori proyek ke dalam database tersebut.
4.  Buka file `config/database.php` (jika ada, atau sesuaikan file koneksi database Anda) dan pastikan kredensialnya sesuai:
    *   Host: `localhost`
    *   User: `root` (default Laragon/XAMPP)
    *   Password: ` ` (kosong untuk default XAMPP, sesuaikan jika ada password)
    *   Database: `db_penjualan_buku`

### 4. Konfigurasi URL (Base URL)
Secara default, `BASE_URL` diset di `includes/header.php`. Jika Anda tidak menggunakan Laragon Auto Virtual Host (yang otomatis menjadi `http://penjualan_buku.test`), Anda perlu menyesuaikannya:
1.  Buka file `includes/header.php`.
2.  Cari bagian `define('BASE_URL', ...)` dan ubah ke URL lokal Anda, misal: `http://localhost/penjualan_buku`.

### 5. Akses Aplikasi
*   Buka browser dan akses: `http://penjualan_buku.test` (Jika menggunakan Laragon) atau `http://localhost/penjualan_buku` (Jika menggunakan XAMPP biasa).

### Akun Uji Coba (Dummy Account)
*   **Admin**:
    *   Email/Username: `admin` / `admin@tokobuku.com`
    *   Password: *(Silakan cek hash password di tabel users, default dummy bisa disesuaikan atau buat registrasi admin baru jika memungkinkan)*
*   **Customer**:
    *   Email/Username: `customer` / `customer@gmail.com`
    *   Password: *(Cek data di database)*

## 🏷️ Tags / Tech Stack

*   **Language**: `PHP Native` (Versi 8.x)
*   **Database**: `MySQL`
*   **Frontend**: `HTML5`, `CSS3` (Vanilla / Custom CSS), `JavaScript` (Vanilla JS)
*   **Icons**: `FontAwesome` (versi 6.x)
*   **Dependencies Management**: `Composer`
*   **Mailing Library**: `PHPMailer` (Untuk fitur OTP dan Lupa Password)
*   **Architecture**: `Custom MVC Pattern` dengan Single Entry Point (`index.php`)
*   **Category**: `Web Application`, `E-Commerce`, `Book Store`

---
*Dibuat untuk tujuan edukasi dan pengembangan sistem penjualan online.*
