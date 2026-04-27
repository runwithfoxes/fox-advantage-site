import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const res = await fetch("https://runwithfoxes.substack.com/api/v1/free", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      first_url: req.headers.get("referer") || "https://runwithfoxes.com/book",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: text || "Substack returned an error" },
      { status: res.status }
    );
  }

  return NextResponse.json({ ok: true });
}
