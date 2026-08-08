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

import ProspectShell, { PPSection, PPPart } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import FolderWindow, { type FolderDoc } from "./library/FolderWindow";
import LibraryList from "./LibraryList";
import ChatWindow from "./library/ChatWindow";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow } from "./library/AgentWindows";
import { KITE_SESSION, KITE_POST_SESSION } from "./library/writer-sessions";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
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
    file: "positioning-statement.md",
    label: "Positioning",
    body: [
      "For people who dread the renewal letter, Kite is the car and home insurance that renews itself, because it shops around for you every year and saves EUR 187 on average.",
      "Feeds on the audience, competitors and proof files. Everything downstream traces back to it.",
    ],
  },
  {
    file: "audience.md",
    label: "Audience and insights",
    body: [
      "People who dread the renewal letter and would pay a fair price never to think about it again.",
      "Not the ones who enjoy the haggle. The ones who leave the envelope on the counter for a fortnight and feel slightly worse every time they walk past it.",
    ],
  },
  {
    file: "proof.md",
    label: "Proof points",
    body: [
      "Average saving the first time we shop around for you: EUR 187, all policies renewed in 2025.",
      "Each number carries its source, because a number without one is not proof.",
    ],
  },
  {
    file: "messaging-framework.md",
    label: "Messages",
    body: [
      "Insurance that renews itself, and shops around for you before it does.",
      "Written once, used by everything. Nothing here may contradict the positioning statement.",
    ],
  },
  {
    file: "tone-of-voice.md",
    label: "Tone of voice",
    body: [
      "First person, always. Dry, weary, disbelieving: the sound of the only sane person in the room.",
      "The file the writer reaches for most often, so it lives on its own.",
    ],
  },
  {
    file: "writer-dna.md",
    label: "Working instructions",
    body: [
      "How the writer works with the team: what it reads before writing, how it plans, and the rule that every piece closes with a claims ledger and a source map.",
    ],
  },
  {
    file: "format-email.md",
    label: "Email craft",
    body: [
      "The email frameworks. The writer names which one it is using before it writes, and scores the finished email against it afterwards.",
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
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "training", title: "Training teams" },
  { id: "writer", title: "An AI Writer" },
  { id: "admachine", title: "Creative Director" },
  { id: "guardian", title: "The brand guardian" },
  { id: "system", title: "The system, linked" },
  { id: "adoption", title: "Adoption, measured" },
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
      { id: "workflows", title: "Redesigning workflows", num: "01" },
      { id: "training", title: "Training teams", num: "02" },
      {
        id: "writer",
        title: "Building agents",
        num: "03",
        ids: ["writer", "admachine", "guardian", "system"],
        children: [
          { id: "writer", title: "Writer" },
          { id: "admachine", title: "Creative Director" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "system", title: "The system" },
        ],
      },
      { id: "adoption", title: "Designing team AI adoption", num: "04" },
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
          does AI change how the team itself should work, not just how fast the
          documents get written. Everything below answers something you said,
          and the list on the left is the map.
        </p>
      </PPSection>

      <PPSection id="whatwedo" k="02" title="What Run with Foxes does">
        <FourThingsFigure />
        {/* ⚠️ PLACEHOLDER COPY, PAUL'S OWN REWRITE COMING. His words on 8 Aug:
            "I'll change it, but that's a good placeholder." Ported verbatim
            from the story terminal's 3008 section. Do not polish. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          We do four things, and they run from easiest to hardest: we train
          marketing teams to use AI properly, we build AI capabilities and
          hand them over, we run adoption so the whole team moves rather than
          a keen few, and we redesign how marketing work gets done. Each one
          is shown below rather than described. Everything you&rsquo;ll see is
          our own work on general marketing problems: your situation appears
          only in what we heard, because one call doesn&rsquo;t make us
          experts in how Kite runs, and we won&rsquo;t pretend otherwise.
        </p>
      </PPSection>

      <PPSection id="workflows" k="03" title="Redesigning workflows">
        <ArrivalBlueprint />
        {/* ⚠️ PLACEHOLDER COPY, PAUL'S OWN WORDS COMING. He asked for copy of
            about this length under the blueprint; this text holds the slot. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          We do four things, and they run from easiest to hardest: we train
          marketing teams to use AI properly, we build AI capabilities and
          hand them over, we run adoption so the whole team moves rather than
          a keen few, and we redesign how marketing work gets done. Each one
          is shown below rather than described. Everything you&rsquo;ll see is
          our own work on general marketing problems: your situation appears
          only in what we heard, because one call doesn&rsquo;t make us
          experts in how Kite runs, and we won&rsquo;t pretend otherwise.
        </p>
      </PPSection>

      <PPSection id="training" k="04" title="Training teams">
        <div>
          <ScaledWindow width={940}>
            <div className="ppw-blueprint">
              <div className="ppw-frame-win">
                <div className="ppw-tl">
                  <i />
                  <i />
                  <i />
                  <span className="ppw-t">the course, module one</span>
                  <span className="ppw-live-pill">free, live now</span>
                </div>
                <video
                  src="/for/training/course-module-1-scroll-web.mp4"
                  poster="/for/training/course-module-1-scroll-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </ScaledWindow>
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Usage being uneven is normal: a few people run with the tools, most
          open them once. Training fixes that with a course built for
          marketers. This is the course&rsquo;s first module, the real page,
          scrolled top to bottom.
        </p>
      </PPSection>

      <PPPart title="building agents" />

      <PPSection id="writer" k="05" title="An AI Writer">
        <p className="pps-standfirst">
          I read a lot about how AI writes slop. It does. But it doesn&rsquo;t
          have to. If you spend time up front. Writers need to know your
          brand&rsquo;s positioning, your target audience, insights or pain
          points related to your category. They need to know your
          brand&rsquo;s messaging, and your tone of voice. On top of that, we
          need to articulate instructions on how we want the writer to
          interact with us or our colleagues.
        </p>
        <div style={{ marginTop: 26 }}>
          <Figure name="fig-12" />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          That knowledge is a small folder of documents. This is the whole
          thing, worked through here on Kite, a fictional insurance brand.
          Open the files.
        </p>
        <div style={{ marginTop: 26 }}>
          <FolderWindow name="kite/" files={PACK_DOCS} />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Now judge the writer on the writing. Both sessions below are real
          runs: the writer read those files and followed them, and the dotted
          lines in the finished pieces map every claim back to its source.
        </p>
        <div style={{ marginTop: 26 }}>
          <ChatWindow
            session={KITE_SESSION}
            start="Watch the writer draft Kite's renewal email: the plan, the email, then its own audit, claims ledger and sources."
            title="the writer"
            preview
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <ChatWindow
            session={KITE_POST_SESSION}
            start="A second brief, a LinkedIn post. Watch it refuse to invent what the pack does not have."
            title="the writer"
            preview
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/Kite is fictional, the runs are real.</span>{" "}
          The writer read the pack and wrote what you watched. Kite&rsquo;s
          real version gets built from documents you already have, and these
          recordings get remade with your brand before this page ships.
        </p>
      </PPSection>

      <PPSection id="admachine" k="06" title="Creative Director">
        <p className="pps-standfirst">
          The same discipline, pointed at advertising. The team approves one
          master ad; the machine makes every other size, holding the brand
          exactly. Press run.
        </p>
        <AdMachine />
      </PPSection>

      <PPSection id="guardian" k="07" title="The brand guardian">
        <p className="pps-standfirst">
          Volume without drift needs a guard as well as a pack. This is the
          machine that checks every file against the brand book before it
          ships, shown on the real thing it guards.
        </p>
        <BrandGuardian />
      </PPSection>

      <PPSection id="system" k="08" title="The system, linked">
        <p className="pps-standfirst">
          The machines are not a drawer of separate tools. For teams whose
          website matters, they run as one system: outbound fills the top,
          the site is worth arriving at, and the chatbot meets every visitor.
        </p>
        <SystemCards />
      </PPSection>

      <PPSection id="adoption" k="09" title="Adoption, measured">
        <p className="pps-standfirst">
          Adoption is measured per person, never assumed. The map below is the
          instrument: where each person started, where they are now, reported
          monthly. It is also how you will know whether any of this worked.
        </p>
        <FluencyMap />
      </PPSection>


      <PPSection id="recommend" k="10" title="What we'd recommend">
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

      <PPSection id="pricing" k="11" title="The price">
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

      <PPSection id="library" k="12" title="Your library">
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
