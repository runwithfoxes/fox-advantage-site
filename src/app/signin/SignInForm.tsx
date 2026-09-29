"use client";

import { useState } from "react";
import Link from "next/link";
import AccessForm from "../resources/kit/AccessForm";
import k from "../resources/kit/kit.module.css";

/**
 * Sign in, then say where to go next (Paul, 29 Sep 2026: someone back for the course "just thinks
 * that it's a new thing altogether"). The course first, because that is who comes back.
 */
export default function SignInForm() {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <div style={{ display: "grid", gap: 14 }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.6, margin: 0 }}>You&apos;re in. Everything is open to you on this device.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/course" className={k.signGo}>Go to the course →</Link>
          <Link href="/course/everything" className={k.signGoGhost}>Open the library →</Link>
        </div>
      </div>
    );
  }
  return <AccessForm want="account" label="Sign in" className={k.gateForm} doneClassName={k.gateDone} done="" onDone={() => setDone(true)} />;
}
