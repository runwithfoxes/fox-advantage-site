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
import LibraryList from "./LibraryList";
import ChatWindow from "./library/ChatWindow";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow } from "./library/AgentWindows";
import { BRIEF_COACH_SESSION } from "./library/brief-coach-session";
import { WriterEmail, WriterPost } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import FluencyMap from "./library/FluencyMap";
import AdMachine from "./library/AdMachine";
import CardCascade from "./library/CardCascade";
import { OutreachWindow } from "./library/AgentWindows";
import BrandGuardian from "./library/BrandGuardian";
import SystemCards from "./library/SystemCards";
import type { Turn } from "./library/chatTypes";
import "./library/four-things.css";

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

// Demonstration threads for the Outbound Agent's window. Generic demo
// content in the fictional Kite world.
const OUTBOUND_THREADS = [
  {
    name: "Ruth Carmody",
    company: "Director · Carmody & Lyle",
    message:
      "Hi Ruth - saw the two new commercial accounts this quarter. Same-day quotes, no re-keying. Worth a look?",
    reply: "Send me the portal login, I'll look this week.",
  },
  {
    name: "Michael Doran",
    company: "Broker Principal · Doran Cover",
    message:
      "Hi Michael - brokers are chasing quote turnaround right now. Same-day on commercial and fleet. Quick call?",
    reply: "Yes - Thursday afternoon works.",
  },
];

const SECTIONS = [
  { id: "heard", title: "What we heard" },
  { id: "howiwork", title: "How I work" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "training", title: "Training teams" },
  { id: "buildingagents", title: "Building agents" },
  { id: "writer", title: "An AI Writer" },
  { id: "admachine", title: "Creative Director" },
  { id: "guardian", title: "The brand guardian" },
  { id: "system", title: "The system, linked" },
  { id: "briefcoach", title: "Brief Coach" },
  { id: "outbound", title: "Outbound Agent" },
  { id: "lifecycle", title: "Lifecycle Agent" },
  { id: "ghostwriter", title: "Ghostwriter" },
  { id: "searchgeo", title: "Search and GEO Agent" },
  { id: "adoption", title: "Designing team AI adoption" },
  { id: "recommend", title: "What we'd recommend" },
  { id: "pricing", title: "The price" },
  { id: "library", title: "Your library" },
];

// The rail's lead group: what we do, in the ladder order, one-liners locked
// verbatim by Paul. Capabilities spans its three demonstrations.
const RAIL_GROUPS = [
  // Two rows above the four things so the positioning section is reachable
  // from the rail (Paul, 9 Aug: "otherwise it doesn't position me properly").
  // Compact on purpose, the rail was cut twice for busyness.
  {
    label: "/on this page",
    compact: true,
    entries: [
      { id: "heard", title: "What we heard" },
      { id: "howiwork", title: "How I work" },
    ],
  },
  {
    label: "/what we do",
    entries: [
      { id: "workflows", title: "Redesigning workflows", num: "01" },
      { id: "training", title: "Training teams", num: "02" },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "03",
        ids: [
          "buildingagents",
          "writer",
          "admachine",
          "guardian",
          "system",
          "briefcoach",
          "outbound",
          "lifecycle",
          "ghostwriter",
          "searchgeo",
        ],
        children: [
          { id: "writer", title: "Writer" },
          { id: "admachine", title: "Creative Director" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "system", title: "The system" },
          { id: "briefcoach", title: "Brief Coach" },
          { id: "outbound", title: "Outbound Agent" },
          { id: "lifecycle", title: "Lifecycle Agent" },
          { id: "ghostwriter", title: "Ghostwriter" },
          { id: "searchgeo", title: "Search & GEO" },
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
      bio={{ href: "/#about", label: "/about" }}
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

      {/* HOW I WORK. Paul's own copy, given verbatim 9 Aug, replacing the
          version that was lost when the bio came out of the rail. The
          treatment is the Fidelity page's approved one: photo, the award
          line, his three paragraphs, the client names, two quotes. This is
          the one section whose visual is typographic on purpose, it sits
          directly above two figures and the blueprint slider. */}
      <PPSection id="howiwork" k="02" title="How I work">
        <p className="pps-hiw-line">Quality first, then automate</p>
        <p className="pps-hiw-by">Paul Dervan, Run with Foxes</p>
        <div className="pps-hiw-grid">
          <div className="pps-hiw-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Paul_photo.jpg" alt="Paul Dervan, Run with Foxes" />
          </div>
          <p className="pps-hiw-award">
            Ireland&rsquo;s Marketer of the Year, 2022
          </p>
          <p className="pps-standfirst">
            Before I build anything, I ask one question: what does really good
            look like here? Not what AI can do, but what the best version of
            this marketing would be, and the level of quality and
            effectiveness I would want to stand over.
          </p>
          <p className="pps-standfirst">
            So I start where I always have. If there were no AI at all, what
            team would I hire to do this properly? A strategist to set the
            positioning and the plan, someone doing the outreach properly one
            company at a time, a designer and a developer to build the website
            and keep it current, and a writer building your authority in
            public. The capabilities, the craft and the resources it would
            genuinely take to be good. I map that team first, the one I would
            build in a world before any of this existed.
          </p>
          <p className="pps-standfirst">
            Then I build exactly that, with agents instead of hires. The
            quality bar is set by the team I would have wanted, not by
            whatever a tool happens to make easy. Twenty years in brand is
            what tells me where that bar sits: Head of Brand at O2 Ireland,
            then CMO at the National Lottery, Head of Brand at Indeed and
            Miro, both global roles. Positioning, messaging and tone written
            first, then built into everything the agents make.
          </p>
          <div className="pps-hiw-cli">
            <p className="pps-hiw-cli-k">Who I work with</p>
            <div className="pps-hiw-cli-l">
              {[
                "Moloco",
                "Heineken",
                "Norcros",
                "Alltech",
                "Smurfit",
                "Hostelworld",
                "Eaton Square",
                "Weatherbys",
              ].map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="pps-hiw-quotes">
          <div className="pps-hiw-q">
            <p>
              &ldquo;His command of marketing science as well as his instincts
              for great thinking and ideas are, in my opinion, superb.&rdquo;
            </p>
            <div className="pps-hiw-who">
              <b>Peter Field</b>
              <br />
              The Godfather of Effectiveness, author of The Long and the Short
              of It
            </div>
          </div>
          <div className="pps-hiw-q">
            <p>
              &ldquo;Paul reported into me as Head of Brand when I was at
              Indeed. I have learned more from him than anyone else in my
              career.&rdquo;
            </p>
            <div className="pps-hiw-who">
              <b>Paul D&rsquo;Arcy</b>
              <br />
              CMO, Moloco. Former CMO at Miro and Indeed
            </div>
          </div>
        </div>
      </PPSection>

      <PPSection id="whatwedo" k="03" title="What Run with Foxes does">
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

      <PPSection id="workflows" k="04" title="Redesigning workflows">
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

      <PPSection id="training" k="05" title="Training teams">
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

      <PPSection id="buildingagents" k="06" title="Building agents">
        <></>
      </PPSection>

      <PPSection id="writer" sub title="An AI Writer">
        <Figure name="fig-12" />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          I read a lot about how AI writes slop. It does. But it doesn&rsquo;t
          have to. If you spend time up front. Writers need to know your
          brand&rsquo;s positioning, your target audience, insights or pain
          points related to your category. They need to know your
          brand&rsquo;s messaging, and your tone of voice. On top of that, we
          need to articulate instructions on how we want the writer to
          interact with us or our colleagues.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          That knowledge is a small folder of documents. Here is what comes out
          of it, worked through on Kite, a fictional insurance brand. Hover a
          dotted line to see what it is made of.
        </p>
        {/* ⛔ THE FINISHED WRITING ONLY (Paul, 9 Aug). The two recorded sessions
            showed the plan, the slop audit, the score and the claims ledger,
            which is too much to hold when you are reading cold. What proves the
            point is the writing plus the hover, so that is all that is left. */}
        <div style={{ marginTop: 26 }}>
          <WriterEmail
            subject={{
              text: "Your renewal is due on 14 September",
              note: "voice",
            }}
            body={[
              { text: "Hi Sarah," },
              {
                text: "Before it renews, we'll quote the market for you.",
                note: "positioning",
              },
              {
                text: "Last year most people in your position paid the price they were sent. It was a bit higher than the year before, and paying it beat a fortnight of forms and four websites asking the same eleven questions.",
              },
              {
                text: "That increase was never compulsory. It was the cost of staying put.",
                note: "messaging",
              },
              {
                text: "So about three weeks before your date we'll check what everyone else would charge for the same cover. If someone is cheaper, we move you and do the paperwork. If nobody is, you stay where you are. Either way you'll get a note saying what we found and what we chose.",
                note: "messaging",
              },
              {
                text: "The first time we did this, customers saved €187 on average.",
                note: "proof",
              },
              { text: "Nothing for you to do.", note: "messaging" },
            ]}
            sign={["Aoife", "Kite"]}
          />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          A second brief, a LinkedIn post. Same documents, a different job.
        </p>
        <div style={{ marginTop: 26 }}>
          <WriterPost
            body={[
              { text: "Same car. Same house. Same you.", note: "voice" },
              { text: "But the price goes up." },
              {
                text: "The letter lands on a Tuesday. Sixty-one pages, one number that matters, and the number got bigger. Same Focus in the driveway, same forty minute commute, same nothing-happened.",
              },
              { text: "What are you, a procurement department?", note: "voice" },
              { text: "That's the arrangement. You stay put, and it costs you extra." },
              {
                text: "Kite shops around for your car and home insurance before every renewal. If someone is cheaper, you move. If nobody is, you stay.",
                note: "positioning",
              },
              {
                text: "Either way you get told what it found. The first time it shopped around, people saved €187 on average.",
                note: "proof",
              },
              { text: "Kite. It shops around. You don't.", note: "voice" },
            ]}
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/Kite is fictional, the writing is real.</span>{" "}
          The writer read Kite&rsquo;s documents and wrote both pieces. Your
          version gets built from documents you already have, and both of these
          get remade in your brand before this page ships.
        </p>
      </PPSection>

      <PPSection id="admachine" sub title="Creative Director">
        <AdMachine />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The same discipline, pointed at advertising. The team approves one
          master ad; the machine makes every other size, holding the brand
          exactly. Press run.
        </p>
      </PPSection>

      <PPSection id="guardian" sub title="Brand Guardian">
        <BrandGuardian />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Volume without drift needs a guard as well as a pack. This is the
          machine that checks every file against the brand book before it
          ships, shown on the real thing it guards.
        </p>
      </PPSection>

      <PPSection id="system" sub title="The system, linked">
        <SystemCards />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The machines are not a drawer of separate tools. For teams whose
          website matters, they run as one system: outbound fills the top,
          the site is worth arriving at, and the chatbot meets every visitor.
        </p>
      </PPSection>


      <PPSection id="briefcoach" sub title="Brief Coach">
        {/* The live demo from the product page, in the house chat window
            (Paul, 9 Aug). The ladder figure came out the same day: the
            coaching names every rung as it walks up them, so drawing the
            ladder above said it twice. LadderFigure stays in the library,
            unused here. */}
        <div>
          <ChatWindow
            session={BRIEF_COACH_SESSION}
            start="Watch the coach pressure-test a launch brief: where its KPIs sit on the ladder, which of them is a commercial outcome, and what is missing."
            title="brief coach"
            preview
          />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          A brief is the plan behind a piece of marketing. When the brief is
          weak, the work that comes out is weak too. Brief Coach reads your
          brief and does what a good strategist would: it asks the hard
          questions until the plan is clear and worth doing. Why are we really
          doing this, and what would success actually look like? What do we
          want to be known for? What can only we say? And can the team
          actually make it?
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          It uses your own goals, numbers and brand, so the questions fit your
          business, not generic advice. Twenty years of marketing experience,
          built into the questions it asks. It pushes, but it never writes the
          brief for you and never just hands you a yes or no. The thinking
          stays yours. We build it around your business and hand it over.
        </p>
      </PPSection>

      <PPSection id="outbound" sub title="Outbound Agent">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <OutreachWindow threads={OUTBOUND_THREADS} title="Outbound Agent" sentLabel="96 sent" />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Running outbound is a lot of work before a single message lands. You
          work out who your best-fit customers are, find the companies, find
          the right people inside them, screen and qualify, track down a real
          work email, and read up on what each person cares about. Then you
          write, send, follow up, scan the replies and go again. The Outbound
          Agent does the whole job.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The part that matters is the writing: it sends a genuinely different
          message to every person, built from what that one individual cares
          about and grounded in your own positioning and messaging framework,
          so each message is relevant to them and true to you. Not a template
          with a name dropped in. A real message, made for one, going out at
          scale every day. Relevance and scale at once, when you always had to
          pick one. Three times it stops and waits for you: who goes on the
          list, every word before it sends, and the Start button itself.
          Nothing sends or spends until you say go. We build it around your
          brand and your messaging framework, hand it over, and it runs in
          your own Claude.
        </p>
      </PPSection>

      <PPSection id="lifecycle" sub title="Lifecycle Agent">
        <CardCascade
          id="pplc"
          top={{ name: "Lifecycle", lbl: "every moment covered", icon: "mail" }}
          kids={[
            { name: "Onboard", lbl: "new signup", icon: "person" },
            { name: "Nudge", lbl: "hasn't bought yet", icon: "mail" },
            { name: "Win back", lbl: "gone quiet", icon: "loop" },
            { name: "Grow", lbl: "ready for more", icon: "chart" },
          ]}
          ariaLabel="The Lifecycle Agent card with four moments falling out of it: onboard, nudge, win back, grow"
        />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Lifecycle email is the work of keeping and growing the people who
          already know you. Onboarding a new signup, nudging someone who
          hasn&rsquo;t bought yet, winning back a customer who has gone quiet,
          growing the ones ready for more. It is where a lot of revenue comes
          from, and it usually gets skipped because it never stops. The
          Lifecycle Agent runs it.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          It reads the contacts already in your email platform, writes each
          one the right email for their moment, builds the flows, runs the
          campaigns, and reads the numbers to keep tuning what works. Every
          email is in your voice, built on your positioning and messaging
          framework, not one newsletter sent to the whole list. If you
          don&rsquo;t have a marketer, it does the job; if you do, it lets one
          person do the work of five. We build it around your brand and your
          messaging framework, then hand it over to run.
        </p>
      </PPSection>

      <PPSection id="ghostwriter" sub title="Ghostwriter">
        <CardCascade
          id="ppgw"
          top={{ name: "Ghostwriter", lbl: "your point of view", icon: "pen" }}
          kids={[
            { name: "Long piece", lbl: "worth reading", icon: "book" },
            { name: "Posts", lbl: "LinkedIn", icon: "pen" },
            { name: "Chart", lbl: "the evidence", icon: "chart" },
            { name: "Newsletter", lbl: "email", icon: "mail" },
          ]}
          ariaLabel="The Ghostwriter card with four formats falling out of it: long piece, posts, chart, newsletter"
        />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Your experts know things your customers would pay to learn. Almost
          none of it leaves the building. Writing something worth reading is
          slow, and the people who know the most have the least time to do it.
          It is also hard to write about something you know inside out. The
          jargon feels normal, and you stop noticing what the reader does not
          know.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Ghostwriter is built using your brand positioning, your tone and
          your target audience. It helps you find ideas relevant to you, then
          turns your point of view into your words, ready as a long piece,
          posts, a chart or a newsletter. The thinking stays yours, and you
          stand behind every word. It does the work you have no time for, not
          the thinking you are paid for. We build it around your experts and
          hand it over.
        </p>
      </PPSection>

      <PPSection id="searchgeo" sub title="Search and GEO Agent">
        <CardCascade
          id="ppsg"
          top={{ name: "Search Agent", lbl: "found everywhere", icon: "search" }}
          kids={[
            { name: "Google", lbl: "search results", icon: "search" },
            { name: "ChatGPT", lbl: "answers", icon: "flow" },
            { name: "Perplexity", lbl: "answers", icon: "flow" },
            { name: "Claude", lbl: "answers", icon: "flow" },
          ]}
          ariaLabel="The Search Agent card with four places falling out of it: Google, ChatGPT, Perplexity, Claude"
        />
        {/* ⚠️ PLACEHOLDER COPY: no product page exists for the search agent
            yet, so this line is factual and short. Paul's words to come. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The Search and GEO Agent gets a brand found where people now ask: in
          Google&rsquo;s results, and in the answers ChatGPT, Perplexity and
          Claude give. Built and running for client brands now.
        </p>
      </PPSection>

      <PPSection id="adoption" k="07" title="Designing team AI adoption">
        <FluencyMap />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Adoption is measured per person, never assumed. The map below is the
          instrument: where each person started, where they are now, reported
          monthly. It is also how you will know whether any of this worked.
        </p>
      </PPSection>


      <PPSection id="recommend" k="08" title="What we'd recommend">
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

      <PPSection id="pricing" k="09" title="The price">
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

      <PPSection id="library" k="10" title="Your library">
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
              // Named, not numbered: the folder lives in the Writer exhibit under
              // Building agents, and a hardcoded section number goes stale the
              // moment a section is added (it already had, before 9 Aug).
              note: "The positioning, messages, proof and voice the writer works from, as living documents your team can read.",
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
