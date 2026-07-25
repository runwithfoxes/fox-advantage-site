import type { Metadata } from "next";
import SpecimenClient from "./SpecimenClient";

/**
 * /course/specimen - the artefact catalogue.
 *
 * ⚠️ A WORKBENCH, NOT A PAGE OF THE COURSE. It carries one example of every artefact type
 * and every primitive so the catalogue can be reviewed in one sitting. Nothing on it is
 * Paul's copy. It must never be linked from /course and never indexed.
 *
 * A static segment beats the dynamic [n] route, so this does not collide with /course/1.
 */

export const metadata: Metadata = {
  title: "Artefact catalogue (specimen) - Run with Foxes",
  description:
    "Internal workbench: every artefact type and interactive primitive a course module can be made of, each shown beside the markdown that produces it.",
  robots: { index: false, follow: false },
};

export default function SpecimenPage() {
  return <SpecimenClient />;
}
