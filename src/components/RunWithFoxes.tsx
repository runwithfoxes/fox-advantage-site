"use client";

import Image from "next/image";
import Link from "next/link";

const reviews = [
  {
    name: "Viv Chambers",
    role: "Bricolage",
    stars: 5,
    title: "If you read one marketing book this year: you have found it",
    text: "A superb client side view on brand building, making advertising, persuading internal stakeholders and effectiveness. The most revealing stuff comes from failure as much as success. All delivered in a fluent style rare in a business book.",
  },
  {
    name: "Eoin O\u2019Brien",
    stars: 5,
    title: "Highly accessible insights delivered with great charm and humour",
    text: "There is no ego to this wonderfully entertaining, and insightful collection of stories from marketing land. Dervan has clearly learned as much from his and other people\u2019s errors as he has from his successes.",
  },
  {
    name: "Darren O\u2019Reilly",
    stars: 5,
    title: "Completed it in one sitting",
    text: "Paul gives real, life learned lessons, the good and the bad, and it\u2019s refreshing to read a marketing leader\u2019s book that is just honest with no fluff. It has certainly provided me with many different viewpoints and challenged my own bias.",
  },
  {
    name: "Andy Nairn",
    stars: 5,
    title: "A refreshingly honest marketing book",
    text: "What makes it stand out is his analysis of when things don\u2019t work out. All too often, business books gloss over failure. This one shows you how to make better decisions by highlighting less good ones.",
  },
  {
    name: "TL",
    stars: 5,
    title: "The most important marketing book you will read this year",
    text: "Dervan has managed to synthesise the most important lessons and marketing laws from the world\u2019s most respected researchers and practitioners. His writing style is fresh, concise, fast-paced and refreshingly honest.",
  },
  {
    name: "Annette D",
    stars: 4,
    title: "A great little marketing book, brim full of expertise",
    text: "Brim-full of easy, simple advice, I found this a really enjoyable little book. Ideal for anyone wanting to get ahead in marketing, or anyone agency-side who wants to better understand what actually keeps your client up at night.",
  },
  {
    name: "Ruth Moloney",
    stars: 5,
    title: "A must-read for any Marketer",
    text: "Dervan challenges many of our marketing assumptions and beliefs using a blend of hard evidence, input from an array of respected global experts and his own vast experience. Concise, accessible and practical.",
  },
  {
    name: "Melanie Stanford",
    stars: 5,
    title: "Humility, humour and great insights",
    text: "Whether you are a seasoned marketer or just starting off, this book is a great read and handbook. Paul Dervan has no ego as he humorously tells us about both his failures and wins.",
  },
  {
    name: "Conor Byrne",
    stars: 5,
    title: "So much marketing knowledge made accessible and relatable",
    text: "Being able to take so much marketing knowledge and make it so accessible and relatable is the real triumph of this book. This is not just a book for today but one that you will go back to time and time again.",
  },
  {
    name: "Tom Jackson",
    stars: 5,
    title: "Bite-sized goodness",
    text: "A read that flies by, easy to jump in and out with some cracking tales and real insight delivered in well-managed chunks. Written with good humour and a genuine sense of passion for the work being made.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="rwf-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function RunWithFoxesPage() {
  return (
    <>
      {/* TOP BAR */}
      <header className="top-bar">
        <Link href="/" className="logo">
          /<span>Run</span>withfoxes
        </Link>
        <nav>
          <Link href="/#projects">/projects</Link>
          <Link href="/#chapters">chapters.md</Link>
          <Link href="/#signup" className="cta-bar">
            /get_the_book
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="rwf-hero">
        <div className="container">
          <div className="rwf-hero-grid">
            <div className="rwf-hero-cover">
              <Image
                src="/rwf-cover.jpg"
                alt="Run with Foxes book cover"
                width={360}
                height={540}
                priority
                className="rwf-cover-img"
              />
            </div>
            <div className="rwf-hero-info">
              <div className="section-label">/first_book</div>
              <h1 className="rwf-title">
                Run with <span className="accent">Foxes</span>
              </h1>
              <p className="rwf-subtitle">Make Better Marketing Decisions</p>
              <div className="rwf-meta-row">
                <span>Harriman House</span>
                <span className="rwf-meta-dot">&middot;</span>
                <span>2020</span>
                <span className="rwf-meta-dot">&middot;</span>
                <span>188 pages</span>
              </div>
              <div className="rwf-rating-row">
                <span className="rwf-rating-stars">★★★★★</span>
                <span className="rwf-rating-text">4.7 average</span>
                <span className="rwf-meta-dot">&middot;</span>
                <span className="rwf-rating-text">61 reviews on Amazon</span>
              </div>
              <p className="rwf-hero-desc">
                A collection of real-life stories revealing the messy reality of
                decision-making in marketing, and the secrets of making better
                decisions.
              </p>
              <p className="rwf-hero-desc">
                Most marketing books only share the wins. This one shares the
                mistakes too, because that&apos;s where the real lessons are.
              </p>
              <div className="rwf-buy-row">
                <a
                  href="https://www.amazon.co.uk/Run-Foxes-Better-Marketing-Decisions-ebook/dp/B084MJW963/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rwf-buy-btn"
                >
                  Buy on Amazon →
                </a>
                <a
                  href="https://www.amazon.com/Run-Foxes-Better-Marketing-Decisions/dp/B089KWGYK4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rwf-buy-link"
                >
                  Audible
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* WHAT PEOPLE ARE SAYING - ENDORSEMENTS */}
      <section className="rwf-praise">
        <div className="container">
          <div className="section-label">/praise</div>
          <h2 className="section-title">What people said</h2>
          <div className="rwf-endorsements">
            <blockquote className="rwf-endorsement">
              <p>
                &ldquo;Run With Foxes is a treasure trove of confessions of an
                experienced marketer, who is prepared to share his mistakes so
                that all may learn from them. It is practical, understanding
                advice from an insider, not an outsider&apos;s lecture on how we
                could all be less dumb.&rdquo;
              </p>
              <cite>
                <strong>Peter Field</strong>
                <span>Author of The Long and Short of It</span>
              </cite>
            </blockquote>
            <blockquote className="rwf-endorsement">
              <p>
                &ldquo;Chief marketing officers must avoid cultivating
                departments where the primary objective is not to screw up. Paul
                doesn&apos;t promise any easy answers but his book will remind
                you that we are in the thinking business, and any way you can
                challenge your own critical thinking is a good thing.&rdquo;
              </p>
              <cite>
                <strong>Jonnie Cahill</strong>
                <span>SVP &amp; CMO, International Foods, PepsiCo</span>
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* REVIEWS */}
      <section className="rwf-reviews">
        <div className="container">
          <div className="section-label">/amazon_reviews</div>
          <h2 className="section-title">Reader reviews</h2>
          <div className="rwf-reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="rwf-review-card">
                <Stars count={r.stars} />
                <div className="rwf-review-title">{r.title}</div>
                <p className="rwf-review-text">&ldquo;{r.text}&rdquo;</p>
                <div className="rwf-review-author">
                  {r.name}
                  {r.role && <span className="rwf-review-role">{r.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* BUY CTA */}
      <section className="rwf-cta">
        <div className="container">
          <h2 className="section-title">Get the book</h2>
          <p className="rwf-cta-text">
            Available in paperback, Kindle and Audible.
          </p>
          <div className="rwf-buy-row rwf-buy-row-center">
            <a
              href="https://www.amazon.co.uk/Run-Foxes-Better-Marketing-Decisions-ebook/dp/B084MJW963/"
              target="_blank"
              rel="noopener noreferrer"
              className="rwf-buy-btn"
            >
              Buy on Amazon →
            </a>
          </div>
        </div>
      </section>

      <div className="footer-spacer" />

      {/* BOTTOM BAR */}
      <div className="bottom-bar">
        <Link href="/" className="active">
          ← back
        </Link>
        <Link href="/#projects">/projects</Link>
        <Link href="/#signup" className="cta-bar">
          get the book
        </Link>
      </div>
    </>
  );
}
