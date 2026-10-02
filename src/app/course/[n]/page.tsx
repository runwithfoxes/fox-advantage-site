import { notFound, redirect } from "next/navigation";
import { hasAccess } from "@/lib/access";
import { MODULES, courseToday } from "../courseModules";
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

/* ⛔ THIS PAGE MUST BE RENDERED PER REQUEST, 1 Oct 2026. The date check below redirects
   before `cookies()` is ever read, so a build made before a module's date found nothing
   dynamic in modules 2 to 6 and baked the redirect to /course into a static page. It would
   have stayed a redirect on the module's own date, until whatever deploy happened next.
   Module 1 never showed it because it is exempt from the date check. Found by starting a
   production build with COURSE_NOW=2026-10-05 and asking for /course/2. */
export const dynamic = "force-dynamic";

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
  const today = courseToday();
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
  /* ⭐ 1 Oct 2026: EITHER COOKIE, through hasAccess(), the same check the file route and the
     library use. Someone who signed up for a report or the library was asked for their email a
     second time here. Since 27 Sep every sign-up sets the identity cookie too, so the lesson's
     behaviour events land on a named profile. ⚠️ A browser holding only the older rwf_access
     cookie has no email on it, so course-event records nothing for that visitor. */
  const identified = process.env.NODE_ENV === "development" || (await hasAccess());
  if (!identified) {
    return (
      <CourseDoor n={mod.n} title={mod.title} when={mod.when} live={!opens || today >= opens} />
    );
  }

  return <ModuleClient mod={mod} live={!opens || today >= opens} />;
}
