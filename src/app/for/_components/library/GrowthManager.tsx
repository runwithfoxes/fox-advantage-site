"use client";

// The Growth Manager's three exhibits, briefed by Paul 9 Aug for the
// Fidelity page: the pipeline board (an illustrated metaphor of the deals
// view, never the real CRM, no real names), Jo's morning note typing itself
// out, and the campaign window (ported from the homepage hero's Campaign
// Agent, personalised to the advisor world).
//
// Every firm and person here is invented. The world is advisors because
// Fidelity's B2B business runs through independent advisors; that is
// selection, not faked familiarity.
//
// Motion rules: base state is always the finished scene, so nothing depends
// on JavaScript to exist. Scroll-in starts the show; reduced motion gets
// the final state.

import { useEffect, useRef, useState } from "react";
import { ScaledWindow } from "./AgentWindows";
import "./agent-windows.css";
import "./growth-manager.css";

/* =========================================================================
   THE PIPELINE BOARD. One scene that changes state: cards travel from
   stage to stage while you watch, because that is the whole claim - the
   board moves without anyone on the team typing into a CRM.
   ======================================================================= */

interface Deal {
  firm: string;
  person: string;
  note: string;
}

// Four stages, enough cards that the board reads as a working pipeline.
const STAGES = ["Contacted", "Meeting booked", "Proposal sent", "Won"];

const START: Deal[][] = [
  [
    {
      firm: "Tremblay Wealth Partners",
      person: "Marie Tremblay · Principal",
      note: "Jo · sample sent, awaiting reply",
    },
    {
      firm: "Harbourview Advisory",
      person: "Tom Whelan · Managing Partner",
      note: "Jo · intro sent this morning",
    },
    {
      firm: "Thompson & Grant Financial",
      person: "Aisha Thompson · Advisor",
      note: "Jo · follow-up scheduled",
    },
  ],
  [
    {
      firm: "Lakeshore Private Wealth",
      person: "David Chen · Portfolio Manager",
      note: "Thursday 2pm, brief prepared",
    },
    {
      firm: "Birchwood Financial Group",
      person: "Sarah Osei · Director",
      note: "Tuesday 10am, agenda sent",
    },
  ],
  [
    {
      firm: "Cedar Point Wealth",
      person: "James Doyle · Principal",
      note: "waiting on your yes",
    },
    {
      firm: "Aurora Advisors",
      person: "Nadia Rahman · Partner",
      note: "Jo · follow-up Friday",
    },
  ],
  [
    {
      firm: "Bright Harbour Wealth",
      person: "Onboarding",
      note: "pack sent, first session booked",
    },
    {
      firm: "Maple & Main Financial",
      person: "Live",
      note: "quarterly content running",
    },
  ],
];

// The scripted run: a meeting becomes a proposal, then a contact becomes a
// meeting. Two moves, watched, then the board resets and goes again.
const MOVES: { from: number; to: number; note: string }[] = [
  { from: 1, to: 2, note: "Jo · proposal drafted, sent today" },
  { from: 0, to: 1, note: "Wednesday 11am, brief prepared" },
];

const MOVE_MS = 2600;
const RESET_MS = 4200;

export function PipelineBoard({ deals = START, width = 940 }: { deals?: Deal[][]; width?: number } = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState<Deal[][]>(deals);
  const [arrived, setArrived] = useState<string | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setPlay(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!play) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      if (cancelled) return;
      let t = MOVE_MS;
      MOVES.forEach((m) => {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setCols((prev) => {
              const next = prev.map((c) => [...c]);
              const card = next[m.from].shift();
              if (!card) return prev;
              next[m.to].unshift({ ...card, note: m.note });
              return next;
            });
            setArrived(deals[m.from][0].firm);
          }, t)
        );
        t += MOVE_MS;
      });
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setArrived(null);
          setCols(deals.map((c) => [...c]));
          run();
        }, t + RESET_MS)
      );
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [play]);

  return (
    <div ref={rootRef}>
      <ScaledWindow width={width}>
        <div className="ppw-frame-win">
          <div className="ppw-tl">
            <i />
            <i />
            <i />
            <span className="ppw-t">the pipeline</span>
            <span className="ppw-live-pill">Jo keeps this current</span>
          </div>
          <div className="pgm-board">
            {cols.map((col, ci) => (
              <div className={`pgm-col pgm-c${ci}`} key={STAGES[ci]}>
                <div className="pgm-colhead">
                  <span className="pgm-dot" />
                  <span className="pgm-colname">{STAGES[ci]}</span>
                  <span className="pgm-count">{col.length}</span>
                </div>
                {col.map((d) => (
                  <div
                    className={`pgm-card${
                      arrived === d.firm ? " pgm-arrive" : ""
                    }`}
                    key={d.firm}
                  >
                    <div className="pgm-firm">{d.firm}</div>
                    <div className="pgm-person">{d.person}</div>
                    <div className="pgm-note">{d.note}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ScaledWindow>
    </div>
  );
}

/* =========================================================================
   JO'S MORNING NOTE. Short, and it TYPES, so it feels like it is arriving
   as you read (Paul, 9 Aug). Base state is the whole note; scroll-in
   restarts it as a typing performance. Reduced motion keeps the note still.
   ======================================================================= */

const JO_NOTE = [
  "Morning. Overnight: two replies came in and one meeting landed, Thursday at two with Lakeshore.",
  "Three things need you today. The Cedar Point proposal is waiting on your yes. June's outreach list is built and ready for you to prune. And one reply asks a fee question I won't answer for you.",
  "Everything else is handled. Follow-ups sent, the board is current, the forecast is unchanged.",
];

const CHARS_PER_SECOND = 45;
const PARA_PAUSE_MS = 420;

export function JoNote({ note = JO_NOTE }: { note?: string[] } = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  // done = paragraphs fully shown; typing = index being written out.
  const [shown, setShown] = useState<number>(note.length);
  const [chars, setChars] = useState<number>(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let started = false;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting || started) return;
          started = true;
          setShown(0);
          setChars(0);
          setPlaying(true);
        }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || shown >= note.length) return;
    const text = note[shown];
    if (chars < text.length) {
      const t = setTimeout(
        () => setChars((c) => Math.min(text.length, c + 3)),
        (1000 / CHARS_PER_SECOND) * 3
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShown((s) => s + 1);
      setChars(0);
    }, PARA_PAUSE_MS);
    return () => clearTimeout(t);
  }, [playing, shown, chars]);

  const typingDone = shown >= note.length;

  return (
    <div ref={rootRef}>
      <ScaledWindow width={620}>
        <div className="ppw-frame-win">
          <div className="ppw-tl">
            <i />
            <i />
            <i />
            <span className="ppw-t">growth agent</span>
            <span className="ppw-live-pill">every morning</span>
          </div>
          <div className="pgm-note-body">
            <div className="pgm-note-day">Monday 07:42</div>
            <div className="pgm-note-msg">
              {note.slice(0, shown).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {!typingDone && playing && (
                <p>
                  {note[shown].slice(0, chars)}
                  <span className="pgm-caret" />
                </p>
              )}
            </div>
          </div>
        </div>
      </ScaledWindow>
    </div>
  );
}

/* =========================================================================
   THE CAMPAIGN WINDOW. Rebuilt in the house language (Paul, 10 Aug: the
   first version, ported from the homepage hero's ah- markup, "does not
   look like it used our branding exactly"). White node cards, mono labels,
   the house dot grid, blue dashed edges, and a run that PLAYS: the pulse
   walks trigger, enrich, the two agents, send, then the run flips to done
   and it goes again. Base state is the finished run; reduced motion keeps
   it still.
   ======================================================================= */

const CW_NODES: {
  name: string;
  sub: string;
  ic: string;
  left: string;
  top: string;
  step: number;
}[] = [
  { name: "New-practice", sub: "trigger", ic: "◆", left: "15%", top: "50%", step: 0 },
  { name: "Enrich the firm", sub: "step", ic: "◱", left: "39%", top: "50%", step: 1 },
  { name: "Research brief", sub: "agent", ic: "▤", left: "63%", top: "26%", step: 2 },
  { name: "Draft outreach", sub: "agent", ic: "✎", left: "63%", top: "74%", step: 2 },
  { name: "Send + track", sub: "step", ic: "➤", left: "86%", top: "50%", step: 3 },
];

const CW_STEP_MS = [1100, 1500, 2400, 1500];
const CW_DONE_MS = 2600;

// Both props default to the advisor-world values every existing page already
// renders, so nothing changes anywhere unless a page passes its own. Added
// 31 Aug for ICS Medical, whose trigger is a funding round rather than a new
// advisory practice: Brendan asked for signal-based marketing by name, so the
// signal on the canvas has to be one of his.
export function CampaignWindow({
  triggerName = "New-practice",
  workflowName = "New-practice outbound",
}: { triggerName?: string; workflowName?: string } = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  // 4 = run complete (the base state); 0-3 = the pulse walking the nodes.
  const [step, setStep] = useState(4);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setPlay(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!play) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      if (cancelled) return;
      let t = 0;
      for (let s = 0; s <= 3; s++) {
        timers.push(setTimeout(() => !cancelled && setStep(s), t));
        t += CW_STEP_MS[s];
      }
      timers.push(setTimeout(() => !cancelled && setStep(4), t));
      timers.push(setTimeout(() => !cancelled && run(), t + CW_DONE_MS));
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [play]);

  const running = play && step < 4;
  // Only the first node (the trigger) is per client; the rest of the run is
  // the same work whatever fired it.
  const nodes = CW_NODES.map((n, i) =>
    i === 0 ? { ...n, name: triggerName } : n
  );

  return (
    <div ref={rootRef}>
      <ScaledWindow width={940}>
        <div className="ppw-frame-win">
          <div className="ppw-tl">
            <i />
            <i />
            <i />
            <span className="ppw-t">Campaign Agent</span>
            <span className="ppw-live-pill">running</span>
          </div>
          <div className={`pgm-cw${running ? " pgm-cw-play" : ""}`}>
            <div className="pgm-cw-bar">
              <span className="pgm-cw-crumb">
                Workflows › <b>{workflowName}</b>
              </span>
              <span className="pgm-cw-tabs">
                <span>Editor</span>
                <span className="pgm-on">Runs 13</span>
                <span>Settings</span>
              </span>
              <span className="pgm-cw-rt">
                <span className="pgm-cw-livepill">Live</span>
                <span>▶ Trigger</span>
              </span>
            </div>
            <div className="pgm-cw-main">
              <div className="pgm-cw-canvas">
                <svg viewBox="0 0 600 360" preserveAspectRatio="none">
                  <path className="pgm-cw-edge" d="M110,180 L172,180" />
                  <path
                    className="pgm-cw-edge"
                    d="M281,180 C340,180 300,94 330,94"
                  />
                  <path
                    className="pgm-cw-edge"
                    d="M281,180 C340,180 300,266 330,266"
                  />
                  <path
                    className="pgm-cw-edge"
                    d="M436,94 C500,94 480,180 492,180"
                  />
                  <path
                    className="pgm-cw-edge"
                    d="M436,266 C500,266 480,180 492,180"
                  />
                </svg>
                {nodes.map((n) => (
                  <div
                    key={n.name}
                    className={`pgm-cw-node${
                      running && step === n.step ? " pgm-active" : ""
                    }${!running || step > n.step ? " pgm-done" : ""}`}
                    style={{ left: n.left, top: n.top }}
                  >
                    <div className="pgm-cw-nh">
                      <span className="pgm-cw-ic">{n.ic}</span>
                      <span className="pgm-cw-nm">{n.name}</span>
                    </div>
                    <div className="pgm-cw-st">{n.sub}</div>
                  </div>
                ))}
              </div>
              <div className="pgm-cw-panel">
                <div className="pgm-cw-ph">Run history</div>
                <div className="pgm-cw-run pgm-cur">
                  <span className={`pgm-rs${running ? " pgm-spin" : ""}`}>
                    {running ? "◐" : "✓"}
                  </span>
                  <span>Run #13</span>
                  <span className="pgm-rt">{running ? "Running" : "Done"}</span>
                </div>
                <div className="pgm-cw-run">
                  <span className="pgm-rs">✓</span>
                  <span>Run #12</span>
                  <span className="pgm-rt">yesterday</span>
                </div>
                <div className="pgm-cw-run">
                  <span className="pgm-rs">✓</span>
                  <span>Run #11</span>
                  <span className="pgm-rt">3 days ago</span>
                </div>
                <div className="pgm-cw-lab">This week</div>
                <div className="pgm-cw-grid">
                  <div className="pgm-cw-stat">
                    <div className="pgm-n">120</div>
                    <div className="pgm-k">Contacted</div>
                  </div>
                  <div className="pgm-cw-stat pgm-g">
                    <div className="pgm-n">18</div>
                    <div className="pgm-k">Replied</div>
                  </div>
                  <div className="pgm-cw-stat pgm-g">
                    <div className="pgm-n">5</div>
                    <div className="pgm-k">Calls booked</div>
                  </div>
                  <div className="pgm-cw-stat">
                    <div className="pgm-n">1</div>
                    <div className="pgm-k">Running</div>
                  </div>
                </div>
                <div className="pgm-cw-cred">
                  <span>credits used</span>
                  <span>120 / 5,000</span>
                </div>
                <div className="pgm-cw-credbar">
                  <i />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>
    </div>
  );
}
