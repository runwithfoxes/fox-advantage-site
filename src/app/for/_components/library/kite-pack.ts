import type { FolderDoc } from "./FolderWindow";

// The Kite brand pack, PARKED 9 Aug. It fed the folder window in the Writer
// section until Paul took the folder off the page ("I don't want the folder"):
// the finished writing plus the hover notes carry the point on their own now.
// Kept whole and out of KiteDoc so putting the exhibit back is one import and
// one line, not a rewrite. FolderWindow.tsx is still in the library too.
export const PACK_DOCS: FolderDoc[] = [
  {
    file: "positioning-statement.md",
    label: "Positioning",
    body: [
      "For people who dread the renewal letter, Kite is the car and home insurance that renews itself, because it shops around for you every year and saves EUR 187 on average.",
      "Feeds on the audience, competitors and proof files. Everything downstream traces back to it.",
    ],
  },
  {
    file: "audience.md",
    label: "Audience and insights",
    body: [
      "People who dread the renewal letter and would pay a fair price never to think about it again.",
      "Not the ones who enjoy the haggle. The ones who leave the envelope on the counter for a fortnight and feel slightly worse every time they walk past it.",
    ],
  },
  {
    file: "proof.md",
    label: "Proof points",
    body: [
      "Average saving the first time we shop around for you: EUR 187, all policies renewed in 2025.",
      "Each number carries its source, because a number without one is not proof.",
    ],
  },
  {
    file: "messaging-framework.md",
    label: "Messages",
    body: [
      "Insurance that renews itself, and shops around for you before it does.",
      "Written once, used by everything. Nothing here may contradict the positioning statement.",
    ],
  },
  {
    file: "tone-of-voice.md",
    label: "Tone of voice",
    body: [
      "First person, always. Dry, weary, disbelieving: the sound of the only sane person in the room.",
      "The file the writer reaches for most often, so it lives on its own.",
    ],
  },
  {
    file: "writer-dna.md",
    label: "Working instructions",
    body: [
      "How the writer works with the team: what it reads before writing, how it plans, and the rule that every piece closes with a claims ledger and a source map.",
    ],
  },
  {
    file: "format-email.md",
    label: "Email craft",
    body: [
      "The email frameworks. The writer names which one it is using before it writes, and scores the finished email against it afterwards.",
    ],
  },
];
