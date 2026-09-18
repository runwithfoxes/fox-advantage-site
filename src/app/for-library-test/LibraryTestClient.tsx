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
import {
  OutreachWindow,
  ResearchWindow,
  TerminalWindow,
  CampaignWindow,
} from "../for/_components/library/AgentWindows";
import type { OutreachThread } from "../for/_components/library/AgentWindows";

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

// Kite Insurance is a fictional broker-facing insurer, used elsewhere in
// this test area (for/_components/KiteDoc.tsx) as the standing sample
// client. Reused here for the same reason: consistent, clearly fictional.
const KITE_THREADS: OutreachThread[] = [
  {
    name: "Ruth Carmody",
    company: "Director · Carmody & Lyle Insurance Brokers",
    message: "Hi Ruth - noticed Carmody & Lyle picked up two new commercial accounts this month. Kite quotes commercial the same day, no re-keying. Worth a look?",
    reply: "Send me the broker portal login, I'll take a look this week.",
  },
  {
    name: "Michael Doran",
    company: "Broker Principal · Doran Cover",
    message: "Hi Michael - a lot of brokers are chasing quote turnaround right now. Kite's same-day on commercial and motor fleet. Open to a quick call?",
    reply: "Yes - Thursday afternoon works.",
  },
  {
    name: "Aisling Byrne",
    company: "Commercial Lines Manager · Byrne Foran",
    message: "Hi Aisling - saw Byrne Foran is growing the commercial book. We renewed three of your clients last year without a single query. Worth ten minutes?",
    reply: "Sounds good, happy to chat.",
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

      <section style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <h2 style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.06em", color: "#8A8A85" }}>
          AgentWindows (ported from the homepage hero)
        </h2>

        <div>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.04em", color: "#8A8A85", marginBottom: 10 }}>
            OutreachWindow
          </p>
          <OutreachWindow threads={KITE_THREADS} title="Kite Outreach Agent" sentLabel="96 sent" />
        </div>

        <div>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.04em", color: "#8A8A85", marginBottom: 10 }}>
            ResearchWindow
          </p>
          <ResearchWindow
            title="Kite Research Agent"
            subject="Research ahead of your call with Carmody & Lyle"
            from="Kite Research Agent"
            lines={[
              "Hi Sarah,",
              "Here's the research ahead of your call with **Carmody & Lyle** on Friday. Ruth Carmody took over as Director in March.",
              "They picked up two new commercial accounts this quarter and are still quoting those on paper.",
              "- She owns commercial lines with **no dedicated underwriter contact yet** - lead with same-day quoting.",
              "- The **two new accounts** are the wedge - offer to quote both by Friday.",
            ]}
            attachment="carmody-lyle-brief.pdf · 2 pages"
          />
        </div>

        <div>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.04em", color: "#8A8A85", marginBottom: 10 }}>
            TerminalWindow
          </p>
          <TerminalWindow
            instruction="launch a campaign to 80 brokers who quoted commercial lines last month"
            response="4 agents on it - researching, writing, sending, tracking"
            liveLabel="~ kite insurance"
          />
        </div>

        <div>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.04em", color: "#8A8A85", marginBottom: 10 }}>
            CampaignWindow
          </p>
          <CampaignWindow
            title="Kite Campaign Agent"
            crumbLabel="Broker renewal outbound"
            runNumber={22}
            nodes={[
              { icon: "◆", label: "Quote lapsed", kind: "trigger" },
              { icon: "◱", label: "Enrich broker", kind: "step" },
              { icon: "▤", label: "Renewal brief", kind: "agent" },
              { icon: "✎", label: "Draft outreach", kind: "agent" },
              { icon: "➤", label: "Send + track", kind: "step" },
            ]}
            stats={{ contacted: 96, replied: 18, booked: 4, running: 1 }}
            creditsUsed={96}
            creditsTotal={2000}
          />
        </div>
      </section>
    </main>
  );
}
