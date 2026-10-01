"use client";

import { openDoor } from "@/components/AgentsHero";
import n from "./next.module.css";

/**
 * THE FOUR BUTTONS, straight under the hero. Paul, 25 Sep 2026: "I always liked this section
 * on the original homepage... I'd have consulting as the first button. And I like when I click
 * on agents, the whole page takes over and I can see all the agents like we do currently."
 *
 * Same buttons and the same mechanism as the live hero (AgentsHero.tsx): each one announces a
 * door and AgentsSection, further down this page, drops its full-screen surface and fills it.
 * Contact stays a plain link, as it is on the live site.
 */
export default function DoorButtons() {
  return (
    <div className={n.doorBand}>
      <div className={n.doorRow}>
        <button type="button" className={n.doorPrimary} onClick={() => openDoor("consulting")}>
          Consulting
        </button>
        <button type="button" className={n.doorGhost} onClick={() => openDoor("agents")}>
          AI Agents
        </button>
        <button type="button" className={n.doorGhost} onClick={() => openDoor("training")}>
          Training
        </button>
        {/* Paul, 1 Oct 2026: this went to /about#contact, which lands under the film. "It skips the
            heroes. You don't get to see the nice Quentin Tarantino piece of film." So it lands at
            the top of the page; the bio and Get in touch are the next thing down. */}
        <a className={n.doorGhost} href="/about">
          Contact
        </a>
        {/* Paul, 1 Oct 2026: the site says "the course" in places before anyone has said which
            course. "Beside the word contact, there's a blank space there. We could have in simple
            text font writing but clear, free course AI fluency for ambitious marketers", as the
            pill at the top of the old homepage did. Plain writing, no box, so it does not read as
            a fifth button. */}
        <a className={n.doorCourse} href="/course">
          Free course: AI Fluency for Ambitious{" "}
          {/* the arrow stays with the last word, so it never drops to a line of its own on a phone */}
          <span style={{ whiteSpace: "nowrap" }}>Marketers <span aria-hidden>&rarr;</span></span>
        </a>
      </div>
    </div>
  );
}
