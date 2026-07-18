/* eslint-disable */
// PORTED VERBATIM from lifecycle-agent/training-page/course-home-v2.html @ 89ea41e.
//
// The body below is the page's own script, unchanged except for four asset paths.
// It is NOT idiomatic React and deliberately so: the drag, the connector docking
// maths and the card animations carry values MEASURED against real renders rather
// than chosen. Rewriting them as React state would silently change them. The
// comments inside say which numbers were measured and why - read them before
// tidying anything. See COURSE-BRIEF.md section 3.
//
// The only additions are this wrapper and the cleanup at the bottom. Timers are
// captured by SHADOWING setTimeout/setInterval with local consts, so the script
// body needs no edits at all to become cleanable.

export function initCourseBoard() {
  const _intervals = [], _timeouts = [];
  const setInterval = (...a) => { const id = window.setInterval(...a); _intervals.push(id); return id; };
  const setTimeout  = (...a) => { const id = window.setTimeout(...a);  _timeouts.push(id);  return id; };

  /* ------------------------------------------------------------------
     THE ELEVEN. Titles are PLACEHOLDERS pending Paul's naming pass.
     art: schematic preview kind. Real screen grabs replace these.
  ------------------------------------------------------------------ */
  /* Card states are LAUNCH DAY, deliberately: lesson 1 open, the rest carry the
     date they land. That is the TV model made visible - "coming" with no date is
     a broken link, a date is an appointment. */
  const LESSONS = [
    /* PROPOSED SEASON ONE, 18 Jul - Paul to arbitrate.
       Wording is PAUL-APPROVED from 11 Jul (docs/plans/2026-07-11-course-modules-
       rethink.md §16z) wherever an approved title exists. Kit has not invented
       wording; the open decisions are WHICH SIX and IN WHAT ORDER, not the words. */
    /* THE SIX, AND THE ORDER - Paul, 18 Jul: "This is the six."
       Dictated fresh, replacing every previous title. His wording rulings:
       MARKETING agents (not agents), SOLVE difficult problems (not solving).

       ⚠️ EVERY ARTEFACT IS NOW "GRAB NEEDED", INCLUDING THE TWO REAL ONES.
       The 20-things grab and the terminal lesson-page grab were shot for modules
       that no longer exist, and the fox ad belonged to "Make the ads". Keeping any
       of them here would mean showing a real asset against a module it does not
       illustrate, which is the fabrication ban wearing a disguise. The assets are
       not deleted and not wasted - they are unassigned until a module genuinely
       owns them. */
    {n:1, t:"(1) The 80/20 of AI",                        built:false, when:"Mon 21 Sep", on:"2026-09-21", href:"#module-1",
     art:{win:"few"}},
    {n:2, t:"(2) Slow, then fast",               built:false, when:"Mon 5 Oct",  on:"2026-10-05", href:"#module-2",
     art:{win:"cal"}},
    /* ⭐ REAL FOOTAGE, and it is the argument itself. Paul, 18 Jul: "that's an
       example of me creating video which I couldn't do before." A marketer
       shipping a film IS adjacent value, so this card does not need to depict
       the idea - it can simply BE it. Same file the homepage runs.
       This is also the asset Kit unassigned earlier for want of a module that
       honestly owned it. This module owns it. */
    {n:3, t:"(3) Create adjacent value",        built:false, when:"Mon 19 Oct", on:"2026-10-19", href:"#module-3",
     art:{vid:"/course/fox-tarantino-trunk.mp4", poster:"/course/fox-tarantino-trunk-poster.jpg"}},
    {n:4, t:"(4) System thinking",              built:false, when:"Mon 2 Nov",  on:"2026-11-02", href:"#module-4",
     art:{win:"sys"}},
    {n:5, t:"(5) Building marketing agents",    built:false, when:"Mon 16 Nov", on:"2026-11-16", href:"#module-5",
     art:{win:"agent"}},
    /* SETTLED: TACKLE (Paul, 18 Jul). He first insisted on SOLVE, then reopened it -
       "what we're trying to say is attempt... maybe it's tackle" - and chose tackle
       over Kit's "take on". SOLVE was the problem: it promises the OUTCOME, and the
       module is an invitation to GO AT things previously written off as too big. A
       marketer who does not solve it has still done the module. */
    /* ⭐ THE PHONE. Paul, 18 Jul: this module talks about his quantitative deep
       researcher THAT DOES PHONE CALLS - so the artefact is a call coming in.
       It also gives the set back its dark card, which the outreach conversation
       took away when it replaced the terminal.
       ⚠️ Honest about what it is: a stock photograph of a phone, not a grab of
       Paul's researcher running. It depicts the idea rather than evidencing a
       result, which is inside the 18 Jul drawn-window ruling - but a PHOTO reads
       as evidence more readily than a drawing does, so it must never be captioned
       in a way that claims this call happened. */
    {n:6, t:"(6) Tackle difficult problems",    built:false, when:"Mon 30 Nov", on:"2026-11-30", href:"#module-6",
     art:{photo:"/course/art/phone-call.jpg"}}
  ];

  /* NOTHING SAYS LIVE UNTIL IT IS LIVE (Paul, 18 Jul).
     The cards were drawn in their LAUNCH-DAY state, which was right as a design
     preview and wrong as a page. Today is pre-launch, so a green Live badge on
     module 1 is a claim that is not true - and it sat next to "Mon 21 Sep", which
     contradicted it on the same card. Promotion starts before launch to build the
     list, so this page will be seen by real people while everything is still coming.

     A module reads Live only when BOTH are true: its date has passed AND it is
     actually built. The date alone would flip a card to Live on a Monday whether or
     not the content exists, which is the fabrication ban by the back door. Each card
     now flips itself on its own Monday, so the TV release needs no manual edit. */
  const isLive = L => L.built && new Date() >= new Date(L.on + "T00:00:00");

  /* ------------------------------------------------------------------
     COMPOSITION (Job 1, 18 Jul). Positions are in px against a 1160
     DESIGN WIDTH (the 1240 wrap minus its 40px gutters) and scale
     proportionally, so the arrangement holds instead of reflowing.

     THE SHAPE IS A SERPENTINE, NOT A GRID. The top run reads left to
     right (1,2,3), then the eye drops on the RIGHT EDGE to 4 and the
     bottom run comes back right to left (4,5,6). That single change is
     what kills the old full-page-width 3-to-4 connector: 3 and 4 now sit
     almost on top of each other, so the longest run in the composition
     became the shortest.

     Loose, not gridded: no two cards share a y, the vertical stagger is
     deliberately uneven (20/125/35 across the top run), and the two runs
     are offset from each other in x so nothing lines up into a column.
     Measured against the live homepage's own constellation, where the
     satellite cards sit at offsets from a centre - (-476,+238),
     (-496,-74), (+454,-206), (0,+6) - heavy vertical stagger, no shared
     y, wide x spread. Same logic, applied to a chain.

     Gaps between consecutive cards are held at 50-80px so a connector
     has room to leave one edge and arrive perpendicular at the next.
  ------------------------------------------------------------------ */
  const DESIGN_W = 1160;
  const DRAG_ROOM = 300;   /* empty canvas below the lowest card, so cards can be pulled down into space */
  const POS = [
    [   0,  20],[ 390, 125],[ 790,  35],
    [ 760, 392],[ 380, 430],[  10, 345]
  ];

  /* Edges are DATA, not a hardcoded i-to-i+1 walk. The chain is the
     RELEASE order (one episode a fortnight), which is honest - it is how
     the course actually arrives. It is not a required path, and the
     composition does not depend on it, so changing the topology later is
     a one-line change here rather than a rewrite of drawWires. */
  const EDGES = [[0,1],[1,2],[2,3],[3,4],[4,5]];

  /* NARROW DESKTOP (901-1180). Three 320px columns do not fit under ~1180,
     and the rule is DENSITY IS WHAT GETS SACRIFICED, NEVER CARD SIZE - Paul
     went 252 to 320 deliberately, on the grounds that six cards should not
     look like thumbnails. So the cards stay at full size and the composition
     goes TALLER instead: a two-column zigzag, left-right-left-right, still
     staggered so no two share a y and it never reads as a table. Vertical
     room is cheap; the live homepage constellation does not fit one viewport
     either, it assembles as you scroll.

     Fixed 780px cluster (two 320 columns + a 140 gutter), CENTRED in the
     board rather than scaled, so it neither collides at the low end nor
     strands a lake of empty space at the high end. */
  const NARROW_W = 780;
  const NARROW_POS = [
    [   0,   0],[ 460, 110],
    [  20, 330],[ 450, 440],
    [   0, 690],[ 460, 790]
  ];

  const board = document.getElementById('board');
  const wires = document.getElementById('wires');

  /* ------------------------------------------------------------------
     THE SIX WINDOWS. One moment each. The copy inside is deliberately
     ORDINARY MARKETING WORK - a launch, an agency brief, a quarterly
     report - because the point of every module is that this is the job
     they already do, not a computing exercise.
     ⚠️ No counts, no metrics, no performance claims anywhere in here.
  ------------------------------------------------------------------ */
  const WINDOWS = {
    /* 1. 80/20 - the few that actually move it, against the many that do not */
    few: `<div class="w w-fox">
        <img src="/fox/chapter-fox-sitting-nobg.png" alt="">
        <p class="hl">20 things that get you <b>80% of the way</b></p>
      </div>`,

    /* ⚠️ REBUILT. The first version was a grey bar chart on the left and three
       EMPTY boxes on the right, and it said nothing - the outputs were literally
       blank. The lesson from the set: at 284px WORDS READ AND ABSTRACT BARS DO NOT.
       Every window that works here uses words. So the spec became the actual
       criteria, and the outputs became named pieces coming off it. */
    cal: `<div class="w w-pyr"><div class="wbar"><span>Ladder of marketing metrics</span><span class="live">walking up</span></div>
      <div class="wbody">
        <div class="tier t-commercial">Commercial</div>
        <div class="tier t-behaviour">Customer behaviour</div>
        <div class="tier t-memory">Memory</div>
        <div class="tier t-comms">Communication</div>
        <div class="tier t-activity">Activity</div>
      </div></div>`,

    /* 3. Create adjacent value - the old job, and what sits next to it now */
    adj: `<div class="w w-adj"><div class="wbar"><span>What you shipped</span><span class="live">wider</span></div>
      <div class="wbody"><div class="tiles">
        <div class="tile"><span>The campaign</span><s style="width:70%"></s></div>
        <div class="tile new"><span>The tool behind it</span><s style="width:80%"></s></div>
        <div class="tile new"><span>The page it lives on</span><s style="width:60%"></s></div>
        <div class="tile new"><span>The report after it</span><s style="width:75%"></s></div>
      </div></div></div>`,

    /* 4. System thinking - every step, not just the clever one */
    sys: `<div class="w w-bp"><div class="wbar"><span>Campaign Agent</span><span class="live">running</span></div>
      <div class="wbody">
        <svg viewBox="0 0 284 112" preserveAspectRatio="none">
          <path class="edge" data-step="1" d="M84,56 C96,56 96,28 108,28"/>
          <path class="edge" data-step="1" d="M84,56 C96,56 96,84 108,84"/>
          <path class="edge" data-step="2" d="M176,28 C188,28 188,56 200,56"/>
          <path class="edge" data-step="2" d="M176,84 C188,84 188,56 200,56"/>
        </svg>
        <div class="node" data-step="0" style="left:44px;top:50%"><span class="ic">&#9670;</span><span class="nm">New-role signal</span></div>
        <div class="node" data-step="1" style="left:142px;top:25%"><span class="ic">&#9636;</span><span class="nm">Research brief</span></div>
        <div class="node" data-step="1" style="left:142px;top:75%"><span class="ic">&#9998;</span><span class="nm">Draft outreach</span></div>
        <div class="node" data-step="2" style="left:240px;top:50%"><span class="ic">&#10148;</span><span class="nm">Send + track</span></div>
      </div></div>`,

    /* 5. Building marketing agents - THE DARK ONE. A set of light cards needs it. */
    /* 5. Building marketing agents - the homepage's OUTREACH AGENT, ported.
       ⚠️ This replaces the dark terminal, which was the set's only dark card and
       was giving five light cards their contrast. The fox video now carries that
       weight instead. Flagged to Paul rather than silently swapped. */
    agent: `<div class="w w-conv"><div class="wbar"><span>Outreach Agent</span><span class="live">214 sent</span></div>
      <div class="wbody">
        <div class="chd"><span class="av a1 cav">CH</span><div class="who cwho">Claire Hughes<div class="sub2">Head of Growth &middot; Vero</div></div><span class="pill">Replied</span></div>
        <div class="stream"></div>
      </div></div>`,

    /* 6. Tackle difficult problems - the one you parked, taken apart */
    hard: `<div class="w w-hard"><div class="wbar"><span>Parked since March</span><span class="live">open</span></div>
      <div class="wbody">
        <div class="q">Why do people leave in month two?</div>
        <div class="part">Pull every cancellation reason</div>
        <div class="part">Read the ones nobody counted</div>
        <div class="part">Test the fix on one segment</div>
        <div class="part">Take the answer to the board</div>
      </div></div>`
  };

  function artHTML(a){
    /* A DRAWN WINDOW - the module does not exist yet, the card says COMING,
       so this shows the SHAPE of the work rather than claiming an output. */
    if(a.win) return `<div class="art real win">${WINDOWS[a.win]}</div>`;
    /* REAL: an actual grab. Kept for when a module genuinely owns one. */
    if(a.photo) return `<div class="art real photo"><img src="${a.photo}" alt=""></div>`;
    if(a.img) return `<div class="art real"><img src="${a.img}" alt=""><div class="cap"><b>${a.cap}</b><span>real</span></div></div>`;
    /* Caption only when there is one to show. Full-bleed footage carries itself,
       and a caption bar over it just competes with the picture. */
    if(a.vid) return `<div class="art real vid"><video src="${a.vid}" poster="${a.poster}" autoplay muted loop playsinline preload="auto"></video>${a.cap?`<div class="cap"><b>${a.cap}</b><span>real</span></div>`:''}</div>`;
    return `<div class="art"><div class="strip"><s style="width:44px"></s></div><div class="rows"><s style="width:92%"></s><s style="width:78%"></s><s class="sky" style="width:56%"></s></div><span class="ph">grab needed</span></div>`;
  }

  LESSONS.forEach((L,i)=>{
    const el = document.createElement('article');
    const live = isLive(L);
    el.className = 'card' + (live?'':' soon');
    el.dataset.i = i;
    el.dataset.href = L.href;
    el.dataset.module = L.n;        /* signup intent: which module pulled them in */
    el.dataset.lands = L.on;
    el.innerHTML = `
      <div class="tl"><i class="r"></i><i class="y"></i><i class="g"></i>
        <span class="name">Module ${L.n}</span></div>
      <div class="body">
        <p class="t">${L.t}</p>
        ${artHTML(L.art||{})}
        <div class="foot">
          ${live?'<span class="badge live">Live</span>':'<span class="badge">Coming</span>'}
          <span class="when">${L.when}</span>
        </div>
        <div class="cardjoin">
          <!-- PROVISIONAL COPY - Paul's or Isa's to write.
               Paul, 18 Jul: not "leave your name" - it has to name the act (sign up).
               ⚠️ AND NOT "we email it to you" either. Paul: "we're not emailing it to
               them, they're going to come to this page to work on it." Already canon
               and Kit missed it - brief:product.access, "email is the layer that
               POINTS INTO it, not the container the content arrives in." The email
               is a notification; the work happens here. -->
          <p class="cj-line">Lands <b>${L.when}</b>. Sign up and we'll tell you when it opens.</p>
          <form class="cj-bar">
            <input class="nm" type="text" placeholder="First name" required>
            <span class="sep"></span>
            <input class="em" type="email" placeholder="your@email.com" required>
            <button type="submit" aria-label="Join">→</button>
          </form>
          <span class="cj-done">You're in. It opens ${L.when}.</span>
        </div>
      </div>`;
    board.appendChild(el);
  });

  const cards = [...board.querySelectorAll('.card')];

  /* place cards from POS (desktop only).
     Positions scale from the 1160 design width so the serpentine keeps its
     proportions instead of collapsing toward the left as the board narrows.
     Board height is measured from the placed cards rather than hardcoded, so
     the composition sets the page length and never leaves dead space under it. */
  function place(){
    if(window.innerWidth<=900){ board.style.height=''; return; }
    const w = board.clientWidth;
    /* Below the three-column threshold, swap composition rather than shrink
       cards. The narrow cluster is centred at 1:1; the wide one scales. */
    const narrow = window.innerWidth <= 1180;
    const src = narrow ? NARROW_POS : POS;
    const k   = narrow ? 1 : w / DESIGN_W;
    const ox  = narrow ? Math.max(0, (w - NARROW_W)/2) : 0;
    let bottom = 0;
    cards.forEach((c,i)=>{
      const [px,py] = src[i];
      const x = Math.min(ox + px*k, w - c.offsetWidth - 4);
      const y = py*k;
      c.style.transform = `translate(${x}px, ${y}px)`;
      c._x = x; c._y = y;
      bottom = Math.max(bottom, y + c.offsetHeight);
    });
    /* ROOM TO GO. Paul, 18 Jul: "the page has nowhere to go" - the board used to
       end 24px under the lowest card, so a dragged card hit the floor immediately.
       The canvas now runs on past the composition, which is what makes the cards
       feel movable rather than placed. */
    board.style.height = Math.round(bottom + DRAG_ROOM) + 'px';
    drawWires();
  }

  /* ---- connectors: they show RELATIONSHIP, never a required path ----
     RULES (Paul, 18 Jul):
     1. A line DOCKS ON A CARD EDGE, never at the centre and never mid-face.
     2. Lines run BEHIND cards, always. Enforced by z-index, not by luck.
     Docking picks the facing edges: side-to-side when the cards are mostly
     apart horizontally, top-to-bottom when mostly vertical. Control points
     push straight out of the docked edge, so a line leaves and arrives
     perpendicular - the Campaign Agent workflow behaviour.               */
  /* The control arm is CAPPED BY THE ACTUAL SPAN between the two docking
     points, never a flat constant. A fixed 60px arm across a 34px gap makes
     both arms overshoot, the curve doubles back on itself, and the join reads
     as a faint hook instead of a deliberate turn - which is exactly what the
     3-to-4 pivot did before this. Capping at the span keeps every curve Paul
     already accepted identical (those gaps are at or above the cap) and only
     changes the degenerate short-gap case. It also holds while DRAGGING, when
     any two cards can be pushed arbitrarily close together. */
  function arm(span, cap){ return Math.max(14, Math.min(cap, Math.abs(span))); }

  function dock(a, b){
    const aw=a.offsetWidth, ah=a.offsetHeight, bw=b.offsetWidth, bh=b.offsetHeight;
    const acx=a._x+aw/2, acy=a._y+ah/2, bcx=b._x+bw/2, bcy=b._y+bh/2;
    const dx=bcx-acx, dy=bcy-acy;

    if(Math.abs(dx) >= Math.abs(dy)){          // side to side
      const right = dx>0;
      const x1 = right? a._x+aw : a._x;
      const x2 = right? b._x     : b._x+bw;
      const k  = arm(x2-x1, 70);
      return {
        x1, y1: acy, x2, y2: bcy,
        c1x:(right?1:-1)*k, c1y:0, c2x:(right?-1:1)*k, c2y:0
      };
    }
    const down = dy>0;                          // top to bottom
    const y1 = down? a._y+ah : a._y;
    const y2 = down? b._y     : b._y+bh;
    const k  = arm(y2-y1, 60);
    return {
      x1: acx, y1, x2: bcx, y2,
      c1x:0, c1y:(down?1:-1)*k, c2x:0, c2y:(down?-1:1)*k
    };
  }

  function drawWires(){
    if(window.innerWidth<=900) return;
    const bw = board.clientWidth, bh = board.clientHeight;
    wires.setAttribute('viewBox',`0 0 ${bw} ${bh}`);
    let d = '';
    for(const [a,b] of EDGES){
      const p = dock(cards[a], cards[b]);
      d += `<path d="M${p.x1},${p.y1} C${p.x1+p.c1x},${p.y1+p.c1y} ${p.x2+p.c2x},${p.y2+p.c2y} ${p.x2},${p.y2}"
             fill="none" stroke="#BCCEDB" stroke-width="1.75" stroke-linecap="round"/>`;
      /* a small dot where it lands, so the join reads as deliberate */
      d += `<circle cx="${p.x1}" cy="${p.y1}" r="3" fill="#BCCEDB"/>`;
      d += `<circle cx="${p.x2}" cy="${p.y2}" r="3" fill="#BCCEDB"/>`;
    }
    wires.innerHTML = d;
  }

  /* ---- drag ---- */
  let drag = null;
  board.addEventListener('pointerdown', e=>{
    if(window.innerWidth<=900) return;
    const card = e.target.closest('.card');
    if(!card) return;
    /* Never start a drag from inside the join panel - typing in a field must not
       drag the card out from under the cursor. */
    if(e.target.closest('.cardjoin')) return;
    card.setPointerCapture(e.pointerId);
    card.classList.add('grabbing');
    drag = {card, sx:e.clientX, sy:e.clientY, ox:card._x, oy:card._y, moved:0};
  });
  board.addEventListener('pointermove', e=>{
    if(!drag) return;
    const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
    drag.moved = Math.max(drag.moved, Math.abs(dx)+Math.abs(dy));
    const c = drag.card;
    c._x = drag.ox + dx;
    c._y = drag.oy + dy;
    c.style.transform = `translate(${c._x}px, ${c._y}px)`;
    drawWires();
  });
  ['pointerup','pointercancel'].forEach(ev=>
    board.addEventListener(ev, ()=>{
      if(!drag) return;
      drag.card.classList.remove('grabbing');
      /* Under 5px of travel is a CLICK, not a drag - open the ask on that card.
         Only one card is ever open, so the page never fills with panels, and the
         connectors redraw because the card just changed height. */
      if(drag.moved < 5){
        const card = drag.card, wasOpen = card.classList.contains('open');
        cards.forEach(c=>c.classList.remove('open'));
        if(!wasOpen){
          card.classList.add('open');
          card.querySelector('.cj-bar input').focus({preventScroll:true});
        }
        drawWires();
      }
      drag = null;
    })
  );

  /* ------------------------------------------------------------------
     SIGNUP PAYLOAD. Agreed with the Klaviyo terminal, 18 Jul.

     The submit target is an API ROUTE in fox-advantage-site, never a direct
     client-side post: the private key must not touch the browser, consent has
     to gate the write in one place, and the interest-versus-member split is a
     server decision made from the DATE, not from whatever the page believes.

     That route does not exist yet, and this page is served statically in dev,
     so the endpoint is configurable and falls back to logging the payload.
     Nothing here sends anything anywhere today.

     ⚠️ signup_module is the reason the card panel exists. Someone who signs up
     from "Make the ads" told you WHY they came, and that is only knowable at
     the point of intent - it cannot be reconstructed later. Capture or lose it.
  ------------------------------------------------------------------ */
  const SIGNUP_ENDPOINT = window.COURSE_SIGNUP_ENDPOINT || null;

  function submitSignup(payload){
    if(!SIGNUP_ENDPOINT){
      console.info('[course signup] no endpoint configured, payload would be:', payload);
      return Promise.resolve({ok:true, simulated:true});
    }
    return fetch(SIGNUP_ENDPOINT,{
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    }).catch(err=>{ console.error('[course signup] failed', err); });
  }

  /* the ask on each card - same behaviour as the hero pill */
  board.addEventListener('submit', e=>{
    const f = e.target.closest('.cj-bar');
    if(!f) return;
    e.preventDefault();
    const card = f.closest('.card');
    submitSignup({
      first_name: f.querySelector('input.nm').value.trim(),
      email:      f.querySelector('input.em').value.trim(),
      signup_source: 'card',
      signup_module: Number(card.dataset.module),
      signup_module_lands: card.dataset.lands
    });
    f.closest('.cardjoin').classList.add('done');
    drawWires();
  });


  /* ---- the Outreach Agent conversation runs itself ----
     Same sequence as the homepage: the agent's message, a pause, typing, the
     reply, then Replied - cycling through four people. Under reduced motion it
     renders the FINISHED state instead of looping, per the agent-cards rule that
     a stood-down animation must leave a calm readable card, not an empty one. */
  (function(){
    const card = document.querySelector('.w-conv'); if(!card) return;
    const CYC = [
      {ini:"CH",cls:"a1",name:"Claire Hughes",sub:"Head of Growth &middot; Vero",
       out:"Noticed you just stepped into Head of Growth at Vero.",reply:"Sounds good - send me a time this week."},
      {ini:"TR",cls:"a3",name:"Tom Reilly",sub:"VP Marketing &middot; Northbeam",
       out:"Saw Northbeam is hiring across marketing.",reply:"Yes, let's find a time."},
      {ini:"MO",cls:"a2",name:"Marie O'Brien",sub:"CMO &middot; Loop",
       out:"One idea for Loop's Q3 launch.",reply:"Interested - tell me more."},
      {ini:"SK",cls:"a4",name:"Sin\u00e9ad Kelly",sub:"Head of Demand &middot; Arc",
       out:"Congrats on the move to Arc.",reply:"Happy to chat, send a time that suits."}
    ];
    const av=card.querySelector('.cav'), who=card.querySelector('.cwho'),
          pill=card.querySelector('.pill'), stream=card.querySelector('.stream');
    const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timers=[];
    function show(i){
      timers.forEach(clearTimeout); timers=[];
      const c=CYC[i];
      av.className='av '+c.cls+' cav'; av.textContent=c.ini;
      who.innerHTML=c.name+'<div class="sub2">'+c.sub+'</div>';
      pill.classList.remove('show');
      if(REDUCED){
        stream.innerHTML='<div class="b out">'+c.out+'</div><div class="b in">'+c.reply+'</div>';
        stream.querySelectorAll('.b').forEach(b=>{b.style.opacity=1;b.style.transform='none';b.style.animation='none';});
        pill.classList.add('show'); return;
      }
      stream.innerHTML='<div class="b out">'+c.out+'</div><div class="rs"></div>';
      const rs=stream.querySelector('.rs');
      timers.push(setTimeout(()=>{rs.innerHTML='<div class="b type"><span></span><span></span><span></span></div>';},1100));
      timers.push(setTimeout(()=>{rs.innerHTML='<div class="b in">'+c.reply+'</div>';},2600));
      timers.push(setTimeout(()=>{pill.classList.add('show');},3100));
    }
    show(0);
    if(!REDUCED){ let i=0; setInterval(()=>{i=(i+1)%CYC.length; show(i);},5600); }
  })();


  /* the ladder lights from the bottom rung to the top, then holds - the coaching
     walking a brief up from activity metrics to a commercial outcome */
  (function(){
    const pyr=document.querySelector('.w-pyr'); if(!pyr) return;
    const tiers=[...pyr.querySelectorAll('.tier')].reverse();  // activity -> commercial
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){
      tiers.forEach(t=>t.classList.add('lit')); return;
    }
    let i=0;
    (function step(){
      tiers.forEach(t=>t.classList.remove('lit'));
      tiers[i].classList.add('lit');
      const atTop = i===tiers.length-1;
      i = atTop ? 0 : i+1;
      setTimeout(step, atTop ? 2200 : 900);
    })();
  })();


  /* the blueprint runs: each step lights, the edges ahead of it flow, then it
     settles done and starts again - the workflow runner from /agent-cards */
  (function(){
    const bp=document.querySelector('.w-bp'); if(!bp) return;
    const nodes=[...bp.querySelectorAll('.node')], edges=[...bp.querySelectorAll('.edge')];
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){
      nodes.forEach(n=>n.classList.add('done')); return;
    }
    const max=Math.max(...nodes.map(n=>+n.dataset.step));
    (function run(){
      nodes.forEach(n=>n.classList.remove('done','run'));
      edges.forEach(e=>e.classList.remove('on'));
      let step=0;
      (function tick(){
        nodes.forEach(n=>{const s=+n.dataset.step;
          if(s===step){n.classList.remove('done');n.classList.add('run');}
          else if(s<step){n.classList.remove('run');n.classList.add('done');}});
        edges.forEach(e=>e.classList.toggle('on', +e.dataset.step===step+1));
        if(step<max){ step++; setTimeout(tick,900); }
        else{ nodes.forEach(n=>{n.classList.remove('run');n.classList.add('done');});
              edges.forEach(e=>e.classList.remove('on'));
              setTimeout(run,2400); }
      })();
    })();
  })();

  /* ---- the way in ---- */
  const join = document.getElementById('join');
  document.getElementById('joinFields').addEventListener('submit', e=>{
    e.preventDefault();
    const f = e.target;
    submitSignup({
      first_name: f.querySelector('input[type=text]').value.trim(),
      email:      f.querySelector('input[type=email]').value.trim(),
      signup_source: 'hero'
    });
    join.classList.add('done');
  });

  window.addEventListener('resize', place);
  place();

  // Added by the port. Without this, navigating away from /course client-side
  // leaves the animation timers running and the resize handler pointing at
  // detached nodes.
  return () => {
    window.removeEventListener('resize', place);
    _intervals.forEach(id => window.clearInterval(id));
    _timeouts.forEach(id => window.clearTimeout(id));
  };
}
