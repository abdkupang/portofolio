# 🎬 AI Video Generator

A powerful web application built with **Next.js 13** that lets you generate AI videos from text prompts or images — supporting multiple AI providers including free and paid options.

![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- 🆓 **Free tier** — Generate videos via Hugging Face Inference API (no credit card required)
- 💰 **Paid tiers** — Higher quality via Google Veo 2, Kling AI, and Replicate
- ✍️ **Text to Video** — Generate a video from a text prompt
- 🖼️ **Image to Video** — Animate a static image into a dynamic video clip
- 📊 **Dashboard** — View stats: total videos, completed, failed, disk usage
- 🖼️ **Gallery** — Browse and manage all your generated videos
- ⚙️ **Settings** — Configure your API keys through the UI
- 🔄 **Real-time status polling** — Track generation progress live

---

## 🤖 Supported AI Models

| Model | Provider | Type | Cost |
|-------|----------|------|------|
| Wan 2.1 T2V 1.3B | Hugging Face | Text → Video | **FREE** |
| Wan 2.1 I2V 14B 480P | Hugging Face | Image → Video | **FREE** |
| Google Veo 2 | Google Gemini / GCP | Text & Image → Video | Paid (GCP billing) |
| Kling AI v1.6 | Kling AI | Text & Image → Video | Paid (API credits) |
| Wan 2.1 14B T2V | Replicate | Text → Video | Paid (~$0.10–$0.30) |
| Wan 2.1 14B I2V 480P | Replicate | Image → Video | Paid (~$0.10–$0.30) |

---

## 🗂️ Project Structure

```
ai-video-generator/
├── app/
│   ├── api/
│   │   ├── generate/     # POST — starts video generation
│   │   ├── status/       # GET — polls generation status
│   │   ├── videos/       # GET/DELETE — manage saved videos
│   │   └── settings/     # GET/POST — manage API keys
│   ├── components/
│   │   ├── Sidebar.js          # Navigation sidebar
│   │   ├── VideoCard.js        # Video card component
│   │   └── GenerationProgress.js # Live progress tracker
│   ├── generate/         # Generate page (text/image to video)
│   ├── gallery/          # Gallery page
│   ├── settings/         # Settings page
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Dashboard page
├── lib/
│   ├── database.js       # JSON-based local database
│   ├── models.js         # AI model registry
│   ├── huggingface.js    # Hugging Face provider
│   ├── gemini.js         # Google Gemini / Veo 2 provider
│   ├── kling.js          # Kling AI provider
│   └── replicate.js      # Replicate provider
├── public/
│   └── videos/           # Generated videos stored here (auto-created)
├── data/                 # Local JSON database (auto-created)
├── .env.local            # Your API keys (NOT committed to git)
├── .env.example          # Template for environment variables
└── next.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A free [Hugging Face](https://huggingface.co) account for the free tier

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-video-generator.git
cd ai-video-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your API keys:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
# Hugging Face (FREE — truly free with rate limits)
HF_TOKEN=hf_your_token_here

# Google Gemini / Veo 2 (PAID — requires GCP billing)
GEMINI_API_KEY=

# Kling AI (PAID — requires API credit purchase)
KLING_ACCESS_KEY=
KLING_SECRET_KEY=

# Replicate (PAID)
REPLICATE_API_TOKEN=

# App name (optional)
NEXT_PUBLIC_APP_NAME=AI Video Generator
```

> **Note:** You only need `HF_TOKEN` to start generating videos for free. All other keys are optional.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Getting API Keys

| Provider | Where to get | Cost |
|----------|-------------|------|
| **Hugging Face** | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) | Free |
| **Google Gemini** | [aistudio.google.com](https://aistudio.google.com) + GCP billing | Pay-per-use |
| **Kling AI** | [klingai.com](https://klingai.com) developer portal | Pay-per-use |
| **Replicate** | [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens) | Pay-per-use |

---

## 🛠️ How It Works

1. **Choose a model** — select a provider and generation type (text/image)
2. **Enter a prompt** — describe the video you want to generate
3. **Generate** — the app calls the provider API and starts the job
4. **Poll status** — for async providers (Gemini, Kling, Replicate), the app polls until done
5. **Watch & download** — view your video directly in the browser or download it

### Video Storage

- **Hugging Face** videos are downloaded and stored locally in `public/videos/`
- **Async providers** store the remote URL returned by the provider
- Metadata is saved to `data/videos.json` (local JSON database)

---

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 13](https://nextjs.org) | Full-stack React framework |
| [React 18](https://react.dev) | UI library |
| [@google/genai](https://www.npmjs.com/package/@google/genai) | Google Gemini / Veo 2 SDK |
| [replicate](https://www.npmjs.com/package/replicate) | Replicate SDK |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | Kling AI JWT auth |
| [uuid](https://www.npmjs.com/package/uuid) | Unique video IDs |

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ai-video-generator)

Add all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

> ⚠️ Note: Local file storage (`public/videos/`) won't persist on serverless platforms. Consider using a cloud storage bucket (e.g., AWS S3, Cloudflare R2) for production deployments.

---

## 📄 License

MIT © 2025

---

## 🙏 Acknowledgements

- [Wan-AI](https://huggingface.co/Wan-AI) for the open-source Wan 2.1 video models
- [Hugging Face](https://huggingface.co) for free inference API
- [Replicate](https://replicate.com) for easy model hosting
- [Google DeepMind](https://deepmind.google) for Veo 2
- [Kling AI](https://klingai.com) for their video generation API
