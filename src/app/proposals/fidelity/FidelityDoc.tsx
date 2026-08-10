"use client";

/*
  Fidelity Investments Canada - private capabilities page.
  Content agreed line by line with Paul, 7-8 Aug 2026, in his own words from the
  7 Aug call. The three product windows are the homepage hero's own windows
  (globals.css `ah-` block); they are lifted out of the hero's absolute stage and
  scaled to fit the column, so their internals stay exactly as designed.
*/

import { useEffect, useRef } from "react";

const CSS = `
.fd{--bg:#FAFAF8;--text:#1D1B1B;--muted:#8A8A85;--sky:#3A7CA5;--deep:#1A3A4E;
  --border:#E0E0DC;--cream:#F7EAD9;--orange:#F47521;--card:#FFF;--soft:#F1F1EC;
  --sans:'Space Grotesk',sans-serif;--mono:'JetBrains Mono',monospace;
  background:var(--bg);color:var(--text);font-family:var(--mono);font-weight:300;
  font-size:.9375rem;line-height:1.7;}
.fd *{margin:0;padding:0;box-sizing:border-box;}
.fd a{color:var(--sky);text-decoration:none;}
.fd .fd-ct{max-width:1200px;margin:0 auto;padding:0 48px;}
.fd h2,.fd h3{font-family:var(--sans);font-weight:300;letter-spacing:-.01em;}

.fd nav{position:fixed;top:0;left:0;right:0;z-index:100;background:transparent;transition:background .3s ease;}
.fd nav.on{background:rgba(250,250,248,.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);}
.fd .fd-navin{max-width:1200px;margin:0 auto;padding:20px 48px;display:flex;justify-content:space-between;align-items:center;}
.fd .fd-logo{font-size:13px;letter-spacing:2px;color:var(--muted);}
.fd .fd-logo span{color:var(--orange);}
.fd .fd-navmeta{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);}

.fd .fd-hero{position:relative;padding:120px 0 84px;overflow:hidden;}
.fd .fd-hero:before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#d0d0cc .8px,transparent .8px);background-size:28px 28px;opacity:.4;}
.fd .fd-hero .fd-ct{position:relative;}
.fd .fd-stage{position:relative;border:1px solid var(--border);overflow:hidden;line-height:0;}
.fd .fd-stage>img{display:block;width:100%;height:auto;}
.fd .fd-plabel{position:absolute;background:var(--bg);border:1px solid var(--border);border-left:3px solid var(--sky);
  padding:7px 12px;font-size:13px;font-weight:400;white-space:nowrap;box-shadow:0 8px 24px rgba(26,58,78,.2);}
.fd .fd-forline{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--sky);margin-bottom:18px;}
.fd h1{font-family:var(--mono);font-weight:300;font-size:clamp(28px,4.6vw,50px);line-height:1.12;padding-top:52px;}
.fd h1 .fd-hl{color:var(--sky);}

.fd section{padding:76px 0;border-top:1px solid var(--border);}
.fd .fd-kick{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--sky);margin-bottom:16px;}
.fd h2{font-size:clamp(24px,3.2vw,34px);line-height:1.15;}
.fd .fd-lede{font-size:1.0625rem;line-height:1.65;color:#33322f;margin-top:22px;}
.fd .fd-p{font-size:1.0625rem;line-height:1.68;color:#33322f;margin-top:18px;}
.fd .fd-p b,.fd .fd-lede b{font-weight:500;}
.fd .fd-foxsec{display:block;width:150px;margin:44px 0 8px;opacity:.92;}

.fd .fd-calg{display:grid;grid-template-columns:260px 1fr;gap:44px;align-items:start;margin-top:20px;}
.fd .fd-calp{border:1px solid var(--border);overflow:hidden;max-width:260px;}
.fd .fd-calp img{display:block;width:100%;height:auto;}
.fd .fd-calb p{font-size:1.0625rem;line-height:1.68;color:#33322f;margin-bottom:18px;}
.fd .fd-calb p b{font-weight:500;}
.fd .fd-award{font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--sky);margin-bottom:22px;}
.fd .fd-cli .fd-k{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;}
.fd .fd-cli .fd-l{display:flex;flex-wrap:wrap;gap:8px;}
.fd .fd-cli .fd-l span{font-size:12px;color:#3a3936;background:var(--soft);border:1px solid var(--border);padding:6px 12px;}
.fd .fd-quotes{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:44px;}
.fd .fd-q{border-left:2px solid var(--sky);padding-left:20px;}
.fd .fd-q p{font-family:var(--sans);font-size:1.0625rem;line-height:1.5;margin-bottom:12px;}
.fd .fd-q .fd-who{font-size:11.5px;color:var(--muted);line-height:1.5;}
.fd .fd-q .fd-who b{color:var(--text);font-weight:500;}

.fd .fd-case{border:1px solid var(--border);background:var(--card);margin-top:34px;}
.fd .fd-chd{display:flex;flex-wrap:wrap;gap:14px;align-items:baseline;justify-content:space-between;
  padding:20px 30px;border-bottom:1px solid var(--border);background:var(--soft);}
.fd .fd-chd .fd-who{font-family:var(--sans);font-weight:400;font-size:23px;}
.fd .fd-chd .fd-meta{font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:var(--muted);}
.fd .fd-cbody{padding:30px;}
.fd .fd-cbody p{font-size:1.0625rem;line-height:1.68;color:#33322f;margin-bottom:18px;}
.fd .fd-cbody p:last-child{margin-bottom:0;}
.fd .fd-cbody p b{font-weight:500;}

/* Miro: the number is the picture */
.fd .fd-bignum{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:30px;
  padding:38px 30px;border-top:1px solid var(--border);background:linear-gradient(180deg,#fff 0%,#F4F8FA 100%);}
.fd .fd-bignum .fd-side{text-align:center;}
.fd .fd-bignum .fd-n{font-family:var(--sans);font-weight:300;font-size:56px;line-height:1;letter-spacing:-2px;color:var(--deep);}
.fd .fd-bignum .fd-out .fd-n{color:var(--sky);font-size:74px;}
.fd .fd-bignum .fd-l{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-top:12px;}
.fd .fd-bignum .fd-arrow{color:var(--sky);font-size:26px;}

.fd .fd-caps{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border);}
.fd .fd-cap{padding:22px 30px;}
.fd .fd-cap+.fd-cap{border-left:1px solid var(--border);}
.fd .fd-cap .fd-k{font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;}
.fd .fd-chips{display:flex;flex-wrap:wrap;gap:7px;}
.fd .fd-chip{font-size:12px;color:#3a3936;background:var(--soft);border:1px solid var(--border);border-left:2px solid var(--muted);padding:7px 12px;}
.fd .fd-cap.live .fd-chip{border-left-color:var(--sky);}

.fd .fd-logos{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;}
.fd .fd-logos span{font-size:12.5px;color:#3a3936;background:var(--bg);border:1px solid var(--border);padding:9px 14px;}
.fd .fd-logos span i{font-style:normal;color:var(--muted);font-size:10.5px;display:block;margin-top:3px;}

.fd .fd-stats{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:38px;}
.fd .fd-stat{background:var(--card);border:1px solid var(--border);border-top:2px solid var(--muted);padding:24px;}
.fd .fd-stat .fd-n{font-family:var(--sans);font-weight:300;font-size:46px;line-height:1;color:var(--deep);letter-spacing:-1.5px;}
.fd .fd-stat .fd-t{font-size:13.5px;line-height:1.6;color:#33322f;margin-top:14px;}
.fd .fd-stat .fd-s{font-size:10.5px;color:var(--muted);margin-top:14px;padding-top:12px;border-top:1px solid var(--border);line-height:1.55;}

/* fluency scale */
.fd .fd-fx{border:1px solid var(--border);background:var(--card);margin-top:34px;}
.fd .fd-fxtop{display:flex;flex-wrap:wrap;gap:26px;align-items:flex-end;justify-content:space-between;padding:24px 28px;border-bottom:1px solid var(--border);background:var(--soft);}
.fd .fd-fxtop .fd-k{font-size:9.5px;letter-spacing:1.6px;text-transform:uppercase;color:var(--muted);margin-bottom:8px;}
.fd .fd-fxtop .fd-v{font-family:var(--sans);font-weight:300;font-size:34px;line-height:1;color:var(--deep);letter-spacing:-1px;}
.fd .fd-fxtop .fd-sub{font-size:11.5px;color:var(--muted);margin-top:9px;}
.fd .fd-fxreset{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);background:var(--bg);border:1px solid var(--border);padding:8px 14px;cursor:pointer;}
.fd .fd-fxplot{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;align-items:end;padding:34px 28px 0;min-height:270px;}
.fd .fd-fxcol{display:flex;flex-direction:column;justify-content:flex-end;}
.fd .fd-fxbar{width:100%;transition:height .55s cubic-bezier(.4,0,.2,1);}
.fd .fd-fxcol:nth-child(1) .fd-fxbar{background:#B9BDBA;}
.fd .fd-fxcol:nth-child(2) .fd-fxbar{background:#8FA9B8;}
.fd .fd-fxcol:nth-child(3) .fd-fxbar{background:var(--sky);}
.fd .fd-fxcol:nth-child(4) .fd-fxbar{background:#2F6688;}
.fd .fd-fxcol:nth-child(5) .fd-fxbar{background:var(--deep);}
.fd .fd-fxaxis{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;padding:0 28px 26px;border-bottom:1px solid var(--border);}
.fd .fd-fxax{padding-top:12px;border-top:2px solid var(--border);}
.fd .fd-fxax .fd-l{font-size:11.5px;color:var(--text);line-height:1.4;}
.fd .fd-fxax .fd-d{font-size:10.5px;color:var(--muted);line-height:1.5;margin-top:5px;}
.fd .fd-fxctl{padding:26px 28px 26px;}
.fd .fd-fxctl .fd-k{font-size:9.5px;letter-spacing:1.6px;text-transform:uppercase;color:var(--sky);margin-bottom:16px;}
.fd .fd-sw{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.fd .fd-swb{display:flex;gap:14px;align-items:flex-start;text-align:left;width:100%;background:var(--bg);
  border:1px solid var(--border);padding:15px 17px;cursor:pointer;font-family:var(--mono);transition:border-color .2s,background .2s;}
.fd .fd-swb:hover{border-color:var(--muted);}
.fd .fd-swb.on{border-color:var(--sky);background:#F4F8FA;border-left:3px solid var(--sky);}
.fd .fd-swb .fd-box{flex:0 0 auto;width:15px;height:15px;border:1.5px solid var(--muted);margin-top:3px;position:relative;transition:all .2s;}
.fd .fd-swb.on .fd-box{background:var(--sky);border-color:var(--sky);}
.fd .fd-swb.on .fd-box:after{content:"";position:absolute;left:4px;top:1px;width:4px;height:8px;border:solid #fff;border-width:0 1.5px 1.5px 0;transform:rotate(45deg);}
.fd .fd-swb b{display:block;font-size:12.5px;font-weight:500;line-height:1.45;}
.fd .fd-swb .fd-ev{display:block;font-size:10.5px;color:var(--muted);line-height:1.55;margin-top:6px;}
.fd .fd-swb.on .fd-ev{color:var(--sky);}

/* product windows lifted out of the hero stage */
.fd .fd-winrow{display:grid;gap:26px;margin-top:8px;}
.fd .fd-holder{position:relative;overflow:hidden;}
.fd .fd-holder .ah-win{position:static !important;margin:0 !important;opacity:1 !important;transform-origin:0 0;}
.fd .fd-holder .ah-frame-win{box-shadow:0 18px 44px rgba(26,58,78,.14);}
.fd .fd-wincap{font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:var(--muted);margin-top:14px;}

.fd .fd-steps{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:32px;}
.fd .fd-step{background:var(--card);border:1px solid var(--border);border-left:3px solid var(--sky);padding:22px 24px;}
.fd .fd-step .fd-n{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--sky);margin-bottom:8px;}
.fd .fd-step .fd-h{font-family:var(--sans);font-weight:400;font-size:18px;margin-bottom:9px;}
.fd .fd-step p{font-size:13.5px;line-height:1.7;color:#3a3936;}

.fd .fd-covers{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:34px;padding-top:28px;border-top:1px solid var(--border);}
.fd .fd-covers .fd-k{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--deep);margin-bottom:10px;}
.fd .fd-covers p{font-size:13px;line-height:1.6;color:#3a3936;}
.fd .fd-cta{margin-top:44px;padding:34px 36px;background:var(--card);border:1px solid var(--border);border-left:3px solid var(--sky);}
.fd .fd-cta .fd-t{font-family:var(--sans);font-size:22px;margin-bottom:8px;}
.fd .fd-ctab{display:inline-block;background:var(--deep);color:var(--cream);font-size:13px;letter-spacing:1px;padding:13px 24px;font-weight:500;}
.fd .fd-ctar{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-top:6px;}
.fd footer{border-top:1px solid var(--border);}
.fd footer .fd-ct{padding-top:30px;padding-bottom:56px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.fd .fd-fb{font-size:13px;letter-spacing:2px;color:var(--muted);}
.fd .fd-fb span{color:var(--orange);}
.fd .fd-fm{font-size:11px;color:var(--muted);letter-spacing:1px;}

/* content is always visible: a document a client opens once must never depend on JS to appear */

@media(max-width:900px){
  .fd .fd-calg,.fd .fd-quotes,.fd .fd-covers,.fd .fd-steps,.fd .fd-stats,.fd .fd-sw,.fd .fd-caps{grid-template-columns:1fr;}
  .fd .fd-cap+.fd-cap{border-left:0;border-top:1px solid var(--border);}
  .fd .fd-bignum{grid-template-columns:1fr;gap:22px;}
  .fd .fd-bignum .fd-arrow{transform:rotate(90deg);}
  .fd .fd-fxax .fd-d{display:none;}
}
@media(max-width:768px){
  .fd .fd-ct{padding:0 24px;} .fd .fd-navin{padding:16px 24px;} .fd .fd-navmeta{display:none;}
  .fd .fd-hero{padding:96px 0 60px;}
}

`;

const BASE = [34, 46, 24, 13, 3];
const STRENGTH = [0.22, 0.3, 0.16, 0.12];
const STEP = [1, 1, 0.8, 0.25];

function distribution(on: boolean[]) {
  const d = BASE.slice();
  on.forEach((active, s) => {
    if (!active) return;
    for (let i = 3; i >= 0; i--) {
      const move = Math.round(d[i] * STRENGTH[s] * STEP[i]);
      d[i] -= move;
      d[i + 1] += move;
    }
  });
  return d;
}

const LEVELS = [
  ["Not using it", "Has access, has never really started"],
  ["Dabbling", "Occasional, personal, nothing repeated"],
  ["Weekly", "One real job done this way every week"],
  ["Fluent", "Reaches for it first, knows when not to"],
  ["Building", "Makes things other people use"],
];

const SWITCHES = [
  ["Champions with time genuinely protected", "Three to six people across the sub-teams, with real hours set aside. Not an honorary title on somebody already full."],
  ["One use case taken end to end, and the old way switched off", "One job of work with an owner, a starting number taken before you begin, and a date the old route closes."],
  ["Leaders doing the work themselves, in public", "Not talking about it, doing it. Trying stuff, making stuff, failing in public. Line managers too, not just the top."],
  ["The behaviours written down, so people know where they stand", "You can use AI all you like, but you own the work. You cannot abdicate."],
];

export default function FidelityDoc() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // nav
    const nav = el.querySelector("nav");
    const onScroll = () => nav?.classList.toggle("on", window.scrollY > 20);
    addEventListener("scroll", onScroll);

    // typed hero label
    const lab = el.querySelector<HTMLElement>(".fd-plabel");
    if (lab) {
      const s = "AI adoption programme";
      if (reduced) lab.textContent = s;
      else {
        let i = 0;
        const t = setInterval(() => { lab.textContent = s.slice(0, ++i); if (i >= s.length) clearInterval(t); }, 30);
      }
    }

    // scale each product window down to its column, keeping its designed layout
    const fit = () => {
      el.querySelectorAll<HTMLElement>(".fd-holder").forEach((h) => {
        const win = h.firstElementChild as HTMLElement | null;
        if (!win) return;
        const natural = parseFloat(win.dataset.w || "0");
        if (!natural) return;
        const k = Math.min(1, h.clientWidth / natural);
        win.style.transform = `scale(${k})`;
        h.style.height = `${win.offsetHeight * k}px`;
      });
    };
    fit();
    const ro = new ResizeObserver(fit);
    el.querySelectorAll(".fd-holder").forEach((h) => ro.observe(h));
    const t = setTimeout(fit, 400); // after the video box settles

    return () => { removeEventListener("scroll", onScroll); ro.disconnect(); clearTimeout(t); };
  }, []);

  // fluency scale state, done with plain DOM so the bars animate off one source
  const onRef = useRef<boolean[]>([false, false, false, false]);
  const draw = () => {
    const el = root.current;
    if (!el) return;
    const d = distribution(onRef.current);
    el.querySelectorAll<HTMLElement>(".fd-fxbar").forEach((b, i) => { b.style.height = `${d[i] * 4}px`; });
    el.querySelectorAll<HTMLElement>(".fd-swb").forEach((b, i) => b.classList.toggle("on", onRef.current[i]));
  };
  useEffect(draw, []);

  return (
    <div className="fd" ref={root}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav>
        <div className="fd-navin">
          <div className="fd-logo">/<span>Run</span>withfoxes</div>
          <div className="fd-navmeta">Private · Fidelity Investments Canada</div>
        </div>
      </nav>

      <div className="fd-hero">
        <div className="fd-ct">
          <div className="fd-stage">
            <img src="/proposals/fox-office-crop.png" alt="A marketing department of AI agents at work" />
            <div className="fd-plabel" style={{ left: "31%", top: "29%" }} />
          </div>
          <div className="fd-forline">Prepared for Peter Berry and Mohd Asher, Fidelity Investments Canada</div>
          <h1>Redesigning a marketing team from <span className="fd-hl">a blank page</span></h1>
        </div>
      </div>

      {/* HOW I WORK */}
      <section>
        <div className="fd-ct">
          <div className="fd-kick">How I work</div>
          <h2 className="fd-fd-rv">Quality first, then automate</h2>
          <div className="fd-calg">
            <div className="fd-calp fd-rv"><img src="/proposals/Paul_photo.jpg" alt="Paul Dervan, Run with Foxes" /></div>
            <div className="fd-calb fd-rv">
              <div className="fd-award">Ireland&apos;s Marketer of the Year, 2022</div>
              <p>Before I build anything, I ask one question: what does really good look like here? Not what AI can do, but what the best version of this marketing would be, and the level of quality and effectiveness I would want to stand over.</p>
              <p>With adoption the question is much the same, and it is not which tools to buy. It is what the work would look like if it were being done properly, and then what has to change in the roles and the habits around it for the team to work that way. <b>I would map that first, before anything gets rolled out.</b> Skip it and you get a lot of activity and not much changed work.</p>
              <p>I ran large marketing functions before I did this. Head of Brand at O2 Ireland, Head of Brand at Indeed, CMO at the National Lottery and Head of Brand at Miro. Indeed and Miro were both global roles. At Miro I spent two years taking a marketing team through this, with a mandate from the CEO to go as deep into AI as we could. So I have done it from the inside, with the budget, the team and the resistance that comes with it.</p>
              <div className="fd-cli">
                <div className="fd-k">Who I work with</div>
                <div className="fd-l">
                  {["Moloco", "Heineken", "Norcros", "Alltech", "Smurfit", "Hostelworld", "Eaton Square", "Weatherbys"].map((c) => <span key={c}>{c}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="fd-quotes">
            <div className="fd-q fd-rv">
              <p>&ldquo;His command of marketing science as well as his instincts for great thinking and ideas are, in my opinion, superb.&rdquo;</p>
              <div className="fd-who"><b>Peter Field</b><br />The Godfather of Effectiveness, author of The Long and the Short of It</div>
            </div>
            <div className="fd-q fd-rv">
              <p>&ldquo;Paul reported into me as Head of Brand when I was at Indeed. I have learned more from him than anyone else in my career.&rdquo;</p>
              <div className="fd-who"><b>Paul D&apos;Arcy</b><br />CMO, Moloco. Former CMO at Miro and Indeed</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU SAID */}
      <section>
        <div className="fd-ct">
          <div className="fd-kick">What we heard</div>
          <h2 className="fd-fd-rv">The twenty new roles</h2>
          <p className="fd-lede fd-rv">You have around a hundred and twenty people and you are adding about twenty next year, into the roles you would normally use when you need capacity. You said listening to this made you wonder whether you should be rethinking those roles entirely. <b>I said you should, and I meant it.</b> It is worth doing before you hire rather than after.</p>
          <p className="fd-p fd-rv">You also said where you are with the tools. Adobe Express, Jasper, Figma and Figma Weave, picked up over the last few years. The two things you named as the struggle were adoption, getting people to use any of it, and measurement, knowing whether they are using them at all and what value they are delivering. Asher put it somewhere specific, which was the layers an email goes through before it gets approved. And you raised where the IP ends up and who has access to the data. There is a section on that below.</p>
          <img src="/proposals/chapter-fox-sitting-nobg.png" alt="" className="fd-foxsec fd-rv" />
        </div>
      </section>

      {/* THE WORK */}
      <section>
        <div className="fd-ct">
          <div className="fd-kick">The work</div>
          <h2 className="fd-fd-rv">The range of the work I do</h2>
          <p className="fd-lede fd-rv">Starting with the big companies, and with the one I did from the inside, running the teams rather than advising them.</p>

          {/* MIRO */}
          <div className="fd-case fd-rv">
            <div className="fd-chd">
              <div className="fd-who">Miro</div>
              <div className="fd-meta">150 marketers · brand strategy, advertising, marketing communications, the studio</div>
            </div>
            <div className="fd-cbody">
              <p>We were spending about $1.2 million on design and studio work. When I realised what was possible I set a target to reduce it by 20%, and that 20% was the low hanging fruit, the low skill design work.</p>
              <p>It took a combination of things. AI to make the images, the video and the copy. A training structure and a training programme. Extra Canva licences. And changes to the brand guidelines and the policies, so that people who were not marketers could serve themselves and move with speed, while keeping everything consistent across the work.</p>
            </div>
            <div className="fd-bignum">
              <div className="fd-side"><div className="fd-n">$1.2m</div><div className="fd-l">Spent on design and studio work</div></div>
              <div className="fd-arrow">→</div>
              <div className="fd-side fd-out"><div className="fd-n">$240k</div><div className="fd-l">Taken out, inside a year</div></div>
            </div>
          </div>

          {/* SABRE */}
          <div className="fd-case fd-rv">
            <div className="fd-chd">
              <div className="fd-who">Sabre</div>
              <div className="fd-meta">AI adoption programme, marketing first</div>
            </div>
            <div className="fd-cbody">
              <p>I have been building capabilities for Sabre, and I now work alongside their champion inside the marketing team, their marketing director. <b>A combination of him on the inside and me on the outside.</b></p>
              <p>Together we have designed an AI adoption programme for marketing, which we are rolling out now and will extend into go to market.</p>
              <p>Alongside the programme I have built them writers, brand guardians, a search agent, a brief coach to improve the quality of their briefs, and an advertising creative role.</p>
            </div>
            <div className="fd-caps">
              <div className="fd-cap fd-live">
                <div className="fd-k">Capabilities built</div>
                <div className="fd-chips">{["Writers", "Brand guardians", "Search agent", "Brief coach", "Advertising creative"].map((c) => <span className="fd-chip" key={c}>{c}</span>)}</div>
              </div>
              <div className="fd-cap">
                <div className="fd-k">Running now</div>
                <div className="fd-chips">{["AI adoption programme", "Extending to go to market"].map((c) => <span className="fd-chip" key={c}>{c}</span>)}</div>
              </div>
            </div>
          </div>

          <p className="fd-p fd-rv">The way we go at the adoption side is to map the AI fluency across the team. Then, without judgment, you want to move everybody up the scale. <b>Not everybody is going to be a builder.</b> For most of the team a good result is that one part of their week is different from how it was before.</p>

          {/* FLUENCY SCALE */}
          <div className="fd-fx fd-rv">
            <div className="fd-fxtop">
              <div>
                <div className="fd-k">Fluency across the team</div>
                <div className="fd-fd-v">Our approach</div>
                <div className="fd-fd-sub">Not a measurement. A way of thinking about it.</div>
              </div>
              <button className="fd-fxreset" onClick={() => { onRef.current = [false, false, false, false]; draw(); }}>Reset</button>
            </div>
            <div className="fd-fxplot">
              {BASE.map((v, i) => <div className="fd-fxcol" key={i}><div className="fd-fxbar" style={{ height: v * 4 }} /></div>)}
            </div>
            <div className="fd-fxaxis">
              {LEVELS.map(([l, d]) => <div className="fd-fxax" key={l}><div className="fd-l">{l}</div><div className="fd-d">{d}</div></div>)}
            </div>
            <div className="fd-fxctl">
              <div className="fd-k">The four things you are trying to do</div>
              <div className="fd-sw">
                {SWITCHES.map(([t, ev], i) => (
                  <button className="fd-swb" key={t} onClick={() => { onRef.current[i] = !onRef.current[i]; draw(); }}>
                    <span className="fd-box" />
                    <span><b>{t}</b><span className="fd-ev">{ev}</span></span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MOLOCO */}
          <div className="fd-case fd-rv">
            <div className="fd-chd">
              <div className="fd-who">Moloco</div>
              <div className="fd-meta">50 to 60 marketers</div>
            </div>
            <div className="fd-cbody">
              <p>They wanted to hire a copywriter. I persuaded them to let me build copywriters in AI instead, and they use them all the time.</p>
              <p>The part that matters is what goes into one. <b>A copywriter is built with the positioning, the messaging framework, the pain points and the proof points.</b> That is what makes what comes out usable rather than generic.</p>
              <p>I am also building them a brand guardian, and an AI identity generator, which takes all the elements of their brand identity and reproduces them at speed.</p>
              <p>Then there are the smaller ones already built, the fact checkers and the legal checkers. Those are ways of bringing consistency to what you are allowed to say.</p>
            </div>
            <div className="fd-caps">
              <div className="fd-cap fd-live">
                <div className="fd-k">Built and in use</div>
                <div className="fd-chips">{["Copywriters", "Fact checker", "Legal checker"].map((c) => <span className="fd-chip" key={c}>{c}</span>)}</div>
              </div>
              <div className="fd-cap">
                <div className="fd-k">Being built</div>
                <div className="fd-chips">{["Brand guardian", "Identity generator"].map((c) => <span className="fd-chip" key={c}>{c}</span>)}</div>
              </div>
            </div>
          </div>

          {/* HOSTELWORLD */}
          <div className="fd-case fd-rv">
            <div className="fd-chd">
              <div className="fd-who">Hostelworld</div>
              <div className="fd-meta">Interim CMO</div>
            </div>
            <div className="fd-cbody">
              <p>I was interim CMO. The job was to structure their marketing and brand strategy with an AI focus to execute against, and that included hiring the permanent CMO.</p>
              <p>Alongside it I gave external advice to their board on marketing in the AI era.</p>
              <p><b>Now I am helping the new CMO build the right mix of team and agents.</b></p>
            </div>
          </div>

          {/* THE COURSE */}
          <div className="fd-case fd-rv">
            <div className="fd-chd">
              <div className="fd-who">The course</div>
              <div className="fd-meta">AI fluency for marketers · opens 21 September</div>
            </div>
            <div className="fd-cbody">
              <p>I recently launched a training course on AI fluency for marketers. <b>700 marketers have registered, from over 250 companies.</b></p>
              <p>Some of the companies they come from:</p>
              <div className="fd-logos">
                {[["Indeed", "Technology"], ["Zurich", "Insurance"], ["KPMG", "Professional services"], ["Lidl", "Grocery"], ["PepsiCo", "Food and drink"], ["RTÉ", "Broadcasting"], ["An Post", "Postal"], ["Domino's", "Restaurants"], ["Sky", "Media"], ["John Lewis", "Retail"]].map(([n, c]) => (
                  <span key={n}>{n}<i>{c}</i></span>
                ))}
              </div>
            </div>
          </div>

          {/* UCD */}
          <div className="fd-case fd-rv">
            <div className="fd-chd">
              <div className="fd-who">UCD Smurfit</div>
              <div className="fd-meta">Teaching</div>
            </div>
            <div className="fd-cbody">
              <p>I train the digital marketing courses for postgraduates, and I train their global executive teams.</p>
              <p>The courses cover how to build AI agents, and how to build personal effectiveness and company effectiveness through AI.</p>
            </div>
          </div>

          {/* SMALLER COMPANIES + THE PRODUCT WINDOWS */}
          <div className="fd-case fd-rv">
            <div className="fd-chd">
              <div className="fd-who">Startups, smaller companies and SMEs</div>
              <div className="fd-meta">Lean marketing resources</div>
            </div>
            <div className="fd-cbody">
              <p>At the other end of the range I build marketing agents, because these companies have lean marketing resources. <b>The job there is to build marketing capability in place of a marketing team.</b></p>
              <p>That means outbound agent systems, with their websites connected to their growth desks. Two of the pieces, running:</p>

              <div className="fd-winrow">
                <div>
                  <div className="fd-holder">
                    <div className="ah-win ah-blueprint" data-w="940">
                      <div className="ah-frame-win">
                        <div className="ah-tl"><i /><i /><i /><span className="ah-t">Campaign Agent</span><span className="ah-live">running</span></div>
                        <div className="ah-panel"><div className="ah-bpw">
                          <div className="ah-bpbar">
                            <span className="ah-crumb">Workflows › <b>New-role outbound</b></span>
                            <span className="ah-bptabs"><span>Editor</span><span className="ah-on">Runs <span className="ah-cnt">13</span></span><span>Settings</span></span>
                            <span className="ah-rt"><span className="ah-livepill">Live</span><span className="ah-trig">▶ Trigger</span></span>
                          </div>
                          <div className="ah-bpmain">
                            <div className="ah-bpcanvas">
                              <svg viewBox="0 0 600 360" preserveAspectRatio="none">
                                <path className="ah-edge" d="M121,180 L155,180" />
                                <path className="ah-edge" d="M277,180 C355,180 300,101 323,101" />
                                <path className="ah-edge" d="M277,180 C355,180 300,259 323,259" />
                                <path className="ah-edge" d="M445,101 C500,101 500,180 467,180" />
                                <path className="ah-edge" d="M445,259 C500,259 500,180 467,180" />
                              </svg>
                              <div className="ah-bpnode ah-trig" style={{ left: "10%", top: "50%" }}><div className="ah-nh"><span className="ah-ic">◆</span><span className="ah-bpnm">New-role signal</span></div><div className="ah-st">trigger</div></div>
                              <div className="ah-bpnode" style={{ left: "36%", top: "50%" }}><div className="ah-nh"><span className="ah-ic">◱</span><span className="ah-bpnm">Enrich account</span></div><div className="ah-st">step</div></div>
                              <div className="ah-bpnode" style={{ left: "64%", top: "28%" }}><div className="ah-nh"><span className="ah-ic">▤</span><span className="ah-bpnm">Research brief</span></div><div className="ah-st">agent</div></div>
                              <div className="ah-bpnode" style={{ left: "64%", top: "72%" }}><div className="ah-nh"><span className="ah-ic">✎</span><span className="ah-bpnm">Draft outreach</span></div><div className="ah-st">agent</div></div>
                              <div className="ah-bpnode" style={{ left: "88%", top: "50%" }}><div className="ah-nh"><span className="ah-ic">➤</span><span className="ah-bpnm">Send + track</span></div><div className="ah-st">step</div></div>
                            </div>
                            <div className="ah-bppanel">
                              <div className="ah-ph">Run history</div>
                              <div className="ah-bprun ah-cur"><span className="ah-rs ah-on2">◐</span><span className="ah-rn">Run #13</span><span className="ah-rt2">Running</span></div>
                              <div className="ah-bprun"><span className="ah-rs ah-ok">✓</span><span className="ah-rn">Run #12</span><span className="ah-rt2">yesterday</span></div>
                              <div className="ah-bprun"><span className="ah-rs ah-ok">✓</span><span className="ah-rn">Run #11</span><span className="ah-rt2">3 days ago</span></div>
                              <div className="ah-bpov">
                                <div className="ah-lab">This week</div>
                                <div className="ah-bpgrid">
                                  <div className="ah-bpstat"><div className="ah-n">214</div><div className="ah-k">Contacted</div></div>
                                  <div className="ah-bpstat ah-g"><div className="ah-n">38</div><div className="ah-k">Replied</div></div>
                                  <div className="ah-bpstat ah-g"><div className="ah-n">9</div><div className="ah-k">Calls booked</div></div>
                                  <div className="ah-bpstat"><div className="ah-n">1</div><div className="ah-k">Running</div></div>
                                </div>
                                <div className="ah-bpcred"><span>credits used</span><span>214 / 5,000</span></div>
                                <div className="ah-bpbar2"><i /></div>
                              </div>
                            </div>
                          </div>
                        </div></div>
                      </div>
                    </div>
                  </div>
                  <div className="fd-wincap">The campaign agent, running a workflow end to end</div>
                </div>

                <div>
                  <div className="fd-holder">
                    <div className="ah-win ah-inbox" data-w="470">
                      <div className="ah-frame-win">
                        <div className="ah-tl"><i /><i /><i /><span className="ah-t">Outreach Agent</span><span className="ah-live">214 sent</span></div>
                        <div className="ah-panel"><div className="ah-ibx">
                          <div className="ah-list">
                            <div className="ah-tabs"><span className="ah-on">All</span><span>Unread<span className="ah-badge ah-unread">29</span></span><span>Fav</span></div>
                            <div className="ah-threads">
                              <div className="ah-th ah-sel"><span className="ah-av ah-a1">CH</span><div className="ah-mid"><div className="ah-nm">Claire Hughes</div><div className="ah-pv"><b>You:</b> noticed you just stepped in…</div></div><span className="ah-t">now</span></div>
                              <div className="ah-th"><span className="ah-av ah-a3">TR</span><div className="ah-mid"><div className="ah-nm">Tom Reilly</div><div className="ah-pv"><b>Tom:</b> yes, let&apos;s find a time</div></div><span className="ah-t">2m</span></div>
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
                            <div className="ah-stream" />
                          </div>
                        </div></div>
                      </div>
                    </div>
                  </div>
                  <div className="fd-wincap">The outreach agent, with the replies coming back</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PARADOX */}
      <section>
        <div className="fd-ct">
          <div className="fd-kick">The paradox</div>
          <h2 className="fd-fd-rv">Individual productivity only gets you so far</h2>
          <p className="fd-lede fd-rv">People say they are getting huge productivity from these tools, and clearly they can see value, because they are paying for them. But we are not seeing that come through in lots of companies. I think the reason is this. <b>Individual productivity only gets you so far. You need the entire team, otherwise a bottleneck just moves down the line.</b> So you have to rethink the whole process, the people and the policies with it.</p>
          <div className="fd-stats">
            <div className="fd-stat fd-rv">
              <div className="fd-n">88% / 6%</div>
              <div className="fd-t">use AI somewhere in the business, against the 6% who can point to a measurable financial result. One per cent describe themselves as mature.</div>
              <div className="fd-s">McKinsey, State of AI, 2025.</div>
            </div>
            <div className="fd-stat fd-rv">
              <div className="fd-n">95%</div>
              <div className="fd-t">of enterprise deployments could not show a measurable business impact. MIT put the cause in the fact that the tools never got built into real workflows, rather than in the quality of the models.</div>
              <div className="fd-s">MIT NANDA, The GenAI Divide, 2025. 300 deployments, around 150 interviews.</div>
            </div>
          </div>
          <p className="fd-p fd-rv">One more thing before you measure any of it. Plenty of the use is hidden. Slack found 48% of office workers hide it from their managers, KPMG put it at 57% across 47 countries, and Microsoft found 53% worried it made them look replaceable. If you are not explicit about the behaviours, people do not know whether they should say they are using AI. <b>It is kind of a weird place at the moment.</b> It matters for you because your usage numbers will read low where the use is real.</p>
        </div>
      </section>

      {/* WHAT I WOULD DO */}
      <section>
        <div className="fd-ct">
          <div className="fd-kick">What I would do</div>
          <h2 className="fd-fd-rv">Six things, roughly in this order</h2>
          <p className="fd-lede fd-rv">This is what I would do with you. The order matters. Start at the fourth one and you get a structure with nothing running through it.</p>
          <div className="fd-steps">
            {[
              ["01", "Map the fluency across the team", "Everybody placed on the scale above, without judgment attached to where they land. It takes about a fortnight and it is the measurement you said you are missing. It also tells you where the twenty new people would make the most difference."],
              ["02", "Pick two or three use cases, not twenty", "Judge them on three questions. Can we do this faster, and with less pain. Can we do it cheaper. Can we do more than we used to do, because there is always a rake of things people would love to do that sit on the backlist. Asher's approval chain on email fits all three."],
              ["03", "Take each one all the way through", "If you have deep expertise in a bit of your marketing, you can reduce that process to code and automate it. I would sit with whoever holds it, quiz them properly, build the first version with them in the room, then give it an owner, a review rule and a date the old way closes. I am not saying we take the person out. We take large chunks of the task off them."],
              ["04", "Put a builder in", "One of the last things I did at Miro was make half of a strategist's job building. He went round the other teams and asked what their pain points were, what they would love to hand over, what drives them crazy, then built things for them. Someone who knows the pain, with someone who can make things. I think every marketing function is going to have at least one builder."],
              ["05", "Get the leaders in the weeds", "You need top down and bottom up. You can talk about AI all day, but leaders have to be trying stuff, making stuff and failing in public. Line managers too. I think we will see fewer people whose job is only line managing, and more who are half individual contributor. At Miro this was not a disruption, it was just more work."],
              ["06", "Be explicit about the behaviours, and put a number on it", "You can use AI all you like, but you own the work. You cannot abdicate. Write that down, along with what people should say about it, so everyone knows where they stand. Then put a real number on it. At Miro I told the studio 8 to 9 months ahead that at renewal I would not be paying 20% of the contract for low skill work, and made bringing that cost down a KPI for everyone."],
            ].map(([n, h, p]) => (
              <div className="fd-step fd-rv" key={n}><div className="fd-n">{n}</div><div className="fd-h">{h}</div><p>{p}</p></div>
            ))}
          </div>
          <div className="fd-covers">
            <div className="fd-fd-rv">
              <div className="fd-k">Who does it</div>
              <p>I do the work myself rather than staffing it out, and I hand it over rather than stay. Where a build is useful I build it and hand that over too.</p>
            </div>
            <div className="fd-fd-rv">
              <div className="fd-k">What we would need from you</div>
              <p>A sponsor from the leadership team who will do the work in public, real time set aside for the builder and the champions, and agreement on which two or three use cases are worth closing the old route on.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IP AND COST */}
      <section>
        <div className="fd-ct">
          <div className="fd-kick">The thing you raised</div>
          <h2 className="fd-fd-rv">Where the IP ends up, and what it costs to run</h2>
          <p className="fd-lede fd-rv">You called this the new unanswerable question, the one the less technical and more risk averse people love to ask. I think it can be answered, and it is better answered in writing before it comes up in a room.</p>
          <p className="fd-p fd-rv">On the data and the IP, the answer is in the contract rather than in anyone&apos;s opinion. The business terms from the main providers say what is kept, for how long, and whether any of it is used for training, and they differ from the consumer ones. So the first job is working out which tier each thing in your business is running on. The bigger exposure is usually not the sanctioned tool at all. Microsoft found 78% of people bringing their own tools to work, and IBM found a fifth of organisations had a breach involving one of those, adding about $670,000 to the cost, with 97% of them having no access controls in place. That is the same problem as the hidden usage, seen from the other side.</p>
          <p className="fd-p fd-rv">On cost, IT and marketing and sales keep growing the demand and nobody knows where the money is going or how efficient any of it is. A lot of routine work runs on the most capable model going, because that is the default, not because the job needs it. One of my clients does nothing but measure this, and he is better on it than I am. Happy to introduce you.</p>
          <p className="fd-p fd-rv">Before I said anything more specific I would want to know what you are running. What is sanctioned, what tier it is on, what compliance has already ruled on, and what people are doing anyway.</p>
        </div>
      </section>

      {/* CLOSE */}
      <section>
        <div className="fd-ct">
          <div className="fd-kick">Next</div>
          <h2 className="fd-fd-rv">A sensible first piece of work</h2>
          <p className="fd-lede fd-rv">This is not a proposal. We have not talked about scope or budget, so I am not going to put a shape on either. If it is worth carrying on, the first piece of work is small.</p>
          <p className="fd-p fd-rv"><b>Map the fluency across the team and pick the first two use cases.</b> A few weeks, done with your people. You get a real picture of where the hundred and twenty sit, two named jobs of work with starting numbers taken before anything changes, and a view on which of the twenty roles should be shaped differently. That last bit is worth having before you hire.</p>
          <p className="fd-p fd-rv">If it is easier to talk it through first, or for me to walk Asher through how one of these gets built, that is no bother.</p>
          <div className="fd-cta fd-rv">
            <div className="fd-t">Book a time to chat</div>
            <div className="fd-ctar">
              <a className="fd-ctab" href="https://cal.com/paul-dervan-mjfd50" target="_blank" rel="noopener">Book time with Paul →</a>
              <span>or email me, <a href="mailto:paul@runwithfoxes.com?subject=Fidelity%20Canada">paul@runwithfoxes.com</a></span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="fd-ct">
          <div className="fd-fb">/<span>Run</span>withfoxes</div>
          <div className="fd-fm">Private · unlisted · runwithfoxes.com/proposals/fidelity</div>
        </div>
      </footer>
    </div>
  );
}
