"use client";

/**
 * ONE FINISHED PIECE OF WRITING, IN THE WRITER'S WINDOW. Static, no playback.
 *
 * Replaces the two recorded ChatWindow sessions in the Writer section
 * (Paul, 9 Aug): "we are taking away lots of stuff that is too complex when
 * reading cold, and they are seeing a writer and seeing it is using brand docs
 * because of the hover."
 *
 * So everything the writer DID around the writing is gone: the plan, the slop
 * audit, the score, the claims ledger, the composer. What is left is the
 * finished email or post and the dotted lines.
 *
 * ⛔ AND THE HOVER NAMES NO FILES. The source map quoted `positioning-statement.md`
 * back at the reader, which reads as our filing system rather than their brand.
 * The note says what the line is made of instead: their positioning, their
 * messaging framework, their approved proof point, their approved voice. Four
 * notes, no more, because a fifth would be a new idea to hold.
 *
 * The frame, the dots and the dotted-line hover are the same CSS the chat window
 * uses, so this window is that window with the machinery taken out.
 */

import "./chat-window.css";

/** The four things a line can be made of. Prospect-facing wording, no filenames. */
export const NOTE = {
  positioning: "Your brand positioning, reflected here.",
  messaging: "Comes from your messaging framework.",
  proof: "Your approved proof point.",
  voice: "Written in your approved voice.",
} as const;

export type NoteKey = keyof typeof NOTE;

/** A line of the piece. `note` absent means no dotted underline on that line. */
export type Line = { text: string; note?: NoteKey };

function Noted({ line }: { line: Line }) {
  if (!line.note) return <>{line.text}</>;
  return (
    <span className="ppchat-ref" tabIndex={0}>
      {line.text}
      <span className="ppchat-refcard ppchat-refcard-note" role="note">
        {NOTE[line.note]}
      </span>
    </span>
  );
}

const HINT = "Hover a dotted line to see what it is made of.";

export function WriterEmail({
  title = "the writer",
  subject,
  body,
  sign,
}: {
  title?: string;
  subject: Line;
  body: Line[];
  sign: string[];
}) {
  return (
    <div className="ppchat">
      <div className="ppchat-bar">
        <i className="ppchat-dot ppchat-dot-r" />
        <i className="ppchat-dot ppchat-dot-a" />
        <i className="ppchat-dot ppchat-dot-g" />
        <span className="ppchat-title">{title}</span>
      </div>
      <div className="ppchat-body">
        <div className="ppchat-email ppchat-piece">
          <p className="ppchat-subject">
            <span>Subject</span>
            <Noted line={subject} />
          </p>
          {body.map((line, i) => (
            <p key={i}>
              <Noted line={line} />
            </p>
          ))}
          <p className="ppchat-sign">
            {sign.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </p>
          <p className="ppchat-refhint">{HINT}</p>
        </div>
      </div>
    </div>
  );
}

export function WriterPost({
  title = "the writer",
  body,
}: {
  title?: string;
  body: Line[];
}) {
  return (
    <div className="ppchat">
      <div className="ppchat-bar">
        <i className="ppchat-dot ppchat-dot-r" />
        <i className="ppchat-dot ppchat-dot-a" />
        <i className="ppchat-dot ppchat-dot-g" />
        <span className="ppchat-title">{title}</span>
      </div>
      <div className="ppchat-body">
        <div className="ppchat-post ppchat-piece">
          {body.map((line, i) => (
            <p key={i}>
              <Noted line={line} />
            </p>
          ))}
          <p className="ppchat-refhint">{HINT}</p>
        </div>
      </div>
    </div>
  );
}
