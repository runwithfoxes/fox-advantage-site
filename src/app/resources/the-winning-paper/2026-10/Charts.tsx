"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import CH from "./charts.json";
import r from "../../the-ai-ask/2026-q3/report.module.css";
import w from "./paper.module.css";

/**
 * The Winning Paper's figures. Sam's page draws six paired bar charts with Chart.js; here the same
 * values are drawn in the AI Ask's language: a module window, a row per measure, one thin bar for
 * each group on Sam's own 0 to 100 scale, the value printed beside it, bars that grow when the
 * figure comes on screen. charts.json is written by scripts/resources/winning-paper-copy.py from
 * the CHARTS list in Sam's page, and it is the only data this client file imports.
 */
const SKY = "#3A7CA5";
const MUTED = "#8A8A85";
const COLS = [SKY, MUTED];

type Series = { label: string; data: number[] };
type Chart = { type: "pair"; labels: string[]; series: Series[]; max: number } | { type: "table"; head: string[]; rows: string[][] };
const ALL = CH as unknown as Record<string, Chart>;

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

function Pair({ c, alt }: { c: Extract<Chart, { type: "pair" }>; alt: string }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  return (
    <div ref={ref} role="img" aria-label={alt}>
      <div className={r.pairKey}>
        {c.series.map((s, j) => (
          <span key={s.label}>
            <i style={{ background: COLS[j] }} /> {s.label}
          </span>
        ))}
      </div>
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

function Table({ c }: { c: Extract<Chart, { type: "table" }> }) {
  return (
    <div className={w.tableWrap}>
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
              {row.map((v, j) => (
                <td key={j}>{v}</td>
              ))}
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
  return c.type === "pair" ? <Pair c={c} alt={alt} /> : <Table c={c} />;
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
