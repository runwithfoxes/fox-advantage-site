"use client";

import { useEffect, useRef } from "react";

/*
  AGENTS HERO - ported from wireframes/homepage-agents-hero.html (17-18 Jul 2026).
  Arrival headline + a big fox film that shrinks and moves down-right on scroll,
  assembling five draggable "agent" windows around a dominant centre.
  All the imperative animation lives in one effect, scoped to the root ref.
  Below 1024px the scroll assembly is switched off and the hero renders as a
  static stack (see the ah- responsive block in globals.css).
*/

type CardEl = HTMLDivElement & {
  _dx: number; _dy: number; _vx: number; _vy: number;
};

export type Door = "agents" | "consulting" | "training";

/** The hero and the agents section are siblings, so the door is a window
    event rather than lifted state: the hero announces, AgentsSection opens. */
export function openDoor(door: Door) {
  window.dispatchEvent(new CustomEvent<Door>("rwf:door", { detail: door }));
}

export default function AgentsHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // The scroll-assemble only runs on wide viewports. Below that the CSS
    // lays the hero out statically and we leave the DOM alone.
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    let raf = 0;
    const cleanups: (() => void)[] = [];

    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);
    const qa = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

    /* ===== SCROLL ASSEMBLE + DRAG ===== */
    const hero = q<HTMLElement>(".ah-hero");
    const head = q<HTMLDivElement>(".ah-head");
    const stage = q<HTMLDivElement>(".ah-stage");
    const film = q<HTMLDivElement>(".ah-film") as CardEl | null;
    const filmVid = q<HTMLVideoElement>(".ah-film video");
    const sats = qa<HTMLDivElement>(".ah-sat") as CardEl[];

    if (hero && head && stage && film && filmVid) {
      const cards: CardEl[] = sats.concat([film]);
      cards.forEach((c) => { c._dx = 0; c._dy = 0; c._vx = 0; c._vy = 0; });

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

      let currentP = 0;
      const DRAG_AT = 0.22; // grabbable throughout the transition, like Attio

      // Static resting state for reduced motion.
      const settle = () => {
        head.style.opacity = "";
        head.style.filter = "";
        head.style.transform = "";
        head.style.pointerEvents = "";
        film.style.transform = "";
        filmVid.style.objectPosition = "";
        sats.forEach((s) => { s.style.opacity = ""; s.style.transform = ""; });
        stage.classList.remove("ah-live");
      };

      /* --- NARROW VIEWPORTS: cards roll one at a time (the Attio move) ---
         Five windows can't assemble on a phone, and shrinking a 940px workflow
         to fit would make its text unreadable. So we keep each card at its own
         readable size, let it crop off the right edge, and cross-fade between
         three of them as the visitor scrolls. Order: Advertising, Outreach,
         Campaign. */
      const rollCards = () => [film, q<HTMLDivElement>(".ah-inbox"), q<HTMLDivElement>(".ah-blueprint")]
        .filter(Boolean) as HTMLDivElement[];

      const rollFrame = (p: number) => {
        // headline holds a little longer than on desktop, then clears
        const hp = clamp(p / 0.3, 0, 1);
        head.style.opacity = (1 - hp).toFixed(3);
        head.style.transform = "translateY(" + (-hp * 24).toFixed(1) + "px)";
        head.style.filter = "blur(" + (hp * 2).toFixed(2) + "px)";
        head.style.pointerEvents = hp > 0.5 ? "none" : "auto";

        const cards = rollCards();
        // spread the remaining scroll across the cards, with a soft cross-fade
        const cp = clamp((p - 0.26) / 0.68, 0, 1) * cards.length;
        cards.forEach((c, i) => {
          // full opacity while this card owns the range, fading at the edges
          const d = Math.abs(cp - (i + 0.5));
          const o = clamp(1.35 - d * 1.9, 0, 1);
          c.style.opacity = o.toFixed(3);
          // offset via a custom property so the CSS keeps owning the centring
          c.style.setProperty("--ah-roll", ((cp - (i + 0.5)) * -26).toFixed(1) + "px");
          c.style.zIndex = String(10 + Math.round(o * 10));
        });
        // the film keeps its arrival crop on mobile - the fox stays in shot
        filmVid.style.objectPosition = "center 72%";
      };

      const frame = () => {
        if (reduced) { raf = requestAnimationFrame(frame); return; }

        if (!mq.matches) {
          const r = hero.getBoundingClientRect();
          const t = hero.offsetHeight - window.innerHeight;
          rollFrame(clamp(-r.top / t, 0, 1));
          raf = requestAnimationFrame(frame);
          return;
        }

        const rect = hero.getBoundingClientRect();
        const total = hero.offsetHeight - window.innerHeight;
        const p = clamp(-rect.top / total, 0, 1);
        currentP = p;

        const hp = clamp(p / 0.4, 0, 1);
        head.style.opacity = (1 - hp).toFixed(3);
        head.style.filter = "blur(" + (hp * 3).toFixed(2) + "px)";
        head.style.transform = "translateY(" + (-hp * 36).toFixed(1) + "px)";
        // let the cards underneath be grabbed once the headline has faded
        head.style.pointerEvents = hp > 0.4 ? "none" : "auto";

        // scrolled back up above the assemble: ease dragged cards home
        if (p < 0.45) cards.forEach((c) => { c._dx *= 0.8; c._dy *= 0.8; c._vx = 0; c._vy = 0; });

        // film: arrives big + low + centre, moves DOWN-RIGHT and shrinks
        const fp = clamp(p / 0.72, 0, 1);
        const fe = 1 - Math.pow(1 - fp, 3);
        const ftx = lerp(0, 336, fe) + film._dx;
        const fty = lerp(window.innerHeight * 0.44, 214, fe) + film._dy;
        film.style.transform =
          "translate(" + ftx.toFixed(1) + "px," + fty.toFixed(1) + "px) scale(" + lerp(1.0, 0.44, fp).toFixed(3) + ")";
        // fox/desert visible at arrival, re-centre as it shrinks
        filmVid.style.objectPosition = "center " + lerp(82, 50, fp).toFixed(1) + "%";

        const sp = clamp((p - 0.2) / 0.58, 0, 1);
        const se = 1 - Math.pow(1 - sp, 3);
        sats.forEach((s) => {
          const dx = +(s.dataset.dx || 0), dy = +(s.dataset.dy || 0), tsc = +(s.dataset.sc || 1);
          s.style.opacity = sp.toFixed(3);
          s.style.transform =
            "translate(" + (dx * se + s._dx).toFixed(1) + "px," + (dy * se + s._dy).toFixed(1) + "px) scale(" +
            lerp(tsc * 0.86, tsc, se).toFixed(3) + ")";
        });

        stage.classList.toggle("ah-live", p >= DRAG_AT);
        raf = requestAnimationFrame(frame);
      };

      const applyMode = () => {
        if (reduced) { settle(); return; }
        // clear anything the other mode left behind before it takes over
        [...sats, film].forEach((c) => {
          c.style.transform = ""; c.style.opacity = ""; c.style.zIndex = "";
          c.style.removeProperty("--ah-roll");
        });
        if (mq.matches) {
          sats.forEach((s) => {
            s.style.opacity = "0";
            s.style.transform = "scale(" + (+(s.dataset.sc || 1) * 0.86) + ")";
          });
        }
      };
      applyMode();
      mq.addEventListener("change", applyMode);
      cleanups.push(() => mq.removeEventListener("change", applyMode));

      raf = requestAnimationFrame(frame);

      /* --- drag with momentum, once assembled --- */
      let drag: CardEl | null = null;
      let sx = 0, sy = 0, bx = 0, by = 0, lx = 0, ly = 0, zTop = 60;

      cards.forEach((c) => {
        const down = (e: PointerEvent) => {
          if (!mq.matches || reduced) return;
          if (currentP < DRAG_AT) return; // not yet assembled
          drag = c;
          try { c.setPointerCapture(e.pointerId); } catch { /* not fatal */ }
          sx = e.clientX; sy = e.clientY; bx = c._dx; by = c._dy; lx = e.clientX; ly = e.clientY;
          c._vx = 0; c._vy = 0; c.style.zIndex = String(++zTop);
          e.preventDefault();
        };
        c.addEventListener("pointerdown", down);
        cleanups.push(() => c.removeEventListener("pointerdown", down));
      });

      const move = (e: PointerEvent) => {
        if (!drag) return;
        drag._dx = bx + (e.clientX - sx);
        drag._dy = by + (e.clientY - sy);
        drag._vx = e.clientX - lx; drag._vy = e.clientY - ly;
        lx = e.clientX; ly = e.clientY;
      };
      const endDrag = () => {
        if (!drag) return;
        const c = drag; drag = null;
        const glide = () => { // momentum glide out
          if (Math.abs(c._vx) < 0.4 && Math.abs(c._vy) < 0.4) return;
          c._dx += c._vx; c._dy += c._vy; c._vx *= 0.9; c._vy *= 0.9;
          requestAnimationFrame(glide);
        };
        glide();
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);
      cleanups.push(() => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", endDrag);
        window.removeEventListener("pointercancel", endDrag);
      });
    }

    /* ===== OUTREACH inbox ===== */
    const cyc = [
      { ini: "CH", cls: "ah-a1", name: "Claire Hughes", sub: "Head of Growth · Vero",
        out: "Hi Claire - noticed you just stepped into Head of Growth at Vero. We help small marketing teams get more from every campaign without adding headcount. Worth a look?",
        reply: "Sounds good - send me a time this week." },
      { ini: "TR", cls: "ah-a3", name: "Tom Reilly", sub: "VP Marketing · Northbeam",
        out: "Hi Tom - saw Northbeam is hiring across marketing. We help lean teams punch above their weight with AI. Open to a quick chat?",
        reply: "Yes, let's find a time." },
      { ini: "MO", cls: "ah-a2", name: "Marie O'Brien", sub: "CMO · Loop",
        out: "Hi Marie - one idea for Loop's Q3 launch that might be worth ten minutes of your time.",
        reply: "Interested - tell me more." },
      { ini: "SK", cls: "ah-a4", name: "Sinéad Kelly", sub: "Head of Demand · Arc",
        out: "Hi Sinéad - congrats on the move to Arc. We help teams like yours get more from every campaign. Worth a look?",
        reply: "Happy to chat, send a time that suits." },
    ];

    const hav = q<HTMLSpanElement>(".ah-hav");
    const hwho = q<HTMLDivElement>(".ah-hwho");
    const pill = q<HTMLSpanElement>(".ah-pill");
    const stream = q<HTMLDivElement>(".ah-stream");
    const rows = qa<HTMLDivElement>(".ah-threads > .ah-th").slice(0, 4);

    let convTimers: ReturnType<typeof setTimeout>[] = [];
    const showConv = (i: number) => {
      if (!hav || !hwho || !pill || !stream) return;
      convTimers.forEach(clearTimeout); convTimers = [];
      const c = cyc[i];
      hav.className = "ah-av " + c.cls;
      hav.textContent = c.ini;
      hwho.innerHTML = c.name + '<div class="ah-sub2">' + c.sub + "</div>";
      pill.classList.remove("ah-show");
      rows.forEach((r, idx) => r.classList.toggle("ah-sel", idx === i));
      stream.innerHTML = '<div class="ah-day">Today</div><div class="ah-b ah-out">' + c.out + '</div><div class="ah-rs"></div>';
      const rs = stream.querySelector<HTMLDivElement>(".ah-rs");
      if (!rs) return;
      convTimers.push(setTimeout(() => { rs.innerHTML = '<div class="ah-b ah-type"><span></span><span></span><span></span></div>'; }, 1100));
      convTimers.push(setTimeout(() => { rs.innerHTML = '<div class="ah-b ah-in">' + c.reply + "</div>"; }, 2600));
      convTimers.push(setTimeout(() => { pill.classList.add("ah-show"); }, 3100));
    };
    let ci = 0;
    showConv(0);
    intervals.push(setInterval(() => { ci = (ci + 1) % cyc.length; showConv(ci); }, 5600));
    cleanups.push(() => convTimers.forEach(clearTimeout));

    const pool: [string, string, string, boolean?][] = [
      ["Aoife Nolan", "ah-a7", "You: saw the Series A news - congrats…"],
      ["David Okafor", "ah-a8", "David: sure, happy to chat", true],
      ["Priya Shah", "ah-a2", "You: one idea for your ABM push…"],
      ["Liam Byrne", "ah-a3", "You: noticed you’re scaling the team…"],
      ["Hannah Frost", "ah-a5", "Hannah: what did you have in mind?", true],
      ["Marcus Lund", "ah-a6", "You: quick thought on your ICP…"],
      ["Ruth Whelan", "ah-a1", "Ruth: interested, send more", true],
      ["Owen Clarke", "ah-a4", "You: congrats on the promotion…"],
    ];
    const threads = q<HTMLDivElement>(".ah-threads");
    const unread = q<HTMLSpanElement>(".ah-unread");
    const livecount = q<HTMLSpanElement>(".ah-livecount");
    const sSent = q<HTMLDivElement>(".ah-s-sent");
    const sCred = q<HTMLSpanElement>(".ah-s-cred");
    let sent = 214, uc = 29, pi = 0;

    if (threads) {
      intervals.push(setInterval(() => {
        const p = pool[pi % pool.length]; pi++;
        const el = document.createElement("div");
        el.className = "ah-th ah-new";
        const ini = p[0].split(" ").map((w) => w[0]).join("");
        el.innerHTML =
          '<span class="ah-av ' + p[1] + '">' + ini + '</span><div class="ah-mid"><div class="ah-nm">' + p[0] +
          (p[3] ? ' <span class="ah-u"></span>' : "") + '</div><div class="ah-pv"><b>' + p[2].split(":")[0] + ":</b>" +
          p[2].split(":").slice(1).join(":") + '</div></div><span class="ah-t">now</span>';
        threads.insertBefore(el, threads.children[4]);
        while (threads.children.length > 8) threads.removeChild(threads.lastChild as Node);
        sent += Math.floor(2 + Math.random() * 4);
        if (livecount) livecount.textContent = sent + " sent";
        if (sSent) sSent.textContent = String(sent);
        if (sCred) sCred.textContent = sent + " / 5,000";
        if (p[3] && unread) {
          uc++; unread.textContent = String(uc); unread.classList.add("ah-bump");
          timers.push(setTimeout(() => unread.classList.remove("ah-bump"), 220));
        }
      }, 2600));
    }

    /* ===== RESEARCH email ===== */
    const ebody = q<HTMLDivElement>(".ah-ebody");
    const rmeta = q<HTMLSpanElement>(".ah-rmeta");
    const EHTML =
      '<div class="ah-lead ah-reveal" style="animation-delay:.15s">Hi Paul,</div>' +
      '<p class="ah-reveal" style="animation-delay:.45s">Here’s the research ahead of your meeting with <b>Vero</b> on Thursday. Their new Head of Growth is <b>Aoife Nolan</b>, six weeks in.</p>' +
      '<p class="ah-reveal" style="animation-delay:.8s">Series A closed in February, they’re hiring four marketers, and a self-serve tier lands in Q3. She ran demand at Loop before this.</p>' +
      "<ul>" +
      '<li class="ah-reveal" style="animation-delay:1.15s">She owns growth with <b>no team yet</b> - lead with the machine, not headcount.</li>' +
      '<li class="ah-reveal" style="animation-delay:1.45s">The <b>Q3 launch</b> is the wedge - outbound and lifecycle in one.</li>' +
      "</ul>" +
      '<div class="ah-att ah-reveal" style="animation-delay:1.75s"><span class="ah-ic">▤</span>vero-brief.pdf · 2 pages</div>';
    const runResearch = () => {
      if (!ebody) return;
      ebody.innerHTML = EHTML;
      if (rmeta) {
        rmeta.textContent = "compiling";
        timers.push(setTimeout(() => { rmeta.textContent = "ready"; }, 2300));
      }
      timers.push(setTimeout(runResearch, 6800));
    };
    runResearch();

    /* ===== TERMINAL instruction typewriter ===== */
    const termtype = q<HTMLSpanElement>(".ah-termtype");
    const termresp = q<HTMLDivElement>(".ah-termresp");
    const INSTR = "launch a campaign to 200 marketers who just changed roles";
    let tti = 0, tState = 0;
    const termStep = () => {
      if (!termtype || !termresp) return;
      if (tState === 0) {
        tti++;
        termtype.textContent = INSTR.slice(0, tti);
        if (tti < INSTR.length) {
          timers.push(setTimeout(termStep, 34 + Math.random() * 46));
        } else {
          tState = 1;
          timers.push(setTimeout(() => {
            termresp.classList.add("ah-show");
            timers.push(setTimeout(termStep, 3600));
          }, 500));
        }
      } else {
        termresp.classList.remove("ah-show");
        tti = 0; tState = 0;
        termtype.textContent = "";
        timers.push(setTimeout(termStep, 700));
      }
    };
    termStep();

    /* ===== BLUEPRINT animated flow ===== */
    const bpNodes = qa<HTMLDivElement>(".ah-blueprint .ah-bpnode");
    const bpFlows = qa<SVGPathElement>(".ah-blueprint .ah-edge.ah-flow");
    const runstate = q<HTMLSpanElement>(".ah-runstate");
    const bpRun = () => {
      if (!bpNodes.length) return;
      bpNodes.forEach((n) => n.classList.remove("ah-done", "ah-run"));
      bpFlows.forEach((f) => f.classList.remove("ah-on"));
      if (runstate) runstate.textContent = "Running";
      let step = 0;
      const maxStep = 3;
      const tick = () => {
        bpNodes.forEach((n) => { if (+(n.dataset.step || 0) === step) { n.classList.remove("ah-done"); n.classList.add("ah-run"); } });
        bpFlows.forEach((f) => f.classList.toggle("ah-on", +(f.dataset.step || 0) === step + 1));
        bpNodes.forEach((n) => { if (+(n.dataset.step || 0) < step) { n.classList.remove("ah-run"); n.classList.add("ah-done"); } });
        if (step < maxStep) { step++; timers.push(setTimeout(tick, 820)); }
        else {
          bpNodes.forEach((n) => { n.classList.remove("ah-run"); n.classList.add("ah-done"); });
          bpFlows.forEach((f) => f.classList.remove("ah-on"));
          if (runstate) runstate.textContent = "Done";
          timers.push(setTimeout(bpRun, 2600));
        }
      };
      tick();
    };
    bpRun();

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="ah-root" ref={rootRef}>
      <div className="ah-hero">
        <div className="ah-sticky">
          <div className="ah-head">
            {/* Training-course pill. Now a live anchor to /course, revealed for
                the 21 Sep launch. It has held its own space since the hero
                shipped, so revealing it shifts nothing else on the page. */}
            <a className="ah-kicker" href="/course">New: Free AI training course for marketers →</a>
            <h1>Marketing Agents for your business</h1>
            <p className="ah-sub">They make the ads, write the outreach, and run the campaigns, around the clock.</p>
            {/* THREE DOORS (Paul, 5 Sep): "AI Agents, Consulting, Training".
                Each one drops the full-screen surface that AgentsSection owns
                and fills it: the ten agents, the adoption grid, the course
                scroller. The hero only announces which door; the section
                listens for the event and opens. */}
            <div className="ah-ctas">
              <button type="button" className="ah-primary" onClick={() => openDoor("agents")}>AI Agents</button>
              <button type="button" className="ah-ghost" onClick={() => openDoor("consulting")}>Consulting</button>
              <button type="button" className="ah-ghost" onClick={() => openDoor("training")}>Training</button>
            </div>
          </div>

          <div className="ah-stage">

            {/* TERMINAL : dark instruction card, lower-left (contrast) */}
            <div className="ah-win ah-terminal ah-sat" data-dx="-476" data-dy="238" data-sc="0.84">
              <div className="ah-term-win">
                <div className="ah-term-tl"><i></i><i></i><i></i><span className="ah-t">You</span><span className="ah-live">~ run with foxes</span></div>
                <div className="ah-term-body">
                  <div className="ah-ln"><span className="ah-pr">›</span><span className="ah-termtype"></span><span className="ah-cur"></span></div>
                  <div className="ah-resp ah-termresp"><span className="ah-dot"></span><span><b>5 agents on it</b> - researching, writing, sending, tracking</span></div>
                </div>
              </div>
            </div>

            {/* OUTREACH inbox : left */}
            <div className="ah-win ah-inbox ah-sat" data-dx="-496" data-dy="-74" data-sc="0.68">
              <div className="ah-frame-win">
                <div className="ah-tl"><i></i><i></i><i></i><span className="ah-t">Outreach Agent</span><span className="ah-live ah-livecount">214 sent</span></div>
                <div className="ah-panel"><div className="ah-ibx">
                  <div className="ah-list">
                    <div className="ah-tabs"><span className="ah-on">All</span><span>Unread<span className="ah-badge ah-unread">29</span></span><span>Fav</span></div>
                    <div className="ah-threads">
                      <div className="ah-th ah-sel"><span className="ah-av ah-a1">CH</span><div className="ah-mid"><div className="ah-nm">Claire Hughes</div><div className="ah-pv"><b>You:</b> noticed you just stepped in…</div></div><span className="ah-t">now</span></div>
                      <div className="ah-th"><span className="ah-av ah-a3">TR</span><div className="ah-mid"><div className="ah-nm">Tom Reilly <span className="ah-u"></span></div><div className="ah-pv"><b>Tom:</b> yes, let&apos;s find a time</div></div><span className="ah-t">2m</span></div>
                      <div className="ah-th"><span className="ah-av ah-a2">MO</span><div className="ah-mid"><div className="ah-nm">Marie O&apos;Brien</div><div className="ah-pv"><b>You:</b> quick idea for your Q3 launch…</div></div><span className="ah-t">6m</span></div>
                      <div className="ah-th"><span className="ah-av ah-a4">SK</span><div className="ah-mid"><div className="ah-nm">Sinéad Kelly</div><div className="ah-pv"><b>You:</b> congrats on the new role…</div></div><span className="ah-t">11m</span></div>
                    </div>
                  </div>
                  <div className="ah-conv">
                    <div className="ah-chd">
                      <span className="ah-av ah-a1 ah-hav">CH</span>
                      <div className="ah-who ah-hwho">Claire Hughes<div className="ah-sub2">Head of Growth · Vero</div></div>
                      <span className="ah-pill">Replied</span>
                    </div>
                    <div className="ah-stream"></div>
                  </div>
                </div></div>
              </div>
            </div>

            {/* RESEARCH : email, upper-right */}
            <div className="ah-win ah-email ah-sat" data-dx="454" data-dy="-206" data-sc="0.76">
              <div className="ah-frame-win">
                <div className="ah-tl"><i></i><i></i><i></i><span className="ah-t">Research Agent</span><span className="ah-live ah-rmeta">compiling</span></div>
                <div className="ah-panel"><div className="ah-eml">
                  <div className="ah-ehd">
                    <div className="ah-subj">Research ahead of your meeting with Vero</div>
                    <div className="ah-addr"><span className="ah-av">R</span><span>from <b>Research Agent</b> · to <b>Paul</b></span><span className="ah-tag">✦ by AI</span></div>
                  </div>
                  <div className="ah-ebody"></div>
                </div></div>
              </div>
            </div>

            {/* FILM (Advertising) : wide landscape, moves down-right */}
            <div className="ah-win ah-film">
              <div className="ah-frame-win">
                <div className="ah-tl"><i></i><i></i><i></i><span className="ah-t">Advertising Agent</span><span className="ah-live">playing</span></div>
                <div className="ah-panel">
                  <video src="/video/fox-tarantino-trunk.mp4" poster="/video/fox-tarantino-trunk-poster.jpg" autoPlay muted loop playsInline preload="auto" />
                  <div className="ah-cap"><b>Ads and video, made in minutes</b><span>runwithfoxes.com</span></div>
                </div>
              </div>
            </div>

            {/* BLUEPRINT : dominant centre */}
            <div className="ah-win ah-blueprint ah-sat" data-dx="0" data-dy="6" data-sc="0.80">
              <div className="ah-frame-win">
                <div className="ah-tl"><i></i><i></i><i></i><span className="ah-t">Campaign Agent</span><span className="ah-live">running</span></div>
                <div className="ah-panel"><div className="ah-bpw">
                  <div className="ah-bpbar">
                    <span className="ah-crumb">Workflows › <b>New-role outbound</b></span>
                    <span className="ah-bptabs"><span>Editor</span><span className="ah-on">Runs <span className="ah-cnt">13</span></span><span>Settings</span></span>
                    <span className="ah-rt"><span className="ah-livepill">Live</span><span className="ah-trig">▶ Trigger</span></span>
                  </div>
                  <div className="ah-bpmain">
                    <div className="ah-bpcanvas">
                      <svg viewBox="0 0 600 360" preserveAspectRatio="none">
                        <path className="ah-edge" d="M121,180 L155,180"></path>
                        <path className="ah-edge" d="M277,180 C355,180 300,101 323,101"></path>
                        <path className="ah-edge" d="M277,180 C355,180 300,259 323,259"></path>
                        <path className="ah-edge" d="M445,101 C500,101 500,180 467,180"></path>
                        <path className="ah-edge" d="M445,259 C500,259 500,180 467,180"></path>
                        <path className="ah-edge ah-flow" data-step="1" d="M121,180 L155,180"></path>
                        <path className="ah-edge ah-flow" data-step="2" d="M277,180 C355,180 300,101 323,101"></path>
                        <path className="ah-edge ah-flow" data-step="2" d="M277,180 C355,180 300,259 323,259"></path>
                        <path className="ah-edge ah-flow" data-step="3" d="M445,101 C500,101 500,180 467,180"></path>
                        <path className="ah-edge ah-flow" data-step="3" d="M445,259 C500,259 500,180 467,180"></path>
                      </svg>
                      <div className="ah-bpnode ah-trig" data-step="0" style={{ left: "10%", top: "50%" }}><div className="ah-nh"><span className="ah-ic">◆</span><span className="ah-bpnm">New-role signal</span></div><div className="ah-st">trigger</div></div>
                      <div className="ah-bpnode" data-step="1" style={{ left: "36%", top: "50%" }}><div className="ah-nh"><span className="ah-ic">◱</span><span className="ah-bpnm">Enrich account</span></div><div className="ah-st">step</div></div>
                      <div className="ah-bpnode" data-step="2" style={{ left: "64%", top: "28%" }}><div className="ah-nh"><span className="ah-ic">▤</span><span className="ah-bpnm">Research brief</span></div><div className="ah-st">agent</div></div>
                      <div className="ah-bpnode" data-step="2" style={{ left: "64%", top: "72%" }}><div className="ah-nh"><span className="ah-ic">✎</span><span className="ah-bpnm">Draft outreach</span></div><div className="ah-st">agent</div></div>
                      <div className="ah-bpnode" data-step="3" style={{ left: "88%", top: "50%" }}><div className="ah-nh"><span className="ah-ic">➤</span><span className="ah-bpnm">Send + track</span></div><div className="ah-st">step</div></div>
                    </div>
                    <div className="ah-bppanel">
                      <div className="ah-ph">Run history</div>
                      <div className="ah-bprun ah-cur"><span className="ah-rs ah-on2">◐</span><span className="ah-rn">Run #13</span><span className="ah-rt2 ah-runstate">Running</span></div>
                      <div className="ah-bprun"><span className="ah-rs ah-ok">✓</span><span className="ah-rn">Run #12</span><span className="ah-rt2">yesterday</span></div>
                      <div className="ah-bprun"><span className="ah-rs ah-ok">✓</span><span className="ah-rn">Run #11</span><span className="ah-rt2">3 days ago</span></div>
                      <div className="ah-bpov">
                        <div className="ah-lab">This week</div>
                        <div className="ah-bpgrid">
                          <div className="ah-bpstat"><div className="ah-n ah-s-sent">214</div><div className="ah-k">Contacted</div></div>
                          <div className="ah-bpstat ah-g"><div className="ah-n">38</div><div className="ah-k">Replied</div></div>
                          <div className="ah-bpstat ah-g"><div className="ah-n">9</div><div className="ah-k">Calls booked</div></div>
                          <div className="ah-bpstat"><div className="ah-n">1</div><div className="ah-k">Running</div></div>
                        </div>
                        <div className="ah-bpcred"><span>credits used</span><span className="ah-s-cred">214 / 5,000</span></div>
                        <div className="ah-bpbar2"><i></i></div>
                      </div>
                    </div>
                  </div>
                </div></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
