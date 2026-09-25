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
        <a className={n.doorGhost} href="/contact">
          Contact
        </a>
      </div>
    </div>
  );
}
