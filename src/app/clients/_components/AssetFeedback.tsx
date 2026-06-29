"use client";

import { useState } from "react";
import { submitDecision, submitComment } from "./feedback-actions";
import type { AssetFeedback as AssetFeedbackData, Decision, ThreadEntry } from "@/lib/client-feedback-store";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function AssetFeedback({
  slug,
  assetId,
  held = false,
  initial,
}: {
  slug: string;
  assetId: string;
  held?: boolean;
  initial?: AssetFeedbackData;
}) {
  const [decision, setDecision] = useState<Decision>(initial?.decision ?? null);
  const [thread, setThread] = useState<ThreadEntry[]>(initial?.thread ?? []);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState("");

  if (held) {
    return (
      <div className="cw-fb">
        <div className="cw-fb-toggle">
          <button type="button" disabled>Approve</button>
          <button type="button" disabled>Not yet</button>
        </div>
        <div className="cw-fb-hold">Hold - still in QA</div>
      </div>
    );
  }

  async function choose(next: Decision) {
    setDecision(next);
    if (next === "reject") setOpen(true);
    setSaved("Saved");
    setTimeout(() => setSaved(""), 1400);
    await submitDecision(slug, assetId, next);
  }

  async function postComment() {
    const text = draft.trim();
    if (!text) return;
    const entry: ThreadEntry = { who: "client", when: new Date().toISOString(), text };
    setThread((t) => [...t, entry]);
    setDraft("");
    setSaved("Saved");
    setTimeout(() => setSaved(""), 1400);
    await submitComment(slug, assetId, text);
  }

  return (
    <div className="cw-fb">
      <div className="cw-fb-toggle">
        <button type="button" className={decision === "approve" ? "on-approve" : ""} onClick={() => choose("approve")}>Approve</button>
        <button type="button" className={decision === "reject" ? "on-reject" : ""} onClick={() => choose("reject")}>Not yet</button>
      </div>

      {thread.length > 0 && (
        <div className="cw-fb-thread">
          {thread.map((e, i) => (
            <div key={i} className={`cw-fb-msg ${e.who === "Paul" ? "from-paul" : "from-client"}`}>
              <span className="cw-fb-who">{e.who === "Paul" ? "Paul" : "You"} · {fmtDate(e.when)}</span>
              <span className="cw-fb-text">{e.text}</span>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="cw-fb-ctoggle" onClick={() => setOpen((o) => !o)}>
        {thread.length ? "✎ add a reply" : "＋ comment"}
      </button>

      {open && (
        <div className="cw-fb-cbox">
          <textarea
            value={draft}
            placeholder="What would you change?"
            onChange={(e) => setDraft(e.target.value)}
          />
          <button type="button" className="cw-fb-send" onClick={postComment}>Save comment</button>
        </div>
      )}
      <div className="cw-fb-saved">{saved}</div>
    </div>
  );
}
