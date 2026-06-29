"use client";

/* Shared client-workspace renderer for runwithfoxes.com/clients/{slug}.
   Every client page imports this and feeds it data from its own data.ts.
   Generated/maintained by the /client-page skill. Brand: Run with Foxes.

   Escape hatch: if a client needs a bespoke layout, copy this file into the
   client's folder, edit it there, and point that page.tsx at the copy. Other
   clients are unaffected. */

import { useState, useTransition, useRef, useEffect } from "react";
import Link from "next/link";
import AssetFeedback from "./AssetFeedback";
import type { ClientFeedback } from "@/lib/client-feedback-store";

/* ---- types (kept permissive so data.ts is easy to hand-edit) ---- */
type Status = "complete" | "signed-off" | "ready" | "in-progress" | "paused" | "todo";
type ZoneKey = "deliverables" | "brief" | "work" | "feedback";

export type Meta = {
  client: string;
  slug: string;
  headline: string;
  intro: string;
  lastUpdated: string;
  feedbackContacts?: string[];  // client emails whose replies count as feedback
  pageShareThread?: string;     // Gmail thread/message id of the page-share email
  targetDate?: string;          // estimated completion date, shown by the progress bar
  completionOverride?: number;  // manual % override; if unset, % is computed from statuses
  hideProgress?: boolean;       // hides the completion bar + "X of Y ready" count line
  zoneIntros?: Partial<Record<ZoneKey, string>>; // per-zone description line under each zone header
};

export type Deliverable = {
  name: string;
  detail: string;
  status: Status;
  date?: string;
  target?: string;
  note?: string;
  isNew?: boolean;              // renders a "New" tag on the row
  anchor?: string;              // optional: a work-section id (e.g. "cw-s-chart-ad-set") to jump to when the name is clicked
  statusLabel?: string;         // overrides the status pill text (keeps the status colour); for bespoke states like "Reviewed and paused by Darren"
  download?: { file: string; label?: string };  // file in public/clients/{slug}/media/, renders a download link in the note cell
};

type MediaItem = {
  src: string;
  poster?: string;
  ratio?: string;
  w?: number;
  cap?: string;
  download?: boolean;
  player?: boolean;   // video: show controls + sound, don't autoplay (for clips with audio)
};
type MediaGroup = { label: string; items: MediaItem[] };
type PairItem = { key?: string; name: string; src: string; img: string; poster?: string };
type CopyBlock = { label?: string; text: string; mono?: boolean };
type FileRow = { name: string; file?: string; note?: string; date?: string; pending?: boolean };
/* feedback kind: one entry in the commentary log. q is an array so two points
   that share one answer render as one row. a:"" renders as "pending".
   who/when attribute the entry (person + date) so a multi-person, multi-day
   log stays traceable. */
type FaqItem = { q: string[]; a: string; who?: string; when?: string };
/* One email rendered as an email. Blocks render in order; set exactly one key. */
type EmailBlock = {
  p?: string;                              // body paragraph
  h?: string;                              // bold sub-header (e.g. "What you will learn:")
  ul?: string[];                           // bullet list
  cta?: { label: string; href?: string };  // styled CTA button
  sign?: string;                            // sign-off block (divider above, keeps line breaks)
  note?: string;                            // muted structural line (hero-image marker, gap caption)
};

export type WorkSection = {
  title: string;
  status?: Status;
  desc?: string;
  wideDesc?: boolean;      // lets a long desc run the full content width instead of the 660px reading column
  badge?: string;
  zone?: ZoneKey;          // which zone this section belongs to (default "work")
  qa?: "pass" | "pending" | "fail"; // QA badge: passed the gate / not yet checked / failed, do not use
  groupLabel?: string;     // renders a divider sub-heading above this section (group split)
  isNew?: boolean;         // renders a "New" tag in the section head
  date?: string;          // feedback kind: the round date, shown as the badge
  feedback?: boolean;      // opt-in: render per-asset approve/comment/thread on this section's media
  kind: "media" | "copy" | "files" | "gallery" | "email" | "compare" | "feedback" | "responsive" | "embed" | "html";
  layout?: "grouped" | "pair" | "single";
  // responsive kind: one piece at two layouts, toggled live between a desktop
  // browser frame and a phone frame.
  desktopSrc?: string;
  mobileSrc?: string;
  desktopRatio?: string;
  mobileRatio?: string;
  context?: string;       // url/label shown in the device chrome
  // true-size device preview: where this asset actually runs. feed/email render
  // inside a device frame at true size; display/web (and unset) render as before.
  placement?: "feed" | "email" | "display" | "web";
  carousel?: boolean;     // feed placement: items are slides of one carousel
  // feedback kind:
  intro?: string;         // optional framing line above the accordion
  responder?: string;     // answer label (default "Response"), e.g. "Paul"
  faq?: FaqItem[];        // the Q&A rows
  note?: string;          // optional closing line below the accordion
  // compare kind: before/after wipe slider
  compare?: { before: string; after: string; ratio?: string; w?: number; labelBefore?: string; labelAfter?: string; download?: boolean; accent?: string; bg?: string };
  groups?: MediaGroup[];
  item?: MediaItem;
  items?: (MediaItem | PairItem)[];
  blocks?: CopyBlock[];
  files?: FileRow[];
  // embed kind: a live, self-contained HTML page shown in an iframe, with an
  // "open full screen" link. The file lives in the client's media folder.
  embedSrc?: string;      // html file name in public/clients/{slug}/media/
  embedHeight?: number;   // iframe height in px (default 720)
  // html kind: a self-contained HTML string rendered INLINE (no iframe). Styles
  // must be scoped under a wrapper class so they don't leak into the workspace.
  html?: string;
  // email kind:
  prompt?: string;        // the prompt shown above the email card
  from?: string;          // sender label in the email bar (e.g. "Sabre")
  subject?: string;       // subject line
  preheader?: string;     // muted preview line under the subject
  emailBody?: EmailBlock[];
};

const STATUS_LABEL: Record<Status, string> = {
  complete: "Complete",
  "signed-off": "Signed off",
  ready: "Ready for feedback",
  "in-progress": "In progress",
  paused: "Paused",
  todo: "To do",
};

const ZONES: Record<ZoneKey, { num: string; label: string }> = {
  deliverables: { num: "01", label: "Deliverables" },
  brief: { num: "02", label: "What we've been given" },
  work: { num: "03", label: "The work" },
  feedback: { num: "04", label: "Feedback" },
};

const STATUS_WEIGHT: Record<Status, number> = { complete: 1, "signed-off": 1, ready: 1, "in-progress": 0.5, paused: 0.5, todo: 0 };

function computeCompletion(deliverables: Deliverable[], override?: number): number {
  if (typeof override === "number") return override;
  if (deliverables.length === 0) return 0;
  const sum = deliverables.reduce((acc, d) => acc + STATUS_WEIGHT[d.status], 0);
  return Math.round((sum / deliverables.length) * 100);
}

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/* Flatten an email section to plain text for the copy button. */
function emailToText(s: WorkSection): string {
  const parts: string[] = [];
  if (s.subject) parts.push(`Subject: ${s.subject}`);
  if (s.preheader) parts.push(`Preheader: ${s.preheader}`);
  for (const b of s.emailBody || []) {
    if (b.h) parts.push(b.h);
    if (b.note) parts.push(b.note);
    if (b.p) parts.push(b.p);
    if (b.ul) parts.push(b.ul.map((li) => `- ${li}`).join("\n"));
    if (b.cta) parts.push(`[ ${b.cta.label} ]`);
    if (b.sign) parts.push(b.sign);
  }
  return parts.join("\n\n");
}

/* ---- small pieces ---- */
function Media({ src, poster, ratio = "1 / 1", base, player }: { src: string; poster?: string; ratio?: string; base: string; player?: boolean }) {
  const url = `${base}/${src}`;
  return (
    <div className="cw-tile" style={{ aspectRatio: ratio }}>
      {isVideo(src) ? (
        player ? (
          <video src={url} poster={poster ? `${base}/${poster}` : undefined} controls playsInline preload="metadata" />
        ) : (
          <video src={url} poster={poster ? `${base}/${poster}` : undefined} autoPlay loop muted playsInline preload="metadata" />
        )
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={src} />
      )}
    </div>
  );
}

/* before/after wipe slider - drag (or click) to reveal the "before" over the "after".
   Either side can be a still (png/jpg/gif) or a video (mp4/webm/mov). When both are
   videos they are kept frame-synced so the wipe reveals the SAME moment in each loop. */
const cmpIsVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src);

function Compare({ before, after, ratio = "16 / 9", labelBefore, labelAfter, base, accent, bg }:
  { before: string; after: string; ratio?: string; labelBefore?: string; labelAfter?: string; base: string; accent?: string; bg?: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const beforeVid = useRef<HTMLVideoElement>(null);
  const afterVid = useRef<HTMLVideoElement>(null);
  const move = (clientX: number) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  // keep the two videos locked to the same playback moment (durations may differ slightly)
  const sync = () => {
    const a = afterVid.current, b = beforeVid.current;
    if (!a || !b || !b.duration) return;
    const t = a.currentTime % b.duration;
    if (Math.abs(b.currentTime - t) > 0.08) b.currentTime = t;
  };
  const themeVars = {
    ...(accent ? { ["--cmp-accent" as string]: accent } : {}),
    ...(bg ? { ["--cmp-bg" as string]: bg } : {}),
  } as React.CSSProperties;
  // muted must be set imperatively too - React doesn't reflect the `muted` attr to the DOM,
  // which silently blocks autoplay (the spread-vs-inline gotcha). Set muted imperatively on mount;
  // the onCanPlay handler below is the bulletproof kick (a canplay listener races and is missed).
  useEffect(() => {
    [afterVid.current, beforeVid.current].forEach((v) => { if (v) v.muted = true; });
  }, []);
  const kick = (e: React.SyntheticEvent<HTMLVideoElement>) => { e.currentTarget.play().catch(() => {}); };
  return (
    <div className="cw-compare" ref={ref} style={{ aspectRatio: ratio, ...themeVars }}
      onMouseDown={(e) => move(e.clientX)}
      onMouseMove={(e) => { if (e.buttons === 1) move(e.clientX); }}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}>
      {/* eslint-disable @next/next/no-img-element */}
      {cmpIsVideo(after)
        ? <video className="cw-cmp-img" ref={afterVid} src={`${base}/${after}`} onTimeUpdate={sync} onCanPlay={kick}
            autoPlay loop muted playsInline preload="auto" />
        : <img className="cw-cmp-img" src={`${base}/${after}`} alt={labelAfter || "after"} draggable={false} />}
      {cmpIsVideo(before)
        ? <video className="cw-cmp-img" ref={beforeVid} src={`${base}/${before}`} onCanPlay={kick}
            autoPlay loop muted playsInline preload="auto" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        : <img className="cw-cmp-img" src={`${base}/${before}`} alt={labelBefore || "before"} draggable={false}
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />}
      {/* eslint-enable @next/next/no-img-element */}
      <div className="cw-cmp-handle" style={{ left: `${pos}%` }}><span /></div>
      {labelBefore && <div className="cw-cmp-lab cw-cmp-lab-l">{labelBefore}</div>}
      {labelAfter && <div className="cw-cmp-lab cw-cmp-lab-r">{labelAfter}</div>}
    </div>
  );
}

function DownloadLink({ src, base }: { src: string; base: string }) {
  return (
    <a className="cw-download" href={`${base}/${src}`} download>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
      </svg>
      Download
    </a>
  );
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="cw-copy"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        });
      }}
    >
      {done ? (
        "Copied"
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" /><path d="M5 15V5h10" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

/* feedback kind: click-to-expand Q&A accordion. Holds its own open-state. */
function Faq({ intro, items, note, responder = "Response" }:
  { intro?: string; items: FaqItem[]; note?: string; responder?: string }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <>
      {intro && <p className="cw-fb-intro">{intro}</p>}
      <div className="cw-acc">
        {items.map((it, i) => {
          const isOpen = open.has(i);
          return (
            <div className={`cw-acc-item${isOpen ? " open" : ""}`} key={i}>
              <button className="cw-acc-q" aria-expanded={isOpen} onClick={() => toggle(i)}>
                <span className="cw-acc-mark">{isOpen ? "−" : "+"}</span>
                <span className="cw-acc-qtext">
                  {(it.who || it.when) && (
                    <span className="cw-acc-who">
                      {[it.who, it.when].filter(Boolean).join(" · ")}
                    </span>
                  )}
                  {it.q.map((line, j) => <span key={j}>{line}</span>)}
                </span>
              </button>
              {isOpen && (
                <div className="cw-acc-a">
                  {it.a ? (
                    <>
                      <span className="cw-acc-alabel">{responder}</span>
                      <p>{it.a}</p>
                    </>
                  ) : (
                    <span className="cw-acc-pending">Response pending</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {note && <p className="cw-fb-note">{note}</p>}
    </>
  );
}

/* ---- true-size device preview ---- */
type Device = "desktop" | "mobile";

// True display widths (CSS px) per placement + device. One source of truth;
// the QA font check reads the same table.
const TRUE_W: Record<"feed" | "email", Record<Device, number>> = {
  feed: { desktop: 555, mobile: 390 },
  email: { desktop: 600, mobile: 390 },
};

function DeviceToggle({ device, setDevice }: { device: Device; setDevice: (d: Device) => void }) {
  return (
    <div className="cw-devtoggle">
      <span className="cw-devtoggle-label">Preview as</span>
      <div className="cw-devtoggle-pills">
        <button className={device === "desktop" ? "on" : ""} onClick={() => setDevice("desktop")}>Desktop</button>
        <button className={device === "mobile" ? "on" : ""} onClick={() => setDevice("mobile")}>Mobile</button>
      </div>
    </div>
  );
}

// Wraps an asset in realistic device chrome. Hugs its content (true size).
function DeviceFrame({ device, kind, context, children }:
  { device: Device; kind: "browser" | "email"; context: string; children: React.ReactNode }) {
  if (device === "mobile") {
    return (
      <div className="cw-phone">
        <div className="cw-phone-status"><span>9:41</span><span className="cw-phone-ico" /></div>
        <div className="cw-phone-scr">{children}</div>
      </div>
    );
  }
  if (kind === "email") {
    return (
      <div className="cw-emailfr">
        <div className="cw-emailfr-bar"><span className="cw-emailfr-from">{context}</span></div>
        <div className="cw-emailfr-body">{children}</div>
      </div>
    );
  }
  return (
    <div className="cw-browser">
      <div className="cw-browser-bar">
        <span className="cw-dot" /><span className="cw-dot" /><span className="cw-dot" />
        <span className="cw-url">{context}</span>
      </div>
      <div className="cw-browser-body">{children}</div>
    </div>
  );
}

// One-slide-at-a-time carousel at true size, like a real feed.
function FeedCarousel({ items, width, base }: { items: MediaItem[]; width: number; base: string }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const it = items[i];
  return (
    <div className="cw-fcar" style={{ width }}>
      <div className="cw-fcar-stage" style={{ width }}>
        <div style={{ width }}><Media src={it.src} poster={it.poster} ratio={it.ratio || "1/1"} base={base} /></div>
        {n > 1 && <button className="cw-fcar-nav cw-fcar-prev" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous">‹</button>}
        {n > 1 && <button className="cw-fcar-nav cw-fcar-next" onClick={() => setI((i + 1) % n)} aria-label="Next">›</button>}
      </div>
      {n > 1 && (
        <div className="cw-fcar-dots">
          {items.map((_, j) => <button key={j} className={j === i ? "on" : ""} onClick={() => setI(j)} aria-label={`Slide ${j + 1}`} />)}
        </div>
      )}
      <div className="cw-fcar-cap">{i + 1} / {n}{it.cap ? ` · ${it.cap}` : ""}</div>
    </div>
  );
}

// The framed, true-size body for feed/email placements.
function PreviewBody({ s, base, device }: { s: WorkSection; base: string; device: Device }) {
  const items = (s.items as MediaItem[] | undefined) || [];
  if (s.placement === "email") {
    const width = TRUE_W.email[device];
    return (
      <div className="cw-previews">
        {items.map((it, idx) => (
          <figure className="cw-preview-fig" key={idx}>
            <DeviceFrame device={device} kind="email" context="SoftCo · marketing email">
              <div style={{ width }}><Media src={it.src} ratio={it.ratio} base={base} /></div>
            </DeviceFrame>
            <figcaption>True size in an email{it.cap ? ` · ${it.cap}` : ""}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  const width = TRUE_W.feed[device];
  if (s.carousel) {
    return (
      <figure className="cw-preview-fig">
        <DeviceFrame device={device} kind="browser" context="linkedin.com/feed">
          <FeedCarousel items={items} width={width} base={base} />
        </DeviceFrame>
        <figcaption>True size in the LinkedIn feed · {device === "mobile" ? "mobile" : "13″ laptop"}</figcaption>
      </figure>
    );
  }
  return (
    <div className="cw-previews">
      {items.map((it, idx) => (
        <figure className="cw-preview-fig" key={idx}>
          <DeviceFrame device={device} kind="browser" context="linkedin.com/feed">
            <div style={{ width }}><Media src={it.src} poster={it.poster} ratio={it.ratio || "1/1"} base={base} /></div>
          </DeviceFrame>
          {it.cap && <figcaption>{it.cap}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function ZoneHead({ zone, intro, num }: { zone: ZoneKey; intro?: string; num: string }) {
  const z = ZONES[zone];
  return (
    <header className="cw-zone" id={`cw-z-${zone}`}>
      <div className="cw-zone-head">
        <span className="cw-zone-num">{num}</span>
        <h2 className="cw-zone-label">{z.label}</h2>
      </div>
      {intro && <p className="cw-zone-intro">{intro}</p>}
    </header>
  );
}

// One piece shown at two layouts, toggled live between a desktop browser frame
// and a phone frame. Self-contained: its own device state + toggle sit on it.
function ResponsiveFigure({ s, base }: { s: WorkSection; base: string }) {
  const [device, setDevice] = useState<Device>("desktop");
  const ctx = s.context || "softco.com";
  return (
    <div className="cw-resp">
      <DeviceToggle device={device} setDevice={setDevice} />
      <figure className="cw-preview-fig cw-resp-fig">
        {device === "desktop" ? (
          <DeviceFrame device="desktop" kind="browser" context={ctx}>
            <div style={{ width: 660 }}>
              <Media src={s.desktopSrc || ""} ratio={s.desktopRatio || "16/9"} base={base} />
            </div>
          </DeviceFrame>
        ) : (
          <DeviceFrame device="mobile" kind="browser" context={ctx}>
            <div style={{ width: 300 }}>
              <Media src={s.mobileSrc || ""} ratio={s.mobileRatio || "9/16"} base={base} />
            </div>
          </DeviceFrame>
        )}
        <figcaption>The same page, {device === "desktop" ? "desktop layout" : "mobile layout"} · flip the toggle to compare</figcaption>
      </figure>
    </div>
  );
}

// stable id for a work section, so deliverable rows can jump to it as a bookmark
const cwSlug = (t: string) =>
  "cw-s-" + t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Every media filename in a section, across its single/items/grouped shapes.
// assetId for the feedback control is the tile's src. PairItem: include src, ignore img.
function collectAssetSrcs(section: WorkSection): string[] {
  const srcs: string[] = [];
  if (section.item?.src) srcs.push(section.item.src);
  for (const it of section.items || []) {
    if ("src" in it && it.src) srcs.push(it.src);
  }
  for (const g of section.groups || []) {
    for (const it of g.items) {
      if (it.src) srcs.push(it.src);
    }
  }
  return srcs;
}

// Tracker rollup string for a deliverable, derived from per-asset decisions in
// its anchored work section. Returns null to fall back to the status label.
function rollupFor(d: Deliverable, work: WorkSection[], feedback?: ClientFeedback): string | null {
  if (!d.anchor || !feedback) return null;
  const section = work.find((s) => cwSlug(s.title) === d.anchor && s.feedback);
  if (!section) return null;
  const srcs = collectAssetSrcs(section);
  if (srcs.length === 0) return null;
  let approved = 0, rejected = 0;
  for (const src of srcs) {
    const dec = feedback.assets[src]?.decision;
    if (dec === "approve") approved++;
    else if (dec === "reject") rejected++;
  }
  if (approved === srcs.length) return "Approved";
  if (approved === 0 && rejected === 0) return null;
  return `${approved} / ${srcs.length} approved` + (rejected ? ` · ${rejected} need changes` : "");
}

function SectionHead({ s }: { s: WorkSection }) {
  const label = s.badge || s.date || (s.status ? STATUS_LABEL[s.status] : "");
  return (
    <div className="cw-sec-head">
      <h2>{s.title}</h2>
      {s.isNew && <span className="cw-new">New</span>}
      {label && <span className="cw-badge">{label}</span>}
      {s.qa === "pass" && <span className="cw-qa cw-qa-pass">QA passed</span>}
      {s.qa === "pending" && <span className="cw-qa cw-qa-pending">In QA</span>}
      {s.qa === "fail" && <span className="cw-qa cw-qa-fail">Fail QA · don&rsquo;t use</span>}
    </div>
  );
}

/* ---- work-section renderers by kind ---- */
function WorkBlock({ s, base, slug, feedback }: { s: WorkSection; base: string; slug: string; feedback?: ClientFeedback }) {
  const [device, setDevice] = useState<Device>("desktop");
  const previewed = s.placement === "feed" || s.placement === "email";
  return (
    <section className="cw-sec">
      <SectionHead s={s} />
      {s.desc && <p className={s.wideDesc ? "cw-desc cw-desc-wide" : "cw-desc"}>{s.desc}</p>}

      {previewed && (
        <>
          <div className="cw-secdev"><DeviceToggle device={device} setDevice={setDevice} /></div>
          <PreviewBody s={s} base={base} device={device} />
        </>
      )}

      {!previewed && s.kind === "media" && s.layout === "grouped" && (s.groups || []).map((g) => (
        <div className="cw-chart-group" key={g.label}>
          <div className="cw-chart-label">{g.label}</div>
          <div className="cw-chart-row">
            {g.items.map((it) => (
              <div className="cw-chart-item" key={it.src} style={{ width: it.w }}>
                <Media src={it.src} poster={it.poster} ratio={it.ratio} base={base} player={it.player} />
                {it.cap && <div className="cw-cap">{it.cap}</div>}
                {it.download && <DownloadLink src={it.src} base={base} />}
                {s.feedback && <AssetFeedback slug={slug} assetId={it.src} held={s.qa === "pending"} initial={feedback?.assets[it.src]} />}
              </div>
            ))}
          </div>
        </div>
      ))}

      {!previewed && s.kind === "media" && s.layout === "single" && s.item && (
        <figure className="cw-figure" style={{ width: s.item.w || 320 }}>
          <Media src={s.item.src} poster={s.item.poster} ratio={s.item.ratio} base={base} player={s.item.player} />
          {s.item.cap && <figcaption>{s.item.cap}</figcaption>}
          {s.item.download && <DownloadLink src={s.item.src} base={base} />}
          {s.feedback && <AssetFeedback slug={slug} assetId={s.item.src} held={s.qa === "pending"} initial={feedback?.assets[s.item.src]} />}
        </figure>
      )}

      {!previewed && s.kind === "media" && s.layout === "pair" && (
        <div className="cw-pair-grid">
          {(s.items as PairItem[] | undefined)?.map((it) => (
            <figure key={it.key || it.name}>
              <div className="cw-pair-name">{it.name}</div>
              <Media src={it.src} poster={it.poster} base={base} />
              <div className="cw-submark">Animated</div>
              <Media src={it.img} base={base} />
              <div className="cw-submark">Static</div>
            </figure>
          ))}
        </div>
      )}

      {!previewed && s.kind === "compare" && s.compare && (
        <figure className="cw-figure" style={{ width: s.compare.w || 760 }}>
          <Compare before={s.compare.before} after={s.compare.after} ratio={s.compare.ratio}
            labelBefore={s.compare.labelBefore} labelAfter={s.compare.labelAfter} base={base}
            accent={s.compare.accent} bg={s.compare.bg} />
          {s.compare.download && <DownloadLink src={s.compare.after} base={base} />}
        </figure>
      )}

      {!previewed && s.kind === "gallery" && (
        <div className="cw-gallery">
          {(s.items as MediaItem[] | undefined)?.map((it) => (
            <figure key={it.src} style={{ width: it.w }}>
              <Media src={it.src} poster={it.poster} ratio={it.ratio} base={base} player={it.player} />
              {it.cap && <figcaption>{it.cap}</figcaption>}
              {it.download && <DownloadLink src={it.src} base={base} />}
              {s.feedback && <AssetFeedback slug={slug} assetId={it.src} held={s.qa === "pending"} initial={feedback?.assets[it.src]} />}
            </figure>
          ))}
        </div>
      )}

      {s.kind === "copy" && (
        <div className="cw-copy-stack">
          {(s.blocks || []).map((b, i) => (
            <div className="cw-copy-block" key={b.label || i}>
              <div className="cw-copy-head">
                {b.label && <span className="cw-copy-label">{b.label}</span>}
                <CopyButton text={b.text} />
              </div>
              <pre className={b.mono ? "cw-copy-text mono" : "cw-copy-text"}>{b.text}</pre>
            </div>
          ))}
        </div>
      )}

      {s.kind === "email" && (
        <div className="cw-email-wrap">
          {s.prompt && (
            <div className="cw-copy-block">
              <div className="cw-copy-head">
                <span className="cw-copy-label">Prompt</span>
                <CopyButton text={s.prompt} />
              </div>
              <pre className="cw-copy-text mono">{s.prompt}</pre>
            </div>
          )}
          <div className="cw-email">
            <div className="cw-email-bar">
              <span className="cw-email-from">{s.from || "Email"}</span>
              <CopyButton text={emailToText(s)} />
            </div>
            {s.subject && <div className="cw-email-subject">{s.subject}</div>}
            {s.preheader && <div className="cw-email-pre">{s.preheader}</div>}
            <div className="cw-email-body">
              {(s.emailBody || []).map((b, i) => {
                if (b.h) return <p className="cw-email-h" key={i}>{b.h}</p>;
                if (b.note) return <p className="cw-email-note" key={i}>{b.note}</p>;
                if (b.p) return <p className="cw-email-p" key={i}>{b.p}</p>;
                if (b.ul)
                  return (
                    <ul className="cw-email-ul" key={i}>
                      {b.ul.map((li, j) => <li key={j}>{li}</li>)}
                    </ul>
                  );
                if (b.cta)
                  return (
                    <a className="cw-email-cta" key={i} href={b.cta.href || "#"} onClick={(e) => !b.cta?.href && e.preventDefault()}>
                      {b.cta.label}
                    </a>
                  );
                if (b.sign) return <div className="cw-email-sign" key={i}>{b.sign}</div>;
                return null;
              })}
            </div>
          </div>
        </div>
      )}

      {s.kind === "embed" && s.embedSrc && (
        <div className="cw-embed">
          <iframe
            className="cw-embed-frame"
            src={`${base}/${s.embedSrc}`}
            style={{ height: s.embedHeight || 720 }}
            title={s.title}
            loading="lazy"
          />
          <a className="cw-embed-open" href={`${base}/${s.embedSrc}`} target="_blank" rel="noopener noreferrer">
            Open full screen
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M14 5h5v5M19 5l-8 8M11 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-5" />
            </svg>
          </a>
        </div>
      )}

      {s.kind === "html" && s.html && (
        <div className="cw-html" dangerouslySetInnerHTML={{ __html: s.html }} />
      )}

      {s.kind === "responsive" && <ResponsiveFigure s={s} base={base} />}

      {s.kind === "feedback" && (
        (s.faq && s.faq.length > 0) ? (
          <Faq intro={s.intro} items={s.faq} note={s.note} responder={s.responder} />
        ) : (
          <p className="cw-fb-note">
            {s.intro || "No feedback logged yet. Send your thoughts and they'll appear here as a shared record we can both see."}
          </p>
        )
      )}

      {s.kind === "files" && (
        <div className="cw-files">
          {(s.files || []).map((f) => (
            <div className="cw-file-row" key={f.name}>
              <span className="cw-file-name">{f.name}</span>
              {f.note && <span className="cw-file-note">{f.note}</span>}
              {f.date && <span className="cw-file-date">Uploaded {f.date}</span>}
              {f.file && !f.pending
                ? <DownloadLink src={f.file} base={base} />
                : <span className="cw-file-pending">In progress</span>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---- the page ---- */
export default function ClientWorkspace({
  initialAuth,
  verifyAction,
  meta,
  deliverables,
  work,
  feedback,
}: {
  initialAuth: boolean;
  verifyAction: (password: string) => Promise<boolean>;
  meta: Meta;
  deliverables: Deliverable[];
  work: WorkSection[];
  feedback?: ClientFeedback;
}) {
  const [authed, setAuthed] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const ok = await verifyAction(password);
      if (ok) setAuthed(true);
      else {
        setError("Wrong password.");
        setPassword("");
      }
    });
  }

  if (!authed) {
    return (
      <div className="cw-gate">
        <div className="cw-gate-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cw-fox" src="/fox/chapter-fox-sitting-nobg.png" alt="" />
          <div className="cw-logo">/<span>Run</span>withfoxes</div>
          <div className="cw-gate-label">clients / {meta.slug}</div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              autoFocus
              disabled={isPending}
            />
            <button type="submit" disabled={isPending}>
              {isPending ? "checking…" : "enter"}
            </button>
          </form>
          {error && <div className="cw-gate-error">{error}</div>}
        </div>
      </div>
    );
  }

  const base = `/clients/${meta.slug}/media`;
  const readyCount = deliverables.filter((d) => d.status === "ready").length;
  const hasTarget = deliverables.some((d) => d.target);
  const cols = hasTarget ? "1.2fr 1.6fr 0.9fr 0.7fr 0.7fr 1.4fr" : "1.2fr 1.6fr 0.9fr 0.7fr 1.4fr";
  const pct = computeCompletion(deliverables, meta.completionOverride);
  const zoned = work.some((s) => s.zone);
  // Only show zones that actually have content (deliverables always counts),
  // numbered sequentially so a client missing a zone has no gap (01, 02, 03...).
  const presentZones = (["deliverables", "brief", "work", "feedback"] as ZoneKey[]).filter(
    (z) => z === "deliverables" || work.some((s) => (s.zone || "work") === z)
  );
  const zoneNum = (z: ZoneKey) => String(presentZones.indexOf(z) + 1).padStart(2, "0");

  return (
    <div className="cw-page">
      <header className="cw-top">
        <Link href="/" className="cw-logo">/<span>Run</span>withfoxes</Link>
        <div className="cw-top-right">private workspace</div>
      </header>

      <div className="cw-wrap">
        <div className="cw-eyebrow">Run with Foxes &times; {meta.client}</div>
        <h1 className="cw-title">{meta.headline}</h1>
        <p className="cw-intro">{meta.intro}</p>

        {zoned && (
          <nav className="cw-jump">
            {presentZones.map((z) => (
              <a key={z} href={`#cw-z-${z}`}>
                <span className="cw-jump-n">{zoneNum(z)}</span>{ZONES[z].label}
              </a>
            ))}
          </nav>
        )}

        {zoned && (
          <ZoneHead zone="deliverables" intro={meta.zoneIntros?.deliverables} num={zoneNum("deliverables")} />
        )}

        {zoned && !meta.hideProgress && (
          <div className="cw-prog">
            <div className="cw-prog-top">
              <span className="cw-prog-pct">{pct}% complete</span>
              {meta.targetDate && <span className="cw-prog-date">Estimated completion &middot; {meta.targetDate}</span>}
            </div>
            <div className="cw-prog-track"><div className="cw-prog-fill" style={{ width: `${pct}%` }} /></div>
          </div>
        )}

        {!meta.hideProgress && (
          <div className="cw-count">
            {readyCount} of {deliverables.length} ready for feedback &middot; last updated {meta.lastUpdated}
          </div>
        )}
        <div className="cw-summary">
          <div className="cw-row cw-row-head" style={{ gridTemplateColumns: cols }}>
            <span>Deliverable</span>
            <span>Detail</span>
            <span>Status</span>
            <span>Updated</span>
            {hasTarget && <span>Target</span>}
            <span>Note</span>
          </div>
          {deliverables.map((d) => (
            <div className="cw-row" key={d.name} style={{ gridTemplateColumns: cols }}>
              <span>{d.anchor ? <a className="cw-jump" href={`#${d.anchor}`}>{d.name}</a> : d.name}{d.isNew && <span className="cw-new cw-new-inline">New</span>}</span>
              <span>{d.detail}</span>
              <span><i className={`cw-b ${d.status}`} />{rollupFor(d, work, feedback) || d.statusLabel || STATUS_LABEL[d.status]}</span>
              <span>{d.date || " - "}</span>
              {hasTarget && <span>{d.target || " - "}</span>}
              <span>{d.note || ""}{d.download && <> <a className="cw-download cw-download-row" href={`${base}/${d.download.file}`} download>{d.download.label || "Download"}</a></>}</span>
            </div>
          ))}
        </div>

        {zoned ? (
          (() => {
            let last: ZoneKey | undefined;
            return work.map((s) => {
              const zone: ZoneKey = s.zone || "work";
              const newZone = zone !== last;
              last = zone;
              return (
                <div key={s.title} id={cwSlug(s.title)}>
                  {newZone && <ZoneHead zone={zone} intro={meta.zoneIntros?.[zone]} num={zoneNum(zone)} />}
                  {s.groupLabel && <h3 className="cw-grouplabel">{s.groupLabel}</h3>}
                  <WorkBlock s={s} base={base} slug={meta.slug} feedback={feedback} />
                </div>
              );
            });
          })()
        ) : (
          work.map((s) => <WorkBlock key={s.title} s={s} base={base} slug={meta.slug} feedback={feedback} />)
        )}

        <footer className="cw-foot">Run with Foxes · private workspace for {meta.client}</footer>
      </div>
    </div>
  );
}
