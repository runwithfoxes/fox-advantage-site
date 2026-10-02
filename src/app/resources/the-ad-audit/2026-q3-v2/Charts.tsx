"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import CH from "./charts.json";
import r from "../../the-ai-ask/2026-q3/report.module.css";
import a from "./audit.module.css";

/**
 * The Ad Audit v2's figures. Sam writes each one as a type (hbar, grouped, stacked, grouped_v,
 * line, table) with its series in charts.json, and this file draws each type once, in the AI
 * Ask's language: module windows, the site's blues, bars that grow when the figure comes on screen.
 * Every value is the file's, printed to the file's own decimals. charts.json is lettered (Brand A
 * to J), and it is the only data this client file imports, so no bank's name reaches the browser
 * from here.
 */
const SKY = "#3A7CA5";
const DEEP = "#1A3A4E";
const PALE = "#A9CBE4";
const GREY = "#CFCFC9";
const COLS = [SKY, DEEP, PALE, GREY];

type Series = { label: string; data: number[] };
type Chart = {
  type: "hbar" | "grouped" | "stacked" | "grouped_v" | "line" | "table";
  fmt?: "num" | "pct" | "sec";
  labels?: string[];
  data?: number[];
  series?: Series[];
  average?: number;
  median?: number;
  max?: number;
  head?: string[];
  rows?: (string | number)[][];
};
const ALL = CH as unknown as Record<string, Chart>;
const dpOf = (c: Chart) => {
  const vals = [...(c.data ?? []), ...(c.series ?? []).flatMap((x) => x.data)];
  return Math.max(0, ...vals.map((v) => (String(v).split(".")[1] ?? "").length));
};

/* JSON drops a trailing .0 (Sam's 26.0 arrives as 26), so each chart prints every value to the
   most decimals any of its values carries: 26.0% beside 24.9%, never 26% beside it. Shares only. */
function fmtOf(f: Chart["fmt"], dp = 0) {
  // shares line up to one decimal; counts and seconds print exactly as the file has them (127, 78.1)
  const n = (v: number) => v.toLocaleString("en-IE", { minimumFractionDigits: f === "pct" ? dp : 0, maximumFractionDigits: Math.max(dp, 2) });
  if (f === "pct") return (v: number) => `${n(v)}%`;
  if (f === "sec") return (v: number) => `${n(v)}s`;
  return n;
}

/** Starts drawing when the figure comes on screen, once. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setSeen(true);
    const io = new IntersectionObserver((es) => es[0].isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/** The module window. No source line under each figure: Sam keeps sources to the method note. */
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

function Key({ items }: { items: { c: string; t: string }[] }) {
  return (
    <div className={r.pairKey}>
      {items.map((x) => (
        <span key={x.t}>
          <i style={{ background: x.c }} /> {x.t}
        </span>
      ))}
    </div>
  );
}

/* ── hbar: one bar per row, with the category average and median marked where Sam gives them ── */
function HBar({ c }: { c: Chart }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const f = fmtOf(c.fmt, dpOf(c));
  const data = c.data ?? [];
  const max = c.max ?? Math.max(...data, c.average ?? 0, c.median ?? 0);
  const marks = [
    c.average != null ? { k: "avg", v: c.average, t: "Average" } : null,
    c.median != null ? { k: "med", v: c.median, t: "Median" } : null,
  ].filter(Boolean) as { k: string; v: number; t: string }[];
  return (
    <div ref={ref}>
      {marks.length ? (
        <div className={a.marksKey}>
          {marks.map((m) => (
            <span key={m.k}>
              <i className={m.k === "avg" ? a.markAvg : a.markMed} /> {m.t} {f(m.v)}
            </span>
          ))}
        </div>
      ) : null}
      <div className={r.hbars}>
        {(c.labels ?? []).map((l, i) => (
          <div key={i} className={r.fRow}>
            <span className={r.fLab}>{l}</span>
            <span className={a.track}>
              <i style={{ width: seen ? `${(data[i] / max) * 100}%` : 0, background: SKY, transitionDelay: `${i * 35}ms` }} />
              {marks.map((m) => (
                <b key={m.k} className={m.k === "avg" ? a.markAvg : a.markMed} style={{ left: `${(m.v / max) * 100}%` }} />
              ))}
            </span>
            <span className={r.fVal}>
              <b>{f(data[i])}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* A series whose label says % in a chart whose unit is a count is a different unit. Those are
   drawn side by side, each on its own scale, never on one axis (5.4 is counts beside shares). */
const isPctSeries = (c: Chart, s: Series) => c.fmt !== "pct" && /%/.test(s.label);

/* ── grouped: thin bars per row, one per series, on one scale ─────────────────────────── */
function Grouped({ c }: { c: Chart }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const series = c.series ?? [];
  if (series.some((s) => isPctSeries(c, s))) return <Multiples c={c} />;
  const f = fmtOf(c.fmt, dpOf(c));
  const max = Math.max(...series.flatMap((s) => s.data));
  return (
    <div ref={ref}>
      <Key items={series.map((s, j) => ({ c: COLS[j % COLS.length], t: s.label }))} />
      <div className={a.groups}>
        {(c.labels ?? []).map((l, i) => (
          <div key={i} className={a.groupRow}>
            <span className={r.fLab}>{l}</span>
            <div className={a.groupBars}>
              {series.map((s, j) => (
                <div key={j} className={a.groupLine}>
                  <span className={a.thin}>
                    <i style={{ width: seen ? `${(s.data[i] / max) * 100}%` : 0, background: COLS[j % COLS.length], transitionDelay: `${i * 40 + j * 60}ms` }} />
                  </span>
                  <span className={a.groupVal}>{f(s.data[i])}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* the same rows, one panel per series, each on its own scale */
function Multiples({ c }: { c: Chart }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const series = c.series ?? [];
  return (
    <div ref={ref} className={a.multiples}>
      {series.map((s, j) => {
        const pct = isPctSeries(c, s);
        const f = pct ? fmtOf("pct", dpOf({ ...c, fmt: "pct", series: [s] })) : fmtOf(c.fmt, dpOf({ ...c, series: [s] }));
        const max = Math.max(...s.data);
        return (
          <div key={j}>
            <div className={a.multHead}>{s.label.replace(/,\s*%$/, "")}</div>
            <div className={r.hbars}>
              {(c.labels ?? []).map((l, i) => (
                <div key={i} className={a.multRow}>
                  <span className={r.fLab}>{l}</span>
                  <span className={a.track}>
                    <i style={{ width: seen ? `${(s.data[i] / max) * 100}%` : 0, background: COLS[j % COLS.length], transitionDelay: `${i * 40}ms` }} />
                  </span>
                  <span className={r.fVal}>
                    <b>{f(s.data[i])}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── stacked: one full-width bar per row, the parts adding to 100 ──────────────────────── */
function Stacked({ c }: { c: Chart }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const series = c.series ?? [];
  const f = fmtOf(c.fmt ?? "pct", dpOf(c));
  return (
    <div ref={ref}>
      <Key items={series.map((s, j) => ({ c: COLS[j % COLS.length], t: s.label }))} />
      <div className={a.stacks} onMouseLeave={() => setHover(null)}>
        {(c.labels ?? []).map((l, i) => (
          <div key={i} className={`${a.stackRow} ${hover === i ? a.stackOn : ""}`} onMouseEnter={() => setHover(i)}>
            <span className={r.fLab}>{l}</span>
            <span className={a.stackBar}>
              {series.map((s, j) =>
                s.data[i] ? <i key={j} style={{ width: seen ? `${s.data[i]}%` : 0, background: COLS[j % COLS.length], transitionDelay: `${i * 45}ms` }} title={`${s.label}: ${f(s.data[i])}`} /> : null,
              )}
            </span>
          </div>
        ))}
      </div>
      <div className={r.readout} aria-live="polite">
        {hover != null ? (
          <>
            <b>{c.labels?.[hover]}</b>
            {series.map((s, j) => (
              <span key={j}>
                <i style={{ background: COLS[j % COLS.length] }} /> {s.label} {f(s.data[hover])}
              </span>
            ))}
          </>
        ) : (
          <span>Hover a row for its split.</span>
        )}
      </div>
    </div>
  );
}

/* ── grouped_v: columns side by side for each band ────────────────────────────────────── */
function GroupedV({ c }: { c: Chart }) {
  return (
    <>
      <div className={a.wideOnly}>
        <Columns c={c} />
      </div>
      <div className={a.narrowOnly}>
        <Grouped c={c} />
      </div>
    </>
  );
}
function Columns({ c }: { c: Chart }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const series = c.series ?? [];
  const f = fmtOf(c.fmt, dpOf(c));
  const max = Math.max(...series.flatMap((s) => s.data));
  return (
    <div ref={ref}>
      <Key items={series.map((s, j) => ({ c: COLS[j % COLS.length], t: s.label }))} />
      <div className={a.cols}>
        {(c.labels ?? []).map((l, i) => (
          <div key={i} className={a.colGroup}>
            <div className={a.colBars}>
              {series.map((s, j) => (
                <div key={j} className={a.colOne}>
                  <span className={a.colVal}>{f(s.data[i])}</span>
                  <i style={{ height: seen ? `${(s.data[i] / max) * 100}%` : 0, background: COLS[j % COLS.length], transitionDelay: `${i * 50 + j * 60}ms` }} />
                </div>
              ))}
            </div>
            <span className={a.colLab}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── line: the weeks along the bottom, one line per series, drawn in on sight ─────────── */
function Line({ c }: { c: Chart }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const series = c.series ?? [];
  const labels = c.labels ?? [];
  const f = fmtOf(c.fmt, dpOf(c));
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(Math.max(280, Math.round(el.clientWidth))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  const H = W < 500 ? 200 : 240,
    L = 34,
    R = 8,
    T = 10,
    B = 26;
  const top = Math.max(...series.flatMap((s) => s.data));
  const step = top > 100 ? 50 : top > 40 ? 20 : 10;
  const yMax = Math.ceil(top / step) * step;
  const x = (i: number) => L + ((W - L - R) * i) / Math.max(1, labels.length - 1);
  const y = (v: number) => T + (H - T - B) * (1 - v / yMax);
  const ticks = Array.from({ length: yMax / step + 1 }, (_, k) => k * step);
  const short = (s: string) => s.replace(/ (January|February|March|April|May|June|July|August|September|October|November|December)$/, (m) => " " + m.trim().slice(0, 3));
  return (
    <div ref={ref}>
      <Key items={series.map((s, j) => ({ c: COLS[j % COLS.length], t: s.label }))} />
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className={a.lineSvg} onMouseLeave={() => setHover(null)} role="img" aria-label={series.map((s) => s.label).join(" and ")}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#EDEDE9" />
            <text x={L - 6} y={y(t) + 3.5} textAnchor="end" className={a.axis}>
              {t}
            </text>
          </g>
        ))}
        {labels.map((l, i) =>
          i % (W < 500 ? 4 : 2) === 0 || i === labels.length - 1 ? (
            <text key={i} x={x(i)} y={H - 8} textAnchor="middle" className={a.axis}>
              {short(l)}
            </text>
          ) : null,
        )}
        {hover != null ? <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke="#1A3A4E" strokeDasharray="3 3" /> : null}
        {series.map((s, j) => {
          const d = s.data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
          return (
            <g key={j}>
              <path d={d} fill="none" stroke={COLS[j % COLS.length]} strokeWidth={2} pathLength={1} className={a.linePath} style={{ strokeDashoffset: seen ? 0 : 1, transitionDelay: `${j * 250}ms` }} />
              {s.data.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r={hover === i ? 4 : 2.5} fill={COLS[j % COLS.length]} style={{ opacity: seen ? 1 : 0, transition: "opacity .4s", transitionDelay: `${700 + j * 250}ms` }} />
              ))}
            </g>
          );
        })}
        {labels.map((_, i) => (
          <rect key={i} x={x(i) - (W - L - R) / labels.length / 2} y={T} width={(W - L - R) / labels.length} height={H - T - B} fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
      </svg>
      <div className={r.readout} aria-live="polite">
        {hover != null ? (
          <>
            <b>Week of {labels[hover]}</b>
            {series.map((s, j) => (
              <span key={j}>
                <i style={{ background: COLS[j % COLS.length] }} /> {s.label} {f(s.data[hover])}
              </span>
            ))}
          </>
        ) : (
          <span>Hover a week for its numbers.</span>
        )}
      </div>
    </div>
  );
}

/* ── table: Sam's rows as he wrote them ───────────────────────────────────────────────── */
function Table({ c }: { c: Chart }) {
  return (
    <div className={a.tableWrap}>
      <table className={a.table}>
        <thead>
          <tr>
            {(c.head ?? []).map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(c.rows ?? []).map((row, i) => (
            <tr key={i}>
              {row.map((v, j) => (
                <td key={j}>{typeof v === "number" ? v.toLocaleString("en-IE") : v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One figure by its id in charts.json. */
export function Fig({ id }: { id: string }) {
  const c = ALL[id];
  if (!c) throw new Error(`${id} is not in charts.json`);
  if (c.type === "hbar") return <HBar c={c} />;
  if (c.type === "grouped") return <Grouped c={c} />;
  if (c.type === "stacked") return <Stacked c={c} />;
  if (c.type === "grouped_v") return <GroupedV c={c} />;
  if (c.type === "line") return <Line c={c} />;
  return <Table c={c} />;
}

/* ── the first three seconds: Sam's single frames, a frame every half second, the time
   written under each one rather than drawn into the picture. Seven across on a laptop, four
   and three on a phone, so every frame stays big enough to read. ──────────────────────── */
export function Frames({ frames, base, alt }: { frames: { t: number; img: string }[]; base: string; alt: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  return (
    <div ref={ref} className={a.frames}>
      {frames.map((fr, i) => (
        <figure key={fr.img} className={a.frame} style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(6px)", transitionDelay: `${i * 70}ms` }}>
          <span className={a.framePic}>
            <img src={`${base}${fr.img}`} alt={i === 0 ? alt : ""} loading="lazy" />
          </span>
          <figcaption className={a.frameT}>{fr.t % 1 ? fr.t.toFixed(1) : fr.t}s</figcaption>
        </figure>
      ))}
    </div>
  );
}
