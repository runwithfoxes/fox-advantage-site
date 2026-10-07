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

  const pct = (v: number) => `${(v / chart.max) * 100}%`;
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
                <span key={at} className={at === chart.max ? c.end : undefined} style={{ left: pct(at) }}>
                  {label}
                </span>
              ))}
            </div>
          ) : null}
        </div>

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
