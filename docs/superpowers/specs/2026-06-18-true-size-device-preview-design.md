# True-size device preview (client pages) - design

**Date:** 2026-06-18
**Owner:** Paul Dervan / Run with Foxes
**Status:** Approved (design), building v1

## Goal

Show every ad on a client page at the **true size people actually see it**, inside
a realistic device frame, with a Substack-style device toggle. The arbitrary
shrunk-thumbnail approach confuses people (a 1080x1080 carousel shown at 210px
looks broken) and makes it impossible to judge whether fonts are legible.
Modelled on Substack's email preview (Mobile / Desktop / Email toggle, content
shown inside a browser window or a phone mockup).

## Hard constraints

1. **Nothing client-facing goes live until Paul approves** (review locally first).
2. **True size, not arbitrary.** Each asset renders at its real CSS-pixel size
   for the chosen device + placement. No invented widths.
3. Brand rules hold (no rounded corners on our chrome beyond what a real device
   has, no #fff/#000 drift, light mode).

## Reference devices

- **Desktop** = 13" laptop, ~1440 CSS px wide content area.
- **Mobile** = standard phone, ~390 CSS px wide.

## Toggle

A pill toggle at the top of the page: **Desktop / Mobile** (global page state).
Substack also has an "Email" tab; for us email is a *placement* (only email
banners have an email rendering), not a device - so email banners are shown in an
email frame within both Desktop and Mobile, rather than a third global tab.
(If Paul wants a literal third tab later, it filters to email-placement assets.)

## Device frames (chrome)

- **Desktop** -> browser-window chrome: traffic-light dots + an address bar
  showing the real context (e.g. `linkedin.com/feed`, the client site, an email).
- **Mobile** -> phone mockup: status bar (time, signal, battery), rounded body.
- **Email** (for email banners) -> a simple email-client frame (From / Subject
  bar) at email body width.

## Placement -> true size

Each work section gets a `placement` field. The renderer sizes the asset to the
true width for that placement + device:

| placement | runs in | Desktop width | Mobile width |
|-----------|---------|---------------|--------------|
| `feed`    | LinkedIn feed (carousels, social squares, testimonial, webinar, blog cards) | ~555px | ~390px |
| `email`   | email body (email banners) | ~600px | ~390px |
| `display` | web ad slots (IAB set) | native px | mobile sizes native; desktop-only sizes labelled |
| `web`     | a web page (blog header, thumbnail, meeting bg, iceberg, product proof) | content width, capped | scaled to phone |

Each framed asset carries a small caption with the honest truth, e.g.
"True size in the LinkedIn feed - 1080x1080" so size is never ambiguous.

## Components (shared engine)

- `DeviceToggle` - the Desktop/Mobile pill; sets page-level `device` state.
- `DeviceFrame` - wraps an asset in browser / phone / email chrome and sizes it.
- `WorkBlock` reads `section.placement` + the page `device` to compute the frame
  and width, overriding the old fixed `w` values in preview mode.

## QA reuse

The placement -> true-size table is the same source the QA font check uses: it
measures a text element's rendered px at the real display size (e.g. "22px on a
phone, below the legible floor -> fail"). One source of truth for "how big is
this really".

## Phasing

- **v1 (now):** toggle + browser/phone frames + true size for `feed` and `email`
  (carousels, social, email banners - the worst offenders). Show Paul.
- **v2:** extend to `display` (IAB set, fixes the chart-set collision too) and
  `web`. Then wire the QA font check to the same table.

## Verify

- A 1080x1080 carousel in Desktop reads at ~555px inside a browser frame, legible;
  in Mobile at ~390px inside a phone. Email banner sits in an email frame at 600px.
- `npx tsc --noEmit` clean; review locally before any push.
