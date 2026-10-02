# Resource centre build notes

Written 26 Sep 2026, the foundation step of Paul's brief: "think big and be ambitious... 10x...
add dummy reports and trackers and datasets... a big section about the library of everything...
as professional as Anthropic does for its research and resources... make things available to
download as pdfs." Every template agent reads this file, then `~/.claude/skills/dray/DOCTRINE.md`,
the RWF brand spec (`~/paul-hub/clients/rwf/memory/rwf-brand-spec-for-ads.md`) and
`~/.claude/output-styles/plain-english.md`, before writing a line.

## What is frozen, and where

| Thing | File | Rule |
|---|---|---|
| Types | `catalogue/types.ts` | Add fields if you must. Never rename or remove one. |
| Data | `catalogue/catalogue.json` | WRITTEN by `scripts/resources/build-catalogue.mjs`. Never edit by hand. `--check` proves every k of n and that the file matches the script. |
| Access | `catalogue/index.ts` | Import from here, never the JSON. Holds `reportHref`, `trackerHref`, `datasetHref`, `seriesHref`, `COUNTS`, `day()`. |
| Parts | `kit/` (`index.ts` exports all) | `Example`, `Lock`, `Gate`, `DownloadPdf`, `Sparkline`, `FigureWindow`, `Chart`, `INK`. |
| Look at them | `/resources/kit-preview` | One of every chart kind, the gate, the download, a sparkline. Not linked, not indexed. |

What is in the catalogue: 12 report series and 43 reports (41 published or draft, 2 announced),
20 trackers, 20 datasets, 12 tools, 20 playbooks. Real items are `example: false`: The AI Ask Q3
2026 (href to its own page), GEO Ireland No. 01 (href `/resources/geo-ireland`), the Jobs and AI
and AI answers in Ireland trackers, the GEO day one and AI Ask roles datasets, the three live tools
and two course playbooks. Everything else is `example: true`.

## Routes the templates own (from `index.ts`)

- `/resources/reports/[series]` a series page: every edition, the trend across them.
- `/resources/reports/[series]/[slug]` an edition. Real ones keep their own page via `href`.
- `/resources/trackers/[slug]`, `/resources/data/[slug]`.
- `/resources/pdf/<slug>.pdf` and `/resources/data/<slug>.csv` are static files in `public/`.

## The bar, measured (26 Sep, screenshots in the build chat's scratchpad `ref/`)

anthropic.com/research at 1440: a two-column head (h1 52px/57 left, standfirst serif 20px/31 right,
620px each), a row of five team blurbs, one featured item as a big drawn figure plus a stack of four
dated items on the right, then **Publications as a plain table: Date, Category, Title**, 10 rows and
"See more", with a search box. Nothing is a card. The weight comes from the one big figure and from
the restraint everywhere else.
A research post at 1440: h1 52px, body serif 17px/26 in a 640px column at x=400, figures break out
to 880px at x=280 with a 14px caption under them, h2 25px. Quotes are a hairline, not a box.
The Economic Index: a coloured full-width band, a hand-drawn mark, a serif title with the subtitle
in grey on the same measure, "Last updated" under it. One subject owns the page.

What we copy is the LAYOUT SYSTEM (DOCTRINE 23 Aug: a reference is its layout system, not its
components): a reading column that figures break out of, an index that is a table not a card
grid, one featured thing per page drawn big, dates on everything, and a sub-page that belongs to
one subject. What we do NOT copy: their fonts, their colours, their cards-free austerity as an
excuse for no craft (DOCTRINE 6 Sep: the system is the floor, never the ceiling).

## Our own type and colour (brand spec, not up for negotiation)

- JetBrains Mono: labels, meta, numerals, chips, buttons, window titles. Anything smaller than body
  is mono, never a smaller serif.
- Space Grotesk 500, letter-spacing -0.02em: headlines. h1 about 44 to 52px at 1440, 30 to 34px at 390.
- Source Serif 4: anything a person reads. 17px/1.65 body, standfirst 20px/1.5.
- Palette: bg `#FAFAF8`, ink `#1D1B1B`, muted `#8A8A85`, border `#E0E0DC`, sky `#3A7CA5` (the
  data colour and the only loud one), sky-light `#6CAAC8`, deep `#1A3A4E` (highlight and dark
  bands), cream `#F7EAD9` sparingly. Orange `#F47521` is the logo and the Example tag, nothing else.
- Headlines run the full column. No `ch` cap and no `text-wrap: balance` on display type; use
  `pretty`. (The AI Ask's `.h1` still has `max-width: 22ch` and `balance`; do not copy that.)
- One fox per page, floated at the top, module-page treatment (brand spec, research reports). Not
  in the charts. `fox-book.png` is a placeholder for the fox holding a report.
- Banned: cream callout boxes with an orange edge, emoji in interface copy, purple gradients.

## Reuse from The AI Ask (Paul liked it: "You did a lovely job on Sam's first report")

`the-ai-ask/2026-q3/` is the model edition page. Reuse, don't redraw:
- the figure window (`kit/FigureWindow` is the same chrome, globals `.mod-win`),
- the highlight that sweeps in behind a key phrase (`Parts.tsx` `Hl`),
- the contents rail with "% read" (`Parts.tsx` `Rail`),
- the at-a-glance card beside the intro, with the fox,
- the masthead: eyebrow, h1, byline with the author's mark, checked-by line, date, minutes,
- the method as `<details>` rows, and the sign-off.

## The gate rule (Paul agreed it, 26 Sep)

The finding is free; your own answer and the working files need an email. One free account opens
everything and nobody is asked twice. So: every report, tracker and dataset page is readable in
full with no email. `Gate` goes at the END of the piece and lists `withAccount`. `DownloadPdf`
opens a one-line email step in place. No pop-ups, no gate mid-paragraph, no blurred content, no
"upgrade". Every form says it is a mockup and sends nothing. Datasets show their first 8 rows free;
the full CSV is behind the email.

## The Example rule

Anything with `example: true` shows `<Example />` beside its title everywhere it appears: index
rows, cards, headers, menus. Examples name sectors, roles and counties, never a real Irish brand or
person. Example reports are by agent desks (Sam, Jeff, Lena, checked by Vera or Cato), because Paul
and Susan O'Shea are real people and only sit on real work. Before anything public: run
`scripts/client_facing_gate.py` over every file rendered (DOCTRINE 6 Sep).

## The PDF rule

A PDF leaves the page and loses the mockup banner, so it carries its own:
- every example PDF says "Example, made-up numbers" in the footer of every page;
- The AI Ask and GEO Ireland PDFs say "Draft, not approved" on every page until Paul approves.
Build with Playwright `page.pdf()` against a print stylesheet of the real edition page (so the PDF
is the page, not a second design). Playwright is in devDependencies; the installed browser is at
`~/Library/Caches/ms-playwright/chromium-1200/`, pass it as `executablePath`.
`scripts/generate-pdfs.mjs` is the book's PDF script and shows the pattern. Output
`public/resources/pdf/<slug>.pdf`. Page count must match `pages` in the catalogue or update the
generator to read it back.

## Naming (proposed, needs Paul)

The homepage hero card is titled "Library · Research and papers", and "The Library" is what Paul
calls the library of everything (`/course/everything`). Two things called Library will confuse
people. Proposal: rename the hero card to "Research and papers" and keep "The Library" for the
library of everything, which gets its own top-level section in Resources. Not changed in home-next.

The library of everything: reuse `EverythingClient` and its sources (`moduleData`, `shelf.ts`,
`SHELF`), never a copied list. Its page header sets two rules: the prompts and links are public,
the teaching is not; and there is no second copy of any list. `/course/everything` must keep working.

## Every page, before it is shown

1. Rendered at 1440 and 390, no page errors, no sideways scroll, charts past their transitions.
2. Looked at, not only measured: words at or past an edge, ink on ink, anything overprinted.
3. A craft line per band (DOCTRINE 7 Sep): what was drawn for it and why. A band that is a label,
   a headline, body and a hairline list is not finished.
4. Each page has its own shape (DOCTRINE 8 Sep). The hub, a series page, an edition, a tracker, a
   dataset and the library must not be the same page with different words.
