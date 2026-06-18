"use client";

/* Shared client-workspace renderer for runwithfoxes.com/clients/{slug}.
   Every client page imports this and feeds it data from its own data.ts.
   Generated/maintained by the /client-page skill. Brand: Run with Foxes.

   Escape hatch: if a client needs a bespoke layout, copy this file into the
   client's folder, edit it there, and point that page.tsx at the copy. Other
   clients are unaffected. */

import { useState, useTransition, useRef } from "react";
import Link from "next/link";

/* ---- types (kept permissive so data.ts is easy to hand-edit) ---- */
type Status = "ready" | "in-progress" | "todo";

export type Meta = {
  client: string;
  slug: string;
  headline: string;
  intro: string;
  lastUpdated: string;
  feedbackContacts?: string[];  // client emails whose replies count as feedback
  pageShareThread?: string;     // Gmail thread/message id of the page-share email
};

export type Deliverable = {
  name: string;
  detail: string;
  status: Status;
  date?: string;
  target?: string;
  note?: string;
};

type MediaItem = {
  src: string;
  poster?: string;
  ratio?: string;
  w?: number;
  cap?: string;
  download?: boolean;
};
type MediaGroup = { label: string; items: MediaItem[] };
type PairItem = { key?: string; name: string; src: string; img: string; poster?: string };
type CopyBlock = { label?: string; text: string; mono?: boolean };
type FileRow = { name: string; file: string; note?: string; date?: string };
/* feedback kind: one Q&A row. q is an array so two client points that share
   one answer render as a single row. a:"" renders as "pending". */
type FaqItem = { q: string[]; a: string };
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
  badge?: string;
  date?: string;          // feedback kind: the round date, shown as the badge
  kind: "media" | "copy" | "files" | "gallery" | "email" | "compare" | "feedback";
  layout?: "grouped" | "pair" | "single";
  // feedback kind:
  intro?: string;         // optional framing line above the accordion
  responder?: string;     // answer label (default "Response"), e.g. "Paul"
  faq?: FaqItem[];        // the Q&A rows
  note?: string;          // optional closing line below the accordion
  // compare kind: before/after wipe slider
  compare?: { before: string; after: string; ratio?: string; w?: number; labelBefore?: string; labelAfter?: string; download?: boolean };
  groups?: MediaGroup[];
  item?: MediaItem;
  items?: (MediaItem | PairItem)[];
  blocks?: CopyBlock[];
  files?: FileRow[];
  // email kind:
  prompt?: string;        // the prompt shown above the email card
  from?: string;          // sender label in the email bar (e.g. "Sabre")
  subject?: string;       // subject line
  preheader?: string;     // muted preview line under the subject
  emailBody?: EmailBlock[];
};

const STATUS_LABEL: Record<Status, string> = {
  ready: "Ready for feedback",
  "in-progress": "In progress",
  todo: "To do",
};

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
function Media({ src, poster, ratio = "1 / 1", base }: { src: string; poster?: string; ratio?: string; base: string }) {
  const url = `${base}/${src}`;
  return (
    <div className="cw-tile" style={{ aspectRatio: ratio }}>
      {isVideo(src) ? (
        <video src={url} poster={poster ? `${base}/${poster}` : undefined} autoPlay loop muted playsInline preload="metadata" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={src} />
      )}
    </div>
  );
}

/* before/after wipe slider - drag (or click) to reveal the "before" over the "after" */
function Compare({ before, after, ratio = "16 / 9", labelBefore, labelAfter, base }:
  { before: string; after: string; ratio?: string; labelBefore?: string; labelAfter?: string; base: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div className="cw-compare" ref={ref} style={{ aspectRatio: ratio }}
      onMouseDown={(e) => move(e.clientX)}
      onMouseMove={(e) => { if (e.buttons === 1) move(e.clientX); }}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img className="cw-cmp-img" src={`${base}/${after}`} alt={labelAfter || "after"} draggable={false} />
      <img className="cw-cmp-img" src={`${base}/${before}`} alt={labelBefore || "before"} draggable={false}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
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

function SectionHead({ s }: { s: WorkSection }) {
  const label = s.badge || s.date || (s.status ? STATUS_LABEL[s.status] : "");
  return (
    <div className="cw-sec-head">
      <h2>{s.title}</h2>
      {label && <span className="cw-badge">{label}</span>}
    </div>
  );
}

/* ---- work-section renderers by kind ---- */
function WorkBlock({ s, base }: { s: WorkSection; base: string }) {
  return (
    <section className="cw-sec">
      <SectionHead s={s} />
      {s.desc && <p className="cw-desc">{s.desc}</p>}

      {s.kind === "media" && s.layout === "grouped" && (s.groups || []).map((g) => (
        <div className="cw-chart-group" key={g.label}>
          <div className="cw-chart-label">{g.label}</div>
          <div className="cw-chart-row">
            {g.items.map((it) => (
              <div className="cw-chart-item" key={it.src} style={{ width: it.w }}>
                <Media src={it.src} poster={it.poster} ratio={it.ratio} base={base} />
                {it.cap && <div className="cw-cap">{it.cap}</div>}
                {it.download && <DownloadLink src={it.src} base={base} />}
              </div>
            ))}
          </div>
        </div>
      ))}

      {s.kind === "media" && s.layout === "single" && s.item && (
        <figure className="cw-figure" style={{ width: s.item.w || 320 }}>
          <Media src={s.item.src} poster={s.item.poster} ratio={s.item.ratio} base={base} />
          {s.item.cap && <figcaption>{s.item.cap}</figcaption>}
          {s.item.download && <DownloadLink src={s.item.src} base={base} />}
        </figure>
      )}

      {s.kind === "media" && s.layout === "pair" && (
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

      {s.kind === "compare" && s.compare && (
        <figure className="cw-figure" style={{ width: s.compare.w || 760 }}>
          <Compare before={s.compare.before} after={s.compare.after} ratio={s.compare.ratio}
            labelBefore={s.compare.labelBefore} labelAfter={s.compare.labelAfter} base={base} />
          {s.compare.download && <DownloadLink src={s.compare.after} base={base} />}
        </figure>
      )}

      {s.kind === "gallery" && (
        <div className="cw-gallery">
          {(s.items as MediaItem[] | undefined)?.map((it) => (
            <figure key={it.src} style={{ width: it.w }}>
              <Media src={it.src} poster={it.poster} ratio={it.ratio} base={base} />
              {it.cap && <figcaption>{it.cap}</figcaption>}
              {it.download && <DownloadLink src={it.src} base={base} />}
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

      {s.kind === "feedback" && (
        <Faq intro={s.intro} items={s.faq || []} note={s.note} responder={s.responder} />
      )}

      {s.kind === "files" && (
        <div className="cw-files">
          {(s.files || []).map((f) => (
            <div className="cw-file-row" key={f.file}>
              <span className="cw-file-name">{f.name}</span>
              {f.note && <span className="cw-file-note">{f.note}</span>}
              {f.date && <span className="cw-file-date">Uploaded {f.date}</span>}
              <DownloadLink src={f.file} base={base} />
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
}: {
  initialAuth: boolean;
  verifyAction: (password: string) => Promise<boolean>;
  meta: Meta;
  deliverables: Deliverable[];
  work: WorkSection[];
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

        <div className="cw-count">
          {readyCount} of {deliverables.length} ready for feedback &middot; last updated {meta.lastUpdated}
        </div>
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
              <span>{d.name}</span>
              <span>{d.detail}</span>
              <span><i className={`cw-b ${d.status}`} />{STATUS_LABEL[d.status]}</span>
              <span>{d.date || " - "}</span>
              {hasTarget && <span>{d.target || " - "}</span>}
              <span>{d.note || ""}</span>
            </div>
          ))}
        </div>

        {work.map((s) => (
          <WorkBlock key={s.title} s={s} base={base} />
        ))}

        <footer className="cw-foot">Run with Foxes · private workspace for {meta.client}</footer>
      </div>
    </div>
  );
}
