# The weekly marketing-AI brief

The third shape of the same idea, and the one aimed straight at your audience.

- The **affiliate engine** reads one product's commits to sell it (Tibo's shape).
- **Build-in-public** reads your own repo to teach from it.
- **This** reads a curated set of on-theme repos and turns their **releases** into
  "what moved in marketing AI this week, and what it means for you", with Paul as
  the trusted filter. Useful even to someone who never buys from you, which is
  what makes people subscribe and forward it.

Every Monday it:

1. reads the last 7 days of **releases** across the sources (and recent commits
   for the cookbook and your own repo),
2. asks Claude to pick the 2-3 items a marketer can act on and write them up in
   Paul's voice, "what shipped / what it means for you / do this Monday",
3. drops a dated draft in `docs/marketing-ai-brief/` for Paul to check and send.

## Why releases, not commits

For someone else's repo a raw commit ("refactor: pydantic v2 compat") is noise.
A **release** is already the human-written "here is what's new and why", which is
the translation layer we want. Product repos ship releases; cookbooks and guides
(and our own repo) ship via commits, so those sources read commits instead.

## Run it

```bash
GITHUB_TOKEN=... CHAT_ANTHROPIC_API_KEY=... node scripts/marketing-ai-brief/index.mjs
```

Output lands at `docs/marketing-ai-brief/<YYYY-MM-DD>.md`. A real hand-run
example is at `docs/marketing-ai-brief/example.md`.

`GITHUB_TOKEN` is needed to read releases (public repos are anonymous elsewhere,
but the scoped session proxy requires it). Sources that error are skipped with a
note, the brief still builds from the rest.

## The sources

Edit `SOURCES` in `config.mjs`. Each carries a plain "what it is" and "why a
marketer cares" line, which the writer leans on. The starter set:

| Source | What it is | Why a marketer cares |
| --- | --- | --- |
| `vercel/ai` | the toolkit a lot of AI features are built on | what your tools can soon do (video, voice, agents) |
| `PostHog/posthog` | analytics, experiments, session replay | what you can measure and test |
| `dubinc/dub` | link management + click analytics | attribution and the tracked link |
| `anthropics/anthropic-cookbook` | worked recipes for Claude | techniques worth knowing (commit-sourced) |
| `runwithfoxes/fox-advantage-site` | our own site + its AI | proof we practise it (commit-sourced) |

Swap any in or out. Fewer, sharper sources beat a firehose.

## Voice and the honest caveats

- Voice rules + the em-dash / hype-word **voice-lint** are shared with the
  build-in-public engine (`../build-in-public/config.mjs` and `draft.mjs`).
- **The edge is judgement and translation, not aggregation.** If it reads like a
  bot reposting release notes it is dead, so the prompt leans hard on "what it
  means for the reader". Paul still does the last-mile edit.
- It is **partly pointing at other people's tools**. That is the trusted-curator
  trade: good for authority and reach, but not purely your own story.
- Never auto-sends. Paul approves and sends.
