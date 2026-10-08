"use client";

// The proposal for Declan O'Reilly, Group MD of Empathy, part of the Unknown
// group. Call on 8 Oct 2026 (Drive doc 1UftyH3YINLKp2SJ4rscNASUxeiHCAShVL7XYewiRXHE).
// Built from the brief Paul agreed the same evening:
// paul-hub/clients/unknown-group/builds/2026-10-08-proposal-declan/brief.md.
//
// What Paul ruled, in his words:
// - "they could build an agent-led marketing team ... what if we could hire 10
//   more marketers? What would we get them to do?"
// - "we're not selling agents ... What's on the page is just examples."
// - No brand book is offered. No brand of theirs is put first. A group role.
// - All ten agents from the homepage go in, with more room for the brand
//   guardian (Moloco's, laid out the way the Sabre one was), a writer, and a
//   project manager, then a short part on proactive agents from his essay.
// - System thinking, with the course as the example. No course member named.
// - The new Nova site and the live Data Intelligence site, with the design
//   system for each shown as how the site was made.
// - His own site as a content hub.
// - EUR 15,000 plus VAT for about three months, then EUR 3,000 a month, optional.
//
// The ten agents' words are Paul's own from the homepage (AgentsSection.tsx,
// dictated 6 Sep 2026): the line under each name and its first paragraph. The
// rest of the prose on this page is a draft for his pass.
//
// The pictures are imported from ./unknown-group so they get hashed names.
// Nothing of Nova's unreleased site sits at a guessable address in public/.

import { useState } from "react";
import type { StaticImageData } from "next/image";
import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CloseBox } from "./Pricing";
import { ScaledWindow, TerminalWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import { PipelineBoard, JoNote } from "./library/GrowthManager";
import MolocoGuardian from "./library/MolocoGuardian";
import TypedNote from "@/components/agents/TypedNote";
import SearchAgentWindow from "@/components/agents/SearchAgentWindow";
import AdDeskWindow from "@/components/agents/AdDeskWindow";
import {
  RESEARCH,
  REDTEAM,
  PM,
  GROWTH_NOTE,
  GROWTH_PIPELINE,
  GHOST_POST,
} from "./unknown-group-data";
import novaHome from "./unknown-group/nova-home.jpg";
import novaSelection from "./unknown-group/nova-selection.jpg";
import novaLook from "./unknown-group/nova-brand-look.jpg";
import novaPhoto from "./unknown-group/nova-brand-photography-2.jpg";
import novaSystem from "./unknown-group/nova-brand-system-2.jpg";
import diHome from "./unknown-group/di-home.jpg";
import diProduct from "./unknown-group/di-product.jpg";
import diCover from "./unknown-group/di-guide-cover.jpg";
import diColour from "./unknown-group/di-guide-colour.jpg";
import diParts from "./unknown-group/di-guide-components.jpg";
import rwfReports from "./unknown-group/rwf-reports.jpg";
import rwfNuggets from "./unknown-group/rwf-nuggets.jpg";
import rwfDiary from "./unknown-group/rwf-diary.jpg";
import rwfEssays from "./unknown-group/rwf-essays.jpg";
import rwfCourse from "./unknown-group/rwf-course.jpg";
import "@/components/agents/agents-section.css";
import "./pricing.css";
import "./unknown-group.css";

const SECTIONS = [
  { id: "heard", title: "What we propose" },
  { id: "howiwork", title: "What we do" },
  { id: "agents", title: "Ten agents we have built" },
  { id: "guardian", title: "A brand guardian" },
  { id: "writer", title: "A writer" },
  { id: "manager", title: "A project manager, and agents that follow things through" },
  { id: "system", title: "One connected system" },
  { id: "websites", title: "Two websites, and how each was made" },
  { id: "hub", title: "A content hub" },
  { id: "howitworks", title: "How it would work" },
  { id: "pricing", title: "The price" },
];

const RAIL_GROUPS = [
  {
    label: "/the proposal",
    entries: [
      { id: "heard", title: "What we propose", num: "01" },
      { id: "howiwork", title: "What we do", num: "02" },
    ],
  },
  {
    label: "/examples",
    entries: [
      { id: "agents", title: "Ten agents we have built", num: "03" },
      { id: "guardian", title: "A brand guardian", num: "04" },
      { id: "writer", title: "A writer", num: "05" },
      { id: "manager", title: "A project manager", num: "06" },
      { id: "system", title: "One connected system", num: "07" },
      { id: "websites", title: "Two websites", num: "08" },
      { id: "hub", title: "A content hub", num: "09" },
    ],
  },
  {
    label: "/how and how much",
    entries: [
      { id: "howitworks", title: "How it would work", num: "10" },
      { id: "pricing", title: "The price", num: "11" },
    ],
  },
];

// The ten, in the homepage's order. `dek` and `first` are Paul's own words
// from the homepage. `jump` sends the reader to the section on this page that
// shows that agent at more length.
type Row = {
  num: string;
  name: string;
  short: string;
  dek: string;
  first?: string;
  fig?: () => React.ReactNode;
  jump?: { id: string; label: string };
};

const ROWS: Row[] = [
  {
    num: "01",
    name: "Research Agents",
    short: "the morning research note",
    dek: "We build research agents for marketing and sales, working every day, so you're not the bottleneck.",
    first:
      "We build a team of research agents that find that information for you on their own, every day. They work as a team, and you are not the bottleneck in it. They can research competitors. They can research prices. They can watch the things that change on a regular basis and tell you when they do.",
    fig: () => (
      <TypedNote title="Research Agent" subject="Your research for Monday" from="Research Agent" avatar="R" items={RESEARCH} />
    ),
  },
  {
    num: "02",
    name: "Growth Agent Team",
    short: "the pipeline, the outbound, the meetings",
    dek: "We build growth agent teams whose job is to get meetings with prospects in your calendar.",
    first:
      "We build the Growth Agent Team to get meetings with prospects booked in your calendar. That is the end game, and every task the team does is in service of it. Once we have built it, and built it carefully, the team works away every day without you being the bottleneck.",
    fig: () => (
      <>
        <JoNote note={GROWTH_NOTE} title="Growth Agent Team" />
        <div style={{ marginTop: 22 }} />
        <PipelineBoard deals={GROWTH_PIPELINE} width={806} pill="kept current every morning" />
      </>
    ),
  },
  {
    num: "03",
    name: "Email Marketing Agents",
    short: "the emails that keep customers",
    dek: "We build email marketing agents that do the whole of lifecycle email, from writing to improving the journeys, every day.",
    jump: { id: "system", label: "shown working below" },
  },
  {
    num: "04",
    name: "Ghostwriters",
    short: "posts and articles in your voice",
    dek: "We build ghostwriters that get a founder's point of view onto LinkedIn and into longer articles, every week, in their own words.",
    first:
      "We build ghostwriters that let a founder or a senior exec get their opinion and their point of view across on LinkedIn, or in deeper articles, on an ongoing basis. It finds the material, structures it and writes it. What the founder does is open their laptop and find a handful of pieces that are ninety percent written. Usually it is a small bit of editing, then approve, and depending on how it is set up, the piece goes live.",
    fig: () => (
      <TypedNote variant="post" title="Ghostwriter" pill="drafted" from="Aoife Mulcair" role="Founder, Kite Insurance" avatar="AM" subject="" items={GHOST_POST} />
    ),
  },
  {
    num: "05",
    name: "Search Agents",
    short: "paid search, run every day",
    dek: "We build search agents that run paid search every day, the terms, the ads and the bids, without you.",
    first:
      "We build search agents that take the daily work of paid search off you. Finding the terms, writing the ads, putting them live, reading the numbers and improving the account. Once we have built it, it works away every day without you being the bottleneck.",
    fig: () => <SearchAgentWindow />,
  },
  {
    num: "06",
    name: "Advertising Agents",
    short: "ads written, made, live and remade",
    dek: "We build advertising agents that write, make, put live, read and remake ads, inside Meta or whichever tool you use, without you.",
    first:
      "We build advertising agents that do the work inside Meta, or another advertising tool, that used to be a full-time role or an agency. Once we have set it up properly, it works away every day without you being the bottleneck.",
    fig: () => <AdDeskWindow />,
  },
  {
    num: "07",
    name: "Website Agent Team",
    short: "a site built with craft, changed by asking",
    dek: "We build well crafted websites and set them up so you can make on-brand changes in a moment, without any design, UX or development knowledge.",
    jump: { id: "websites", label: "two real sites below" },
  },
  {
    num: "08",
    name: "Brand Guardians",
    short: "every file measured against the book",
    dek: "We build brand guardians for brand teams whose stakeholders want speed, so the work stays on brand as it gets faster.",
    jump: { id: "guardian", label: "shown at more length below" },
  },
  {
    num: "09",
    name: "Campaign Managers",
    short: "where everything stands",
    dek: "We build campaign managers that keep the marketing on track, either beside you every day or running a team of agents.",
    jump: { id: "manager", label: "shown at more length below" },
  },
  {
    num: "10",
    name: "Red Team",
    short: "the mistakes, caught before you see them",
    dek: "We build a red team into every team of agents, with one job, to find the mistakes before you do.",
    first:
      "Nobody asks for a red team, so we build one into every team of agents we make. Its only job is to find the holes, the gaps and the mistakes in everything the other agents do. In their role specs, in the quality of what they produce, and in the processes themselves.",
    fig: () => (
      <TypedNote title="Red Team" subject="Six attacks, two broke, one gap" from="Red Team" avatar="RT" items={REDTEAM} />
    ),
  },
];

function TenAgents() {
  const [open, setOpen] = useState(0);
  return (
    <ul className="ppug-list">
      {ROWS.map((r, i) => {
        const isOpen = !r.jump && open === i;
        return (
          <li key={r.num} className="ppug-row" data-open={isOpen ? "1" : "0"}>
            {r.jump ? (
              <a className="ppug-btn" href={`#${r.jump.id}`}>
                <span className="ppug-n">{r.num}</span>
                <span>
                  <span className="ppug-name">{r.name}</span>
                  <span className="ppug-short">{r.short}</span>
                </span>
                <span className="ppug-go">{r.jump.label} &darr;</span>
              </a>
            ) : (
              <button
                type="button"
                className="ppug-btn"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="ppug-n">{r.num}</span>
                <span>
                  <span className="ppug-name">{r.name}</span>
                  <span className="ppug-short">{r.short}</span>
                </span>
                <span className="ppug-go">{isOpen ? "close" : "see it"}</span>
              </button>
            )}
            {isOpen && (
              <div className="ppug-open">
                <p className="pps-standfirst">{r.dek}</p>
                {r.first && <p className="pps-standfirst">{r.first}</p>}
                {r.fig && <figure className="ag-fig">{r.fig()}</figure>}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// A picture of a real page inside the same window frame the other exhibits
// use. With an href the whole picture opens the live page in a new tab.
function Shot({
  src,
  alt,
  label,
  pill,
  href,
}: {
  src: StaticImageData;
  alt: string;
  label: string;
  pill: string;
  href?: string;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={src.src} width={src.width} height={src.height} alt={alt} loading="lazy" />;
  return (
    <div className="ppug-shot">
      <ScaledWindow width={940}>
        <div className="ppw-blueprint">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">{label}</span>
              <span className="ppw-live-pill">{pill}</span>
            </div>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {img}
              </a>
            ) : (
              img
            )}
          </div>
        </div>
      </ScaledWindow>
    </div>
  );
}

function Three({ items }: { items: { src: StaticImageData; alt: string }[] }) {
  return (
    <div className="ppug-three">
      {items.map((it) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={it.src.src} src={it.src.src} width={it.src.width} height={it.src.height} alt={it.alt} loading="lazy" />
      ))}
    </div>
  );
}

const HUB = [
  {
    src: rwfReports,
    href: "https://runwithfoxes.com/resources/reports",
    title: "Research reports",
    text: "The first large report is out. It counts how many Irish marketing and sales job ads ask for AI. Two more are on the way, and the plan is at least one a month.",
  },
  {
    src: rwfNuggets,
    href: "https://runwithfoxes.com/research-nuggets",
    title: "Research nuggets",
    text: "A research agent writes a short piece every day on one paper, case or study, with the source checked.",
  },
  {
    src: rwfDiary,
    href: "https://runwithfoxes.com/diary",
    title: "The diary",
    text: "One of the agents writes about how the team of agents works, what went wrong and what was changed.",
  },
  {
    src: rwfEssays,
    href: "https://runwithfoxes.com/essays",
    title: "Essays",
    text: "Paul's own essays on marketing and AI, every few days.",
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
      railGroups={RAIL_GROUPS}
    >
      <div className="ppug">
        <PPSection id="heard" k="01" title="What we propose">
          <p className="pps-standfirst">
            We propose to work with the group for about three months, to help
            you build a marketing team led by agents. Agents save time and
            money, and that matters. We think the more useful way to look at
            them is to be ambitious and ask a different question. If you could
            hire ten more marketers, what would you get them to do? That is
            the work we would build agents to do.
          </p>
          <p className="pps-standfirst">
            Paul&rsquo;s part is the fundamentals of marketing and the craft.
            He would work out with you what good looks like for each brand,
            build the agents to that standard, and keep working on them until
            he is happy with the quality. You can start from nothing. You do
            need one person with good judgment who sets the bar, and for these
            three months that would be Paul.
          </p>
          <p className="pps-standfirst">
            This is a role for the group. You may decide to start with one
            brand or with all four, and that is yours to decide.
          </p>
          <p className="pps-standfirst">
            Everything below is an example. They are agents, websites and
            content we have built for ourselves and for other companies, here
            so that you can see what is possible and the standard of it. None
            of it is a list of things to buy. What we would build for the
            group is something we would work out together.
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

        <PPSection id="agents" k="03" title="Ten agents we have built">
          <p className="pps-standfirst">
            These are the ten kinds of agent on our own site. Each one does
            work that used to need a person, a team or an agency. Four are
            shown at more length further down the page.
          </p>
          <TenAgents />
          <p className="ppug-note">
            <span className="ppug-slash">/examples.</span> The companies and
            people inside these windows are invented. The advertising figures
            are from our own course campaign.
          </p>
        </PPSection>

        <PPSection id="guardian" k="04" title="A brand guardian">
          <p className="pps-standfirst">
            A brand guardian checks a finished piece of work against the
            brand&rsquo;s rules before it goes anywhere. We built this one for
            Moloco. We have built them partly because some larger clients want
            one, and partly because we use one ourselves, so that all of our
            work goes through it. It is here as an example of how the quality
            is kept.
          </p>
          <div className="ppug-mg" style={{ marginTop: 26 }}>
            <MolocoGuardian />
          </div>
        </PPSection>

        <PPSection id="writer" k="05" title="A writer">
          <p className="pps-standfirst">
            I read a lot about how AI writes slop. It does. But it does not have to,
            if you spend the time up front. Writers need to know the brand&rsquo;s
            positioning, the target audience, the insights and pain points in that
            category, the messaging and the tone of voice. Hover a dotted line below
            and it shows you which document that line came from.
          </p>
          <div style={{ marginTop: 26 }}>
            <WriterEmail
              subject={{ text: "Your renewal is due on 14 September", note: "voice" }}
              body={[
                { text: "Hi Sarah," },
                { text: "Before it renews, we'll quote the market for you.", note: "positioning" },
                {
                  text: "Last year most people in your position paid the price they were sent. It was a bit higher than the year before, and paying it beat a fortnight of forms and four websites asking the same eleven questions.",
                },
                { text: "That increase was never compulsory. It was the cost of staying put.", note: "messaging" },
                {
                  text: "So about three weeks before your date we'll check what everyone else would charge for the same cover. If someone is cheaper, we move you and do the paperwork. If nobody is, you stay where you are. Either way you'll get a note saying what we found and what we chose.",
                  note: "messaging",
                },
                { text: "The first time we did this, customers saved €187 on average.", note: "proof" },
                { text: "Nothing for you to do.", note: "voice" },
              ]}
              sign={["Aoife", "Kite"]}
            />
          </div>
          <p className="ppug-note">
            <span className="ppug-slash">/example.</span> Kite Insurance is an
            invented company.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            You asked on the call how the work stays different when everyone
            has the same tools. This is the answer. Two companies can use the
            same tool, and what each one gets out of it depends on what its
            writer was built on. A writer built on your audience, your
            positioning, your proof, your tone of voice and your messaging
            writes like you, and it shows which of those each line came from.
          </p>
          <p className="pps-standfirst">
            Writers are the agents we have been building for longest. For a
            group with four brands it helps that once one writer is working,
            building the next one for a second brand is much less than twice
            the work.
          </p>
        </PPSection>

        <PPSection
          id="manager"
          k="06"
          title="A project manager, and agents that follow things through"
        >
          <p className="pps-standfirst">
            We build campaign managers in two ways. The first is an AI you work with day to day. It tracks the delivery of the marketing tasks and keeps you on track each day. It captures your call transcripts, reads your emails and looks at your documents, so it knows what was agreed and what is due. It writes emails and puts them in your drafts. It creates invoices and sends status updates. Each morning it tells you what moved, what is late, and what is waiting on you.
          </p>
          <figure className="ag-fig" style={{ margin: "26px 0 0" }}>
            <TypedNote title="Campaign Manager" subject="Where everything stands, Monday" from="Campaign Manager" avatar="CM" items={PM} />
          </figure>
          <p className="ppug-note">
            <span className="ppug-slash">/example.</span> The projects in this
            note are invented.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            Paul has a project manager like this, and an agent that owns his
            inbox. What makes them useful is that they are proactive. An agent
            that tells you something once and then waits is a tool on a
            laptop. A proactive one follows things through, and it reaches you
            wherever you are. About half of Paul&rsquo;s own work with his
            agents now happens from his phone.
          </p>
          <p className="pps-standfirst">
            These are four of the rules he gave his inbox agent, in his own
            words from{" "}
            <a
              className="ppug-link"
              href="https://runwithfoxes.com/essays/how-i-build-proactive-agents"
              target="_blank"
              rel="noopener noreferrer"
            >
              How I build proactive agents
            </a>
            .
          </p>
          <ul className="ppug-rules">
            <li>
              <span className="ppug-n">01</span>
              <span>
                <b>It doesn&rsquo;t tell me anything just once.</b>
                <span className="ppug-rule-d">
                  Anything that needs me goes on a list and stays there until I
                  answer, or until my sent mail or calendar shows it&rsquo;s
                  done.
                </span>
              </span>
            </li>
            <li>
              <span className="ppug-n">02</span>
              <span>
                <b>It checks before it tells me anything.</b>
                <span className="ppug-rule-d">
                  Before the agent says someone is waiting, it checks my sent
                  mail and my calendar.
                </span>
              </span>
            </li>
            <li>
              <span className="ppug-n">03</span>
              <span>
                <b>It sends me something I can reply to.</b>
                <span className="ppug-rule-d">
                  It sends a message to my phone, I reply, and then it goes and
                  does what I asked.
                </span>
              </span>
            </li>
            <li>
              <span className="ppug-n">04</span>
              <span>
                <b>It never sends an email.</b>
                <span className="ppug-rule-d">
                  Every reply it writes is a draft, and I review, edit and
                  press send.
                </span>
              </span>
            </li>
          </ul>
        </PPSection>

        <PPSection id="system" k="07" title="One connected system">
          <p className="pps-standfirst">
            Our own website is built in code, through Claude Code. The course
            sits on it and the email tool is joined to it, so the site, the
            data and the email are one system. Everything is easy to see, and
            one person can ask it for something in plain words.
          </p>
          <div className="ppug-sys">
            <div>
              <b>The website</b>
              <span>the pages and the course, built in code</span>
            </div>
            <div>
              <b>The data</b>
              <span>who came, what they opened, what they clicked</span>
            </div>
            <div>
              <b>The email tool</b>
              <span>the agent works inside it</span>
            </div>
          </div>
          <p className="ppug-sys-foot">
            one system, and one person asking it in plain words
          </p>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            You saw this on our call. Paul asked for five surprising things
            about the people taking the course, and the five emails that
            would follow, and both came back while we talked.
          </p>
          <div className="ppug-term">
            <TerminalWindow
              title="Paul"
              liveLabel="the course"
              instruction="tell me five surprising things about the people on the course, and the five emails that would follow"
              response="five findings and five emails, drafted. Nothing goes until you say send."
            />
          </div>
          <p className="ppug-k">Three of the five it found</p>
          <ul className="ppug-found">
            <li>
              One person had opened the first module at 7.40 on nearly every
              working morning for three weeks.
            </li>
            <li>
              A small group were doing the course at three in the morning,
              Irish time, because they are in New Zealand.
            </li>
            <li>
              Ninety people had copied one of the prompts in the course.
            </li>
          </ul>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            Each finding came with an email written for the people it applied
            to. There are more than 1,100 people on the course, and every one
            of them can be sent an email written for what they have done,
            while Paul is talking to his laptop.
          </p>
          <Shot
            src={rwfCourse}
            alt="The free course on runwithfoxes.com"
            label="runwithfoxes.com/course"
            pill="live"
            href="https://runwithfoxes.com/course"
          />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            This is the reason to build a website this way. When the website,
            the customer records and the email tool are separate products
            stacked on top of each other, somebody has to work between them.
            When they are one system, you build the agent and the agent is in
            the tool. It is worth looking at this before any money goes on a
            new website or a new CRM.
          </p>
        </PPSection>

        <PPSection id="websites" k="08" title="Two websites, and how each was made">
          <p className="pps-standfirst">
            These are two sites we have built in code for other companies. In
            both cases the look is written down as rules: the colours, the
            type, the spacing and the parts each page is made from. Those
            rules are what keep a change made months later, by someone on
            their own team, looking like the same company.
          </p>

          <h3 className="ppug-h3">Data Intelligence</h3>
          <p className="pps-standfirst">
            Data Intelligence is Dave Hackett&rsquo;s company. He had no senior
            marketer and wanted to move quickly, so Paul worked out the
            marketing with him and then built it. The old site was in Framer.
            We rebuilt it in code so that his team can change it by asking.
            Adding a pricing page, for example, is about ten minutes of work,
            and someone on his own team does it.
          </p>
          <Shot
            src={diHome}
            alt="The Data Intelligence home page"
            label="dataintelligence.com"
            pill="live"
            href="https://www.dataintelligence.com"
          />
          <Shot
            src={diProduct}
            alt="The Data Intelligence product page"
            label="dataintelligence.com/product"
            pill="live"
            href="https://www.dataintelligence.com/product"
          />
          <p className="ppug-k">How it was made: the written rules</p>
          <Three
            items={[
              { src: diCover, alt: "The cover of the Data Intelligence guidelines for product and web" },
              { src: diColour, alt: "The colour page of the Data Intelligence guidelines" },
              { src: diParts, alt: "The components page of the Data Intelligence guidelines" },
            ]}
          />
          <p className="ppug-cap">
            Three pages from the 47 page guidelines for the site, with every
            value measured off the live site.
          </p>

          <h3 className="ppug-h3">Nova</h3>
          <p className="pps-standfirst">
            Nova is an HR technology advisory firm led by Cian Collins. This
            is their new site. It is not public yet, so these are pictures of
            it. The look started from the name, which gave us a north star:
            one sky, one point of light in every picture, and the same star
            over every city they work in.
          </p>
          <Shot
            src={novaHome}
            alt="The new Nova home page"
            label="Nova, the new home page"
            pill="not yet public"
          />
          <Shot
            src={novaSelection}
            alt="The Selection page on the new Nova site"
            label="Nova, the Selection page"
            pill="not yet public"
          />
          <p className="ppug-k">How it was made: the written rules</p>
          <Three
            items={[
              { src: novaLook, alt: "Nova's rules for the look: one sky, the same everywhere" },
              { src: novaPhoto, alt: "Nova's photography: the same star over each city" },
              { src: novaSystem, alt: "Nova's rules for type and colour" },
            ]}
          />
          <p className="ppug-cap">
            Three of the pages that set out Nova&rsquo;s look, its photography
            and its exact type and colours. The site is set up so that
            Nova&rsquo;s own team can make changes by asking, and these rules
            keep the changes on brand.
          </p>
        </PPSection>

        <PPSection id="hub" k="09" title="A content hub">
          <p className="pps-standfirst">
            Our own site is an example of a content hub. We have a research
            agent that writes a case study every day. We have a diary agent
            that writes about how the team of agents works. Paul writes an
            essay every few days, and the large research reports have started,
            with at least one a month planned. None of this takes much of his time, and the
            quality is good.
          </p>
          <div className="ppug-four">
            {HUB.map((h) => (
              <a
                key={h.href}
                className="ppug-card"
                href={h.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={h.src.src} width={h.src.width} height={h.src.height} alt={`${h.title} on runwithfoxes.com`} loading="lazy" />
                <p className="ppug-card-t">{h.title}</p>
                <p className="ppug-card-d">{h.text}</p>
              </a>
            ))}
          </div>
          <p className="pps-standfirst" style={{ marginTop: 34 }}>
            For a group whose business is what it knows, this is where the
            ambition comes in. The question to ask is what you would bring to
            the market if you had a team of twenty-five analysts and
            researchers creating content all day.
          </p>
        </PPSection>

        <PPSection id="howitworks" k="10" title="How it would work">
          <p className="pps-standfirst">
            The upfront work would take about three months. We would start
            from the marketing plan you already have, and agree with you what
            to build first, for one brand or for all four. Paul would then
            build it, test it with whoever makes the decisions on your side
            until the work is right, and train the people who will use it.
          </p>
          <p className="pps-standfirst">
            You said you will probably hire a marketer as well. Whoever joins
            would have the agents behind them from their first day.
          </p>
          <p className="pps-standfirst">
            After the three months you may want Paul to stay on, for project
            work or to help build new things. That part is optional.
          </p>
        </PPSection>

        <PPSection id="pricing" k="11" title="The price">
          <PricingCards
            cards={[
              {
                title: "Three months with the group",
                bullets: [
                  "Paul working with the group for about three months",
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
            After that, if you would like Paul to stay on for project work or
            to help build new things, it would be €3,000 a month. That part
            is optional.
          </p>
          <CloseBox clientName="Unknown group" />
        </PPSection>
      </div>
    </ProspectShell>
  );
}
