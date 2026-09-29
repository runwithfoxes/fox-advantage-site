import Link from "next/link";
import f from "../resources/front.module.css";
import n from "./next.module.css";

/**
 * The case studies and the two books. Paul, 29 Sep 2026: "Let's make sure we got the positioning
 * of them right. Because the Millionaire Raffle is about distinctive brand, it's about category
 * entry points. We have to figure out what the National Lottery Marketer of the Year one is about
 * so it doesn't sound like I'm just talking about myself."
 *
 * So the idea leads every card and the brand and the result follow it. The award is one small
 * line at the foot of the Lottery card, never the headline. Every number here is on the case
 * study page it links to; nothing is typed here that the page does not say.
 */

type Card = {
  idea: string;
  big: string;
  bigOf: string;
  title: string;
  line: string;
  who: string;
  href: string;
  /** A real ad from the work. The Lottery card has none: the only picture is a magazine cover of Paul. */
  image?: { src: string; alt: string };
};

const CARDS: Card[] = [
  {
    idea: "Category entry points",
    big: "27:1",
    bigOf: "return on the campaign",
    title: "Millionaire Raffle",
    line:
      "We found the moment people think of a gift to put in a card, and made every frame of the ad about it. The tickets sold out so fast we had to pull the advertising.",
    who: "National Lottery · 2019 to 2021",
    href: "/millionaire-raffle",
    image: { src: "/projects/millionaire-raffle/raffle-social.jpeg", alt: "The Millionaire Raffle social ad: a woman holding a gift envelope" },
  },
  {
    idea: "Turning round a brand in decline",
    big: "€1bn",
    bigOf: "revenue, the first time",
    title: "The National Lottery",
    line:
      "One brand instead of several competing with each other, three goals, and every decision checked against the evidence. Revenue passed €1 billion for the first time, 19% up on 2019.",
    who: "National Lottery · 2020 to 2022 · Ireland's Marketer of the Year 2022",
    href: "/marketer-of-the-year",
  },
  {
    idea: "Fame",
    big: "12%",
    bigOf: "market share in year one",
    title: "48",
    line:
      "A mobile network that only 18 to 22 year olds could join, and the ads got banned. Within six months, 63% of young people in Ireland knew it.",
    who: "O2 Ireland · 2012 to 2014",
    href: "/48",
    image: { src: "/projects/48/poster.jpeg", alt: "The 48 launch poster: Go Conquer" },
  },
];

const BOOKS = [
  {
    title: "Run with Foxes",
    sub: "Make better marketing decisions",
    line: "The book on how to decide well in marketing: evidence, judgement and the courage to act on both.",
    cover: "/rwf-cover.jpg",
    href: "/run-with-foxes",
    cta: "About the book →",
  },
  {
    title: "The Fox Advantage",
    sub: "How teams collapse complexity to run faster",
    line: "54 short chapters on how marketing teams thrive because of AI. Free to read here.",
    cover: "/book_cover.JPG",
    href: "/book",
    cta: "Read it free →",
  },
];

export default function Proof() {
  return (
    <>
      <section className={f.shelf} id="work">
        <div className={f.shelfHead}>
          <h2 className={f.h2}>Three pieces of work</h2>
        </div>
        <div className={n.workGrid}>
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className={n.workCard}>
              {c.image ? (
                <img className={n.workImg} src={c.image.src} alt={c.image.alt} loading="lazy" />
              ) : (
                <div className={n.workPlate}>
                  <b>{c.big}</b>
                  <span>{c.bigOf}</span>
                </div>
              )}
              <span className={n.kicker}>{c.idea}</span>
              <span className={n.workTitle}>{c.title}</span>
              <p className={n.workLine}>{c.line}</p>
              {c.image ? (
                <span className={n.workNum}>
                  <b>{c.big}</b> {c.bigOf}
                </span>
              ) : null}
              <span className={`${f.meta} ${n.workWho}`}>{c.who}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={f.shelf} id="books">
        <div className={f.shelfHead}>
          <h2 className={f.h2}>Books from us</h2>
        </div>
        <div className={n.bookGrid}>
          {BOOKS.map((b) => (
            <Link key={b.href} href={b.href} className={n.bookCard}>
              <img className={n.bookCover} src={b.cover} alt={`${b.title} book cover`} loading="lazy" />
              <div>
                <span className={n.workTitle}>{b.title}</span>
                <span className={n.bookSub}>{b.sub}</span>
                <p className={n.workLine}>{b.line}</p>
                <span className={n.doorGo}>{b.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
