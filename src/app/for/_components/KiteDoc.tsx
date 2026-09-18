"use client";

// The worked proposal, and the reference build for the /proposal skill.
//
// ⭐ REBUILT 11 Aug 2026 ON PAUL'S INSTRUCTION: "just take fidelity one and add
// price." This file WAS the old prospect-page shell from 8 Aug. All of that copy
// is gone. Every section from "What we do" down to "The work" is now Peter
// Berry's page verbatim, because that is the one Paul passed line by line on
// 10 Aug and it carries the current figures.
//
// What this page adds that Fidelity and Affirm deliberately do not have: a
// recommendation, a three-option price, and the library. That combination is
// what makes it a proposal rather than a capabilities page.
//
// Kite Insurance is fictional (the course's worked example), so this stays the
// test slug: components get proven here before a real client page uses them,
// and it is never deployed with a real client's data.
//
// Two kinds of truth, unchanged: Kite's own situation appears ONLY in "What
// this is". Every demonstration is ours and generic.
//
// ⛔ Gates: no unsourced numbers, fictional names only inside demonstrations,
// nothing hidden behind a scroll reveal, every class prefixed. No GEO audit,
// because Kite is fictional and there is no real research to show.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import LibraryList from "./LibraryList";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow, OutreachWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import WorkGrid from "./library/WorkGrid";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import {
  PipelineBoard,
  JoNote,
  CampaignWindow,
} from "./library/GrowthManager";
import "./library/four-things.css";
import "./fidelity-cases.css";

// Outreach demonstration threads. Fidelity's set is a fictional advisor world
// because that is how their B2B business runs; Kite sells commercial and fleet
// cover through brokers, so the world here is brokers. Every firm and person is
// invented, and the sender is a fictional member of the marketing team.
const OUTREACH_THREADS = [
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
  {
    name: "Aoife Brennan",
    company: "Account Executive · Brennan Risk",
    message:
      "Hi Aoife - your fleet book grew again this year. We now quote fleet same-day, with the schedule pre-filled. Ten minutes?",
    reply: "Worth a look. Send me a time.",
  },
  {
    name: "Declan Fitzgerald",
    company: "Managing Director · Fitzgerald Insurances",
    message:
      "Hi Declan - you mentioned renewals eating your team's evenings. Ours arrive priced and ready to send. Happy to show you?",
    reply: "Go on. Next week suits better.",
  },
  {
    name: "Sinead Kavanagh",
    company: "Broker · Kavanagh & Co",
    message:
      "Hi Sinead - the small commercial product now quotes without a referral in most cases. That was the blocker last time we spoke.",
    reply: "That does change things. Let's talk.",
  },
];

// ⭐ FIDELITY'S ORDER EXACTLY, then the three sections a proposal adds.
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
  { id: "work", title: "Clients" },
  { id: "recommend", title: "What we'd recommend" },
  { id: "pricing", title: "The price" },
  { id: "library", title: "Your library" },
];

// ⛔ THE RAIL MUST RUN IN THE SAME ORDER AS THE PAGE. Paul, 11 Aug: clicking
// "Designing team AI adoption" jumped him upwards, because the rail listed it
// LAST while the page has it fifth, above training and workflows. A rail that
// disagrees with the page reads as a broken link, not as a different order.
// Whenever a section moves, move its rail entry with it.
//
// ⛔ The "what we do" group is still the four things and nothing else (three
// cuts, all for busyness). Clients and Pricing are a SEPARATE compact group so
// they cannot creep into that list.
const RAIL_GROUPS = [
  {
    label: "/what we do",
    entries: [
      { id: "adoption", title: "Designing team AI adoption", num: "01" },
      { id: "training", title: "Training teams", num: "02" },
      { id: "workflows", title: "Redesigning workflows", num: "03" },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "04",
        ids: ["buildingagents", "growth", "writer", "guardian", "creative"],
        children: [
          { id: "growth", title: "Growth Agent" },
          { id: "writer", title: "Writers" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "creative", title: "Creative Director" },
        ],
      },
    ],
  },
  {
    label: "/also",
    compact: true,
    entries: [
      { id: "work", title: "Clients" },
      { id: "pricing", title: "Pricing" },
    ],
  },
];

export default function KiteDoc() {
  return (
    <ProspectShell
      clientName="Kite Insurance"
      eyebrow="Prepared for Sarah Nolan, Kite Insurance"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line, same as on Fidelity
         and Affirm. */
      title="Move Kite's whole marketing team up the AI scale"
      titleHl="Kite"
      /* ⛔ NO STANDFIRST. Deleted on Paul's pass, 10 Aug: "I don't know what
         it means." The opening section does the introducing. */
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
      /* Served behind the same gate as the page, from content/for/. Source:
         wireframes/kite-proposal-pdf-source.html. */
      pdfHref="/for/kite/pdf"
    >
      {/* WHAT THIS IS. Per client, and the only place Kite's own situation
          appears. Written to Fidelity's pattern: what you asked for, what
          this is, and why these areas. ⚠️ DRAFT. */}
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          You asked what changing the way the team works would actually
          involve. This page is that: a snapshot of the work and how we do
          it. I have focused on the areas I think matter most for a marketing
          team like yours, at fourteen people across three lines of business:
          how roles and structures are going to change, how a whole team
          adopts AI, how you measure whether it is working, and the agents we
          build.
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
          {/* Essays, the course and the book as links under the bio, Paul's
              ask 10 Aug: "they go all as links under my bio". Essays picked
              for this reader. */}
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

      {/* RETHINKING THE ROLES. Copy only, no exhibit.
          ⛔ START WITH THE WORK, NOT THE TEAM (Paul, 10 Aug): "we identify
          the work to be done, not the team. Because part of this is removing
          handovers." A team-first line implies every person keeps a slot in
          the flow, which is the opposite of the point. */}
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
          running; a Kite version would be built to your world and your
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
          out of it, worked through on Kite&rsquo;s own voice. Hover a dotted
          line to see what it is made of.
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
              // The dry, flat close IS the voice, so it carries the voice note
              // rather than a third messaging one (Paul, 9 Aug).
              { text: "Nothing for you to do.", note: "voice" },
            ]}
            sign={["Aoife", "Kite"]}
          />
        </div>
      </PPSection>

      <PPSection id="guardian" sub title="Brand Guardian">
        <BrandGuardian />
        {/* ⛔ NO CHECK COUNT IN THIS COPY, and do not put one back. Paul's
            dictated line said nine, the component caption said ten, and the
            verdict strip says "4 of 4 applicable". They disagreed because
            the count is not fixed: docs/brand-guardian-methodology.md says
            the guardian works out which TYPE an asset is, then checks it
            against that type's pattern, so the gates that run depend on the
            file. Four applied to the Sabre ad shown. Neither nine nor ten
            has a named source. Resolved 11 Aug by describing what it does
            and letting the exhibit report what ran. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          One of our most recent products is a Brand Guardian. In seconds,
          it checks whether new work is on or off-brand, looking at hex
          colours, pixels, copy and photography, and measuring against your
          brand book rather than judging by eye. It&rsquo;s probably our
          most complex agent, and still in beta, but I&rsquo;m very proud
          of it.
        </p>
      </PPSection>

      <PPSection id="creative" sub title="Creative Director">
        <CreativeDirector />
      </PPSection>

      {/* THE WORK. Miro, Moloco, Sabre. Copy verbatim from the Fidelity
          page, where Paul agreed it line by line. Every number is real. */}
      <PPSection id="work" k="09" title="Clients">
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

      {/* ⭐ THE THREE SECTIONS A PROPOSAL ADDS. Fidelity and Affirm carry
          none of these on purpose: nobody asked either of them for a quote.
          ⚠️ DRAFT COPY and PLACEHOLDER PRICES. Paul sets every number. */}
      <PPSection id="recommend" k="10" title="What we’d recommend">
        <p className="pps-standfirst">
          Option B. Start by laying out the work the team actually does,
          area by area, so training aims at the jobs worth changing rather
          than running as one workshop for everyone. Build the brand pack at
          the same time, the small set of documents every agent and every
          person writes from, which is what holds three lines of business to
          one voice as the volume goes up. Then redesign one workflow at a
          time with the people who run it, and report the change monthly so
          the return is visible while it is happening.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Option A is the same first step without the programme around it,
          and it is the right choice if you would rather see one capability
          working before committing further. Option C is the whole system
          across all three lines of business, which is worth doing once the
          first workflows have proved out.
        </p>
      </PPSection>

      <PPSection id="pricing" k="11" title="The price">
        <PricingCards
          cards={[
            {
              label: "Option A",
              title: "The first measure and a first capability",
              bullets: [
                "The marketing team's work mapped and measured, area by area",
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
                "Output and quality measured and reported each month",
              ],
              price: "EUR 5,500 a month",
              note: "Six months, plus VAT. Tool subscriptions are Kite's own.",
              featured: true,
            },
            // ⛔ Option C is the anchor: a real thing we would deliver, priced
            // well above B so B reads as the sensible middle. `featured` stays
            // on B and never moves here.
            {
              label: "Option C",
              title: "The whole marketing system",
              bullets: [
                "Everything in Option B",
                "Every agent built around Kite's brand and handed over",
                "Workflows redesigned across all three lines of business",
                "Adoption run to a measured target, reported to the board",
              ],
              price: "EUR 14,000 a month",
              note: "Twelve months, plus VAT. Tool subscriptions are Kite's own.",
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
          intro="A few things worth keeping, picked for where you are now. Anything we add later lands here."
          items={[
            {
              label: "How I build an AI writer",
              note: "The long version of the writer section, and what actually goes into one.",
              href: "/essays/how-i-build-an-ai-writer",
              kind: "file",
              meta: "essay",
            },
            {
              label: "AI Fluency for Ambitious Marketers",
              note: "The course, free, for anyone on your team. Module one is live now.",
              href: "/course",
              kind: "link",
              meta: "course",
            },
            {
              label: "Distinctive brands have an incredible opportunity with AI",
              note: "Why holding a brand exactly gets more important as the volume of work goes up.",
              href: "/distinctive",
              kind: "file",
              meta: "essay",
            },
            {
              label: "The Fox Advantage",
              note: "The book, free to download.",
              href: "/book",
              kind: "file",
              meta: "book",
            },
          ]}
        />
      </PPSection>
    </ProspectShell>
  );
}
