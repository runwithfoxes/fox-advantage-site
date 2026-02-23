import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";
import { getSystemPrompt } from "@/lib/chat-system-prompt";
import { saveConversationExchange } from "@/lib/conversation-store";

export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.CHAT_ANTHROPIC_API_KEY) {
    console.error("[chat] CHAT_ANTHROPIC_API_KEY is not set");
    return new Response("Chat is not configured", { status: 503 });
  }

  try {
    const { messages, id: chatId } = await req.json();

    const modelMessages = await convertToModelMessages(messages);

    const provider = createAnthropic({
      apiKey: process.env.CHAT_ANTHROPIC_API_KEY,
    });

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

    const result = streamText({
      model: provider("claude-sonnet-4-20250514"),
      system: getSystemPrompt(),
      messages: modelMessages,
      maxOutputTokens: 400,
      onFinish: async ({ text }) => {
        // Store conversation exchange in Redis
        await saveConversationExchange({
          chatId: chatId || "unknown",
          messageCount: messages.length,
          userMessage: userText,
          isaResponse: text,
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (e) {
    console.error("[chat] error:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
