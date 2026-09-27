import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import AccessForm from "../resources/kit/AccessForm";
import { Top } from "../resources/reports/shared";
import f from "../resources/front.module.css";
import k from "../resources/kit/kit.module.css";

export const metadata: Metadata = {
  title: "Sign in | Run with Foxes",
  description: "One free account for every report, the library, the datasets and the course. Put in your email and everything opens.",
  robots: { index: false, follow: false },
};

/**
 * SIGN IN, at launch. Paul, 27 Sep 2026, on the nav: "We need to make this simple." There is no
 * password. You give the email you used before, the same route as every other ask (/api/access,
 * tagged "account"), and this browser gets the access and identity cookies back. Nothing is sent
 * unless the email is new, in which case the welcome flow sends the links. When a real login with
 * saved progress arrives (Kit's job), this page keeps its address and grows a password box.
 */
export default function SignInPage() {
  return (
    <div className={f.page}>
      <Top crumbs={[{ href: "/resources", t: "Resources" }, { t: "Sign in" }]} />
      <main className={f.wrap} style={{ maxWidth: 560, padding: "72px 24px 96px" }}>
        <p className={f.meta}>One free account for everything here</p>
        <h1 className={f.h2} style={{ marginBottom: 14 }}>Sign in</h1>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 16.5, lineHeight: 1.65, margin: "0 0 22px" }}>
          Put in the email you used before and everything opens on this device: every report and its PDF, the library, the datasets
          and the course. No password. If you have never been here, the same box signs you up.
        </p>
        <AccessForm want="account" label="Sign in" className={k.gateForm} doneClassName={k.gateDone} done="You're in. Everything is open to you on this device." />
        <p className={k.gateNote} style={{ marginTop: 18 }}>
          Nothing to pay and nothing to upgrade to. <Link href="/resources">Back to the research</Link>.
        </p>
      </main>
      <SiteFooter current="/resources" wide />
    </div>
  );
}
