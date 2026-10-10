"use client";

import { useEffect, useState } from "react";

/* The twelve ads, one at a time, the way a job site shows them: the list on the left and
   the ad you picked on the right. With no script every ad is on the page, one under the
   other, and the list still links to each. The words of an ad are never changed here. The
   layout (headings, lists, facts) is marked by hand in paul-hub, in
   clients/ucd/courses/mkt46310-harriet/job-ads-laid-out.md, and checked word for word. */

export type Block =
  | { t: "h" | "h3" | "p"; x: string; q?: number }
  | { t: "ul"; x: string[]; q?: number; qa?: number }
  | { t: "kv"; k: string; x: string };

export type Ad = {
  id: string;
  title: string;
  employer: string;
  posted: string;
  level: string;
  years: number | null;
  pay: string | null;
  work: string[];
  tools: string;
  ai: string;
  quote: string;
  blocks: Block[];
};

const LEVEL: Record<string, string> = {
  "graduate or assistant": "Graduate or assistant",
  executive: "Executive",
  manager: "Manager",
  senior: "Senior",
  "not stated": "Not stated",
};

const two = (n: number) => String(n).padStart(2, "0");

export default function AdReader({ ads, total }: { ads: Ad[]; total: number }) {
  const [on, setOn] = useState(0);
  const [js, setJs] = useState(false);

  useEffect(() => {
    const read = () => {
      const i = ads.findIndex((a) => `#ad${a.id}` === window.location.hash);
      if (i >= 0) setOn(i);
    };
    read();
    setJs(true);
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [ads]);

  const pick = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOn(i);
    window.history.replaceState(null, "", `#ad${ads[i].id}`);
    const top = document.getElementById("ads-top");
    if (top) window.scrollTo({ top: top.getBoundingClientRect().top + window.scrollY - 84 });
  };

  return (
    <div className="mk-adsgrid" data-js={js ? "1" : "0"}>
      <nav className="mk-adlist" aria-label="The twelve job ads">
        <p>/twelve job ads</p>
        {ads.map((a, i) => (
          <a key={a.id} href={`#ad${a.id}`} onClick={pick(i)} data-on={i === on ? "1" : "0"}>
            <span className="mk-adlist-n">{two(i + 1)}</span>
            <span className="mk-adlist-t">
              <b>{a.title}</b>
              <i>
                {a.employer} &middot; {LEVEL[a.level] || a.level}
              </i>
            </span>
          </a>
        ))}
        <a className="mk-adlist-dl" href="/mkt46310/job-ads/download">
          Download all {total} ads (CSV)
        </a>
      </nav>

      <div className="mk-adpane" id="ads-top">
        {ads.map((a, i) => (
          <article className="mk-ad" id={`ad${a.id}`} key={a.id} data-on={i === on ? "1" : "0"}>
            <p className="mk-cmeta">
              Ad {two(i + 1)} of {ads.length} &middot; Posted {a.posted}
            </p>
            <h2 className="mk-cname">{a.title}</h2>
            <p className="mk-adwho">{a.employer}</p>

            <dl className="mk-adfacts">
              <div>
                <dt>Level</dt>
                <dd>{LEVEL[a.level] || a.level}</dd>
              </div>
              <div>
                <dt>Experience asked</dt>
                <dd>{a.years === null ? "Not stated" : a.years === 0 ? "None" : `${a.years} ${a.years === 1 ? "year" : "years"} or more`}</dd>
              </div>
              <div>
                <dt>Pay</dt>
                <dd>{a.pay ? `€${a.pay.replace(/ to /, " to €")}` : "Not given"}</dd>
              </div>
              <div>
                <dt>AI</dt>
                <dd>{a.ai === "none" ? "Not asked for" : "Asked for"}</dd>
              </div>
            </dl>

            {a.quote ? (
              <figure className="mk-adquote">
                <figcaption>The line we quote in class</figcaption>
                <blockquote>&ldquo;{a.quote}&rdquo;</blockquote>
              </figure>
            ) : null}

            <div className="mk-adtags">
              <span className="mk-adtags-l">The work it asks for</span>
              <ul>
                {a.work.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              {a.tools ? (
                <>
                  <span className="mk-adtags-l">The tools it names</span>
                  <ul>
                    {a.tools.split("; ").map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <p className="mk-adlbl">The ad, word for word</p>
            <div className="mk-adpaper">
              {a.blocks.map((b, j) => {
                if (b.t === "h") return <h3 key={j}>{b.x}</h3>;
                if (b.t === "h3") return <h4 key={j}>{b.x}</h4>;
                if (b.t === "kv")
                  return (
                    <p className="mk-adkv" key={j}>
                      <span>{b.k}</span>
                      {b.x}
                    </p>
                  );
                if (b.t === "ul")
                  return (
                    <ul key={j}>
                      {b.x.map((x, k) => (
                        <li key={k}>{b.q === k || b.qa ? <mark>{x}</mark> : x}</li>
                      ))}
                    </ul>
                  );
                return <p key={j}>{b.q === 0 ? <mark>{b.x}</mark> : b.x}</p>;
              })}
            </div>

            <div className="mk-adnext">
              {i > 0 ? (
                <a href={`#ad${ads[i - 1].id}`} onClick={pick(i - 1)}>
                  &larr; {ads[i - 1].title}
                </a>
              ) : (
                <span />
              )}
              {i < ads.length - 1 ? (
                <a href={`#ad${ads[i + 1].id}`} onClick={pick(i + 1)}>
                  {ads[i + 1].title} &rarr;
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
