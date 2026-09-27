"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import N from "./numbers.json";
import r from "../../the-ai-ask/2026-q3/report.module.css";
import a from "./audit.module.css";

/**
 * The Ad Audit's figures, in the AI Ask's language (module windows, the site's blues, one thing to
 * touch per figure). Every value comes from numbers.json, which is Sam's numbers.json and
 * charts.json copied by script (paul-hub 024d205ce). Nothing is typed, and nothing that sits beside
 * Sam's words is rounded here: a share prints as the file has it, to one decimal.
 */
const SKY = "#3A7CA5";
const DEEP = "#1A3A4E";
const MID = "#6CAAC8";
const PALE = "#A9CBE4";
const GREY = "#CFCFC9";
const ORANGE = "#F47521";

const CH = N.charts;
type Adv = keyof typeof N.advertisers;
const ADV = N.advertisers as Record<string, (typeof N.advertisers)[Adv]>;
const CHALL = new Set(N.groups["Digital challengers"].members);
const pc = (x: number) => `${x}%`;

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

export function FigWin({ id, n, title, cap, children, win }: { id: string; n: string; title: string; cap: string; children: ReactNode; win?: string }) {
  return (
    <figure className={`mod-win ${r.fig}`} id={id}>
      <div className="mod-winbar">
        <span className="mod-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="mod-wintitle">{win ?? `figure_${n.replace(".", "_")}`}</span>
      </div>
      <div className={r.figBody}>
        <figcaption className={r.figTitle}>
          <span className={r.figN}>Figure {n}</span>
          {title}
        </figcaption>
        {children}
        <p className={r.figCap}>
          {cap ? `${cap} ` : ""}Source: The Ad Audit, Run with Foxes, from Meta&rsquo;s Ad Library.
        </p>
      </div>
    </figure>
  );
}

function Toggle<T extends string>({ opts, on, set }: { opts: { k: T; t: string }[]; on: T; set: (k: T) => void }) {
  return (
    <span className={r.toggle} role="group">
      {opts.map((o) => (
        <button key={o.k} type="button" aria-pressed={on === o.k} className={on === o.k ? r.tOn : ""} onClick={() => set(o.k)}>
          {o.t}
        </button>
      ))}
    </span>
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

/** One labelled bar: the site's funnel row. */
function Bar({ label, v, max, c, seen, delay = 0, extra, dim }: { label: string; v: number; max: number; c: string; seen: boolean; delay?: number; extra?: ReactNode; dim?: boolean }) {
  return (
    <div className={r.fRow} style={dim ? { opacity: 0.35 } : undefined}>
      <span className={r.fLab}>{label}</span>
      <span className={r.fTrack}>
        <i style={{ width: seen ? `${(v / max) * 100}%` : 0, background: c, transitionDelay: `${delay}ms` }} />
      </span>
      <span className={r.fVal}>
        <b>{pc(v)}</b> {extra}
      </span>
    </div>
  );
}

/* ── 1.1 Share of reach. Sam's figure is ads started in the quarter; 1.2 gives the other count,
   every ad over its whole life, so the toggle shows both. ─────────────────────────────── */
export function F11() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [view, setView] = useState<"q3" | "life">("q3");
  const life = N.lifetime_share as Record<string, number>;
  const rows = CH.f11.labels.map((l, i) => ({ l, v: view === "q3" ? CH.f11.data[i] : life[l] }));
  const max = Math.max(...rows.map((x) => x.v));
  return (
    <div ref={ref}>
      <div className={r.chartHead}>
        <Toggle opts={[{ k: "q3", t: "Ads started in the quarter" }, { k: "life", t: "Every ad, whole life" }]} on={view} set={setView} />
      </div>
      <Key items={[{ c: SKY, t: "Irish banks and lenders" }, { c: DEEP, t: "Digital challengers" }]} />
      <div className={r.hbars}>
        {rows.map((x, i) => (
          <Bar key={x.l} label={x.l} v={x.v} max={max} c={CHALL.has(x.l) ? DEEP : SKY} seen={seen} delay={i * 40} />
        ))}
      </div>
    </div>
  );
}

/* ── 1.2 Ads three ways. The three counts nest (new ads are among the different ads, which are
   among all the ads), so each bank is one bar with the three drawn inside each other. ───── */
export function F12() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const f = CH.f12;
  const max = Math.max(...f.ads);
  const parts = [
    { k: "ads" as const, c: GREY, t: "Ads in the library" },
    { k: "cre" as const, c: SKY, t: "Different ads" },
    { k: "new" as const, c: DEEP, t: "New in the quarter" },
  ];
  return (
    <div ref={ref}>
      <Key items={parts} />
      <div className={a.nest}>
        {f.labels.map((l, i) => (
          <div key={l} className={a.nestRow}>
            <span className={r.fLab}>{l}</span>
            <span className={a.nestBar}>
              {parts.map((p, j) => (
                <i key={p.k} style={{ width: seen ? `${(f[p.k][i] / max) * 100}%` : 0, background: p.c, transitionDelay: `${i * 50 + j * 120}ms` }} />
              ))}
            </span>
            <span className={a.nestVal}>
              {parts.map((p, j) => (
                <span key={p.k} style={{ color: j === 0 ? "#8A8A85" : p.c }}>{f[p.k][i]}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 2.1 What the reach is for, by advertiser: one full-width bar each ─────────────── */
const JOBS = [
  { k: "brand" as const, t: "Brand", c: DEEP },
  { k: "both" as const, t: "Both", c: MID },
  { k: "sales" as const, t: "Sales", c: SKY },
  { k: "service" as const, t: "Customer notices", c: PALE },
  { k: "other" as const, t: "Other", c: GREY },
];
export function F21() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  const cat = N.category.job_share_of_reach as Record<string, number>;
  const rows = [{ l: "All ten", v: JOBS.map((j) => cat[j.k] ?? 0) }, ...CH.f21.labels.map((l, i) => ({ l, v: JOBS.map((j) => CH.f21.series[j.k][i]) }))];
  const show = rows.find((x) => x.l === hover);
  return (
    <div ref={ref}>
      <Key items={JOBS} />
      <div className={a.stacks} onMouseLeave={() => setHover(null)}>
        {rows.map((row, i) => (
          <div key={row.l} className={`${a.stackRow} ${i === 0 ? a.stackAll : ""} ${hover === row.l ? a.stackOn : ""}`} onMouseEnter={() => setHover(row.l)}>
            <span className={r.fLab}>{row.l}</span>
            <span className={a.stackBar}>
              {row.v.map((v, j) =>
                v ? <i key={j} style={{ width: seen ? `${v}%` : 0, background: JOBS[j].c, transitionDelay: `${i * 50}ms` }} title={`${JOBS[j].t}: ${v}%`} /> : null,
              )}
            </span>
          </div>
        ))}
      </div>
      <div className={r.readout} aria-live="polite">
        {show ? (
          <>
            <b>{show.l}</b>
            {JOBS.map((j, k) => (show.v[k] ? <span key={j.k}><i style={{ background: j.c }} /> {j.t} {pc(show.v[k])}</span> : null))}
          </>
        ) : (
          <span>Hover a bank for its split.</span>
        )}
      </div>
    </div>
  );
}

/* ── 3.1 What the reach sells ───────────────────────────────────────────────────── */
export function F31() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const max = Math.max(...CH.f31.data);
  return (
    <div ref={ref} className={r.hbars}>
      {CH.f31.labels.map((l, i) => (
        <Bar key={l} label={l} v={CH.f31.data[i]} max={max} c={i < 2 ? SKY : PALE} seen={seen} delay={i * 35} />
      ))}
    </div>
  );
}

/* ── 3.2 Share of each advertiser's different ads that state an offer ─────────────── */
export function F32() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div ref={ref}>
      <Key items={[{ c: SKY, t: "Irish banks and lenders" }, { c: DEEP, t: "Digital challengers" }]} />
      <div className={r.hbars} onMouseLeave={() => setHover(null)}>
        {CH.f32.labels.map((l, i) => (
          <div key={l} onMouseEnter={() => setHover(l)}>
            <Bar label={l} v={CH.f32.data[i]} max={100} c={CHALL.has(l) ? DEEP : SKY} seen={seen} delay={i * 40} extra={hover === l ? <em>{ADV[l].offer_creatives} of {ADV[l].creatives}</em> : null} />
          </div>
        ))}
      </div>
      <div className={r.readout}>
        <span>Across all ten, {N.category.offer_creatives} of {N.totals.bank_creatives} different ads state an offer ({N.offer_share_all}%). Hover a bank for its count.</span>
      </div>
    </div>
  );
}

/* ── 4.1 Age, the challengers against the Irish banks: a pair of bars per age band ──── */
export function F41() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const f = CH.f41;
  const max = Math.max(...f.irish, ...f.chall);
  const G = N.groups;
  return (
    <div ref={ref} className={r.funnel}>
      <Key items={[{ c: DEEP, t: `Digital challengers (${G["Digital challengers"].members.join(", ")})` }, { c: SKY, t: "Irish banks and lenders (the other seven)" }]} />
      {f.labels.map((l, i) => (
        <div key={l} className={a.ageRow}>
          <span className={r.fLab}>{l}</span>
          <div className={r.pairBars}>
            {[
              { v: f.chall[i], c: DEEP },
              { v: f.irish[i], c: SKY },
            ].map((b, j) => (
              <div key={j} className={a.ageLine}>
                <span className={a.thin}>
                  <i style={{ width: seen ? `${(b.v / max) * 100}%` : 0, background: b.c, transitionDelay: `${i * 70 + j * 40}ms` }} />
                </span>
                <span className={r.fVal}>{pc(b.v)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className={r.readout}>
        <span>
          Under 35: <b>{G["Digital challengers"].under_35}%</b> of the challengers&rsquo; reach, <b>{G["Irish banks and lenders"].under_35}%</b> of the Irish banks&rsquo;.
        </span>
      </div>
    </div>
  );
}

/* ── 4.2 Under 35 and 55 or over, each advertiser ──────────────────────────────────── */
export function F42() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [sort, setSort] = useState<"u35" | "o55">("u35");
  const f = CH.f42;
  const rows = f.labels.map((l, i) => ({ l, u: f.u35[i], o: f.o55[i] })).sort((x, y) => (sort === "u35" ? y.u - x.u : y.o - x.o));
  const max = Math.max(...f.u35, ...f.o55);
  return (
    <div ref={ref}>
      <div className={r.chartHead}>
        <Toggle opts={[{ k: "u35", t: "Youngest first" }, { k: "o55", t: "Oldest first" }]} on={sort} set={setSort} />
      </div>
      <div className={a.dvHead}>
        <span />
        <span>Under 35</span>
        <span>55 or over</span>
      </div>
      <div className={a.dv}>
        {rows.map((x, i) => (
          <div key={x.l} className={a.dvRow}>
            <span className={r.fLab}>{x.l}</span>
            <span className={`${a.dvL} ${a.thin}`}>
              <b>{pc(x.u)}</b>
              <i style={{ width: seen ? `${(x.u / max) * 100}%` : 0, background: CHALL.has(x.l) ? DEEP : SKY, transitionDelay: `${i * 40}ms` }} />
            </span>
            <span className={`${a.dvR} ${a.thin}`}>
              <i style={{ width: seen ? `${(x.o / max) * 100}%` : 0, background: GREY, transitionDelay: `${i * 40}ms` }} />
              <b>{pc(x.o)}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 5.1 New different ads each week: a heat table, the way Sam drew it ────────────── */
export function T51() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [hot, setHot] = useState<string | null>(null);
  const t = CH.t51;
  const mx = Math.max(...t.rows.flatMap((row) => row.slice(1) as number[]));
  const wk = (w: string) => {
    const d = new Date(w + "T12:00:00Z");
    return `${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
  };
  return (
    <div ref={ref}>
      <div className={a.heat} style={{ gridTemplateColumns: `var(--heat-lab) repeat(${t.weeks.length}, minmax(0, 1fr)) var(--heat-sum)` }} onMouseLeave={() => setHot(null)}>
        <span className={a.heatTop}>Week of</span>
        {t.weeks.map((w) => (
          <span key={w} className={a.heatTop}>{wk(w)}</span>
        ))}
        <span className={a.heatTop}>All</span>
        {t.rows.map((row, i) => {
          const name = row[0] as string;
          const vals = row.slice(1) as number[];
          return [
            <span key={name} className={`${a.heatLab} ${hot === name ? a.heatHot : ""}`} onMouseEnter={() => setHot(name)}>{name}</span>,
            ...vals.map((v, j) => {
              const al = v ? 0.15 + (0.85 * v) / mx : 0;
              return (
                <span
                  key={`${name}${j}`}
                  className={`${a.cell} ${hot && hot !== name ? a.cellDim : ""}`}
                  onMouseEnter={() => setHot(name)}
                  style={{ background: v ? `rgba(58,124,165,${seen ? al.toFixed(2) : 0})` : "#F6F6F3", color: al > 0.55 ? "#fff" : "#1D1B1B", transitionDelay: `${(i + j) * 18}ms` }}
                >
                  {v || ""}
                </span>
              );
            }),
            <span key={`${name}-t`} className={a.heatSum}>{vals.reduce((x, y) => x + y, 0)}</span>,
          ];
        })}
      </div>
      <div className={r.readout} aria-live="polite">
        {hot ? (
          <span>
            <b>{hot}</b> started new different ads in {(CH.t51.rows.find((x) => x[0] === hot)!.slice(1) as number[]).filter(Boolean).length} of the {t.weeks.length} weeks.
          </span>
        ) : (
          <span>Hover a bank to follow its row.</span>
        )}
      </div>
    </div>
  );
}

/* ── 5.2 Ads that ran two days or less ───────────────────────────────────────────── */
export function F52() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const max = Math.max(...CH.f52.data);
  return (
    <div ref={ref} className={r.hbars}>
      {CH.f52.labels.map((l, i) => {
        const name = l.replace(/ \(.*\)$/, "");
        const count = l.match(/\((.*)\)$/)?.[1];
        return <Bar key={l} label={name} v={CH.f52.data[i]} max={max} c={i === 0 ? SKY : PALE} seen={seen} delay={i * 40} extra={<em>{count}</em>} />;
      })}
    </div>
  );
}

/* ── 6.4 The most-seen ads: Sam's twelve, his captions word for word. A video ad opens its four
   frames (start, a third, two thirds, end), the way Sam read it. ───────────────────── */
export function Gallery({ items }: { items: { img: string; adv: string; tags: string; quote: string; reach: string }[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const top = N.top_by_reach as { image: string; kind: string; library: string }[];
  const base = "/resources/the-ad-audit/2026-q3/";
  return (
    <div className={a.gallery}>
      {items.map((g, i) => {
        const rec = top.find((t) => t.image === `img/${g.img}`);
        const isVideo = rec?.kind === "video";
        const on = open === g.img;
        return (
          <figure key={g.img} className={`${a.adCard} ${on ? a.adCardOn : ""}`}>
            <div className={a.adPic}>
              <span className={a.adRank}>{String(i + 1).padStart(2, "0")}</span>
              <img src={`${base}${on ? `sheet-${g.img}` : g.img}`} alt={`${g.adv} ad`} loading="lazy" className={on ? a.adSheet : ""} />
            </div>
            <figcaption className={a.adCap}>
              <span className={a.adAdv}>{g.adv}</span>
              <span className={a.adTags}>{g.tags}</span>
              <span className={a.adQuote}>{g.quote}</span>
              <span className={a.adReach}>{g.reach}</span>
              <span className={a.adLinks}>
                {isVideo ? (
                  <button type="button" onClick={() => setOpen(on ? null : g.img)}>
                    {on ? "Back to the still" : "See four frames"}
                  </button>
                ) : null}
                {rec?.library ? (
                  <a href={rec.library} target="_blank" rel="noreferrer">
                    Ad Library &#8599;
                  </a>
                ) : null}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

/* ── 7.1 What the library holds, and what it doesn't: Sam's table, each row a pair ───── */
export function T71({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className={a.holds}>
      <div className={`${a.holdsRow} ${a.holdsHead}`}>
        <span style={{ color: SKY }}>{head[0]}</span>
        <span style={{ color: ORANGE }}>{head[1]}</span>
      </div>
      {rows.map((row) => (
        <div key={row[0]} className={a.holdsRow}>
          <span>
            <i style={{ background: SKY }} />
            {row[0]}
          </span>
          <span>
            <i style={{ background: ORANGE }} />
            {row[1]}
          </span>
        </div>
      ))}
    </div>
  );
}
