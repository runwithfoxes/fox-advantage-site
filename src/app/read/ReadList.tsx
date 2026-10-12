"use client";

import Link from "next/link";
import { useState } from "react";
import r from "./read.module.css";

/* The list under the newest piece: one row of sections that filters the cards where they sit, with no
   jump down the page. The choice is kept in the address (?s=diary) so a filtered view can be sent to
   somebody; the page reads it on the way in, so that view opens filtered even with no script. */
export type Sec = { key: string; name: string; who: string; role: string; line: string; route: string };
export type Card = { key: string; title: string; dek: string; day: string; href: string; img: string | null };

const STEP = 12;

export default function ReadList({ secs, cards, topHref, start }: { secs: Sec[]; cards: Card[]; topHref: string; start: string }) {
  const [on, setOn] = useState(start);
  const [n, setN] = useState(STEP);

  const pick = (key: string) => {
    setOn(key);
    setN(STEP);
    const u = new URL(window.location.href);
    if (key === "all") u.searchParams.delete("s");
    else u.searchParams.set("s", key);
    window.history.replaceState(null, "", u);
  };

  const sec = secs.find((s) => s.key === on);
  /* the piece printed in full above is left out of All, and kept in its own section's list */
  const shown = on === "all" ? cards.filter((c) => c.href !== topHref) : cards.filter((c) => c.key === on);
  const name = (k: string) => secs.find((s) => s.key === k);

  return (
    <section className={r.list} id="pieces" aria-label="Everything to read">
      <div className={r.band} role="group" aria-label="Show a section">
        <button type="button" className={`${r.bandItem} ${on === "all" ? r.bandOn : ""}`} aria-pressed={on === "all"} onClick={() => pick("all")}>
          <span className={r.bandName}>All</span>
          <span className={r.bandWho}>Newest first</span>
        </button>
        {secs.map((s) => (
          <button key={s.key} type="button" className={`${r.bandItem} ${on === s.key ? r.bandOn : ""}`} aria-pressed={on === s.key} onClick={() => pick(s.key)}>
            <span className={r.bandName}>{s.name}</span>
            <span className={r.bandWho}>{s.who}{s.role ? <i> · {s.role}</i> : null}</span>
          </button>
        ))}
      </div>

      {sec ? (
        <p className={r.about}>
          {sec.line} <Link href={sec.route}>The {sec.name} page →</Link>
        </p>
      ) : null}

      <ul className={r.grid}>
        {shown.slice(0, n).map((c) => {
          const s = name(c.key);
          return (
            <li key={c.href}>
              <Link href={c.href} className={r.card}>
                {c.img ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img className={r.cardImg} src={c.img} alt="" loading="lazy" />
                ) : null}
                <span className={r.meta}>{s?.name} · {s?.who}</span>
                <span className={r.cardTitle}>{c.title}</span>
                {c.dek ? <span className={r.cardDek}>{c.dek}</span> : null}
                <span className={r.date}>{c.day}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {shown.length > n ? (
        <button type="button" className={r.moreBtn} onClick={() => setN(n + STEP)}>
          Show more ({shown.length - n} left)
        </button>
      ) : null}
    </section>
  );
}
