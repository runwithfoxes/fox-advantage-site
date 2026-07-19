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
};

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
