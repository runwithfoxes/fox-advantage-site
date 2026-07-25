import {
  getRecentConversations,
  getRecentErrors,
  getRecentQuestions,
} from "@/lib/conversation-store";

export async function GET(req: Request) {
  // Simple token auth so only you can read conversations
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (token !== process.env.CONVERSATIONS_API_TOKEN) {
    return new Response("Unauthorized", { status: 401 });
  }

  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  /**
   * ⭐ REAL VISITORS ONLY, BY DEFAULT. Preview and localhost hit the same Upstash
   * database as production, so without this the feed mixes our own build traffic in
   * with prospects and reads identically. `?include=internal` shows everything, with
   * each record's `source` on it.
   */
  const includeInternal = searchParams.get("include") === "internal";

  const [conversations, errors, questions] = await Promise.all([
    getRecentConversations(limit, includeInternal),
    getRecentErrors(20),
    getRecentQuestions(limit, includeInternal),
  ]);

  return Response.json({
    count: conversations.length,
    errorCount: errors.length,
    questionCount: questions.length,
    includesInternal: includeInternal,
    conversations,
    errors,
    questions,
  });
}
