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

async function resolveCallerPhone(
  messages: OpenAIMessage[],
  elevenlabsExtraBody?: Record<string, string>
): Promise<string | undefined> {
  // 1. Check elevenlabs_extra_body (outbound calls pass phone here)
  const fromBody =
    elevenlabsExtraBody?.caller_phone_number ||
    elevenlabsExtraBody?.phone_number;
  if (fromBody) return fromBody;

  // 2. Check system message for dynamic variable substitution
  const systemMsg = messages.find((m) => m.role === "system");
  if (systemMsg?.content) {
    const match = systemMsg.content.match(/CALLER_PHONE:\s*(\+\d{6,15})/);
    if (match) return match[1];
  }

  // 3. Check Redis cache (set by previous turn's ElevenLabs API lookup)
  const cached = await redis.get<string>("voice:current-caller-phone");
  if (cached) return cached;

  // 4. On turn 2+, query ElevenLabs API for the active conversation's phone
  if (messages.length > 2 && process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_AGENT_ID) {
    try {
      const listResp = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversations?agent_id=${process.env.ELEVENLABS_AGENT_ID}&page_size=3`,
        { headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY } }
      );
      const listData = await listResp.json();
      const conversations = listData.conversations || [];

      const nowSecs = Date.now() / 1000;
      const active = conversations.find(
        (c: { status: string; start_time_unix_secs: number }) =>
          c.status !== "done" || (nowSecs - c.start_time_unix_secs < 300)
      );

      await redis.set("voice:debug:lookup", JSON.stringify({
        messageCount: messages.length,
        conversationCount: conversations.length,
        statuses: conversations.map((c: { status: string; start_time_unix_secs: number; conversation_id: string }) => ({
          id: c.conversation_id,
          status: c.status,
          ageSecs: Math.round(nowSecs - c.start_time_unix_secs),
        })),
        activeFound: active?.conversation_id || null,
      }), { ex: 3600 });

      if (!active) return undefined;

      const detailResp = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversations/${active.conversation_id}`,
        { headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY } }
      );
      const detail = await detailResp.json();
      const phone =
        detail.user_id ||
        (detail.metadata?.phone_call as { external_number?: string })?.external_number;

      await redis.set("voice:debug:lookup-detail", JSON.stringify({
        conversationId: active.conversation_id,
        userId: detail.user_id,
        phoneFromMeta: (detail.metadata?.phone_call as { external_number?: string })?.external_number,
        resolvedPhone: phone,
        phoneValid: phone ? /^\+\d{6,15}$/.test(phone) : false,
      }), { ex: 3600 });

      if (phone && /^\+\d{6,15}$/.test(phone)) {
        await redis.set("voice:current-caller-phone", phone, { ex: CONTEXT_CACHE_TTL });
        return phone;
      }
    } catch (err) {
      await redis.set("voice:debug:lookup-error", String(err), { ex: 3600 });
    }
  }

  return undefined;
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

  const respondentId = elevenlabs_extra_body?.respondent_id;
  const callerPhone = await resolveCallerPhone(messages, elevenlabs_extra_body);

  if (messages.length <= 2) {
    const systemMsg = messages.find((m: OpenAIMessage) => m.role === "system");
    await redis.set("voice:debug:last-proxy", JSON.stringify({
      allBodyKeys: Object.keys(body),
      resolvedPhone: callerPhone || null,
      systemMessageContent: systemMsg?.content || null,
      messageCount: messages.length,
    }), { ex: 3600 });
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
