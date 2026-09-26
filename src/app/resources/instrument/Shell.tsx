import Link from "next/link";
import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../../home-next/NextNav";
import { TRACKERS, trackerHref, type Tracker } from "../catalogue";
import s from "./instrument.module.css";

/**
 * THE INSTRUMENT SHELL: the trackers and the datasets. A deep band carries the four-door nav
 * (the same NextNav as the homepage, white over deep) and the tape, which is every live
 * tracker's latest reading going past, each cell a link to its page. The DI Board (7 Sep) is
 * the reference: the board is on every page, and a reading always says when it was read.
 * The mockup line sits in the flow under the band, never fixed, so it cannot cover a phone.
 */
export function Shell({ children, tape = true }: { children: ReactNode; tape?: boolean }) {
  const live = TRACKERS.filter((t) => t.status !== "planned");
  return (
    <div className={s.page}>
      <div className={s.band}>
        <NextNav />
        {tape ? <Tape items={live} /> : null}
      </div>
      <p className={s.mock}>Mockup, 26 Sep 2026. Anything tagged Example is made up. Readings tagged Example never met a real market.</p>
      {children}
      <SiteFooter current="/resources" wide />
    </div>
  );
}

function Tape({ items }: { items: Tracker[] }) {
  const half = (key: string, hidden: boolean) => (
    <span className={s.tapeHalf} key={key} aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <Link key={t.slug} href={trackerHref(t)} className={s.cell} tabIndex={hidden ? -1 : undefined}>
          <em>{t.example ? "ex" : t.status === "testing" ? "test" : "live"}</em>
          <span>{t.name}</span>
          <b>{t.reading}</b>
          <i>{t.delta}</i>
        </Link>
      ))}
    </span>
  );
  return (
    <div className={s.tape} aria-label="Latest readings">
      <div className={s.tapeInner}>
        {half("a", false)}
        {half("b", true)}
      </div>
    </div>
  );
}

/** The one status dot: live pulses, testing is hollow, planned is a dash. */
export function Dot({ status }: { status: Tracker["status"] }) {
  return <i className={`${s.dot} ${status === "testing" ? s.dotTest : status === "planned" ? s.dotPlan : ""}`} aria-label={status} title={status} />;
}

/** Direction as a small chevron in ink. A measure going up is neither good nor bad. */
export function Dir({ direction, children }: { direction: Tracker["direction"]; children: ReactNode }) {
  return (
    <span className={s.dir}>
      {direction === "flat" ? (
        <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden><path d="M1 4.5h7" stroke="currentColor" strokeWidth="1.3" /></svg>
      ) : (
        <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden style={{ transform: direction === "down" ? "rotate(180deg)" : undefined }}>
          <path d="M1.5 6.5L4.5 2.5l3 4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      )}
      {children}
    </span>
  );
}

export { s as inst };
