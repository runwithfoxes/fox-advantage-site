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

Two optional fields are also added to `meta` (used by the capture flow's email
search, not rendered on the page):
```ts
feedbackContacts?: string[];  // client emails whose replies count as feedback
pageShareThread?: string;     // Gmail thread/message id of the page-share email
```

## Part 2 - feedback-capture flow in the `/client-page` skill

The `/client-page` skill already owns client pages and `data.ts`, so the capture
flow is added there (not a new skill).

**Trigger:** Paul says, in any session, e.g. *"pull the latest SoftCo feedback
and update the page."*

**Steps:**
1. **Find the thread** - see "Finding the right email" below.
2. **Confirm before acting** - show Paul the candidate thread(s) (subject, date,
   participants, a short preview) and wait for "yes, that one." Never parse a
   thread Paul hasn't confirmed.
3. **Parse** - see "Parsing long threads" below. Extract the client's points as
   questions; pair Paul's replies in the thread as answers, verbatim. Group two
   points under one answer where Paul's reply does. Unanswered points → `a: ""`.
4. **Write** - add a new dated `feedback` section to the client's `data.ts`
   (newest on top), bump `meta.lastUpdated`.
5. **Review** - screenshot the rendered section (or `npm run dev`); Paul fills
   any pending answers in-session and edits anything mis-parsed.
6. **Deploy on approval only** - `git branch --show-current` must be `main`,
   then commit + push. This step runs only after Paul's explicit "ship it".

**Email source:** the connected Gmail MCP (`pdervan@gmail.com`).

### Finding the right email

It is not "any email from these people, hope for the best." Three layers, in
order, with Paul's confirm (step 2) as the final disambiguator so the worst case
is "wrong candidate surfaced, Paul corrects it" - never "wrong feedback shipped."

1. **Anchor on the page-link thread (primary, high precision).** When Paul shares
   a client's page he sends its URL (`runwithfoxes.com/clients/{slug}`). That
   thread *is* the feedback thread; replies in it are feedback by definition.
   Search Gmail for the URL in the body, scoped to the client's contacts, and
   anchor on that thread. If `meta.pageShareThread` is set, use that id directly
   (exact, no text match needed).
2. **Fallback: recent client threads, ranked (lower precision).** If no anchor
   fires (feedback arrived in a fresh thread, vague subject, no link), list the
   most recent threads from `meta.feedbackContacts` / the client domain and rank
   by feedback signals: it is a reply, contains question marks, numbered/bulleted
   points, or words like *feedback / comments / thoughts / questions*.
3. **Always confirm (step 2).** Surface the top 1-3 candidates for Paul to pick.
   No silent selection.

This needs two new fields on `meta` in `data.ts` (see Part 1):
- **`feedbackContacts: string[]`** - client emails whose replies count
  (e.g. Daragh, John). Scopes the search; without it, search is by company
  domain only.
- **`pageShareThread?: string`** - optional Gmail thread/message id of the email
  where Paul shared the page, making the anchor exact rather than a body match.

### Parsing long threads

Feedback is usually buried in a long back-and-forth, not a clean single email.
The parser must:
- **Read the whole thread, message by message** (Gmail `get_thread`), not just
  the latest message - feedback can sit mid-thread, several replies down.
- **Strip quoted history** - remove quoted/forwarded blocks (`On ... wrote:`,
  `>` prefixes) so a point is captured once, from the message that first made it,
  not re-counted from every later quote of it.
- **Strip signatures, legal disclaimers and footers** - e.g. SoftCo's
  confidentiality/ISO footer, "Sent from my iPhone", social links. These are
  noise, never feedback.
- **Attribute by sender across the thread** - client addresses
  (`feedbackContacts` / domain) → questions; Paul's address → answers. Pair a
  client point with Paul's reply that addresses it (Paul often numbers his reply
  to the client's points - use that mapping when present).
- **Capture the round, not the whole history** - the newest exchange of
  client-points + Paul-replies. Earlier rounds already on the page are not
  re-added (de-dupe against existing `feedback` sections in `data.ts`).
- **Show Paul the extracted Q&A before writing** so any mis-attribution from a
  messy thread is caught at review, not on the live page.

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
