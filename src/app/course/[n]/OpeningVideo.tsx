"use client";

import { useRef } from "react";

/**
 * Paul on camera at the top of a module, after his opening paragraphs.
 *
 * ⭐ WHAT IT RECORDS, Paul, 24 Sep 2026: "make sure that we are tracking anyone who clicks
 * on it and watches any of it and watches till the end or re-watches it, so we've got good
 * data on that." So four facts per named person, through the same /api/course-event route as
 * every other click on the page:
 *   - video_played, detail "first": they pressed play.
 *   - video_progress, detail "25%" / "50%" / "75%": how far they got, each sent once per play.
 *   - video_completed: they reached the end. detail is which play it was.
 *   - video_played, detail "again N": a rewatch, meaning play pressed after a completed play,
 *     or after seeking back to the start.
 * A pause and a resume in the middle is NOT a new play; the marks are reset only when the
 * film ends or is taken back to the start.
 *
 * ⛔ THE PLAYER IS THE BROWSER'S OWN. No custom controls, no autoplay, no muting trick, and
 * preload is metadata only, so the 23MB file is not fetched by anyone who does not press
 * play. The poster is the film's own name card, so nothing on the page is an empty frame.
 */
export default function OpeningVideo({
  n,
  src,
  poster,
  title,
  caption,
}: {
  n: number;
  src: string;
  poster: string;
  title: string;
  /** One line under the film, in the module's label style. Optional. */
  caption?: string;
}) {
  const plays = useRef(0);
  const sent = useRef<Set<number>>(new Set());
  const finished = useRef(false);

  const track = (event: string, detail: string) => {
    try {
      fetch("/api/course-event", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ event, module: n, item: title, detail }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* never break the page for tracking */
    }
  };

  return (
    <figure className="mod-video">
      <video
        className="mod-video-player"
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        onPlay={(e) => {
          const v = e.currentTarget;
          /* A resume from a pause mid-film is the same play. A press after the end, or
             after being taken back to the start, is a new one. */
          const fresh = plays.current === 0 || finished.current || v.currentTime < 0.5;
          if (!fresh) return;
          plays.current += 1;
          finished.current = false;
          sent.current = new Set();
          track("video_played", plays.current === 1 ? "first" : `again ${plays.current}`);
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!v.duration || plays.current === 0) return;
          const pct = (v.currentTime / v.duration) * 100;
          for (const mark of [25, 50, 75]) {
            if (pct >= mark && !sent.current.has(mark)) {
              sent.current.add(mark);
              track("video_progress", `${mark}%`);
            }
          }
        }}
        onSeeked={(e) => {
          /* Dragged back to the start after watching at least half: that is a rewatch too,
             and the browser fires no play event for it while the film is already playing. */
          const v = e.currentTarget;
          if (v.currentTime < 0.5 && plays.current > 0 && (finished.current || sent.current.has(50))) {
            plays.current += 1;
            finished.current = false;
            sent.current = new Set();
            track("video_played", `again ${plays.current}`);
          }
        }}
        onEnded={() => {
          if (finished.current) return;
          finished.current = true;
          track("video_completed", `play ${plays.current}`);
        }}
      />
      {caption && <figcaption className="mod-video-caption">{caption}</figcaption>}
    </figure>
  );
}
