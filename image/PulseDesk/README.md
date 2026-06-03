# ⚡ PulseDesk — AI-Powered Workspace

> The all-in-one productivity platform for modern software teams. Combines project management, AI assistant, client portal, invoicing, time tracking, and real-time collaboration in one premium workspace.

![PulseDesk](https://img.shields.io/badge/version-1.0.0-6c63ff?style=for-the-badge)
![NestJS](https://img.shields.io/badge/NestJS-10-e0234e?style=for-the-badge&logo=nestjs)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker)

---

## 🚀 Features

- **📋 Kanban Board** — Real-time drag-and-drop with WebSocket sync
- **🤖 AI Assistant** — Claude-powered task breakdown, sprint planning, bug explanation, docs generation
- **👥 Client Portal** — Shared workspace with approval system and file sharing
- **🧾 Invoice System** — Generate, send, and track invoices with PDF export
- **⏱ Time Tracking** — Start/stop timer with project-based reporting
- **📊 Analytics** — Productivity metrics, velocity tracking, revenue charts
- **🔔 Real-time Notifications** — WebSocket-based notification center
- **🔐 Auth** — JWT, OAuth (Google/GitHub), 2FA with TOTP
- **📁 File Management** — MinIO storage with drag-and-drop upload

---

## 🏗 Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Zustand, React Query |
| Backend | NestJS, Prisma ORM, REST + WebSocket |
| Database | PostgreSQL 16, Redis 7 |
| Storage | MinIO |
| Auth | JWT + Refresh Tokens, OAuth 2.0, TOTP 2FA |
| AI | Anthropic Claude API |
| DevOps | Docker, Docker Compose, Nginx, GitHub Actions |
| Monorepo | Turborepo |

---

## 📁 Project Structure

```
PulseDesk/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   └── src/
│   │       ├── app/            # App Router pages
│   │       │   ├── auth/       # Login, register, forgot-password
│   │       │   └── dashboard/  # Protected workspace pages
│   │       ├── components/     # Reusable components
│   │       ├── hooks/          # Custom React hooks
│   │       ├── lib/            # API client, utilities
│   │       └── store/          # Zustand state stores
│   └── api/                    # NestJS backend
│       └── src/
│           ├── modules/        # Feature modules
│           │   ├── auth/       # Authentication
│           │   ├── users/      # User management
│           │   ├── projects/   # Project management
│           │   ├── tasks/      # Task management + kanban
│           │   ├── invoices/   # Invoice system
│           │   ├── ai/         # AI assistant (Claude)
│           │   ├── websocket/  # Real-time gateway
│           │   └── ...
│           ├── common/         # Shared decorators, guards, filters
│           └── config/         # Configuration files
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utilities
├── prisma/
│   ├── schema.prisma           # Database schema (13+ models)
│   └── seeds/seed.ts           # Demo data seeder
├── docker/                     # Docker configs
├── nginx/                      # Nginx reverse proxy config
├── .github/workflows/          # CI/CD pipelines
├── docker-compose.yml
└── .env.example
```

---

## ⚡ Quick Start

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose
- npm >= 10

### 1. Clone & Configure

```bash
git clone https://github.com/yourusername/pulsedesk.git
cd pulsedesk

# Copy environment config
cp .env.example .env
# Edit .env with your values (especially JWT secrets and API keys)
```

### 2. Start with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Run migrations + seed demo data
npm run db:migrate
npm run db:seed
```

Visit:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001/api
- **Swagger**: http://localhost:3001/api/docs
- **MinIO Console**: http://localhost:9001

### 3. Local Development

```bash
# Install all dependencies
npm install

# Start PostgreSQL and Redis
docker-compose up -d postgres redis minio

# Run API migrations
npm run db:migrate

# Seed demo data
npm run db:seed

# Start all apps in dev mode
npm run dev
```

---

## 🔑 Demo Credentials

After seeding, use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Owner | owner@pulsedesk.app | Password123! |
| Developer | sarah@pulsedesk.app | Password123! |
| Developer | marcus@pulsedesk.app | Password123! |
| Designer | luna@pulsedesk.app | Password123! |

---

## 🤖 AI Setup (Required for AI Features)

1. Get your API key at [console.anthropic.com](https://console.anthropic.com)
2. Add to `.env`:
   ```env
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Restart the API service

---

## 🔐 OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3001/api/auth/google/callback`
4. Set in `.env`:
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Authorization callback URL: `http://localhost:3001/api/auth/github/callback`
4. Set in `.env`:
   ```env
   GITHUB_CLIENT_ID=your-client-id
   GITHUB_CLIENT_SECRET=your-client-secret
   ```

---

## 🚀 Production Deployment (Ubuntu VPS)

### 1. Server Setup

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
usermod -aG docker $USER

# Install Docker Compose
apt install docker-compose-plugin -y

# Create app directory
mkdir -p /opt/pulsedesk
cd /opt/pulsedesk
```

### 2. Deploy

```bash
# Clone repository
git clone https://github.com/yourusername/pulsedesk.git .

# Configure environment
cp .env.example .env
nano .env  # Fill in production values

# Start services
docker-compose up -d

# Run migrations + seed
docker-compose exec api npx prisma migrate deploy
docker-compose exec api npx prisma db seed
```

### 3. SSL with Certbot

```bash
apt install certbot -y
certbot certonly --standalone -d pulsedesk.yourdomain.com

# Copy certs
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
```

### 4. CI/CD Setup

Add these GitHub Secrets:
- `VPS_HOST` — Your server IP
- `VPS_USER` — SSH user (usually `root` or `ubuntu`)
- `VPS_SSH_KEY` — Private SSH key
- `NEXT_PUBLIC_API_URL` — `https://yourdomain.com/api`
- `NEXT_PUBLIC_WS_URL` — `https://yourdomain.com`

---

## 📚 API Documentation

Swagger UI is available at `/api/docs` in development mode.

Key endpoints:

```
POST /api/auth/register          Register new account
POST /api/auth/login             Login with email/password
GET  /api/auth/google            Google OAuth
GET  /api/auth/github            GitHub OAuth
GET  /api/auth/me                Get current user

GET  /api/organizations/:id      Get organization
GET  /api/organizations/:id/projects   List projects
POST /api/organizations/:id/projects   Create project

GET  /api/projects/:id/tasks/kanban    Kanban board
POST /api/projects/:id/tasks           Create task
PATCH /api/projects/:id/tasks/:id/move Move task

POST /api/ai/task-breakdown       AI task breakdown
POST /api/ai/sprint-plan          AI sprint planning
POST /api/ai/explain-bug          AI bug explanation
POST /api/ai/chat                 AI chat assistant

GET  /api/analytics/dashboard/:orgId   Dashboard stats
```

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📝 Environment Variables

See `.env.example` for full list. Critical variables:

```env
DATABASE_URL=          # PostgreSQL connection string
REDIS_URL=             # Redis connection string
JWT_SECRET=            # Min 32 chars, random
JWT_REFRESH_SECRET=    # Min 32 chars, random
ANTHROPIC_API_KEY=     # From console.anthropic.com
GOOGLE_CLIENT_ID=      # From Google Cloud Console
GITHUB_CLIENT_ID=      # From GitHub Developer Settings
```

---

## 🏛 Architecture

```
Browser ──→ Nginx (80/443)
               ├──→ Next.js (3000) [Frontend]
               └──→ NestJS (3001) [API + WebSocket]
                        ├──→ PostgreSQL (5432) [Primary DB]
                        ├──→ Redis (6379) [Cache + Sessions]
                        ├──→ MinIO (9000) [File Storage]
                        └──→ Anthropic API [AI]
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with ❤️ using Next.js, NestJS, and Claude AI.
