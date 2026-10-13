/*
  The lead finder's morning list, written for ICS Medical. Built on the same
  parts as UnknownSearchWindow (the agw- classes in agents-section.css). The
  five companies are invented and are not real startups or real ICS customers.
  Every fact in the list has its source beside it. Ranked by need for a
  catheter and by funding stage, as on the 8 Oct call.
*/

const LEADS: [string, string, string, string, string][] = [
  ["Quillon Vascular", "need: high", "Series A", "just funded; supplier cannot scale the device", "funding news"],
  ["Brannow Medical", "need: high", "Seed", "has been making the device itself, now needs it made properly", "published paper"],
  ["Teskel Cardio", "need: medium", "Series A", "on the speaker list for a catheter session", "conference list"],
  ["Oskarra Vascular", "need: medium", "Seed", "first round announced this week", "funding news"],
  ["Halvern Neuro", "need: low", "Pre-seed", "named in one paper on a delivery system", "published paper"],
];

export default function IcsLeadFinderWindow() {
  return (
    <div className="agw agw-searchwin agw-leads">
      <div className="agw-tl">
        <i />
        <i />
        <i />
        <span className="agw-t">Lead Finder</span>
        <span className="agw-pill">ready for the morning</span>
      </div>
      <div className="agw-panel agw-sa">
        <div className="agw-sa-main">
          <div className="agw-k">medical device startups &middot; ranked by need for a catheter, then by funding stage</div>
          <table className="agw-terms">
            <thead>
              <tr>
                <th>startup</th>
                <th>need</th>
                <th>stage</th>
                <th>what it saw, and where</th>
              </tr>
            </thead>
            <tbody>
              {LEADS.map(([name, need, stage, saw, source], i) => (
                <tr key={name} style={i === 4 ? { animationDelay: "2.8s" } : undefined}>
                  <td className="agw-term">{name}</td>
                  <td>{need}</td>
                  <td>{stage}</td>
                  <td className="agw-why">
                    {saw} <em>({source})</em>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="agw-sa-note">
            Five found since yesterday, drawn from funding news, published papers and conference
            lists. The top two are the signals you rate most.
          </p>
        </div>
        <div className="agw-sa-side">
          <div className="agw-k">the two at the top</div>
          <div className="agw-ad">
            <div className="agw-ad-tag">Quillon Vascular</div>
            <div className="agw-ad-d">
              Funding news: a Series A announced. Supplier: the same one since the seed round, and
              it cannot scale.
            </div>
          </div>
          <div className="agw-ad" style={{ marginTop: 10 }}>
            <div className="agw-ad-tag">Brannow Medical</div>
            <div className="agw-ad-d">
              Published paper: the team describes making the device itself. Next step: it needs
              making properly.
            </div>
          </div>
          <div className="agw-sa-live">
            <span className="agw-time">07:30</span>
            <span>the list is in your inbox every morning</span>
          </div>
        </div>
      </div>
    </div>
  );
}
