import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (token !== process.env.CONVERSATIONS_API_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const result = await sql`
      SELECT
        i.id,
        i.wave,
        i.transcript,
        i.quant_data,
        i.ai_summary,
        i.started_at,
        i.completed_at,
        r.ref_id,
        r.email
      FROM research_interviews i
      JOIN research_respondents r ON r.id = i.respondent_id
      WHERE i.completed_at IS NOT NULL
      ORDER BY i.completed_at DESC
      LIMIT 50
    `;

    return Response.json({
      total: result.rows.length,
      interviews: result.rows.map((row) => ({
        id: row.id,
        wave: row.wave,
        ref_id: row.ref_id,
        email: row.email,
        summary: row.ai_summary,
        quant: row.quant_data,
        started_at: row.started_at,
        completed_at: row.completed_at,
        thread: (row.transcript || [])
          .filter((m: { role: string }) => m.role === "user" || m.role === "assistant")
          .map((m: { role: string; content: string }) => ({
            role: m.role === "user" ? "visitor" : "isa",
            text: m.content
              .replace("[INTERVIEW_COMPLETE]", "")
              .replace(/\[EMAIL:\s*[^\]]+\]/g, "")
              .trim(),
          }))
          .filter((m: { text: string }) => m.text),
      })),
    });
  } catch (e) {
    console.error("[research/results] error:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
