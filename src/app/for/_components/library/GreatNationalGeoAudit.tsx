"use client";

// The AI answer sample for Great National Hotels, run 6 Aug 2026. Source of
// truth is the audit the search desk wrote:
// ~/projects/search-agent/brands/_prospects/greatnationalhotels.com/
// geo-audit-2026-08-06.md. Every number here is measured there. Prospect
// mode, no client access, zero spend.
//
// A COPY of the GeoAudit/AffirmGeoAudit pattern rather than a parameterised
// version, same trade as AffirmGeoAudit and for the same reason. This is the
// third sighting; whoever builds the fourth should merge these properly.
//
// ⚠️ Unlike Affirm's run, this one asked one assistant answering FROM ITS
// OWN RECORD, with web search off. There is no cited-domains table because
// nothing was fetched. The exhibit says so.
//
// ⚠️ DRAFT COPY, Paul's pass owed.

import { ScaledWindow } from "./AgentWindows";
import "./geo-audit.css";

// The answer to "which companies provide revenue management software for
// independent hotels in Ireland and the UK", verbatim from the audit. Ten
// names, and then, unprompted, that it could not confirm Revanista exists.
const RM_ANSWER = [
  "IDeaS",
  "Duetto",
  "RateGain",
  "Atomize",
  "BeonPrice",
  "RoomPriceGenie",
  "Pace Revenue",
  "Guestline",
  "SiteMinder",
  "Cloudbeds",
] as const;

export default function GreatNationalGeoAudit() {
  return (
    <div className="ppgeo">
      <ScaledWindow width={940}>
        <div className="ppgeo-win">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">
                the search agent · greatnationalhotels.com
              </span>
              <span className="ppw-live-pill">run 6 Aug 2026</span>
            </div>
            <div className="ppgeo-inner">
              <p className="ppgeo-intro">
                We wrote ten questions with no brand name in them. Four from a
                hotelier, like &ldquo;what representation groups could I join
                in Ireland?&rdquo;, and six from a guest deciding where to
                stay. We put them to an AI assistant answering from what it
                already knows, with web search off, and read the answers. It
                was not told the questions were about Great National.
              </p>
              <div className="ppgeo-split">
                <div>
                  <div className="ppgeo-n ppgeo-good">3 of 4</div>
                  <div className="ppgeo-l">
                    <b>hotelier</b> questions named Great National. On
                    representation groups and on outsourced reservations and
                    revenue management, it was the first recommendation,
                    ahead of Trident, Manor House and Best Western.
                  </div>
                </div>
                <div>
                  <div className="ppgeo-n">3 of 6</div>
                  <div className="ppgeo-l">
                    <b>guest</b> questions named it, and never first. A guest
                    searches for a hotel in Ennis rather than a hotel group,
                    and member hotels trade under their own names, so a
                    weaker score on this side is expected.
                  </div>
                </div>
              </div>

              <div className="ppgeo-rule" />

              <p className="ppgeo-k">
                Asked which companies provide revenue management software for
                independent hotels in Ireland and the UK, the assistant named
                ten:
              </p>
              <div className="ppgeo-table">
                {RM_ANSWER.map((d) => (
                  <div className="ppgeo-row" key={d}>
                    <span className="ppgeo-dom">{d}</span>
                    <span className="ppgeo-bar">
                      <i style={{ width: "100%" }} />
                    </span>
                    <span className="ppgeo-ct">named</span>
                  </div>
                ))}
                <div className="ppgeo-row">
                  <span className="ppgeo-dom">Revanista</span>
                  <span className="ppgeo-bar">
                    <i style={{ width: "0%" }} />
                  </span>
                  <span className="ppgeo-ct">not named</span>
                </div>
              </div>

              <div className="ppgeo-rule" />

              <div className="ppgeo-facts">
                <div>
                  <p className="ppgeo-k">Revanista is missing</p>
                  <p className="ppgeo-t">
                    After naming those ten, the assistant said, unprompted,
                    that it could not confirm a product called Revanista
                    exists. That is a buyer asking a purchase question about
                    the product Great National took Enterprise Ireland
                    funding to build AI into. Fixing it is publishing work,
                    and it has an obvious first move.
                  </p>
                </div>
                <div>
                  <p className="ppgeo-k">Nothing technical is in the way</p>
                  <p className="ppgeo-t">
                    We also sent every major AI crawler to the site, three
                    times each. The robots file is open and every retrieval
                    bot was served, so nothing technical is holding answers
                    back. What the assistants say comes down to what is
                    published, which is the part that can be worked on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>

      <p className="ppft-honest">
        <span className="ppft-slash">/measured.</span> Every number above
        comes from the assistant&rsquo;s recorded answers on 6 August 2026.
        One run, one engine, each question asked once, so there is no trend
        in it, and asked again next week the numbers would move. The
        underlying records are kept, so the scoring can be checked rather
        than taken on trust.
      </p>
    </div>
  );
}
