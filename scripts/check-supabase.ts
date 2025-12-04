import dotenv from 'dotenv';
import path from 'path';

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function checkSupabaseStatus() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Missing Supabase URL or Key in .env.local");
    return;
  }

  console.log("Checking Supabase URL:", url);

  try {
    const response = await fetch(`${url}/rest/v1/`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      }
    });

    console.log("Status Code:", response.status);
    console.log("Status Text:", response.statusText);
    
    if (response.ok) {
        console.log("Supabase REST API is accessible. Project is likely active.");
    } else {
        console.log("Supabase REST API returned error. Project might be paused or keys are wrong.");
        const text = await response.text();
        console.log("Response body:", text);
    }

  } catch (error) {
    console.error("Error fetching Supabase:", error);
  }
}

checkSupabaseStatus();
