"use client";

// The capabilities page owed to Peter Berry, Fidelity Investments Canada.
// Commitment made on the 7 Aug call, due sent by Tue 11 Aug (Paul flies the
// 12th). NOT a proposal: no price, no scope, nobody asked for a quote.
//
// Built against the five things in
// ~/paul-hub/tasks/fidelity-canada-capabilities-doc-before-12-aug.md, in the
// task file's fixed order: org and roles first, adoption and fluency,
// measurement, a worked example of reducing a process to code, then the
// close. The IP/data/cost section came OFF on Paul's call (9 Aug); the answer
// stays ready for the second conversation.
//
// Two kinds of truth, per the plan doc: Fidelity's reality appears ONLY in
// "What we heard", in their words from the call. Every demonstration is ours
// and generic; relevance comes from selection, never faked familiarity.
//
// ⛔ Gates this build carries: no unsourced numbers (the 1bn-to-19bn line
// stays out), fictional names only inside demonstrations, nothing hidden
// behind a scroll reveal, every class prefixed.

import ProspectShell, { PPSection } from "./ProspectShell";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow, OutreachWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import WorkGrid from "./library/WorkGrid";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import GeoAudit from "./library/GeoAudit";
import {
  PipelineBoard,
  JoNote,
  CampaignWindow,
} from "./library/GrowthManager";
import "./library/four-things.css";
import "./fidelity-cases.css";

// Outreach demonstration threads: a fictional advisor world, because
// Fidelity's B2B business runs through independent advisors (Peter's own
// framing in his first message). Every name is invented. The sender is a
// member of the marketing team, never Peter.
const OUTREACH_THREADS = [
  {
    name: "Marie Tremblay",
    company: "Principal · Tremblay Wealth Partners",
    message:
      "Hi Marie - saw the practice added two advisors this spring. We have a client-ready market outlook your team can send under its own name. Worth a look?",
    reply: "Yes - send me a sample this week.",
  },
  {
    name: "David Chen",
    company: "Portfolio Manager · Lakeshore Private Wealth",
    message:
      "Hi David - advisors keep telling us quarterly client updates eat their evenings. Ours arrive drafted, sourced and in your voice. Ten minutes?",
    reply: "Interested - Thursday afternoon works.",
  },
  {
    name: "Aisha Thompson",
    company: "Advisor · Thompson & Grant Financial",
    message:
      "Hi Aisha - congratulations on the new practice. One idea for your first client newsletter that might be worth ten minutes.",
    reply: "Happy to chat - send a time that suits.",
  },
  {
    name: "Robert Gagnon",
    company: "Senior Advisor · Gagnon & Associates",
    message:
      "Hi Robert - saw your note on retirement income planning. We have a client explainer on exactly that, ready to go out under your name. Interested?",
    reply: "Sure - send it over.",
  },
  {
    name: "Jenna MacLeod",
    company: "Principal · MacLeod Wealth",
    message:
      "Hi Jenna - your client newsletter went quiet in the spring. We can pick it back up in your voice, monthly, no work your end. Worth ten minutes?",
    reply: "Fair point. Let's talk.",
  },
];

const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "roles", title: "Rethinking the roles" },
  { id: "adoption", title: "Designing team AI adoption" },
  { id: "training", title: "Training teams" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "buildingagents", title: "Building agents" },
  { id: "growth", title: "Growth Agent" },
  { id: "writer", title: "AI Writers" },
  { id: "guardian", title: "Brand Guardian" },
  { id: "creative", title: "Creative Director" },
  { id: "work", title: "The work" },
  { id: "geo", title: "What AI assistants say about Fidelity" },
];

// ⛔ THE RAIL IS THE FOUR THINGS AND NOTHING ELSE (three cuts on Kite, all
// for busyness). Children under Building agents are only the agents this
// page actually demonstrates.
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
        ids: ["buildingagents", "growth", "writer", "guardian", "creative"],
        children: [
          { id: "growth", title: "Growth Agent" },
          { id: "writer", title: "Writers" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "creative", title: "Creative Director" },
        ],
      },
      { id: "adoption", title: "Designing team AI adoption", num: "04" },
    ],
  },
];

export default function FidelityDoc() {
  return (
    <ProspectShell
      clientName="Fidelity Investments Canada"
      eyebrow="Prepared for Peter Berry and Mohd Asher, Fidelity Investments Canada"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line (his note on the first
         Fidelity build: "the hero headline is still mine"). */
      title="Move Fidelity's whole marketing team up the AI scale"
      titleHl="Fidelity"
      /* Standfirst deleted on Paul's pass, 10 Aug: "I don't know what it
         means." The opening section below does the introducing. */
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      {/* Rewritten on Paul's pass, 10 Aug: the old "what we heard" recap
          was "just theatre". Peter asked for a document explaining what we
          do, so the opening says that plainly. ⚠️ DRAFT, his review owed. */}
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          You asked for something that explains what we do. This page is
          that: a snapshot of the work and how we do it. I have focused on
          the areas I think matter most for a marketing team like yours, at
          a hundred and twenty people and hiring: how roles and structures
          are going to change, how a whole team adopts AI, how you measure
          whether it is working, and the agents we build.
        </p>
      </PPSection>

      {/* HOW I WORK. Paul's own copy, verbatim, the approved treatment. */}
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
          {/* Essays, the course and the book, Paul's ask 10 Aug: "they go
              all as links under my bio". Five essays picked for Peter. */}
          <div className="pps-hiw-links">
            <div>
              <p className="pps-hiw-cli-k">Essays</p>
              <ul className="pps-hiw-ll">
                {[
                  [
                    "the-future-marketer-is-a-swiss-army-knife",
                    "The future marketer is a Swiss Army knife",
                  ],
                  ["a-robot-called-jo", "A robot called Jo"],
                  ["how-i-build-an-ai-writer", "How I build an AI writer"],
                  [
                    "getting-cited-by-ai-is-a-brand-problem-not-an-seo-one",
                    "Getting cited by AI is a brand problem, not an SEO one",
                  ],
                  [
                    "distinctive-brand-assets-in-an-ai-world",
                    "Distinctive Brand Assets in an AI world",
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

      {/* RETHINKING THE ROLES. The first of the five things in the task
          file: the live decision with budget attached. No exhibit exists for
          this yet (stated decision, 9 Aug): the argument is carried in copy.
          ⚠️ DRAFT COPY, built from what Paul said in the room on 7 Aug (the
          productivity paradox, the embedded builder, not everybody a
          builder). His pass owed before send.
          ⛔ Corrected by Paul 10 Aug: START WITH THE WORK, NOT THE TEAM.
          "We identify the work to be done, not the team. Because part of
          this is removing handovers." A team-first line implies every
          person keeps a slot in the flow, which is the opposite of the
          point. Roles fall out of the redesigned work. */}
      <PPSection id="roles" k="04" title="Rethinking the roles">
        <p className="pps-standfirst">
          Individual productivity gets you started. Make everyone on a
          team a little faster and the work still queues in the same places,
          because the bottleneck just moves down the line. The process, the
          people and the policies have to change together, and that starts
          with what each role actually is.
        </p>
        {/* Cut back hard on Paul's pass, 10 Aug: the passing-work line was
            patronising and the roles-come-out-of-that run went with it. */}
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          We start by laying out the work to be done, not the team chart.
          Then we redesign how that work gets done and remove the
          handovers.
        </p>
      </PPSection>

      <PPSection id="adoption" k="05" title="Designing team AI adoption">
        <WorkGrid />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Not everybody is going to be a builder, and that is fine. I
          suspect every marketing team will soon have at least one person
          who builds, and who helps the other teams with their work. What
          we measure is simple: pieces of work that are now done a
          different way, not logins or prompt counts.
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
            dictation. The course link resolves to runwithfoxes.com/course
            in production. */}
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

      <PPSection id="workflows" k="07" title="Redesigning workflows">
        <ArrivalBlueprint />
        {/* Paul's own copy, given in chat 10 Aug, typos and grammar fixed
            as asked. Replaces the draft one-liner that held the slot; the
            window chrome already says "drag the line". */}
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

      <PPSection id="buildingagents" k="08" title="Building agents">
        <></>
      </PPSection>

      {/* GROWTH MANAGER. First of the three agents because it is what got
          Peter's attention in the first place (Elaine's description of the
          growth engine). Briefed by Paul, 9 Aug: pipeline board, the roomy
          outreach inbox, the campaign blueprint, Jo's morning note typing
          itself out. Board, blueprint and note land next; the inbox is live.
          ⚠️ DRAFT COPY below, Paul's pass owed. */}
      <PPSection id="growth" sub title="Growth Agent">
        <PipelineBoard />
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
          running; a Fidelity version would be built to your world and your
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
        {/* The Kite-is-fictional caption came off on Paul's pass, 10 Aug. */}
      </PPSection>

      <PPSection id="guardian" sub title="Brand Guardian">
        <BrandGuardian />
        {/* Paul's own copy, given in chat 10 Aug, lightly cleaned from
            dictation. ⛔ THE CHECK COUNT CAME OUT, 11 Aug, and does not go
            back. This page said nine, Affirm said ten, the component
            caption said ten and the verdict strip says "4 of 4 applicable".
            docs/brand-guardian-methodology.md explains it: the guardian
            works out which TYPE an asset is, then checks it against that
            type's pattern, so the count depends on the file. Four applied
            to the Sabre ad shown. No named source for nine or ten. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          One of our most recent products is a Brand Guardian. In seconds,
          it checks whether new work is on or off-brand, looking at hex
          colours, pixels, copy and photography, and measuring against your
          brand book rather than judging by eye. It&rsquo;s probably our
          most complex agent, and still in beta, but I&rsquo;m very proud
          of it.
        </p>
      </PPSection>

      {/* CREATIVE DIRECTOR. Paul's brief, 10 Aug: Sabre examples from the
          Expleo presentation, what they did and what we did by machine,
          the photo-to-video, and the mix of photographs. Direct frame
          comparison kept on his yes. Copy drafts marked in the component,
          his pass owed. */}
      <PPSection id="creative" sub title="Creative Director">
        <CreativeDirector />
      </PPSection>

      {/* THE WORK. Miro, Moloco, Sabre (Paul's pick, 9 Aug). Copy verbatim
          from the original Fidelity page, where he agreed it line by line.
          Miro is Paul's own employment history. */}
      <PPSection id="work" k="09" title="The work">
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

      {/* THE GEO AUDIT. Paul's ask, 10 Aug: "I'm running a geo audit for
          fidelity so want them to see this and be able to download as
          pdf." Real Fidelity findings, the one deliberate exception to
          the demonstrations-are-generic rule, on his direction. Data from
          the search agent's audit of 10 Aug; internal material (cost
          ledger, tooling notes, other-client caveats) excluded by rule.
          ⚠️ DRAFT COPY in the component, his pass owed. */}
      <PPSection id="geo" k="10" title="What AI assistants say about Fidelity">
        <GeoAudit />
      </PPSection>

      {/* NO PRICE AND NO CLOSE SECTION by design: nothing was scoped,
          nobody asked for a quote, and the close band came off on Paul's
          call (10 Aug): "we've already chatted and they have my details."
          The library slot stays out until Paul says what goes in it. */}
    </ProspectShell>
  );
}
