# 📚 KomikStation

**KomikStation** adalah platform baca komik online gratis dengan desain modern bertema gelap (dark mode). Dibangun menggunakan **PHP Native** dan **MySQL**, platform ini mendukung koleksi Manga 🇯🇵, Manhwa 🇰🇷, dan Manhua 🇨🇳.

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Fitur Utama

- 🎨 **Desain Premium Dark Mode** — UI modern dengan glassmorphism, gradient neon, dan animasi halus
- 🔍 **Pencarian Komik** — Cari komik berdasarkan judul dengan pencarian real-time
- 📖 **Reader Komik** — Baca chapter komik langsung di browser
- 🏷️ **Filter & Kategori** — Jelajahi berdasarkan genre, origin (Manga/Manhwa/Manhua), dan status
- ⭐ **Rating & Komentar** — Pengguna bisa memberikan rating dan komentar pada komik
- 🔖 **Bookmark** — Simpan komik favorit untuk dibaca nanti
- 👤 **Profil Pengguna** — Halaman profil dengan riwayat aktivitas
- ⚙️ **Admin Panel** — Kelola komik, chapter, dan pengguna

---

## 🖼️ Tampilan

### Homepage
Tampilan utama dengan hero slider, komik terbaru, terlaris, dan kategori berdasarkan origin.

### Comic Detail
Halaman detail komik dengan sinopsis, genre, rating, daftar chapter, dan komentar dari pengguna.

### Reader
Halaman baca komik yang clean dan nyaman untuk membaca chapter.

---

## 🛠️ Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **Backend** | PHP 8.x (Native) |
| **Database** | MySQL / MariaDB |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Server** | Laragon / XAMPP / Apache |
| **Font** | Inter (Google Fonts) |

---

## 🚀 Instalasi

### Prasyarat

- PHP 8.0 atau lebih baru
- MySQL / MariaDB
- Apache Web Server (Laragon / XAMPP)

### Langkah-langkah

1. **Clone repository**

   ```bash
   git clone https://github.com/abdkupang/komikstation.git
   ```

2. **Pindahkan ke direktori web server**

   ```bash
   # Laragon
   cp -r komikstation/ C:/laragon/www/

   # XAMPP
   cp -r komikstation/ C:/xampp/htdocs/
   ```

3. **Setup database**

   Buka browser dan akses:

   ```
   http://localhost/komikstation/setup.php
   ```

   Script ini akan otomatis:
   - Membuat database `komikstation`
   - Membuat semua tabel yang diperlukan
   - Mengisi data sample (12 komik populer, genre, chapter, dll.)

4. **Buka aplikasi**

   ```
   http://localhost/komikstation/
   ```

### Default Login

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin` |
| User | `user` | `user` |

---

## 📁 Struktur Proyek

```
komikstation/
├── admin/                  # Panel admin
│   ├── index.php           # Dashboard admin
│   ├── comics.php          # Kelola komik (CRUD)
│   ├── chapters.php        # Kelola chapter
│   ├── users.php           # Kelola pengguna
│   ├── header.php          # Header admin
│   └── footer.php          # Footer admin
├── api/                    # API endpoints
│   ├── bookmark.php        # API bookmark (add/remove)
│   ├── comment.php         # API komentar (add/delete)
│   └── rate.php            # API rating
├── assets/
│   ├── css/
│   │   └── style.css       # Stylesheet utama (dark theme)
│   └── js/
│       └── main.js         # JavaScript utama
├── config/
│   └── database.php        # Konfigurasi database & helper functions
├── includes/
│   ├── header.php          # Header & navbar
│   ├── footer.php          # Footer & scripts
│   └── auth.php            # Middleware autentikasi
├── index.php               # Homepage
├── browse.php              # Jelajahi komik
├── comic.php               # Detail komik
├── reader.php              # Baca chapter
├── search.php              # Hasil pencarian
├── profile.php             # Profil pengguna
├── login.php               # Halaman login
├── register.php            # Halaman register
├── logout.php              # Proses logout
├── setup.php               # Script setup database
├── .htaccess               # Konfigurasi Apache
└── README.md               # Dokumentasi
```

---

## 📊 Database Schema

```
users          → Pengguna (admin & user)
comics         → Data komik
genres         → Daftar genre
comic_genre    → Relasi komik-genre (many-to-many)
chapters       → Chapter komik
pages          → Halaman/gambar per chapter
ratings        → Rating komik oleh user
comments       → Komentar komik
bookmarks      → Bookmark/favorit komik
```

---

## 🎨 Desain

KomikStation menggunakan desain dark theme premium dengan:

- **Warna utama**: Cyan neon (`#00f0ff`) dan Ungu (`#7c3aed`)
- **Background**: Deep navy (`#0a0a14`)
- **Efek**: Glassmorphism, gradient, hover animations
- **Typography**: Inter (Google Fonts)
- **Responsive**: Mendukung desktop, tablet, dan mobile

---

## 🏷️ Tags

`php` `php-native` `mysql` `mariadb` `vanilla-css` `html5` `vanilla-javascript` `dark-theme` `manga-reader` `komik-online` `glassmorphism` `responsive-design`

---

## 📝 Lisensi

Project ini dilisensikan di bawah **MIT License** — lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan berkontribusi.

Pastikan juga untuk membaca [Kode Etik](CODE_OF_CONDUCT.md) kami.

---

## 🔒 Keamanan

Untuk melaporkan kerentanan keamanan, silakan baca [SECURITY.md](SECURITY.md).

---

## 👨‍💻 Author

**Abdillah Mukhair Ismail**

- GitHub: [@abdkupang](https://github.com/abdkupang)
- Email: abdkupang46@gmail.com

---

<p align="center">
  Made with ❤️ and ☕ by Abdillah
</p>
