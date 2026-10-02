import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SignInForm from "./SignInForm";
import { Top } from "../resources/reports/shared";
import f from "../resources/front.module.css";
import k from "../resources/kit/kit.module.css";

export const metadata: Metadata = {
  title: "Sign in | Run with Foxes",
  description: "Sign up once for every report, the library, the datasets and the course. Put in your email and everything opens.",
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
      <Top crumbs={[{ href: "/", t: "Home" }, { t: "Sign in" }]} />
      <main className={f.wrap} style={{ maxWidth: 560, padding: "72px 24px 96px" }}>
        <p className={f.meta} data-ask>Sign up once for everything here</p>
        <h1 className={f.h2} style={{ marginBottom: 14 }}>Sign in</h1>
        {/* 1 Oct 2026: someone already signed in on this device is told so and shown the way in,
            rather than a box asking for the email again (src/components/Known.tsx). It is the same
            block SignInForm shows the moment a sign-in works, word for word, so signing in here and
            arriving here signed in look the same. */}
        <div data-known-only style={{ display: "grid", gap: 14 }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.6, margin: 0 }}>You&apos;re in. Everything is open to you on this device.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/course" className={k.signGo}>Go to the course →</Link>
            <Link href="/course/everything" className={k.signGoGhost}>Open the library →</Link>
          </div>
        </div>
        <div data-ask>
          <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 16.5, lineHeight: 1.65, margin: "0 0 22px" }}>
            On the course already? Put in the email you signed up with and it opens on this device, along with the
            library and every report. No password. If you have never been here, the same box signs you up.
          </p>
          <SignInForm />
        </div>
        <p className={k.gateNote} style={{ marginTop: 18 }}>
          Nothing to pay and nothing to upgrade to. <Link href="/">Back to the homepage</Link>.
        </p>
      </main>
      <SiteFooter current="/resources" wide />
    </div>
  );
}
