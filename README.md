# recipe-app

## Description

A simple recipe viewer + editor web app.

Built with SvelteKit/Svelte 5, Drizzle ORM, Tailwind v4 and Bits-UI
<br />
Intended for **SQLite 3**, but can be adapted to other databases.

## 1. Install locally (Remote Database)

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following content:
```
VITE_DATABASE_TOKEN={...}
VITE_DATABASE_URL={...}
```
4. Run the app: `npm run dev` (or `npm run build` + `npm run preview` when deploying)
5. Head to `http://localhost:5173`

## 2. Install locally (Local Database)

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following content:
```
VITE_LOCAL_DB_URL=file:{...}
```
4. Run the app: `npm run dev` (or `npm run build` + `npm run preview` when deploying)
5. Head to `http://localhost:5173`

## 3. Install with Docker
Requires Docker (surprisingly) and Docker Compose 

1. Clone the repository
2. Edit `docker-compose.yaml`, replacing the `VITE_DATABASE_TOKEN` and `VITE_DATABASE_URL` environment variables with your own.
3. Run `docker compose up -d`
4. Head to `http://localhost:3000` for the production build

## Database Migration

1. If needed, run the database generate script: `npm run db:generate`
   - This will use the schema/locations specified in `drizzle.config.ts`
   - Defaults to `src/lib/server/db/schema.ts`
2. Run the migration: `npm run db:migrate`
