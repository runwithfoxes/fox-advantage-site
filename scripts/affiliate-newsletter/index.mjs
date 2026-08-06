/**
 * Weekly affiliate newsletter production.
 *
 * Every Monday, for each product, this:
 *   1. reads the last 7 days of GitHub commits (GitHub API, or local git),
 *   2. asks Claude to select what customers and affiliates will care about,
 *   3. writes the newsletter AND a ready-to-send affiliate campaign,
 *   4. drops a dated markdown draft in docs/affiliate-newsletters/ for the
 *      head of growth to check and send.
 *
 * So no one manually reads the code for ideas, every affiliate stays current,
 * and promoting the product each week becomes copy-paste easy. Product
 * development becomes a distribution strategy.
 *
 * Usage:
 *   node scripts/affiliate-newsletter/index.mjs                 # prototype: this repo
 *   node scripts/affiliate-newsletter/index.mjs --product revid # a real product
 *   node scripts/affiliate-newsletter/index.mjs --all           # every real product
 *   node scripts/affiliate-newsletter/index.mjs --source local  # force local git
 *
 * Env:
 *   GITHUB_TOKEN              read access to the product repo (GitHub source)
 *   CHAT_ANTHROPIC_API_KEY    the writer (falls back to a skeleton if absent)
 *   AFFILIATE_NEWSLETTER_MODEL   override the model (default claude-sonnet-4-6)
 *
 * There is no test runner in this repo; run it and read the draft it writes.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PRODUCTS, PROTOTYPE_PRODUCT, resolveProduct } from "./config.mjs";
import { gatherCommits } from "./commits.mjs";
import { draftNewsletter } from "./draft.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "..", "docs", "affiliate-newsletters");

function parseArgs(argv) {
  const args = { product: null, all: false, source: undefined };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--all") args.all = true;
    else if (a === "--product") args.product = argv[++i];
    else if (a === "--source") args.source = argv[++i];
    else if (a.startsWith("--product=")) args.product = a.split("=")[1];
    else if (a.startsWith("--source=")) args.source = a.split("=")[1];
  }
  return args;
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function renderMarkdown(product, meta, draft) {
  const { source, commitCount, windowDays } = meta;
  const L = [];
  L.push(`# ${product.name} affiliate newsletter draft`);
  L.push("");
  L.push(`> Draft for the head of growth to check and send. Generated ${todayStamp()}.`);
  L.push(
    `> Source: ${source} · ${commitCount} commit(s) in the last ${windowDays} days · writer: ${draft.model || "template skeleton (no model key)"}`,
  );
  L.push("");

  if (draft.nothing_shipped) {
    L.push("## No customer-facing changes this week");
    L.push("");
    L.push(
      "Nothing shipped that a customer would feel. Recommend skipping this week's send rather than inflating internal work.",
    );
    L.push("");
  }

  L.push(`**${draft.headline}**`);
  L.push("");

  L.push("## What shipped (selected)");
  L.push("");
  if (!draft.highlights?.length) {
    L.push("_Nothing selected._");
  } else {
    for (const h of draft.highlights) {
      L.push(`### ${h.title}`);
      L.push(h.why_it_matters || "");
      if (h.commits?.length) L.push(`\n<sub>commits: ${h.commits.join(", ")}</sub>`);
      L.push("");
    }
  }

  L.push("---");
  L.push("");
  L.push("## Newsletter (to affiliates)");
  L.push("");
  L.push(`**Subject:** ${draft.newsletter?.subject || ""}`);
  L.push("");
  L.push(draft.newsletter?.body_markdown || "");
  L.push("");

  L.push("---");
  L.push("");
  L.push("## Affiliate campaign assets (copy-paste ready)");
  L.push("");
  L.push(
    `Affiliates: grab your link at ${product.affiliate.dashboardUrl} and swap it in for \`{{affiliate_link}}\`. Reward: ${product.affiliate.rate}.`,
  );
  L.push("");
  L.push("### Email the affiliate can send to their audience");
  L.push("");
  L.push(`**Subject:** ${draft.campaign?.affiliate_email?.subject || ""}`);
  L.push("");
  L.push(draft.campaign?.affiliate_email?.body_markdown || "");
  L.push("");
  L.push("### Social posts");
  L.push("");
  for (const post of draft.campaign?.social_posts || []) {
    L.push(`- ${post}`);
  }
  L.push("");

  return L.join("\n");
}

async function runOne(product, { source }) {
  console.log(`\n▶ ${product.name} (${product.key})`);
  const token = process.env.GITHUB_TOKEN || null;
  const { source: usedSource, commits } = await gatherCommits(product, {
    source,
    token,
  });
  console.log(`  read ${commits.length} commit(s) from ${usedSource}`);

  const draft = await draftNewsletter(product, commits);
  const md = renderMarkdown(
    product,
    { source: usedSource, commitCount: commits.length, windowDays: 7 },
    draft,
  );

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${product.key}-${todayStamp()}.md`);
  fs.writeFileSync(outPath, md, "utf8");
  console.log(`  wrote ${path.relative(path.join(__dirname, "..", ".."), outPath)}`);
  return outPath;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let products;
  if (args.all) products = PRODUCTS;
  else if (args.product) products = [resolveProduct(args.product)];
  else products = [PROTOTYPE_PRODUCT];

  const written = [];
  for (const p of products) {
    try {
      written.push(await runOne(p, { source: args.source }));
    } catch (err) {
      console.error(`  ✗ ${p.name} failed: ${err.message}`);
    }
  }

  console.log(`\nDone. ${written.length} draft(s) written to ${path.relative(process.cwd(), OUT_DIR)}/`);
  if (!written.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
