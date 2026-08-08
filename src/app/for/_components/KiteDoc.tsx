"use client";

// The test page for the prospect-page system, rebuilt 8 Aug (evening) to the
// experience Paul dictated: arrival that surprises, the call played back, the
// four things each DEMONSTRATED, room to breathe, recommendation late, price
// late, the library free to take from the rail.
//
// Kite Insurance is fictional by design (the course's worked example). This
// page carries the LARGE MARKETING ORGANISATION arc from
// ~/paul-hub/methodology/buyer-map.md, so its demonstrations are the change
// side of the menu: training, the writer in your voice, workflow redesign,
// adoption measured.
//
// Two kinds of truth, per the plan doc: Kite's reality appears ONLY in "What
// we heard". Every demonstration is ours, generic, and labelled as a
// demonstration. Nothing pretends to know Kite's insides.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import FolderWindow, { type FolderDoc } from "./library/FolderWindow";
import LibraryList from "./LibraryList";
import ChatWindow from "./library/ChatWindow";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import WorkflowDays from "./library/WorkflowDays";
import FluencyMap from "./library/FluencyMap";
import AdMachine from "./library/AdMachine";
import BrandGuardian from "./library/BrandGuardian";
import SystemCards from "./library/SystemCards";
import type { Turn } from "./library/chatTypes";
import "./library/four-things.css";

// A demonstration brand pack. The folder is the exhibit: small documents that
// every machine and every person reads from. Generic on purpose. The writer
// session below QUOTES these files in its source map, so the two exhibits
// have to stay consistent with each other.
const PACK_DOCS: FolderDoc[] = [
  {
    file: "positioning.md",
    label: "Positioning",
    body: [
      "The insurer brokers can reach: the one that answers the phone, quotes the same day, and never surprises a client at renewal.",
      "Every piece of outbound copy traces to one of the three proof points, or it does not go out.",
    ],
  },
  {
    file: "audience.md",
    label: "Audience",
    body: [
      "Three groups, treated differently: the brokers who place business today, the ones who used to, and the ones who never have.",
      "Lapsed brokers behave closer to cold than to warm, so they get the acquisition treatment, not a loyalty message.",
    ],
  },
  {
    file: "messages.md",
    label: "Messages",
    body: [
      "Written once, used by everything: the outbound, the website, the renewal emails. When a message changes here, it changes everywhere.",
      "Lead message for brokers: same-day quotes on commercial lines, no re-keying.",
    ],
  },
  {
    file: "tone-of-voice.md",
    label: "Tone of voice",
    body: [
      "Plain, direct, no jargon. If you would not say the sentence on the phone, it does not go in writing.",
    ],
  },
];

// A recorded training session: the habit being taught is checking the data
// before answering. Generic content, no client's numbers.
const TRAINING_SESSION: Turn[] = [
  {
    who: "you",
    text: "Can you look at last quarter's campaign emails and tell me what's actually working?",
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
        text: "Rewrite the announcement subject line so it leads with what the reader gets. Everything else in that send performed close to plan.",
      },
      {
        kind: "flag",
        text: "One thing to watch: the reminder's open rate may be list warmth rather than wording. Worth a split test before we credit the subject line.",
      },
    ],
  },
];

// The writer, shown properly: the writing itself, with the source map. Every
// ref quote below is verbatim from PACK_DOCS above, which is the point: hover
// a dotted line and see the brand pack producing the sentence.
const WRITER_SESSION: Turn[] = [
  {
    who: "you",
    text: "Draft the renewal email for brokers whose clients renew in June.",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "email",
        subject: "June renewals: quotes back same day",
        subjectRef: {
          file: "messages.md",
          quote: "Lead message for brokers: same-day quotes on commercial lines, no re-keying.",
        },
        body: [
          "Your June renewals are listed below, with last year's terms beside each one.",
          "Send the schedule over and the quotes come back the same day, no re-keying.",
          "No surprises at renewal: if a premium is moving, you hear it from us first, with the reason.",
        ],
        refs: [
          null,
          {
            file: "messages.md",
            quote: "Lead message for brokers: same-day quotes on commercial lines, no re-keying.",
          },
          {
            file: "positioning.md",
            quote: "The insurer brokers can reach: the one that answers the phone, quotes the same day, and never surprises a client at renewal.",
          },
        ],
        sign: ["The broker desk"],
      },
      {
        kind: "flag",
        text: "This list mixes current and lapsed brokers. The audience file says lapsed brokers get the acquisition treatment, so I split them out and drafted theirs separately.",
      },
    ],
  },
];

const FOUR_THINGS: { name: string; line: string; href: string }[] = [
  {
    name: "Training",
    line: "We train marketing teams to use AI properly, on their real work.",
    href: "#training",
  },
  {
    name: "Capabilities",
    line: "We build AI machines, writers, ad makers, research and outreach agents, configured to a brand and handed over.",
    href: "#writer",
  },
  {
    name: "Adoption",
    line: "We measure where each person is, move the whole team up the scale, and show the return.",
    href: "#adoption",
  },
  {
    name: "Workflows",
    line: "We redesign how marketing teams get their work done.",
    href: "#workflows",
  },
];

const SECTIONS = [
  { id: "heard", title: "What we heard" },
  { id: "training", title: "Training, shown" },
  { id: "writer", title: "The writer, in your voice" },
  { id: "admachine", title: "Creative Director" },
  { id: "guardian", title: "The brand guardian" },
  { id: "system", title: "The system, linked" },
  { id: "adoption", title: "Adoption, measured" },
  { id: "workflows", title: "Workflows, redesigned" },
  { id: "recommend", title: "What we'd recommend" },
  { id: "pricing", title: "The price" },
  { id: "library", title: "Your library" },
];

// The rail's lead group: what we do, in the ladder order, one-liners locked
// verbatim by Paul. Capabilities spans its three demonstrations.
const RAIL_GROUPS = [
  {
    label: "/what we do",
    entries: [
      { id: "training", title: "Training teams", num: "01" },
      {
        id: "writer",
        title: "Building agents",
        num: "02",
        ids: ["writer", "admachine", "guardian", "system"],
        children: [
          { id: "writer", title: "Writer" },
          { id: "admachine", title: "Creative Director" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "system", title: "The system" },
        ],
      },
      { id: "adoption", title: "Designing team AI adoption", num: "03" },
      { id: "workflows", title: "Redesigning how teams work", num: "04" },
    ],
  },
  {
    label: "/your page",
    compact: true,
    entries: [
      { id: "heard", title: "What we heard" },
      { id: "recommend", title: "What we'd recommend" },
      { id: "pricing", title: "The price" },
      { id: "library", title: "Your library" },
    ],
  },
];

export default function KiteDoc() {
  return (
    <ProspectShell
      clientName="Kite Insurance"
      eyebrow="Prepared for Sarah Nolan, Kite Insurance"
      title="Move Kite's whole marketing team up the AI scale"
      titleHl="Kite"
      standfirst={[
        "This page holds what we would do for Kite, shown working rather than described, and a small library chosen for where Kite is now. It stays live. Anything we add lands here.",
      ]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
      bio={{ photo: "/Paul_photo.jpg", href: "/#about", label: "/about" }}
      railLinks={[
        { label: "The Fox Advantage, the book", href: "/book", meta: "free" },
        { label: "AI fluency course, module one", href: "/course", meta: "free" },
        { label: "Distinctive brands and AI", href: "/distinctive", meta: "essay" },
      ]}
    >
      <ArrivalBlueprint />

      <PPSection id="heard" k="01" title="What we heard">
        <p className="pps-standfirst">
          Talking to you on Tuesday, three things stood out. Kite&rsquo;s
          marketing team is fourteen people across three lines of business, and
          the work is good, but every campaign queues behind the same few hands
          and the agency roster. The team got AI tools last year and usage is
          uneven: a few people use them every day, most opened them once. And
          keeping one voice across everything Kite ships is getting harder as
          the volume goes up. Your question at the end was the important one:
          does AI change how the team itself should work, not just how fast the
          documents get written. Everything below answers something you said,
          and the list on the left is the map.
        </p>
      </PPSection>

      <PPSection id="training" k="02" title="Training, shown">
        <p className="pps-standfirst">
          Training runs on the team&rsquo;s real work, not slideware. The
          session below is the shape of it: a real question, and the habit of
          checking the data before answering.
        </p>
        <div style={{ marginTop: 26 }}>
          <ChatWindow
            session={TRAINING_SESSION}
            start="Watch a working session: an analyst reads a quarter of campaign emails and flags what to change first."
            title="a working session"
          />
        </div>
      </PPSection>

      <PPSection id="writer" k="03" title="The writer, in your voice">
        <p className="pps-standfirst">
          Judge the writer on the writing. It reads the brand pack before it
          writes a word, and every sentence it produces can show its source:
          the dotted lines in the draft below map back to the files. This is
          how the volume goes up without the voice drifting.
        </p>
        <div style={{ marginTop: 26 }}>
          <FolderWindow name="brand-pack/" files={PACK_DOCS} />
        </div>
        <div style={{ marginTop: 30 }}>
          <ChatWindow
            session={WRITER_SESSION}
            start="Watch the writer draft a renewal email from the brand pack, sources shown."
            title="the writer"
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/a demonstration pack,</span> not
          Kite&rsquo;s. Yours gets written with your team in the first two
          weeks, from documents you already have.
        </p>
      </PPSection>

      <PPSection id="admachine" k="04" title="Creative Director">
        <p className="pps-standfirst">
          The same discipline, pointed at advertising. The team approves one
          master ad; the machine makes every other size, holding the brand
          exactly. Press run.
        </p>
        <AdMachine />
      </PPSection>

      <PPSection id="guardian" k="05" title="The brand guardian">
        <p className="pps-standfirst">
          Volume without drift needs a guard as well as a pack. This is the
          machine that checks every file against the brand book before it
          ships, shown on the real thing it guards.
        </p>
        <BrandGuardian />
      </PPSection>

      <PPSection id="system" k="06" title="The system, linked">
        <p className="pps-standfirst">
          The machines are not a drawer of separate tools. For teams whose
          website matters, they run as one system: outbound fills the top,
          the site is worth arriving at, and the chatbot meets every visitor.
        </p>
        <SystemCards />
      </PPSection>

      <PPSection id="adoption" k="07" title="Adoption, measured">
        <p className="pps-standfirst">
          Adoption is measured per person, never assumed. The map below is the
          instrument: where each person started, where they are now, reported
          monthly. It is also how you will know whether any of this worked.
        </p>
        <FluencyMap />
      </PPSection>

      <PPSection id="workflows" k="08" title="Workflows, redesigned">
        <p className="pps-standfirst">
          This is the thing we do that changes the shape of the week, not just
          the speed of the typing. The blueprint at the top of this page is
          the analysis; here is where the days go when it runs.
        </p>
        <WorkflowDays />
      </PPSection>

      <PPSection id="recommend" k="09" title="What we'd recommend">
        <p className="pps-standfirst">
          Kite does not need more tools. Start with the fluency map: fourteen
          people, measured, so training aims at where each person actually is
          instead of running as one workshop for everyone. Build the brand
          pack, the small set of documents every machine and every person reads
          from, which is what holds three lines of business to one voice while
          the volume goes up. Then redesign one workflow at a time with the
          people who run it, and measure the change monthly so the return is
          visible.
        </p>
      </PPSection>

      <PPSection id="pricing" k="10" title="The price">
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

      <PPSection id="library" k="11" title="Your library">
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
              href: "#writer",
              kind: "folder",
              meta: "4 files",
            },
          ]}
        />
      </PPSection>
    </ProspectShell>
  );
}
