/* Worked examples (one-pager + brief) rendered INLINE in the page, not in an
   iframe. Every selector is scoped under .bx-root so nothing leaks into the
   rest of the client workspace. Bundled as a string (not read from /public) so
   it ships with the serverless function on Vercel. */
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
  .bx-root .intro { font-size: 14.5px; line-height: 1.65; color: var(--bx-muted); max-width: 720px; margin: 0 0 6px; }
  .bx-root .intro b { color: var(--bx-ink); font-weight: 700; }
  .bx-root .illus { font-size: 12px; color: var(--bx-muted); margin: 14px 0 0; padding: 10px 14px; border: 1px solid var(--bx-line); background: #fff; }
  .bx-root .illus b { color: var(--bx-ink); }

  .bx-root .doc { border: 1px solid var(--bx-linedark); background: #fff; margin: 28px 0 0; }
  .bx-root .doc-head { border-bottom: 1px solid var(--bx-linedark); padding: 14px 22px; display: flex; align-items: center; gap: 12px; }
  .bx-root .doc-num { width: 34px; height: 34px; flex: 0 0 34px; display: inline-flex; align-items: center; justify-content: center; background: var(--bx-ink); color: #fff; font-size: 17px; font-weight: 800; }
  .bx-root .doc-titles .k { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--bx-terra); font-weight: 700; }
  .bx-root .doc-titles .t { font-size: 18px; font-weight: 800; line-height: 1.2; }
  .bx-root .doc-meta { padding: 9px 22px; border-bottom: 1px solid var(--bx-line); font-size: 11.5px; color: var(--bx-muted); letter-spacing: .3px; }
  .bx-root .doc-body { padding: 6px 22px 22px; }

  .bx-root .field { padding: 14px 0; border-bottom: 1px solid var(--bx-line); }
  .bx-root .field:last-child { border-bottom: none; }
  .bx-root .field .fl { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--bx-ink); font-weight: 800; margin: 0 0 6px; }
  .bx-root .field .fl span { color: var(--bx-muted); font-weight: 600; text-transform: none; letter-spacing: 0; }
  .bx-root .field p { font-size: 13.5px; line-height: 1.6; margin: 0; color: var(--bx-ink); }
  .bx-root ul.b { margin: 0; padding: 0; list-style: none; }
  .bx-root ul.b li { font-size: 13px; line-height: 1.55; padding-left: 16px; position: relative; margin-bottom: 2px; }
  .bx-root ul.b li::before { content: "\\25C6"; color: var(--bx-terra); position: absolute; left: 0; font-size: 8px; top: 5px; }
  .bx-root .ph { color: var(--bx-terra); }
  .bx-root .northstar { background: var(--bx-paper); border-left: 3px solid var(--bx-terra); padding: 12px 16px; font-size: 15px; font-weight: 700; line-height: 1.45; }

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
  <p class="eyebrow">Sabre briefing system &mdash; worked examples</p>
  <h1 class="top">A one-pager, and the brief it becomes</h1>
  <p class="intro">To build the brief coach, we first need to agree what a good one-pager and a good brief actually look like at Sabre. So we have taken a stab at both, for the same imaginary campaign, to put something concrete in front of you. <b>The one-pager is the owner's ask. The brief is the marketing craft that answers it.</b> Same campaign, two different altitudes.</p>
  <p class="illus"><b>Illustrative only.</b> This is an example campaign we invented to show the shape, not real Sabre material. The bracketed bits in terracotta are gaps a writer would fill or verify before anything ships.</p>

  <div class="doc">
    <div class="doc-head">
      <span class="doc-num">1</span>
      <div class="doc-titles">
        <div class="k">Station 1 &middot; The owner's ask</div>
        <div class="t">High-level one-pager</div>
      </div>
    </div>
    <div class="doc-meta">Owner: VP, Airline Retailing &nbsp;&middot;&nbsp; Campaign: Modular retailing, &ldquo;Built to open&rdquo; &nbsp;&middot;&nbsp; For: Product Marketing</div>
    <div class="doc-body">
      <div class="field">
        <p class="fl">Core positioning <span>&mdash; the angle, one line</span></p>
        <p>Sabre&rsquo;s retailing platform is modular: airlines adopt what they need, when they need it, without ripping out what they already run. Built to open, not a big-bang rebuild, against the all-or-nothing monolith incumbents.</p>
      </div>
      <div class="field">
        <p class="fl">Target audience <span>&mdash; who, at altitude</span></p>
        <p>Airline commercial and retailing leaders (VP Retailing, Head of Offer &amp; Order, Chief Commercial) at mid-to-large carriers weighing offer-and-order transformation. Secondary: their IT and architecture leads, who carry the fear of big-bang risk and vendor lock-in.</p>
      </div>
      <div class="field">
        <p class="fl">Key elements <span>&mdash; what the campaign includes</span></p>
        <ul class="b">
          <li>Hero thought-leadership piece</li>
          <li>Webinar with a launch customer</li>
          <li>Three-part email sequence</li>
          <li>Paid social and display (the OPEN / PLATFORM ad routes)</li>
          <li>One sales-enablement sheet, all hung off a single proof point</li>
        </ul>
      </div>
      <div class="field">
        <p class="fl">Desired outcomes <span>&mdash; success, with targets</span></p>
        <ul class="b">
          <li><span class="ph">[XX]</span> qualified airline conversations into pipeline</li>
          <li><span class="ph">[XX]</span> webinar registrations, <span class="ph">[XX]%</span> from target carriers</li>
          <li>Influence <span class="ph">[&euro;X]m</span> of retailing pipeline this half</li>
        </ul>
      </div>
      <div class="field">
        <p class="fl">Timeline</p>
        <p>Built around an industry moment, live ahead of <span class="ph">[IATA / airline retailing event, date]</span>. Roughly a <span class="ph">[6&ndash;8 week]</span> runway from brief to launch.</p>
      </div>
      <div class="field">
        <p class="fl">Translations</p>
        <p>English core. Localise the email and landing copy for <span class="ph">[LATAM and APAC]</span> if we target carriers there. Ad creative stays English.</p>
      </div>
      <div class="field">
        <p class="fl">Amplification strategy</p>
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
        <div class="t">The brief</div>
      </div>
    </div>
    <div class="doc-meta">Owner: Product Marketing &nbsp;&middot;&nbsp; Reviewed against April Dunford positioning &nbsp;&middot;&nbsp; For: Campaign Manager</div>
    <div class="doc-body">
      <div class="field">
        <p class="fl">1. Persona story <span>&mdash; who we&rsquo;re really talking to</span></p>
        <p>Maya, VP of Retailing at a mid-size carrier. She owns ancillary and offer revenue and she is under board pressure to modernise. She has seen a multi-year platform rebuild stall at another airline and she will not bet the airline on a freeze-and-replace. Her quiet fear is not the technology, it is the cutover: the day the new system goes live and bookings stop. She wants to show progress this year, not in three. The person who can block her is her own architecture lead, who has been burned by vendor lock-in before.</p>
      </div>
      <div class="field">
        <p class="fl">2. Positioning <span>&mdash; Dunford frame, so every line is defensible</span></p>
        <ul class="b">
          <li><b>Competitive alternatives:</b> rip-and-replace monolith platforms; staying on legacy PSS with bolt-ons; building in-house.</li>
          <li><b>Unique attributes:</b> modular architecture adopted component by component; runs alongside the existing stack; open APIs; no big-bang cutover.</li>
          <li><b>Value those enable:</b> transformation without the big-bang risk; each module earns revenue on its own; keep what already works; the airline controls the pace.</li>
          <li><b>Customers who care most:</b> mid-to-large carriers mid-transformation who cannot afford a system freeze.</li>
          <li><b>Category / frame of reference:</b> modern airline retailing (offer and order), framed as modular, not monolith.</li>
        </ul>
      </div>
      <div class="field">
        <p class="fl">3. Messaging framework</p>
        <p class="northstar">North star: Built to open. Modernise your retailing one module at a time, without betting the airline.</p>
        <table class="msg">
          <thead><tr><th>Pillar</th><th>The message</th><th>Proof (to source / verify)</th></tr></thead>
          <tbody>
            <tr>
              <td class="pill">No big-bang risk</td>
              <td>Adopt module by module, running alongside what you already have. No cutover day.</td>
              <td><span class="src">[Named carrier went live module-by-module, no freeze &mdash; verify]</span></td>
            </tr>
            <tr>
              <td class="pill">Revenue sooner</td>
              <td>Each module stands on its own, so value lands in months, not years.</td>
              <td><span class="src">[Time-to-value figure &mdash; verify against a real deployment]</span></td>
            </tr>
            <tr>
              <td class="pill">Open by design</td>
              <td>Open APIs, your data, built to standards. No lock-in.</td>
              <td><span class="src">[IATA Offer &amp; Order / NDC alignment &mdash; confirm exact standards]</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="field">
        <p class="fl">4. Proof points grounded in data <span>&mdash; the spine of credibility</span></p>
        <ul class="b">
          <li>One named launch customer with a real module-by-module story. <span class="ph">[Owner to confirm who is referenceable.]</span></li>
          <li>One hard adoption or revenue metric from that deployment. <span class="ph">[Source from the account team.]</span></li>
          <li>One piece of third-party validation, analyst note or standards body. <span class="ph">[Verify before use.]</span></li>
        </ul>
      </div>
      <div class="field">
        <p class="fl">5. Register / tone</p>
        <p>Peer-to-peer, calm, expert. We are de-risking a scary decision, not hyping a product. No big-bang language ourselves. Sabre&rsquo;s own lexicon fits: &ldquo;no big-bang risk, no vendor lock-in,&rdquo; &ldquo;built to open.&rdquo;</p>
      </div>
    </div>
  </div>

  <div class="ask">
    <span class="ask-tab">Over to you, Darren</span>
    <div class="ask-body">
      <h2>Is this right?</h2>
      <p>Before we build the coach, we want to know we have the shape of these two documents right for how Sabre actually works. Two questions:</p>
      <p class="ask-q">Are these the right fields, and the right altitude for each? <span>Does the one-pager sit where your owners would start, and the brief where Product Marketing would take it?</span></p>
      <p class="ask-q">What is missing, or not typical at Sabre? <span>Anything we have included that you would not, or left out that you always need.</span></p>
      <p style="font-size:13px;color:#6b6b6b;margin:16px 0 0;max-width:700px;">Mark it up however suits. A yes-this-is-typical or a no-here-is-what-real-looks-like both move us forward.</p>
    </div>
  </div>
</div></div>
`;
