// import { sql } from "@vercel/postgres";
// import { drizzle } from "drizzle-orm/vercel-postgres";
// import { migrate } from "drizzle-orm/vercel-postgres/migrator";

// import "dotenv/config";

// async function runMigrate() {
//   if (!process.env.POSTGRES_URL) {
//     throw new Error("POSTGRES_DATABASE is not defined");
//   }
//   const db = drizzle(sql);

//   //console.log("Running migrations...");

//   const start = Date.now();
//   await migrate(db, { migrationsFolder: "src/lib/db/migrations" });
//   const end = Date.now();

//   //console.log(`✅ Migrations completed in ${end - start}ms`);

//   process.exit(0);
// }

// runMigrate().catch((err) => {
//   console.error("❌ Migration failed");
//   console.error(err);
//   process.exit(1);
// });

// import { sql } from '@vercel/postgres';
// import { eq, sql as sqlDrizzle } from 'drizzle-orm';
// import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
// import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
// import { migrate as migrateNode } from 'drizzle-orm/node-postgres/migrator';
// import { migrate as migrateVercel } from 'drizzle-orm/vercel-postgres/migrator';
// import { configDotenv } from 'dotenv';

// // import { Pool } from 'pg';

// // import { languageCard, NewLanguageCard } from './schema';

// // //console.log('process.env.NODE_ENV', process.env.NODE_ENV);
// //console.log('process.env.POSTGRES_URL', process.env.POSTGRES_URL);

// const db = drizzleVercel(sql)
//   // process.env.NODE_ENV === 'production'
//     // ? drizzleVercel(sql)
//     // : drizzleNode(new Pool({ connectionString: process.env.POSTGRES_URL }));

// export async function dbMigrate() {
//   // if (process.env.NODE_ENV === 'production')
//   await migrateVercel(db, { migrationsFolder: "src/lib/db/migrations" });
//   process.exit(0);
//     // await migrateVercel(db, { migrationsFolder: './drizzle' });
//   // else await migrateNode(db, { migrationsFolder: './drizzle' });
// }

// dbMigrate().catch((err) => {
//   console.error("❌ Migration failed");
//   console.error(err);
//   process.exit(1);
// });

import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from "@vercel/postgres";
import * as schema from '@/lib/db/schema'

export const db = drizzle(sql, { schema });
migrate(db, { migrationsFolder: "src/lib/db/migrations" });