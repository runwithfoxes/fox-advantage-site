"use client";

import { useState } from "react";
import k from "./kit.module.css";
import AccessForm, { type Want } from "./AccessForm";

/**
 * Download as PDF or CSV. The page is free to read; the file is one of the things an account
 * adds. A reader who already has access (the server passes `unlocked` from the cookie) gets the
 * file in one click. Anyone else gets the one-line ask in place, real since 27 Sep 2026: it posts
 * to /api/access tagged with this page (want, item), and the file opens the moment it succeeds.
 * Every example PDF carries "Example, made-up numbers" on every page, and a draft carries "Draft,
 * not approved" (BUILD-NOTES, the PDF rule).
 */
/** kind "csv" is the same step for a data file: a tracker's history or a dataset's full CSV. */
export default function DownloadPdf({ href, pages, label, kind = "pdf", size, want = "report", item, unlocked = false }: { href: string; pages?: number; label?: string; kind?: "pdf" | "csv"; size?: string; want?: Want; item?: string; unlocked?: boolean }) {
  const text = label ?? (kind === "csv" ? "Download the CSV" : "Download the PDF");
  const meta = kind === "csv" ? size : pages ? `${pages} pages` : undefined;
  const [step, setStep] = useState<"idle" | "email" | "ready">(unlocked ? "ready" : "idle");
  return (
    <div className={k.dl}>
      {step === "ready" ? (
        <a className={k.dlBtn} href={href} download>
          {kind === "csv" ? <CsvIcon /> : <PdfIcon />} Save the {kind === "csv" ? "CSV" : "PDF"} {meta ? <em>{meta}</em> : null}
        </a>
      ) : (
        <button type="button" className={k.dlBtn} onClick={() => setStep("email")} aria-expanded={step === "email"}>
          {kind === "csv" ? <CsvIcon /> : <PdfIcon />} {text} {meta ? <em>{meta}</em> : null}
        </button>
      )}
      {step === "email" ? <AccessForm want={want} item={item} className={k.dlStep} label="Send it" done="" doneClassName={k.dlNote} onDone={() => setStep("ready")} /> : null}
      {step === "email" ? <span className={k.dlNote}>Free. Sign up once for everything here.</span> : null}
    </div>
  );
}

function CsvIcon() {
  return (
    <svg viewBox="0 0 12 14" width="11" height="13" aria-hidden>
      <path d="M1.5 1h6l3 3v9h-9z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7.5 1v3h3M3.5 7h5M3.5 9.5h5M3.5 12h3" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 12 14" width="11" height="13" aria-hidden>
      <path d="M1.5 1h6l3 3v9h-9z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7.5 1v3h3M4 8.5l2 2 2-2M6 6v4.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
