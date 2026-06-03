# RuangBaca — Platform Review & Koleksi Buku Pribadi

> Platform membaca pribadi yang hangat, nyaman, dan modern. Kelola koleksi buku, lacak progress membaca, tulis review, dan temukan buku baru bersama komunitas.

---

## Preview

```
Landing Page  →  /
Explore       →  /main/explore
Book Detail   →  /main/books/[id]
Dashboard     →  /main/dashboard
Reading Tracker → /main/tracker
Wishlist      →  /main/wishlist
Profile       →  /main/profile/[username]
Admin Panel   →  /main/admin
```

---

## Feature List

### Guest (Tanpa Login)
- Browse dan pencarian buku
- Filter berdasarkan kategori
- Lihat review publik
- Lihat trending & recently added books

### User (Login)
- Koleksi buku pribadi dengan status (Sedang Dibaca / Selesai / Wishlist / Belum Dimulai)
- Reading progress tracker per halaman
- Log sesi membaca harian dengan durasi & catatan
- Rating & review dengan mood tag, spoiler warning, kutipan favorit
- Wishlist & favorite books
- Custom bookshelf (rak virtual)
- Upload cover buku sendiri
- Reading streak & statistik bulanan
- Target membaca tahunan
- Mood-based recommendation
- Reading history & activity log

### Admin
- Moderasi review terflag
- Kelola kategori buku
- Kelola laporan spam
- Nonaktifkan / aktifkan akun pengguna
- Jadikan pengguna sebagai admin

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| UI Components | ShadCN UI + Radix UI |
| Animation | Framer Motion + GSAP |
| Smooth Scroll | Lenis |
| State Management | Zustand |
| Data Fetching | TanStack Query v5 |
| Backend | Supabase (Auth, DB, Storage, Realtime) |
| Database | PostgreSQL (via Supabase) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Charts | Recharts |
| Form Validation | React Hook Form + Zod |
| Security | reCAPTCHA v3, Rate Limiting, XSS Protection |

---

## Folder Structure

```
ruangbaca/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── page.tsx                 # Landing page (/)
│   │   ├── layout.tsx               # Root layout
│   │   ├── auth/
│   │   │   ├── layout.tsx           # Auth layout (centered card)
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── main/                    # Authenticated app routes
│   │   │   ├── layout.tsx           # Main layout (Navbar + Footer)
│   │   │   ├── explore/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── tracker/page.tsx
│   │   │   ├── wishlist/page.tsx
│   │   │   ├── books/[id]/page.tsx
│   │   │   ├── profile/[username]/page.tsx
│   │   │   └── admin/
│   │   │       ├── layout.tsx       # Admin sidebar layout
│   │   │       ├── page.tsx         # Admin overview
│   │   │       ├── reviews/page.tsx
│   │   │       ├── categories/page.tsx
│   │   │       └── users/page.tsx
│   │   └── api/
│   │       ├── books/route.ts
│   │       ├── reviews/route.ts
│   │       ├── upload/route.ts
│   │       └── auth/verify-recaptcha/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Sticky navbar with transition
│   │   │   └── Footer.tsx
│   │   ├── books/
│   │   │   └── BookCard.tsx         # Grid / List / Compact variants
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx        # Stats, Streak, Goal cards
│   │   │   ├── ReadingProgressCard.tsx
│   │   │   └── MonthlyChart.tsx     # Recharts bar chart
│   │   ├── reviews/
│   │   │   ├── ReviewCard.tsx       # With spoiler, mood, helpful
│   │   │   └── ReviewForm.tsx       # Star picker, mood selector
│   │   └── common/
│   │       ├── ThemeProvider.tsx    # Dark/light mode
│   │       ├── QueryProvider.tsx    # TanStack Query
│   │       └── SkeletonLoader.tsx   # Multiple skeleton variants
│   ├── features/                    # Feature-first architecture
│   │   ├── landing/LandingPage.tsx  # Full landing with animations
│   │   ├── books/
│   │   │   ├── ExplorePage.tsx
│   │   │   └── BookDetailPage.tsx
│   │   ├── dashboard/DashboardPage.tsx
│   │   ├── tracker/TrackerPage.tsx
│   │   ├── wishlist/WishlistPage.tsx
│   │   ├── profile/ProfilePage.tsx
│   │   ├── admin/AdminDashboard.tsx
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   └── recommendations/RecommendationWidget.tsx
│   ├── hooks/
│   │   ├── useBooks.ts              # TanStack Query book hooks
│   │   ├── useTracking.ts           # Reading tracking hooks
│   │   └── useDebounce.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts            # Browser Supabase client
│   │   │   ├── server.ts            # Server-side Supabase client
│   │   │   └── middleware.ts        # Auth session management
│   │   ├── validations/index.ts     # All Zod schemas
│   │   ├── utils/
│   │   │   ├── rateLimit.ts         # In-memory rate limiter
│   │   │   └── sanitize.ts          # DOMPurify XSS protection
│   │   └── constants/index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── books.service.ts
│   │   ├── reviews.service.ts
│   │   ├── tracking.service.ts
│   │   └── shelves.service.ts
│   ├── stores/
│   │   ├── useAuthStore.ts          # Zustand auth store (persisted)
│   │   └── useUIStore.ts            # Zustand UI state
│   ├── styles/
│   │   └── globals.css              # Tailwind + CSS variables
│   ├── types/
│   │   └── index.ts                 # All TypeScript types
│   └── utils/
│       └── index.ts                 # cn(), formatDate(), etc.
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
├── middleware.ts                     # Auth middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local.example
```

---

## Database Schema

### Tables
| Tabel | Keterangan |
|-------|-----------|
| `profiles` | Extended user data (extends auth.users) |
| `categories` | Kategori buku |
| `books` | Katalog buku |
| `user_books` | Koleksi buku per user (status, progress, favorit) |
| `reviews` | Review & rating buku |
| `review_helpful` | Like/helpful on reviews |
| `bookshelves` | Custom rak buku per user |
| `bookshelf_items` | Item dalam bookshelf |
| `reading_sessions` | Log sesi membaca harian |
| `reading_goals` | Target membaca tahunan |
| `reports` | Laporan review |
| `activity_logs` | Log aktivitas user |

### Views
- `book_stats` — Agregasi rating dan pembaca per buku
- `user_reading_stats` — Statistik membaca per user

### Relasi
```
auth.users ←─── profiles
profiles ──────→ user_books ───→ books
profiles ──────→ reviews    ───→ books
profiles ──────→ bookshelves ──→ bookshelf_items ──→ books
profiles ──────→ reading_sessions ─→ books
profiles ──────→ reading_goals
profiles ──────→ reports ──→ reviews
```

---

## Installation Guide

### Prerequisites
- Node.js >= 18.17
- npm atau pnpm
- Akun [Supabase](https://supabase.com) (gratis)
- Akun [Google reCAPTCHA](https://www.google.com/recaptcha/admin) (opsional untuk dev)

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/ruangbaca.git
cd ruangbaca

# 2. Install dependencies
npm install
# atau
pnpm install

# 3. Salin environment file
cp .env.local.example .env.local

# 4. Isi environment variables (lihat bagian Environment Setup)
nano .env.local

# 5. Jalankan migration database
# Buka Supabase Dashboard → SQL Editor
# Copy-paste isi: supabase/migrations/001_initial_schema.sql
# Klik Run

# 6. Jalankan seed data (opsional)
# Copy-paste isi: supabase/seed.sql → SQL Editor → Run

# 7. Setup Supabase Storage
# Storage → New Bucket → Nama: book-covers → Public: ON

# 8. Jalankan development server
npm run dev
# Buka http://localhost:3000
```

---

## Environment Setup

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=RuangBaca

# Google reCAPTCHA v3 (opsional untuk dev)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Storage
NEXT_PUBLIC_STORAGE_BUCKET=book-covers
NEXT_PUBLIC_MAX_FILE_SIZE_MB=2

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000
```

---

## Security Implementation

### 1. Rate Limiting
```
- API routes: 100 req/60 detik per IP
- Auth routes: 10 req/60 detik per IP (login, register)
- Implemented di: src/lib/utils/rateLimit.ts
```

### 2. Form Validation (Zod)
```
- Semua input divalidasi dengan schema Zod
- Server-side dan client-side validation
- Implemented di: src/lib/validations/index.ts
```

### 3. XSS Protection
```
- DOMPurify (isomorphic-dompurify) untuk sanitasi konten
- Semua user input disanitasi sebelum disimpan
- Next.js security headers (X-Content-Type-Options, X-XSS-Protection)
- Implemented di: src/lib/utils/sanitize.ts
```

### 4. CSRF Protection
```
- Supabase Auth menggunakan secure HttpOnly cookies
- SameSite cookie policy
- Origin validation
```

### 5. Secure File Upload
```
- MIME type validation (allowlist: JPEG, PNG, WebP)
- Magic bytes validation (tidak bisa spoof MIME type)
- File size limit: 2MB
- Hanya authenticated users yang bisa upload
- Implemented di: src/app/api/upload/route.ts
```

### 6. Google reCAPTCHA v3
```
- Diterapkan pada form register
- Score threshold: 0.5
- Server-side verification
- Implemented di: src/features/auth/RegisterPage.tsx
           + src/app/api/auth/verify-recaptcha/route.ts
```

### 7. Row Level Security (RLS)
```
- Semua tabel Supabase menggunakan RLS
- Users hanya bisa akses data mereka sendiri
- Admin bisa akses semua data
- Implemented di: supabase/migrations/001_initial_schema.sql
```

### 8. Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## Deployment Guide

### Deploy ke Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Set environment variables
# Vercel Dashboard → Project → Settings → Environment Variables
# Masukkan semua variabel dari .env.local.example
```

### Konfigurasi Supabase untuk Production

```
1. Supabase Dashboard → Settings → Auth → URL Configuration
   - Site URL: https://ruangbaca.vercel.app
   - Redirect URLs: https://ruangbaca.vercel.app/auth/callback

2. Settings → Auth → Email Templates
   - Sesuaikan template email verifikasi

3. Settings → Auth → Rate Limits
   - Sesuaikan dengan traffic yang diharapkan
```

### Checklist Deployment
- [ ] Environment variables sudah diset di Vercel
- [ ] Supabase URL configuration sudah diupdate
- [ ] Database migrations sudah dijalankan
- [ ] Storage bucket `book-covers` sudah dibuat (public)
- [ ] RLS policies sudah aktif
- [ ] reCAPTCHA domain sudah didaftarkan
- [ ] Custom domain sudah dikonfigurasi (opsional)

---

## Reading System Explanation

### Reading Status Flow
```
Belum Dimulai → Sedang Dibaca → Selesai
                     ↓
                Berhenti di Tengah
```

### Reading Streak Logic
```
- Streak bertambah jika user membaca hari ini (log session)
- Streak reset jika tidak membaca lebih dari 1 hari berturut-turut
- Diimplementasikan via Supabase RPC function: update_reading_streak()
```

### Progress Tracking
```
- Progress dihitung: (current_page / total_pages) * 100
- Update otomatis saat user log sesi membaca
- Ditampilkan dalam reading progress bar
```

### Reading Goal
```
- Target dibuat per tahun
- Progress dihitung dari buku berstatus 'finished'
- Goal baru dibuat otomatis tiap tahun (via handle_new_user trigger)
```

### Mood Recommendation
```
Sistem rule-based sederhana:
- santai / ringan   → Fiksi, Seni & Desain
- fokus             → Teknologi, Bisnis
- inspiratif        → Pengembangan Diri, Filsafat
- berat             → Sejarah, Filsafat, Sains
- petualangan       → Sejarah, Fiksi
- romantis          → Fiksi, Seni & Desain
```

---

## Analytics Overview

### User Stats (via `user_reading_stats` view)
- Total buku selesai, dibaca, wishlist
- Total halaman dibaca
- Total hari membaca
- Reading streak

### Monthly Stats
- Halaman dibaca per bulan (6 bulan terakhir)
- Ditampilkan via Recharts BarChart

### Book Stats (via `book_stats` view)
- Rata-rata rating
- Total review
- Total pembaca & yang selesai membaca

---

## Dummy Data

### Users
| Nama | Username |
|------|----------|
| Abdul Rahman | abdulrahman |
| Nabila Putri | nabilaputri |
| Fajar Saputra | fajarsaputra |

### Buku
| Judul | Penulis | Kategori |
|-------|---------|----------|
| Atomic Habits | James Clear | Pengembangan Diri |
| Deep Work | Cal Newport | Pengembangan Diri |
| Filosofi Teras | Henry Manampiring | Filsafat |
| Clean Code | Robert C. Martin | Teknologi |
| Sapiens | Yuval Noah Harari | Sejarah |
| The Pragmatic Programmer | David Thomas | Teknologi |
| Ikigai | Héctor García | Pengembangan Diri |
| Bumi Manusia | Pramoedya Ananta Toer | Fiksi |

---

## Tags

### Main Tags
```
#nextjs #typescript #tailwindcss #supabase
#bookreview #readingtracker #modernwebapp
#responsivewebdesign #portfolioproject
```

### Detailed Tags
```
#shadcnui #framermotion #gsap #lenis
#zustand #tanstackquery #postgresql
#recharts #supabasestorage #websecurity
#skeletonloading #modernui
```

---

<p align="center">Dibuat dengan hangat untuk para pembaca Indonesia</p>
<p align="center">RuangBaca © 2025</p>
