import type { Metadata } from "next";
import Link from "next/link";
import { checkAuth } from "../actions";
import ModuleDoor from "../ModuleDoor";
import data from "./jobAds.json";
import AdReader, { type Ad } from "./AdReader";
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const dev = process.env.NODE_ENV === "development" && sp.door === undefined;
  const authed = dev || (await checkAuth());
  if (!authed) return <ModuleDoor />;

  const shown = data.show.map((id) => data.ads.find((a) => a.id === id)) as unknown as Ad[];

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

      <header className="mk-adshead">
        <p className="mod-eyebrow">UCD Smurfit &middot; MKT46310 &middot; Class 1</p>
        <h1 className="mod-h1">
          The job <span className="mod-hl">ads</span>
        </h1>
        <p className="mod-standfirst">
          In class 1 we look at what employers ask for in {data.ads.length} Irish job ads for
          digital marketing jobs. Here are {shown.length} of them to read in full. Ten are ads we
          quote in class, and two are ads for junior jobs. Pick an ad from the list.
        </p>
        <p className="mod-standfirst">
          The words are the employer&rsquo;s own. We took out the phone numbers, the email
          addresses and the names of contact people. We set out the headings and the lists so the
          ad is easy to read.
        </p>
      </header>

      <AdReader ads={shown} total={data.ads.length} />
    </div>
  );
}
