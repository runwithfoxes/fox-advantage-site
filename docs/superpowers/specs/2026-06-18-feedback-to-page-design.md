# Feedback-to-page - design

**Date:** 2026-06-18
**Owner:** Paul Dervan / Run with Foxes
**Status:** Approved (design), pending implementation plan

## Goal

When Paul gets a feedback email from a client, he can route that feedback onto
the client's private page as a Q&A accordion, without hand-coding it each time.
The same format applies to every client page.

This came out of the SoftCo page (18 Jun 2026), where Daragh's feedback and
Paul's replies were captured by hand as a Q&A accordion. That accordion is the
agreed format; this spec makes it reusable and email-driven.

## Hard constraints (non-negotiable)

1. **Nothing goes live for the client to see until Paul has explicitly approved
   it.** The deploy step (commit + push to `main` = live) is gated on Paul's
   "yes" in-session. Before that, Paul reviews locally (screenshot or
   `npm run dev`). No auto-publish, ever.
2. **Never fabricate Paul's answers.** Client points are paired with Paul's
   actual replies from the thread, verbatim. A point Paul has not answered is
   captured with a blank answer (`a: ""`) that renders as "pending" - it is not
   filled with an invented or suggested answer.
3. **Verbatim capture.** Client questions and Paul's answers are taken word for
   word from the email thread. No paraphrasing, no added "nuance".
4. **Brand/voice rules hold** (no em dashes, no rounded corners, light mode,
   fox only on cream) for any framing copy the engine renders.

## Part 1 - reusable `feedback` block in the shared engine

Add a new section `kind: "feedback"` to the shared client-page engine so any
client's `data.ts` can render the accordion.

**Files:**
- `src/app/clients/_components/ClientWorkspace.tsx` - add the `Feedback` type to
  the `Work` union and a renderer (the accordion: question headers with +/−,
  click to expand the answer, grouped questions supported, optional framing
  intro line and closing note).
- `src/app/clients/_components/workspace.css` - port the accordion styles from
  `src/app/clients/softco/softco.css` (`.sc-acc*`, `.sc-fb-intro`,
  `.sc-fb-note`), renamed to the engine's prefix convention.

**Data shape (in `data.ts`):**
```ts
{ title: "Feedback & responses", kind: "feedback",
  date: "2026-06-18",          // the feedback round date; shown as the badge
  intro: "Paul's framing line, verbatim",   // optional
  items: [
    { q: ["client point line 1", "line 2"], a: "Paul's verbatim answer" },
    { q: ["an unanswered point"], a: "" },   // "" -> renders "pending"
  ],
  note: "Next step agreed: …",  // optional closing line
}
```
- `q` is an array so two client points sharing one answer render as one row
  (matches how Paul groups his replies).
- Multiple rounds stack as separate `feedback` sections, newest on top.

## Part 2 - feedback-capture flow in the `/client-page` skill

The `/client-page` skill already owns client pages and `data.ts`, so the capture
flow is added there (not a new skill).

**Trigger:** Paul says, in any session, e.g. *"pull the latest SoftCo feedback
and update the page."*

**Steps:**
1. **Find the thread** - use the Gmail MCP to search for the most recent thread
   with that client (by known contact / company domain from the client's
   `data.ts` or CONTEXT.md).
2. **Confirm before acting** - show Paul the candidate thread (subject, date,
   participants, a short preview) and wait for "yes, that one." Never parse a
   thread Paul hasn't confirmed.
3. **Parse** - extract the client's points as questions; pair Paul's replies in
   the thread as answers, verbatim. Group two points under one answer where
   Paul's reply does. Unanswered points → `a: ""`.
4. **Write** - add a new dated `feedback` section to the client's `data.ts`
   (newest on top), bump `meta.lastUpdated`.
5. **Review** - screenshot the rendered section (or `npm run dev`); Paul fills
   any pending answers in-session and edits anything mis-parsed.
6. **Deploy on approval only** - `git branch --show-current` must be `main`,
   then commit + push. This step runs only after Paul's explicit "ship it".

**Email source:** the connected Gmail MCP (`pdervan@gmail.com`).

## Part 3 - migrate SoftCo onto the shared engine

SoftCo's page is the old bespoke `SoftcoClient.tsx`, not the shared engine.
To put this format on all client pages including SoftCo:
- Create `src/app/clients/softco/data.ts` modelling the existing SoftCo page
  content (deliverables tracker + all work sections + the feedback round already
  shipped) in the shared `data.ts` shape.
- Re-point `src/app/clients/softco/page.tsx` to render via `ClientWorkspace`.
- Retire `SoftcoClient.tsx` and `softco.css` once parity is verified (keep until
  a screenshot confirms the migrated page matches the live one).
- The feedback round captured on 18 Jun moves into the new `feedback` section
  verbatim - no content change visible to the client.

## Out of scope (explicitly not building)

- Fully automatic inbox watching / auto-publish (Paul chose human-triggered).
- Drafting or suggesting answers in Paul's voice (Paul chose verbatim-or-blank).
- Gmail labels or a forwarding address (Paul chose by-name-in-session).

## Verification

- `npx tsc --noEmit` passes after each part.
- The migrated SoftCo page is screenshot-compared to the current live page for
  parity before `SoftcoClient.tsx` is retired.
- A dry run of the capture flow on the real SoftCo thread reproduces the
  18 Jun accordion content exactly.
