"use client";

// The test page for the prospect-page system. Kite Insurance is fictional by
// design (it is the course's worked example), so nothing on it is a real
// client's data.
//
// Since 8 Aug this page carries ONE buyer arc, not every component: it is the
// large-marketing-organisation arc from ~/paul-hub/methodology/buyer-map.md
// (what we heard -> what's possible -> what we do -> what we'd do for you ->
// proof -> price -> library). The full component pile stays on
// /for-library-test. Every exhibit here must prove a claim in this arc;
// a component with no claim does not belong on this page.

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
import ChatWindow from "./library/ChatWindow";
import WorkflowExhibit from "./library/WorkflowExhibit";
import { Figure } from "./library/Figure";
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
  { id: "heard", title: "What we heard" },
  { id: "possible", title: "What's possible now" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "plan", title: "What we'd do at Kite" },
  { id: "workflow", title: "The renewal campaign, redesigned" },
  { id: "proof", title: "The machines, working" },
  { id: "pricing", title: "The price" },
  { id: "library", title: "Your library" },
];

export default function KiteDoc() {
  return (
    <ProspectShell
      clientName="Kite Insurance"
      eyebrow="Prepared for Sarah Nolan, Kite Insurance"
      title="Bring AI properly into Kite's marketing team"
      titleHl="Kite"
      standfirst={[
        "This page holds the proposal from our conversation on Tuesday, a working demonstration of what we would build for Kite, and a small library of material chosen for where Kite is right now. It stays live, and anything we add lands here.",
      ]}
      sections={SECTIONS}
    >
      <PPSection id="heard" k="01" title="What we heard">
        <p className="pps-standfirst">
          Talking to you on Tuesday, three things stood out. Kite&rsquo;s
          marketing team is fourteen people across three lines of business, and
          the work is good, but every campaign queues behind the same few hands
          and the agency roster. The team got AI tools last year and usage is
          uneven: a few people use them every day, most opened them once. And
          keeping one voice across everything Kite ships is getting harder as
          the volume goes up. Your question at the end was the important one:
          does AI change how the team itself should work, and not just how fast
          the documents get written.
        </p>
      </PPSection>

      <PPSection id="possible" k="02" title="What's possible now">
        <p className="pps-standfirst">
          The usual way to bring AI into a marketing team treats it as a faster
          typist: the same people, the same queues, slightly quicker drafts.
          What changes things is combining the fundamentals Kite already owns
          with machines that read them. Your positioning, your messages and
          your tone of voice stop being documents nobody opens and become the
          working input to everything the team makes. The figure below shows
          the claim: four brand assets Kite already has, combined into one
          writer that produces work in Kite&rsquo;s voice.
        </p>
        <div style={{ marginTop: 26 }}>
          <Figure name="fig-12" />
        </div>
      </PPSection>

      <PPSection id="whatwedo" k="03" title="What Run with Foxes does">
        <p className="pps-standfirst">
          We do four things, and most engagements use two or three of them. We
          train marketing teams to use AI properly. We build AI capabilities,
          such as writers, ad machines and research agents, configured to a
          brand and handed over. We redesign how marketing work gets done,
          workflow by workflow. And we run adoption: measuring where each
          person is, moving the whole team up the scale, and showing the
          return. For a team like Kite&rsquo;s, the sections below show which
          of the four we would use and what each looks like in practice.
        </p>
      </PPSection>

      <PPSection id="plan" k="04" title="What we'd do at Kite">
        <p className="pps-standfirst">
          Kite does not need more tools. The work starts with a fluency map of
          the fourteen people on the team, so training is aimed at where each
          person actually is rather than run as one workshop for everyone.
          Alongside it we build the brand pack: the small set of documents that
          every machine, and every person, reads from. This is what holds three
          brands consistent while the volume goes up. It is the folder below,
          as your team would see it. Open the files.
        </p>
        <div style={{ marginTop: 26 }}>
          <FolderWindow name="kite-brand-pack/" files={KITE_DOCS} />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 34 }}>
          The training itself runs on Kite&rsquo;s real work, in sessions like
          the one recorded below: a real question about last quarter&rsquo;s
          renewal emails, and the habit of checking the data before answering.
        </p>
        <div style={{ marginTop: 26 }}>
          <ChatWindow
            session={KITE_SESSION}
            start="Watch a working session: an analyst reads a quarter of renewal emails and flags what to change first."
            title="an analyst"
          />
        </div>
      </PPSection>

      <PPSection id="workflow" k="05" title="The renewal campaign, redesigned">
        <p className="pps-standfirst">
          This is what &ldquo;redesigning how the work gets done&rdquo; means,
          shown on one real piece of Kite&rsquo;s work. The broker renewal
          campaign as it runs today, what the analysis finds, and the same
          campaign redesigned. Watch where the days go.
        </p>
        <div style={{ marginTop: 26 }}>
          <WorkflowExhibit
            beforeLabel="The renewal campaign today"
            beforeTotal="14 working days"
            before={[
              {
                name: "Brief written",
                note: "Drafted and approved",
                days: "2 days",
                waitAfter: "3 days in the agency queue",
              },
              {
                name: "Agency first draft",
                note: "Copy and design",
                days: "3 days",
                waitAfter: "2 days waiting for review slots",
              },
              {
                name: "Revisions",
                note: "Two return trips to the agency",
                days: "3 days",
                flagged: true,
              },
              {
                name: "Compliance check",
                note: "Sign-off before it ships",
                days: "1 day",
              },
              {
                name: "Ship",
                note: "Email, ads and page live",
              },
            ]}
            finding={
              <>
                <strong>The finding:</strong> of the 14 days, 5 are work and 9
                are waiting and return trips. The redesign removes the waiting
                and the return trips. Both approval gates stay, and the same
                people hold them.
              </>
            }
            afterLabel="The same campaign, redesigned"
            afterTotal="2 days"
            after={[
              {
                name: "Brief written",
                note: "Same brief, same owner",
                days: "one morning",
              },
              {
                name: "Machines draft everything",
                note: "Email, ads and page in Kite's voice, reading the brand pack",
                machine: true,
              },
              {
                name: "Team review",
                note: "The same eyes, one pass, everything together",
                days: "1 day",
                kept: true,
              },
              {
                name: "Compliance check",
                note: "Same gate, work arrives pre-checked against the pack",
                days: "half a day",
                kept: true,
              },
              {
                name: "Ship",
                note: "Email, ads and landing page live",
              },
            ]}
          />
        </div>
      </PPSection>

      <PPSection id="proof" k="06" title="The machines, working">
        <p className="pps-standfirst">
          Each window below is a working product configured for Kite&rsquo;s
          business: a campaign running end to end, the outreach conversations
          it produced, the research brief before a call, and the one-line
          instruction that starts it all. Every message they send reads from
          the brand pack in section 04, which is how the volume goes up without
          the voice drifting.
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

      <PPSection id="pricing" k="07" title="The price">
        <PricingCards
          cards={[
            {
              label: "Option A",
              title: "The fluency map and a first capability",
              bullets: [
                "AI fluency mapping across the marketing team",
                "The writer, calibrated to Kite's voice and brand pack",
                "Two training sessions run on Kite's real work",
              ],
              price: "EUR 12,500 plus VAT",
              note: "Four weeks. Tool subscriptions are Kite's own.",
            },
            {
              label: "Option B",
              title: "The adoption programme",
              bullets: [
                "Everything in Option A",
                "Monthly training and working sessions with the team",
                "Workflows redesigned one at a time, with the people who run them",
                "Usage, output and quality measured and reported each month",
              ],
              price: "EUR 5,500 a month, six months",
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

      <PPSection id="library" k="08" title="Your library">
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
              note: "The folder from section 04, as living documents your team can read.",
              href: "#plan",
              kind: "folder",
              meta: "4 files",
            },
          ]}
        />
      </PPSection>
    </ProspectShell>
  );
}
