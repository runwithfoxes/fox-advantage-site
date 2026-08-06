/**
 * Weekly build-in-public production for Run with Foxes.
 *
 * Every Monday this:
 *   1. reads the last 7 days of commits AND the added lines in the notes files,
 *   2. asks Claude to select the 1-2 changes that carry a real lesson for a
 *      marketing team, and to write a short post in Paul's voice,
 *   3. drops a dated draft in docs/build-in-public/ for Paul to check, tweak,
 *      and publish to Substack / the /essays reader / LinkedIn.
 *
 * The work Paul already does becomes distribution. Same idea Tibo runs on his
 * commits, pointed at Paul's audience: teach, do not sell.
 *
 * Usage:
 *   node scripts/build-in-public/index.mjs
 *
 * Env:
 *   CHAT_ANTHROPIC_API_KEY   the writer (same key the site uses; falls back to
 *                            a skeleton if absent - see README for a real example)
 *   BUILD_IN_PUBLIC_MODEL    override the model (default claude-sonnet-4-6)
 *
 * No test runner in this repo: run it and read the draft it writes.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "./config.mjs";
import { gatherNotes } from "./notes.mjs";
import { draftPost } from "./draft.mjs";
// Reuse the commit gatherer from the affiliate engine: same 7-day window, same
// shape. One source of truth for reading git.
import { gatherCommits } from "../affiliate-newsletter/commits.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const OUT_DIR = path.join(ROOT, "docs", "build-in-public");

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function renderMarkdown(draft, meta) {
  const L = [];
  L.push(`# Build-in-public draft`);
  L.push("");
  L.push(`> Draft for Paul to check and publish. Generated ${todayStamp()}.`);
  L.push(
    `> Source: ${meta.commitCount} commit(s) + ${meta.noteFiles} notes file(s), last 7 days · writer: ${draft.model || "template skeleton (no model key)"}`,
  );
  L.push("");

  if (draft.nothing_worth_publishing) {
    L.push("## Nothing worth publishing this week");
    L.push("");
    L.push(
      "No change this week carries a lesson for a marketing team. Recommend sending nothing rather than manufacturing a post.",
    );
    L.push("");
  }

  if (draft.lint?.length) {
    L.push("## ⚠ Voice check");
    L.push("");
    for (const w of draft.lint) L.push(`- ${w}`);
    L.push("");
  }

  L.push(`## Headline`);
  L.push("");
  L.push(draft.headline || "");
  L.push("");

  if (draft.hooks?.length) {
    L.push("## Alternative openers");
    L.push("");
    for (const h of draft.hooks) L.push(`- ${h}`);
    L.push("");
  }

  L.push("## Post");
  L.push("");
  L.push(draft.post_markdown || "");
  L.push("");

  L.push("---");
  L.push("");
  L.push("## What it is built on");
  L.push("");
  for (const p of draft.picked || []) {
    L.push(`- **${p.what}**`);
    L.push(`  - lesson: ${p.lesson}`);
    if (p.evidence?.length) L.push(`  - grounded in: ${p.evidence.join(", ")}`);
  }
  L.push("");
  if (draft.why_publish) {
    L.push(`**Why publish:** ${draft.why_publish}`);
    L.push("");
  }

  return L.join("\n");
}

async function main() {
  console.log(`\n▶ ${SITE.name} build-in-public`);
  const { commits } = await gatherCommits(SITE, { source: "local" });
  const notes = gatherNotes(SITE.localPath, SITE.notesFiles);
  console.log(`  read ${commits.length} commit(s) + notes from ${notes.length} file(s)`);

  const draft = await draftPost(SITE, commits, notes);
  const md = renderMarkdown(draft, {
    commitCount: commits.length,
    noteFiles: notes.length,
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${todayStamp()}.md`);
  fs.writeFileSync(outPath, md, "utf8");
  console.log(`  wrote ${path.relative(ROOT, outPath)}`);
  if (draft.lint?.length) {
    console.log(`  ⚠ ${draft.lint.length} voice warning(s) - see the draft`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
