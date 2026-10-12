"use client";

import Link from "next/link";
import { useState } from "react";
import r from "./read.module.css";

/* The list under the hero, in the homepage's own "what's new" language: a short row of pictures, each
   one a piece's own picture at its real shape, then every other piece as a row on a hairline. Paul,
   12 Oct 2026, on a grid where every card had a picture: "you just cropped images. They're all stuck
   together. Like, where's the art direction?" So a piece with no wide picture of its own is a row of
   type, and no picture is ever repeated or cut. */
export type Card = { label: string; title: string; dek: string; day: string; href: string; img: string | null };

const STEP = 16;

export default function ReadList({ cards, total }: { cards: Card[]; total: number }) {
  const pics = cards.filter((c) => c.img).slice(0, 9);
  /* nine pictures in three rows, as Substack shows them, then one link to everything else (Paul, 12 Oct:
     "substack show 9, not 3, and then link off to see all after"). A view with fewer than three pictures
     of its own (the diary, today) is a list of type from the start. */
  const leads = pics.length >= 3 ? pics : [];
  const rows = cards.filter((c) => !leads.includes(c));
  const [open, setOpen] = useState(leads.length === 0);
  const [n, setN] = useState(STEP);

  return (
    <>
      {leads.length ? (
        <ul className={r.leads}>
          {leads.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className={r.card}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={r.cardImg} src={c.img!} alt="" loading="lazy" />
                <span className={r.label}>{c.label}</span>
                <span className={r.cardTitle}>{c.title}</span>
                {c.dek ? <span className={r.cardDek}>{c.dek}</span> : null}
                <span className={r.day}>{c.day}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {!open && rows.length ? (
        <button type="button" className={r.moreBtn} onClick={() => setOpen(true)}>
          See all {total} →
        </button>
      ) : null}

      {open ? (
        <ul className={r.rows}>
          {rows.slice(0, n).map((c) => (
            <li key={c.href}>
              <Link href={c.href} className={r.row}>
                <span className={r.label}>{c.label}</span>
                <span className={r.rowTitle}>{c.title}</span>
                <span className={r.day}>{c.day}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {open && rows.length > n ? (
        <button type="button" className={r.moreBtn} onClick={() => setN(n + STEP)}>
          Show more ({rows.length - n} left)
        </button>
      ) : null}
    </>
  );
}
