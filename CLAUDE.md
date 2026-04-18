# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-tenant HRM SaaS for startups and growing companies. Monorepo with separate `client/` and `server/` directories.

**Actual stack** :

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express 5 (ES modules) + Node.js
- **Database**: PostgreSQL via `pg` Pool (no ORM — raw SQL)
- **Auth**: JWT (`jsonwebtoken`) + `bcrypt`
- **Validation**: Zod

## Development Commands

### Client (run from `client/`)

```bash
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run lint      # ESLint
npm run preview   # Preview production build

```

### Server (run from `server/`)

```bash
npm run dev       # nodemon src/server.js (auto-reload)
npm run start     # node src/server.js
```

## Architecture

### Server

- `src/server.js` — loads dotenv, starts Express on `PORT` (default 5000)
- `src/app.js` — Express app setup (CORS, JSON body parsing, routes); health check at `GET /health`
- `src/config/db.js` — exports a `pg.Pool` instance configured from env vars
- `src/controllers/`, `src/routes/`, `src/middleware/`, `src/models/`, `src/utils/` — scaffolded, currently empty

The server uses ES module syntax (`import`/`export`). All new server files must use `.js` extensions in imports.

### Client

- Entry: `src/main.tsx` → `src/App.tsx`
- TypeScript strict mode with `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`

## Environment Variables (server/.env)

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=hrm_db
JWT_SECRET=supersecretkeya
```

The `.env` file is gitignored. Import env vars via `process.env.*` after `dotenv.config()`.

## Key Conventions

- Database access goes through the `pool` from `src/config/db.js` — use `pool.query(sql, params)` with parameterized queries
- Routes are registered in `src/app.js`; add route files under `src/routes/`
- Zod is available for request validation in controllers/middleware
