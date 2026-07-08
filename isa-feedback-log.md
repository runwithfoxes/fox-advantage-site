# Isa Feedback Log

Recurring feedback that visitors raise in the Isa chatbot, plus the status of each so it
isn't re-flagged as "new" every time `/isa` Path 1 runs.

**How to use:** when reviewing chatbot messages, read this file FIRST. Cross off anything
already `FIXED` or `WONTFIX`. Only surface items that are `OPEN`, or genuinely new feedback
not listed here. When something gets actioned, update its status + date here that turn.

Status key: `OPEN` = still to do · `FIXED` = done, don't re-flag · `WONTFIX` = deliberate, don't re-flag

| Item | Status | Date | Notes |
|------|--------|------|-------|
| Privacy policy page | FIXED | 2026-06 | `/privacy` live, linked from footer, Isa knowledge updated (commit e2f07dd) |
| Cookie policy page | FIXED | 2026-06 | `/cookies` live, footer link (commit da64ea4) |
| Default Vercel favicon | FIXED | 2026-06-21 | Replaced `src/app/favicon.ico` with the fox favicon. Flagged by a visitor 10 Jun |
| Can't close the chat / chat blocks screen | FIXED | 2026-07-01 | Visitor couldn't find the close button; Isa wrongly said scroll/refresh. Added a fact to `chat-system-prompt.ts` so she points to the little X in the top-right corner of the chat. Live-verified (commit 039e9ae) |
| Deflections open abrupt ("No idea. I'm an AI, not his calendar.") | FIXED | 2026-07-03 | Paul's feedback on the 3 Jul "Where is Paul today?" chat: the opening beat read as rude to the visitor. Rule added to `chat-system-prompt.ts` personality section: when Isa doesn't know something, the joke lands on Paul FIRST, never a blunt brush-off at the visitor |
| Can't SEE the X on mobile (keyboard hides the header) | FIXED | 2026-07-08 | Re-occurrence of the 1 Jul item on a phone: visitor told about the X replied "no there isnt". iOS Safari scrolls the fixed full-screen panel while the keyboard is up, pushing the header (and the X) off screen. Two fixes: `ChatWidget.tsx` blurs the input after send on touch devices so the keyboard dismisses and the header snaps back, and `chat-system-prompt.ts` gained a fallback fact (close the keyboard first, then look top right; refreshing the page closes the chat entirely) |

## New / open feedback to review

(none currently)
