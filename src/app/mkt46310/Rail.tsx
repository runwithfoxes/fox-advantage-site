"use client";

import { useEffect, useState } from "react";

/* The rail: one item for every class, the way a course page has one for every section.
   It marks the class that is on screen, and under that class it lists the parts of the
   class when the class has parts. With no script every link still works. */
export type RailClass = { short: string; parts?: string[] };

export default function Rail({ classes }: { classes: RailClass[] }) {
  const [here, setHere] = useState(0);
  const [part, setPart] = useState(0);
  /* The parts open once the class has been scrolled into, so the closed rail fits a
     short screen at the top of the page. */
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const read = () => {
      const line = window.innerHeight * 0.3;
      let c = 0;
      const first = document.getElementById("c1");
      setOpen(!!first && first.getBoundingClientRect().top <= line);
      classes.forEach((_, i) => {
        const el = document.getElementById(`c${i + 1}`);
        if (el && el.getBoundingClientRect().top <= line) c = i;
      });
      let p = 0;
      (classes[c].parts || []).forEach((_, j) => {
        const el = document.getElementById(`c${c + 1}p${j + 1}`);
        if (el && el.getBoundingClientRect().top <= line) p = j;
      });
      setHere(c);
      setPart(p);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [classes]);

  return (
    <nav className="mod-rail mk-rail" aria-label="The classes">
      <p>/the classes</p>
      {classes.map((c, i) => (
        <div key={i} className="mk-railitem" data-here={i === here ? "1" : "0"}>
          <a href={`#c${i + 1}`} aria-current={i === here ? "true" : undefined}>
            <span className="mod-k">{String(i + 1).padStart(2, "0")}</span>
            <span className="mod-dot" />
            <span>{c.short}</span>
          </a>
          {c.parts && i === here && open ? (
            <div className="mk-railparts">
              {c.parts.map((p, j) => (
                <a key={p} href={`#c${i + 1}p${j + 1}`} data-here={j === part ? "1" : "0"}>
                  {p}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ))}
      <a className="mod-rail-lib" href="#files">
        /the files
      </a>
    </nav>
  );
}
