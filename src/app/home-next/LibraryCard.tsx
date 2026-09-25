"use client";

import { useRef, useState } from "react";
import s from "../resources/hero.module.css";
import n from "./next.module.css";
import type { Line } from "../resources/HubHero";

/**
 * The header card, as it is on the Resource hub. Paul, 25 Sep 2026: "the proper card UX from
 * the original research. There's a card on the right, and it's just a flow of our research
 * reports." Same markup and classes as the panel in HubHero.tsx: 160s a pass, paused on hover,
 * one-line email sign-up at the foot. ⛔ MOCKUP: the form posts nowhere.
 */
export default function LibraryCard({ lines, join = true }: { lines: Line[]; join?: boolean }) {
  const [done, setDone] = useState(false);
  /* Paul, 25 Sep: "Can the card be grabable." It lifts and moves with the pointer anywhere on
     the card except the email box; a press that moves less than 5px is still a click, so the
     links keep working. It stays where it is dropped. */
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("input,button,form")) return;
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    d.moved = true;
    setDragging(true);
    setPos({ x: d.ox + dx, y: d.oy + dy });
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (d?.moved) {
      // swallow the click that follows a drag, so dropping the card does not open a link
      const stop = (ev: Event) => { ev.preventDefault(); ev.stopPropagation(); };
      e.currentTarget.addEventListener("click", stop, { capture: true, once: true });
    }
  };
  return (
    <div
      className={`${s.panel} ${n.darkGlass} ${n.grab} ${dragging ? n.grabbing : ""}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
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
      {!join ? null : done ? (
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
