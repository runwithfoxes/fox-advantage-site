/**
 * Turn a week of releases (across the curated sources) into a short brief in
 * Paul's voice: 2-3 items a marketer can act on, each with "what shipped" and
 * "what it means for you", one line of "do this Monday" where it fits.
 *
 * Curation is the product. The edge is judgement and translation, not
 * aggregation. If it reads like a bot reposting release notes, it is dead, so
 * the prompt leans hard on "what it means for the reader", not the mechanics.
 *
 * No key -> a labelled skeleton listing the raw items for a human to write up.
 */

import Anthropic from "@anthropic-ai/sdk";
import { VOICE_RULES } from "../build-in-public/config.mjs";
import { voiceLint } from "../build-in-public/draft.mjs";

export { voiceLint };

const MODEL = process.env.MARKETING_AI_BRIEF_MODEL || "claude-sonnet-4-6";

function apiKey() {
  return process.env.CHAT_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || null;
}

function itemsDigest(items) {
  return items
    .map((it) => {
      const head = `## ${it.source.name} (${it.source.repo}) - ${it.source.whatItIs}`;
      const lines = it.highlights.length
        ? it.highlights.map((h) => `  - ${h}`).join("\n")
        : "  (nothing in the 7-day window)";
      const tag = it.tag ? ` [${it.tag}]` : "";
      return `${head}${tag}\n${lines}`;
    })
    .join("\n\n");
}

function buildPrompt(brief, items) {
  return `You write ${brief.title} for Run with Foxes (Paul Dervan). The reader
is ${brief.audience}. It runs on ${brief.channels.join(", ")}. You are their
trusted filter on what moved in marketing AI this week.

Your two jobs:
1. SELECT. Across the sources below, pick at most ${brief.maxItems} items that
   ${brief.bar}. Ignore anything only a developer would care about. The value is
   ruthless curation, a short brief of real things beats a long padded one. If
   nothing this week clears the bar, say so and recommend sending nothing.
2. WRITE. For each picked item: what shipped in plain words, then "what it means
   for you" (the marketer), and a one-line "do this Monday" only where it is
   genuinely useful. Then a short intro and a short sign-off. In Paul's voice.

Paul's voice, hard rules:
${VOICE_RULES.map((r) => `- ${r}`).join("\n")}

Never invent a feature, number, or capability. Everything must trace to a line
below. Translating a real feature into a marketing benefit is your job. Making
one up is not.

Return ONLY valid JSON in this shape:
{
  "nothing_worth_sending": false,
  "headline": "specific, plain headline for the week",
  "intro_markdown": "2-3 sentences setting up the week, in Paul's voice",
  "items": [
    { "source": "display name",
      "what_shipped": "plain words",
      "what_it_means": "the benefit to a marketer",
      "do_monday": "one action, or empty string",
      "trace": ["the release tag or line it is grounded in"] }
  ],
  "signoff_markdown": "one or two lines to close, no neat bow",
  "why_these": "one line for Paul on why this set earns the reader's time"
}

THIS WEEK'S SOURCES AND WHAT THEY SHIPPED:
${itemsDigest(items)}`;
}

function extractJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model output");
  return JSON.parse(text.slice(start, end + 1));
}

async function draftWithClaude(brief, items) {
  const client = new Anthropic({ apiKey: apiKey() });
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2200,
    messages: [{ role: "user", content: buildPrompt(brief, items) }],
  });
  const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const parsed = extractJSON(text);
  const lintText = [parsed.intro_markdown, parsed.signoff_markdown, ...(parsed.items || []).map((i) => `${i.what_shipped} ${i.what_it_means} ${i.do_monday}`)].join("\n");
  return { model: MODEL, ...parsed, lint: voiceLint(lintText) };
}

function draftFallback(brief, items) {
  const withStuff = items.filter((it) => it.highlights.length);
  return {
    model: null,
    nothing_worth_sending: withStuff.length === 0,
    headline: "[headline - fill in]",
    intro_markdown: "[DRAFT SKELETON - no model key set. Raw material below.]",
    items: withStuff.slice(0, brief.maxItems).map((it) => ({
      source: it.name,
      what_shipped: it.highlights.slice(0, 4).join("; "),
      what_it_means: "[what it means for a marketer - fill in]",
      do_monday: "",
      trace: [it.tag || it.repo].filter(Boolean),
    })),
    signoff_markdown: "",
    why_these: "[fill in]",
    lint: [],
  };
}

export async function draftBrief(brief, items) {
  if (!apiKey()) {
    console.warn("  no ANTHROPIC key set - producing a skeleton (see README for a real hand-run)");
    return draftFallback(brief, items);
  }
  try {
    return await draftWithClaude(brief, items);
  } catch (err) {
    console.warn(`  model draft failed (${err.message}) - falling back to skeleton`);
    return draftFallback(brief, items);
  }
}
