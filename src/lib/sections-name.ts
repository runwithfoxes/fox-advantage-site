/**
 * TWO MORE WRITERS' SECTIONS, each "a page like Lena's". Paul, 11 Oct 2026: "We have a new agent
 * called Dean. He writes essays on culture. I'd like you to set up a page for him now on website, so
 * he can join our growing list of contributors." And to Dray in the same breath: "I'd like you to be
 * a contributor. with your own page."
 *
 * Dean's name is Paul's own (9 Oct 2026: "Caught our eye"), and so is the shape: "You'll have your
 * own essays page similar to Lena, me and Sam... Our homepage needs to pick up on yours and you'll
 * need to be a named contributor in our about section." Dean's other words come from his job file,
 * paul-hub/team/dean.md. Dray's section name and words are Dray's first pass, for Paul to change.
 *
 * Every label reads from here. No fs in this file on purpose: the menus are client components.
 */
export interface Section {
  key: "caught" | "dray";
  /** the folder under src/content, and the route folder under src/app */
  dir: string;
  route: string;
  name: string;
  kick: string;
  nav: string;
  back: string;
  byline: string;
  who: string;
  /** the word for one piece in the homepage's what's new list */
  type: string;
  intro: string;
  /** a sentence for a piece with no dek: the page description, the share card and the structured data */
  fallback: string;
  hero: { src: string; alt: string } | null;
}

export const CAUGHT: Section = {
  key: "caught",
  dir: "caught-our-eye",
  route: "/caught-our-eye",
  name: "Caught our eye",
  kick: "\\caught our eye",
  nav: "Caught our eye, by Dean",
  back: "caught our eye",
  byline: "by Dean, an AI on the team",
  who: "Dean",
  type: "Caught our eye",
  intro:
    "Things that are taking off in culture, anywhere in the world and in any interest, found by Dean, the AI on the culture desk at Run with Foxes. Each piece shows the thing itself, its numbers and its back story. Dean is a curator and gives no opinion on it. Paul reads every piece before it goes out.",
  fallback: "something that caught our eye at Run with Foxes.",
  /* Paul chose the subject on 11 Oct 2026 from Dray's ideas: "Dean go with 1, the gig." Set to null to take it off. */
  hero: {
    src: "/caught-our-eye/hero.jpg",
    alt: "A crowd at a gig all hold their phones up to film the stage. The fox stands among them facing the other way, watching a lone skateboarder do a trick on a rail",
  },
};

export const DRAY: Section = {
  key: "dray",
  dir: "how-we-made-it",
  route: "/how-we-made-it",
  name: "How we made it",
  kick: "\\how we made it",
  nav: "How we made it, by Dray",
  back: "how we made it",
  byline: "by Dray, an AI on the team",
  who: "Dray",
  type: "How we made it",
  intro:
    "Short pieces from Dray, the AI creative director at Run with Foxes. Each one shows a piece of our work, an ad, a film, a chart or a page, and how it was made. Paul reads every piece before it goes out.",
  fallback: "a short piece on how we made something at Run with Foxes.",
  /* Paul, the same message: "For you, go with 2, the edit desk." Set to null to take it off. */
  hero: {
    src: "/how-we-made-it/hero.jpg",
    alt: "The fox sits at a wooden edit desk with a lamp, a clapperboard and scissors. Six small pictures of himself hang pegged on a string beside him, and a bar chart stands on an easel",
  },
};

export const SECTIONS: Section[] = [CAUGHT, DRAY];
