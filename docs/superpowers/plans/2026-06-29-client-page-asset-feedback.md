# Client Page Asset Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a client approve / flag individual assets on their gated client page, leave comments, and hold a per-asset reply thread (Paul replies through Claude) - with the deliverables tracker rolling up the approvals, and a token-guarded read path so Claude can report the feedback on demand. No inbox involved.

**Architecture:** A single JSON blob per client in Upstash Redis (`feedback:{slug}`), following the existing `conversation-store.ts` pattern. Clients write via `"use server"` actions guarded by their existing per-slug auth cookie. The shared `ClientWorkspace` renderer gains an `<AssetFeedback>` control under each feedback-enabled media asset and a rollup on each tracker row. Claude reads/writes Paul's replies via a token-guarded admin API route. Pilot on SoftCo only; every other client page is untouched because the controls are opt-in per work section.

**Tech Stack:** Next.js 16 (App Router, React 19), TypeScript, `@upstash/redis`, server actions, existing `workspace.css`.

## Global Constraints

- **Deploy guardrail:** runwithfoxes.com deploys from `main`. Confirm `git branch --show-current` is `main` before any commit meant to ship. Do all build work on a feature branch `client-asset-feedback`; only Paul's explicit "ship it" merges to main.
- **Do NOT touch** the Isa chatbot, the homepage hero/nav, or any guarded homepage code. This work lives entirely under `src/app/clients/**`, `src/lib/`, and `src/app/api/clients/**`.
- **Brand hard rules:** no em dashes, no rounded corners, light mode only, fox only on cream. Controls reuse `workspace.css` tokens (`--st-ready` green approve, `--reject` style red, deep-sky, mono).
- **No new test runner.** This repo has none. Verify every task with `npx tsc --noEmit` (must pass clean) plus a dev-server visual check where UI changes. Do not add jest/vitest/playwright.
- **Graceful fallback:** every store function returns a safe empty value when Redis env vars are absent (copy the `getRedis()` pattern), so local dev and prod-without-env never throw.
- **Password never in `data.ts`.** Feedback store keys off `slug`; auth is the existing cookie. No secrets added to any client-shipped file.
- **Pilot scope:** enable feedback only on SoftCo work sections that opt in via `feedback: true`. Do not enable on `brief` zone or `feedback`-kind sections.

---

## File Structure

- **Create** `src/lib/client-feedback-store.ts` - Redis read/write for the per-client feedback blob. One responsibility: persistence + shapes.
- **Create** `src/app/clients/_components/feedback-actions.ts` - `"use server"` actions the client browser calls (set decision, add comment), each guarded by the per-slug auth cookie.
- **Create** `src/app/clients/_components/AssetFeedback.tsx` - `"use client"` UI under one asset: toggle, comment box, thread. Calls the server actions.
- **Create** `src/app/api/clients/[slug]/feedback/route.ts` - token-guarded GET (Claude reads all feedback) + POST (Paul's reply / reset, written as `who: "Paul"`).
- **Modify** `src/app/clients/_components/ClientWorkspace.tsx` - add `feedback?: boolean` to `WorkSection`; thread the `feedback` prop + actions through; render `<AssetFeedback>` under feedback-enabled media assets; compute tracker rollups.
- **Modify** `src/app/clients/softco/page.tsx` - fetch feedback server-side, pass it in.
- **Modify** `src/app/clients/softco/data.ts` - set `feedback: true` on the banner-set section (pilot).
- **Modify** `fox-advantage-site-repo/CLAUDE.md` - short note documenting the feature + the admin token + how Claude reads it.

### Data shapes (single source of truth - used across tasks)

```ts
// in src/lib/client-feedback-store.ts
export type Decision = "approve" | "reject" | null;

export interface ThreadEntry {
  who: "client" | "Paul";
  when: string;   // ISO timestamp
  text: string;
}

export interface AssetFeedback {
  decision: Decision;
  thread: ThreadEntry[];
  updatedAt: string; // ISO
}

export interface ClientFeedback {
  slug: string;
  assets: Record<string, AssetFeedback>; // key = assetId (the media src filename, unique per client)
}
```

**Asset identity:** `assetId` is the media `src` filename (e.g. `chart-300x250.mp4`), which is unique within a client's media folder. A re-upload under a NEW filename naturally detaches old feedback (the "fix resets the badge" behaviour). A same-filename swap keeps the decision - handled by Paul's `reset` admin action.

---

### Task 1: Feedback store (`client-feedback-store.ts`)

**Files:**
- Create: `src/lib/client-feedback-store.ts`

**Interfaces:**
- Consumes: `@upstash/redis` (already installed).
- Produces:
  - `getClientFeedback(slug: string): Promise<ClientFeedback>` - always returns an object (empty `assets` if unset/unconfigured).
  - `setAssetDecision(slug: string, assetId: string, decision: Decision): Promise<void>`
  - `appendThreadEntry(slug: string, assetId: string, who: "client" | "Paul", text: string): Promise<void>`
  - `resetAsset(slug: string, assetId: string): Promise<void>` - clears decision, keeps thread (so the conversation survives a re-do).
  - Types `Decision`, `ThreadEntry`, `AssetFeedback`, `ClientFeedback` (above).

- [ ] **Step 1: Write the store file**

```ts
import { Redis } from "@upstash/redis";

export type Decision = "approve" | "reject" | null;

export interface ThreadEntry {
  who: "client" | "Paul";
  when: string;
  text: string;
}

export interface AssetFeedback {
  decision: Decision;
  thread: ThreadEntry[];
  updatedAt: string;
}

export interface ClientFeedback {
  slug: string;
  assets: Record<string, AssetFeedback>;
}

// Mirror the existing getRedis() pattern in conversation-store.ts
function getRedis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const key = (slug: string) => `feedback:${slug}`;

function emptyAsset(): AssetFeedback {
  return { decision: null, thread: [], updatedAt: new Date().toISOString() };
}

export async function getClientFeedback(slug: string): Promise<ClientFeedback> {
  const redis = getRedis();
  if (!redis) return { slug, assets: {} };
  const stored = await redis.get<ClientFeedback>(key(slug));
  return stored ?? { slug, assets: {} };
}

async function mutate(
  slug: string,
  fn: (fb: ClientFeedback) => void
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const fb = (await redis.get<ClientFeedback>(key(slug))) ?? { slug, assets: {} };
  fn(fb);
  await redis.set(key(slug), fb);
}

export async function setAssetDecision(
  slug: string,
  assetId: string,
  decision: Decision
): Promise<void> {
  await mutate(slug, (fb) => {
    const a = (fb.assets[assetId] ??= emptyAsset());
    a.decision = decision;
    a.updatedAt = new Date().toISOString();
  });
}

export async function appendThreadEntry(
  slug: string,
  assetId: string,
  who: "client" | "Paul",
  text: string
): Promise<void> {
  const clean = text.trim();
  if (!clean) return;
  await mutate(slug, (fb) => {
    const a = (fb.assets[assetId] ??= emptyAsset());
    a.thread.push({ who, when: new Date().toISOString(), text: clean });
    a.updatedAt = new Date().toISOString();
  });
}

export async function resetAsset(slug: string, assetId: string): Promise<void> {
  await mutate(slug, (fb) => {
    const a = fb.assets[assetId];
    if (!a) return;
    a.decision = null;
    a.updatedAt = new Date().toISOString();
  });
}
```

- [ ] **Step 2: Typecheck**

Run: `cd ~/projects/fox-advantage-site-repo && npx tsc --noEmit`
Expected: PASS (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/lib/client-feedback-store.ts
git commit -m "feat(client-feedback): redis store for per-client asset feedback"
```

---

### Task 2: Server actions (`feedback-actions.ts`)

**Files:**
- Create: `src/app/clients/_components/feedback-actions.ts`

**Interfaces:**
- Consumes: `setAssetDecision`, `appendThreadEntry`, `Decision` from Task 1; `cookies` from `next/headers`.
- Produces (callable from client components):
  - `submitDecision(slug: string, assetId: string, decision: Decision): Promise<{ ok: boolean }>`
  - `submitComment(slug: string, assetId: string, text: string): Promise<{ ok: boolean }>`
- **Auth rule:** both verify the caller holds the client's auth cookie `{slug}_auth === "1"` (same cookie `verifyPassword` sets). No cookie → `{ ok: false }`, no write.

- [ ] **Step 1: Write the actions file**

```ts
"use server";

import { cookies } from "next/headers";
import {
  setAssetDecision,
  appendThreadEntry,
  type Decision,
} from "@/lib/client-feedback-store";

async function isClientAuthed(slug: string): Promise<boolean> {
  const store = await cookies();
  return store.get(`${slug}_auth`)?.value === "1";
}

export async function submitDecision(
  slug: string,
  assetId: string,
  decision: Decision
): Promise<{ ok: boolean }> {
  if (!(await isClientAuthed(slug))) return { ok: false };
  await setAssetDecision(slug, assetId, decision);
  return { ok: true };
}

export async function submitComment(
  slug: string,
  assetId: string,
  text: string
): Promise<{ ok: boolean }> {
  if (!(await isClientAuthed(slug))) return { ok: false };
  await appendThreadEntry(slug, assetId, "client", text);
  return { ok: true };
}
```

Note: confirm `@/` path alias resolves (check `tsconfig.json` `paths`); if the repo uses relative imports in `_components`, use `../../../lib/client-feedback-store` instead. Verify by matching how `ClientWorkspace.tsx`/`actions.ts` import siblings.

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/clients/_components/feedback-actions.ts
git commit -m "feat(client-feedback): auth-guarded server actions for decision + comment"
```

---

### Task 3: Admin read/write API route

**Files:**
- Create: `src/app/api/clients/[slug]/feedback/route.ts`

**Interfaces:**
- Consumes: `getClientFeedback`, `appendThreadEntry`, `resetAsset` from Task 1.
- Produces an HTTP surface for Claude:
  - `GET /api/clients/{slug}/feedback` with header `x-admin-token: <CLIENT_FEEDBACK_ADMIN_TOKEN>` → `200` JSON `ClientFeedback`, else `401`.
  - `POST` same path + header, JSON body `{ assetId: string, action: "reply" | "reset", text?: string }` → appends a `who:"Paul"` thread entry (reply) or clears the decision (reset). `400` on bad body, `401` on bad token.
- **Env:** `CLIENT_FEEDBACK_ADMIN_TOKEN` (new, server-only). Add to `.env.local` and Vercel project env.

- [ ] **Step 1: Write the route**

```ts
import { NextRequest, NextResponse } from "next/server";
import {
  getClientFeedback,
  appendThreadEntry,
  resetAsset,
} from "@/lib/client-feedback-store";

function authed(req: NextRequest): boolean {
  const token = process.env.CLIENT_FEEDBACK_ADMIN_TOKEN;
  return !!token && req.headers.get("x-admin-token") === token;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!authed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { slug } = await params;
  const fb = await getClientFeedback(slug);
  return NextResponse.json(fb);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!authed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { slug } = await params;
  let body: { assetId?: string; action?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const { assetId, action, text } = body;
  if (!assetId || !action) return NextResponse.json({ error: "missing fields" }, { status: 400 });

  if (action === "reply") {
    if (!text?.trim()) return NextResponse.json({ error: "empty reply" }, { status: 400 });
    await appendThreadEntry(slug, assetId, "Paul", text);
  } else if (action === "reset") {
    await resetAsset(slug, assetId);
  } else {
    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
```

Note: confirm Next 16 route param signature (`params` is a Promise in recent App Router). Match an existing dynamic route in `src/app/api/**` if present; otherwise the above is correct for Next 16.

- [ ] **Step 2: Add the env var**

Add `CLIENT_FEEDBACK_ADMIN_TOKEN=<long random string>` to `.env.local`. (Generate with `node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"`.) Tell Paul to add the same to Vercel → Project → Settings → Environment Variables before deploy.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/clients/
git commit -m "feat(client-feedback): token-guarded admin read/reply API"
```

---

### Task 4: `AssetFeedback` UI component

**Files:**
- Create: `src/app/clients/_components/AssetFeedback.tsx`

**Interfaces:**
- Consumes: `submitDecision`, `submitComment` from Task 2; `AssetFeedback` (data), `Decision`, `ThreadEntry` types from Task 1.
- Produces: default export `AssetFeedback` React component:
  ```ts
  function AssetFeedback(props: {
    slug: string;
    assetId: string;
    held?: boolean;                 // true => in-QA, controls disabled
    initial?: import("@/lib/client-feedback-store").AssetFeedback;
  }): JSX.Element
  ```
- Behaviour: optimistic local state; calls server actions on click/blur; auto-opens comment box when "Not yet" is chosen; renders the thread (client + Paul entries with who/date); shows a small "Saved" affordance. Uses `workspace.css` classes plus a scoped `cw-fb-*` block (added in this file via a `<style>`-free approach - extend `workspace.css` instead, see Task 5 note).

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useState } from "react";
import { submitDecision, submitComment } from "./feedback-actions";
import type { AssetFeedback as AssetFeedbackData, Decision, ThreadEntry } from "@/lib/client-feedback-store";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function AssetFeedback({
  slug,
  assetId,
  held = false,
  initial,
}: {
  slug: string;
  assetId: string;
  held?: boolean;
  initial?: AssetFeedbackData;
}) {
  const [decision, setDecision] = useState<Decision>(initial?.decision ?? null);
  const [thread, setThread] = useState<ThreadEntry[]>(initial?.thread ?? []);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState("");

  if (held) {
    return (
      <div className="cw-fb">
        <div className="cw-fb-toggle">
          <button type="button" disabled>Approve</button>
          <button type="button" disabled>Not yet</button>
        </div>
        <div className="cw-fb-hold">Hold - still in QA</div>
      </div>
    );
  }

  async function choose(next: Decision) {
    setDecision(next);
    if (next === "reject") setOpen(true);
    setSaved("Saved");
    setTimeout(() => setSaved(""), 1400);
    await submitDecision(slug, assetId, next);
  }

  async function postComment() {
    const text = draft.trim();
    if (!text) return;
    const entry: ThreadEntry = { who: "client", when: new Date().toISOString(), text };
    setThread((t) => [...t, entry]);
    setDraft("");
    setSaved("Saved");
    setTimeout(() => setSaved(""), 1400);
    await submitComment(slug, assetId, text);
  }

  return (
    <div className="cw-fb">
      <div className="cw-fb-toggle">
        <button type="button" className={decision === "approve" ? "on-approve" : ""} onClick={() => choose("approve")}>Approve</button>
        <button type="button" className={decision === "reject" ? "on-reject" : ""} onClick={() => choose("reject")}>Not yet</button>
      </div>

      {thread.length > 0 && (
        <div className="cw-fb-thread">
          {thread.map((e, i) => (
            <div key={i} className={`cw-fb-msg ${e.who === "Paul" ? "from-paul" : "from-client"}`}>
              <span className="cw-fb-who">{e.who === "Paul" ? "Paul" : "You"} · {fmtDate(e.when)}</span>
              <span className="cw-fb-text">{e.text}</span>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="cw-fb-ctoggle" onClick={() => setOpen((o) => !o)}>
        {thread.length ? "✎ add a reply" : "＋ comment"}
      </button>

      {open && (
        <div className="cw-fb-cbox">
          <textarea
            value={draft}
            placeholder="What would you change?"
            onChange={(e) => setDraft(e.target.value)}
          />
          <button type="button" className="cw-fb-send" onClick={postComment}>Save comment</button>
        </div>
      )}
      <div className="cw-fb-saved">{saved}</div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/clients/_components/AssetFeedback.tsx
git commit -m "feat(client-feedback): per-asset approve/comment/thread component"
```

---

### Task 5: Feedback styles in `workspace.css`

**Files:**
- Modify: `src/app/clients/_components/workspace.css` (append a `cw-fb-*` block at end)

**Interfaces:**
- Produces CSS classes consumed by Task 4: `.cw-fb`, `.cw-fb-toggle` (+ `button`, `.on-approve`, `.on-reject`), `.cw-fb-hold`, `.cw-fb-thread`, `.cw-fb-msg` (`.from-paul`/`.from-client`), `.cw-fb-who`, `.cw-fb-text`, `.cw-fb-ctoggle`, `.cw-fb-cbox`, `.cw-fb-send`, `.cw-fb-saved`.

- [ ] **Step 1: Append the style block** (square edges, mono, existing tokens; matches the mockup at `scratchpad/softco-asset-feedback-mockup.html`)

```css
/* ---- asset feedback (approve / comment / thread) ---- */
.cw-fb { margin-top: 9px; display: flex; flex-direction: column; gap: 7px; }
.cw-fb-toggle { display: flex; border: 1px solid var(--border); width: max-content; }
.cw-fb-toggle button {
  font-family: var(--mono); font-size: 10px; letter-spacing: .5px; text-transform: uppercase;
  padding: 5px 10px; border: 0; background: var(--bg); color: var(--text-muted);
  cursor: pointer; border-right: 1px solid var(--border);
}
.cw-fb-toggle button:last-child { border-right: 0; }
.cw-fb-toggle button.on-approve { background: var(--st-ready); color: #fff; font-weight: 500; }
.cw-fb-toggle button.on-reject { background: #b0291c; color: #fff; font-weight: 500; }
.cw-fb-toggle button:disabled { cursor: not-allowed; opacity: .45; }
.cw-fb-hold { font-size: 10px; letter-spacing: .5px; text-transform: uppercase; color: var(--st-prog); }
.cw-fb-thread { display: flex; flex-direction: column; gap: 6px; border-left: 2px solid var(--border); padding-left: 10px; }
.cw-fb-msg { display: flex; flex-direction: column; gap: 2px; }
.cw-fb-who { font-size: 9px; letter-spacing: .5px; text-transform: uppercase; color: var(--text-muted); }
.cw-fb-msg.from-paul .cw-fb-who { color: var(--st-signed); }
.cw-fb-text { font-family: var(--mono); font-size: 11px; line-height: 1.5; color: var(--text); }
.cw-fb-ctoggle { font-family: var(--mono); font-size: 10px; letter-spacing: .5px; color: var(--orange); background: none; border: 0; padding: 0; cursor: pointer; text-align: left; }
.cw-fb-ctoggle:hover { text-decoration: underline; }
.cw-fb-cbox { display: flex; flex-direction: column; gap: 6px; }
.cw-fb-cbox textarea {
  width: 100%; font-family: var(--mono); font-size: 11px; line-height: 1.5;
  background: var(--bg); border: 1px solid var(--border); padding: 7px 9px; resize: vertical; min-height: 48px;
}
.cw-fb-cbox textarea:focus { outline: none; border-color: var(--orange); }
.cw-fb-send {
  align-self: flex-start; font-family: var(--mono); font-size: 10px; letter-spacing: .5px; text-transform: uppercase;
  padding: 5px 12px; border: 1px solid var(--border); background: var(--deep-sky); color: var(--cream); cursor: pointer;
}
.cw-fb-saved { font-size: 9px; letter-spacing: .5px; text-transform: uppercase; color: var(--st-ready); height: 11px; }
```

- [ ] **Step 2: Commit**

```bash
git add src/app/clients/_components/workspace.css
git commit -m "feat(client-feedback): styles for asset feedback controls"
```

---

### Task 6: Wire the component into the renderer + compute rollups

**Files:**
- Modify: `src/app/clients/_components/ClientWorkspace.tsx`

**Interfaces:**
- Consumes: `AssetFeedback` (Task 4); `ClientFeedback` (Task 1).
- Produces: `ClientWorkspace` accepts a new prop `feedback?: ClientFeedback`; `WorkSection` gains `feedback?: boolean`; media assets in feedback-enabled sections render `<AssetFeedback>`; tracker rows show a rollup string.
- **Rollup rule:** for a deliverable with `anchor === "cw-s-<x>"`, find the work section whose generated id equals that anchor; count its feedback-eligible assets `total` and how many have `decision === "approve"` in `feedback.assets`. Display: all approved → `Approved`; some → `N / total approved` (+ ` · M need changes` when any `reject`); none touched → existing status label.

- [ ] **Step 1: Add `feedback?: boolean` to the `WorkSection` type** (after line 84, near other kind flags)

```ts
  feedback?: boolean;      // opt-in: render per-asset approve/comment/thread on this section's media
```

- [ ] **Step 2: Add `feedback` prop to the component signature and thread it to render.** Find the `ClientWorkspace` function props type and add:

```ts
  feedback?: ClientFeedback;
```
Add the import at top:
```ts
import AssetFeedback from "./AssetFeedback";
import type { ClientFeedback } from "@/lib/client-feedback-store";
```

- [ ] **Step 3: Render `<AssetFeedback>` under each media asset when `section.feedback` is true.** In the `Media` render path (the grouped/single/pair media rendering, around the `<Media .../>` call sites), wrap each tile so the control sits directly beneath it, passing `slug={meta.slug}`, `assetId={src}`, `held={section.qa === "pending"}`, `initial={feedback?.assets[src]}`. Each `src` is the tile's filename. (Match the exact JSX of the existing grouped/pair map; add the control as a sibling after the `<Media>`/caption within each item wrapper.)

- [ ] **Step 4: Compute and render the tracker rollup.** Where each deliverable row renders (the `cw-row` map), add a helper:

```ts
function rollupFor(anchor: string | undefined, work: WorkSection[], feedback?: ClientFeedback): string | null {
  if (!anchor || !feedback) return null;
  const section = work.find((s) => sectionId(s) === anchor && s.feedback);
  if (!section) return null;
  const srcs = collectAssetSrcs(section); // all media filenames in the section
  if (srcs.length === 0) return null;
  let approved = 0, rejected = 0;
  for (const src of srcs) {
    const d = feedback.assets[src]?.decision;
    if (d === "approve") approved++;
    else if (d === "reject") rejected++;
  }
  if (approved === srcs.length) return "Approved";
  if (approved === 0 && rejected === 0) return null; // fall back to status label
  return `${approved} / ${srcs.length} approved` + (rejected ? ` · ${rejected} need changes` : "");
}
```
Implement `sectionId(s)` to match the existing anchor-generation logic (the code already derives `id="cw-s-..."` from section titles - reuse that exact function; do not duplicate the slug logic). Implement `collectAssetSrcs(section)` to pull `src` from `section.item`, `section.items` (MediaItem), and `section.groups[].items[]`. Render the rollup in the deliverable row's status/sign-off cell when non-null, else the existing status label.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/clients/_components/ClientWorkspace.tsx
git commit -m "feat(client-feedback): render asset controls + tracker rollup"
```

---

### Task 7: Wire SoftCo page + enable on the banner set

**Files:**
- Modify: `src/app/clients/softco/page.tsx`
- Modify: `src/app/clients/softco/data.ts`

**Interfaces:**
- Consumes: `getClientFeedback` (Task 1); `feedback` prop (Task 6); `feedback: true` flag (Task 6).

- [ ] **Step 1: Fetch feedback server-side in `page.tsx`**

```tsx
import { getClientFeedback } from "@/lib/client-feedback-store";
// ...
export default async function SoftcoPage() {
  const authed = await checkAuth();
  const feedback = await getClientFeedback("softco");
  return (
    <ClientWorkspace
      initialAuth={authed}
      verifyAction={verifyPassword}
      meta={meta}
      deliverables={deliverables}
      work={work}
      feedback={feedback}
    />
  );
}
```

- [ ] **Step 2: Enable feedback on the banner-set section in `data.ts`.** Find the work section for the chart/banner set (id `cw-s-chart-ad-set`, the `chartTile` group) and add `feedback: true` to that section object. Leave all other sections (brief zone, feedback log, etc.) untouched.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/clients/softco/page.tsx src/app/clients/softco/data.ts
git commit -m "feat(client-feedback): enable asset feedback on SoftCo banner set"
```

---

### Task 8: End-to-end verification (dev server) + docs

**Files:**
- Modify: `fox-advantage-site-repo/CLAUDE.md` (document the feature + how Claude reads/replies)

- [ ] **Step 1: Set local env + run the dev server**

Ensure `.env.local` has the Upstash vars (already present for Isa) + the new `CLIENT_FEEDBACK_ADMIN_TOKEN`. Then:
Run: `npm run dev`
Open: `http://localhost:3000/clients/softco`, enter the password.

- [ ] **Step 2: Manual flow check (the spec's behaviours).** Verify each:
  - Each banner tile shows Approve / Not yet + comment.
  - Click Approve on a few → green state persists on reload (Redis write works).
  - Click Not yet → comment box auto-opens; save a comment → it appears in the thread on reload.
  - In-QA section (`qa: "pending"`) tiles show "Hold - still in QA", disabled.
  - Tracker row for the banner deliverable shows `N / 11 approved` and flips to `Approved` when all are approved.

- [ ] **Step 3: Screenshot + LOOK** (per Paul's hard rule - never describe-only)

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1280,1600 --screenshot=/tmp/softco-live.png "http://localhost:3000/clients/softco"
```
Read `/tmp/softco-live.png`; confirm it matches the mockup and brand rules (square edges, mono, cream, green/red states). Note: the headless shot won't pass the password gate; for the gated view, screenshot from the authed browser session or temporarily bypass via the dev cookie.

- [ ] **Step 4: Verify Claude's read path**

```bash
curl -s -H "x-admin-token: $CLIENT_FEEDBACK_ADMIN_TOKEN" http://localhost:3000/api/clients/softco/feedback | head
```
Expected: JSON with the decisions/comments just made. Then test a reply:
```bash
curl -s -X POST -H "x-admin-token: $CLIENT_FEEDBACK_ADMIN_TOKEN" -H "content-type: application/json" \
  -d '{"assetId":"chart-300x50.mp4","action":"reply","text":"Revised version is up, take another look."}' \
  http://localhost:3000/api/clients/softco/feedback
```
Reload the page; confirm Paul's reply shows in that asset's thread, labelled "Paul".

- [ ] **Step 5: Document in repo CLAUDE.md.** Add a short section: feature summary, that feedback lives in Upstash `feedback:{slug}`, the admin route + `CLIENT_FEEDBACK_ADMIN_TOKEN`, and the two commands above so any future Claude session knows how to answer "what's {client}'s feedback?" and how to post Paul's replies.

- [ ] **Step 6: Commit**

```bash
git add fox-advantage-site-repo/CLAUDE.md  # path relative to repo: CLAUDE.md
git commit -m "docs(client-feedback): document store, admin token, read/reply commands"
```

- [ ] **Step 7: Hand to Paul for review + deploy decision.** Show the screenshot and the curl output. Do NOT merge to `main` or push until Paul says "ship it". On approval: confirm `git branch --show-current`, then merge `client-asset-feedback` → `main`, push, and add `CLIENT_FEEDBACK_ADMIN_TOKEN` to Vercel env so production works.

---

## Self-Review

**Spec coverage:**
- Approve/not-yet per asset → Tasks 4, 6, 7. ✓
- Comment per asset → Tasks 4, 2. ✓
- Threaded replies, Paul replies through Claude → Task 3 (POST reply), Task 4 (thread render). ✓
- Fix resets badge → filename-based assetId (re-upload new name) + `resetAsset` admin action (Task 1/3). ✓
- Tracker rolls up, read-only → Task 6 Step 4. ✓
- Claude reads feedback on demand → Task 3 GET + Task 8 Step 4. ✓
- No email/notification → none built (by design). ✓
- Saves live, no submit for decisions → Task 4 optimistic + action on click. ✓ (comments use an explicit "Save comment" to avoid half-typed writes - minor, matches mockup's debounce intent.)
- In-QA hold → Task 4 `held` + Task 6 `qa==="pending"`. ✓
- Pilot SoftCo, others untouched → opt-in `feedback: true`, Task 7. ✓

**Placeholder scan:** Renderer wiring in Task 6 Steps 3-4 references "match the exact JSX / reuse the existing function" rather than pasting the full 850-line file's surrounding code - this is deliberate (the executor reads the live file), but `rollupFor`, `sectionId`, `collectAssetSrcs` responsibilities are specified. Acceptable given the modify-in-place nature; not a TBD.

**Type consistency:** `Decision`, `ThreadEntry`, `AssetFeedback`, `ClientFeedback` defined once in Task 1 and imported everywhere. Action names `submitDecision`/`submitComment` consistent across Tasks 2 and 4. API actions `reply`/`reset` consistent across Tasks 1 and 3. `assetId === src` consistent throughout.

**Open verification risk:** the `@/` import alias and the Next 16 dynamic-route `params` Promise signature are assumptions to confirm against the live repo in Task 2/3 Step 1 (notes included).
