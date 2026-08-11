"use client";

// The page for Suzanne Acton and the marketing team at Affirm Healthcare.
// Meeting 10:00, Tue 11 Aug 2026, in person at their Sandyford office.
// Suzanne is bringing colleagues, including their graphic designer.
//
// NOT a proposal. She already has one (the AI Writer, 11 Jun, EUR 6,000).
// Paul's agenda, agreed with her by email on 4 Aug: first half he quizzes
// them on the briefing problem, second half he shows what is possible in
// general. This page is the second half. No price on it, no scope, no close.
//
// ⭐ ASSEMBLY RULE, Paul's instruction 11 Aug: the Fidelity page is the base,
// not Kite. Where a section or figure exists on both, the FIDELITY version is
// used verbatim, because that is the one he passed line by line on 10 Aug.
// The only piece taken from Kite is Brief Coach, marked below, and he has not
// reviewed that copy yet.
//
// Her two agenda items, and what answers each:
//   1. The copywriter agent  -> AI Writers, and the Moloco case in "The work"
//   2. The briefing assistant -> Brief Coach
// Her designer's own proposal was a Copilot agent that refines centrally,
// asks for missing information and challenges unclear requirements. That is
// what Brief Coach is, so it leads.
//
// ⛔ Gates this build carries: no invented facts about Affirm, no unsourced
// numbers, fictional names only inside demonstrations, every class prefixed,
// nothing hidden behind a scroll reveal. Affirm's own reality appears nowhere
// on this page except the opening line about why we are meeting.

import ProspectShell, { PPSection } from "./ProspectShell";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import ChatWindow from "./library/ChatWindow";
import { BRIEF_COACH_SESSION } from "./library/brief-coach-session";
import { ScaledWindow, OutreachWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import WorkGrid from "./library/WorkGrid";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import { PipelineBoard, JoNote, CampaignWindow } from "./library/GrowthManager";
import "./library/four-things.css";
import "./fidelity-cases.css";

// Outreach demonstration threads. Fidelity's set is a fictional ADVISOR
// world, because that is how their B2B business runs. Affirm sells trade as
// well as direct, through retail, pharmacy and distribution, so the world
// here is buyers and stockists. Every company and person is invented, and
// the sender is a fictional member of the marketing team, never Suzanne.
const OUTREACH_THREADS = [
  {
    name: "Niamh Gallagher",
    company: "Buyer · Corrib Pharmacy Group",
    message:
      "Hi Niamh - we have a new format landing for the autumn immunity season, with the shelf-ready display and sampling support. Worth ten minutes before you set the planogram?",
    reply: "Yes - send it over before our range review.",
  },
  {
    name: "Tom Hendricks",
    company: "Category Manager · Northgate Health Stores",
    message:
      "Hi Tom - saw you have widened the sleep and stress bay. We have two lines in that space with the clinical copy already approved. Happy to send the trade pack?",
    reply: "Please do. We are reviewing that bay in September.",
  },
  {
    name: "Priya Raman",
    company: "Head of Own Brand · Meridian Distribution",
    message:
      "Hi Priya - you asked last year about multilingual packaging for the Gulf listings. That is now something we can turn around quickly. Ten minutes?",
    reply: "Interested - Thursday morning suits.",
  },
  {
    name: "Colm Whelan",
    company: "Owner · Whelan's Health, three stores",
    message:
      "Hi Colm - a small-format version of the counter unit is now available, sized for independents rather than the multiples. Want one for the Naas store to try?",
    reply: "Go on then, send me the details.",
  },
  {
    name: "Sofia Lindqvist",
    company: "Buying Director · Vantage Retail Nordics",
    message:
      "Hi Sofia - our export range now ships with Swedish and Finnish label variants as standard, which was the blocker last time we spoke. Worth picking this back up?",
    reply: "That does change things. Let's talk.",
  },
];

const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "roles", title: "Rethinking the roles" },
  { id: "buildingagents", title: "Building agents" },
  { id: "briefcoach", title: "Brief Coach" },
  { id: "writer", title: "AI Writers" },
  { id: "guardian", title: "Brand Guardian" },
  { id: "creative", title: "Creative Director" },
  { id: "growth", title: "Growth Agent" },
  { id: "training", title: "Training teams" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "adoption", title: "Designing team AI adoption" },
  { id: "work", title: "The work" },
];

// ⛔ THE RAIL IS THE FOUR THINGS AND NOTHING ELSE (three cuts on Kite, all
// for busyness). Children under Building agents are only the agents this
// page actually demonstrates.
const RAIL_GROUPS = [
  {
    label: "/what we do",
    entries: [
      {
        id: "buildingagents",
        title: "Building agents",
        num: "01",
        ids: [
          "buildingagents",
          "briefcoach",
          "writer",
          "guardian",
          "creative",
          "growth",
        ],
        children: [
          { id: "briefcoach", title: "Brief Coach" },
          { id: "writer", title: "Writers" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "creative", title: "Creative Director" },
          { id: "growth", title: "Growth Agent" },
        ],
      },
      { id: "training", title: "Training teams", num: "02" },
      { id: "workflows", title: "Redesigning workflows", num: "03" },
      { id: "adoption", title: "Designing team AI adoption", num: "04" },
    ],
  },
];

export default function AffirmDoc() {
  return (
    <ProspectShell
      clientName="Affirm Health"
      eyebrow="Prepared for Suzanne Acton and the marketing team, Affirm Health"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line, same as on Fidelity. */
      title="Move Affirm's marketing team up the AI scale"
      titleHl="Affirm"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      {/* ⚠️ DRAFT COPY, Paul's pass owed. Written from the 4 Aug email
          exchange only: her two agenda items, and the agenda he proposed
          and she agreed. Nothing else about Affirm appears on this page. */}
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          You asked to look at two things: the copywriter agent we talked
          about in June, and the briefing assistant your designer proposed.
          This page shows both, and some of the other work we do, so the
          team can see it working rather than hear me describe it.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Everything here is our own work or a demonstration we built. None
          of it is about Affirm, and none of it assumes anything about how
          you work inside. That is what the first half of our meeting is
          for.
        </p>
      </PPSection>

      {/* WHAT WE DO. Paul's own copy, verbatim from the Fidelity page. */}
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
          {/* Essays picked for Suzanne: the writer piece and the Swiss Army
              knife one speak to her copywriter question, the DBA and GEO
              essays to a consumer brand sold through retail and Amazon. */}
          <div className="pps-hiw-links">
            <div>
              <p className="pps-hiw-cli-k">Essays</p>
              <ul className="pps-hiw-ll">
                {[
                  ["how-i-build-an-ai-writer", "How I build an AI writer"],
                  [
                    "the-future-marketer-is-a-swiss-army-knife",
                    "The future marketer is a Swiss Army knife",
                  ],
                  ["a-robot-called-jo", "A robot called Jo"],
                  [
                    "distinctive-brand-assets-in-an-ai-world",
                    "Distinctive Brand Assets in an AI world",
                  ],
                  [
                    "getting-cited-by-ai-is-a-brand-problem-not-an-seo-one",
                    "Getting cited by AI is a brand problem, not an SEO one",
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

      {/* Paul's own copy, verbatim from the Fidelity page. */}
      <PPSection id="whatwedo" k="03" title="What Run with Foxes does">
        <FourThingsFigure />
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

      {/* RETHINKING THE ROLES. Copy verbatim from the Fidelity page,
          including Paul's 10 Aug correction: start with the work, not the
          team, because part of the point is removing handovers. No exhibit
          exists for this yet; the argument is carried in copy. */}
      <PPSection id="roles" k="04" title="Rethinking the roles">
        <p className="pps-standfirst">
          Individual productivity only gets you so far. Make everyone on a
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

      {/* AGENTS COME EARLY ON THIS PAGE, ahead of training, workflows and
          adoption. On Fidelity they sit later. Both of Suzanne's agenda
          items are agents, so this is the section she came for. Within the
          group the order is hers too: Brief Coach and Writers are the two
          things she asked about, the Guardian speaks to the packaging and
          artwork load, and the Growth Agent is last because outbound is the
          least relevant of the five to her. */}
      <PPSection id="buildingagents" k="05" title="Building agents">
        <></>
      </PPSection>

      {/* BRIEF COACH. Leads because her designer independently proposed
          exactly this: an agent whose instructions are refined centrally,
          that asks for missing information and challenges unclear
          requirements. Suzanne's own words for the problem: "too much back
          and forth between marketing and design and the outputs were taking
          too long".
          ⚠️ THIS IS THE ONE PIECE TAKEN FROM THE KITE PAGE. Copy below is
          the Kite version, which Paul has NOT passed. His review owed. */}
      <PPSection id="briefcoach" sub title="Brief Coach">
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

      {/* AI WRITERS. Verbatim from the Fidelity page, including Paul's own
          slop copy. The demonstration stays Kite's renewal email: it is the
          worked example the writer piece was built on, and swapping it for a
          supplements email would mean inventing Affirm's voice, which is
          exactly what the no-invented-facts gate forbids. */}
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

      {/* BRAND GUARDIAN. On the page at Paul's instruction, 11 Aug ("put all
          of Peter's"), which overrules the default-off I had carried from
          the build brief. The exhibit shows Sabre's real work.
          ⚠️ Paul's copy from the Fidelity page says NINE checks; the
          window's verdict strip says "4 of 4 applicable". Already flagged to
          him on Fidelity, unresolved, and it carries here. */}
      <PPSection id="guardian" sub title="Brand Guardian">
        <BrandGuardian />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          One of our most recent products is a Brand Guardian. In seconds,
          it runs nine different checks to see if the new work is on or
          off-brand, checking hex colours, pixels, copy and photography.
          It&rsquo;s probably our most complex agent, and still in beta,
          but I&rsquo;m very proud of it.
        </p>
      </PPSection>

      {/* CREATIVE DIRECTOR. On the page at Paul's instruction, 11 Aug. One
          approved master ad spawns the size set. Also Sabre's real work. */}
      <PPSection id="creative" sub title="Creative Director">
        <CreativeDirector />
      </PPSection>

      {/* GROWTH AGENT. Last of the five: Affirm's stated pain is content,
          copy and the brief-to-artwork loop, not outbound. It is here
          because Paul asked for everything on Peter's page.
          The outreach world is rebuilt for her: trade buyers and stockists,
          not Fidelity's independent advisors. Every name invented. */}
      <PPSection id="growth" sub title="Growth Agent">
        <PipelineBoard />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          We build Growth Agents for teams. The growth agent does a few
          things. It is the single point of contact for updating and
          tracking the pipeline. For example, it opens the dashboard daily
          for it and the marketer to review together. It does analysis to
          help uncover blockers.
        </p>
        <div style={{ marginTop: 26 }}>
          <JoNote />
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
          <CampaignWindow />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> Every firm and
          person in these windows is invented. The machinery is real and
          running; an Affirm version would be built to your world and your
          rules, and nothing in it sends until someone on your team says go.
        </p>
      </PPSection>

      {/* Paul's own copy, verbatim from the Fidelity page. */}
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

      {/* Paul's own copy, verbatim from the Fidelity page. This section is
          the one that speaks to the throughput problem underneath her
          briefing question: the back and forth between marketing and design
          is a workflow, and the agent is her proposed fix for it. */}
      <PPSection id="workflows" k="07" title="Redesigning workflows">
        <ArrivalBlueprint />
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

      {/* Paul's own copy, verbatim from the Fidelity page. */}
      <PPSection id="adoption" k="08" title="Designing team AI adoption">
        <WorkGrid />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Not everybody is going to be a builder, and that is fine. I
          suspect every marketing team will soon have at least one person
          who builds, and who helps the other teams with their work. What
          we measure is simple: pieces of work that are now done a
          different way, not logins or prompt counts.
        </p>
      </PPSection>

      {/* THE WORK. Verbatim from the Fidelity page, where Paul agreed it
          line by line. Moloco is the lead case here rather than Miro:
          "they wanted to hire a copywriter, I built copywriters instead" is
          the exact decision in front of Suzanne. */}
      <PPSection id="work" k="09" title="The work">
        <p className="pps-standfirst">
          Starting with the big companies, and with the one I did from the
          inside, running the teams rather than advising them.
        </p>

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

      {/* ⏳ THE GEO AUDIT SLOT. A search agent run on affirm-healthcare.com is
          in flight on another terminal as of 07:50, 11 Aug, same process as
          the Fidelity run of 10 Aug. When it lands, add:
            import GeoAudit from "./library/GeoAudit";
            { id: "geo", title: "What AI assistants say about Affirm" }  -> SECTIONS
            <PPSection id="geo" k="09" title="..."><GeoAudit /></PPSection>
          plus the PDF at content/for/affirm-geo-audit.pdf. If it is not good
          by 09:00 the page ships without it and it follows by email.

          ⛔ BRAND GUARDIAN AND CREATIVE DIRECTOR ARE DELIBERATELY OFF THIS
          PAGE. Both exhibits show Sabre's real work, which went on Fidelity's
          page under Paul's explicit ruling FOR THAT PAGE. That ruling does
          not carry to Affirm and the permission question has not been asked.
          The Guardian may be the most relevant thing we have for a business
          doing about sixty artworks per ingredient change, so it is worth
          asking, but it is Paul's call, not this build's.

          NO PRICE AND NO CLOSE SECTION by design: she already holds the
          11 Jun proposal at EUR 6,000, the scope has broadened since, and
          nobody has asked for a new quote. */}
    </ProspectShell>
  );
}
