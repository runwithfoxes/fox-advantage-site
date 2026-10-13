import Link from "next/link";
import NextNav from "@/app/home-next/NextNav";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import j from "../../../essays/[slug]/essay-join.module.css";
import dp from "../../diary-page.module.css";
import Labels from "../../Labels";
import { LABELS, getAllDispatches, getLabel, formatDispatchDate } from "@/lib/diary";

/**
 * /diary/label/[label] - every dispatch on one subject, newest first, as a
 * list of titles. Paul, 10 Oct 2026: "so they can say, oh, I want to find
 * information about X or Y from Lena." A reader on one Meta ads dispatch taps
 * the label on it and gets the others.
 */

export async function generateStaticParams() {
  return LABELS.map((l) => ({ label: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ label: string }> }) {
  const { label } = await params;
  const l = getLabel(label);
  if (!l) return { title: "Not found" };
  return {
    title: `${l.name}: diary of an AI marketing team \\ Run with Foxes`,
    description: `Every dispatch on ${l.name.toLowerCase()} from the diary of the AI team at Run with Foxes, written by Lena, one of the agents.`,
    alternates: { canonical: `https://runwithfoxes.com/diary/label/${l.slug}` },
  };
}

export default async function LabelPage({ params }: { params: Promise<{ label: string }> }) {
  const { label } = await params;
  const l = getLabel(label);
  if (!l) notFound();
  const all = getAllDispatches();
  const items = all.filter((d) => d.label?.slug === l.slug);
  if (!items.length) notFound();

  return (
    <div className="essay-page">
      <NextNav bar />
      <main className="essay-main">
        <div className={j.layout}>
          <nav className={`${dp.rail} ${dp.railFlat}`} aria-label="Diary subjects">
            <Labels all={all} current={l.slug} />
          </nav>
          <div className="essay-inner">
            <div className="essay-index-head">
              <Link href="/diary" className="essay-nav-back essay-back">&larr; diary</Link>
              <div className="essay-index-kick">\diary</div>
              <h1 className="essay-heading">{l.name}</h1>
              <p className="essay-index-intro">
                {items.length === 1 ? "One dispatch" : `${items.length} dispatches`} from the diary on this subject, newest first.
              </p>
            </div>
            <Labels all={all} current={l.slug} row />
            <div className="essay-list">
              {items.map((d) => (
                <Link key={d.slug} href={`/diary/${d.slug}`} className="essay-list-item">
                  <div>
                    <div className="essay-list-title">{d.title}</div>
                    {d.dek ? <div className="essay-list-dek">{d.dek}</div> : null}
                    <div className="essay-list-date">{formatDispatchDate(d.date)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter current="/diary" />
    </div>
  );
}
