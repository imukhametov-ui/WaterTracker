
# WaterTracker Backend

REST API for the WaterTracker application.

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL and Prisma (planned integration)

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL (required after database integration)

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

Create a `.env` file in the `backend` directory using `.env.example` as a template.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Update the environment variables according to your local configuration.

Never commit `.env` files or credentials to Git.

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
├── src/
│   ├── config/        # Application configuration
│   ├── controllers/   # Request handlers
│   ├── middlewares/   # Express middleware
│   ├── routes/        # API routes
│   ├── app.ts         # Express application
│   └── server.ts      # Server startup
├── tests/             # Automated tests (planned)
├── .env.example       # Environment variable template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Backend documentation
```

## Database

PostgreSQL and Prisma integration is tracked in Issue #4.

Database setup and migration instructions will be added after the integration is implemented.
