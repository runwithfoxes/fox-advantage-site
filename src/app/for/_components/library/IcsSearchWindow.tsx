/*
  The search agent's morning note for the ICS Medical page. A copy of
  UnknownSearchWindow with the Empathy names taken out, so that page is left
  alone. The advertiser is a made-up food company. Every term, number and ad is
  invented, and the note under the window says so.
*/

const TERMS: [string, string, string, string][] = [
  ["frozen soup delivery ireland", "210 a month", "€3.20", "nobody bidding, and two of our pages answer it"],
  ["how to make soup without a recipe", "140 a month", "€1.10", "a question we answer well; one rival bids and sends people to a contact form"],
  ["small batch soup", "90 a month", "€2.40", "few searches, and the people searching are the buyers"],
  ["fennick foods dublin", "480 a month", "€0.50", "our own name; a rival started bidding on it overnight"],
];

export default function IcsSearchWindow() {
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
          <div className="agw-k">new terms found overnight</div>
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
            Three added to the account this morning, each with a cap. The fourth is our own name:
            I raised the bid to hold first place and it cost 20c more a click.
          </p>
        </div>
        <div className="agw-sa-side">
          <div className="agw-k">the ad I wrote for the first one</div>
          <div className="agw-ad">
            <div className="agw-ad-tag">Sponsored</div>
            <div className="agw-ad-url">
              <span className="agw-ad-fav">F</span>
              <span>
                Fennick Foods
                <em>fennickfoods.ie/soup</em>
              </span>
            </div>
            <div className="agw-ad-h">Soup delivered frozen | Ready in minutes</div>
            <div className="agw-ad-d">
              Small batches, made from simple ingredients and delivered to your door. See the range
              and order online.
            </div>
          </div>
          <div className="agw-sa-live">
            <span className="agw-time">07:30</span>
            <span>live, first report to you Friday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
