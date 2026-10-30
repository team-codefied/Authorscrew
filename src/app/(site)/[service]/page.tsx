import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_PAGES, SERVICE_SLUGS } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const meta = SERVICE_PAGES[service];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${service}` },
    openGraph: { title: meta.title, description: meta.description, url: `/${service}`, images: [meta.banner] },
  };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const meta = SERVICE_PAGES[service];
  if (!meta) notFound();
  return <ServicePage meta={meta} />;
}
