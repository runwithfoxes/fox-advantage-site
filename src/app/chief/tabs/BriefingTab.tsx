export default function BriefingTab() {
  return (
    <div style={{ maxWidth: 720, paddingTop: 40 }}>
      {/* Header */}
      <header className="chief-header">
        <h1 className="chief-greeting">Good morning, Sarah</h1>
        <div className="chief-timestamp">Thursday, March 13 2026 — 08:04</div>
        <div className="chief-header-stats">
          <span>32</span> emails processed &middot; <span>14</span> archived &middot; <span>3</span> need your attention
        </div>
      </header>

      {/* /priorities */}
      <section style={{ marginBottom: 56 }}>
        <div className="chief-section-label">/priorities</div>

        <div className="chief-priority-card urgent">
          <div className="chief-priority-action">Reply to Marcus Webb about the Q3 media plan</div>
          <div className="chief-priority-context">
            He sent revised numbers last night. The total is 15% over your approved budget. He needs your call on whether to cut programmatic or reduce the TV allocation. Agency presentation is Monday, so he&apos;s working to that.
          </div>
        </div>

        <div className="chief-priority-card urgent">
          <div className="chief-priority-action">James O&apos;Brien wants to talk, and it&apos;s escalating</div>
          <div className="chief-priority-context">
            Two emails this week about the rebrand timeline, and he cc&apos;d Catherine on the second one. He&apos;s concerned the launch will slip past the September board meeting. A 10-minute call today would head this off before it becomes a bigger thing.
          </div>
        </div>

        <div className="chief-priority-card">
          <div className="chief-priority-action">Sign off on the Henley sponsorship contract</div>
          <div className="chief-priority-context">
            Legal sent the final version yesterday at 16:00. It&apos;s clean, no changes from what you agreed. But the deadline is end of day Friday and finance needs 24 hours to process. Worth doing today so it doesn&apos;t become tomorrow&apos;s problem.
          </div>
        </div>
      </section>

      {/* /meeting_prep */}
      <section style={{ marginBottom: 56 }}>
        <div className="chief-section-label">/meeting_prep</div>

        <div className="chief-meeting-card">
          <div className="chief-meeting-time"><span className="time">10:00</span> — Q3 planning with David Chen and team</div>
          <div className="chief-meeting-note">
            David circulated a 12-page deck on Monday. Key points: they&apos;re proposing to shift 40% of brand spend to performance. The data on slide 7 contradicts what Karen presented last month. Worth asking about that directly.
          </div>
          <div className="chief-meeting-note">
            Last week David mentioned he&apos;s losing two people in April. This might be driving the shift to performance, since it&apos;s less resource-intensive. That context could change how you read the proposal.
          </div>
        </div>

        <div className="chief-meeting-card">
          <div className="chief-meeting-time"><span className="time">14:00</span> — Weekly ops sync</div>
          <div className="chief-meeting-note">
            Standing meeting, no pre-read. Your open action from last week: you owed Priya the revised creative brief. Check if you sent it. If not, it&apos;ll come up.
          </div>
        </div>

        <div className="chief-meeting-card">
          <div className="chief-meeting-time"><span className="time">16:30</span> — Catch-up with Catherine</div>
          <div className="chief-meeting-note">
            Your boss. Nothing specific on the agenda, but given James&apos;s emails about the rebrand, she&apos;ll probably bring it up. Have your timeline ready. It&apos;s better she hears your version first.
          </div>
        </div>
      </section>

      {/* /cleared */}
      <section style={{ marginBottom: 56 }}>
        <div className="chief-section-label">/cleared</div>

        <div className="chief-cleared-summary"><span>14 emails archived</span> on your behalf</div>

        <div className="chief-cleared-group">
          <div className="chief-cleared-group-label">Newsletters (6)</div>
          <div className="chief-cleared-item"><span className="highlight">Marketing Week</span> — Unilever restructure piece worth reading later</div>
          <div className="chief-cleared-item">Campaign — nothing relevant this week</div>
          <div className="chief-cleared-item">AdAge — skip</div>
          <div className="chief-cleared-item">The Drum — skip</div>
          <div className="chief-cleared-item">Morning Brew — skip</div>
          <div className="chief-cleared-item"><span className="highlight">HBR Daily</span> — article on reorg fatigue, flagged for later</div>
        </div>

        <div className="chief-cleared-group">
          <div className="chief-cleared-group-label">Internal (5)</div>
          <div className="chief-cleared-item">Friday Wins roundup</div>
          <div className="chief-cleared-item">IT maintenance notice — Saturday 02:00 to 06:00</div>
          <div className="chief-cleared-item">Canteen menu</div>
          <div className="chief-cleared-item">Office social invite — drinks Friday 17:30</div>
          <div className="chief-cleared-item">Parking update — level 2 closed next week</div>
        </div>

        <div className="chief-cleared-group">
          <div className="chief-cleared-group-label">CC&apos;d threads (3)</div>
          <div className="chief-cleared-item">Finance approved the Berlin trip budget</div>
          <div className="chief-cleared-item">Procurement acknowledged your PO</div>
          <div className="chief-cleared-item">HR benefits enrolment reminder — deadline April 5</div>
        </div>
      </section>

      {/* /fyi */}
      <section style={{ marginBottom: 56 }}>
        <div className="chief-section-label">/fyi</div>

        <div className="chief-fyi-item">
          Board pack first draft due <span className="date-ref">next Wednesday</span>. Emma sent the template. Worth blocking 30 minutes later this week to get ahead of it.
        </div>

        <div className="chief-fyi-item">
          Oatly launched their new campaign yesterday. Early reactions on LinkedIn are mixed. Might be worth discussing in Monday&apos;s brand meeting, even just to check if the team has seen it.
        </div>

        <div className="chief-fyi-item">
          Annual reviews kick off <span className="date-ref">April 1</span>. HR wants manager assessments by <span className="date-ref">April 15</span>. You have 8 direct reports to review.
        </div>
      </section>

      {/* /your_rules */}
      <section className="chief-rules-section">
        <div className="chief-section-label">/your_rules</div>

        <div className="chief-rules-grid">
          <div className="chief-rule-block">
            <div className="chief-rule-label">VIPs</div>
            <div className="chief-rule-value">
              Catherine Park (boss)<br />
              Marcus Webb<br />
              James O&apos;Brien<br />
              Board members
            </div>
          </div>

          <div className="chief-rule-block">
            <div className="chief-rule-label">Always archive</div>
            <div className="chief-rule-value">
              Newsletters (summarise first)<br />
              IT notices<br />
              Canteen / social
            </div>
          </div>

          <div className="chief-rule-block">
            <div className="chief-rule-label">Flag topics</div>
            <div className="chief-rule-value">
              board, budget, rebrand, Q3, headcount
            </div>
          </div>
        </div>

        <a href="#" className="chief-edit-link" onClick={(e) => e.preventDefault()}>$ edit_preferences</a>
      </section>

      {/* Footer */}
      <footer className="chief-footer">
        <div className="chief-footer-time">Generated at 07:00 &middot; Next briefing tomorrow at 07:00</div>
        <div className="chief-footer-brand">
          Powered by /<span className="logo-run">Run</span><span className="logo-rest">withfoxes</span>
        </div>
      </footer>
    </div>
  );
}
