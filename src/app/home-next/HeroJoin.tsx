"use client";

import n from "./next.module.css";
import AccessForm from "../resources/kit/AccessForm";

/** The hero's one ask: a free account. Posts to /api/access tagged "account" (27 Sep). */
export default function HeroJoin() {
  return (
    <div className={n.hj}>
      <AccessForm want="account" className={n.hjForm} doneClassName={n.hjDone} done="You're in. Every report, the library and the course are open to you." />
      <span className={n.hjFine}>
        Every report, tracker and the course, in one free account. Already have one? <a href="#">Sign in</a>
      </span>
    </div>
  );
}
