"use client";

// The capabilities page owed to Eoin Lynam and Fiona Heffernan, AXA Life
// Europe. Promised on the 28 Aug call. Paul's exact words at 25:24: "I'll send
// you on some stuff for the things I can do and I'll leave it with you to have
// a think about it." Eoin, just before: "I'm not too sure what you can do for
// us, if anything, but you know our problem, if you could do something and you
// could propose something that would be interesting."
//
// NOT a proposal. No price, no scope. Nobody asked for a quote and Paul has
// not seen how the work gets done.
//
// Built 1 Sep from IcsMedicalDoc.tsx, NOT from FidelityDoc.tsx. On Paul's
// instruction ("the document we did for Peter Barry is a useful one for AXA"),
// which means the Fidelity page - and ICS IS the Fidelity page after Paul went
// through it himself on 31 Aug and cut what he did not want. Building from
// Fidelity would have re-imported everything he deleted. His instruction here,
// 1 Sep: "Make sure you use super simple language, please, no fluff. I looked
// at a presentation yesterday for ICS Medical and I had to delete so many
// things off the page."
//
// So this is SHORTER than ICS: seven numbered sections, not ten. Every section
// is earned by a sentence Eoin or Fiona actually said:
//   What we do            - Eoin: "I'm not too sure what you can do for us."
//   What Run with Foxes does - the same question, answered as four buckets.
//   Redesigning workflows - Eoin 20:14: "having a vision which you painted a
//                           fairly nice vision there... but it's the next
//                           thing then is operationalizing that."
//   Training teams        - Eoin 20:29: "getting the skills that you need to
//                           be able to make it happen... pretty scarce."
//   Building agents       - Eoin 24:05: "We'd hire an SEO expert, a guru on
//                           digital response metric tracking, somebody on the
//                           creative side. No need."
//   The work              - Eoin 13:19: "do we hire a guy like you or what do
//                           we do?"
//   The next step         - Paul 14:31 on how he starts with larger teams.
//
// What came off the ICS build and why:
//   Ghostwriter - expert knowledge into published posts is a B2B motion.
//     Nobody at AXA raised thought leadership. Cut.
//   The GEO audit - Fiona raised it herself ("a clunky hard coded 900 page
//     beast... not favoured by LLMs") so it is EARNED, but it needs a real
//     audit run against a decided domain and the page ships without it rather
//     than with numbers nobody has checked.
//
// ⛔ Two things Paul said in the room that this page must not contradict.
// At 10:45, on consumer prospecting: "in Ireland GDPR is the thing... a brand
// like yours you probably wouldn't do that because you'd be into GDPR. But for
// the lifecycle stuff you absolutely could." So the Growth Agent's outreach
// world here is PARTNER development - brokers, credit unions, employers - and
// never consumers. At 18:21, on Fiona's enhanced-conversions problem: "I'd
// have to see it... you're gonna need someone in your technical team." So
// nothing here claims to fix their measurement plumbing.
//
// ⛔ Two kinds of truth. AXA's own situation appears NOWHERE on this page.
// Every demonstration is our own work, generic, labelled illustrative. Paul,
// 31 Aug: "I don't want stuff sounding like we're just repeating back from
// what they said."
//
// ⚠️ HEADLINE follows the pattern Paul set for ICS on 31 Aug. His line to own.

import ProspectShell, { PPSection } from "./ProspectShell";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow, OutreachWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import {
  PipelineBoard,
  JoNote,
  CampaignWindow,
} from "./library/GrowthManager";
import "./library/four-things.css";
import "./fidelity-cases.css";

// Outreach demonstration threads: an invented distribution world. Life cover
// in Ireland mostly reaches people through brokers, banks and employers, so
// partner development is the growth motion that fits an insurer without
// touching consumers, which Paul ruled out on the call. Every company and
// person here is made up.
const OUTREACH_THREADS = [
  {
    name: "Cormac Hyland",
    company: "Principal · Hyland Mortgage Advisers",
    message:
      "Hi Cormac - saw the practice took on two more advisers this year. We can quote and issue life cover inside five minutes online, so your clients finish on the day rather than waiting on paperwork. Worth a short call?",
    reply: "Yes - the waiting is the part clients hate.",
  },
  {
    name: "Aine Ronan",
    company: "Head of Member Services · Barrow Credit Union",
    message:
      "Hi Aine - we work with credit unions who want to offer members life cover without building the operation for it. Ten minutes on how that looks?",
    reply: "Interested. Send me some detail first.",
  },
  {
    name: "Declan Moore",
    company: "Reward Manager · Ardmore Group",
    message:
      "Hi Declan - congratulations on the new office. If you are reviewing the benefits package, life cover is usually the cheapest thing to add and the one staff notice. Worth twenty minutes?",
    reply: "Good timing, we're reviewing in October.",
  },
  {
    name: "Sinead Gallagher",
    company: "Partnerships Lead · Foyle Comparison",
    message:
      "Hi Sinead - we are one of the few life products in Ireland that a customer can buy start to finish online. That makes us straightforward to list. Can we talk about the panel?",
    reply: "Yes - send times for next week.",
  },
  {
    name: "Ruairi Behan",
    company: "Director · Behan Financial Planning",
    message:
      "Hi Ruairi - you wrote about clients dropping cover at renewal. We can show you what our own retention looks like and why. Half an hour?",
    reply: "Happy to chat. Thursday suits.",
  },
];

// PipelineBoard and JoNote both default to the wealth-advisor world built for
// Fidelity, which is how Tremblay Wealth Partners rendered on a medtech page.
// Both are passed AXA's own here. Every company and person is invented.
const PIPELINE = [
  [
    {
      firm: "Hyland Mortgage Advisers",
      person: "Cormac Hyland · Principal",
      note: "intro sent, two new advisers",
    },
    {
      firm: "Ardmore Group",
      person: "Declan Moore · Reward Manager",
      note: "benefits review in October",
    },
    {
      firm: "Barrow Credit Union",
      person: "Aine Ronan · Head of Member Services",
      note: "detail sent, follow-up due",
    },
  ],
  [
    {
      firm: "Foyle Comparison",
      person: "Sinead Gallagher · Partnerships Lead",
      note: "Tuesday 11am, panel terms",
    },
    {
      firm: "Behan Financial Planning",
      person: "Ruairi Behan · Director",
      note: "Thursday 2pm, retention data prepared",
    },
  ],
  [
    {
      firm: "Kilbrannan Brokers",
      person: "Maeve Tobin · Managing Director",
      note: "waiting on your yes",
    },
    {
      firm: "Slaney Union",
      person: "Peter Rafferty · CEO",
      note: "follow-up Friday",
    },
  ],
  [
    {
      firm: "Tolka Employee Benefits",
      person: "Onboarding",
      note: "terms agreed, launch date set",
    },
    {
      firm: "Ashfield Brokers",
      person: "Live",
      note: "first month, 41 policies written",
    },
  ],
];

// The morning note leads the section, on Paul's call for ICS. Reporting is the
// gap Fiona named first, so this one opens on numbers rather than on tasks.
const MORNING_NOTE = [
  "Morning. Yesterday: 312 quotes started, 84 finished. That finish rate is up four points on last week and it is the mobile change that did it.",
  "Three things need you today. The Kilbrannan terms are waiting on your yes. This week's partner list is built and ready for you to prune. And one broker has asked a pricing question I will not answer for you.",
  "Everything else is handled. Follow-ups sent, the board is current, the forecast is unchanged.",
];

const SECTIONS = [
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "workflows", title: "Redesigning workflows" },
  { id: "training", title: "Training teams" },
  { id: "buildingagents", title: "Building agents" },
  { id: "growth", title: "Growth Agent" },
  { id: "writer", title: "AI Writers" },
  { id: "work", title: "The work" },
  { id: "next", title: "The next step" },
];

// ⛔ THE RAIL IS THE FOUR THINGS AND NOTHING ELSE (three cuts on Kite, all for
// busyness). Children under Building agents are only the agents this page
// actually demonstrates.
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
        ids: ["buildingagents", "growth", "writer"],
        children: [
          { id: "growth", title: "Growth Agent" },
          { id: "writer", title: "Writers" },
        ],
      },
      { id: "next", title: "The next step", num: "04" },
    ],
  },
];

export default function AxaDoc() {
  return (
    <ProspectShell
      clientName="AXA Life Europe"
      eyebrow="Prepared for Eoin Lynam and Fiona Heffernan, AXA Life Europe"
      /* Follows the line Paul gave for ICS on 31 Aug. His to change. */
      title="Marketing AI Agents for AXA Life Europe"
      titleHl="AXA Life Europe"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      {/* WHAT WE DO. Paul's own copy, verbatim, the approved treatment. Essays
          swapped for the five that match what he actually said on this call:
          dump the website (13:23), citations by other brands (12:08), build a
          system (09:36), the writers, and the growth agent. */}
      <PPSection id="howiwork" k="01" title="What we do">
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
          <div className="pps-hiw-links">
            <div>
              <p className="pps-hiw-cli-k">Essays</p>
              <ul className="pps-hiw-ll">
                {[
                  [
                    "dump-your-website-and-start-again",
                    "Dump your website and start again",
                  ],
                  [
                    "getting-cited-by-ai-is-a-brand-problem-not-an-seo-one",
                    "Getting cited by AI is a brand problem, not an SEO one",
                  ],
                  ["build-a-system", "Build a system"],
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

      <PPSection id="whatwedo" k="02" title="What Run with Foxes does">
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

      <PPSection id="workflows" k="03" title="Redesigning workflows">
        <ArrivalBlueprint />
        {/* Paul's own copy, 10 Aug, as he rewrote it on 31 Aug for ICS. */}
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          For some clients, we re-design how teams do marketing. That work is
          only partly about the tech and the tools. Most of it is about
          people, their roles, their responsibilities, and sometimes their
          identities. We map out the activities and how
          they flow, from a brief through to campaigns and analysis,
          including the handovers, the time each step takes, the documents
          and artefacts created, the tools used, and the sign-offs. Then we
          re-imagine what is possible, both now and in the very near
          future, starting from a blank page. This is my core skill, as it
          is what I did building teams client-side for most of my career.
        </p>
      </PPSection>

      <PPSection id="training" k="04" title="Training teams">
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
            dictation. */}
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

      <PPSection id="buildingagents" k="05" title="Building agents">
        <></>
      </PPSection>

      {/* GROWTH AGENT. Outbound lives inside this section, the way it does on
          every page Paul has passed. Paul, 1 Sep: "I think we agreed there is
          no difference between an outbound agent and a growth agent. So leave
          the growth agent in."
          ⛔ The world is partner development, never consumers. Paul told them
          on the call that GDPR rules out consumer prospecting for a brand like
          theirs. */}
      <PPSection id="growth" sub title="Growth Agent">
        <JoNote note={MORNING_NOTE} />
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
          <PipelineBoard deals={PIPELINE} />
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
          <CampaignWindow
            triggerName="New broker"
            workflowName="Partner outbound"
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> Every company and
          person in these windows is invented, and the outreach shown is to
          businesses rather than consumers. The machinery is real and running;
          an AXA version would be built to your world and your rules, and
          nothing in it sends until someone on your team says go.
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
          out of it, worked through on Kite, the fictional insurance brand we
          use in our{" "}
          <a
            href="/course"
            target="_blank"
            rel="noopener noreferrer"
            className="pps-copy-link"
          >
            AI fluency course
          </a>
          . Hover a dotted line to see what it is made of.
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

      {/* THE WORK. Miro, Moloco, Sabre. Copy verbatim from the Fidelity page,
          where Paul agreed it line by line. */}
      <PPSection id="work" k="06" title="The work">
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

      {/* THE NEXT STEP. Paul at 14:31 on how he starts with larger teams: "I
          spend time with their marketing teams, literally redesigning their
          workloads. So I come in and I go, OK, like just explain everything to
          me and I do kind of interviews." Eoin's own close, 25:05: "if you
          could do something and you could propose something that would be
          interesting." Simple English, per his ICS rewrite. */}
      <PPSection id="next" k="07" title="The next step">
        <p className="pps-standfirst">
          The next step is a 90 minute session with you and Fiona, and whoever
          runs the marketing day to day on the Laya side. I want to see how
          the work gets done today: what a week looks like, how long things
          take, and what goes out to agencies. That tells me whether I can
          help, and what I would build first.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          It can be in your office or online, whichever suits. Online works
          well because I capture the whole session as we go. After it I would
          come back to you with a recommendation and a price.
        </p>
      </PPSection>
    </ProspectShell>
  );
}
