



import { defineConfig } from 'drizzle-kit'
 
export default defineConfig({
  schema: "./src/lib/db/schema.ts",
    out: "./src/lib/db/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL ?? '',
  },
  verbose: true,
  strict: true,
})