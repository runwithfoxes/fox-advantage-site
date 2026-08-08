"use client";

// The test page for the prospect-page system. Kite Insurance is fictional by
// design (it is the course's worked example), so nothing on it is a real
// client's data.
//
// Story-first take, 8 Aug evening. The spine follows Paul's dictated
// experience and his easiest-to-hardest ladder for the four things:
// heard -> what we do -> training -> capabilities -> adoption -> workflow
// redesign -> recommendation -> price -> library.
//
// Two kinds of truth (plan doc, 8 Aug): Kite's reality lives ONLY in "what we
// heard". Every demonstration below it is generic, our work, framed as what
// we do for teams like theirs, never as knowledge of their insides.
// The arrival photography and the scroll-dive land after Paul approves the
// prompts; the masthead stays typographic until then.

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
import WriterSwitch from "./library/WriterSwitch";
import RateSlider from "./library/RateSlider";
import AdoptionExhibit from "./library/AdoptionExhibit";
import FourThingsFigure from "./library/FourThingsFigure";
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
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "training", title: "Training, shown" },
  { id: "capabilities", title: "The machines, working" },
  { id: "adoption", title: "Adoption" },
  { id: "workflow", title: "Workflow redesign" },
  { id: "recommend", title: "What I'd recommend" },
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
        "This page holds the proposal from our conversation on Tuesday, working demonstrations of what we do, and a small library of material chosen for where Kite is right now. It stays live, and anything we add lands here.",
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

      <PPSection id="whatwedo" k="02" title="What Run with Foxes does">
        <p className="pps-standfirst">
          We do four things, and they run from easiest to hardest: we train
          marketing teams to use AI properly, we build AI capabilities and hand
          them over, we run adoption so the whole team moves rather than a keen
          few, and we redesign how marketing work gets done. Each one is shown
          below rather than described. Everything you&rsquo;ll see is our own
          work on general marketing problems: your situation appears only in
          what we heard, because one call doesn&rsquo;t make us experts in how
          Kite runs, and we won&rsquo;t pretend otherwise.
        </p>
        <div style={{ marginTop: 26 }}>
          <FourThingsFigure />
        </div>
      </PPSection>

      <PPSection id="training" k="03" title="Training, shown">
        <p className="pps-standfirst">
          Training runs on real work, in sessions like this recorded one: a
          marketer asks a question that matters, and learns the habit of
          checking the data before accepting an answer. Press play and watch a
          minute of it.
        </p>
        <div style={{ marginTop: 26 }}>
          <ChatWindow
            session={KITE_SESSION}
            start="Watch a working session: an analyst reads a quarter of renewal emails and flags what to change first."
            title="an analyst"
          />
        </div>
      </PPSection>

      <PPSection id="capabilities" k="04" title="The machines, working">
        <p className="pps-standfirst">
          The capabilities are machines that read a brand pack, a small set of
          documents like the folder below, and produce work in that voice.
          Open the files, then watch what reads from them.
        </p>
        <div style={{ marginTop: 26 }}>
          <FolderWindow name="brand-pack/" files={KITE_DOCS} />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 34 }}>
          Here is what reading them means. One brief, and the same writer with
          two different packs in front of it. Flip between them.
        </p>
        <div style={{ marginTop: 26 }}>
          <WriterSwitch />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 90 }}>
          The outreach agent holds real conversations. These are broker
          threads: the opener, the typing, the reply arriving.
        </p>
        <div style={{ marginTop: 32 }}>
          <OutreachWindow
            threads={KITE_THREADS}
            title="Outreach Agent"
            sentLabel="96 sent"
          />
        </div>

        <p className="pps-standfirst" style={{ marginTop: 90 }}>
          Starting all of it takes one sentence.
        </p>
        <div style={{ marginTop: 32, maxWidth: 680 }}>
          <TerminalWindow
            instruction="launch a campaign to 80 brokers who quoted commercial lines last month"
            response="4 agents on it - researching, writing, sending, tracking"
            liveLabel="~ run with foxes"
          />
        </div>

        <p className="pps-standfirst" style={{ marginTop: 90 }}>
          And the campaign agent runs the whole flow end to end, then reports.
        </p>
        <div style={{ marginTop: 32 }}>
          <CampaignWindow
            title="Campaign Agent"
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
        </div>

        <p className="pps-standfirst" style={{ marginTop: 90 }}>
          Before every call, the research agent files a brief. This one is for
          a call with a broker on Friday.
        </p>
        <div style={{ marginTop: 32, maxWidth: 720 }}>
          <ResearchWindow
            title="Research Agent"
            subject="Research ahead of your call with Carmody & Lyle"
            from="Research Agent"
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
      </PPSection>

      <PPSection id="adoption" k="05" title="Adoption">
        <p className="pps-standfirst">
          Tools get bought; adoption is what makes them matter. Start with an
          honest question, and drag the handle to answer it.
        </p>
        <div style={{ marginTop: 26 }}>
          <RateSlider question="Where is your marketing team today, honestly?" />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 34 }}>
          Wherever you landed, adoption is the work of moving everyone to the
          right of where they are now. This is what a programme does to a
          marketing team, a demonstration, not anyone&rsquo;s real map. Drag
          the months and watch the movement, then read what the return looks
          like at each stage.
        </p>
        <div style={{ marginTop: 26 }}>
          <AdoptionExhibit />
        </div>
      </PPSection>

      <PPSection id="workflow" k="06" title="Workflow redesign">
        <p className="pps-standfirst">
          The hardest of the four. This is the campaign workflow most marketing
          teams run, not Kite&rsquo;s, we don&rsquo;t know yours and mapping it
          together is where an engagement starts. Watch what the analysis does
          to it.
        </p>
        <div style={{ marginTop: 26 }}>
          <WorkflowExhibit
            beforeLabel="Old world marketing - one campaign"
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
            afterLabel="Modern marketing - the same campaign"
            afterTotal="2 days"
            after={[
              {
                name: "Brief written",
                note: "Same brief, same owner",
                days: "one morning",
              },
              {
                name: "Machines draft everything",
                note: "Email, ads and page, reading the brand pack",
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
                note: "Email, ads and page live",
              },
            ]}
          />
        </div>
      </PPSection>

      <PPSection id="recommend" k="07" title="What I'd recommend">
        <p className="pps-standfirst">
          For a team of fourteen with tools already bought, the work is not
          more tools. I&rsquo;d start with a fluency map of the team and a
          first capability calibrated to your brand, so something real ships in
          the first month. Training runs on your actual work from week one.
          The workflow conversation comes once the map exists, because a
          redesign done before understanding would be guesswork, and this page
          has just told you we don&rsquo;t guess.
        </p>
      </PPSection>

      <PPSection id="pricing" k="08" title="The price">
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

      <PPSection id="library" k="09" title="Your library">
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
              label: "The brand pack, working copy",
              note: "The folder from section 04, as living documents your team can read.",
              href: "#capabilities",
              kind: "folder",
              meta: "4 files",
            },
          ]}
        />
      </PPSection>
    </ProspectShell>
  );
}
