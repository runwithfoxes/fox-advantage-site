"use client";

/*
  WEBSITE AGENT - the close-up is a real page it built, live in the window.

  Same rule as WebsiteHero on the proposal pages: a real page in an iframe,
  never a screenshot pretending to be one. The page is Tallis, a made-up
  finance technology company drawn for this exhibit, so it is ours to show
  and nothing in it is real.

  On a wide screen the page renders at desktop width and is scaled to fit,
  so the reader sees the layout it was designed at. On a phone it renders at
  phone width instead, so the site's own phone layout shows at a readable
  size rather than a shrunken desktop. Pointer events are off: a scroll over
  the window scrolls this page. Once in view the window plays itself, a slow
  scroll down the site and back, the same device as the guardian's sweep, so
  the reader sees the whole page without knowing to scroll it. Reduced
  motion leaves it at the top.
*/

import { useEffect, useRef, useState } from "react";

const WIDE = { w: 1280, h: 820 };
const NARROW = { w: 430, h: 760 };

export default function SiteWindow({
  src,
  label,
  pill = "live",
}: {
  src: string;
  label: string;
  pill?: string;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [design, setDesign] = useState(WIDE);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;
    const fit = () => {
      const cw = holder.clientWidth;
      const d = cw < 700 ? NARROW : WIDE;
      setDesign(d);
      setScale(Math.min(1, cw / d.w));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(holder);
    return () => ro.disconnect();
  }, []);

  // the slow self-scroll, once the window is in view
  useEffect(() => {
    const holder = holderRef.current;
    const frame = frameRef.current;
    if (!holder || !frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting || started) return;
          started = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const win = frame.contentWindow;
            const doc = frame.contentDocument;
            if (win && doc) {
              const max = Math.max(0, doc.documentElement.scrollHeight - win.innerHeight);
              // 2s hold, 18s down, 3s hold, 6s back, then again
              const cycle = 29000;
              const p = ((t - t0) % cycle) / 1000;
              let y = 0;
              if (p < 2) y = 0;
              else if (p < 20) y = max * ((p - 2) / 18);
              else if (p < 23) y = max;
              else y = max * (1 - (p - 23) / 6);
              win.scrollTo(0, y);
            }
            raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }),
      { threshold: 0.4 }
    );
    io.observe(holder);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="agw">
      <div className="agw-tl">
        <i />
        <i />
        <i />
        <span className="agw-t">{label}</span>
        <span className="agw-pill">{pill}</span>
      </div>
      <div className="agw-panel">
        <div className="agw-site" ref={holderRef} style={{ height: design.h * scale }}>
          <iframe
            ref={frameRef}
            src={src}
            title={label}
            loading="lazy"
            tabIndex={-1}
            scrolling="no"
            style={{
              width: design.w,
              height: design.h,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
            }}
          />
        </div>
      </div>
    </div>
  );
}
