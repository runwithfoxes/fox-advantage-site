"use client";

import k from "./kit.module.css";
import Lock from "./Lock";
import AccessForm, { type Want } from "./AccessForm";

/**
 * THE GATE (Paul, 26 Sep 2026: "let people see research to an extent, get them to subscribe for
 * the better, detailed stuff, while still being generous and not pushy").
 *
 * The rule: the finding is free; your own answer and the working files need an email. One free
 * account opens everything, and once someone has it they are never asked again.
 *
 * So this sits at the END of a piece as a quiet list of what an account adds, never as a pop-up
 * and never cutting a piece off halfway. Since 27 Sep the form is real: AccessForm posts to
 * /api/access tagged with what this page is (want) and which one (item).
 */
export default function Gate({ adds, head = "When you sign up", want = "account", item }: { adds: string[]; head?: string; want?: Want; item?: string }) {
  if (!adds.length) return null;
  return (
    <aside className={k.gate} aria-label="What signing up adds">
      <div>
        <p className={k.gateHead}>{head}</p>
        <ul className={k.gateList}>
          {adds.map((a) => (
            <li key={a}>
              <Lock />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <AccessForm want={want} item={item} className={k.gateForm} doneClassName={k.gateDone} done="You're in. Everything above is open to you." />
        <p className={k.gateNote}>Sign up once for the reports, the library and the course. No payment, ever.</p>
      </div>
    </aside>
  );
}
