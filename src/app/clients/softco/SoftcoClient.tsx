"use client";

import { useState, useTransition } from "react";
import { verifyPassword } from "./actions";

const M = "/clients/softco/media";
const STATUS = "Ready for feedback";

function Vid({
  src,
  poster,
  ratio = "1 / 1",
}: {
  src: string;
  poster?: string;
  ratio?: string;
}) {
  return (
    <div className="tile" style={{ aspectRatio: ratio }}>
      <video src={src} poster={poster} autoPlay loop muted playsInline preload="metadata" />
    </div>
  );
}

// Chart Ad set, grouped by shape. [size, displayWidthPx]
const CHART_GROUPS: [string, [string, number][]][] = [
  ["Square and rectangle", [["1080x1080", 280], ["640x480", 300], ["300x250", 240], ["160x600", 150]]],
  ["Leaderboard and billboard", [["970x250", 560], ["1029x210", 560], ["728x90", 440], ["600x200", 340]]],
  ["Strips and mobile", [["320x100", 320], ["600x100", 460], ["300x50", 320]]],
];

const TESTI: [string, string][] = [
  ["v1", "Photo column"],
  ["v2", "Cut-out"],
  ["A", "Quote panel"],
  ["B", "Speaker promo"],
];

// Every asset from the SoftCo brand-assets library. [name, detail, status]
type DStatus = "ready" | "todo";
const DELIVERABLES: [string, string, DStatus][] = [
  ["Display / banner ads", "11 IAB sizes, animated", "ready"],
  ["Testimonial cards", "4 layouts, square, static + animated", "ready"],
  ["Iceberg diagram", "Square 1080×1080, organic + paid", "ready"],
  ["Email banners", "600×140 and 1024×206", "ready"],
  ["Blog headers", "1200×630", "ready"],
  ["Blog content cards", "Stat, pull-quote, question", "ready"],
  ["Event graphics", "Square 1080×1080", "ready"],
  ["Meeting backgrounds", "1920×1080 virtual background", "ready"],
  ["Social posts", "Square 1080×1080", "ready"],
  ["Carousels", "3-slide, square 1080×1080", "ready"],
  ["Product walkthrough carousel", "5-slide, square 1080×1080", "ready"],
  ["Testimonial carousel", "5-slide, square 1080×1080", "ready"],
  ["Webinar promos", "Square 1080×1080", "ready"],
  ["Thumbnails", "1280×720", "ready"],
  ["Video clips", "Webinar repurposing", "todo"],
  ["Product Proof ad", "Square 1080×1080, extra", "ready"],
];
const READY_COUNT = DELIVERABLES.filter((d) => d[2] === "ready").length;

// Verbatim feedback record. Daragh's questions paired with Paul's replies,
// grouped the way Paul grouped his own reply (6 answers to 8 points).
const FB_INTRO =
  "Ok great. So all of what you want is possible and the way to get good quality is about deciding upfront these decisions as much as possible. You can have a wide range as long as each one is decided.";
const FAQ: { q: string[]; a: string }[] = [
  {
    q: [
      "Will the system give us more variation / flexibility so every asset doesn't feel like the same blue template. Will we be able to instruct it, or will we be tied to strict templates? For example - change blue to SoftCo orange and more.",
    ],
    a: "Yes but we have to build them upfront. For example, if you want orange or others, show me examples and I'll build them. So you might end up with 3-5 types of ads formats. To be honest, AI alone, I'd recommend you don't vary it too much. You might get bored but consistency pays off. If you don't have examples, we can still build them. I just need to know what's on in your heads on this.",
  },
  {
    q: [
      "In some examples, it's not immediately clear what should be read first.",
      "Am I correct in assuming that readability will improve as font size, weight, contrast, text density feel off in parts.",
    ],
    a: "I suggest we lock in font size per asset and shape upfront. One example is your iceberg is complex for a banner ad. So either you decide this is not a good idea for a banner ad or we find a better way. For now, I was just replicating it, but I wouldn't necessarily recommend this. This is about locking in rules which as \"font must be x size for x shape and size\" and this forces user to make decisions on number of words you cannot go over.",
  },
  {
    q: [
      "Again (and maybe this is part of the development), but we will want to have Product-led and human-led assets. We have found they perform better.",
    ],
    a: "Yes on product and human. Are there examples in the files you sent me? If not, let me know examples. People do get higher attention.",
  },
  {
    q: [
      "Webinar repurposing remains the highest-value workflow and should remain a major focus of Phase 1.",
      "I know you mentioned looking at another webinar tool, but can we see what our existing one does first? I believe it has a Claude plug-in. John Neary can provide more info.",
    ],
    a: "I looked at your webinar tool, and registered with it but it seems to be more about data on what happened, views etc not a clipping tool, unless I got that wrong? Can you tell me, as this is critical to move forward quickly?",
  },
  {
    q: [
      "Will the system include readability guardrails so that assets fail QA automatically if minimum contrast, size, or spacing requirements are not met.",
    ],
    a: "The QA is possible. It's a good idea. Nobody asked me before. I'll do that.",
  },
  {
    q: [
      "I know we are getting ahead here, but how does the system decide which asset format to generate?",
    ],
    a: "You decide what assets you want. Think of it as a menu of customised options to choose from. The menu options don't have to be narrow but again I'd recommend you don't go so wide, so you have consistency. You might have say a product route, a testimonial route, a case study route etc. And each of these would have a range of formats / sizes.",
  },
];

export default function SoftcoClient({ initialAuth }: { initialAuth: boolean }) {
  const [authed, setAuthed] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set());

  function toggleFaq(i: number) {
    setOpenFaq((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const ok = await verifyPassword(password);
      if (ok) setAuthed(true);
      else {
        setError("Wrong password.");
        setPassword("");
      }
    });
  }

  if (!authed) {
    return (
      <div className="sc-gate">
        <div className="sc-gate-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sc-fox" src="/fox/chapter-fox-sitting-nobg.png" alt="" />
          <div className="sc-logo">/<span>Run</span>withfoxes</div>
          <div className="sc-gate-label">clients / softco</div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              autoFocus
              disabled={isPending}
            />
            <button type="submit" disabled={isPending}>
              {isPending ? "checking…" : "enter"}
            </button>
          </form>
          {error && <div className="sc-gate-error">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="sc-page">
      <header className="sc-top">
        <a href="/" className="sc-logo">/<span>Run</span>withfoxes</a>
        <div className="sc-top-right">private workspace</div>
      </header>

      <div className="sc-wrap">
        <div className="sc-eyebrow">Run with Foxes &times; SoftCo</div>
        <h1 className="sc-title">Creative deliverables</h1>
        <p className="sc-intro">
          A live view of the work for SoftCo in the new brand system. The full
          asset list is below with status. The finished pieces are shown in full
          underneath, static and animated. Have a look and send back your
          thoughts.
        </p>

        <div className="sc-count">
          {READY_COUNT} of {DELIVERABLES.length} ready for feedback
        </div>
        <div className="sc-summary">
          <div className="sc-row sc-row-head">
            <span>Deliverable</span>
            <span>Detail</span>
            <span>Status</span>
          </div>
          {DELIVERABLES.map(([name, detail, status]) => (
            <div className="sc-row" key={name}>
              <span>{name}</span>
              <span>{detail}</span>
              <span><i className={`b ${status}`} />{status === "ready" ? STATUS : "To do"}</span>
            </div>
          ))}
        </div>

        {/* Feedback record - verbatim, for the file */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Feedback &amp; responses</h2><span className="badge">18 June 2026</span></div>
          <p className="sc-desc">
            A record of the first round of feedback on this page and the replies,
            kept here so nothing gets lost. Click a question to read the answer.
          </p>
          <p className="sc-fb-intro">{FB_INTRO}</p>
          <div className="sc-acc">
            {FAQ.map((item, i) => {
              const open = openFaq.has(i);
              return (
                <div className={`sc-acc-item${open ? " open" : ""}`} key={i}>
                  <button
                    className="sc-acc-q"
                    aria-expanded={open}
                    onClick={() => toggleFaq(i)}
                  >
                    <span className="sc-acc-mark">{open ? "−" : "+"}</span>
                    <span className="sc-acc-qtext">
                      {item.q.map((line, j) => (
                        <span key={j}>{line}</span>
                      ))}
                    </span>
                  </button>
                  {open && (
                    <div className="sc-acc-a">
                      <span className="sc-acc-alabel">Paul</span>
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="sc-fb-note">
            Next step agreed: a short video call to go through each ad and format
            one by one, transcribed so the full feedback is captured.
          </p>
        </section>

        {/* Chart Ad - every size */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Chart Ad set</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">
            The animated display ad across the full IAB range, eleven sizes from
            the square down to the mobile strips. Every size is here at true
            proportion.
          </p>
          {CHART_GROUPS.map(([label, items]) => (
            <div className="sc-chart-group" key={label}>
              <div className="sc-chart-label">{label}</div>
              <div className="sc-chart-row">
                {items.map(([size, w]) => {
                  const [cw, ch] = size.split("x");
                  return (
                    <div className="sc-chart-item" key={size} style={{ width: w }}>
                      <Vid
                        src={`${M}/chart-${size}.mp4`}
                        poster={`${M}/chart-${size}-poster.png`}
                        ratio={`${cw} / ${ch}`}
                      />
                      <div className="cap">{size}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Iceberg */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Iceberg diagram</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">
            Animated explainer, the visible cost above the line, the hidden cost
            below. Built as a square for LinkedIn, organic and paid.
          </p>
          <figure style={{ width: 320 }}>
            <Vid src={`${M}/iceberg-1080.mp4`} poster={`${M}/iceberg-poster.png`} />
            <figcaption>1080×1080 · organic + paid</figcaption>
          </figure>
        </section>

        {/* Testimonials - static + animated */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Testimonial cards</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">
            Four layout options, each produced static and with the neuron field
            gently animating. Anton Scott is the test face. Real cards take a
            customer quote and photo.
          </p>
          <div className="sc-testi-grid">
            {TESTI.map(([key, name]) => (
              <figure key={key}>
                <div className="sc-testi-name">{name}</div>
                <Vid src={`${M}/testimonial-${key}.mp4`} poster={`${M}/testimonial-${key}.png`} />
                <div className="submark">Animated</div>
                <div className="tile">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${M}/testimonial-${key}.png`} alt="" />
                </div>
                <div className="submark">Static</div>
              </figure>
            ))}
          </div>
        </section>

        {/* Blog & content cards */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Blog &amp; content cards</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">Stat, pull-quote and question cards. Square 1080×1080.</p>
          <div className="sc-chart-row">
            <figure style={{ width: 300 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/stat_card.png`} alt="" width={300} /><figcaption>Stat · 1080×1080</figcaption></figure>
            <figure style={{ width: 300 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/quote_card.png`} alt="" width={300} /><figcaption>Pull-quote · 1080×1080</figcaption></figure>
            <figure style={{ width: 300 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/question_card.png`} alt="" width={300} /><figcaption>Question · 1080×1080</figcaption></figure>
          </div>
        </section>

        {/* Social & event */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Social &amp; event</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">Square 1080×1080, organic and paid. The Gartner mark is placeholder pending the real logo.</p>
          <div className="sc-chart-row">
            <figure style={{ width: 300 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/social_post.png`} alt="" width={300} /><figcaption>Social post · 1080×1080</figcaption></figure>
            <figure style={{ width: 300 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/event_card.png`} alt="" width={300} /><figcaption>Event graphic · 1080×1080</figcaption></figure>
          </div>
        </section>

        {/* Email banners */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Email banners</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">Your existing email banner dimensions, single line of copy.</p>
          <div className="sc-chart-row">
            <figure style={{ width: 520 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/email_banner_1024.png`} alt="" width={520} /><figcaption>1024×206</figcaption></figure>
            <figure style={{ width: 420 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/email_banner_600.png`} alt="" width={420} /><figcaption>600×140</figcaption></figure>
          </div>
        </section>

        {/* Blog header & thumbnail */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Blog header &amp; thumbnail</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">Wide formats.</p>
          <div className="sc-chart-row">
            <figure style={{ width: 480 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/blog_header.png`} alt="" width={480} /><figcaption>Blog header · 1200×630</figcaption></figure>
            <figure style={{ width: 440 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/thumbnail.png`} alt="" width={440} /><figcaption>Thumbnail · 1280×720</figcaption></figure>
          </div>
        </section>

        {/* Webinar & carousel */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Webinar &amp; LinkedIn carousel</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">Square 1080×1080. The carousel is a 3-slide set.</p>
          <div className="sc-chart-row">
            <figure style={{ width: 300 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/webinar_promo.png`} alt="" width={300} /><figcaption>Webinar promo · 1080×1080</figcaption></figure>
            <figure style={{ width: 220 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/carousel_1.png`} alt="" width={220} /><figcaption>Carousel 1/3</figcaption></figure>
            <figure style={{ width: 220 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/carousel_2.png`} alt="" width={220} /><figcaption>Carousel 2/3</figcaption></figure>
            <figure style={{ width: 220 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/carousel_3.png`} alt="" width={220} /><figcaption>Carousel 3/3</figcaption></figure>
          </div>
        </section>

        {/* Product walkthrough carousel */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>LinkedIn carousel · product walkthrough</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">Square 1080×1080, a 5-slide set. One invoice from inbox to paid, with the AP screen rebuilt as live UI. Numbers shown are placeholder, to confirm before publishing.</p>
          <div className="sc-chart-row">
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/product-carousel-1.png`} alt="" width={210} /><figcaption>1 · Cover</figcaption></figure>
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/product-carousel-2.png`} alt="" width={210} /><figcaption>2 · Capture</figcaption></figure>
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/product-carousel-3.png`} alt="" width={210} /><figcaption>3 · Match</figcaption></figure>
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/product-carousel-4.png`} alt="" width={210} /><figcaption>4 · Controls</figcaption></figure>
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/product-carousel-5.png`} alt="" width={210} /><figcaption>5 · Close</figcaption></figure>
          </div>
        </section>

        {/* Testimonial carousel */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>LinkedIn carousel · customer stories</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">Square 1080×1080, a 5-slide set. Face-led customer proof. Faces, names and the retention figure are placeholder, to confirm before publishing.</p>
          <div className="sc-chart-row">
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/testimonial-carousel-1.png`} alt="" width={210} /><figcaption>1 · Cover</figcaption></figure>
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/testimonial-carousel-2.png`} alt="" width={210} /><figcaption>2 · Customer</figcaption></figure>
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/testimonial-carousel-3.png`} alt="" width={210} /><figcaption>3 · Customer</figcaption></figure>
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/testimonial-carousel-4.png`} alt="" width={210} /><figcaption>4 · Result</figcaption></figure>
            <figure style={{ width: 210 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/testimonial-carousel-5.png`} alt="" width={210} /><figcaption>5 · Close</figcaption></figure>
          </div>
        </section>

        {/* Meeting background */}
        <section className="sc-sec">
          <div className="sc-sec-head"><h2>Meeting background</h2><span className="badge">{STATUS}</span></div>
          <p className="sc-desc">Virtual call background, the person sits on the clear right side. 1920×1080.</p>
          <div className="sc-chart-row">
            <figure style={{ width: 520 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img className="sc-still" src={`${M}/meeting_bg.png`} alt="" width={520} /><figcaption>1920×1080</figcaption></figure>
          </div>
        </section>

        {/* Product Proof - an extra, beyond the brief, sits at the bottom */}
        <section className="sc-sec">
          <div className="sc-sec-head">
            <h2>Product Proof ad</h2>
            <span className="badge">{STATUS}</span>
            <span className="badge sc-extra">Extra</span>
          </div>
          <p className="sc-desc">
            An extra we explored beyond the brief. The product itself, rebuilt as
            live UI and animated. Built as a large square for a LinkedIn organic
            post and a paid square ad.
          </p>
          <figure style={{ width: 320 }}>
            <Vid src={`${M}/proof-v2.mp4`} poster={`${M}/proof-v2-poster.png`} />
            <figcaption>1080×1080 · organic + paid</figcaption>
          </figure>
        </section>

        <footer className="sc-foot">Run with Foxes · private workspace for SoftCo</footer>
      </div>
    </div>
  );
}
