// import { drizzle } from 'drizzle-orm/mysql2';
// import mysql from 'mysql2/promise';
// import * as schema from './schema';
 
// export const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   multipleStatements: true,
// });
 
// export const db = drizzle(connection, { schema });

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from "./schema";
import * as dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

if (!process.env.POSTGRES_URL) {
  throw new Error("❌ Missing POSTGRES_URL in .env file!");
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Ensure this comes from .env
});

export const db = drizzle(pool, { schema });

console.log("✅ Database connected (Local)");
