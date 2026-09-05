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
              // starts moving straight away: 26s down with a soft start,
              // 3s hold at the foot, 5s back up, then again. The page inside
              // sets scroll-behavior: smooth, which turned every scrollTo
              // into its own animation and made the window jolt; instant
              // is the only behaviour that lets this loop own the motion.
              const cycle = 34000;
              const p = ((t - t0) % cycle) / 1000;
              let y = 0;
              if (p < 26) {
                const u = p / 26;
                y = max * (u < 0.12 ? (u / 0.12) * (u / 0.12) * 0.12 : u);
              } else if (p < 29) y = max;
              else y = max * (1 - (p - 29) / 5);
              win.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
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
