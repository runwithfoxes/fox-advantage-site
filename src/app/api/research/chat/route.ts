import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, generateText } from "ai";
import { getRateLimiter } from "@/lib/rate-limit";
import {
  getOrCreateRespondent,
  getRespondentWithHistory,
  createInterview,
  saveInterviewProgress,
  completeInterview,
  type TranscriptMessage,
} from "@/lib/research-store";
import {
  getResearchSystemPrompt,
  extractPreviousWaveData,
  buildTranscriptText,
  QUANT_EXTRACTION_PROMPT,
  SUMMARY_PROMPT,
} from "@/lib/research-system-prompt";

export const maxDuration = 60;

const MAX_MESSAGE_LENGTH = 3000;
const MAX_MESSAGES_PER_REQUEST = 30;

export async function POST(req: Request) {
  if (!process.env.CHAT_ANTHROPIC_API_KEY) {
    return new Response("Service not configured", { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const limiter = getRateLimiter();
  if (limiter) {
    const { success } = await limiter.limit(`research:${ip}`);
    if (!success) {
      return new Response("Too many requests. Please wait a moment.", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return new Response("Invalid request body", { status: 400 });
  }

  const { messages, refId } = body as {
    messages?: unknown[];
    refId?: string;
  };

  if (!Array.isArray(messages)) {
    return new Response("Messages must be an array", { status: 400 });
  }

  if (messages.length > MAX_MESSAGES_PER_REQUEST) {
    return new Response(`Too many messages. Maximum ${MAX_MESSAGES_PER_REQUEST}.`, {
      status: 400,
    });
  }

  for (const msg of messages) {
    if (!msg || typeof msg !== "object" || !("role" in msg)) {
      return new Response("Each message must have a role", { status: 400 });
    }
    const textContent =
      (msg as { parts?: { type: string; text?: string }[] }).parts
        ?.find((p) => p.type === "text")
        ?.text ||
      (msg as { content?: string }).content ||
      "";
    if (typeof textContent === "string" && textContent.length > MAX_MESSAGE_LENGTH) {
      return new Response(`Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`, {
        status: 400,
      });
    }
  }

  const sanitizedRefId =
    typeof refId === "string"
      ? refId.slice(0, 100).replace(/[^a-zA-Z0-9_-]/g, "")
      : "anon-" + ip.replace(/\./g, "-").slice(0, 20);

  try {
    const provider = createAnthropic({
      apiKey: process.env.CHAT_ANTHROPIC_API_KEY,
    });

    const respondent = await getOrCreateRespondent(sanitizedRefId);
    const history = await getRespondentWithHistory(sanitizedRefId);

    let interviewId: number | null = null;
    let wave = 1;
    let previousWaveData;

    if (history && history.interviews.length > 0) {
      const completedInterviews = history.interviews.filter(
        (i) => i.completed_at !== null
      );
      const inProgressInterview = history.interviews.find(
        (i) => i.completed_at === null
      );

      if (inProgressInterview) {
        interviewId = inProgressInterview.id;
        wave = inProgressInterview.wave;
      } else {
        wave = completedInterviews.length + 1;
      }

      previousWaveData = extractPreviousWaveData(history.interviews);
    }

    if (!interviewId && respondent) {
      interviewId = await createInterview(respondent.id, wave);
    }

    const systemPrompt = getResearchSystemPrompt(
      previousWaveData && previousWaveData.length > 0
        ? previousWaveData
        : undefined
    );

    interface RawMessage {
      role: string;
      parts?: { type: string; text?: string }[];
      content?: string;
    }

    const modelMessages = (messages as RawMessage[]).map((m) => ({
      role: m.role as "user" | "assistant",
      content:
        m.parts
          ?.filter((p) => p.type === "text")
          .map((p) => p.text)
          .join("") ||
        m.content ||
        "",
    }));

    const result = streamText({
      model: provider("claude-sonnet-4-20250514"),
      system: systemPrompt,
      messages: modelMessages,
      maxOutputTokens: 400,
      onFinish: async ({ text }) => {
        if (!interviewId) return;

        const now = new Date().toISOString();
        const latestUserMsg = modelMessages.filter((m) => m.role === "user").pop();

        const transcript: TranscriptMessage[] = modelMessages.map((m) => ({
          role: m.role,
          content: m.content,
          timestamp: now,
        }));
        transcript.push({
          role: "assistant",
          content: text,
          timestamp: now,
        });

        await saveInterviewProgress(interviewId, transcript);

        if (text.includes("[INTERVIEW_COMPLETE]")) {
          try {
            const transcriptText = buildTranscriptText(transcript);

            const [quantResult, summaryResult] = await Promise.all([
              generateText({
                model: provider("claude-haiku-4-5-20251001"),
                system: QUANT_EXTRACTION_PROMPT,
                messages: [{ role: "user", content: transcriptText }],
                maxOutputTokens: 300,
              }),
              generateText({
                model: provider("claude-haiku-4-5-20251001"),
                system: SUMMARY_PROMPT,
                messages: [{ role: "user", content: transcriptText }],
                maxOutputTokens: 200,
              }),
            ]);

            let quantData = {};
            try {
              quantData = JSON.parse(quantResult.text);
            } catch {
              console.error("[research] failed to parse quant data:", quantResult.text);
            }

            await completeInterview(
              interviewId,
              transcript,
              quantData,
              summaryResult.text
            );

            // Extract email if Isa captured it in conversation
            const emailMatch = text.match(/\[EMAIL:\s*([^\]]+)\]/);
            if (emailMatch) {
              const email = emailMatch[1].trim().toLowerCase();
              if (email.includes("@")) {
                const { saveEmail } = await import("@/lib/research-store");
                await saveEmail(sanitizedRefId, email);
              }
            }
          } catch (e) {
            console.error("[research] post-interview extraction failed:", e);
            await completeInterview(interviewId, transcript, {}, "");
          }
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (e) {
    console.error("[research] error:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
