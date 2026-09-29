import { CATEGORIES } from "../resources/data";
import { SERIES, editionsOf, type ReportSeries } from "../resources/catalogue";
import n from "./next.module.css";

/**
 * A report cover, as Paul settled it on 25 Sep (the studies band): a drawing in the blues, the
 * number and cadence above, one subtle fox, the title on a plate under. No drawing carries a
 * number. Moved out of page.tsx on 26 Sep so the same cover draws the twelve series from the
 * catalogue. Paul, 26 Sep: "It's about having lots of reports that people can read and download
 * and look at and share."
 */
export type CoverArt = "bars" | "rings" | "blocks" | "grid" | "dots" | "steps" | "lines" | "stack";

const SHADES = ["#E3EEF5", "#C4DCEA", "#6CAAC8", "#3A7CA5", "#2B5E80", "#1A3A4E"];

export const COVER_ARTS: CoverArt[] = ["bars", "rings", "blocks", "grid", "dots", "steps", "lines", "stack"];
export const COVER_FOXES = [
  "fox-sideeye-right-nobg.png",
  "chapter-fox-bored-nobg.png",
  "fox-pm-nobg.png",
  "fox-facepalm-nobg.png",
  "chapter-fox-sitting-nobg.png",
  "fox-rain-nobg.png",
  "fox-monday-nobg.png",
  "fox-friday-nobg.png",
  "fox-lottery-nobg.png",
  "fox-paddys-nobg.png",
  "fox-sixnations-nobg.png",
  "fox-valentines-nobg.png",
];

/* Paul, 27 Sep, on the drawn covers: "I don't think I like them. This is header of the AI Ask
   and I do like it. Feels bigger, more on-brand." So a series can carry a scene instead: the fox
   somewhere in Ireland that fits the study, the title set in the picture the way the AI Ask
   header sets it. Then, the same day: "The photos work better than the charts. So let's use photos always." All twelve
   carry one; the AI Ask's is the last frame of its own header film. Sources and prompts:
   ~/projects/fox-ads/dray/output/report-covers/gen.py */
export const COVER_PHOTOS: Record<string, string> = Object.fromEntries(
  ["the-ai-ask", "geo-ireland", "state-of-ai-in-irish-marketing", "agent-economics", "irish-ads-by-sector", "the-irish-marketing-team", "the-ad-audit",
   "ai-overviews-in-ireland", "the-boardroom-pulse", "the-creative-audit", "small-firms-and-ai", "the-mystery-shop", "the-irish-martech-index",
  ].map((slug) => [slug, `/covers/${slug}.jpg`]),
);

/** Words set in the picture, the way the AI Ask's own header does it: a mono kicker line, then the
    headline with its last words in the pale blue. Paul, 29 Sep, on the plain covers: "they look a
    little bit bare. Can you add these little bits of writing on the image". */
export type CoverText = { kicker: string; headline: string; hl?: string };

export default function Cover({ no, cadence, title, cover, fox, photo, text }: { no: string; cadence: string; title: string; cover: CoverArt; fox: string; photo?: string; text?: CoverText }) {
  if (photo && text) {
    return (
      <div className={`${n.cover} ${n.coverScene} ${n.coverWordsScene}`}>
        <div className={n.coverPhoto}>
          <img src={photo} alt="" />
          <div className={n.coverWords}>
            <span className={n.coverKicker}>{text.kicker}</span>
            <span className={n.coverHeadline}>
              {text.headline}
              {text.hl ? <> <em>{text.hl}</em></> : null}
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (photo) {
    /* Paul, 27 Sep, in order: the white frame "feels flat"; then the title set in the picture "does
       not work. Headline can go underneath like you had but try different colour to white." So
       the picture on top, and under it a deep navy plate carrying the number, the cadence and the
       title. */
    return (
      <div className={`${n.cover} ${n.coverScene}`}>
        <div className={n.coverPhoto}>
          <img src={photo} alt="" />
        </div>
        <div className={n.coverPlate}>
          <div className={n.coverSceneTop}>
            <span>{no}</span>
            <span>{cadence}</span>
          </div>
          <span className={n.coverPhotoTitle}>{title}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={n.cover}>
      <div className={n.coverTop}>
        <span>{no}</span>
        <span>{cadence}</span>
      </div>
      <div className={n.coverArt} aria-hidden>
        <svg viewBox="0 0 200 150" className={n.coverSvg}>
          {cover === "bars" &&
            CATEGORIES.map((c, i) => (
              <rect key={c.name} x={6 + i * 4.6} y={146 - c.rate * 130} width="3.4" height={c.rate * 130} fill={c.owner === "state" ? "#1A3A4E" : c.owner === "middle" ? "#6CAAC8" : "#CFCFC9"} />
            ))}
          {cover === "rings" && [70, 55, 40, 25, 10].map((r, i) => <circle key={r} cx="100" cy="76" r={r} fill={SHADES[i + 1]} />)}
          {cover === "blocks" && [0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={20 + i * 28} y={146 - (i + 1) * 21} width="20" height={(i + 1) * 21} fill={SHADES[i]} />)}
          {cover === "grid" &&
            Array.from({ length: 40 }).map((_, i) => <rect key={i} x={10 + (i % 8) * 23} y={8 + Math.floor(i / 8) * 28} width="19" height="24" fill={SHADES[(i * 7 + Math.floor(i / 8)) % 6]} />)}
          {cover === "dots" &&
            Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={14 + (i % 10) * 19} cy={14 + Math.floor(i / 10) * 24} r={3 + ((i * 13) % 7)} fill={SHADES[(i * 5) % 6]} />)}
          {cover === "steps" &&
            [0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${10 + i * 36} 140 V${120 - i * 22} H${40 + i * 36}`} stroke={SHADES[i + 1]} strokeWidth="6" fill="none" />)}
          {cover === "lines" &&
            [0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M8 ${130 - i * 6} C 60 ${125 - i * 22}, 120 ${118 - i * 9 + (i % 2) * 30}, 192 ${30 + i * 18}`} stroke={SHADES[i + 1]} strokeWidth="4" fill="none" strokeLinecap="round" />
            ))}
          {cover === "stack" &&
            [0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g key={i}>
                <rect x="10" y={10 + i * 19} width={40 + ((i * 53) % 80)} height="14" fill={SHADES[5 - (i % 3)]} />
                <rect x={50 + ((i * 53) % 80)} y={10 + i * 19} width={140 - ((i * 53) % 80)} height="14" fill={SHADES[(i % 2) + 1]} />
              </g>
            ))}
        </svg>
        <img className={n.coverFox} src={`/fox/${fox}`} alt="" />
      </div>
      <div className={n.coverFoot}>{title}</div>
    </div>
  );
}

/**
 * THE SHELF: every series in one order, with its number, its drawing and its fox, so the
 * homepage covers and each series page agree. Real studies first, then the examples, newest
 * edition first. The drawing and the fox belong to the series' place in the catalogue and never
 * change when the order does.
 */
export type ShelfEntry = { se: ReportSeries; no: string; cover: CoverArt; fox: string };
export function seriesShelf(): ShelfEntry[] {
  const newest = (se: ReportSeries) => editionsOf(se).filter((r) => r.status !== "coming")[0];
  const idx = (se: ReportSeries) => SERIES.findIndex((x) => x.slug === se.slug);
  return [...SERIES]
    .sort((a, b) => Number(a.example) - Number(b.example) || (newest(b)?.date ?? "").localeCompare(newest(a)?.date ?? ""))
    .map((se, i) => ({ se, no: `No. ${String(i + 1).padStart(2, "0")}`, cover: COVER_ARTS[idx(se) % COVER_ARTS.length], fox: COVER_FOXES[idx(se) % COVER_FOXES.length] }));
}
export const shelfEntry = (slug: string) => seriesShelf().find((e) => e.se.slug === slug);
