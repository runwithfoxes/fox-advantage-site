import { Redis } from "@upstash/redis";

export type Decision = "approve" | "reject" | null;

export interface ThreadEntry {
  who: "client" | "Paul";
  when: string;
  text: string;
}

export interface AssetFeedback {
  decision: Decision;
  thread: ThreadEntry[];
  updatedAt: string;
}

export interface ClientFeedback {
  slug: string;
  assets: Record<string, AssetFeedback>;
}

// Mirror the existing getRedis() pattern in conversation-store.ts
function getRedis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const key = (slug: string) => `feedback:${slug}`;

function emptyAsset(): AssetFeedback {
  return { decision: null, thread: [], updatedAt: new Date().toISOString() };
}

export async function getClientFeedback(slug: string): Promise<ClientFeedback> {
  const redis = getRedis();
  if (!redis) return { slug, assets: {} };
  const stored = await redis.get<ClientFeedback>(key(slug));
  return stored ?? { slug, assets: {} };
}

async function mutate(
  slug: string,
  fn: (fb: ClientFeedback) => void
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const fb = (await redis.get<ClientFeedback>(key(slug))) ?? { slug, assets: {} };
  fn(fb);
  await redis.set(key(slug), fb);
}

export async function setAssetDecision(
  slug: string,
  assetId: string,
  decision: Decision
): Promise<void> {
  await mutate(slug, (fb) => {
    const a = (fb.assets[assetId] ??= emptyAsset());
    a.decision = decision;
    a.updatedAt = new Date().toISOString();
  });
}

export async function appendThreadEntry(
  slug: string,
  assetId: string,
  who: "client" | "Paul",
  text: string
): Promise<void> {
  const clean = text.trim();
  if (!clean) return;
  await mutate(slug, (fb) => {
    const a = (fb.assets[assetId] ??= emptyAsset());
    a.thread.push({ who, when: new Date().toISOString(), text: clean });
    a.updatedAt = new Date().toISOString();
  });
}

export async function resetAsset(slug: string, assetId: string): Promise<void> {
  await mutate(slug, (fb) => {
    const a = fb.assets[assetId];
    if (!a) return;
    a.decision = null;
    a.updatedAt = new Date().toISOString();
  });
}
