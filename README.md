# Ouroboros Custom

AI-powered chat and project management platform with a React frontend and Express/Prisma backend.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [MySQL](https://dev.mysql.com/downloads/) 8+
- npm

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd ouroboros-custom

# Frontend
npm ci

# Backend
cd backend
npm ci
cd ..
```

### 2. Environment setup

**Frontend** — copy the example and edit if needed:

```bash
cp .env.example .env.local
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Backend URL |
| `VITE_API_VERSION` | `v1` | API version prefix |
| `VITE_USE_MOCK_API` | `true` | Enable MSW mock mode (no backend required) |

**Backend** — copy the example and update secrets:

```bash
cp backend/.env.example backend/.env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8000` | Server port |
| `DATABASE_URL` | `mysql://root:password@localhost:3306/ouroboros_custom` | MySQL connection string |
| `JWT_SECRET` | — | Access token secret |
| `JWT_REFRESH_SECRET` | — | Refresh token secret |

### 3. Database setup

Create the database and run migrations:

```bash
cd backend
npx prisma generate
npx prisma migrate dev
cd ..
```

### 4. Run the app

Open two terminals:

```bash
# Frontend (port 8080)
npm run dev
```

```bash
# Backend (port 8000)
cd backend && npm run dev
```

> **Quick start without a backend:** Leave `VITE_USE_MOCK_API=true` in `.env.local`. The app will use MSW to mock all API calls — no database or backend server needed.

## Available Scripts

### Frontend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (port 8080) |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run preview` | Preview production build locally |

### Backend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with nodemon (port 8000) |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |

## Tech Stack

**Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS, React Router, TanStack Query, Radix UI, Zod, MSW

**Backend:** Express 4, TypeScript, Prisma 5, MySQL, JWT (bcryptjs, jsonwebtoken)
