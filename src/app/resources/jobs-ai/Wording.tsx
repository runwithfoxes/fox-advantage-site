"use client";

import { useState } from "react";
import s from "../resources.module.css";
import { WORDING, ASK_LABEL, type Ask } from "../data";

/** The library of real employer wording, inside the site's window component. */
export default function Wording() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<Ask | "all">("all");
  const t = q.trim().toLowerCase();
  const rows = WORDING.filter(
    (r) => (kind === "all" || r.ask === kind) && (!t || `${r.co} ${r.role} ${r.q}`.toLowerCase().includes(t)),
  );
  const kinds: (Ask | "all")[] = ["all", "tools", "lead", "search", "build", "sell"];

  return (
    <div className="mod-win" style={{ marginTop: 4 }}>
      <div className="mod-winbar">
        <span className="mod-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="mod-wintitle">the wording</span>
        <span className={s.wincount}>
          {rows.length} of {WORDING.length}
        </span>
      </div>
      <div className={s.libtools}>
        <input
          id="wording-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search the wording, a company or a role"
          aria-label="Search the wording"
        />
        {kinds.map((k) => (
          <button key={k} type="button" className={s.chip} aria-pressed={kind === k} onClick={() => setKind(k)}>
            {k === "all" ? "All" : ASK_LABEL[k]}
          </button>
        ))}
      </div>
      {rows.map((r) => (
        <div key={r.co + r.role} className={s.quote}>
          <div className={s.who}>
            <b>{r.co}</b>
            <span>{r.role}</span>
            <em>{ASK_LABEL[r.ask]}</em>
            <span>{r.when}, {r.where}</span>
          </div>
          <blockquote>{"\u201C" + r.q + "\u201D"}</blockquote>
        </div>
      ))}
      {rows.length === 0 ? <p className={s.empty}>Nothing matches that yet.</p> : null}
    </div>
  );
}
