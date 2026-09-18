import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { MODULES } from "../courseModules";
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

  /* ⭐ A MODULE OPENS ON ITS DATE, 18 Sep 2026. Before this nothing hid modules 2-6, so anyone
     typing /course/3 got placeholder prose and "AWAITING PAUL'S WORDS." Dates come from
     courseModules.ts (`on`), compared in Dublin time. Module 1 is exempt so it can be checked
     on production before Mon 21 Sep; it has no link in until then. Dev sees everything. */
  const opens = MODULES.find((m) => m.n === mod.n)?.on;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Dublin" }).format(new Date());
  if (process.env.NODE_ENV !== "development" && mod.n !== 1 && opens && today < opens) {
    redirect("/course");
  }

  /* ⭐⭐ THE DOOR IS CHECKED ON THE SERVER, 3 Aug 2026. Paul: "I want everybody that does the
     course must sign up through email." A client-side gate renders the whole module and then
     hides it, so the lesson is in the page source and one devtools click away, which would
     make the sentence on the door untrue for anyone who looked.

     ⛔ IT IS STILL NOT A LOCK. Anyone who types an email is in, including an address we have
     never seen, because the point is a NAME on the behaviour rather than keeping people out.
     See CourseDoor. */
  /* ⭐ DEV ONLY, 4 Aug 2026. Paul reviews these pages constantly and the door stood between
     him and the work every single time. `NODE_ENV` is "production" in every build Vercel
     ships, so this branch is unreachable in production by construction rather than by a flag
     somebody has to remember to turn off. ⛔ It does NOT weaken the real gate above it. */
  const identified =
    process.env.NODE_ENV === "development"
      ? "dev@localhost"
      : (await cookies()).get("rwf_course_id")?.value ?? "";
  if (!identified.includes("@")) {
    return <CourseDoor n={mod.n} title={mod.title} when={mod.when} />;
  }

  return <ModuleClient mod={mod} />;
}
