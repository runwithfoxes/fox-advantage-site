import b from "./big.module.css";

/**
 * THE BIG PARTS. Paul, 3 Oct, late: "i want big visuals... taking over sections of the page (not
 * the rail). images from campaigns, ads... Think very very big and beautiful. Look at how system1
 * do their reports." System1's reports (the Cannes "Testing in the Lions' Den", the Creator
 * Effectiveness Playbook) open each part on a full page of one flat colour with a huge headline and
 * a photograph, put one claim on a page in very large type, and show the work they talk about as
 * big stills. These are that, in our colours: sky, deep navy, orange, white.
 *
 * Every part here runs the full width of the window, over the rail. Words never sit on a picture:
 * the picture has its own half and the words have a flat colour. A picture is only ever a campaign
 * the report quotes or names at that point, and it carries a line saying what it is.
 */

export type Pic = { id: string; brand: string; aliases?: string[]; file: string; size: number[]; label: string; fit?: string };
export type Tone = "navy" | "sky" | "orange" | "white";

const BASE = "/resources/the-winning-paper/2026-10/cases/";

function Picture({ pic, eager }: { pic: Pic; eager?: boolean }) {
  return (
    <span className={`${b.pic} ${pic.fit === "contain" ? b.picWhole : ""}`}>
      <img src={BASE + pic.file} alt={pic.label} width={pic.size[0]} height={pic.size[1]} loading={eager ? "eager" : "lazy"} />
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

/** One line of the chapter, set as large as the window allows, on a flat colour. */
export function PullBand({ text, tone }: { text: string; tone: Tone }) {
  // a line of two sentences breaks after the first, so the turn in it lands at the start of a line
  const parts = text.match(/[^.?!]+[.?!]+/g) ?? [text];
  return (
    <aside className={`${b.bleed} ${b.pull} ${b[tone]}`}>
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

/** A wall of lines from the papers. Short lines are set big, long ones smaller; the tiles take turns in colour. */
export function Wall({ items, pics, tone }: { items: { key: string; q: string; brand: string; award: string }[]; pics: (key: string) => Pic | undefined; tone: Tone }) {
  const tiles: Tone[] = tone === "navy" ? ["white", "sky", "orange", "white", "sky"] : ["navy", "sky", "white", "orange", "white"];
  let shown = 0;
  return (
    <section className={`${b.bleed} ${b.wall} ${b[tone]} ${items.length <= 4 ? b.wallFew : ""}`}>
      <div className={b.wallIn}>
        {items.map((it, i) => {
          const size = it.q.length < 48 ? b.tBig : it.q.length < 110 ? b.tMid : b.tSmall;
          // a picture on at most three tiles of a wall, so the words stay the point
          const pic = shown < 3 ? pics(it.key) : undefined;
          if (pic) shown++;
          return (
            <figure key={it.key} className={`${b.tile} ${b["t_" + tiles[i % tiles.length]]} ${size}`}>
              {pic ? (
                <span className={b.tilePic}>
                  <img src={BASE + pic.file} alt={pic.label} width={pic.size[0]} height={pic.size[1]} loading="lazy" />
                </span>
              ) : null}
              <blockquote>{it.q}</blockquote>
              <figcaption>
                <b>{it.brand}</b>
                <em>{it.award}</em>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
