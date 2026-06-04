"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
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
      text: "Hi, I'm Isa. The first two sections of Paul's new book are [free to download](/book#signup). The rest will be here soon. Or ask me anything about what we do.",
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
      text: "You found the contact page, so you're after a real conversation. Paul does 30-minute strategy chats: [book one here](https://cal.com/paul-dervan-mjfd50). Or tell me what you're working on and I'll point you the right way.",
    },
  ],
};

export default function ChatWidget() {
  const pathname = usePathname();
  const isContact = pathname === "/contact";
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    // Contact page tracks its own dismissal so closing Isa on the homepage
    // doesn't stop her opening when someone reaches the contact page.
    const dismissKey = isContact ? "isa-dismissed-contact" : "isa-dismissed";
    if (sessionStorage.getItem(dismissKey)) return;
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
    <div className="chat-panel">
      <div className="chat-panel-header">
        <span className="chat-panel-title">isa</span>
        <button
          className="chat-panel-close"
          onClick={() => { setIsOpen(false); sessionStorage.setItem(isContact ? "isa-dismissed-contact" : "isa-dismissed", "1"); }}
          aria-label="Close chat"
        >
          &times;
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
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/book_cover.JPG" alt="The Fox Advantage" style={{ width: 60, height: "auto", flexShrink: 0 }} />
                    <p>Hi, I&apos;m Isa. The first two sections of Paul&apos;s new book are <a href="/book#signup">free to download</a>. The rest will be here soon. Or ask me anything about what we do.</p>
                  </div>
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
