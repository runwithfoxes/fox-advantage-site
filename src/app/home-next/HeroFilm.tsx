"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero film, looping (Paul, 25 Sep 2026: "it might be good for the video to loop on hero").
 * A hard loop would jump from the beach back to Dublin with the fox changing size, the ghost the
 * mini Dray warned about. So at the end the film fades out over the first frame (the poster, set
 * as the background underneath) and starts again: a dissolve back to Dublin, never a cut.
 */
export default function HeroFilm({ className, src, poster }: { className: string; src: string; poster: string }) {
  const v = useRef<HTMLVideoElement>(null);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const onEnd = () => {
      setFade(true);
      t = setTimeout(() => {
        el.currentTime = 0;
        el.play().catch(() => {});
        setFade(false);
      }, 900);
    };
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("ended", onEnd);
      clearTimeout(t);
    };
  }, []);
  return (
    <>
      <img className={className} src={poster} alt="" aria-hidden />
      <video
        ref={v}
        className={className}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={poster}
        src={src}
        style={{ opacity: fade ? 0 : 1, transition: "opacity .9s ease" }}
      />
    </>
  );
}
