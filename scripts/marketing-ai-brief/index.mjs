/**
 * Weekly marketing-AI brief.
 *
 * Every Monday this:
 *   1. reads the last 7 days of RELEASES across a curated set of on-theme repos
 *      (and recent commits for the cookbook/guide sources and Paul's own repo),
 *   2. asks Claude to pick the 2-3 things a marketer can act on and write them
 *      up in Paul's voice, "what shipped / what it means for you",
 *   3. drops a dated draft in docs/marketing-ai-brief/ for Paul to check and send.
 *
 * Paul is the trusted filter. The work of the whole marketing-AI world becomes
 * his distribution, translated for people who do not have time to track it.
 *
 * Usage:  node scripts/marketing-ai-brief/index.mjs
 *
 * Env:
 *   GITHUB_TOKEN             lifts the releases rate limit (required in the
 *                            scoped session proxy; public repos otherwise)
 *   CHAT_ANTHROPIC_API_KEY   the writer (falls back to a skeleton if absent)
 *   MARKETING_AI_BRIEF_MODEL override the model (default claude-sonnet-4-6)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SOURCES, BRIEF } from "./config.mjs";
import { readReleases } from "./releases.mjs";
import { draftBrief } from "./draft.mjs";
// commit-based sources (cookbook, Paul's own repo) reuse the affiliate engine's
// git reader. One source of truth for reading git.
import { gatherCommits } from "../affiliate-newsletter/commits.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const OUT_DIR = path.join(ROOT, "docs", "marketing-ai-brief");

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

async function gatherSource(source, token) {
  if (source.kind === "releases") {
    const releases = await readReleases(source, token);
    // flatten a source's releases into one item bag of highlights
    return {
      source,
      name: source.name,
      repo: source.repo,
      tag: releases.map((r) => r.tag).join(", "),
      highlights: releases.flatMap((r) => r.highlights),
    };
  }
  // commits: local (Paul's own) or remote via the git reader
  const { commits } = await gatherCommits(
    { ...source, github: source.repo },
    { source: source.localPath ? "local" : "github", token },
  );
  const CHORE = /\b(refactor|chore|lint|typo|bump|deps?|ci|test|revert|wip|merge)\b/i;
  return {
    source,
    name: source.name,
    repo: source.repo,
    tag: "",
    highlights: commits.filter((c) => !CHORE.test(c.subject)).slice(0, 8).map((c) => c.subject),
  };
}

function renderMarkdown(draft, meta) {
  const L = [];
  L.push(`# ${BRIEF.title} - draft`);
  L.push("");
  L.push(`> Draft for Paul to check and send. Generated ${todayStamp()}.`);
  L.push(`> Sources read: ${meta.sourceLine} · writer: ${draft.model || "template skeleton (no model key)"}`);
  L.push("");

  if (draft.nothing_worth_sending) {
    L.push("## Quiet week");
    L.push("");
    L.push("Nothing this week clears the bar. Recommend sending nothing rather than padding.");
    L.push("");
  }

  if (draft.lint?.length) {
    L.push("## ⚠ Voice check");
    L.push("");
    for (const w of draft.lint) L.push(`- ${w}`);
    L.push("");
  }

  L.push(`## ${draft.headline || ""}`);
  L.push("");
  L.push(draft.intro_markdown || "");
  L.push("");

  for (const it of draft.items || []) {
    L.push(`### ${it.source}`);
    L.push("");
    L.push(`**What shipped:** ${it.what_shipped}`);
    L.push("");
    L.push(`**What it means for you:** ${it.what_it_means}`);
    if (it.do_monday) {
      L.push("");
      L.push(`**Do this Monday:** ${it.do_monday}`);
    }
    if (it.trace?.length) L.push(`\n<sub>grounded in: ${it.trace.join(", ")}</sub>`);
    L.push("");
  }

  if (draft.signoff_markdown) {
    L.push(draft.signoff_markdown);
    L.push("");
  }
  if (draft.why_these) {
    L.push("---");
    L.push("");
    L.push(`**Why this set:** ${draft.why_these}`);
    L.push("");
  }
  return L.join("\n");
}

async function main() {
  console.log(`\n▶ ${BRIEF.title}`);
  const token = process.env.GITHUB_TOKEN || null;

  const items = [];
  const readOk = [];
  for (const source of SOURCES) {
    try {
      const item = await gatherSource(source, token);
      items.push(item);
      readOk.push(`${source.name} (${item.highlights.length})`);
      console.log(`  ${source.name}: ${item.highlights.length} highlight(s)`);
    } catch (err) {
      console.warn(`  ${source.name}: skipped (${err.message.split("\n")[0]})`);
    }
  }
  if (!items.length) {
    console.error("  no sources readable - is GITHUB_TOKEN set?");
    process.exitCode = 1;
    return;
  }

  const draft = await draftBrief(BRIEF, items);
  const md = renderMarkdown(draft, { sourceLine: readOk.join(", ") });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${todayStamp()}.md`);
  fs.writeFileSync(outPath, md, "utf8");
  console.log(`  wrote ${path.relative(ROOT, outPath)}`);
  if (draft.lint?.length) console.log(`  ⚠ ${draft.lint.length} voice warning(s)`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
