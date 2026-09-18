"use client";

// The AI answer sample for fidelity.ca. Source of truth is the
// plain-reader report the search desk wrote for Paul's marketing
// audience: ~/projects/search-agent/brands/_prospects/fidelity.ca/
// fidelity-ai-answers-2026-08-10.md (NOT geo-audit-2026-08-10.md, which
// is the internal working file). Every number is measured there; nothing
// here is estimated. The internal material (cost ledger, tooling notes,
// other-client caveats) stays out of anything client-facing by rule.
//
// Fidelity-specific data inline for now; parameterise on second sighting.

import { ScaledWindow } from "./AgentWindows";
import "./geo-audit.css";

const CITED = [
  ["lifemoney.ca", 12],
  ["milliondollarjourney.com", 9],
  ["moneysense.ca", 8],
  ["morningstar.com", 8],
  ["mackenzieinvestments.com", 4],
  ["theglobeandmail.com", 4],
] as const;

export default function GeoAudit() {
  return (
    <div className="ppgeo">
      <ScaledWindow width={940}>
        <div className="ppgeo-win">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">the search agent · fidelity.ca</span>
              <span className="ppw-live-pill">run 10 Aug 2026</span>
            </div>
            <div className="ppgeo-inner">
              {/* Rewritten for clarity on Paul's pass, 10 Aug: "Who was
                  asked and how? It is not clear to me." */}
              <p className="ppgeo-intro">
                We wrote twenty questions that a real Canadian would ask an
                AI assistant such as ChatGPT or Claude. Ten from a
                financial adviser, like &ldquo;which fund company best
                supports advisers?&rdquo;, and ten from an ordinary
                investor, like &ldquo;what are the best ETFs in
                Canada?&rdquo;. None of the questions mentioned Fidelity
                or any brand. We put them to two AI assistants, read the
                forty answers that came back, and counted how often
                Fidelity was in them.
              </p>
              <div className="ppgeo-split">
                <div>
                  <div className="ppgeo-n ppgeo-good">58 / 100</div>
                  <div className="ppgeo-l">
                    on the <b>adviser</b> questions. Fidelity was named in
                    17 of the 20 answers, and asked which Canadian fund
                    company has the strongest investment team, both
                    assistants named Fidelity first.
                  </div>
                </div>
                <div>
                  <div className="ppgeo-n ppgeo-bad">7 / 100</div>
                  <div className="ppgeo-l">
                    on the <b>investor</b> questions. Fidelity was in 2 of
                    the 20 answers. Best ETFs, TFSA, RRSP, best funds for
                    a beginner: absent from every one.
                  </div>
                </div>
              </div>

              <div className="ppgeo-rule" />

              <p className="ppgeo-k">
                The websites the assistants read to build those answers,
                and how often each was used:
              </p>
              <div className="ppgeo-table">
                {CITED.map(([d, n]) => (
                  <div className="ppgeo-row" key={d}>
                    <span className="ppgeo-dom">{d}</span>
                    <span className="ppgeo-bar">
                      <i style={{ width: `${(n / 12) * 100}%` }} />
                    </span>
                    <span className="ppgeo-ct">{n}</span>
                  </div>
                ))}
                <div className="ppgeo-row ppgeo-zero">
                  <span className="ppgeo-dom">fidelity.ca</span>
                  <span className="ppgeo-bar" />
                  <span className="ppgeo-ct">0 of 112</span>
                </div>
              </div>

              <div className="ppgeo-rule" />

              <div className="ppgeo-facts">
                <div>
                  <p className="ppgeo-k">The name problem</p>
                  <p className="ppgeo-t">
                    Asked about Fidelity with no country attached, the
                    assistant that searches the web answered all five
                    questions as Fidelity Investments in the United
                    States, a company Canadians cannot buy from, and read
                    fidelity.com five times, fidelity.ca never.
                    &ldquo;fidelity&rdquo; is searched 60,500 times a
                    month in Canada; &ldquo;fidelity canada&rdquo; 9,900.
                  </p>
                </div>
                <div>
                  <p className="ppgeo-k">What is working</p>
                  <p className="ppgeo-t">
                    The groundwork is sound. All nine AI systems we tested
                    are allowed to read the site, every time. So this is
                    not a technical problem; what decides the outcome is
                    which pages exist and how they are written. The
                    quickest fix found: the site&rsquo;s own page list
                    sends the ETF address to the homepage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>

      {/* The standfirst under the window came off on Paul's pass, 10 Aug. */}
      <p className="ppgeo-dl">
        <a href="/for/fidelity/audit" target="_blank" rel="noopener noreferrer">
          Download the full report (PDF)
        </a>
      </p>

      <p className="ppft-honest">
        <span className="ppft-slash">/measured.</span> Every number above
        comes from the assistants&rsquo; recorded answers, and the
        underlying records are kept, all forty answers, the source lists
        and the page checks, so the scoring can be checked rather than
        taken on trust.
      </p>
    </div>
  );
}
