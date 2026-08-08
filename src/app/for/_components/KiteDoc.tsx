"use client";

// The test page for the prospect-page system. Kite Insurance is fictional by
// design (it is the course's worked example), so this page can carry every
// component at full fidelity and nothing on it is a real client's data.
// Build order: each new component gets proven here first.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import FolderWindow, { type FolderDoc } from "./library/FolderWindow";
import LibraryList from "./LibraryList";
import ChatWindow from "./library/ChatWindow";
import type { Turn } from "./library/chatTypes";

// Invented content throughout: Kite is fictional and so is everything below.
const KITE_DOCS: FolderDoc[] = [
  {
    file: "positioning.md",
    label: "Positioning",
    body: [
      "Kite is the broker's insurer: the one that answers the phone, quotes the same day, and never surprises a client at renewal.",
      "Every piece of outbound copy traces back to one of the three proof points below it, or it does not go out.",
    ],
  },
  {
    file: "audience.md",
    label: "Audience",
    body: [
      "Three groups, treated differently: the brokers who already place business with Kite, the ones who used to, and the ones who never have.",
      "Lapsed brokers behave closer to cold than to warm, so they get the acquisition treatment, not a loyalty message.",
    ],
  },
  {
    file: "messages.md",
    label: "Messages",
    body: [
      "Written once, used by everything: the outbound agent, the website, the renewal emails. When a message changes here, it changes everywhere.",
    ],
  },
  {
    file: "tone-of-voice.md",
    label: "Tone of voice",
    body: [
      "Plain, direct, no insurance jargon. If a broker would not say the sentence on the phone, it does not go in writing.",
    ],
  },
];

const KITE_SESSION: Turn[] = [
  {
    who: "you",
    text: "Can you look at last quarter's renewal emails and tell me what's actually working?",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "I read the send log and the briefs behind it. Two patterns stand out and one is worth changing before the next send.",
      },
      {
        kind: "plan",
        lines: [
          ["Strongest send", "The renewal reminder, 34% open, 6% click"],
          ["Weakest send", "The product announcement, 19% open, 1% click"],
          ["Likely cause", "Subject lines naming the product rather than the benefit"],
        ],
      },
    ],
  },
  { who: "you", text: "What would you change first?" },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "Rewrite the announcement subject line so it leads with what the broker gets. Everything else in that send performed close to plan.",
      },
      {
        kind: "flag",
        text: "One thing to watch: the renewal reminder's open rate may be list warmth rather than wording. Worth a split test before we credit the subject line.",
      },
    ],
  },
];

const SECTIONS = [
  { id: "recommend", title: "What I'd recommend" },
  { id: "pricing", title: "The price" },
  { id: "agents", title: "The agents, working" },
  { id: "website", title: "Your website, rebuilt" },
  { id: "adoption", title: "AI adoption at Kite" },
  { id: "library", title: "Your library" },
];

export default function KiteDoc() {
  return (
    <ProspectShell
      clientName="Kite Insurance"
      eyebrow="Prepared for Sarah Nolan, Kite Insurance"
      title="Build the Kite marketing team you never had"
      titleHl="Kite"
      standfirst={[
        "This page holds the proposal from our conversation on Tuesday, a working demonstration of each agent configured for Kite, and a small library of material chosen for where Kite is right now. It stays live, and anything we add lands here.",
      ]}
      sections={SECTIONS}
    >
      <PPSection id="recommend" k="01" title="What I'd recommend">
        <p className="pps-standfirst">
          The work starts with the brand pack: the small set of documents that
          every agent, every email and the website read from. This is the
          folder as your team would see it. Open the files.
        </p>
        <div style={{ marginTop: 26 }}>
          <FolderWindow name="kite-brand-pack/" files={KITE_DOCS} />
        </div>
      </PPSection>

      <PPSection id="pricing" k="02" title="The price">
        <PricingCards
          cards={[
            {
              label: "Option A",
              title: "A first piece that earns its keep",
              bullets: [
                "The outbound agent, configured for Kite's broker list",
                "The writer, calibrated to Kite's voice",
                "Your team trained to run both",
              ],
              price: "EUR 9,500 plus VAT",
              note: "Three weeks. Tool subscriptions are Kite's own.",
            },
            {
              label: "Option B",
              title: "The whole system",
              bullets: [
                "Everything in Option A",
                "The website rebuilt and live",
                "Campaign manager across every channel",
                "Monthly working sessions with the team",
              ],
              price: "EUR 4,500 a month, six months",
              note: "Plus VAT. Tool subscriptions are Kite's own.",
              featured: true,
            },
          ]}
        />
        <CoversGrid
          covers={[
            "All build and configuration work",
            "Training sessions with the marketing team",
            "A named point of contact, Paul",
          ]}
          notCovered={[
            "Kite's own tool subscriptions (Claude, hosting, email platform)",
            "Media spend",
          ]}
        />
        <CloseBox clientName="Kite Insurance" />
      </PPSection>

      <PPSection id="agents" k="03" title="The agents, working">
        <p className="pps-standfirst">
          Placeholder. The agent windows and per-agent demos land here.
        </p>
      </PPSection>

      <PPSection id="website" k="04" title="Your website, rebuilt">
        <p className="pps-standfirst">
          Placeholder. The browser-frame rebuild with generated photography.
        </p>
      </PPSection>

      <PPSection id="adoption" k="05" title="AI adoption at Kite">
        <p className="pps-standfirst">
          Adoption is trained, not installed. This is a recorded working
          session of the kind your team runs in week one: real questions, and
          the habit of checking the data before answering.
        </p>
        <div style={{ marginTop: 26 }}>
          <ChatWindow
            session={KITE_SESSION}
            start="Watch a working session: an analyst reads a quarter of renewal emails and flags what to change first."
            title="an analyst"
          />
        </div>
      </PPSection>

      <PPSection id="library" k="06" title="Your library">
        <LibraryList
          intro="A few things worth keeping, chosen for where Kite is right now. This list grows as we talk; anything we add lands here and you'll know because I'll tell you."
          items={[
            {
              label: "The 80/20 of AI for a marketing team like Kite's",
              note: "The first module of the course, free. The fluency argument your team will hear in week one.",
              href: "/course",
              kind: "link",
              meta: "course",
            },
            {
              label: "Distinctive brands have an incredible opportunity with AI",
              note: "Why holding your brand exactly matters more, not less, when the volume of work goes up.",
              href: "/distinctive",
              kind: "file",
              meta: "essay",
            },
            {
              label: "The Fox Advantage",
              note: "Paul's book, free to download.",
              href: "/book",
              kind: "file",
              meta: "book",
            },
            {
              label: "Kite brand pack, working copy",
              note: "The folder from section 01, as living documents your team can read.",
              href: "#recommend",
              kind: "folder",
              meta: "4 files",
            },
          ]}
        />
      </PPSection>
    </ProspectShell>
  );
}
