import { sql } from "@vercel/postgres";
import type { RespondentKnowledge } from "./voice-prompt";

export interface VoiceRespondent {
  id: number;
  ref_id: string;
  phone: string | null;
  email: string | null;
  name: string | null;
  brief_id: string;
  knowledge: RespondentKnowledge | null;
  created_at: string;
}

export interface VoiceTranscript {
  id: number;
  respondent_id: number;
  wave: number;
  full_transcript: unknown;
  structured_data: Record<string, unknown> | null;
  duration_seconds: number | null;
  elevenlabs_conversation_id: string | null;
  ai_summary: string | null;
  brief_id: string;
  created_at: string;
}

export interface VoiceExtractedResponse {
  id: number;
  transcript_id: number;
  field_name: string;
  field_value: string | null;
  raw_response: string | null;
}

function isConfigured(): boolean {
  return !!(process.env.POSTGRES_URL || process.env.DATABASE_URL);
}

export async function getOrCreateVoiceRespondent(
  refId: string,
  briefId: string,
  phone?: string
): Promise<VoiceRespondent | null> {
  if (!isConfigured()) return null;

  const existing =
    await sql<VoiceRespondent>`SELECT * FROM voice_respondents WHERE ref_id = ${refId}`;
  if (existing.rows.length > 0) return existing.rows[0];

  const inserted =
    await sql<VoiceRespondent>`INSERT INTO voice_respondents (ref_id, brief_id, phone) VALUES (${refId}, ${briefId}, ${phone || null}) RETURNING *`;
  return inserted.rows[0];
}

export async function getVoiceRespondentContext(refId: string): Promise<
  | {
      wave: number;
      completedAt: string;
      summary: string | null;
      extractedData: Record<string, unknown> | null;
      knowledge: RespondentKnowledge | null;
    }[]
  | undefined
> {
  if (!isConfigured()) return undefined;

  const respondent =
    await sql<VoiceRespondent>`SELECT * FROM voice_respondents WHERE ref_id = ${refId}`;
  if (respondent.rows.length === 0) return undefined;

  const transcripts =
    await sql<VoiceTranscript>`SELECT * FROM voice_transcripts WHERE respondent_id = ${respondent.rows[0].id} AND ai_summary IS NOT NULL ORDER BY wave ASC`;

  if (transcripts.rows.length === 0) return undefined;

  const knowledge = respondent.rows[0].knowledge;

  return transcripts.rows.map((t) => ({
    wave: t.wave,
    completedAt: t.created_at,
    summary: t.ai_summary,
    extractedData: t.structured_data,
    knowledge,
  }));
}

export async function getVoiceRespondentContextByPhone(phone: string): Promise<
  | {
      wave: number;
      completedAt: string;
      summary: string | null;
      extractedData: Record<string, unknown> | null;
      knowledge: RespondentKnowledge | null;
    }[]
  | undefined
> {
  if (!isConfigured()) return undefined;

  const normalised = phone.replace(/[^+0-9]/g, "");
  const respondent =
    await sql<VoiceRespondent>`SELECT * FROM voice_respondents WHERE phone = ${normalised} OR phone = ${phone}`;
  if (respondent.rows.length === 0) return undefined;

  const transcripts =
    await sql<VoiceTranscript>`SELECT * FROM voice_transcripts WHERE respondent_id = ${respondent.rows[0].id} AND ai_summary IS NOT NULL ORDER BY wave ASC`;

  const knowledge = respondent.rows[0].knowledge;

  if (transcripts.rows.length === 0 && knowledge) {
    return [
      {
        wave: 0,
        completedAt: knowledge.lastCallDate,
        summary: null,
        extractedData: null,
        knowledge,
      },
    ];
  }

  if (transcripts.rows.length === 0) return undefined;

  return transcripts.rows.map((t) => ({
    wave: t.wave,
    completedAt: t.created_at,
    summary: t.ai_summary,
    extractedData: t.structured_data,
    knowledge,
  }));
}

export async function createVoiceTranscript(
  respondentId: number,
  wave: number,
  briefId: string,
  elevenlabsConversationId: string,
  transcript: unknown,
  durationSeconds: number | null
): Promise<number | null> {
  if (!isConfigured()) return null;

  const result = await sql<{ id: number }>`
    INSERT INTO voice_transcripts (respondent_id, wave, brief_id, elevenlabs_conversation_id, full_transcript, duration_seconds)
    VALUES (${respondentId}, ${wave}, ${briefId}, ${elevenlabsConversationId}, ${JSON.stringify(transcript)}::jsonb, ${durationSeconds})
    RETURNING id`;
  return result.rows[0]?.id ?? null;
}

export async function saveVoiceExtraction(
  transcriptId: number,
  structuredData: Record<string, unknown>,
  summary: string
): Promise<void> {
  if (!isConfigured()) return;

  await sql`UPDATE voice_transcripts SET structured_data = ${JSON.stringify(structuredData)}::jsonb, ai_summary = ${summary} WHERE id = ${transcriptId}`;

  for (const [fieldName, fieldValue] of Object.entries(structuredData)) {
    if (fieldValue != null) {
      await sql`INSERT INTO voice_extracted_responses (transcript_id, field_name, field_value) VALUES (${transcriptId}, ${fieldName}, ${String(fieldValue)})`;
    }
  }
}

export async function saveRespondentKnowledge(
  refId: string,
  newKnowledge: {
    name?: string | null;
    facts: string[];
    patterns: string[];
    open_threads: string[];
  }
): Promise<void> {
  if (!isConfigured()) return;

  const respondent =
    await sql<VoiceRespondent>`SELECT * FROM voice_respondents WHERE ref_id = ${refId}`;
  if (respondent.rows.length === 0) return;

  const existing = respondent.rows[0].knowledge;

  const merged: RespondentKnowledge = {
    name: newKnowledge.name || existing?.name || undefined,
    callCount: (existing?.callCount ?? 0) + 1,
    lastCallDate: new Date().toISOString(),
    facts: deduplicateAndMerge(existing?.facts ?? [], newKnowledge.facts),
    patterns: deduplicateAndMerge(
      existing?.patterns ?? [],
      newKnowledge.patterns
    ),
    openThreads: newKnowledge.open_threads,
  };

  if (newKnowledge.name) {
    await sql`UPDATE voice_respondents SET knowledge = ${JSON.stringify(merged)}::jsonb, name = ${newKnowledge.name} WHERE ref_id = ${refId}`;
  } else {
    await sql`UPDATE voice_respondents SET knowledge = ${JSON.stringify(merged)}::jsonb WHERE ref_id = ${refId}`;
  }
}

function deduplicateAndMerge(existing: string[], incoming: string[]): string[] {
  const all = [...existing, ...incoming];
  const unique: string[] = [];
  for (const item of all) {
    const normalised = item.toLowerCase().trim();
    if (!unique.some((u) => u.toLowerCase().trim() === normalised)) {
      unique.push(item);
    }
  }
  return unique;
}

export async function saveVoiceEmail(
  refId: string,
  email: string
): Promise<void> {
  if (!isConfigured()) return;
  await sql`UPDATE voice_respondents SET email = ${email} WHERE ref_id = ${refId}`;
}

export async function getNextWaveNumber(
  respondentId: number
): Promise<number> {
  const result = await sql<{ max_wave: number | null }>`
    SELECT MAX(wave) as max_wave FROM voice_transcripts WHERE respondent_id = ${respondentId}`;
  return (result.rows[0]?.max_wave ?? 0) + 1;
}
