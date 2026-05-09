import { sql } from "@vercel/postgres";

export interface TranscriptMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface QuantData {
  likelihood_to_use_ai_research?: number | null;
  confidence_in_ai_outputs?: number | null;
  ai_adoption_stage?: string | null;
  biggest_concern?: string | null;
  role_type?: string | null;
  key_tension?: string | null;
}

export interface ResearchRespondent {
  id: number;
  ref_id: string;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResearchInterview {
  id: number;
  respondent_id: number;
  wave: number;
  transcript: TranscriptMessage[] | null;
  quant_data: QuantData | null;
  ai_summary: string | null;
  started_at: string;
  completed_at: string | null;
}

function isConfigured(): boolean {
  return !!(
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL
  );
}

export async function getOrCreateRespondent(
  refId: string
): Promise<ResearchRespondent | null> {
  if (!isConfigured()) return null;

  const existing =
    await sql<ResearchRespondent>`SELECT * FROM research_respondents WHERE ref_id = ${refId}`;
  if (existing.rows.length > 0) return existing.rows[0];

  const inserted =
    await sql<ResearchRespondent>`INSERT INTO research_respondents (ref_id) VALUES (${refId}) RETURNING *`;
  return inserted.rows[0];
}

export async function getRespondentWithHistory(refId: string): Promise<{
  respondent: ResearchRespondent;
  interviews: ResearchInterview[];
} | null> {
  if (!isConfigured()) return null;

  const resp =
    await sql<ResearchRespondent>`SELECT * FROM research_respondents WHERE ref_id = ${refId}`;
  if (resp.rows.length === 0) return null;

  const respondent = resp.rows[0];
  const interviews =
    await sql<ResearchInterview>`SELECT * FROM research_interviews WHERE respondent_id = ${respondent.id} ORDER BY wave ASC`;

  return { respondent, interviews: interviews.rows };
}

export async function createInterview(
  respondentId: number,
  wave: number
): Promise<number | null> {
  if (!isConfigured()) return null;

  const result =
    await sql<{ id: number }>`INSERT INTO research_interviews (respondent_id, wave) VALUES (${respondentId}, ${wave}) RETURNING id`;
  return result.rows[0]?.id ?? null;
}

export async function saveInterviewProgress(
  interviewId: number,
  transcript: TranscriptMessage[]
): Promise<void> {
  if (!isConfigured()) return;

  await sql`UPDATE research_interviews SET transcript = ${JSON.stringify(transcript)}::jsonb WHERE id = ${interviewId}`;
}

export async function completeInterview(
  interviewId: number,
  transcript: TranscriptMessage[],
  quantData: QuantData,
  summary: string
): Promise<void> {
  if (!isConfigured()) return;

  await sql`UPDATE research_interviews SET transcript = ${JSON.stringify(transcript)}::jsonb, quant_data = ${JSON.stringify(quantData)}::jsonb, ai_summary = ${summary}, completed_at = NOW() WHERE id = ${interviewId}`;
}

export async function saveEmail(
  refId: string,
  email: string
): Promise<void> {
  if (!isConfigured()) return;

  await sql`UPDATE research_respondents SET email = ${email}, updated_at = NOW() WHERE ref_id = ${refId}`;
}
