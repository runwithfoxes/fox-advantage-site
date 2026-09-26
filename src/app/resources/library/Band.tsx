import NextNav from "../../home-next/NextNav";
import b from "./band.module.css";

/**
 * THE HEAD BAND of the library, tools and playbooks pages (26 Sep 2026). The Economic Index
 * pattern from BUILD-NOTES: a coloured full-width band, one subject owning the page, the title
 * and its line on one measure. Ours is the site's deep navy, the four-door nav sits in it (its
 * type is white, so it needs a dark ground), the fox takes the module-page float (brand spec:
 * one fox per page, at the top, floated, drop-shadow not box-shadow), and each page hands in
 * its own aside: a figure, a window or a ledger, so the three heads share a system and not a
 * shape.
 *
 * The h1 runs the full column (DOCTRINE 30 Aug: no ch cap, no balance, pretty).
 */
export default function Band({
  kicker,
  title,
  standfirst,
  fox,
  aside,
  below,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  standfirst: string;
  fox: string;
  /** right column, on the phone it drops under the text */
  aside?: React.ReactNode;
  /** full width, under both columns */
  below?: React.ReactNode;
  /** under the standfirst, in the text column */
  children?: React.ReactNode;
}) {
  return (
    <section className={b.band}>
      <NextNav />
      <div className={`${b.inner} ${aside ? b.twoCol : ""}`}>
        <div className={b.text}>
          <img className={b.fox} src={`/fox/${fox}`} alt="" />
          <span className={b.kicker}>/{kicker}</span>
          <h1 className={b.h1}>{title}</h1>
          <p className={b.stand}>{standfirst}</p>
          {children}
        </div>
        {aside ? <div className={b.aside}>{aside}</div> : null}
        {below ? <div className={b.below}>{below}</div> : null}
      </div>
      <p className={b.mock}>Mockup, 26 Sep 2026. Anything tagged Example is made up.</p>
    </section>
  );
}
