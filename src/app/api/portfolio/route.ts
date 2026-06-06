import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolio-data.json");

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Check if Supabase config is active
const isSupabaseActive = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Helper to read data
async function readPortfolioData() {
  if (isSupabaseActive) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio?id=eq.1`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        cache: "no-store"
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0) {
          return rows[0].data;
        }
      }
      console.warn("Supabase read failed or returned empty. Falling back to local file.");
    } catch (error) {
      console.error("Error fetching from Supabase:", error);
    }
  }

  // Local file fallback
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading local portfolio data file:", error);
    return null;
  }
}

// Helper to write data
async function writePortfolioData(data: any) {
  if (isSupabaseActive) {
    try {
      // 1. Try to patch the existing row
      const res = await fetch(`${SUPABASE_URL}/rest/v1/portfolio?id=eq.1`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify({ data })
      });
      
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0) return true;
      }
      
      // 2. If row 1 doesn't exist, insert it (upsert)
      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/portfolio`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates"
        },
        body: JSON.stringify({ id: 1, data })
      });
      if (insertRes.ok) return true;
      
      console.warn("Supabase write failed. Falling back to local file.");
    } catch (error) {
      console.error("Error saving to Supabase:", error);
    }
  }

  // Local file write
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing local portfolio data file:", error);
    return false;
  }
}

export async function GET() {
  const data = await readPortfolioData();
  if (!data) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, data } = body;

    // Password validation
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
    if (password !== expectedPassword) {
      return NextResponse.json({ error: "Unauthorized: Invalid password" }, { status: 401 });
    }

    if (!data) {
      return NextResponse.json({ error: "Missing data payload" }, { status: 400 });
    }

    // Write to active storage
    const success = await writePortfolioData(data);
    if (!success) {
      return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Portfolio data updated successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body or internal error" }, { status: 500 });
  }
}
