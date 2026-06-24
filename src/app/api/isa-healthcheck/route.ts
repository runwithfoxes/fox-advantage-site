import { Resend } from "resend";

// Daily health check for Isa, run by a Vercel cron (see vercel.json).
//
// Why this exists: the old check ran as a cloud Claude routine inside a
// sandbox whose egress proxy blocks runwithfoxes.com, so it returned 403 every
// day and false-alarmed "Isa is down". This route runs ON the deployment, so it
// hits the real public endpoint with no proxy in the way - a genuine check.
//
// It emails Paul EITHER WAY: a quiet "Isa OK" so he knows the check actually
// ran, and a loud "Isa is DOWN" with the error if it failed.

export const maxDuration = 30;

const ALERT_TO = process.env.ISA_ALERT_TO || "pdervan@gmail.com";
const ALERT_FROM = process.env.ISA_ALERT_FROM || "Isa <onboarding@resend.dev>";
// The real public endpoint a visitor would hit. Overridable for testing.
const BASE_URL = process.env.HEALTHCHECK_BASE_URL || "https://runwithfoxes.com";

// Error fingerprints in the chat stream / non-200 bodies that mean "broken".
const ERROR_MARKERS = [
  '"type":"error"',
  "credit balance is too low",
  "not configured",
  "Internal Server Error",
];

interface CheckResult {
  healthy: boolean;
  status: number;
  detail: string;
}

async function checkIsa(): Promise<CheckResult> {
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // chatId starting with "healthcheck" is excluded by isa-alert's test
      // filter, so this ping never triggers a "new dialogue" email.
      body: JSON.stringify({
        id: "healthcheck-cron",
        messages: [
          {
            id: "h1",
            role: "user",
            content: "hello",
            parts: [{ type: "text", text: "hello" }],
          },
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });

    const body = await res.text();

    if (res.status !== 200) {
      return { healthy: false, status: res.status, detail: body.slice(0, 300) };
    }

    const marker = ERROR_MARKERS.find((m) => body.includes(m));
    if (marker) {
      return { healthy: false, status: 200, detail: `stream error: ${marker}` };
    }

    // A healthy reply streams text-delta parts. No text at all is suspicious.
    if (!body.includes("text-delta") && body.trim().length === 0) {
      return { healthy: false, status: 200, detail: "empty response body" };
    }

    return { healthy: true, status: 200, detail: "Isa answered normally." };
  } catch (e) {
    return {
      healthy: false,
      status: 0,
      detail: e instanceof Error ? e.message : String(e),
    };
  }
}

async function notify(result: CheckResult): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  const when = new Date().toLocaleString("en-IE", {
    timeZone: "Europe/Dublin",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (result.healthy) {
    await resend.emails.send({
      from: ALERT_FROM,
      to: ALERT_TO,
      subject: "🦊 Isa OK",
      text: `Daily check passed - Isa answered on ${BASE_URL} (HTTP 200).\n${when}`,
      html: `<div style="font-family:-apple-system,Segoe UI,sans-serif;color:#1A3A4E;">
        <p>✅ <strong>Isa is healthy.</strong></p>
        <p style="color:#777;font-size:13px;">Daily check passed on <code>${BASE_URL}</code> (HTTP 200).<br/>${when}</p>
      </div>`,
    });
  } else {
    await resend.emails.send({
      from: ALERT_FROM,
      to: ALERT_TO,
      subject: "🚨 Isa is DOWN on runwithfoxes.com",
      text: `Daily check FAILED on ${BASE_URL}.\nHTTP status: ${result.status}\nDetail: ${result.detail}\n${when}`,
      html: `<div style="font-family:-apple-system,Segoe UI,sans-serif;color:#1A3A4E;">
        <p>🚨 <strong>Isa failed the daily check.</strong></p>
        <p>HTTP status: <strong>${result.status}</strong></p>
        <p>Detail: <code>${result.detail.replace(/</g, "&lt;")}</code></p>
        <p style="color:#777;font-size:13px;">Checked <code>${BASE_URL}/api/chat</code><br/>${when}</p>
      </div>`,
    });
  }
}

export async function GET(req: Request): Promise<Response> {
  // Vercel auto-injects `Authorization: Bearer ${CRON_SECRET}` if that env var
  // is set. Enforce it when present; stay open (but harmless) if it isn't.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await checkIsa();
  await notify(result);

  return Response.json(result, { status: result.healthy ? 200 : 503 });
}
