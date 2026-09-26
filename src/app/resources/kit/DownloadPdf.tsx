"use client";

import { useState } from "react";
import k from "./kit.module.css";

/**
 * Download as PDF. The page is free to read; the PDF is one of the things an account adds (the
 * gate rule), so the button opens a one-line email step in place, then hands over the file.
 * ⛔ MOCKUP: the email goes nowhere. Every example PDF carries "Example, made-up numbers" on
 * every page, and a draft carries "Draft, not approved" (see BUILD-NOTES, the PDF rule).
 */
export default function DownloadPdf({ href, pages, label = "Download the PDF" }: { href: string; pages?: number; label?: string }) {
  const [step, setStep] = useState<"idle" | "email" | "ready">("idle");
  return (
    <div className={k.dl}>
      {step === "ready" ? (
        <a className={k.dlBtn} href={href} download>
          <PdfIcon /> Save the PDF {pages ? <em>{pages} pages</em> : null}
        </a>
      ) : (
        <button type="button" className={k.dlBtn} onClick={() => setStep("email")} aria-expanded={step === "email"}>
          <PdfIcon /> {label} {pages ? <em>{pages} pages</em> : null}
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

function PdfIcon() {
  return (
    <svg viewBox="0 0 12 14" width="11" height="13" aria-hidden>
      <path d="M1.5 1h6l3 3v9h-9z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7.5 1v3h3M4 8.5l2 2 2-2M6 6v4.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
