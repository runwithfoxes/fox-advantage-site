"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import "./agent-windows.css";

/*
  AGENT WINDOWS - the four animated "app window" cards from the homepage hero
  (src/components/AgentsHero.tsx: OUTREACH inbox, RESEARCH email, TERMINAL,
  BLUEPRINT/Campaign workflow), ported as standalone, reusable components.

  AgentsHero.tsx is the source. It positions all five of its windows with
  absolute placement inside one big hero stage sized to the viewport, and
  most of its content is written into empty DOM nodes by its effect (the
  research email body, the terminal's typed line, the outreach conversation
  stream all start as empty elements in the JSX and only get real content
  once the effect runs). That is fine for a homepage hero people scroll into
  slowly, but wrong for a component meant to drop into ordinary page flow:
  if JS is slow, disabled, or the component is off-screen when it mounts,
  the window would sit there empty.

  So here every window's starting content is real JSX, fully legible on
  first paint. Each component's own useEffect then starts the same kind of
  animation loop the hero used (cycling threads, a stagger reveal, a
  typewriter, a workflow run), scoped to that instance via refs/state rather
  than global querySelector calls, so more than one of the same window can
  exist on a page without fighting over the same DOM nodes.

  All default sample content below is invented and generic - no real
  people, companies, or products.
*/

/* =========================================================================
   ScaledWindow - shared wrapper that gives every window an explicit design
   width, then scales it down (never up) to fit whatever holder it's dropped
   into.

   FidelityDoc.tsx (src/app/proposals/fidelity/FidelityDoc.tsx lines 135-140,
   228-251) tried this same idea first and the windows bled past their
   container. Two things caused that, both designed out here:

   1. The lifted window had no width of its own - it relied on a CSS rule
      that only existed in the hero's stylesheet, so outside the hero it
      just reflowed to the holder's width before the transform ever ran,
      then got scaled down AGAIN on top of that (double-shrink), or, if the
      relied-on rule was missing altogether, never got scaled down at all
      (overflow). Here the width is a plain inline style on `.ppw-win`, set
      from the `width` prop, so the window is always the same physical size
      regardless of anything in the page around it.
   2. The holder's height was read immediately, before the window's own
      content (fonts, the SVG canvas, anything async) had settled into its
      final box size. Here the first measurement happens two animation
      frames after mount, and a ResizeObserver on both the holder and the
      window keeps re-measuring after that, so a late content-size change
      still gets picked up.

   `overflow: hidden` on the holder is the backstop: even if a measurement
   race slips through, nothing can paint outside the box.
========================================================================= */
export function ScaledWindow({
  width,
  className,
  children,
}: {
  /** The window's natural, unscaled design width in px. */
  width: number;
  className?: string;
  children: ReactNode;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const holder = holderRef.current;
    const win = winRef.current;
    if (!holder || !win) return;

    let raf1 = 0;
    let raf2 = 0;

    const fit = () => {
      const holderWidth = holder.clientWidth;
      if (!holderWidth) return;
      // never scale above 1: a narrow window should never blow up to fill
      // a wide holder, it should just sit at its natural size
      const scale = Math.min(1, holderWidth / width);
      win.style.transform = `scale(${scale})`;
      // offsetHeight reflects the UNSCALED layout box (CSS transform never
      // changes layout size), so this is the window's real natural height
      setHeight(win.offsetHeight * scale);
    };

    // wait two frames so the browser has painted the window at its natural
    // width at least once before anything is measured
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(fit);
    });

    const ro = new ResizeObserver(fit);
    ro.observe(holder);
    ro.observe(win);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro.disconnect();
    };
  }, [width]);

  return (
    <div
      ref={holderRef}
      className={`ppw-holder${className ? ` ${className}` : ""}`}
      style={{ height }}
    >
      <div
        ref={winRef}
        className="ppw-win ppw-scope"
        style={{ width, transformOrigin: "0 0" }}
      >
        {children}
      </div>
    </div>
  );
}

/* helper: renders a subset of markdown-ish **bold** spans as <b> */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <b key={i}>{part}</b> : <span key={i}>{part}</span>
  );
}

/* =========================================================================
   OUTREACH inbox - cycles through a list of threads, "types" a reply
   indicator, then reveals a reply and a Replied pill. Ported from the
   showConv() logic in AgentsHero.tsx (lines 239-257), same timings
   (1100ms / 2600ms / 3100ms / 5600ms).
========================================================================= */
export interface OutreachThread {
  name: string;
  /** Shown under the name, e.g. "Head of Ops · Northfield Supply". */
  company: string;
  /** The outbound message shown as sent. */
  message: string;
  /** Their reply, revealed after the typing indicator. */
  reply: string;
}

const DEFAULT_THREADS: OutreachThread[] = [
  {
    name: "Jordan Ellis",
    company: "Head of Ops · Northfield Supply",
    message: "Hi Jordan - saw you'd just stepped into Head of Ops at Northfield. We help lean teams get more done without adding headcount. Worth a look?",
    reply: "Sounds good - send me a time this week.",
  },
  {
    name: "Priya Anand",
    company: "VP Marketing · Harbor & Vine",
    message: "Hi Priya - saw Harbor & Vine is hiring across the team. We help teams like yours punch above their weight. Open to a quick chat?",
    reply: "Yes, let's find a time.",
  },
  {
    name: "Sam Okafor",
    company: "Growth Lead · Ridgeline Co",
    message: "Hi Sam - one idea for Ridgeline's next launch that might be worth ten minutes.",
    reply: "Interested - tell me more.",
  },
  {
    name: "Dana Petrov",
    company: "Head of Demand · Fernbrook",
    message: "Hi Dana - congrats on the move to Fernbrook. We help teams get more from every campaign. Worth a look?",
    reply: "Happy to chat, send a time that suits.",
  },
];

const AV_CLASSES = ["ppw-a1", "ppw-a2", "ppw-a3", "ppw-a4", "ppw-a5", "ppw-a6", "ppw-a7", "ppw-a8"];

function initialsOf(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function OutreachWindow({
  threads = DEFAULT_THREADS,
  title = "Outreach Agent",
  sentLabel = "128 sent",
}: {
  threads?: OutreachThread[];
  title?: string;
  sentLabel?: string;
}) {
  const [active, setActive] = useState(0);
  // starts fully resolved (message + reply + pill all visible) so the
  // window is complete and legible even if the effect below never runs
  const [stage, setStage] = useState<"out" | "typing" | "in">("in");
  const [showPill, setShowPill] = useState(true);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (threads.length === 0) return;
    setLive(true);
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;

    const runCycle = () => {
      if (cancelled) return;
      setActive(i);
      setStage("out");
      setShowPill(false);
      timers.push(setTimeout(() => !cancelled && setStage("typing"), 1100));
      timers.push(setTimeout(() => !cancelled && setStage("in"), 2600));
      timers.push(setTimeout(() => !cancelled && setShowPill(true), 3100));
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          i = (i + 1) % threads.length;
          runCycle();
        }, 5600)
      );
    };
    runCycle();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [threads]);

  const current = threads[active] ?? DEFAULT_THREADS[0];
  const visibleThreads = threads.slice(0, 4);

  return (
    <ScaledWindow width={470} className={live ? "ppw-live" : undefined}>
      <div className="ppw-inbox">
        <div className="ppw-frame-win">
          <div className="ppw-tl">
            <i /><i /><i />
            <span className="ppw-t">{title}</span>
            <span className="ppw-live-pill">{sentLabel}</span>
          </div>
          <div className="ppw-panel">
            <div className="ppw-ibx">
              <div className="ppw-list">
                <div className="ppw-tabs">
                  <span className="ppw-on">All</span>
                  <span>Unread<span className="ppw-badge">{Math.max(1, threads.length - 1)}</span></span>
                  <span>Fav</span>
                </div>
                <div className="ppw-threads">
                  {visibleThreads.map((t, i) => (
                    <button
                      type="button"
                      key={t.name}
                      className={`ppw-th${i === active ? " ppw-sel" : ""}`}
                      onClick={() => setActive(i)}
                    >
                      <span className={`ppw-av ${AV_CLASSES[i % AV_CLASSES.length]}`}>{initialsOf(t.name)}</span>
                      <div className="ppw-mid">
                        <div className="ppw-nm">{t.name}</div>
                        <div className="ppw-pv"><b>You:</b> {t.message.slice(0, 34)}…</div>
                      </div>
                      <span className="ppw-t">now</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="ppw-conv">
                <div className="ppw-chd">
                  <span className={`ppw-av ${AV_CLASSES[active % AV_CLASSES.length]}`}>{initialsOf(current.name)}</span>
                  <div className="ppw-who">
                    {current.name}
                    <div className="ppw-sub2">{current.company}</div>
                  </div>
                  <span className={`ppw-pill${showPill ? " ppw-show" : ""}`}>Replied</span>
                </div>
                <div className="ppw-stream">
                  <div className="ppw-day">Today</div>
                  <div className="ppw-b ppw-out" key={`out-${active}`}>{current.message}</div>
                  {stage === "typing" && (
                    <div className="ppw-b ppw-type"><span /><span /><span /></div>
                  )}
                  {stage === "in" && (
                    <div className="ppw-b ppw-in" key={`in-${active}`}>{current.reply}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaledWindow>
  );
}

/* =========================================================================
   RESEARCH email - a briefing document that reveals line by line, with a
   "compiling" -> "ready" status tag. Ported from runResearch() in
   AgentsHero.tsx (lines 300-321), same 6800ms replay loop.
========================================================================= */
export interface ResearchWindowProps {
  subject?: string;
  from?: string;
  /** Each string is one line. Prefix with "- " to render as a bullet. */
  lines?: string[];
  attachment?: string;
  title?: string;
}

const DEFAULT_RESEARCH_LINES = [
  "Hi there,",
  "Here's the research ahead of your call with **Fernbrook Retail** on Thursday. Their new VP of Ops is six weeks in.",
  "Budget approved in February, they're hiring across the operations team, and a new regional rollout lands next quarter.",
  "- She owns ops with **no analyst yet** - lead with the numbers, not headcount.",
  "- The **regional rollout** is the wedge - one clear before/after to open with.",
];

export function ResearchWindow({
  subject = "Research ahead of your call with Fernbrook",
  from = "Research Agent",
  lines = DEFAULT_RESEARCH_LINES,
  attachment = "briefing.pdf · 2 pages",
  title = "Research Agent",
}: ResearchWindowProps) {
  const [status, setStatus] = useState<"compiling" | "ready">("ready");
  const [revealKey, setRevealKey] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const loop = () => {
      if (cancelled) return;
      setStatus("compiling");
      setRevealKey((k) => k + 1);
      timers.push(setTimeout(() => !cancelled && setStatus("ready"), 2300));
      timers.push(setTimeout(loop, 6800));
    };
    timers.push(setTimeout(loop, 6800));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const groups = useMemo(() => {
    // consecutive "- " lines collapse into one <ul>; everything else is a paragraph
    const out: { type: "p" | "ul"; items: string[] }[] = [];
    for (const line of lines) {
      const isBullet = line.startsWith("- ");
      const text = isBullet ? line.slice(2) : line;
      const last = out[out.length - 1];
      if (isBullet && last?.type === "ul") last.items.push(text);
      else out.push({ type: isBullet ? "ul" : "p", items: [text] });
    }
    return out;
  }, [lines]);

  return (
    <ScaledWindow width={430} className={live ? "ppw-live" : undefined}>
      <div className="ppw-email">
        <div className="ppw-frame-win">
          <div className="ppw-tl">
            <i /><i /><i />
            <span className="ppw-t">{title}</span>
            <span className="ppw-live-pill">{status}</span>
          </div>
          <div className="ppw-panel">
            <div className="ppw-eml">
              <div className="ppw-ehd">
                <div className="ppw-subj">{subject}</div>
                <div className="ppw-addr">
                  <span className="ppw-av">{from.slice(0, 1)}</span>
                  <span>from <b>{from}</b></span>
                  <span className="ppw-tag">✦ by AI</span>
                </div>
              </div>
              <div className="ppw-ebody" key={revealKey}>
                {groups.map((g, gi) =>
                  g.type === "ul" ? (
                    <ul key={gi}>
                      {g.items.map((item, ii) => (
                        <li key={ii} className="ppw-reveal" style={{ animationDelay: `${0.15 + (gi + ii) * 0.3}s` }}>
                          {renderInline(item)}
                        </li>
                      ))}
                    </ul>
                  ) : gi === 0 ? (
                    <div key={gi} className="ppw-lead ppw-reveal" style={{ animationDelay: "0.15s" }}>
                      {renderInline(g.items[0])}
                    </div>
                  ) : (
                    <p key={gi} className="ppw-reveal" style={{ animationDelay: `${0.15 + gi * 0.3}s` }}>
                      {renderInline(g.items[0])}
                    </p>
                  )
                )}
                {attachment && (
                  <div className="ppw-att ppw-reveal" style={{ animationDelay: `${0.15 + (groups.length + 1) * 0.3}s` }}>
                    <span className="ppw-ic">▤</span>{attachment}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaledWindow>
  );
}

/* =========================================================================
   TERMINAL - types an instruction, pauses, shows a canned response, then
   clears and loops. Ported from termStep() in AgentsHero.tsx (lines
   323-349), same timings (34-80ms/char, 500ms, 3600ms, 700ms).
========================================================================= */
export interface TerminalWindowProps {
  instruction?: string;
  response?: string;
  title?: string;
  liveLabel?: string;
}

export function TerminalWindow({
  instruction = "launch a campaign to 150 people who just changed roles",
  response = "4 agents on it - researching, writing, sending, tracking",
  title = "You",
  liveLabel = "~ workspace",
}: TerminalWindowProps) {
  // starts fully typed with the response already showing, so the card is
  // complete and legible even if the effect below never runs
  const [typed, setTyped] = useState(instruction);
  const [showResponse, setShowResponse] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const typeOut = (i: number) => {
      if (cancelled) return;
      const next = instruction.slice(0, i);
      setTyped(next);
      if (i < instruction.length) {
        timers.push(setTimeout(() => typeOut(i + 1), 34 + Math.random() * 46));
      } else {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setShowResponse(true);
            timers.push(setTimeout(loop, 3600));
          }, 500)
        );
      }
    };

    const loop = () => {
      if (cancelled) return;
      setShowResponse(false);
      setTyped("");
      timers.push(setTimeout(() => typeOut(1), 700));
    };

    // begin the first loop shortly after mount rather than instantly, so
    // the fully-typed resting state is visible for a beat first
    timers.push(setTimeout(loop, 1800));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [instruction]);

  return (
    <ScaledWindow width={436}>
      <div className="ppw-terminal">
        <div className="ppw-term-win">
          <div className="ppw-term-tl">
            <i /><i /><i />
            <span className="ppw-t">{title}</span>
            <span className="ppw-live-pill">{liveLabel}</span>
          </div>
          <div className="ppw-term-body">
            <div className="ppw-ln">
              <span className="ppw-pr">›</span>
              <span>{typed}</span>
              <span className="ppw-cur" />
            </div>
            <div className={`ppw-resp${showResponse ? " ppw-show" : ""}`}>
              <span className="ppw-dot" />
              <span>{renderInline(response)}</span>
            </div>
          </div>
        </div>
      </div>
    </ScaledWindow>
  );
}

/* =========================================================================
   CAMPAIGN workflow - a fixed 5-node flow (1 trigger -> 1 step -> 2 agents
   in parallel -> 1 step) that steps through highlighting nodes and edges in
   sequence, then rests, then loops. Ported from bpRun() in AgentsHero.tsx
   (lines 351-376), same 820ms step / 2600ms hold timings. The topology
   (node positions, edge paths) is fixed; the five nodes' icon/label/kind
   and the stats panel are all props.
========================================================================= */
export interface CampaignNode {
  icon: string;
  label: string;
  /** Shown under the label in small caps, e.g. "trigger" / "step" / "agent". */
  kind: string;
}

export interface CampaignStats {
  contacted: number;
  replied: number;
  booked: number;
  running: number;
}

const DEFAULT_NODES: [CampaignNode, CampaignNode, CampaignNode, CampaignNode, CampaignNode] = [
  { icon: "◆", label: "New signal", kind: "trigger" },
  { icon: "◱", label: "Enrich account", kind: "step" },
  { icon: "▤", label: "Research brief", kind: "agent" },
  { icon: "✎", label: "Draft message", kind: "agent" },
  { icon: "➤", label: "Send + track", kind: "step" },
];

const NODE_POS = [
  { left: "10%", top: "50%" },
  { left: "36%", top: "50%" },
  { left: "64%", top: "28%" },
  { left: "64%", top: "72%" },
  { left: "88%", top: "50%" },
];
const NODE_STEP = [0, 1, 2, 2, 3];

export function CampaignWindow({
  crumbLabel = "New-signal outbound",
  runNumber = 9,
  nodes = DEFAULT_NODES,
  stats = { contacted: 180, replied: 31, booked: 7, running: 1 },
  creditsUsed = 180,
  creditsTotal = 5000,
  title = "Campaign Agent",
}: {
  crumbLabel?: string;
  runNumber?: number;
  nodes?: [CampaignNode, CampaignNode, CampaignNode, CampaignNode, CampaignNode];
  stats?: CampaignStats;
  creditsUsed?: number;
  creditsTotal?: number;
  title?: string;
}) {
  const maxStep = 3;
  // starts at the finished-run resting state (everything done) so the
  // window is complete and legible even if the effect below never runs
  const [step, setStep] = useState(maxStep);
  const [runState, setRunState] = useState<"Running" | "Done">("Done");

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = (s: number) => {
      if (cancelled) return;
      setStep(s);
      setRunState("Running");
      if (s < maxStep) {
        timers.push(setTimeout(() => tick(s + 1), 820));
      } else {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setRunState("Done");
            timers.push(setTimeout(() => tick(0), 2600));
          }, 820)
        );
      }
    };

    timers.push(setTimeout(() => tick(0), 1400));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const creditsPct = Math.min(100, Math.round((creditsUsed / creditsTotal) * 100));

  return (
    <ScaledWindow width={940}>
      <div className="ppw-blueprint">
        <div className="ppw-frame-win">
          <div className="ppw-tl">
            <i /><i /><i />
            <span className="ppw-t">{title}</span>
            <span className="ppw-live-pill">running</span>
          </div>
          <div className="ppw-panel">
            <div className="ppw-bpw">
              <div className="ppw-bpbar">
                <span className="ppw-crumb">Workflows › <b>{crumbLabel}</b></span>
                <span className="ppw-bptabs">
                  <span>Editor</span>
                  <span className="ppw-on">Runs <span className="ppw-cnt">{runNumber}</span></span>
                  <span>Settings</span>
                </span>
                <span className="ppw-rt">
                  <span className="ppw-livepill">Live</span>
                  <span className="ppw-trig">▶ Trigger</span>
                </span>
              </div>
              <div className="ppw-bpmain">
                <div className="ppw-bpcanvas">
                  <svg viewBox="0 0 600 360" preserveAspectRatio="none">
                    <path className="ppw-edge" d="M121,180 L155,180" />
                    <path className="ppw-edge" d="M277,180 C355,180 300,101 323,101" />
                    <path className="ppw-edge" d="M277,180 C355,180 300,259 323,259" />
                    <path className="ppw-edge" d="M445,101 C500,101 500,180 467,180" />
                    <path className="ppw-edge" d="M445,259 C500,259 500,180 467,180" />
                    <path className={`ppw-edge ppw-flow${step + 1 === 1 ? " ppw-on" : ""}`} d="M121,180 L155,180" />
                    <path className={`ppw-edge ppw-flow${step + 1 === 2 ? " ppw-on" : ""}`} d="M277,180 C355,180 300,101 323,101" />
                    <path className={`ppw-edge ppw-flow${step + 1 === 2 ? " ppw-on" : ""}`} d="M277,180 C355,180 300,259 323,259" />
                    <path className={`ppw-edge ppw-flow${step + 1 === 3 ? " ppw-on" : ""}`} d="M445,101 C500,101 500,180 467,180" />
                    <path className={`ppw-edge ppw-flow${step + 1 === 3 ? " ppw-on" : ""}`} d="M445,259 C500,259 500,180 467,180" />
                  </svg>
                  {nodes.map((n, i) => {
                    const nStep = NODE_STEP[i];
                    const cls =
                      nStep < step ? "ppw-done" : nStep === step ? "ppw-run" : "";
                    const isTrig = i === 0;
                    return (
                      <div
                        key={i}
                        className={`ppw-bpnode${isTrig ? " ppw-trig" : ""}${cls ? ` ${cls}` : ""}`}
                        style={NODE_POS[i]}
                      >
                        <div className="ppw-nh">
                          <span className="ppw-ic">{n.icon}</span>
                          <span className="ppw-bpnm">{n.label}</span>
                        </div>
                        <div className="ppw-st">{n.kind}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="ppw-bppanel">
                  <div className="ppw-ph">Run history</div>
                  <div className="ppw-bprun ppw-cur">
                    <span className="ppw-rs ppw-on2">◐</span>
                    <span className="ppw-rn">Run #{runNumber}</span>
                    <span className="ppw-rt2">{runState}</span>
                  </div>
                  <div className="ppw-bprun">
                    <span className="ppw-rs ppw-ok">✓</span>
                    <span className="ppw-rn">Run #{runNumber - 1}</span>
                    <span className="ppw-rt2">yesterday</span>
                  </div>
                  <div className="ppw-bprun">
                    <span className="ppw-rs ppw-ok">✓</span>
                    <span className="ppw-rn">Run #{runNumber - 2}</span>
                    <span className="ppw-rt2">3 days ago</span>
                  </div>
                  <div className="ppw-bpov">
                    <div className="ppw-lab">This week</div>
                    <div className="ppw-bpgrid">
                      <div className="ppw-bpstat"><div className="ppw-n">{stats.contacted}</div><div className="ppw-k">Contacted</div></div>
                      <div className="ppw-bpstat ppw-g"><div className="ppw-n">{stats.replied}</div><div className="ppw-k">Replied</div></div>
                      <div className="ppw-bpstat ppw-g"><div className="ppw-n">{stats.booked}</div><div className="ppw-k">Calls booked</div></div>
                      <div className="ppw-bpstat"><div className="ppw-n">{stats.running}</div><div className="ppw-k">Running</div></div>
                    </div>
                    <div className="ppw-bpcred"><span>credits used</span><span>{creditsUsed} / {creditsTotal.toLocaleString()}</span></div>
                    <div className="ppw-bpbar2"><i style={{ width: `${creditsPct}%` }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaledWindow>
  );
}
