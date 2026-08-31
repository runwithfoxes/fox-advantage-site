"use client";

// The capabilities page owed to Brendan Marrinan and Laura, ICS Medical
// Devices, Galway. Promised on the 28 Aug call, twice, "by the end of today",
// and never sent. Built 31 Aug from FidelityDoc.tsx on Paul's instruction:
// "We could do a Fidelity one, but just targeted to them."
//
// NOT a proposal. No price, no scope. Paul told Brendan on the call he would
// not put a number on anything until he had spent a couple of hours seeing how
// the work actually gets done, so the close is that session and nothing else.
//
// Two kinds of truth. ICS's own situation appears ONCE, in "What this is", in
// one clause. Every demonstration below it is our own work, generic, and
// labelled as a demonstration. Paul's instruction, 31 Aug: "I don't want stuff
// sounding like we're just repeating back from what they said."
//
// What came off the Fidelity build and why:
//   Designing team AI adoption - WorkGrid is drawn for a large marketing
//     function. ICS marketing is Brendan and Laura.
//   Brand Guardian, Creative Director - both are built on Sabre's consumer
//     ads. ICS sell catheter delivery systems to engineers.
//   The GEO audit - Paul's call, 31 Aug: "don't worry about search."
// What came on: Ghostwriter, because the thing Brendan raised that actually
// worries him is that his customers get acquired, the acquirer runs due
// diligence, and ICS is a risk to them if nobody there has heard of it.
//
// ⚠️ HEADLINE IS A PLACEHOLDER. Paul owns that line.
// ⚠️ Ghostwriter copy is carried from the Affirm page and has not had his pass.

import ProspectShell, { PPSection } from "./ProspectShell";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow, OutreachWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import CardCascade from "./library/CardCascade";
import {
  PipelineBoard,
  JoNote,
  CampaignWindow,
} from "./library/GrowthManager";
import "./library/four-things.css";
import "./fidelity-cases.css";

// Outreach demonstration threads: an invented medtech world, because ICS sell
// to startups and OEMs developing catheter-based devices. Every company and
// person here is made up. The sender is a member of the ICS marketing team,
// never Brendan. The signals in them are the ones Brendan named himself on the
// call: a funding round, a grant, a new company, someone changing jobs.
const OUTREACH_THREADS = [
  {
    name: "Dr Nora Vasquez",
    company: "Founder · Corvellis Cardio",
    message:
      "Hi Nora - saw Corvellis closed its Series A. We build the delivery systems for structural heart devices, with prototypes back in about two weeks. Worth a short call before you lock the design?",
    reply: "Yes - we're choosing a partner in September.",
  },
  {
    name: "Tomas Lindqvist",
    company: "VP R&D · Neuvora Medical",
    message:
      "Hi Tomas - congratulations on the two new catheter engineers. If you're building the delivery system in-house, we do that end to end and most of our customers start with a proof of concept.",
    reply: "Interested. Send me some detail.",
  },
  {
    name: "Elena Rossi",
    company: "CEO · Basilica Vascular",
    message:
      "Hi Elena - saw the Horizon grant. We take startups from first prototype through to manufacture, so the same team stays with you all the way to first in human. Ten minutes?",
    reply: "Happy to talk. Next week?",
  },
  {
    name: "Mark Delaney",
    company: "Head of Engineering · Trellis Neuro",
    message:
      "Hi Mark - you mentioned first in human next year. The delivery system is usually what moves that date. We can quote you a two-week prototype turn on it.",
    reply: "That's the exact problem. Send times.",
  },
  {
    name: "Priya Raman",
    company: "Founder · Kestrel Flow",
    message:
      "Hi Priya - saw you're exhibiting at COMPAMED. We're there too. Worth twenty minutes on the stand about your delivery system?",
    reply: "Yes, put something in for the Tuesday.",
  },
];

// The pipeline board and the morning note both default to the advisor world
// built for Fidelity, so they have to be passed ICS's own. Every company and
// person below is invented, and the caption under the section says so.
const PIPELINE = [
  [
    {
      firm: "Corvellis Cardio",
      person: "Dr Nora Vasquez · Founder",
      note: "intro sent, Series A signal",
    },
    {
      firm: "Trellis Neuro",
      person: "Mark Delaney · Head of Engineering",
      note: "first in human next year",
    },
    {
      firm: "Neuvora Medical",
      person: "Tomas Lindqvist · VP R&D",
      note: "follow-up scheduled",
    },
  ],
  [
    {
      firm: "Basilica Vascular",
      person: "Elena Rossi · CEO",
      note: "Thursday 2pm, brief prepared",
    },
    {
      firm: "Kestrel Flow",
      person: "Priya Raman · Founder",
      note: "Tuesday 10am, agenda sent",
    },
  ],
  [
    {
      firm: "Arden Cardiovascular",
      person: "Ruth Kavanagh · VP Operations",
      note: "waiting on your yes",
    },
    {
      firm: "Solva Neurovascular",
      person: "Anders Holm · Programme Lead",
      note: "follow-up Friday",
    },
  ],
  [
    {
      firm: "Pelagic Medical",
      person: "Onboarding",
      note: "prototype brief agreed, kick-off booked",
    },
    {
      firm: "Larkin Medical",
      person: "Live",
      note: "design freeze, moving to pre-clinical",
    },
  ],
];

const MORNING_NOTE = [
  "Morning. Overnight: two replies came in and one meeting landed, Thursday at two with Basilica.",
  "Three things need you today. The Arden proposal is waiting on your yes. This week's outreach list is built and ready for you to prune. And one reply asks a price question I won't answer for you.",
  "Everything else is handled. Follow-ups sent, the board is current, the forecast is unchanged.",
];

const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "roles", title: "Rethinking the roles" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "training", title: "Training teams" },
  { id: "buildingagents", title: "Building agents" },
  { id: "growth", title: "Growth Agent" },
  { id: "writer", title: "AI Writers" },
  { id: "ghostwriter", title: "Ghostwriter" },
  { id: "work", title: "The work" },
  { id: "next", title: "The next step" },
];

// ⛔ THE RAIL IS THE FOUR THINGS AND NOTHING ELSE (three cuts on Kite, all for
// busyness). Children under Building agents are only the agents this page
// actually demonstrates.
const RAIL_GROUPS = [
  {
    label: "/what we do",
    entries: [
      { id: "workflows", title: "Redesigning workflows", num: "01" },
      { id: "training", title: "Training teams", num: "02" },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "03",
        ids: ["buildingagents", "growth", "writer", "ghostwriter"],
        children: [
          { id: "growth", title: "Growth Agent" },
          { id: "writer", title: "Writers" },
          { id: "ghostwriter", title: "Ghostwriter" },
        ],
      },
      { id: "next", title: "The next step", num: "04" },
    ],
  },
];

export default function IcsMedicalDoc() {
  return (
    <ProspectShell
      clientName="ICS Medical Devices"
      eyebrow="Prepared for Brendan Marrinan and Laura, ICS Medical Devices"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line. */
      title="What we could build for ICS Medical Devices"
      titleHl="ICS Medical Devices"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          This page is what we build and how we work. There is no price in
          it, because I have not seen how your marketing actually gets done
          yet, and any number I put down today would be a guess. I have
          picked the parts that matter most for a company selling to a small
          and nameable set of customers over long development cycles: how
          marketing roles are changing, the training, redesigning how the
          work gets done, and the agents we build.
        </p>
      </PPSection>

      {/* WHAT WE DO. Paul's own copy, verbatim, the approved treatment from
          the Fidelity page. Essays swapped for the five that suit ICS. */}
      <PPSection id="howiwork" k="02" title="What we do">
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
            team would I hire to do this properly? I map that team first,
            the one I would build in a world before any of this existed.
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
          <div className="pps-hiw-links">
            <div>
              <p className="pps-hiw-cli-k">Essays</p>
              <ul className="pps-hiw-ll">
                {[
                  [
                    "the-95-5-rule-the-day-one-list",
                    "The 95:5 rule and the day one list",
                  ],
                  ["a-robot-called-jo", "A robot called Jo"],
                  ["build-a-proactive-agent", "Build a proactive agent"],
                  ["how-i-build-an-ai-writer", "How I build an AI writer"],
                  [
                    "the-future-marketer-is-a-swiss-army-knife",
                    "The future marketer is a Swiss Army knife",
                  ],
                ].map(([slug, title]) => (
                  <li key={slug}>
                    <a
                      href={`/essays/${slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="pps-hiw-cli-k">Free course</p>
              <ul className="pps-hiw-ll">
                <li>
                  <a href="/course" target="_blank" rel="noopener noreferrer">
                    AI Fluency for Ambitious Marketers
                  </a>
                </li>
              </ul>
              <p className="pps-hiw-cli-k" style={{ marginTop: 18 }}>
                The book
              </p>
              <ul className="pps-hiw-ll">
                <li>
                  <a href="/book" target="_blank" rel="noopener noreferrer">
                    The Fox Advantage
                  </a>
                </li>
              </ul>
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
        {/* Paul's own copy, given in chat 10 Aug, lightly cleaned from
            dictation. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          I firmly believe that marketing structures, marketing teams and
          marketing roles are going to change dramatically in the next few
          years, and the work we do is all around that. Specifically, there
          are four buckets to what we currently do. We train teams. We build
          AI agents and capabilities for them, or with them. We work with
          marketing leaders to re-imagine what future workflows could look
          like, and we design AI adoption programmes for them.
        </p>
      </PPSection>

      {/* RETHINKING THE ROLES. Paul's copy from the Fidelity page, verbatim.
          ⛔ Corrected by Paul 10 Aug: START WITH THE WORK, NOT THE TEAM. */}
      <PPSection id="roles" k="04" title="Rethinking the roles">
        <p className="pps-standfirst">
          Individual productivity gets you started. Make everyone on a
          team a little faster and the work still queues in the same places,
          because the bottleneck just moves down the line. The process, the
          people and the policies have to change together, and that starts
          with what each role actually is.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          We start by laying out the work to be done, not the team chart.
          Then we redesign how that work gets done and remove the
          handovers.
        </p>
      </PPSection>

      <PPSection id="workflows" k="05" title="Redesigning workflows">
        <ArrivalBlueprint />
        {/* Paul's own copy, given in chat 10 Aug. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Redesigning workflows is the harder work, and it is what{" "}
          <a
            href="/book"
            target="_blank"
            rel="noopener noreferrer"
            className="pps-copy-link"
          >
            my new book
          </a>{" "}
          is about. It is harder not because of the tech or the tools, but
          because it is about people: their roles, their responsibilities,
          and sometimes their identities. We map out the activities and how
          they flow, from a brief through to campaigns and analysis,
          including the handovers, the time each step takes, the documents
          and artefacts created, the tools used, and the sign-offs. Then we
          re-imagine what is possible, both now and in the very near
          future, starting from a blank page. This is my core skill, as it
          is what I did building teams client-side for most of my career.
        </p>
      </PPSection>

      <PPSection id="training" k="06" title="Training teams">
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
        {/* Paul's own copy, given in chat 10 Aug, lightly cleaned from
            dictation. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Firstly, there is a free course,{" "}
          <a
            href="/course"
            target="_blank"
            rel="noopener noreferrer"
            className="pps-copy-link"
          >
            AI Fluency for Ambitious Marketers
          </a>
          , for anybody on your team. We also run training sessions for
          marketing, sales and go-to-market teams. These range from half a
          day to full-week sessions. We cover a range of topics, from pure
          productivity hacks to building agents and systems. System
          thinking is a core skill for marketing in an AI world.
        </p>
      </PPSection>

      <PPSection id="buildingagents" k="07" title="Building agents">
        <></>
      </PPSection>

      {/* GROWTH AGENT. First of the three because it answers what Brendan
          asked for in his own booking note: lead generation and lead
          management. Outbound lives inside this section, the way it does on
          every page Paul has passed. Threads are an invented medtech world. */}
      <PPSection id="growth" sub title="Growth Agent">
        <PipelineBoard deals={PIPELINE} />
        {/* Paul's own copy, given in chat 10 Aug, lightly cleaned from
            dictation. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          We build Growth Agents for teams. The growth agent does a few
          things. It is the single point of contact for updating and
          tracking the pipeline. For example, it opens the dashboard daily
          for it and the marketer to review together. It does analysis to
          help uncover blockers.
        </p>
        <div style={{ marginTop: 26 }}>
          <JoNote note={MORNING_NOTE} />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          And most importantly, it runs the outbound campaigns, be that
          email or LinkedIn, running all the steps from list building to
          writing the messages, sending and analysis.
        </p>
        <div style={{ marginTop: 26 }}>
          <OutreachWindow
            threads={OUTREACH_THREADS}
            title="Outreach"
            sentLabel="84 sent"
            width={720}
          />
        </div>
        <div style={{ marginTop: 26 }}>
          <CampaignWindow
            triggerName="Funding round"
            workflowName="Funding-round outbound"
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> Every company and
          person in these windows is invented. The machinery is real and
          running; an ICS version would be built to your world and your
          rules, and nothing in it sends until someone on your team says go.
        </p>
      </PPSection>

      <PPSection id="writer" sub title="AI Writers">
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
          That knowledge is a small folder of documents. Here is what comes
          out of it, worked through on Kite, a fictional insurance brand we
          use to demonstrate. Hover a dotted line to see what it is made of.
        </p>
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
              { text: "Nothing for you to do.", note: "voice" },
            ]}
            sign={["Aoife", "Kite"]}
          />
        </div>
      </PPSection>

      {/* GHOSTWRITER. On because of the one thing Brendan raised that
          genuinely worries him: his customers get acquired, the acquirer runs
          due diligence, and ICS is a risk to them if nobody there has heard of
          it. He said he has heard that first hand.
          ⚠️ Copy carried from the Affirm page. Paul's pass owed. */}
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
          stand behind every word. It does the work you have no time for, and
          leaves you the thinking you are paid for. We build it around your
          experts and hand it over.
        </p>
      </PPSection>

      {/* THE WORK. Miro, Moloco, Sabre. Copy verbatim from the Fidelity page,
          where Paul agreed it line by line. */}
      <PPSection id="work" k="08" title="The work">
        <p className="pps-standfirst">
          Starting with the big companies, and with the one I did from the
          inside, running the teams rather than advising them.
        </p>

        <div className="pfd-case">
          <div className="pfd-chd">
            <div className="pfd-who">Miro</div>
            <div className="pfd-meta">
              150 marketers · brand strategy, advertising, marketing
              communications, the studio
            </div>
          </div>
          <div className="pfd-cbody">
            <p>
              We were spending about $1.2 million on design and studio work.
              When I realised what was possible I set a target to reduce it by
              20%, and that 20% was the low hanging fruit, the low skill
              design work.
            </p>
            <p>
              It took a combination of things. AI to make the images, the
              video and the copy. A training structure and a training
              programme. Extra Canva licences. And changes to the brand
              guidelines and the policies, so that people who were not
              marketers could serve themselves and move with speed, while
              keeping everything consistent across the work.
            </p>
          </div>
          <div className="pfd-bignum">
            <div>
              <div className="pfd-n">$1.2m</div>
              <div className="pfd-l">Spent on design and studio work</div>
            </div>
            <div className="pfd-arrow">→</div>
            <div className="pfd-out">
              <div className="pfd-n">$240k</div>
              <div className="pfd-l">Taken out, inside a year</div>
            </div>
          </div>
        </div>

        <div className="pfd-case">
          <div className="pfd-chd">
            <div className="pfd-who">Moloco</div>
            <div className="pfd-meta">50 to 60 marketers</div>
          </div>
          <div className="pfd-cbody">
            <p>
              They wanted to hire a copywriter. I persuaded them to let me
              build copywriters in AI instead, and they use them all the
              time.
            </p>
            <p>
              The part that matters is what goes into one.{" "}
              <b>
                A copywriter is built with the positioning, the messaging
                framework, the pain points and the proof points.
              </b>{" "}
              That is what makes what comes out usable rather than generic.
            </p>
            <p>
              I am also building them a brand guardian, and an AI identity
              generator, which takes all the elements of their brand identity
              and reproduces them at speed.
            </p>
          </div>
          <div className="pfd-caps">
            <div className="pfd-cap pfd-live">
              <div className="pfd-k">Built and in use</div>
              <div className="pfd-chips">
                {["Copywriters", "Fact checker", "Legal checker"].map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
            <div className="pfd-cap">
              <div className="pfd-k">Being built</div>
              <div className="pfd-chips">
                {["Brand guardian", "Identity generator"].map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pfd-case">
          <div className="pfd-chd">
            <div className="pfd-who">Sabre</div>
            <div className="pfd-meta">AI adoption programme, marketing first</div>
          </div>
          <div className="pfd-cbody">
            <p>
              I have been building capabilities for Sabre, and I now work
              alongside their champion inside the marketing team, their
              marketing director.{" "}
              <b>A combination of him on the inside and me on the outside.</b>
            </p>
            <p>
              Together we have designed an AI adoption programme for
              marketing, which we are rolling out now and will extend into go
              to market.
            </p>
            <p>
              Alongside the programme I have built them writers, brand
              guardians, a search agent, a brief coach to improve the quality
              of their briefs, and an advertising creative role.
            </p>
          </div>
          <div className="pfd-caps">
            <div className="pfd-cap pfd-live">
              <div className="pfd-k">Capabilities built</div>
              <div className="pfd-chips">
                {[
                  "Writers",
                  "Brand guardians",
                  "Search agent",
                  "Brief coach",
                  "Advertising creative",
                ].map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
            <div className="pfd-cap">
              <div className="pfd-k">Running now</div>
              <div className="pfd-chips">
                {["AI adoption programme", "Extending to go to market"].map(
                  (c) => (
                    <span key={c}>{c}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </PPSection>

      {/* THE NEXT STEP. The whole point of the page. Paul told Brendan on the
          call he would come down for a couple of hours and only then write a
          proposal, and Brendan said September was tight but they would find
          the time. The email names the dates; this section names the session. */}
      <PPSection id="next" k="09" title="The next step">
        <p className="pps-standfirst">
          The useful next step is a couple of hours with you and Laura, and
          anyone else who touches this work. I want to see how it gets done
          today: what the week actually looks like, how long each thing
          takes, what goes out to agencies, and where the time goes. That is
          what tells me whether I can genuinely help you, and what I would
          build first.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          It can be in Galway or online. Online works well, because I capture
          the whole session as we go. After it I would come back to you with
          a recommendation and a price, and both would be based on something
          I had seen rather than something I had guessed.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Nothing on this page is a commitment on your side, and there is no
          cost until you have seen a proposal you want to say yes to.
        </p>
      </PPSection>
    </ProspectShell>
  );
}
