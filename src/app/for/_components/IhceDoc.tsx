"use client";

// The proposal for Patrick (Paddy) Nagle, IHCE Ltd. IHCE is a four person
// company that sells and services commercial and catering refrigeration to
// restaurants, cafés and pubs, and to resellers around Ireland. He heard the
// Newstalk ad and wrote in on 10 Aug. Discovery call 11 Sep 2026, transcript
// in the Tactiq Transcription folder in Drive.
//
// His problem, in his words on the call: "We're not quoting these places that
// are opening up... we're not even on the radar." The use case he picked is an
// agent that finds premises getting ready to open as a restaurant before they
// have bought their equipment. Paul priced it on the call at about five grand
// including training.
//
// Paul, 11 Sep: "create a proposal for a Business Development Agent in
// headline and use the growth agent details and figures." So this follows the
// Xtremepush page, with the Growth Agent figures turned to his world. Paul
// passed the copy in /jo the same day: EUR 5,000 plus VAT, the board's stages
// in his own language, the Monday note as written, and no PDF.
//
// The two sources named in "How it would work" were tested live on 11 Sep:
// the national planning applications feed and the CRO's daily company list
// both returned real, current records. The test notes are in
// paul-hub/drafts/proposals/2026-09-11-ihce-openings-data-check.md.
//
// Every business, person and number in the windows is invented.

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

// The Monday note, as Paul passed it on 11 Sep.
const MONDAY_NOTE = [
  "Morning Paddy. Last week there were eleven new planning applications and company registrations for food businesses in your area. Four look like real openings with a named person behind them: a café going into a former shop unit, a takeaway, a restaurant fit-out and a bakery that registered as a company on Thursday.",
  "Three things need you. The notes to those four are in your drafts. One of them, the restaurant, belongs to a group you have worked with before, so you may want to ring rather than write. And a café that opened in May has asked for a service quote.",
  "I've done these. The seven that didn't look real are logged with the reason, so you can check my judgement. Last week's replies are in OnePageCRM with a follow-up date on each. And the bakery's owner is on LinkedIn, so I've drafted a connection note for you to send.",
];

// Paddy's own stages, passed by Paul on 11 Sep.
const STAGES = ["Contacted", "Site visit", "Quote sent", "Won"];

// Food businesses only. Every one is invented.
const PIPELINE = [
  [
    {
      firm: "Kettle & Crumb",
      person: "Café, opening in spring",
      note: "letter sent Tuesday",
    },
    {
      firm: "Marlow Kitchen",
      person: "Restaurant fit-out",
      note: "LinkedIn note sent",
    },
    {
      firm: "Bayview Bites",
      person: "Takeaway",
      note: "follow-up Friday",
    },
  ],
  [
    {
      firm: "Hollybank Bakery",
      person: "Owner",
      note: "Thursday 10am, site visit",
    },
    {
      firm: "The Salt Room",
      person: "Head chef",
      note: "Wednesday, measuring the kitchen",
    },
  ],
  [
    {
      firm: "Greenway Deli",
      person: "Owner",
      note: "quote with them a week",
    },
    {
      firm: "Oak & Ember",
      person: "Operations",
      note: "follow-up Monday",
    },
  ],
  [
    {
      firm: "Millrace Café",
      person: "Installed",
      note: "service contract started",
    },
    {
      firm: "Lantern Pizza",
      person: "Order placed",
      note: "delivery booked",
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

export default function IhceDoc() {
  return (
    <ProspectShell
      clientName="IHCE"
      eyebrow="Prepared for Patrick Nagle, IHCE"
      /* Paul, 11 Sep: "a Business Development Agent in headline". His line to change. */
      title="A business development agent for IHCE"
      titleHl="business development agent"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          This page sets out a business development agent for IHCE. Each week
          it looks for restaurants, cafés, pubs and takeaways that are getting
          ready to open, finds out who is behind each one, and drafts a short
          note from you, so IHCE is in touch before they have bought their
          kitchen equipment. Anyone who replies goes into OnePageCRM, and every
          Monday it tells you where things stand.
        </p>
        <p className="pps-standfirst">
          The windows further down are demonstrations we built to show how it
          would work. Every business, person and number in them is invented.
          The real version is built with you in the first week, around your
          area, your customers and the way you like to write.
        </p>
      </PPSection>

      {/* WHAT WE DO. Paul's own copy, verbatim, as it ships on the Xtremepush
          page. */}
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

      <PPSection id="whatwedo" k="03" title="What Run with Foxes does">
        <FourThingsFigure />
      </PPSection>

      {/* THE EXPERIENCE. The note leads, the board is the picture behind it,
          and the run is the machinery. */}
      <PPSection id="monday" k="04" title="A Monday morning with it">
        <p className="pps-standfirst">
          On a Monday morning the first thing you see is a note from the agent.
          Over the week it has read the new planning applications and company
          registrations for food businesses in your area, worked out which
          ones look real, and drafted a note to each. It tells you what it
          found, what needs you and what it has already done.
        </p>
        <div style={{ marginTop: 26 }}>
          <JoNote note={MONDAY_NOTE} title="business development" />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Behind the note is the picture it was written from. Every business
          it has contacted sits on a board, and it keeps OnePageCRM in step
          with it, so replies and follow-up dates are logged without you
          typing them in.
        </p>
        <div style={{ marginTop: 26 }}>
          <PipelineBoard
            deals={PIPELINE}
            stages={STAGES}
            pill="kept current every morning"
            moveNotes={["quote sent today", "Wednesday 11am, site visit booked"]}
          />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Anything that cannot wait until Monday, like a reply asking for a
          price or a visit, it tells you that day. Nothing goes out under your
          name until you have read it and said yes.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          This is the run behind it. Each week it reads the new applications
          and registrations, checks whether each one is a real food business
          opening near you, finds the person behind it, drafts the note and
          logs it in OnePageCRM.
        </p>
        <div style={{ marginTop: 26 }}>
          <CampaignWindow
            title="Business development"
            triggerName="New application"
            workflowName="IHCE openings run"
            steps={[
              { name: "Check the listing", sub: "step" },
              { name: "Find the owner", sub: "agent" },
              { name: "Draft the note", sub: "agent" },
              { name: "Log in OnePageCRM", sub: "step" },
            ]}
            stats={[
              { n: "11", k: "Found" },
              { n: "4", k: "Real openings", good: true },
              { n: "4", k: "Notes drafted", good: true },
              { n: "2", k: "Replies" },
            ]}
            showCredits={false}
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> Every business,
          person and number in these windows is invented. The machinery is
          real and runs our own pipeline every morning. Yours would be built on
          your area, your customers and your rules.
        </p>
      </PPSection>

      <PPSection id="howitworks" k="05" title="How it would work">
        <p className="pps-standfirst">
          It takes two to three weeks, and about four days of work on our
          side. In the first week we sit down with you and agree the area it
          covers, the kinds of business worth your time, how the notes should
          sound and what it can write into OnePageCRM. Then we build it.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The two public sources that show a new food business earliest are
          the national planning applications database, which covers every
          council and shows a change of use to a café or restaurant months
          before it opens, and the Companies Registration Office&rsquo;s
          daily list of new companies, filtered to restaurants and food
          service. We tested both this week and both returned real, current
          records. Neither is complete on its own, because planning misses
          someone taking over a unit that is already a café, and a new
          company&rsquo;s address is often an accountant&rsquo;s office. So
          the agent uses the two together and checks each one before it
          drafts anything.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          In the second week it runs alongside you. You read what it finds and
          the notes it drafts, tell us what is wrong, and we change it until it
          is right. Then we show you how it works and how to change the brief,
          for a new area or a new kind of customer, and it is yours.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Cold email to people in Ireland who have not asked for it carries a
          GDPR risk, so the notes are written as letters and LinkedIn messages
          by default.
        </p>
      </PPSection>

      <PPSection id="pricing" k="06" title="The price">
        <PricingCards
          cards={[
            {
              title: "A business development agent for IHCE",
              bullets: [
                "Scoping with you in the first week",
                "Built around your area and OnePageCRM",
                "A week running alongside you, adjusted as it goes",
                "Training, then handed over and yours to keep",
              ],
              price: "€5,000 plus VAT",
              note: "One off. About two to three weeks from the start.",
            },
          ]}
        />
        <CoversGrid
          covers={[
            "Scoping, building and testing",
            "Connecting it to OnePageCRM",
            "Training you to run it and change it",
            "A named point of contact, Paul",
          ]}
          notCovered={[
            "Any tool or AI subscriptions on your side",
            "Printing and posting letters",
          ]}
        />
        <CloseBox clientName="IHCE" />
      </PPSection>
    </ProspectShell>
  );
}
