import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        host: "aws-1-eu-west-2.pooler.supabase.com",
        port: 6543,
        user: "postgres.lmrchyurzohxcgmqqlyo",
        password: "ScoundrelGame2025",
        database: "postgres",
        ssl: { rejectUnauthorized: false },
    },
});
