import { neon } from '@neondatabase/serverless';
import 'dotenv/config'; // ✅ Load .env automatically

// Optional safety check
if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in .env");
}

export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transaction (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `;
    console.log("Database init successful");
  } catch (error) {
    console.error("Database init failed:", error);
    process.exit(1);
  }
}
