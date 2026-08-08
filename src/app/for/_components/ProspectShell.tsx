"use client";

import { useEffect, useRef } from "react";
import "./shell.css";

export interface ShellSection {
  id: string;
  title: string;
}

export interface RailLink {
  label: string;
  href: string;
  meta?: string;
}

export interface RailGroup {
  label: string;
  /** Compact groups render as a wrapped row of plain links. */
  compact?: boolean;
  entries: {
    id: string; // the section the entry anchors to
    title: string;
    desc?: string; // one-liner under the title, locked copy where Paul set it
    num?: string;
    ids?: string[]; // extra section ids that light this entry (a group span)
  }[];
}

// The page shell: fixed top bar, sticky rail listing the sections, masthead,
// then the sections themselves as children. Sections must be PPSection
// elements (or carry matching ids) for the rail links and tracking to work.
//
// The rail is more than navigation (Paul, 8 Aug evening): a plain-language
// line on what's coming, a small bio with the photo, and the free library,
// so the page reads as a small private site rather than a document.
export default function ProspectShell({
  clientName,
  eyebrow,
  title,
  titleHl,
  standfirst,
  sections,
  railGroups,
  railNote,
  bio,
  railLinks,
  children,
}: {
  clientName: string;
  eyebrow: string;
  title: string;
  titleHl?: string;
  standfirst: string | string[];
  sections: ShellSection[];
  /** When present, the rail renders these labelled groups instead of the flat
   *  section list ("/what we do" moved into the rail, Paul, 8 Aug late). The
   *  sections prop still drives the observer, so every body section must be
   *  listed there even if the rail shows it inside a group. */
  railGroups?: RailGroup[];
  railNote?: string;
  bio?: { photo: string; name: string; line: string };
  railLinks?: RailLink[];
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Rail highlight follows the section in view. Navigation aid only, the
  // content renders in full regardless.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // A link can claim several section ids (data-ids), so a Capabilities
    // entry lights while any of its demonstrations is in view.
    const links = new Map<string, HTMLAnchorElement[]>();
    root
      .querySelectorAll<HTMLAnchorElement>(".pps-rail a[data-section]")
      .forEach((a) => {
        const ids = (a.dataset.ids || a.dataset.section || "").split(",");
        ids.forEach((id) => {
          if (!id) return;
          links.set(id, [...(links.get(id) || []), a]);
        });
      });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const on = links.get(entry.target.id);
          if (!on) continue;
          root
            .querySelectorAll<HTMLAnchorElement>(".pps-rail a[data-section]")
            .forEach((a) => (a.dataset.active = "0"));
          on.forEach((a) => (a.dataset.active = "1"));
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
            {railNote && <p className="pps-railnote">{railNote}</p>}
            <nav className="pps-rail">
              {railGroups ? (
                railGroups.map((g) =>
                  g.compact ? (
                    <div key={g.label} className="pps-railgroup pps-railmini">
                      <p>{g.label}</p>
                      <div className="pps-railmini-row">
                        {g.entries.map((e) => (
                          <a
                            key={e.id}
                            href={`#${e.id}`}
                            data-section={e.id}
                            data-ids={(e.ids || [e.id]).join(",")}
                          >
                            {e.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                  <div key={g.label} className="pps-railgroup">
                    <p>{g.label}</p>
                    {g.entries.map((e, i) => (
                      <a
                        key={e.id}
                        href={`#${e.id}`}
                        data-section={e.id}
                        data-ids={(e.ids || [e.id]).join(",")}
                      >
                        <span className="pps-rail-k">
                          {e.num ?? String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="pps-rail-dot" />
                        <span>
                          {e.title}
                          {e.desc && (
                            <span className="pps-rail-desc">{e.desc}</span>
                          )}
                        </span>
                      </a>
                    ))}
                  </div>
                  )
                )
              ) : (
                <>
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
                </>
              )}
            </nav>
            {bio && (
              <div className="pps-bio">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={bio.photo} alt={bio.name} className="pps-bio-photo" />
                <div>
                  <p className="pps-bio-name">{bio.name}</p>
                  <p className="pps-bio-line">{bio.line}</p>
                </div>
              </div>
            )}
            {railLinks && railLinks.length > 0 && (
              <div className="pps-raillinks">
                <p>/free to take</p>
                {railLinks.map((l) => (
                  <a key={l.href} href={l.href}>
                    <span>{l.label}</span>
                    {l.meta && <span className="pps-raillink-meta">{l.meta}</span>}
                  </a>
                ))}
              </div>
            )}
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
