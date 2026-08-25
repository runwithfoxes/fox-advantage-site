"use client";

// Tony McGuinness and Eamon Galavan, Ace Express Freight. Built 25 Aug 2026
// from ExpleoDoc.tsx, which is the Kite v1 template with the commercial end
// attached.
//
// THE CALL: Tue 25 Aug 2026, 11:30. They came off the Newstalk radio ads.
// Tony runs the sales office, the team and marketing; Eamon is a director of
// nearly twenty years. Their CEO has told them marketing has gone backwards
// and wants a plan, and separately wants the company to get serious about AI.
//
// ⛔⛔ THE SCOPE IS NARROW AND THEY SET IT, NOT US. Tony, on the call: "purely
// focus on LinkedIn for a moment. We want to go way deeper with this but I
// don't want to talk about the stars when we're standing on the ground." Paul
// talked radio, Google Ads and the US air and sea lane on the call and was
// pulled back twice. The page shows the whole estate and prices ONE thing.
//
// ⛔ ONE PRICED OPTION. Paul, 25 Aug: "leave off any option b". Do not add an
// anchor card to make a middle option look sensible; there is no middle.
//
// ⭐ WHAT PAUL IS SELLING (his brief, 25 Aug): one agent that writes LinkedIn
// posts for three profiles, Tony, Eamon and Philip. It does the research, the
// content ideas and the writing. Their people pick and paste. Two weeks of
// build, two sessions with them to get their knowledge into it. Then either
// Paul runs it on Managed Agents for EUR 99 a month, or he hands it over and
// they run it in their own Claude. Three months, then they decide.
//
// ⛔ RADIO AND GOOGLE ADS ARE DELIBERATELY OFF THE PAGE. Their new business is
// running at roughly 22 accounts a month with no marketing at all, so a radio
// test could not be told apart from normal variance, and Paul told them on the
// call that no human should be running Google Ads full time. Selling either
// now would contradict him.
//
// ⛔ NO GEO AUDIT. Paul, 25 Aug: "forget geo for now." The section is out
// entirely rather than filled with anything unmeasured.
//
// ⛔ RULE ZERO, AND IT WAS ENFORCED HARD ON THIS ONE. Paul rejected three
// drafts of the opening for clever writing. The shapes he cut, all mine: "the
// question you brought is a fair one", "the role you didn't replace is the one
// worth looking at first", "the work went with them, because the work was the
// person". No aphorisms, no not-X-but-Y, no three-part rhythm, no one-line
// paragraphs dropped for effect. Complete sentences that explain the work.
//
// ⛔ DO NOT WRITE THEIR OWN SITUATION BACK AT THEM. It appears in section 01
// and nowhere else, which is golden rule two. Three separate drafts put their
// history into sections 04, 08 and 09 and all three came back.
//
// ⛔ NO MINUTES FIGURE ANYWHERE. Paul cut it on 25 Aug. The call contained
// both "20 minutes a month" and a weekly reading of the same thing, and
// neither is ours to promise.
//
// ⚠️ PRICES ARE PAUL'S, named 25 Aug 2026: EUR 3,500 for the build, then
// EUR 99 a month, three months to the review, footed at EUR 3,797.
//
// ⛔ Gates: no unsourced numbers, every demonstration is our own work and
// labelled illustrative, and no security claim beyond what Sam confirmed
// against Anthropic primary sources on 24 Aug (draft at
// intelligence/jo-knowledge/research-drafts/claude-managed-agents-security.md).
// In particular: NO claim of EU data residency and NO claim of zero data
// retention. Neither is true of Managed Agents.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import LibraryList from "./LibraryList";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow, OutreachWindow } from "./library/AgentWindows";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import CardCascade from "./library/CardCascade";
import "./library/four-things.css";
import "./fidelity-cases.css";

// Outreach demonstration threads. Their world is freight and logistics, so the
// people here are transport, operations and procurement, which is the list of
// roles Tony gave on the call. Every firm and person is invented, and the
// sender is a fictional member of their own team, never the person written to.
const OUTREACH_THREADS = [
  {
    name: "Gerard Naughton",
    company: "Transport Manager · Ardmore Foods",
    message:
      "Hi Gerard - saw you opened the second Midlands depot. If the pallet runs to Europe are getting awkward, we do groupage out of Dublin twice a week. Worth ten minutes?",
    reply: "Timing is decent. Send me something to look at.",
  },
  {
    name: "Fiona Halligan",
    company: "Procurement Lead · Calder Engineering",
    message:
      "Hi Fiona - customs paperwork is the thing most people are chasing this quarter. Ours is done in house rather than farmed out. Happy to walk you through how it works.",
    reply: "That is the bit that keeps going wrong. Thursday?",
  },
  {
    name: "Martin Kehoe",
    company: "Operations Director · Sherwood Components",
    message:
      "Hi Martin - you mentioned lead times slipping on the UK leg. We run our own road freight both ways rather than handing off at the port. Quick call?",
    reply: "Go on. Early next week suits.",
  },
  {
    name: "Aoife Traynor",
    company: "Supply Chain Manager · Blackrock Medical",
    message:
      "Hi Aoife - air and sea out of Dublin on one booking, with the storage at this end. That was the gap last time we spoke.",
    reply: "It was. Send me a time and I will get Declan on too.",
  },
  {
    name: "Peter Muldowney",
    company: "Project Manager · Lansdowne Utilities",
    message:
      "Hi Peter - project freight is its own thing and most forwarders quote it like it is not. We can price the whole job rather than the leg. Interested?",
    reply: "Yes. We have two coming up.",
  },
];

// ⭐ Fidelity's order, minus the adoption grid, with three agents shown and
// one new per-client section (08, the AI writer) plus the two that make it a
// proposal.
//
// Why the adoption grid is out: it draws a 140-block programme across four
// quarters, which points at a far bigger engagement than the one we want a
// first yes on.
// Why the Growth Agent is out: its PipelineBoard carries Fidelity's hardcoded
// advisor firm names, which read as wrong beside a freight business.
const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "roles", title: "Rethinking the roles" },
  { id: "training", title: "Training teams" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "buildingagents", title: "Building agents" },
  { id: "outbound", title: "Outbound Agent" },
  { id: "lifecycle", title: "Lifecycle Agent" },
  { id: "writer", title: "AI Writers" },
  { id: "writeragent", title: "My recommendation: The AI writer" },
  { id: "writeragent-use", title: "How you would use it" },
  { id: "writeragent-weeks", title: "The first two weeks" },
  { id: "writeragent-infra", title: "Nobody needs a Claude licence" },
  { id: "writeragent-after", title: "What we would build after it" },
  { id: "recommend", title: "What we’d recommend" },
  { id: "pricing", title: "The price" },
  { id: "work", title: "Case studies" },
  { id: "library", title: "Your library" },
];

// ⛔ THE RAIL MUST RUN IN THE SAME ORDER AS THE PAGE. A rail that disagrees
// with the page reads as a broken link, not as a different order.
// ⛔ The "what we do" group is the four things and nothing else. It has been
// cut three times for busyness. Pricing and case studies stay in the separate
// compact group so they cannot creep into it.
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
        ids: ["buildingagents", "outbound", "lifecycle", "writer"],
        children: [
          { id: "outbound", title: "Outbound Agent" },
          { id: "lifecycle", title: "Lifecycle Agent" },
          { id: "writer", title: "Writers" },
        ],
      },
      {
        id: "writeragent",
        title: "The AI writer",
        num: "04",
        ids: [
          "writeragent",
          "writeragent-use",
          "writeragent-weeks",
          "writeragent-infra",
          "writeragent-after",
        ],
        children: [
          { id: "writeragent-use", title: "How you would use it" },
          { id: "writeragent-weeks", title: "The first two weeks" },
          { id: "writeragent-infra", title: "No Claude licence needed" },
          { id: "writeragent-after", title: "What comes after it" },
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

export default function AceExpressDoc() {
  return (
    <ProspectShell
      clientName="Ace Express"
      eyebrow="Prepared for Tony McGuinness and Eamon Galavan, Ace Express Freight"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line, same as on every other
         real build. */
      title="Build Ace Express’s first AI writer"
      titleHl="AI writer"
      /* ⛔ NO STANDFIRST. The opening section does the introducing. */
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      {/* WHAT THIS IS. Per client, and the ONLY place Ace Express's own
          situation appears anywhere on this page. Paul's own words for the
          shape of it, 25 Aug: "it was good chatting to you. Below is a bunch
          of things that I do, but I'm just recommending the Ghostwriter as a
          narrow use case." */}
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          Good chatting to you both on Tuesday. Below is a list of the things
          I build. You would likely get use out of a lot of them in time, but
          you said you wanted to start narrow and see something working
          first. So I am recommending one thing to begin with, the LinkedIn
          writer, and it is in section eight.
        </p>
      </PPSection>
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
      {/* THE AGENTS SHOWN. Outbound and Lifecycle are the two Paul named as
          what comes next for them, shown here unpriced. AI Writers sits last
          because its copy is the argument for the build being recommended in
          section 08. All three carry Paul's own words from the Fidelity and
          Kite pages. */}
      <PPSection id="outbound" sub title="Outbound Agent">
        <OutreachWindow
          threads={OUTREACH_THREADS}
          title="Outreach"
          sentLabel="84 sent"
          width={720}
        />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The Outbound Agent finds the right companies and the right people
          inside them, researches each one, writes a message that is
          genuinely about that company rather than a template with a name
          dropped into it, sends it, and reports back on what is working. It
          runs the whole sequence, on email or LinkedIn or both, and nothing
          goes out until someone on your team says go.
        </p>
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> Every firm and
          person in that window is invented. The machinery is real and
          running.
        </p>
      </PPSection>

      <PPSection id="lifecycle" sub title="Lifecycle Agent">
        <CardCascade
          id="pplc"
          top={{ name: "Lifecycle", lbl: "every moment", icon: "mail" }}
          kids={[
            { name: "Onboard", lbl: "new customer", icon: "person" },
            { name: "Nudge", lbl: "no order yet", icon: "mail" },
            { name: "Win back", lbl: "gone quiet", icon: "loop" },
            { name: "Grow", lbl: "ready for more", icon: "chart" },
          ]}
          ariaLabel="The Lifecycle Agent card with four moments falling out of it: onboard, nudge, win back, grow"
        />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Lifecycle email is the work of keeping and growing the people who
          already know you. Onboarding a new customer, nudging someone who
          has not ordered yet, winning back one who has gone quiet, growing
          the ones ready for more. It is where a lot of revenue comes from,
          and it usually gets skipped because it never stops. The Lifecycle
          Agent runs it.
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
      </PPSection>
      {/* ⭐ THE OFFER. Per client. The only place the writer's scope is
          defined. Written from Paul's brief on 25 Aug 2026 and agreed with
          him line by line in chat before this file was touched.
          ⛔ NEVER WRITE WHAT IT IS NOT (Paul, 24 Aug). No caveat saying it
          does not do their strategy, or their messaging, or their ads.
          ⛔ NEVER "HIRE" AS THE VERB. We build this.
          ⛔ NO MINUTES-PER-WEEK OR MINUTES-PER-MONTH FIGURE. Paul cut it on
          25 Aug: the call had two different numbers in it and neither is
          ours to promise. */}
      <PPSection id="writeragent" k="08" title="My recommendation: The AI writer">
        <p className="pps-standfirst">
          We would build one agent that writes LinkedIn posts for Tony,
          Eamon and Philip. It researches topics, comes up with the ideas,
          and writes the posts. You read what it has written, choose the
          ones you want to use, and paste them into LinkedIn from your own
          profiles.
        </p>
      </PPSection>

      <PPSection id="writeragent-use" sub title="How you would use it">
        <p className="pps-standfirst">
          Once a month you would get a month&rsquo;s worth of posts in one
          go. You pick the ones you like and post them.
        </p>
      </PPSection>

      <PPSection id="writeragent-weeks" sub title="The first two weeks">
        <p className="pps-standfirst">
          There are two sessions with you and then two weeks of building. We
          are building a writer that sounds like you, so the sessions are
          where we get what is in your heads. We would ask what you sell,
          who buys it, why customers pick you over another forwarder, and
          what a good post sounds like coming from a director. We write that
          up as your positioning and messaging.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The two weeks are where we build the agent and test it. We run
          real topics through it, fix what comes back wrong, and repeat
          until you are happy with the writing. You sign it off before
          anything is published.
        </p>
      </PPSection>

      <PPSection id="writeragent-infra" sub title="Nobody needs a Claude licence">
        <p className="pps-standfirst">
          The agent runs on Claude Managed Agents, which is Anthropic&rsquo;s
          own hosted service. You reach it through our page, so there is no
          software to install and no per-person licence to buy.
          Anthropic does not use data sent through its commercial API to
          train its models, and that is a contractual commitment rather than
          a setting we switch on. Anthropic holds SOC 2 Type I and Type II,
          ISO 27001:2022 and ISO 42001:2023, and each session runs in an
          isolated container.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          If you would rather run it in your own Claude account, we can move
          the whole thing across and show you how to run and extend it
          yourselves.
        </p>
      </PPSection>

      <PPSection id="writeragent-after" sub title="What we would build after it">
        <p className="pps-standfirst">
          The positioning and messaging we write in those two weeks is what
          every other agent would run on. If you later wanted email to your
          existing customers, or prospect research for the sales team, that
          groundwork would already be done and the next build starts from
          it rather than from a blank page.
        </p>
      </PPSection>
      {/* ⭐ THE TWO SECTIONS THAT MAKE THIS A PROPOSAL.
          ⛔ ONE PRICED OPTION ONLY. Paul's instruction, 25 Aug 2026: "leave
          off any option b". Tony closed the scope himself twice on the call
          ("I don't want to talk about the stars when we're standing on the
          ground"), so a second priced tier re-opens the conversation he just
          ended. The rest of the estate is shown above, unpriced, as what
          comes later. Do not add an anchor card here without asking him. */}
      <PPSection id="recommend" k="09" title="What we’d recommend">
        <p className="pps-standfirst">
          We would start with the writer. It is the smallest piece of work
          that gives you something useful, and it is what you asked for on
          the call. You would see posts going out from your own profiles
          within about a month of it going live.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Three months is long enough for you to judge whether it is worth
          continuing. At that point you either carry on with us running it,
          or you take it in-house and run it yourselves. We will hand it
          over whenever you want it.
        </p>
      </PPSection>

      <PPSection id="pricing" k="10" title="The price">
        <PricingCards
          cards={[
            {
              label: "The AI writer",
              title: "LinkedIn posts, written for you",
              bullets: [
                "One agent, calibrated to your positioning, messaging and tone of voice",
                "Two sessions with you, to get what is in your heads",
                "Research, ideas and finished posts for three profiles",
                "A month of posts at a time, for you to read and choose from",
              ],
              price: "€3,500 plus VAT",
              note: "Then €99 a month, reviewed together after three months.",
              total: {
                label: "First three months, to the review",
                value: "€3,797 plus VAT",
              },
              featured: true,
            },
          ]}
        />
        <CoversGrid
          covers={[
            "All build and calibration work",
            "The two sessions with you",
            "Running the agent for three months",
            "A named point of contact, Paul",
          ]}
          notCovered={[
            "Any tool subscriptions on your side",
            "LinkedIn advertising or any media spend",
          ]}
        />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          If you would rather run it yourselves at any point, we will hand it
          over. You would run it in your own Claude account and the monthly
          stops.
        </p>
        <CloseBox clientName="Ace Express" />
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
              note: "The course, free, for anyone at Ace Express. Module one is live now.",
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
