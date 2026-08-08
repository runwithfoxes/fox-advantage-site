"use client";

import { useEffect, useRef } from "react";
import "./shell.css";

export interface ShellSection {
  id: string;
  title: string;
}

// The page shell: fixed top bar, sticky rail listing the sections, masthead,
// then the sections themselves as children. Sections must be PPSection
// elements (or carry matching ids) for the rail links and tracking to work.
export default function ProspectShell({
  clientName,
  eyebrow,
  title,
  titleHl,
  standfirst,
  sections,
  children,
}: {
  clientName: string;
  eyebrow: string;
  title: string;
  titleHl?: string;
  standfirst: string | string[];
  sections: ShellSection[];
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Rail highlight follows the section in view. Navigation aid only, the
  // content renders in full regardless.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const links = new Map<string, HTMLAnchorElement>();
    root
      .querySelectorAll<HTMLAnchorElement>(".pps-rail a[data-section]")
      .forEach((a) => links.set(a.dataset.section as string, a));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((a) => (a.dataset.active = "0"));
          const link = links.get(entry.target.id);
          if (link) link.dataset.active = "1";
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const heading = (() => {
    const at = titleHl ? title.indexOf(titleHl) : -1;
    if (!titleHl || at < 0) return title;
    return (
      <>
        {title.slice(0, at)}
        <span className="pps-hl">{titleHl}</span>
        {title.slice(at + titleHl.length)}
      </>
    );
  })();

  const standfirsts = Array.isArray(standfirst) ? standfirst : [standfirst];

  return (
    <div className="pps-root" ref={rootRef}>
      <header className="pps-nav">
        <a className="pps-nav-logo" href="#top">
          /<span>Run</span>withfoxes
        </a>
        <span className="pps-nav-private">Private · {clientName}</span>
      </header>

      <div className="pps-shell" id="top">
        <div className="pps-grid">
          <div className="pps-railcol">
            <nav className="pps-rail">
              <p>/on this page</p>
              {sections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} data-section={s.id}>
                  <span className="pps-rail-k">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pps-rail-dot" />
                  <span>{s.title}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pps-maincol">
            <header className="pps-masthead">
              <p className="pps-eyebrow">{eyebrow}</p>
              <h1 className="pps-h1">{heading}</h1>
            </header>
            <div style={{ marginTop: 30 }}>
              {standfirsts.map((s, i) => (
                <p key={i} className="pps-standfirst">
                  {s}
                </p>
              ))}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// One section of the page. The id feeds the rail link, the anchor, and the
// tracking event, so a reader reaching this section is logged under this id.
export function PPSection({
  id,
  k,
  title,
  children,
}: {
  id: string;
  k?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-track-section={id} className="pps-section">
      <div className="pps-section-head">
        {k && <span className="pps-section-k">{k}</span>}
        <h2 className="pps-section-h2">{title}</h2>
      </div>
      {children}
    </section>
  );
}
