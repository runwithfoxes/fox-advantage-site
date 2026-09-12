"use client";

/* The one button on /zorro that opens Isa. The chat widget lives in the site layout and keeps
   its own open state, so the page cannot reach it directly; it fires an event the widget listens
   for. Paul, 12 Sep 2026: "I didn't see Isa on the Zorro page even though we talk about it, so it
   needs to go there." She was there as the site's fox bubble, with no name on a phone at all. */
export default function AskIsa({ label = "Ask Isa" }: { label?: string }) {
  return (
    <button
      type="button"
      className="zorro-askisa"
      onClick={() => window.dispatchEvent(new CustomEvent("isa:open"))}
    >
      {label}
    </button>
  );
}
