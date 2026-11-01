
# WaterTracker Backend

REST API for the WaterTracker application.


## Tech Stack

- Node.js 20+
- Express 5
- TypeScript
- PostgreSQL
- Prisma ORM 7
- Vitest and Supertest for automated API tests (PR #24)

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL server
- PostgreSQL database and dedicated database user

Check installed versions:

```bash
node -v
npm -v
```

**Integration status:** PostgreSQL schema and migrations are
implemented in PR #25. Environment validation is implemented
in PR #28. Automated health endpoint tests are implemented
in PR #24. These changes must be merged before all documented
features are available on `main`.

## Installation

From the project root:

```bash
cd backend
npm install
```

## Environment Configuration

Create a local `.env` file from the provided template.

From the `backend` directory, run in PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure the following environment variables:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Backend HTTP port | `3000` |
| `NODE_ENV` | Runtime environment | `development` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://USER:PASSWORD@localhost:5432/watertracker` |
| `JWT_SECRET` | Secret used to sign JWT tokens | Generate a secure random value |
| `CLIENT_URL` | Allowed frontend origin for CORS | `http://localhost:5173` |

Generate a secure JWT secret using Windows PowerShell:

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$secret = [BitConverter]::ToString($bytes).Replace("-", "").ToLower()
$rng.Dispose()
Set-Clipboard -Value $secret
```

Paste the generated value into `JWT_SECRET` in `.env`.

The backend validates required environment variables at startup.
Missing required values prevent the server from starting.

Never commit `.env`, database passwords, or JWT secrets to Git.

**Note:** Centralized environment validation and the `CLIENT_URL`
configuration are implemented in PR #28 (Issue #14).
These changes must be merged before the instructions fully
match the `main` branch.


## Development

Start the development server:

```bash
npm run dev
```

Default address:

http://localhost:3000

## Production Build

Compile TypeScript:

```bash
npm run build
```

Start the compiled application:

```bash
npm start
```

## TypeScript Check

```bash
npm run typecheck
```

## Automated Tests

Run automated backend tests:

```bash
npm test
```

Health endpoint tests are implemented in PR #24.
The `npm test` script becomes available on `main`
after that pull request is merged.

## Health Check

Open:

http://localhost:3000/api/health

Expected JSON response:

```json
{
  "status": "ok",
  "service": "WaterTracker API"
}
```

Expected HTTP status: `200 OK`.


## Project Structure

```text
backend/
├── prisma/
│   ├── migrations/       # Database migrations (PR #25)
│   └── schema.prisma     # Prisma models (PR #25)
├── src/
│   ├── config/
│   │   └── env.ts        # Environment validation (PR #28)
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Express middleware
│   ├── routes/           # API routes
│   ├── app.ts            # Express application
│   └── server.ts         # Server startup
├── tests/
│   └── health.test.ts    # Health endpoint tests (PR #24)
├── .env.example          # Environment variable template
├── prisma7.config.ts     # Prisma configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Backend documentation
```

Files marked with PR numbers are available after
the corresponding pull requests are merged.

## Database Setup (PostgreSQL + Prisma 7)

The backend uses PostgreSQL with Prisma ORM.

Database models and migrations are implemented in Issue #4 (PR #25).
Until PR #25 is merged, the Prisma schema and migration files
are available in the `feature/prisma-models-migrations` branch.

### 1. Prepare PostgreSQL

Install PostgreSQL and ensure the database server is running.

Create a database and a dedicated user:

```sql
CREATE USER watertracker_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE watertracker OWNER watertracker_user;
```

For local development with `prisma migrate dev`, the database
user must be able to create a temporary shadow database.
Grant `CREATEDB` to the development user if necessary:

```sql
ALTER USER watertracker_user CREATEDB;
```

Do not grant superuser privileges.

### 2. Configure DATABASE_URL

In `backend/.env`, set:

```dotenv
DATABASE_URL=postgresql://watertracker_user:YOUR_PASSWORD@localhost:5432/watertracker
```

Replace `YOUR_PASSWORD` with your actual PostgreSQL password.
Never commit `.env` to Git.

### 3. Validate Prisma Schema

From the `backend` directory:

```bash
npx prisma validate --config prisma7.config.ts
```

### 4. Apply Database Migrations

For local development:

```bash
npx prisma migrate dev --config prisma7.config.ts
```

For environments where migrations must only be applied,
such as deployment:

```bash
npx prisma migrate deploy --config prisma7.config.ts
```

### 5. Generate Prisma Client

```bash
npx prisma generate --config prisma7.config.ts
```

### 6. Verify Database

Use pgAdmin or another PostgreSQL client to confirm
that the following tables exist:

- User
- WaterRecord
- _prisma_migrations

The Prisma schema and migrations must be present
in the current branch before running these commands.
