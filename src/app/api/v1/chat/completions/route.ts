import { getBrief, getDefaultBrief } from "@/lib/research-briefs";
import { buildVoiceSystemPrompt } from "@/lib/voice-prompt";
import {
  streamAnthropicAsOpenAI,
  type OpenAIMessage,
  type OpenAIRequest,
} from "@/lib/voice-anthropic";
import {
  getVoiceRespondentContext,
  getVoiceRespondentContextByPhone,
  getOrCreateVoiceRespondent,
} from "@/lib/voice-store";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
});
const CONTEXT_CACHE_TTL = 600;

export const maxDuration = 60;

export async function POST(req: Request) {
  if (!process.env.CHAT_ANTHROPIC_API_KEY) {
    return new Response("Service not configured", { status: 503 });
  }

  const authHeader = req.headers.get("authorization");
  const expectedToken = process.env.VOICE_PROXY_TOKEN;
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body: OpenAIRequest & { elevenlabs_extra_body?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { messages, elevenlabs_extra_body } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("Messages required", { status: 400 });
  }

  const respondentId = elevenlabs_extra_body?.respondent_id;
  const callerPhone =
    elevenlabs_extra_body?.caller_phone_number ||
    elevenlabs_extra_body?.phone_number;
  if (elevenlabs_extra_body && messages.length <= 2) {
    await redis.set("voice:debug:last-proxy", JSON.stringify({
      extraBodyKeys: Object.keys(elevenlabs_extra_body),
      callerPhone,
      respondentId,
      allValues: elevenlabs_extra_body,
    }), { ex: 600 });
  }
  const briefId =
    elevenlabs_extra_body?.brief_id ||
    process.env.DEFAULT_BRIEF_ID ||
    "grocery-shopping";

  const brief = getBrief(briefId) || getDefaultBrief();

  const lookupKey = respondentId || callerPhone;
  const cacheKey = lookupKey ? `voice:ctx:${lookupKey}` : null;

  let previousWaves: Awaited<ReturnType<typeof getVoiceRespondentContext>>;
  if (cacheKey) {
    const cached = await redis.get<typeof previousWaves>(cacheKey);
    if (cached) {
      previousWaves = cached;
    } else if (respondentId) {
      previousWaves = await getVoiceRespondentContext(respondentId);
      if (previousWaves) await redis.set(cacheKey, previousWaves, { ex: CONTEXT_CACHE_TTL });
    } else if (callerPhone) {
      previousWaves = await getVoiceRespondentContextByPhone(callerPhone);
      if (previousWaves) await redis.set(cacheKey, previousWaves, { ex: CONTEXT_CACHE_TTL });
    }
  }

  // Ensure respondent exists with phone number so webhook and future calls can find them
  if (callerPhone && messages.length <= 2) {
    getOrCreateVoiceRespondent(callerPhone, briefId, callerPhone).catch(() => {});
  }

  const systemPrompt = buildVoiceSystemPrompt(brief, previousWaves);

  let systemFromMessages = "";
  const conversationMessages: { role: "user" | "assistant"; content: string }[] = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      systemFromMessages += msg.content + "\n";
    } else if (msg.role === "user" || msg.role === "assistant") {
      conversationMessages.push({ role: msg.role, content: msg.content });
    }
  }

  const fullSystem = systemFromMessages
    ? `${systemPrompt}\n\nADDITIONAL CONTEXT FROM AGENT:\n${systemFromMessages}`
    : systemPrompt;

  const stream = streamAnthropicAsOpenAI(
    fullSystem,
    conversationMessages,
    body.max_tokens || 300
  );

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (err) {
        console.error("[voice-proxy] streaming error:", err);
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
