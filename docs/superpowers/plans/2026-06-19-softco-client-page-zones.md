# SoftCo client page - four-zone redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the SoftCo client page into four labelled, separated zones (Deliverables → What we've been given → The work → Feedback) with a sticky jump-nav, a computed completion bar, an estimated completion date, and "New" markers.

**Architecture:** All work lives in the shared engine `ClientWorkspace.tsx` + `workspace.css` (so every client page can use zones), driven by per-client `data.ts`. Zones are a new optional `zone` field on each work section plus an engine-side zone config; the engine groups the (zone-ordered) `work[]` array and prints a zone header whenever the zone changes. Deliverables is zone 1, rendered from the `deliverables` prop with a new computed progress bar. The completion % is derived from deliverable statuses so it can never drift from the table.

**Tech Stack:** Next.js (App Router) client component, TypeScript, plain CSS (cw- prefix). No test framework exists for these pages; verification is `npx tsc --noEmit` + dev-server visual check, per the /client-page skill.

## Global Constraints

- **Brand: 100% Run with Foxes, per /branded-page.** Tokens only: `--orange` = #3A7CA5 (sky), `--logo-orange` = #F47521 (real orange, used sparingly - the "New" tag and progress fill accents), `--deep-sky` #1a3a4e, `--bg`, `--text`, `--text-muted`, `--border`. Fonts `var(--mono)` (JetBrains Mono) for labels, `var(--sans)` for headings where the engine already does. **No rounded corners. No #fff / #000. Light mode only. No em dashes. Fox only on cream.**
- **The shared engine stays brand-generic and reusable.** No SoftCo-specific strings in `ClientWorkspace.tsx`; per-client text comes from `data.ts` (`meta.zoneIntros`).
- **Nothing deploys until Paul reviews locally.** Deploy only on his explicit "ship it", and only with `git branch --show-current` == `main`.
- **Load /branded-page before writing any markup/CSS** so the new elements are indistinguishable from the rest of the site.
- Verify each task: `cd ~/projects/fox-advantage-site-repo && npx tsc --noEmit` must pass, then check the page at `http://localhost:3000/clients/softco` (password-gated).

---

### Task 1: Extend the data-model types

**Files:**
- Modify: `src/app/clients/_components/ClientWorkspace.tsx:14-93` (type block)

**Interfaces:**
- Produces: `ZoneKey` type; `Meta.targetDate?`, `Meta.completionOverride?`, `Meta.zoneIntros?`; `Deliverable.isNew?`; `WorkSection.zone?`, `WorkSection.isNew?`.

- [ ] **Step 1: Add the `ZoneKey` type** above the `Meta` type (after `type Status` on line 15):

```ts
type ZoneKey = "deliverables" | "brief" | "work" | "feedback";
```

- [ ] **Step 2: Extend `Meta`** - add three optional fields inside the `Meta` type:

```ts
  targetDate?: string;          // estimated completion date, shown by the progress bar
  completionOverride?: number;  // manual % override; if unset, % is computed from statuses
  zoneIntros?: Partial<Record<ZoneKey, string>>; // per-zone description line under each zone header
```

- [ ] **Step 3: Extend `Deliverable`** - add `isNew` after `note?`:

```ts
  isNew?: boolean;              // renders a "New" tag on the row
```

- [ ] **Step 4: Extend `WorkSection`** - add `zone` and `isNew` (place near `badge?` on line 67):

```ts
  zone?: ZoneKey;              // which zone this section belongs to (default "work")
  isNew?: boolean;            // renders a "New" tag in the section head
```

- [ ] **Step 5: Verify types compile**

Run: `cd ~/projects/fox-advantage-site-repo && npx tsc --noEmit`
Expected: PASS (no errors - all new fields optional, nothing references them yet).

- [ ] **Step 6: Commit**

```bash
git add src/app/clients/_components/ClientWorkspace.tsx
git commit -m "feat(clients): add zone + progress + new-marker fields to workspace types"
```

---

### Task 2: Zone config + completion maths + ZoneHead component

**Files:**
- Modify: `src/app/clients/_components/ClientWorkspace.tsx` (add constants near `STATUS_LABEL` line 95; add `ZoneHead` near `SectionHead` line 368)

**Interfaces:**
- Consumes: `ZoneKey`, `Status` (Task 1).
- Produces: `ZONES` config; `STATUS_WEIGHT`; `computeCompletion(deliverables, override?)`; `<ZoneHead zone intro />` component rendering `<header id="cw-z-{zone}" class="cw-zone">`.

- [ ] **Step 1: Add zone config and status weights** after `STATUS_LABEL` (line 99):

```ts
const ZONES: Record<ZoneKey, { num: string; label: string }> = {
  deliverables: { num: "01", label: "Deliverables" },
  brief: { num: "02", label: "What we've been given" },
  work: { num: "03", label: "The work" },
  feedback: { num: "04", label: "Feedback" },
};

const STATUS_WEIGHT: Record<Status, number> = { ready: 1, "in-progress": 0.5, todo: 0 };

function computeCompletion(deliverables: Deliverable[], override?: number): number {
  if (typeof override === "number") return override;
  if (deliverables.length === 0) return 0;
  const sum = deliverables.reduce((acc, d) => acc + STATUS_WEIGHT[d.status], 0);
  return Math.round((sum / deliverables.length) * 100);
}
```

- [ ] **Step 2: Add the `ZoneHead` component** just above `SectionHead` (line 368):

```tsx
function ZoneHead({ zone, intro }: { zone: ZoneKey; intro?: string }) {
  const z = ZONES[zone];
  return (
    <header className="cw-zone" id={`cw-z-${zone}`}>
      <div className="cw-zone-head">
        <span className="cw-zone-num">{z.num}</span>
        <h2 className="cw-zone-label">{z.label}</h2>
      </div>
      {intro && <p className="cw-zone-intro">{intro}</p>}
    </header>
  );
}
```

- [ ] **Step 3: Verify types compile**

Run: `cd ~/projects/fox-advantage-site-repo && npx tsc --noEmit`
Expected: PASS. (`ZoneHead` unused for now is fine - it is referenced in Task 4. If the build treats unused as error, it does not: Next dev/tsc allow unused functions.)

- [ ] **Step 4: Commit**

```bash
git add src/app/clients/_components/ClientWorkspace.tsx
git commit -m "feat(clients): zone config, status-weighted completion maths, ZoneHead"
```

---

### Task 3: New-marker in section head + deliverable rows

**Files:**
- Modify: `src/app/clients/_components/ClientWorkspace.tsx` (`SectionHead` line 368-376; deliverable row render line 611-620)

**Interfaces:**
- Consumes: `WorkSection.isNew`, `Deliverable.isNew` (Task 1).
- Produces: a `.cw-new` tag rendered in `SectionHead` and in the deliverable name cell.

- [ ] **Step 1: Render the New tag in `SectionHead`** - replace the existing `SectionHead` body:

```tsx
function SectionHead({ s }: { s: WorkSection }) {
  const label = s.badge || s.date || (s.status ? STATUS_LABEL[s.status] : "");
  return (
    <div className="cw-sec-head">
      <h2>{s.title}</h2>
      {s.isNew && <span className="cw-new">New</span>}
      {label && <span className="cw-badge">{label}</span>}
    </div>
  );
}
```

- [ ] **Step 2: Render the New tag on deliverable rows** - in the deliverables `.map` (line 611-620), change the name cell from `<span>{d.name}</span>` to:

```tsx
              <span>{d.name}{d.isNew && <span className="cw-new cw-new-inline">New</span>}</span>
```

- [ ] **Step 3: Verify types compile**

Run: `cd ~/projects/fox-advantage-site-repo && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/clients/_components/ClientWorkspace.tsx
git commit -m "feat(clients): render New marker on sections and deliverable rows"
```

---

### Task 4: Render the four zones + jump-nav + progress bar in the page body (opt-in)

**Files:**
- Modify: `src/app/clients/_components/ClientWorkspace.tsx` (page body line 582-637)

**Interfaces:**
- Consumes: `ZONES`, `ZoneHead`, `computeCompletion` (Task 2); `meta.targetDate`, `meta.completionOverride`, `meta.zoneIntros`, `WorkSection.zone` (Task 1).

**CRITICAL - the engine is shared by 5 live client pages (coca-cola, eaton-square, heineken, sabre, softco).** The zone treatment (jump-nav, zone headers, progress bar) MUST be opt-in so the four non-SoftCo pages render byte-identically to today. The opt-in flag is `zoned = work.some((s) => s.zone)`. When false, render the EXACT current layout. Only SoftCo's data (Task 6) sets `zone`, so only SoftCo changes.

- [ ] **Step 1: Compute completion + the zoned flag.** Replace lines 582-585 (the `const base` / `readyCount` / `hasTarget` / `cols` block) with:

```tsx
  const base = `/clients/${meta.slug}/media`;
  const readyCount = deliverables.filter((d) => d.status === "ready").length;
  const hasTarget = deliverables.some((d) => d.target);
  const cols = hasTarget ? "1.2fr 1.6fr 0.9fr 0.7fr 0.7fr 1.4fr" : "1.2fr 1.6fr 0.9fr 0.7fr 1.4fr";
  const pct = computeCompletion(deliverables, meta.completionOverride);
  const hasFeedDevice = work.some((s) => s.placement === "feed" || s.placement === "email");
  const zoned = work.some((s) => s.zone);
```

- [ ] **Step 2: Add the jump-nav, gated on `zoned`,** immediately after `<p className="cw-intro">{meta.intro}</p>` (line 597):

```tsx
        {zoned && (
          <nav className="cw-jump">
            {(["deliverables", "brief", "work", "feedback"] as ZoneKey[]).map((z) => (
              <a key={z} href={`#cw-z-${z}`}>
                <span className="cw-jump-n">{ZONES[z].num}</span>{ZONES[z].label}
              </a>
            ))}
          </nav>
        )}
```

- [ ] **Step 3: Gate the deliverables zone head + progress bar on `zoned`.** Immediately BEFORE the existing `<div className="cw-count">` line (line 599), insert:

```tsx
        {zoned && (
          <>
            <ZoneHead zone="deliverables" intro={meta.zoneIntros?.deliverables} />
            <div className="cw-prog">
              <div className="cw-prog-top">
                <span className="cw-prog-pct">{pct}% complete</span>
                {meta.targetDate && <span className="cw-prog-date">Estimated completion &middot; {meta.targetDate}</span>}
              </div>
              <div className="cw-prog-track"><div className="cw-prog-fill" style={{ width: `${pct}%` }} /></div>
            </div>
          </>
        )}
```

The existing `cw-count` line and `cw-summary` table (head + rows, with the Task 3 New-tag edit) stay exactly as-is below this insert, for both zoned and non-zoned pages.

- [ ] **Step 4: Branch the work render on `zoned`.** Replace the existing devbar block + `work.map` (lines 623-634) with:

```tsx
        {zoned ? (
          (() => {
            let last: ZoneKey | undefined;
            return work.map((s) => {
              const zone: ZoneKey = s.zone || "work";
              const newZone = zone !== last;
              last = zone;
              return (
                <div key={s.title}>
                  {newZone && <ZoneHead zone={zone} intro={meta.zoneIntros?.[zone]} />}
                  {newZone && zone === "work" && hasFeedDevice && (
                    <div className="cw-devbar">
                      <DeviceToggle device={device} setDevice={setDevice} />
                      <span className="cw-devbar-note">
                        Previews below show each ad at the real size people see it, on a {device === "mobile" ? "phone" : "13″ laptop"}.
                      </span>
                    </div>
                  )}
                  <WorkBlock s={s} base={base} device={device} />
                </div>
              );
            });
          })()
        ) : (
          <>
            {hasFeedDevice && (
              <div className="cw-devbar">
                <DeviceToggle device={device} setDevice={setDevice} />
                <span className="cw-devbar-note">
                  Previews below show each ad at the real size people see it, on a {device === "mobile" ? "phone" : "13″ laptop"}.
                </span>
              </div>
            )}
            {work.map((s) => (
              <WorkBlock key={s.title} s={s} base={base} device={device} />
            ))}
          </>
        )}
```

(The `else` branch is the verbatim current behaviour - devbar then flat `work.map` - so non-zoned pages are unchanged.)

- [ ] **Step 5: Verify types compile**

Run: `cd ~/projects/fox-advantage-site-repo && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Confirm the four other pages are unchanged.** With the dev server running, open `http://localhost:3000/clients/sabre` (and eaton-square / heineken / coca-cola if passwords are to hand). They have no `zone` data, so `zoned` is false: confirm no jump-nav, no zone headers, no progress bar - identical to before.

- [ ] **Step 7: Commit**

```bash
git add src/app/clients/_components/ClientWorkspace.tsx
git commit -m "feat(clients): opt-in four-zone layout, jump-nav and completion bar"
```

---

### Task 5: Zone / jump-nav / progress / New CSS

**Files:**
- Modify: `src/app/clients/_components/workspace.css` (append a new block; adjust `.cw-devbar` top offset)

**Interfaces:**
- Consumes: classes emitted in Tasks 2-4 (`cw-zone`, `cw-zone-head`, `cw-zone-num`, `cw-zone-label`, `cw-zone-intro`, `cw-jump`, `cw-jump-n`, `cw-prog*`, `cw-new`).

- [ ] **Step 1: Append the styles** to the end of `workspace.css`:

```css
/* ---- jump nav (sticky) ---- */
.cw-jump {
  position: sticky;
  top: 0;
  z-index: 8;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 8px;
  background: var(--bg);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.cw-jump a {
  flex: 1;
  min-width: 130px;
  padding: 14px 12px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--deep-sky);
  text-decoration: none;
  text-align: center;
  border-right: 1px solid var(--border);
}
.cw-jump a:last-child { border-right: none; }
.cw-jump a:hover { color: var(--orange); background: var(--card-hover); }
.cw-jump-n { color: var(--orange); margin-right: 8px; }

/* ---- zone header ---- */
.cw-zone {
  scroll-margin-top: 60px;
  border-top: 6px solid var(--deep-sky);
  padding-top: 30px;
  margin: 56px 0 24px;
}
.cw-zone:first-of-type { margin-top: 26px; }
.cw-zone-head { display: flex; align-items: baseline; gap: 16px; }
.cw-zone-num {
  font-family: var(--mono);
  font-size: 40px;
  font-weight: 300;
  line-height: 1;
  color: var(--border);
  letter-spacing: 1px;
}
.cw-zone-label { font-family: var(--sans); font-size: 26px; font-weight: 600; letter-spacing: -0.01em; }
.cw-zone-intro { color: var(--text-muted); margin-top: 10px; max-width: 64ch; }

/* ---- deliverables progress bar ---- */
.cw-prog { margin-bottom: 14px; }
.cw-prog-top { display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
.cw-prog-pct { font-family: var(--sans); font-size: 22px; font-weight: 600; color: var(--deep-sky); }
.cw-prog-date { font-family: var(--mono); font-size: 12px; letter-spacing: 1px; color: var(--text-muted); }
.cw-prog-track { height: 12px; background: rgba(58, 124, 165, 0.14); border: 1px solid var(--border); }
.cw-prog-fill { height: 100%; background: var(--orange); }

/* ---- New marker ---- */
.cw-new {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 3px 8px;
  background: var(--logo-orange);
  color: var(--bg);
}
.cw-new-inline { margin-left: 8px; padding: 2px 6px; }
```

- [ ] **Step 2: Offset the device bar below the jump nav.** Change `.cw-devbar` `top: 0;` to `top: 47px;` (so it sticks under the ~47px jump nav instead of colliding):

```css
.cw-devbar {
  position: sticky;
  top: 47px;
  ...
}
```

- [ ] **Step 3: Verify visually.** Start the dev server if not running (`npm run dev`), open `http://localhost:3000/clients/softco`, enter the password. Confirm: jump-nav is sticky and square-edged, zone headers show ghost numbers + label, progress bar fills, New tag is orange. No rounded corners anywhere.

- [ ] **Step 4: Commit**

```bash
git add src/app/clients/_components/workspace.css
git commit -m "style(clients): zone headers, sticky jump-nav, progress bar, New marker"
```

---

### Task 6: Re-zone the SoftCo data + responsive figure + meta

**Files:**
- Modify: `src/app/clients/softco/data.ts`

**Interfaces:**
- Consumes: every field added in Task 1.

- [ ] **Step 1: Add meta fields.** In `meta`, after `lastUpdated`, add the estimated date and zone intros (keep `feedbackContacts`):

```ts
  targetDate: "2026-07-11",
  zoneIntros: {
    deliverables: "Everything we're producing and where each piece stands.",
    brief: "SoftCo's own asset library, sent by John on 19 June. This is the brief: the existing formats the AI engine recreates and automates. It is not AI-made work.",
    work: "The AI versions we've made. The pieces to look at and react to.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
```

(Confirm the `2026-07-11` date with Paul before deploy; placeholder estimate until then.)

- [ ] **Step 2: Tag the brief sections with `zone: "brief"`.** Remove the standalone placeholder section `{ title: "The brief", kind: "gallery", badge: "Source material", desc: "...", items: [] }` entirely (its text now lives in `zoneIntros.brief`). On each remaining `Brief · …` section object, add `zone: "brief",` as the first property.

- [ ] **Step 3: Tag the feedback section** `{ title: "Feedback & responses", kind: "feedback", … }` with `zone: "feedback",`.

- [ ] **Step 4: Tag every showcase section** (Chart Ad set, Iceberg diagram, Testimonial cards, Blog & content cards, Social & event, Email banners, Blog header & thumbnail, Webinar & LinkedIn carousel, both LinkedIn carousels, Meeting background, Product Proof ad) with `zone: "work",`.

- [ ] **Step 5: Add the responsive blog-figure section** in the work zone (place it after "Blog header & thumbnail"):

```ts
  {
    title: "Blog figure · responsive",
    kind: "gallery",
    zone: "work",
    status: "ready",
    isNew: true,
    desc: "The e-invoicing readiness figure, the one piece laid out at two screen widths. Desktop and mobile.",
    items: [
      { src: "ae-blog-desktop.png", ratio: "1700/860", w: 560, cap: "Desktop" },
      { src: "ae-blog-mobile.png", ratio: "390/780", w: 180, cap: "Mobile" },
    ],
  },
```

(Confirm the two `ratio` values against the real PNG dimensions during the visual check; adjust `w`/`ratio` if either looks squashed.)

- [ ] **Step 6: Reorder `work[]`** so the array runs brief sections first, then work sections, then the feedback section last. The engine prints a zone header on each zone change, so the array MUST be grouped by zone in this order: all `zone:"brief"`, then all `zone:"work"`, then `zone:"feedback"`.

- [ ] **Step 7: Verify types compile**

Run: `cd ~/projects/fox-advantage-site-repo && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 8: Full visual verification.** Open `http://localhost:3000/clients/softco` (password-gated). Confirm:
  - Four zones in order Deliverables → What we've been given → The work → Feedback, each with header + ghost number + intro line.
  - Jump-nav links scroll to each zone; device bar sits below the nav inside The work without overlap.
  - Completion bar shows a % that matches the table by hand: with 15 `ready` + 1 `todo` of 16 rows, that is round(15/16*100) = **94%**. Verify the rendered number equals the hand maths.
  - "Blog figure · responsive" shows desktop + mobile side by side, neither squashed, with an orange New tag.
  - All existing media plays, carousels work, downloads download, feedback accordion opens.
  - No rounded corners, no #fff/#000, brand orange only on New tags + progress fill.

- [ ] **Step 9: Commit**

```bash
git add src/app/clients/softco/data.ts
git commit -m "feat(softco): re-zone page, add responsive blog figure, estimated date"
```

---

## Self-Review

- **Spec coverage:** Four zones + order (Tasks 4, 6) ✓; sticky jump-nav (Tasks 4, 5) ✓; computed completion bar with override (Tasks 2, 4) ✓; estimated date (Tasks 4, 6) ✓; New markers on deliverables + work (Tasks 3, 6) ✓; responsive blog figure in The work (Task 6) ✓; brand 100% /branded-page (Global Constraints, Task 5) ✓; out-of-scope items not added ✓.
- **Type consistency:** `ZoneKey` defined Task 1, used Tasks 2/4/6. `computeCompletion` / `ZONES` / `ZoneHead` defined Task 2, used Task 4. `STATUS_WEIGHT` keys match the `Status` union. `.cw-new` emitted Task 3, styled Task 5. `cw-z-{zone}` anchor ids (Task 2 ZoneHead) match jump-nav hrefs (Task 4).
- **Placeholder scan:** the only deferred values are the `targetDate` (flagged to confirm with Paul) and the figure `ratio` (flagged to confirm against real PNG dims) - both called out explicitly, not silent TODOs.
