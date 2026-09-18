/**
 * Types for ChatWindow's recorded session, ported from
 * ~/projects/.rwf-wt-course-modules/src/app/course/writerSession.ts. Only the type
 * definitions came across; the actual recorded sessions in that file are course
 * content and stay there. Callers of ChatWindow here supply their own `session` and
 * (optionally) `charts` as props.
 */

/** A source behind one line: `file` is a document name, `quote` is a line from it.
 * Rendered as a hover card. Optional; most callers will not need it. */
export type Ref = { file: string; quote: string };

export type Block =
  | { kind: "p"; text: string }
  | { kind: "plan"; lines: [string, string][] }
  | { kind: "flag"; text: string }
  | {
      kind: "email";
      subject: string;
      body: string[];
      sign: string[];
      /** Index-aligned with `body`. `null`/absent where a line carries no source. */
      refs?: (Ref | null)[];
      subjectRef?: Ref | null;
    }
  | {
      kind: "post";
      body: string[];
      refs?: (Ref | null)[];
    }
  /** A drawn chart. `chart` is a key into the `charts` prop passed to ChatWindow. */
  | { kind: "chart"; chart: string; caption?: string }
  | { kind: "audit"; label: string; text: string }
  | {
      kind: "grid";
      title: string;
      rows: [string, number, string][];
    }
  | { kind: "score"; text: string; weakest: string };

export type Turn =
  | { who: "you"; text: string }
  | { who: "writer"; blocks: Block[] };

/** Shape for a chart passed via ChatWindow's `charts` prop, matching the course's
 * chartData.generated.ts so recordings can carry chart blocks without depending on
 * that generated file. */
export type ChartSpec = {
  title: string;
  series: { name: string; points: [string, number][] }[];
  bands?: { from: string; to: string; label: string }[];
};
