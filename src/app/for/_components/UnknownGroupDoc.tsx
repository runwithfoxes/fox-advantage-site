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
// The line under each agent's name and its first paragraph are Paul's own
// words from the homepage (AgentsSection.tsx, dictated 6 Sep 2026). The rest of
// the prose is a draft for his pass.
//
// Every picture is imported from ./unknown-group so it gets a hashed name.
// Nothing of Nova's unreleased site sits at a guessable address in public/.

import { useRef, useState } from "react";
import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CloseBox } from "./Pricing";
import { WriterEmail } from "./library/WriterPiece";
import { PipelineBoard, JoNote } from "./library/GrowthManager";
import UnknownSearchWindow from "./library/UnknownSearchWindow";
import { CourseChat, MailDrafts, SegSheet, SplitBars, SentChart, ConnectedSystem, LIST_TOTAL } from "./UnknownEmailAgent";
import TypedNote from "@/components/agents/TypedNote";
import AdDeskWindow from "@/components/agents/AdDeskWindow";
import {
  RESEARCH,
  REDTEAM,
  PM,
  GROWTH_NOTE,
  GROWTH_PIPELINE,
  GHOST_POST,
} from "./unknown-group-data";
import { PICS } from "./unknown-group/pics";
import "@/components/agents/agents-section.css";
import "./pricing.css";
import "./unknown-group.css";

// The ten, in the homepage's order. The rail lists every one by name.
const AGENTS = [
  { id: "ag-research", num: "01", name: "Research Agents" },
  { id: "ag-growth", num: "02", name: "Growth Agent Team" },
  { id: "ag-email", num: "03", name: "Email Marketing Agents" },
  { id: "ag-ghost", num: "04", name: "Ghostwriters" },
  { id: "ag-search", num: "05", name: "Search Agents" },
  { id: "ag-ads", num: "06", name: "Advertising Agents" },
  { id: "ag-web", num: "07", name: "Website Agent Team" },
  { id: "ag-guardian", num: "08", name: "Brand Guardians" },
  { id: "ag-manager", num: "09", name: "Campaign Managers" },
  { id: "ag-red", num: "10", name: "Red Team" },
];

// Parts inside an agent that get their own line in the rail.
const WEB_PARTS = [
  { id: "web-di", title: "Data Intelligence" },
  { id: "web-nova", title: "Nova" },
];
const GUARDIAN_PARTS = [
  { id: "g-checks", title: "What it checks" },
  { id: "g-tests", title: "Six test files" },
  { id: "g-art", title: "The artwork" },
];

const SECTIONS = [
  { id: "heard", title: "What I propose" },
  { id: "howiwork", title: "What we do" },
  { id: "agents", title: "Examples of agents" },
  ...AGENTS.map((a) => ({ id: a.id, title: a.name })),
  ...WEB_PARTS,
  ...GUARDIAN_PARTS,
  { id: "hub", title: "A content hub" },
  { id: "howitworks", title: "How it would work" },
  { id: "pricing", title: "The price" },
];

const RAIL_GROUPS = [
  {
    label: "/the proposal",
    entries: [
      { id: "heard", title: "What I propose", num: "01" },
      { id: "howiwork", title: "What we do", num: "02" },
    ],
  },
  {
    label: "/examples of agents",
    entries: AGENTS.map((a) => ({
      id: a.id,
      title: a.name,
      num: a.num,
      children:
        a.id === "ag-web" ? WEB_PARTS : a.id === "ag-guardian" ? GUARDIAN_PARTS : undefined,
    })),
  },
  {
    label: "/more examples",
    entries: [{ id: "hub", title: "A content hub", num: "11" }],
  },
  {
    label: "/how and how much",
    entries: [
      { id: "howitworks", title: "How it would work", num: "12" },
      { id: "pricing", title: "The price", num: "13" },
    ],
  },
];

// One agent: its number and name, Paul's line about it, then everything we
// have to show for it. Open, never folded away.
function Agent({
  n,
  dek,
  children,
}: {
  n: number;
  dek: string;
  children: React.ReactNode;
}) {
  const a = AGENTS[n];
  return (
    <section id={a.id} data-track-section={a.id} className="pps-section pps-sub ppug-agent">
      <div className="pps-section-head">
        <span className="pps-section-k">{a.num}</span>
        <h2 className="pps-section-h2">{a.name}</h2>
      </div>
      <p className="pps-standfirst ppug-dek">{dek}</p>
      {children}
    </section>
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

// The written rules as a row of full pages the reader moves along sideways.
function PageDeck({ count, prefix, what }: { count: number; prefix: string; what: string }) {
  const row = useRef<HTMLDivElement>(null);
  const move = (d: number) => {
    const el = row.current;
    if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="ppug-deck">
      <div className="ppug-deck-row" ref={row} tabIndex={0} aria-label={`${what}, ${count} pages, scroll sideways`}>
        {Array.from({ length: count }, (_, n) => {
          const k = String(n + 1).padStart(2, "0");
          return (
            <figure key={k}>
              <Pic name={`${prefix}${k}`} alt={`${what}, page ${n + 1}`} />
              <figcaption>
                {n + 1} / {count}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="ppug-deck-foot">
        <span>all {count} pages, scroll sideways</span>
        <span>
          <button type="button" onClick={() => move(-1)} aria-label="Earlier pages">
            &larr;
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Later pages">
            &rarr;
          </button>
        </span>
      </div>
    </div>
  );
}

// A row of pictures shown large, one after another, moved through sideways.
// Paul, 9 Oct: "These small thumbnails of things don't work for me. They
// don't really showcase anything properly." So nothing on this page is a grid
// of small pictures. "natural" shows each ad at its real size in pixels.
type RowItem = { pic: string; alt: string; cap?: React.ReactNode; w?: number };
function BigRow({ items, what, unit }: { items: RowItem[]; what: string; unit: string }) {
  const row = useRef<HTMLDivElement>(null);
  const move = (d: number) => {
    const el = row.current;
    if (el) el.scrollBy({ left: d * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <div className="ppug-deck">
      <div className="ppug-deck-row ppug-row" ref={row} tabIndex={0} aria-label={`${what}, ${items.length} ${unit}, scroll sideways`}>
        {items.map((it, n) => {
          const p = PICS[it.pic];
          return (
            <figure key={it.pic}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} width={p.width} height={p.height} alt={it.alt} loading="lazy" style={it.w ? { width: it.w } : undefined} />
              <figcaption>
                <span className="ppug-row-n">
                  {n + 1} / {items.length}
                </span>
                {it.cap}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="ppug-deck-foot">
        <span>
          all {items.length} {unit}, scroll sideways
        </span>
        <span>
          <button type="button" onClick={() => move(-1)} aria-label="Earlier">
            &larr;
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Later">
            &rarr;
          </button>
        </span>
      </div>
    </div>
  );
}

function Who({ who }: { who: "theirs" | "ours" }) {
  return (
    <span className="ppug-tag" data-who={who}>
      {who === "theirs" ? "Moloco’s own" : "Made by us"}
    </span>
  );
}

// A piece of artwork with a plain label saying whose it is.
function Art({
  name,
  alt,
  who,
  line,
}: {
  name: string;
  alt: string;
  who: "theirs" | "ours";
  line?: string;
}) {
  return (
    <figure className="ppug-art">
      <Pic name={name} alt={alt} />
      <figcaption>
        <span className="ppug-tag" data-who={who}>
          {who === "theirs" ? "Moloco’s own" : "Made by us"}
        </span>
        {line && <span className="ppug-art-line">{line}</span>}
      </figcaption>
    </figure>
  );
}

// ---------- the Moloco guardian: every figure here is from its own run ----------

// What it measured on the honest test file, run again on 9 Oct 2026.
const MEASURED: { rule: string; got: string; ok: "pass" | "none" | "ask" }[] = [
  { rule: "The flat colours are brand colours", got: "#E9FFD1 is 34.9% of the file and is Light Green. The two smaller fields are Vellum and Parchment.", ok: "pass" },
  { rule: "No blue from the old identity", got: "None found. The identity from before August 2026 is retired and is never used.", ok: "none" },
  { rule: "There is a logo and it can be read", got: "Symbol found at 44, 424 in the file.", ok: "pass" },
  { rule: "The logo is not stretched", got: "74 by 67 pixels, 0.5% off the real file. The limit is 1.5%.", ok: "pass" },
  { rule: "The logo is at or above its smallest size", got: "67 pixels high. The rule is never under 30.", ok: "pass" },
  { rule: "The symbol sits with its wordmark", got: "The full logo is used, symbol and name together.", ok: "none" },
  { rule: "Nothing sits in the space around the logo", got: "24 pixels clear on each side, which is the rule for a logo this size.", ok: "pass" },
  { rule: "The glow inside the symbol is there", got: "87% of the inside of the symbol carries colour.", ok: "pass" },
  { rule: "The grid lines are hairlines", got: "Two across and one down, all at or under 3.2 pixels.", ok: "pass" },
  { rule: "The corners are square", got: "The corner pixel matches its edge, #E9FFD1.", ok: "pass" },
  { rule: "The photograph is in the brand's style", got: "The photograph in this file is too small a part of it to measure, so it asked a person.", ok: "ask" },
];

const ASKED: { rule: string; why: string }[] = [
  { rule: "One gradient in each section, teal to green to yellow", why: "It cannot be counted from a flat picture." },
  { rule: "The serif is never used for body text, and the mono never for sentences", why: "A typeface cannot be read reliably from pixels below headline size." },
  { rule: "No type or logo over the photograph", why: "It quotes the rule and asks a person to look." },
  { rule: "The photograph has the brand's qualities, and nobody looks at the camera", why: "That is a judgment. It cannot be measured from pixels." },
  { rule: "Any number or claim in the copy matches the approved wording", why: "That is about the words, so a person checks it." },
];

const TESTS: { pic: string; title: string; planted: string; verdict: "Pass" | "Fail"; said: string }[] = [
  {
    pic: "mol-test-00",
    title: "The honest file",
    planted: "Nothing wrong with it. Saved as a JPEG, the way a file arrives from someone outside the team.",
    verdict: "Pass",
    said: "Passed on what it can measure, and listed what it could not.",
  },
  {
    pic: "mol-test-01",
    title: "The green is three off",
    planted: "The background was set to #EDFFCE. The brand's Light Green is #EAFFD1.",
    verdict: "Fail",
    said: "“#EDFFCE, 38.8% of the file, nearest Light Green #EAFFD1, off by 3.”",
  },
  {
    pic: "mol-test-02",
    title: "The logo is stretched",
    planted: "The symbol was made about 4% wider.",
    verdict: "Fail",
    said: "“Symbol 77 by 67 pixels, 3.6% off the real file.” It also saw the wider symbol push into the clear space.",
  },
  {
    pic: "mol-test-03",
    title: "A grid line is too heavy",
    planted: "One grid line was drawn 7 pixels thick.",
    verdict: "Fail",
    said: "“A line 7 pixels thick, limit 3.2.”",
  },
  {
    pic: "mol-test-04",
    title: "A panel in the old blue",
    planted: "A small panel was added in the blue from the old identity.",
    verdict: "Fail",
    said: "“#1F5AF6, 5.5% of the file. The identity from before August 2026 is retired and is never used.”",
  },
  {
    pic: "mol-test-05",
    title: "The logo is too small",
    planted: "The logo was shrunk to 24 pixels high. The rule is never under 30.",
    verdict: "Fail",
    said: "It could not find a logo it could read, and said that a person should check.",
  },
];

// The eleven measurements on a post the machine makes, from its receipt for
// the upright post (out/review, sha 8941053d6a). Positions are in the brand
// portal's own unit: the shorter side of the post divided by 20.
const RECEIPT: [string, string, string][] = [
  ["The upright grid line", "19.0", "19.009"],
  ["The thickness of that line", "hairline", "hairline"],
  ["The top grid line", "1.0", "1.0"],
  ["The middle grid line", "10.0", "9.991"],
  ["The edges of the photograph", "0, 10.0, 19.0, 25.0", "0, 10.0, 19.0, 25.0"],
  ["Where the headline sits and its size", "0.85, 1.82, 13.7, 5.88", "0.852, 1.815, 13.722, 5.87"],
  ["Where the logo symbol sits and its size", "0.82, 7.86, 2.2, 9.11", "0.815, 7.852, 2.185, 9.093"],
  ["Where the logo name sits and its size", "2.51, 8.03, 6.53, 8.98", "2.519, 8.019, 6.519, 8.963"],
  ["The glow inside the symbol", "there", "there"],
  ["The colour of the tint", "#EAFFD1", "#EAFFD1"],
  ["Nothing touches the outer edge but the grid lines", "clear", "clear"],
];

const ADS: { pic: string; size: string; w: number }[] = [
  { pic: "mol-ad-performs-1200x628", size: "1200 x 628", w: 1200 },
  { pic: "mol-ad-convert-1200x628", size: "1200 x 628", w: 1200 },
  { pic: "mol-ad-outcomes-1200x628", size: "1200 x 628", w: 1200 },
  { pic: "mol-ad-performs-970x250", size: "970 x 250", w: 970 },
  { pic: "mol-ad-convert-970x250", size: "970 x 250", w: 970 },
  { pic: "mol-ad-outcomes-970x250", size: "970 x 250", w: 970 },
  { pic: "mol-ad-performs-728x90", size: "728 x 90", w: 728 },
  { pic: "mol-ad-email-performs", size: "600 x 200, email", w: 600 },
  { pic: "mol-ad-email-convert", size: "600 x 200, email", w: 600 },
  { pic: "mol-ad-email-outcomes", size: "600 x 200, email", w: 600 },
  { pic: "mol-ad-performs-1080x1080", size: "1080 x 1080", w: 1080 },
  { pic: "mol-ad-convert-1080x1080", size: "1080 x 1080", w: 1080 },
  { pic: "mol-ad-outcomes-1080x1080", size: "1080 x 1080", w: 1080 },
  { pic: "mol-ad-performs-300x250", size: "300 x 250", w: 300 },
  { pic: "mol-ad-convert-300x250", size: "300 x 250", w: 300 },
  { pic: "mol-ad-outcomes-300x250", size: "300 x 250", w: 300 },
  { pic: "mol-ad-performs-300x600", size: "300 x 600", w: 300 },
  { pic: "mol-ad-performs-160x600", size: "160 x 600", w: 160 },
];

// Sixteen photographs. The eight with "r4" in the name were made by us on
// 9 Sep 2026; the other eight are from the library Pentagram made for Moloco.
const PHOTOS: [string, "theirs" | "ours"][] = [
  ["mol-photo-05", "theirs"],
  ["mol-photo-02-r4-v1", "ours"],
  ["mol-photo-18", "theirs"],
  ["mol-photo-03-r4-v0", "ours"],
  ["mol-photo-19", "theirs"],
  ["mol-photo-04-r4-v1", "ours"],
  ["mol-photo-22", "theirs"],
  ["mol-photo-16-r4-v1", "ours"],
  ["mol-photo-24", "theirs"],
  ["mol-photo-17-r4-v1", "ours"],
  ["mol-photo-30", "theirs"],
  ["mol-photo-21-r4-v0", "ours"],
  ["mol-photo-36", "theirs"],
  ["mol-photo-23-r4-v1", "ours"],
  ["mol-photo-42", "theirs"],
  ["mol-photo-38-r4-v1", "ours"],
];

function Guardian() {
  return (
    <>
      <P>
        We build brand guardians, often for larger brands whose stakeholders
        want speed. The goal is speed and quality together. Without the
        quality, stakeholders start creating their own marketing materials,
        and things begin to look generic.
      </P>
      <P>
        This one is Moloco&rsquo;s. Moloco got a new identity in August 2026,
        made by Pentagram, with its rules set out in a brand portal. We built
        two things from that portal. One makes posts and ads to the
        portal&rsquo;s rules. The other, the guardian, reads any finished file
        and checks it against those rules. We use a guardian on our own work
        too, so that everything we make goes through it. It is here as an
        example of how the quality is kept.
      </P>

      <div id="g-checks" className="ppug-part">
        <h3 className="ppug-h3">What it checks</h3>
        <P>
          It measures eleven things and it asks a person about five more. It
          never says pass about the words, the claims or whether a photograph
          is a good one. Every line it writes names the rule it used and where
          that rule is in the portal.
        </P>
        <div className="ppug-g-top">
          <figure className="ppug-g-ad">
            <Pic name="mol-test-00" alt="A Moloco post, upright, with the headline Acquire more users. Spend smarter. Grow faster." />
            <figcaption>
              <span className="ppug-tag" data-who="ours">
                Made by us
              </span>
              <span className="ppug-art-line">
                The file it read. An upright social post, 1080 by 1350 pixels,
                in Moloco&rsquo;s identity.
              </span>
            </figcaption>
          </figure>
          <div>
            <p className="ppug-k ppug-k-first">Eleven things it measures</p>
            <ol className="ppug-checks">
              {MEASURED.map((m, i) => (
                <li key={m.rule} data-ok={m.ok}>
                  <span className="ppug-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <b>{m.rule}</b>
                    <span className="ppug-check-got">{m.got}</span>
                  </span>
                  <span className="ppug-verdict" data-ok={m.ok}>
                    {m.ok === "ask" ? "asked" : "pass"}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="ppug-k">Five things it asks a person</p>
        <ol className="ppug-checks ppug-checks-ask">
          {ASKED.map((m, i) => (
            <li key={m.rule} data-ok="ask">
              <span className="ppug-n">{String(i + 12).padStart(2, "0")}</span>
              <span>
                <b>{m.rule}</b>
                <span className="ppug-check-got">{m.why}</span>
              </span>
              <span className="ppug-verdict" data-ok="ask">
                asked
              </span>
            </li>
          ))}
        </ol>
        <Note k="/the run.">
          These are the guardian&rsquo;s own results on this file, run again on
          9 October 2026. Verdict: pass on what it can measure.
        </Note>
      </div>

      <div id="g-tests" className="ppug-part">
        <h3 className="ppug-h3">Six test files</h3>
        <P>
          A guardian is only useful if it catches the mistakes a person would
          miss. So we made six files to test it. One is honest. The other five
          each have one small thing wrong, close enough to right that you would
          pass them at a glance. It caught all five.
        </P>
        <BigRow
          what="The six test files"
          unit="files"
          items={TESTS.map((t) => ({
            pic: t.pic,
            alt: `Test file: ${t.title}`,
            cap: (
              <span className="ppug-test-cap">
                <span className="ppug-verdict" data-ok={t.verdict === "Pass" ? "pass" : "fail"}>
                  {t.verdict}
                </span>
                <b>{t.title}</b>
                <span className="ppug-test-l">What we changed</span>
                <span>{t.planted}</span>
                <span className="ppug-test-l">What the guardian said</span>
                <span>{t.said}</span>
              </span>
            ),
          }))}
        />
        <Note k="/whose work.">
          All six files were made by us, for the test. None of them is an ad
          Moloco has run.
        </Note>
      </div>

      <div id="g-art" className="ppug-part">
        <h3 className="ppug-h3">The artwork</h3>
        <P>
          Every piece below is marked. &ldquo;Moloco&rsquo;s own&rdquo; means
          it came from Moloco&rsquo;s brand portal or its photo library.
          &ldquo;Made by us&rdquo; means our agents made it to the
          portal&rsquo;s rules.
        </P>

        <p className="ppug-k">Social posts: theirs beside ours</p>
        <P>
          The portal draws three sample posts. We read the layout off those
          drawings and built a machine that makes the same post from a
          headline and a photograph. The copy in ours is the portal&rsquo;s own
          sample copy, so the two can be laid side by side.
        </P>
        <div className="ppug-pair">
          <Art name="mol-post-ref-vertical-A-post1" alt="Moloco's own sample post, upright, headline at the top" who="theirs" line="The portal's sample post, headline at the top." />
          <Art name="mol-post-vertical-A-light-green" alt="Our post made to the same layout, on Light Green" who="ours" line="The same layout, made by the machine." />
        </div>
        <p className="ppug-k">The eleven measurements on that post</p>
        <P>
          Each post the machine makes is measured against Moloco&rsquo;s own
          drawing before anyone sees it. These are the eleven measurements for
          the pair above. All eleven passed. Positions are in the
          portal&rsquo;s own unit, which is the shorter side of the post
          divided by 20.
        </P>
        <div className="ppug-table-wrap">
          <table className="ppug-table">
            <thead>
              <tr>
                <th />
                <th>What is measured</th>
                <th>Moloco&rsquo;s drawing</th>
                <th>Ours</th>
              </tr>
            </thead>
            <tbody>
              {RECEIPT.map(([what, theirs, ours], i) => (
                <tr key={what}>
                  <td className="ppug-n">{String(i + 1).padStart(2, "0")}</td>
                  <td>{what}</td>
                  <td>{theirs}</td>
                  <td>{ours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ppug-pair">
          <Art name="mol-post-ref-vertical-B-post4" alt="Moloco's own sample post, upright, photograph at the top" who="theirs" line="The portal's sample post, photograph at the top." />
          <Art name="mol-post-vertical-B-light-teal" alt="Our post made to the same layout, on Light Teal" who="ours" line="The same layout, made by the machine." />
        </div>
        <div className="ppug-pair ppug-pair-wide">
          <Art name="mol-post-ref-wide-attachment" alt="Moloco's own wide sample post" who="theirs" line="The portal's wide post." />
          <Art name="mol-post-wide-A-vellum" alt="Our wide post made to the same layout, on Vellum" who="ours" line="The same layout, made by the machine." />
        </div>
        <p className="ppug-k">The same post in the brand&rsquo;s other tints</p>
        <BigRow
          what="The same post in the brand's other tints"
          unit="posts"
          items={[
            { pic: "mol-post-vertical-A-light-teal", alt: "Our upright post on Light Teal", cap: <><Who who="ours" /><span className="ppug-art-line">Light Teal</span></> },
            { pic: "mol-post-vertical-A-light-yellow", alt: "Our upright post on Light Yellow", cap: <><Who who="ours" /><span className="ppug-art-line">Light Yellow</span></> },
            { pic: "mol-post-vertical-A-parchment", alt: "Our upright post on Parchment", cap: <><Who who="ours" /><span className="ppug-art-line">Parchment</span></> },
            { pic: "mol-post-square-A-light-yellow", alt: "Our square post on Light Yellow", cap: <><Who who="ours" /><span className="ppug-art-line">Square. The portal has no square, so this one is our own extension.</span></> },
            { pic: "mol-post-wide-A-light-green", alt: "Our wide post on Light Green", cap: <><Who who="ours" /><span className="ppug-art-line">The wide post on Light Green.</span></> },
          ]}
        />

        <p className="ppug-k">Display ads</p>
        <P>
          Three messages for Moloco&rsquo;s connected TV product, each in the
          sizes an ad campaign needs, and three banners for email. We made all
          of these in the new identity, and each one went through the guardian
          before it was sent to Moloco.
        </P>
        <BigRow
          what="Moloco display ads made by us"
          unit="ads, each at its real size"
          items={ADS.map((a) => ({
            pic: a.pic,
            alt: `A Moloco display ad made by us, ${a.size}`,
            w: a.w,
            cap: (
              <>
                <Who who="ours" />
                <span className="ppug-art-line">{a.size}</span>
              </>
            ),
          }))}
        />

        <p className="ppug-k">Photographs: eight are theirs and eight are ours</p>
        <P>
          Pentagram made Moloco a library of photographs. We wrote down what
          makes those photographs look the way they do, and made new ones from
          the written description alone. The guardian measures each new one
          against the library, and then a person looks at it at full size.
        </P>
        <BigRow
          what="Photographs, Moloco's own and ours"
          unit="photographs"
          items={PHOTOS.map(([name, who]) => ({
            pic: name,
            alt: who === "theirs" ? "A photograph from Moloco's own library" : "A photograph made by us in Moloco's style",
            cap: <Who who={who} />,
          }))}
        />
      </div>
    </>
  );
}

const DI_PAGES: SitePage[] = [
  { label: "Home", pic: "full-di-home", url: "dataintelligence.com", href: "https://www.dataintelligence.com" },
  { label: "Product", pic: "full-di-product", url: "dataintelligence.com/product", href: "https://www.dataintelligence.com/product" },
  { label: "Prices", pic: "full-di-prices", url: "dataintelligence.com/prices", href: "https://www.dataintelligence.com/prices" },
  { label: "About", pic: "full-di-about", url: "dataintelligence.com/about", href: "https://www.dataintelligence.com/about" },
  { label: "An essay", pic: "full-di-essay", url: "dataintelligence.com/essays", href: "https://www.dataintelligence.com/essays/announcing-dataintelligence" },
];

const PAINTINGS = [
  "01-hammock", "02-freewheel", "03-sail", "04-balloon-sandbags", "05-balloon-safe",
  "06-cloud-on-a-lead", "07-lemon-drawer", "08-umbrella-sunlight", "09-piggy-deckchair", "10-tailored",
  "11-brim", "12-shed-wall", "13-scales", "14-compass", "15-door-meadow",
  "16-lighthouse-day", "17-high-board", "18-worn-path", "19-goldfish-pond", "20-sprinkler-sea",
];

const NOVA_PAGES: SitePage[] = [
  { label: "Home", pic: "full-nova-home", url: "Nova, the new site" },
  { label: "Selection", pic: "full-nova-selection", url: "Nova, the new site / selection" },
  { label: "Delivery", pic: "full-nova-delivery", url: "Nova, the new site / delivery" },
  { label: "About", pic: "full-nova-about", url: "Nova, the new site / about" },
  { label: "Clients", pic: "full-nova-clients", url: "Nova, the new site / clients" },
  { label: "Insights", pic: "full-nova-insights", url: "Nova, the new site / insights" },
];

const NOVA_BRAND: SitePage[] = [
  { label: "Start", pic: "full-nova-brand", url: "Nova, the new site / brand" },
  { label: "The look", pic: "full-nova-brand-look", url: "Nova, the new site / brand / look" },
  { label: "Photography", pic: "full-nova-brand-photography", url: "Nova, the new site / brand / photography" },
  { label: "Type, colour and parts", pic: "full-nova-brand-system", url: "Nova, the new site / brand / system" },
  { label: "Language", pic: "full-nova-brand-language", url: "Nova, the new site / brand / language" },
  { label: "People", pic: "full-nova-brand-people", url: "Nova, the new site / brand / people" },
];

const HUB_PAGES: SitePage[] = [
  { label: "A research report", pic: "full-rwf-report-ai-ask", url: "runwithfoxes.com/resources/the-ai-ask/2026-q3", href: "https://runwithfoxes.com/resources/the-ai-ask/2026-q3" },
  { label: "Research nuggets", pic: "full-rwf-nuggets", url: "runwithfoxes.com/research-nuggets", href: "https://runwithfoxes.com/research-nuggets" },
  { label: "One nugget", pic: "full-rwf-nugget", url: "runwithfoxes.com/research-nuggets", href: "https://runwithfoxes.com/research-nuggets/job-ads-want-ai-for-speed" },
  { label: "The diary", pic: "full-rwf-diary", url: "runwithfoxes.com/diary", href: "https://runwithfoxes.com/diary" },
  { label: "Essays", pic: "full-rwf-essays", url: "runwithfoxes.com/essays", href: "https://runwithfoxes.com/essays" },
];

const COURSE_PAGES: SitePage[] = [
  { label: "The free course", pic: "full-rwf-course", url: "runwithfoxes.com/course", href: "https://runwithfoxes.com/course" },
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
            My proposal is that I become your fractional CMO for about three
            months. It is part time, and I would work alongside you and your
            team. You already have a marketing plan. In those three months I
            would build out how it gets executed, with agents leading the
            work.
          </p>
          <p className="pps-standfirst">
            What excites me is how ambitious we could be. Yes, we could build
            a few agents to make things more efficient, and that would be
            worth having. But what if we tried to build a proper agent-led marketing
            function, with the equivalent of ten different agents? If you had
            ten more marketers, what would you get them to do?
          </p>
          <p className="pps-standfirst">
            The work goes into the quality and the craft first, which means
            agreeing what good looks like for each brand. Then it goes into
            building a team of agents that can work together to that standard.
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

        <PPSection id="agents" k="03" title="Examples of agents" />

        <Agent n={0} dek="We build research agents for marketing and sales, working every day, so you're not the bottleneck.">
          <P>
            We build a team of research agents that find that information for
            you on their own, every day. They work as a team, and you are not
            the bottleneck in it. They can research competitors. They can
            research prices. They can watch the things that change on a
            regular basis and tell you when they do.
          </P>
          <figure className="ag-fig">
            <TypedNote title="Research Agent" subject="Your research for Monday" from="Research Agent" to="Declan" avatar="R" items={RESEARCH} />
          </figure>
          <Note>
            This is how the morning note could read for the group. Harbour
            Foods and the people in it are invented.
          </Note>
        </Agent>

        <Agent n={1} dek="We build growth agent teams whose job is to get meetings with prospects in your calendar.">
          <P>
            We build the Growth Agent Team to get meetings with prospects
            booked in your calendar. That is the end game, and every task the
            team does is in service of it. Once we have built it, and built it
            carefully, the team works away every day without you being the
            bottleneck.
          </P>
          <figure className="ag-fig">
            <JoNote note={GROWTH_NOTE} title="Growth Agent Team" />
            <div style={{ marginTop: 22 }} />
            <PipelineBoard deals={GROWTH_PIPELINE} width={806} pill="kept current every morning" />
          </figure>
          <Note>
            You said on the call that the group helps when there is a chance
            for Empathy to bring Salience to a client, or the other way round.
            One board for all four brands is where that shows up. The
            companies and people on this board are invented.
          </Note>
        </Agent>

        <Agent n={2} dek="We build email marketing agents that do the whole of lifecycle email, from writing to improving the journeys, every day.">
          <P>
            We build email marketing agents that do everything in lifecycle
            email. The writing, the scheduling, the sequencing, the tracking,
            the reporting, and improving the journeys as it goes. Once we have
            built it, it works away every day without you being the
            bottleneck.
          </P>
          <P>
            You saw ours on the call. I asked it a question about the people
            taking our course, and then I gave it the job.
          </P>
          <CourseChat />
          <Note k="/real counts.">
            There are {LIST_TOTAL} people on the course. The five triggers
            and the number of people in each are real, read from the course
            on 9 October.
          </Note>

          <p className="ppug-k">The five emails it drafted</p>
          <MailDrafts />
          <Note k="/drafts.">
            Press a draft on the left and a version across the top. The agent
            picks the version from what each person has done or told us. The first names
            are made up and none of these has been sent.
          </Note>

          <p className="ppug-k">The sheet behind it: ten columns of segmentation</p>
          <P>
            Every person is a row, and the agent keeps ten columns about each
            of them up to date from what they do on the site. Nobody fills it
            in.
          </P>
          <SegSheet />

          <p className="ppug-k">How the list splits on each of the ten columns</p>
          <SplitBars />

          <p className="ppug-k">This has already gone out once</p>
          <P>
            On 5 October the email for module 2 went out as eight versions,
            picked by what each person had done on the course. The more a
            person had done, the more they opened and clicked.
          </P>
          <SentChart />
          <Note k="/how to read it.">
            The clicks include the security software some companies run,
            which opens every link, so read the order of the groups and not
            the exact rate.
          </Note>
          <P>
            That is the point of all of it. Once the site, the data and the
            email tool are joined up, you can build layer on layer of what
            you know about people, and target them well, with hardly any work.
          </P>

          <h3 className="ppug-h3">Why it can do that: one connected system</h3>
          <P>
            Our own website is built in code, through Claude Code. The course
            sits on it and the email tool is joined to it, so the site, the
            data and the email are one system. Everything is easy to see, and
            one person can ask it for something in plain words.
          </P>
          <ConnectedSystem />
          <SiteScroller pages={COURSE_PAGES} pill="live" what="The free course on runwithfoxes.com" />
          <P>
            This is the reason to build a website this way. When the website,
            the customer records and the email tool are separate products
            stacked on top of each other, somebody has to work between them.
            When they are one system, you build the agent and the agent is in
            the tool. It is worth looking at this before any money goes on a
            new website or a new CRM.
          </P>
        </Agent>

        <Agent n={3} dek="We build ghostwriters that get a founder's point of view onto LinkedIn and into longer articles, every week, in their own words.">
          <P>
            We build ghostwriters that let a founder or a senior exec get
            their opinion and their point of view across on LinkedIn, or in
            deeper articles, on an ongoing basis. It finds the material,
            structures it and writes it. What the founder does is open their
            laptop and find a handful of pieces that are ninety percent
            written. Usually it is a small bit of editing, then approve, and
            depending on how it is set up, the piece goes live.
          </P>
          <figure className="ag-fig">
            <TypedNote variant="post" title="Ghostwriter" pill="drafted" from="Declan O'Reilly" role="Group MD, Empathy" avatar="DO" subject="" items={GHOST_POST} />
          </figure>
          <Note>
            This post is written from what you said on our call about the
            name. The words are yours. The ghostwriter put them in order.
          </Note>

          <h3 className="ppug-h3">A writer for a brand</h3>
          <P>
            I read a lot about how AI writes slop. It does. But it does not have to,
            if you spend the time up front. Writers need to know the brand&rsquo;s
            positioning, the target audience, the insights and pain points in that
            category, the messaging and the tone of voice. Hover a dotted line below
            and it shows you which document that line came from.
          </P>
          <div style={{ marginTop: 26 }}>
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
          </div>
          <Note>
            The client and the finding in this email are invented. The idea
            of an answer hiding in plain sight is yours, from the call.
          </Note>
          <P>
            You asked on the call how the work stays different when everyone
            has the same tools. This is the answer. Two companies can use the
            same tool, and what each one gets out of it depends on what its
            writer was built on. A writer built on your audience, your
            positioning, your proof, your tone of voice and your messaging
            writes like you, and it shows which of those each line came from.
          </P>
          <P>
            Writers are the agents we have been building for longest. For a
            group with four brands it helps that once one writer is working,
            building the next one for a second brand is much less than twice
            the work.
          </P>
        </Agent>

        <Agent n={4} dek="We build search agents that run paid search every day, the terms, the ads and the bids, without you.">
          <P>
            We build search agents that take the daily work of paid search off
            you. Finding the terms, writing the ads, putting them live,
            reading the numbers and improving the account. Once we have built
            it, it works away every day without you being the bottleneck.
          </P>
          <figure className="ag-fig">
            <UnknownSearchWindow />
          </figure>
          <Note>
            This is how a morning could look for Empathy. Every search term,
            number and ad in it is invented.
          </Note>
        </Agent>

        <Agent n={5} dek="We build advertising agents that write, make, put live, read and remake ads, inside Meta or whichever tool you use, without you.">
          <P>
            We build advertising agents that do the work inside Meta, or
            another advertising tool, that used to be a full-time role or an
            agency. Once we have set it up properly, it works away every day
            without you being the bottleneck.
          </P>
          <figure className="ag-fig">
            <AdDeskWindow />
          </figure>
          <Note k="/real figures.">
            This one is not an example written for you. These are the figures
            from our own campaign for the free course.
          </Note>
        </Agent>

        <Agent n={6} dek="We build well crafted websites and set them up so you can make on-brand changes in a moment, without any design, UX or development knowledge.">
          <P>
            There was a time when building and maintaining a website took a
            team of people, and it took time. Someone had to coordinate the
            copywriting, the UX, the design, the imagery, the artwork, the
            motion, the building and the deploying. You still need all of
            those things. You no longer need all of those people to do them.
          </P>
          <h3 className="ppug-h3">Examples of systems we&rsquo;re building</h3>
          <P>
            These are two sites we have built in code for other companies.
            Each one is here in full, page by page, so scroll inside the
            windows. In both cases the look is written down as rules: the
            colours, the type, the spacing and the parts each page is made
            from. Those rules are what keep a change made months later, by
            someone on their own team, looking like the same company. The
            rules are here in full too.
          </P>

          <div id="web-di" className="ppug-part">
            <h3 className="ppug-h3">Data Intelligence</h3>
            <P>
              Data Intelligence is Dave Hackett&rsquo;s company. He had no
              senior marketer and wanted to move quickly, so I worked out
              the marketing with him and then built it. The old site was in
              Framer. We rebuilt it in code so that his team can change it by
              asking. Adding a pricing page, for example, is about ten minutes
              of work that doesn&rsquo;t need a designer.
            </P>
            <p className="ppug-k">The site, live now</p>
            <SiteScroller pages={DI_PAGES} pill="live" what="The Data Intelligence website" />
            <p className="ppug-k">The artwork: all 20 paintings</p>
            <P>
              Every picture on the site and in the decks is a painting from
              one family. There are twenty so far. They are made to one
              written description, so a new one made next year by someone on
              the team will sit beside these and look like the same company.
            </P>
            <BigRow
              what="The Data Intelligence paintings"
              unit="paintings"
              items={PAINTINGS.map((n) => ({ pic: `di-paint-${n}`, alt: "A painting made for Data Intelligence" }))}
            />
            <p className="ppug-k">How it was made: the written rules, all 47 pages</p>
            <P>
              These are the guidelines for the site and the product. Every
              value in them was measured off the live site, so what is
              written down is what is built.
            </P>
            <PageDeck count={47} prefix="di-guide-" what="The Data Intelligence guidelines" />
          </div>

          <div id="web-nova" className="ppug-part">
            <h3 className="ppug-h3">Nova</h3>
            <P>
              Nova is an HR technology advisory firm led by Cian Collins. This
              is their new site. It is not public yet, so these are pictures
              of every page. The look started from the name, which gave us a
              north star: one sky, one point of light in every picture, and
              the same star over every city they work in.
            </P>
            <p className="ppug-k">The new site</p>
            <SiteScroller pages={NOVA_PAGES} pill="not yet public" what="The new Nova website" />
            <p className="ppug-k">How it was made: the written rules, inside the site</p>
            <P>
              Nova&rsquo;s rules are pages of the site itself, so the team
              can open them like any other page. They set out the look, the
              photography, the exact type and colours, the parts every page is
              built from, the language and how people are shown. The site is
              set up so that Nova&rsquo;s own team can make changes by asking,
              and these rules keep the changes on brand.
            </P>
            <SiteScroller pages={NOVA_BRAND} pill="not yet public" what="Nova's brand rules" />
          </div>

          <P>
            The Website Agent Team is not five agents. It is the five parts of
            the work, which are the positioning and messaging framework, the
            UX and the navigation, the copywriting, the artwork, and then the
            design, the building and the deploying. The most important thing
            we do comes after the build. We set the site up so that anyone on
            your team, with no expertise, can make changes. Those changes are
            fast, they are on brand, and they look good.
          </P>
        </Agent>

        <Agent n={7} dek="We build brand guardians for brand teams whose stakeholders want speed, so the work stays on brand as it gets faster.">
          <Guardian />
        </Agent>

        <Agent n={8} dek="We build campaign managers that keep the marketing on track, either beside you every day or running a team of agents.">
          <P>
            We build campaign managers in two ways. The first is an AI you work with day to day. It tracks the delivery of the marketing tasks and keeps you on track each day. It captures your call transcripts, reads your emails and looks at your documents, so it knows what was agreed and what is due. It writes emails and puts them in your drafts. It creates invoices and sends status updates. Each morning it tells you what moved, what is late, and what is waiting on you.
          </P>
          <figure className="ag-fig">
            <TypedNote title="Campaign Manager" subject="Where everything stands, Monday" from="Campaign Manager" to="Declan" avatar="CM" items={PM} />
          </figure>
          <Note>
            This is how a Monday note could read for the group. The projects
            in it are invented.
          </Note>
          <h3 className="ppug-h3">Agents that follow things through</h3>
          <P>
            I have a project manager like this, and an agent that owns my
            inbox. What makes them useful is that they are proactive. An agent
            that tells you something once and then waits is a tool on a
            laptop. A proactive one follows things through, and it reaches you
            wherever you are. About half of my own work with my agents now
            happens from my phone.
          </P>
          <P>
            These are four of the rules I gave my inbox agent, from{" "}
            <a
              className="ppug-link"
              href="https://runwithfoxes.com/essays/how-i-build-proactive-agents"
              target="_blank"
              rel="noopener noreferrer"
            >
              How I build proactive agents
            </a>
            .
          </P>
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
        </Agent>

        <Agent n={9} dek="We build a red team into every team of agents, with one job, to find the mistakes before you do.">
          <P>
            Nobody asks for a red team, so we build one into every team of
            agents we make. Its only job is to find the holes, the gaps and
            the mistakes in everything the other agents do. In their role
            specs, in the quality of what they produce, and in the processes
            themselves.
          </P>
          <figure className="ag-fig">
            <TypedNote title="Red Team" subject="Six attacks, two broke, one gap" from="Red Team" to="Declan" avatar="RT" items={REDTEAM} />
          </figure>
          <Note>
            The red team here is checking the other examples on this page. The
            mistakes it found were put there for it to find.
          </Note>
        </Agent>

        <PPSection id="hub" k="11" title="A content hub">
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

        <PPSection id="howitworks" k="12" title="How it would work">
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

        <PPSection id="pricing" k="13" title="The price">
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
