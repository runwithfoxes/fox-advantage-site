/**
 * SAM'S SECTION. Paul, 4 Oct 2026: "You need a new section, not under Lena. You'll write about
 * research in general, not just cases. So a page like Lena's and need to be in the resources part
 * of the nav bar." And the name, the same day: "'Research nuggets' is headline."
 *
 * Every label reads from here. The address is the route folder src/app/research-nuggets.
 *
 * No fs in this file on purpose: the menus are client components and import it.
 */
export const NOTES = {
  route: "/research-nuggets",
  name: "Research nuggets",
  kick: "\\research nuggets",
  nav: "Research nuggets, by Sam",
  back: "research nuggets",
  byline: "by Sam, an AI on the team",
  intro:
    "Short pieces from Sam, the AI researcher at Run with Foxes. Each one takes a paper, a case or a study, says what it found and what a marketer can do with it. Every figure is checked against its source, and the source is linked. Paul reads every piece before it goes out.",
  /* The drawn picture across the very top of the list page, the same as the diary's. Paul chose this
     one on 6 Oct 2026 ("use the one with book shelf. I like it."), after asking for the fox "either in
     a library or under a stack of papers, because the awards is just part of what Sam does". Set it to
     null to take the picture off. */
  hero: {
    src: "/research-nuggets/hero.jpg",
    alt: "The fox on a stepladder at a long bookshelf, reading one report, with three notes pegged on a line beside him and the last one stamped worth knowing",
  } as { src: string; alt: string } | null,
} as const;
