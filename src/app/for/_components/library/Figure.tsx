/**
 * A COURSE FIGURE, AS A COMPONENT THAT CAN GO ANYWHERE.
 *
 *     <Figure name="fig-01" />
 *
 * Ported from ~/projects/.rwf-wt-course-modules/src/app/course/figures/Figure.tsx into
 * this repo's prospect-page component library, essentially unchanged: it takes a name
 * and nothing else, and does not know about the page it sits on.
 *
 * The SVG is byte identical to the source figures page and goes in through
 * dangerouslySetInnerHTML. That is deliberate: the content is a generated file in this
 * repo, never user input. Each figure carries its own <defs> and its own <style>,
 * scoped to its own id (#fig-NN), so nothing collides even with several figures on one
 * page.
 *
 * Reduced motion collapses an animation to its finished state; that already lives
 * inside each figure's own CSS and is carried through unchanged.
 *
 * A still that is an animated figure's last frame is not a figure you ask for: some
 * entries have `stillOf` set, meaning they are the frozen twin of an animated figure
 * that already collapses to this under prefers-reduced-motion. Asking for one directly
 * throws in development and names the animated figure to use instead.
 *
 * Data comes from `figures.generated.ts`, copied unchanged from the course worktree.
 * Do not edit that file by hand.
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
  /** The fig-NN label, e.g. "fig-01". */
  name: string;
  className?: string;
}) {
  const fig = FIGURES[name];

  if (!fig) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `<Figure name="${name}"> does not exist. Known figures: ${Object.keys(FIGURES).join(", ")}`,
      );
    }
    return <div className={styles.ppfigureMissing}>This picture is not built yet.</div>;
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
      className={className ? `${styles.ppfigurePlate} ${className}` : styles.ppfigurePlate}
      dangerouslySetInnerHTML={{ __html: fig.svg }}
    />
  );
}
