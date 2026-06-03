# AetherRoom — AI-Powered Interior Design Platform

<div align="center">
  <img src="docs/banner.png" alt="AetherRoom" width="100%" />

  **The first interior design platform that thinks with you.**

  Design, visualize, and perfect your living spaces with AI-assisted room planning,
  real-time collaboration, and a stunning pseudo-3D canvas editor.

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
  [![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green?logo=fastapi)](https://fastapi.tiangolo.com)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://postgresql.org)
  [![Docker](https://img.shields.io/badge/Docker-ready-blue?logo=docker)](https://docker.com)
</div>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [WebSocket Events](#websocket-events)
- [AI Service](#ai-service)
- [Database Schema](#database-schema)
- [Docker Deployment](#docker-deployment)
- [VPS Deployment Guide](#vps-deployment-guide)

---

## Overview

AetherRoom is a premium interior design web application combining:
- **Figma-like canvas editor** powered by React Konva
- **AI design assistant** powered by Google Gemini 1.5 Flash
- **Real-time collaboration** via Socket.io WebSockets
- **Pseudo-3D room preview** with Three.js / React Three Fiber
- **Cinematic landing page** with GSAP + Framer Motion animations

---

## Tech Stack

### Frontend (`apps/web`)
| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | React framework with SSR/SSG |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Page/component animations |
| GSAP + Lenis | Scroll animations & smooth scroll |
| React Konva | 2D canvas editor |
| Three.js + R3F | 3D room preview |
| Zustand + Immer | Global state management |
| TanStack Query | Server state & caching |
| Socket.io Client | Real-time collaboration |
| Lucide React | Icon system |
| React Hook Form + Zod | Forms & validation |

### Backend (`apps/api`)
| Technology | Purpose |
|---|---|
| NestJS 10 | Modular Node.js framework |
| Prisma ORM | Database access & migrations |
| PostgreSQL 16 | Primary database |
| JWT + Passport | Authentication |
| Socket.io (WS Gateway) | Real-time events |
| Class-validator | DTO validation |
| Multer | File uploads |
| Bcrypt | Password hashing |

### AI Service (`apps/ai-service`)
| Technology | Purpose |
|---|---|
| FastAPI | Python web framework |
| Google Gemini 1.5 Flash | AI model (layout, palette, chat) |
| Pydantic | Request/response validation |
| Uvicorn | ASGI server |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker + Compose | Containerization |
| Nginx | Reverse proxy + SSL termination |
| Supabase Storage | File/asset storage |

---

## Project Structure

```
AetherRoom/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/            # App Router pages
│   │   │   │   ├── (auth)/     # Login, Register
│   │   │   │   ├── dashboard/  # User dashboard
│   │   │   │   ├── editor/     # Room editor (canvas)
│   │   │   │   ├── catalog/    # Furniture catalog
│   │   │   │   ├── gallery/    # Design gallery
│   │   │   │   ├── collaboration/ # Realtime collab
│   │   │   │   └── settings/   # Account settings
│   │   │   ├── components/
│   │   │   │   ├── landing/    # Landing page
│   │   │   │   ├── canvas/     # Editor canvas
│   │   │   │   ├── furniture/  # Furniture UI
│   │   │   │   ├── ai/         # AI panel
│   │   │   │   └── ui/         # Shared UI components
│   │   │   ├── lib/
│   │   │   │   ├── store/      # Zustand stores
│   │   │   │   ├── api/        # API client (Axios)
│   │   │   │   ├── hooks/      # Custom React hooks
│   │   │   │   └── utils/      # Utilities
│   │   │   └── types/          # TypeScript types
│   │   ├── tailwind.config.js
│   │   └── next.config.js
│   │
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/           # JWT auth module
│   │   │   ├── rooms/          # Room CRUD + layouts
│   │   │   ├── furniture/      # Furniture catalog
│   │   │   ├── collaboration/  # Invite system
│   │   │   ├── ai/             # AI proxy service
│   │   │   ├── users/          # User profiles
│   │   │   ├── websocket/      # Socket.io gateway
│   │   │   └── common/         # Prisma, guards
│   │   └── prisma/
│   │       ├── schema.prisma   # Full DB schema
│   │       └── seed.ts         # Dummy data seeder
│   │
│   └── ai-service/             # Python FastAPI AI service
│       ├── main.py
│       ├── routers/ai_router.py
│       ├── services/gemini_service.py
│       └── requirements.txt
│
├── docker/                     # Dockerfiles
│   ├── web.Dockerfile
│   ├── api.Dockerfile
│   └── ai.Dockerfile
├── nginx/
│   ├── nginx.conf
│   └── conf.d/default.conf
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Features

### Room Editor
- **Drag & Drop** furniture from catalog to canvas
- **Resize & Rotate** with transform handles
- **Snap to Grid** with configurable grid size
- **Layer Management** — reorder, lock, hide objects
- **Multi-select** with shift-click
- **Undo/Redo** (50 levels of history)
- **Zoom & Pan** (10% – 400%)
- **Measurement System** with real-world scale (cm)
- **2D → Pseudo-3D** preview toggle

### AI Design Assistant
- **Layout Generation** — full room layouts from dimensions + style
- **Color Palette Generator** — harmonious palettes by mood/style
- **Furniture Placement** — AI-optimized positioning suggestions
- **Interior Style Chat** — conversational design advisor (Gemini)
- **Room Analysis** — design score + improvement suggestions

### Collaboration
- **Real-time multi-user editing** via WebSocket
- **Live cursors** with user presence indicators
- **Role-based access** (Owner / Editor / Viewer)
- **Invite system** via email or shareable link
- **In-editor chat** for team communication

### Export & Save
- **Auto-save** drafts every 30 seconds
- **Multiple layout versions** per room
- **PNG / JPG export** (html-to-image)
- **PDF export** (jsPDF)
- **Room duplication** for experimenting

---

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.12+
- PostgreSQL 16+ (or Docker)
- Git

### 1. Clone & Install

```bash
git clone https://github.com/your-org/aetherroom.git
cd aetherroom

# Install root dependencies
npm install

# Install web dependencies
cd apps/web && npm install && cd ../..

# Install API dependencies
cd apps/api && npm install && cd ../..

# Install AI service dependencies
cd apps/ai-service && pip install -r requirements.txt && cd ../..
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your values (see Environment Variables section)
```

### 3. Setup Database

```bash
cd apps/api
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Start Development Servers

```bash
# Terminal 1: Frontend
cd apps/web && npm run dev

# Terminal 2: API
cd apps/api && npm run start:dev

# Terminal 3: AI Service
cd apps/ai-service && uvicorn main:app --reload --port 8000
```

Access at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001/api/v1
- **AI Service**: http://localhost:8000/docs

### Demo Credentials
```
Admin:  admin@aetherroom.com / password123
User 1: sarah@example.com / password123
Demo:   demo@aetherroom.com / password123
```

---

## Development Setup

### Frontend Development
```bash
cd apps/web
npm run dev        # Start dev server
npm run build      # Production build
npm run type-check # TypeScript check
npm run lint       # ESLint
```

### API Development
```bash
cd apps/api
npm run start:dev  # Watch mode with hot reload
npm run build      # Compile TypeScript
npm run test       # Run tests

# Prisma commands
npx prisma studio  # GUI database browser
npx prisma migrate dev  # Create new migration
npx prisma db seed      # Re-run seeder
```

### AI Service Development
```bash
cd apps/ai-service
uvicorn main:app --reload --port 8000
# Swagger docs at: http://localhost:8000/docs
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://aetherroom:password@localhost:5432/aetherroom

# Auth
JWT_SECRET=your-min-32-char-secret

# AI (get key at https://aistudio.google.com)
GEMINI_API_KEY=your_gemini_key

# Service URLs
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_WS_URL=http://localhost:3001

# Storage (Supabase)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
```

---

## API Documentation

### Authentication
```
POST /api/v1/auth/register  — Create account
POST /api/v1/auth/login     — Login (returns JWT)
GET  /api/v1/auth/me        — Get current user
```

### Rooms
```
GET    /api/v1/rooms           — List user's rooms
POST   /api/v1/rooms           — Create room
GET    /api/v1/rooms/:id       — Get room details
PATCH  /api/v1/rooms/:id       — Update room
DELETE /api/v1/rooms/:id       — Delete room
POST   /api/v1/rooms/:id/layout   — Save layout
POST   /api/v1/rooms/:id/duplicate — Duplicate room
```

### Furniture
```
GET  /api/v1/furniture              — List catalog (with filters)
GET  /api/v1/furniture/categories   — Get categories
GET  /api/v1/furniture/favorites    — User's favorites
GET  /api/v1/furniture/:id          — Get furniture item
POST /api/v1/furniture/:id/favorite — Toggle favorite
```

### Collaboration
```
POST   /api/v1/collaboration/:roomId/invite         — Send invite
GET    /api/v1/collaboration/:roomId/members        — List members
DELETE /api/v1/collaboration/:roomId/members/:userId — Remove member
POST   /api/v1/collaboration/accept/:token          — Accept invite
```

### AI
```
POST /api/v1/ai/layout           — Generate room layout
POST /api/v1/ai/palette          — Generate color palette
POST /api/v1/ai/furniture-suggest — Suggest furniture
POST /api/v1/ai/chat             — Chat with AI designer
GET  /api/v1/ai/history          — AI generation history
```

### Users
```
GET   /api/v1/users/profile    — Get profile
PATCH /api/v1/users/profile    — Update profile
GET   /api/v1/users/dashboard  — Dashboard stats
GET   /api/v1/users/activity   — Activity log
```

---

## WebSocket Events

Connect to `ws://localhost:3001/collaboration` with JWT in auth header.

### Client → Server
```javascript
// Join a room
socket.emit('room:join', { roomId: 'uuid' })

// Move cursor
socket.emit('cursor:move', { x: 120, y: 340 })

// Move furniture
socket.emit('item:move', { itemId: 'uuid', x: 100, y: 200, rotation: 45 })

// Add furniture
socket.emit('item:add', { ...furnitureItem })

// Remove furniture
socket.emit('item:remove', { itemId: 'uuid' })

// Update room config
socket.emit('room:config', { wallColor: '#fff', floorColor: '#ccc' })

// Send chat message
socket.emit('chat:message', { message: 'What do you think of this sofa?' })
```

### Server → Client
```javascript
socket.on('user:joined',     ({ userId, name }) => {})
socket.on('user:left',       ({ userId }) => {})
socket.on('presence:update', (users[]) => {})
socket.on('cursor:update',   ({ userId, name, cursor }) => {})
socket.on('item:moved',      ({ itemId, x, y, movedBy }) => {})
socket.on('item:added',      ({ ...item, addedBy }) => {})
socket.on('item:removed',    ({ itemId, removedBy }) => {})
socket.on('room:config:updated', ({ ...config, updatedBy }) => {})
socket.on('chat:message',    ({ message, userId, name, timestamp }) => {})
```

---

## AI Service

The FastAPI service provides four AI capabilities via Gemini 1.5 Flash:

### Layout Generation (`POST /ai/layout`)
```json
{
  "roomType": "living room",
  "width": 500,
  "height": 400,
  "style": "Scandinavian",
  "preferences": "north-facing window"
}
```

### Palette Generation (`POST /ai/palette`)
```json
{
  "style": "Japandi",
  "mood": "calm and earthy",
  "baseColor": "#c4a882"
}
```

### Furniture Suggestions (`POST /ai/furniture-suggest`)
```json
{
  "currentItems": [...],
  "style": "Minimalist",
  "roomType": "bedroom"
}
```

### Design Chat (`POST /ai/chat`)
```json
{
  "messages": [{ "role": "user", "content": "How can I improve my layout?" }],
  "context": { "roomName": "Living Room", "width": 500, "style": "Scandinavian" }
}
```

> **Note**: If `GEMINI_API_KEY` is not set, the service returns intelligent mock responses,
> so development works without an API key.

---

## Database Schema

Key entities and relationships:

```
User ──< Room ──< RoomLayout
User ──< Collaboration >── Room
User ──< FavoriteFurniture >── FurnitureItem
User ──< AIGeneration >── Room
User ──< Activity >── Room
```

See `apps/api/prisma/schema.prisma` for the complete schema with all fields, indexes, and constraints.

---

## Docker Deployment

### Start all services
```bash
# Copy and configure environment
cp .env.example .env
# Edit .env with production values

# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Services exposed
| Service | Container Port | Host Port |
|---|---|---|
| Nginx (proxy) | 80/443 | 80/443 |
| Next.js Web | 3000 | 3000 |
| NestJS API | 3001 | 3001 |
| AI Service | 8000 | 8000 |
| PostgreSQL | 5432 | 5432 |

---

## VPS Deployment Guide

### 1. Server Preparation (Ubuntu 22.04)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Install Nginx (optional, for SSL with certbot)
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 2. Clone & Configure

```bash
git clone https://github.com/your-org/aetherroom.git /opt/aetherroom
cd /opt/aetherroom
cp .env.example .env
nano .env  # Fill in production values
```

### 3. SSL Certificate (Let's Encrypt)

```bash
sudo certbot --nginx -d aetherroom.com -d www.aetherroom.com
```
Then uncomment the HTTPS server block in `nginx/conf.d/default.conf`.

### 4. Deploy

```bash
docker-compose up -d --build
docker-compose exec api npx prisma migrate deploy
docker-compose exec api npx prisma db seed
```

### 5. Verify

```bash
curl http://your-vps-ip/health
# {"status":"ok","service":"AetherRoom"}

docker-compose ps       # Check all services running
docker-compose logs api # Check for errors
```

### 6. Auto-restart on boot

```bash
sudo systemctl enable docker
# Docker Compose services restart automatically (restart: unless-stopped)
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with love by the AetherRoom team.
  <br/>
  <a href="https://aetherroom.com">aetherroom.com</a>
</div>
