"use client";

/**
 * /course/specimen - the artefact catalogue, rendered.
 *
 * One page carrying a real, working example of every artefact type and every interactive
 * primitive, each shown NEXT TO THE MARKDOWN THAT PRODUCED IT. That pairing is the point:
 * Paul reviews the catalogue once, and after that a module is data.
 *
 * ⚠️ NOT A MODULE. Never linked from /course, never indexed, and no copy in here is Paul's.
 * ⭐ TIER 1 THROUGHOUT. Every primitive is rules over data. Nothing calls a model.
 */

import { useMemo, useState } from "react";
import {
  ASSEMBLE,
  CARRIES,
  CLASSIFY,
  COMPARE,
  GUESSES,
  HUNDRED,
  PRIMITIVES,
  TUNE,
  VERBS,
} from "./artefacts";

/* ------------------------------------------------------------------ */
/* The wrapper every specimen shares.                                  */
/* ------------------------------------------------------------------ */

function Spec({
  n,
  badge,
  title,
  body,
  intake,
  cost,
  children,
}: {
  n: string;
  badge: string;
  title: string;
  body: string;
  intake: string;
  cost: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mod-item" id={`spec-${n}`}>
      <div className="mod-itemtop">
        <span className="mod-n">{n}</span>
        <span className="mod-type">{badge}</span>
        <h3 className="mod-h3">{title}</h3>
      </div>
      <p className="mod-body">{body}</p>
      {children}
      <div className="spec-intake">
        <div className="spec-intakehead">
          <span>How it gets in</span>
          <b>markdown</b>
        </div>
        <pre>{intake}</pre>
        <div className="spec-cost">
          What it costs you: <b>{cost}</b>
        </div>
      </div>
    </section>
  );
}

function Group({ h, d }: { h: string; d: string }) {
  return (
    <div className="spec-group">
      <p className="spec-grouph">{h}</p>
      <p className="spec-groupd">{d}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PRIMITIVE 1 - tune and keep                                         */
/* ------------------------------------------------------------------ */

function Tune() {
  const [pos, setPos] = useState<Record<string, number>>({ audience: 0, length: 0, register: 0 });
  const values = useMemo(
    () => Object.fromEntries(TUNE.vars.map((v) => [v.key, v.steps[pos[v.key]]])),
    [pos],
  );
  const [copied, setCopied] = useState(false);
  const out = TUNE.build(values as Record<string, string>);

  return (
    <div className="spec-tune">
      {TUNE.vars.map((v) => (
        <div className="spec-tunerow" key={v.key}>
          <span className="spec-tunelbl">{v.label}</span>
          <input
            type="range"
            min={0}
            max={v.steps.length - 1}
            step={1}
            value={pos[v.key]}
            aria-label={v.label}
            onChange={(e) => setPos((p) => ({ ...p, [v.key]: Number(e.target.value) }))}
          />
          <span className="spec-tuneval">{pos[v.key] + 1} of {v.steps.length}</span>
        </div>
      ))}
      <div className="spec-tuneout">
        <pre>{out}</pre>
      </div>
      <div className="spec-runbar">
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(out);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
        >
          {copied ? "Copied" : "Copy this"}
        </button>
        <span>You leave with a template you did not arrive with.</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PRIMITIVE 2 - one by hand, then a hundred                           */
/* ------------------------------------------------------------------ */

function Hundred() {
  const [picked, setPicked] = useState<string | null>(null);
  const [ran, setRan] = useState(false);
  const fixed = picked === HUNDRED.options.find((o) => o.right)?.key;
  const bad = fixed ? HUNDRED.badFixed : HUNDRED.badUnfixed;

  /* Deterministic spread, so the same choice always draws the same grid. */
  const cells = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < 100; i++) out.push((i * 37) % 100 < bad ? 1 : 0);
    return out;
  }, [bad]);

  return (
    <div className="spec-hundred">
      <div className="spec-hand">
        <p className="spec-handq">The brief, as it would be sent</p>
        <ol className="spec-brief">
          {HUNDRED.brief.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ol>
        <p className="spec-handq" style={{ marginTop: 18 }}>
          {HUNDRED.question}
        </p>
        <div className="spec-chips">
          {HUNDRED.options.map((o) => (
            <button
              key={o.key}
              type="button"
              className="spec-chip"
              aria-pressed={picked === o.key}
              onClick={() => {
                setPicked(o.key);
                setRan(false);
              }}
            >
              {o.text}
            </button>
          ))}
        </div>
      </div>
      {ran && (
        <div className="spec-grid100" aria-hidden="true">
          {cells.map((c, i) => (
            <span className="spec-cell" data-hit={c} key={i} />
          ))}
        </div>
      )}
      <div className="spec-runbar">
        <button type="button" disabled={!picked} onClick={() => setRan(true)}>
          Run the same brief 100 times
        </button>
        {ran ? (
          <span>
            <b>{bad} of 100</b> landed badly. {fixed ? HUNDRED.fixedNote : HUNDRED.unfixedNote}
          </span>
        ) : (
          <span>{picked ? "Now watch it run." : "Pick a line first."}</span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PRIMITIVE 3 - compare, commit, reveal                               */
/* ------------------------------------------------------------------ */

function CompareCommit() {
  const [choice, setChoice] = useState<"a" | "b" | null>(null);
  return (
    <>
      <div className="spec-pair">
        {(["a", "b"] as const).map((k) => (
          <button
            key={k}
            type="button"
            className="spec-opt"
            aria-pressed={choice === k}
            onClick={() => setChoice(k)}
          >
            <span className="spec-optlbl">Option {k.toUpperCase()}</span>
            <p className="spec-opttext">{COMPARE[k]}</p>
          </button>
        ))}
      </div>
      {choice && (
        <div className="spec-reveal">
          <p className="spec-revealh">
            You picked {choice.toUpperCase()}. Now the view you could not see before you committed.
          </p>
          <p className="spec-revealt">{COMPARE.expert}</p>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* PRIMITIVE 4 - classify each line                                    */
/* ------------------------------------------------------------------ */

function Classify() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const right = CLASSIFY.lines.filter((l, i) => answers[i] === l.key).length;

  return (
    <div className="spec-classify">
      {CLASSIFY.lines.map((l, i) => (
        <div className="spec-line" key={i}>
          <p className="spec-linetext">{l.text}</p>
          <div className="spec-tags">
            {CLASSIFY.tags.map((t) => (
              <button
                key={t}
                type="button"
                className="spec-tag"
                aria-pressed={answers[i] === t}
                onClick={() => {
                  setAnswers((a) => ({ ...a, [i]: t }));
                  setChecked(false);
                }}
              >
                {t}
              </button>
            ))}
            {checked && answers[i] && (
              <span className="spec-mark" data-ok={answers[i] === l.key ? 1 : 0}>
                {answers[i] === l.key ? "right" : `it is ${l.key}`}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="spec-runbar">
        <button
          type="button"
          disabled={Object.keys(answers).length < CLASSIFY.lines.length}
          onClick={() => setChecked(true)}
        >
          Check
        </button>
        <span>
          {checked
            ? `${right} of ${CLASSIFY.lines.length}. The invented one is the only one that matters.`
            : "Tag every line, then check."}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PRIMITIVE 5 - ranked guesses                                        */
/* ------------------------------------------------------------------ */

function Guesses() {
  const [text, setText] = useState("");
  const hit = useMemo(() => {
    const t = text.toLowerCase();
    if (t.trim().length < 3) return null;
    return GUESSES.find((g) => g.match.some((m) => t.includes(m))) ?? null;
  }, [text]);

  return (
    <div className="spec-guess">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type what you want it to do..."
        aria-label="Type what you want it to do"
      />
      {hit ? (
        <div className="spec-ranks">
          {hit.guesses.map(([g, p], i) => (
            <div className="spec-rank" key={g}>
              <span className="spec-rankn">{i + 1}</span>
              <span className="spec-ranktext">{g}</span>
              <span className="spec-rankpct">{Math.round(p * 100)}%</span>
              <span className="spec-rankbar" style={{ gridColumn: 2 }}>
                <i style={{ width: `${p * 100}%` }} />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="spec-guessempty">
          {text.trim().length < 3
            ? "Try email, positioning, or report."
            : "Nothing matches yet. Ranked guesses beat a verdict, because they show what it thinks you meant."}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PRIMITIVE 6 - drag to assemble                                      */
/* ------------------------------------------------------------------ */

function Assemble() {
  const [placed, setPlaced] = useState<string[]>([]);
  const [over, setOver] = useState(false);
  const bank = ASSEMBLE.blocks.filter((b) => !placed.includes(b.key));
  const wrong = placed.filter((k) => !ASSEMBLE.blocks.find((b) => b.key === k)?.belongs).length;

  return (
    <>
      <div className="spec-drag">
        <div className="spec-bank">
          <p className="spec-bankh">Blocks</p>
          <div className="spec-blocks">
            {bank.map((b) => (
              <div
                key={b.key}
                className="spec-block"
                draggable
                tabIndex={0}
                role="button"
                onDragStart={(e) => e.dataTransfer.setData("text/plain", b.key)}
                onClick={() => setPlaced((p) => [...p, b.key])}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlaced((p) => [...p, b.key]);
                  }
                }}
              >
                {b.text}
              </div>
            ))}
            {bank.length === 0 && <p className="spec-dropempty">Bank empty.</p>}
          </div>
        </div>
        <div
          className="spec-target"
          data-over={over ? 1 : 0}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            const k = e.dataTransfer.getData("text/plain");
            if (k) setPlaced((p) => (p.includes(k) ? p : [...p, k]));
          }}
        >
          <p className="spec-bankh">{ASSEMBLE.target}</p>
          <div className="spec-blocks">
            {placed.map((k) => {
              const b = ASSEMBLE.blocks.find((x) => x.key === k)!;
              return (
                <div
                  key={k}
                  className="spec-block"
                  data-placed="1"
                  role="button"
                  tabIndex={0}
                  onClick={() => setPlaced((p) => p.filter((x) => x !== k))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPlaced((p) => p.filter((x) => x !== k));
                    }
                  }}
                >
                  {b.text}
                </div>
              );
            })}
            {placed.length === 0 && (
              <p className="spec-dropempty">Drag a block here, or click one. Click again to remove it.</p>
            )}
          </div>
        </div>
      </div>
      <div className="spec-runbar">
        <span>
          {placed.length === 0
            ? "Four of these six belong."
            : wrong === 0
              ? `${placed.length} placed, none of them wasted.`
              : `${placed.length} placed. ${wrong} of them does nothing for the output.`}
        </span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* THE PAGE                                                            */
/* ------------------------------------------------------------------ */

/**
 * ⭐ THE RAIL IS NOT DECORATION HERE, IT IS THE TEST.
 * Measured 25 Jul on /course/1: shell 1180, grid 1124, rail 320, and a real module item is
 * 748px wide. The first cut of this page ran full width at 1124, so every artefact was
 * being judged 376px wider than it will ever be. Paul caught it. Anything that only works
 * at 1124 does not work.
 */
const INDEX: [string, string][] = [
  ["01", "Your words, nothing asked for"],
  ["02", "Words to copy into a model"],
  ["03", "An action in their own account"],
  ["04", "How an image becomes an image"],
  ["05", "How a video becomes a video"],
  ["06", "A file they leave with"],
  ["07", "Someone else's work, pointed at"],
  ["08", "Move three sliders, leave with something"],
  ["09", "One by hand, then a hundred"],
  ["10", "Two outputs, pick one"],
  ["11", "Supported, inferred, or invented"],
  ["12", "Ranked guesses, not a verdict"],
  ["13", "Build the brief out of blocks"],
];

export default function SpecimenClient() {
  return (
    <div className="mod-shell">
      {/* ⚠️ NO BANNER. Paul, 25 Jul: the page has to look EXACTLY like a module or the
          chrome is what he ends up judging. The specimen warning lives in the rail instead,
          at the same weight as everything else there. Honesty kept, distraction gone. */}
      <div className="mod-grid">
        <div className="mod-railcol">
          {/* Isa's real footprint, unwired. The column has to be occupied or the width test
              is a lie: the rail is what makes the main column 748px. */}
          <div className="mod-isa">
            <div className="mod-isabar">
              <i className="r" />
              <i className="a" />
              <i className="g" />
              <span className="mod-isatitle">isa</span>
            </div>
            <div className="mod-isamsg">
              <p className="mod-isaline">
                Not wired here. She is <b>real</b> on a module. This stands in so the rail
                takes up the room it really takes up.
              </p>
            </div>
          </div>

          <nav className="mod-rail">
            <p>/specimen, not a module</p>
            <span className="spec-railnote">
              Stand-in copy throughout. Nothing here is Paul&apos;s and nothing is course
              content. Unlinked and noindexed.
            </span>
            <p style={{ marginTop: 20 }}>/in this catalogue</p>
            {INDEX.map(([n, t]) => (
              <a key={n} href={`#spec-${n}`} data-done="0">
                <span className="mod-k">{n}</span>
                <span className="mod-dot" />
                <span>{t}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mod-maincol">

      <header className="mod-masthead">
        <p className="mod-eyebrow">The artefact catalogue &middot; 25 Jul 2026</p>
        <h1 className="mod-h1">Everything a module can be made of</h1>
        <p className="mod-standfirst">
          Every kind of thing that can sit in a module, rendered once, each one shown beside the
          markdown that produced it. Review this and a module stops being a design job. It becomes
          information you hand over.
        </p>
        <div className="mod-meta">
          <span>
            Verbs<b>{VERBS.length}</b>
          </span>
          <span>
            Attachments<b>{CARRIES.length}</b>
          </span>
          <span>
            Primitives<b>{PRIMITIVES.length}</b>
          </span>
          <span>
            Cost tier<b>1, browser only</b>
          </span>
          <span>
            Model calls<b>None on this page</b>
          </span>
        </div>
      </header>

      <Group
        h="Axis 1 of 3 &middot; what the reader does"
        d="The verb is the type. This is the axis that was missing: today a type is derived from which assets are attached, which is why three items in module 1 are badged 'show and copy' with nothing to copy. Attachments are the next axis, not this one."
      />

      <Spec
        n="01"
        badge="Read"
        title="Your words, nothing asked for"
        body="The plainest item there is. Prose in your voice, no action, no attachment. It exists so a module can make an argument between the things it asks the reader to do, instead of being a list of tasks."
        intake={"## Your words, nothing asked for\nThe paragraph goes here, in your voice,\nas many paragraphs as it needs."}
        cost="Nothing. Write and move on."
      />

      <Spec
        n="02"
        badge="Paste"
        title="Words to copy into a model"
        body="An item that hands over exact words. The prompt is lifted out of the prose into its own block so it can be copied without dragging your sentences in with it."
        intake={"## Words to copy into a model\nWhy this prompt works, in your voice.\n\nPROMPT:\nAct on the brief below. Before you start,\ntell me what you think I have not told you."}
        cost="Nothing beyond writing the prompt."
      >
        <div className="mod-copybox">
          <div className="mod-copyhead">
            <span>Copy this</span>
            <button type="button">Copy</button>
          </div>
          <pre>{"Act on the brief below. Before you start,\ntell me what you think I have not told you."}</pre>
        </div>
      </Spec>

      <Spec
        n="03"
        badge="Do"
        title="An action in their own account"
        body="Not a prompt. Nothing to copy. Go and change a setting, turn a toggle on, open a menu. Module 1 has three of these and they are all currently badged as if there were something to paste, which is the flaw this axis fixes."
        intake={"## An action in their own account\nWhat to change and why it matters.\n\nDO: Open the model dropdown and pick the\ntop model, not the one your plan opened with."}
        cost="Nothing."
      >
        <div className="mod-share">
          <button type="button" className="mod-tick" aria-pressed={false}>
            <span className="mod-box" />
            <span>Done</span>
          </button>
          <span>A tick, because there is no output to show.</span>
        </div>
      </Spec>

      <Group
        h="Axis 2 of 3 &middot; what the item carries"
        d="An attachment is a property, not a category. A prompt with a screenshot and a prompt without one are the same kind of item, drawn slightly differently. Build the field once and every module gets it free, forever."
      />

      <Spec
        n="04"
        badge="Read &middot; image"
        title="This is how an image becomes an image"
        body="A file in the repo, a caption underneath, rendered at the column width. Self-hosted, the same way /essays already handles its images, so nothing depends on someone else's server staying up. The current grab field is not this: it is a note describing a screenshot somebody still has to take."
        intake={"## This is how an image becomes an image\nWhat the picture is showing.\n\nIMAGE: model-dropdown.png\nCAPTION: The model dropdown, open"}
        cost="You take the screenshot. One file, dropped in the module folder."
      >
        <figure className="spec-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fox/fox-pm-nobg.png" alt="Stand-in image, not course content" />
          <figcaption className="spec-cap">
            Stand-in file from /public/fox. Real captions are yours.
          </figcaption>
        </figure>
      </Spec>

      <Spec
        n="05"
        badge="Watch &middot; video"
        title="This is how a video becomes a video"
        body="Self-hosted, with a poster frame so nothing jumps while it loads, and controls rather than autoplay. No YouTube or Vimeo embed: an embed puts someone else's player, cookies and end-of-video suggestions on your page, and a consent problem on a page aimed at Ireland. That trade is fine for ninety-second screen captures and stops being fine for long-form, which is the point at which a player earns its place."
        intake={"## This is how a video becomes a video\nWhat the clip shows and why it is quicker\nthan reading it.\n\nVIDEO: model-picker.mp4\nPOSTER: model-picker.jpg\nCAPTION: Picking the model, start to finish"}
        cost="You record the clip. Keep it short and it stays self-hosted."
      >
        <div className="spec-vid">
          <video
            controls
            preload="metadata"
            poster="/course/fox-tarantino-trunk-poster.jpg"
            src="/course/fox-tarantino-trunk.mp4"
          />
        </div>
        <p className="spec-cap">
          Stand-in clip: an existing brand film already in /public/course. A real module clip
          would be a screen capture.
        </p>
      </Spec>

      <Spec
        n="06"
        badge="Take &middot; file"
        title="A file they leave with"
        body="A spreadsheet, a template, a checklist. The item that turns a lesson into something the reader still has next week. Nothing to render but the handover itself."
        intake={"## A file they leave with\nWhat it is for and how to use it.\n\nFILE: prompt-library.xlsx\nLABEL: The prompt library, twelve tabs"}
        cost="You make the file once. It is served from the module folder."
      >
        <div className="spec-file">
          <span className="spec-fileicon">XLSX</span>
          <span>
            <span className="spec-filename">The prompt library</span>
            <span className="spec-filemeta">Stand-in. No file attached to this specimen.</span>
          </span>
          <span className="spec-filedl">Download</span>
        </div>
      </Spec>

      <Spec
        n="07"
        badge="Save &middot; link"
        title="Someone else's work, pointed at"
        body="The one type that sends the reader off your page. It already exists and it already has the right rule attached: the reason a thing is worth a marketer's time is yours to write, never invented, because that reason is the entire value of a curated thing."
        intake={"## Someone else's work, pointed at\nLINK: Title | Author | https://example.com\nWHY: Your one line on why it is worth\nthe reader's time. Never written for you.\n\n(THUMB: optional, and the exception.\n Most links are just links.)"}
        cost="One line of judgement per link. That line is the product."
      >
        <div className="mod-linklist">
          <span className="mod-lcard">
            <span className="mod-lthumb" data-ph="1">
              NO THUMB
            </span>
            <span>
              <span className="mod-ltitle">A plain row is the default</span>
              <span className="mod-lwhy">
                Every thumbnail is a capture job someone has to do, so a picture is the exception
                and a row is the norm.
              </span>
              <span className="mod-lmeta">Stand-in entry &middot; no real link</span>
            </span>
          </span>
        </div>
      </Spec>

      <Group
        h="Axis 3 of 3 &middot; which primitive it runs"
        d="Interactive is not one type and it cannot be. A slider and a drag exercise share no logic, so 'an interactive thing' would mean a fresh build every module, which is the handcrafting to avoid. The way out is a closed set of named mechanics. Each is built once and then takes data, exactly like an image takes a file. Six of them, all Tier 1: rules over data, no model, nothing metered."
      />

      <Spec
        n="08"
        badge="Primitive &middot; tune and keep"
        title="Move three sliders, leave with something"
        body="The reader arrives with nothing and leaves with an artefact they built. Josh Comeau's shadow palette is the shape. It teaches by making the variables visible: you can feel a vague brief getting specific as you drag."
        intake={"## Move three sliders, leave with something\nWhat they are tuning, and what they keep.\n\nPRIMITIVE: tune\n  VAR Audience: everyone | B2B marketers | ...\n  VAR Length: no limit | under 300 | under 150\n  TEMPLATE: Write a LinkedIn post. ..."}
        cost="Name the variables and their steps, and write the template."
      >
        <Tune />
      </Spec>

      <Spec
        n="09"
        badge="Primitive &middot; one by hand, then a hundred"
        title="Fix one, then watch the same rule run a hundred times"
        body="Parable of the Polygons, applied to marketing. You make one judgement by hand, then the page runs that same judgement at scale and you watch what your choice did. This is the only mechanic on the list that makes automation feel dangerous rather than clever, which is why it is worth building."
        intake={"## Fix one, then watch it run a hundred times\nThe brief, and what goes wrong at scale.\n\nPRIMITIVE: hundred\n  LINES: three lines of the brief\n  FLAW: which line is the flaw\n  BAD UNFIXED: 78    BAD FIXED: 6\n  NOTE: what the reader should take away"}
        cost="Write the brief, mark the flaw, and give the two rates."
      >
        <Hundred />
      </Spec>

      <Spec
        n="10"
        badge="Primitive &middot; compare, commit, reveal"
        title="Two outputs, pick one, then see the expert view"
        body="The commit is what makes it teach. If the expert view is visible before the reader chooses, they read it and agree with it. Make them pick first and they find out whether they can actually tell."
        intake={"## Two outputs, pick one, then see the view\nWhat the reader is judging.\n\nPRIMITIVE: compare\n  A: the first output\n  B: the second output\n  EXPERT: the view they see after choosing"}
        cost="Two real outputs and your read on them."
      >
        <CompareCommit />
      </Spec>

      <Spec
        n="11"
        badge="Primitive &middot; classify each line"
        title="Supported, inferred, or invented"
        body="The hallucination exercise. A passage that looks uniformly confident, split into lines, each one tagged by the reader. It works because the invented line reads exactly like the supported ones, which is the whole lesson and cannot be taught by telling."
        intake={"## Supported, inferred, or invented\nThe passage, and why the tags matter.\n\nPRIMITIVE: classify\n  LINE: text | supported\n  LINE: text | inferred\n  LINE: text | invented"}
        cost="Write the passage and mark the answer key."
      >
        <Classify />
      </Spec>

      <Spec
        n="12"
        badge="Primitive &middot; ranked guesses"
        title="Show what it thinks you meant, not a verdict"
        body="Quick, Draw! shows ranked guesses rather than right or wrong, and that is far more useful for a brief. The reader types, and sees the three things their words could mean. Every guess is precomputed, so this costs nothing to run."
        intake={"## Show what it thinks you meant\nWhy ambiguity in a brief is expensive.\n\nPRIMITIVE: guesses\n  ON email, sequence, follow:\n    Write a cold outreach sequence | 62%\n    Write a follow-up to a warm lead | 24%"}
        cost="A keyword list and the guesses each one triggers."
      >
        <Guesses />
      </Spec>

      <Spec
        n="13"
        badge="Primitive &middot; drag to assemble"
        title="Build the brief out of blocks"
        body="Pointer drag already exists in this repo, so this is the cheapest primitive to finish. Two of the six blocks are things people put in prompts that do nothing, which is the part that lands. Clicking works as well as dragging, so it is usable from a keyboard."
        intake={"## Build the brief out of blocks\nWhat a brief needs, and what is theatre.\n\nPRIMITIVE: assemble\n  TARGET: A brief the model can act on\n  BLOCK: Who it is for | belongs\n  BLOCK: You are a world-class expert | no"}
        cost="List the blocks and mark which belong."
      >
        <Assemble />
      </Spec>

      <div className="spec-group">
        <p className="spec-grouph">What this page is not</p>
        <p className="spec-groupd">
          It is not a proposal for what module 1 becomes, and it is not six finished lessons. It
          is the catalogue: the closed list of things a module can be made of, so that every one
          of the six is data rather than a design decision. Two things are still missing and
          neither is design work. Real assets, because the image and video above are stand-ins
          from elsewhere in the repo. And the markdown intake itself, which is what turns the
          blocks on the left of every specimen into a page without anyone editing TypeScript.
        </p>
        <p className="spec-note">
          <b>Open questions.</b> Whether seven verbs is the right list or too many. Whether all
          six primitives earn their place, or only three. Whether a module is allowed more than
          one primitive. None of those are answered here.
        </p>
      </div>

        </div>
      </div>
    </div>
  );
}
