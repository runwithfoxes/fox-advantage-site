"use client";

// The page for Donald Douglas, Return2Sender.
// Call 09:00, Tue 11 Aug 2026, video. An hour in Sandymount to follow.
//
// NOT a proposal. No price, no scope, no close. He asked for one thing,
// verbatim at 41:01 on the call: "be great if you could send me a few links
// just so I'm not a dummy for the meeting, and just so I could get started,
// because I'm committed to it and interested." This page is those links.
//
// ⭐ ASSEMBLY: the Fidelity page is the base, taken via the Affirm build.
// Where a section
// exists on both, the FIDELITY copy is used verbatim, because that is the
// one Paul passed line by line on 10 Aug.
//
// ⭐ WHY THESE MODULES. He is launching the computer vision module in the
// Return2Sender platform (12:13 on the call) and has no marketing function:
// "I have a search agency, I have designers, but it's a little bit
// embarrassing in some ways, I don't actually do any marketing. I don't do
// LinkedIn." He will not hire - "I'm not bringing in junior staff with a
// leaky bucket" - and wants the system built once, then a project manager
// to run it. So the page is the production line for a launch:
//   Redesigning workflows -> his "full 360 plan, input, output"
//   AI Writers            -> positioning first; he said the product is
//                            "not that differentiated", so the gate is
//                            the whole point
//   Brand Guardian        -> he read the brand guidelines material the
//                            morning of the call and said so
//   Creative Director     -> the answer to "five grand to produce a
//                            beautiful looking PDF and I don't have the
//                            money for that"
//   Growth Agent          -> holds the outreach window, for "reaching all
//                            the people I know"
//   Lifecycle Agent       -> "get people onto my platform"
//
// ⛔ OUT, deliberately: Designing team AI adoption and Training teams (both
// answer a large organisation deciding role shapes, which was Peter Berry's
// situation, not his). Brief Coach and Ghostwriter (he does not brief
// agencies and does not use LinkedIn). Search and GEO (no audit has been
// run on return2sender.ie, and the menu rule is never to offer that module
// without the real research behind it).
//
// ⛔ Gates this build carries: no invented facts about Return2Sender, no
// unsourced numbers, fictional names only inside demonstrations, every
// class prefixed, nothing hidden behind a scroll reveal. His own reality
// appears nowhere on this page except the opening section.

import ProspectShell, { PPSection } from "./ProspectShell";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { OutreachWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import AdMachine from "./library/AdMachine";
import CardCascade from "./library/CardCascade";
import LibraryList from "./LibraryList";
import { PipelineBoard, JoNote, CampaignWindow } from "./library/GrowthManager";
import "./library/four-things.css";
import "./fidelity-cases.css";

// Outreach demonstration threads. Fidelity's set is a fictional ADVISOR
// world, because that is how their B2B business runs. Return2Sender sells
// promotions to consumer brands and to the agencies that run activations,
// so the world here is shopper, brand and trade marketers. Every company and
// person is invented, and the sender is never Donald.
const OUTREACH_THREADS = [
  {
    name: "Aoife Brennan",
    company: "Shopper Marketing Manager · Ardmore Foods",
    message:
      "Hi Aoife - you have the autumn on-pack running across the cereal range. There is now a way to validate the purchase from a photo of the pack rather than a code, which cuts the drop-off at entry. Worth ten minutes?",
    reply: "Yes - we lose people at the code every time. Send it on.",
  },
  {
    name: "Mark Delaney",
    company: "Brand Manager · Kilbride Beverages",
    message:
      "Hi Mark - saw the summer promotion is back for a third year. If it is the same mechanic again, there is a version that keeps people coming back through the season rather than entering once. Happy to show you?",
    reply: "Third year and the entries are flat. Go on.",
  },
  {
    name: "Sinead Kavanagh",
    company: "Head of Trade Marketing · Corrigan Group",
    message:
      "Hi Sinead - you asked last year whether the entry data could come back in a shape your CRM would take. That is now standard rather than a project. Ten minutes?",
    reply: "That was the blocker last time. Let's talk.",
  },
  {
    name: "Peter Nolan",
    company: "Account Director · Lansdowne Activation",
    message:
      "Hi Peter - for the retail activations you run, the pack recognition and the gamified layer can now be set up in days rather than weeks. Useful for the pitches with short lead times?",
    reply: "The lead times are exactly the problem. Send details.",
  },
  {
    name: "Rachel Moore",
    company: "Category Marketing Lead · Thornbury Retail",
    message:
      "Hi Rachel - a version of the on-pack mechanic sized for own brand rather than the big FMCG budgets is now available. Worth a look before the spring range review?",
    reply: "Own brand is where we need it. Yes please.",
  },
];

// ⭐ PETER'S ORDER, minus the sections that do not apply. Paul's instruction
// 11 Aug was to keep Fidelity's order so he can skip over when presenting,
// so nothing here is resorted; the cut sections are simply absent.
const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "roles", title: "Rethinking the roles" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "buildingagents", title: "Building agents" },
  { id: "growth", title: "Growth Agent" },
  { id: "writer", title: "AI Writers" },
  { id: "guardian", title: "Brand Guardian" },
  { id: "creative", title: "Creative Director" },
  { id: "lifecycle", title: "Lifecycle Agent" },
  { id: "work", title: "The work" },
  { id: "library", title: "Your library" },
];

// ⛔ THE RAIL IS THE FOUR THINGS AND NOTHING ELSE (three cuts on Kite, all
// for busyness). Children under Building agents are only the agents this
// page actually demonstrates.
const RAIL_GROUPS = [
  {
    label: "/what we do",
    entries: [
      { id: "workflows", title: "Redesigning workflows", num: "01" },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "02",
        ids: [
          "buildingagents",
          "growth",
          "writer",
          "guardian",
          "creative",
          "lifecycle",
        ],
        children: [
          { id: "growth", title: "Growth Agent" },
          { id: "writer", title: "Writers" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "creative", title: "Creative Director" },
          { id: "lifecycle", title: "Lifecycle Agent" },
        ],
      },
    ],
  },
];

export default function ReturnToSenderDoc() {
  return (
    <ProspectShell
      clientName="Return2Sender"
      eyebrow="Prepared for Donald Douglas, Return2Sender"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line, same as on Fidelity. */
      title="Set up the marketing system for the launch"
      titleHl="the launch"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      {/* ⚠️ DRAFT COPY, Paul's pass owed. Written from the 11 Aug call
          only. His own situation appears here and nowhere else on the page. */}
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          You asked me to send you a few links before we meet, so you could
          get started. This is them, in one place.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          You have the computer vision side of the platform coming, you want
          the marketing system for it set up rather than staffed, and you
          said you would put a project manager on it once it exists. This
          page shows the kinds of things we build, working, so you can see
          them rather than read about them.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Everything here is our own work or a demonstration we made. None of
          it is about Return2Sender, and none of it assumes anything about
          how you run. That is what the hour in Sandymount is for.
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
          {/* Essays picked for Donald: the Swiss Army knife post is how he
              found Paul in the first place ("I was intrigued, one of the
              reasons I got onto you was your post about Swiss Army knives"),
              and the writer piece answers the positioning gate. */}
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









      {/* Paul's own copy, verbatim from the Fidelity page. This is the
          spine of the page for Donald: it is the nearest thing we have to
          his own words, "can you write almost a full 360 plan, input,
          output, brand guidelines, and set up an agent-driven system". */}
      <PPSection id="workflows" k="05" title="Redesigning workflows">
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



      {/* AGENTS COME EARLY ON THIS PAGE. On Fidelity they sit later. What
          he asked for is a system he does not have to staff, so this is the
          section he came for. Within the group, the Growth Agent leads
          because it carries the outreach window, then Writers, because the
          positioning gate is the answer to a product he himself called "not
          that differentiated". */}
      <PPSection id="buildingagents" k="06" title="Building agents">
        <></>
      </PPSection>



      {/* GROWTH AGENT. Here because it holds the outreach window, which is
          the answer to "reaching all the people I know". The outreach world
          is rebuilt for him: shopper and trade marketers at consumer brands
          and activation agencies, the people who buy promotions. Every firm
          and person invented. */}
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
          running; a Return2Sender version would be built to your world and your
          rules, and nothing in it sends until someone on your team says go.
        </p>
      </PPSection>



      {/* AI WRITERS. Verbatim from the Fidelity page, including Paul's own
          slop copy. The demonstration stays Kite's renewal email: it is the
          worked example the writer piece was built on, and swapping it for a
          promotions email would mean inventing Return2Sender's voice, which is
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
          ⛔ THE CHECK COUNT CAME OUT, 11 Aug, and does not go back. This
          page said ten, Fidelity said nine, and the verdict strip says
          "4 of 4 applicable". The count depends on the asset type, per
          docs/brand-guardian-methodology.md. No named source for either
          number. */}
      <PPSection id="guardian" sub title="Brand Guardian">
        <BrandGuardian />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          One of our most recent products is a Brand Guardian. In seconds,
          it checks whether new work is on or off-brand, looking at hex
          colours, pixels, copy and photography, and measuring against your
          brand book rather than judging by eye. It&rsquo;s probably our
          most complex agent, and still in beta, but I&rsquo;m very proud
          of it.
        </p>
      </PPSection>



      {/* CREATIVE DIRECTOR. On the page at Paul's instruction, 11 Aug. One
          approved master ad spawns the size set. Also Sabre's real work. */}
      <PPSection id="creative" sub title="Creative Director">
        <CreativeDirector />
        {/* The Kite page's version of the same agent, kept because it shows
            a different half of the job: Peter's exhibit is the work Sabre
            made, this one is one approved master ad spawning the whole size
            set. That is the half that speaks to sixty artworks per change.
            Copy from the Kite page, Paul has NOT passed it. */}
        <div style={{ marginTop: 34 }}>
          <AdMachine />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The same discipline, pointed at advertising. The team approves one
          master ad; the machine makes every other size, holding the brand
          exactly. Press run.
        </p>
      </PPSection>





      {/* LIFECYCLE AGENT. Copy from the Kite page, Paul has NOT passed it.
          In for one reason: "I need to automate my workflows to get people
          onto my platform ultimately", which is onboarding and activation,
          and he named the outputs himself, "nudges and emails and prompts". */}
      <PPSection id="lifecycle" sub title="Lifecycle Agent">
        <CardCascade
          id="pplc"
          top={{ name: "Lifecycle", lbl: "every moment", icon: "mail" }}
          kids={[
            { name: "Onboard", lbl: "new signup", icon: "person" },
            { name: "Nudge", lbl: "no order yet", icon: "mail" },
            { name: "Win back", lbl: "gone quiet", icon: "loop" },
            { name: "Grow", lbl: "ready to buy", icon: "chart" },
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


      {/* THE WORK. Verbatim from the Fidelity page, where Paul agreed it
          line by line. Moloco is the lead case here rather than Miro:
          "they wanted to hire a copywriter, I built copywriters instead" is
          the exact decision in front of him. */}
      <PPSection id="work" k="07" title="The work">
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

      {/* YOUR LIBRARY. From the Kite page's pattern, picked for him. This
          section IS the "few links" he asked for, so it carries the weight.
          ⚠️ DRAFT COPY, Paul's pass owed. */}
      <PPSection id="library" k="08" title="Your library">
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
              note: "Why holding a brand exactly matters more, not less, once the volume of work goes up.",
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

      {/* NO PRICE AND NO CLOSE SECTION by design. Paul, 19 Aug: "not a hard
          sell one, more like a peter berry one." No number was discussed on
          the call, and the only money signal was negative - "they're just
          going to charge me five grand to produce a beautiful looking PDF
          and I really don't have the money for that." Kite's pricing block
          is deliberately left off. */}
    </ProspectShell>
  );
}
