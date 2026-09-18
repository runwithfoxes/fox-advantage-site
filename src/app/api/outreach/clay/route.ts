import { sql } from "@vercel/postgres";

// Receives finished rows from the Clay table "RWF outreach - domain to marketer
// email" and hands them back to the outreach desk's rails.
// Built 4 Sep 2026 so the loop needs no Google Sheet and no Google account:
// Clay POSTs one row per company when its email waterfall finishes, the rails
// GET the rows for a wave. Both sides carry the shared token. Without the
// token every call is a 401 and nothing is written or read.

function authed(req: Request) {
  const t = process.env.OUTREACH_CLAY_TOKEN;
  if (!t) return false;
  const h = req.headers.get("x-outreach-token");
  const q = new URL(req.url).searchParams.get("token");
  return h === t || q === t;
}

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS outreach_clay_results (
      id SERIAL PRIMARY KEY,
      wave TEXT,
      domain TEXT,
      company TEXT,
      name TEXT,
      first_name TEXT,
      last_name TEXT,
      title TEXT,
      linkedin TEXT,
      email TEXT,
      email_status TEXT,
      raw JSONB,
      received_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function POST(req: Request) {
  if (!authed(req)) return new Response("Unauthorized", { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  const s = (k: string) => {
    const v = body[k];
    return v === undefined || v === null ? null : String(v).slice(0, 500);
  };
  try {
    await ensureTable();
    await sql`
      INSERT INTO outreach_clay_results
        (wave, domain, company, name, first_name, last_name, title, linkedin, email, email_status, raw)
      VALUES
        (${s("wave")}, ${s("domain")}, ${s("company")}, ${s("name")}, ${s("first_name")},
         ${s("last_name")}, ${s("title")}, ${s("linkedin")}, ${s("email")}, ${s("email_status")},
         ${JSON.stringify(body)}::jsonb)
    `;
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[outreach/clay] insert failed:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  if (!authed(req)) return new Response("Unauthorized", { status: 401 });
  const wave = new URL(req.url).searchParams.get("wave");
  try {
    await ensureTable();
    const result = wave
      ? await sql`SELECT * FROM outreach_clay_results WHERE wave = ${wave} ORDER BY received_at`
      : await sql`SELECT * FROM outreach_clay_results ORDER BY received_at DESC LIMIT 500`;
    return Response.json({ total: result.rows.length, rows: result.rows });
  } catch (e) {
    console.error("[outreach/clay] read failed:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
