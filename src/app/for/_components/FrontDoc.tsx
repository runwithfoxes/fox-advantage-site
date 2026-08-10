"use client";

// FRONT - tech design language calibration, built in the site's own grammar
// (hand-rolled CSS + IntersectionObserver + rAF, no animation libraries).
// The bar: research/reference-measure/CALIBRATION.md in fox-meeting-pages -
// Attio and Mercury measured live. H1 64/600 on a bounded head container,
// statements 40px max, one accent (Front's own #6257F4), scale spent once at
// the dark turn. Every colour is Front's own; every line of copy is theirs or
// a plain trim of theirs. Screen one: statement + the living inbox canvas.

import { useEffect, useRef, useState } from "react";
import { Inter, Inter_Tight } from "next/font/google";
import "./front-doc.css";

// Front's own header logo, lifted as inline SVG from front.com (born-clean
// vector, their mark colour baked in, wordmark takes currentColor = our ink).
const FRONT_LOGO_SVG = `<svg aria-label="Front" role="img" width="283" height="65" viewBox="0 0 283 65"><g><path d="M0 63.6152H21.3918V21.3008H64.0428V-0.00341797H0V63.6152Z" fill="#A857F1"></path><path d="M45.5945 64.8878C56.2523 64.8878 64.8922 56.2479 64.8922 45.5901C64.8922 34.9323 56.2523 26.2925 45.5945 26.2925C34.9367 26.2925 26.2969 34.9323 26.2969 45.5901C26.2969 56.2479 34.9367 64.8878 45.5945 64.8878Z" fill="#A857F1"></path></g><g><path d="M259.657 62.7285C255.717 62.7285 252.686 61.6893 250.564 59.6108C248.485 57.5323 247.446 54.5012 247.446 50.5174V31.6812H239.457V20.7041H247.446V6.41455H260.762V20.7041H272.128V31.6812H260.762V47.7245C260.762 49.0668 261.108 50.0844 261.801 50.7773C262.494 51.4701 263.511 51.8165 264.854 51.8165H272.128V62.7285H259.657Z" fill="currentColor"></path><path d="M195.352 20.7035H207.433V24.211C208.818 22.6954 210.507 21.5263 212.499 20.7035C214.534 19.8375 216.786 19.3828 219.254 19.3395C221.679 19.2962 223.952 19.7076 226.074 20.5736C228.196 21.4397 230.036 22.6521 231.595 24.211C233.154 25.8131 234.345 27.7834 235.168 30.1217C236.034 32.4167 236.467 35.2313 236.467 38.5655V62.7279H223.086V39.9295C223.086 38.1975 222.913 36.8551 222.567 35.9025C222.264 34.9065 221.766 34.0621 221.073 33.3693C219.817 32.1569 218.107 31.5506 215.942 31.5506C213.776 31.5506 212.066 32.1569 210.81 33.3693C210.074 34.0621 209.533 34.9065 209.186 35.9025C208.883 36.8551 208.732 38.1975 208.732 39.9295V62.7279H195.352V20.7035Z" fill="currentColor"></path><path d="M167.21 63.8325C162.836 63.8325 158.852 62.8582 155.258 60.9096C151.708 59.0043 148.893 56.3412 146.814 52.9204C144.779 49.5429 143.762 45.7972 143.762 41.6836C143.762 37.5699 144.779 33.8026 146.814 30.3818C148.893 26.961 151.708 24.2762 155.258 22.3277C158.852 20.3358 162.836 19.3398 167.21 19.3398C171.583 19.3398 175.545 20.3358 179.096 22.3277C182.69 24.2762 185.505 26.961 187.54 30.3818C189.575 33.8026 190.593 37.5699 190.593 41.6836C190.593 45.7972 189.575 49.5429 187.54 52.9204C185.505 56.3412 182.69 59.0043 179.096 60.9096C175.545 62.8582 171.583 63.8325 167.21 63.8325ZM167.21 52.0111C169.028 52.0111 170.652 51.5564 172.081 50.6471C173.553 49.7377 174.701 48.5036 175.524 46.9447C176.346 45.3859 176.758 43.6322 176.758 41.6836C176.758 39.735 176.346 37.9813 175.524 36.4224C174.701 34.8635 173.553 33.6511 172.081 32.7851C170.652 31.8757 169.028 31.421 167.21 31.421C165.348 31.421 163.681 31.8757 162.208 32.7851C160.779 33.6511 159.653 34.8635 158.831 36.4224C158.008 37.9813 157.597 39.735 157.597 41.6836C157.597 43.6322 158.008 45.3859 158.831 46.9447C159.653 48.5036 160.801 49.7377 162.273 50.6471C163.746 51.5564 165.391 52.0111 167.21 52.0111Z" fill="currentColor"></path><path d="M114.129 20.7037H126.145V25.7051C127.574 23.9297 129.285 22.5657 131.276 21.613C133.312 20.6604 135.498 20.1841 137.837 20.1841C139.352 20.1841 140.824 20.314 142.253 20.5738V33.1746C141.214 32.7849 139.785 32.59 137.967 32.59C134.762 32.59 132.229 33.5643 130.367 35.5129C129.371 36.5089 128.613 37.7213 128.094 39.1503C127.617 40.5792 127.379 42.4196 127.379 44.6713V62.7281H114.129V20.7037Z" fill="currentColor"></path><path d="M75.8164 -0.665527H109.852V12.0002H89.5214V24.4062H109.462V36.6173H89.5214V62.7283H75.8164V-0.665527Z" fill="currentColor"></path></g></svg>`;


const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--ft-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ft-body",
});

function useReducedMotion(): boolean {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    setRm(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return rm;
}

/* The rebuilt Front inbox, alive: a message arrives, tags pop on, Autopilot
   resolves the battery thread, the counts move, then it resets and loops.
   Rebuilt as live DOM from front.com's own published product cards (doctrine:
   never a placed screenshot); the honesty tag sits on the window chrome. */
function LivingInbox({ rm }: { rm: boolean }) {
  const [step, setStep] = useState(rm ? 99 : 0);
  useEffect(() => {
    if (rm) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(setTimeout(() => alive && fn(), ms));
    const run = () => {
      setStep(0);
      at(1200, () => setStep(1)); // Maya's message arrives
      at(2100, () => setStep(2)); // urgent tag
      at(2500, () => setStep(3)); // vip tag
      at(4200, () => setStep(4)); // Autopilot resolves the battery thread
      at(9200, () => run()); // reset, loop
    };
    run();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [rm]);

  const arrived = step >= 1 || step === 99;
  const resolved = step >= 4 || step === 99;
  const nOpen = step === 99 ? 41 : arrived ? (resolved ? 40 : 41) : 40;
  const nDone = resolved ? 13 : 12;

  return (
    <div className="ft-win ft-inbox-win">
      <div className="ft-winbar">
        <i /><i /><i />
        <span className="ft-winname">the front inbox</span>
        <span className="ft-wintag">Illustrative &middot; rebuilt from front.com</span>
      </div>
      <div className="ft-inbox">
        <div className="ft-ibside">
          <div className="ft-sec">Inbox</div>
          <div className="ft-ibitem on"><span>Open</span><span className="n">{nOpen}</span></div>
          <div className="ft-ibitem"><span>Later</span><span className="n">6</span></div>
          <div className="ft-ibitem"><span>Done</span><span className="n">{nDone}</span></div>
          <div className="ft-sec">Pinned</div>
          <div className="ft-ibitem"><span>VIP customer</span><span className="n">40</span></div>
          <div className="ft-ibitem"><span>Urgent</span><span className="n">7</span></div>
          <div className="ft-sec">Support</div>
          <div className="ft-ibitem"><span>Support Tier 1</span><span className="n">10</span></div>
          <div className="ft-ibitem"><span>Support Tier 2</span><span className="n">7</span></div>
          <div className="ft-ibitem"><span>Live chat</span><span className="n">7</span></div>
        </div>
        <div className="ft-iblist">
          <div className={"ft-row ft-arrive" + (arrived ? " in" : "")}>
            <span className="ft-dot" />
            <div className="ft-rbody">
              <div className="ft-rtop"><span className="ft-who">Maya Thompson</span><span className="ft-t">now</span></div>
              <div className="ft-subj">Shipping delays</div>
              <div className="ft-snip">What&rsquo;s the status on&hellip;
                <span className={"ft-chip urgent" + (step >= 2 || step === 99 ? " in" : "")}>urgent</span>
                <span className={"ft-chip vip" + (step >= 3 || step === 99 ? " in" : "")}>vip</span>
              </div>
            </div>
          </div>
          <div className="ft-row">
            <span className="ft-dot" />
            <div className="ft-rbody">
              <div className="ft-rtop"><span className="ft-who">Casey Jones</span><span className="ft-t">3h</span></div>
              <div className="ft-subj">Customer needs refund for order</div>
              <div className="ft-snip">looks good to me! <span className="ft-chip vip in">vip</span></div>
            </div>
          </div>
          <div className="ft-row">
            <span className="ft-dot" />
            <div className="ft-rbody">
              <div className="ft-rtop"><span className="ft-who">Lance Jones</span><span className="ft-t">4h</span></div>
              <div className="ft-subj">Re: Battery Not Charging</div>
              <div className="ft-snip">Hi Ben, I tried the batte&hellip;
                <span className={"ft-chip done" + (resolved ? " in" : "")}>Done</span>
              </div>
              <div className={"ft-ailine" + (resolved ? " in" : "")}>
                <svg viewBox="0 0 16 16" width="13" height="13"><path d="M8 1l1.6 4.6L14 7l-4.4 1.4L8 13 6.4 8.4 2 7l4.4-1.4z" fill="currentColor" /></svg>
                Autopilot replied &middot; 3 sources
              </div>
            </div>
          </div>
          <div className="ft-row read">
            <span className="ft-dot" />
            <div className="ft-rbody">
              <div className="ft-rtop"><span className="ft-who">Red Narwhal</span><span className="ft-t">5h</span></div>
              <div className="ft-subj">Hi, yes exactly. You just need to unplug it</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FrontDoc() {
  const rm = useReducedMotion();
  const [up, setUp] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  // grabbable windows: the site's own drag idiom (AgentsHero) - pointer
  // capture, window-level move, momentum glide on release. The inbox drags
  // by its title bar, the way real software does.
  useEffect(() => {
    const wins: { el: HTMLElement | null; handle?: string }[] = [
      { el: sideRef.current },
      { el: inboxRef.current, handle: ".ft-winbar" },
    ];
    let drag: HTMLElement | null = null;
    let sx = 0, sy = 0, bx = 0, by = 0, lx = 0, ly = 0, vx = 0, vy = 0;
    let zTop = 5;
    const pos = new Map<HTMLElement, { x: number; y: number }>();
    const setT = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    const downs: [HTMLElement, (e: PointerEvent) => void][] = [];
    wins.forEach(({ el, handle }) => {
      if (!el) return;
      pos.set(el, { x: 0, y: 0 });
      const down = (e: PointerEvent) => {
        if (handle && !(e.target as HTMLElement).closest(handle)) return;
        drag = el;
        try { el.setPointerCapture(e.pointerId); } catch { /* not fatal */ }
        const p = pos.get(el)!;
        sx = e.clientX; sy = e.clientY; bx = p.x; by = p.y;
        lx = e.clientX; ly = e.clientY; vx = 0; vy = 0;
        el.style.zIndex = String(++zTop);
        el.classList.add("ft-dragging");
        e.preventDefault();
      };
      el.addEventListener("pointerdown", down);
      downs.push([el, down]);
    });
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const p = pos.get(drag)!;
      p.x = bx + (e.clientX - sx);
      p.y = by + (e.clientY - sy);
      vx = e.clientX - lx; vy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      setT(drag, p.x, p.y);
    };
    const end = () => {
      if (!drag) return;
      const el = drag;
      drag = null;
      el.classList.remove("ft-dragging");
      const p = pos.get(el)!;
      const glide = () => {
        if (Math.abs(vx) < 0.4 && Math.abs(vy) < 0.4) return;
        p.x += vx; p.y += vy; vx *= 0.9; vy *= 0.9;
        setT(el, p.x, p.y);
        requestAnimationFrame(glide);
      };
      if (!rm) glide();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      downs.forEach(([el, d]) => el.removeEventListener("pointerdown", d));
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [rm]);

  // entrance: head rises on mount, canvas follows
  useEffect(() => {
    const t = setTimeout(() => setUp(true), 80);
    return () => clearTimeout(t);
  }, []);

  // parallax: the canvas lifts gently against the scroll
  useEffect(() => {
    if (rm) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        if (canvasRef.current)
          canvasRef.current.style.transform = `translateY(${y * -0.05}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [rm]);

  const h1Words = ["AI", "for", "the", "hard", "stuff."];

  return (
    <div className={`ft-root ${interTight.variable} ${inter.variable}`}>
      <nav className="ft-nav">
        <div className="ft-wrap ft-navin">
          <a className="ft-brand" href="https://front.com" target="_blank" rel="noopener"
            dangerouslySetInnerHTML={{ __html: FRONT_LOGO_SVG }} />
          <div className="ft-navlinks">
            <a href="https://front.com/product" target="_blank" rel="noopener">Product</a>
            <a href="https://front.com/customers" target="_blank" rel="noopener">Customers</a>
            <a href="https://front.com/integrations" target="_blank" rel="noopener">Integrations</a>
            <a href="https://front.com/pricing" target="_blank" rel="noopener">Pricing</a>
          </div>
          <div className="ft-navright">
            <a className="ft-pill" href="https://front.com/product-tour" target="_blank" rel="noopener">
              Take the product tour
            </a>
          </div>
        </div>
      </nav>

      <header className="ft-hero">
        <div className="ft-glow" aria-hidden />
        <div className="ft-wrap">
          <div className="ft-herohead">
            <span className={"ft-eyebrow ft-rv" + (up ? " in" : "")}>
              The AI customer operations platform
            </span>
            <h1 className="ft-h1" aria-label="AI for the hard stuff.">
              {h1Words.map((w, i) => (
                <span
                  key={i}
                  className={"ft-w" + (up ? " in" : "")}
                  style={{ transitionDelay: rm ? "0s" : `${i * 70}ms` }}
                >
                  {w}
                </span>
              ))}
            </h1>
            <p className={"ft-sub ft-rv" + (up ? " in" : "")} style={{ transitionDelay: "300ms" }}>
              Teams, conversations and AI in one coordinated system, so customer
              operations stay fast, accurate and in control.
            </p>
            <div className={"ft-ctas ft-rv" + (up ? " in" : "")} style={{ transitionDelay: "420ms" }}>
              <a className="ft-pill" href="https://front.com/product-tour" target="_blank" rel="noopener">
                Take the product tour
              </a>
              <a className="ft-pill ghost" href="https://front.com/pricing" target="_blank" rel="noopener">
                See pricing
              </a>
            </div>
          </div>

          <div className="ft-canvas" ref={canvasRef}>
            <div className={"ft-canvasin ft-rv" + (up ? " in" : "")} style={{ transitionDelay: "550ms" }}>
              <div className="ft-winfloat">
                <div className="ft-dragwrap" ref={inboxRef}>
                  <LivingInbox rm={rm} />
                </div>
              </div>
              <div className="ft-sidewrap">
                <div className="ft-sidecard" ref={sideRef}>
                  <div className="ft-winbar">
                    <i /><i /><i />
                    <span className="ft-winname">autopilot</span>
                  </div>
                  <div className="ft-scbody">
                    <div className="ft-scto">To: Cameron Meyer</div>
                    Hi Cameron,
                    <div className="ft-scq">Does my warranty cover battery&hellip;</div>
                    <div className="ft-scq">How to check if your product is&hellip;</div>
                    <span className="ft-srcchip">+ 3 sources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <footer className="ft-foot">
        <div className="ft-wrap">
          A demonstration page by Run with Foxes, built from Front&rsquo;s public
          material at front.com. Not affiliated with or endorsed by Front. Every
          number and claim on this page is Front&rsquo;s own published statement.
        </div>
      </footer>
    </div>
  );
}
