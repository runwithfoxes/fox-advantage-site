export default function ArchitectureTab() {
  return (
    <>
      {/* Navigation */}
      <div className="chief-page-nav" style={{ marginTop: 24 }}>
        <a href="#overview">overview</a>
        <a href="#user_flow">user_flow</a>
        <a href="#architecture">architecture</a>
        <a href="#data_model">data_model</a>
        <a href="#briefing_engine">briefing_engine</a>
        <a href="#system_prompt">system_prompt</a>
        <a href="#api_routes">api_routes</a>
        <a href="#security">security</a>
        <a href="#deployment">deployment</a>
        <a href="#deliverables">deliverables</a>
      </div>

      {/* /overview */}
      <hr id="overview" className="chief-arch-hr" />
      <div className="chief-section-label">/overview</div>
      <h2>What this product is</h2>
      <p className="chief-arch-p">Chief of Staff is a web app where executives sign in with their Google or Microsoft account and get an AI-powered morning briefing. It reads their email, triages it, archives the noise, preps them for meetings, and flags what actually matters.</p>
      <p className="chief-arch-p">There&apos;s no pasting emails into a chat window. No writing prompts. No configuring workflows. The exec connects their account, tells us who matters and what to watch for, and every morning at 7am there&apos;s a briefing waiting for them.</p>
      <div className="chief-arch-blockquote">
        <p>Think of it as a real chief of staff, the kind a CEO would hire to sit outside their office and filter everything before it reaches them, except it costs a fraction of that salary and it never sleeps.</p>
      </div>
      <p className="chief-arch-p">Multi-tenant from day one. Each user&apos;s data is isolated. Each user&apos;s preferences shape their own briefing. The AI adapts to each exec&apos;s world, their VIPs, their noise, their priorities.</p>

      <h3>Core capabilities</h3>
      <ul className="chief-arch-list">
        <li>Reads and triages the last 24 hours of email</li>
        <li>Archives noise automatically (newsletters, internal spam, vendor outreach)</li>
        <li>Surfaces priorities with context on why they matter</li>
        <li>Preps every meeting on today&apos;s calendar with relevant email threads</li>
        <li>Spots escalation patterns, someone emailing repeatedly, cc&apos;ing bosses</li>
        <li>Delivers a structured briefing every morning at 7am local time</li>
        <li>Learns from feedback, refining noise rules and priority signals over time</li>
      </ul>

      {/* /user_flow */}
      <hr id="user_flow" className="chief-arch-hr" />
      <div className="chief-section-label">/user_flow</div>
      <h2>What the exec experiences</h2>
      <p className="chief-arch-p">The whole point is that this feels effortless. Sign in, connect, tell us a few things, and the briefing appears. Here&apos;s the step-by-step.</p>

      <ul className="chief-step-list">
        <li>
          <span className="chief-step-number">01</span>
          <span className="chief-step-title">Sign in at chiefofstaff.runwithfoxes.com</span>
          <span className="chief-step-desc">Clean landing page. One button: &ldquo;Sign in with Google&rdquo; or &ldquo;Sign in with Microsoft&rdquo;. No account creation form. OAuth handles everything.</span>
        </li>
        <li>
          <span className="chief-step-number">02</span>
          <span className="chief-step-title">Connect their email and calendar</span>
          <span className="chief-step-desc">Standard OAuth consent screen. We request read and write access to email (so we can archive) and read access to calendar. They click &ldquo;Allow&rdquo; once.</span>
        </li>
        <li>
          <span className="chief-step-number">03</span>
          <span className="chief-step-title">Fill in a quick profile</span>
          <span className="chief-step-desc">Role, company name, team size, who they report to. This shapes the system prompt so the AI knows their context. Takes 30 seconds.</span>
        </li>
        <li>
          <span className="chief-step-number">04</span>
          <span className="chief-step-title">Set their preferences</span>
          <span className="chief-step-desc">VIP contacts (always flag these people). Noise senders (always archive these). Flag topics (keywords to always surface). They can come back and refine these anytime.</span>
        </li>
        <li>
          <span className="chief-step-number">05</span>
          <span className="chief-step-title">First briefing generates immediately</span>
          <span className="chief-step-desc">We pull their last 24 hours of email and today&apos;s calendar right now, run the briefing engine, and show them the result. They see value in under a minute.</span>
        </li>
        <li>
          <span className="chief-step-number">06</span>
          <span className="chief-step-title">Every morning at 7am, a new briefing is ready</span>
          <span className="chief-step-desc">Cron job runs at 7am in their timezone. By the time they open the app, everything&apos;s triaged and waiting. Push notification or email nudge optional.</span>
        </li>
        <li>
          <span className="chief-step-number">07</span>
          <span className="chief-step-title">They refine over time</span>
          <span className="chief-step-desc">&ldquo;That wasn&apos;t noise, don&apos;t archive that sender again.&rdquo; &ldquo;Always flag emails about Project Titan.&rdquo; The system gets sharper each week as they give feedback.</span>
        </li>
      </ul>

      {/* /architecture */}
      <hr id="architecture" className="chief-arch-hr" />
      <div className="chief-section-label">/architecture</div>
      <h2>Technical architecture</h2>
      <p className="chief-arch-p">The stack is intentionally simple. Off-the-shelf services, clear boundaries, no over-engineering. Everything runs on managed infrastructure so there&apos;s nothing to babysit.</p>

      <div className="chief-arch-diagram">
        <div className="chief-arch-row one-col">
          <div className="chief-arch-diagram-box accent-left">
            <div className="box-label">Frontend</div>
            <div className="box-title">Next.js on Vercel</div>
            <div className="box-detail">Briefing page, preferences page, onboarding flow. Server-side rendered. chiefofstaff.runwithfoxes.com</div>
          </div>
        </div>
        <div className="chief-arch-row one-col">
          <div className="chief-arch-diagram-arrow">&darr; HTTPS &darr;</div>
        </div>
        <div className="chief-arch-row two-col">
          <div className="chief-arch-diagram-box">
            <div className="box-label">Auth</div>
            <div className="box-title">Google OAuth 2.0</div>
            <div className="box-detail">Gmail API (read+write)<br />Google Calendar API (read)</div>
          </div>
          <div className="chief-arch-diagram-box">
            <div className="box-label">Auth</div>
            <div className="box-title">Microsoft OAuth (Azure AD)</div>
            <div className="box-detail">Microsoft Graph API (read+write)<br />Outlook Calendar (read)</div>
          </div>
        </div>
        <div className="chief-arch-row one-col">
          <div className="chief-arch-diagram-arrow">&darr; tokens &darr;</div>
        </div>
        <div className="chief-arch-row one-col">
          <div className="chief-arch-diagram-box accent-left">
            <div className="box-label">Backend</div>
            <div className="box-title">Python / FastAPI on Railway</div>
            <div className="box-detail">API routes, briefing engine, email actions, token management, preference logic</div>
          </div>
        </div>
        <div className="chief-arch-row one-col">
          <div className="chief-arch-diagram-arrow">&darr; context package &darr;</div>
        </div>
        <div className="chief-arch-row three-col">
          <div className="chief-arch-diagram-box accent-left">
            <div className="box-label">AI</div>
            <div className="box-title">Claude API (Anthropic)</div>
            <div className="box-detail">System prompt built from user profile + preferences. Processes email + calendar context. Returns structured briefing.</div>
          </div>
          <div className="chief-arch-diagram-box">
            <div className="box-label">Database</div>
            <div className="box-title">Supabase (PostgreSQL)</div>
            <div className="box-detail">User profiles, preferences, encrypted OAuth tokens, briefing history. Row-level security per user.</div>
          </div>
          <div className="chief-arch-diagram-box">
            <div className="box-label">Scheduler</div>
            <div className="box-title">Cron on Railway</div>
            <div className="box-detail">Runs at 7am per user&apos;s timezone. Triggers briefing generation. Handles token refresh.</div>
          </div>
        </div>
      </div>

      <h3>Data flow summary</h3>
      <ol className="chief-arch-list">
        <li>User authenticates via OAuth, we store encrypted tokens</li>
        <li>Cron triggers at 7am (or user requests briefing on-demand)</li>
        <li>Backend fetches emails via Gmail API or Graph API using stored tokens</li>
        <li>Backend fetches calendar events for today</li>
        <li>Noise rules applied, matching emails marked for archive</li>
        <li>Context package (emails + calendar + profile + preferences) sent to Claude API</li>
        <li>Claude returns structured briefing</li>
        <li>Backend executes email actions (archive noise)</li>
        <li>Briefing stored in database and rendered for the user</li>
      </ol>

      {/* /data_model */}
      <hr id="data_model" className="chief-arch-hr" />
      <div className="chief-section-label">/data_model</div>
      <h2>Data model</h2>
      <p className="chief-arch-p">Everything lives in Supabase (PostgreSQL). The schema is flat and simple. We don&apos;t store raw email content, only briefing output and user configuration.</p>

      <h3>users</h3>
      <table className="chief-data-table">
        <thead>
          <tr><th>Field</th><th>Type</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td className="field-name">user_id</td><td className="field-type">uuid</td><td>Primary key, auto-generated</td></tr>
          <tr><td className="field-name">email</td><td className="field-type">text</td><td>From OAuth profile</td></tr>
          <tr><td className="field-name">name</td><td className="field-type">text</td><td>From OAuth profile</td></tr>
          <tr><td className="field-name">provider</td><td className="field-type">enum</td><td>&apos;google&apos; or &apos;microsoft&apos;</td></tr>
          <tr><td className="field-name">oauth_access_token</td><td className="field-type">text (encrypted)</td><td>AES-256 encrypted at rest</td></tr>
          <tr><td className="field-name">oauth_refresh_token</td><td className="field-type">text (encrypted)</td><td>AES-256 encrypted at rest</td></tr>
          <tr><td className="field-name">token_expires_at</td><td className="field-type">timestamp</td><td>For automatic refresh</td></tr>
          <tr><td className="field-name">timezone</td><td className="field-type">text</td><td>e.g. &apos;Europe/Dublin&apos;, for cron scheduling</td></tr>
          <tr><td className="field-name">created_at</td><td className="field-type">timestamp</td><td>Account creation</td></tr>
        </tbody>
      </table>

      <h3>profiles</h3>
      <table className="chief-data-table">
        <thead>
          <tr><th>Field</th><th>Type</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td className="field-name">user_id</td><td className="field-type">uuid (FK)</td><td>References users.user_id</td></tr>
          <tr><td className="field-name">role</td><td className="field-type">text</td><td>e.g. &apos;VP of Marketing&apos;, &apos;CEO&apos;</td></tr>
          <tr><td className="field-name">company</td><td className="field-type">text</td><td>Company name</td></tr>
          <tr><td className="field-name">team_size</td><td className="field-type">integer</td><td>Number of direct/indirect reports</td></tr>
          <tr><td className="field-name">reports_to</td><td className="field-type">text</td><td>Name/title of their boss, for context</td></tr>
        </tbody>
      </table>

      <h3>preferences</h3>
      <table className="chief-data-table">
        <thead>
          <tr><th>Field</th><th>Type</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td className="field-name">user_id</td><td className="field-type">uuid (FK)</td><td>References users.user_id</td></tr>
          <tr><td className="field-name">vip_contacts</td><td className="field-type">jsonb</td><td>Array of email addresses and/or domains to always surface</td></tr>
          <tr><td className="field-name">noise_rules</td><td className="field-type">jsonb</td><td>Array of senders/domains to auto-archive</td></tr>
          <tr><td className="field-name">flag_topics</td><td className="field-type">jsonb</td><td>Array of keywords/topics to always flag</td></tr>
          <tr><td className="field-name">updated_at</td><td className="field-type">timestamp</td><td>Last preference change</td></tr>
        </tbody>
      </table>

      <h3>briefings</h3>
      <table className="chief-data-table">
        <thead>
          <tr><th>Field</th><th>Type</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td className="field-name">briefing_id</td><td className="field-type">uuid</td><td>Primary key</td></tr>
          <tr><td className="field-name">user_id</td><td className="field-type">uuid (FK)</td><td>References users.user_id</td></tr>
          <tr><td className="field-name">date</td><td className="field-type">date</td><td>Briefing date</td></tr>
          <tr><td className="field-name">content</td><td className="field-type">jsonb</td><td>Structured briefing (priorities, meeting_prep, cleared, fyi)</td></tr>
          <tr><td className="field-name">emails_processed</td><td className="field-type">integer</td><td>How many emails were in the batch</td></tr>
          <tr><td className="field-name">emails_archived</td><td className="field-type">integer</td><td>How many were auto-archived</td></tr>
          <tr><td className="field-name">generated_at</td><td className="field-type">timestamp</td><td>When the briefing was created</td></tr>
        </tbody>
      </table>

      {/* /briefing_engine */}
      <hr id="briefing_engine" className="chief-arch-hr" />
      <div className="chief-section-label">/briefing_engine</div>
      <h2>How the briefing is generated</h2>
      <p className="chief-arch-p">This is the core of the product. A nine-step pipeline that runs once a day (or on demand) and turns a messy inbox into a structured briefing.</p>

      <ol className="chief-engine-steps">
        <li><strong>Fetch emails</strong><br />Pull the last 24 hours of emails via Gmail API (for Google users) or Microsoft Graph API (for Microsoft users). Include subject, sender, recipients, body text, timestamps, and thread context.</li>
        <li><strong>Fetch calendar</strong><br />Pull today&apos;s calendar events plus any attachments or linked documents. Include event title, attendees, time, location, and any notes or agenda items.</li>
        <li><strong>Apply noise rules</strong><br />Match incoming emails against the user&apos;s noise_rules (sender addresses, domains, keywords). Mark matching emails for archive. Keep a list of what matched and why.</li>
        <li><strong>Build context package</strong><br />Assemble everything into a single context payload: non-noise emails (full content), noise emails (just sender + subject for the &ldquo;cleared&rdquo; summary), calendar events, user profile, and preferences. This is what the AI sees.</li>
        <li><strong>Send to Claude API</strong><br />System prompt is built from the template (see /system_prompt) with the user&apos;s profile and preferences injected. The context package goes in as the user message. We use Claude&apos;s structured output to get consistent sections.</li>
        <li><strong>Parse structured briefing</strong><br />Claude returns the briefing in four sections: priorities_today, meeting_prep, cleared, and fyi. We parse this into a JSON structure for storage and rendering.</li>
        <li><strong>Execute email actions</strong><br />Archive all emails that matched noise rules. This is a real action on the user&apos;s inbox, using Gmail&apos;s modify endpoint or Graph API&apos;s move endpoint. We log every action so it can be undone.</li>
        <li><strong>Render briefing page</strong><br />The structured JSON is rendered into the branded briefing page. Priorities at the top, meeting prep next, then cleared and FYI. Clean, scannable, no fluff.</li>
        <li><strong>Store in briefing history</strong><br />Save the briefing content, email counts, and timestamp to the briefings table. The user can review yesterday&apos;s briefing or any previous one. Raw email content is discarded.</li>
      </ol>

      <h3>Token budget</h3>
      <p className="chief-arch-p">A typical executive inbox generates 50-150 emails per day. With headers, subjects, and body text, that&apos;s roughly 30,000-80,000 tokens of input. Calendar adds another 2,000-5,000. The system prompt and preferences add around 1,500. We budget 100,000 input tokens and 4,000 output tokens per briefing.</p>
      <p className="chief-arch-p">For heavy inboxes, we prioritise: VIP emails get full content, noise gets sender+subject only, and everything else gets subject + first 500 characters. This keeps us within budget without losing signal.</p>

      {/* /system_prompt */}
      <hr id="system_prompt" className="chief-arch-hr" />
      <div className="chief-section-label">/system_prompt</div>
      <h2>System prompt template</h2>
      <p className="chief-arch-p">This is the actual system prompt that Claude receives for each briefing generation. Variables are injected from the user&apos;s profile and preferences at runtime.</p>

      <div className="chief-code-block">{`You are the Chief of Staff for `}<span className="prompt-var">{'{name}'}</span>{`, `}<span className="prompt-var">{'{role}'}</span>{` at `}<span className="prompt-var">{'{company}'}</span>{`. Your job is to brief them every morning on what matters and handle the noise so they don't have to.

You have access to their emails from the last 24 hours and today's calendar.

VIP contacts (always flag, always surface): `}<span className="prompt-var">{'{vip_list}'}</span>{`
Topics to flag: `}<span className="prompt-var">{'{flag_topics}'}</span>{`
Known noise (summarise and archive): `}<span className="prompt-var">{'{noise_rules}'}</span>{`

Your briefing must include:

`}<span className="prompt-heading">1. PRIORITIES TODAY</span>{`
The 2-4 things that need their attention, ranked. For each one, explain WHY it matters and what action is needed. Spot escalation patterns (someone emailing repeatedly, cc'ing bosses).

`}<span className="prompt-heading">2. MEETING PREP</span>{`
For each meeting today, what they need to know going in. If there are attachments or linked docs, summarise the key points. Cross-reference with recent emails on the same topic.

`}<span className="prompt-heading">3. CLEARED</span>{`
What you archived and why. Summarise newsletters and internal updates in 2-3 lines total. Note anything worth knowing but not worth reading in full.

`}<span className="prompt-heading">4. FYI</span>{`
Things that don't need action today but they should be aware of. Deadlines coming up, background context, things brewing.

Be direct. Be specific. Use names. If something feels political or sensitive, say so. Don't soften bad news. Don't pad with filler. If the inbox is quiet, say so — don't manufacture urgency.`}</div>

      <h3>Prompt design notes</h3>
      <ul className="chief-arch-list">
        <li>The prompt is deliberately written in a direct, human tone. We want the briefing to read like a sharp EA wrote it, not like a chatbot.</li>
        <li>VIP list, flag topics, and noise rules are injected as structured data so Claude can pattern-match precisely.</li>
        <li>The instruction to &ldquo;spot escalation patterns&rdquo; is key, this is something a human chief of staff would naturally do but an exec scanning their inbox at 7am would miss.</li>
        <li>&ldquo;Don&apos;t manufacture urgency&rdquo; prevents the AI from padding quiet days with false importance. If there&apos;s nothing urgent, the briefing should say so and be short.</li>
      </ul>

      {/* /api_routes */}
      <hr id="api_routes" className="chief-arch-hr" />
      <div className="chief-section-label">/api_routes</div>
      <h2>Backend API endpoints</h2>
      <p className="chief-arch-p">FastAPI backend running on Railway. All routes require authentication (JWT from OAuth flow) except the auth callbacks themselves.</p>

      <h3>Authentication</h3>
      <div className="chief-api-route">
        <span className="chief-api-method post">POST</span>
        <span className="chief-api-path">/auth/google</span>
        <span className="chief-api-desc">Google OAuth callback. Exchanges auth code for tokens, creates or updates user record, returns session JWT.</span>
      </div>
      <div className="chief-api-route">
        <span className="chief-api-method post">POST</span>
        <span className="chief-api-path">/auth/microsoft</span>
        <span className="chief-api-desc">Microsoft OAuth callback. Same flow via Azure AD. Exchanges auth code for tokens, creates or updates user record.</span>
      </div>

      <h3>Briefings</h3>
      <div className="chief-api-route">
        <span className="chief-api-method get">GET</span>
        <span className="chief-api-path">/briefing</span>
        <span className="chief-api-desc">Fetch today&apos;s briefing. Returns cached version if already generated, otherwise triggers generation and returns result.</span>
      </div>
      <div className="chief-api-route">
        <span className="chief-api-method post">POST</span>
        <span className="chief-api-path">/briefing/regenerate</span>
        <span className="chief-api-desc">Force regeneration of today&apos;s briefing with current preferences. Useful after the user updates their VIP list or noise rules.</span>
      </div>

      <h3>Preferences</h3>
      <div className="chief-api-route">
        <span className="chief-api-method get">GET</span>
        <span className="chief-api-path">/preferences</span>
        <span className="chief-api-desc">Fetch the authenticated user&apos;s preferences: VIP contacts, noise rules, flag topics.</span>
      </div>
      <div className="chief-api-route">
        <span className="chief-api-method put">PUT</span>
        <span className="chief-api-path">/preferences</span>
        <span className="chief-api-desc">Update preferences. Accepts partial updates. Triggers re-evaluation of today&apos;s briefing if one exists.</span>
      </div>

      <h3>Email actions</h3>
      <div className="chief-api-route">
        <span className="chief-api-method post">POST</span>
        <span className="chief-api-path">{'/email/archive/{id}'}</span>
        <span className="chief-api-desc">Manually archive a specific email. Calls Gmail API or Graph API to move to archive.</span>
      </div>
      <div className="chief-api-route">
        <span className="chief-api-method post">POST</span>
        <span className="chief-api-path">{'/email/unarchive/{id}'}</span>
        <span className="chief-api-desc">Undo an archive action. Moves email back to inbox. Works for both auto-archived and manually archived.</span>
      </div>

      <h3>Feedback</h3>
      <div className="chief-api-route">
        <span className="chief-api-method post">POST</span>
        <span className="chief-api-path">/feedback</span>
        <span className="chief-api-desc">Submit feedback on a briefing action. &ldquo;This was wrong&rdquo; (undo + adjust rules) or &ldquo;This was right&rdquo; (reinforce). Updates noise_rules and vip_contacts accordingly.</span>
      </div>

      {/* /security */}
      <hr id="security" className="chief-arch-hr" />
      <div className="chief-section-label">/security</div>
      <h2>Security model</h2>
      <p className="chief-arch-p">We&apos;re handling executive email. The security posture needs to be tight from day one, not bolted on later.</p>

      <ul className="chief-security-list">
        <li><strong>OAuth tokens encrypted at rest.</strong> AES-256 encryption. The encryption key is stored as an environment variable, never in the database or codebase. Tokens are decrypted only in memory at the moment of API call.</li>
        <li><strong>No email content stored.</strong> Emails are fetched, processed in memory, and discarded after the briefing is generated. The only thing stored is the briefing output itself, never the raw emails.</li>
        <li><strong>Briefing text is stored.</strong> So the user can review yesterday&apos;s briefing or any previous one. But this is a summary, not the raw data. It contains names and subjects but not full email bodies.</li>
        <li><strong>HTTPS everywhere.</strong> All traffic encrypted in transit. Vercel and Railway handle TLS certificates automatically. No HTTP endpoints exposed.</li>
        <li><strong>Strict tenant isolation.</strong> Every database query is scoped to the authenticated user&apos;s user_id. Supabase row-level security (RLS) enforced at the database level, not just the application level.</li>
        <li><strong>Automatic token refresh.</strong> OAuth access tokens expire (typically 1 hour). The backend checks token_expires_at before every API call and refreshes silently using the refresh token. No user action required.</li>
        <li><strong>User-initiated revocation.</strong> The user can disconnect at any time. This deletes their OAuth tokens, profile, preferences, and briefing history. Full data deletion, not just deactivation.</li>
        <li><strong>No third-party analytics or tracking.</strong> We don&apos;t embed any third-party scripts. No Google Analytics, no Segment, no Hotjar. If we add analytics later, it&apos;ll be first-party and privacy-respecting.</li>
      </ul>

      {/* /deployment */}
      <hr id="deployment" className="chief-arch-hr" />
      <div className="chief-section-label">/deployment</div>
      <h2>Deployment stack</h2>
      <p className="chief-arch-p">All managed services. Nothing self-hosted. The goal is zero infrastructure maintenance so we can focus entirely on the product.</p>

      <div className="chief-deploy-grid">
        <div className="chief-deploy-item"><div className="chief-deploy-label">Frontend</div><div className="chief-deploy-value">Vercel</div></div>
        <div className="chief-deploy-item"><div className="chief-deploy-label">Backend + Cron</div><div className="chief-deploy-value">Railway</div></div>
        <div className="chief-deploy-item"><div className="chief-deploy-label">Database</div><div className="chief-deploy-value">Supabase</div></div>
        <div className="chief-deploy-item"><div className="chief-deploy-label">AI</div><div className="chief-deploy-value">Claude API (Anthropic)</div></div>
        <div className="chief-deploy-item"><div className="chief-deploy-label">Domain</div><div className="chief-deploy-value">chiefofstaff.runwithfoxes.com</div></div>
        <div className="chief-deploy-item"><div className="chief-deploy-label">SSL</div><div className="chief-deploy-value">Automatic (Vercel + Railway)</div></div>
        <div className="chief-deploy-item"><div className="chief-deploy-label">Backend language</div><div className="chief-deploy-value">Python / FastAPI</div></div>
        <div className="chief-deploy-item"><div className="chief-deploy-label">Monitoring</div><div className="chief-deploy-value">Health checks + error logging</div></div>
      </div>

      <h3>Environment variables</h3>
      <table className="chief-data-table">
        <thead>
          <tr><th>Variable</th><th>Service</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td className="field-name">GOOGLE_CLIENT_ID</td><td>Railway</td><td>Google OAuth app credentials</td></tr>
          <tr><td className="field-name">GOOGLE_CLIENT_SECRET</td><td>Railway</td><td>Google OAuth app credentials</td></tr>
          <tr><td className="field-name">MICROSOFT_CLIENT_ID</td><td>Railway</td><td>Azure AD app credentials</td></tr>
          <tr><td className="field-name">MICROSOFT_CLIENT_SECRET</td><td>Railway</td><td>Azure AD app credentials</td></tr>
          <tr><td className="field-name">ANTHROPIC_API_KEY</td><td>Railway</td><td>Claude API access</td></tr>
          <tr><td className="field-name">SUPABASE_URL</td><td>Railway</td><td>Database connection</td></tr>
          <tr><td className="field-name">SUPABASE_SERVICE_KEY</td><td>Railway</td><td>Service role key (bypasses RLS for cron)</td></tr>
          <tr><td className="field-name">ENCRYPTION_KEY</td><td>Railway</td><td>AES-256 key for token encryption</td></tr>
          <tr><td className="field-name">JWT_SECRET</td><td>Railway</td><td>Session token signing</td></tr>
        </tbody>
      </table>

      {/* /deliverables */}
      <hr id="deliverables" className="chief-arch-hr" />
      <div className="chief-section-label">/deliverables</div>
      <h2>Build checklist</h2>
      <p className="chief-arch-p">In order of priority. Each deliverable builds on the previous one. The goal is to have a working demo as early as possible, then layer on polish and features.</p>

      <ul className="chief-build-checklist">
        <li>
          <span className="chief-check-num">01</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Database schema + Supabase setup</div>
            <div className="chief-check-desc">Create the four tables (users, profiles, preferences, briefings). Configure row-level security policies. Set up encryption for token columns. Test with dummy data.</div>
          </div>
          <span className="chief-check-phase">Foundation</span>
        </li>
        <li>
          <span className="chief-check-num">02</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Google OAuth flow + Gmail/Calendar API integration</div>
            <div className="chief-check-desc">Implement the full OAuth dance: consent screen, token exchange, token storage, token refresh. Test fetching emails and calendar events from a real Gmail account. Start with Google because it&apos;s the most common.</div>
          </div>
          <span className="chief-check-phase">Foundation</span>
        </li>
        <li>
          <span className="chief-check-num">03</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Briefing engine (Claude API integration)</div>
            <div className="chief-check-desc">Build the nine-step pipeline. System prompt template with variable injection. Context package assembly. Claude API call with structured output parsing. This is the core of the product.</div>
          </div>
          <span className="chief-check-phase">Core</span>
        </li>
        <li>
          <span className="chief-check-num">04</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Briefing page (HTML, branded)</div>
            <div className="chief-check-desc">Render the structured briefing as a clean, scannable page. Four sections: priorities, meeting prep, cleared, FYI. Run with Foxes brand treatment. This is what the exec sees every morning.</div>
          </div>
          <span className="chief-check-phase">Core</span>
        </li>
        <li>
          <span className="chief-check-num">05</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Preferences page</div>
            <div className="chief-check-desc">UI for managing VIP contacts, noise rules, and flag topics. Simple form-based interface. Changes take effect on the next briefing (or trigger regeneration of today&apos;s).</div>
          </div>
          <span className="chief-check-phase">Core</span>
        </li>
        <li>
          <span className="chief-check-num">06</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Email actions (archive/unarchive)</div>
            <div className="chief-check-desc">Implement the archive and unarchive endpoints. Undo functionality for auto-archived emails. Feedback loop: &ldquo;this wasn&apos;t noise&rdquo; updates the user&apos;s noise rules.</div>
          </div>
          <span className="chief-check-phase">Polish</span>
        </li>
        <li>
          <span className="chief-check-num">07</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Morning cron scheduler</div>
            <div className="chief-check-desc">Set up Railway cron to trigger briefing generation at 7am per user&apos;s timezone. Handle timezone grouping efficiently. Add retry logic for failed generations. Basic monitoring and alerting.</div>
          </div>
          <span className="chief-check-phase">Polish</span>
        </li>
        <li>
          <span className="chief-check-num">08</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Microsoft OAuth + Graph API</div>
            <div className="chief-check-desc">Add Microsoft as a second provider. Azure AD OAuth flow, Graph API for email and calendar. Same briefing engine, different data source. Expands the addressable market significantly.</div>
          </div>
          <span className="chief-check-phase">Expand</span>
        </li>
        <li>
          <span className="chief-check-num">09</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Deploy to production</div>
            <div className="chief-check-desc">Vercel for frontend, Railway for backend and cron. Configure chiefofstaff.runwithfoxes.com. SSL certificates. Environment variables. Health checks. Error logging. Smoke test the full flow end-to-end.</div>
          </div>
          <span className="chief-check-phase">Launch</span>
        </li>
        <li>
          <span className="chief-check-num">10</span>
          <div className="chief-check-content">
            <div className="chief-check-title">Demo script for the training session</div>
            <div className="chief-check-desc">Write a walkthrough script that shows the product working end-to-end with a real account. Cover sign-in, first briefing, preference changes, regeneration, and feedback. Make it compelling for a live audience.</div>
          </div>
          <span className="chief-check-phase">Launch</span>
        </li>
      </ul>

      <div className="chief-bottom-bar">
        <p>Chief of Staff — Run with Foxes — Product Architecture — 2026</p>
      </div>
    </>
  );
}
