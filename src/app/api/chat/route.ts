import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";
import { getSystemPrompt } from "@/lib/chat-system-prompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.CHAT_ANTHROPIC_API_KEY) {
    console.error("[chat] CHAT_ANTHROPIC_API_KEY is not set");
    return new Response("Chat is not configured", { status: 503 });
  }

  try {
    const { messages } = await req.json();

    const modelMessages = await convertToModelMessages(messages);

    const provider = createAnthropic({
      apiKey: process.env.CHAT_ANTHROPIC_API_KEY,
    });

    const result = streamText({
      model: provider("claude-sonnet-4-20250514"),
      system: getSystemPrompt(),
      messages: modelMessages,
      maxOutputTokens: 1024,
    });

    return result.toUIMessageStreamResponse();
  } catch (e) {
    console.error("[chat] error:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
