/*
  The search agent's morning note, written for a research group. A copy of the
  homepage's SearchAgentWindow (src/components/agents), which is left alone
  because it drives the live homepage. Paul, 9 Oct 2026: "personalise the
  examples for unknown". Every term, number and ad here is invented, and the
  note under the examples says so.
*/

const TERMS: [string, string, string, string][] = [
  ["brand tracking research ireland", "210 a month", "€3.20", "nobody bidding, and two of our pages answer it"],
  ["how to test a new brand name", "140 a month", "€1.10", "a question we answer well; one rival bids and sends people to a contact form"],
  ["distinctive brand assets research", "90 a month", "€2.40", "few searches, and the people searching are the buyers"],
  ["empathy research dublin", "480 a month", "€0.50", "our own name; a rival started bidding on it overnight"],
];

export default function UnknownSearchWindow() {
  return (
    <div className="agw agw-searchwin">
      <div className="agw-tl">
        <i />
        <i />
        <i />
        <span className="agw-t">Search Agent</span>
        <span className="agw-pill">live since 07:30</span>
      </div>
      <div className="agw-panel agw-sa">
        <div className="agw-sa-main">
          <div className="agw-k">new terms found overnight &middot; monday</div>
          <table className="agw-terms">
            <thead>
              <tr>
                <th>search term</th>
                <th>searches</th>
                <th>cost a click</th>
                <th>why bid</th>
              </tr>
            </thead>
            <tbody>
              {TERMS.map(([t, n, c, w]) => (
                <tr key={t}>
                  <td className="agw-term">{t}</td>
                  <td>{n}</td>
                  <td>{c}</td>
                  <td className="agw-why">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="agw-sa-note">
            Three added to the account this morning, each with a €25 a day cap. The fourth is
            our own name: I raised the bid to hold first place and it cost 20c more a click.
          </p>
        </div>
        <div className="agw-sa-side">
          <div className="agw-k">the ad I wrote for the first one</div>
          <div className="agw-ad">
            <div className="agw-ad-tag">Sponsored</div>
            <div className="agw-ad-url">
              <span className="agw-ad-fav">E</span>
              <span>
                Empathy Research
                <em>empathyresearch.ie/brand-tracking</em>
              </span>
            </div>
            <div className="agw-ad-h">Brand tracking for Irish brands | See what changed and why</div>
            <div className="agw-ad-d">
              One tracker, read by people who know the Irish market. You get what moved, why it moved
              and what to do about it, in plain words. Talk to the team that runs it.
            </div>
          </div>
          <div className="agw-sa-live">
            <span className="agw-time">07:30</span>
            <span>live, &euro;25 a day, first report to you Friday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
