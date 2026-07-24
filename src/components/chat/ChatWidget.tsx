"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useDraggable } from "@/lib/useDraggable";
import { usePathname } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { renderChatMarkdown } from "@/lib/chat-markdown";

/** Extract text content from a UIMessage's parts */
function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi, we're launching a new free online training course: AI Fluency for Ambitious Marketers. [Register today](/course). Did I mention it is free? Paul asked me to say it was brilliant...",
    },
  ],
};

// Shown only on /contact. Booking-led, since that page exists to get people talking to Paul.
const CONTACT_WELCOME: UIMessage = {
  id: "welcome-contact",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Isa here, Paul's chatbot assistant. He does 30-minute discovery chats, which is mostly him nodding thoughtfully and quoting a marketing book at you, but people seem to keep booking them: [grab one here](https://cal.com/paul-dervan-mjfd50). Tell me what you're working on first if you'd rather warm up.",
    },
  ],
};

export default function ChatWidget() {
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Drag is desktop only. Below 768px she is the whole screen, which is not a
     window and has nowhere to be moved to. */
  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const sync = () => setCanDrag(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { isDragging } = useDraggable(panelRef, { enabled: canDrag && isOpen });

  /* Close and minimise are deliberately different. Close means "not now", and is
     remembered for the rest of the visit, which is the behaviour the X has always
     had. Minimise just puts her back in the bubble and leaves her openable, which
     is what you want when she is only in the way for a moment. */
  const dismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem(isContact ? "isa-dismissed-contact" : "isa-dismissed", "1");
  };

  const { messages, sendMessage, status, error, setMessages } = useChat({
    messages: [isContact ? CONTACT_WELCOME : WELCOME],
    onError: (e) => console.error("[isa] chat error:", e),
  });

  // The widget lives in the root layout, so it doesn't remount on client-side
  // navigation. Swap the welcome to match the current page, but only while the
  // conversation hasn't started so we never wipe an active chat.
  useEffect(() => {
    setMessages((prev) => {
      if (prev.some((m) => m.role === "user")) return prev;
      return [isContact ? CONTACT_WELCOME : WELCOME];
    });
  }, [isContact, setMessages]);

  const isBusy = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, error]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // No auto-open on mobile: at <=768px the panel is full-screen, so opening
    // uninvited replaces the whole page. The bubble stays; the visitor taps it.
    if (window.matchMedia("(max-width: 768px)").matches) return;
    // Contact page tracks its own dismissal so closing Isa on the homepage
    // doesn't stop her opening when someone reaches the contact page.
    const dismissKey = isContact ? "isa-dismissed-contact" : "isa-dismissed";
    if (sessionStorage.getItem(dismissKey)) return;

    // Homepage: the agents hero is a scroll-assemble that fills the screen, so
    // Isa would open straight over it. Wait until the visitor has scrolled past
    // the hero, then give them 3 seconds before she opens.
    const hero = document.querySelector<HTMLElement>(".ah-hero");
    if (hero && !isContact) {
      let delayId: ReturnType<typeof setTimeout> | undefined;
      const onScroll = () => {
        if (window.scrollY < hero.offsetHeight) return;
        window.removeEventListener("scroll", onScroll);
        delayId = setTimeout(() => setIsOpen(true), 3000);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => { window.removeEventListener("scroll", onScroll); clearTimeout(delayId); };
    }

    const id = setTimeout(() => setIsOpen(true), isContact ? 2000 : 5000);
    return () => clearTimeout(id);
  }, [isContact]);

  if (pathname?.startsWith("/research")) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;
    setInput("");
    sendMessage({ text: trimmed });
    // On touch devices, dismiss the keyboard after sending. iOS Safari can
    // scroll the fixed full-screen panel while the keyboard is up, pushing
    // the header (and the close X) out of view.
    if (window.matchMedia("(pointer: coarse)").matches) {
      inputRef.current?.blur();
    }
  }

  if (!isOpen) {
    return (
      <div className="chat-bubble-wrap">
        <span className="chat-bubble-label">Can I help?</span>
        <button
          className="chat-bubble"
          onClick={() => setIsOpen(true)}
          aria-label="Chat with Isa"
        >
          <span className="chat-bubble-icon">&#129418;</span>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      className={`chat-panel${isExpanded ? " chat-panel-expanded" : ""}${
        canDrag ? " chat-panel-draggable" : ""
      }${isDragging ? " chat-panel-dragging" : ""}`}
    >
      <div className="chat-panel-header">
        {/* Window controls. Isa is the one piece of real software on the site, so
            these are actual controls, not the drawn ones the hero cards carry.
            Every dot does something: close, minimise to the bubble, expand.
            The dots alone are not a discoverable way out (they only reveal their
            meaning on hover, and touch users cannot hover), so the header also
            carries a labelled \close in the site's own syntax. */}
        <div className="chat-panel-dots">
          <button
            className="chat-dot chat-dot-close"
            onClick={dismiss}
            aria-label="Close chat"
            title="Close"
          />
          <button
            className="chat-dot chat-dot-min"
            onClick={() => setIsOpen(false)}
            aria-label="Minimise chat"
            title="Minimise"
          />
          <button
            className="chat-dot chat-dot-zoom"
            onClick={() => setIsExpanded((v) => !v)}
            aria-label={isExpanded ? "Shrink chat" : "Expand chat"}
            title={isExpanded ? "Shrink" : "Expand"}
          />
        </div>
        {/* The name is doing no work here: the fox bubble identifies her, and her
            first line says who she is. So the most visible slot in the header
            carries the one thing you cannot otherwise discover, which is that
            she moves. On mobile she cannot, so it falls back to her name. */}
        <span className="chat-panel-title">
          {canDrag ? "drag to move" : "isa"}
        </span>
        <button className="chat-panel-close" onClick={dismiss} aria-label="Close chat">
          \close
        </button>
      </div>

      <div className="chat-panel-messages">
        {messages.map((m) => {
          const text = getMessageText(m);
          return (
            <div
              key={m.id}
              className={`chat-msg ${
                m.role === "user" ? "chat-msg-user" : "chat-msg-assistant"
              }`}
            >
              {m.role === "user" ? (
                text
              ) : m.id === "welcome" ? (
                <div>
                  {/* Text-only welcome, no course card (Paul's call). The link
                      carries the CTA; the copy carries the voice. */}
                  <p>Hi, we&apos;re launching a new free online training course: AI Fluency for Ambitious Marketers. <a href="/course">Register today</a>. Did I mention it is free? Paul asked me to say it was brilliant...</p>
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderChatMarkdown(text),
                  }}
                />
              )}
            </div>
          );
        })}
        {isBusy && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="chat-msg chat-msg-assistant">
            <div className="chat-typing">...</div>
          </div>
        )}
        {status === "error" && (
          <div className="chat-msg chat-msg-assistant">
            Sorry, something went wrong there. Try sending your message again.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          disabled={isBusy}
          autoComplete="off"
        />
        <button
          className="chat-input-send"
          type="submit"
          disabled={isBusy || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
