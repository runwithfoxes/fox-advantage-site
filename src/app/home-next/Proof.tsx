import Link from "next/link";
import f from "../resources/front.module.css";
import n from "./next.module.css";

/**
 * The two books and the two case studies, one row of four, no heading, at the foot of the page
 * under the library and the course. Paul, 29 Sep 2026: "let's not call this three pieces of
 * work. We don't have to give it a heading at all... get rid of the middle one, which is the
 * national lottery... add in the books in here as well... move the whole thing down to the
 * bottom... The Millionaire Raffle is not to be called a Millionaire Raffle. That's about mental
 * availability in practice. And the 48 one is fame strategies."
 *
 * So each card is titled by the idea or the book, and the brand and the result follow. Every
 * number here is on the page it links to; nothing is typed here that the page does not say.
 */

type Card = {
  kicker: string;
  title: string;
  line: string;
  meta: string;
  cta: string;
  href: string;
  /** A real ad, cropped to 4:3. `top` keeps a face that sits high in a portrait poster. */
  image?: { src: string; alt: string; top?: boolean };
  /** A book cover, shown whole on a plate of the same 4:3 size, so the row lines up. */
  cover?: { src: string; alt: string };
  num?: { big: string; of: string };
};

const CARDS: Card[] = [
  {
    kicker: "Book",
    title: "Run with Foxes",
    line: "Make better marketing decisions. The book on evidence, judgement and acting on both.",
    meta: "Paul Dervan",
    cta: "About the book →",
    href: "/run-with-foxes",
    cover: { src: "/book/cover-run-with-foxes.jpg", alt: "Run with Foxes book cover" },
  },
  {
    kicker: "Book · free",
    title: "The Fox Advantage",
    line: "How teams collapse complexity to run faster. 54 short chapters, free to read here.",
    meta: "Paul Dervan",
    cta: "Read it free →",
    href: "/book",
    cover: { src: "/book/cover-the-fox-advantage.jpg", alt: "The Fox Advantage book cover" },
  },
  {
    kicker: "Case study",
    title: "Mental availability in practice",
    line: "We found the moment people think of a gift to put in a card, and made every frame of the ad about it. The tickets sold out so fast we had to pull the advertising.",
    meta: "Millionaire Raffle · National Lottery · 2019 to 2021",
    cta: "Read the case study →",
    href: "/millionaire-raffle",
    image: { src: "/projects/millionaire-raffle/raffle-social.jpeg", alt: "The Millionaire Raffle social ad: a woman holding a gift envelope" },
    num: { big: "27:1", of: "return on the campaign" },
  },
  {
    kicker: "Case study",
    title: "Fame strategies",
    line: "A mobile network that only 18 to 22 year olds could join, and the ads got banned. Within six months, 63% of young people in Ireland knew it.",
    meta: "48 · O2 Ireland · 2012 to 2014",
    cta: "Read the case study →",
    href: "/48",
    image: { src: "/projects/48/poster.jpeg", alt: "The 48 launch poster: Go Conquer", top: true },
    num: { big: "12%", of: "market share in year one" },
  },
];

export default function Proof() {
  return (
    <section className={`${f.shelf} ${n.fourShelf}`} id="work">
      <div className={n.fourGrid}>
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href} className={n.workCard}>
            {c.image ? (
              <img className={`${n.workImg} ${c.image.top ? n.workImgTop : ""}`} src={c.image.src} alt={c.image.alt} loading="lazy" />
            ) : c.cover ? (
              <div className={n.bookPlate}>
                <img className={n.bookCover} src={c.cover.src} alt={c.cover.alt} loading="lazy" />
              </div>
            ) : null}
            <span className={n.kicker}>{c.kicker}</span>
            <span className={n.workTitle}>{c.title}</span>
            <p className={n.workLine}>{c.line}</p>
            {c.num ? (
              <span className={n.workNum}>
                <b>{c.num.big}</b> {c.num.of}
              </span>
            ) : null}
            <span className={`${f.meta} ${n.workWho}`}>{c.meta}</span>
            <span className={n.doorGo}>{c.cta}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
