/**
 * THE SIX. Titles, dates and artefact assignments.
 *
 * ⚠️ THE TITLES ARE PAUL'S, dictated 18 Jul and confirmed by directive in QA-A on
 * 19 Jul. They are not placeholders and carry no mark. Canon: truth/rwf/brief.md
 * SIX-MODULES-TOTAL.THE_SIX_SETTLED. The comma in "Slow, then fast" is his; the
 * numbers live inside the titles because he put them there.
 *
 * The blurbs that sit under each title are unwritten and live in placeholderCopy.ts.
 */

export type Art =
  | { kind: "window"; win: WindowKey }
  | { kind: "video"; src: string; poster: string }
  | { kind: "photo"; src: string }
  | { kind: "none" };

export type WindowKey = "few" | "cal" | "setup" | "adj" | "sys" | "agent" | "hard";

export type Module = {
  n: number;
  title: string;
  when: string;
  /** ISO date the module lands. Drives isLive() and the signup payload. */
  on: string;
  /**
   * ⭐ NOTHING SAYS LIVE UNTIL IT IS LIVE (Paul, 18 Jul; COURSE-BRIEF doctrine 1).
   * A module reads Live only when its date has passed AND it is genuinely built.
   * Never simplify this to a date check - that flips a card to Live whether or not
   * the content exists, which is the fabrication ban by the back door.
   */
  built: boolean;
  art: Art;
};

export const MODULES: Module[] = [
  {
    n: 1,
    title: "(1) The 80/20 of AI",
    when: "Mon 21 Sep",
    on: "2026-09-21",
    built: false,
    /* The grumpy fox beside his headline "20 things that get you 80% of the way".
       Paul's headline verbatim. A statement, not a depiction, so no window chrome
       inside the artefact. */
    art: { kind: "window", win: "few" },
  },
  {
    n: 2,
    title: "(2) Slow, then fast",
    when: "Mon 5 Oct",
    on: "2026-10-05",
    built: false,
    /* The Ladder of marketing metrics, ported from Paul's brief-coach module with
       its tier widths and colours verbatim. The lit rung walks Activity ->
       Commercial and holds: think at the top of the ladder before you spend.

       🔴 THIS ARTEFACT NO LONGER MATCHES THE COPY, AND IT IS LEFT IN ANYWAY.
       Paul picked the ladder himself on 18 Jul, when module 2 was framed around
       thinking-through-strategy. His locked 19 Jul copy is about SETTING WORK UP
       before it starts - research, hallucination defences, defining what good looks
       like - and a metrics pyramid does not meet that sentence.
       An alternative is BUILT and rendered (win: "setup", see ModuleArtefact), but
       swapping it in would be a terminal reversing a decision Paul made himself, off
       a note he has not seen. It waits for him. */
    art: { kind: "window", win: "cal" },
  },
  {
    n: 3,
    title: "(3) Create adjacent value",
    when: "Mon 19 Oct",
    on: "2026-10-19",
    built: false,
    /* ⭐ REAL FOOTAGE, and it is the argument itself. Paul, 18 Jul: "an example of me
       creating video which I couldn't do before." A marketer shipping a film IS
       adjacent value, so this card does not depict the idea, it is the idea. Same
       file the homepage plays. */
    art: { kind: "video", src: "/course/fox-tarantino-trunk.mp4", poster: "/course/fox-tarantino-trunk-poster.jpg" },
  },
  {
    n: 4,
    title: "(4) System thinking",
    when: "Mon 2 Nov",
    on: "2026-11-02",
    built: false,
    /* The Campaign Agent blueprint in miniature - branch and converge, which is what
       "build all the steps in a system" means: the work forks and comes back
       together. Four nodes, not five; "Enrich account" dropped for room. */
    art: { kind: "window", win: "sys" },
  },
  {
    n: 5,
    title: "(5) Building marketing agents",
    when: "Mon 16 Nov",
    on: "2026-11-16",
    built: false,
    /* The Outreach Agent conversation, animated. Paul, 18 Jul: "it can't be static."
       The homepage's mobile relayout is the one to use - it drops the thread list and
       gives the conversation full width, which is both what fits and the half that
       moves. Timings lifted from origin/main, not invented. */
    art: { kind: "window", win: "agent" },
  },
  {
    n: 6,
    title: "(6) Tackle difficult problems",
    when: "Mon 30 Nov",
    on: "2026-11-30",
    built: false,
    /* THE PHONE, for the quantitative deep researcher that does phone calls.
       ⚠️ A stock photograph, not a grab of the researcher running. It depicts the
       idea rather than evidencing a result, which is inside the 18 Jul drawn-window
       ruling - but a PHOTO reads as evidence more readily than a drawing does, so it
       carries no caption and must never imply that call happened. */
    art: { kind: "photo", src: "/course/art/phone-call.jpg" },
  },
];

/** See Module.built. Both conditions, always. */
export function isLive(m: Module, now: Date = new Date()): boolean {
  return m.built && now >= new Date(m.on + "T00:00:00");
}
