/*
  SEARCH AGENT - what it hands over each morning.

  Paul, 5 Sep: "What I really wanted is a search agent that is saying, here
  are the new search terms that I found that we should bid on. Here is a new
  search ad that I've written. Someone who's doing your search marketing for
  you. They're looking at long tail, they're analysing them, they are
  writing new ads, they're putting them live every day."

  So this is that morning's work, at reading size: the terms it found
  overnight and why they are worth bidding on, the ad it wrote for the best
  of them, and the line saying it went live. HTML, so it wraps on a phone.
  Kite Insurance is the made-up insurer from the course; every term, number
  and ad is invented and the caption under the window says so.
*/

const TERMS: [string, string, string, string][] = [
  ["home insurance first time buyer ireland", "390 a month", "€1.40", "nobody bidding, three of our pages answer it"],
  ["car and home insurance together dublin", "260 a month", "€2.10", "two rivals bidding, both send people to a generic quote page"],
  ["insurance went up at renewal what to do", "170 a month", "€0.90", "a question we answer better than anyone; no one bids"],
  ["kite insurance renewal", "2,400 a month", "€0.60", "our own name; the price went up 40c overnight, a rival is on it"],
];

export default function SearchAgentWindow() {
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
            our own name: I raised the bid to hold first place and it cost 40c more a click.
          </p>
        </div>
        <div className="agw-sa-side">
          <div className="agw-k">the ad I wrote for the first one</div>
          <div className="agw-ad">
            <div className="agw-ad-tag">Sponsored</div>
            <div className="agw-ad-url">
              <span className="agw-ad-fav">K</span>
              <span>
                Kite Insurance
                <em>kite.ie/first-home</em>
              </span>
            </div>
            <div className="agw-ad-h">Home insurance for your first home | Quoted in four minutes</div>
            <div className="agw-ad-d">
              Buying your first home? Answer eleven questions once and get a price you can take to
              your solicitor today. No forms, no phone call. Cover starts the day you get the keys.
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
