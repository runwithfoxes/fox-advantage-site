import { NextRequest, NextResponse } from "next/server";
import {
  getClientFeedback,
  appendThreadEntry,
  resetAsset,
} from "@/lib/client-feedback-store";

function authed(req: NextRequest): boolean {
  const token = process.env.CLIENT_FEEDBACK_ADMIN_TOKEN;
  return !!token && req.headers.get("x-admin-token") === token;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!authed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { slug } = await params;
  const fb = await getClientFeedback(slug);
  return NextResponse.json(fb);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!authed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { slug } = await params;
  let body: { assetId?: string; action?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const { assetId, action, text } = body;
  if (!assetId || !action) return NextResponse.json({ error: "missing fields" }, { status: 400 });

  if (action === "reply") {
    if (!text?.trim()) return NextResponse.json({ error: "empty reply" }, { status: 400 });
    await appendThreadEntry(slug, assetId, "Paul", text);
  } else if (action === "reset") {
    await resetAsset(slug, assetId);
  } else {
    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
