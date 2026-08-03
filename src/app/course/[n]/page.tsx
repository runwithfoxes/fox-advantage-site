import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { MODULES_BY_N } from "../moduleData";
import CourseDoor from "./CourseDoor";
import ModuleClient from "./ModuleClient";

/**
 * /course/[n] - A MODULE PAGE.
 *
 * ⚠️ NOT LINKED FROM ANYWHERE YET, and must not be until Paul says so. /course is live
 * in production and this route sits beside it unannounced, exactly as /course itself did
 * before it was revealed.
 *
 * ⚠️ NO EMAIL DOOR ON IT YET. Paul ruled on 19 Jul that email is how someone gets into a
 * module. The capture chain is built and proven (form to Klaviyo to inbox); what does not
 * exist is this page recognising a person who already signed up. That goes in before any
 * link to here is revealed.
 */

export function generateStaticParams() {
  return Object.keys(MODULES_BY_N).map((n) => ({ n }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const mod = MODULES_BY_N[Number(n)];
  if (!mod) return {};
  return {
    title: `${mod.title} - Run with Foxes`,
    description: mod.blurb,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const mod = MODULES_BY_N[Number(n)];
  if (!mod) notFound();

  /* ⭐⭐ THE DOOR IS CHECKED ON THE SERVER, 3 Aug 2026. Paul: "I want everybody that does the
     course must sign up through email." A client-side gate renders the whole module and then
     hides it, so the lesson is in the page source and one devtools click away, which would
     make the sentence on the door untrue for anyone who looked.

     ⛔ IT IS STILL NOT A LOCK. Anyone who types an email is in, including an address we have
     never seen, because the point is a NAME on the behaviour rather than keeping people out.
     See CourseDoor. */
  const identified = (await cookies()).get("rwf_course_id")?.value ?? "";
  if (!identified.includes("@")) {
    return <CourseDoor n={mod.n} title={mod.title} when={mod.when} />;
  }

  return <ModuleClient mod={mod} />;
}
