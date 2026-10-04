import b from "./big.module.css";

/**
 * THE BIG PARTS. Paul, 3 Oct, late: "i want big visuals... taking over sections of the page (not
 * the rail). images from campaigns, ads... Think very very big and beautiful. Look at how system1
 * do their reports." System1's reports (the Cannes "Testing in the Lions' Den", the Creator
 * Effectiveness Playbook) open each part on a full page of one flat colour with a huge headline and
 * a photograph, put one claim on a page in very large type, and show the work they talk about as
 * big stills. These are that, in our colours: sky, deep navy, orange, white.
 *
 * Every part here runs the full width of the window, over the rail.
 *
 * Paul, 4 Oct, on the first night's build: "I see lots of colour blocks but I wanted to see artwork
 * from advertising", then "I don't want big block colours if they make this feel off brand", then "be
 * an art director here. Crop and make them look brilliant, go for impact but also be selective and
 * not throw them all there on top of each other. Curate." So there are no slabs of colour, and the
 * pictures are few, large and placed by hand in art.json, each with its crop and focal point. A
 * picture is only ever a campaign the report quotes or names in that chapter, and it carries a line
 * saying what it is. Nothing here fills a slot by rule.
 */

export type Pic = { brand?: string; file: string; size: number[]; label: string; fit?: string; pos?: string };
export type Tone = "navy" | "sky" | "orange" | "white";

const BASE = "/resources/the-winning-paper/2026-10/cases/";

function Picture({ pic, eager }: { pic: Pic; eager?: boolean }) {
  return (
    <span className={`${b.pic} ${pic.fit === "contain" ? b.picWhole : ""}`}>
      <img src={BASE + pic.file} alt={pic.label} width={pic.size[0]} height={pic.size[1]} loading={eager ? "eager" : "lazy"} style={pic.pos ? { objectPosition: pic.pos } : undefined} />
      <span className={b.picCap}>{pic.label}</span>
    </span>
  );
}

/** A chapter opens: its number, its title and what to do, on one colour, beside a campaign from the chapter. */
export function Opener({ id, n, title, label, doThis, pic, tone }: { id: string; n: number; title: string; label?: string; doThis?: string; pic?: Pic; tone: Tone }) {
  return (
    <header className={`${b.bleed} ${b.opener} ${b[tone]} ${pic ? "" : b.openerBare}`} id={id}>
      <div className={b.openerWords}>
        <span className={b.openerN} aria-hidden>
          {n}
        </span>
        <span className={b.kick}>Chapter {n}</span>
        <h2 className={b.openerTitle}>{title}</h2>
        {doThis ? (
          <p className={b.openerDo}>
            <span>{label}</span>
            {doThis}
          </p>
        ) : null}
      </div>
      {pic ? <Picture pic={pic} eager={n === 1} /> : null}
    </header>
  );
}

/** One line of the chapter, set large beside an ad from the chapter. With no ad to show it is a flat band. */
export function PullBand({ text, tone, pic, flip }: { text: string; tone: Tone; pic?: Pic; flip?: boolean }) {
  // a line of two sentences breaks after the first, so the turn in it lands at the start of a line
  const parts = text.match(/[^.?!]+[.?!]+/g) ?? [text];
  return (
    <aside className={`${b.bleed} ${b.pull} ${b[tone]} ${pic ? b.pullPic : ""} ${flip ? b.flip : ""}`}>
      {pic ? <Picture pic={pic} /> : null}
      <p className={b.pullText}>
        {parts.map((s, i) => (
          <span key={i} className={i === parts.length - 1 && parts.length > 1 ? b.pullTurn : undefined}>
            {s.trim()}{" "}
          </span>
        ))}
      </p>
    </aside>
  );
}

/** One ad in the reading column at the column's full width, the way an essay carries its picture
 *  (Paul, 4 Oct: "can they fit as big square in content of page like I do essays sometimes"). It
 *  needs a file about 1,200 wide, not one that can fill a window, so far more of the real ads qualify. */
export function ColumnArt({ pic, eager, where }: { pic: Pic; eager?: boolean; where?: { n: string; href: string } }) {
  return (
    <figure className={`${b.colArt} ${pic.size[1] > pic.size[0] * 1.15 ? b.colArtTall : ""}`}>
      <img src={BASE + pic.file} alt={pic.label} width={pic.size[0]} height={pic.size[1]} loading={eager ? "eager" : "lazy"} />
      <figcaption>
        {pic.label}
        {where ? (
          <>
            {" · "}
            <a href={where.href}>quoted in {where.n}</a>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}

/** One ad on its own, across the whole window, with its line. Placed by hand where the chapter earns it. */
export function Plate({ pic }: { pic: Pic }) {
  return (
    <figure className={`${b.bleed} ${b.plate} ${pic.fit === "contain" ? b.plateWhole : ""}`}>
      <img src={BASE + pic.file} alt={pic.label} width={pic.size[0]} height={pic.size[1]} loading="lazy" style={pic.pos ? { objectPosition: pic.pos } : undefined} />
      <figcaption>{pic.label}</figcaption>
    </figure>
  );
}

/** A quoted case with its campaign: the picture at its own shape in one half, the paper's words in the other. */
export function CaseBand({ pic, brand, award, quote, why, href, link, tone, flip }: { pic: Pic; brand: string; award: string; quote: string; why: string; href?: string; link?: string; tone: Tone; flip?: boolean }) {
  const tall = pic.size[1] > pic.size[0] * 0.9;
  return (
    <figure className={`${b.bleed} ${b.caseBand} ${b[tone]} ${flip ? b.flip : ""} ${tall ? b.caseTall : ""}`}>
      <Picture pic={pic} />
      <div className={b.caseWords}>
        <span className={b.caseWho}>
          <b>{brand}</b>
          <em>{award}</em>
        </span>
        <blockquote className={b.caseQuote}>{quote}</blockquote>
        <figcaption className={b.caseWhy}>
          {why}{" "}
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {link} &rarr;
            </a>
          ) : null}
        </figcaption>
      </div>
    </figure>
  );
}

/** Lines quoted from the papers, as a plain list in the reading column: the line, then who wrote it.
 *  Paul, 4 Oct, on these as a wall of big cards: "where's the restraint that we get when we look at
 *  the beginning of the report?... we've just chucked a load of big boxes everywhere". So no boxes,
 *  no big type, no full width. It reads as part of the text. */
export function Wall({ items }: { items: { key: string; q: string; brand: string; award: string }[]; tone?: Tone }) {
  return (
    <ul className={b.quotes}>
      {items.map((it) => (
        <li key={it.key}>
          <q>{it.q}</q>
          <span>
            <b>{it.brand}</b>
            <em>{it.award}</em>
          </span>
        </li>
      ))}
    </ul>
  );
}
