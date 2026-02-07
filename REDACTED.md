# Redacted – Local setup and run

The **Redacted** (link management) frontend lives in the `redacted/` folder.

## Run with Docker (recommended)

From the project root:

```bash
docker-compose up
```

- **Redacted:** http://localhost:3000  
- **Backend:** http://localhost:8000  

MongoDB for Redacted runs automatically in Docker (port 27017). No local MongoDB install required.

---

## Run locally (without Docker)

### Requirements

- Node.js 18+
- MongoDB (local or Atlas)
- A [Clerk](https://clerk.com) account for auth

### Install

```bash
cd redacted
npm install
```

## Environment variables

Copy `redacted/.env.example` to `redacted/.env` (or edit the existing `redacted/.env`) and fill in:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_DOMAIN` | App domain (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_APP_NAME` | App name |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk key (from Dashboard) |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `DATABASE_URL` | MongoDB connection string |

## Run

```bash
cd redacted
npm run dev
```

The app will be available at **http://localhost:3000**.

## Prisma (database)

After setting `DATABASE_URL`:

```bash
cd redacted
npx prisma generate
npx prisma db push   # or: npx prisma migrate dev
```

## Tech stack

- Next.js, Tailwind, Shadcn UI, Magic UI, Aceternity UI  
- Prisma, MongoDB, Clerk  
- React Hook Form  
