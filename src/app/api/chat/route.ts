import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { getSystemPrompt } from "@/lib/chat-system-prompt";
import {
  currentSource,
  saveConversationExchange,
  saveError,
  saveInboundQuestion,
} from "@/lib/conversation-store";
import { getRateLimiter } from "@/lib/rate-limit";
import { MODULES_BY_N } from "@/app/course/moduleData";

export const maxDuration = 30;

/**
 * Module-scoped Isa, for the widget in the module page rail.
 *
 * ⭐ THE CLIENT SENDS A NUMBER, NOT TEXT. The context is built HERE from module data
 * the server already holds, so nothing a visitor can type ever reaches the system
 * prompt. Accepting a context string from the browser would be a prompt-injection
 * hole dressed up as a feature.
 *
 * Additive only: no moduleN means the site-wide Isa is completely unchanged.
 */
function moduleContext(n: unknown): string {
  if (typeof n !== "number" || !Number.isInteger(n)) return "";
  const mod = MODULES_BY_N[n];
  if (!mod) return "";

  /**
   * ⭐ SHE GETS THE FULL TEXT, NOT JUST THE TITLES. Until 25 Jul 2026 this sent the
   * item headings alone plus an instruction not to invent the rest. She invented the
   * rest anyway: asked what "Brief it like a person" means she produced a fluent
   * four-part framework and a worked example, when Paul's actual item is five named
   * headings (Task, Background, Audience, Format, Bar). A model handed a title and
   * told not to elaborate will elaborate. The fix is to give it the words.
   *
   * Every `text` and `prompt` below is Paul's, verbatim, from "20 things I do to get
   * more out of AI". That is why she can be told to quote rather than paraphrase.
   */
  const items = mod.items
    .map((it, i) => {
      const parts = [`${i + 1}. ${it.t}`, `   What it says: ${it.text}`];
      if (it.prompt) {
        parts.push(`   The exact prompt on the page:\n${it.prompt
          .split("\n")
          .map((l) => `   > ${l}`)
          .join("\n")}`);
      }
      if (it.placeholder) {
        parts.push(
          `   ⚠️ DRAFT, not Paul's final words. Answer around it, never quote it back.`
        );
      }
      return parts.join("\n");
    })
    .join("\n\n");

  return `

## YOU ARE ON A COURSE MODULE PAGE, AND YOU ARE SCOPED TO IT

The reader is on module ${mod.n} of 6 of "AI Fluency for Ambitious Marketers",
titled "${mod.title}", which opens ${mod.when}.

What the module is about: ${mod.blurb}

The ${mod.items.length} things in it, in order, with Paul's own words for each:

${items}

How to behave here:
- Answer about THIS module first, USING THE WORDS ABOVE. They are Paul's, so quote or
  closely paraphrase them. Do not restate an item in your own framework, and do not
  add steps, headings or examples that are not there.
- If an item has a prompt, give them that prompt exactly as written. Never write your
  own version of it and never present an invented example as if it came from the course.
- If they ask something the text above does not answer, say plainly that the module
  does not cover it and offer what you do know from the rest of the site. Guessing and
  sounding right is the failure mode here.
- If they paste something back and ask whether it does the job, judge it against the
  item they name and say plainly what is missing. Be useful, not encouraging.
- If they ask about something outside the module, answer briefly and bring it back.
- The module is not live until ${mod.when}. NEVER say it is available now, and never
  offer links to videos or materials that do not exist yet.`;
}

const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES_PER_REQUEST = 20;

export async function POST(req: Request) {
  if (!process.env.CHAT_ANTHROPIC_API_KEY) {
    console.error("[chat] CHAT_ANTHROPIC_API_KEY is not set");
    return new Response("Chat is not configured", { status: 503 });
  }

  // --- Rate limiting ---
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const limiter = getRateLimiter();
  if (limiter) {
    const { success, remaining } = await limiter.limit(ip);
    if (!success) {
      return new Response("Too many requests. Please wait a moment.", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
    // Optional: expose remaining for debugging (remove if you prefer not to)
    void remaining;
  }

  // --- Input validation ---
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return new Response("Invalid request body", { status: 400 });
  }

  const { messages, id: chatId, moduleN } = body as {
    messages?: unknown;
    id?: unknown;
    moduleN?: unknown;
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Messages must be a non-empty array", { status: 400 });
  }

  if (messages.length > MAX_MESSAGES_PER_REQUEST) {
    return new Response(
      `Too many messages. Maximum ${MAX_MESSAGES_PER_REQUEST} per request.`,
      { status: 400 }
    );
  }

  // Validate each message has a role and reasonable content length
  for (const msg of messages) {
    if (!msg || typeof msg !== "object" || !("role" in msg)) {
      return new Response("Each message must have a role", { status: 400 });
    }

    const textContent =
      msg.parts?.find((p: { type: string }) => p.type === "text")?.text ||
      msg.content ||
      "";

    if (typeof textContent === "string" && textContent.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`,
        { status: 400 }
      );
    }
  }

  const sanitizedChatId =
    typeof chatId === "string" ? chatId.slice(0, 50).replace(/[^a-zA-Z0-9_-]/g, "") : "unknown";

  try {
    const provider = createAnthropic({
      apiKey: process.env.CHAT_ANTHROPIC_API_KEY,
    });

    // Convert UI messages to simple {role, content} model messages
    const modelMessages = messages.map((m: { role: string; parts?: { type: string; text?: string }[]; content?: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.parts?.filter(p => p.type === "text").map(p => p.text).join("") || m.content || "",
    }));

    // Extract the latest user message for logging
    const latestUserMessage = messages
      .filter((m: { role: string }) => m.role === "user")
      .pop();
    const userText =
      latestUserMessage?.parts?.find(
        (p: { type: string }) => p.type === "text"
      )?.text ||
      latestUserMessage?.content ||
      "";

    // Capture the question the moment it arrives, before the model is called.
    // onFinish only fires on a successful reply, so this is what guarantees we
    // still have the question if the model errors, times out, or crashes.
    await saveInboundQuestion({
      chatId: sanitizedChatId,
      messageCount: messages.length,
      userMessage: userText,
      source: currentSource(),
    });

    const result = streamText({
      model: provider("claude-sonnet-4-6"),
      system: getSystemPrompt(sanitizedChatId) + moduleContext(moduleN),
      messages: modelMessages,
      maxOutputTokens: 200,
      onFinish: async ({ text }) => {
        await saveConversationExchange({
          chatId: sanitizedChatId,
          messageCount: messages.length,
          userMessage: userText,
          isaResponse: text,
          source: currentSource(),
        });
      },
      onError: async (event) => {
        // Streaming errors (e.g. a bad/retired model) never reach the catch
        // block below, so record them here with the actual question + detail.
        const err = (event as { error?: unknown }).error;
        console.error("[chat] stream error:", err);
        await saveError({
          userMessage: userText,
          errorMessage: err instanceof Error ? err.message : String(err),
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (e) {
    console.error("[chat] error:", e);
    await saveError({
      userMessage: "unknown",
      errorMessage: e instanceof Error ? e.message : String(e),
    });
    return new Response("Internal Server Error", { status: 500 });
  }
}
