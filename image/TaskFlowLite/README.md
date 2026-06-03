# TaskFlow Lite ⚡

> A modern Habit & Daily Planner App — built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

![TaskFlow Lite Preview](https://via.placeholder.com/1200x630/0F0F13/7C6FF7?text=TaskFlow+Lite)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Task Management** | Create, edit, delete, reorder tasks with Kanban-style views |
| **Habit Tracker** | Daily habit tracking with streak counters and weekly progress |
| **Focus Timer** | Pomodoro-style timer with session history |
| **Analytics** | Weekly productivity charts, radar charts, category breakdowns |
| **Calendar View** | Monthly calendar with task deadlines and habit completion |
| **PWA** | Installable, works offline, local-first |
| **Dark/Light Mode** | System-aware theme switching |
| **Productivity Score** | Dynamic score based on tasks, habits, and focus time |

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand (with persistence)
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **PWA**: next-pwa
- **Deployment**: Vercel

---

## 🚀 Quick Start

### 1. Clone & install

```bash
git clone https://github.com/yourusername/taskflow-lite.git
cd taskflow-lite
npm install
```

### 2. Setup environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the schema in your SQL editor:

```bash
# Copy contents of supabase/schema.sql into Supabase SQL editor
```

3. (Optional) Seed demo data:

```bash
# Edit supabase/seed.sql, replace demo_user_id with your actual user UUID
# Then run in Supabase SQL editor
```

### 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── dashboard/          # Main dashboard
│   ├── tasks/              # Task management
│   ├── habits/             # Habit tracker
│   ├── focus/              # Focus timer
│   ├── analytics/          # Productivity analytics
│   ├── calendar/           # Calendar view
│   ├── settings/           # App settings
│   ├── profile/            # User profile
│   └── auth/               # Login & register
├── components/
│   ├── ui/                 # Reusable UI primitives
│   ├── layout/             # Sidebar, topbar
│   └── features/           # Feature-specific components
│       ├── tasks/
│       ├── habits/
│       └── focus/
├── stores/                 # Zustand state stores
│   ├── task-store.ts
│   ├── habit-store.ts
│   ├── focus-store.ts
│   └── ui-store.ts
├── types/                  # TypeScript types
├── lib/                    # Utilities and Supabase clients
├── hooks/                  # Custom React hooks
└── styles/                 # Global CSS
```

---

## 🗄️ Database Schema

```sql
profiles           -- User profiles and settings
tasks              -- Task management
habits             -- Habit definitions
habit_logs         -- Daily habit completions
focus_sessions     -- Pomodoro session history
notifications      -- In-app notifications
productivity_stats -- Daily productivity data
```

---

## 🚢 Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/taskflow-lite)

### Manual deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

Set these environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

---

## 📱 PWA Installation

TaskFlow Lite is a Progressive Web App. To install:

- **Desktop**: Click the install icon in your browser's address bar
- **iOS**: Safari → Share → Add to Home Screen
- **Android**: Chrome → Menu → Add to Home Screen

---

## 🏗️ Architecture Decisions

| Decision | Rationale |
|---|---|
| **Local-first with Zustand + persist** | Fast UX, works offline, easy to extend with Supabase sync |
| **App Router** | Server components, layouts, better DX |
| **Tailwind CSS** | Rapid styling, consistent design tokens |
| **Recharts** | Lightweight, composable charts for React |
| **Framer Motion** | Smooth animations without performance overhead |

---

## 📝 License

MIT © 2024 TaskFlow Lite
