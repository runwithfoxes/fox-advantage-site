"use client";

// The proposal for Brendan Marrinan and Laura Fuvessy, ICS Medical (Galway).
// Built 13 Oct 2026 from the Unknown group page (UnknownGroupDoc.tsx), which is
// left alone, off the 28 Aug and 8 Oct calls and the words Paul agreed.
//
// Same order and same panel as that page: headline, what I propose, what we
// do, the price, then the agents. Paul's ruling on that page still holds here:
// "we're not selling agents ... What's on the page is just examples." So the
// agents are labelled examples and carry no price.
//
// Two ways to start, side by side: a lead finder and a training day. No days
// and no day rates anywhere except the words "a training day".
//
// The two agents at the front are new, written for ICS: the lead finder
// (shown largest) and a case study writer (on 8 Oct they said case studies are
// "the big thing" and they are not using what they have). Every company in the
// lead finder is invented. The case study is a placeholder device and client.
// The other eleven are the ones on the Unknown group page with its names taken
// out.
//
import { useEffect, useState } from "react";
import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CloseBox } from "./Pricing";
import { WriterEmail } from "./library/WriterPiece";
import { JoNote } from "./library/GrowthManager";
import IcsSearchWindow from "./library/IcsSearchWindow";
import IcsLeadFinderWindow from "./library/IcsLeadFinderWindow";
import TypedNote from "@/components/agents/TypedNote";
import AdDeskWindow from "@/components/agents/AdDeskWindow";
import GuardianWindow from "@/components/agents/GuardianWindow";
import {
  HEADLINE,
  RESEARCH,
  REDTEAM,
  PM,
  GHOST_POST,
  CASE_STUDY,
} from "./ics-medical-data";
import "@/components/agents/agents-section.css";
import "./pricing.css";
import "./unknown-group.css"; // the ppug- styles are shared; nothing in them names the group
import "./ics-medical.css";

const SECTIONS = [
  { id: "heard", title: "What I propose" },
  { id: "howiwork", title: "What we do" },
  { id: "pricing", title: "The price" },
  { id: "agents", title: "Examples of agents" },
];

// One agent in the panel: its number, its name, a few words in the small type,
// Paul's line about it, and the one window that shows it.
type TeamItem = {
  id: string;
  num: string;
  name: string;
  short: string;
  dek: string;
  fig: () => React.ReactNode;
  note: React.ReactNode;
  k?: string;
  /** A window drawn for more room than the column has: drawn wider, shown smaller. */
  roomy?: boolean;
};

function Shown({ a }: { a: TeamItem }) {
  return (
    <>
      <p className="pps-standfirst ppug-team-dek">{a.dek}</p>
      <figure className={a.roomy ? "ag-fig ppug-team-win ppug-roomy" : "ag-fig ppug-team-win"}>{a.fig()}</figure>
      <Note k={a.k}>{a.note}</Note>
    </>
  );
}

// The agents as one panel, after the homepage's "/the team" (Paul, 13 Oct
// 2026: "basically I can just scroll over each one and see the agent").
// Names on the left, and on the right the window of the one the pointer is
// on. Pressing a name does the same, which is how it works on a phone, where
// the window opens under the name pressed. Only one window is ever on the
// page, so only one note types itself out at a time.
function TeamPanel({ items }: { items: TeamItem[] }) {
  const [on, setOn] = useState(0);
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1000px)");
    const set = () => setWide(m.matches);
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);
  return (
    <div className="ppug-team">
      <nav className="ppug-team-list" aria-label="The agents">
        {items.map((a, i) => (
          <div key={a.id} id={a.id} className="ppug-team-row">
            <button
              type="button"
              className={`ppug-team-item${on === i ? " on" : ""}`}
              aria-pressed={on === i}
              onMouseEnter={() => wide && setOn(i)}
              onFocus={() => setOn(i)}
              onClick={() => setOn(i)}
            >
              <span className="ppug-team-n">{a.num}</span>
              <span className="ppug-team-name">{a.name}</span>
              <span className="ppug-team-short">{a.short}</span>
            </button>
            {!wide && on === i ? (
              <div className="ppug-team-under">
                <Shown a={a} />
              </div>
            ) : null}
          </div>
        ))}
      </nav>
      {wide ? (
        <div className="ppug-team-fig">
          <div className="ppug-team-fig-in" key={items[on].id}>
            <Shown a={items[on]} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Note({ k = "/example.", children }: { k?: string; children: React.ReactNode }) {
  return (
    <p className="ppug-note">
      <span className="ppug-slash">{k}</span> {children}
    </p>
  );
}


// A whole website in a browser window. Each tab is one real page, photographed
// from top to bottom, and the reader scrolls it inside the window.
// A live site as a film of it being scrolled, in a browser window that links
// to the site (Paul, 13 Oct, on the still picture of a site: "The website one
// is really flat ... Maybe it should be an MPEG scroller", then "don't do data
// intelligence, do Nova"). The film is a recording of novahcm.ie on 13 Oct.
function SiteFilm({ src, poster, url, href, label }: { src: string; poster: string; url: string; href: string; label: string }) {
  return (
    <a className="ppug-site ppug-siteshot" href={href} target="_blank" rel="noopener noreferrer">
      <span className="ppug-site-bar">
        <span className="ppug-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ppug-site-url">{url}</span>
        <span className="ppug-site-pill">live</span>
      </span>
      <video src={src} poster={poster} width={1120} height={700} autoPlay muted loop playsInline aria-label={label} />
    </a>
  );
}

// The creative director's window: our own 60:40 ad as it was built. Three
// frames of the film in order, one of the banner sizes, and the three rules it
// was held to. The rules are the ones written down for this ad in the fox-ads
// CONTEXT.md ("Key Decisions"): one thought a frame, the number sized with
// room round it, and the chart becoming one split bar on a thin strip.
// The creative director shows the newest work, the fox acting on a chart
// (Paul, 13 Oct: "I wanted to show the new stuff we've made with the Fox Moves
// - the video with this line under it: Three clips: carry, climb and push").
// The film and the line are the ones on /how-we-made-it.
function CreativeWindow() {
  return (
    <div className="ppug-site ppug-cd">
      <div className="ppug-site-bar">
        <span className="ppug-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ppug-cd-title">Creative Director · the fox on a chart</span>
        <span className="ppug-site-pill">our own film</span>
      </div>
      <figure className="ppug-cd-film">
        <video
          src="/how-we-made-it/fox-moves-carry.mp4"
          poster="/how-we-made-it/fox-moves-carry-poster.jpg"
          width={1080}
          height={1080}
          autoPlay
          muted
          loop
          playsInline
          controls
          aria-label="A chart. The fox carries in a grey bar marked 7 of 43 ads and stands it down. He climbs onto it. A taller blue bar marked 20 of 43 ads grows beside him and he pushes against it."
        />
        <figcaption>Three clips: carry, climb and push.</figcaption>
      </figure>
    </div>
  );
}

// The growth note and the renewal email are the ones on our own homepage,
// word for word (AgentsSection.tsx), for the made-up insurer Kite. Paul, 13
// Oct: "The growth agent is just a static image of some cards. Use the one from
// the reference point I gave you. So take the actual one. And do the same with
// the email marketer. Find the files we use for our website."
const SITE_GROWTH_NOTE = [
  "Morning. Overnight: two replies came in and one meeting landed, Thursday at two with Behan Financial Planning.",
  "Three things need you today. The Kilbrannan terms are waiting on your yes. This week's partner list is built and ready for you to prune. And one broker has asked a pricing question I will not answer for you.",
  "Everything else is handled. Follow-ups sent, the board is current, the forecast is unchanged.",
];

const TEAM: TeamItem[] = [
  {
    id: "ag-leads", num: "01", name: "Lead Finders", short: "new startups, ranked each morning",
    dek: "We build lead finders that watch funding news, published papers and conference lists, and rank the startups by their need for you and their funding stage.",
    fig: () => <IcsLeadFinderWindow />,
    note: "This is how a morning list could read. Every company in it is invented.",
  },
  {
    id: "ag-case", num: "02", name: "Case Study Writers", short: "case studies written from your own work",
    dek: "We build case study writers that turn work you have already done into case studies people can read and share.",
    fig: () => <TypedNote title="Case Study Writer" pill="drafted" subject="Draft case study, Client A" from="Case Study Writer" to="Laura" avatar="CS" items={CASE_STUDY} />,
    note: "This draft is a placeholder. The device and the client are made up, and it is not a real case study.",
  },
  {
    id: "ag-research", num: "03", name: "Research Agents", short: "the morning research note",
    dek: "We build research agents for marketing and sales, working every day, so you're not the bottleneck.",
    fig: () => <TypedNote title="Research Agent" subject="Your research for this morning" from="Research Agent" to="Brendan" avatar="R" items={RESEARCH} />,
    note: "This is how the morning note could read. Fennick Foods and the people in it are invented.",
  },
  {
    id: "ag-growth", num: "04", name: "Growth Agent Team", short: "the pipeline, the outbound, the meetings",
    dek: "We build growth agent teams whose job is to get meetings with prospects in your calendar.",
    fig: () => <JoNote note={SITE_GROWTH_NOTE} title="Growth Agent Team" />,
    note: "This is the growth team's morning note from our own site. The firms and people in it are invented.",
  },
  {
    id: "ag-email", num: "05", name: "Email Marketing Agents", short: "the emails that keep customers",
    dek: "We build email marketing agents that do the whole of lifecycle email, from writing to improving the journeys, every day.",
    fig: () => (
      <WriterEmail
        subject={{ text: "Your renewal is due on 14 September", note: "voice" }}
        body={[
          { text: "Hi Sarah," },
          { text: "Before it renews, we'll quote the market for you.", note: "positioning" },
          { text: "Last year most people in your position paid the price they were sent. It was a bit higher than the year before, and paying it beat a fortnight of forms and four websites asking the same eleven questions." },
          { text: "That increase was never compulsory. It was the cost of staying put.", note: "messaging" },
          { text: "So about three weeks before your date we'll check what everyone else would charge for the same cover. If someone is cheaper, we move you and do the paperwork. If nobody is, you stay where you are. Either way you'll get a note saying what we found and what we chose.", note: "messaging" },
          { text: "The first time we did this, customers saved €187 on average.", note: "proof" },
          { text: "Nothing for you to do.", note: "voice" },
        ]}
        sign={["Aoife", "Kite"]}
      />
    ),
    note: "This is the renewal email from our own site, written for a made-up insurer called Kite. Move over a dotted line and it shows which document that line came from.",
  },
  {
    id: "ag-copy", num: "06", name: "Copywriters", short: "copy written from your own documents",
    dek: "We build copywriters that know the brand's positioning, its audience, its messaging and its tone of voice before they write a word.",
    fig: () => <TypedNote variant="post" title="Copywriter" pill="drafted" from="Brendan Marrinan" role="ICS Medical Devices" avatar="BM" subject="" items={GHOST_POST} />,
    note: "This post is written from what you said on our first call. The words are yours. The copywriter put them in order.",
  },
  {
    id: "ag-cd", num: "07", name: "Creative Directors", short: "the look of the work, held to a standard",
    dek: "We build creative directors that hold every ad, page and picture to the brand's rules and to a standard of craft.",
    fig: () => <CreativeWindow />,
    k: "/our own film.",
    note: (
      <>
        The fox is one filmed clip for each move, cut out and laid on a chart
        drawn in code.{" "}
        <a className="ppug-link" href="https://runwithfoxes.com/how-we-made-it/a-cartoon-fox-that-acts-on-a-chart" target="_blank" rel="noopener noreferrer">
          How we made it
        </a>
      </>
    ),
  },
  {
    id: "ag-search", num: "08", name: "Search Agents", short: "new terms, new ads, live by morning",
    dek: "We build search agents that run paid search every day, the terms, the ads and the bids, without you.",
    fig: () => <IcsSearchWindow />,
    roomy: true,
    note: "This is how a morning could look for a made-up food company called Fennick Foods. Every search term, number and ad in it is invented.",
  },
  {
    id: "ag-ads", num: "09", name: "Advertising Agents", short: "ads written, made, live and remade",
    dek: "We build advertising agents that write, make, put live, read and remake ads, inside Meta or whichever tool you use, without you.",
    fig: () => <AdDeskWindow />,
    roomy: true,
    k: "/real figures.",
    note: "This one is not an example written for you. These are the figures from our own campaign for the free course.",
  },
  {
    id: "ag-web", num: "10", name: "Website Agent Team", short: "a site built with craft, changed by asking",
    dek: "We build well crafted websites and set them up so you can make on-brand changes in a moment, without any design, UX or development knowledge.",
    fig: () => (
      <SiteFilm
        src="/for/unknown-group/nova-scroll.mp4"
        poster="/for/unknown-group/nova-scroll-poster.jpg"
        url="novahcm.ie"
        href="https://novahcm.ie"
        label="The Nova home page being scrolled from top to bottom"
      />
    ),
    k: "/live.",
    note: "Nova is an HR technology advisory firm. This is their new site, which we built. Press the window to open it.",
  },
  {
    id: "ag-guardian", num: "11", name: "Brand Guardians", short: "every file measured against the book",
    dek: "We build brand guardians for brand teams whose stakeholders want speed, so the work stays on brand as it gets faster.",
    fig: () => <GuardianWindow />,
    note: "Tallis is a brand we made up to show this. Drag the line across the ad to see what the guardian measures.",
  },
  {
    id: "ag-manager", num: "12", name: "Campaign Managers", short: "where everything stands",
    dek: "We build campaign managers that keep the marketing on track, either beside you every day or running a team of agents.",
    fig: () => <TypedNote title="Campaign Manager" subject="Where everything stands" from="Campaign Manager" to="Brendan" avatar="CM" items={PM} />,
    note: "This is how a morning note could read. The projects in it are invented.",
  },
  {
    id: "ag-red", num: "13", name: "Red Team", short: "the mistakes, caught before you see them",
    dek: "We build a red team into every team of agents, with one job, to find the mistakes before you do.",
    fig: () => <TypedNote title="Red Team" subject="Six attacks, two broke, one gap" from="Red Team" to="Brendan" avatar="RT" items={REDTEAM} />,
    note: "The mistakes in this note were put there for it to find.",
  },
];

export default function IcsMedicalDoc() {
  return (
    <ProspectShell
      clientName="ICS Medical"
      eyebrow="Prepared for Brendan Marrinan and Laura Fuvessy"
      title={HEADLINE}
      titleHl="before your competitors did"
      standfirst={[]}
      sections={SECTIONS}
      noRail
      topPicture={{
        src: "/for/ics-medical/fox-desk.jpg",
        alt: "The fox sits at a desk in a grey hoodie with a highlighter, going through a news clipping, a chart and a list with lines marked. A catheter lies coiled in a white tray beside him.",
        width: 2400,
        height: 1028,
      }}
    >
      <div className="ppug ppics">
        <PPSection id="heard" k="01" title="What I propose">
          <p className="pps-standfirst">
            There are two ways to start, and you can take either or both.
          </p>
          <p className="pps-standfirst">
            The first is a lead finder. At the LSI conference you put the
            company list into AI and ranked it by need for a catheter and by
            funding stage, and it gave you seven or eight leads and two real
            opportunities. I&apos;d build an agent that does that all the
            time, across funding news, published papers and conference lists.
            It would look hardest for the signal you rate most: a startup that
            has just been funded and whose supplier can&apos;t scale, or one
            that has been making the device itself and now needs it made
            properly. It runs on Claude and holds none of your customer data.
          </p>
          <p className="pps-standfirst">
            The second is a training day for the team, on getting more from
            the tools you already have.
          </p>
        </PPSection>

        {/* WHAT WE DO. Paul's own copy, verbatim, as it ships on Drinkaware. */}
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
            <dl className="ppug-facts">
              <div>
                <dt>Who I work with</dt>
                <dd>
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
                </dd>
              </div>
              <div>
                <dt>Essays</dt>
                <dd>
                  {[
                    ["how-i-build-proactive-agents", "How I build proactive agents"],
                    ["how-i-build-an-ai-writer", "How I build an AI writer"],
                    ["build-a-system", "Build a system"],
                  ].map(([slug, title]) => (
                    <a key={slug} href={`/essays/${slug}`} target="_blank" rel="noopener noreferrer">
                      {title}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Free course</dt>
                <dd>
                  <a href="/course" target="_blank" rel="noopener noreferrer">
                    AI Fluency for Ambitious Marketers
                  </a>
                </dd>
              </div>
              <div>
                <dt>The book</dt>
                <dd>
                  <a href="/book" target="_blank" rel="noopener noreferrer">
                    The Fox Advantage
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="ppug-quotes">
            <figure>
              <blockquote>
                &ldquo;His command of marketing science as well as his instincts
                for great thinking and ideas are, in my opinion, superb.&rdquo;
              </blockquote>
              <figcaption>
                <b>Peter Field</b> The Godfather of Effectiveness, author of
                The Long and the Short of It
              </figcaption>
            </figure>
            <figure>
              <blockquote>
                &ldquo;Paul reported into me as Head of Brand when I was at
                Indeed. I have learned more from him than anyone else in my
                career.&rdquo;
              </blockquote>
              <figcaption>
                <b>Paul D&rsquo;Arcy</b> CMO, Moloco. Former CMO at Miro and
                Indeed
              </figcaption>
            </figure>
          </div>
        </PPSection>

        <PPSection id="pricing" k="03" title="The price">
          <PricingCards
            cards={[
              {
                title: "The lead finder",
                bullets: [],
                price: "€5,000 plus VAT",
                note: "To build.",
              },
              {
                title: "The training day",
                bullets: [],
                price: "€1,000 plus VAT",
              },
            ]}
          />
          <p className="ppp-covers-label">Running it</p>
          <p className="pps-standfirst">
            I&apos;d recommend you get a Claude licence. I&apos;ll build the
            lead finder and transfer it to you, which is the most
            cost-effective way. If you can&apos;t get Claude, the alternative
            is that we run it from my server for €99 a month, and we review
            after three months.
          </p>
        </PPSection>

        <PPSection id="agents" k="04" title="Examples of agents">
          <p className="pps-standfirst ppug-lede">
            Thirteen examples. Move over a name to see that agent at work.
          </p>
        </PPSection>
        <TeamPanel items={TEAM} />
        <div className="ppug-end">
          <CloseBox clientName="ICS Medical" />
        </div>
      </div>
    </ProspectShell>
  );
}
