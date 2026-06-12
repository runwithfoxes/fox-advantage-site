# The Bench - private showcase page (design spec)

**Date:** 2026-06-12
**Status:** Approved design, pre-implementation
**Owner:** Paul (planned with Klara/Claude)

## Purpose

A private page Paul opens in prospect meetings to answer "show me what this looks like."
Framed as "what we're working on" - a working-studio bench, present tense, visibly real
and current. Not a polished case-study archive and not a public Work page (that can come
later by graduation).

Primary use: Paul drives it in the room (laptop or phone). Secondary: good enough to send
as a follow-up link without wincing.

## Framing rules (hard)

1. **No client names anywhere.** At most a category hint ("a heritage financial brand"),
   often nothing.
2. **Real work shown as-is.** If a piece carries a visible client brand (e.g. a banner set),
   show it unchanged and simply never name the client in copy. Never strip or re-skin.
3. **Never invent a client.** If a piece has no client, it is shown as RWF's own work or
   methodology. No fictional brands, no implied engagements.
4. **Present tense.** Copy reads "we're building / we're running", not "we delivered".

## Content sources (cheapest first)

1. **runwithfoxes.com** - existing public examples are linked or referenced, never rebuilt.
2. **/ops dashboard** - the brand operations methodology and live views, screenshotted.
   This carries the process story.
3. **Client artefacts, unnamed** - existing work pulled from client and project folders.
   Starting candidates (audit sweep will extend this list):
   - Banner machine IAB set + gallery (clients/sabre/builds/banner-ads-gallery.html)
   - Heritage factbook (projects/weatherbys-factbook/index.html)
   - LinkedIn chart ads video (clients/epic/epic-ads-experience.mp4)
   - Brand-matched PowerPoint migration (Sabre Concierge IQ deck)
   - Studio measurement dashboard
   - Metrics pyramid (live: metrics-pyramid.vercel.app)
   - Client portal
   - Direct-mail / email-writer process (anonymised sample letters)
   - The AI team installed at a delivery client: writer, content creator, outreach
     campaigns manager (anonymised sample outputs)

## Categories (page structure)

Organised by what prospects buy, not by client:

1. **Ads & banners** - animated chart ads, IAB banner sets, the banner machine story
2. **Pages & decks** - branded pages, factbook, brand-matched PowerPoint
3. **The AI team** - the writer / content creator / outreach manager roster we install;
   process story drawn from /ops dashboard + anonymised outputs
4. **Research & measurement** - brand health / CEP scoring, measurement dashboards,
   metrics pyramid
5. **Analysis & models** - segmentation analyses, 95:5 in-market demand models (Excel),
   media budgets. Artefact is a spreadsheet or report: show screenshots of the money
   tabs (scored matrix, Monte Carlo chart), never try to make Excel cinematic.

## Card format

Each piece is a card: one capture + two lines of copy (what it is, what it replaces or
saves). Capture-first:

- Animated ads: looping MP4/GIF, autoplay, no click needed
- Pages/decks/dashboards: screenshots or a short scroll-through recording
- Spreadsheets/reports: screenshots of 1-2 key tabs or charts
- "Open live" link ONLY where interactivity is the story (metrics pyramid; others by
  exception). A demo that stutters in the room is worse than no demo.

## Hosting

An unlinked, noindex route on this repo (runwithfoxes/fox-advantage-site, Vercel
auto-deploys): `/bench`. No new infrastructure. Not in nav, not in sitemap, noindex
meta. Graduation path: once client permissions are in writing, pieces can move to a
public Work page by adding attribution and a nav link.

## Build order

1. **Audit sweep** - one pass through client folders (paul-hub/clients/*) and
   ~/projects/* for showable artefacts not yet on the candidate list (Moloco landing
   system / Cannes / morning brief, 123ie, EPIC folders, segmentation and 95:5
   outputs). Score each: ready / needs-polish / not-showable.
2. **Wireframes** - because this is visual, wireframe the page before building:
   overall page structure plus one sample card per category. Paul approves the
   wireframes before any build work starts.
3. **Capture & polish** - produce the captures for the approved shortlist only.
4. **Page build** - /bench route following /branded-page and site conventions.
5. **Optional, later** - new client-attached pieces (e.g. a banner set for an active
   engagement, an email writer for a content client), shown unnamed. Additive, not
   blocking.

## Out of scope

- Public Work page / naming clients (needs written permission; later graduation)
- Bespoke per-prospect demos in the prospect's own brand (explicitly rejected)
- Rebuilding anything already live on runwithfoxes.com
