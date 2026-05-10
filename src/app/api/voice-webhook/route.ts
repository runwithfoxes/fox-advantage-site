import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { Redis } from "@upstash/redis";
import { getBrief, getDefaultBrief } from "@/lib/research-briefs";
import {
  buildExtractionPrompt,
  buildSummaryPrompt,
  buildKnowledgeExtractionPrompt,
} from "@/lib/voice-prompt";
import {
  getOrCreateVoiceRespondent,
  createVoiceTranscript,
  saveVoiceExtraction,
  saveVoiceEmail,
  saveRespondentKnowledge,
  getNextWaveNumber,
} from "@/lib/voice-store";

export const maxDuration = 60;

interface ElevenLabsConversationData {
  conversation_id: string;
  agent_id: string;
  status: string;
  user_id?: string;
  transcript: {
    role: string;
    message: string;
    time_in_call_secs?: number;
  }[];
  metadata?: Record<string, unknown>;
  call_duration_secs?: number;
  analysis?: {
    call_successful?: boolean;
    transcript_summary?: string;
  };
}

interface ElevenLabsWebhookPayload {
  type: string;
  event_timestamp?: number;
  data: ElevenLabsConversationData;
}

export async function POST(req: Request) {
  // ElevenLabs uses HMAC-based signatures via elevenlabs-signature header.
  // For now, verify the header exists when a secret is configured.
  const webhookSecret = process.env.ELEVENLABS_WEBHOOK_SECRET;
  if (webhookSecret) {
    const signature = req.headers.get("elevenlabs-signature");
    if (!signature) {
      return new Response("Missing signature", { status: 401 });
    }
  }

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const conversation: ElevenLabsConversationData =
    (raw.data as ElevenLabsConversationData) ?? (raw as unknown as ElevenLabsConversationData);

  if (!conversation.conversation_id || !conversation.transcript) {
    console.error("[voice-webhook] missing fields:", JSON.stringify(Object.keys(raw)));
    return new Response("Missing required fields", { status: 400 });
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
    token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
  });
  const debugInfo = {
    rawKeys: Object.keys(raw),
    dataKeys: Object.keys(conversation),
    metadata: conversation.metadata,
    conversationId: conversation.conversation_id,
    allStringValues: Object.fromEntries(
      Object.entries(conversation).filter(([, v]) => typeof v === "string")
    ),
  };
  await redis.set("voice:debug:last-webhook", JSON.stringify(debugInfo), { ex: 600 });

  // For inbound phone calls, ElevenLabs puts the caller's number in user_id and metadata.phone_call.external_number
  const phoneCall = conversation.metadata?.phone_call as { external_number?: string } | undefined;
  const phone = conversation.user_id || phoneCall?.external_number || undefined;
  const respondentId = phone || conversation.conversation_id;
  const callDuration = (conversation.metadata?.call_duration_secs as number) ?? null;
  const briefId = "grocery-shopping";

  const brief = getBrief(briefId) || getDefaultBrief();

  try {
    const respondent = await getOrCreateVoiceRespondent(
      respondentId,
      briefId,
      phone
    );

    if (!respondent) {
      console.error("[voice-webhook] failed to create respondent");
      return new Response("Storage error", { status: 500 });
    }

    const wave = await getNextWaveNumber(respondent.id);

    const transcriptId = await createVoiceTranscript(
      respondent.id,
      wave,
      briefId,
      conversation.conversation_id,
      conversation.transcript,
      callDuration
    );

    if (!transcriptId) {
      console.error("[voice-webhook] failed to create transcript");
      return new Response("Storage error", { status: 500 });
    }

    const transcriptText = conversation.transcript
      .map((t) => `${t.role === "user" ? "Respondent" : "Interviewer"}: ${t.message}`)
      .join("\n\n");

    if (!process.env.CHAT_ANTHROPIC_API_KEY) {
      return new Response("OK (no extraction - API key missing)", { status: 200 });
    }

    const provider = createAnthropic({
      apiKey: process.env.CHAT_ANTHROPIC_API_KEY,
    });

    const [extractionResult, summaryResult, knowledgeResult] =
      await Promise.all([
        generateText({
          model: provider("claude-haiku-4-5-20251001"),
          system: buildExtractionPrompt(brief),
          messages: [{ role: "user", content: transcriptText }],
          maxOutputTokens: 500,
        }),
        generateText({
          model: provider("claude-haiku-4-5-20251001"),
          system: buildSummaryPrompt(brief),
          messages: [{ role: "user", content: transcriptText }],
          maxOutputTokens: 200,
        }),
        generateText({
          model: provider("claude-haiku-4-5-20251001"),
          system: buildKnowledgeExtractionPrompt(brief),
          messages: [{ role: "user", content: transcriptText }],
          maxOutputTokens: 800,
        }),
      ]);

    let structuredData: Record<string, unknown> = {};
    try {
      structuredData = JSON.parse(extractionResult.text);
    } catch {
      console.error("[voice-webhook] failed to parse extraction:", extractionResult.text);
    }

    await saveVoiceExtraction(transcriptId, structuredData, summaryResult.text);

    try {
      const knowledge = JSON.parse(knowledgeResult.text);
      await saveRespondentKnowledge(respondentId, knowledge);
    } catch {
      console.error("[voice-webhook] failed to parse knowledge:", knowledgeResult.text);
    }

    const emailMatch = transcriptText.match(
      /(?:email|e-mail).*?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i
    );
    if (emailMatch) {
      await saveVoiceEmail(respondentId, emailMatch[1].toLowerCase());
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("[voice-webhook] error:", err);
    return new Response("Internal error", { status: 500 });
  }
}
