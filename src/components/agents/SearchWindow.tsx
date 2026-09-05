"use client";

/*
  SEARCH AGENT - what it hands over: the answer to "what do the AI
  assistants say when someone asks about your category, and are you in it".

  Same window and the same reading order as the search agent's audit on the
  proposal pages (GeoAudit.tsx), which Paul passed line by line for Fidelity
  on 10 Aug. Here it is run for Kite Insurance, the made-up insurer from the
  course, so every number is invented and the caption under the window says
  so. The shape is the real one: who was asked and how, two scores, the
  websites the assistants read, and two findings.
*/

import { ScaledWindow } from "@/app/for/_components/library/AgentWindows";
import "@/app/for/_components/library/geo-audit.css";

const CITED = [
  ["ccpc.ie", 11],
  ["bonkers.ie", 9],
  ["switcher.ie", 8],
  ["citizensinformation.ie", 6],
  ["irishtimes.com", 4],
  ["insuranceireland.eu", 3],
] as const;

export default function SearchWindow() {
  return (
    <div className="ppgeo">
      <ScaledWindow width={940}>
        <div className="ppgeo-win">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">Search Agent &middot; kite.ie</span>
              <span className="ppw-live-pill">run this morning</span>
            </div>
            <div className="ppgeo-inner">
              <p className="ppgeo-intro">
                We wrote twenty questions a real person in Ireland would put to an AI assistant
                such as ChatGPT or Claude. Ten about buying, like &ldquo;who is cheapest for home
                insurance in Dublin?&rdquo;, and ten about renewing, like &ldquo;my insurance
                went up, what do I do?&rdquo;. None of them mentioned Kite or any brand. We put
                them to two assistants, read the forty answers, and counted how often Kite was
                in them.
              </p>
              <div className="ppgeo-split">
                <div>
                  <div className="ppgeo-n ppgeo-good">62 / 100</div>
                  <div className="ppgeo-l">
                    on the <b>renewal</b> questions. Kite was named in 15 of the 20 answers, and
                    asked which insurer checks the market for you before renewal, both
                    assistants named Kite first.
                  </div>
                </div>
                <div>
                  <div className="ppgeo-n ppgeo-bad">9 / 100</div>
                  <div className="ppgeo-l">
                    on the <b>buying</b> questions. Kite was in 3 of the 20 answers. Cheapest
                    cover, first-time buyer, car and home together: absent from every one.
                  </div>
                </div>
              </div>

              <div className="ppgeo-rule" />

              <p className="ppgeo-k">
                The websites the assistants read to build those answers, and how often each was
                used:
              </p>
              <div className="ppgeo-table">
                {CITED.map(([d, n]) => (
                  <div className="ppgeo-row" key={d}>
                    <span className="ppgeo-dom">{d}</span>
                    <span className="ppgeo-bar">
                      <i style={{ width: `${(n / 11) * 100}%` }} />
                    </span>
                    <span className="ppgeo-ct">{n}</span>
                  </div>
                ))}
                <div className="ppgeo-row ppgeo-zero">
                  <span className="ppgeo-dom">kite.ie</span>
                  <span className="ppgeo-bar" />
                  <span className="ppgeo-ct">1 of 96</span>
                </div>
              </div>

              <div className="ppgeo-rule" />

              <div className="ppgeo-facts">
                <div>
                  <p className="ppgeo-k">Why buying is the gap</p>
                  <p className="ppgeo-t">
                    The assistants answer buying questions off the comparison sites and the
                    consumer watchdog, and none of those pages mention Kite. Kite&rsquo;s own site
                    has no page that answers a buying question in plain words. The renewal score
                    is high because the renewal promise is written on the homepage in one
                    sentence, and the assistants quote it.
                  </p>
                </div>
                <div>
                  <p className="ppgeo-k">What to do first</p>
                  <p className="ppgeo-t">
                    Three pages, one for each buying question Kite is absent from, written the
                    way the renewal sentence is written. Then get onto the two comparison sites
                    the assistants read most. The agent re-runs the twenty questions every week
                    and reports the movement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>
    </div>
  );
}
