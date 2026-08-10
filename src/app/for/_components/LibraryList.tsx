"use client";

// The curated library on a prospect page: three to six items chosen for this
// client, each named for them, with a line saying why it is here. Built on the
// course "everything" page's row pattern. Clicks are tracked as resource
// events so a chase can say what they actually read.

import "./library-list.css";

export interface LibraryItem {
  label: string; // named for the client, e.g. "Pricing every format in retail media"
  note: string; // why this is on their page, one line
  href: string;
  kind: "folder" | "file" | "link";
  meta?: string; // right column, e.g. "essay", "12 pages", "video"
}

const ICONS: Record<LibraryItem["kind"], string> = {
  folder: "▸",
  file: "·",
  link: "↗",
};

export default function LibraryList({
  intro,
  items,
}: {
  intro?: string;
  items: LibraryItem[];
}) {
  const track = (label: string) =>
    window.dispatchEvent(
      new CustomEvent("prospect-track", {
        detail: { type: "resource", name: label },
      })
    );

  return (
    <div className="ppl-wrap">
      {intro && <p className="ppl-intro">{intro}</p>}
      <div className="ppl-box">
        <div className="ppl-head">
          <span>Chosen for you</span>
          <span>{items.length} things</span>
        </div>
        {items.map((it) => (
          <a
            key={it.label}
            className="ppl-row"
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            onClick={() => track(it.label)}
          >
            <span className="ppl-ic" aria-hidden>
              {ICONS[it.kind]}
            </span>
            <span className="ppl-main">
              <span className="ppl-label">{it.label}</span>
              <span className="ppl-note">{it.note}</span>
            </span>
            {it.meta && <span className="ppl-meta">{it.meta}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
