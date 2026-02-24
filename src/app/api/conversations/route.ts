import {
  getRecentConversations,
  getRecentErrors,
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

  const [conversations, errors] = await Promise.all([
    getRecentConversations(limit),
    getRecentErrors(20),
  ]);

  return Response.json({
    count: conversations.length,
    errorCount: errors.length,
    conversations,
    errors,
  });
}
