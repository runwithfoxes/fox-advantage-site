"use client";

// The test page for the prospect-page system. Kite Insurance is fictional by
// design (it is the course's worked example), so this page can carry every
// component at full fidelity and nothing on it is a real client's data.
// Build order: each new component gets proven here first.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import FolderWindow, { type FolderDoc } from "./library/FolderWindow";
import {
  OutreachWindow,
  ResearchWindow,
  TerminalWindow,
  CampaignWindow,
  type OutreachThread,
} from "./library/AgentWindows";
import LibraryList from "./LibraryList";
import WebsiteExhibit from "./WebsiteExhibit";
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

const KITE_THREADS: OutreachThread[] = [
  {
    name: "Ruth Carmody",
    company: "Director · Carmody & Lyle Insurance Brokers",
    message:
      "Hi Ruth - noticed Carmody & Lyle picked up two new commercial accounts this month. Kite quotes commercial the same day, no re-keying. Worth a look?",
    reply: "Send me the broker portal login, I'll take a look this week.",
  },
  {
    name: "Michael Doran",
    company: "Broker Principal · Doran Cover",
    message:
      "Hi Michael - a lot of brokers are chasing quote turnaround right now. Kite's same-day on commercial and motor fleet. Open to a quick call?",
    reply: "Yes - Thursday afternoon works.",
  },
  {
    name: "Aisling Byrne",
    company: "Commercial Lines Manager · Byrne Foran",
    message:
      "Hi Aisling - saw Byrne Foran is growing the commercial book. We renewed three of your clients last year without a single query. Worth ten minutes?",
    reply: "Sounds good, happy to chat.",
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
          These are not mock-ups of what the software might look like. Each
          window below is the product working on Kite&rsquo;s business: the
          campaign running end to end, the outreach conversations, the research
          brief before a call, and the one-line instruction that starts it all.
        </p>
        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 24 }}>
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
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              alignItems: "start",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <OutreachWindow
                threads={KITE_THREADS}
                title="Kite Outreach Agent"
                sentLabel="96 sent"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
              <TerminalWindow
                instruction="launch a campaign to 80 brokers who quoted commercial lines last month"
                response="4 agents on it - researching, writing, sending, tracking"
                liveLabel="~ kite insurance"
              />
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
          </div>
        </div>
      </PPSection>

      <PPSection id="website" k="04" title="Your website, rebuilt">
        <p className="pps-standfirst">
          When a proposal includes a website, this frame holds the client&rsquo;s
          own site rebuilt, scrollable, live. On this test page it shows our own
          site standing in, because Kite is fictional and has no site to rebuild.
        </p>
        <div style={{ marginTop: 26 }}>
          <WebsiteExhibit
            url="kiteinsurance.ie"
            src="/distinctive"
            caption="Sample frame. A real exhibit holds the client's rebuilt homepage, produced in minutes with no brief, and says so plainly: a real project involves a proper brief, the right photography, agreed navigation and written content."
            issues={{
              title: "Issues we found while building it",
              items: [
                "Sample slot. Only real, verified findings go here, checked with curl before they are written down.",
              ],
            }}
            uses={["Claude Code", "Vercel hosting"]}
            feeds={["The outbound agent's landing pages", "Renewal email links"]}
          />
        </div>
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
