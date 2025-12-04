import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testConnection() {
    console.log("Testing connection to:", process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

    const client = new Client({
        host: 'aws-0-us-east-1.pooler.supabase.com',
        port: 6543,
        user: 'postgres.lmrchyurzohxcgmqqlyo',
        password: 'hdVD?#!YD4z946-',
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
    });

    try {
        await client.connect();
        console.log("Successfully connected to database!");

        const res = await client.query('SELECT NOW() as now, current_database() as db');
        console.log("Database time:", res.rows[0].now);
        console.log("Database name:", res.rows[0].db);

        const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log("Tables in public schema:", tables.rows.map(r => r.table_name));

        await client.end();
    } catch (err: any) {
        console.error("Connection error message:", err.message);
        console.error("Connection error code:", err.code);
        // console.error("Full error:", JSON.stringify(err, null, 2)); // Circular structure might fail JSON.stringify
        process.exit(1);
    }
}

testConnection();
