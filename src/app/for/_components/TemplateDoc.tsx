"use client";

// THE TEMPLATE. Every module on one page, named and numbered, with the openings
// and the endings switchable so you can see the shape change rather than read a
// paragraph saying it can.
//
// Paul, 28 Aug 2026: "what would be useful is to have one very long template for
// proposal and we call it our template proposal and it has every module in there.
// and we name each module. I need to figure out how we show when we're including
// price, not including price, when it's not a proposal but just more information.
// And we have different openings now... And then everybody knows to look at this
// and pick the modules from it."
//
// This page takes over Kite's job as the thing people copy. Kite goes back to
// being the fictional company the course uses. Kite carried nine of the fifteen
// modules, which is why people copied Boreman or Affirm instead and the names
// wandered: an audit on 28 Aug found 43 distinct section titles across 129
// sections on eight pages.
//
// The module list lives in template-modules.json, which is the source of truth
// for this page AND for any agent picking modules. Pick by slug, never by number:
// the number is display order here and moves when a module is added.
//
// Furniture is marked on its own strip rather than left to a convention. Anything
// reading a built page would otherwise treat "What Run with Foxes does" as a
// module, because it is marked up exactly like one.
//
// NEVER SENT TO ANYONE. It carries real Sabre creative and real client numbers,
// so it stays behind the gate like every other page here.
//
// ⚠️ DRAFT COPY on the three modules that have only ever been on one page each:
// Advertising Agent, Brief Coach and Ghostwriter. They have no settled wording to
// lift, so it is written here once and Paul's pass is owed on it.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ProspectShell, { PPSection } from "./ProspectShell";
import { PricingCards, CoversGrid, CloseBox } from "./Pricing";
import LibraryList from "./LibraryList";
import WebsiteHero from "./WebsiteHero";
import CardCascade from "./library/CardCascade";
import ChatWindow from "./library/ChatWindow";
import { BRIEF_COACH_SESSION } from "./library/brief-coach-session";
import { Figure } from "./library/Figure";
import FourThingsFigure from "./library/FourThingsFigure";
import { ScaledWindow, OutreachWindow } from "./library/AgentWindows";
import { WriterEmail } from "./library/WriterPiece";
import ArrivalBlueprint from "./library/ArrivalBlueprint";
import WorkGrid from "./library/WorkGrid";
import BrandGuardian from "./library/BrandGuardian";
import CreativeDirector from "./library/CreativeDirector";
import AdMachine from "./library/AdMachine";
import GeoAudit from "./library/GeoAudit";
import { PipelineBoard, JoNote, CampaignWindow } from "./library/GrowthManager";
import ReportingSuite from "./library/ReportingSuite";
import MODULES from "./template-modules.json";
import "./library/four-things.css";
import "./fidelity-cases.css";
import "./pricing.css";

// ⛔ Every person and firm here is invented. Kite Insurance is the course's
// fictional company and this is its world.
const OUTREACH_THREADS = [
  {
    name: "Órla Deane",
    company: "Operations Manager · Sliabh Coach Hire",
    message:
      "Hi Órla - you run sixteen vehicles and renew them all on different dates, which usually means nobody is quoting the market on any of them. We do that once a year and move you only if someone is cheaper. Worth ten minutes?",
    reply: "Sixteen dates is exactly the problem. Send me a time.",
  },
  {
    name: "Peter Nolan",
    company: "Finance Director · Harbourview Group",
    message:
      "Hi Peter - your renewal usually lands with a rise attached and paying it beats a fortnight of forms. We quote the market three weeks before the date and do the paperwork if we move you. Nothing for you to do either way.",
    reply: "That is the bit that annoys me every year. Go on.",
  },
  {
    name: "Aoife Traynor",
    company: "Owner · Traynor Joinery",
    message:
      "Hi Aoife - small firms tend to stay put because switching is a nuisance rather than because the price is right. We take the nuisance out and tell you what we found, whether we move you or not.",
    reply: "Stayed with the same crowd nine years. Tell me more.",
  },
];

const MOD = Object.fromEntries(MODULES.modules.map((m) => [m.slug, m]));

// ⛔ SECTIONS and RAIL_GROUPS have to follow the shape, not sit still. The rail
// is driven by this list, so a static one keeps offering "The price" after the
// price section has been switched off and the link scrolls nowhere. That is the
// module sweep failing in the one place a reader notices. Same for the k numbers:
// dropping a section in the middle makes every number after it wrong.
const ALL_SECTIONS = [
  { id: "heard", title: "What this is" },
  { id: "howiwork", title: "What we do" },
  { id: "whatwedo", title: "What Run with Foxes does" },
  { id: "changing", title: "Changing how the team works" },
  { id: "m-rethinking-the-roles", title: "1. Rethinking the roles" },
  { id: "m-redesigning-workflows", title: "2. Redesigning workflows" },
  { id: "m-team-ai-adoption", title: "3. Designing team AI adoption" },
  { id: "m-training-teams", title: "4. Training teams" },
  { id: "buildingagents", title: "Building agents" },
  { id: "m-growth-agent", title: "5. Growth Agent" },
  { id: "m-outbound-agent", title: "6. Outbound Agent" },
  { id: "m-ai-writer", title: "7. AI Writer" },
  { id: "m-brand-guardian", title: "8. Brand Guardian" },
  { id: "m-creative-director", title: "9. Creative Director" },
  { id: "m-advertising-agent", title: "10. Advertising Agent" },
  { id: "m-brief-coach", title: "11. Brief Coach" },
  { id: "m-ghostwriter", title: "12. Ghostwriter" },
  { id: "m-lifecycle-agent", title: "13. Lifecycle Agent" },
  { id: "m-search-agent", title: "14. Search Agent" },
  { id: "m-website-agent", title: "15. Website Agent" },
  { id: "m-reporting-suite", title: "16. Reporting Suite" },
  { id: "howitworks", title: "How it would work" },
  { id: "use", title: "How your team would use it" },
  { id: "weeks", title: "The first weeks" },
  { id: "infra", title: "No Claude licence needed" },
  { id: "after", title: "What comes after" },
  { id: "recommend", title: "What we'd recommend" },
  { id: "pricing", title: "The price" },
  { id: "work", title: "Case studies" },
  { id: "library", title: "Essays" },
  { id: "next", title: "The next step" },
];

const AGENT_IDS = [
  "growth-agent",
  "outbound-agent",
  "ai-writer",
  "brand-guardian",
  "creative-director",
  "advertising-agent",
  "brief-coach",
  "ghostwriter",
  "lifecycle-agent",
  "search-agent",
  "website-agent",
  "reporting-suite",
];

const CHANGE_IDS = [
  "rethinking-the-roles",
  "redesigning-workflows",
  "team-ai-adoption",
  "training-teams",
];

function sectionsFor(shape: string) {
  const drop = new Set<string>();
  if (shape === "information") drop.add("recommend");
  if (shape !== "priced") drop.add("pricing");
  return ALL_SECTIONS.filter((s) => !drop.has(s.id));
}

// The k numbers on the top-level sections, worked out from what is actually on
// the page rather than written down twice.
function numbersFor(shape: string) {
  const tops = [
    "heard",
    "howiwork",
    "whatwedo",
    "changing",
    "buildingagents",
    "howitworks",
    "recommend",
    "pricing",
    "work",
    "library",
    "next",
  ].filter((id) => sectionsFor(shape).some((s) => s.id === id));
  const out: Record<string, string> = {};
  tops.forEach((id, i) => {
    out[id] = String(i + 1).padStart(2, "0");
  });
  return out;
}

const RAIL_GROUPS_BASE = [
  {
    label: "/what we do",
    entries: [
      {
        id: "changing",
        title: "Changing how the team works",
        num: "01",
        ids: ["changing", ...CHANGE_IDS.map((s) => "m-" + s)],
        children: CHANGE_IDS.map((s) => ({
          id: "m-" + s,
          title: MOD[s].number + ". " + MOD[s].name,
        })),
      },
      {
        id: "buildingagents",
        title: "Building agents",
        num: "02",
        ids: ["buildingagents", ...AGENT_IDS.map((s) => "m-" + s)],
        children: AGENT_IDS.map((s) => ({
          id: "m-" + s,
          title: MOD[s].number + ". " + MOD[s].name,
        })),
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
];

function railFor(shape: string) {
  const also = [
    { id: "recommend", title: "What we'd recommend" },
    { id: "pricing", title: "The price" },
    { id: "work", title: "Case studies" },
    { id: "next", title: "The next step" },
  ].filter((e) => sectionsFor(shape).some((s) => s.id === e.id));
  return [...RAIL_GROUPS_BASE, { label: "/also", compact: true, entries: also }];
}

// ⛔ The shell's own nav is position:fixed at top:0 with z-index:100, and
// .pps-shell clears it with padding-top:128px. A sticky bar at top:0 renders
// UNDERNEATH it and is invisible, which is exactly what happened on the first
// build. So the bar is fixed above the nav, and everything the nav's height was
// holding up gets pushed down by the bar's measured height instead of a guess:
// the bar wraps to two rows on a narrow window, so a hard-coded offset is wrong
// at the width it matters most.
const CSS = `
.pptm-bar{position:fixed;top:0;left:0;right:0;z-index:200;background:var(--deep-sky,#1A3A4E);color:#F7EAD9;
  padding:14px 24px;display:flex;gap:34px;flex-wrap:wrap;align-items:center;
  font-family:var(--mono,'JetBrains Mono',monospace);font-size:11px;letter-spacing:1.5px}
.pps-nav{top:var(--pptm-h,0px)}
.pps-shell{padding-top:calc(128px + var(--pptm-h,0px))}
.pps-railcol{top:calc(96px + var(--pptm-h,0px))}
.ppwh{margin-top:calc(var(--pptm-h,0px) + var(--pptm-nav,0px))}
.pptm-bar b{font-weight:400;text-transform:uppercase;opacity:.55;margin-right:10px}
.pptm-grp{display:flex;align-items:center;gap:8px}
.pptm-btn{background:none;border:1px solid rgba(247,234,217,.28);color:inherit;
  font:inherit;letter-spacing:1.5px;padding:6px 12px;cursor:pointer;text-transform:uppercase}
.pptm-btn:hover{border-color:rgba(247,234,217,.6)}
.pptm-btn[aria-pressed="true"]{background:#F7EAD9;color:#1A3A4E;border-color:#F7EAD9}
.pptm-note{opacity:.55;letter-spacing:.5px;text-transform:none;font-size:11px;flex-basis:100%}

.pptm-strip{border:1px solid var(--border,#E0E0DC);border-left:3px solid var(--sky-blue,#3A7CA5);
  padding:14px 18px;margin-bottom:26px;
  font-family:var(--mono,'JetBrains Mono',monospace);font-size:11.5px;line-height:1.6}
.pptm-strip .pptm-h{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap;margin-bottom:6px}
.pptm-num{color:var(--sky-blue,#3A7CA5);letter-spacing:2px}
.pptm-slug{opacity:.5;letter-spacing:.5px}
.pptm-kind{margin-left:auto;letter-spacing:2px;text-transform:uppercase;opacity:.6}
.pptm-shows{opacity:.85}
.pptm-req{margin-top:8px;padding-top:8px;border-top:1px solid var(--border,#E0E0DC);opacity:.7}
.pptm-strip.pptm-furn{border-left-color:var(--muted,#8A8A85)}
.pptm-strip.pptm-furn .pptm-num{color:var(--muted,#8A8A85)}
`;

function ModuleStrip({ slug }: { slug: string }) {
  const m = MOD[slug];
  return (
    <div className="pptm-strip">
      <div className="pptm-h">
        <span className="pptm-num">MODULE {String(m.number).padStart(2, "0")}</span>
        <span className="pptm-slug">{m.slug}</span>
        <span className="pptm-kind">
          {m.kind === "demonstration" ? "live demonstration" : "figure and prose"}
        </span>
      </div>
      <div className="pptm-shows">{m.shows}</div>
      {m.requires && <div className="pptm-req">Before you pick it: {m.requires}</div>}
    </div>
  );
}

function FurnitureStrip({ id }: { id: string }) {
  const f = MODULES.furniture.find((x) => x.id === id);
  if (!f) return null;
  return (
    <div className="pptm-strip pptm-furn">
      <div className="pptm-h">
        <span className="pptm-num">PAGE FURNITURE</span>
        <span className="pptm-slug">{f.id}</span>
        <span className="pptm-kind">not a module, never picked</span>
      </div>
      <div className="pptm-shows">{f.note}</div>
    </div>
  );
}

export default function TemplateDoc() {
  const [opening, setOpening] = useState<"rebuild" | "plain">("plain");
  const [shape, setShape] = useState<"priced" | "capabilities" | "information">(
    "priced"
  );
  const bar = useRef<HTMLDivElement>(null);

  // Measure the bar and hand its height to the CSS, so the shell's fixed nav and
  // its 128px of top padding both move down by however tall the bar actually is.
  // useLayoutEffect so it lands before the first paint rather than as a jump.
  useLayoutEffect(() => {
    // Two measurements. The bar pushes the shell's fixed nav down; the nav then
    // pushes the rebuilt site down, so the chrome sits above the rebuild rather
    // than across the middle of it. Boreman gets away without this because it
    // has no control bar and its nav lands on the hero's top edge.
    const fit = () => {
      const h = bar.current?.offsetHeight ?? 0;
      const nav =
        (document.querySelector(".pps-nav") as HTMLElement | null)
          ?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--pptm-h", h + "px");
      document.documentElement.style.setProperty("--pptm-nav", nav + "px");
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // The bar wraps when the buttons change width, so remeasure after a switch.
  useEffect(() => {
    const h = bar.current?.offsetHeight ?? 0;
    const nav =
      (document.querySelector(".pps-nav") as HTMLElement | null)?.offsetHeight ??
      0;
    document.documentElement.style.setProperty("--pptm-h", h + "px");
    document.documentElement.style.setProperty("--pptm-nav", nav + "px");
  }, [opening, shape]);

  const priced = shape === "priced";
  const info = shape === "information";
  const K = numbersFor(shape);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="pptm-bar" ref={bar}>
        <div className="pptm-grp">
          <b>Opening</b>
          {MODULES.openings.map((o) => (
            <button
              key={o.id}
              className="pptm-btn"
              aria-pressed={opening === o.id}
              onClick={() => setOpening(o.id as "rebuild" | "plain")}
            >
              {o.name}
            </button>
          ))}
        </div>
        <div className="pptm-grp">
          <b>Shape</b>
          {MODULES.shapes.map((s) => (
            <button
              key={s.id}
              className="pptm-btn"
              aria-pressed={shape === s.id}
              onClick={() =>
                setShape(s.id as "priced" | "capabilities" | "information")
              }
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="pptm-note">
          This is the template, not a client page. Every module is on it so you can
          pick from it. Pick by the slug on each strip rather than the number,
          because the number moves when a module is added.
        </div>
      </div>

      {opening === "rebuild" && (
        <WebsiteHero
          src="/for/boreman/index.html"
          url="boremanltd.com"
          href="/for/boreman/index.html"
        />
      )}

      <ProspectShell
        clientName="the template"
        eyebrow="The template. Every module, named and numbered. Never sent to anyone."
        title="Marketing Agents for your business"
        standfirst={[]}
        sections={sectionsFor(shape)}
        railGroups={railFor(shape)}
      >
        <PPSection id="heard" k={K["heard"]} title="What this is">
          <FurnitureStrip id="heard" />
          <p className="pps-standfirst">
            The client&rsquo;s own situation goes here and nowhere else on the
            page. Two or three sentences of what they told us on the call, in
            their words rather than ours, and then the line that says everything
            below is our own work or a demonstration we built. One call does not
            make us experts in how they run, and saying so here is what lets every
            exhibit underneath be generic without it reading as a dodge.
          </p>
          {opening === "rebuild" && (
            <p className="pps-standfirst" style={{ marginTop: 22 }}>
              When the page opens on their own site rebuilt, this section is also
              where you say so, because it is the one thing above that is about
              them. The rebuild shown at the top of this template is Boreman&rsquo;s.
            </p>
          )}
        </PPSection>

        <PPSection id="howiwork" k={K["howiwork"]} title="What we do">
          <FurnitureStrip id="howiwork" />
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
              look like here? Not what AI can do, but what the best version of this
              marketing would be, and the level of quality and effectiveness I
              would want to stand over.
            </p>
            <p className="pps-standfirst">
              So I start where I always have. If there were no AI at all, what team
              would I hire to do this properly? I map that team first, the one I
              would build in a world before any of this existed.
            </p>
            <p className="pps-standfirst">
              Then I build exactly that, with agents instead of hires. The quality
              bar is set by the team I would have wanted, not by whatever a tool
              happens to make easy. Twenty years in brand is what tells me where
              that bar sits: Head of Brand at O2 Ireland, then CMO at the National
              Lottery, Head of Brand at Indeed and Miro, both global roles.
              Positioning, messaging and tone written first, then built into
              everything the agents make.
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
                &ldquo;Paul reported into me as Head of Brand when I was at Indeed.
                I have learned more from him than anyone else in my career.&rdquo;
              </p>
              <div className="pps-hiw-who">
                <b>Paul D&rsquo;Arcy</b>
                <br />
                CMO, Moloco. Former CMO at Miro and Indeed
              </div>
            </div>
          </div>
        </PPSection>

        <PPSection id="whatwedo" k={K["whatwedo"]} title="What Run with Foxes does">
          <FurnitureStrip id="whatwedo" />
          <FourThingsFigure />
          <p className="pps-standfirst" style={{ marginTop: 24 }}>
            I firmly believe that marketing structures, marketing teams and
            marketing roles are going to change dramatically in the next few years,
            and the work we do is all around that. We train teams. We build AI
            agents and capabilities for them, or with them. We work with marketing
            leaders to re-imagine what future workflows could look like, and we
            design AI adoption programmes for them.
          </p>
        </PPSection>

        <PPSection id="changing" k={K["changing"]} title="Changing how the team works">
          <p className="pps-standfirst">
            Four modules. These are about how the work gets done rather than about
            a thing we hand over, so they suit a company with a marketing team.
            A company of five has no workflow to redesign and these come out.
          </p>
        </PPSection>

        <PPSection id="m-rethinking-the-roles" sub title="1. Rethinking the roles">
          <ModuleStrip slug="rethinking-the-roles" />
          <Figure name="fig-12" />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            The things that used to be whole roles become tasks inside somebody
            else&rsquo;s job. Somebody owned social. Somebody owned email. Somebody
            owned search. The work moved between them and days went at every
            handover, and more days again when an agency was in the chain. Most of
            those jobs are now a task inside a role, run by an agent taught the
            client&rsquo;s positioning, customers, tone and rules.
          </p>
        </PPSection>

        <PPSection id="m-redesigning-workflows" sub title="2. Redesigning workflows">
          <ModuleStrip slug="redesigning-workflows" />
          <ArrivalBlueprint />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            Redesigning workflows is the harder work and it is where the gain
            actually is. Adding tools on top of how a team already works moves the
            bottleneck along rather than removing it, which is why so many
            companies report AI everywhere and no measurable productivity. The
            whole team has to move or it lands on legal, or brand, or whoever did
            not.
          </p>
        </PPSection>

        <PPSection id="m-team-ai-adoption" sub title="3. Designing team AI adoption">
          <ModuleStrip slug="team-ai-adoption" />
          <WorkGrid />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            Not everybody is going to be a builder, and that is fine. Every
            marketing team will soon have at least one person who builds and who
            helps the other teams with their work. What we measure is simple:
            pieces of work now done a different way, not logins or prompt counts.
          </p>
        </PPSection>

        <PPSection id="m-training-teams" sub title="4. Training teams">
          <ModuleStrip slug="training-teams" />
          <div style={{ marginTop: 26 }}>
            <ScaledWindow width={940}>
              <div className="ppw-blueprint">
                <div className="ppw-frame-win">
                  <div className="ppw-tl">
                    <i />
                    <i />
                    <i />
                    <span className="ppw-t">the course, module one</span>
                    <span className="ppw-live-pill">free, live now</span>
                  </div>
                  <video
                    src="/for/training/course-module-1-scroll-web.mp4"
                    poster="/for/training/course-module-1-scroll-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ display: "block", width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </ScaledWindow>
          </div>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            For larger companies that cannot change the tools they use, training is
            often the whole engagement. The course is free and real, so this module
            can be shown to anyone without it costing us anything.
          </p>
        </PPSection>

        <PPSection id="buildingagents" k={K["buildingagents"]} title="Building agents">
          <p className="pps-standfirst">
            Eleven modules. Each one is a thing we build and hand over, or build and
            run. Two or three done properly beats six half done, so a real page
            carries three or four of these rather than all eleven.
          </p>
        </PPSection>

        <PPSection id="m-growth-agent" sub title="5. Growth Agent">
          <ModuleStrip slug="growth-agent" />
          <PipelineBoard />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            The single point of contact for the pipeline. It opens the board every
            morning for the marketer to look at with it, keeps it current without
            anyone typing into a spreadsheet, and does the analysis to find where
            things are getting stuck.
          </p>
          <div style={{ marginTop: 26 }}>
            <JoNote />
          </div>
          <div style={{ marginTop: 26 }}>
            <CampaignWindow />
          </div>
          <p className="ppft-honest">
            <span className="ppft-slash">/illustrative.</span> Every firm and person
            in these windows is invented. The machinery is real and running, a
            client version would be built to their world and their rules, and
            nothing in it sends until someone on their team says go.
          </p>
        </PPSection>

        <PPSection id="m-outbound-agent" sub title="6. Outbound Agent">
          <ModuleStrip slug="outbound-agent" />
          <p className="pps-standfirst">
            It builds the list, finds the right person at each company, enriches
            each one with what is actually happening there, writes to each of them
            about their own situation rather than sending one message to everybody,
            sends it, and reads what comes back. It also checks its list against
            everyone already contacted.
          </p>
          <div style={{ marginTop: 26 }}>
            <OutreachWindow
              threads={OUTREACH_THREADS}
              title="Outreach"
              sentLabel="84 sent"
              width={720}
            />
          </div>
          <p className="ppft-honest">
            <span className="ppft-slash">/illustrative.</span> Every person and firm
            in this window is invented and the threads are written in the
            client&rsquo;s own world, never using a real contact of theirs.
          </p>
        </PPSection>

        <PPSection id="m-ai-writer" sub title="7. AI Writer">
          <ModuleStrip slug="ai-writer" />
          <p className="pps-standfirst">
            I read a lot about how AI writes slop. It does. But it does not have to,
            if you spend the time up front. Writers need to know the brand&rsquo;s
            positioning, the target audience, the insights and pain points in that
            category, the messaging and the tone of voice. Hover a dotted line below
            and it shows you which document that line came from.
          </p>
          <div style={{ marginTop: 26 }}>
            <WriterEmail
              subject={{
                text: "Your renewal is due on 14 September",
                note: "voice",
              }}
              body={[
                { text: "Hi Sarah," },
                {
                  text: "Before it renews, we'll quote the market for you.",
                  note: "positioning",
                },
                {
                  text: "Last year most people in your position paid the price they were sent. It was a bit higher than the year before, and paying it beat a fortnight of forms and four websites asking the same eleven questions.",
                },
                {
                  text: "That increase was never compulsory. It was the cost of staying put.",
                  note: "messaging",
                },
                {
                  text: "So about three weeks before your date we'll check what everyone else would charge for the same cover. If someone is cheaper, we move you and do the paperwork. If nobody is, you stay where you are. Either way you'll get a note saying what we found and what we chose.",
                  note: "messaging",
                },
                {
                  text: "The first time we did this, customers saved €187 on average.",
                  note: "proof",
                },
                { text: "Nothing for you to do.", note: "voice" },
              ]}
              sign={["Aoife", "Kite"]}
            />
          </div>
        </PPSection>

        <PPSection id="m-brand-guardian" sub title="8. Brand Guardian">
          <ModuleStrip slug="brand-guardian" />
          <BrandGuardian />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            Any asset goes in, gets checked against the brand&rsquo;s own rules, and
            comes back either passed or with the specific fixes. It works out what
            type of asset it is first and then checks it against that type&rsquo;s
            pattern, so the gates that run depend on the file.
          </p>
        </PPSection>

        <PPSection id="m-creative-director" sub title="9. Creative Director">
          <ModuleStrip slug="creative-director" />
          <CreativeDirector />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            The design system converted into code, so anyone on the team can ask for
            work and get something on brand back. It turns a vague request into a
            proper brief before it makes anything, following the rules you would
            teach an art director. The work shown is Sabre&rsquo;s, with their name
            on it, because we build and run these machines for them.
          </p>
        </PPSection>

        {/* ⚠️ DRAFT. Advertising Agent has only ever been on Boreman, Affirm,
            Return2Sender and Great National in passing, with no settled wording.
            Paul's pass is owed on this paragraph. */}
        <PPSection id="m-advertising-agent" sub title="10. Advertising Agent">
          <ModuleStrip slug="advertising-agent" />
          <AdMachine />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            The same discipline pointed at advertising. The team approves one master
            ad and the machine makes every other size, holding the brand exactly.
            One approved piece becomes a banner for a show, a page on a
            partner&rsquo;s site, a magazine ad, or a month of posts.
          </p>
        </PPSection>

        {/* ⚠️ DRAFT. Brief Coach is on Kite and Affirm only. Paul's pass owed. */}
        <PPSection id="m-brief-coach" sub title="11. Brief Coach">
          <ModuleStrip slug="brief-coach" />
          <div style={{ marginTop: 26 }}>
            <ChatWindow
              session={BRIEF_COACH_SESSION}
              start="Watch the coach pressure-test a launch brief: where its KPIs sit on the ladder, which of them is a commercial outcome, and what is missing."
              title="brief coach"
              preview
            />
          </div>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            Most bad work starts with a brief nobody argued with. The coach asks the
            questions a good strategist would ask, and keeps asking until the plan
            is sharp: what is the commercial outcome, which number actually moves
            it, and what is missing that nobody has noticed.
          </p>
        </PPSection>

        {/* ⚠️ DRAFT. Ghostwriter is on Affirm only. Paul's pass owed. */}
        <PPSection id="m-ghostwriter" sub title="12. Ghostwriter">
          <ModuleStrip slug="ghostwriter" />
          <CardCascade
            id="pptmgw"
            top={{ name: "Ghostwriter", lbl: "your point of view", icon: "pen" }}
            kids={[
              { name: "Long piece", lbl: "worth reading", icon: "book" },
              { name: "Posts", lbl: "LinkedIn", icon: "pen" },
              { name: "Chart", lbl: "the evidence", icon: "chart" },
              { name: "Newsletter", lbl: "email", icon: "mail" },
            ]}
            ariaLabel="The Ghostwriter card with four formats falling out of it: long piece, posts, chart, newsletter"
          />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            The experts in a company know things their customers would pay to learn,
            and almost none of it leaves the building. Writing something worth
            reading is slow, and the people who know the most have the least time.
            Once a week this reads where the subject is being argued about, brings
            the material back, and turns a point of view into that person&rsquo;s own
            words. They pick the ones worth publishing. It takes about ten minutes
            of their time and the thinking stays theirs.
          </p>
        </PPSection>

        <PPSection id="m-lifecycle-agent" sub title="13. Lifecycle Agent">
          <ModuleStrip slug="lifecycle-agent" />
          <CardCascade
            id="pptmlc"
            top={{ name: "Lifecycle", lbl: "every moment", icon: "mail" }}
            kids={[
              { name: "Onboard", lbl: "new signup", icon: "person" },
              { name: "Nudge", lbl: "no order yet", icon: "mail" },
              { name: "Win back", lbl: "gone quiet", icon: "loop" },
              { name: "Grow", lbl: "ready to buy", icon: "chart" },
            ]}
            ariaLabel="The Lifecycle Agent card with four moments falling out of it: onboard, nudge, win back, grow"
          />
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            Lifecycle email is the work of keeping and growing the people who
            already know you. Onboarding a new signup, nudging someone who has not
            bought yet, winning back a customer who has gone quiet, growing the ones
            ready for more. It is where a lot of revenue comes from and it usually
            gets skipped because it never stops.
          </p>
        </PPSection>

        <PPSection id="m-search-agent" sub title="14. Search Agent">
          <ModuleStrip slug="search-agent" />
          <p className="pps-standfirst">
            Paid search, organic search and the AI answers run as one thing. The
            part people have not caught up with is the last one: whether a brand
            turns up when somebody asks ChatGPT or Perplexity, which is decided
            less by its own website than by whether other credible places talk
            about it. Below is a real measured sample for one client.
          </p>
          <div style={{ marginTop: 26 }}>
            <GeoAudit />
          </div>
        </PPSection>

        <PPSection id="m-website-agent" sub title="15. Website Agent">
          <ModuleStrip slug="website-agent" />
          <p className="pps-standfirst">
            Their own site rebuilt by us, live, at the very top of the page before
            any of our words. It is a real page in an iframe rather than a
            screenshot. Switch the opening at the top of this template to see it.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            After it is built they change it by asking. Ten new photographs on a
            page, a new line for one audience, a page for a conference next month.
            The two things it unlocks are a page built for one company when they
            reply to an outbound message, and a site that AI search can actually
            read.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            Say plainly on a real page that it was built on spec from their public
            website and nothing else, and that a proper brief and an hour of their
            time would make it considerably better. It is true, and it stops a
            rebuild made from the outside being read as our best work.
          </p>
        </PPSection>

        <PPSection id="m-reporting-suite" sub title="16. Reporting Suite">
          <ModuleStrip slug="reporting-suite" />
          <p className="pps-standfirst">
            One place the whole funnel can be read, when it is currently spread
            across a CRM, an analytics tool and a folder of spreadsheets. The
            stages across the top are named the way the client names them on the
            call, because a marketing director who says traffic, leads, MQL and
            closed won should see those four words and not a vendor&rsquo;s.
          </p>
          <div style={{ marginTop: 26 }}>
            <ReportingSuite />
          </div>
          <p className="pps-standfirst" style={{ marginTop: 30 }}>
            The second agent on the bottom row is the part that earns this module
            its place. One agent assembles the numbers and another checks them
            against the sources before the report goes out, which is what makes a
            number a buyer or a board will accept.
          </p>
          <p className="pps-standfirst" style={{ marginTop: 22 }}>
            Every figure inside the frame is invented and the exhibit says so on
            its face. Keep the client&rsquo;s own real totals out of the frame and
            put them in the prose around it. Illustrative numbers sitting beside
            real ones read as measured too, and then the page has claimed we
            looked at a funnel we have never seen.
          </p>
        </PPSection>

        <PPSection id="howitworks" k={K["howitworks"]} title="How it would work">
          <FurnitureStrip id="howitworks" />
          <p className="pps-standfirst">
            The same four things are true of everything above, so they are worth
            saying once.
          </p>
        </PPSection>

        <PPSection id="use" sub title="How your team would use it">
          <p className="pps-standfirst">
            The person who runs this on their side goes to a private page on our
            site with a password on it. They ask for what they need in plain
            English and the finished work comes back to them. There is nothing to
            install and nobody to train.
          </p>
        </PPSection>

        <PPSection id="weeks" sub title="The first weeks">
          <p className="pps-standfirst">
            The work is ours rather than theirs. They send over their existing
            material and whatever they have on positioning and customers, and we
            take it apart and teach the machine their rules. That is the
            calibration, it happens once, and it decides whether everything
            afterwards looks like them or looks like nothing in particular.
          </p>
        </PPSection>

        <PPSection id="infra" sub title="No Claude licence needed">
          <p className="pps-standfirst">
            It runs on our account, behind our page. There is nothing for them to
            buy, install or maintain, and no software for anyone to learn.
          </p>
        </PPSection>

        <PPSection id="after" sub title="What comes after">
          <p className="pps-standfirst">
            If they would rather run it themselves at any point, we hand it over.
            They run it in their own Claude account and the monthly stops.
          </p>
        </PPSection>

        {!info && (
          <PPSection id="recommend" k={K["recommend"]} title="What we'd recommend">
            <FurnitureStrip id="recommend" />
            <p className="pps-standfirst">
              Name the one thing to do first and say why, in their language rather
              than ours. On a priced page this sits directly above the price and
              names which option Paul would take. It comes off the page entirely on
              the information-only shape, because recommending something is the
              start of a decision and that shape is deliberately not asking for one.
            </p>
          </PPSection>
        )}

        {priced && (
          <PPSection id="pricing" k={K["pricing"]} title="The price">
            <FurnitureStrip id="pricing" />
            <PricingCards
              cards={[
                {
                  label: "Option A",
                  title: "The first piece of work",
                  bullets: [
                    "One capability, built and handed over",
                    "A short timeline, so they see something working quickly",
                    "A private page with a password for their team",
                    "The smallest sensible thing that is still worth doing",
                  ],
                  price: "€X plus VAT",
                  note: "One off. Paul's number, never worked back from a day rate.",
                },
                {
                  label: "Option B",
                  title: "The one we expect them to take",
                  bullets: [
                    "Everything in option A",
                    "The ongoing programme rather than a single build",
                    "Reviewed together after three months",
                    "This is the card that carries featured, and no other one does",
                  ],
                  price: "€X a month",
                  note: "Twelve months. Plus VAT.",
                  featured: true,
                },
                {
                  label: "Option C",
                  title: "The whole system",
                  bullets: [
                    "Everything in option B across the whole team",
                    "Priced well above B on purpose",
                    "Has to be a real thing we would genuinely deliver",
                    "It exists so option B reads as the sensible middle",
                  ],
                  price: "€X a month",
                  note: "Twelve months. Plus VAT.",
                },
              ]}
            />
            <CoversGrid
              covers={[
                "All build and calibration work",
                "Sessions to get what is in their head",
                "Running it for the agreed period",
                "A named point of contact, Paul",
              ]}
              notCovered={[
                "Any tool subscriptions on their side",
                "Advertising or any media spend",
                "New photography shot on location",
              ]}
            />
            <p className="pps-standfirst" style={{ marginTop: 30 }}>
              Where only one thing is being bought, this becomes a single card
              rather than three. Ace Express went out that way on Paul&rsquo;s
              instruction. Three cards only earn their place when there is a real
              choice to anchor.
            </p>
            <CloseBox clientName="your team" />
          </PPSection>
        )}

        <PPSection id="work" k={K["work"]} title="Case studies">
          <FurnitureStrip id="work" />
          <p className="pps-standfirst">
            Starting with the big companies, and with the one I did from the inside,
            running the teams rather than advising them.
          </p>
          <div className="pfd-cases" style={{ marginTop: 26 }}>
            <div className="pfd-case">
              <h3>Moloco</h3>
              <p className="pfd-case-k">50 to 60 marketers</p>
              <p>
                They wanted to hire a copywriter. I persuaded them to let me build
                copywriters in AI instead, and they use them all the time. I am also
                building them a brand guardian, and an AI identity generator, which
                takes all the elements of their brand identity and reproduces them
                at speed.
              </p>
            </div>
            <div className="pfd-case">
              <h3>Miro</h3>
              <p className="pfd-case-k">150 marketers</p>
              <p>
                We were spending about $1.2 million on design and studio work. When
                I realised what was possible I set a target to reduce it by 20%, and
                we took $240,000 out inside a year.
              </p>
            </div>
            <div className="pfd-case">
              <h3>Sabre</h3>
              <p className="pfd-case-k">AI adoption programme, marketing first</p>
              <p>
                I have built them writers, brand guardians, a search agent, a brief
                coach, and an advertising creative role. We build and run those
                machines for them, and they are named here because they are happy to
                be.
              </p>
            </div>
          </div>
        </PPSection>

        <PPSection id="library" k={K["library"]} title="Essays">
          <FurnitureStrip id="library" />
          <LibraryList
            intro="A few things worth keeping, picked for where they are now. Swap these per client rather than sending the same four every time."
            items={[
              {
                label: "The 95:5 rule and the day one list",
                note: "Why most of the people who could buy from you are not buying from anyone this quarter.",
                href: "/essays/the-95-5-rule-the-day-one-list",
                kind: "file",
                meta: "essay",
              },
              {
                label: "How I build an AI writer",
                note: "What actually goes into one, and why the folder of documents is the whole job.",
                href: "/essays/how-i-build-an-ai-writer",
                kind: "file",
                meta: "essay",
              },
              {
                label: "AI Fluency for Ambitious Marketers",
                note: "The course, free, for anyone on their team. Module one lands 21 September.",
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

        <PPSection id="next" k={K["next"]} title="The next step">
          <FurnitureStrip id="next" />
          {info ? (
            <p className="pps-standfirst">
              On the information-only shape this is the close, and it asks for a
              conversation rather than a decision. An hour with the person who owns
              the work, or a couple of hours to see how it actually gets done, and
              the proposal comes after that. No price has appeared anywhere above
              it, so nothing here should read as a discount or a hesitation.
            </p>
          ) : (
            <p className="pps-standfirst">
              On a priced page this follows the price and says what happens if they
              say yes. What we need from them, when we would start, and when we
              would come back and look at it together.
            </p>
          )}
        </PPSection>
      </ProspectShell>
    </>
  );
}
