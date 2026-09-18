"use client";

// The four-things figure's anatomy, parametrised so any agent can wear it:
// one card on top, children falling out of it on dashed leads. Same bp-02
// geometry, shadow, radii and mono register as FourThingsFigure, which Paul
// approved; only the words and the child count change. Used for Ghostwriter
// (one point of view, four formats), Lifecycle (four moments) and Search
// (four places to be found).

import styles from "./Figure.module.css";

export type CascadeCard = { name: string; lbl: string; icon: string };

const W = 720;
const CARD_W = 150;
const TOP_Y = 24;
const KID_Y = 170;

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
    case "pen":
      return (
        <>
          <path className="q-wire" d="M4 17 L6 11 L14 3 L18 7 L10 15 Z" />
          <path className="q-wire" d="M4 17 L8 16" />
        </>
      );
    case "mail":
      return (
        <>
          <rect className="q-wire" x={3} y={5} width={16} height={12} />
          <path className="q-wire" d="M3 6 L11 12 L19 6" />
        </>
      );
    case "search":
      return (
        <>
          <circle className="q-wire" cx={9} cy={9} r={5} fill="none" />
          <path className="q-wire" d="M13 13 L18 18" />
        </>
      );
    case "chart":
      return (
        <>
          <path className="q-wire" d="M3 18 L19 18" />
          <path className="q-wire" d="M5 14 L9 9 L12 12 L17 5" />
        </>
      );
    case "person":
      return (
        <>
          <circle className="q-wire" cx={11} cy={7} r={3.5} fill="none" />
          <path className="q-wire" d="M4 18 C 5 13, 17 13, 18 18" />
        </>
      );
    default:
      return null;
  }
}

export default function CardCascade({
  id,
  top,
  kids,
  ariaLabel,
}: {
  /** Unique per instance, scopes the animation CSS. */
  id: string;
  top: CascadeCard;
  kids: CascadeCard[];
  ariaLabel: string;
}) {
  const n = kids.length;
  const gap = (W - 32 - n * CARD_W) / (n - 1);
  const xs = kids.map((_, i) => 16 + i * (CARD_W + gap));
  // Ports spread along the top card's bottom edge
  const ports = kids.map((_, i) => 292 + (i * 144) / Math.max(1, n - 1));

  const css = `
#${id} .q-frame{fill:#EDEEF1;stroke:rgba(20,20,30,.10);stroke-width:1}
#${id} .q-panel{fill:#FFFFFF;stroke:rgba(20,20,30,.07);stroke-width:1}
#${id} .q-icon{fill:#EEF1F4}
#${id} .q-wire{fill:none;stroke:#8A8A85;stroke-width:1.5;vector-effect:non-scaling-stroke}
#${id} .q-opt{font-family:var(--mono,'JetBrains Mono',monospace);font-size:13px;fill:#1D1B1B}
#${id} .q-lbl{font-family:var(--mono,'JetBrains Mono',monospace);font-size:11px;fill:#8A8A85}
#${id} .q-lead{stroke:#3A7CA5;stroke-width:2;fill:none;stroke-linecap:round}
#${id} .q-dash{stroke-dasharray:6 5}
#${id} .q-focus{fill:#3A7CA5}
@keyframes ${id}-top{0%,2%{opacity:0}10%,100%{opacity:1}}
${kids
  .map(
    (_, i) => `
@keyframes ${id}-d${i}{0%,${14 + i * 4}%{transform:translateY(-100px)}${26 + i * 4}%,100%{transform:translateY(0)}}
@keyframes ${id}-c${i}{0%,${24 + i * 4}%{opacity:0}${32 + i * 4}%,100%{opacity:1}}`
  )
  .join("")}
#${id} .q-a-top{animation:${id}-top 6s ease-out infinite}
${kids
  .map(
    (_, i) => `
#${id} .q-a-d${i}{animation:${id}-d${i} 6s cubic-bezier(.25,.6,.3,1) infinite}
#${id} .q-a-c${i}{animation:${id}-c${i} 6s ease-out infinite}`
  )
  .join("")}
@media (prefers-reduced-motion: reduce){
  #${id} [class^="q-a-"]{animation:none !important;opacity:1 !important;transform:translateY(0) !important}
}
`;

  return (
    <div id={id} className={styles.ppfigurePlate}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg viewBox={`0 0 ${W} 240`} role="img" aria-label={ariaLabel}>
        <defs>
          <filter id={`${id}sh`} x="-14%" y="-14%" width="128%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="#1A3A4E" floodOpacity="0.06" />
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#1A3A4E" floodOpacity="0.11" />
            <feDropShadow dx="0" dy="14" stdDeviation="13" floodColor="#1A3A4E" floodOpacity="0.08" />
          </filter>
        </defs>

        <g className="q-a-top">
          <rect className="q-frame" x={265} y={TOP_Y} width={190} height={58} rx={15} filter={`url(#${id}sh)`} />
          <rect className="q-panel" x={273} y={TOP_Y + 8} width={174} height={42} rx={9} />
          <rect className="q-icon" x={285} y={TOP_Y + 18} width={22} height={22} rx={5} />
          <g transform={`translate(285,${TOP_Y + 18})`}>
            <Icon kind={top.icon} />
          </g>
          <text className="q-opt" x={319} y={TOP_Y + 28}>{top.name}</text>
          <text className="q-lbl" x={319} y={TOP_Y + 42}>{top.lbl}</text>
        </g>

        {kids.map((c, i) => {
          const mid = xs[i] + CARD_W / 2;
          const port = ports[i];
          return (
            <g key={c.name + i}>
              <clipPath id={`${id}clip${i}`}>
                <rect x={Math.min(port, mid) - 12} y={82} width={Math.abs(mid - port) + 24} height={88} />
              </clipPath>
              <g clipPath={`url(#${id}clip${i})`}>
                <g className={`q-a-d${i}`}>
                  <path className="q-lead q-dash" d={`M${port} 82 C ${port} 122, ${mid} 118, ${mid} 146`} />
                  <path className="q-focus" d={`M${mid} 159 L${mid - 7} 146 L${mid + 7} 146 Z`} />
                </g>
              </g>
              <g className={`q-a-c${i}`}>
                <rect className="q-frame" x={xs[i]} y={KID_Y} width={CARD_W} height={46} rx={15} filter={`url(#${id}sh)`} />
                <rect className="q-panel" x={xs[i] + 8} y={KID_Y + 8} width={CARD_W - 16} height={30} rx={9} />
                <rect className="q-icon" x={xs[i] + 20} y={KID_Y + 12} width={22} height={22} rx={5} />
                <g transform={`translate(${xs[i] + 20},${KID_Y + 12})`}>
                  <Icon kind={c.icon} />
                </g>
                <text className="q-opt" x={xs[i] + 54} y={KID_Y + 22}>{c.name}</text>
                <text className="q-lbl" x={xs[i] + 54} y={KID_Y + 36}>{c.lbl}</text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
