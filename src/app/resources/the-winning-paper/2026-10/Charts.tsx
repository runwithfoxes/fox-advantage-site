"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import CH from "./charts.json";
import r from "../../the-ai-ask/2026-q3/report.module.css";
import w from "./paper.module.css";

/**
 * The Winning Paper's figures. Sam's page draws six paired bar charts; here each one is drawn for
 * the point its title makes, in the AI Ask's language (module windows, the site's blues, one thing
 * that answers when you touch it, nothing moving until it is on screen):
 *   1.1 and 2.1  the same gap rule twice, so the reader sees two dots sitting together in
 *                chapter 1 and pulled apart in chapter 2
 *   3.1          two lines from the diagnosis to the result: one holds, one falls
 *   4.1          who does it more, either side of a centre line
 *   4.2          how the share falls away as the years asked for go up
 *   5.1          columns in pairs, with the one nought marked
 *   6.1          Sam's table, and the published weights drawn as a bar
 * A chart this file does not know by id falls back to plain paired bars, so a new figure in a
 * later draft still draws. charts.json is written by scripts/resources/winning-paper-copy.py from
 * Sam's page (the values from its CHARTS list, the counts from his captions) and is the only data
 * this client file imports.
 */
const SKY = "#3A7CA5";
const MUTED = "#8A8A85";
const PALE = "#A9CBE4";
const ORANGE = "#F47521";
const COLS = [SKY, MUTED];
const EASE = "cubic-bezier(.22,1,.36,1)";

type Series = { label: string; data: number[]; k?: number[]; n?: number };
type PairChart = { type: "pair"; labels: string[]; series: Series[]; max: number };
type TableChart = { type: "table"; head: string[]; rows: string[][] };
const ALL = CH as unknown as Record<string, PairChart | TableChart>;

/** Starts drawing when the figure comes on screen, once. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setSeen(true);
    const io = new IntersectionObserver((es) => es[0].isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/** The width the figure really has, so type in a drawing stays its own size on a phone. */
function useWidth(ref: React.RefObject<HTMLDivElement | null>, start = 640) {
  const [W, setW] = useState(start);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(Math.max(260, Math.round(el.clientWidth))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return W;
}

/** The module window, as on the AI Ask and the Ad Audit. */
export function FigWin({ id, kind, n, title, cap, children }: { id: string; kind: string; n: string; title: string; cap: string; children: ReactNode }) {
  return (
    <figure className={`mod-win ${r.fig}`} id={id}>
      <div className="mod-winbar">
        <span className="mod-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="mod-wintitle">{`${kind.toLowerCase()}_${n.replace(".", "_")}`}</span>
      </div>
      <div className={r.figBody}>
        <figcaption className={r.figTitle}>
          <span className={r.figN}>
            {kind} {n}
          </span>
          {title}
        </figcaption>
        {children}
        {cap ? <p className={r.figCap}>{cap}</p> : null}
      </div>
    </figure>
  );
}

function Key({ c, ring }: { c: PairChart; ring?: boolean }) {
  return (
    <div className={r.pairKey}>
      {c.series.map((s, j) => (
        <span key={s.label}>
          <i style={ring && j === 1 ? { background: "#fff", boxShadow: `inset 0 0 0 2px ${MUTED}`, borderRadius: "50%" } : { background: COLS[j], borderRadius: ring ? "50%" : 0 }} /> {s.label}
        </span>
      ))}
    </div>
  );
}

/** The line under a figure: says what to do until a row is touched, then gives that row's counts. */
function Readout({ c, at, idle }: { c: PairChart; at: number | null; idle: string }) {
  return (
    <div className={`${r.readout} ${w.read}`} aria-live="polite">
      {at === null ? (
        <span>{idle}</span>
      ) : (
        <>
          <b>{c.labels[at]}</b>
          {c.series.map((s, j) => (
            <span key={s.label}>
              <i style={{ background: COLS[j] }} /> {s.label} {s.k && s.n ? `${s.k[at]} of ${s.n} (${s.data[at]}%)` : `${s.data[at]}%`}
            </span>
          ))}
        </>
      )}
    </div>
  );
}

const signed = (d: number) => (d > 0 ? `+${d}` : d < 0 ? `−${Math.abs(d)}` : "0");

/* ── 1.1 and 2.1: two dots on one rule, the space between them filled. Where both groups do a
   thing the dots sit together; where awarded papers do it more the fill is the finding. ── */
function Gap({ c, alt }: { c: PairChart; alt: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [at, setAt] = useState<number | null>(null);
  const [A, B] = c.series;
  return (
    <div ref={ref} role="img" aria-label={alt} onMouseLeave={() => setAt(null)}>
      <Key c={c} ring />
      <div className={w.gap}>
        <div className={`${w.gRow} ${w.gAxis}`} aria-hidden>
          <span />
          <span className={w.gScale}>
            {[0, 25, 50, 75, 100].map((v) => (
              <em key={v} style={{ left: `${v}%` }}>
                {v === 100 ? "100%" : v}
              </em>
            ))}
          </span>
          <span className={w.gHead}>gap</span>
        </div>
        {c.labels.map((l, i) => {
          const a = A.data[i], b = B.data[i], d = a - b;
          return (
            <div key={i} className={`${w.gRow} ${at === i ? w.hot : ""}`} onMouseEnter={() => setAt(i)} onClick={() => setAt(i)}>
              <span className={w.lab}>{l}</span>
              <span className={w.gTrack}>
                <i className={w.gFill} style={{ left: `${Math.min(a, b)}%`, width: seen ? `${Math.abs(d)}%` : 0, background: d >= 0 ? SKY : MUTED, transitionDelay: `${500 + i * 60}ms` }} />
                <i className={`${w.gDot} ${w.gRing}`} style={{ left: seen ? `${b}%` : 0, transitionDelay: `${i * 60}ms` }} />
                <i className={w.gDot} style={{ left: seen ? `${a}%` : 0, background: SKY, transitionDelay: `${i * 60 + 40}ms` }} />
              </span>
              <span className={w.gVal} style={{ color: Math.abs(d) >= 10 ? SKY : MUTED }}>
                <b>{signed(d)}</b> pts
              </span>
            </div>
          );
        })}
      </div>
      <Readout c={c} at={at} idle="Touch a row for the counts." />
    </div>
  );
}

/* ── 3.1: from the diagnosis to the result. Both lines start together; one stays up. ── */
function Slope({ c, alt }: { c: PairChart; alt: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [at, setAt] = useState<number | null>(null);
  const W = useWidth(ref);
  const narrow = W < 480;
  const H = narrow ? 220 : 240, L = 44, R = narrow ? 112 : 150, T = 24, B = 22;
  const all = c.series.flatMap((s) => s.data);
  const lo = Math.max(0, Math.floor((Math.min(...all) - 10) / 10) * 10);
  const x = (i: number) => (i === 0 ? L + 34 : W - R);
  const y = (v: number) => T + (1 - (v - lo) / (100 - lo)) * (H - T - B);
  const ticks = Array.from({ length: (100 - lo) / 10 + 1 }, (_, k) => lo + k * 10);
  // the higher of two close labels sits above its dot, the lower one below
  const off = (i: number, j: number) => (c.series[j].data[i] >= c.series[1 - j].data[i] ? -10 : 18);
  return (
    <div ref={ref} role="img" aria-label={alt} onMouseLeave={() => setAt(null)}>
      <div className={w.slopeHeads}>
        {c.labels.map((l, i) => (
          <button key={i} type="button" className={`${w.slopeHead} ${at === i ? w.slopeOn : ""}`} style={i ? { textAlign: "right", marginRight: narrow ? 0 : R - 10 } : { marginLeft: narrow ? 0 : L }} onMouseEnter={() => setAt(i)} onFocus={() => setAt(i)} onClick={() => setAt(i)}>
            <span>{i === 0 ? "First" : "Then"}</span>
            {l}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className={w.svg}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R + 14} y1={y(t)} y2={y(t)} stroke="#EDEDE9" />
            <text x={L - 8} y={y(t) + 3.5} textAnchor="end" className={w.ax}>
              {t}%
            </text>
          </g>
        ))}
        {c.series.map((s, j) => (
          <g key={s.label}>
            <line x1={x(0)} y1={y(s.data[0])} x2={seen ? x(1) : x(0)} y2={seen ? y(s.data[1]) : y(s.data[0])} stroke={COLS[j]} strokeWidth={j === 0 ? 3 : 2} strokeDasharray={j === 1 ? "5 5" : undefined} style={{ transition: `all 1s ${EASE}`, transitionDelay: `${j * 250}ms` }} />
            <circle cx={x(0)} cy={y(s.data[0])} r={at === 0 ? 7 : 5} fill={COLS[j]} stroke="#fff" strokeWidth={2} />
            <text x={x(0) - 10} y={y(s.data[0]) + (off(0, j) < 0 ? -8 : 16)} textAnchor="end" className={w.pt} fill={COLS[j]}>
              {s.data[0]}%
            </text>
            <g style={{ opacity: seen ? 1 : 0, transition: "opacity .4s", transitionDelay: `${800 + j * 250}ms` }}>
              <circle cx={x(1)} cy={y(s.data[1])} r={at === 1 ? 7 : 5} fill={COLS[j]} stroke="#fff" strokeWidth={2} />
              <text x={x(1) + 12} y={y(s.data[1]) + 4} className={w.end} fill={COLS[j]}>
                <tspan className={w.endV}>{s.data[1]}%</tspan>
                <tspan dx={6}>{s.label}</tspan>
              </text>
            </g>
          </g>
        ))}
      </svg>
      <Readout c={c} at={at} idle="Touch either step for the counts." />
    </div>
  );
}

/* ── 4.1: who does it more. A bar to the right is a thing awarded papers do more often, a bar to
   the left is one the other papers do more often. Both shares stay printed on every row. ── */
function Diverge({ c, alt }: { c: PairChart; alt: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [at, setAt] = useState<number | null>(null);
  const [A, B] = c.series;
  const diffs = A.data.map((a, i) => a - B.data[i]);
  const span = Math.max(10, Math.ceil(Math.max(...diffs.map(Math.abs)) / 10) * 10);
  return (
    <div ref={ref} role="img" aria-label={alt} onMouseLeave={() => setAt(null)}>
      <div className={w.div}>
        <div className={`${w.dRow} ${w.dAxis}`} aria-hidden>
          <span />
          <span className={w.dSides}>
            <em>&larr; more often in papers {B.label.toLowerCase()}</em>
            <em style={{ color: SKY }}>more often in {A.label.toLowerCase()} papers &rarr;</em>
          </span>
          <span className={w.dShares}>
            <em style={{ color: SKY }}>{A.label}</em>
            <em>{B.label}</em>
          </span>
        </div>
        {c.labels.map((l, i) => {
          const d = diffs[i];
          const wd = `${(Math.abs(d) / span) * 50}%`;
          return (
            <div key={i} className={`${w.dRow} ${at === i ? w.hot : ""}`} onMouseEnter={() => setAt(i)} onClick={() => setAt(i)}>
              <span className={w.lab}>{l}</span>
              <span className={w.dTrack}>
                <i style={{ ...(d >= 0 ? { left: "50%" } : { right: "50%" }), width: seen ? wd : 0, background: d >= 0 ? SKY : MUTED, transitionDelay: `${i * 70}ms` }} />
                <b style={d >= 0 ? { left: `calc(50% + ${wd} + 8px)`, color: SKY } : { right: `calc(50% + ${wd} + 8px)`, color: "#6b6b66" }} className={seen ? w.dOn : ""}>
                  {signed(d)}
                </b>
              </span>
              <span className={w.dShares}>
                <b style={{ color: SKY }}>{A.data[i]}%</b>
                <b>{B.data[i]}%</b>
              </span>
            </div>
          );
        })}
      </div>
      <Readout c={c} at={at} idle="The number on each bar is the gap in points. Touch a row for the counts." />
    </div>
  );
}

const YEARS: Record<string, number> = { a: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
const yearsOf = (l: string) => YEARS[l.trim().split(/\s+/)[0].toLowerCase()] ?? Number.parseFloat(l);

/* ── 4.2: how the share falls as the length asked for goes up. The years sit where they fall on a
   real scale, so the step from three years to five is twice as wide as the others. ── */
function Falloff({ c, alt, yrs }: { c: PairChart; alt: string; yrs: number[] }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [at, setAt] = useState<number | null>(null);
  const W = useWidth(ref);
  const H = W < 480 ? 230 : 260, L = 40, R = 22, T = 26, B = 34;
  const top = Math.ceil(Math.max(...c.series.flatMap((s) => s.data)) / 20) * 20;
  const y0 = yrs[0], y1 = yrs[yrs.length - 1];
  const x = (yr: number) => L + 16 + ((yr - y0) / (y1 - y0)) * (W - L - R - 32);
  const y = (v: number) => T + (1 - v / top) * (H - T - B);
  const ticks = Array.from({ length: top / 20 + 1 }, (_, k) => k * 20);
  const [A, B2] = c.series;
  const band = [...A.data.map((v, i) => `${x(yrs[i])},${y(v)}`), ...B2.data.map((v, i) => `${x(yrs[i])},${y(v)}`).reverse()].join(" ");
  return (
    <div ref={ref} role="img" aria-label={alt} onMouseLeave={() => setAt(null)}>
      <Key c={c} />
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className={w.svg}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R + 10} y1={y(t)} y2={y(t)} stroke="#EDEDE9" />
            <text x={L - 8} y={y(t) + 3.5} textAnchor="end" className={w.ax}>
              {t}%
            </text>
          </g>
        ))}
        <polygon points={band} fill="rgba(58,124,165,.10)" style={{ opacity: seen ? 1 : 0, transition: "opacity .6s", transitionDelay: "900ms" }} />
        {/* the guide runs from the axis up to the lower point only, so it never crosses a printed value */}
        {at !== null ? <line x1={x(yrs[at])} x2={x(yrs[at])} y1={y(Math.min(...c.series.map((s) => s.data[at]))) + 26} y2={H - B} stroke="#1A3A4E" strokeDasharray="3 3" /> : null}
        {yrs.map((yr, i) => (
          <text key={yr} x={x(yr)} y={H - 10} textAnchor="middle" className={w.ax} style={at === i ? { fill: "#1D1B1B" } : undefined}>
            {yr} {W < 480 ? (yr === 1 ? "yr" : "yrs") : yr === 1 ? "year" : "years"}+
          </text>
        ))}
        {c.series.map((s, j) => (
          <g key={s.label}>
            <path d={s.data.map((v, i) => `${i ? "L" : "M"}${x(yrs[i])},${y(v)}`).join(" ")} fill="none" stroke={COLS[j]} strokeWidth={j === 0 ? 3 : 2} strokeDasharray={j === 1 ? "5 5" : undefined} pathLength={j === 0 ? 1 : undefined} className={j === 0 ? w.draw : undefined} style={j === 0 ? { strokeDashoffset: seen ? 0 : 1 } : { opacity: seen ? 1 : 0, transition: "opacity .6s", transitionDelay: "500ms" }} />
            {s.data.map((v, i) => (
              <g key={i} style={{ opacity: seen ? 1 : 0, transition: "opacity .4s", transitionDelay: `${300 + i * 140}ms` }}>
                <circle cx={x(yrs[i])} cy={y(v)} r={at === i ? 7 : 5} fill={COLS[j]} stroke="#fff" strokeWidth={2} />
                <text x={x(yrs[i])} y={y(v) + (j === 0 ? -12 : 20)} textAnchor="middle" className={w.pt} fill={COLS[j]}>
                  {v}%
                </text>
              </g>
            ))}
          </g>
        ))}
        {yrs.map((yr, i) => (
          <rect key={yr} x={x(yr) - 34} y={0} width={68} height={H} fill="transparent" onMouseEnter={() => setAt(i)} onClick={() => setAt(i)} />
        ))}
      </svg>
      <Readout c={c} at={at} idle="Touch a point for the counts." />
    </div>
  );
}

/* ── 5.1: columns in pairs. A nought has no column, so it gets a mark of its own. ── */
function Columns({ c, alt }: { c: PairChart; alt: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [at, setAt] = useState<number | null>(null);
  const top = Math.ceil(Math.max(...c.series.flatMap((s) => s.data)) / 10) * 10;
  return (
    <div ref={ref} role="img" aria-label={alt} onMouseLeave={() => setAt(null)}>
      <Key c={c} />
      <div className={w.cols} style={{ gridTemplateColumns: `repeat(${c.labels.length}, minmax(0, 1fr))` }}>
        {c.labels.map((l, i) => (
          <button key={i} type="button" className={`${w.col} ${at === i ? w.colOn : ""}`} onMouseEnter={() => setAt(i)} onFocus={() => setAt(i)} onClick={() => setAt(i)}>
            <span className={w.colBars}>
              {c.series.map((s, j) => {
                const v = s.data[i];
                return (
                  <span key={j} className={w.colOne}>
                    <b style={v === 0 ? { color: ORANGE } : { color: COLS[j] }}>{v}%</b>
                    {v === 0 ? <i className={w.nought} /> : <i style={{ height: seen ? `${(v / top) * 100}%` : 0, background: COLS[j], transitionDelay: `${i * 90 + j * 60}ms` }} />}
                  </span>
                );
              })}
            </span>
            <span className={w.colLab}>{l}</span>
          </button>
        ))}
      </div>
      <Readout c={c} at={at} idle="Touch a pair for the counts." />
    </div>
  );
}

/* the fallback: plain paired bars, for a chart a later draft adds that has no shape here yet */
function Pair({ c, alt }: { c: PairChart; alt: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  return (
    <div ref={ref} role="img" aria-label={alt}>
      <Key c={c} />
      <div className={w.rows}>
        {c.labels.map((l, i) => (
          <div key={i} className={w.row}>
            <span className={w.lab}>{l}</span>
            <div className={w.bars}>
              {c.series.map((s, j) => (
                <div key={j} className={w.line}>
                  <span className={w.track}>
                    <i style={{ width: seen ? `${(s.data[i] / c.max) * 100}%` : 0, background: COLS[j], transitionDelay: `${i * 40 + j * 60}ms` }} />
                  </span>
                  <span className={w.val}>{s.data[i]}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* A cell that lists published weights ("Idea 25%. Strategy 25%. Impact and results 50%.") is also
   drawn as one bar cut to those weights, the results part in sky. Only when every part reads as a
   name and a share and the shares come to 100; otherwise the cell is Sam's words alone. */
function weights(cell: string) {
  const parts = [...cell.matchAll(/([A-Z][^.%]*?)\s+(\d+(?:\.\d+)?)%/g)].map((m) => ({ t: m[1].trim(), v: Number.parseFloat(m[2]) }));
  const sum = parts.reduce((a, p) => a + p.v, 0);
  return parts.length >= 2 && Math.abs(sum - 100) <= 1 ? parts : null;
}

function Table({ c }: { c: TableChart }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  return (
    <div ref={ref} className={w.tableWrap}>
      <table className={w.table}>
        <thead>
          <tr>
            {c.head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {c.rows.map((row, i) => (
            <tr key={i}>
              {row.map((v, j) => {
                const ws = j === 1 ? weights(v) : null;
                return (
                  <td key={j}>
                    {v}
                    {ws ? (
                      <span className={w.wBar} aria-hidden>
                        {ws.map((p, k) => {
                          const res = /result/i.test(p.t);
                          return (
                            <i key={k} style={{ flexGrow: seen ? p.v : 0.0001, background: res ? SKY : PALE, color: res ? "#fff" : "#1A3A4E", transitionDelay: `${i * 120 + k * 80}ms` }}>
                              {p.v}%
                            </i>
                          );
                        })}
                      </span>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One figure by its id in charts.json. */
export function Fig({ id, alt }: { id: string; alt: string }) {
  const c = ALL[id];
  if (!c) throw new Error(`${id} is not in charts.json`);
  if (c.type === "table") return <Table c={c} />;
  if (id === "f11" || id === "f21") return <Gap c={c} alt={alt} />;
  if (id === "f31" && c.labels.length === 2) return <Slope c={c} alt={alt} />;
  if (id === "f41") return <Diverge c={c} alt={alt} />;
  if (id === "f42") {
    const yrs = c.labels.map(yearsOf);
    if (yrs.every((v, i) => Number.isFinite(v) && (i === 0 || v > yrs[i - 1]))) return <Falloff c={c} alt={alt} yrs={yrs} />;
  }
  if (id === "f51" && c.labels.length <= 5) return <Columns c={c} alt={alt} />;
  return <Pair c={c} alt={alt} />;
}

/** Figure 0.1: what was read, a number and its line in each cell. */
export function Stats({ items }: { items: { v: string; l: string }[] }) {
  return (
    <div className={w.stats}>
      {items.map((s) => (
        <div key={s.l} className={w.stat}>
          <span className="mod-num">{s.v}</span>
          <span className="mod-lbl">{s.l}</span>
        </div>
      ))}
    </div>
  );
}
