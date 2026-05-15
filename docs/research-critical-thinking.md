# Module 01 Strategy — Critical Thinking Assistant (research report)

**For:** wireframe-map.html, Module 01 Strategy, as a new sub-item alongside the existing experts panel.

**Status:** Skill built and live at `~/.claude/skills/critical-thinking/`. Triggered by "/critical-thinking", "I'm stuck", "help me get unstuck", "best practices aren't working", etc.

---

## What the tool actually does

It's a friction creator, not a fixer. Someone shows up circling the same idea, drowning in options, or trapped in inherited assumptions. The tool diagnoses what *type* of stuck they're in, then hands them two or three mental tools calibrated to that stuckness. It walks them through whichever one they pick. They leave sharper, with a reusable pattern.

Five tools in the kit:

- **River Jumping** — breaks category blinders. Steals ideas from 30+ unrelated fields (street performer, courtroom lawyer, stand-up comic, shipping port, coalition government).
- **Start From Scratch** — breaks assumption stacking. Rebuilds from the human problem and actual resources, ignoring everything you've tried.
- **Fix the Choke Point** — breaks scattered effort. Finds the one bottleneck creating most of the downstream pain.
- **It's Just a Model** — breaks blind faith in frameworks. Surfaces the hidden assumptions under your current plan.
- **SCAMPER Remix** — breaks idea fatigue. Forces remixing through Substitute/Combine/Adapt/Modify/Put-to-other-use/Eliminate/Reverse.

## What it takes as input

One sentence. "In one sentence, what's not moving?" That's it to start. It listens for the mental loop, not the problem itself. Then optionally: context on what you've tried, what your constraints are, what your current approach is. No forms. No uploads. Just conversation.

## What it produces

- A diagnosis of the stuck pattern (named out loud so you can see it)
- Two or three tools that match, with one-line descriptions
- A guided walkthrough of the chosen tool — 5 or 6 steps of specific questions
- A "labelled move" at the end — "here's what just happened, here's the pattern you broke, here's the technique that broke it"
- A small test to run this week

The point isn't a solution. The point is a new lens, and a reusable mental tool you can pull out next time.

## Real example

Someone says: "We've tried everything on this positioning brief and nothing's landing." That's the "Start From Scratch" signal. The tool offers:

- River Jumping — see how other industries handle differentiation
- Start From Scratch — rebuild from the human problem
- It's Just a Model — surface what assumptions your positioning makes

They pick Start From Scratch. The tool walks them through six steps: find the human problem, separate facts from assumptions, define perfect outcome, fresh resource inventory, rebuild logic, test one assumption. Forty minutes later they've spotted that three of their "constraints" weren't real — they were just things the team had always done. One assumption test goes out next week.

## Suggested placement on the wireframe

Module 01 Strategy already has the experts panel (four personas → /experts). This is a second sub-item under the same module. Pattern mirrors modules 5 and 9 — one header, two sub-items:

- **01A — The experts panel** (existing — discovery, diagnosis, hypotheses)
- **01B — The unstuck protocol** (new — when the team is circling, the brief feels flat, or best practices aren't working)

Right-side visual suggestion: a small card showing the 5 tools as a menu, or the "types of stuck → tool match" table. CTA could be "/critical-thinking" once Paul has a public-facing version.

**Voice reminder for copy:** Paul's words. Pub voice. No hype. No framework names in the copy (no "SCAMPER", no "River Jumping" as branded terms — describe what they do in plain English). Never use "scrape".

## Files

- Source text: `~/Downloads/The Critical Thinking Assistant_ Complete Unstuck Protocol.txt`
- Skill: `~/.claude/skills/critical-thinking/SKILL.md`
- Workshop steps: `~/.claude/skills/critical-thinking/references/workshops.md`
- River library: `~/.claude/skills/critical-thinking/references/river-library.md`
