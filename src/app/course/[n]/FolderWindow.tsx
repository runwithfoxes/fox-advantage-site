"use client";

import { useEffect, useState } from "react";

/**
 * ⭐⭐ A FOLDER WITH DOCUMENTS IN IT. Built 4 Aug 2026 to Paul's brief: "I want them to
 * understand this is a folder that has documents in it."
 *
 * ⛔ ONE WINDOW, NEVER ONE PER DOCUMENT. Six windows says six separate things. One window
 * with six files inside it says folder, and the folder IS the lesson this module turns on:
 * a project is a directory the model reads every time, not a chat. The format carries the
 * teaching, so it is not a styling choice.
 *
 * ⭐ THE LEFT COLUMN DOES TWO JOBS. It navigates, and it argues: the files are listed in
 * BUILD order, not alphabetically, because positioning cannot be written until audience,
 * competitors and proof exist. ⛔ Never sort this list.
 *
 * ⭐ FIXED HEIGHT ON THE PANE, WHICH IS THE WHOLE POINT. Paul: "without it overtaking the
 * entire section". The six documents are ~600-700 words each, about 3,800 in total, which is
 * longer than the module page they sit inside. A fixed pane means the section cannot grow
 * past it no matter what goes in, and the document scrolls inside its own window.
 *
 * ⚠️ THE NESTED SCROLL IS THE KNOWN RISK AND IT IS DELIBERATE, FOR NOW. Paul asked whether
 * a reader can see the whole 600 words. In a window that fits the module column they cannot,
 * unless the pane scrolls. This is the version that CAN show everything, built so he can
 * judge the scrolling by looking rather than by argument. If it reads badly the fallback is
 * a specimen: first screen only, plus the real file, which is already on the page below.
 *
 * ⛔⛔ THE RELAYOUT IS A CONTAINER QUERY, NOT A MEDIA QUERY. Learned expensively on the AI
 * Writer card, 26 Jul: it was signed off at 900px fixed and overflowed a 748px module column
 * by 160px. No viewport breakpoint could ever see that, because the viewport was wide and the
 * card was not. Only the component's own width can answer "do I still fit".
 *
 * ⛔ KITE IS FICTIONAL. Its competitors, customers, numbers and quotes are invented. The
 * documents carry their own warning at the top, which is why none is repeated here.
 */
export type FolderFile = { file: string; label: string };

export default function FolderWindow({
  name,
  dir,
  files,
  start = 0,
}: {
  /** What the title bar says. A trailing slash, so it reads as a directory not a file. */
  name: string;
  /** Path under the served root, e.g. "module-2/kite". */
  dir: string;
  /** ⛔ In build order. Never sorted. */
  files: FolderFile[];
  /** Which file the window opens on, set by whichever bullet the reader clicked. */
  start?: number;
}) {
  const [openFile, setOpenFile] = useState(start);

  /* The reader can click a second bullet while the window is already open, so the window
     has to follow the bullets rather than keep whatever it opened on. */
  useEffect(() => setOpenFile(start), [start]);
  const [html, setHtml] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const current = files[openFile];

  useEffect(() => {
    let live = true;
    setHtml(null);
    setFailed(false);
    fetch(`/api/course-file/${dir}/${current.file}.html`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((t) => {
        /* ⛔⛔ THE FETCHED FILE IS A WHOLE HTML DOCUMENT, NOT A FRAGMENT, and injecting it
           raw would put its <style> block into this page and restyle the entire module.
           Take the <main> only. The standalone page keeps working as a download; this
           reads the same file without inheriting its chrome. */
        const doc = new DOMParser().parseFromString(t, "text/html");
        const main = doc.querySelector("main");
        const root = main ?? doc.body;

        /* ⛔ STRIP THE DOCUMENT'S OWN FRONT MATTER, 4 Aug 2026 on Paul's instruction: the
           h1, the fiction warning and the "Built from an interview" line come off inside
           the window. All three are already said better by the page around it: the file
           name is in the list to the left and the item is titled "Kite, fictional insurance
           brand", so the window was repeating the same three facts on every document.

           ⭐⭐ STRIPPED HERE, NEVER FROM THE FILE. A document that travels on its own has
           no page around it, so its warning has to be inside it. This is a rule about the
           DISPLAY, and `render-md.py` must keep emitting all three.
           ⚠️ The page-level warning above the Kite file list is now the only one a reader
           sees on this page. It is ruled to render ABOVE those files, never below. If that
           ever moves, this strip has to be reconsidered in the same edit. */
        const first = root.firstElementChild;
        if (first && first.tagName === "H1") first.remove();
        const nowFirst = root.firstElementChild;
        if (nowFirst && nowFirst.tagName === "BLOCKQUOTE") nowFirst.remove();

        if (live) setHtml(root.innerHTML);
      })
      .catch(() => {
        /* ⭐ FAIL LOUDLY. An empty pane looks like a document with nothing in it, which is
           indistinguishable from a real but boring file. Say what went wrong instead. */
        if (live) setFailed(true);
      });
    return () => {
      live = false;
    };
  }, [dir, current.file]);

  return (
    <div className="fw">
      <div className="fw-bar">
        <i className="r" />
        <i className="a" />
        <i className="g" />
        <span className="fw-title">{name}</span>
      </div>

      <div className="fw-body">
        <ul className="fw-list">
          {files.map((f, i) => (
            <li key={f.file}>
              <button
                type="button"
                className={i === openFile ? "is-open" : undefined}
                onClick={() => setOpenFile(i)}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="fw-pane">
          {failed ? (
            <p className="fw-state">
              This file did not load. It is listed in the module but the server would
              not serve it.
            </p>
          ) : html === null ? (
            <p className="fw-state">Opening {current.label}</p>
          ) : (
            <div
              className="fw-doc"
              /* The HTML is our own, generated from our own markdown and served from our
                 own origin behind the same door as the page. No third-party content
                 reaches this. */
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
