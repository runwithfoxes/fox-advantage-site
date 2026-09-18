import type { Turn } from "./chatTypes";

/**
 * BRIEF COACH, ONE RECORDED COACHING SESSION.
 *
 * The live demo from the product page
 * (public/products/module-brief-coach.html, the `STEPS` array) brought into the
 * house chat window so it looks like everything else on this page: rounded
 * frame, the three dots, the person's line as a pill, the coach's reply in
 * plain serif (Paul, 9 Aug: "change the look and feel of the interactions so
 * it's like our new one").
 *
 * WHAT CHANGED IN THE PORT, and nothing else:
 * - The product page revealed one turn per button press. The house window
 *   plays the whole session after one click, which is how both Writer sessions
 *   on this page already behave. A third chat with its own interaction model
 *   would be the odd one out.
 * - Its three pinned callouts (The ladder, The number, The gap) are `audit`
 *   blocks, which is the house component's own labelled-callout block.
 * - Inline emphasis had no equivalent block, so the tags come off and the
 *   words stay.
 *
 * Illustrative, not a real client. The ladder figure above the window is the
 * same ladder the coaching walks up.
 */
export const BRIEF_COACH_SESSION: Turn[] = [
  {
    who: "you",
    text: "I'm briefing a launch campaign for our new product. The objective is to build awareness and consideration with our target buyers. The KPIs are 2 million in reach, a 4% engagement rate, and 1,500 registrations for the launch webinar. Can you pressure-test it before it goes to the agency?",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "Start with the KPIs, before the creative. Reach, engagement and registrations are real and trackable, but they are all communication metrics. They tell you people saw the work and reacted to it. They don't tell you the business moved. None of them is a commercial outcome.",
      },
    ],
  },
  { who: "you", text: "Where should they sit?" },
  {
    who: "writer",
    blocks: [
      {
        kind: "audit",
        label: "The ladder.",
        text: "Marketing goals stack up in rungs. At the top, commercial: profit and revenue, the only true business goal. Below it, customer behaviour: more buyers, buying more often, or spending more each time. Below that, memory: whether you come to mind when someone is in the market. Then communication, where your three KPIs sit. At the bottom, activity: budget spent, impressions bought, assets shipped, the spend and effort going in, not an outcome coming out.",
      },
      {
        kind: "p",
        text: "Your brief is measuring the bottom two rungs. What does this launch need to move, commercially?",
      },
    ],
  },
  { who: "you", text: "New customers for the product." },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "That is customer behaviour, winning new buyers, one rung below commercial. This campaign can own that. It needs a number you can be judged on. It could be 5,000 new customers, or penetration from 12% to 14%, or two million of new revenue influenced. Which one does this campaign own, and what is the figure?",
      },
    ],
  },
  {
    who: "you",
    text: "5,000 new customers in the first quarter after launch.",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "audit",
        label: "The number.",
        text: "Test it before it goes in. Is there a benchmark behind 5,000, a past launch or a comparable, or is it a first estimate? And if it comes in 10% short, did the campaign fail? If you would still call 4,500 a win, then 5,000 is not the real bar.",
      },
    ],
  },
  {
    who: "you",
    text: "It's a first estimate. We haven't launched anything quite like this.",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "Then don't invent a benchmark, and don't drop the target. Write it in plainly: no prior benchmark, 5,000 is a best estimate, it may be wrong. That makes the uncertainty a decision now, before the spend, instead of a number people treat as fact later.",
      },
    ],
  },
  { who: "you", text: "Fair. I'll flag it as an estimate." },
  {
    who: "writer",
    blocks: [
      {
        kind: "audit",
        label: "The gap.",
        text: "One thing is still missing. Your KPIs cover communication, but nothing covers memory, whether the new product actually comes to mind for these buyers afterwards. That is what tells you if the launch built anything lasting. Right now there is no measure for it.",
      },
    ],
  },
  {
    who: "you",
    text: "So: 5,000 new customers in Q1, flagged as an estimate, plus a measure of whether the product is coming to mind.",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "That is a brief with a spine. A commercial behaviour at the top with a number you can be judged on, the missing benchmark flagged, and a memory measure underneath. Your reach and registrations stay, as the things you watch on the way, not the goal itself. You wrote it, not me. I gave you the ladder and the questions.",
      },
    ],
  },
];
