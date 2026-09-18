"use client";

// The rebuild as the whole top of a prospect page, live and playing, above the
// masthead. Paul's call, 27 Aug, pointing at the GEO Ireland page: the website
// takes over the entire top rather than sitting in a small frame further down.
//
// ⚠️ It is a REAL rebuilt page in an iframe, never a screenshot pretending to
// be one. Same rule as WebsiteExhibit, which is the small-frame treatment.
//
// The iframe renders at a fixed 1600px and is scaled to fit the viewport, so a
// reader on a laptop sees the desktop layout the rebuild was designed at
// instead of its mobile breakpoint. Pointer events are off so a scroll over
// the hero scrolls the proposal, not the site inside it.

import { useEffect, useRef, useState } from "react";
import "./website-hero.css";

export default function WebsiteHero({
  src,
  url,
  caption,
  href,
}: {
  src: string; // the rebuilt page
  url: string; // the real domain it rebuilds, for the iframe title
  // ⛔ Paul cut the caption strip on the Boreman build, 27 Aug: "delete this
  // line". The rebuild speaks for itself and a line under it explaining what it
  // is reads as a caption on a picture. Optional, so a later page can bring it
  // back, and OFF unless someone passes copy.
  caption?: string;
  href?: string; // where "open it" goes, if anywhere
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);

  useEffect(() => {
    const fit = () => {
      const w = wrap.current?.clientWidth ?? 1600;
      setScale(w / 1600);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="ppwh" ref={wrap}>
      <div
        className="ppwh-stage"
        style={{ ["--ppwh-scale" as string]: String(scale) }}
      >
        <iframe
          className="ppwh-frame"
          src={src}
          title={`${url} rebuilt`}
          scrolling="no"
        />
        <div className="ppwh-veil" />
        {href && (
          <a className="ppwh-cta" href={href} target="_blank" rel="noreferrer">
            Open the site
          </a>
        )}
      </div>
      {caption && (
        <p className="ppwh-cap">
          <b>{url}</b>
          <span>{caption}</span>
          {href && (
            <a href={href} target="_blank" rel="noreferrer">
              Open it full size
            </a>
          )}
        </p>
      )}
    </div>
  );
}
