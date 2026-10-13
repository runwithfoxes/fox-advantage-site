"use client";

import { useEffect, useRef, useState } from "react";

/* A bar chart of counts out of a total. The bars are whole in the server's HTML, so the
   chart reads with no script. With script they wait empty and draw when the chart is 40%
   on screen. */
export default function Bars({
  rows,
  total,
  lead = 1,
  label,
}: {
  rows: [string, number][];
  total: number;
  lead?: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = on || !armed;
  return (
    <div className="mk-bars" ref={ref} role="img" aria-label={label}>
      {rows.map(([name, n], i) => (
        <div className="mk-bar" key={name} data-lead={i < lead ? "1" : "0"}>
          <span className="mk-barname">{name}</span>
          <span className="mk-bartrack">
            <i style={{ width: show ? `${(n / total) * 100}%` : "0%", transitionDelay: `${i * 45}ms` }} />
          </span>
          <span className="mk-barn">{n}</span>
        </div>
      ))}
    </div>
  );
}
