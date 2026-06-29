import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { getSystemPrompt } from "@/lib/chat-system-prompt";
import {
  saveConversationExchange,
  saveError,
  saveInboundQuestion,
} from "@/lib/conversation-store";
import { getRateLimiter } from "@/lib/rate-limit";

export const maxDuration = 30;

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

  const { messages, id: chatId } = body as {
    messages?: unknown;
    id?: unknown;
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
    });

    const result = streamText({
      model: provider("claude-sonnet-4-6"),
      system: getSystemPrompt(sanitizedChatId),
      messages: modelMessages,
      maxOutputTokens: 200,
      onFinish: async ({ text }) => {
        await saveConversationExchange({
          chatId: sanitizedChatId,
          messageCount: messages.length,
          userMessage: userText,
          isaResponse: text,
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
