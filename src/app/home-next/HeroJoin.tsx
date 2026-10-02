"use client";

import Link from "next/link";
import n from "./next.module.css";
import AccessForm from "../resources/kit/AccessForm";

/**
 * The hero's one ask: sign up. Posts to /api/access tagged "account" (27 Sep).
 * Paul, 29 Sep 2026: someone back for the course sees a new homepage and "just thinks that it's a new
 * thing altogether". So a visitor this browser already knows gets Welcome back and the way in, and
 * everyone else is told, under the box, that the course signs in with the same email.
 */
export default function HeroJoin({ known = false }: { known?: boolean }) {
  if (known) {
    return (
      <div className={n.hj}>
        <p className={n.hjBack}>Welcome back.</p>
        <div className={n.hjGo}>
          <Link href="/course" className={n.hjGoMain}>Continue the course →</Link>
          <Link href="/course/everything" className={n.hjGoGhost}>Open the library →</Link>
        </div>
      </div>
    );
  }
  return (
    <div className={n.hj}>
      {/* Paul, 30 Sep: "use sign up in wording", not "free account" or "full access", as beside the essays. */}
      <AccessForm want="account" className={n.hjForm} doneClassName={n.hjDone} label="Sign up" done="You're in. The reports, the library and the course are open to you." />
      <span className={n.hjFine}>
        Sign up to get the reports, the library and the course. On the course already? <Link href="/signin">Sign in</Link> with the same email.
      </span>
    </div>
  );
}
