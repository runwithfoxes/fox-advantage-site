/**
 * Turn a week of work into a build-in-public draft in Paul's voice.
 *
 * Two jobs, same as the affiliate engine but pointed at teaching, not selling:
 *   1. SELECT the 1-2 changes that carry a real lesson for a marketing team.
 *      Most weeks most of the work is plumbing. Pick the ones that teach.
 *   2. WRITE a short post for Paul's own channels, in Paul's voice.
 *
 * A voice-lint scans the output for the two rules a machine can check (em
 * dashes, hype words) and surfaces them for Paul, it does not silently edit.
 *
 * No key set -> a labelled skeleton, so the pipeline still runs.
 */

import Anthropic from "@anthropic-ai/sdk";
import { VOICE_RULES, HYPE_WORDS } from "./config.mjs";

const MODEL = process.env.BUILD_IN_PUBLIC_MODEL || "claude-sonnet-4-6";

function apiKey() {
  return process.env.CHAT_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || null;
}

function commitDigest(commits) {
  return commits
    .map((c) => {
      const body = c.body ? `\n    ${c.body.replace(/\n/g, "\n    ")}` : "";
      return `- [${c.sha}] ${c.subject}${body}`;
    })
    .join("\n");
}

function notesDigest(notes) {
  if (!notes.length) return "(no notes changes this week)";
  return notes
    .map(
      (n) =>
        `From ${n.file}:\n` +
        n.added.map((l) => `  ${l}`).join("\n") +
        (n.truncated ? "\n  …(more)" : ""),
    )
    .join("\n\n");
}

function buildPrompt(site, commits, notes) {
  return `You write build-in-public content for ${site.name} (${site.author}).
The reader is ${site.audience}. The piece runs on Paul's own channels
(${site.channels.join(", ")}), so it teaches, it does not sell.

Your two jobs:
1. SELECT. Read this week's commits and notes. Most of it is plumbing (refactors,
   config, healthchecks, copy tweaks). Pick the 1-2 items that ${site.bar}. The
   lesson usually lives in the notes and commit bodies (the WHY), not the
   one-line subject. If nothing this week clears that bar, say so honestly and
   recommend sending nothing. Do not manufacture a lesson.
2. WRITE. Draft one short post (150-300 words) in Paul's voice, plus 3
   alternative opening lines Paul can choose between.

Paul's voice, these are hard rules:
${VOICE_RULES.map((r) => `- ${r}`).join("\n")}

Ground everything in what actually happened this week. Never invent a number, a
feature, or a customer. If you use a figure, it must be in the material below.

Return ONLY valid JSON in exactly this shape:
{
  "picked": [
    { "what": "the change, in plain words",
      "lesson": "the one lesson a marketing team takes from it",
      "evidence": ["sha or note fact that grounds it"] }
  ],
  "nothing_worth_publishing": false,
  "headline": "a plain, specific headline (not a thesis statement)",
  "hooks": ["opening line option 1", "option 2", "option 3"],
  "post_markdown": "the full post in Paul's voice",
  "why_publish": "one line for Paul on why this is worth his audience's time"
}

THIS WEEK'S COMMITS:
${commitDigest(commits)}

THIS WEEK'S NOTES (added lines):
${notesDigest(notes)}`;
}

function extractJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model output");
  return JSON.parse(text.slice(start, end + 1));
}

/**
 * The two voice rules a machine can actually check. Returns warnings, never
 * edits: Paul decides. Em dashes are a hard ban; hype words are a smell.
 */
export function voiceLint(text) {
  const warnings = [];
  if (!text) return warnings;
  const emDashes = (text.match(/—/g) || []).length;
  if (emDashes) warnings.push(`${emDashes} em dash(es) - Paul bans these, swap for a comma or full stop`);
  const lower = text.toLowerCase();
  for (const w of HYPE_WORDS) {
    if (lower.includes(w)) warnings.push(`hype/corporate word: "${w}"`);
  }
  return warnings;
}

async function draftWithClaude(site, commits, notes) {
  const client = new Anthropic({ apiKey: apiKey() });
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    messages: [{ role: "user", content: buildPrompt(site, commits, notes) }],
  });
  const text = msg.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
  const parsed = extractJSON(text);
  return { model: MODEL, ...parsed, lint: voiceLint(parsed.post_markdown) };
}

/**
 * Fallback: surface the non-chore items and leave the writing to a human. It
 * never fakes Paul's voice, an empty skeleton is more honest than a bad guess.
 */
function draftFallback(site, commits) {
  const CHORE = /\b(refactor|chore|lint|typo|bump|deps?|ci|test|revert|wip|healthcheck|throttle|cleanup|readme)\b/i;
  const candidates = commits.filter((c) => !CHORE.test(c.subject)).slice(0, 3);
  return {
    model: null,
    picked: candidates.map((c) => ({
      what: c.subject,
      lesson: "[the lesson for a marketing team - fill in]",
      evidence: [c.sha],
    })),
    nothing_worth_publishing: candidates.length === 0,
    headline: "[headline - fill in]",
    hooks: [],
    post_markdown:
      "[DRAFT SKELETON - no model key set, write this in Paul's voice by hand]\n\n" +
      "Candidate material this week:\n" +
      candidates.map((c) => `- ${c.subject} (${c.sha})${c.body ? `\n    ${c.body.split("\n")[0]}` : ""}`).join("\n"),
    why_publish: "[fill in]",
    lint: [],
  };
}

export async function draftPost(site, commits, notes) {
  if (!apiKey()) {
    console.warn("  no ANTHROPIC key set - producing a skeleton (see README for a hand-run example)");
    return draftFallback(site, commits);
  }
  try {
    return await draftWithClaude(site, commits, notes);
  } catch (err) {
    console.warn(`  model draft failed (${err.message}) - falling back to skeleton`);
    return draftFallback(site, commits);
  }
}
