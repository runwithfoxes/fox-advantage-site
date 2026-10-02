"use client";

import { useEffect, useRef, useState } from "react";
import r from "./report.module.css";

/**
 * Two small moving parts for The AI Ask.
 * Hl: Sam's key phrase, in the module pages' sky (.mod-hl), with a pale marker that sweeps in
 * behind it the first time it comes on screen. The words never change.
 * Rail: the contents list, after the module rail. The chapter you are in is marked, and every
 * chapter you have passed gets its dot filled.
 */
export function Hl({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOn(true);
    const io = new IntersectionObserver((es) => es[0].isIntersecting && (setOn(true), io.disconnect()), { rootMargin: "0px 0px -20% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className={`${r.hl} ${on ? r.hlOn : ""}`}>
      {children}
    </span>
  );
}

export function Rail({ items }: { items: { id: string; k: string; t: string }[] }) {
  const [at, setAt] = useState(0);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      let cur = 0;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = i;
      });
      setAt(cur);
      const main = document.getElementById("report-main");
      if (main) {
        const b = main.getBoundingClientRect();
        setPct(Math.max(0, Math.min(1, (window.innerHeight * 0.35 - b.top) / b.height)));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);
  return (
    <nav className={r.rail} aria-label="Contents">
      <p className={r.railHead}>
        Contents <span>{Math.round(pct * 100)}% read</span>
      </p>
      <span className={r.railBar}>
        <i style={{ width: `${pct * 100}%` }} />
      </span>
      {items.map((it, i) => (
        <a key={it.id} href={`#${it.id}`} className={`${i === at ? r.railOn : ""} ${i < at ? r.railDone : ""}`}>
          <span className={r.railK}>{it.k}</span>
          <span className={r.railDot} />
          <span>{it.t}</span>
        </a>
      ))}
    </nav>
  );
}
