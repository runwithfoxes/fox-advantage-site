import { NextRequest, NextResponse } from "next/server";
import { getProspectPage } from "@/lib/prospect-pages";
import {
  logProspectEvent,
  getProspectEvents,
  type ProspectEvent,
} from "@/lib/prospect-visit-store";
import { timingSafeEqual } from "crypto";

const VALID_TYPES = new Set(["visit", "section", "open", "download", "resource"]);

// POST: the page reports an event. Only works for a browser that has passed
// the gate (auth cookie scoped to /for/{slug} is not sent here, so we check
// the visitor cookie instead, which is set alongside it).
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = getProspectPage(slug);
  if (!page) return NextResponse.json({ ok: false }, { status: 404 });

  const visitor = req.cookies.get(`for_${slug}_visitor`)?.value;
  if (!visitor) return NextResponse.json({ ok: false }, { status: 403 });

  let body: { type?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body.type || !VALID_TYPES.has(body.type)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await logProspectEvent(slug, {
    type: body.type as ProspectEvent["type"],
    name: typeof body.name === "string" ? body.name.slice(0, 120) : undefined,
    visitor,
    at: new Date().toISOString(),
    ua: req.headers.get("user-agent") ?? undefined,
  });
  return NextResponse.json({ ok: true });
}

// GET: Paul/Jo read the log. Guarded by the same admin token as client feedback.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const token = req.headers.get("x-admin-token") ?? "";
  const expected = process.env.CLIENT_FEEDBACK_ADMIN_TOKEN ?? "";
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (!expected || a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const events = await getProspectEvents(slug);
  return NextResponse.json({ ok: true, slug, count: events.length, events });
}
