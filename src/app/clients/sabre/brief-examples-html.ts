/* Worked examples (one-pager + the document it becomes) rendered INLINE in the
   page, not in an iframe. Every selector is scoped under .bx-root so nothing
   leaks into the rest of the client workspace. Bundled as a string (not read
   from /public) so it ships with the serverless function on Vercel.

   This pair is built to be faithful to April Dunford's method, not a template
   wearing her name: positioning is done once and CITED here (not re-derived per
   campaign), the second document LEADS WITH THE INSIGHT, and the audience is a
   best-fit segment plus a named champion, not an invented persona. */
export const briefExamplesHtml = `
<style>
  .bx-root {
    --bx-terra: #E2553C; --bx-darkred: #741C1C; --bx-ink: #1a1a1a;
    --bx-paper: #F3EFE4; --bx-muted: #6b6b6b; --bx-line: #d8d2c4; --bx-linedark: #1a1a1a;
    background: var(--bx-paper); color: var(--bx-ink);
    font-family: "APK Galeria", -apple-system, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased; padding: 32px 26px 36px; border: 1px solid var(--bx-line);
  }
  .bx-root *, .bx-root *::before, .bx-root *::after { box-sizing: border-box; }
  .bx-root .bx-inner { max-width: 860px; margin: 0 auto; }
  .bx-root .eyebrow { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--bx-terra); font-weight: 700; margin: 0 0 8px; }
  .bx-root h1.top { font-size: 25px; line-height: 1.18; margin: 0 0 12px; font-weight: 800; max-width: 720px; }
  .bx-root .intro { font-size: 14.5px; line-height: 1.65; color: var(--bx-muted); max-width: 730px; margin: 0 0 10px; }
  .bx-root .intro b { color: var(--bx-ink); font-weight: 700; }
  .bx-root .illus { font-size: 12px; color: var(--bx-muted); margin: 14px 0 0; padding: 10px 14px; border: 1px solid var(--bx-line); background: #fff; }
  .bx-root .illus b { color: var(--bx-ink); }

  .bx-root .doc { border: 1px solid var(--bx-linedark); background: #fff; margin: 28px 0 0; }
  .bx-root .doc-head { border-bottom: 1px solid var(--bx-linedark); padding: 14px 22px; display: flex; align-items: center; gap: 12px; }
  .bx-root .doc-num { width: 34px; height: 34px; flex: 0 0 34px; display: inline-flex; align-items: center; justify-content: center; background: var(--bx-ink); color: #fff; font-size: 17px; font-weight: 800; }
  .bx-root .doc-titles .k { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--bx-terra); font-weight: 700; }
  .bx-root .doc-titles .t { font-size: 18px; font-weight: 800; line-height: 1.2; }
  .bx-root .doc-meta { padding: 9px 22px; border-bottom: 1px solid var(--bx-line); font-size: 11.5px; color: var(--bx-muted); letter-spacing: .3px; }
  .bx-root .doc-note { padding: 12px 22px; border-bottom: 1px solid var(--bx-line); background: var(--bx-paper); font-size: 12.5px; line-height: 1.55; color: var(--bx-ink); }
  .bx-root .doc-note b { color: var(--bx-darkred); }
  .bx-root .doc-body { padding: 6px 22px 22px; }

  .bx-root .field { padding: 14px 0; border-bottom: 1px solid var(--bx-line); }
  .bx-root .field:last-child { border-bottom: none; }
  .bx-root .field .fl { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--bx-ink); font-weight: 800; margin: 0 0 6px; }
  .bx-root .field .fl span { color: var(--bx-muted); font-weight: 600; text-transform: none; letter-spacing: 0; }
  .bx-root .field p { font-size: 13.5px; line-height: 1.6; margin: 0; color: var(--bx-ink); }
  .bx-root .field p + p { margin-top: 8px; }
  .bx-root ul.b { margin: 0; padding: 0; list-style: none; }
  .bx-root ul.b li { font-size: 13px; line-height: 1.55; padding-left: 16px; position: relative; margin-bottom: 4px; }
  .bx-root ul.b li::before { content: "\\25C6"; color: var(--bx-terra); position: absolute; left: 0; font-size: 8px; top: 5px; }
  .bx-root ul.b li b { color: var(--bx-ink); }
  .bx-root .ph { color: var(--bx-terra); }
  .bx-root .northstar { background: var(--bx-paper); border-left: 3px solid var(--bx-terra); padding: 12px 16px; font-size: 14.5px; font-weight: 700; line-height: 1.5; }
  .bx-root .insight { background: var(--bx-paper); border-left: 3px solid var(--bx-darkred); padding: 13px 16px; font-size: 14.5px; line-height: 1.55; font-weight: 600; }
  .bx-root .fnote { font-size: 12px; line-height: 1.5; color: var(--bx-muted); margin-top: 9px; }
  .bx-root .fnote b { color: var(--bx-ink); font-weight: 700; }
  .bx-root .chk { font-size: 12px; line-height: 1.5; color: var(--bx-ink); margin-top: 10px; padding: 9px 12px; border: 1px dashed var(--bx-terra); background: rgba(226,85,60,0.05); }
  .bx-root .chk b { color: var(--bx-terra); text-transform: uppercase; letter-spacing: .5px; font-size: 10.5px; }
  .bx-root .tag { display: inline-block; font-size: 9.5px; letter-spacing: 1px; text-transform: uppercase; background: var(--bx-paper); border: 1px solid var(--bx-line); color: var(--bx-muted); padding: 2px 8px; font-weight: 700; vertical-align: middle; margin-left: 6px; }
  .bx-root ol.steps { margin: 4px 0 0; padding: 0 0 0 2px; list-style: none; counter-reset: s; }
  .bx-root ol.steps li { font-size: 13px; line-height: 1.55; padding: 0 0 7px 26px; position: relative; counter-increment: s; }
  .bx-root ol.steps li::before { content: counter(s); position: absolute; left: 0; top: 0; width: 18px; height: 18px; background: var(--bx-ink); color: #fff; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }
  .bx-root ol.steps li b { color: var(--bx-darkred); }

  .bx-root table.msg { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .bx-root table.msg th { text-align: left; font-size: 10px; letter-spacing: .8px; text-transform: uppercase; color: var(--bx-muted); padding: 6px 10px; border-bottom: 1px solid var(--bx-linedark); }
  .bx-root table.msg td { font-size: 12.5px; line-height: 1.5; padding: 9px 10px; border-bottom: 1px solid var(--bx-line); vertical-align: top; }
  .bx-root table.msg td.pill { font-weight: 800; white-space: nowrap; color: var(--bx-darkred); }
  .bx-root table.msg td .src { color: var(--bx-terra); font-size: 11.5px; }

  .bx-root .becomes { display: flex; flex-direction: column; align-items: center; margin: 0; padding: 22px 0 0; }
  .bx-root .becomes .chip { background: var(--bx-ink); color: #fff; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; padding: 5px 14px; font-weight: 700; }
  .bx-root .becomes .tip { color: var(--bx-terra); font-size: 20px; line-height: .8; margin-top: 2px; }

  .bx-root .ask { border: 2px solid var(--bx-terra); background: rgba(226,85,60,0.05); padding: 0; margin: 40px 0 0; position: relative; }
  .bx-root .ask-tab { position: absolute; top: -12px; left: 20px; background: var(--bx-terra); color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 4px 14px; }
  .bx-root .ask-body { padding: 26px 22px 22px; }
  .bx-root .ask-body h2 { font-size: 18px; font-weight: 800; margin: 0 0 8px; }
  .bx-root .ask-body p { font-size: 14px; line-height: 1.6; color: var(--bx-ink); margin: 0 0 14px; max-width: 700px; }
  .bx-root .ask-q { font-size: 14px; line-height: 1.55; padding-left: 22px; position: relative; margin-bottom: 10px; font-weight: 600; }
  .bx-root .ask-q::before { content: "\\25C6"; color: var(--bx-terra); position: absolute; left: 0; top: 3px; font-size: 10px; }
  .bx-root .ask-q span { font-weight: 400; color: var(--bx-muted); }

  @media (max-width: 640px) {
    .bx-root .doc-head { flex-wrap: wrap; }
    .bx-root table.msg, .bx-root table.msg tbody, .bx-root table.msg tr, .bx-root table.msg td { display: block; width: 100%; }
    .bx-root table.msg thead { display: none; }
    .bx-root table.msg td { border-bottom: none; padding: 2px 0; }
    .bx-root table.msg tr { border-bottom: 1px solid var(--bx-line); padding: 8px 0; }
  }
</style>
<div class="bx-root"><div class="bx-inner">
  <p class="eyebrow">Sabre briefing system &middot; worked examples</p>
  <h1 class="top">A one-pager, and what good looks like after it</h1>
  <p class="intro">To build the brief coach we first need to agree what good looks like at Sabre: the owner&rsquo;s ask, and the craft that answers it. Here is a stab at both, for the same imaginary campaign.</p>
  <p class="intro">One idea shapes the whole second document. <b>April Dunford does not have a &ldquo;brief&rdquo;.</b> She has positioning, done once for the product, and a messaging document that everything else draws from. So the second document below does not re-do positioning. It names the one <b>insight</b> the campaign rests on, points to the positioning that already exists, and pulls its messages and proof from that source of truth.</p>
  <p class="illus"><b>Illustrative only.</b> This is an example campaign we invented to show the shape, not real Sabre material. The bracketed bits in terracotta are gaps a writer would fill or verify before anything ships.</p>

  <div class="doc">
    <div class="doc-head">
      <span class="doc-num">1</span>
      <div class="doc-titles">
        <div class="k">Station 1 &middot; The owner&rsquo;s ask</div>
        <div class="t">High-level one-pager</div>
      </div>
    </div>
    <div class="doc-meta">Owner: VP, Airline Retailing &nbsp;&middot;&nbsp; Campaign: Modular retailing, &ldquo;Built to open&rdquo; &nbsp;&middot;&nbsp; For: Product Marketing</div>
    <div class="doc-body">
      <div class="field">
        <p class="fl">The ask <span>in a line</span></p>
        <p>Sabre&rsquo;s retailing platform is modular. Airlines adopt what they need, when they need it, without ripping out what already runs. We want a campaign that lands this against the all-or-nothing monolith incumbents.</p>
      </div>
      <div class="field">
        <p class="fl">Who we want to reach <span>at altitude</span></p>
        <p>Airline commercial and retailing leaders (VP Retailing, Head of Offer &amp; Order, Chief Commercial) at mid-to-large carriers weighing offer-and-order transformation. Their IT and architecture leads sit alongside them and carry the fear of risk and lock-in.</p>
      </div>
      <div class="field">
        <p class="fl">What the campaign includes</p>
        <ul class="b">
          <li>Hero thought-leadership piece</li>
          <li>Webinar with a launch customer</li>
          <li>Three-part email sequence</li>
          <li>Paid social and display (the OPEN / PLATFORM ad routes)</li>
          <li>One sales-enablement sheet, all hung off a single proof point</li>
        </ul>
      </div>
      <div class="field">
        <p class="fl">What success looks like <span>numbers to set</span></p>
        <ul class="b">
          <li><span class="ph">[XX]</span> qualified airline conversations into pipeline</li>
          <li><span class="ph">[XX]</span> webinar registrations, <span class="ph">[XX]%</span> from target carriers</li>
          <li>Influence <span class="ph">[&euro;X]m</span> of retailing pipeline this half</li>
        </ul>
      </div>
      <div class="field">
        <p class="fl">Timeline</p>
        <p>Built around an industry moment, live ahead of <span class="ph">[IATA / airline retailing event, date]</span>. Roughly a <span class="ph">[6 to 8 week]</span> runway from brief to launch.</p>
      </div>
      <div class="field">
        <p class="fl">Translations</p>
        <p>English core. Localise the email and landing copy for <span class="ph">[LATAM and APAC]</span> if we target carriers there. Ad creative stays English.</p>
      </div>
      <div class="field">
        <p class="fl">Amplification</p>
        <p>Owned (Sabre channels plus sales outreach to named accounts), paid (LinkedIn to airline commercial titles), earned (PR around the customer story), partner and ambassador push at the event.</p>
      </div>
    </div>
  </div>

  <div class="becomes">
    <span class="chip">Product Marketing turns it into &darr;</span>
    <span class="tip">&#9660;</span>
  </div>

  <div class="doc">
    <div class="doc-head">
      <span class="doc-num">2</span>
      <div class="doc-titles">
        <div class="k">Station 2 &middot; The marketing craft</div>
        <div class="t">The campaign brief</div>
      </div>
    </div>
    <div class="doc-meta">Owner: Product Marketing &nbsp;&middot;&nbsp; Built from Sabre&rsquo;s existing retailing positioning &nbsp;&middot;&nbsp; For: Campaign Manager</div>
    <div class="doc-note">This is not a fresh positioning exercise. Dunford&rsquo;s method is to do positioning <b>once</b>, then pull from it. So this document leads with the <b>insight</b>, cites the positioning that already exists, and names a best-fit audience and a champion rather than inventing a persona.</div>
    <div class="doc-body">
      <div class="field">
        <p class="fl">1. The insight <span>what only we can say, and why this campaign opens here</span></p>
        <p class="insight">The market believes retailing transformation means a multi-year platform replacement, and that the risk to manage is the technology. The real failure point is the cutover: the day the switch flips and bookings stop. Modular adoption removes that day. You modernise component by component, alongside what already runs.</p>
        <p class="fnote"><b>Why this leads.</b> Every vendor claims to modernise airline retailing, and they all read the same market. The one thing the monolith model cannot offer is a path without the cutover. That is ours, so the campaign opens on it, not on the problem.</p>
      </div>
      <div class="field">
        <p class="fl">2. Who it&rsquo;s for <span>a best-fit segment and a champion, not a persona</span></p>
        <ul class="b">
          <li><b>Best-fit segment (who cares most):</b> mid-to-large carriers already mid-transformation who cannot afford a system freeze. Recognise them by a stalled or daunting platform programme, board pressure to show progress this year, and a stack they cannot simply rip out.</li>
          <li><b>The champion (who we position to):</b> the commercial owner, VP Retailing or Head of Offer &amp; Order, who carries both the revenue number and the risk.</li>
          <li><b>The blocker (who we answer, not position to):</b> the architecture or IT lead who has been burned by lock-in. Handle the objection (open APIs, their data, no lock-in); do not build the story around them.</li>
        </ul>
        <p class="fnote">Defined by what they value and their situation, not an invented backstory. Dunford keeps one persona, the champion; everyone else gets objection-handling.</p>
      </div>
      <div class="field">
        <p class="fl">3. Positioning <span>the foundation we draw on</span> <span class="tag">Already exists</span></p>
        <ul class="b">
          <li><b>Competitive alternatives:</b> rip-and-replace monolith platforms; staying on legacy with bolt-ons; building in-house; doing nothing for now.</li>
          <li><b>Unique attributes:</b> adopted module by module; runs alongside the existing stack; open APIs; no big-bang cutover.</li>
          <li><b>Value those enable:</b> transformation without the big-bang risk; each module earns its own revenue; keep what already works; control the pace.</li>
          <li><b>Customers who care most:</b> mid-to-large carriers mid-transformation who cannot afford a freeze.</li>
          <li><b>Category / frame of reference:</b> modular airline retailing, set against the monolith.</li>
        </ul>
        <p class="chk"><b>Contrarian check &middot; the coach&rsquo;s job.</b> &ldquo;Open APIs&rdquo; is close to table stakes, a competitor can claim it too, so we do not lead on it. &ldquo;No cutover day&rdquo; is the one a monolith cannot honestly claim. That is the line the campaign defends.</p>
      </div>
      <div class="field">
        <p class="fl">4. The messaging it carries <span>drawn from the positioning above</span></p>
        <p class="northstar">North star: Built to open. Modernise your retailing one module at a time, without betting the airline.</p>
        <table class="msg">
          <thead><tr><th>Pillar</th><th>The message</th><th>Proof (to source / verify)</th></tr></thead>
          <tbody>
            <tr>
              <td class="pill">No cutover day</td>
              <td>Adopt module by module, alongside what you already run. No freeze, no switch-flip.</td>
              <td><span class="src">[Named carrier live module-by-module, no freeze: to verify]</span></td>
            </tr>
            <tr>
              <td class="pill">Revenue sooner</td>
              <td>Each module stands on its own, so value lands in months, not years.</td>
              <td><span class="src">[Time-to-value from a real deployment: to source]</span></td>
            </tr>
            <tr>
              <td class="pill">Open, not locked in</td>
              <td>Open APIs, your data, your pace. No vendor lock-in.</td>
              <td><span class="src">[IATA Offer &amp; Order / NDC alignment: to confirm]</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="field">
        <p class="fl">5. How the story runs <span>Dunford&rsquo;s sales-pitch shape, the same in every asset</span></p>
        <ol class="steps">
          <li><b>The insight.</b> Open on the point of view above, not the product.</li>
          <li><b>The honest alternatives.</b> Monolith rebuild, legacy bolt-ons, build in-house, wait. What each costs you.</li>
          <li><b>What to look for in any path.</b> Progress this year, no freeze, no lock-in, revenue at each step.</li>
          <li><b>How Sabre meets each one</b> better than the alternatives do.</li>
          <li><b>The proof.</b> The named customer, the metric, the third-party validation.</li>
        </ol>
        <p class="fnote">Same order in the hero piece, the webinar and the emails. It opens on the point of view, then earns the product.</p>
      </div>
      <div class="field">
        <p class="fl">6. Register / tone</p>
        <p>Peer-to-peer, calm, expert. We are de-risking a hard decision, not hyping a product. No big-bang language ourselves. Sabre&rsquo;s own lexicon fits: &ldquo;no big-bang risk, no vendor lock-in,&rdquo; &ldquo;built to open.&rdquo;</p>
      </div>
      <div class="field">
        <p class="fl">7. The outcome it answers to <span>a number, not &ldquo;more pipeline&rdquo;</span></p>
        <ul class="b">
          <li>Commercial north star: influence <span class="ph">[&euro;X]m</span> of retailing pipeline this half.</li>
          <li><span class="ph">[XX]</span> qualified airline conversations; <span class="ph">[XX]</span> webinar registrations, <span class="ph">[XX]%</span> from target carriers.</li>
        </ul>
        <p class="fnote">Every proof point needs evidence, and every brief needs a real number. Both are bracketed here because this is illustrative.</p>
      </div>
    </div>
  </div>

  <div class="ask">
    <span class="ask-tab">Over to you, Darren</span>
    <div class="ask-body">
      <h2>Is this the shape?</h2>
      <p>This is the Dunford-faithful version. It leads with the insight, treats positioning as something done once and drawn from, and names a best-fit segment and a champion instead of an invented persona. Two questions.</p>
      <p class="ask-q">Does this fit how Sabre works? <span>Is positioning genuinely settled upstream for Airlines and Mosaic, so a campaign can pull from it rather than redo it each time?</span></p>
      <p class="ask-q">Are we right to drop the persona story? <span>A best-fit segment plus a named champion, the way Dunford does it. Or does your team genuinely need the persona?</span></p>
      <p style="font-size:13px;color:#6b6b6b;margin:16px 0 0;max-width:700px;">Mark it up however suits. A yes-this-is-typical or a no-here-is-what-real-looks-like both move us forward.</p>
    </div>
  </div>
</div></div>
`;
