"use client";

// The page for James Sullivan and Chris Kenny, Great National Hotels & Resorts.
// Met 6 Aug 2026, 09:45. Built 26 Aug on Paul's instruction, replacing the
// priced 6 Aug page (EUR 7,500 Creative and Content Agent) which was never
// sent and stays in paul-hub as the copy record.
//
// NOT a proposal. No price anywhere. Paul, 26 Aug: show the range of things
// we can do in the new format, and offer an hour with Chris on the content
// and creative workflow in more detail, to see if we can help. The close
// section carries that offer and nothing else.
//
// ⭐ ASSEMBLY: the Return2Sender page is the base, which carries the Fidelity
// copy Paul passed line by line on 10 Aug. Fixed sections are verbatim.
//
// ⭐ WHY THESE MODULES. James asked for a road map and said twice they will
// not add headcount ("they're all centrally charged out"). Chris asked for a
// brand folder per property driving content, written and images both, and
// his word for the problem was inconsistency. So:
//   Redesigning workflows -> the spine, how the production line changes
//   AI Writers            -> the writing half of Chris's ask
//   Creative Director     -> the artwork half: master ad to size set
//   Brand Guardian        -> the machine pointed at "inconsistency"
//   Lifecycle Agent       -> guest email, the direct route around OTA
//                            commission, on their own road map
//   GEO audit             -> real research on greatnationalhotels.com,
//                            run 6 Aug, with the Revanista finding
//
// ⛔ OUT, deliberately: Growth Agent and outbound (B2C hotel group, no
// outbound lane). Adoption and Training (a large organisation deciding role
// shapes was Peter Berry's situation, not theirs). The website: Paul raised
// it 26 Aug and they are talking to their own digital agency, so it appears
// nowhere, not even on a road map line. The reporting view stays unpriced
// and unpromised because data access is unscoped (booking engine is SHR's).
//
// ⛔ Gates this build carries: no invented facts about Great National, no
// unsourced numbers, fictional names only inside demonstrations, every
// class prefixed, nothing hidden behind a scroll reveal. Their own reality
// appears nowhere on this page except the opening section and the audit,
// which is real measured research.

import ProspectShell, { PPSection } from "./ProspectShell";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import AdMachine from "./library/AdMachine";
import CardCascade from "./library/CardCascade";
import GreatNationalGeoAudit from "./library/GreatNationalGeoAudit";
import LibraryList from "./LibraryList";
import "./library/four-things.css";
import "./fidelity-cases.css";

// Fidelity's order, minus the sections that do not apply, plus the audit and
// the next-step close. Nothing resorted.
const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "roles", title: "Rethinking the roles" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "buildingagents", title: "Building agents" },
  { id: "writer", title: "AI Writers" },
  { id: "creative", title: "Creative Director" },
  { id: "guardian", title: "Brand Guardian" },
  { id: "lifecycle", title: "Lifecycle Agent" },
  { id: "work", title: "The work" },
  { id: "geo", title: "What AI assistants say" },
  { id: "library", title: "Your library" },
  { id: "next", title: "The next step" },
];

// ⛔ THE RAIL IS SHORT AND STAYS SHORT (three cuts on Kite, all for
// busyness). Children under Building agents are only the agents this page
// actually demonstrates.
const RAIL_GROUPS = [
  {
    label: "/what we do",
    entries: [
      { id: "workflows", title: "Redesigning workflows", num: "01" },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "02",
        ids: ["buildingagents", "writer", "creative", "guardian", "lifecycle"],
        children: [
          { id: "writer", title: "Writers" },
          { id: "creative", title: "Creative Director" },
          { id: "guardian", title: "Brand Guardian" },
          { id: "lifecycle", title: "Lifecycle Agent" },
        ],
      },
      { id: "geo", title: "What AI assistants say", num: "03" },
    ],
  },
];

export default function GreatNationalDoc() {
  return (
    <ProspectShell
      clientName="Great National Hotels & Resorts"
      eyebrow="Prepared for James Sullivan and Chris Kenny, Great National Hotels & Resorts"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line. Carried over from the
         6 Aug page, which he read. */
      title="Build the Great National marketing team you never had"
      titleHl="never had"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      {/* ⚠️ DRAFT COPY, Paul's pass owed. Written from the 6 Aug call record
          only. Their own situation appears here and nowhere else on the page
          except the measured audit. */}
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          Everything here is our own work or a demonstration we made, and
          none of it assumes anything about how Great National runs. The one
          exception is the audit near the bottom, which is real research on
          greatnationalhotels.com. The next step we would suggest is at the
          end of the page.
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
          {/* Essays picked for Great National: the writer piece is the
              content half of Chris's ask, the DBA essay is the consistency
              argument, and the GEO essay pairs with the audit section. */}
          <div className="pps-hiw-links">
            <div>
              <p className="pps-hiw-cli-k">Essays</p>
              <ul className="pps-hiw-ll">
                {[
                  ["how-i-build-an-ai-writer", "How I build an AI writer"],
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
          team. No exhibit exists for this yet. */}
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

      {/* Paul's own copy, verbatim from the Fidelity page. For this reader
          it is the campaign production line across many properties. */}
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

      {/* AGENTS. Writers first because content is the ask, then the artwork
          half, then the consistency machine, then guest email. */}
      <PPSection id="buildingagents" k="06" title="Building agents">
        <></>
      </PPSection>

      {/* AI WRITERS. Verbatim from the Fidelity page. The demonstration
          stays Kite's renewal email: it is the worked example the writer
          piece was built on, and swapping it for a hotel email would mean
          inventing Great National's voice, which the no-invented-facts gate
          forbids. */}
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

      {/* CREATIVE DIRECTOR. The artwork half of Chris's ask: one approved
          master ad spawning the size set is the answer to campaign pieces
          made again per property. Sabre's real work. */}
      <PPSection id="creative" sub title="Creative Director">
        <CreativeDirector />
        {/* The Kite page's version of the same agent, kept because it shows
            a different half of the job: one approved master ad spawning the
            whole size set. Copy from the Kite page, Paul has NOT passed it. */}
        <div style={{ marginTop: 34 }}>
          <AdMachine />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The same discipline, pointed at advertising. The team approves one
          master ad; the machine makes every other size, holding the brand
          exactly. Press run.
        </p>
      </PPSection>

      {/* BRAND GUARDIAN. Chris's own word for the problem was inconsistency,
          and this is the machine that measures it. The exhibit shows Sabre's
          real work. ⛔ NO CHECK COUNT, see module-menu.md. */}
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

      {/* LIFECYCLE AGENT. Copy from the Kite page, Paul has NOT passed it.
          On the page because guest email was on their own road map: the
          direct route that brings a guest back without a third party in the
          middle. */}
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
          line by line. */}
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

      {/* THE AUDIT. Real measured research on greatnationalhotels.com, run
          6 Aug 2026 by the search desk. ⚠️ DRAFT COPY, Paul's pass owed. */}
      <PPSection id="geo" k="08" title="What AI assistants say about Great National">
        <p className="pps-standfirst">
          More people are asking AI assistants questions they used to type
          into Google, and being present in those answers is its own
          discipline. Before we met, we measured where Great National stands
          in those answers today. Everything in this section was measured on
          your own domain on 6 August.
        </p>
        <div style={{ marginTop: 26 }}>
          <GreatNationalGeoAudit />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The short reading: the hotelier side, which is the answer space
          that sells memberships, is strong. The guest side is weaker, and
          that is roughly what you would expect when member hotels trade
          under their own names. The finding worth acting on is Revanista.
          The full report is yours whenever you want it.
        </p>
      </PPSection>

      {/* YOUR LIBRARY. Picked for James and Chris. The course note doubles
          as the invitation: nobody from Great National is on it yet.
          ⚠️ DRAFT COPY, Paul's pass owed. */}
      <PPSection id="library" k="09" title="Your library">
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
              label: "Distinctive brands have an incredible opportunity with AI",
              note: "Why holding a brand exactly gets more important as the volume of work goes up.",
              href: "/distinctive",
              kind: "file",
              meta: "essay",
            },
            {
              label: "Getting cited by AI is a brand problem, not an SEO one",
              note: "The thinking behind the audit above.",
              href: "/essays/getting-cited-by-ai-is-a-brand-problem-not-an-seo-one",
              kind: "file",
              meta: "essay",
            },
            {
              label: "AI Fluency for Ambitious Marketers",
              note: "The course, free, for anyone on your team. Module one lands 21 September.",
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

      {/* THE NEXT STEP. The whole close, and the only ask on the page.
          No price by design, Paul's instruction 26 Aug.
          ⚠️ DRAFT COPY, Paul's pass owed. */}
      <PPSection id="next" k="10" title="The next step">
        <p className="pps-standfirst">
          The useful next step is an hour with Chris on how content and
          creative currently gets made across the properties: the formats
          that come up again and again, how a campaign moves from brief to
          finished pieces, and where the time goes. That tells me whether I
          can genuinely help, and what I would build first.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          After that hour I would come back to you with a recommendation and
          a price. If I don&rsquo;t think I can help, I will say so.
        </p>
      </PPSection>
    </ProspectShell>
  );
}
