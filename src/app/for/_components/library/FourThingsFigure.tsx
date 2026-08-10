"use client";

// The what-we-do figure, v2 per Paul: "Redesigning how teams work" is the
// overarching card on top, and the four things fall out of it on dashed
// standing wiring. No agent minis. Geometry, card anatomy, shadow, radii,
// fonts, lead and arrowhead shapes are taken from bp-02's markup in
// course-figures.html, not re-derived: top card 190x58 rx15 with 8px panel
// inset rx9, lower cards 150x46, icon 22x22 rx5, f-opt 13px / f-lbl 11px
// mono, three-layer drop shadow, dashed sky leads with 13x14 arrowheads,
// falls through clips. 6s, loops, reduced-motion static. No display type,
// per Paul's font correction on the page.

import styles from "./Figure.module.css";

const CSS = `
#ppfour .q-frame{fill:#EDEEF1;stroke:rgba(20,20,30,.10);stroke-width:1}
#ppfour .q-panel{fill:#FFFFFF;stroke:rgba(20,20,30,.07);stroke-width:1}
#ppfour .q-icon{fill:#EEF1F4}
#ppfour .q-wire{fill:none;stroke:#8A8A85;stroke-width:1.5;vector-effect:non-scaling-stroke}
#ppfour .q-opt{font-family:var(--mono,'JetBrains Mono',monospace);font-size:13px;fill:#1D1B1B}
#ppfour .q-lbl{font-family:var(--mono,'JetBrains Mono',monospace);font-size:11px;fill:#8A8A85}
#ppfour .q-lead{stroke:#3A7CA5;stroke-width:2;fill:none;stroke-linecap:round}
#ppfour .q-dash{stroke-dasharray:6 5}
#ppfour .q-focus{fill:#3A7CA5}
@keyframes q4-top{0%,2%{opacity:0}10%,100%{opacity:1}}
@keyframes q4-d0{0%,14%{transform:translateY(-100px)}26%,100%{transform:translateY(0)}}
@keyframes q4-d1{0%,18%{transform:translateY(-100px)}30%,100%{transform:translateY(0)}}
@keyframes q4-d2{0%,22%{transform:translateY(-100px)}34%,100%{transform:translateY(0)}}
@keyframes q4-d3{0%,26%{transform:translateY(-100px)}38%,100%{transform:translateY(0)}}
@keyframes q4-c0{0%,24%{opacity:0}32%,100%{opacity:1}}
@keyframes q4-c1{0%,28%{opacity:0}36%,100%{opacity:1}}
@keyframes q4-c2{0%,32%{opacity:0}40%,100%{opacity:1}}
@keyframes q4-c3{0%,36%{opacity:0}44%,100%{opacity:1}}
#ppfour .q-a-top{opacity:0;animation:q4-top 6s ease-out infinite}
#ppfour .q-a-d0{animation:q4-d0 6s cubic-bezier(.4,0,.2,1) infinite}
#ppfour .q-a-d1{animation:q4-d1 6s cubic-bezier(.4,0,.2,1) infinite}
#ppfour .q-a-d2{animation:q4-d2 6s cubic-bezier(.4,0,.2,1) infinite}
#ppfour .q-a-d3{animation:q4-d3 6s cubic-bezier(.4,0,.2,1) infinite}
#ppfour .q-a-c0{opacity:0;animation:q4-c0 6s ease-out infinite}
#ppfour .q-a-c1{opacity:0;animation:q4-c1 6s ease-out infinite}
#ppfour .q-a-c2{opacity:0;animation:q4-c2 6s ease-out infinite}
#ppfour .q-a-c3{opacity:0;animation:q4-c3 6s ease-out infinite}
@media (prefers-reduced-motion: reduce){
  #ppfour [class^="q-a-"]{animation:none !important;opacity:1 !important;transform:translateY(0) !important}
}`;

// Lower row: 150x46 cards (bp-02 bottom-row anatomy), y=170
const THINGS = [
  { x: 16, name: "Redesigning", lbl: "workflows", icon: "loop" },
  { x: 196, name: "Training", lbl: "teams", icon: "book" },
  { x: 376, name: "Building", lbl: "agents", icon: "chev" },
  { x: 556, name: "Designing", lbl: "AI adoption", icon: "steps" },
];

// Separate ports along the top card's bottom edge (card spans 265..455)
const PORTS = [292, 340, 388, 436];

function Icon({ kind }: { kind: string }) {
  switch (kind) {
    case "flow":
      return (
        <>
          <rect className="q-wire" x={3} y={4} width={7} height={6} />
          <rect className="q-wire" x={12} y={12} width={7} height={6} />
          <path className="q-wire" d="M10 7 L15 7 L15 12" />
        </>
      );
    case "book":
      return (
        <path
          className="q-wire"
          d="M11 4 C 8 2, 4 2, 3 4 L3 17 C 4 15, 8 15, 11 17 C 14 15, 18 15, 19 17 L19 4 C 18 2, 14 2, 11 4 M11 4 L11 17"
        />
      );
    case "chev":
      return (
        <>
          <path className="q-wire" d="M8 5 L4 11 L8 17" />
          <path className="q-wire" d="M14 5 L18 11 L14 17" />
        </>
      );
    case "steps":
      return (
        <>
          <rect className="q-wire" x={3} y={13} width={4} height={5} />
          <rect className="q-wire" x={9} y={9} width={4} height={9} />
          <rect className="q-wire" x={15} y={4} width={4} height={14} />
        </>
      );
    case "loop":
      return (
        <>
          <path className="q-wire" d="M17 11 A6 6 0 1 1 11 5" />
          <path className="q-wire" d="M17 6 L17 11 L12 11" />
        </>
      );
    default:
      return null;
  }
}

export default function FourThingsFigure() {
  return (
    <div id="ppfour" className={styles.ppfigurePlate}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <svg
        viewBox="0 0 720 240"
        role="img"
        aria-label="One card on top, Redesigning how teams work, joined by dashed lines to four cards below: Redesigning workflows, Training teams, Building agents, Designing AI adoption"
      >
        <defs>
          <filter id="ppfoursh" x="-14%" y="-14%" width="128%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#1A3A4E" floodOpacity="0.06" />
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#1A3A4E" floodOpacity="0.11" />
            <feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#1A3A4E" floodOpacity="0.08" />
          </filter>
        </defs>

        <g className="q-a-top">
          <rect className="q-frame" x={265} y={24} width={190} height={58} rx={15} filter="url(#ppfoursh)" />
          <rect className="q-panel" x={273} y={32} width={174} height={42} rx={9} />
          <rect className="q-icon" x={285} y={42} width={22} height={22} rx={5} />
          <g transform="translate(285,42)">
            <Icon kind="flow" />
          </g>
          <text className="q-opt" x={319} y={52}>Redesigning</text>
          <text className="q-lbl" x={319} y={66}>how teams work</text>
        </g>

        {THINGS.map((c, i) => {
          const mid = c.x + 75;
          const port = PORTS[i];
          return (
            <g key={c.name}>
              <clipPath id={`ppfourclip${i}`}>
                <rect x={Math.min(port, mid) - 12} y={82} width={Math.abs(mid - port) + 24} height={88} />
              </clipPath>
              <g clipPath={`url(#ppfourclip${i})`}>
                <g className={`q-a-d${i}`}>
                  <path className="q-lead q-dash" d={`M${port} 82 C ${port} 122, ${mid} 118, ${mid} 146`} />
                  <path className="q-focus" d={`M${mid} 159 L${mid - 7} 146 L${mid + 7} 146 Z`} />
                </g>
              </g>
              <g className={`q-a-c${i}`}>
                <rect className="q-frame" x={c.x} y={170} width={150} height={46} rx={15} filter="url(#ppfoursh)" />
                <rect className="q-panel" x={c.x + 8} y={178} width={134} height={30} rx={9} />
                <rect className="q-icon" x={c.x + 20} y={182} width={22} height={22} rx={5} />
                <g transform={`translate(${c.x + 20},${182})`}>
                  <Icon kind={c.icon} />
                </g>
                <text className="q-opt" x={c.x + 54} y={192}>{c.name}</text>
                <text className="q-lbl" x={c.x + 54} y={206}>{c.lbl}</text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
