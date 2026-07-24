"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { renderChatMarkdown } from "@/lib/chat-markdown";
import type { ModuleDef } from "../moduleData";

/**
 * ISA, IN THE MODULE PAGE RAIL. The real chat, in the slot v8 designed for her.
 *
 * ⭐ WHY SHE IS HERE AND NOT FLOATING. The floating widget's close, minimise and drag
 * all exist for one reason: to get her OUT OF THE WAY of the page. In the column she is
 * never in the way, so none of them have a job and none of them are here. The three
 * traffic-light dots stay, because they are the signature that says "this is software",
 * and they are the one thing in this panel that is decoration rather than control.
 *
 * ⚠️ This is NOT a second Isa. The floating widget is suppressed on /course and its
 * children (see ChatWidgetLoader). Two Isas on one page was built, looked at, and
 * rejected on 24 Jul 2026. If you ever un-suppress the floating one here, delete this.
 *
 * Scoping is done SERVER-SIDE: this sends `moduleN`, a number, and the API builds the
 * context from module data. Never send prose to be pasted into a system prompt.
 */

function textOf(m: UIMessage): string {
  return m.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function ModuleIsa({ mod }: { mod: ModuleDef }) {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  /* Her opening line names the module and the one thing she can uniquely do here.
     It is deliberately the same promise the v8 drawing made, now that it is true. */
  const welcome: UIMessage = {
    id: `welcome-m${mod.n}`,
    role: "assistant",
    parts: [
      {
        type: "text",
        text: `I'm here for this module. Ask me anything about **${mod.title.toLowerCase()}**, or paste something back and I'll tell you whether it does what the item is asking for.`,
      },
    ],
  };

  const { messages, sendMessage, status, error } = useChat({
    messages: [welcome],
    onError: (e) => console.error("[isa:module] chat error:", e),
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
    sendMessage({ text }, { body: { moduleN: mod.n } });
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
            <span
              dangerouslySetInnerHTML={{ __html: renderChatMarkdown(textOf(m)) }}
            />
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
          placeholder="Ask about this module..."
          aria-label={`Ask Isa about module ${mod.n}`}
          maxLength={2000}
        />
        <button type="submit" disabled={isBusy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
