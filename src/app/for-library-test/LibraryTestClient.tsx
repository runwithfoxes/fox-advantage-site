"use client";

/**
 * Renders one of each ported library component with invented, generic sample
 * content, so the port from ~/projects/.rwf-wt-course-modules can be checked by eye
 * without touching any real course or client content.
 */

import ChatWindow from "../for/_components/library/ChatWindow";
import type { Turn } from "../for/_components/library/chatTypes";
import FolderWindow from "../for/_components/library/FolderWindow";
import type { FolderDoc } from "../for/_components/library/FolderWindow";
import { SimilarityScale } from "../for/_components/library/SimilarityScale";
import { Figure } from "../for/_components/library/Figure";

const SAMPLE_SESSION: Turn[] = [
  {
    who: "you",
    text: "Can you look at last quarter's email performance and tell me what's actually working?",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "I read the send log and the three campaign briefs behind it. Two patterns stand out and one is worth changing before the next send.",
      },
      {
        kind: "plan",
        lines: [
          ["Strongest send", "The renewal reminder, 34% open, 6% click"],
          ["Weakest send", "The feature announcement, 19% open, 1% click"],
          ["Likely cause", "Subject lines naming a feature rather than a benefit"],
        ],
      },
    ],
  },
  {
    who: "you",
    text: "What would you change first?",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "Rewrite the feature-announcement subject line so it leads with what the reader gets, not what we built. Everything else about that send performed close to plan.",
      },
      {
        kind: "flag",
        text: "One thing to watch: the renewal reminder's strong open rate may be list warmth rather than the subject line. Worth an A/B split before we credit the wording.",
      },
    ],
  },
];

const SAMPLE_DOCS: FolderDoc[] = [
  {
    file: "positioning-note.md",
    label: "Positioning note",
    body: [
      "This is invented sample content for a component test, not a real client document.",
      "The product is framed as the fast option for a team that already knows what it wants, against a slower competitor who does the thinking for them.",
      "Every claim in outbound copy should trace back to one of the three proof points listed below it.",
    ],
  },
  {
    file: "audience-summary.md",
    label: "Audience summary",
    body: [
      "Sample content only. Three groups were compared for this test: existing customers, lapsed customers, and a cold list.",
      "The lapsed group behaves closer to cold than to existing, which argues for treating it as acquisition rather than retention in the next campaign.",
    ],
  },
  {
    file: "pricing-guardrails.md",
    label: "Pricing guardrails",
    body: [
      "Sample content only. Prices should never be shown as a discount off a prior quote; they are quoted flat, once, per plan.",
      "Any comparison table should show three tiers, never more, so the middle option keeps its job of looking like the obvious choice.",
    ],
  },
];

export default function LibraryTestClient() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "48px 20px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 56,
      }}
    >
      <header>
        <p style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.08em", color: "#8A8A85" }}>
          COMPONENT LIBRARY TEST PAGE
        </p>
        <h1 style={{ fontFamily: "var(--sans)", fontSize: 28, margin: "8px 0 0" }}>
          for/_components/library
        </h1>
      </header>

      <section>
        <h2 style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.06em", color: "#8A8A85" }}>
          ChatWindow
        </h2>
        <ChatWindow
          session={SAMPLE_SESSION}
          start="Watch an analyst read a quarter of email sends and flag what to change first."
          title="an analyst"
        />
      </section>

      <section>
        <h2 style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.06em", color: "#8A8A85" }}>
          FolderWindow
        </h2>
        <FolderWindow name="sample-project/" files={SAMPLE_DOCS} />
      </section>

      <section>
        <h2 style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.06em", color: "#8A8A85" }}>
          SimilarityScale
        </h2>
        <SimilarityScale
          data={{
            title: "How similar are the two groups, %",
            line: 90,
            lineLabel: "the same people",
            pairs: [
              { name: "Segment A vs Segment B", value: 58.4 },
              { name: "Segment A vs Segment C", value: 63.1 },
              { name: "Segment B vs Segment C", value: 61.7 },
              { name: "proposed segment vs everyone else", value: 91.5, subject: true },
            ],
          }}
        />
      </section>

      <section>
        <h2 style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.06em", color: "#8A8A85" }}>
          Figure: fig-01
        </h2>
        <Figure name="fig-01" />
      </section>

      <section>
        <h2 style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.06em", color: "#8A8A85" }}>
          Figure: fig-05
        </h2>
        <Figure name="fig-05" />
      </section>
    </main>
  );
}
