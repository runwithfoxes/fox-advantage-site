"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
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
      text: "Hello. I'm Isa. I work with Paul. I've picked up a fair bit of what he knows. He's an absolute nerd. But I'm a robot so I can hardly throw rocks. How can I help?",
    },
  ],
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    messages: [WELCOME],
    onError: (e) => console.error("[isa] chat error:", e),
  });

  const isBusy = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom on new messages or errors
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, error]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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
          onClick={() => setIsOpen(false)}
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
