"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { verifyPassword } from "./actions";

/* The door. One password for the class, given out in the room on Monday morning. */
export default function ZorroDoor() {
  const [pw, setPw] = useState("");
  const [wrong, setWrong] = useState(false);
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <div className="mod-shell">
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
      </header>
      <header className="mod-masthead">
        <p className="mod-eyebrow">UCD x IE &middot; Strategic Gen AI in Business &middot; 14 to 18 September 2026</p>
        <h1 className="mod-h1">
          Gimnasio <span className="mod-hl">Zorro</span>
        </h1>
        <div className="chapter-fox-hero">
          <img className="chapter-fox-hero-img" src="/fox/fox-spain-team-nobg.png" alt="" />
        </div>
        <p className="mod-standfirst">
          This is the page for the week. The gym, the files, what to have ready and what
          you do each day. You were given the password in the room. If you missed it, ask
          Paul or Julie.
        </p>
      </header>
      <form
        className="zorro-door"
        onSubmit={(e) => {
          e.preventDefault();
          setWrong(false);
          start(async () => {
            const ok = await verifyPassword(pw);
            if (ok) router.refresh();
            else setWrong(true);
          });
        }}
      >
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          autoFocus
          aria-label="Password"
        />
        <button type="submit" disabled={pending || !pw}>
          {pending ? "Checking" : "Open"}
        </button>
        {wrong && <p className="zorro-doorwrong">That is not it. Try again.</p>}
      </form>
    </div>
  );
}
