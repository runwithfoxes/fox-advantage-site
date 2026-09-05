"use client";

/*
  WEBSITE AGENT - the close-up is a real page it built, live in the window.

  Same rule as WebsiteHero on the proposal pages: a real page in an iframe,
  never a screenshot pretending to be one. The page is our own course module
  page, which the website agents built and keep changing, so it is ours to
  show. It renders at a fixed desktop width and is scaled to fit, so a phone
  sees the page as it was designed rather than its own breakpoint. Pointer
  events are off: a scroll over the window scrolls this page.
*/

import { useEffect, useRef, useState } from "react";

const DESIGN_W = 1280;
const DESIGN_H = 800;

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
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;
    const fit = () => setScale(Math.min(1, holder.clientWidth / DESIGN_W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(holder);
    return () => ro.disconnect();
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
        <div className="agw-site" ref={holderRef} style={{ height: DESIGN_H * scale }}>
          <iframe
            src={src}
            title={label}
            loading="lazy"
            tabIndex={-1}
            style={{
              width: DESIGN_W,
              height: DESIGN_H,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
            }}
          />
        </div>
      </div>
    </div>
  );
}
