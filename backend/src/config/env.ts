
import "dotenv/config";

const requiredVariables = [
  "DATABASE_URL",
  "JWT_SECRET",
  "CLIENT_URL",
] as const;

for (const name of requiredVariables) {
  if (!process.env[name]?.trim()) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }
}

const port = Number(process.env.PORT ?? "3000");

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error(
    "Invalid PORT: expected an integer between 1 and 65535"
  );
}

const nodeEnv = process.env.NODE_ENV ?? "development";

if (!["development", "test", "production"].includes(nodeEnv)) {
  throw new Error(
    "Invalid NODE_ENV: expected development, test or production"
  );
}

export const env = {
  PORT: port,
  NODE_ENV: nodeEnv,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  CLIENT_URL: process.env.CLIENT_URL!,
};
