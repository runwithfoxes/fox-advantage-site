# Weekly build-in-public production

The Run with Foxes version of Tibo's idea, three swaps: it reads the same commit
stream, but pulls the **reasoning from the notes** too, picks what carries a
**lesson for marketers** (not a feature to announce), and writes it in **Paul's
voice** for Paul's own channels. Teach, don't sell.

Every Monday it:

1. reads the last 7 days of commits **and** the added lines in the notes files
   (`CLAUDE.md`, `CONTEXT.md`, `HANDOVER.md`) where the *why* is recorded,
2. asks Claude to select the 1-2 changes with a real lesson for a marketing
   team, and to write a short post in Paul's voice plus alternative openers,
3. drops a dated draft in `docs/build-in-public/` for Paul to check and publish
   to Substack / the `/essays` reader / LinkedIn.

The work Paul already does becomes distribution. It never auto-publishes: Paul
approves, tweaks, sends.

## Run it

```bash
node scripts/build-in-public/index.mjs
```

Output lands at `docs/build-in-public/<YYYY-MM-DD>.md`. A hand-run example of a
real week is committed at `docs/build-in-public/example.md`.

## Environment

| Variable | Purpose | If missing |
| --- | --- | --- |
| `CHAT_ANTHROPIC_API_KEY` | the writer (same key the site uses; `ANTHROPIC_API_KEY` also works) | falls back to a labelled skeleton; see `example.md` for a real run |
| `BUILD_IN_PUBLIC_MODEL` | override the model | defaults to `claude-sonnet-4-6` |

## Voice

Paul's voice rules live in `config.mjs` (`VOICE_RULES`), lifted verbatim from
`CLAUDE.md` and the writing-voice skill, and go to the writer as hard rules. A
small **voice-lint** then scans the draft for the two rules a machine can check,
em dashes and hype words, and surfaces them for Paul. It warns, it never edits:
Paul decides.

The draft is deliberately a **draft**. It picks the material and writes a first
pass so the blank page is gone; Paul does the last mile.

## Files

- `config.mjs` — site identity, audience, channels, notes files, and the voice
  rules + hype-word list.
- `notes.mjs` — the week's added lines from the notes files (the reasoning).
- `draft.mjs` — select + write in Paul's voice, plus the voice-lint and the
  no-key skeleton.
- `index.mjs` — orchestrates it. Reuses the commit gatherer from
  `../affiliate-newsletter/commits.mjs` (one source of truth for reading git).

## Relationship to the affiliate engine

`scripts/affiliate-newsletter/` is the same skeleton pointed at a different job:
commits → affiliate campaign, for a SaaS with promoters (the Tibo/Revid shape,
the kind of system RWF builds for a client). This one points the skeleton at
Paul's own distribution. They share `commits.mjs` on purpose.
