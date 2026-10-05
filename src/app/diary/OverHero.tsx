"use client";
import { useEffect } from "react";

/**
 * /diary: the picture runs to the very top of the page with the menu sitting on it (Paul, 5 Oct:
 * "should image go all way to top with nav in it?"). The menu bar is clear while the picture is
 * behind it and turns solid once the reader has scrolled into the writing, so it never sits over text.
 */
export default function OverHero() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-diary-root]");
    const hero = document.querySelector<HTMLElement>("[data-diary-hero]");
    if (!root || !hero) return;
    const set = () => {
      root.dataset.over = window.scrollY < hero.offsetHeight - 80 ? "1" : "0";
    };
    set();
    window.addEventListener("scroll", set, { passive: true });
    window.addEventListener("resize", set);
    return () => {
      window.removeEventListener("scroll", set);
      window.removeEventListener("resize", set);
    };
  }, []);
  return null;
}
