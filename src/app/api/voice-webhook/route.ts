import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import { sql } from "@vercel/postgres";
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
    call_successful?: string;
    transcript_summary?: string;
    data_collection_results?: Record<
      string,
      { value: unknown; rationale?: string }
    >;
    evaluation_criteria_results?: Record<
      string,
      { result: string; rationale?: string }
    >;
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

  if (raw.type === "call_initiation_failure") {
    const failData = raw.data as Record<string, unknown> | undefined;
    const phone = (failData?.phone_number as string) || "unknown";
    const reason = (failData?.failure_reason as string) || (failData?.error_code as string) || "unknown";
    console.log(`[voice-webhook] call_initiation_failure: phone=${phone} reason=${reason}`);
    try {
      if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
        await sql`INSERT INTO voice_call_attempts (phone, status, conversation_id, failure_reason, created_at)
          VALUES (${phone}, ${"failed"}, ${(failData?.conversation_id as string) || null}, ${reason}, NOW())`;
      }
    } catch (err) {
      console.error("[voice-webhook] failed to log call failure:", err);
    }
    return new Response("OK", { status: 200 });
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
    rawType: (raw as Record<string, unknown>).type,
    dataKeys: Object.keys(conversation),
    metadata: conversation.metadata,
    userId: conversation.user_id,
    agentId: conversation.agent_id,
    conversationId: conversation.conversation_id,
    allStringValues: Object.fromEntries(
      Object.entries(conversation).filter(([, v]) => typeof v === "string")
    ),
    resolvedPhone: conversation.user_id || (conversation.metadata?.phone_call as Record<string, unknown>)?.external_number || null,
  };
  await redis.set("voice:debug:last-webhook", JSON.stringify(debugInfo), { ex: 3600 });

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

    // Use native ElevenLabs Data Collection results if available (configured via platform_settings)
    const nativeAnalysis = conversation.analysis;
    const nativeDataCollection = nativeAnalysis?.data_collection_results;
    const nativeSummary = nativeAnalysis?.transcript_summary;

    let structuredData: Record<string, unknown> = {};
    let summary = "";

    if (nativeDataCollection && Object.keys(nativeDataCollection).length > 0) {
      for (const [key, item] of Object.entries(nativeDataCollection)) {
        if (item?.value != null) {
          structuredData[key] = item.value;
        }
      }
      summary = nativeSummary || "";
    } else if (process.env.CHAT_ANTHROPIC_API_KEY) {
      // Fallback: run our own extraction if native results aren't available
      const provider = createAnthropic({
        apiKey: process.env.CHAT_ANTHROPIC_API_KEY,
      });

      const [extractionResult, summaryResult] = await Promise.all([
        generateText({
          model: provider("claude-haiku-4-5"),
          system: buildExtractionPrompt(brief),
          messages: [{ role: "user", content: transcriptText }],
          maxOutputTokens: 500,
        }),
        generateText({
          model: provider("claude-haiku-4-5"),
          system: buildSummaryPrompt(brief),
          messages: [{ role: "user", content: transcriptText }],
          maxOutputTokens: 200,
        }),
      ]);

      try {
        const extractionJson = extractionResult.text.replace(/^```json?\s*/i, "").replace(/\s*```$/, "");
        structuredData = JSON.parse(extractionJson);
      } catch {
        console.error("[voice-webhook] failed to parse extraction:", extractionResult.text);
      }
      summary = summaryResult.text;
    }

    await saveVoiceExtraction(transcriptId, structuredData, summary);

    // Knowledge extraction (facts, patterns, open threads) is always our own - unique to longitudinal memory
    if (process.env.CHAT_ANTHROPIC_API_KEY) {
      try {
        const provider = createAnthropic({
          apiKey: process.env.CHAT_ANTHROPIC_API_KEY,
        });
        const knowledgeResult = await generateText({
          model: provider("claude-haiku-4-5"),
          system: buildKnowledgeExtractionPrompt(brief),
          messages: [{ role: "user", content: transcriptText }],
          maxOutputTokens: 800,
        });
        const knowledgeJson = knowledgeResult.text.replace(/^```json?\s*/i, "").replace(/\s*```$/, "");
        const knowledge = JSON.parse(knowledgeJson);
        await saveRespondentKnowledge(respondent.ref_id, knowledge);
      } catch {
        console.error("[voice-webhook] failed to extract/save knowledge");
      }
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
