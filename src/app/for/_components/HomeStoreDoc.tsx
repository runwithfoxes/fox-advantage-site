"use client";

// Matthias Wenk, Home Store + More. Built 28 Aug 2026 from TemplateDoc, off the
// 28 Aug discovery call. Priced proposal, ONE card, at Paul's instruction: one
// thing is being offered so there is one price.
//
// ⭐ THE OFFER, in Paul's own words on the day: "We're going to build an agent
// that can do 3D modelling. We're going to need three weeks to do it. We're
// going to use Claude Code. When it's finished, we will hand it over so they can
// use it themselves without having to be skilled to do it. And we'll train them
// on it."
//
// ⛔ THINGS PAUL CUT, TWICE. Do not put them back:
//   - Any prose saying what the price covers. The card carries the number and
//     nothing else on the page talks about money.
//   - Store signage and price tickets as a next project. Off the page entirely.
//   - Counting beds or images. We sell the agent; it makes whatever they need.
//   - Comparing us to the 3D modelling supplier he is already testing with.
//
// Modules are Paul's pick: AI Writer, Brand Guardian, Creative Director. The
// Sabre work sits inside Creative Director and Brand Guardian and again in the
// case studies. "How it would work" is off this page: its four subsections
// describe the run-it-for-them model with a monthly, and this is a build, hand
// over and train job with nothing monthly, so the recommendation says it once.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CloseBox } from "./Pricing";
import LibraryList from "./LibraryList";
import FourThingsFigure from "./library/FourThingsFigure";
import { WriterEmail } from "./library/WriterPiece";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import "./library/four-things.css";
import "./fidelity-cases.css";
import "./pricing.css";

const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "buildingagents", title: "Building agents" },
  { id: "m-ai-writer", title: "AI Writer" },
  { id: "m-brand-guardian", title: "Brand Guardian" },
  { id: "m-creative-director", title: "Creative Director" },
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
        id: "buildingagents",
        title: "Building agents",
        num: "01",
        ids: [
          "buildingagents",
          "m-ai-writer",
          "m-brand-guardian",
          "m-creative-director",
        ],
        children: [
          { id: "m-ai-writer", title: "AI Writer" },
          { id: "m-brand-guardian", title: "Brand Guardian" },
          { id: "m-creative-director", title: "Creative Director" },
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

export default function HomeStoreDoc() {
  return (
    <ProspectShell
      clientName="Home Store + More"
      eyebrow="Prepared for Matthias Wenk, Home Store + More"
      /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line and replaces it. */
      title="A 3D modelling agent for your bedding"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
      pdfHref="/for/home-store/pdf"
    >
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          You asked how we work with brands and teams, and how the business model
          works. This page answers that.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Most of what follows is our own work on general marketing problems,
          shown running rather than described, so you can judge the standard for
          yourself. None of it uses your data or your products, because one call
          is not enough for us to tell you how Home Store + More should run. At
          the end there is one recommendation and one price, for the bedding
          photography we talked about.
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
              &ldquo;His command of marketing science as well as his instincts for
              great thinking and ideas are, in my opinion, superb.&rdquo;
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

      <PPSection id="whatwedo" k="03" title="What Run with Foxes does">
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

      <PPSection id="buildingagents" k="04" title="Building agents">
        <p className="pps-standfirst">
          Three of the agents we build and run. They are here so you can see the
          standard of what comes out rather than read a description of it.
        </p>
      </PPSection>

      <PPSection id="m-ai-writer" sub title="AI Writer">
        <p className="pps-standfirst">
          I read a lot about how AI writes slop. It does. But it does not have to,
          if you spend the time up front. Writers need to know the brand&rsquo;s
          positioning, the target audience, the insights and pain points in that
          category, the messaging and the tone of voice. Hover a dotted line below
          and it shows you which document that line came from.
        </p>
        <div style={{ marginTop: 26 }}>
          <WriterEmail
            subject={{ text: "The winter bedding is in", note: "voice" }}
            body={[
              { text: "Hi Niamh," },
              {
                text: "The new bedding landed in store this week, and it is the range we get asked about every October.",
                note: "positioning",
              },
              {
                text: "Most people buy a duvet set once and then live with it for years, so the thing that matters is how it feels after twenty washes rather than how it looks on the shelf. That is the part we test for before anything gets bought.",
                note: "messaging",
              },
              {
                text: "There are eleven patterns this year and four of them come in the heavier brushed cotton, which is the one people come back for.",
                note: "messaging",
              },
              {
                text: "You can see the whole range in any of the stores, and it is online if you would rather look first.",
                note: "voice",
              },
            ]}
            sign={["Niamh", "Home Store + More"]}
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> The email above is
          written by us to show what the writer produces. The range, the patterns
          and the sender are invented and none of it is your product.
        </p>
      </PPSection>

      <PPSection id="m-brand-guardian" sub title="Brand Guardian">
        <BrandGuardian />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Any asset goes in, gets checked against the brand&rsquo;s own rules, and
          comes back either passed or with the specific fixes. It works out what
          type of asset it is first and then checks it against that type&rsquo;s
          pattern, so the gates that run depend on the file.
        </p>
      </PPSection>

      <PPSection id="m-creative-director" sub title="Creative Director">
        <CreativeDirector />
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          The design system converted into code, so anyone on the team can ask for
          work and get something on brand back. It turns a vague request into a
          proper brief before it makes anything, following the rules you would
          teach an art director.
        </p>
      </PPSection>

      <PPSection id="recommend" k="05" title="What we'd recommend">
        <p className="pps-standfirst">
          We would build you an agent that does 3D modelling. It runs on Claude
          Code and Blender. It builds the bed in 3D and then makes the images
          from it, with whatever pattern and colour you give it. We need three
          weeks, working from the high res photography you send us.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          When it is finished we hand it over so your own team use it themselves.
          They do not need to be skilled at 3D to run it, and we train them on it.
        </p>
      </PPSection>

      <PPSection id="pricing" k="06" title="The price">
        <PricingCards
          cards={[
            {
              label: "The 3D modelling agent",
              title: "Built, handed over and your team trained",
              bullets: [
                "An agent that does 3D modelling, running on Claude Code",
                "Three weeks to build it, from your own high res photography",
                "Handed over to you when it is finished",
                "Your team trained to run it without us",
              ],
              price: "€7,500 plus VAT",
              note: "One off.",
            },
          ]}
        />
        <CloseBox clientName="Home Store + More" />
      </PPSection>

      <PPSection id="work" k="07" title="Case studies">
        <p className="pps-standfirst">
          Starting with the big companies, and with the one I did from the inside,
          running the teams rather than advising them.
        </p>
        <div className="pfd-cases" style={{ marginTop: 26 }}>
          <div className="pfd-case">
            <h3>Moloco</h3>
            <p className="pfd-case-k">50 to 60 marketers</p>
            <p>
              They wanted to hire a copywriter. I persuaded them to let me build
              copywriters in AI instead, and they use them all the time. I am also
              building them a brand guardian, and an AI identity generator, which
              takes all the elements of their brand identity and reproduces them
              at speed.
            </p>
          </div>
          <div className="pfd-case">
            <h3>Miro</h3>
            <p className="pfd-case-k">150 marketers</p>
            <p>
              We were spending about $1.2 million on design and studio work. When
              I realised what was possible I set a target to reduce it by 20%, and
              we took $240,000 out inside a year.
            </p>
          </div>
          <div className="pfd-case">
            <h3>Sabre</h3>
            <p className="pfd-case-k">AI adoption programme, marketing first</p>
            <p>
              I have built them writers, brand guardians, a search agent, a brief
              coach, and an advertising creative role. We build and run those
              machines for them, and they are named here because they are happy to
              be.
            </p>
          </div>
        </div>
      </PPSection>

      <PPSection id="library" k="08" title="Essays">
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

      <PPSection id="next" k="09" title="The next step">
        <p className="pps-standfirst">
          Send us the high res bedding photography and say yes, and we start. We
          would come back to you inside the three weeks with the first beds
          through the agent so you can see them while the work is still going on.
        </p>
      </PPSection>
    </ProspectShell>
  );
}
