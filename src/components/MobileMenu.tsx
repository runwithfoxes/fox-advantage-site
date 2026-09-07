"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

/* MOBILE MENU (Paul, 7 Sep 2026: "We don't have a mobile nav... Should we?").
   Under 900px the hp-nav hides every link and shows only the logo, so from a
   phone there was no way to reach the essays, the book, the case studies or
   the contact page without scrolling to the footer. This is the drawer the
   design language calls for: a menu button on the right of the bar, and a
   full-height list in the site's own mono style. Same five links everywhere. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  // The drawer is portalled to <body>. Inside .hp-nav its backdrop-filter
  // turned the bar into the containing block, so a fixed drawer was clipped
  // to the bar and the hero painted over it below the first link.
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const drawer = (
    <div id="mobileMenu" className={`mm-drawer${open ? " open" : ""}`} aria-hidden={!open}>
      <button type="button" className="mm-btn mm-close" onClick={close}>/close</button>
      <nav className="mm-list">
        <Link href="/#agents" onClick={close}>/agents</Link>
        <div className="mm-group">
          <span className="mm-label">/previous</span>
          <Link href="/millionaire-raffle" onClick={close}>Millionaire Raffle</Link>
          <Link href="/marketer-of-the-year" onClick={close}>Marketer of the Year</Link>
          <Link href="/48" onClick={close}>48</Link>
          <Link href="/run-with-foxes" onClick={close}>Run with Foxes (book 1)</Link>
        </div>
        <Link href="/essays" onClick={close}>/essays</Link>
        <Link href="/book" onClick={close}>/book</Link>
        <Link href="/contact" className="mm-cta" onClick={close}>/contact</Link>
      </nav>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="mm-btn"
        aria-expanded={open}
        aria-controls="mobileMenu"
        onClick={() => setOpen(true)}
      >
        /menu
      </button>
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
