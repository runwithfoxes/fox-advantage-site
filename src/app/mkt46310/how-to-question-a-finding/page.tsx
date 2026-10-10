import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { checkAuth } from "../actions";
import ModuleDoor from "../ModuleDoor";
import "../../zorro/zorro.css";
import "../mkt46310.css";

export const metadata: Metadata = {
  title: "How to question a finding \\ AI and Digital Marketing Strategy \\ Run with Foxes",
  description: "A reading for class 1 of the UCD module MKT46310, autumn 2026.",
  robots: { index: false, follow: false },
};

/* /mkt46310/how-to-question-a-finding. A reading for class 1, behind the same door as the module page.
   The words are Jess's file in paul-hub, clients/ucd/courses/mkt46310-harriet/how-to-question-a-finding-class-1.md
   (hub commit 614f4a4ef). Change the words there first, then here. No client is named and no real figure
   is used. The one figure on the page, 73 of 85, is from Sam's findings, section 2. */

const STEPS: [string, ReactNode][] = [
  ["Start with the money.", "What do they spend? What do they get for it? What does each sale cost? Look at the whole period you have."],
  [
    "Find out what they already know.",
    "Split your findings in two: things that came from their own reports, and things you found outside. Only the second kind is news to them. Read what the person running the work has already done before you say something is missing. If you think there is a gap, ask them about it.",
  ],
  [
    "Ask three things of every number.",
    "Where does it come from? What dates does it cover? What exactly does it count? Searches are different from people. A count is different from an estimate. And never use one month as your proof. Look at every month you have. To tell a real fall from a seasonal dip, compare the same month a year apart.",
  ],
  [
    "When a number falls, write down every possible cause before you pick one.",
    <>
      When sales stop growing there are four usual causes:
      <ul className="mk-qlist">
        <li>A rival is taking the customers.</li>
        <li>Fewer people want the thing.</li>
        <li>Advertising costs more for everyone.</li>
        <li>The offer is less attractive than it was.</li>
      </ul>
      For each one, write what points to it, what points away from it, and what you think. Then run two
      tests. If your story is that people moved from A to B, add A and B together for each year. If the
      total changes, people did not just move. And walk through your cause as a real person would live
      it. One wrong answer said that Google&rsquo;s AI summaries meant fewer searches. A person has to
      search to see the summary, so a summary can mean fewer clicks and it can&rsquo;t mean fewer
      searches.
    </>,
  ],
  [
    "A rate tells you what happened and nothing about why.",
    "A conversion rate says how many people bought. It says nothing about who they were or what they were thinking. Before you write “because”, ask what else would give the same number. If more than one thing would, say all of them.",
  ],
  [
    "Say how sure you are.",
    "One source is a hint. Two separate sources that agree is a finding. Mark every claim as one of three: their data, outside data, or your own thinking.",
  ],
  [
    "Work out the problem before you suggest a fix.",
    "The question is “what is going on here?” (Richard Rumelt’s question in Good Strategy Bad Strategy). Your answer is one view, with the facts behind it, what you have ruled out, and what would change your mind. For search, ask at which points a person who is deciding what to buy comes across this company, and at which points they do not.",
  ],
];

const CHECKS = [
  "Start with the claims that would cost most if they were wrong. Those are the ones your boss or client will repeat.",
  "For each claim, open the file it came from, now. If you can’t open it, cut the claim or say first that you have not checked it.",
  "Look for the line that proves you wrong. Search their documents for the opposite of what you are about to say. Look for a newer document that replaces the one you used.",
  "Check every “because” again, and every “before and after”.",
  "Count the sources behind each claim. Check that your sums add up.",
  "Ask whether the person running the work already knows this.",
];

const HABITS = [
  "Keep a list of what you said and then took back, and why. It shows you your own pattern.",
  "When someone challenges you, go and check before you either agree or argue back. Sometimes the check shows you were right.",
  "Show the numbers that go against your view as well as the ones that support it.",
];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const dev = process.env.NODE_ENV === "development" && sp.door === undefined;
  const authed = dev || (await checkAuth());
  if (!authed) return <ModuleDoor />;

  return (
    <div className="mod-shell mk">
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <Link href="/mkt46310" className="chapter-nav-back">
          &larr; Back to the module
        </Link>
      </header>

      <header className="mk-adshead">
        <p className="mod-eyebrow">UCD Smurfit &middot; MKT46310 &middot; Class 1</p>
        <h1 className="mod-h1">
          How to question a <span className="mod-hl">finding</span>
        </h1>
        <p className="mod-standfirst">
          Reporting on results is the kind of work the job ads ask for most. It is in 73 of the 85
          ads. To report on results you have to work out what happened and why. This is how to do
          that without fooling yourself.
        </p>
        <p className="mod-standfirst">
          It comes from a day spent working out why a company&rsquo;s search advertising had stopped
          working as well as it used to. Most of what follows began as a question Paul asked when an
          answer did not stand up.
        </p>
      </header>

      <main className="mk-q">
        <h2 className="mk-sub">One habit first.</h2>
        <p className="mod-body">
          Go back to the original. Open the real report or the real data and build your own table
          from it, month by month, before you write anything. Your notes and summaries are things
          you said earlier, and some of them will be wrong. In the steps below, &ldquo;they&rdquo; is
          the company you are working for.
        </p>

        <h2 className="mk-sub">Seven steps to work out what is going on.</h2>
        <ol className="mk-rows mk-rows-plain">
          {STEPS.map(([name, text], i) => (
            <li key={name}>
              <span className="mk-rk">{i + 1}</span>
              <span className="mk-rtext">
                <b className="mk-qname">{name}</b> {text}
              </span>
            </li>
          ))}
        </ol>

        <h2 className="mk-sub">Then try to prove yourself wrong.</h2>
        <p className="mod-body">Do this before anyone else sees your work.</p>
        <ol className="mk-rows mk-rows-plain" style={{ marginTop: 18 }}>
          {CHECKS.map((text, i) => (
            <li key={i}>
              <span className="mk-rk">{i + 1}</span>
              <span className="mk-rtext">{text}</span>
            </li>
          ))}
        </ol>
        <p className="mod-body mk-after">
          Send only the claims that passed these checks. If you already told someone the wrong
          version, tell them plainly.
        </p>
        <p className="mod-body">
          The last test: can you name the ways you tried to prove your answer wrong, and which parts
          were still true afterwards? If you can&rsquo;t name them, you didn&rsquo;t do it.
        </p>

        <h2 className="mk-sub">Three habits to keep.</h2>
        <ol className="mk-rows mk-rows-plain">
          {HABITS.map((text, i) => (
            <li key={i}>
              <span className="mk-rk">{i + 1}</span>
              <span className="mk-rtext">{text}</span>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
