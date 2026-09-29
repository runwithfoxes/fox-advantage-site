import Link from "next/link";
import AccessForm from "../../resources/kit/AccessForm";
import j from "./essay-join.module.css";

/**
 * The sign-up beside an essay. Paul, 29 Sep 2026: "to left or right of essays on those pages, can we
 * have a neat email sign up, and need to say something about sign up to get reports, access to free
 * course, library (since essays can be read without)." Words agreed with him the same evening. Type
 * from the homepage's what's new list, as the About page. Posts to /api/access tagged "account".
 */
export default function EssayJoin() {
  return (
    <div className={j.box}>
      <span className={j.lab}>/free account</span>
      <p className={j.p}>
        The essays are free to read. A free account adds the rest: our quarterly research reports with
        their data, the library of prompts and tools we use, and the free course, AI Fluency for
        Ambitious Marketers.
      </p>
      <AccessForm want="account" className={j.form} doneClassName={j.done} label="Get free access" done="You're in. The reports, the library and the course are open to you." />
      <span className={j.fine}>
        One account for everything. On the course already? <Link href="/signin">Sign in</Link> with the same email.
      </span>
    </div>
  );
}
