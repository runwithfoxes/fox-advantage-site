import type { Metadata } from "next";
import { Shell, Item, Frame } from "../../parts";
import { ENGINES, HOTELS, HOTEL_SOURCES } from "../../data";
import HotelAsk from "./HotelAsk";
import s from "../../resources.module.css";

export const metadata: Metadata = {
  title: "Hotels, GEO Ireland | Run with Foxes",
  robots: { index: false, follow: false },
};

/** Shade a rate. Booking sites in deep sky, hotels in sky blue, so the two groups separate at a glance. */
function shade(v: number, site: boolean) {
  const a = Math.min(1, v / 0.7);
  const rgb = site ? "26,58,78" : "58,124,165";
  return { background: `rgba(${rgb},${0.05 + a * 0.95})`, color: a > 0.45 ? "var(--bg)" : "var(--text)" };
}

/**
 * ONE OF 41 CATEGORY PAGES. Going wide across sectors, Paul 23 Sep, is a page per category,
 * each built from its own JSON. This is also the one place the resources ask for an email,
 * because the answer is about the reader's own hotel.
 */
export default function HotelsPage() {
  return (
    <Shell
      back={{ href: "/resources/geo-ireland", label: "← geo ireland" }}
      railTitle="GEO Ireland"
      railHref="/resources/geo-ireland"
      railLabel="/hotels"
      rail={[
        { href: "#named", k: "01", t: "Who gets named" },
        { href: "#sources", k: "02", t: "Where the answers come from" },
        { href: "#yours", k: "03", t: "Your hotel" },
      ]}
      railFoot={
        <a className="mod-rail-lib" href="/resources/geo-ireland#categories">
          /all 41 categories
        </a>
      }
    >
      <header className="mod-masthead">
        <p className="mod-eyebrow">GEO Ireland &middot; category &middot; day one, 23 Aug 2026</p>
        <h1 className="mod-h1">
          Hotels: AI names the <span className="mod-hl">booking sites</span>, not the hotels
        </h1>
        <p className="mod-standfirst">
          Ask an AI where to stay in Ireland and it sends you to Booking.com or Expedia. The
          best-placed Irish hotel group is named on 14% of answers at most.
        </p>
        <div className="mod-meta">
          <span>
            Questions<b>22</b>
          </span>
          <span>
            Engines agree<b>96%</b>
          </span>
          <span>
            No Google AI answer<b>4 of 22</b>
          </span>
          <span>
            Hand reads pending<b>9 names</b>
          </span>
        </div>
      </header>

      <main>
        <Item id="named" n={1} title="Who gets named, engine by engine">
          <Frame label="Share of the 22 answers that name each one">
            <div className={s.matrixWrap}>
              <table className={s.matrix}>
                <thead>
                  <tr>
                    <th />
                    {ENGINES.map((e) => (
                      <th key={e}>{e}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HOTELS.map((h) => (
                    <tr key={h.name}>
                      <td>
                        {h.name}
                        {h.site ? <i>booking site</i> : null}
                      </td>
                      {h.rates.map((v, i) => (
                        <td key={i}>
                          <div className={s.cell} style={shade(v, h.site)}>
                            {v ? `${Math.round(v * 100)}%` : "-"}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Frame>
          <p className="mod-body">
            Claude names Booking.com on 68% of answers and Expedia on 59%. Maldron is the Irish
            group named most, on 14% at best. Google&rsquo;s AI Overviews name hotels least of
            all five.
          </p>
        </Item>

        <Item id="sources" n={2} title="Where the answers come from">
          <Frame label="Most-cited sources on hotel questions, citations">
            <div className={s.sources}>
              {HOTEL_SOURCES.map(([d, n]) => (
                <div key={d} className={`${s.src} ${/booking|tripadvisor|skyscanner/.test(d) ? s.site : ""}`}>
                  <span>{d}</span>
                  <span>
                    <i style={{ width: `${(n / 45) * 100}%` }} />
                  </span>
                  <b>{n}</b>
                </div>
              ))}
            </div>
          </Frame>
          <p className="mod-body">
            Reddit is cited more than any hotel&rsquo;s own website. Hotels&rsquo; own sites
            make up under 4% of what the engines cite.
          </p>
        </Item>

        <Item id="yours" n={3} title="See where your hotel stands on all five engines">
          <p className="mod-body">
            We run the same 22 questions with your hotel in the count, and email you the
            result for each engine.
          </p>
          <HotelAsk />
        </Item>
      </main>
    </Shell>
  );
}
