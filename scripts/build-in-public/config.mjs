/**
 * Configuration for the weekly build-in-public workflow.
 *
 * Same skeleton as the affiliate newsletter, three swaps:
 *   source  = commits AND the reasoning in the notes files (that is where the
 *             marketing lesson lives, not in the code)
 *   output  = a teaching draft for Paul's OWN channels, not affiliate promos
 *   voice   = Paul's voice, embedded verbatim so the writer holds the line
 *
 * Product development becomes distribution: the work Paul already does throws
 * off two or three real lessons a week; this turns them into candidate posts.
 */

export const SITE = {
  name: "Run with Foxes",
  author: "Paul Dervan",
  localPath: ".", // read this repo's own git history

  // Who the draft is for. Not customers to sell to, marketers to teach.
  audience:
    "marketers and marketing leaders building AI into how their team works",

  // Where a finished piece goes. The draft is written for these, Paul picks one.
  channels: ["Substack / the /essays reader", "LinkedIn"],

  // Files where Paul records the *why*, not just the *what*. Read alongside the
  // commit bodies so the writer has the reasoning, not only the change.
  notesFiles: ["CLAUDE.md", "CONTEXT.md", "HANDOVER.md"],

  // The bar. If nothing this week clears it, the workflow says so and sends
  // nothing rather than manufacturing a post.
  bar: "carries a genuine lesson a marketing team could use next week",
};

/**
 * Paul's voice, lifted verbatim from CLAUDE.md and the writing-voice skill.
 * The writer gets these as hard rules. A short voice-lint (draft.mjs) also
 * scans the output for the two that are checkable: em dashes and hype words.
 */
export const VOICE_RULES = [
  "Write like two mates talking in a pub. Peer-to-peer, never instructional, never staccato.",
  "Open on a small lived moment with one odd real detail (a number, a brand, a place). Start specific, not with a thesis.",
  "Evidence first, judgement after. One dry aside per section, max.",
  'Use "we" more than "you". Optimistic, not salesy.',
  "Quality and speed are the two themes running through the work.",
  "No em dashes anywhere. Use a comma or a full stop.",
  "No generalisations (\"most teams\", \"nobody thinks about\").",
  "No judgement or criticism of teams or marketers.",
  "No salesy closers (\"that's where it gets interesting\", \"that's the bit\").",
  "No \"replace\" language. Frame as opportunity, not replacement.",
  "No corporate words (leverage, unlock, activation, ecosystem, reimagine) and no AI hype words.",
  "No neat bow at the end. No moral. Stop when the point is made.",
];

// Hype/corporate words the lint flags if they slip into a draft.
export const HYPE_WORDS = [
  "leverage",
  "unlock",
  "activation",
  "ecosystem",
  "synergy",
  "reimagine",
  "future-proof",
  "over-index",
  "game-changing",
  "game changer",
  "revolutionary",
  "seamless",
  "cutting-edge",
  "supercharge",
  "transform your",
  "next-level",
];
