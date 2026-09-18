"use client";

import { useEffect, useState } from "react";
import "./folder-window.css";

/**
 * A FOLDER WITH DOCUMENTS IN IT, depicted as one window: file list on the left, the
 * open document on the right.
 *
 * Ported from ~/projects/.rwf-wt-course-modules/src/app/course/[n]/FolderWindow.tsx.
 * The source fetched each document's HTML from a course-only API route
 * (`/api/course-file/...`) that does not exist in this repo. Here every document's
 * content is a prop instead, so the component carries no course content and no
 * dependency on that route: pass in the paragraphs and it renders them.
 *
 * ONE WINDOW, NEVER ONE PER DOCUMENT. Six windows says six separate things. One
 * window with several files inside it says folder: the format is doing the teaching,
 * not just holding the styling.
 *
 * THE LEFT COLUMN DOES TWO JOBS. It navigates, and (in the caller's ordering) it
 * argues: files are listed in whatever order the caller passes, never re-sorted here.
 *
 * FIXED HEIGHT ON THE PANE is the whole point: a document that runs long scrolls
 * inside its own window rather than pushing the page around it.
 *
 * THE RELAYOUT IS A CONTAINER QUERY, NOT A MEDIA QUERY, ported unchanged: a narrow
 * component inside a wide page needs to see its own width, not the viewport's.
 */
export type FolderDoc = {
  /** Filename shown under the label, e.g. "positioning-note.md". */
  file: string;
  /** The button's own label in the file list. */
  label: string;
  /** The document's body, one paragraph per entry. Rendered as plain paragraphs. */
  body: string[];
};

export default function FolderWindow({
  name,
  files,
  start = 0,
}: {
  /** What the title bar says. A trailing slash reads as a directory, not a file. */
  name: string;
  /** In whatever order the caller wants shown. Never sorted here. */
  files: FolderDoc[];
  /** Which file the window opens on. */
  start?: number;
}) {
  const [openFile, setOpenFile] = useState(start);

  /* The caller can switch the open file externally (e.g. a bullet elsewhere on the
     page), so the window follows `start` rather than only its own clicks. */
  useEffect(() => setOpenFile(start), [start]);

  const current = files[openFile];

  return (
    <div className="ppfolder">
      <div className="ppfolder-bar">
        <i className="ppfolder-dot ppfolder-dot-r" />
        <i className="ppfolder-dot ppfolder-dot-a" />
        <i className="ppfolder-dot ppfolder-dot-g" />
        <span className="ppfolder-title">{name}</span>
      </div>

      <div className="ppfolder-body">
        <ul className="ppfolder-list">
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

        <div className="ppfolder-pane">
          {current ? (
            <div className="ppfolder-doc">
              {current.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : (
            <p className="ppfolder-state">No document to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}
