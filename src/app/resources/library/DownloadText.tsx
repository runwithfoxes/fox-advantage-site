"use client";

import { useState } from "react";
import k from "../kit/kit.module.css";

/**
 * The kit's DownloadPdf, for a text file: same look, same one-line email step in place, a
 * file icon instead of the PDF one and "Save the file" rather than "Save the PDF".
 * ⛔ MOCKUP: the email goes nowhere.
 */
export default function DownloadText({ href, label, meta }: { href: string; label: string; meta?: string }) {
  const [step, setStep] = useState<"idle" | "email" | "ready">("idle");
  return (
    <div className={k.dl}>
      {step === "ready" ? (
        <a className={k.dlBtn} href={href} download>
          <Icon /> Save the file {meta ? <em>{meta}</em> : null}
        </a>
      ) : (
        <button type="button" className={k.dlBtn} onClick={() => setStep("email")} aria-expanded={step === "email"}>
          <Icon /> {label} {meta ? <em>{meta}</em> : null}
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

function Icon() {
  return (
    <svg viewBox="0 0 12 14" width="11" height="13" aria-hidden>
      <path d="M1.5 1h6l3 3v9h-9z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M7.5 1v3h3M3.5 7h5M3.5 9.5h5" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
