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
//                        (SHOWN, not priced - Paul, 27 Aug)
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
import AdMachine from "./library/AdMachine";
import FourThingsFigure from "./library/FourThingsFigure";
import LibraryList from "./LibraryList";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import "./library/four-things.css";
import "./fidelity-cases.css";
import "./pricing.css";

const SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "site", title: "What we found on your site" },
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
      { id: "site", title: "What we found on your site", num: "01" },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "02",
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
        num: "03",
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
        caption="rebuilt in a day, with your own lamps and your own part numbers. Nothing on it takes an order."
        href="/for/boreman/index.html"
      />

      <ProspectShell
        clientName="Boreman"
        eyebrow="Prepared for Daragh Boylan, Boreman Limited"
        /* ⚠️ PLACEHOLDER HEADLINE. Paul owns this line on every real build. */
        title="Marketing Agents for your business"
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
            next section, which is real research on your own site, and the page
            at the top, which is that site rebuilt.
          </p>
        </PPSection>

        {/* THE AUDIT. Real, measured on boremanltd.com on 27 Aug 2026. This is
            the only part of the page that is about Boreman rather than a
            demonstration. Every line here was verified live. */}
        <PPSection id="site" k="02" title="What we found on your site">
          <p className="pps-standfirst">
            Before we met we went through boremanltd.com properly. Four things,
            all checked on the day.
          </p>
          <div className="pfd-cases" style={{ marginTop: 26 }}>
            <div className="pfd-case">
              <h3>The stockist button goes nowhere</h3>
              <p>
                Your homepage says AVAILABLE FROM YOUR BOREMAN STOCKISTS, and the
                button links to nothing. There is no stockists page, no dealers
                page and no where-to-buy page. So a driver who wants a Phantom is
                told to go to his stockist and never told who that is. The site
                already says the right sentence and there is nothing behind it.
              </p>
            </div>
            <div className="pfd-case">
              <h3>The shop is still half standing</h3>
              <p>
                The prices and the add-to-cart buttons are gone, but the shop
                itself is still there. Your shop page still lists thirty
                products, and the cart and account pages still load. So a product
                page is a dead end: no price, no cart, and no way to ask about
                the lamp.
              </p>
            </div>
            <div className="pfd-case">
              <h3>Google is writing your search result for you</h3>
              <p>
                The homepage has no description tag at all, so Google picks its
                own words for what people see in the results. Your product pages
                have one. The homepage, which is the page most people land on,
                does not.
              </p>
            </div>
            <div className="pfd-case">
              <h3>Three of your eight product images are not product photography</h3>
              <p>
                Phantom, Hybrid 6200 and the fitted shot are marketing cards with
                text and borders baked into them. They cannot be used as product
                pictures anywhere, which is why the rebuild above shows five
                lamps rather than eight.
              </p>
            </div>
          </div>
        </PPSection>

        {/* WHAT WE DO. Paul's own copy, verbatim from the Fidelity page where he
            agreed it line by line. Do not rewrite. */}
        <PPSection id="howiwork" k="03" title="What we do">
          <p className="pps-hiw-line">Quality first, then automate</p>
          <p className="pps-hiw-by">Paul Dervan, Run with Foxes</p>
          <div className="pps-hiw-grid">
            <div>
              <p className="pps-hiw-cli-k">IRELAND’S MARKETER OF THE YEAR, 2022</p>
              <p>
                Before I build anything, I ask one question: what does really
                good look like here? Not what AI can do, but what the best
                version of this marketing would be, and the level of quality and
                effectiveness I would want to stand over.
              </p>
              <p>
                So I start where I always have. If there were no AI at all, what
                team would I hire to do this properly? I map that team first, the
                one I would build in a world before any of this existed.
              </p>
              <p>
                Then I build exactly that, with agents instead of hires. The
                quality bar is set by the team I would have wanted, not by
                whatever a tool happens to make easy. Twenty years in brand is
                what tells me where that bar sits: Head of Brand at O2 Ireland,
                then CMO at the National Lottery, Head of Brand at Indeed and
                Miro, both global roles.
              </p>
            </div>
          </div>
        </PPSection>

        <PPSection id="whatwedo" k="04" title="What Run with Foxes does">
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

        <PPSection id="buildingagents" k="05" title="Building agents">
          <p className="pps-standfirst">
            Three of them are worth talking about for Boreman. Two we would
            recommend building now, and one worth knowing exists.
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
            is a real page, not a picture of one, and it took a day. It is
            thirty-one times lighter than the site you have now, which loads
            ninety-seven separate scripts on the homepage alone.
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
        </PPSection>

        {/* GROWTH AGENT. Shown, not priced. Paul, 27 Aug: "Include the growth
            agent." */}
        <PPSection id="growth" sub title="Growth Agent">
          <p className="pps-standfirst">
            Worth knowing this exists, though it is not what we would build
            first. You said you find truck drivers by hand, off the Facebook
            pages of the big truck shows and off LinkedIn, and you called it
            stupid and time consuming. A Growth Agent does that part: it finds
            the people, works out who is worth talking to, writes the messages
            and tells you what came back.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            We would leave it until the pictures and the site are working,
            because there is no point sending people to a page that cannot take
            them anywhere.
          </p>
        </PPSection>

        {/* HOW IT WOULD WORK. Four beats, the same shape Ace Express uses, and
            they are sub-sections rather than a component: CardCascade is a
            diagram of one card with children falling out of it, which is the
            wrong tool for four paragraphs of prose. */}
        <PPSection id="howitworks" k="06" title="How it would work">
          <p className="pps-standfirst">
            The same four things are true of both, so they are worth saying once.
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

        {/* THE PRICE. Paul's numbers, 27 Aug: three thousand plus VAT each,
            ninety-nine a month on the advertising agent only, no monthly on the
            website, reviewed after three months. ⛔ NEVER invent a number here. */}
        <PPSection id="pricing" k="07" title="The price">
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
                  label: "First three months, to the review",
                  value: "€3,297 plus VAT",
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
                price: "€3,000 plus VAT",
                note: "No monthly on the website.",
              },
            ]}
          />
          <CoversGrid
            covers={[
              "All build and calibration work",
              "Sessions with you to get what is in your head",
              "Running the advertising agent for three months",
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

        <PPSection id="library" k="09" title="Essays">
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

        <PPSection id="next" k="10" title="The next step">
          <p className="pps-standfirst">
            If the two above look right, the next step is a call to agree what
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
