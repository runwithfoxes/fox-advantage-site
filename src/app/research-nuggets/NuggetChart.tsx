"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NoteChart } from "@/lib/notes";
import c from "./nugget-chart.module.css";

/**
 * THE CHART INSIDE ONE OF SAM'S PIECES. Paul, 6 Oct 2026: "show an animated chart in your essays
 * where possible, to make it more visual."
 *
 * Bars on one scale, drawn when the chart comes on screen, once, with a button to play it again.
 * What the server prints is the finished chart, so a reader with no script, or who has asked for
 * less motion, sees every figure standing still.
 *
 * A file can give `squares` in place of bars (Paul, 9 Oct 2026: not the same bar chart every time):
 * a count out of a small total, one square for each thing counted, the same size of square in every
 * block. The filled squares come in one at a time as the count goes up.
 *
 * A file can give `pairs`: one mark for each thing met, in groups, each mark two dots joined (nugget 09,
 * 12 Oct 2026: every firm had an owner and a clerk deciding). The total is printed once and the count by
 * each group.
 *
 * A file can give `split`: one bar cut into the parts that add up to it (nugget 09: growth of 18, of which
 * about 7 the other firms also grew and 11 is the difference). The words on each part are the file's.
 *
 * Three rules from Sam's chart files, built in so they cannot be broken by a new file:
 *  - bars are never stacked or added: each has its own row on the same scale;
 *  - a "limit" bar (an estimate that is only an upper limit) is a dashed outline, never solid,
 *    and once it has been shown it steps back;
 *  - the closing line is a whole sentence under the chart. No figure from it is put on a bar.
 */
type Stage = "rest" | "armed" | "draw";

const DRAW_MS = 1100;   // the bars and the count
const HOLD_MS = 1500;   // the reader sees both bars at full strength before the estimate steps back

export default function NuggetChart({ chart, win }: { chart: NoteChart; win: string }) {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState<Stage>("rest");
  const [n, setN] = useState(1);   // 0 to 1, the count-up
  const timers = useRef<number[]>([]);
  const frame = useRef(0);

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    cancelAnimationFrame(frame.current);
    // back to nothing first, so a replay redraws the bars and not only the count
    setStage("armed");
    setN(0);
    frame.current = requestAnimationFrame(() => {
      frame.current = requestAnimationFrame((t0) => {
        setStage("draw");
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / DRAW_MS);
          setN(1 - Math.pow(1 - k, 3));
          if (k < 1) frame.current = requestAnimationFrame(tick);
        };
        frame.current = requestAnimationFrame(tick);
        timers.current = [window.setTimeout(() => setStage("rest"), DRAW_MS + HOLD_MS)];
      });
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.45 }
    );
    // empty the chart first, then start watching for it to come on screen
    const arm = requestAnimationFrame(() => {
      setStage("armed");
      setN(0);
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(arm);
      io.disconnect();
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(frame.current);
    };
  }, [play]);

  const max = chart.max || 1;
  const splitTotal = (chart.split?.parts || []).reduce((a, p) => a + p.value, 0);
  const pairTotal = (chart.pairs || []).reduce((a, g) => a + g.value, 0);
  const ringTotal = (chart.ring?.parts || []).reduce((a, p) => a + p.value, 0);
  const pct = (v: number) => `${(v / max) * 100}%`;
  const show = (v: number) => `${chart.prefix || ""}${Math.round(v * n)}${chart.suffix || ""}`;

  return (
    <figure ref={ref} className={`mod-win ${c.fig}`} data-stage={stage}>
      <div className="mod-winbar">
        <span className="mod-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="mod-wintitle">{win}</span>
        <button type="button" className={c.again} onClick={play} disabled={stage !== "rest"}>
          play again
        </button>
      </div>
      <div className={c.body}>
        <figcaption className={c.title}>
          <span className={c.unit}>{chart.unit}</span>
          {chart.title}
        </figcaption>

        {chart.squares ? (
          <div className={c.blocks}>
            {chart.squares.map((b) => (
              <div key={b.label} className={c.block}>
                <div className={c.head}>
                  <span className={c.lab}>{b.label}</span>
                  <span className={c.val}>
                    {show(b.value)}
                    {b.note ? <em>{b.note}</em> : null}
                  </span>
                </div>
                <div
                  className={c.squares}
                  role="img"
                  aria-label={`${b.value} of ${b.out_of} squares filled in`}
                >
                  {/* a square fills in when the count reaches it, so the squares and the number never disagree */}
                  {Array.from({ length: b.out_of }, (_, i) => (
                    <i key={i} className={i < Math.round(b.value * n) ? c.on : undefined} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {chart.pairs ? (
          <div className={c.pairsWrap}>
            <div className={c.pairsTop}>
              <span className={c.val}>
                {Math.round(pairTotal * n)}
                <em>{chart.pairs_unit}</em>
              </span>
              {chart.pairs_key ? (
                <span className={c.key} aria-hidden="true">
                  <span className={c.pair}><i className={c.big} /><i className={c.link} /><i className={c.small} /></span>
                  <span className={c.keyWords}>
                    <span>{chart.pairs_key[0]}</span>
                    <span>{chart.pairs_key[1]}</span>
                  </span>
                </span>
              ) : null}
            </div>
            {chart.pairs.map((g, gi) => {
              const before = chart.pairs!.slice(0, gi).reduce((a, x) => a + x.value, 0);
              const shown = Math.max(0, Math.min(g.value, Math.round(pairTotal * n) - before));
              return (
                <div key={g.label} className={c.group}>
                  <span className={c.lab}>{g.label}</span>
                  <div className={c.pairs} role="img" aria-label={`${g.value} marks, one for each of ${g.value} ${chart.pairs_unit || ""}`}>
                    {/* a mark comes in when the count reaches it, so the marks and the number never disagree */}
                    {Array.from({ length: g.value }, (_, i) => (
                      <span key={i} className={`${c.pair} ${i < shown ? c.in : c.out}`}><i className={c.big} /><i className={c.link} /><i className={c.small} /></span>
                    ))}
                  </div>
                  <span className={c.groupVal}>{shown}</span>
                </div>
              );
            })}
          </div>
        ) : null}

        {chart.split ? (
          <div className={c.split}>
            <div className={c.head}>
              <span className={c.lab}>{chart.split.label}</span>
              <span className={`${c.val} ${c.late}`}>{chart.split.count}</span>
            </div>
            {/* the parts grow one after the other, left to right, as one bar */}
            <div className={c.splitBar} style={{ gridTemplateColumns: chart.split.parts.map((p) => `${p.value}fr`).join(" ") }}>
              {chart.split.parts.map((p, i) => {
                const before = chart.split!.parts.slice(0, i).reduce((a, x) => a + x.value, 0);
                const grown = Math.max(0, Math.min(1, (splitTotal * n - before) / p.value));
                return (
                  <span key={p.label} className={c.splitCell}>
                    <span className={`${c.splitPart} ${c[p.kind || "main"]}`} style={{ width: `${grown * 100}%` }} />
                    <span className={`${c.onBar} ${c[p.kind || "main"]} ${c.late}`}>{p.on_bar}</span>
                  </span>
                );
              })}
            </div>
            <div className={c.splitLabs} style={{ gridTemplateColumns: chart.split.parts.map((p) => `${p.value}fr`).join(" ") }}>
              {chart.split.parts.map((p) => (
                <span key={p.label} className={`${c.lab} ${c[p.kind || "main"]}`}>{p.label}</span>
              ))}
            </div>
          </div>
        ) : null}

        {chart.ring ? (
          <div className={c.ringWrap}>
            <div className={c.ring}>
              {/* pathLength is the total, so a part's dash is its own figure. The parts draw one after
                  the other, round from the top, as one line. */}
              <svg viewBox="0 0 200 200" role="img" aria-label={chart.ring.parts.map((p) => `${p.value}% ${p.label}`).join(", ")}>
                <circle className={c.ringTrack} cx="100" cy="100" r="78" />
                {chart.ring.parts.map((p, i) => {
                  const before = chart.ring!.parts.slice(0, i).reduce((a, x) => a + x.value, 0);
                  const grown = Math.max(0, Math.min(p.value, ringTotal * n - before));
                  return (
                    <circle
                      key={p.label}
                      className={`${c.ringPart} ${c[p.kind || "main"]}`}
                      cx="100"
                      cy="100"
                      r="78"
                      pathLength={ringTotal}
                      strokeDasharray={`${grown} ${ringTotal}`}
                      strokeDashoffset={-before}
                    />
                  );
                })}
              </svg>
              <span className={`${c.ringHole} ${c.late}`}>
                <b>{chart.ring.centre}</b>
                {chart.ring.centre_label ? <span>{chart.ring.centre_label}</span> : null}
              </span>
            </div>
            <div className={c.ringKey}>
              {chart.ring.parts.map((p) => (
                <div key={p.label} className={`${c.ringRow} ${c[p.kind || "main"]}`}>
                  <i />
                  {/* read as one line: the figure, what it is, then its count */}
                  <p>
                    <span className={c.val}>{p.value}%</span> {p.label}
                    {p.note ? <em> {p.note}</em> : null}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {chart.bars ? (
        <div className={c.plot}>
          {chart.bars.map((b) => {
            const kind = b.kind || "main";
            const cut = b.label.indexOf(": ");
            return (
              <div key={b.label} className={`${c.row} ${c[kind]}`}>
                <div className={c.head}>
                  <span className={c.lab}>
                    {cut > 0 ? (
                      <>
                        <b>{b.label.slice(0, cut + 1)}</b>
                        {b.label.slice(cut + 1)}
                      </>
                    ) : (
                      b.label
                    )}
                  </span>
                  <span className={c.val}>
                    {show(b.value)}
                    {b.note ? <em>{b.note}</em> : null}
                  </span>
                </div>
                <span className={c.track}>
                  {(chart.ticks || []).map(([at]) => (
                    <i key={at} className={c.grid} style={{ left: pct(at) }} />
                  ))}
                  <span className={c.bar} style={{ width: pct(b.value) }} />
                </span>
              </div>
            );
          })}
          {chart.ticks ? (
            <div className={c.axis} aria-hidden="true">
              {chart.ticks.map(([at, label]) => (
                <span key={at} className={at === max ? c.end : undefined} style={{ left: pct(at) }}>
                  {label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        ) : null}

        {chart.closing ? <p className={c.closing}>{chart.closing}</p> : null}
        {chart.footnote || chart.source ? (
          <p className={c.foot}>
            {chart.footnote}
            {chart.footnote && chart.source ? " " : ""}
            {chart.source ? `Source: ${chart.source}` : ""}
          </p>
        ) : null}
      </div>
    </figure>
  );
}
