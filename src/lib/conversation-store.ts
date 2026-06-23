import { Redis } from "@upstash/redis";
import { sendIsaConversationAlert } from "./isa-alert";

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

    // Email Paul the dialogue (no-ops without RESEND_API_KEY or on test chats).
    await sendIsaConversationAlert(conversation);
  } catch (e) {
    console.error("[conversation-store] failed to save:", e);
  }
}

/** Save an error when Isa fails */
export async function saveError(error: {
  userMessage: string;
  errorMessage: string;
}): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    console.error("[isa-error]", JSON.stringify(error));
    return;
  }

  try {
    const id = `err:${Date.now()}`;
    await redis.set(
      id,
      { ...error, timestamp: new Date().toISOString() },
      { ex: 60 * 60 * 24 * 30 }
    );
    await redis.zadd("error:index", {
      score: Date.now(),
      member: id,
    });
    // Keep last 100 errors
    const count = await redis.zcard("error:index");
    if (count > 100) {
      await redis.zremrangebyrank("error:index", 0, count - 101);
    }
  } catch (e) {
    console.error("[conversation-store] failed to save error:", e);
  }
}

/**
 * Save an inbound question the moment it arrives, BEFORE the model is called.
 * This guarantees we capture what people asked even if the model fails, times
 * out, or the function crashes mid-stream (none of which trigger onFinish).
 */
export async function saveInboundQuestion(question: {
  chatId: string;
  userMessage: string;
  messageCount: number;
}): Promise<void> {
  if (!question.userMessage) return;

  const redis = getRedis();
  if (!redis) {
    console.log(JSON.stringify({ type: "isa_inbound_question", ...question }));
    return;
  }

  try {
    const id = `q:${Date.now()}`;
    await redis.set(
      id,
      { ...question, timestamp: new Date().toISOString() },
      { ex: 60 * 60 * 24 * 30 }
    );
    await redis.zadd("question:index", { score: Date.now(), member: id });
    // Keep last 500 questions
    const count = await redis.zcard("question:index");
    if (count > 500) {
      await redis.zremrangebyrank("question:index", 0, count - 501);
    }
  } catch (e) {
    console.error("[conversation-store] failed to save question:", e);
  }
}

interface StoredQuestion {
  timestamp: string;
  chatId: string;
  userMessage: string;
  messageCount: number;
}

/** Get recent inbound questions, newest first */
export async function getRecentQuestions(
  limit = 50
): Promise<StoredQuestion[]> {
  const redis = getRedis();
  if (!redis) return [];

  const ids = await redis.zrange<string[]>("question:index", 0, limit - 1, {
    rev: true,
  });
  if (!ids.length) return [];

  const questions: StoredQuestion[] = [];
  for (const id of ids) {
    const q = await redis.get<StoredQuestion>(id);
    if (q) questions.push(q);
  }
  return questions;
}

interface StoredError {
  timestamp: string;
  userMessage: string;
  errorMessage: string;
}

/** Get recent errors */
export async function getRecentErrors(
  limit = 20
): Promise<StoredError[]> {
  const redis = getRedis();
  if (!redis) return [];

  const errorIds = await redis.zrange<string[]>("error:index", 0, limit - 1, {
    rev: true,
  });
  if (!errorIds.length) return [];

  const errors: StoredError[] = [];
  for (const id of errorIds) {
    const err = await redis.get<StoredError>(id);
    if (err) errors.push(err);
  }
  return errors;
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
