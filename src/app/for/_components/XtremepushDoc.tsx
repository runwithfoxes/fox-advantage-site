"use client";

// The proposal for Rob Pryce, Chief Revenue Officer at Xtremepush. Paul has
// known him twenty years. They met for coffee on 4 Aug, Paul offered a
// proposal by email on 5 Aug ("build a Pipeline / Growth Desk so you can see,
// quiz, and use as single point"), and Rob replied on 8 Sep: "If you could take
// a stab and then we can refine that would be great." No call record exists.
//
// Paul's brief, 10 Sep 2026, in this order:
//   - Rob already has a team of human growth people. What he wants is
//     something for himself, so he doesn't have to keep pulling the
//     information together.
//   - "They are very AI forward." Four or five days of work, about two weeks,
//     EUR 6,000 plus VAT, one price. "It's a narrow scope."
//   - "Quite a single-minded proposal." His bio and the four-things figure,
//     "just the figure", then all of it on a chief of staff for Rob, shown with
//     the Growth Agent figures but talked about as a chief of staff.
//   - "We want to describe an experience. When it's up and running on a
//     Monday, he opens his laptop and what happens?" The note should talk to
//     him: "Morning Rob, this is where we are today. Here are things that you
//     need to look at. Here are things I'm going to take off your plate."
//   - "Leave out one or two sentences on Rob. He knows who he is." And the
//     heading is "a chief of staff agent for him".
//
// What it writes and what it only flags: Paul, 10 Sep, "We can design that
// with them. He's in charge." So the page leaves that to Rob in week one.
//
// ⛔ NO MONEY FIGURES IN THE NOTE. The first draft had pipeline and target in
// euros. On a CRO's page an invented pipeline number reads as our guess at his
// real one, the same reason the AXA note had its numbers taken out on 1 Sep.
// Day counts and task counts stay, because they describe the work rather than
// his business. Every company in the windows is invented.
//
// No case studies and no essays section, for a single-minded page to someone
// who has known Paul for twenty years. The essays stay as links under the bio.

import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import FourThingsFigure from "./library/FourThingsFigure";
import {
  PipelineBoard,
  JoNote,
  CampaignWindow,
} from "./library/GrowthManager";
import "./library/four-things.css";
import "./pricing.css";

// The Monday note. Paul's shape: where we are, what needs you, what I have
// taken off your plate, and the team's initiatives.
const MONDAY_NOTE = [
  "Morning Rob. Here is where we are. New business pipeline for the quarter went up last week, mostly because the UK team moved two sportsbook deals to proposal. On current pace the quarter lands short of target, and the gap is in the US. Renewals are on track except one.",
  "Three things need you this week. That renewal has had no contact in 19 days and its account manager is out until Thursday. The Brazil team's biggest deal has been with legal for three weeks, and they've asked whether you'd call the operator's CEO. And the forecast for Friday's board pack needs your sign-off. I've drafted it.",
  "I've taken these off your plate. The numbers and one-page summary for Wednesday's revenue meeting are done. Two of the three initiative owners who hadn't updated their trackers now have, and I'll chase the third today. Your notes for the one-to-ones with the UK and US leads are in your drafts.",
  "Across the team's initiatives, the partner programme signed two new partners, the US outbound campaign booked four meetings, and the retention work with account management is a week behind where it said it would be.",
];

// Operators, banks and roles only. Every firm is invented.
const PIPELINE = [
  [
    {
      firm: "Corrib Sportsbook",
      person: "Head of CRM",
      note: "intro from the partner programme",
    },
    {
      firm: "Lismore Bank",
      person: "Head of Digital",
      note: "UK team, follow-up Thursday",
    },
    {
      firm: "Ardee Gaming Group",
      person: "CMO",
      note: "US team, reply in",
    },
  ],
  [
    {
      firm: "Tullow Bet",
      person: "VP Retention",
      note: "Tuesday 2pm, demo prepared",
    },
    {
      firm: "Cabo Apostas",
      person: "Head of CRM",
      note: "Brazil team, Thursday",
    },
  ],
  [
    {
      firm: "Kilcar Casino",
      person: "COO",
      note: "with their legal, three weeks",
    },
    {
      firm: "Fenit Sports",
      person: "CMO",
      note: "UK team, follow-up Friday",
    },
  ],
  [
    {
      firm: "Owenmore Bet",
      person: "Onboarding",
      note: "kick-off booked",
    },
    {
      firm: "Harbour Credit",
      person: "Live",
      note: "renewal due in March",
    },
  ],
];

const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "monday", title: "A Monday morning with it" },
  { id: "howitworks", title: "How it would work" },
  { id: "pricing", title: "The price" },
];

const RAIL_GROUPS = [
  {
    label: "/the agent",
    entries: [
      { id: "monday", title: "A Monday morning with it", num: "01" },
      { id: "howitworks", title: "How it would work", num: "02" },
      { id: "pricing", title: "The price", num: "03" },
    ],
  },
];

export default function XtremepushDoc() {
  return (
    <ProspectShell
      clientName="Xtremepush"
      eyebrow="Prepared for Rob Pryce, Xtremepush"
      /* Paul, 10 Sep: "a chief of staff agent for him". His line to change. */
      title="A chief of staff agent for Rob"
      titleHl="chief of staff"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          This page sets out a chief of staff agent for you. It pulls together
          what is happening across the pipeline, the team and its initiatives,
          brings that to you each week so you don&rsquo;t have to go looking
          for it, and takes work off your plate.
        </p>
        <p className="pps-standfirst">
          The windows further down are demonstrations we built to show how it
          would work. Every company, deal and number in them is invented. The
          real version is built in the first week around where your
          information actually lives.
        </p>
      </PPSection>

      {/* WHAT WE DO. Paul's own copy, verbatim, the approved treatment, as it
          ships on the AXA page. Essays picked for a chief of staff agent. */}
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
          <div className="pps-hiw-links">
            <div>
              <p className="pps-hiw-cli-k">Essays</p>
              <ul className="pps-hiw-ll">
                {[
                  ["a-robot-called-jo", "A robot called Jo"],
                  ["build-a-system", "Build a system"],
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

      {/* Paul, 10 Sep: "that figure that shows the four things we do, just the
          figure". No paragraph under it. */}
      <PPSection id="whatwedo" k="03" title="What Run with Foxes does">
        <FourThingsFigure />
      </PPSection>

      {/* THE EXPERIENCE. Paul, 10 Sep: "When it's up and running on a Monday,
          he opens his laptop and what happens?" The note leads, the board is
          the picture behind it, the run is the machinery. */}
      <PPSection id="monday" k="04" title="A Monday morning with it">
        <p className="pps-standfirst">
          On a Monday morning the first thing you see is a note from the agent.
          Before you open your laptop it has read the pipeline, the
          team&rsquo;s trackers and the week ahead, and it tells you where
          things stand, what needs you and what it has already done.
        </p>
        <div style={{ marginTop: 26 }}>
          <JoNote note={MONDAY_NOTE} title="chief of staff" />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Behind the note is the picture it was written from. The pipeline is
          kept current from the same sources, so the board you open is the one
          the note describes.
        </p>
        <div style={{ marginTop: 26 }}>
          <PipelineBoard
            deals={PIPELINE}
            pill="kept current every morning"
            moveNotes={[
              "UK team, proposal sent today",
              "Wednesday 11am, brief prepared",
            ]}
          />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          During the week you can ask it anything the note did not cover, such
          as how Brazil compares with last quarter or which renewals fall
          before Christmas, and it answers from the same sources. Anything that
          cannot wait until Monday, like a large deal slipping or a renewal
          going quiet, it tells you that day. On Friday it asks each initiative
          owner for a one-line update, so the Monday note is built on what the
          team actually said.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The jobs it takes off your plate are agreed with you in the first
          week. The ones in the note are the usual starting point: the numbers
          and summary for the revenue meeting, chasing updates, and notes
          before your one-to-ones. Anything that goes out under your name, it
          drafts and you decide.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          This is the run behind it. Every morning it reads the sources, works
          out where things stand and what it can take on, checks its own
          numbers against the sources, and then writes to you.
        </p>
        <div style={{ marginTop: 26 }}>
          <CampaignWindow
            title="Chief of staff"
            triggerName="Every morning"
            workflowName="Rob's morning run"
            steps={[
              { name: "Read the sources", sub: "step" },
              { name: "Where we are", sub: "agent" },
              { name: "Off your plate", sub: "agent" },
              { name: "Check and send", sub: "step" },
            ]}
            stats={[
              { n: "6", k: "Sources read" },
              { n: "3", k: "Need you", good: true },
              { n: "3", k: "Done for you", good: true },
              { n: "3", k: "Chased" },
            ]}
            showCredits={false}
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> Every company, deal
          and number in these windows is invented. The machinery is real and
          runs our own pipeline every morning. Yours would be built on your
          systems and your rules.
        </p>
      </PPSection>

      <PPSection id="howitworks" k="05" title="How it would work">
        <p className="pps-standfirst">
          It takes about two weeks. In the first week we sit down with you,
          work out where your information lives, which reports and trackers
          matter and which jobs you want off your plate, and build it. That
          includes what it is allowed to update in HubSpot and what it should
          only flag to the person who owns it, which is your call.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          In the second week it runs alongside you. You read the Monday note
          and tell us what is wrong or missing, and we change it until it is
          right. Then we hand it over with a short guide to how it works and
          how to change it, and it is yours.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Where it runs is settled in the first week, in the tools you already
          use, so there is nothing new for anyone on your team to learn.
        </p>
      </PPSection>

      <PPSection id="pricing" k="06" title="The price">
        <PricingCards
          cards={[
            {
              title: "A chief of staff agent for Rob",
              bullets: [
                "Scoping with you in the first week",
                "Built on your own systems",
                "A week running alongside you, adjusted as it goes",
                "Handed over, and yours to keep",
              ],
              price: "€6,000 plus VAT",
              note: "One off. About two weeks from the start.",
            },
          ]}
        />
        <CoversGrid
          covers={[
            "Scoping, building and testing",
            "Connecting it to your systems",
            "A week of changes while it runs alongside you",
            "A named point of contact, Paul",
          ]}
          notCovered={[
            "Any tool or AI subscriptions on your side",
            "A version for the rest of the team",
          ]}
        />
        {/* The close box is the ask. A "next step" section after it said the
            same thing a second time, so it came off on the first look. */}
        <CloseBox clientName="Xtremepush" />
      </PPSection>
    </ProspectShell>
  );
}
