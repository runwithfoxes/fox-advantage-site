"use client";

// Seamus Moore, CMO, Bright Software Group. Built 28 Aug 2026, then rebuilt on
// 31 Aug onto Seamus's own document.
//
// ⭐⭐ THIS PAGE FOLLOWS HIS FORMAT, NOT OURS. Paul, 31 Aug: "we've actually been
// given the brief by Bright. We need to change our format and just follow
// Seamus's format and find the right type of images and figures to go with it.
// Otherwise it's confusing." So the running order is his: why we're doing it,
// the process, what we'd tackle, metrics for success, then the price. Why Paul
// and the case studies come after the price, because his plan leads and we come
// second. Do not reorder this back into the house template.
//
// ⭐⭐ IT IS NOT A TWO DAY SESSION. Paul, 31 Aug: "You're hanging onto the two
// days, which has nothing to do with anything." Seamus asked for someone
// embedded for three to four months. The two days on 8 and 9 September are the
// opening of week one and nothing more. Chase, Run, Diagnose, Reimagine and
// Build are OFF the page: that is our method for proposing an approach, and he
// has already written the approach, so carrying both made the page argue with
// itself.
//
// ⭐ HIS FOUR AREAS ARE THE SPINE AND ALSO THE PRICE: reporting, lifecycle,
// content, and design and production. Four at €6,000 is €24,000, discounted to
// €20,000 committed together. That keeps the shape Paul costed on 28 Aug and
// puts the four labels on the page rather than only inside the price box.
//
// ⛔ THE DEMOS BELONG TO A NAMED AREA NOW. They used to sit in a catalogue
// called "Building agents" with nobody's name on them. Reporting Suite under
// reporting, the writer under content, Brand Guardian and Creative Director
// under design and production.
//
// ⛔ CUT ON PAUL'S CALL, 31 Aug, and they stay cut: the "What this is" opener,
// the four things figure, the arrival blueprint, the work grid, and the
// champions copy that had wandered into a capability section. His document has
// no section they belong to, and cutting is what stops the page being
// confusing.
//
// ⛔ NO GEO AUDIT. Despite Seamus spending about 300k a year on search. The
// Search Agent module needs a real audit run first and there is none for
// brightsg.com.
//
// ⛔ NO OUTBOUND AGENT. 80% of Bright's business already comes off the website
// and Seamus said lead generation is the one thing he does not worry about.
//
// ⚠️ SUPERSEDES documents/SUPERSEDED-bright-two-day-session-september.html, which
// priced the two days alone at 3,000. Those days are inside this engagement now,
// and this reframe exposes that more, not less. If Seamus was ever sent that
// page, the email has to get ahead of the arithmetic.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import LibraryList from "./LibraryList";
import { ScaledWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import ReportingSuite from "./library/ReportingSuite";
import EngagementTimeline from "./library/EngagementTimeline";
import "./fidelity-cases.css";
import "./pricing.css";

const SECTIONS = [
  { id: "why", title: "Why we're doing it" },
  { id: "whypaul", title: "Why Paul" },
  { id: "process", title: "The process" },
  { id: "s-training", title: "Training the team" },
  { id: "areas", title: "AI Opportunities" },
  { id: "a-reporting", title: "Reporting" },
  { id: "a-lifecycle", title: "Lifecycle" },
  { id: "a-content", title: "Content" },
  { id: "a-design", title: "Design and production" },
  { id: "metrics", title: "Metrics for success" },
  { id: "pricing", title: "The price" },
  { id: "work", title: "Case studies" },
  { id: "library", title: "Essays" },
];

const RAIL_GROUPS = [
  {
    label: "/the engagement",
    entries: [
      {
        id: "process",
        title: "The process",
        num: "01",
        ids: ["process", "s-training"],
        children: [{ id: "s-training", title: "Training the team" }],
      },
      {
        id: "areas",
        title: "AI Opportunities",
        num: "02",
        ids: ["areas", "a-reporting", "a-lifecycle", "a-content", "a-design"],
        children: [
          { id: "a-reporting", title: "Reporting" },
          { id: "a-lifecycle", title: "Lifecycle" },
          { id: "a-content", title: "Content" },
          { id: "a-design", title: "Design and production" },
        ],
      },
    ],
  },
  {
    label: "/also",
    compact: true,
    entries: [
      { id: "metrics", title: "Metrics for success" },
      { id: "pricing", title: "The price" },
      { id: "work", title: "Case studies" },
        ],
  },
];

export default function BrightDoc() {
  return (
    <ProspectShell
      clientName="Bright"
      eyebrow="Prepared for Seamus Moore, Bright Software Group"
      /* ⛔ PAUL'S OWN WORDS, given on 31 Aug after three goes at it. The line has
         to be the BENEFIT, never the duration and never the two days. Do not
         reword it. */
      title="Building AI and Agents into your marketing"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
      pdfHref="/for/bright/pdf"
    >
      <PPSection id="why" k="01" title="Why we&rsquo;d do it">
        <p className="pps-standfirst">
          You have a team of twenty and want to compete like you have a team of
          sixty. That comes from building AI and agents into the work the team
          already does. The teams who get fluent now build a real advantage, because the
          people using it every day keep getting better at it.
        </p>
      </PPSection>

      <PPSection id="whypaul" k="02" title="Why Paul">
        <p className="pps-hiw-line">Quality first, then automate</p>
        <p className="pps-hiw-by">Paul Dervan, Run with Foxes</p>
        <div className="pps-hiw-grid">
          <div className="pps-hiw-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Paul_photo.jpg" alt="Paul Dervan, Run with Foxes" />
          </div>
          <p className="pps-hiw-award">Ireland&rsquo;s Marketer of the Year, 2022</p>
          <p className="pps-standfirst">
            Before I build anything, I ask one question: what does really good
            look like here? Not what AI can do, but what the best version of this
            marketing would be, and the level of quality and effectiveness I
            would want to stand over.
          </p>
          <p className="pps-standfirst">
            So I start where I always have. If there were no AI at all, what team
            would I hire to do this properly? I map that team first, the one I
            would build in a world before any of this existed.
          </p>
          <p className="pps-standfirst">
            Then I build exactly that, with agents instead of hires. The quality
            bar is set by the team I would have wanted, not by whatever a tool
            happens to make easy. Twenty years in brand is what tells me where
            that bar sits: Head of Brand at O2 Ireland, then CMO at the National
            Lottery, Head of Brand at Indeed and Miro, both global roles.
            Positioning, messaging and tone written first, then built into
            everything the agents make.
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
              The Godfather of Effectiveness, author of The Long and the Short of
              It
            </div>
          </div>
          <div className="pps-hiw-q">
            <p>
              &ldquo;Paul reported into me as Head of Brand when I was at Indeed.
              I have learned more from him than anyone else in my career.&rdquo;
            </p>
            <div className="pps-hiw-who">
              <b>Paul D&rsquo;Arcy</b>
              <br />
              CMO, Moloco. Former CMO at Miro and Indeed
            </div>
          </div>
        </div>
      </PPSection>

      <PPSection id="process" k="03" title="The process">
        <p className="pps-standfirst">
          Your own three phases, drawn to scale. Most of the work sits in the
          middle.
        </p>
        <EngagementTimeline />
      </PPSection>

      <PPSection id="s-training" sub title="Training the team">
        <div style={{ marginTop: 26 }}>
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
      </PPSection>

      <PPSection id="areas" k="04" title="AI Opportunities" />

      <PPSection id="a-reporting" sub title="Reporting">
        <p className="pps-standfirst">
          Traffic to leads to MQL to closed won, in one place. Today it sits
          across HubSpot, Google Analytics and Excel. A second agent checks the
          numbers against the source before the report goes out.
        </p>
        <div style={{ marginTop: 26 }}>
          <ReportingSuite />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The checking step is the point. A number that survives due diligence is
          one that something verified against the source.
        </p>
      </PPSection>

      <PPSection id="a-lifecycle" sub title="Lifecycle">
        <p className="pps-standfirst">
          Lifecycle stops being a role and a task. The segments, the triggers and
          the copy get built once in Claude Code and then run, so your 460,000
          contacts move from broadcasts to email that fires off what someone
          actually did, and the person who owned the sending is free to cover a
          lot more ground.
        </p>
      </PPSection>

      <PPSection id="a-content" sub title="Content">
        <p className="pps-standfirst">
          I read a lot about how AI writes slop. It does. But it does not have
          to, if you spend the time up front. Writers need to know the
          brand&rsquo;s positioning, the target audience, the insights and pain
          points in that category, the messaging and the tone of voice. Hover a
          dotted line below and it shows you which document that line came from.
        </p>
        <div style={{ marginTop: 26 }}>
          <WriterEmail
            subject={{
              text: "Payroll year end, without the fortnight",
              note: "voice",
            }}
            body={[
              { text: "Hi Michael," },
              {
                text: "Year end is the point where practice software either helps you or gets in your way.",
                note: "positioning",
              },
              {
                text: "Most practices run it the same way every year. The data comes out of one system, gets checked by hand in a spreadsheet, and goes back into another. It works, and it costs a fortnight that nobody has in January.",
                note: "messaging",
              },
              {
                text: "Because payroll, tax and practice management sit in the same place here, the checking happens as the data moves rather than after it.",
                note: "messaging",
              },
              {
                text: "Practices that moved last year told us the January close came in at about half the days it used to take.",
                note: "proof",
              },
              {
                text: "Happy to walk you through it on your own numbers if that is useful.",
                note: "voice",
              },
            ]}
            sign={["Aoife", "Bright"]}
          />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Email, brand, ghostwriting and ad copy all run off one machine,
          calibrated once on your positioning and tone. That calibration is the
          work, and it is what keeps twelve products sounding like one brand.
        </p>
      </PPSection>

      <PPSection id="a-design" sub title="Design and production">
        <p className="pps-standfirst">
          The opportunity here is to hand the low value, mundane but necessary
          work to AI, so the design team spends its time on the harder and more
          creative jobs instead. Resizes, versions, checks and turnarounds get
          done without them, and what they are actually good at gets the week.
        </p>
        <div style={{ marginTop: 30 }}>
          <BrandGuardian />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Any asset goes in and comes back passed or with the specific fixes.
          It works out what type of asset it is first, so the checks that run
          depend on the file. You spent last year unifying twelve products into
          one brand, and this holds that together as the volume goes up.
        </p>
        <div style={{ marginTop: 34 }}>
          <CreativeDirector notes={false} />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The design system converted into code, so anyone can ask for work and
          get something on brand back. It turns a vague request into a proper
          brief before it makes anything. The work shown is Sabre&rsquo;s, with
          their name on it.
        </p>
      </PPSection>

      <PPSection id="metrics" k="05" title="Metrics for success">
        <p className="pps-standfirst">
          You set the number at forty percent. We measure the work rather than
          the tools. In the first two weeks we time the jobs: working days for a
          monthly report, brief to live for a campaign, brief to published for a
          piece of content.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The same jobs get timed again at week twelve. Same jobs, same people,
          same measure. That is the version that stands up in a board pack.
        </p>
      </PPSection>

      <PPSection id="pricing" k="06" title="The price">
        <PricingCards
          cards={[
            {
              title: "The engagement",
              bullets: [
                "Twelve weeks from 8 September",
                "The four areas built and tested against the real work",
                "Your team trained on what they will run",
                "Your team running it by weeks nine to twelve",
              ],
              price: "€20,000 plus VAT",
              note: "The twelve weeks and all four areas, together.",
            },
          ]}
        />
        <CoversGrid
          covers={[
            "Twelve weeks from 8 September, with no preparation asked of your team",
            "The four areas built, tested and handed over",
            "Training your team on what they will run",
            "A named point of contact, Paul",
          ]}
          notCovered={["Any tool or platform subscriptions on your side"]}
        />
        <CloseBox clientName="Bright" />
      </PPSection>

      <PPSection id="work" k="07" title="Case studies">
        <p className="pps-standfirst">
          Starting with the big companies, and with the one I did from the
          inside, running the teams rather than advising them.
        </p>
        <div className="pfd-cases" style={{ marginTop: 26 }}>
          <div className="pfd-case">
            <h3>Moloco</h3>
            <p className="pfd-case-k">50 to 60 marketers</p>
            <p>
              They wanted to hire a copywriter. I persuaded them to let me build
              copywriters in AI instead, and they use them all the time. I am
              also building them a brand guardian, and an AI identity generator,
              which takes all the elements of their brand identity and reproduces
              them at speed.
            </p>
          </div>
          <div className="pfd-case">
            <h3>Miro</h3>
            <p className="pfd-case-k">150 marketers</p>
            <p>
              We were spending about $1.2 million on design and studio work. When
              I realised what was possible I set a target to reduce it by 20%,
              and we took $240,000 out inside a year.
            </p>
          </div>
          <div className="pfd-case">
            <h3>Sabre</h3>
            <p className="pfd-case-k">AI adoption programme, marketing first</p>
            <p>
              I have built them writers, brand guardians, a search agent, a brief
              coach, and an advertising creative role. We build and run those
              machines for them, and they are named here because they are happy
              to be.
            </p>
          </div>
        </div>
      </PPSection>

      <PPSection id="library" k="08" title="Essays">
        <LibraryList
          items={[
            {
              label: "AI Fluency for Ambitious Marketers",
              note: "The course, free, for anyone on your team. Module one lands 21 September.",
              href: "/course",
              kind: "link",
              meta: "course",
            },
            {
              label: "How I build an AI writer",
              note: "What actually goes into one, and why the folder of documents is the whole job.",
              href: "/essays/how-i-build-an-ai-writer",
              kind: "file",
              meta: "essay",
            },
            {
              label: "The 95:5 rule and the day one list",
              note: "Why most of the people who could buy from you are not buying from anyone this quarter.",
              href: "/essays/the-95-5-rule-the-day-one-list",
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
