# FS 31 Soccer School - Sistem Manajemen Kelas Sepak Bola

Sistem Manajemen Kelas Sepak Bola untuk FS 31 Soccer School, sebuah sekolah sepak bola di Makassar. Aplikasi web ini dibangun menggunakan **PHP Native** dan **MySQL**, dilengkapi dengan berbagai fitur untuk memanajemen data sekolah sepak bola, termasuk pembagian peran untuk Admin, Pelatih, dan Wali murid.

## 🚀 Fitur Utama
- **Landing Page Interaktif**: Menampilkan profil, galeri, jadwal, dan prestasi SSB.
- **Multi-Role Authentication**: Akses login berbeda untuk **Admin**, **Pelatih**, dan **Wali**.
- **Manajemen Data Berbasis PDO**: Keamanan query database menggunakan PHP Data Objects (PDO).
- **Export/Import Excel**: Terintegrasi dengan **PhpSpreadsheet** untuk pengelolaan laporan data excel.
- **Cetak Dokumen PDF**: Terintegrasi dengan **mPDF** untuk mencetak laporan atau dokumen dalam format PDF.

## 🛠️ Teknologi & Tools yang Digunakan
- **Bahasa Pemrograman**: PHP (Native)
- **Database**: MySQL
- **CSS Framework**: Bootstrap 5.3.0
- **Icon Library**: FontAwesome 6.4.0
- **Package Manager**: Composer
- **Library PHP Tambahan**:
  - `phpoffice/phpspreadsheet` (Manajemen Excel)
  - `mpdf/mpdf` (Manajemen PDF)

## 📂 Struktur Folder
```text
fs-31/
├── admin/          # Panel kontrol dan fitur khusus Administrator
├── algoritma/      # Logika algoritma/sistem pendukung aplikasi
├── assets/         # Aset statis seperti CSS, JavaScript, dan Gambar
├── config/         # File konfigurasi utama (database.php, dll)
├── includes/       # Komponen reusable (Header, Footer, Navbar)
├── migrations/     # Skema/migrasi database 
├── pelatih/        # Panel kontrol dan fitur khusus Pelatih
├── uploads/        # Direktori penyimpanan file yang diunggah pengguna
├── vendor/         # Direktori dependensi PHP dari Composer
├── wali/           # Panel kontrol dan fitur khusus Wali Murid
├── fs31_soccer.sql # File dump database lengkap dengan struktur tabel
├── composer.json   # Konfigurasi dependensi project (Composer)
└── *.php           # File PHP untuk halaman publik (landing page, login, dll)
```

## ⚙️ Cara Setup & Menjalankan Proyek Lokal

Berikut adalah langkah-langkah untuk menjalankan aplikasi ini di komputer/server lokal Anda menggunakan **Laragon**, **XAMPP**, atau aplikasi web server serupa:

1. **Persiapan Folder**
   Pindahkan atau clone repositori proyek ini ke dalam direktori server lokal Anda:
   - Laragon: `C:\laragon\www\fs-31`
   - XAMPP: `C:\xampp\htdocs\fs-31`

2. **Instalasi Dependensi PHP**
   Buka terminal atau command prompt pada direktori utama proyek (`fs-31`), kemudian jalankan perintah berikut untuk menginstal package yang dibutuhkan:
   ```bash
   composer install
   ```

3. **Konfigurasi Database**
   - Buka aplikasi manajemen MySQL (seperti **phpMyAdmin** atau **HeidiSQL**).
   - Buat database baru dengan nama `fs31_soccer`.
   - Lakukan **Import** file `fs31_soccer.sql` yang berada di direktori proyek ke dalam database tersebut.

4. **Penyesuaian Konfigurasi (Opsional)**
   Secara default, koneksi database pada `config/database.php` diatur sebagai berikut:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'fs31_soccer');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   ```
   *Jika Anda menggunakan password pada MySQL root, ubah parameter `DB_PASS` di atas sesuai dengan password Anda.*

5. **Jalankan Aplikasi**
   Buka browser dan akses aplikasi melalui URL:
   ```text
   http://localhost/fs-31
   ```

---

**Tags:**
`#PHP` `#PHPNative` `#MySQL` `#Bootstrap5` `#FontAwesome` `#Composer` `#PhpSpreadsheet` `#mPDF` `#WebDevelopment` `#SistemManajemen` `#SoccerSchool` `#SSB`
