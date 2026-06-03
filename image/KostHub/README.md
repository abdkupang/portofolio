# 🏠 KostHub — Platform Informasi & Manajemen Kost

<div align="center">

![KostHub Banner](https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=400&fit=crop&q=80)

**Platform pencarian dan manajemen kost modern — Production-Ready Full-Stack**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![Laravel](https://img.shields.io/badge/Laravel-12-red?logo=laravel)](https://laravel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://docker.com)

</div>

---

## Deskripsi Proyek

KostHub adalah platform properti-tech modern untuk pencarian dan manajemen kost. Dibangun dengan arsitektur full-stack production-grade, mendukung sistem multi-role, pencarian berbasis peta, review terverifikasi, dan dashboard manajemen lengkap.

---

## Fitur Lengkap

### Pencarian & Listing
- Realtime search dengan debounce
- Filter: harga, gender, fasilitas, lokasi, radius
- Sort: terbaru, rating, harga
- Map view interaktif (OpenStreetMap/Leaflet)
- Nearby kost berdasarkan geolocation
- SEO-friendly URL & metadata dinamis

### Kost Detail
- Galeri foto dengan lightbox
- Peta lokasi terintegrasi
- Fasilitas umum & kamar
- Review & rating dengan summary
- CTA booking / hubungi owner
- Sistem favorit

### Multi-Role System
| Role  | Kemampuan |
|-------|-----------|
| Admin | Kelola semua user, moderasi review, monitoring platform |
| Owner | CRUD kost & kamar, upload galeri, kelola booking, reply review |
| User  | Cari kost, favorit, booking survey, tulis review |
| Guest | Browse, search, lihat detail (read-only) |

### Dashboard Owner
- Statistik viewer, favorit, rating
- Grafik tayangan bulanan (Recharts)
- Manajemen kost & kamar CRUD
- Kelola permintaan survey
- Balas review penghuni

### Dashboard Admin
- Statistik platform real-time
- Kelola semua pengguna & suspend
- Moderasi review (approve/reject)
- Monitoring kost aktif
- Activity log
- Kelola kategori fasilitas

---

## Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare CDN/WAF                    │
└─────────────────────────────┬───────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────┐
│                   Nginx Reverse Proxy                    │
│              (Rate Limiting, Security Headers)            │
└──────┬──────────────────────────────────┬───────────────┘
       │                                  │
┌──────▼──────┐                  ┌────────▼────────┐
│  Next.js 15 │                  │  Laravel 12 API │
│  (Frontend) │                  │  (Backend)      │
│  Port 3000  │                  │  Port 8000      │
└─────────────┘                  └────────┬────────┘
                                          │
              ┌───────────────────────────┼──────────┐
              │                           │          │
       ┌──────▼──────┐            ┌───────▼──┐  ┌───▼────┐
       │ PostgreSQL  │            │  Redis   │  │ MinIO  │
       │ (Database)  │            │ (Cache/Q)│  │(Files) │
       └─────────────┘            └──────────┘  └────────┘
```

---

## Role & Permission

```
Admin
├── Kelola semua user (suspend, update role)
├── Monitor semua kost (active/inactive)
├── Moderasi review (approve/reject)
├── Lihat activity log
└── Kelola master fasilitas

Owner
├── CRUD kost milik sendiri
├── CRUD kamar per kost
├── Upload & kelola galeri foto
├── Lihat & balas review
├── Kelola permintaan survey
└── Dashboard statistik

User
├── Cari & filter kost
├── Simpan favorit
├── Tulis review (setelah login)
├── Request survey/booking
└── Kelola profil

Guest
├── Browse kost
├── Search & filter
└── Lihat detail kost (read-only)
```

---

## ERD Database

```
users
├── id, name, email, password, role
├── phone, avatar, google_id
├── is_verified, is_active
└── email_verified_at, timestamps

kosts
├── id, owner_id (→users), slug
├── name, description, address
├── city, district, province
├── latitude, longitude, gender, status
├── min_price, max_price, rules
├── rating_avg, rating_count, viewer_count, favorite_count
└── timestamps

rooms
├── id, kost_id (→kosts)
├── name, type, price, size_m2
├── bathroom_type, status, gender
└── available_count, timestamps

facilities        kost_facilities    room_facilities
├── id            ├── kost_id        ├── room_id
├── name          └── facility_id    └── facility_id
├── icon
└── category

kost_images                room_images
├── id, kost_id            ├── id, room_id
├── url, is_cover, order   ├── url, order
└── timestamps             └── timestamps

kost_reviews
├── id, kost_id, user_id
├── rating, comment, is_approved
├── owner_reply, owner_replied_at
└── timestamps

favorites              booking_requests
├── id, user_id        ├── id, kost_id, room_id, user_id
├── kost_id            ├── status, message, scheduled_at
└── timestamps         └── timestamps

activity_logs          user_notifications
├── id, user_id        ├── id, user_id
├── action             ├── type, title, message
├── entity_type/id     ├── is_read, data
├── ip_address         └── timestamps
└── created_at
```

---

## Implementasi Keamanan

| Mekanisme | Implementasi |
|-----------|--------------|
| Authentication | Laravel Sanctum (Token-based) |
| OAuth | Google OAuth via Laravel Socialite |
| Rate Limiting | Nginx zone + Laravel throttle middleware |
| CSRF Protection | SameSite Cookie + CSRF token |
| XSS Protection | `strip_tags()` + CSP headers |
| SQL Injection | Eloquent ORM + parameterized queries |
| Brute Force | Login attempt counter via Redis cache |
| Anti-spam Review | Unique constraint user+kost |
| Honeypot | Hidden form field untuk bot detection |
| File Upload | Validasi MIME, resize, convert ke WebP |
| Security Headers | X-Frame-Options, X-Content-Type, CSP |
| Role-based Access | Policy & Gate + CheckRole middleware |
| Soft Delete | Data sensitif tidak dihapus permanen |

---

## Tech Stack

### Frontend
| Library | Versi | Kegunaan |
|---------|-------|----------|
| Next.js | 15 | Framework React SSR/SSG |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animasi deklaratif |
| GSAP | 3 | Animasi scroll & mouse |
| Lenis | 1 | Smooth scroll |
| TanStack Query | 5 | Server state management |
| Zustand | 4 | Client state |
| React Hook Form | 7 | Form management |
| Zod | 3 | Schema validation |
| React Leaflet | 4 | Peta interaktif |
| Recharts | 2 | Chart & grafik |
| Lucide React | — | Icon library |

### Backend
| Library | Versi | Kegunaan |
|---------|-------|----------|
| Laravel | 12 | Framework PHP |
| Laravel Sanctum | 4 | API authentication |
| Laravel Socialite | 5 | OAuth Google |
| Laravel Queue | — | Email & job queue |
| Intervention Image | 3 | Image processing |
| Flysystem S3 | 3 | MinIO/S3 storage |
| PostgreSQL | 16 | Database utama |
| Redis | 7 | Cache & queue |

---

## Instalasi & Setup

### Prerequisites
- Node.js 20+
- PHP 8.3+
- Composer 2.7+
- Docker & Docker Compose
- PostgreSQL 16+
- Redis 7+

### Cara 1: Docker (Direkomendasikan)

```bash
# Clone repository
git clone https://github.com/yourusername/kosthub.git
cd kosthub

# Salin env files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example  backend/.env

# Edit backend .env (isi APP_KEY, JWT_SECRET, dll)
# Generate APP_KEY: docker-compose run backend php artisan key:generate

# Build & jalankan semua services
docker-compose up -d --build

# Migrasi database & seed dummy data
docker-compose exec backend php artisan migrate --seed

# Buka browser
# Frontend  : http://localhost:3000
# API       : http://localhost:8000/api
# MinIO UI  : http://localhost:9001
# MailHog   : http://localhost:8025
```

### Cara 2: Manual

#### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local sesuai environment
npm run dev
```

#### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

---

## Environment Setup

### Frontend `.env.local`
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STORAGE_URL=http://localhost:9000/kosthub
NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=your_key
```

### Backend `.env`
```env
APP_NAME=KostHub
APP_KEY=           # php artisan key:generate
JWT_SECRET=        # php artisan jwt:secret
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_DATABASE=kosthub
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AWS_ACCESS_KEY_ID=kosthub
AWS_BUCKET=kosthub
AWS_ENDPOINT=http://localhost:9000
```

---

## Deployment Guide (Ubuntu VPS)

```bash
# 1. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# 2. Clone project
git clone https://github.com/yourusername/kosthub.git /var/www/kosthub
cd /var/www/kosthub

# 3. Setup environment
cp frontend/.env.example frontend/.env.local
cp backend/.env.example  backend/.env
# Edit kedua file .env

# 4. Deploy
docker-compose -f docker-compose.yml up -d --build

# 5. Inisiasi database
docker-compose exec backend php artisan migrate --seed
docker-compose exec backend php artisan config:cache
docker-compose exec backend php artisan route:cache

# 6. Setup MinIO bucket
# Buka http://your-vps:9001 → Login → Buat bucket "kosthub" → Set public

# 7. Setup SSL dengan Certbot (opsional)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d kosthub.id -d www.kosthub.id
```

---

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication
```http
POST /auth/register     # Daftar akun baru
POST /auth/login        # Login
POST /auth/logout       # Logout (requires auth)
GET  /auth/me           # Data user saat ini
```

### Public Endpoints
```http
GET  /kosts             # Daftar kost (+ filter)
GET  /kosts/featured    # Kost unggulan
GET  /kosts/nearby      # Kost terdekat
GET  /kosts/{slug}      # Detail kost
GET  /kosts/{id}/reviews         # Ulasan kost
GET  /kosts/{id}/reviews/summary # Ringkasan rating
GET  /facilities        # Daftar fasilitas
```

### Authenticated
```http
POST   /kosts/{id}/favorite  # Toggle favorit
GET    /user/favorites       # Favorit saya
POST   /kosts/{id}/reviews   # Tulis ulasan
POST   /bookings             # Request survey
```

### Owner (role: owner)
```http
GET/POST       /owner/kosts                    # CRUD kost
GET/PUT/DELETE /owner/kosts/{id}
POST           /owner/kosts/{id}/images        # Upload foto
GET/POST/PUT   /owner/kosts/{id}/rooms/{id}    # CRUD kamar
GET            /owner/reviews/pending          # Ulasan pending
POST           /owner/reviews/{id}/reply       # Balas ulasan
GET/PATCH      /owner/bookings                 # Kelola booking
GET            /owner/stats                    # Statistik
```

### Admin (role: admin)
```http
GET    /admin/stats              # Dashboard stats
GET    /admin/users              # Semua user
POST   /admin/users/{id}/suspend # Suspend user
GET    /admin/kosts              # Semua kost
PATCH  /admin/kosts/{id}/status  # Update status
GET    /admin/reviews            # Semua review
POST   /admin/reviews/{id}/approve
GET    /admin/facilities         # CRUD fasilitas
GET    /admin/logs               # Activity log
```

---

## Struktur Folder

```
KostHub/
├── frontend/
│   ├── src/
│   │   ├── app/                    # Next.js App Router pages
│   │   │   ├── layout.tsx          # Root layout + providers
│   │   │   ├── page.tsx            # Landing page
│   │   │   ├── auth/               # Login, register, verify
│   │   │   ├── kost/               # Listing & detail
│   │   │   └── dashboard/          # Owner & admin dashboard
│   │   ├── components/
│   │   │   ├── landing/            # Hero, features, footer
│   │   │   ├── kost/               # Cards, gallery, rooms, reviews
│   │   │   ├── dashboard/          # Sidebar, topbar
│   │   │   └── shared/             # QueryProvider, ThemeToggle, dll
│   │   ├── features/               # Feature-level components
│   │   │   ├── auth/               # Login & register forms
│   │   │   ├── kost/               # Listing client, filter, grid, map
│   │   │   └── dashboard/          # Owner & admin dashboard
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # API client (Axios)
│   │   ├── services/               # API service functions
│   │   ├── stores/                 # Zustand stores (auth, ui)
│   │   ├── styles/                 # globals.css
│   │   ├── types/                  # TypeScript interfaces
│   │   └── utils/                  # Helper functions
│   └── ...config files
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Auth/           # AuthController, SocialAuthController
│   │   │   │   ├── Public/         # KostController, ReviewController, FacilityController
│   │   │   │   ├── Owner/          # OwnerKost, Room, Review, Booking, Stats
│   │   │   │   └── Admin/          # AdminUser, Kost, Review, Facility, Stats, Log
│   │   │   ├── Middleware/         # CheckRole, RateLimit
│   │   │   └── Requests/           # Form request validation
│   │   ├── Models/                 # Eloquent models
│   │   ├── Policies/               # Authorization policies
│   │   └── Services/               # Business logic layer
│   ├── database/
│   │   ├── migrations/             # Schema definitions
│   │   └── seeders/                # Dummy data seeder
│   └── routes/api.php              # API route definitions
│
├── nginx/
│   ├── nginx.conf
│   └── conf.d/kosthub.conf
│
├── docker-compose.yml
└── README.md
```

---

## Dummy Data (Login Credentials)

| Role  | Email               | Password     |
|-------|---------------------|--------------|
| Admin | admin@kosthub.id    | password123  |
| Owner | budi@owner.test     | password123  |
| Owner | dewi@owner.test     | password123  |
| Owner | ahmad@owner.test    | password123  |
| User  | andi@user.test      | password123  |

### Kost Sample Data
| Nama Kost                    | Lokasi          | Harga         | Gender |
|------------------------------|-----------------|---------------|--------|
| Kost Putra Melati            | Tamalanrea, MKS | 650rb – 1.5jt | Putra  |
| Kost Putri Harmoni           | Panakkukang, MKS| 650rb – 1.5jt | Putri  |
| Kost Exclusive Panakkukang   | Panakkukang, MKS| 750rb – 1.8jt | Campur |

---

## Future Improvements

- [ ] Real-time chat owner ↔ user (Laravel Broadcasting + Pusher)
- [ ] Payment gateway integration (Midtrans/Xendit)
- [ ] Mobile app (React Native / Expo)
- [ ] Push notifications (FCM)
- [ ] AI-powered kost recommendation
- [ ] Virtual tour 360° integration
- [ ] Automated spam detection ML model
- [ ] Multi-language support (i18n)
- [ ] PWA support
- [ ] Advanced analytics dashboard

---

## Tags

#nextjs #laravel #typescript #tailwindcss #postgresql
#kosthub #propertymanagement #kostapp #fullstack
#responsivewebdesign #modernui #mapsintegration
#securewebapp #multirole #realestateplatform
#framermotion #gsap #lenis #zustand #tanstackquery
#shadcnui #reacthookform #zod #leaflet #cloudflare
#docker #nginx #githubactions #jwt #sanctum
#websecurity #ddosprotection #xssprotection
#sqlinjectionprevention #ratelimiting #recaptcha

---

<div align="center">
Made with precision in Indonesia 🇮🇩
</div>
