"use client";

import { useEffect, useRef } from "react";
import type { Art, WindowKey } from "./courseModules";

/**
 * THE ARTEFACT ON THE RIGHT OF EACH CARD.
 *
 * Ported from courseBoard.js's WINDOWS map and its three animation loops, which are
 * deleted with the board. The DRAWN WINDOWS SURVIVE THE REDESIGN - Paul accepted all
 * six on 18 Jul and the sizes inside them were measured against real renders rather
 * than chosen. See the comments in the .co- CSS block for which values were measured
 * and why.
 *
 * ⚠️ THE SIZE RULING THAT SHAPED ALL SIX: each window carries FEWER ELEMENTS AT
 * NATIVE TYPE SIZE - one moment, three or four parts, nothing shrunk - because at
 * this width words read and abstract bars do not.
 *
 * WHICH IS WHY THE LONG CARD SCALES RATHER THAN REFLOWS. The board's artefact slot
 * was 284x186. The long card has room for more. Every window is still authored at
 * 284x186 and the FRAME scales it up with a transform, so every measured
 * relationship inside survives exactly and there is one number to change instead of
 * forty. Re-typesetting them at a larger size would silently undo the ruling above.
 *
 * ⚠️ NO INVENTED RESULTS. These show the SHAPE of a module's output. No counts, no
 * metrics, no performance claims - a number inside a drawn window is still a claim,
 * and brief:claims bans them. The one number on the page ("214 sent") came across
 * from the homepage's own Outreach Agent card and is not invented here.
 */

const REDUCE = "(prefers-reduced-motion: reduce)";

/* ---------- 1. the fox and the promise ----------
   Paul, 18 Jul: "show a small image of a fox and have a headline inside the module
   that says 20 things that get you 80% of the way." Headline is his, verbatim.
   No window bar: it is not a depiction of software, it is a statement. */
function WinFew() {
  return (
    <div className="w w-fox">
      <img src="/fox/chapter-fox-sitting-nobg.png" alt="" />
      <p className="hl">
        20 things that get you <b>80% of the way</b>
      </p>
    </div>
  );
}

/* ---------- 2. the ladder of marketing metrics ----------
   Ported from Paul's brief-coach module with tier widths and colours verbatim, so it
   is the same object rather than a lookalike. Sub-metrics dropped - at this width
   they would land near 6px, and the set's rule is fewer elements at a readable size.
   The lit rung WALKS UP, which is the module's argument in one move: think at the top
   of the ladder before you spend. */
function WinLadder() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    /* bottom rung first: activity -> commercial */
    const tiers = [...root.querySelectorAll<HTMLElement>(".tier")].reverse();
    if (matchMedia(REDUCE).matches) {
      tiers.forEach((t) => t.classList.add("lit"));
      return;
    }
    let i = 0;
    let timer = 0;
    const step = () => {
      tiers.forEach((t) => t.classList.remove("lit"));
      tiers[i].classList.add("lit");
      const atTop = i === tiers.length - 1;
      i = atTop ? 0 : i + 1;
      timer = window.setTimeout(step, atTop ? 2200 : 900);
    };
    step();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="w w-pyr" ref={ref}>
      <div className="wbar">
        <span>Ladder of marketing metrics</span>
        <span className="live">walking up</span>
      </div>
      <div className="wbody">
        <div className="tier t-commercial">Commercial</div>
        <div className="tier t-behaviour">Customer behaviour</div>
        <div className="tier t-memory">Memory</div>
        <div className="tier t-comms">Communication</div>
        <div className="tier t-activity">Activity</div>
      </div>
    </div>
  );
}

/* ---------- 4. the blueprint ----------
   The Campaign Agent flow in miniature. What is portable is the SHAPE - branch and
   converge - which is what makes the Campaign Agent recognisable and is also exactly
   what "build all the steps in a system" means: the work forks and comes back
   together. Four nodes, not five; "Enrich account" dropped for room. */
function WinSystem() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = [...root.querySelectorAll<HTMLElement>(".node")];
    const edges = [...root.querySelectorAll<SVGPathElement>(".edge")];
    if (matchMedia(REDUCE).matches) {
      nodes.forEach((n) => n.classList.add("done"));
      return;
    }
    const max = Math.max(...nodes.map((n) => Number(n.dataset.step)));
    let timer = 0;
    const run = () => {
      nodes.forEach((n) => n.classList.remove("done", "run"));
      edges.forEach((e) => e.classList.remove("on"));
      let step = 0;
      const tick = () => {
        nodes.forEach((n) => {
          const s = Number(n.dataset.step);
          if (s === step) {
            n.classList.remove("done");
            n.classList.add("run");
          } else if (s < step) {
            n.classList.remove("run");
            n.classList.add("done");
          }
        });
        edges.forEach((e) => e.classList.toggle("on", Number(e.dataset.step) === step + 1));
        if (step < max) {
          step++;
          timer = window.setTimeout(tick, 900);
        } else {
          nodes.forEach((n) => {
            n.classList.remove("run");
            n.classList.add("done");
          });
          edges.forEach((e) => e.classList.remove("on"));
          timer = window.setTimeout(run, 2400);
        }
      };
      tick();
    };
    run();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="w w-bp" ref={ref}>
      <div className="wbar">
        <span>Campaign Agent</span>
        <span className="live">running</span>
      </div>
      <div className="wbody">
        <svg viewBox="0 0 284 112" preserveAspectRatio="none">
          <path className="edge" data-step="1" d="M84,56 C96,56 96,28 108,28" />
          <path className="edge" data-step="1" d="M84,56 C96,56 96,84 108,84" />
          <path className="edge" data-step="2" d="M176,28 C188,28 188,56 200,56" />
          <path className="edge" data-step="2" d="M176,84 C188,84 188,56 200,56" />
        </svg>
        <div className="node" data-step="0" style={{ left: "44px", top: "50%" }}>
          <span className="ic">&#9670;</span>
          <span className="nm">New-role signal</span>
        </div>
        <div className="node" data-step="1" style={{ left: "142px", top: "25%" }}>
          <span className="ic">&#9636;</span>
          <span className="nm">Research brief</span>
        </div>
        <div className="node" data-step="1" style={{ left: "142px", top: "75%" }}>
          <span className="ic">&#9998;</span>
          <span className="nm">Draft outreach</span>
        </div>
        <div className="node" data-step="2" style={{ left: "240px", top: "50%" }}>
          <span className="ic">&#10148;</span>
          <span className="nm">Send + track</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 5. the outreach agent conversation ----------
   Paul, 18 Jul: "it can't be static." The homepage runs a two-pane inbox; its MOBILE
   relayout drops the thread list and gives the conversation full width, which is both
   what fits here and the half that actually moves. A thread list is a photograph; a
   conversation is the agent working. Timings lifted from origin/main:
   out -> 1.1s -> typing -> 2.6s -> reply -> 3.1s -> Replied, cycling every 5.6s.

   Under reduced motion it renders the FINISHED state rather than looping, per the
   agent-cards rule that a stood-down animation leaves a calm readable card, never an
   empty one. */
const CYCLE = [
  {
    ini: "CH",
    cls: "a1",
    name: "Claire Hughes",
    sub: "Head of Growth · Vero",
    out: "Noticed you just stepped into Head of Growth at Vero.",
    reply: "Sounds good, send me a time this week.",
  },
  {
    ini: "TR",
    cls: "a3",
    name: "Tom Reilly",
    sub: "VP Marketing · Northbeam",
    out: "Saw Northbeam is hiring across marketing.",
    reply: "Yes, let's find a time.",
  },
  {
    ini: "MO",
    cls: "a2",
    name: "Marie O'Brien",
    sub: "CMO · Loop",
    out: "One idea for Loop's Q3 launch.",
    reply: "Interested, tell me more.",
  },
  {
    ini: "SK",
    cls: "a4",
    name: "Sinéad Kelly",
    sub: "Head of Demand · Arc",
    out: "Congrats on the move to Arc.",
    reply: "Happy to chat, send a time that suits.",
  },
];

function WinAgent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const av = root.querySelector<HTMLElement>(".cav");
    const who = root.querySelector<HTMLElement>(".cwho");
    const pill = root.querySelector<HTMLElement>(".pill");
    const stream = root.querySelector<HTMLElement>(".stream");
    if (!av || !who || !pill || !stream) return;

    const reduced = matchMedia(REDUCE).matches;
    let inner: number[] = [];
    let cycle = 0;

    const show = (i: number) => {
      inner.forEach(window.clearTimeout);
      inner = [];
      const c = CYCLE[i];
      av.className = "av " + c.cls + " cav";
      av.textContent = c.ini;
      who.innerHTML = c.name + '<div class="sub2">' + c.sub + "</div>";
      pill.classList.remove("show");
      if (reduced) {
        stream.innerHTML = '<div class="b out">' + c.out + '</div><div class="b in">' + c.reply + "</div>";
        stream.querySelectorAll<HTMLElement>(".b").forEach((b) => {
          b.style.opacity = "1";
          b.style.transform = "none";
          b.style.animation = "none";
        });
        pill.classList.add("show");
        return;
      }
      stream.innerHTML = '<div class="b out">' + c.out + '</div><div class="rs"></div>';
      const rs = stream.querySelector<HTMLElement>(".rs")!;
      inner.push(
        window.setTimeout(() => {
          rs.innerHTML = '<div class="b type"><span></span><span></span><span></span></div>';
        }, 1100),
      );
      inner.push(
        window.setTimeout(() => {
          rs.innerHTML = '<div class="b in">' + c.reply + "</div>";
        }, 2600),
      );
      inner.push(window.setTimeout(() => pill.classList.add("show"), 3100));
    };

    show(0);
    if (!reduced) {
      let i = 0;
      cycle = window.setInterval(() => {
        i = (i + 1) % CYCLE.length;
        show(i);
      }, 5600);
    }
    return () => {
      inner.forEach(window.clearTimeout);
      window.clearInterval(cycle);
    };
  }, []);

  return (
    <div className="w w-conv" ref={ref}>
      <div className="wbar">
        <span>Outreach Agent</span>
        {/* "214 sent" came across from the homepage's own Outreach Agent card. It is
            not invented here, and nothing else on this page carries a number. */}
        <span className="live">214 sent</span>
      </div>
      <div className="wbody">
        <div className="chd">
          <span className="av a1 cav">CH</span>
          <div className="who cwho">
            Claire Hughes
            <div className="sub2">Head of Growth &middot; Vero</div>
          </div>
          <span className="pill">Replied</span>
        </div>
        <div className="stream"></div>
      </div>
    </div>
  );
}

/* ---------- drawn but currently unassigned ----------
   Modules 3 and 6 carry the film and the photograph, so these two windows are not
   rendered today. They are kept, not deleted: both were drawn and accepted on 18 Jul,
   and if either module's real asset is pulled this is what it falls back to. */
function WinAdjacent() {
  return (
    <div className="w w-adj">
      <div className="wbar">
        <span>What you shipped</span>
        <span className="live">wider</span>
      </div>
      <div className="wbody">
        <div className="tiles">
          <div className="tile">
            <span>The campaign</span>
            <s style={{ width: "70%" }}></s>
          </div>
          <div className="tile new">
            <span>The tool behind it</span>
            <s style={{ width: "80%" }}></s>
          </div>
          <div className="tile new">
            <span>The page it lives on</span>
            <s style={{ width: "60%" }}></s>
          </div>
          <div className="tile new">
            <span>The report after it</span>
            <s style={{ width: "75%" }}></s>
          </div>
        </div>
      </div>
    </div>
  );
}

function WinHard() {
  return (
    <div className="w w-hard">
      <div className="wbar">
        <span>Parked since March</span>
        <span className="live">open</span>
      </div>
      <div className="wbody">
        <div className="q">Why do people leave in month two?</div>
        <div className="part">Pull every cancellation reason</div>
        <div className="part">Read the ones nobody counted</div>
        <div className="part">Test the fix on one segment</div>
        <div className="part">Take the answer to the board</div>
      </div>
    </div>
  );
}

const WINDOWS: Record<WindowKey, () => React.JSX.Element> = {
  few: WinFew,
  cal: WinLadder,
  adj: WinAdjacent,
  sys: WinSystem,
  agent: WinAgent,
  hard: WinHard,
};

export default function ModuleArtefact({ art }: { art: Art }) {
  if (art.kind === "window") {
    const Win = WINDOWS[art.win];
    return (
      <div className="co-artframe">
        <div className="co-artscale">
          <div className="art real win">
            <Win />
          </div>
        </div>
      </div>
    );
  }

  /* Real footage and the photograph run full bleed at the frame's own size rather
     than scaling a 284px original - they are pictures, not typeset windows, so there
     is nothing measured inside them to preserve. */
  if (art.kind === "video") {
    return (
      <div className="co-artframe">
        <div className="art real vid">
          <video src={art.src} poster={art.poster} autoPlay muted loop playsInline preload="auto" />
        </div>
      </div>
    );
  }

  if (art.kind === "photo") {
    return (
      <div className="co-artframe">
        <div className="art real photo">
          <img src={art.src} alt="" />
        </div>
      </div>
    );
  }

  /* ⭐ NEVER DRESS A PLACEHOLDER AS EVIDENCE. Where a module has no asset, the card
     says so on its face. BRIEF-A §3: "where a real asset does not exist, the card
     says so on its face." */
  return (
    <div className="co-artframe">
      <div className="art co-artmissing">
        <span>no artefact yet</span>
      </div>
    </div>
  );
}
