"use server";

import { cookies } from "next/headers";
import {
  setAssetDecision,
  appendThreadEntry,
  type Decision,
} from "@/lib/client-feedback-store";

async function isClientAuthed(slug: string): Promise<boolean> {
  const store = await cookies();
  return store.get(`${slug}_auth`)?.value === "1";
}

export async function submitDecision(
  slug: string,
  assetId: string,
  decision: Decision
): Promise<{ ok: boolean }> {
  if (!(await isClientAuthed(slug))) return { ok: false };
  await setAssetDecision(slug, assetId, decision);
  return { ok: true };
}

export async function submitComment(
  slug: string,
  assetId: string,
  text: string
): Promise<{ ok: boolean }> {
  if (!(await isClientAuthed(slug))) return { ok: false };
  await appendThreadEntry(slug, assetId, "client", text);
  return { ok: true };
}
