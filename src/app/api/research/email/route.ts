import { saveEmail } from "@/lib/research-store";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return new Response("Invalid request body", { status: 400 });
  }

  const { refId, email } = body as { refId?: string; email?: string };

  if (!refId || typeof refId !== "string") {
    return Response.json({ error: "refId required" }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !email.includes("@") || email.length > 320) {
    return Response.json({ error: "Valid email required" }, { status: 400 });
  }

  const sanitizedRefId = refId.slice(0, 100).replace(/[^a-zA-Z0-9_-]/g, "");
  const sanitizedEmail = email.trim().toLowerCase().slice(0, 320);

  try {
    await saveEmail(sanitizedRefId, sanitizedEmail);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[research/email] error:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
