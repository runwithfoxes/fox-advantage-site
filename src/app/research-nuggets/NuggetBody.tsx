import { splitAtChart, type Note } from "@/lib/notes";
import NuggetChart from "./NuggetChart";

/**
 * THE WRITING OF ONE PIECE, WITH ITS CHART IF IT HAS ONE. Used by the list page and by the piece's
 * own page, so a chart is drawn the same in both. The chart sits after the paragraph named in its
 * file (see NoteChart in src/lib/notes.ts).
 */
export default function NuggetBody({ note }: { note: Note }) {
  const html = note.content || "";
  if (!note.chart) return <div className="essay-prose" dangerouslySetInnerHTML={{ __html: html }} />;

  const [before, after] = splitAtChart(html, note.chart.after);
  return (
    <>
      <div className="essay-prose" dangerouslySetInnerHTML={{ __html: before }} />
      <NuggetChart chart={note.chart} win={`research_nugget_${String(note.order).padStart(2, "0")}`} />
      {after ? <div className="essay-prose" dangerouslySetInnerHTML={{ __html: after }} /> : null}
    </>
  );
}
