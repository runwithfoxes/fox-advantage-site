"use client";

// Siobhan Smith, Expleo. Built 24 Aug 2026 from KiteDoc.tsx, the v1 template.
//
// THE ASK: Siobhan, 18 Aug 2026 - "if you'd like to propose an approach to how
// we might tackle these challenges, please send it our way with the associated
// costs." So this is a proposal, not a capabilities page: it carries the
// recommendation, the three-option price and the library.
//
// ⛔⛔ CONFIDENTIALITY. Siobhan, same mail: "We ask that you kind not share any
// of this information." NOTHING OF EXPLEO'S GOES ON THIS PAGE. Not their
// guidelines, not the nine bad examples, not our reproduction of their fact
// sheet, not their logo, not their colours. The proof material built on 23 Aug
// (~/projects/clients/expleo/review/index.html) is SCREEN-SHARE ONLY and must
// never be linked from here. Every demonstration below is our own work for
// other clients, which is what golden rule two requires anyway.
//
// WHAT PAUL IS SELLING (his brief, 24 Aug): one AI designer agent,
// ⭐ NOT "junior". Paul cut the word on 24 Aug: "it probably just devalues
// everything." Do not reintroduce it anywhere.
// narrow to infographics and one-page PDFs for sales colleagues. First hire in
// an AI creative team their own designer manages. Later hires cover email,
// advertising, social and the website. Runs on Claude Managed Agents so nobody
// at Expleo needs a Claude licence.
//
// ⚠️ PRICES. A and B are Paul's own numbers, named 24 Aug 2026: A is €3,500
// plus €99 a month, B is €15,000 plus €199 a month. C IS DELIBERATELY UNPRICED
// - he has not named it and it must not ship as a guess.
// ⭐ Each card foots a total to the three-month review, because Paul asked that
// she not have to add a setup fee and a monthly together herself.
//
// ⛔ Gates: no unsourced numbers, nothing of Expleo's, no security claim beyond
// what Sam confirmed against Anthropic primary sources on 24 Aug (draft at
// intelligence/jo-knowledge/research-drafts/claude-managed-agents-security.md).
// In particular: NO claim of EU data residency and NO claim of zero data
// retention. Neither is true of this product.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import LibraryList from "./LibraryList";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow } from "./library/AgentWindows";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import "./library/four-things.css";
import "./fidelity-cases.css";

// ⭐ Fidelity's order, minus the adoption grid and the Growth Agent, plus one
// new per-client section (08, the AI designer) and the three that make it a
// proposal.
//
// Why the adoption grid is out: it draws a 140-block programme across four
// quarters, which points at a far bigger engagement than the thing we want a
// first yes on. Why the Growth Agent is out: outbound is not their problem, and
// its pipeline board carries Fidelity's hardcoded advisor firms.
const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "roles", title: "Rethinking the roles" },
  { id: "training", title: "Training teams" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "buildingagents", title: "Building agents" },
  { id: "creative", title: "Creative Director" },
  { id: "guardian", title: "Brand Guardian" },
  { id: "writer", title: "AI Writers" },
  { id: "designer", title: "My recommendation: The AI designer" },
  { id: "designer-use", title: "How your colleagues would use it" },
  { id: "designer-weeks", title: "The first three weeks" },
  { id: "designer-infra", title: "Nobody needs a Claude licence" },
  { id: "designer-team", title: "The team it becomes" },
  { id: "recommend", title: "What we’d recommend" },
  { id: "pricing", title: "The price" },
  { id: "work", title: "Case studies" },
  { id: "library", title: "Your library" },
];

// ⛔ THE RAIL MUST RUN IN THE SAME ORDER AS THE PAGE.
const RAIL_GROUPS = [
  {
    label: "/what we do",
    entries: [
      { id: "training", title: "Training teams", num: "01" },
      { id: "workflows", title: "Redesigning workflows", num: "02" },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "03",
        ids: ["buildingagents", "creative", "guardian", "writer"],
        children: [
          { id: "creative", title: "Creative Director" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "writer", title: "Writers" },
        ],
      },
      {
        id: "designer",
        title: "The AI designer",
        num: "04",
        ids: [
          "designer",
          "designer-use",
          "designer-weeks",
          "designer-infra",
          "designer-team",
        ],
        children: [
          { id: "designer-use", title: "How colleagues use it" },
          { id: "designer-weeks", title: "The first three weeks" },
          { id: "designer-infra", title: "No Claude licence needed" },
          { id: "designer-team", title: "The team it becomes" },
        ],
      },
    ],
  },
  {
    label: "/also",
    compact: true,
    entries: [
      { id: "pricing", title: "Pricing" },
      { id: "work", title: "Case studies" },
    ],
  },
];

export default function ExpleoDoc() {
  return (
    <ProspectShell
      clientName="Expleo"
      eyebrow="Prepared for Siobhán Smith, Expleo"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line, same as on every other
         real build. */
      title="Hire Expleo’s first AI designer"
      titleHl="AI designer"
      /* ⛔ NO STANDFIRST. The opening section does the introducing. */
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      {/* WHAT THIS IS. Per client, and the ONLY place Expleo's own situation
          appears anywhere on this page. */}
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          You asked for an approach to the problem you described, with the
          costs. This page is that. It covers what we would build, how your
          colleagues would use it, what the first three weeks involve, and
          what it costs.
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
          {/* Essays picked for this reader: the two that speak to holding a
              brand exactly while volume goes up. */}
          <div className="pps-hiw-links">
            <div>
              <p className="pps-hiw-cli-k">Essays</p>
              <ul className="pps-hiw-ll">
                {[
                  [
                    "distinctive-brand-assets-in-an-ai-world",
                    "Distinctive Brand Assets in an AI world",
                  ],
                  [
                    "the-future-marketer-is-a-swiss-army-knife",
                    "The future marketer is a Swiss Army knife",
                  ],
                  ["how-i-build-an-ai-writer", "How I build an AI writer"],
                  ["a-robot-called-jo", "A robot called Jo"],
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
          ⛔ START WITH THE WORK, NOT THE TEAM (Paul, 10 Aug). */}
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

      <PPSection id="workflows" k="06" title="Redesigning workflows">
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

      <PPSection id="buildingagents" k="07" title="Building agents">
        <></>
      </PPSection>

      {/* CREATIVE DIRECTOR FIRST for Expleo, because it is the closest thing
          in the estate to what they would be buying: real assets assembled
          into real work, on a real brand, at size. */}
      <PPSection id="creative" sub title="Creative Director">
        <CreativeDirector />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          This is Sabre&rsquo;s work. Their agency made the ad on one side.
          Our machine rebuilt it on the other, then produced the full set of
          sizes and the video from the same assets. Nothing in it was drawn
          by an image model. The logo is their logo file, the typeface is
          their licensed typeface, and the colours are the values in their
          brand book. That is the same machinery a designer for Expleo
          would run on.
        </p>
      </PPSection>

      <PPSection id="guardian" sub title="Brand Guardian">
        <BrandGuardian />
        {/* ⛔ NO CHECK COUNT IN THIS COPY, and do not put one back. The count
            is not fixed: the guardian works out which type an asset is and
            checks it against that type's pattern, so the gates that run
            depend on the file. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          One of our most recent products is a Brand Guardian. In seconds,
          it checks whether new work is on or off-brand, looking at hex
          colours, pixels, copy and photography, and measuring against your
          brand book rather than judging by eye. It&rsquo;s probably our
          most complex agent, and still in beta, but I&rsquo;m very proud
          of it.
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
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          That knowledge is a small folder of documents, and we do not have
          Expleo&rsquo;s yet. A writer is one of the later hires described
          below rather than part of what we are proposing now, and it is
          worth saying plainly that the designer we would build first is not
          a writer. It knows your copy rules and applies them to the words a
          colleague gives it. It does not write your messaging.
        </p>
      </PPSection>

      {/* ⭐ THE OFFER. Per client. This is the section Siobhan actually asked
          for, and the only place the AI designer's scope is defined.
          Written from Paul's brief on 24 Aug 2026. */}
      <PPSection id="designer" k="08" title="My recommendation: The AI designer">
        <p className="pps-standfirst">
          We would build one agent, and we would keep it narrow on purpose.
          It makes infographics and one-page PDFs for sales colleagues. If
          it is asked for something outside that, it stops and asks a person
          rather than improvising. We build them that way deliberately, so
          that a request nobody anticipated produces a question instead of
          poor work that goes out at volume.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          It holds your brand guidelines and your real assets: the logo
          files, the typeface, the colour values, the graphic devices, the
          icon set and your image bank. It places those files into a layout
          rather than generating anything that resembles them. It also
          applies your copy guidelines, though as above it is not a
          copywriter and will not write your messaging.
        </p>

      </PPSection>

      <PPSection id="designer-use" sub title="How your colleagues would use it">
        <p className="pps-standfirst">
          Through a dedicated section of our website that we build for
          Expleo. A colleague describes what they need in ordinary language.
          We turn that into a proper brief behind the scenes, so nobody has
          to learn how to prompt. The agent makes the piece, a check runs
          over it, and then they see it. Your designer can see everything
          that has been made.
        </p>
      </PPSection>

      <PPSection id="designer-weeks" sub title="The first three weeks">
        <p className="pps-standfirst">
          Most of that time is not building, it is testing. We calibrate the
          agent on your guidelines, then you and your designer push real
          briefs through it, we fix what comes back wrong, and we repeat
          until you are happy to put it in front of colleagues. You sign it
          off before anyone else sees it. That back and forth is most of
          the three weeks, and it is the part that decides whether the
          output is good enough to stand over.
        </p>
      </PPSection>

      <PPSection id="designer-infra" sub title="Nobody needs a Claude licence">
        <p className="pps-standfirst">
          The agent runs on Claude Managed Agents, which is Anthropic&rsquo;s
          own hosted service. Your colleagues reach it through our page, so
          there is no software to install and no per-person licence to buy.
          That means Expleo can try this properly without a licensing
          decision having to come first. Anthropic does not use data sent
          through its commercial API to train its models, and that is a
          contractual commitment rather than a setting we switch on.
          Anthropic holds SOC 2 Type I and Type II, ISO 27001:2022 and ISO
          42001:2023, and each session runs in an isolated container. Nick
          can pull the certifications and the current sub-processor list
          himself at{" "}
          <a
            href="https://trust.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pps-copy-link"
          >
            trust.anthropic.com
          </a>
          , and we are happy to answer anything else his team asks.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          If Expleo later buys Claude licences of its own, we can move the
          whole thing across and train your people to run and extend it
          themselves.
        </p>
      </PPSection>

      <PPSection id="designer-team" sub title="The team it becomes">
        <p className="pps-standfirst">
          The designer would be the first of several. Later ones would
          cover advertising, which is the Creative Director shown above,
          and email, social and the website, and your
          designer manages them the way she would manage people: setting the
          standard, reviewing the work, deciding what each one is allowed to
          do. That is why the second option below is sized as a team rather
          than as a bigger tool.
        </p>
      </PPSection>

      {/* ⭐ THE THREE SECTIONS A PROPOSAL ADDS.
          ⚠️ The recommendation is Option A, deliberately, and `featured` sits
          on A rather than B. Paul's instruction, 24 Aug: she should test the
          designer before buying more, and the team options are there
          so she can see the shape and cost it now. */}
      <PPSection id="recommend" k="09" title="What we’d recommend">
        <p className="pps-standfirst">
          Option A. Hire the one designer, work it through the three weeks
          with us, and put it in front of a small group of sales colleagues
          before deciding anything else. Within a month you will know
          whether the work it produces is good enough to stand over. That is
          the question worth answering first, and neither of us can answer
          it from a document.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Option B is costed here so you can see what a small team looks
          like and take a number to a budget conversation without waiting for
          us. We would still suggest starting with the one and seeing how
          your colleagues actually use it.
        </p>
      </PPSection>

      <PPSection id="pricing" k="10" title="The price">
        <PricingCards
          cards={[
            {
              label: "Option A",
              title: "The AI designer",
              bullets: [
                "One agent, calibrated to your brand guidelines and your real assets",
                "Infographics and one-page PDFs for sales colleagues",
                "A dedicated section of our site for your colleagues to work in",
                "Three weeks of building and testing, with you and your designer",
              ],
              price: "€3,500 plus VAT",
              note: "Then €99 a month, reviewed together after three months. Normally €8,000.",
              total: {
                label: "First three months, to the review",
                value: "€3,797 plus VAT",
              },
              featured: true,
            },
            {
              label: "Option B",
              title: "Three agents",
              bullets: [
                "The AI designer, plus two more of your choosing",
                "Creative Director for advertising, shown above, or agents for email, social or the website",
                "All calibrated to the same guidelines and the same assets",
                "We build them, run them and keep them working",
              ],
              price: "€15,000 plus VAT",
              note: "Then €199 a month, reviewed together after three months.",
              total: {
                label: "First three months, to the review",
                value: "€15,597 plus VAT",
              },
            },
            // ⭐ OPTION C IS PARKED, NOT DELETED. Paul, 24 Aug: "let's leave it
            // just for option A and B for the moment." It was the whole team
            // with training and handover so their own designer owns it, and it
            // was the one card still carrying no price. Restore it here when he
            // names a number. Two open notes travel with it: the "shared brand
            // layer" bullet needs rewriting in his words ("one set of brand
            // documents and assets that all five read from, so a change lands
            // everywhere at once"), and the recommendation copy below has to
            // mention it again.
            //
            // {
            //   label: "Option C",
            //   title: "The team, and you own it",
            //   bullets: [
            //     "All five agents: the designer, email, advertising, social and the website",
            //     "One set of brand documents and assets that all five read from, so a change lands everywhere at once",
            //     "Training, so your designer can change what each one does",
            //     "Handover, so the team keeps working whether or not we are involved",
            //   ],
            //   price: "Price to confirm",
            // },
          ]}
        />
        <CoversGrid
          covers={[
            "All build and calibration work",
            "The testing weeks with you and your designer",
            "The hosted infrastructure the agents run on",
            "A named point of contact, Paul",
          ]}
          notCovered={[
            "Claude licences, which are not needed for this",
            "Stock imagery or photography",
            "Media spend",
          ]}
        />
        <CloseBox clientName="Expleo" />
      </PPSection>

      {/* CASE STUDIES. Miro, Moloco, Sabre. Copy verbatim from the Fidelity
          page, where Paul agreed it line by line. Every number is real.
          ⭐ SITS AFTER THE PRICE on this page, not before it. Paul, 24 Aug:
          the price comes first, then the proof. Every other build has it the
          other way round, so do not "correct" it back. */}
      <PPSection id="work" k="11" title="Case studies">
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

      <PPSection id="library" k="12" title="Your library">
        <LibraryList
          intro="A few things worth keeping, picked for where you are now. Anything we add later lands here."
          items={[
            {
              label: "Distinctive brands have an incredible opportunity with AI",
              note: "Why holding a brand exactly matters more, not less, once the volume of work goes up.",
              href: "/distinctive",
              kind: "file",
              meta: "essay",
            },
            {
              label: "How I build an AI writer",
              note: "The long version of what actually goes into an agent, and why the folder of documents is the product.",
              href: "/essays/how-i-build-an-ai-writer",
              kind: "file",
              meta: "essay",
            },
            {
              label: "AI Fluency for Ambitious Marketers",
              note: "The course, free, for anyone at Expleo. Module one is live now.",
              href: "/course",
              kind: "link",
              meta: "course",
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
