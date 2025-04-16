import * as dotenv from "dotenv";
dotenv.config();

// console.log("DATABASE URL:", process.env.POSTGRES_URL);
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
    out: "./src/lib/db/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL ?? 'postgresql://postgres:root@localhost:5432/verceldb',
  },
  verbose: true,
  strict: true,
})