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
        <button type="submit">Create a free account</button>
      </form>
      <span className={n.hjFine}>
        Free research, trackers and the course in one account. Already have one? <a href="#">Sign in</a>
      </span>
    </div>
  );
}
