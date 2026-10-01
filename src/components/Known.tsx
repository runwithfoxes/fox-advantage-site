"use client";

import { useEffect } from "react";
import { KNOWN_KEY as KEY } from "@/lib/known";

/**
 * ONE ANSWER TO "IS THIS VISITOR ALREADY SIGNED UP?", FOR EVERY PAGE. 1 Oct 2026.
 *
 * Cato's red team, 30 Sep: a signed-in visitor was shown "Sign in" and a sign-up box on most pages,
 * because only the homepage, About, the library and the report read the cookie. The cookies are
 * httpOnly and most pages are static, so the page asks /api/me once per load and writes the answer
 * onto <html data-known="1">. The pages do the rest in CSS (known.css):
 *
 *   data-ask          a sign-up ask. Hidden for a known visitor.
 *   data-known-only   what a known visitor gets in its place. Hidden for everyone else.
 *
 * ⭐ WHY CSS AND NOT STATE. Both versions are in the HTML and the attribute picks one, so a static
 * page stays static and nothing re-renders. The answer is also kept in localStorage and put back by
 * a line in the <head> (layout.tsx) before the page paints, so a returning visitor never sees the
 * sign-up box flash up and vanish. The stored answer is only a head start: the real answer from
 * /api/me replaces it on every load, so a cleared cookie brings the asks back.
 *
 * ⛔ An ask that has just been filled in shows its own "You're in" line (data-done) and stays on
 * screen; known.css leaves any ask alone that contains one. Without that, signing up would make the
 * confirmation vanish with the form.
 */
function write(known: boolean) {
  try {
    if (known) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  } catch {
    /* private mode: the attribute alone still works for this page */
  }
  if (known) document.documentElement.dataset.known = "1";
  else delete document.documentElement.dataset.known;
}

/** Called by the sign-up forms the moment a sign-up succeeds, so the nav says so without a reload. */
export function markKnown() {
  write(true);
}

export default function KnownProbe() {
  useEffect(() => {
    let live = true;
    fetch("/api/me", { cache: "no-store", credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (live && j && typeof j.known === "boolean") write(j.known);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  return null;
}
