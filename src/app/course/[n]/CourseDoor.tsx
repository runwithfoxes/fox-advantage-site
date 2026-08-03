import Link from "next/link";
import CourseSignup from "../CourseSignup";

/**
 * THE EMAIL DOOR. Shown instead of a module when the visitor has no identity cookie.
 *
 * ⭐⭐ IT IS NOT A LOCK, AND BUILDING IT AS ONE WOULD BREAK THE THING IT IS FOR. Paul, 3 Aug
 * 2026: "i also don't mind people accessing these", and in the same conversation the actual
 * goal, "When Sarah or John is doing the course, I want to know what Sarah clicks on, what
 * she copies, pastes." Nobody is turned away. Anyone who gives an email is in, whether they
 * signed up in July or thirty seconds ago. The door exists to put a NAME on the behaviour,
 * because an anonymous click cannot trigger an email to Sarah.
 *
 * ⭐ SO IT REUSES CourseSignup RATHER THAN ASKING SEPARATELY. The route behind it already
 * treats an address it has seen before as a success with `already` set, which is exactly the
 * "I signed up months ago" case, and it already carries the honeypot, the validation and the
 * Klaviyo chain. A second form would have been a second thing to keep correct.
 *
 * ⛔ THE `note` IS PAUL'S APPROVED WORDING, 3 Aug 2026, and it is the consent. Do not
 * paraphrase it, shorten it, or move it below the button. He wrote "tailored to your
 * learning" himself; "we do not sell your data" is lifted from his live privacy policy
 * because the events DO go to Klaviyo, so a broader promise about sharing would have been
 * false; and the closing line is his correction, "they can unsubscribe from the emails. They
 * dont' need to email me."
 *
 * ⚠️ THE PRIVACY POLICY MUST KEEP SAYING THE SAME THING. A sentence on a door with nothing
 * behind it is the weaker version, and the two drifting apart is worse than either alone.
 */
export default function CourseDoor({
  n,
  title,
  when,
}: {
  n: number;
  title: string;
  when: string;
}) {
  return (
    <main className="mod-root">
      <header className="mod-masthead">
        <p className="mod-eyebrow">
          Module {n} of 6 &middot; Opens {when}
        </p>
        <h1 className="mod-h1">{title}</h1>
        <p className="mod-standfirst">
          The course is free. Pop in your email and you are straight in. If you have
          signed up before, the same address is all it takes.
        </p>
      </header>

      <CourseSignup
        source="card"
        module={n}
        lands={when}
        note={
          <>
            When you&rsquo;re in the course we record which lessons you open and what you
            copy or download, so the emails we send you are tailored to your learning. We
            do not sell your data. You can unsubscribe from any email.
          </>
        }
        /* ⭐ A LINK, NOT A RELOAD. The cookie is set by the response to the form post, so the
           SERVER has to render this page again before the module appears. Clicking a link the
           reader chose is honest about that; a scripted refresh would look like the page
           broke and recovered. */
        doneText={
          <>
            You&rsquo;re in. <Link href={`/course/${n}`}>Open {title}</Link>
          </>
        }
      />
    </main>
  );
}
