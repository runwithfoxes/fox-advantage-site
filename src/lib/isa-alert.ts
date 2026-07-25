import { Resend } from "resend";

interface AlertExchange {
  timestamp: string;
  userMessage: string;
  isaResponse: string;
}

interface AlertConversation {
  chatId: string;
  startedAt: string;
  lastMessageAt: string;
  exchanges: AlertExchange[];
  /** "preview" / "local" = our own traffic. Absent on pre-25-Jul-2026 records. */
  source?: "production" | "preview" | "local";
}

// Conversations whose chatId starts with any of these are internal tests
// (our /isa healthchecks, capture tests) and must never trigger an email.
const TEST_ID_PREFIXES = ["healthcheck", "capture-test", "test"];

const ALERT_TO = process.env.ISA_ALERT_TO || "pdervan@gmail.com";
// onboarding@resend.dev works with no domain verification, but only delivers to
// the address you signed up to Resend with. Once runwithfoxes.com is verified in
// Resend, set ISA_ALERT_FROM to e.g. "Isa <isa@runwithfoxes.com>".
const ALERT_FROM = process.env.ISA_ALERT_FROM || "Isa <onboarding@resend.dev>";

function isTestChat(chatId: string): boolean {
  const id = chatId.toLowerCase();
  return TEST_ID_PREFIXES.some((p) => id.startsWith(p));
}

/** Pull any email addresses / phone numbers the visitor typed into the chat. */
function extractContactDetails(conversation: AlertConversation): {
  emails: string[];
  phones: string[];
} {
  const text = conversation.exchanges.map((e) => e.userMessage).join("\n");
  const emails = Array.from(
    new Set(text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [])
  );
  const phones = Array.from(
    new Set(
      (text.match(/(?:(?:\+|00)\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?){2,5}\d{2,4}/g) || [])
        .map((p) => p.trim())
        .filter((p) => p.replace(/\D/g, "").length >= 7)
    )
  );
  return { emails, phones };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Escape, then turn Isa's markdown links + newlines into HTML. */
function renderMessage(s: string): string {
  return escapeHtml(s)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" style="color:#3A7CA5;">$1</a>'
    )
    .replace(/\n/g, "<br/>");
}

function buildHtml(conversation: AlertConversation): string {
  const { emails, phones } = extractContactDetails(conversation);
  const started = new Date(conversation.startedAt).toLocaleString("en-IE", {
    timeZone: "Europe/Dublin",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const contactBlock =
    emails.length || phones.length
      ? `<div style="margin:0 0 20px;padding:12px 16px;background:#eef6ec;border:1px solid #cfe3c9;">
          <strong style="color:#1A3A4E;">Contact details given:</strong><br/>
          ${emails.map((e) => `📧 <a href="mailto:${e}">${escapeHtml(e)}</a>`).join("<br/>")}
          ${emails.length && phones.length ? "<br/>" : ""}
          ${phones.map((p) => `📞 ${escapeHtml(p)}`).join("<br/>")}
        </div>`
      : "";

  const dialogue = conversation.exchanges
    .map(
      (e) => `
      <div style="margin:0 0 16px;">
        <div style="margin:0 0 6px;padding:10px 14px;background:#f1f1ee;border-left:3px solid #3A7CA5;">
          <strong style="color:#3A7CA5;">Visitor</strong><br/>${escapeHtml(e.userMessage)}
        </div>
        <div style="margin:0;padding:10px 14px;background:#fafaf8;border-left:3px solid #F47521;">
          <strong style="color:#F47521;">Isa</strong><br/>${renderMessage(e.isaResponse)}
        </div>
      </div>`
    )
    .join("");

  return `<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;max-width:640px;margin:0 auto;color:#1A3A4E;">
    <h2 style="margin:0 0 4px;">🦊 New dialogue with Isa</h2>
    <p style="margin:0 0 20px;color:#777;font-size:13px;">
      ${conversation.exchanges.length} message${conversation.exchanges.length === 1 ? "" : "s"} · started ${started} · chat <code>${escapeHtml(conversation.chatId)}</code>
    </p>
    ${contactBlock}
    ${dialogue}
    <p style="margin:24px 0 0;font-size:12px;color:#999;">Sent automatically when someone chats to Isa on runwithfoxes.com.</p>
  </div>`;
}

function buildText(conversation: AlertConversation): string {
  const { emails, phones } = extractContactDetails(conversation);
  const lines: string[] = [`New dialogue with Isa (${conversation.exchanges.length} messages)`, ""];
  if (emails.length || phones.length) {
    lines.push("Contact details given:");
    emails.forEach((e) => lines.push(`  email: ${e}`));
    phones.forEach((p) => lines.push(`  phone: ${p}`));
    lines.push("");
  }
  conversation.exchanges.forEach((e) => {
    lines.push(`Visitor: ${e.userMessage}`);
    lines.push(`Isa: ${e.isaResponse}`);
    lines.push("");
  });
  return lines.join("\n");
}

/**
 * Email Paul when someone starts a dialogue with Isa. Called once per
 * conversation (on its first exchange) by the store. The threading header keeps
 * it tidy if that ever changes. No-ops if RESEND_API_KEY is unset or it's an
 * internal test chat.
 *
 * ⭐ A NAMED TEST ID IS NOT THE ONLY KIND OF OUR-OWN-TRAFFIC. A page under
 * construction on a preview or localhost generates ordinary random chat IDs and
 * used to email exactly like a prospect. The source check is the one that holds.
 */
export async function sendIsaConversationAlert(
  conversation: AlertConversation
): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  if (isTestChat(conversation.chatId)) return;
  if (conversation.source && conversation.source !== "production") return;
  if (!conversation.exchanges.length) return;

  const firstQuestion = conversation.exchanges[0].userMessage.slice(0, 80);
  const threadRef = `<isa-chat-${conversation.chatId}@runwithfoxes.com>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: ALERT_FROM,
      to: ALERT_TO,
      subject: `🦊 Isa chat: ${firstQuestion}${firstQuestion.length === 80 ? "…" : ""}`,
      html: buildHtml(conversation),
      text: buildText(conversation),
      // References ties every email for one chatId into a single Gmail thread.
      headers: { References: threadRef, "In-Reply-To": threadRef },
    });
  } catch (e) {
    console.error("[isa-alert] failed to send:", e);
  }
}
