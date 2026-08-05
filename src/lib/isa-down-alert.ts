import { Redis } from "@upstash/redis";
import { Resend } from "resend";

// Email Paul the moment a REAL visitor hits a broken Isa.
//
// Why this exists: on 5 Aug 2026 the Anthropic credit balance hit zero at
// 14:51 UTC, mid-conversation with a visitor. Nothing told Paul. Success
// emailed him (onFinish -> sendIsaConversationAlert) and failure did not, so
// the only thing that would ever have caught it was the daily cron in
// vercel.json, which had already run at 08:00 UTC and wasn't due again for 17
// hours. This closes that window: the alert fires on the actual failure, at
// the moment it happens, instead of waiting for a poll.

const ALERT_TO = process.env.ISA_ALERT_TO || "pdervan@gmail.com";
const ALERT_FROM = process.env.ISA_ALERT_FROM || "Isa <onboarding@resend.dev>";

// Roughly one alert per hour. An outage produces an error on every request,
// and Paul only needs telling once. The window resets by TTL, so a long outage
// nudges him again each hour rather than going quiet after the first email.
//
// 50 minutes, not 60, because the health-check cron fires at the top of every
// hour. A full-hour TTL races it: an alert sent at H:00:05 leaves the key alive
// until H+1:00:05, and Vercel's per-minute scheduling can fire the next run at
// H+1:00:02 - which then finds a live key and stays silent for that whole hour.
// On a quiet night the cron is the only thing calling, so that lost hour is a
// real blind spot. A window shorter than the interval closes it.
const THROTTLE_KEY = "isa:down-alert-sent";
const THROTTLE_SECONDS = 50 * 60;

function getRedis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/**
 * Claim the hour's alert slot. Returns true if this invocation should send.
 *
 * SET NX EX is atomic, so concurrent failing requests can't both win. The
 * throttle has to live in Redis rather than module scope: every Vercel
 * invocation may be a cold start, so an in-memory flag would reset and Paul
 * would get an email per failed request.
 */
async function claimAlertSlot(redis: Redis | null): Promise<boolean> {
  // No Redis (local dev, or misconfiguration) means no throttle. Send anyway:
  // a duplicate email is a far cheaper failure than silence.
  if (!redis) return true;
  try {
    const claimed = await redis.set(THROTTLE_KEY, new Date().toISOString(), {
      nx: true,
      ex: THROTTLE_SECONDS,
    });
    return claimed === "OK";
  } catch (e) {
    console.error("[isa-down-alert] throttle check failed, sending anyway:", e);
    return true;
  }
}

/** Plain-English cause for the error messages we've actually seen. */
function explain(errorMessage: string): string | null {
  const msg = errorMessage.toLowerCase();
  if (msg.includes("credit balance")) {
    return "The Anthropic account is out of credit. Add credits at console.anthropic.com under Plans & Billing, and turn on auto-reload so it can't hit zero again.";
  }
  if (msg.includes("not_found_error") || msg.includes("model:")) {
    return "The model ID looks wrong or retired. Check the model in src/app/api/chat/route.ts.";
  }
  if (msg.includes("rate_limit") || msg.includes("overloaded")) {
    return "Anthropic rate-limited or overloaded us. Usually clears on its own, but check again shortly.";
  }
  if (msg.includes("authentication") || msg.includes("invalid x-api-key")) {
    return "CHAT_ANTHROPIC_API_KEY is being rejected. Check the key in the Vercel project settings.";
  }
  return null;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Send the "Isa is down" email. Throttled to one per hour. No-ops if Resend
 * isn't configured. Never throws: this runs inside the chat route's onError
 * handler and must not turn one failure into two.
 */
export async function sendIsaDownAlert(failure: {
  chatId: string;
  userMessage: string;
  errorMessage: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  try {
    const redis = getRedis();
    if (!(await claimAlertSlot(redis))) return;

    const when = new Date().toLocaleString("en-IE", {
      timeZone: "Europe/Dublin",
      dateStyle: "medium",
      timeStyle: "short",
    });
    const cause = explain(failure.errorMessage);

    const textLines = [
      "Isa failed to answer someone on runwithfoxes.com.",
      "",
      `They asked: ${failure.userMessage}`,
      `Error: ${failure.errorMessage}`,
      `Chat: ${failure.chatId}`,
      `Time: ${when}`,
    ];
    if (cause) textLines.push("", `What it usually means: ${cause}`);
    textLines.push(
      "",
      "One alert per hour while this lasts. Full error feed: https://runwithfoxes.com/api/conversations?token=isa-chats-2026"
    );

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: ALERT_FROM,
      to: ALERT_TO,
      subject: "🚨 Isa is DOWN on runwithfoxes.com",
      text: textLines.join("\n"),
      html: `<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:640px;margin:0 auto;color:#1A3A4E;">
        <h2 style="margin:0 0 4px;">🚨 Isa failed to answer someone</h2>
        <p style="margin:0 0 20px;color:#777;font-size:13px;">A real visitor, not a health check. ${when}</p>
        <div style="margin:0 0 6px;padding:10px 14px;background:#f1f1ee;border-left:3px solid #3A7CA5;">
          <strong style="color:#3A7CA5;">They asked</strong><br/>${escapeHtml(failure.userMessage)}
        </div>
        <div style="margin:0 0 16px;padding:10px 14px;background:#fdf0ec;border-left:3px solid #d1442f;">
          <strong style="color:#d1442f;">Error</strong><br/><code>${escapeHtml(failure.errorMessage)}</code>
        </div>
        ${
          cause
            ? `<div style="margin:0 0 16px;padding:12px 16px;background:#fffbe8;border:1px solid #f0e0a8;">
                <strong>What it usually means</strong><br/>${escapeHtml(cause)}
              </div>`
            : ""
        }
        <p style="margin:24px 0 0;font-size:12px;color:#999;">
          Chat <code>${escapeHtml(failure.chatId)}</code>. One alert per hour while this lasts.<br/>
          <a href="https://runwithfoxes.com/api/conversations?token=isa-chats-2026" style="color:#3A7CA5;">Full error feed</a>
        </p>
      </div>`,
    });
  } catch (e) {
    console.error("[isa-down-alert] failed to send:", e);
  }
}
