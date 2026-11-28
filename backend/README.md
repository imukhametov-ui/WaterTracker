
# WaterTracker Backend

REST API for the WaterTracker application.

## Tech Stack

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- Prisma ORM 7
- JWT authentication
- bcrypt
- Zod
- Swagger / OpenAPI
- Vitest and Supertest

## Requirements

- Node.js 22.12+ (Node.js 24 LTS recommended)
- npm
- PostgreSQL server
- PostgreSQL database and dedicated database user

Check installed versions:

```bash
node -v
npm -v
```

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

## Database Setup (PostgreSQL + Prisma 7)

The backend uses PostgreSQL with Prisma ORM.

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

### 3. Validate Prisma Schema

```bash
npx prisma validate --config prisma7.config.ts
```

### 4. Apply Database Migrations

For local development:

```bash
npx prisma migrate dev --config prisma7.config.ts
```

For deployment:

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

Tests use Vitest and Supertest.

The Health Check tests verify:

- HTTP 200 response
- JSON response body
- Content-Type: application/json
- Access without authentication

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

The endpoint is public and does not require authentication.

## Authentication API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user and receive JWT |
| GET | `/api/auth/me` | Get the current authenticated user |

Protected endpoints require a valid JWT Bearer token.

Passwords are hashed using bcrypt.
Request data is validated using Zod.

## API Documentation

Swagger UI:

http://localhost:3000/api/docs

The documentation provides API endpoints, request schemas,
response descriptions, and authentication requirements.

## Project Structure

```text
backend/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   └── prisma.ts
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── docs/
│   │   └── swagger.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/
│   ├── validators/
│   │   └── auth.validator.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   └── health.test.ts
├── .env.example
├── prisma7.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Security

- Password hashing with bcrypt
- JWT authentication
- Protected API endpoints
- Request validation with Zod
- Centralized environment validation
- CORS configuration
- Centralized error handling
- Sensitive configuration stored in environment variables
