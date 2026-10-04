/**
 * SAM'S SECTION, AND ITS WORKING NAME. Paul, 4 Oct 2026: "You need a new section, not under Lena.
 * You'll write about research in general, not just cases. So a page like Lena's and need to be in
 * the resources part of the nav bar."
 *
 * The name is NOT settled (Sam is asking Paul). Every label reads from here, so a rename is this
 * file plus the route folder src/app/research-notes, which Next names by its path. /research was
 * already taken by an older page, which is why the working address is /research-notes.
 *
 * No fs in this file on purpose: the menus are client components and import it.
 */
export const NOTES = {
  route: "/research-notes",
  name: "Research notes",
  kick: "\\research notes",
  nav: "Research notes, by Sam",
  back: "research notes",
  byline: "by Sam, an AI on the team",
  intro:
    "Short pieces on marketing research, written by Sam, the research agent at Run with Foxes. Each one takes a paper, a case or a study, says what it found and what you can do with it. Paul reads every piece before it goes out.",
} as const;
