"use client";

// The AI answer sample for Affirm Health, run 11 Aug 2026. Source of truth
// is the plain-reader report the search desk wrote for a marketing audience:
// ~/projects/search-agent/brands/_prospects/affirm-healthcare.com/
// affirm-ai-answers-2026-08-11.md. Every number here is measured there.
// Internal material (cost ledger, tooling notes) stays out by rule.
//
// A COPY of GeoAudit.tsx rather than a parameterised version of it. That
// component says "parameterise on second sighting" and this is the second
// sighting, but the Fidelity page is live and deployed and refactoring a
// shipped component an hour before a meeting is the wrong trade. Whoever
// builds the third one should merge these two properly.
//
// ⚠️ DRAFT COPY, Paul's pass owed.
//
// Note the inversion from Fidelity: there, the client's own domain was read
// ZERO times and that was the finding. Here proceive.com is the single
// most-read source in the category, so the same table says the opposite.

import { ScaledWindow } from "./AgentWindows";
import "./geo-audit.css";

// Websites the searching assistant actually read, counted across the ten
// trade questions. Straight from section 3 of the report.
const CITED = [
  ["proceive.com", 7],
  ["pharmacynewsireland.com", 5],
  ["irishpharmacynews.ie", 4],
  ["fertilityfamily.co.uk", 4],
  ["oceanhealthcare.ie", 3],
  ["boots.com", 3],
  ["hollandandbarrett.com", 3],
] as const;

export default function AffirmGeoAudit() {
  return (
    <div className="ppgeo">
      <ScaledWindow width={940}>
        <div className="ppgeo-win">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">the search agent · proceive.com</span>
              <span className="ppw-live-pill">run 11 Aug 2026</span>
            </div>
            <div className="ppgeo-inner">
              <p className="ppgeo-intro">
                We wrote twenty questions with no brand name in them. Ten
                from a person trying to conceive or already pregnant, like
                &ldquo;what should I take when trying for a baby?&rdquo;,
                and ten from a pharmacy buyer deciding what to stock. We
                put them to two AI assistants, one answering from what it
                already knows and one searching the web first, and read the
                forty answers that came back. Neither assistant was told
                this was about Proceive or Affirm Health.
              </p>
              <div className="ppgeo-split">
                <div>
                  <div className="ppgeo-n ppgeo-good">42 / 60</div>
                  <div className="ppgeo-l">
                    on the <b>pharmacy buyer</b> questions. Proceive was
                    named in 18 of the 20 answers, and the assistant that
                    searched the web named it in all ten of its own.
                  </div>
                </div>
                <div>
                  <div className="ppgeo-n ppgeo-good">26 / 60</div>
                  <div className="ppgeo-l">
                    on the <b>consumer</b> questions. Named in 13 of the 20.
                    Strong on conception, and absent from every pregnancy
                    and post-birth answer, where Pregnacare was named
                    instead.
                  </div>
                </div>
              </div>

              <div className="ppgeo-rule" />

              <p className="ppgeo-k">
                The websites the assistant read to build the trade answers,
                and how many of the ten questions each was used for:
              </p>
              <div className="ppgeo-table">
                {CITED.map(([d, n]) => (
                  <div className="ppgeo-row" key={d}>
                    <span className="ppgeo-dom">{d}</span>
                    <span className="ppgeo-bar">
                      <i style={{ width: `${(n / 7) * 100}%` }} />
                    </span>
                    <span className="ppgeo-ct">{n} of 10</span>
                  </div>
                ))}
              </div>

              <div className="ppgeo-rule" />

              <div className="ppgeo-facts">
                <div>
                  <p className="ppgeo-k">
                    Searching, it knows you. From memory, it credits someone
                    else
                  </p>
                  <p className="ppgeo-t">
                    The assistant that searched got it right in detail:
                    owned by Affirm Health in Dublin, distributed into Irish
                    pharmacy by Ocean Healthcare, the 2024 Irish Pharmacy
                    News award, the export markets. The one answering from
                    memory said twice, unprompted, that Proceive belongs to
                    Wassen. So the published material is doing its job, and
                    what the model carries from training is out of date.
                  </p>
                </div>
                <div>
                  <p className="ppgeo-k">The door is open</p>
                  <p className="ppgeo-t">
                    We sent nine AI crawlers to both sites, three times
                    each. Both served all nine, every time. Squarespace
                    lists every AI crawler by name in Affirm Health&rsquo;s
                    robots file and many sites use that list to block them;
                    this one does not. It is the one problem here that
                    words cannot fix, and it is not a problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScaledWindow>

      <p className="ppgeo-dl">
        <a href="/for/affirm/audit" target="_blank" rel="noopener noreferrer">
          Download the full report (PDF)
        </a>
      </p>

      <p className="ppft-honest">
        <span className="ppft-slash">/measured.</span> Every number above
        comes from the assistants&rsquo; recorded answers. Forty answers is
        a sample: each question was asked once of each assistant, so there
        is no trend in it and no margin of error, and asked again next week
        the numbers would move. The underlying records are kept, so the
        scoring can be checked rather than taken on trust.
      </p>
    </div>
  );
}
