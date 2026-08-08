"use client";

// The four things figure, in the course blueprint language (modelled on
// bp-02's card anatomy, lay-down animation and dashed standing wiring, per
// Paul's reference). One row of four cards, the four things we do, names
// verb-led, laid down in sequence. Out of Building agents falls a fan of
// small cards naming agents we actually build, on separate ports per the
// blueprint spec. 5s, loops, reduced motion shows the finished state.
//
// Order matches the rail: Redesigning first (the most important), then
// training, building, designing adoption.

import styles from "./Figure.module.css";

const CSS = `
#ppfour .q-frame{fill:#EDEEF1;stroke:rgba(20,20,30,.10);stroke-width:1}
#ppfour .q-panel{fill:#FFFFFF;stroke:rgba(20,20,30,.07);stroke-width:1}
#ppfour .q-icon{fill:#EEF1F4}
#ppfour .q-wire{fill:none;stroke:#8A8A85;stroke-width:1.5;vector-effect:non-scaling-stroke}
#ppfour .q-opt{font-family:var(--mono,'JetBrains Mono',monospace);font-size:13px;fill:#1D1B1B}
#ppfour .q-lbl{font-family:var(--mono,'JetBrains Mono',monospace);font-size:11px;fill:#8A8A85}
#ppfour .q-mini{font-family:var(--mono,'JetBrains Mono',monospace);font-size:11.5px;fill:#1D1B1B;text-anchor:middle}
#ppfour .q-lead{stroke:#3A7CA5;stroke-width:2;fill:none;stroke-linecap:round}
#ppfour .q-dash{stroke-dasharray:6 5}
#ppfour .q-focus{fill:#3A7CA5}
@keyframes q4-c0{0%,2%{opacity:0}10%,100%{opacity:1}}
@keyframes q4-c1{0%,10%{opacity:0}18%,100%{opacity:1}}
@keyframes q4-c2{0%,18%{opacity:0}26%,100%{opacity:1}}
@keyframes q4-c3{0%,26%{opacity:0}34%,100%{opacity:1}}
@keyframes q4-d0{0%,36%{transform:translateY(-96px)}48%,100%{transform:translateY(0)}}
@keyframes q4-d1{0%,40%{transform:translateY(-96px)}52%,100%{transform:translateY(0)}}
@keyframes q4-d2{0%,44%{transform:translateY(-96px)}56%,100%{transform:translateY(0)}}
@keyframes q4-d3{0%,48%{transform:translateY(-96px)}60%,100%{transform:translateY(0)}}
@keyframes q4-m0{0%,44%{opacity:0}52%,100%{opacity:1}}
@keyframes q4-m1{0%,48%{opacity:0}56%,100%{opacity:1}}
@keyframes q4-m2{0%,52%{opacity:0}60%,100%{opacity:1}}
@keyframes q4-m3{0%,56%{opacity:0}64%,100%{opacity:1}}
#ppfour .q-a-c0{opacity:0;animation:q4-c0 6s ease-out infinite}
#ppfour .q-a-c1{opacity:0;animation:q4-c1 6s ease-out infinite}
#ppfour .q-a-c2{opacity:0;animation:q4-c2 6s ease-out infinite}
#ppfour .q-a-c3{opacity:0;animation:q4-c3 6s ease-out infinite}
#ppfour .q-a-d0{animation:q4-d0 6s cubic-bezier(.4,0,.2,1) infinite}
#ppfour .q-a-d1{animation:q4-d1 6s cubic-bezier(.4,0,.2,1) infinite}
#ppfour .q-a-d2{animation:q4-d2 6s cubic-bezier(.4,0,.2,1) infinite}
#ppfour .q-a-d3{animation:q4-d3 6s cubic-bezier(.4,0,.2,1) infinite}
#ppfour .q-a-m0{opacity:0;animation:q4-m0 6s ease-out infinite}
#ppfour .q-a-m1{opacity:0;animation:q4-m1 6s ease-out infinite}
#ppfour .q-a-m2{opacity:0;animation:q4-m2 6s ease-out infinite}
#ppfour .q-a-m3{opacity:0;animation:q4-m3 6s ease-out infinite}
@media (prefers-reduced-motion: reduce){
  #ppfour [class^="q-a-"]{animation:none !important;opacity:1 !important;transform:translateY(0) !important}
}`;

// Row 1 card geometry: four cards, 164 wide, 56 tall, y=36
const CARDS = [
  { x: 12, name: "Redesigning", lbl: "how teams work", icon: "flow" },
  { x: 190, name: "Training", lbl: "teams", icon: "book" },
  { x: 368, name: "Building", lbl: "agents", icon: "chev" },
  { x: 546, name: "Designing", lbl: "AI adoption", icon: "steps" },
];

// Mini agent cards: 132 wide, 38 tall, y=224, fanned from Building's ports
const MINIS = [
  { x: 122, name: "Writer" },
  { x: 268, name: "Creative Director" },
  { x: 414, name: "Brand Guardian" },
  { x: 560, name: "Outreach Agent" },
];

// Separate ports along Building agents' bottom edge (368..532), per spec
const PORTS = [396, 432, 468, 504];

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
    default:
      return null;
  }
}

export default function FourThingsFigure() {
  return (
    <div id="ppfour" className={styles.ppfigurePlate}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <svg
        viewBox="0 0 720 290"
        role="img"
        aria-label="Four cards in a row naming the four things Run with Foxes does, and below the Building agents card, four smaller cards naming agents, each joined by a dashed line"
      >
        <defs>
          <filter id="ppfoursh" x="-14%" y="-14%" width="128%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#1A3A4E" floodOpacity="0.06" />
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#1A3A4E" floodOpacity="0.11" />
          </filter>
        </defs>

        {CARDS.map((c, i) => (
          <g key={c.name} className={`q-a-c${i}`}>
            <rect className="q-frame" x={c.x} y={36} width={164} height={56} rx={15} filter="url(#ppfoursh)" />
            <rect className="q-panel" x={c.x + 8} y={44} width={148} height={40} rx={9} />
            <rect className="q-icon" x={c.x + 18} y={53} width={22} height={22} rx={5} />
            <g transform={`translate(${c.x + 18},${53})`}>
              <Icon kind={c.icon} />
            </g>
            <text className="q-opt" x={c.x + 50} y={64}>{c.name}</text>
            <text className="q-lbl" x={c.x + 50} y={78}>{c.lbl}</text>
          </g>
        ))}

        {MINIS.map((m, i) => {
          const mid = m.x + 66;
          const port = PORTS[i];
          return (
            <g key={m.name}>
              <clipPath id={`ppfourclip${i}`}>
                <rect x={Math.min(port, mid) - 12} y={92} width={Math.abs(mid - port) + 24} height={132} />
              </clipPath>
              <g clipPath={`url(#ppfourclip${i})`}>
                <g className={`q-a-d${i}`}>
                  <path
                    className="q-lead q-dash"
                    d={`M${port} 92 C ${port} 158, ${mid} 158, ${mid} 202`}
                  />
                  <path className="q-focus" d={`M${mid} 215 L${mid - 7} 202 L${mid + 7} 202 Z`} />
                </g>
              </g>
              <g className={`q-a-m${i}`}>
                <rect className="q-frame" x={m.x} y={224} width={132} height={38} rx={12} filter="url(#ppfoursh)" />
                <rect className="q-panel" x={m.x + 6} y={230} width={120} height={26} rx={7} />
                <text className="q-mini" x={mid} y={247}>{m.name}</text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
