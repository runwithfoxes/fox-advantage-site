# SoftCo client page - four-zone redesign

**Date:** 2026-06-19
**Page:** runwithfoxes.com/clients/softco
**Files:** `src/app/clients/softco/data.ts`, shared engine `src/app/clients/_components/ClientWorkspace.tsx` + `workspace.css`

## Problem

The page is a flat scroll of ~24 sections (a deliverables tracker pinned on top, then the brief's nine sub-galleries, the feedback log, then twelve showcase pieces). Nothing tells a client where one idea ends and the next begins, so "what you gave us" reads the same as "the work we made." The brief also currently takes the prime second slot for material the client gave us.

## Goal

Group the page into four clearly separated, labelled zones with a sticky jump-nav, so it reads as four rooms not one corridor. Re-order so the client story runs status → context → output → conversation. Keep all existing content and components; this is grouping, relocation and re-labelling, plus one new responsive section.

## Zone order (locked with Paul)

1. **Deliverables** - the existing status table. Orients the client: everything and where each piece stands.
2. **What we've been given** (the brief) - the "The brief" intro + its nine sub-galleries. Reminds the client what we're working off. Source material, not output.
3. **The work** - the twelve showcase pieces. The payoff. Includes one NEW section (see below).
4. **Feedback** - the feedback & responses log. The running conversation, at the bottom where both sides return to it.

## Components of the redesign

### Brand (hard requirement)
The build must be **100% Run with Foxes brand, per the `/branded-page` skill / RWF brand guidelines** - the zone headers, jump-nav and the new responsive section all use the real RWF brand system (Space Grotesk / JetBrains Mono, sky #3A7CA5, deep sky #1A3A4E, cream #FAFAF8, orange #F47521 logo-only, no rounded corners, fox only on cream, no em dashes). The HTML mockup's styling is throwaway and is NOT the brand reference. Load `/branded-page` and the shared `workspace.css` tokens before building so the new elements are indistinguishable from the rest of the site.

### Zone wrappers + headers
Each zone opens with a prominent header: number + name + one line describing it. Inside, the existing sections render exactly as they do today (galleries, media, feedback).

Implementation approach: add a `zone` grouping to the work data so the shared engine can render a zone header before each group and emit anchor ids for the nav. Existing `WorkSection` shapes and rendering are untouched; the engine just brackets them by zone. The deliverables tracker (today rendered separately above `work`) becomes zone 1 with its own header and anchor.

### Sticky jump-nav
A thin sticky bar at the top of the workspace with four links - Deliverables / The brief / The work / Feedback - each scrolling to its zone anchor. Square edges, light, in brand.

### Deliverables progress (in zone 1)
Turn the deliverables tracker from a static table into a progress picture. Three additions:

- **Completion bar + headline %.** A wide progress bar at the top of zone 1 with a large "N% complete" figure. The % is **computed from the deliverables table** (locked with Paul), so it can never drift from what the table shows: each row scores by status (Ready = 1, In progress = 0.5, Not started = 0), averaged across all rows, rounded to a whole %. A manual override field is available for a specific moment but the default is computed. Bar fill in brand sky; square edges.
- **Estimated completion date.** A manual `meta` field shown beside the bar (e.g. "Estimated completion: 11 Jul 2026"). Manual because only Paul knows the real date - never derived/faked.
- **"New" markers.** A manual `new` flag on any deliverable row or work-zone piece renders a clear **New** tag in brand orange (used sparingly). When something lands it gets explicitly called out as new, in the table and on the work piece in zone 3. Paul drops the flag when it is no longer new.

To support the computed %, each deliverable needs a normalised status the engine can score (Ready / In progress / Not started). Map existing statuses to these three.

### New content: responsive blog figure (in zone 3)
The two currently-unused files `ae-blog-desktop.png` and `ae-blog-mobile.png` are the desktop and mobile renders of the same e-invoicing blog figure ("Core Foundations"). Add one new section in **The work**, "Blog figure · responsive", showing the desktop render and the mobile render side by side, captioned so it reads as one piece at two screen widths. This is what Paul meant by "the mobile and desktop versions of the ads should be after the brief."

## Out of scope

- No tabs, no collapsible zones, no landing summary (full-rethink option was declined).
- No rebuild of existing sections - galleries, media, carousels, feedback render as today.
- No deploy until Paul reviews locally.

## Verify

`npx tsc --noEmit`, then dev server, open `/clients/softco` (password-gated): gate works, all four zones render with headers, jump-nav scrolls to each (Deliverables / The brief / The work / Feedback), the completion bar shows a % that matches the table statuses (verify the maths by hand against the rows), the estimated completion date shows, any `new`-flagged item shows the orange New tag, the new responsive figure shows desktop + mobile, media plays, downloads download. Deploy on Paul's explicit approval only (branch must be `main`).
