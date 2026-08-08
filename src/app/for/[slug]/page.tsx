import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProspectPage, PROSPECT_PAGES } from "@/lib/prospect-pages";
import { checkProspectAuth, verifyProspectPassword } from "../actions";
import PageGate from "../_components/PageGate";

export function generateStaticParams() {
  return Object.keys(PROSPECT_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getProspectPage(slug);
  return {
    title: page ? page.tabTitle : "Run with Foxes",
    description: "Private.",
    robots: { index: false, follow: false },
  };
}

export default async function ProspectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getProspectPage(slug);
  if (!page) notFound();

  const authed = await checkProspectAuth(slug);
  return (
    <PageGate
      slug={slug}
      clientName={page.client}
      initialAuth={authed}
      verifyAction={verifyProspectPassword}
    />
  );
}
