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
const PHONE_CACHE_KEY = "voice:caller-phone";

export const maxDuration = 60;

async function lookupPhoneFromElevenLabs(): Promise<string | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  if (!apiKey || !agentId) return null;

  const listResp = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations?agent_id=${agentId}&page_size=3`,
    { headers: { "xi-api-key": apiKey } }
  );
  const listData = await listResp.json();
  const conversations = listData.conversations || [];

  const nowSecs = Date.now() / 1000;
  const active = conversations.find(
    (c: { status: string; start_time_unix_secs: number }) =>
      c.status !== "done" || nowSecs - c.start_time_unix_secs < 300
  );
  if (!active) return null;

  const detailResp = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${active.conversation_id}`,
    { headers: { "xi-api-key": apiKey } }
  );
  const detail = await detailResp.json();
  const phone =
    detail.user_id ||
    (detail.metadata?.phone_call as { external_number?: string })
      ?.external_number;

  if (phone && /^\+\d{6,15}$/.test(phone)) return phone;
  return null;
}

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

  // --- Resolve caller phone (4 layers) ---
  let callerPhone: string | undefined;

  // Layer 1: elevenlabs_extra_body (outbound calls)
  callerPhone =
    elevenlabs_extra_body?.caller_phone_number ||
    elevenlabs_extra_body?.phone_number;

  // Layer 2: Redis cache from previous turn
  if (!callerPhone) {
    const cached = await redis.get<string>(PHONE_CACHE_KEY);
    if (cached) callerPhone = cached;
  }

  // Layer 4: ElevenLabs API lookup (turn 2+)
  if (!callerPhone && messages.length > 2) {
    try {
      const phone = await lookupPhoneFromElevenLabs();
      if (phone) {
        callerPhone = phone;
        await redis.set(PHONE_CACHE_KEY, phone, { ex: CONTEXT_CACHE_TTL });
      }
    } catch {
      // Non-critical
    }
  }

  const respondentId = elevenlabs_extra_body?.respondent_id;
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
      if (previousWaves)
        await redis.set(cacheKey, previousWaves, { ex: CONTEXT_CACHE_TTL });
    } else if (callerPhone) {
      previousWaves = await getVoiceRespondentContextByPhone(callerPhone);
      if (previousWaves)
        await redis.set(cacheKey, previousWaves, { ex: CONTEXT_CACHE_TTL });
    }
  }

  if (callerPhone && messages.length <= 2) {
    getOrCreateVoiceRespondent(callerPhone, briefId, callerPhone).catch(
      () => {}
    );
  }

  const systemPrompt = buildVoiceSystemPrompt(brief, previousWaves);

  let systemFromMessages = "";
  const conversationMessages: { role: "user" | "assistant"; content: string }[] =
    [];

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
