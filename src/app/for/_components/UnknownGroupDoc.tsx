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

import { useEffect, useState } from "react";
import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CloseBox } from "./Pricing";
import { WriterEmail } from "./library/WriterPiece";
import { JoNote } from "./library/GrowthManager";
import UnknownSearchWindow from "./library/UnknownSearchWindow";
import TypedNote from "@/components/agents/TypedNote";
import AdDeskWindow from "@/components/agents/AdDeskWindow";
import GuardianWindow from "@/components/agents/GuardianWindow";
import {
  RESEARCH,
  REDTEAM,
  PM,
  GHOST_POST,
} from "./unknown-group-data";
import "@/components/agents/agents-section.css";
import "./pricing.css";
import "./unknown-group.css";

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
    id: "ag-research", num: "01", name: "Research Agents", short: "the morning research note",
    dek: "We build research agents for marketing and sales, working every day, so you're not the bottleneck.",
    fig: () => <TypedNote title="Research Agent" subject="Your research for Monday" from="Research Agent" to="Declan" avatar="R" items={RESEARCH} />,
    note: "This is how the morning note could read for the group. Harbour Foods and the people in it are invented.",
  },
  {
    id: "ag-growth", num: "02", name: "Growth Agent Team", short: "the pipeline, the outbound, the meetings",
    dek: "We build growth agent teams whose job is to get meetings with prospects in your calendar.",
    fig: () => <JoNote note={SITE_GROWTH_NOTE} title="Growth Agent Team" />,
    note: "This is the growth team's morning note from our own site. The firms and people in it are invented.",
  },
  {
    id: "ag-email", num: "03", name: "Email Marketing Agents", short: "the emails that keep customers",
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
    id: "ag-copy", num: "04", name: "Copywriters", short: "copy written from your own documents",
    dek: "We build copywriters that know the brand's positioning, its audience, its messaging and its tone of voice before they write a word.",
    fig: () => <TypedNote variant="post" title="Copywriter" pill="drafted" from="Declan O'Reilly" role="Group MD, Empathy" avatar="DO" subject="" items={GHOST_POST} />,
    note: "This post is written from what you said on our call about the name. The words are yours. The copywriter put them in order.",
  },
  {
    id: "ag-cd", num: "05", name: "Creative Directors", short: "the look of the work, held to a standard",
    dek: "We build creative directors that hold every ad, page and picture to the brand's rules and to a standard of craft.",
    fig: () => <CreativeWindow />,
    k: "/our own film.",
    note: (
      <>
        The fox is one filmed clip for each move, cut out and laid on a chart
        drawn in code.{" "}
        <a className="ppug-link" href="https://runwithfoxes.com/craft/a-cartoon-fox-that-acts-on-a-chart" target="_blank" rel="noopener noreferrer">
          How we made it
        </a>
      </>
    ),
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
        src: "/for/unknown-group/fox-desk.jpg",
        alt: "The fox in a grey hoodie at a desk under a lamp, working through a marketing plan, with a sheet beside him that reads Unknown",
        width: 2400,
        height: 1028,
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

        {/* The price sits straight after the bio, and the agents close the
            page (Paul, 13 Oct: "after the agents take off everything and put
            the price at top after my bio"). The two websites, the content hub
            and "How it would work" came off with that. */}
        <PPSection id="pricing" k="03" title="The price">
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
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            After that, if you would like me to stay on for project work or
            to help build new things, it would be €3,000 a month. That part
            is optional.
          </p>
        </PPSection>

        <PPSection id="agents" k="04" title="Examples of agents">
          <p className="pps-standfirst ppug-lede">
            Eleven of them. Move over a name to see that agent at work.
          </p>
        </PPSection>
        <TeamPanel items={TEAM} />
        <div className="ppug-end">
          <CloseBox clientName="Unknown group" />
        </div>
      </div>
    </ProspectShell>
  );
}
