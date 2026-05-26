# VedaAI — AI-Powered Assignment Generation Platform

Production-ready distributed AI platform for generating structured academic assignments from PDF/text inputs using asynchronous AI processing, realtime updates, and scalable worker architecture.

## Live Demo

https://assignment-ritog09-web-uuyb.vercel.app

## System architecture

<img width="1335" height="1314" alt="veda-ai" src="https://github.com/user-attachments/assets/c4676bae-24c2-411a-8234-6c9d172e6091" />

## Demo Video Explanation (updated some feat in prod now)

https://www.loom.com/share/e7cff720619f48d9a700c53b13c89d8d

## Features

- PDF/Text based assignment generation
- AI-generated structured question papers
- Realtime generation progress using WebSockets
- Queue-based async processing with BullMQ
- Cloudinary-based file storage
- Search assignments
- Download generated assignment PDFs
- Chunking strategy for large PDFs
- Structured AI response validation using Zod

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Zustand
- Socket.io Client

### Backend
- Express.js
- BullMQ
- Socket.io
- MongoDB
- Redis
- Cloudinary

### AI
- Groq (`llama-3.3-70b-versatile`)
- LangChain
- Zod Validation

### Deployment
- Frontend → Vercel
- API + Worker → Railway
- Database → MongoDB Atlas
- Queue → Upstash Redis
- Storage → Cloudinary

---

# High-Level Flow

```text
User Uploads PDF/Text
        ↓
Frontend Sends Request
        ↓
Express API Creates Assignment
        ↓
BullMQ Job Added To Queue
        ↓
Worker Consumes Job
        ↓
PDF Parsing + Cleaning
        ↓
Chunking + Prompt Building
        ↓
Groq LLM Generation
        ↓
Zod Validation
        ↓
Generated Assignment Stored
        ↓
PDF Generation
        ↓
Cloudinary Upload
        ↓
Realtime WebSocket Updates
        ↓
Frontend Updates Instantly
```

---

## Realtime WebSocket Events

- `generation-started`
- `generation-progress`
- `generation-completed`
- `generation-failed`

---

## Environment Variables

```env
MONGODB_URI=
REDIS_URL=

GROQ_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SOCKET_URL=
```

---

## Architecture Highlights

- Distributed worker-based architecture
- Async AI processing pipeline
- Queue-driven scalable backend
- Realtime UI updates without polling
- Cloud-native file handling
- Structured AI output validation
- Production deployment on Railway + Vercel

---
