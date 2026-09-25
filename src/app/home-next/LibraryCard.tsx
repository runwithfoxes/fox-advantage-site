"use client";

import { useState } from "react";
import s from "../resources/hero.module.css";
import n from "./next.module.css";
import type { Line } from "../resources/HubHero";

/**
 * The header card, as it is on the Resource hub. Paul, 25 Sep 2026: "the proper card UX from
 * the original research. There's a card on the right, and it's just a flow of our research
 * reports." Same markup and classes as the panel in HubHero.tsx: 160s a pass, paused on hover,
 * one-line email sign-up at the foot. ⛔ MOCKUP: the form posts nowhere.
 */
export default function LibraryCard({ lines }: { lines: Line[] }) {
  const [done, setDone] = useState(false);
  return (
    <div className={`${s.panel} ${n.darkGlass}`}>
      <div className={s.head}>
        <span className={s.headLab}>Library</span>
        <span className={s.headSub}>Research and papers</span>
        <span className={s.headCount}>{lines.length} pieces</span>
      </div>
      <div className={s.scroll}>
        <div className={s.scrollInner}>
          {[...lines, ...lines].map((l, i) => (
            <a key={i} className={s.line} href={l.href ?? "#"} aria-hidden={i >= lines.length ? true : undefined} tabIndex={i >= lines.length ? -1 : undefined}>
              <span className={s.lineLab}>{l.label}</span>
              <span className={s.lineT}>{l.title}</span>
            </a>
          ))}
        </div>
      </div>
      {done ? (
        <p className={s.done}>You are on the list.</p>
      ) : (
        <form
          className={s.join}
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <input type="email" required placeholder="Get new research: you@company.ie" aria-label="Work email" />
          <button type="submit" aria-label="Send me new research">→</button>
        </form>
      )}
    </div>
  );
}
