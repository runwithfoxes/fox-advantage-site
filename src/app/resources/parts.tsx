import Link from "next/link";
import type { ReactNode } from "react";
import s from "./resources.module.css";
import { CATEGORIES, OWNER_LABEL, type Owner } from "./data";

/**
 * THE RESOURCES SHELL. The course module page, reused rather than redrawn: the book chapter
 * nav with the real logo, the two-column .mod-grid, the rail with the course title's slot
 * holding the section name, and the masthead under a 2px deep-sky rule.
 */
export function Shell({
  back,
  railTitle,
  railHref,
  railLabel,
  rail,
  railFoot,
  children,
}: {
  back: { href: string; label: string };
  railTitle: string;
  railHref: string;
  railLabel: string;
  rail: { href: string; k: string; t: string }[];
  railFoot?: ReactNode;
  children: ReactNode;
}) {
  const contents = (
    <>
      <p>{railLabel}</p>
      {rail.map((r) => (
        <a key={r.href} href={r.href}>
          <span className="mod-k">{r.k}</span>
          <span className="mod-dot" />
          <span>{r.t}</span>
        </a>
      ))}
      {railFoot}
    </>
  );
  return (
    <div className="mod-shell">
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <Link href={back.href} className="chapter-nav-back">
          {back.label}
        </Link>
      </header>
      <div className="mod-grid">
        <div className="mod-railcol">
          <Link href={railHref} className="mod-coursetitle">
            {railTitle}
          </Link>
          <nav className="mod-rail mod-rail-desk">{contents}</nav>
        </div>
        <div className="mod-maincol">{children}</div>
      </div>
      <div className={s.banner}>
        Mockup, 24 Sep 2026. GEO Ireland numbers are day one (23 Aug) and not signed off. Jobs numbers are the 24 Sep run, one day of data.
      </div>
    </div>
  );
}

/** A numbered section, the module item header verbatim: 01, a headline, OPEN on the right. */
export function Item({
  id,
  n,
  title,
  href,
  hint = "Open",
  children,
}: {
  id: string;
  n: number;
  title: string;
  href?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <article className="mod-item" id={id}>
      <div className="mod-itemtop">
        <span className="mod-n">{String(n).padStart(2, "0")}</span>
        <h2 className="mod-h3">{href ? <Link href={href}>{title}</Link> : title}</h2>
        {href ? (
          <Link href={href} className="mod-openhint">
            {hint}
          </Link>
        ) : null}
      </div>
      {children}
    </article>
  );
}

/** A figure in the module figure frame: dot grid, hairline border, a plate inside. */
export function Frame({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className={s.frame}>
      <div className={s.frameInner}>
        {label ? <span className={s.figlabel}>{label}</span> : null}
        {children}
      </div>
    </div>
  );
}

const ORDER: Owner[] = ["state", "middle", "other"];

export function OwnerKey({ counts = false }: { counts?: boolean }) {
  return (
    <div className={s.key}>
      {ORDER.map((o) => (
        <span key={o} className={s[o]} style={{ background: "none" }}>
          {OWNER_LABEL[o]}
          {counts ? `, ${CATEGORIES.filter((c) => c.owner === o).length}` : ""}
        </span>
      ))}
    </div>
  );
}

/** 41 cells, one per category, grouped by who AI names most. */
export function OwnerStrip() {
  return (
    <>
      <div className={s.strip} role="img" aria-label="Who AI names most in each of 41 categories">
        {ORDER.flatMap((o) =>
          CATEGORIES.filter((c) => c.owner === o).map((c) => (
            <i key={c.name} className={s[o]} title={`${c.name}: ${c.top}`} />
          )),
        )}
      </div>
      <OwnerKey counts />
    </>
  );
}

/** The 41-row chart, to scale, 0 to 1. */
export function CategoryBars() {
  return (
    <>
      <div className={s.bars}>
        {CATEGORIES.map((c) => {
          const inner = (
            <>
              <span className={s.cat}>{c.name}</span>
              <span className={s.track}>
                <span className={`${s.fill} ${s[c.owner]}`} style={{ width: `${c.rate * 100}%` }}>
                  <em>{c.top}</em>
                </span>
              </span>
              <span className={s.v}>{c.rate.toFixed(2)}</span>
            </>
          );
          return c.slug ? (
            <Link key={c.name} href={`/resources/geo-ireland/${c.slug}`} className={s.bar}>
              {inner}
            </Link>
          ) : (
            <div key={c.name} className={s.bar}>
              {inner}
            </div>
          );
        })}
      </div>
      <div className={s.axis}>
        <span />
        <div>
          <span>0</span>
          <span>0.25</span>
          <span>0.50</span>
          <span>0.75</span>
          <span>1.0</span>
        </div>
        <span />
      </div>
      <OwnerKey />
    </>
  );
}

export function CategoryChips() {
  return (
    <div className={s.cats}>
      {[...CATEGORIES]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) =>
          c.slug ? (
            <Link key={c.name} href={`/resources/geo-ireland/${c.slug}`}>
              {c.name.toLowerCase()}
            </Link>
          ) : (
            <span key={c.name}>{c.name.toLowerCase()}</span>
          ),
        )}
    </div>
  );
}
