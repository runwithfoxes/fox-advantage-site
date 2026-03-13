export default function PlanTab() {
  return (
    <>
      {/* THE PRODUCT */}
      <div className="chief-section core-idea">
        <div className="chief-section-label">/what_it_is</div>
        <h3>Not a prompt. Not a chatbot. A chief of staff that actually does things.</h3>
        <p>The exec signs in with Google or Microsoft. The app reads their email and calendar automatically. Every morning they open one page and get a briefing: what needs their attention, what&apos;s been cleared, what&apos;s coming up, and the context they need before they walk into a meeting.</p>
        <p>It doesn&apos;t just summarise. It archives the noise, flags the politics, preps them for meetings, and connects dots they&apos;d otherwise miss.</p>
      </div>

      {/* WHAT THE BRIEFING LOOKS LIKE */}
      <div className="chief-section">
        <div className="chief-section-label">/the_briefing</div>
        <h3>What they see every morning</h3>
        <p>The exec opens their Chief of Staff page. This is what&apos;s waiting for them.</p>

        <div className="chief-briefing">
          <div className="chief-briefing-header">Thursday, March 13 — your morning briefing</div>

          <div className="chief-briefing-section">
            <h5>Your priorities today</h5>
            <div className="action">
              <p><strong>Reply to Sarah Keane.</strong> She sent the revised contract terms last night. Legal needs your sign-off before noon or the timeline slips to next quarter.</p>
            </div>
            <div className="action">
              <p><strong>Prep for the 10am with David.</strong> He attached a 14-page strategy doc on Tuesday that you haven&apos;t opened. The three things you need to know: they want to cut the UK budget by 30%, move spend to DACH, and they&apos;re pitching a new agency. More detail below.</p>
            </div>
            <div className="action">
              <p><strong>John Murray wants to talk.</strong> He&apos;s emailed you twice this week, and cc&apos;d your boss on the second one. It&apos;s about headcount for Q3. This feels like it&apos;s escalating. Worth a 10-minute call today.</p>
            </div>
          </div>

          <div className="chief-briefing-section">
            <h5>Meeting prep</h5>
            <p><strong>10:00 — Strategy review with David Chen</strong></p>
            <p className="muted">David&apos;s doc proposes three changes. Here&apos;s what you need to know going in:</p>
            <div className="action">
              <p>1. UK budget cut (30%) is driven by underperformance in retail, not a strategic shift. The data&apos;s on page 4.</p>
              <p>2. DACH expansion assumes the Munich office is fully staffed by June. Last you heard from Karen, they&apos;re still two hires short.</p>
              <p>3. The new agency pitch is from the same group you rejected in October. Different proposal, same team.</p>
            </div>
            <p><strong>2:00 — Weekly ops sync</strong></p>
            <p className="muted">No pre-read. Recurring meeting, standing agenda. Last week&apos;s action: you owed James the revised forecast. Check if you sent it.</p>
          </div>

          <div className="chief-briefing-section">
            <h5>Cleared from your inbox</h5>
            <div className="cleared">
              <p>12 newsletters and internal updates archived. Summary: Marketing Week covered the Unilever restructure. The internal &ldquo;Friday Wins&rdquo; email mentioned your team&apos;s Q2 launch. Nothing that needs action.</p>
            </div>
            <div className="cleared">
              <p>6 cc&apos;d threads archived. One worth noting: finance approved the travel budget for the Berlin trip. No action from you.</p>
            </div>
          </div>

          <div className="chief-briefing-section">
            <h5>FYI</h5>
            <p className="muted">Board pack draft circulated by Emma. Due date for comments is next Wednesday. Not urgent today but worth blocking 30 minutes later this week.</p>
            <p className="muted">HR announced the new parental leave policy. Applies from April. Relevant if you&apos;re planning around Lisa&apos;s leave.</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="chief-section">
        <div className="chief-section-label">/how_it_works</div>
        <h3>What happens behind the scenes</h3>

        <div className="chief-arch-flow">
          <div className="chief-arch-box">Gmail / Outlook</div>
          <div className="chief-arch-arrow">&rarr;</div>
          <div className="chief-arch-box">Calendar</div>
          <div className="chief-arch-arrow">&rarr;</div>
          <div className="chief-arch-box highlight">Claude API</div>
          <div className="chief-arch-arrow">&rarr;</div>
          <div className="chief-arch-box">Briefing page</div>
        </div>

        <ul className="chief-checklist">
          <li><strong>Reads email</strong> — pulls last 24 hours via Gmail API or Microsoft Graph. Read and write access so it can archive noise.</li>
          <li><strong>Reads calendar</strong> — pulls today&apos;s meetings and any attachments or linked docs from the invites.</li>
          <li><strong>Analyses with context</strong> — Claude processes everything against the exec&apos;s profile: their role, team, priorities, VIP contacts, what to flag, what to ignore.</li>
          <li><strong>Takes action</strong> — archives newsletters and noise. Doesn&apos;t just report, actually clears the inbox.</li>
          <li><strong>Preps meetings</strong> — reads attachments, cross-references with recent emails on the same topic, pulls out what the exec needs to know before they walk in.</li>
          <li><strong>Spots patterns</strong> — someone emailing twice in a week, an escalation tone, a missed follow-up. Flags it like a real chief of staff would.</li>
          <li><strong>Renders the briefing</strong> — clean page, formatted, scannable in 2 minutes. Not a wall of text.</li>
        </ul>
      </div>

      {/* THE EXEC'S PREFERENCES */}
      <div className="chief-section">
        <div className="chief-section-label">/preferences</div>
        <h3>What the exec configures</h3>
        <p>The system prompt is built from their profile. They fill this in once, then refine it over time.</p>

        <div className="chief-grid-2">
          <div className="chief-grid-card">
            <h4>Who they are</h4>
            <p>Role, company, team size. &ldquo;I&apos;m CMO at a mid-size SaaS company, 12 direct reports, report to the CEO.&rdquo;</p>
          </div>
          <div className="chief-grid-card">
            <h4>VIP contacts</h4>
            <p>Emails from these people are always flagged. Boss, key clients, board members. Everyone else gets normal triage.</p>
          </div>
          <div className="chief-grid-card">
            <h4>What&apos;s noise</h4>
            <p>Newsletters, internal updates, automated notifications. Archive and summarise, don&apos;t show me the full thing.</p>
          </div>
          <div className="chief-grid-card">
            <h4>What to flag</h4>
            <p>Anything mentioning board, budget, headcount, or my boss&apos;s name. Anything that sounds like an escalation.</p>
          </div>
        </div>
      </div>

      {/* TECHNICAL ARCHITECTURE */}
      <div className="chief-section">
        <div className="chief-section-label">/architecture</div>
        <h3>What we build</h3>

        <div className="chief-grid-3">
          <div className="chief-grid-card">
            <h4>front end</h4>
            <p>Simple web app. Sign-in page, briefing page, preferences page. Hosted on Vercel or similar.</p>
          </div>
          <div className="chief-grid-card">
            <h4>auth</h4>
            <p>Google OAuth and Microsoft OAuth (Azure AD). Read + write access to email. Read access to calendar.</p>
          </div>
          <div className="chief-grid-card">
            <h4>AI layer</h4>
            <p>Claude API. System prompt built from exec&apos;s profile. Processes emails, calendar, and attachments.</p>
          </div>
        </div>

        <div className="chief-grid-3" style={{ marginTop: "1px" }}>
          <div className="chief-grid-card">
            <h4>email actions</h4>
            <p>Archive via Gmail API (remove INBOX label) or Microsoft Graph (move to archive). Batch process noise.</p>
          </div>
          <div className="chief-grid-card">
            <h4>storage</h4>
            <p>Minimal. User profile, preferences, VIP list. No email content stored. Processed in memory and discarded.</p>
          </div>
          <div className="chief-grid-card">
            <h4>scheduling</h4>
            <p>Optional cron: generate briefing at 7am so it&apos;s ready when they open the page. Or generate on-demand when they visit.</p>
          </div>
        </div>
      </div>

      {/* THE SESSION */}
      <div className="chief-section">
        <div className="chief-section-label">/session_plan</div>
        <h3>The 60-minute session</h3>

        <div className="chief-timeline">
          <div className="chief-time">0:00</div>
          <div className="chief-time-block">
            <h4>The demo (you show yours)</h4>
            <p>Open your dashboard. Show the email triage: action, FYI, noise. Show meeting prep. Show tasks pulled from conversations. Don&apos;t explain how it works. Just use it. Let the room see what &ldquo;good&rdquo; looks like.</p>
            <p>Then: &ldquo;That took me months. You&apos;re going to have your own version working in the next 50 minutes.&rdquo;</p>
          </div>

          <div className="chief-time">10:00</div>
          <div className="chief-time-block">
            <h4>Sign in and connect</h4>
            <p>Everyone opens the app on their laptop. Signs in with Google or Microsoft. The app connects to their email and calendar. First briefing starts generating immediately.</p>
          </div>

          <div className="chief-time">15:00</div>
          <div className="chief-time-block">
            <h4>See your first briefing</h4>
            <p>Their real emails. Their real calendar. Triaged, prioritised, and formatted. This is the moment. They didn&apos;t paste anything. They didn&apos;t write a prompt. It just worked. Now they&apos;re leaning forward.</p>
          </div>

          <div className="chief-time">20:00</div>
          <div className="chief-time-block">
            <h4>Configure your chief of staff (30 mins)</h4>
            <p><strong>Round 1:</strong> Set your VIP contacts. Who should always be flagged? Regenerate. See the difference.</p>
            <p><strong>Round 2:</strong> Define your noise. Which senders are always archive? Which internal emails never need your attention? Regenerate.</p>
            <p><strong>Round 3:</strong> Set your flags. What topics should always surface? Budget, headcount, board, a specific project? Regenerate.</p>
            <p>Each round takes 5-8 minutes. By the end they&apos;ve trained it to their specific world. You walk the room, helping people sharpen their rules.</p>
          </div>

          <div className="chief-time">50:00</div>
          <div className="chief-time-block">
            <h4>Tomorrow morning</h4>
            <p>The briefing regenerates every morning at 7am. Open the page, read for 2 minutes, start your day knowing exactly what matters. Show them how to keep refining: &ldquo;That wasn&apos;t noise, flag it next time.&rdquo; The system learns.</p>
          </div>
        </div>
      </div>

      {/* WHY THIS WORKS */}
      <div className="chief-section">
        <div className="chief-section-label">/why_this_works</div>
        <h3>What makes it not slop</h3>
        <ul className="chief-checklist">
          <li>No pasting. No prompting. It connects to their actual email and calendar.</li>
          <li>It doesn&apos;t just summarise, it archives the noise and preps them for meetings.</li>
          <li>They calibrate it in the room with their real data. Three rounds of refinement.</li>
          <li>The morning habit is zero effort: open a page, read for 2 minutes.</li>
          <li>It gets better every day as they refine their rules.</li>
        </ul>

        <blockquote>
          <p><strong>Kyle Poyar:</strong> &ldquo;The hardest part isn&apos;t the technology. It&apos;s knowing which jobs you actually need done.&rdquo;</p>
        </blockquote>
      </div>

      {/* DECISIONS */}
      <div className="chief-section">
        <div className="chief-section-label">/decisions</div>
        <h3>Things to nail down</h3>

        <div className="chief-decision">
          <h4>1. Do we need IT approval for OAuth?</h4>
          <p>Some companies restrict which apps can access email. Need to check with the client&apos;s IT team before the session, not during it.</p>
        </div>

        <div className="chief-decision">
          <h4>2. Google or Microsoft?</h4>
          <p>We support both. Ask the client which one their org uses so we can test the right flow beforehand.</p>
        </div>

        <div className="chief-decision">
          <h4>3. How many people in the room?</h4>
          <p>Under 15 is ideal. You can walk the room and help people sharpen their rules. Over 20 and you need a second facilitator.</p>
        </div>

        <div className="chief-decision">
          <h4>4. Do we let it archive on day one?</h4>
          <p>Maybe start with &ldquo;suggest archive&rdquo; rather than auto-archive. Let them see what it would clear, approve it, then turn on auto-archive once they trust it. Safer for the first session.</p>
        </div>
      </div>

      {/* DELIVERABLES */}
      <div className="chief-section">
        <div className="chief-section-label">/deliverables</div>
        <h3>What we need to build</h3>

        <ul className="chief-checklist">
          <li><span className="chief-status chief-status-build">to build</span> &nbsp; The web app: sign-in, briefing page, preferences page</li>
          <li><span className="chief-status chief-status-build">to build</span> &nbsp; Google OAuth + Gmail/Calendar API integration</li>
          <li><span className="chief-status chief-status-build">to build</span> &nbsp; Microsoft OAuth + Graph API integration</li>
          <li><span className="chief-status chief-status-build">to build</span> &nbsp; Claude API briefing engine with configurable system prompt</li>
          <li><span className="chief-status chief-status-build">to build</span> &nbsp; Preferences UI: VIPs, noise rules, flag topics</li>
          <li><span className="chief-status chief-status-build">to build</span> &nbsp; Email actions: archive, label, batch clear</li>
          <li><span className="chief-status chief-status-build">to build</span> &nbsp; Morning cron: generate briefing at 7am</li>
          <li><span className="chief-status chief-status-build">to build</span> &nbsp; Demo script for your opening 10 minutes</li>
        </ul>
      </div>

      {/* UPGRADE PATH */}
      <div className="chief-section">
        <div className="chief-section-label">/after_the_session</div>
        <h3>The upgrade path</h3>
        <div className="chief-grid-4">
          <div className="chief-grid-card">
            <h4>week 1</h4>
            <p>Daily briefing. Open, read, refine rules. Build the habit and the trust.</p>
          </div>
          <div className="chief-grid-card">
            <h4>week 2</h4>
            <p>Turn on auto-archive. Let it clear the noise without asking.</p>
          </div>
          <div className="chief-grid-card">
            <h4>week 3</h4>
            <p>Add meeting prep. It reads attachments and connected docs before you walk in.</p>
          </div>
          <div className="chief-grid-card">
            <h4>week 4</h4>
            <p>Weekly review. &ldquo;Here&apos;s what you committed to this week. Here&apos;s what&apos;s still open.&rdquo;</p>
          </div>
        </div>
      </div>
    </>
  );
}
