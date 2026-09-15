"use client";

// The proposal for Eoin O'Sullivan, General Manager, Brosnan Property
// Solutions, Carrigtwohill, Cork. Facility management and trade services,
// about twenty technicians on the road and six or seven office staff, running
// Job Logic since January. He heard the Newstalk ad and wrote in on 4 Sep.
// Discovery call 7 Sep 2026, transcript in paul-hub/clients/brosnan/meetings/.
//
// The use case is the helpdesk: one shared Gmail inbox that every office staff
// member picks through by hand. Paul named it on the call as the easy win. The
// build was worked out in /jo on 7 Sep: three agents, Gmail labels as the
// surface, Job Logic as the customer record from day one, no export and no
// Zapier. Paul, 15 Sep: the helpdesk, single minded like the IHCE page, EUR
// 5,000 plus VAT, and the tools stated plainly as not included.
//
// Every customer, email and number in the windows is invented.

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

// The morning note, as passed in /jo on 15 Sep.
const MORNING_NOTE = [
  "Morning Eoin. Twenty three emails came into the helpdesk since yesterday evening. Twenty are already under the right person's name, with the customer and the job attached.",
  "Three need you. A customer is chasing a job that was closed on Friday, and it reads like a complaint. A quote request came in at around twenty two thousand, which is bigger than I route without you seeing it first. And a supplier invoice doesn't match any open job I can find.",
  "Everything else is done. Eleven status chases have replies drafted and waiting for whoever owns the account, and two new job requests are logged. Two emails came from companies that aren't customers yet, both asking for a price, so they're under New business with a short note on each. That makes six new inquiries this week.",
];

// The inbox on the left and the people it sorts to on the right. Columns are
// roles, never invented Brosnan staff (agreed 7 Sep).
const STAGES = ["Helpdesk inbox", "Key account managers", "Accounts", "New business"];

// Every business here is invented.
const BOARD = [
  [
    {
      firm: "Brackenhill Business Park",
      person: "Asking for an update on a job",
      note: "arrived 07:12",
    },
    {
      firm: "Oakwell Building Supplies",
      person: "Supplier invoice, PDF attached",
      note: "arrived 07:26",
    },
    {
      firm: "Tullan Dental Group",
      person: "Asking for a quote, three sites",
      note: "arrived 07:40",
    },
  ],
  [
    {
      firm: "Millstream Shopping Centre",
      person: "Reporting a fault",
      note: "logged as a new job",
    },
    {
      firm: "Larchfield Nursing Homes",
      person: "Asking for an update on a job",
      note: "reply drafted, waiting on you",
    },
  ],
  [
    {
      firm: "Corran Electrical Wholesale",
      person: "Supplier invoice",
      note: "no matching job, needs a person",
    },
  ],
  [
    {
      firm: "Bayfield House Hotel",
      person: "Asking for a maintenance contract",
      note: "short note on who they are",
    },
  ],
];

// Each email leaves the inbox for the person who owns it.
const MOVES = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
];

const MOVE_NOTES = [
  "matched in Job Logic, reply drafted",
  "matched to the job, filed against it",
  "new inquiry, counted",
];

const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "morning", title: "A morning with it" },
  { id: "howitworks", title: "How it would work" },
  { id: "pricing", title: "The price" },
];

const RAIL_GROUPS = [
  {
    label: "/the agent",
    entries: [
      { id: "morning", title: "A morning with it", num: "01" },
      { id: "howitworks", title: "How it would work", num: "02" },
      { id: "pricing", title: "The price", num: "03" },
    ],
  },
];

export default function BrosnanDoc() {
  return (
    <ProspectShell
      clientName="Brosnan Property Solutions"
      eyebrow="Prepared for Eoin O'Sullivan, Brosnan Property Solutions"
      title="A helpdesk agent for Brosnan"
      titleHl="helpdesk agent"
      standfirst={[]}
      sections={SECTIONS}
      railGroups={RAIL_GROUPS}
    >
      <PPSection id="heard" k="01" title="What this is">
        <p className="pps-standfirst">
          This page sets out a helpdesk agent for Brosnan Property Solutions.
          It reads every email that comes into helpdesk@brosnans.ie as it
          arrives. It checks the sender against your customers in Job Logic and
          works out what the email is: a new job, a status chase, a quote
          request, a supplier invoice or a complaint. Then it puts the email
          under the right person&rsquo;s name in Gmail, with the customer and
          the job attached. Where the reply is simple it drafts it, and a
          person reads it and presses send. Emails from companies that are not
          customers yet go to new business and are counted. Every morning it
          tells you what came in and what needs you.
        </p>
        <p className="pps-standfirst">
          The windows further down are demonstrations we built to show how it
          would work. Every customer, email and number in them is invented.
          The real version is built with you, around your customers, your team
          and the way your office already works.
        </p>
      </PPSection>

      {/* WHAT WE DO. Paul's own copy, verbatim, as it ships on the IHCE page. */}
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
      <PPSection id="morning" k="04" title="A morning with it">
        <p className="pps-standfirst">
          The first thing you see each morning is a note from the agent. It has
          read every email that came into the helpdesk, checked each sender
          against Job Logic and put each one under the right person&rsquo;s
          name. It tells you what came in, what needs you and what it has
          already done.
        </p>
        <div style={{ marginTop: 26 }}>
          <JoNote note={MORNING_NOTE} title="helpdesk" />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Behind the note is the picture it was written from. Every email
          starts in the helpdesk inbox and moves to the person who owns it,
          with the customer and the job attached. Emails from companies that
          are not customers yet go to new business, so every new inquiry is
          seen and counted.
        </p>
        <div style={{ marginTop: 26 }}>
          <PipelineBoard
            deals={BOARD}
            stages={STAGES}
            moves={MOVES}
            moveNotes={MOVE_NOTES}
            pill="sorted as it arrives"
          />
        </div>
        <p className="pps-standfirst" style={{ marginTop: 30 }}>
          Anything that cannot wait until the morning, like a complaint or a
          large quote request, it flags as it arrives. Nothing goes to a
          customer until a person has read it and pressed send.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          This is the run behind it. Every few minutes it reads the new mail,
          finds the customer in Job Logic, decides what each email is and whose
          it is, drafts a reply where it can and applies the labels in Gmail.
        </p>
        <div style={{ marginTop: 26 }}>
          <CampaignWindow
            title="Helpdesk"
            triggerName="New email"
            workflowName="Brosnan helpdesk run"
            steps={[
              { name: "Find the customer", sub: "agent" },
              { name: "Decide what it is", sub: "agent" },
              { name: "Draft the reply", sub: "agent" },
              { name: "Label it in Gmail", sub: "step" },
            ]}
            stats={[
              { n: "23", k: "Came in" },
              { n: "20", k: "Sorted", good: true },
              { n: "11", k: "Replies drafted", good: true },
              { n: "3", k: "Need a person" },
            ]}
            showCredits={false}
          />
        </div>
        <p className="ppft-honest">
          <span className="ppft-slash">/illustrative.</span> Every customer,
          email and number in these windows is invented. The same kind of agent
          runs our own work every morning. Yours would be built on your
          customers, your team and your rules.
        </p>
      </PPSection>

      <PPSection id="howitworks" k="05" title="How it would work">
        <p className="pps-standfirst">
          Your team keeps working in Gmail the way they do now. The folders on
          the left with people&rsquo;s names are Gmail labels, and today
          someone moves mail into them by hand. The agent does that instead,
          so nobody has to learn a new system.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          It is built as three agents with separate jobs. The first reads the
          email and looks up the customer and the job in Job Logic, and it is
          not allowed to write to anyone. The second decides what the email is
          and whose it is, and drafts the reply, using only facts the first one
          found. The third checks the work of both and flags anything it
          disagrees with. When the agent is not sure, it puts the email in a
          folder for a person, with the reason, and does not guess.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Our side of the build takes days. Three things take calendar time.
          Someone in your office spends a couple of hours marking two hundred
          past emails with what each one was and whose it was, so we can
          measure the agent against real answers. Joblogic sets up API access
          for your account. And the agent runs beside your team for a week or
          two while we read every decision and correct it, before it is handed
          over to you.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          The one thing to start now is the Job Logic access. On some Joblogic
          plans API access is a paid add-on, and they set it up on request. We
          would give you the exact wording to send them.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Joblogic has a feature that turns an email into a job, but it only
          works when the sender uses an exact template sent to a set address.
          Your customers write ordinary emails, which is what this agent
          handles. Job Logic stays the record of your customers and jobs.
        </p>
        <p className="pps-standfirst" style={{ marginTop: 22 }}>
          Once it is running, the same setup can take on the other things you
          mentioned: pricing the smaller quotes from your cost base, matching
          supplier invoices to jobs, and keeping the open jobs list current
          without an export. We would price those separately.
        </p>
      </PPSection>

      <PPSection id="pricing" k="06" title="The price">
        <PricingCards
          cards={[
            {
              title: "A helpdesk agent for Brosnan",
              bullets: [
                "Scoping with you and your office in the first week",
                "Connected to your helpdesk inbox and to Job Logic",
                "Run beside your team and corrected until it is right",
                "Training, then handed over and yours to keep",
              ],
              price: "€5,000 plus VAT",
              note: "One off.",
            },
          ]}
        />
        <CoversGrid
          covers={[
            "Scoping, building and testing",
            "Connecting it to Gmail and Job Logic",
            "Setting up the server it runs on, in your name",
            "Training you to run it and change it",
            "A named point of contact, Paul",
          ]}
          notCovered={[
            "A Claude subscription for you, to read the morning note and ask it questions",
            "Claude usage for the agent itself, billed by Anthropic on how much it does",
            "A small cloud server for it to run on",
            "Joblogic's API access add-on, if your plan does not include it",
          ]}
        />
        <CloseBox clientName="Brosnan" />
      </PPSection>
    </ProspectShell>
  );
}
