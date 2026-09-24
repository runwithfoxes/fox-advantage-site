import Link from "next/link";
import type { Metadata } from "next";
import { Shell, Item, Frame, CategoryBars, CategoryChips } from "../parts";
import { CATEGORIES } from "../data";
import s from "../resources.module.css";

export const metadata: Metadata = {
  title: "GEO Ireland | Run with Foxes",
  robots: { index: false, follow: false },
};

/** A study reads like a module: the findings are the numbered items, each with its figure. */
const FINDINGS = [
  { id: "f1", t: "The State owns the AI answers" },
  { id: "f2", t: "Booking sites beat the brands they list" },
  { id: "f3", t: "Reddit is the most-cited source" },
  { id: "f4", t: "Claude answers with British content" },
  { id: "f5", t: "Google often shows no AI answer" },
  { id: "f6", t: "Some categories have no owner" },
];

const CITED: [string, number][] = [
  ["reddit.com", 1313],
  ["citizensinformation.ie", 778],
  ["hse.ie", 576],
  ["rsa.ie", 489],
  ["facebook.com", 225],
  ["gov.uk", 176],
];

const DRIFT: [string, number][] = [
  ["Claude + web", 35],
  ["Claude", 29],
  ["Perplexity", 10],
  ["Google AI", 1.1],
  ["ChatGPT", 0.5],
];

export default function GeoIrelandPage() {
  const middle = CATEGORIES.filter((c) => c.owner === "middle");
  return (
    <Shell
      back={{ href: "/resources", label: "← resources" }}
      railTitle="GEO Ireland"
      railHref="/resources/geo-ireland"
      railLabel="/in this study"
      rail={FINDINGS.map((f, i) => ({ href: `#${f.id}`, k: String(i + 1).padStart(2, "0"), t: f.t }))}
      railFoot={
        <>
          <a className="mod-rail-lib" href="#categories">
            /all 41 categories
          </a>
          <a className="mod-rail-lib" href="#method">
            /how we measured it
          </a>
        </>
      }
    >
      <header className="mod-masthead">
        <p className="mod-eyebrow">Research &middot; quarterly &middot; day one, 23 Aug 2026</p>
        <h1 className="mod-h1">
          Who <span className="mod-hl">AI</span> names when you ask an Irish question
        </h1>
        <p className="mod-standfirst">
          We put the questions people in Ireland ask to Claude, ChatGPT, Perplexity and
          Google&rsquo;s AI Overviews, in 41 categories from tax to hotels, and counted which
          names came back and how often.
        </p>
        <div className="mod-meta">
          <span>
            Read<b>Sun 23 Aug</b>
          </span>
          <span>
            Categories<b>41</b>
          </span>
          <span>
            Engines<b>5</b>
          </span>
          <span>
            Google questions<b>924</b>
          </span>
          <span>
            Next read<b>Each quarter</b>
          </span>
        </div>
      </header>

      <main>
        <Item id="f1" n={1} title="The State owns the AI answers">
          <Frame label="The name AI gives most in each category, highest rate on any engine">
            <CategoryBars />
          </Frame>
          <p className="mod-body">
            In 17 of 41 categories the most-named name is a state body or a regulator. Some of
            those are natural, like Revenue for tax. The striking ones are markets where
            advertisers spend and the regulator still wins. The Health Insurance Authority, at
            0.61, beats every insurer. The Charities Regulator is named more than four times as
            often as any charity.
          </p>
        </Item>

        <Item id="f2" n={2} title="Booking sites and marketplaces beat the brands they list">
          <p className="mod-body">
            In {middle.length} categories the answer is a middleman:{" "}
            {middle.map((c, i) => (
              <span key={c.name}>
                {c.top} in {c.name.toLowerCase()}
                {i < middle.length - 2 ? ", " : i === middle.length - 2 ? " and " : ""}
              </span>
            ))}
            . If the answer names the middleman, the middleman gets the customer.
          </p>
          <div className="mod-reading">
            <span className="mod-readinglbl">A category page</span>
            <Link className="mod-readinglink" href="/resources/geo-ireland/hotels">
              Hotels: AI names the booking sites, not the hotels
            </Link>
          </div>
        </Item>

        <Item id="f3" n={3} title="Reddit is the most-cited source in the whole survey">
          <Frame label="Most-cited sources across all 41 categories">
            <div className={s.sources}>
              {CITED.map(([d, n]) => (
                <div key={d} className={s.src}>
                  <span>{d}</span>
                  <span>
                    <i style={{ width: `${(n / 1313) * 100}%` }} />
                  </span>
                  <b style={{ minWidth: 34 }}>{n}</b>
                </div>
              ))}
            </div>
          </Frame>
          <p className="mod-body">
            Reddit is cited 1,313 times, ahead of citizensinformation.ie and the HSE. gov.uk is
            cited 176 times on Irish questions. What forums say about a brand is now part of how
            it is found.
          </p>
        </Item>

        <Item id="f4" n={4} title="Claude answers Irish questions with British and American content">
          <Frame label="Share of answers that drifted to UK or US content, questions that name no place">
            <div className={s.sources}>
              {DRIFT.map(([d, n]) => (
                <div key={d} className={s.src}>
                  <span>{d}</span>
                  <span>
                    <i style={{ width: `${n}%` }} />
                  </span>
                  <b style={{ minWidth: 34 }}>{`${n}%`}</b>
                </div>
              ))}
            </div>
          </Frame>
          <p className="mod-body">
            ChatGPT and Google stay in Ireland because they use the location sent with the
            question. No location was sent on the Claude calls, so these answers measure what
            Claude does by default.
          </p>
        </Item>

        <Item id="f5" n={5} title="Google often shows no AI answer at all">
          <p className="mod-body">
            Google showed no AI Overview on 101 of 924 questions. Those are left out of every
            rate and never counted as nobody named.
          </p>
        </Item>

        <Item id="f6" n={6} title="Some categories have no owner">
          <p className="mod-body">
            The best rate in tourism is 0.14, TripAdvisor. In pharmacies it is 0.15. Nobody has
            claimed these answers yet.
          </p>
        </Item>

        <Item id="categories" n={7} title="All 41 categories">
          <CategoryChips />
        </Item>

        <section className="mod-item" id="method">
          <div className="mod-reading" style={{ marginTop: 0 }}>
            <span className="mod-readinglbl">How we measured it</span>
            <p className="mod-body">
              One day of data, so no margin yet. Days two and three are running on six
              categories. Generic names such as Chill and An Post are counted by machine and
              flagged for a hand read. ChatGPT and Perplexity were asked through their APIs,
              not the apps.
            </p>
          </div>
          <div className="mod-reading">
            <span className="mod-readinglbl">Additional reading</span>
            <Link className="mod-readinglink" href="/answer-engine-optimization">
              18 things worth knowing about GEO<i>Paul Dervan</i>
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
