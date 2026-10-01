import Link from "next/link";
import AccessForm from "../../resources/kit/AccessForm";
import j from "./essay-join.module.css";

/**
 * The sign-up beside an essay, and beside Lena's diary pieces (Paul, 30 Sep). Paul, 29 Sep 2026: "to left or right of essays on those pages, can we
 * have a neat email sign up, and need to say something about sign up to get reports, access to free
 * course, library (since essays can be read without)." Words agreed with him the same evening. Type
 * from the homepage's what's new list, as the About page. Posts to /api/access tagged "account".
 */
export default function EssayJoin() {
  return (
    /* data-ask: the whole box is a sign-up ask, so it is not shown to someone already signed up
       (1 Oct 2026, src/components/Known.tsx). */
    <div className={j.box} data-ask>
      {/* Paul, 30 Sep: not "free account", which sounds too heavy, and no need to say the essays are
          free. Just sign up, and what that gets you. */}
      <span className={j.lab}>/sign up</span>
      <p className={j.p}>
        Sign up to get our quarterly research reports, the library of prompts we use, and the free
        course, AI Fluency for Ambitious Marketers.
      </p>
      <AccessForm want="account" className={j.form} doneClassName={j.done} label="Sign up" done="You're in. The reports, the library and the course are open to you." />
      <span className={j.fine}>
        On the course already? <Link href="/signin">Sign in</Link> with the same email.
      </span>
    </div>
  );
}
