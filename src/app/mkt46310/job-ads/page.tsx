import type { Metadata } from "next";
import Link from "next/link";
import { checkAuth } from "../actions";
import ModuleDoor from "../ModuleDoor";
import data from "./jobAds.json";
import "../../zorro/zorro.css";
import "../mkt46310.css";

export const metadata: Metadata = {
  title: "The job ads \\ AI and Digital Marketing Strategy \\ Run with Foxes",
  description: "Job ads for the UCD module MKT46310, autumn 2026.",
  robots: { index: false, follow: false },
};

/* /mkt46310/job-ads. Twelve of the 85 ads from class 1, to read in full, and a link that
   downloads all 85. Behind the same door as the module page. The data file is written by
   build_job_ads_for_page.py in paul-hub (clients/ucd/courses/mkt46310-harriet). The job site
   and the link to each ad are left out: we never name where the ads were found. */

type Ad = (typeof data.ads)[number];
const LEVEL: Record<string, string> = {
  "graduate or assistant": "Graduate or assistant",
  executive: "Executive",
  manager: "Manager",
  senior: "Senior",
  "not stated": "Level not stated",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const dev = process.env.NODE_ENV === "development" && sp.door === undefined;
  const authed = dev || (await checkAuth());
  if (!authed) return <ModuleDoor />;

  const shown = data.show.map((id) => data.ads.find((a) => a.id === id) as Ad);

  return (
    <div className="mod-shell mk">
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <Link href="/mkt46310" className="chapter-nav-back">
          &larr; Back to the module
        </Link>
      </header>

      <div className="mod-grid">
        <div className="mod-railcol">
          <nav className="mod-rail mk-rail" aria-label="The job ads">
            <p>/twelve job ads</p>
            {shown.map((a, i) => (
              <div key={a.id} className="mk-railitem">
                <a href={`#ad${a.id}`}>
                  <span className="mod-k">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mod-dot" />
                  <span>{a.title}</span>
                </a>
              </div>
            ))}
            <a className="mod-rail-lib" href="/mkt46310/job-ads/download">
              /download all 85
            </a>
          </nav>
        </div>

        <div className="mod-maincol">
          <header className="mod-masthead">
            <p className="mod-eyebrow">UCD Smurfit &middot; MKT46310 &middot; Class 1</p>
            <h1 className="mod-h1">
              The job <span className="mod-hl">ads</span>
            </h1>
            <p className="mod-standfirst">
              In class 1 we look at what employers ask for in {data.ads.length} Irish job ads for
              digital marketing jobs. Here are {shown.length} of them to read in full. They are
              the ads we quote in class, and two ads for junior jobs.
            </p>
            <p className="mod-standfirst">
              You can also download all {data.ads.length} ads as one file. It opens in Excel or
              Google Sheets, and you can give it to Claude and ask it questions.
            </p>
            <p className="mk-dl">
              <a className="mod-readinglink" href="/mkt46310/job-ads/download">
                Download all {data.ads.length} job ads (CSV)
              </a>
            </p>
          </header>

          <main>
            {shown.map((a, i) => (
              <article className="mod-item mk-classitem mk-ad" id={`ad${a.id}`} key={a.id}>
                <header className="mk-ctop">
                  <p className="mk-cmeta">
                    Ad {String(i + 1).padStart(2, "0")} &middot; Posted {a.posted}
                  </p>
                  <h2 className="mk-cname">{a.title}</h2>
                  <span className="mk-ctag">{LEVEL[a.level] || a.level}</span>
                </header>
                <dl className="mk-crows">
                  <div>
                    <dt>Who posted it</dt>
                    <dd>{a.employer}</dd>
                  </div>
                  <div>
                    <dt>The work it asks for</dt>
                    <dd>{a.work.join(", ")}.</dd>
                  </div>
                  {a.tools ? (
                    <div>
                      <dt>The tools it names</dt>
                      <dd>{a.tools.replace(/; /g, ", ")}.</dd>
                    </div>
                  ) : null}
                </dl>
                <p className="mk-cap mk-adlbl">/ the ad, word for word</p>
                <div className="mk-adtext">{a.text}</div>
              </article>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
