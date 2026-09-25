"use client";

import { useState } from "react";
import n from "./next.module.css";

/** The hero's one ask: a free account, with sign-in beside it. MOCKUP: posts nowhere. */
export default function HeroJoin() {
  const [done, setDone] = useState(false);
  if (done) return <p className={n.hjDone}>You&rsquo;re in. Check your inbox to finish signing up.</p>;
  return (
    <div className={n.hj}>
      <form
        className={n.hjForm}
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <input type="email" required placeholder="you@company.ie" aria-label="Work email" />
        <button type="submit">Get full access, free</button>
      </form>
      <span className={n.hjFine}>
        Every report, tracker and the course, in one free account. Already have one? <a href="#">Sign in</a>
      </span>
    </div>
  );
}
