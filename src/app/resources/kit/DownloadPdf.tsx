"use client";

import { useState } from "react";
import k from "./kit.module.css";

/**
 * Download as PDF. The page is free to read; the PDF is one of the things an account adds (the
 * gate rule), so the button opens a one-line email step in place, then hands over the file.
 * ⛔ MOCKUP: the email goes nowhere. Every example PDF carries "Example, made-up numbers" on
 * every page, and a draft carries "Draft, not approved" (see BUILD-NOTES, the PDF rule).
 */
/** kind "csv" is the same step for a data file: a tracker's history or a dataset's full CSV. */
export default function DownloadPdf({ href, pages, label, kind = "pdf", size }: { href: string; pages?: number; label?: string; kind?: "pdf" | "csv"; size?: string }) {
  const text = label ?? (kind === "csv" ? "Download the CSV" : "Download the PDF");
  const meta = kind === "csv" ? size : pages ? `${pages} pages` : undefined;
  const [step, setStep] = useState<"idle" | "email" | "ready">("idle");
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
      {step === "email" ? (
        <form
          className={k.dlStep}
          onSubmit={(e) => {
            e.preventDefault();
            setStep("ready");
          }}
        >
          <input type="email" required autoFocus placeholder="you@company.ie" aria-label="Work email" />
          <button type="submit">Send it</button>
        </form>
      ) : null}
      {step === "email" ? <span className={k.dlNote}>Free, one account for everything. Mockup: sends nothing.</span> : null}
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
