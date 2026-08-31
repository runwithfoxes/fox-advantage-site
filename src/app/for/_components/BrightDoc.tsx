"use client";

// Seamus Moore, CMO, Bright Software Group. Built 28 Aug 2026 from TemplateDoc,
// off the 28 Aug discovery call and off the engagement brief Seamus wrote and
// sent the same evening.
//
// ⭐ WHAT MAKES THIS PAGE DIFFERENT FROM EVERY OTHER ONE. Seamus wrote the brief
// himself and named his own budget before he saw a price. Paul, 28 Aug: "The
// pricing is simple. One price... This is not a menu. This is 'here is the plan,
// as discussed and outlined in the doc' and the cost." So there is ONE card. A
// buyer who has written you a brief and told you his number has already decided,
// and handing him three options reads as if nobody listened.
//
// ⭐ THE PRICE IS COSTED BY PAUL'S OWN FOUR-STAGE METHOD, not by a list of
// deliverables. Paul, 28 Aug: "Cost it by those. maybe normally 6k each, which
// would be 24k... and discount to 20k." The same four rows explain the work and
// price it, which is why "How it would work" carries the method instead of the
// usual four subsections about running it for them.
//
// ⭐ THE METHOD WAS FOLDED AND EXTENDED FOR THIS PAGE, on Paul's call. His
// articulation is Chase, Run, Diagnose, Reimagine. Chase and Run are one row
// here because at Bright they genuinely are the same two days, and Build was
// added as a fourth because without it a buyer reads four words that all
// describe thinking, and his brief asked for things to get made. Paul: "maybe we
// fold chase and run into one, and add Build as last phase?"
//
// ⛔ THE ABSTRACT METHOD LINES ARE OFF THIS PAGE. Paul: "Going after the job, not
// the company, is a bit vague. We should be more specific." The methodology
// quotes teach the method to anyone; here each stage says what will actually
// happen in his building on the 8th. The labels stay, on his instruction,
// because they make it read as a method rather than a plan somebody made up on
// the way over, and that is what he hands to Andrew.
//
// ⛔ NO GEO AUDIT. Paul's call, despite Seamus spending about 300k a year on
// search and asking out loud whether they show up when accountants ask ChatGPT
// about payroll software. The Search Agent module needs a real audit run first
// and there is none for brightsg.com.
//
// ⛔ NO OUTBOUND AGENT. 80% of Bright's business already comes off the website
// and Seamus said lead generation is the one thing he does not worry about.
//
// Modules, agreed with Paul: redesigning-workflows, team-ai-adoption,
// training-teams, the new reporting-suite, ai-writer, brand-guardian,
// creative-director. The reporting suite goes FIRST inside "Building agents"
// because reporting is what Seamus led with himself and it is the one due
// diligence will look at.
//
// ⚠️ SUPERSEDES documents/SUPERSEDED-bright-two-day-session-september.html, which
// priced the two days alone at 3,000. Those days are inside this engagement now.
// If Seamus was ever sent that page, the email has to get ahead of the
// arithmetic.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import LibraryList from "./LibraryList";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import WorkGrid from "./library/WorkGrid";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import ReportingSuite from "./library/ReportingSuite";
import EngagementTimeline from "./library/EngagementTimeline";
import "./library/four-things.css";
import "./fidelity-cases.css";
import "./pricing.css";

const SECTIONS = [
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "changing", title: "Changing how the team works" },
  { id: "m-redesigning-workflows", title: "Redesigning workflows" },
  { id: "m-team-ai-adoption", title: "Designing team AI adoption" },
  { id: "m-training-teams", title: "Training teams" },
  { id: "buildingagents", title: "Building agents" },
  { id: "m-reporting-suite", title: "Reporting Suite" },
  { id: "m-ai-writer", title: "AI Writer" },
  { id: "m-brand-guardian", title: "Brand Guardian" },
  { id: "m-creative-director", title: "Creative Director" },
  { id: "howitworks", title: "How it would work" },
  { id: "s-chase", title: "Chase and Run" },
  { id: "s-diagnose", title: "Diagnose" },
  { id: "s-reimagine", title: "Reimagine" },
  { id: "s-build", title: "Build" },
  { id: "recommend", title: "What we'd recommend" },
  { id: "pricing", title: "The price" },
  { id: "work", title: "Case studies" },
  { id: "library", title: "Essays" },
  { id: "next", title: "The next step" },
];

const RAIL_GROUPS = [
  {
    label: "/what we do",
    entries: [
      {
        id: "changing",
        title: "Changing how the team works",
        num: "01",
        ids: [
          "changing",
          "m-redesigning-workflows",
          "m-team-ai-adoption",
          "m-training-teams",
        ],
        children: [
          { id: "m-redesigning-workflows", title: "Redesigning workflows" },
          { id: "m-team-ai-adoption", title: "Designing team AI adoption" },
          { id: "m-training-teams", title: "Training teams" },
        ],
      },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "02",
        ids: [
          "buildingagents",
          "m-reporting-suite",
          "m-ai-writer",
          "m-brand-guardian",
          "m-creative-director",
        ],
        children: [
          { id: "m-reporting-suite", title: "Reporting Suite" },
          { id: "m-ai-writer", title: "AI Writer" },
          { id: "m-brand-guardian", title: "Brand Guardian" },
          { id: "m-creative-director", title: "Creative Director" },
        ],
      },
      {
        id: "howitworks",
        title: "How it would work",
        num: "03",
        ids: ["howitworks", "s-chase", "s-diagnose", "s-reimagine", "s-build"],
        children: [
          { id: "s-chase", title: "Chase and Run" },
          { id: "s-diagnose", title: "Diagnose" },
          { id: "s-reimagine", title: "Reimagine" },
          { id: "s-build", title: "Build" },
        ],
      },
    ],
  },
  {
    label: "/also",
    compact: true,
    entries: [
      { id: "recommend", title: "What we'd recommend" },
      { id: "pricing", title: "The price" },
      { id: "work", title: "Case studies" },
      { id: "next", title: "The next step" },
    ],
  },
];

export default function BrightDoc() {
  return (
    <ProspectShell
      clientName="Bright"
      eyebrow="Prepared for Seamus Moore, Bright Software Group"
      /* ⛔ NOT THE TWO DAYS. Paul, 31 Aug: "You're hanging onto the two days,
         which has nothing to do with anything." The two days are the opening of
         a twelve week engagement, never the product. The line has to be the
         BENEFIT rather than the duration, and it is PAUL'S OWN WORDS, given on
         31 Aug after three goes at it. Do not reword it. */
      title="Building AI and Agents into your marketing"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
      pdfHref="/for/bright/pdf"
    >
      <PPSection id="howiwork" k="01" title="What we do">
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

      <PPSection id="whatwedo" k="02" title="What Run with Foxes does">
        <FourThingsFigure />
        <p className="pps-standfirst" style={{ marginTop: 24 }}>
          I firmly believe that marketing structures, marketing teams and
          marketing roles are going to change dramatically in the next few years,
          and the work we do is all around that. We train teams. We build AI
          agents and capabilities for them, or with them. We work with marketing
          leaders to re-imagine what future workflows could look like, and we
          design AI adoption programmes for them.
        </p>
      </PPSection>

      <PPSection id="changing" k="03" title="Changing how the team works">
        <p className="pps-standfirst">
          This part is about how the work gets done rather than about a thing we
          hand over. It is the half of your brief that asks for twenty people to
          operate like sixty, and it is what the two days in September are for.
        </p>
      </PPSection>

      <PPSection id="m-redesigning-workflows" sub title="Redesigning workflows">
        <ArrivalBlueprint />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Redesigning workflows is the harder work and it is where the gain
          actually is. Adding tools on top of how a team already works moves the
          bottleneck along rather than removing it, which is why so many
          companies report AI everywhere and no measurable productivity. The
          whole team has to move or it lands on legal, or brand, or whoever did
          not.
        </p>
      </PPSection>

      <PPSection id="m-team-ai-adoption" sub title="Designing team AI adoption">
        <WorkGrid />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Not everybody is going to be a builder, and that is fine. Every
          marketing team will soon have at least one person who builds and who
          helps the other teams with their work. What we measure is simple:
          pieces of work now done a different way, not logins or prompt counts.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          This is where your five champions come in. Joe, Connor, Sam, Jade and
          Alex learn on the things they will own afterwards, so the capability
          stays in the building when the engagement ends.
        </p>
      </PPSection>

      <PPSection id="m-training-teams" sub title="Training teams">
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
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The course is free and real, and anyone on your team of twenty can do
          it whether or not we work together. It is the floor your champions
          start from rather than the training itself.
        </p>
      </PPSection>

      <PPSection id="buildingagents" k="04" title="Building agents">
        <p className="pps-standfirst">
          These are the things we build and hand over. Two or three done properly
          beats six half done, which is why the room picks three on the second
          day rather than trying to carry your whole brief at once. The four
          below are the ones your brief pointed at most directly.
        </p>
      </PPSection>

      <PPSection id="m-reporting-suite" sub title="Reporting Suite">
        <p className="pps-standfirst">
          You said you cannot go from traffic to leads to MQL to closed won,
          because it sits in HubSpot, in Google Analytics and in Excel, and that
          HubSpot on its own is not it. This is what one suite looks like: your
          own funnel stages across the top, the channels underneath, and a second
          agent whose only job is checking the first one got the numbers right
          before the report goes out.
        </p>
        <div style={{ marginTop: 26 }}>
          <ReportingSuite />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The panels are the three places your money and your attention already
          go: the search spend you have been asking your digital manager to prove
          the efficiency of for months, the contacts sitting behind eleven
          acquisitions, and the seven webinars a week with a hundred to two
          hundred people at each. Reporting them in one place is also what turns
          the last of those from an event into a channel, because you can finally
          see what it produced.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The checking agent matters more than it looks. A number a buyer will
          accept is one that something verified against the source, and due
          diligence is the reason you want this first.
        </p>
      </PPSection>

      <PPSection id="m-ai-writer" sub title="AI Writer">
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
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> The email above is
          written by us to show what the writer produces. The sender, the
          recipient and the claim in it are invented, and none of it is
          Bright&rsquo;s copy or Bright&rsquo;s data.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Your brief asks for copywriters across email, brand, ghostwriting for
          the CEO and ad copy. This is one machine underneath all of them,
          calibrated once on your positioning and your tone, then pointed at each
          job. That calibration is the work, and it is what stops twelve products
          under one brand drifting back into twelve voices.
        </p>
      </PPSection>

      <PPSection id="m-brand-guardian" sub title="Brand Guardian">
        <BrandGuardian />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Any asset goes in, gets checked against the brand&rsquo;s own rules,
          and comes back either passed or with the specific fixes. It works out
          what type of asset it is first and then checks it against that
          type&rsquo;s pattern, so the gates that run depend on the file.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          You spent last year unifying twelve products into one brand. This is
          what stops that work coming apart again once the volume goes up.
        </p>
      </PPSection>

      <PPSection id="m-creative-director" sub title="Creative Director">
        <CreativeDirector />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The design system converted into code, so anyone on the team can ask
          for work and get something on brand back. It turns a vague request into
          a proper brief before it makes anything, following the rules you would
          teach an art director. The work shown is Sabre&rsquo;s, with their name
          on it, because we build and run these machines for them.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Your brief keeps Dineo as Creative Director and moves the day to day
          execution across. That is the right way round. This does the making,
          and the judgement about what is worth making stays with her.
        </p>
      </PPSection>

      <PPSection id="howitworks" k="05" title="How it would work">
        <p className="pps-standfirst">
          Four stages. The first three are the two days in September and the work
          either side of them. The fourth is the months after, when the three
          things the room picked actually get built.
        </p>
        <EngagementTimeline />
      </PPSection>

      <PPSection id="s-chase" sub title="Chase and Run">
        <p className="pps-hiw-line">Pick the jobs, then watch them being done.</p>
        <p className="pps-standfirst" style={{ marginTop: 18 }}>
          Before the 8th you and I agree four or five specific jobs to look at
          rather than marketing as a whole. How a monthly report gets made. How
          an email gets out to the database. How a keyword decision gets made.
          You already said you would rather I spent my time with four or five
          people than spread it evenly across twenty, and this is where that gets
          settled.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          On the day, the person who actually does each job takes me through it
          step by step, including the parts that are not written down anywhere.
          The extra approval that crept in, the workaround everybody uses. That
          is usually where the cost is sitting.
        </p>
      </PPSection>

      <PPSection id="s-diagnose" sub title="Diagnose">
        <p className="pps-hiw-line">
          Find where the time and the mistakes actually are.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 18 }}>
          For each job we go stage by stage and ask two separate questions. Where
          does the time actually go, and where do things actually go wrong. Then
          a third question after those: which of these stages is a candidate for
          changing at all. Plenty of slow things are not worth fixing, and saying
          so is part of the work. It is what keeps a session like this from
          turning into a wish list.
        </p>
      </PPSection>

      <PPSection id="s-reimagine" sub title="Reimagine">
        <p className="pps-hiw-line">Decide the three things worth doing.</p>
        <p className="pps-standfirst" style={{ marginTop: 18 }}>
          I come back to each area with how the work could run instead, against
          what they actually do rather than in general. Before lunch on the
          second day the room agrees the three worth doing over the next three
          months, in order, with someone on your side owning each one. People
          start leaving in the afternoon, so it lands before they go.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The week after, those three get written up properly: what each
          involves, what it takes to build, what it changes. That is the document
          you can put in front of Andrew.
        </p>
      </PPSection>

      <PPSection id="s-build" sub title="Build">
        <p className="pps-hiw-line">Build the three, and hand them over.</p>
        <p className="pps-standfirst" style={{ marginTop: 18 }}>
          The three get built over the months after, tested against the real work
          rather than in a demo, and handed to the people who will run them. Joe,
          Connor, Sam, Jade and Alex learn on the things they are going to own,
          so when I stop the team carries on without me.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Everything runs on our account behind a page with a password on it
          while we build, so there is nothing for Bright to buy, install or
          maintain in the meantime. When you would rather run it yourselves, we
          hand it over and you run it in your own account.
        </p>
      </PPSection>

      <PPSection id="recommend" k="06" title="What we&rsquo;d recommend">
        <p className="pps-standfirst">
          Start with reporting, which is what you said yourself. It is the least
          exciting thing on your list and it is the one with a date attached to
          it, because due diligence starts inside six months and the answer to
          &ldquo;show me your funnel&rdquo; cannot be a spreadsheet. Your new
          demand generation director came out of data and analytics, so he is the
          natural owner of it rather than a bottleneck.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          You also said out loud that it has to be reporting dashboards and it
          has to be lifecycle email, because the database is golden and it is
          being spent on broadcasts. I would expect the room to land close to
          that on the 9th. I am not going to decide it in advance, because the
          value of the second day is that your team chooses it rather than being
          handed it, and they are the ones who have to live with it afterwards.
        </p>
      </PPSection>

      <PPSection id="pricing" k="07" title="The price">
        <PricingCards
          cards={[
            {
              title: "The engagement",
              bullets: [
                "Two days with your team in Dublin, 8 and 9 September",
                "The three projects written up the week after",
                "The three built, tested and handed over",
                "Joe, Connor, Sam, Jade and Alex trained on what they will own",
              ],
              lines: [
                { label: "Chase and Run", value: "€6,000" },
                { label: "Diagnose", value: "€6,000" },
                { label: "Reimagine", value: "€6,000" },
                { label: "Build", value: "€6,000" },
              ],
              was: "€24,000",
              price: "€20,000 plus VAT",
              note: "All four stages, committed together.",
            },
          ]}
        />
        <p className="pps-standfirst" style={{ marginTop: 26 }}>
          Each stage is €6,000 taken on its own, which is €24,000 if they are
          commissioned one at a time as each one finishes. €20,000 is the price
          for all four committed together, and it is worth doing it that way for
          a reason beyond the money. The building starts the week after the 9th
          rather than after another round of scoping, and the clock on this is
          due diligence rather than a budget year.
        </p>
        <CoversGrid
          covers={[
            "Both days in the room, and the pre-work brief to your team",
            "The three projects written up, costed and owned",
            "Building all three, and testing them against the real work",
            "Training your five champions on what they will run",
            "A named point of contact, Paul",
          ]}
          notCovered={[
            "Any tool or platform subscriptions on your side",
            "Advertising or any media spend",
            "A fourth project. Three is what the room agrees and three is what gets built",
          ]}
        />
        <CloseBox clientName="Bright" />
      </PPSection>

      <PPSection id="work" k="08" title="Case studies">
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

      <PPSection id="library" k="09" title="Essays">
        <LibraryList
          intro="A few things worth keeping."
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

      <PPSection id="next" k="10" title="The next step">
        <p className="pps-standfirst">
          Say yes and the two days are confirmed. Before the 8th I need two
          things from you. Which four or five people you want me to spend the
          most time with, and one line from Martin on what the new website is
          being built on, because it changes what is worth doing on the email and
          page side.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          I will send your team the pre-work brief a week before, so nobody
          arrives cold on the morning.
        </p>
      </PPSection>
    </ProspectShell>
  );
}
