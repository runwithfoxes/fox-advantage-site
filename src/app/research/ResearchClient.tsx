"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { renderChatMarkdown } from "@/lib/chat-markdown";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

function generateId(): string {
  return "anon-" + Math.random().toString(36).slice(2, 10);
}

type Phase = "landing" | "interview" | "complete" | "email-sent";

export default function ResearchClient() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref");

  const refId = useRef(
    refParam ||
      (typeof window !== "undefined" &&
        sessionStorage.getItem("research-ref")) ||
      generateId()
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("research-ref", refId.current);
    }
  }, []);

  const [phase, setPhase] = useState<Phase>("landing");
  const [emailValue, setEmailValue] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = useState("");

  const [transport] = useState(
    () =>
      new DefaultChatTransport({
        api: "/api/research/chat",
        body: { refId: refId.current },
      })
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (e) => console.error("[research] chat error:", e),
  });

  const isBusy = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (phase === "interview" && !isBusy) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [phase, isBusy, messages]);

  useEffect(() => {
    if (status !== "ready" || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (
      lastMsg.role === "assistant" &&
      getMessageText(lastMsg).includes("[INTERVIEW_COMPLETE]")
    ) {
      const fullText = messages.map((m) => getMessageText(m)).join(" ");
      const emailCaptured = /\[EMAIL:\s*[^\]]+\]/.test(fullText);
      setPhase(emailCaptured ? "email-sent" : "complete");
    }
  }, [messages, status]);

  const handleStart = useCallback(() => {
    setPhase("interview");
    sendMessage({ text: "Ready." });
  }, [sendMessage]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;
    setInput("");
    sendMessage({ text: trimmed });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    const email = emailValue.trim().toLowerCase();
    if (!email || !email.includes("@")) return;

    setEmailSaving(true);
    try {
      await fetch("/api/research/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refId: refId.current, email }),
      });
      setPhase("email-sent");
    } catch {
      setEmailSaving(false);
    }
  }

  function stripSignal(text: string): string {
    return text
      .replace("[INTERVIEW_COMPLETE]", "")
      .replace(/\[EMAIL:\s*[^\]]+\]/g, "")
      .trim();
  }

  // -- Landing --
  if (phase === "landing") {
    return (
      <div className="no-chat-widget" style={styles.page}>
        <div style={styles.landing}>
          <div style={styles.topLabel}>/ research</div>
          <h1 style={styles.h1}>
            How do you feel about AI doing your research?
          </h1>
          <p style={styles.intro}>
            We are running a study on how marketers think about using AI
            for research. Isa, our AI researcher, will have a conversation with
            you about it. Not a survey. Just a chat. Takes a few minutes.
            Everything is anonymised.
          </p>
          <button style={styles.startBtn} onClick={handleStart}>
            Start the interview
          </button>
          <p style={styles.footnote}>
            Research by Run with Foxes. Your responses are anonymised.
          </p>
        </div>
      </div>
    );
  }

  // -- Interview / Complete / Email --
  return (
    <div className="no-chat-widget" style={styles.page}>
      <div style={styles.chatContainer}>
        {/* Conversation indicator */}
        <div style={styles.topLabel}>/ research</div>

        {/* Messages */}
        <div style={styles.messages}>
          {messages.map((m) => {
            const rawText = getMessageText(m);
            const text = stripSignal(rawText);
            if (!text) return null;

            const isSnapshot =
              phase === "complete" &&
              m === messages[messages.length - 1] &&
              m.role === "assistant";

            if (m.role === "user") {
              return (
                <div key={m.id} style={styles.userMsg}>
                  {text}
                </div>
              );
            }

            return (
              <div
                key={m.id}
                style={isSnapshot ? styles.snapshot : styles.aiMsg}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderChatMarkdown(text),
                  }}
                />
              </div>
            );
          })}

          {isBusy && messages[messages.length - 1]?.role !== "assistant" && (
            <div style={styles.aiMsg}>
              <span style={styles.typing}>...</span>
            </div>
          )}

          {status === "error" && (
            <div style={styles.aiMsg}>
              Something went wrong. Try sending your message again.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Email capture (shown after interview completes) */}
        {phase === "complete" && (
          <form style={styles.emailForm} onSubmit={handleEmailSubmit}>
            <p style={styles.emailPrompt}>
              Want to see how other marketers answered? Leave your email and
              we will send you the report when we have 50 responses.
            </p>
            <div style={styles.emailRow}>
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="your@email.com"
                style={styles.emailInput}
                disabled={emailSaving}
              />
              <button
                type="submit"
                style={styles.emailBtn}
                disabled={emailSaving || !emailValue.trim()}
              >
                {emailSaving ? "Saving..." : "Yes, send it"}
              </button>
            </div>
          </form>
        )}

        {phase === "email-sent" && (
          <div style={styles.thankYou}>
            Done. We will be in touch.
          </div>
        )}

        {/* Input (hidden when interview is complete) */}
        {phase === "interview" && (
          <form style={styles.inputForm} onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your answer..."
              style={styles.textarea}
              disabled={isBusy}
              rows={1}
            />
            <button
              type="submit"
              style={{
                ...styles.sendBtn,
                opacity: isBusy || !input.trim() ? 0.4 : 1,
              }}
              disabled={isBusy || !input.trim()}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#FAFAF8",
    display: "flex",
    justifyContent: "center",
    padding: "0 20px",
  },

  // Landing
  landing: {
    maxWidth: 600,
    paddingTop: "20vh",
    textAlign: "left",
  },
  topLabel: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 11,
    letterSpacing: 2,
    color: "#8A8A85",
    textTransform: "uppercase" as const,
    marginBottom: 24,
  },
  h1: {
    fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
    fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: 300,
    lineHeight: 1.2,
    color: "#1D1B1B",
    margin: "0 0 20px 0",
  },
  intro: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 13,
    lineHeight: 1.9,
    color: "#1D1B1B",
    margin: "0 0 32px 0",
    maxWidth: 520,
  },
  startBtn: {
    fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
    fontSize: 15,
    fontWeight: 500,
    color: "#fff",
    backgroundColor: "#3A7CA5",
    border: "none",
    borderRadius: 6,
    padding: "14px 32px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  footnote: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 11,
    color: "#8A8A85",
    marginTop: 24,
  },

  // Chat
  chatContainer: {
    maxWidth: 720,
    width: "100%",
    paddingTop: 60,
    paddingBottom: 120,
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "100vh",
  },
  messages: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    gap: 16,
  },
  aiMsg: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 13,
    lineHeight: 1.9,
    color: "#1D1B1B",
    borderLeft: "3px solid #3A7CA5",
    paddingLeft: 16,
    maxWidth: "85%",
  },
  userMsg: {
    fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
    fontSize: 13,
    lineHeight: 1.7,
    color: "#1D1B1B",
    backgroundColor: "#fff",
    border: "1px solid #E0E0DC",
    borderRadius: 8,
    padding: "12px 16px",
    maxWidth: "75%",
    alignSelf: "flex-end" as const,
  },
  snapshot: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 13,
    lineHeight: 1.9,
    color: "#1D1B1B",
    borderLeft: "3px solid #3A7CA5",
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#f4f8fa",
    borderRadius: "0 8px 8px 0",
    maxWidth: "90%",
  },
  typing: {
    color: "#8A8A85",
    letterSpacing: 3,
  },

  // Input
  inputForm: {
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    gap: 8,
    padding: "16px 20px 24px",
    backgroundColor: "#FAFAF8",
    borderTop: "1px solid #E0E0DC",
    justifyContent: "center",
  },
  textarea: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#1D1B1B",
    backgroundColor: "#fff",
    border: "1px solid #E0E0DC",
    borderRadius: 6,
    padding: "12px 14px",
    width: "100%",
    maxWidth: 660,
    resize: "none" as const,
    outline: "none",
    fieldSizing: "content" as unknown as undefined,
    maxHeight: 120,
  },
  sendBtn: {
    fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
    fontSize: 13,
    fontWeight: 500,
    color: "#fff",
    backgroundColor: "#3A7CA5",
    border: "none",
    borderRadius: 6,
    padding: "12px 20px",
    cursor: "pointer",
    alignSelf: "flex-end" as const,
    whiteSpace: "nowrap" as const,
  },

  // Email capture
  emailForm: {
    marginTop: 32,
    paddingTop: 24,
    borderTop: "1px solid #E0E0DC",
  },
  emailPrompt: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 12,
    lineHeight: 1.8,
    color: "#8A8A85",
    margin: "0 0 12px 0",
  },
  emailRow: {
    display: "flex",
    gap: 8,
  },
  emailInput: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 13,
    color: "#1D1B1B",
    backgroundColor: "#fff",
    border: "1px solid #E0E0DC",
    borderRadius: 6,
    padding: "10px 14px",
    flex: 1,
    maxWidth: 300,
    outline: "none",
  },
  emailBtn: {
    fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
    fontSize: 13,
    fontWeight: 500,
    color: "#fff",
    backgroundColor: "#3A7CA5",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },
  thankYou: {
    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
    fontSize: 13,
    color: "#3A7CA5",
    marginTop: 32,
    paddingTop: 24,
    borderTop: "1px solid #E0E0DC",
  },

};
