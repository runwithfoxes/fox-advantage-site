import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CHAT_ANTHROPIC_API_KEY!,
});

export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenAIRequest {
  model?: string;
  messages: OpenAIMessage[];
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
}

export async function* streamAnthropicAsOpenAI(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[],
  maxTokens: number = 300
): AsyncGenerator<string> {
  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    system: [
      {
        type: "text",
        text: systemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
    max_tokens: maxTokens,
  });

  const id = `chatcmpl-${Date.now()}`;
  let hasStarted = false;

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      if (!hasStarted) {
        hasStarted = true;
      }

      const chunk = {
        id,
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: "claude-sonnet-4-20250514",
        choices: [
          {
            index: 0,
            delta: { content: event.delta.text },
            finish_reason: null,
          },
        ],
      };
      yield `data: ${JSON.stringify(chunk)}\n\n`;
    }
  }

  const doneChunk = {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model: "claude-sonnet-4-20250514",
    choices: [
      {
        index: 0,
        delta: {},
        finish_reason: "stop",
      },
    ],
  };
  yield `data: ${JSON.stringify(doneChunk)}\n\n`;
  yield `data: [DONE]\n\n`;
}
