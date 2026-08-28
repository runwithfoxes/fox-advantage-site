"use client";

// Daragh Boylan, Boreman Ltd. Built 27 Aug 2026 from the 11 Aug discovery call.
//
// ⭐ THE FIRST PAGE TO OPEN ON THE CLIENT'S OWN SITE, REBUILT, FULL BLEED, ABOVE
// THE MASTHEAD. Paul's call, pointing at the GEO Ireland page: "I think this
// website looks really good, so I don't want this to be hidden away. Maybe we
// have this website as the hero of our proposal. and it takes over the entire
// top of the page." New component: WebsiteHero. The old WebsiteExhibit is the
// small-frame treatment and stays for pages that want it.
//
// ⭐ WHY THESE MODULES. Every one is anchored in something Daragh said on the
// call, and the transcript is on the Attio deal e0bd7c9a-d679-4cb1-a658-8a29dc3006a2:
//   Advertising Agent -> "cosmetics are very important. How they look what they
//                        do... performance in terms of light output probably less"
//                        and competitors "promoted very heavily and in kind of
//                        cool ways"
//   Website Agent     -> "the website definitely needs work" and he wants to
//                        sell online again
//   Growth Agent      -> he finds truck drivers by hand off Facebook pages and
//                        LinkedIn: "it's stupid really time consuming snooping"
//                        (priced at three thousand from 28 Aug)
//
// ⛔ THE AUDIT SECTION IS OUT. Paul cut it 27 Aug, right after cutting the
// caption under the hero. It held four verified findings on boremanltd.com -
// the stockist button linking to nothing, the half-standing shop, the missing
// meta description, and three of eight images not being product photography.
// The research still exists in clients/boreman/memory/boreman-brand-spec-for-ads.md
// and the rebuild at the top ANSWERS those findings without listing them, which
// is the likely reason it went: the page shows rather than tells.
//
// ⛔ OUT, deliberately: Redesigning workflows (five employees, no workflow to
// redesign). Training teams - he ruled it out himself, "train people in-house
// and do all that, it just won't work for me". Brand Guardian and Brief Coach
// (for a team with a brand book and an approval chain). Lifecycle (his end-user
// list is info@ addresses, so there is nothing good to send to yet).
//
// ⛔⛔ NEVER GENERATE A BOREMAN LAMP. Their product is the brand. Every lamp
// anywhere on this page or in the rebuild is their own photography, cut out
// with rembg. Full rules in clients/boreman/memory/boreman-brand-spec-for-ads.md.
//
// ⚠️ DRAFT COPY THROUGHOUT. Paul's pass owed on every word.

import ProspectShell, { PPSection } from "./ProspectShell";
import WebsiteHero from "./WebsiteHero";
import CreativeDirector from "./library/CreativeDirector";
import { OutreachWindow } from "./library/AgentWindows";
import { PipelineBoard, JoNote, CampaignWindow } from "./library/GrowthManager";
import AdMachine from "./library/AdMachine";
import FourThingsFigure from "./library/FourThingsFigure";
import LibraryList from "./LibraryList";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import "./library/four-things.css";
import "./fidelity-cases.css";
import "./pricing.css";

// Outreach demonstration threads. ⛔ EVERY firm and person here is invented,
// and the honesty line under the window says so. The world is Boreman's own:
// truck dealers, fitters and mainland wholesalers, which is who they actually
// sell to. Nothing here is a real Boreman customer.
const OUTREACH_THREADS = [
  {
    name: "Niall Foy",
    company: "Parts Manager · Corrib Commercials",
    message:
      "Hi Niall - you fit a lot of extra lighting for the hauliers around Galway. There is a spot lamp with an amber position ring that the drivers are asking for by name at the shows. Worth ten minutes to show you the range?",
    reply: "Go on. The lads keep asking for the ring ones and we have none.",
  },
  {
    name: "Petra Lindqvist",
    company: "Inköp · Nordvik Fordonsdelar",
    message:
      "Hi Petra - you carry a good bit of auxiliary lighting already. We develop bespoke lamps with the wholesaler rather than selling you the same thing everyone else has, and the territory is agreed up front. Happy to send the catalogue?",
    reply: "Bespoke is interesting. Send it and I will look this week.",
  },
  {
    name: "Dermot Kane",
    company: "Workshop Foreman · Slaney Truck Centre",
    message:
      "Hi Dermot - when a driver comes in wanting his truck to look right, what are you fitting at the moment? We do the full range and we sell only through workshops like yours, never direct.",
    reply: "Never direct is the bit I care about. Who do I talk to?",
  },
];

// ⭐ 28 Aug: the pipeline board and Jo's note ship with Fidelity's advisor world
// baked in, so on this page they were showing wealth-management firms to a truck
// lighting company. Both now take their world as a prop, and this is Boreman's:
// dealers, fitters and mainland wholesalers, which is who they actually sell to.
// ⛔ Every firm and person below is invented. The honesty line under the windows
// says so, and nothing here is a real Boreman customer.
const PIPELINE = [
  [
    { firm: "Corrib Commercials", person: "Niall Foy · Parts Manager", note: "sample sent, awaiting reply" },
    { firm: "Slaney Truck Centre", person: "Dermot Kane · Workshop Foreman", note: "intro sent this morning" },
    { firm: "Kilbeggan Trailer Services", person: "Aoife Rynne · Buyer", note: "follow-up scheduled" },
  ],
  [
    { firm: "Nordvik Fordonsdelar", person: "Petra Lindqvist · Inköp", note: "Tuesday 10am, catalogue sent" },
    { firm: "Ostmann Nutzfahrzeugteile", person: "Jonas Ostmann · Einkauf", note: "Thursday 2pm, range walked through" },
  ],
  [
    { firm: "Bandon Truck & Trailer", person: "Cathal Deasy · Owner", note: "waiting on your yes" },
    { firm: "Vestland Lastebildeler", person: "Marit Hovden · Innkjøp", note: "bespoke lamp quoted" },
  ],
  [
    { firm: "Slaney Truck Centre", person: "Stocking the range", note: "first order placed" },
    { firm: "Corrib Commercials", person: "Live", note: "reordering monthly" },
  ],
];

const MORNING_NOTE = [
  "Morning. Overnight: two replies came in and one meeting landed, Tuesday at ten with Nordvik in Sweden.",
  "Three things need you today. Bandon is waiting on your yes for the bespoke lamp. The list for the Donegal truck show is built and ready for you to prune. And one reply asks for trade pricing, which I will not answer for you.",
  "Everything else is handled. Follow-ups sent, the board is current, nothing has gone quiet.",
];

const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "buildingagents", title: "Building agents" },
  { id: "advertising", title: "Advertising Agent" },
  { id: "website", title: "Website Agent" },
  { id: "growth", title: "Growth Agent" },
  { id: "howitworks", title: "How it would work" },
  { id: "use", title: "How your team would use it" },
  { id: "weeks", title: "The first weeks" },
  { id: "infra", title: "No Claude licence needed" },
  { id: "after", title: "What comes after" },
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
        ids: ["buildingagents", "advertising", "website", "growth"],
        children: [
          { id: "advertising", title: "Advertising Agent" },
          { id: "website", title: "Website Agent" },
          { id: "growth", title: "Growth Agent" },
        ],
      },
      {
        id: "howitworks",
        title: "How it would work",
        num: "02",
        ids: ["howitworks", "use", "weeks", "infra", "after"],
        children: [
          { id: "use", title: "How your team would use it" },
          { id: "weeks", title: "The first weeks" },
          { id: "infra", title: "No Claude licence needed" },
          { id: "after", title: "What comes after" },
        ],
      },
    ],
  },
  {
    label: "/also",
    compact: true,
    entries: [
      { id: "pricing", title: "The price" },
      { id: "work", title: "Case studies" },
      { id: "library", title: "Essays" },
      { id: "next", title: "The next step" },
    ],
  },
];

export default function BoremanDoc() {
  return (
    <>
      {/* ⭐ THE REBUILD IS THE TOP OF THE PAGE. It is a real page in an iframe,
          never a screenshot pretending to be one, and the truck film plays as
          Daragh lands. */}
      <WebsiteHero
        src="/for/boreman/index.html"
        url="boremanltd.com"
        href="/for/boreman/index.html"
      />

      <ProspectShell
        clientName="Boreman"
        eyebrow="Prepared for Daragh Boylan, Boreman Limited"
        /* Paul's line, chosen 28 Aug over two alternatives offered. */
        title="Marketing agents for your business"
        standfirst={[]}
        sections={SECTIONS}
        railGroups={RAIL_GROUPS}
      >
        {/* WHAT THIS IS. The only place Boreman's own situation appears, apart
            from the site section, which is real measured research. */}
        <PPSection id="heard" k="01" title="What this is">
          <p className="pps-standfirst">
            You said on our call that the pictures are what sell a lamp, that
            the competitors are promoting theirs heavily and in cool ways, and
            that the manpower is there but the know-how is not. Everything below
            is our own work or a demonstration we made. The one exception is the
            page at the top, which is your own site rebuilt.
          </p>
        </PPSection>

        {/* WHAT WE DO. ⛔ COPIED WHOLE from the Great National build, which
            took it from Fidelity where Paul agreed it line by line. Hand-rolling
            this section is what dropped the photo and put the prose in the wrong
            face on the first pass. Do not rewrite it, and do not retype it. */}
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
            {/* Essays picked for Boreman: the writer piece is what goes into an
                agent, and the DBA piece is why holding a brand exactly matters
                more as the volume of work goes up. The citation essay is about AI
                search and is not this pitch. */}
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
          <p className="pps-standfirst" style={{ marginTop: 24 }}>
            I firmly believe that marketing structures, marketing teams and
            marketing roles are going to change dramatically in the next few
            years, and the work we do is all around that. We train teams. We
            build AI agents and capabilities for them, or with them. We work with
            marketing leaders to re-imagine what future workflows could look
            like, and we design AI adoption programmes for them.
          </p>
        </PPSection>

        <PPSection id="buildingagents" k="04" title="Building agents">
          <p className="pps-standfirst">
            Three of them, and we would build all three for Boreman. They can
            be taken in any order, or together.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            If you asked us where to start, we would say the Advertising Agent
            and the website first, because the pictures and the page are what a
            driver and a dealer actually see, and there is no point sending
            people somewhere that cannot take them anywhere. The Growth Agent is
            the one that then brings them.
          </p>
        </PPSection>

        {/* ADVERTISING AGENT. His own words are the argument: cosmetics beat
            performance and the competitors are winning on creative. */}
        <PPSection id="advertising" sub title="Advertising Agent">
          <p className="pps-standfirst">
            You told us cosmetics are very important, how they look on the truck,
            and that light output matters less. In a category where the picture
            is the product, the people making the best pictures win, and you
            said yourself that the competitors are promoted very heavily and in
            cool ways.
          </p>
          <CreativeDirector />
          <p className="pps-standfirst" style={{ marginTop: 26 }}>
            We take your existing lamp photographs and your brand apart, and
            teach the machine your rules: your blue and your amber, how a lamp is
            lit and laid out, where the logo sits, how the writing sounds. That
            calibration is the once-off part and it is where the craft is. After
            it, the person in your office sends up a product shot and says what
            she needs, and finished work comes back looking like Boreman.
          </p>
          <div style={{ marginTop: 30 }}>
            <AdMachine />
          </div>
          <p className="pps-standfirst" style={{ marginTop: 26 }}>
            One approved piece becomes every size you need, for a truck show
            banner, a dealer’s website, a magazine, or a month of posts for
            TikTok, Instagram and Facebook aimed at the drivers rather than at
            the trade.
          </p>
        </PPSection>

        {/* WEBSITE AGENT. The hero at the top is the exhibit, so this section
            points back at it rather than repeating it. */}
        <PPSection id="website" sub title="Website Agent">
          <p className="pps-standfirst">
            The page at the top of this document is boremanltd.com, rebuilt. It
            is a real page, not a picture of one. The page itself is
            seventeen times lighter than the site you have now.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            The important part is not that it looks better. It is that the
            stockist route actually exists. Every lamp on it ends at ask your
            stockist, the list a driver builds goes to you and you pass it to the
            dealer nearest him, and nothing on the page takes an order or shows a
            price. That is the thing that killed your own shop the first time,
            and this is the way round it.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            After it is built you change it by talking to it. Ten new photographs
            on a product page, a new lamp added to the range, a banner for a
            show next month. You ask, and it makes the change.
          </p>
          {/* ⭐ Paul, 27 Aug: say plainly that this was built on spec and that a
              real brief makes it considerably better. Two reasons. It is true,
              and it stops a rebuild made from a public website being read as our
              best work. */}
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            One thing worth saying plainly. We built that on spec, in a day, from
            your public website and nothing else. Nobody briefed us, so we made
            our own guesses about what matters to you, who you are really talking
            to, and what a dealer needs from a page. With a proper brief and an
            hour of your time on those questions, we would do a considerably
            better job than this.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            <a
              className="ppwh-inline"
              href="/for/boreman/index.html"
              target="_blank"
              rel="noreferrer"
            >
              See the full website
            </a>
          </p>
        </PPSection>

        {/* GROWTH AGENT. ⭐ Paul, 27 Aug: "You skipped the work on the growth
            agent. You didn't put any images or anything. You don't even explain
            what it is." Correct, it was three paragraphs and nothing else. Now
            built from the same exhibits Return2Sender and Fidelity use.
            ⛔ Every name in the outreach window is invented. */}
        <PPSection id="growth" sub title="Growth Agent">
          <p className="pps-standfirst">
            You told us you find truck drivers by hand, off the Facebook pages of
            the big truck shows and off LinkedIn, and you called it stupid and
            time consuming. A Growth Agent is the thing that does that part. It
            finds the people, works out who is worth talking to, writes to them,
            and tells you what came back.
          </p>
          <div style={{ marginTop: 30 }}>
            <PipelineBoard deals={PIPELINE} />
          </div>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            It is the single point of contact for the pipeline. It opens the
            board every morning for you to look at together, it keeps it up to
            date without anyone typing into a spreadsheet, and it does the
            analysis to work out where things are getting stuck.
          </p>
          <div style={{ marginTop: 26 }}>
            <JoNote note={MORNING_NOTE} />
          </div>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            The main job is the outreach. It builds the list, finds the right
            person at each dealer, wholesaler or workshop, writes each message
            to that company rather than sending the same one to everybody, sends
            it, and reads the replies. Your rep in Ireland and Jeff in the UK
            stop Googling and start the week with people who have already put
            their hand up.
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
            running, a Boreman version would be built to your world and your
            rules, and nothing in it sends until someone at Boreman says go.
          </p>
        </PPSection>

        <PPSection id="howitworks" k="05" title="How it would work">
          <p className="pps-standfirst">
            The same four things are true of all three, so they are worth saying once.
          </p>
        </PPSection>

        <PPSection id="use" sub title="How your team would use it">
          <p className="pps-standfirst">
            The person in your office who runs the social goes to a private page
            on our site with a password on it. She asks for what she needs in
            plain English, a post for the new spotlight or a banner for a show,
            and the finished files come back to her. There is nothing to install
            and nobody to train, which matters because you told us training
            people in house would not work for you.
          </p>
        </PPSection>

        <PPSection id="weeks" sub title="The first weeks">
          <p className="pps-standfirst">
            The work is ours, not yours. You send over your existing ads, your
            lamp photography and whatever brand material you have, and we take it
            apart and teach the machine your rules. That is the calibration, it
            happens once, and it is the part that decides whether everything
            afterwards looks like Boreman or looks like nothing in particular.
          </p>
        </PPSection>

        <PPSection id="infra" sub title="No Claude licence needed">
          <p className="pps-standfirst">
            It runs on our account, behind our page. There is nothing for Boreman
            to buy, install or maintain, and no software for anyone to learn.
          </p>
        </PPSection>

        <PPSection id="after" sub title="What comes after">
          <p className="pps-standfirst">
            If you would rather run it yourselves at any point, we hand it over.
            You would run it in your own Claude account and the monthly stops.
            The Growth Agent is the natural next one, once the pictures and the
            site are doing their job.
          </p>
        </PPSection>

        {/* THE PRICE. Paul's numbers, revised 28 Aug: the WEBSITE is six
            thousand plus VAT, the advertising and growth agents are three
            thousand each. He reset it after doing the cost-to-serve sum out
            loud: a website is at least five days once you count the calls with
            Daragh, his changes, finding images and hosting, and at three
            thousand that was six hundred a day against his own fifteen hundred.
            The two live builds on the board back him up, data intelligence at
            twenty-nine sessions and Nova not started after four meetings.
            Ninety-nine a month on the advertising agent only, reviewed after
            three months. ⛔ NEVER invent a number here. */}
        <PPSection id="pricing" k="06" title="The price">
          <PricingCards
            cards={[
              {
                label: "Part one",
                title: "Advertising Agent",
                bullets: [
                  "One agent, calibrated to your brand, your blue and amber, and the way your lamps are shot",
                  "Your existing product photography taken apart and taught to the machine",
                  "Finished posts, banners and ads in every size you need",
                  "A private page with a password, for the person who runs your social",
                ],
                price: "€3,000 plus VAT",
                note: "Then €99 a month, reviewed together after three months.",
                total: {
                  label: "First three months",
                  value: "€3,297",
                },
                featured: true,
              },
              {
                label: "Part two",
                title: "Website Agent",
                bullets: [
                  "boremanltd.com rebuilt, the page at the top of this document",
                  "A stockist route that works, so demand goes to your dealer",
                  "Your range, your part numbers, your own photography",
                  "You change it by talking to it, no agency and no waiting",
                ],
                price: "€6,000 plus VAT",
                note: "No monthly on the website.",
              },
              {
                label: "Part three",
                title: "Growth Agent",
                bullets: [
                  "Builds the list of dealers, fitters and wholesalers worth talking to",
                  "Writes to each one about their own business, not a mailshot",
                  "Runs the campaigns and reads what comes back",
                  "One board you and it look at together every morning",
                ],
                price: "€3,000 plus VAT",
                note: "Nothing sends until someone at Boreman says go.",
              },
            ]}
          />
          <CoversGrid
            covers={[
              "All build and calibration work",
              "Sessions with you to get what is in your head",
              "Running the agents for three months",
              "A named point of contact, Paul",
            ]}
            notCovered={[
              "Any tool subscriptions on your side",
              "Advertising or any media spend",
              "New photography shot on location",
            ]}
          />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            If you would rather run it yourselves at any point, we will hand it
            over. You would run it in your own Claude account and the monthly
            stops.
          </p>
          <CloseBox clientName="Boreman" />
        </PPSection>

        {/* CASE STUDIES. Paul, 27 Aug: after the price on this page. Copy
            verbatim from the Fidelity build where he agreed it line by line.
            Every number is real. */}
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
                They wanted to hire a copywriter. I persuaded them to let me
                build copywriters in AI instead, and they use them all the time.
                I am also building them a brand guardian, and an AI identity
                generator, which takes all the elements of their brand identity
                and reproduces them at speed.
              </p>
            </div>
            <div className="pfd-case">
              <h3>Miro</h3>
              <p className="pfd-case-k">150 marketers</p>
              <p>
                We were spending about $1.2 million on design and studio work.
                When I realised what was possible I set a target to reduce it by
                20%, and we took $240,000 out inside a year.
              </p>
            </div>
            <div className="pfd-case">
              <h3>Sabre</h3>
              <p className="pfd-case-k">AI adoption programme, marketing first</p>
              <p>
                I have built them writers, brand guardians, a search agent, a
                brief coach, and an advertising creative role. The creative work
                shown further up this page is Sabre’s, shown with their name
                because we build and run these machines for them.
              </p>
            </div>
          </div>
        </PPSection>

        <PPSection id="library" k="08" title="Essays">
          <LibraryList
            intro="A few things worth keeping, picked for where you are now."
            items={[
              {
                label: "How I build an AI writer",
                note: "What actually goes into one, and why the folder of documents is the whole job.",
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

        <PPSection id="next" k="09" title="The next step">
          <p className="pps-standfirst">
            If the three above look right, the next step is a call to agree what
            gets built first and to get your brand material over to us. The
            advertising agent needs your existing ads and lamp photography, and
            the website needs whatever you have on the range.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            We would come back to you three months in and look at it together.
          </p>
        </PPSection>
      </ProspectShell>
    </>
  );
}
