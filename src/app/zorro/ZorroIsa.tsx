"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { renderChatMarkdown } from "@/lib/chat-markdown";

/**
 * ISA, IN THE /zorro RAIL. The same slot and the same panel as the course modules
 * (course/[n]/ModuleIsa.tsx), because this page has the module's bones. Paul, 12 Sep 2026:
 * "I didn't see Isa on the Zorro page even though we talk about it, so it needs to go there.
 * In our AI fluency training modules, isa sits in the rail."
 *
 * The floating widget is suppressed on /zorro (ChatWidgetLoader), so this is the only Isa on
 * the page. Two Isas on one page was built, looked at and rejected on 24 Jul 2026.
 *
 * Scoping is server-side: this sends mode "zorro" and the API loads the course pages
 * (lib/zorro-system-prompt.ts). Nothing here pastes prose into a prompt.
 */

function textOf(m: UIMessage): string {
  return m.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

const WELCOME: UIMessage = {
  id: "welcome-zorro-rail",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Isa here. I know this week's gym, the four agents, the clock and the set-up, and I've read every page here. Stuck on Claude Code, Attio, or a page that will not give the same answer twice? Tell me the step number, what you typed and what you saw.",
    },
  ],
};

export default function ZorroIsa() {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    messages: [WELCOME],
    transport: new DefaultChatTransport({ api: "/api/chat", body: { mode: "zorro" } }),
    onError: (e) => console.error("[isa:zorro] chat error:", e),
  });

  const isBusy = status === "streaming" || status === "submitted";
  const started = messages.some((m) => m.role === "user");

  /* Only scroll the panel once a conversation exists. Doing it on mount drags the
     whole page down to the rail on load. */
  useEffect(() => {
    if (started) endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, started]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    setInput("");
    sendMessage({ text });
  };

  return (
    <div className="mod-isa">
      <div className="mod-isabar">
        <i className="r" />
        <i className="a" />
        <i className="g" />
        <span className="mod-isatitle">isa</span>
      </div>

      <div className="mod-isamsg" data-started={started ? "1" : "0"}>
        {messages.map((m) => (
          <p key={m.id} className="mod-isaline" data-role={m.role}>
            <span dangerouslySetInnerHTML={{ __html: renderChatMarkdown(textOf(m)) }} />
          </p>
        ))}
        {isBusy && (
          <p className="mod-isaline" data-role="assistant">
            <span className="mod-isadots">
              <i />
              <i />
              <i />
            </span>
          </p>
        )}
        {error && (
          <p className="mod-isaline" data-role="error">
            She could not answer that one. Try again in a moment.
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form className="mod-isaask" onSubmit={submit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Stuck? Tell Isa the step number..."
          aria-label="Ask Isa about the gym build"
          maxLength={2000}
        />
        <button type="submit" disabled={isBusy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
