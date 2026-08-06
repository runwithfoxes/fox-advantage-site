/**
 * Turn a week of commits into a newsletter + a ready-to-send affiliate campaign.
 *
 * The selection is the hard part: most commits (typos, refactors, healthcheck
 * tweaks) are noise to an affiliate. We ask Claude to pick the few changes a
 * customer would actually feel, then write copy an affiliate can paste and send.
 *
 * If CHAT_ANTHROPIC_API_KEY (or ANTHROPIC_API_KEY) is missing, we fall back to a
 * deterministic template so the workflow still produces a usable draft skeleton.
 */

import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.AFFILIATE_NEWSLETTER_MODEL || "claude-sonnet-4-6";

function apiKey() {
  return process.env.CHAT_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || null;
}

function commitDigest(commits) {
  return commits
    .map((c) => {
      const files = c.files?.length
        ? `\n    files: ${c.files.slice(0, 8).join(", ")}${c.files.length > 8 ? " …" : ""}`
        : "";
      const body = c.body ? `\n    ${c.body.replace(/\n/g, "\n    ")}` : "";
      return `- [${c.sha}] ${c.subject}${body}${files}`;
    })
    .join("\n");
}

function buildPrompt(product, commits) {
  const { name, affiliate, voice } = product;
  return `You are the growth engine for ${name}. Every Monday you read the last
7 days of the product's GitHub commits and turn them into a weekly newsletter
for AFFILIATES: people who earn ${affiliate.rate} for referring ${name}, talking
to ${affiliate.audience}.

Your two jobs:
1. SELECT. Most commits are noise to a customer (refactors, config, internal
   tooling, healthchecks, typo fixes). Pick ONLY the 2-4 changes a customer or
   prospect would actually notice or care about this week. If nothing shipped
   that a customer would feel, say so honestly - do not inflate.
2. WRITE. Produce a short newsletter and copy-paste promo assets the affiliate
   can send today with zero editing.

Voice: ${voice}. No hype words, no "revolutionary/game-changing", no em dashes.
Concrete over abstract. Never invent a feature that is not in the commits.

Return ONLY valid JSON, no prose around it, in exactly this shape:
{
  "headline": "one-line summary of the week for the affiliate",
  "nothing_shipped": false,
  "highlights": [
    { "title": "customer-facing name of the change",
      "why_it_matters": "one sentence on the benefit the customer feels",
      "commits": ["sha"] }
  ],
  "newsletter": {
    "subject": "email subject line for the affiliate-facing newsletter",
    "body_markdown": "the newsletter body in markdown, 120-200 words, greeting the affiliate, walking the highlights, ending with a nudge to share this week"
  },
  "campaign": {
    "affiliate_email": {
      "subject": "subject the AFFILIATE can send to THEIR audience",
      "body_markdown": "ready-to-send email for the affiliate's own list, first person as the affiliate, 90-150 words, with a clear CTA. Use {{affiliate_link}} as the link placeholder."
    },
    "social_posts": [
      "a short post (X/LinkedIn) the affiliate can paste, under 280 chars, with {{affiliate_link}}",
      "a second, different-angle post, under 280 chars, with {{affiliate_link}}"
    ]
  }
}

Here are this week's commits:
${commitDigest(commits)}`;
}

function extractJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model output");
  return JSON.parse(text.slice(start, end + 1));
}

async function draftWithClaude(product, commits) {
  const client = new Anthropic({ apiKey: apiKey() });
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    messages: [{ role: "user", content: buildPrompt(product, commits) }],
  });
  const text = msg.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
  return { model: MODEL, ...extractJSON(text) };
}

/**
 * Deterministic fallback. No model, no invention: it surfaces the commits whose
 * subjects don't look like internal chores, and leaves the copy as a clearly
 * marked skeleton for a human to finish.
 */
function draftFallback(product, commits) {
  const CHORE = /\b(refactor|chore|lint|typo|bump|deps?|ci|test|revert|wip|healthcheck|throttle|cleanup)\b/i;
  const candidates = commits.filter((c) => !CHORE.test(c.subject)).slice(0, 4);
  return {
    model: null,
    headline: `${candidates.length} change(s) worth telling ${product.name} affiliates about this week`,
    nothing_shipped: candidates.length === 0,
    highlights: candidates.map((c) => ({
      title: c.subject,
      why_it_matters: "[fill in the customer benefit]",
      commits: [c.sha],
    })),
    newsletter: {
      subject: `This week at ${product.name}`,
      body_markdown:
        "[DRAFT SKELETON - no model key set, finish by hand]\n\n" +
        candidates.map((c) => `- **${c.subject}** (${c.sha})`).join("\n"),
    },
    campaign: {
      affiliate_email: {
        subject: `New in ${product.name} this week`,
        body_markdown:
          "[DRAFT SKELETON]\n\n" +
          candidates.map((c) => `- ${c.subject}`).join("\n") +
          "\n\nTry it: {{affiliate_link}}",
      },
      social_posts: candidates
        .slice(0, 2)
        .map((c) => `New in ${product.name}: ${c.subject}. {{affiliate_link}}`),
    },
  };
}

export async function draftNewsletter(product, commits) {
  if (!apiKey()) {
    console.warn("  no ANTHROPIC key set - producing a template skeleton");
    return draftFallback(product, commits);
  }
  try {
    return await draftWithClaude(product, commits);
  } catch (err) {
    console.warn(`  model draft failed (${err.message}) - falling back to skeleton`);
    return draftFallback(product, commits);
  }
}
