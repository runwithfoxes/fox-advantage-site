import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";
import { getSystemPrompt } from "@/lib/chat-system-prompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const provider = createAnthropic({
    apiKey: process.env.CHAT_ANTHROPIC_API_KEY,
    baseURL: "https://api.anthropic.com/v1",
  });

  const result = streamText({
    model: provider("claude-sonnet-4-20250514"),
    system: getSystemPrompt(),
    messages: modelMessages,
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
}
