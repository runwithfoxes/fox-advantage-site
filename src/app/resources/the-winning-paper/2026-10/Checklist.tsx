"use client";

import { useEffect, useRef, useState } from "react";
import k from "./checklist.module.css";

/**
 * THE CHECKLIST. Paul, 3 Oct: "here is your checklist, do x, y, z... And the evidence backs each
 * up. Give them the ammunition", and "dray could do something beautiful with the checklist right?
 * to make it visually wow". It is the first thing a marketer meets after the introduction and the
 * part they will keep, so it is one made thing: a sheet with twelve numbered lines to do and four
 * never to do. Each line carries its own evidence in Sam's words, and where the evidence gives two
 * shares they are drawn on the same rule as Figures 1.1 and 2.1 (awarded papers a solid dot, papers
 * that weren't awarded a ring, the space between them filled). A line can be ticked; the ticks stay
 * in this browser only, and the page draws the same without them.
 */
export type Line = { t: string; e: string; ch: number; a?: number; b?: number };
export type Check = { title: string; lead: string[]; heads: string[]; do: Line[]; never: Line[]; close: string[] };

const KEY = "rwf-winning-paper-checklist";
const signed = (d: number) => (d > 0 ? `+${d}` : d < 0 ? `−${Math.abs(d)}` : "0");

function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setSeen(true);
    const io = new IntersectionObserver((es) => es[0].isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/** The two shares on one rule from 0 to 100. */
function Rule({ a, b, seen, i, never }: { a: number; b: number; seen: boolean; i: number; never?: boolean }) {
  const d = a - b;
  return (
    <span className={k.rule} role="img" aria-label={`${a}% of awarded papers, ${b}% of papers that weren't awarded`}>
      <span className={k.track}>
        <i className={k.fill} style={{ left: `${Math.min(a, b)}%`, width: seen ? `${Math.abs(d)}%` : 0, transitionDelay: `${400 + i * 50}ms` }} data-never={never ? 1 : undefined} />
        <i className={`${k.dot} ${k.ring}`} style={{ left: seen ? `${b}%` : 0, transitionDelay: `${i * 50}ms` }} />
        <i className={k.dot} style={{ left: seen ? `${a}%` : 0, transitionDelay: `${i * 50 + 40}ms` }} />
      </span>
      <span className={k.nums}>
        <b>{a}%</b>
        <em>{b}%</em>
        <strong data-never={never ? 1 : undefined}>{signed(d)} pts</strong>
      </span>
    </span>
  );
}

export default function Checklist({ c }: { c: Check }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const v = window.localStorage.getItem(KEY);
      if (v) setDone(JSON.parse(v));
    } catch {}
  }, []);
  const tick = (id: string) =>
    setDone((cur) => {
      const next = { ...cur, [id]: !cur[id] };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  const n = c.do.filter((_, i) => done[`d${i}`]).length;
  const hasRule = [...c.do, ...c.never].some((l) => l.a != null);

  return (
    <section id="checklist" className={k.wrap} ref={ref}>
      <div className={k.sheet}>
        <img className={k.fox} src="/fox/chapter-fox-sitting-nobg.png" alt="" />
        <header className={k.head}>
          <span className={k.kick}>Take this with you</span>
          <h2 className={k.title}>{c.title}</h2>
          {c.lead.map((p, i) => (
            <p key={i} className={k.lead}>
              {p}
            </p>
          ))}
          {hasRule ? (
            <div className={k.key}>
              <span>
                <i className={k.keyDot} /> awarded papers
              </span>
              <span>
                <i className={`${k.keyDot} ${k.keyRing}`} /> papers that weren&rsquo;t awarded
              </span>
              <span className={k.keyScale}>each rule runs from 0 to 100%</span>
            </div>
          ) : null}
        </header>

        <div className={k.band}>
          <span className={k.bandName}>{c.heads[0]}</span>
          <span className={k.bandCount}>
            {n} of {c.do.length} ticked
          </span>
          <span className={k.prog}>
            <i style={{ width: `${(n / c.do.length) * 100}%` }} />
          </span>
        </div>
        <ol className={k.list}>
          {c.do.map((l, i) => {
            const id = `d${i}`;
            return (
              <li key={i} className={`${k.line} ${done[id] ? k.ticked : ""}`}>
                <button type="button" className={k.box} aria-pressed={!!done[id]} aria-label={`Tick: ${l.t}`} onClick={() => tick(id)}>
                  <span className={k.num}>{String(i + 1).padStart(2, "0")}</span>
                  <svg viewBox="0 0 20 20" className={k.tickMark} aria-hidden>
                    <path d="M4.5 10.5l3.6 3.6 7.4-8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="square" />
                  </svg>
                </button>
                <div className={k.words}>
                  <h3 className={k.do}>{l.t}</h3>
                  <p className={k.why}>
                    {l.e}{" "}
                    <a href={`#c${l.ch}`} className={k.go}>
                      Chapter {l.ch} &rarr;
                    </a>
                  </p>
                </div>
                {l.a != null && l.b != null ? <Rule a={l.a} b={l.b} seen={seen} i={i} /> : <span />}
              </li>
            );
          })}
        </ol>

        <div className={`${k.band} ${k.bandNever}`}>
          <span className={k.bandName}>{c.heads[1]}</span>
          <span className={k.bandCount}>{c.never.length} things the awarded papers do less often</span>
        </div>
        <ul className={`${k.list} ${k.neverList}`}>
          {c.never.map((l, i) => (
            <li key={i} className={`${k.line} ${k.never}`}>
              <span className={k.cross} aria-hidden>
                <svg viewBox="0 0 20 20">
                  <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="#F47521" strokeWidth="2.4" strokeLinecap="square" />
                </svg>
              </span>
              <div className={k.words}>
                <h3 className={k.do}>{l.t}</h3>
                <p className={k.why}>
                  {l.e}{" "}
                  <a href={`#c${l.ch}`} className={k.go}>
                    Chapter {l.ch} &rarr;
                  </a>
                </p>
              </div>
              {l.a != null && l.b != null ? <Rule a={l.a} b={l.b} seen={seen} i={i + c.do.length} never /> : <span />}
            </li>
          ))}
        </ul>

        {c.close.map((p, i) => (
          <p key={i} className={k.close}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
