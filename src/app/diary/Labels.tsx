import Link from "next/link";
import dp from "./diary-page.module.css";
import { LABELS, type Dispatch } from "@/lib/diary";

/**
 * The six subjects, each a link to its own list at /diary/label/<slug>, with
 * the count beside it. Used at the top of the rail and, on a phone where there
 * is no rail, as a row above the first dispatch. A label no dispatch carries
 * is left out.
 */
export default function Labels({ all, current, row }: { all: Dispatch[]; current?: string; row?: boolean }) {
  const used = LABELS.map((l) => ({ ...l, n: all.filter((d) => d.label?.slug === l.slug).length })).filter((l) => l.n > 0);
  if (!used.length) return null;
  return (
    <div className={row ? dp.labelRow : dp.labels}>
      {row ? null : <div className={dp.railLab}>By subject</div>}
      {used.map((l) => (
        <Link key={l.slug} href={`/diary/label/${l.slug}`} className={dp.label} data-on={current === l.slug ? "1" : undefined}>
          {l.name}
          <span>{l.n}</span>
        </Link>
      ))}
      {current ? (
        <Link href="/diary" className={dp.label}>
          All dispatches
          <span>{all.length}</span>
        </Link>
      ) : null}
    </div>
  );
}
