import { Redis } from "@upstash/redis";

// Only create the client if env vars are set (graceful fallback)
function getRedis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
  if (!url || !token) {
    return null;
  }
  return new Redis({ url, token });
}

export interface ConversationExchange {
  chatId: string;
  messageCount: number;
  userMessage: string;
  isaResponse: string;
}

interface StoredExchange {
  timestamp: string;
  userMessage: string;
  isaResponse: string;
}

interface StoredConversation {
  chatId: string;
  startedAt: string;
  lastMessageAt: string;
  exchanges: StoredExchange[];
}

/** Save a single exchange (user message + Isa response) to a conversation */
export async function saveConversationExchange(
  exchange: ConversationExchange
): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    // Fallback to console.log if Redis isn't configured
    console.log(JSON.stringify({ type: "isa_conversation", ...exchange }));
    return;
  }

  try {
    const key = `chat:${exchange.chatId}`;
    const now = new Date().toISOString();

    // Get existing conversation or create new one
    const existing = await redis.get<StoredConversation>(key);

    const conversation: StoredConversation = existing || {
      chatId: exchange.chatId,
      startedAt: now,
      lastMessageAt: now,
      exchanges: [],
    };

    conversation.lastMessageAt = now;
    conversation.exchanges.push({
      timestamp: now,
      userMessage: exchange.userMessage,
      isaResponse: exchange.isaResponse,
    });

    // Store with 30-day expiry
    await redis.set(key, conversation, { ex: 60 * 60 * 24 * 30 });

    // Add to the index of recent conversations (sorted set, scored by timestamp)
    await redis.zadd("chat:index", {
      score: Date.now(),
      member: exchange.chatId,
    });

    // Trim index to last 500 conversations
    const count = await redis.zcard("chat:index");
    if (count > 500) {
      await redis.zremrangebyrank("chat:index", 0, count - 501);
    }
  } catch (e) {
    console.error("[conversation-store] failed to save:", e);
  }
}

/** Get recent conversations, newest first */
export async function getRecentConversations(
  limit = 50
): Promise<StoredConversation[]> {
  const redis = getRedis();
  if (!redis) return [];

  // Get recent chat IDs from the sorted set
  const chatIds = await redis.zrange<string[]>("chat:index", 0, limit - 1, {
    rev: true,
  });

  if (!chatIds.length) return [];

  // Fetch each conversation
  const conversations: StoredConversation[] = [];
  for (const chatId of chatIds) {
    const convo = await redis.get<StoredConversation>(`chat:${chatId}`);
    if (convo) conversations.push(convo);
  }

  return conversations;
}
