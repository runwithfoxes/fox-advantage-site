import Link from "next/link";
import type { Metadata } from "next";
import NextNav from "@/app/home-next/NextNav";
import SiteFooter from "@/components/SiteFooter";
import CopyLine from "./CopyLine";

/**
 * /follow - HOW TO HAVE YOUR OWN CLAUDE FOLLOW THE SITE. Sam and Paul, 15 Oct 2026, after Dan Shipper's
 * argument that readers' agents now filter the inbox, so a newsletter alone no longer reaches people.
 * Email stays; this sits beside it. The instruction points at /feed.xml, built in src/lib/feed.ts.
 * Words written by Kit and put to Paul in chat on 15 Oct before this page was built.
 */
export const metadata: Metadata = {
  title: "Follow Run with Foxes in your Claude \\ Run with Foxes",
  description:
    "An instruction to paste into Claude, or whichever assistant you use, so it checks Run with Foxes every Monday and tells you the two pieces worth reading.",
  alternates: { canonical: "https://runwithfoxes.com/follow" },
};

const INSTRUCTION =
  "Every Monday morning, check runwithfoxes.com/feed.xml for anything published in the last week. Pick the two pieces most useful to a marketer working with AI, and give me each one's title, link and one line on why it's worth reading. If nothing is new, say so in one line.";

export default function FollowPage() {
  return (
    <div className="essay-page">
      <NextNav bar />
      <main className="essay-main">
        <div className="essay-inner">
          <div className="essay-header">
            <Link href="/read" className="essay-nav-back essay-back">&larr; read</Link>
            <h1 className="essay-heading">Follow Run with Foxes in your Claude</h1>
          </div>
          <div className="essay-prose">
            <p>
              Most of what we publish goes out by email. But more people now have an AI assistant reading their
              inbox for them, and a newsletter can be filtered out before you ever see it. So here&apos;s another
              way to keep up.
            </p>
            <p>Paste this into Claude, or whichever assistant you use:</p>
            <blockquote>
              <p>{INSTRUCTION}</p>
            </blockquote>
            <CopyLine text={INSTRUCTION} />
            <p style={{ marginTop: 28 }}>
              If your assistant can run a task on a schedule, set this one for Monday mornings. If it can&apos;t,
              paste it in yourself on a Monday. It takes a minute.
            </p>
            <p>
              The <a href="/feed.xml">feed</a> has everything new from every section: my{" "}
              <Link href="/essays">essays</Link>, Lena&apos;s <Link href="/diary">diary of the agent team</Link>,
              Sam&apos;s <Link href="/research-nuggets">research nuggets</Link>, Dean&apos;s{" "}
              <Link href="/caught-our-eye">Caught our eye</Link> and Dray&apos;s <Link href="/craft">Craft</Link>.
              Every piece also comes as plain text if you add .md to its address, which makes it easier for an
              assistant to read.
            </p>
            <p>We still send the email. This is for people who&apos;d rather their assistant did the reading.</p>
          </div>
        </div>
      </main>
      <SiteFooter current="/follow" />
    </div>
  );
}
