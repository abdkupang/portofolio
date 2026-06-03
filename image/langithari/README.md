# LangitHari — Prediksi Cuaca & Rekomendasi Aktivitas Harian

> Platform cuaca modern berbasis Next.js 15 dengan atmosfer dinamis, rekomendasi aktivitas kontekstual, dan visualisasi cuaca yang human-centered.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Daftar Isi

1. [Preview UI](#preview-ui)
2. [Feature Overview](#feature-overview)
3. [Dynamic Atmosphere System](#dynamic-atmosphere-system)
4. [Activity Recommendation Logic](#activity-recommendation-logic)
5. [Tech Stack](#tech-stack)
6. [Struktur Folder](#struktur-folder)
7. [Setup Guide](#setup-guide)
8. [API Integration](#api-integration)
9. [Security Implementation](#security-implementation)
10. [Deployment Guide](#deployment-guide)

---

## Preview UI

### Landing Page

```
╔══════════════════════════════════════════════════════════════╗
║  ☁ LangitHari    [Beranda][Favorit][Udara][Aktivitas][Masuk] ║
╠══════════════════════════════════════════════════════════════╣
║                    ·· Cuaca & Aktivitas Harian Indonesia ··  ║
║                                                              ║
║  ╭────────╮   Langit hari ini bicara      ╭──────────────╮  ║
║  │Makassar│   lebih dari sekadar angka.   │  Jakarta 27° │  ║
║  │ 32°C ☀ │                              │  Hujan 🌧    │  ║
║  ╰────────╯   ┌───────────────────────┐  ╰──────────────╯  ║
║               │ 🔍 Cari kota...    📍 │                    ║
║  ╭────────╮   └───────────────────────┘  ╭──────────────╮  ║
║  │Bandung │                              │Yogyakarta 24°│  ║
║  │ 22°C ⛅ │   ☀ Suhu  💧 Hujan  🌬 Udara  │  Gerimis 🌦  │  ║
║  ╰────────╯                              ╰──────────────╯  ║
║                         ↓ Gulir                             ║
╚══════════════════════════════════════════════════════════════╝
```

### Weather Detail — Dynamic Atmosphere

```
╔════════════════════════════════════════╗
║  ← Makassar, ID               [♥] [⚙] ║
║  ══ Mood: Energik ⚡ ════════════════  ║
║                                        ║
║        32°C         [ikon ☀ besar]    ║
║        Cerah — terasa 34°C             ║
║                                        ║
║  Kelembapan  UV     Angin    Visib.    ║
║    75%       8/11   14km/h   10km      ║
║                                        ║
║  ─── PRAKIRAAN 24 JAM ──────────────  ║
║  06  07  08  09  10  11  12  ...       ║
║  ☀   ☀   ⛅   ⛅   ☁    ⛅   ☀           ║
║  29  30  31  32  33  32  33            ║
║  [──────── Area Chart Recharts ──────] ║
║                                        ║
║  ─── MATAHARI ─────────────────────  ║
║  Terbit 05:47  ████████░░  Terbenam   ║
║                18:12                   ║
║                                        ║
║  ─── REKOMENDASI AKTIVITAS ─────────  ║
║  ✓ Jogging Pagi        [95% cocok]    ║
║  ✓ Fotografi Sunset    [90% cocok]    ║
║  ◌ Work from Cafe      [60% cocok]    ║
╚════════════════════════════════════════╝
```

### Dynamic Atmosphere States

| Kondisi | Tema UI | Efek Visual | Aksen |
|---|---|---|---|
| Cerah (siang) | Warm blue sky | Sunflare + awan lambat | Amber/Sky |
| Fajar (05–07) | Purple-orange gradient | Soft glow, awan tipis | Orange |
| Senja (17–19) | Orange-rose-purple | Warm flare, golden | Rose/Orange |
| Mendung | Soft gray-slate | Awan sedang, diffuse | Slate |
| Hujan | Deep blue-gray | Canvas rain 80 tetes | Blue |
| Badai | Near-black | Heavy rain + dark | Indigo |
| Berkabut | Pale gray | Fog drift animation | Gray |
| Malam | Dark navy | Minimal, gelap | Indigo |

---

## Feature Overview

| Fitur | Keterangan |
|---|---|
| Cari kota | Autocomplete + debounce 350ms + sanitasi input |
| Deteksi lokasi otomatis | Browser Geolocation API |
| Prediksi cuaca harian | 7 hari ke depan dengan suhu min/max |
| Prediksi per jam | 24 jam + Recharts AreaChart interaktif |
| Simpan kota favorit | PostgreSQL (wajib login), optimistic update |
| Rekomendasi aktivitas | Engine rule-based 6 parameter |
| Sunrise & sunset tracker | Progress bar visual + countdown |
| Kualitas udara (AQI) | AQI + breakdown PM2.5, PM10, O3, NO2 |
| UV index | Gauge + saran proteksi kulit |
| Kompas angin | SVG animated compass needle |
| Dynamic background | Gradient + efek berubah per kondisi cuaca |
| Cursor parallax | GSAP 3-layer depth pada hero section |
| Smooth scroll | Lenis engine (lerp 0.08) |
| Skeleton loading | Set lengkap: card, hourly, daily, AQI |
| Dark/light/auto theme | Zustand persist + system prefers |

---

## Dynamic Atmosphere System

### Cara Kerja

```
Kondisi Cuaca + IsNight + Hour
        ↓
  getAtmosphereConfig()   ← lib/atmosphere-config.ts
        ↓
  AtmosphereConfig {
    gradient,       ← Tailwind bg-gradient-to-br classes
    showRain,       ← aktifkan Canvas rain particles
    showSun,        ← aktifkan Sun + rays component
    showClouds,     ← aktifkan animated SVG clouds
    showFog,        ← aktifkan layered fog drift
    cloudSpeed,     ← slow | medium | fast
    brightness,     ← dim | normal | bright
    ambientLabel,   ← "Cerah", "Hujan", "Berkabut", dll
  }
        ↓
  <DynamicBackground config={...} />
  merender efek sesuai kondisi dengan AnimatePresence
```

### Priority Override System

Urutan prioritas penentuan tema (atas = tertinggi):

1. **Malam** — `isNight = true` → selalu tema `night`
2. **Fajar** — hour 5–7 → tema `dawn`
3. **Senja** — hour 17–19 + Clear → tema `dusk`
4. **Kondisi cuaca aktual** — Clear, Rain, Clouds, dll.

### Rain Effect Implementation

Canvas-based particle system dengan 80 tetes hujan:

```typescript
// Setiap tetes memiliki properti acak
drops.push({
  x:       Math.random() * canvas.width,
  y:       Math.random() * canvas.height,
  speed:   4 + Math.random() * 6,      // kecepatan bervariasi
  length:  15 + Math.random() * 25,    // panjang bervariasi
  opacity: 0.1 + Math.random() * 0.3,  // transparansi bervariasi
});

// Loop animasi: tetes di-reset ke atas saat keluar layar bawah
if (drop.y > canvas.height + drop.length) {
  drop.y = -drop.length;
  drop.x = Math.random() * canvas.width;
}
```

---

## Activity Recommendation Logic

### Engine Input & Output

```typescript
// Input
interface ActivityInput {
  current: CurrentWeather;  // data cuaca realtime
  hour: number;             // jam saat ini (0–23)
  aqi?: number;             // AQI (default 50 jika tidak ada)
}

// Output
interface ActivityRecommendation {
  mood: WeatherMood;             // 8 tipe mood
  moodDescription: string;       // teks deskripsi
  activities: Activity[];        // max 6, sorted by confidence
  generalAdvice: string[];       // tips umum
  safetyNotes: string[];         // peringatan UV/AQI/angin
}
```

### Confidence Scoring

| Score | Label | Kondisi |
|---|---|---|
| 90–100% | Sangat cocok | Semua parameter ideal |
| 70–89% | Cocok | Sebagian besar ideal |
| 50–69% | Cukup cocok | Ada catatan kecil |
| 20–49% | Kurang ideal | Beberapa parameter tidak terpenuhi |
| < 20% | Tidak disarankan | Mayoritas parameter buruk |

### Aturan Aktivitas Utama

```
Jogging Pagi (05:00–09:00):
  ✓ Bukan Rain/Thunderstorm
  ✓ temp < 32°C
  ✓ humidity < 90%
  ✓ aqi < 150
  confidence: Clear→95%, lainnya→70%

Fotografi Sunset (16:00–18:00):
  ✓ Bukan Rain/Thunderstorm
  ✓ clouds < 50 (untuk sunset terbaik)
  confidence: Clear→90%, Clouds→65%
  warning: uvi > 6 → "Gunakan filter ND"

Work from Cafe (kapan saja):
  confidence: Rain→95%, Clouds→80%, Clear→60%

Piknik Sore (10:00–15:00):
  ✓ Clear
  ✓ temp < 33°C
  ✓ hour < 15
  confidence: 85%
  warning: uvi >= 8 → "Bawa tenda/payung"
```

### Safety Notes Logic

```
uvi >= 8   → "UV sangat tinggi, wajib sunscreen SPF 50+"
uvi >= 6   → "UV tinggi, hindari paparan 11:00–15:00"
aqi >= 150 → "Kualitas udara buruk, gunakan masker N95"
aqi >= 100 → "Kualitas udara sedang, kelompok sensitif waspada"
wind >= 50 → "Angin sangat kencang, waspada objek beterbangan"
```

---

## Tech Stack

### Frontend

```
Next.js 15 (App Router)    → Framework, RSC, Server Actions
TypeScript 5.x             → Type safety full-stack
Tailwind CSS 3.x           → Utility styling + custom config
Framer Motion 11           → Animasi, page transition, layout
GSAP 3 + @gsap/react       → Cursor parallax, scroll animation
Lenis + @lenis/react       → Smooth scroll (lerp 0.08)
Zustand 5                  → State global (kota, unit, tema)
TanStack Query v5          → Fetching + cache + optimistic UI
```

### Backend & Infrastruktur

```
Next.js Server Actions     → Mutasi server (favorites, settings)
PostgreSQL via Supabase    → Database utama
Prisma ORM 5               → Type-safe queries + migrations
Clerk Auth                 → Authentication & JWT session
Upstash Redis              → Rate limiting sliding window
```

### API & Visualisasi

```
OpenWeatherMap One Call 3.0  → Current + Hourly + Daily + UV
OpenWeatherMap Geocoding     → Nama kota → koordinat
OpenWeatherMap Air Pollution → AQI + komponen polutan
Recharts                     → AreaChart + RadarChart
Leaflet + React-Leaflet      → Peta lokasi
```

---

## Struktur Folder

```
langithari/
├── .env.example
├── .gitignore
├── middleware.ts                      # Auth + CSP security headers
├── next.config.ts
├── tailwind.config.ts
├── vercel.json
├── prisma/
│   ├── schema.prisma                  # User, Favorite, Settings, RecentSearch
│   └── seed.ts                        # Dummy data: 4 kota Indonesia
│
└── src/
    ├── app/
    │   ├── layout.tsx                 # Root: Clerk + Providers + font
    │   ├── globals.css                # CSS vars, scrollbar, glass utilities
    │   ├── (auth)/
    │   │   ├── login/page.tsx         # Clerk SignIn
    │   │   └── register/page.tsx      # Clerk SignUp
    │   ├── (main)/
    │   │   ├── layout.tsx             # Navbar wrapper
    │   │   ├── page.tsx               # Landing page
    │   │   ├── weather/[city]/
    │   │   │   └── page.tsx           # Detail cuaca + aktivitas
    │   │   ├── favorites/page.tsx     # Grid kota favorit + live weather
    │   │   ├── air-quality/page.tsx   # AQI dashboard + radar chart
    │   │   ├── activities/page.tsx    # Rekomendasi aktivitas lengkap
    │   │   └── settings/page.tsx      # Unit, tema, preferensi
    │   ├── api/
    │   │   ├── weather/route.ts       # Proxy OWM + rate limit + Zod
    │   │   ├── air-quality/route.ts   # Proxy Air Pollution + fallback
    │   │   └── geocode/route.ts       # Proxy Geocoding + dummy fallback
    │   └── actions/
    │       ├── favorites.ts           # Server actions: CRUD favorit
    │       └── settings.ts            # Server actions: update settings
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Providers.tsx          # QueryClient + Lenis + ThemeProvider
    │   │   ├── Navbar.tsx             # Sticky blur + mobile hamburger
    │   │   ├── SearchBar.tsx          # Autocomplete + geolocation button
    │   │   └── SkeletonLoader.tsx     # Skeleton set lengkap
    │   ├── weather/
    │   │   ├── WeatherCard.tsx        # Kartu utama + toggle favorit
    │   │   ├── HourlyTimeline.tsx     # Icon scroll + Recharts AreaChart
    │   │   ├── DailyForecast.tsx      # 7-day list + precipitation %
    │   │   ├── SunTracker.tsx         # Progress bar + countdown sunset
    │   │   ├── UVGauge.tsx            # Gauge visual + label + saran
    │   │   ├── WindCompass.tsx        # SVG animated needle
    │   │   └── AirQualityMeter.tsx    # Circle gauge + pollutant grid
    │   ├── atmosphere/
    │   │   ├── DynamicBackground.tsx  # Background + Rain/Sun/Cloud/Fog
    │   │   └── TodayMood.tsx          # Mood card + animated icon
    │   ├── activity/
    │   │   └── ActivityCard.tsx       # Card + confidence bar + tags
    │   └── landing/
    │       ├── Hero.tsx               # GSAP parallax + floating cards
    │       └── FeatureSection.tsx     # Scroll reveal feature grid
    │
    ├── hooks/
    │   ├── useWeather.ts              # TanStack Query → /api/weather
    │   ├── useGeolocation.ts          # Browser Geolocation wrapper
    │   ├── useAirQuality.ts           # TanStack Query → /api/air-quality
    │   └── useFavorites.ts            # Query + Mutations + optimistic
    │
    ├── lib/
    │   ├── utils.ts                   # Helpers: cn, formatTemp, formatTime
    │   ├── prisma.ts                  # Prisma singleton
    │   ├── rate-limiter.ts            # Upstash Redis sliding window
    │   ├── atmosphere-config.ts       # Cuaca → AtmosphereConfig mapping
    │   └── activity-engine.ts         # Rule-based activity recommendations
    │
    ├── services/
    │   ├── weather-api.ts             # OWM fetch + getDummyWeatherData
    │   └── air-quality-api.ts         # AQI fetch + getAQICategory + dummy
    │
    ├── stores/
    │   ├── weatherStore.ts            # activeCity, unit, recentSearches
    │   └── uiStore.ts                 # theme, windUnit, sidebarOpen
    │
    └── types/
        ├── weather.ts                 # WeatherData, CurrentWeather, dll
        └── activity.ts               # Activity, AirQualityData, AQILevel
```

---

## Setup Guide

### Prasyarat

```bash
Node.js  >= 20.x
npm / pnpm
PostgreSQL >= 15  (atau akun Supabase gratis)
```

### 1. Clone & Install

```bash
git clone https://github.com/username/langithari.git
cd langithari
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Isi `.env.local`:

```env
# ── App ───────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ── Database ──────────────────────────────────────────
DATABASE_URL=postgresql://postgres:password@localhost:5432/langithari
DIRECT_URL=postgresql://postgres:password@localhost:5432/langithari

# ── Clerk Auth ────────────────────────────────────────
# Daftar: https://clerk.com → Create Application
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
CLERK_SECRET_KEY=sk_test_xxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# ── OpenWeatherMap ────────────────────────────────────
# Daftar: https://openweathermap.org → One Call API 3.0
OPENWEATHER_API_KEY=your_key_here

# ── Upstash Redis (opsional) ──────────────────────────
# Daftar: https://upstash.com → Create Database
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
```

### 3. Setup Database

```bash
# Jalankan migrasi schema
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Seed dummy data (4 kota: Makassar, Jakarta, Bandung, Yogyakarta)
npm run db:seed
```

**Schema yang dibuat:**

```prisma
model User      { id, clerkId, email, favorites[], settings, searches[] }
model Favorite  { id, userId, cityName, country, lat, lon, timezone, order }
model Settings  { id, userId, tempUnit, windUnit, theme, language, notifications }
model RecentSearch { id, userId, cityName, country, lat, lon, searchedAt }
```

### 4. Jalankan Development

```bash
npm run dev
# Buka http://localhost:3000
```

### 5. Build Production

```bash
npm run build
npm start
```

---

## API Integration

### Weather Proxy Route

```typescript
// Semua API key hanya ada di server
// Client hanya memanggil /api/weather?lat=...&lon=...

GET /api/weather?lat={lat}&lon={lon}
  → Rate limiting check (30 req/menit)
  → Zod validation koordinat
  → fetch OpenWeatherMap One Call 3.0
  → Cache-Control: s-maxage=1800
```

**Response yang digunakan:**

```typescript
weather.current.temp          // suhu
weather.current.uvi           // UV index
weather.current.wind_speed    // kecepatan angin
weather.current.humidity      // kelembapan
weather.current.sunrise       // timestamp matahari terbit
weather.current.sunset        // timestamp matahari terbenam
weather.current.weather[0]    // kondisi cuaca (Clear, Rain, dll)
weather.hourly[]              // 48 jam ke depan
weather.daily[]               // 8 hari ke depan
```

### Air Quality Proxy Route

```typescript
GET /api/air-quality?lat={lat}&lon={lon}
  → fetch OpenWeatherMap Air Pollution API
  → Parse: aqi (1–5), components (pm2_5, pm10, o3, no2, so2, co)
  → Fallback ke dummy data jika API tidak tersedia
```

### Geocoding Proxy Route

```typescript
GET /api/geocode?q={nama_kota}
  → Sanitasi input (hapus HTML, potong 100 char)
  → Zod validation (min 2 karakter)
  → fetch Geocoding API → [{name, country, lat, lon, state}]
  → Fallback ke dummy results (7 kota besar Indonesia)
```

### TanStack Query Caching

```typescript
useWeather(lat, lon) → {
  queryKey: ["weather", lat.toFixed(2), lon.toFixed(2)],
  staleTime: 30 * 60 * 1000,   // fresh 30 menit
  gcTime:    60 * 60 * 1000,   // memory 1 jam
  retry: 2,
  retryDelay: exponential backoff (max 15s)
}

useAirQuality(lat, lon) → {
  staleTime: 60 * 60 * 1000,   // fresh 1 jam
  gcTime:    2 * 60 * 60 * 1000
}
```

---

## Security Implementation

### 1. CSP Headers (middleware.ts)

```
default-src 'self'
script-src  'self' 'unsafe-eval' 'unsafe-inline' https://clerk.accounts.dev
style-src   'self' 'unsafe-inline'
img-src     'self' data: https://openweathermap.org https://*.tile.openstreetmap.org https://img.clerk.com
connect-src 'self' https://api.openweathermap.org https://clerk.accounts.dev
object-src  'none'
frame-ancestors 'none'
```

### 2. Security Headers

| Header | Value |
|---|---|
| X-Frame-Options | DENY |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | geolocation=(self), camera=(), microphone=() |
| Strict-Transport-Security | max-age=31536000; includeSubDomains |

### 3. Rate Limiting

| Endpoint | Limit | Window |
|---|---|---|
| /api/weather | 30 req | 1 menit per IP |
| /api/geocode | 20 req | 1 menit per IP |
| /api/air-quality | 15 req | 1 menit per IP |

Menggunakan sliding window algorithm via Upstash Redis. Jika Redis tidak tersedia, rate limiting di-skip secara graceful agar aplikasi tetap berjalan.

### 4. Input Validation

Zod schema di setiap API route:

```typescript
// Koordinat
z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180),
})

// Query pencarian
z.object({
  q: z.string().min(2).max(100),
})

// Settings update
z.object({
  tempUnit: z.enum(["celsius", "fahrenheit"]).optional(),
  windUnit: z.enum(["kmh", "ms", "mph"]).optional(),
  theme:    z.enum(["light", "dark", "auto"]).optional(),
})
```

### 5. XSS & Sanitasi Input

```typescript
// SearchBar: input disanitasi sebelum dikirim ke API
function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")   // hapus tag HTML
    .trim()
    .slice(0, 100);             // batas 100 karakter
}
```

### 6. CSRF via Server Actions

Next.js Server Actions secara bawaan memiliki CSRF protection melalui:
- Origin header validation
- SameSite=Strict cookie
- HTTPS enforcement di production

### 7. API Key Protection

Tidak ada API key yang dikirim ke client browser. Semua request ke OpenWeatherMap melewati proxy routes di `/api/*` yang berjalan di server.

---

## Deployment Guide

### Vercel (Rekomendasi)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Set environment variables di Vercel Dashboard:
#    Project → Settings → Environment Variables
#    Tambahkan semua variabel dari .env.example
```

**vercel.json sudah dikonfigurasi:**
- Region: `sin1` (Singapore, paling dekat Indonesia)
- Build command: `prisma generate && next build`
- API max duration: 10 detik

### Database: Supabase (Gratis)

```bash
# 1. Buat project di https://supabase.com
# 2. Settings → Database → Connection String
#    - DATABASE_URL: Transaction Pooler URL
#    - DIRECT_URL:   Direct Connection URL

# 3. Jalankan migrasi
DATABASE_URL=your_prod_url npx prisma migrate deploy
```

### Docker (Self-hosted)

**Dockerfile sudah siap di repo.** Jalankan:

```bash
# Build
docker build -t langithari .

# Run
docker run -p 3000:3000 --env-file .env.production langithari
```

---

## Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build (prisma generate + next build)
npm run start        # Production server
npm run lint         # ESLint
npm run db:migrate   # Prisma migrate dev
npm run db:generate  # Prisma generate client
npm run db:seed      # Seed dummy data
npm run db:studio    # Prisma Studio GUI
npm run db:push      # Push schema tanpa migration (prototype)
```

---

#nextjs #typescript #weatherapp #tailwindcss
#responsivewebdesign #modernui #weatherforecast
#interactivewebsite #portfolioproject

#framermotion #gsap #lenis #zustand
#tanstackquery #openweatherapi #leaflet
#recharts #skeletonloading #websecurity
