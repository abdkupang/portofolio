# 🏥 SIMRS Sinar Kasih Tana Toraja

<div align="center">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/FontAwesome-339AF0?style=for-the-badge&logo=FontAwesome&logoColor=white" alt="FontAwesome" />
</div>

<br>

**SIMRS (Sistem Informasi Manajemen Rumah Sakit) Sinar Kasih Tana Toraja** adalah platform digital berbasis web yang dirancang khusus untuk mengelola data operasional rumah sakit. Aplikasi ini mempermudah pencatatan rekam medis, manajemen resep obat, pendataan dokter, serta pengelolaan jadwal dan kunjungan pasien secara terintegrasi. 

Dengan antarmuka yang bersih, modern, dan mudah digunakan (User-Friendly), sistem ini membantu meningkatkan efisiensi dan transparansi pelayanan kesehatan.

---

## 🚀 Fitur Unggulan

Aplikasi ini dibagi menjadi 3 hak akses utama (Role), yaitu:

### 1. 👨‍⚕️ Portal Dokter
*   **Melihat Data Pasien:** Dokter dapat mengakses informasi pasien yang ditangani.
*   **Kelola Rekam Medis:** Mencatat hasil diagnosa, keluhan, dan tindakan pada pasien.
*   **Manajemen Resep Obat:** Membuat dan memberikan resep elektronik yang langsung terhubung ke riwayat medis pasien.

### 2. 👩‍💻 Portal Admin
*   **Manajemen Data Master:** Mengelola data pengguna, dokter, obat-obatan, dan poli klinik.
*   **Monitoring Keseluruhan:** Akses penuh ke seluruh rekam medis dan histori pelayanan.
*   **Registrasi & Pengaturan:** Pendaftaran pasien baru dan pengaturan jadwal rumah sakit.

### 3. 🧑‍🦽 Portal Pasien
*   **Riwayat Medis:** Pasien dapat melihat rekam jejak pemeriksaan medis mereka secara transparan.
*   **Riwayat Resep Obat:** Melihat daftar obat yang diresepkan oleh dokter.
*   **Informasi Dokter:** Melihat daftar dokter yang tersedia.

---

## 📂 Struktur Folder Proyek

```text
rekam-medis/
├── admin/                 # Modul dan halaman khusus Administrator
├── assets/                # Aset statis (CSS, JS, Gambar, Icon)
├── config/                # Konfigurasi sistem
│   ├── auth.php           # Pengaturan sesi, otentikasi, dan helper login
│   └── database.php       # Konfigurasi koneksi ke database MySQL
├── database/              # File backup/dump database SQL
│   └── db_rekam_medis.sql # File SQL untuk struktur dan data awal
├── dokter/                # Modul dan halaman khusus Dokter
├── includes/              # File komponen template (header, footer, sidebar)
├── pasien/                # Modul dan halaman khusus Pasien
├── index.php              # Halaman utama (Landing Page)
├── login.php              # Halaman masuk untuk semua role (Multi-Auth)
├── register.php           # Halaman pendaftaran pasien baru
└── logout.php             # Skrip untuk mengakhiri sesi login
```

---

## ⚙️ Persyaratan Sistem (System Requirements)

*   **Web Server:** Apache (termasuk dalam XAMPP / Laragon / WAMP)
*   **PHP:** Versi 7.4 atau lebih baru (Disarankan PHP 8.x)
*   **Database:** MySQL / MariaDB
*   **Web Browser:** Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari (Versi terbaru)

---

## 🛠️ Cara Instalasi & Setup Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di komputer lokal (localhost):

### 1. Persiapan Environment
Pastikan Anda sudah menginstal **Laragon**, **XAMPP**, atau web server lokal lainnya.

### 2. Clone atau Pindahkan File
Pindahkan seluruh folder `rekam-medis` ke dalam direktori server lokal Anda:
*   **Laragon:** `C:\laragon\www\rekam-medis`
*   **XAMPP:** `C:\xampp\htdocs\rekam-medis`

### 3. Import Database
1. Buka aplikasi database manager (seperti phpMyAdmin atau HeidiSQL).
2. Buat database baru dengan nama: `db_rekam_medis`.
3. Lakukan **Import** menggunakan file SQL yang berada di `database/db_rekam_medis.sql`.

### 4. Konfigurasi Database (Jika Diperlukan)
Buka file `config/database.php` menggunakan teks editor (VS Code, Sublime, dll), dan sesuaikan koneksinya jika Anda menggunakan password pada root MySQL Anda:

```php
<?php
$host = "localhost";
$user = "root";
$pass = ""; // Isi password database jika ada
$db   = "db_rekam_medis";
// ...
```

### 5. Jalankan Aplikasi
Buka web browser dan akses URL berikut:
```text
http://localhost/rekam-medis
```

---

## 🔒 Akses Default

*(Catatan: Anda dapat mendaftarkan akun baru melalui halaman `register.php` atau melihat data user langsung di tabel `users` pada database untuk akun admin dan dokter.)*

---

## 🎨 Teknologi yang Digunakan

*   **Backend:** PHP Native
*   **Database:** MySQL
*   **Frontend / UI:** HTML5, CSS3 (Vanilla / Custom CSS)
*   **Interactivity:** JavaScript (ES6)
*   **Icons & Typography:** FontAwesome 6, Google Fonts (Inter)

---
*Dibuat untuk mempermudah pelayanan dan digitalisasi rekam medis secara modern.* 🚀
