# Client Page skill - design

> Status: approved by Paul 2026-06-13 (work-area scope broadened same day).
> Build plan follows separately.

## What it is

A Claude skill, `/client-page`, that scaffolds a password-gated client workspace
page at `runwithfoxes.com/clients/{name}`, in the `fox-advantage-site-repo`
Next.js app. The page shows a **live deliverables tracker** (the top part Paul
cares about) and a **work area** below it that holds whatever the engagement
produced - creative, a process redesign, segmentation charts, email copy, or
instructions for the client's own Claude writer.

It generalises the existing hand-built Softco page
(`src/app/clients/softco/`) into a repeatable, data-driven generator.

## Who owns it

- **Standalone skill** (`/client-page`), single responsibility - same pattern as
  `/dray` routing to ad skills. Not buried inside the `/klara` persona.
- **Under Klara's remit.** New client or "update the client page" → Klara invokes
  `/client-page`. Klara owns the **tracker** (status, dates, notes, onboarding).
- **The work area takes any output**, not just creative. Dray's renders feed the
  `media` sections; process/charts/copy/instructions feed the others.
- Paul reviews locally before any deploy.

## Hard constraints

- **No database. No interactivity that writes.** The page is read-only for the
  client. They read status, see the work, copy text, and download files. They
  reply to Paul however they like.
- **Everything editable lives in one readable data file per client** so
  Klara/Jo/Dray can update without touching React or CSS.
- **Headline is generic per client** (e.g. "Deliverables", "Programme",
  "Workstreams") - not hardcoded "Creative deliverables".
- Matches existing site brand + voice rules (see repo CLAUDE.md): no em dashes,
  no rounded corners, light mode, fox only on cream.

## File structure (per client, mirrors Softco)

```
src/app/clients/{name}/
  page.tsx          # server: auth check, metadata (noindex), renders Client
  actions.ts        # password gate via httpOnly cookie (scoped to this route)
  data.ts           # THE editable file - all tracker + work content
  {Name}Client.tsx  # renderer (per-client, hand-tunable escape hatch)
  {name}.css        # styles (copied from Softco baseline)
public/clients/{name}/media/   # rendered creative, charts, downloadable files
```

`data.ts` shape:

```ts
export const meta = {
  client: "SoftCo",
  headline: "Deliverables",            // generic per client
  intro: "A live view of the work for SoftCo…",
  lastUpdated: "2026-06-13",
};

export const deliverables = [
  { name: "Display / banner ads", detail: "11 IAB sizes, animated",
    status: "ready",       // "ready" | "in-progress" | "todo"
    date: "2026-06-12",    // when this item last moved
    target: "",            // optional due date; column hidden if all blank
    note: "Sent v2, awaiting sign-off" },
];

export const work = [
  // 1) MEDIA - visual creative (Dray)
  { title: "Chart Ad set", status: "ready", kind: "media", layout: "grouped",
    desc: "The animated display ad across the full IAB range…",
    groups: [ { label: "Square and rectangle", items: [
      { src: "chart-1080x1080.mp4", poster: "chart-1080x1080-poster.png",
        ratio: "1/1", w: 280, cap: "1080x1080", download: true } ] } ] },

  // 2) COPY - text with a copy-to-clipboard icon
  { title: "Writer instructions", status: "ready", kind: "copy",
    desc: "Paste this into your Claude project to brief the writer.",
    blocks: [ { label: "Writer system prompt", mono: true,
                text: "You are SoftCo's content writer…" },
              { label: "Subject line variants",
                text: "1) …\n2) …\n3) …" } ] },

  // 3) FILES - downloadable assets (process redesign, deck, PDF, zip)
  { title: "Process redesign", status: "ready", kind: "files",
    desc: "The redesigned invoice-approval flow.",
    files: [ { name: "Approval flow v2", file: "approval-flow-v2.pdf",
               note: "PDF · 2 pages" } ] },

  // 4) GALLERY - images / charts with captions, each optionally downloadable
  { title: "Segmentation charts", status: "ready", kind: "gallery",
    items: [ { src: "seg-penetration.png", cap: "Penetration by segment",
               download: true } ] },
];
```

## The tracker (top part)

- Columns: **Deliverable · Detail · Status · Date · Note**.
- Status dot colour per state (ready = green, in-progress = amber, todo = grey),
  same visual language as Softco.
- `target` (due date) is **optional** - the column only appears if any row sets
  it. Default view stays clean: status + date + note.
- Page header shows "Last updated {meta.lastUpdated}" so it reads as live.
- Keeps the "N of M ready" count.

## The work area (four content kinds)

Not all work is creative. Each section declares a `kind`:

| kind | what it renders | for |
|------|-----------------|-----|
| `media` | videos / images. Sub-layouts `grouped` (sized tiles by shape), `pair` (animated + static), `single` (one figure) | ads, animations - Dray |
| `copy` | one or more text blocks, each with a **copy-to-clipboard icon**; `mono:true` for prompts | Claude writer instructions, prompts, email copy |
| `files` | rows with a **download button** (HTML `download`, one click, no backend) | process redesigns, decks, PDFs, asset zips |
| `gallery` | images / charts with captions; each item optionally downloadable | segmentation charts, diagrams |

Each section also carries a status badge (e.g. "Ready for feedback").

**Downloads** are trivial: any `media` / `gallery` item or `files` row points at a
file in `public/clients/{name}/media/` and renders a real download link. No
backend.

**Copy** uses `navigator.clipboard.writeText`. Each copy block has its own icon
that flips to "copied" briefly.

**Escape hatch:** `{Name}Client.tsx` is per-client, not shared. Most pages render
straight from `data.ts`; a bespoke one-off layout can be hand-coded in that
single file without affecting any other client's page.

## Landing the work files

The skill accepts a **source folder** of finished files (renders, charts, PDFs).
It copies them into `public/clients/{name}/media/` (renaming to the names
referenced in `data.ts`) and writes the matching `work` entries. No manual file
shuffling.

## Skill invocation

`"create a client page for {name}"` → the skill asks for:

1. **Client name** (→ route slug + display name)
2. **Headline** (generic, per client)
3. **Password** (gate)
4. **Starting deliverables** (name / detail / status - dates default to today)

Then it scaffolds all files, wires the route, and prints the local URL
(`http://localhost:3000/clients/{name}`) for Paul to review before deploy.

Update flows (also via the skill, Klara-driven):
- "update {client}'s status" → edit `data.ts` deliverables.
- "add {client}'s {work}" → land files + add a `work` section of the right kind.

## Out of scope (YAGNI)

- No client-side comments / feedback forms / email buttons.
- No database, KV, or any write store.
- No live admin/edit UI on the page.
- No "download all as zip" (per-file downloads only for now).
- No auto-deploy - Paul reviews and deploys.

## Reference

- Baseline to generalise: `src/app/clients/softco/` (page.tsx, actions.ts,
  SoftcoClient.tsx, softco.css).
- Brand + voice rules: repo `CLAUDE.md`.
- Skill structure rules: `/skill-builder`.
