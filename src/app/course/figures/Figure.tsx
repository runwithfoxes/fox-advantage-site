/**
 * A COURSE FIGURE, AS A COMPONENT THAT CAN GO ANYWHERE.
 *
 *     <Figure name="fig-14" />
 *
 * ⭐ THE POINT OF THIS FILE IS THAT IT IS NOT COUPLED TO THE MODULE PAGE. It takes a
 * name and a width and nothing else. It does not know about items, about `grab`, about
 * accordions, or about the module layout. Paul said on 25 Jul that he is not wedded to
 * that page, so a figure that only works inside today's item structure would be work
 * with a shelf life of about a day. Drop this in an item, beside prose, in a different
 * page, at whatever width, and it is correct.
 *
 * ⭐ THE SVG IS BYTE IDENTICAL to the figures page and goes in through
 * dangerouslySetInnerHTML. That is deliberate and it is the safe choice here: the
 * content is a file in Paul's own repo, generated at build time, never user input.
 * Hand-converting SVG to JSX means translating class, stroke-width, clip-path,
 * flood-opacity and about forty more attributes, and that is precisely where a port
 * silently loses a shadow.
 *
 * ⛔ EACH FIGURE CARRIES ITS OWN <defs> AND ITS OWN <style>, scoped to its own id.
 * Nothing is hoisted to a page level however tempting, because the video terminal lifts
 * single figures out for MP4 export and a hoisted filter leaves them with no shadow.
 *
 * REDUCED MOTION collapses an animation to its finished state. That already lives inside
 * each figure's own CSS and is carried through by the extractor. Do not reimplement it.
 * ⚠️ fig-24 and fig-25 are strips: they pan along a track and have no finished state, so
 * reduced motion parks them on card one of four. They are not wired to anything yet.
 *
 * ⛔ A STILL THAT IS AN ANIMATED FIGURE'S LAST FRAME IS NOT A FIGURE YOU ASK FOR.
 * fig-13 and fig-14 are one figure in two renderings (figures terminal, 25 Jul), and the
 * animated one already collapses to the still under prefers-reduced-motion. Asking for the
 * still gets you a picture that can never animate, so it throws in development and names
 * the one to use instead. The pairing is derived by the extractor, never hand listed.
 *
 * The data comes from `figures.generated.ts`, written by `scripts/extract-figures.py`.
 * ⛔ Never edit that file. Change the figure on the figures page and re-run the script.
 */

import styles from "./Figure.module.css";
import { FIGURES } from "./figures.generated";

export function figureExists(name: string): boolean {
  return name in FIGURES;
}

export function Figure({
  name,
  className,
}: {
  /** The fig-NN label the figures page prints, e.g. "fig-14". */
  name: string;
  className?: string;
}) {
  const fig = FIGURES[name];

  if (!fig) {
    /* Loud in development, because a name that does not resolve is a typo or a figure
       that got renamed, and both want fixing at once. Quiet in production, because a
       member should never meet a stack trace over a missing picture. */
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `<Figure name="${name}"> does not exist. Known figures: ${Object.keys(FIGURES).join(", ")}`,
      );
    }
    return <div className={styles.missing}>This picture is not built yet.</div>;
  }

  if (fig.stillOf && process.env.NODE_ENV !== "production") {
    throw new Error(
      `<Figure name="${name}"> is the still of ${fig.stillOf}, not a figure of its own. ` +
        `Use name="${fig.stillOf}": it renders animated and collapses to exactly this ` +
        `still under prefers-reduced-motion.`,
    );
  }

  return (
    <div
      className={className ? `${styles.plate} ${className}` : styles.plate}
      dangerouslySetInnerHTML={{ __html: fig.svg }}
    />
  );
}
