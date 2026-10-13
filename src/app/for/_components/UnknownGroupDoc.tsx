"use client";

// The proposal for Declan O'Reilly, Group MD of Empathy, part of the Unknown
// group. Call on 8 Oct 2026 (Drive doc 1UftyH3YINLKp2SJ4rscNASUxeiHCAShVL7XYewiRXHE).
// Built from the brief Paul agreed the same evening:
// paul-hub/clients/unknown-group/builds/2026-10-08-proposal-declan/brief.md.
//
// What Paul ruled on 8 Oct, in his words:
// - "they could build an agent-led marketing team ... what if we could hire 10
//   more marketers? What would we get them to do?"
// - "we're not selling agents ... What's on the page is just examples."
// - No brand book is offered. No brand of theirs is put first. A group role.
// - EUR 15,000 plus VAT for about three months, then EUR 3,000 a month, optional.
//
// What he changed on 9 Oct after his first look, in his words:
// - The section is headed "Examples of agents" with nothing written under it.
// - "I want the accordion open with every example, so we don't need an
//   accordion. Just have all the examples, and then on the left on the rail we
//   can just have the agents." So each of the ten is its own section and the
//   rail lists them. The longer parts (the guardian, the writer, the project
//   manager, the one system, the two websites) now sit inside the agent they
//   belong to, so nothing sends the reader to another part of the page.
// - "personalise the examples for unknown ... versus kite in the figures."
// - "We should make a scroller for each of the websites and we're hiding away
//   the design system in little thumbnails. This needs to be brilliant and not
//   hidden away."
// - On the Moloco guardian: "If it's a banner ad, it's not a banner ad shape.
//   It shouldn't be in a figure frame. But also we have 11 different checks
//   that we do. We also have a library of artwork for Moloco and you can't
//   tell which ones are the real ones, which ones we recreated."
// - "Don't hold back ... This is not trying to be concise because we can have
//   each one as a rail ... I want people to be open and explore."
//
// What he changed on 13 Oct, in his words. This REVERSES the 9 Oct "we don't
// need an accordion" above, so do not open the ten agents back up:
// - "I know I said something different before, but can you make these an
//   accordion? I need to find a way to make it neat so they can discover the
//   different agents. The rail still works on the left, but at the moment I
//   find it really hard to look at. One inspiration might be this.
//   https://runwithfoxes.com/read"
//   That accordion was built and lasted an hour. The same afternoon he sent a
//   picture of the homepage's "/the team" panel and changed the format:
// - "do we just change the format? And could you have a section like this?
//   The copy would need to be smaller so you can fit the image in ... basically
//   I can just scroll over each one and see the agent. If you didn't need more
//   space, we could take the rail out altogether." And: "It doesn't need to be
//   in blue and probably shouldn't be in blue. I just think this is a much
//   easier way to see a whole bunch of agents."
//   So the agents are ONE panel: the names on the left, and on the right the
//   window of whichever name the pointer is on. One window each. On cream.
//   The rail is gone.
// - "The Nova website is live and so is the data intelligence. So we don't
//   need to show each of those. We can just give a link to them. Maybe just
//   show one screen grab of each. I would like to show a screen grab of the
//   paint for the data intelligence and some of the image generation for Nova."
// - "I didn't like the chat in the email agent. It was based on asking Kit
//   about our course. It's just very complicated now." Then: "on email, I
//   think one window is fine."
// - "The two major things that's missing is a creative director. And a
//   copywriter ... each have their own window. You can have the creative
//   director showing building the new Foxes digital ad that we did for the
//   60-40 ad." And: "you can replace the ghostwriter with a copywriter."
//   Dray's calls, told to Paul and his to change: the brand guardian is one
//   window too (the Moloco checks, test files and artwork are off the page);
//   the email agent shows the client email and the copywriter shows the post.
//
// The line under each agent's name and its first paragraph are Paul's own
// words from the homepage (AgentsSection.tsx, dictated 6 Sep 2026). The rest of
// the prose is a draft for his pass.
//
// Every picture is imported from ./unknown-group so it gets a hashed name.
// Nothing of Nova's unreleased site sits at a guessable address in public/.

import { useEffect, useRef, useState } from "react";
import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CloseBox } from "./Pricing";
import { WriterEmail } from "./library/WriterPiece";
import { PipelineBoard } from "./library/GrowthManager";
import UnknownSearchWindow from "./library/UnknownSearchWindow";
import TypedNote from "@/components/agents/TypedNote";
import AdDeskWindow from "@/components/agents/AdDeskWindow";
import GuardianWindow from "@/components/agents/GuardianWindow";
import {
  RESEARCH,
  REDTEAM,
  PM,
  GROWTH_PIPELINE,
  GHOST_POST,
} from "./unknown-group-data";
import { PICS } from "./unknown-group/pics";
import "@/components/agents/agents-section.css";
import "./pricing.css";
import "./unknown-group.css";

const SECTIONS = [
  { id: "heard", title: "What I propose" },
  { id: "howiwork", title: "What we do" },
  { id: "agents", title: "Examples of agents" },
  { id: "websites", title: "Two websites we built" },
  { id: "hub", title: "A content hub" },
  { id: "howitworks", title: "How it would work" },
  { id: "pricing", title: "The price" },
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

function P({ children }: { children: React.ReactNode }) {
  return <p className="pps-standfirst">{children}</p>;
}

function Note({ k = "/example.", children }: { k?: string; children: React.ReactNode }) {
  return (
    <p className="ppug-note">
      <span className="ppug-slash">{k}</span> {children}
    </p>
  );
}

function Pic({ name, alt, className }: { name: string; alt: string; className?: string }) {
  const p = PICS[name];
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={p.src} width={p.width} height={p.height} alt={alt} loading="lazy" />;
}

// A whole website in a browser window. Each tab is one real page, photographed
// from top to bottom, and the reader scrolls it inside the window.
type SitePage = { label: string; pic: string; url: string; href?: string };
function SiteScroller({ pages, pill, what }: { pages: SitePage[]; pill: string; what: string }) {
  const [i, setI] = useState(0);
  const view = useRef<HTMLDivElement>(null);
  const pg = pages[i];
  const go = (n: number) => {
    setI(n);
    if (view.current) view.current.scrollTop = 0;
  };
  return (
    <div className="ppug-site">
      <div className="ppug-site-bar">
        <span className="ppug-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ppug-site-url">{pg.url}</span>
        <span className="ppug-site-pill">{pill}</span>
      </div>
      <div className="ppug-site-tabs" role="tablist" aria-label={what}>
        {pages.map((p, n) => (
          <button
            key={p.pic}
            type="button"
            role="tab"
            aria-selected={n === i}
            data-on={n === i ? "1" : "0"}
            onClick={() => go(n)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="ppug-site-view" ref={view} tabIndex={0} aria-label={`${what}: ${pg.label}, scroll to read`}>
        <Pic name={pg.pic} alt={`${what}: ${pg.label}`} />
      </div>
      <p className="ppug-site-foot">
        <span>scroll inside the window &darr;</span>
        <span>
          {i + 1} of {pages.length} pages
          {pg.href && (
            <>
              {" "}
              &middot;{" "}
              <a href={pg.href} target="_blank" rel="noopener noreferrer">
                open the live page
              </a>
            </>
          )}
        </span>
      </p>
    </div>
  );
}





const HUB_PAGES: SitePage[] = [
  { label: "A research report", pic: "full-rwf-report-ai-ask", url: "runwithfoxes.com/resources/the-ai-ask/2026-q3", href: "https://runwithfoxes.com/resources/the-ai-ask/2026-q3" },
  { label: "Research nuggets", pic: "full-rwf-nuggets", url: "runwithfoxes.com/research-nuggets", href: "https://runwithfoxes.com/research-nuggets" },
  { label: "One nugget", pic: "full-rwf-nugget", url: "runwithfoxes.com/research-nuggets", href: "https://runwithfoxes.com/research-nuggets/job-ads-want-ai-for-speed" },
  { label: "The diary", pic: "full-rwf-diary", url: "runwithfoxes.com/diary", href: "https://runwithfoxes.com/diary" },
  { label: "Essays", pic: "full-rwf-essays", url: "runwithfoxes.com/essays", href: "https://runwithfoxes.com/essays" },
];


const PAINTS_SHOWN = [
  "01-hammock", "03-sail", "06-cloud-on-a-lead", "09-piggy-deckchair",
  "14-compass", "16-lighthouse-day", "17-high-board", "19-goldfish-pond",
];

// One page of a live site in a browser window, the whole window a link to it.
function SiteShot({ pic, url, href, alt }: { pic: string; url: string; href: string; alt: string }) {
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
      <Pic name={pic} alt={alt} />
    </a>
  );
}

// The creative director's window: our own 60:40 ad as it was built. Three
// frames of the film in order, one of the banner sizes, and the three rules it
// was held to. The rules are the ones written down for this ad in the fox-ads
// CONTEXT.md ("Key Decisions"): one thought a frame, the number sized with
// room round it, and the chart becoming one split bar on a thin strip.
function CreativeWindow() {
  const frames: [string, string, string][] = [
    ["fox-6040-1", "01", "The line"],
    ["fox-6040-2", "02", "The proof"],
    ["fox-6040-3", "03", "The ask"],
  ];
  return (
    <div className="ppug-site ppug-cd">
      <div className="ppug-site-bar">
        <span className="ppug-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ppug-cd-title">Creative Director · the 60:40 ad</span>
        <span className="ppug-site-pill">approved</span>
      </div>
      <div className="ppug-cd-body">
        <div className="ppug-cd-frames">
          {frames.map(([pic, n, what]) => (
            <figure key={pic}>
              <Pic name={pic} alt={`Frame ${n} of the ad: ${what.toLowerCase()}`} />
              <figcaption>
                <span className="ppug-n">{n}</span> {what}
              </figcaption>
            </figure>
          ))}
        </div>
        <figure className="ppug-cd-band">
          <Pic name="fox-6040-band" alt="The same ad laid out again as a wide banner" />
          <figcaption>
            <span className="ppug-n">04</span> The same ad as a banner, 970 by 250
          </figcaption>
        </figure>
        <ul className="ppug-cd-notes">
          <li>
            <b>One thought a frame.</b> The line, then the chart that proves
            it, then the ask.
          </li>
          <li>
            <b>Room round the number.</b> 60:40 is sized to have space about
            it and never runs edge to edge.
          </li>
          <li>
            <b>Laid out again for every size.</b> On a thin strip the chart
            becomes one bar split 60 to 40. It is never just made smaller.
          </li>
        </ul>
      </div>
    </div>
  );
}

// The eleven, in the homepage's order with two added. The line under each
// name is Paul's own from the homepage (AgentsSection.tsx, dictated 6 Sep
// 2026), except the copywriter's and the creative director's, which are
// Dray's drafts for his pass. The few words beside each name are the
// homepage's, and Dray's for the same two.
const TEAM: TeamItem[] = [
  {
    id: "ag-research", num: "01", name: "Research Agents", short: "the morning research note",
    dek: "We build research agents for marketing and sales, working every day, so you're not the bottleneck.",
    fig: () => <TypedNote title="Research Agent" subject="Your research for Monday" from="Research Agent" to="Declan" avatar="R" items={RESEARCH} />,
    note: "This is how the morning note could read for the group. Harbour Foods and the people in it are invented.",
  },
  {
    id: "ag-growth", num: "02", name: "Growth Agent Team", short: "the pipeline, the outbound, the meetings",
    dek: "We build growth agent teams whose job is to get meetings with prospects in your calendar.",
    fig: () => <PipelineBoard deals={GROWTH_PIPELINE} width={806} pill="kept current every morning" />,
    note: "One board for all four brands is where a chance for Empathy to bring Salience to a client shows up. The companies and people on this board are invented.",
  },
  {
    id: "ag-email", num: "03", name: "Email Marketing Agents", short: "the emails that keep customers",
    dek: "We build email marketing agents that do the whole of lifecycle email, from writing to improving the journeys, every day.",
    fig: () => (
      <WriterEmail
        subject={{ text: "One thing in your results that nobody asked us about", note: "voice" }}
        body={[
          { text: "Hi Sarah," },
          { text: "You asked us one question in the spring, and the answer is in the report you have." },
          { text: "There was a second answer in the same data, to a question nobody asked.", note: "positioning" },
          {
            text: "The people who stopped buying from you last year did not go to a competitor. Most of them still rate you above everyone else. They stopped buying the category.",
          },
          { text: "It was in plain sight in the numbers. Nobody saw it because the brief was about your competitors.", note: "messaging" },
          { text: "It shows up in three of the last four waves.", note: "proof" },
          { text: "I'd like twenty minutes to show you. No slides.", note: "voice" },
        ]}
        sign={["Declan", "Empathy"]}
      />
    ),
    note: "The client and the finding in this email are invented. The idea of an answer hiding in plain sight is yours, from the call. Move over a dotted line and it shows which document that line came from.",
  },
  {
    id: "ag-copy", num: "04", name: "Copywriters", short: "copy written from your own documents",
    dek: "We build copywriters that know the brand's positioning, its audience, its messaging and its tone of voice before they write a word.",
    fig: () => <TypedNote variant="post" title="Copywriter" pill="drafted" from="Declan O'Reilly" role="Group MD, Empathy" avatar="DO" subject="" items={GHOST_POST} />,
    note: "This post is written from what you said on our call about the name. The words are yours. The copywriter put them in order.",
  },
  {
    id: "ag-cd", num: "05", name: "Creative Directors", short: "the look of the work, held to a standard",
    dek: "We build creative directors that hold every ad, page and picture to the brand's rules and to a standard of craft.",
    fig: () => <CreativeWindow />,
    k: "/our own ad.",
    note: "This is an ad for Run with Foxes, on the 60:40 split between brand building and sales activation. The frames are from the approved film.",
  },
  {
    id: "ag-search", num: "06", name: "Search Agents", short: "new terms, new ads, live by morning",
    dek: "We build search agents that run paid search every day, the terms, the ads and the bids, without you.",
    fig: () => <UnknownSearchWindow />,
    roomy: true,
    note: "This is how a morning could look for Empathy. Every search term, number and ad in it is invented.",
  },
  {
    id: "ag-ads", num: "07", name: "Advertising Agents", short: "ads written, made, live and remade",
    dek: "We build advertising agents that write, make, put live, read and remake ads, inside Meta or whichever tool you use, without you.",
    fig: () => <AdDeskWindow />,
    roomy: true,
    k: "/real figures.",
    note: "This one is not an example written for you. These are the figures from our own campaign for the free course.",
  },
  {
    id: "ag-web", num: "08", name: "Website Agent Team", short: "a site built with craft, changed by asking",
    dek: "We build well crafted websites and set them up so you can make on-brand changes in a moment, without any design, UX or development knowledge.",
    fig: () => <SiteShot pic="di-home" url="dataintelligence.com" href="https://www.dataintelligence.com" alt="The Data Intelligence home page" />,
    k: "/live.",
    note: "The Data Intelligence site. It and Nova's are both below, with the paintings and pictures made for them.",
  },
  {
    id: "ag-guardian", num: "09", name: "Brand Guardians", short: "every file measured against the book",
    dek: "We build brand guardians for brand teams whose stakeholders want speed, so the work stays on brand as it gets faster.",
    fig: () => <GuardianWindow />,
    note: "Tallis is a brand we made up to show this. Drag the line across the ad to see what the guardian measures.",
  },
  {
    id: "ag-manager", num: "10", name: "Campaign Managers", short: "where everything stands",
    dek: "We build campaign managers that keep the marketing on track, either beside you every day or running a team of agents.",
    fig: () => <TypedNote title="Campaign Manager" subject="Where everything stands, Monday" from="Campaign Manager" to="Declan" avatar="CM" items={PM} />,
    note: "This is how a Monday note could read for the group. The projects in it are invented.",
  },
  {
    id: "ag-red", num: "11", name: "Red Team", short: "the mistakes, caught before you see them",
    dek: "We build a red team into every team of agents, with one job, to find the mistakes before you do.",
    fig: () => <TypedNote title="Red Team" subject="Six attacks, two broke, one gap" from="Red Team" to="Declan" avatar="RT" items={REDTEAM} />,
    note: "The mistakes in this note were put there for it to find.",
  },
];

export default function UnknownGroupDoc() {
  return (
    <ProspectShell
      clientName="Unknown group"
      eyebrow="Prepared for Declan O'Reilly"
      title="What would you do with ten more marketers?"
      titleHl="ten more marketers"
      standfirst={[]}
      sections={SECTIONS}
      noRail
      topPicture={{
        src: "/for/unknown-group/fox-whiteboard.jpg",
        alt: "The fox standing on a box at a whiteboard, pointing a marker at the word Unknown",
        width: 2400,
        height: 1029,
      }}
    >
      <div className="ppug">
        <PPSection id="heard" k="01" title="What I propose">
          <p className="pps-standfirst">
            My proposal is this. I take on a fractional-CMO role for about
            three months. It is part time, and I would work alongside you and
            your team. We&apos;d focus on outcomes. Essentially, I&apos;d do
            what I&apos;d done many times before - figure out what needs to be
            done based on a strategy or plan, resource this, put measures in
            place and execute.
          </p>
          <p className="pps-standfirst">
            The only difference versus the past two decades, is using AI
            Agents instead of hires for as much as possible. And it is a lot.
            I&apos;ve spent the past three years training AI and now agents to
            create high quality marketing communications, and I hold them to
            the same bar I do when I ran teams and worked with agencies.
          </p>
          <p className="pps-standfirst">
            We should be very ambitious. Getting a couple of agents to do what
            a small team could do is table stakes. I&apos;m interested in
            building proper agent-led marketing functions, with the equivalent
            of 10 or 20 different agents? If you had 10-20 more marketers,
            what would you get them to do?
          </p>
          <p className="pps-standfirst">
            Below is a list of examples. They are agents, websites and content
            we have built for ourselves and for other companies, here so that
            you can see what is possible and the standard of it.
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
                    ["how-i-build-proactive-agents", "How I build proactive agents"],
                    ["how-i-build-an-ai-writer", "How I build an AI writer"],
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

        <PPSection id="agents" k="03" title="Examples of agents">
          <p className="pps-standfirst ppug-lede">
            Eleven of them. Move over a name to see that agent at work.
          </p>
        </PPSection>
        <TeamPanel items={TEAM} />

        <PPSection id="websites" k="04" title="Two websites we built">
          <p className="pps-standfirst ppug-lede">
            These are two sites we built in code for other companies. Both are
            live. In both, the look is written down as rules, and those rules
            are what keep a change made months later, by someone on their own
            team, looking like the same company.
          </p>

          <div className="ppug-web">
            <div className="ppug-web-text">
              <h3 className="ppug-h3">Data Intelligence</h3>
              <P>
                Data Intelligence is Dave Hackett&rsquo;s company. He had no
                senior marketer and wanted to move quickly, so I worked out
                the marketing with him and then built it. The old site was in
                Framer. We rebuilt it in code so that his team can change it
                by asking. Adding a pricing page, for example, is about ten
                minutes of work that doesn&rsquo;t need a designer.
              </P>
              <p className="ppug-open">
                <a className="ppug-link" href="https://www.dataintelligence.com" target="_blank" rel="noopener noreferrer">
                  Open dataintelligence.com
                </a>
              </p>
            </div>
            <SiteShot pic="di-home" url="dataintelligence.com" href="https://www.dataintelligence.com" alt="The Data Intelligence home page" />
          </div>
          <p className="ppug-k">The artwork: eight of the twenty paintings</p>
          <p className="pps-standfirst ppug-lede">
            Every picture on the site and in the decks is a painting from one
            family. There are twenty so far. They are made to one written
            description, so a new one made next year by someone on the team
            will sit beside these and look like the same company.
          </p>
          <div className="ppug-paints">
            {PAINTS_SHOWN.map((n) => (
              <Pic key={n} name={`di-paint-${n}`} alt="A painting made for Data Intelligence" />
            ))}
          </div>

          <div className="ppug-web">
            <div className="ppug-web-text">
              <h3 className="ppug-h3">Nova</h3>
              <P>
                Nova is an HR technology advisory firm led by Cian Collins.
                This is their new site. The look started from the name, which
                gave us a north star: one sky, one point of light in every
                picture, and the same star over every city they work in.
              </P>
              <p className="ppug-open">
                <a className="ppug-link" href="https://novahcm.ie" target="_blank" rel="noopener noreferrer">
                  Open novahcm.ie
                </a>
              </p>
            </div>
            <SiteShot pic="nova-home" url="novahcm.ie" href="https://novahcm.ie" alt="The Nova home page" />
          </div>
          <p className="ppug-k">The pictures: made for Nova, one for each city</p>
          <div className="ppug-wideshot">
            <Pic name="nova-brand-photography-2" alt="Six city skylines made for Nova, each under the same blue sky with one point of light" />
          </div>

          <p className="pps-standfirst ppug-lede ppug-after">
            The Website Agent Team is not five agents. It is the five parts of
            the work, which are the positioning and messaging framework, the
            UX and the navigation, the copywriting, the artwork, and then the
            design, the building and the deploying. The most important thing
            we do comes after the build. We set the site up so that anyone on
            your team, with no expertise, can make changes. Those changes are
            fast, they are on brand, and they look good.
          </p>
        </PPSection>

        <PPSection id="hub" k="05" title="A content hub">
          <p className="pps-standfirst">
            Our own site is an example of a content hub. We have a research
            agent that writes a case study every day. We have a diary agent
            that writes about how the team of agents works. I write an
            essay every few days, and the large research reports have started,
            with at least one a month planned. None of this takes much of my time, and the
            quality is good.
          </p>
          <SiteScroller pages={HUB_PAGES} pill="live" what="runwithfoxes.com" />
          <ul className="ppug-rules ppug-hub-list">
            <li>
              <span className="ppug-n">01</span>
              <span>
                <b>Research reports</b>
                <span className="ppug-rule-d">
                  The first large report is out. It counts how many Irish
                  marketing and sales job ads ask for AI. Two more are on the
                  way, and the plan is at least one a month.
                </span>
              </span>
            </li>
            <li>
              <span className="ppug-n">02</span>
              <span>
                <b>Research nuggets</b>
                <span className="ppug-rule-d">
                  A research agent writes a short piece every day on one
                  paper, case or study, with the source checked.
                </span>
              </span>
            </li>
            <li>
              <span className="ppug-n">03</span>
              <span>
                <b>The diary</b>
                <span className="ppug-rule-d">
                  One of the agents writes about how the team of agents works,
                  what went wrong and what was changed.
                </span>
              </span>
            </li>
            <li>
              <span className="ppug-n">04</span>
              <span>
                <b>Essays</b>
                <span className="ppug-rule-d">
                  My own essays on marketing and AI, every few days.
                </span>
              </span>
            </li>
          </ul>
          <p className="pps-standfirst" style={{ marginTop: 34 }}>
            For a group whose business is what it knows, this is where the
            ambition comes in. The question to ask is what you would bring to
            the market if you had a team of twenty-five analysts and
            researchers creating content all day.
          </p>
        </PPSection>

        <PPSection id="howitworks" k="06" title="How it would work">
          <p className="pps-standfirst">
            The upfront work would take about three months. We would start
            from the marketing plan you already have, and agree with you what
            to build first, for one brand or for all four. I would then
            build it, test it with whoever makes the decisions on your side
            until the work is right, and train the people who will use it.
          </p>
          <p className="pps-standfirst">
            You said you will probably hire a marketer as well. Whoever joins
            would have the agents behind them from their first day.
          </p>
          <p className="pps-standfirst">
            After the three months you may want me to stay on, for project
            work or to help build new things. That part is optional.
          </p>
        </PPSection>

        <PPSection id="pricing" k="07" title="The price">
          <PricingCards
            cards={[
              {
                title: "Three months with the group",
                bullets: [
                  "Paul as your fractional CMO for about three months",
                  "Agreeing with you what to build, for one brand or all four",
                  "Building the agents and testing them with you",
                  "Training the people who will use them",
                ],
                price: "€15,000 plus VAT",
                note: "For the upfront work, about three months.",
              },
            ]}
          />
          <p className="pps-standfirst" style={{ marginTop: 30, marginBottom: 34 }}>
            After that, if you would like me to stay on for project work or
            to help build new things, it would be €3,000 a month. That part
            is optional.
          </p>
          <CloseBox clientName="Unknown group" />
        </PPSection>
      </div>
    </ProspectShell>
  );
}
