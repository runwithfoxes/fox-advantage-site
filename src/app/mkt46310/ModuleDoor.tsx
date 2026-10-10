"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { verifyPassword } from "./actions";

/* The door. One password for the class, given out in the room. */
export default function ModuleDoor() {
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
        <p className="mod-eyebrow">UCD Smurfit &middot; MKT46310 &middot; Autumn 2026</p>
        <h1 className="mod-h1">
          AI and Digital Marketing <span className="mod-hl">Strategy</span>
        </h1>
        <div className="chapter-fox-hero">
          <img className="chapter-fox-hero-img" src="/fox/fox-monday-nobg.png" alt="" />
        </div>
        <p className="mod-standfirst">
          This is the page for the module. It has what the module is for, the twelve classes,
          the team project and the files you download. You were given the password in class.
          If you missed it, ask Paul.
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
