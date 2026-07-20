"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";

/*
  Drag a fixed-position element by grabbing it almost anywhere.

  Extracted for Isa, written to be reused. The homepage hero has its own copy of
  this logic welded into AgentsHero, and that should adopt this hook once the
  course reveal is out of the way. Two implementations is a known debt, not a
  design: shipping a refactor of the live hero days before it carries campaign
  traffic is the wrong trade.

  Three deliberate differences from the hero's version:

  1. NO MOMENTUM. The hero cards glide after release because they are playful
     objects being tossed around. A window is not tossed. It stops where you put
     it, the way every real window does.
  2. INTERACTIVE TARGETS ARE EXCLUDED. The hero cards have no controls, so
     grab-anywhere costs nothing. Isa has an input, a send button, links and text
     people will want to select. Dragging from those would break typing and
     copying, so they are dead to the drag and everything else is live.
  3. CLAMPED TO THE VIEWPORT. An element you can drag off the edge and lose is a
     worse problem than the one dragging solves.
*/

const INTERACTIVE = "input, textarea, button, a, select, [contenteditable]";

export interface DraggableOptions {
  /** Drag is off when false. Used to disable it on mobile, where the panel is full screen. */
  enabled?: boolean;
  /** Keep the element this far inside the viewport edges. */
  margin?: number;
}

export function useDraggable(
  ref: RefObject<HTMLElement | null>,
  { enabled = true, margin = 8 }: DraggableOptions = {},
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  /* Live values during a drag. Kept in refs so a pointermove writes straight to
     style.transform and never triggers a React render, which is what keeps it
     smooth. State is only updated once, on release. */
  const base = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const live = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  const clamp = useCallback(
    (x: number, y: number) => {
      const el = ref.current;
      if (!el) return { x, y };
      /* Measure the element where it sits with no offset applied, so the clamp
         is against its real anchored position rather than its dragged one. */
      const r = el.getBoundingClientRect();
      const left = r.left - live.current.x;
      const top = r.top - live.current.y;
      const minX = margin - left;
      const maxX = window.innerWidth - margin - r.width - left;
      const minY = margin - top;
      const maxY = window.innerHeight - margin - r.height - top;
      return {
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
      };
    },
    [ref, margin],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      /* Anything you could click, type into or select is not a drag handle. */
      if (target.closest(INTERACTIVE)) return;
      /* A selection in progress belongs to the user, not to us. */
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) return;

      dragging.current = true;
      setIsDragging(true);
      base.current = { ...live.current };
      start.current = { x: e.clientX, y: e.clientY };
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* not fatal, the window listeners still finish the drag */
      }
      e.preventDefault();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const next = clamp(
        base.current.x + (e.clientX - start.current.x),
        base.current.y + (e.clientY - start.current.y),
      );
      live.current = next;
      el.style.transform = `translate(${next.x}px, ${next.y}px)`;
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setIsDragging(false);
      setOffset({ ...live.current });
    };

    /* If the window is resized the element can end up outside the viewport,
       so pull it back to the nearest legal position. */
    const onResize = () => {
      const next = clamp(live.current.x, live.current.y);
      live.current = next;
      el.style.transform = `translate(${next.x}px, ${next.y}px)`;
      setOffset(next);
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, [ref, enabled, clamp]);

  /* Re-apply the committed offset whenever the element remounts, so a position
     survives the panel being minimised and reopened. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    live.current = offset;
    el.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
  }, [ref, offset]);

  return { isDragging, offset, reset: () => setOffset({ x: 0, y: 0 }) };
}
