# Weekly affiliate newsletter production

Every Monday, for each product, this workflow:

1. reads the **last 7 days of GitHub commits**,
2. asks Claude to **select what customers and affiliates will care about** (most
   commits are noise: refactors, config, healthchecks, typos),
3. writes the **newsletter** and a **ready-to-send affiliate campaign**,
4. drops a dated markdown draft in `docs/affiliate-newsletters/` for the head of
   growth to check and send.

Why it earns its place:

- No one has to manually read the code for ideas.
- Every affiliate stays up to date with the latest features.
- Promoting the product each week becomes copy-paste easy.

Product development becomes a distribution strategy.

## Run it

```bash
# Prototype: reads THIS repo's own commits, needs no external access.
node scripts/affiliate-newsletter/index.mjs

# A real product (reads its GitHub repo; needs GITHUB_TOKEN):
node scripts/affiliate-newsletter/index.mjs --product revid
node scripts/affiliate-newsletter/index.mjs --product outrank

# Every real product in one pass (the Monday job):
node scripts/affiliate-newsletter/index.mjs --all

# Force a source explicitly:
node scripts/affiliate-newsletter/index.mjs --product revid --source github
```

Output lands at `docs/affiliate-newsletters/<product>-<YYYY-MM-DD>.md`.

## Environment

| Variable | Purpose | If missing |
| --- | --- | --- |
| `GITHUB_TOKEN` | read access to the product's repo (GitHub source) | GitHub source fails; local source still works |
| `CHAT_ANTHROPIC_API_KEY` | the writer (same key the rest of the site uses; `ANTHROPIC_API_KEY` also accepted) | falls back to a labelled template skeleton for a human to finish |
| `AFFILIATE_NEWSLETTER_MODEL` | override the model | defaults to `claude-sonnet-4-6` |

There is no test runner in this repo (see `scripts/verify-meta-capi.js`): run the
script and read the draft it writes.

## Files

- `config.mjs` — one entry per product (repo, affiliate links, audience, voice).
  Add a product by adding an entry. `revid` and `outrank` are stubbed with
  placeholder repo slugs and affiliate URLs to fill in.
- `commits.mjs` — gathers the 7-day window from GitHub (API) or local git. Same
  shape either way, so nothing downstream knows which ran.
- `draft.mjs` — the selection + writing. Claude picks the 2-4 customer-facing
  changes and writes the copy; a deterministic skeleton covers the no-key case.
- `index.mjs` — orchestrates source → select → draft → write, and renders the
  markdown.

## Wiring the Monday schedule

The script is the whole job; scheduling is one line wherever cron lives.

- **GitHub Actions** (runs in the product's own repo, has the checkout for free):
  ```yaml
  on:
    schedule:
      - cron: "0 8 * * 1" # Mondays 08:00 UTC
  ```
  then `node scripts/affiliate-newsletter/index.mjs --product <key>` with
  `CHAT_ANTHROPIC_API_KEY` and (for cross-repo reads) `GITHUB_TOKEN` in secrets.
- **Vercel Cron / any host**: same command, same two env vars.

The draft is deliberately a **draft for a human to send**, never an auto-send:
the head of growth checks it, then it goes out.

## What a model-written draft looks like

Illustrative (real runs pull live commits and real copy):

```markdown
# Revid affiliate newsletter draft

> Draft for the head of growth to check and send. Generated 2026-08-10.
> Source: github · 22 commit(s) in the last 7 days · writer: claude-sonnet-4-6

**Batch export and a faster render queue landed this week.**

## What shipped (selected)

### Batch export to MP4
Creators can now export a whole series of videos in one go instead of
one at a time.

<sub>commits: a1b2c3d, e4f5a6b</sub>

### Render queue is roughly 2x faster
Videos that used to sit in the queue now come back in about half the time.

<sub>commits: 9f8e7d6</sub>

---

## Newsletter (to affiliates)

**Subject:** Batch export just landed, and renders got faster

Hi there,

Two changes this week your audience will feel straight away...

---

## Affiliate campaign assets (copy-paste ready)

Affiliates: grab your link at https://revid.getrewardful.com/ and swap it
in for {{affiliate_link}}. Reward: 30% recurring.

### Email the affiliate can send to their audience
...
### Social posts
- Revid just shipped batch export... {{affiliate_link}}
```
