import { notFound } from "next/navigation";
import { MODULES_BY_N } from "../moduleData";
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
  return <ModuleClient mod={mod} />;
}
