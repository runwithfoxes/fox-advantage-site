"use client";

import { useState } from "react";
import { ASK } from "./courseCopy";

/**
 * THE SIGNUP PILL. One pill holding both fields - nothing to click open, nothing that
 * reads as a form. It appears three times: the hero, inside a module card, and again
 * at the foot.
 *
 * 🔴 THIS FIXES THE LIVE DEFECT B FOUND AND PROVED (BRIEF-A §5).
 *
 * The old submitSignup was fire-and-forget: the response was never read and the
 * caller marked the form done unconditionally. B drove it and captured
 *
 *     network calls made: []          <- none
 *     form marked "done":  true       <- visitor told "You're in"
 *
 * The endpoint was also `window.COURSE_SIGNUP_ENDPOINT || null`, captured once at
 * mount, so setting the global afterwards did nothing, silently. The configurable
 * global existed because the route did not; it does now, same-origin, so there is
 * nothing to sequence and the path is hardcoded.
 *
 * B's route contract:
 *   200 {"ok":true,"door":"interest"}                  normal
 *   200 {"ok":true,"door":"interest","already":true}   already on the list - SUCCESS
 *   400 {"ok":false,"error":"email"}                   malformed, ask them to check
 *   500 {"ok":false,"error":"server"}                  our fault, say we will fix it
 *
 * ⚠️ `already:true` IS A SUCCESS AND MUST READ AS ONE. Double submit and
 * refresh-mid-submit both resolve to it, deliberately as a 200. The visitor did
 * nothing wrong and must not be told they did.
 */
const SIGNUP_ENDPOINT = "/api/course-signup";

/* There was no email validation on the page at all, so a typo submitted silently.
   Deliberately permissive - this catches the typo, the route is the real judge. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type SignupSource = "hero" | "card" | "foot";

export type SignupPayload = {
  first_name: string;
  email: string;
  signup_source: SignupSource;
  /**
   * ⭐ THE ONE THING THAT CANNOT BE RECONSTRUCTED LATER. Someone who signs up from
   * the "System thinking" card has told you WHY they came, and that is only knowable
   * at the point of intent. It is what lets Paul mail them on 2 November because
   * module 4 is the thing that pulled them in. Capture it or lose it.
   */
  signup_module?: number;
  signup_module_lands?: string;
  /**
   * ⭐ THE TRAP. A field no human ever fills, because no human ever sees it: it
   * is positioned off-screen, out of the tab order and hidden from the
   * accessibility tree. Bots fill every input they find in the DOM, so a
   * non-empty value here is the single most reliable "this is not a person"
   * signal available without putting a puzzle in front of a real visitor.
   *
   * Named `company_url` on purpose. Call it `website` or `address` and a
   * password manager will helpfully autofill it, which would silently reject
   * real people - the one way this technique goes wrong.
   */
  company_url?: string;
  /**
   * ⭐ META'S CLICK ID, read off the URL, never stored. Present only when the
   * visitor arrived from a Facebook or Instagram ad, because Meta appends
   * `?fbclid=...` to the landing URL (the ads point at `/course/fb`, and the
   * rewrite preserves the query string).
   *
   * The route forwards it to Meta's Conversions API so a signup can be matched
   * back to the ad that caused it. Without it the conversion is unattributed
   * and cannot tell one creative from another.
   */
  fbclid?: string;
  /** the page the signup happened on, so the event carries a source URL */
  page_url?: string;
};

/**
 * ⛔ READ FROM THE URL, DO NOT PERSIST. Not sessionStorage, not localStorage,
 * not a cookie.
 *
 * This site stores nothing on a visitor's device and therefore needs no consent
 * banner - that is a deliberate position, not an omission. Reading a query
 * parameter is not storage and does not touch it. Writing the click id into
 * sessionStorage to survive navigation WOULD be storage under ePrivacy, and
 * would drag a banner in behind it for a few points of attribution.
 *
 * The cost of not persisting: someone who lands on /course/fb, navigates away
 * and comes back before signing up loses their attribution. Accepted. The form
 * sits on the landing page itself, so the common path keeps it.
 */
function readFbclid(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = new URLSearchParams(window.location.search).get("fbclid")?.trim();
  return raw ? raw : undefined;
}

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; which: "email" | "server" };

async function send(payload: SignupPayload): Promise<State> {
  let res: Response;
  try {
    res = await fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* offline, DNS, route missing. Our fault as far as the visitor is concerned. */
    return { kind: "error", which: "server" };
  }

  let body: { ok?: boolean; error?: string } | null = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  /* already:true arrives inside a 200 with ok:true, so it needs no branch of its own -
     it is success, and treating it as anything else is the bug the contract exists to
     prevent. */
  if (res.ok && body?.ok) return { kind: "done" };
  if (res.status === 400 && body?.error === "email") return { kind: "error", which: "email" };
  return { kind: "error", which: "server" };
}

export default function CourseSignup({
  source,
  module,
  lands,
  doneText,
  note,
  compact = false,
}: {
  source: SignupSource;
  module?: number;
  lands?: string;
  /** what the visitor sees once it worked - specific to where they signed up */
  doneText: React.ReactNode;
  /** the quiet line beside or under the pill */
  note?: React.ReactNode;
  compact?: boolean;
}) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [first, setFirst] = useState("");
  const [email, setEmail] = useState("");
  /* Stays "" for every real visitor. See SignupPayload.company_url. */
  const [trap, setTrap] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "sending") return;

    if (!EMAIL.test(email.trim())) {
      setState({ kind: "error", which: "email" });
      return;
    }

    setState({ kind: "sending" });
    setState(
      await send({
        first_name: first.trim(),
        email: email.trim(),
        signup_source: source,
        company_url: trap,
        ...(() => {
          const fbclid = readFbclid();
          return fbclid ? { fbclid } : {};
        })(),
        ...(typeof window !== "undefined" ? { page_url: window.location.href } : {}),
        ...(module !== undefined ? { signup_module: module, signup_module_lands: lands } : {}),
      }),
    );
  }

  if (state.kind === "done") {
    return <div className={"co-join co-join-done" + (compact ? " co-join-compact" : "")}>{doneText}</div>;
  }

  return (
    <div className={"co-join" + (compact ? " co-join-compact" : "")}>
      <form className="co-joinbar" onSubmit={onSubmit} noValidate>
        {/*
          THE TRAP. Four things here are load-bearing, do not "tidy" any of them:
            - positioned off-screen, NOT display:none. A hidden required field can
              make a browser refuse to submit and give no visible reason.
            - never `required`, for the same reason.
            - tabIndex={-1} + aria-hidden keep it out of the tab order and out of
              the accessibility tree, so a screen reader user never meets it. A
              careless honeypot is an accessibility trap; this one is not.
            - the name is deliberately unfamiliar to autofill heuristics.
        */}
        <input
          type="text"
          name="company_url"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <input
          type="text"
          className="nm"
          placeholder="First name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          required
        />
        <span className="sep" />
        <input
          type="email"
          className="em"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            /* clear a stale error the moment they start fixing it */
            if (state.kind === "error") setState({ kind: "idle" });
          }}
          required
        />
        <button type="submit" aria-label="Sign up" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "…" : "→"}
        </button>
      </form>
      {state.kind === "error" ? (
        <span className="co-joinerr" role="alert">
          {state.which === "email" ? ASK.errEmail : ASK.errServer}
        </span>
      ) : (
        note
      )}
    </div>
  );
}
