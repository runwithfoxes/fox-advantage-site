"use client";

import { useEffect, useState } from "react";
import dp from "../diary/diary-page.module.css";
import r from "./read.module.css";

/* The rail, in the diary's own styles (dp.rail), with the scroll marking the course page's Rail does
   (src/app/mkt46310/Rail.tsx): the item whose section has reached 30% down the screen is marked. With no
   script every link still works. Hidden under 1180px by the diary's own rule; the band above does the
   jumping there. */
export default function ReadRail({ items }: { items: { id: string; label: string }[] }) {
  const [here, setHere] = useState(0);
  useEffect(() => {
    const read = () => {
      const line = window.innerHeight * 0.3;
      let c = 0;
      items.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) c = i;
      });
      setHere(c);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [items]);
  return (
    <nav className={`${dp.rail} ${r.rail}`} aria-label="Sections">
      {items.map((it, i) => (
        <a key={it.id} href={`#${it.id}`} className={i === here ? r.here : undefined} aria-current={i === here ? "true" : undefined}>
          {it.label}
        </a>
      ))}
    </nav>
  );
}
