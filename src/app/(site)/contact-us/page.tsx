import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/Decor";
import { IMG } from "@/lib/img";
import { Container } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to the Authors Crew team about your book. Call +1 626-562-1861, email info@authorscrew.com or send us a message.",
  alternates: { canonical: "/contact-us" },
};

const details = [
  { label: "Headquarters", value: SITE.hq },
  { label: "Regional Office", value: SITE.regional },
  { label: "Phone", value: SITE.phone, href: SITE.phoneHref },
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
];

export default function ContactUs() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Authors Crew",
    url: `${SITE.url}/contact-us`,
    mainEntity: { "@type": "Organization", name: SITE.name, telephone: SITE.phone, email: SITE.email },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        title="Contact Us"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        eyebrow="We'd love to hear from you"
        intro="Call, email or send a message. A publishing consultant replies within one business day."
        visual={IMG.publishers}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">Let’s Start the Conversation About Your Book</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Whether you’re starting with a rough idea or a fully developed concept, our team is here to guide you through the next step of your author journey. Reach out to discuss your vision, ask questions, or explore how we can help turn your story into a{" "}
              <Link href="/ghostwriting-services" className="font-semibold text-teal-dark hover:underline">professionally written</Link> and{" "}
              <Link href="/book-publishing-services" className="font-semibold text-teal-dark hover:underline">published book</Link>.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="rounded-xl bg-mist p-5">
                  <dt className="text-sm font-semibold tracking-wide text-teal-dark uppercase">{d.label}</dt>
                  <dd className="mt-1 text-slate-700">
                    {d.href ? <a href={d.href} className="hover:text-teal-dark hover:underline">{d.value}</a> : d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-navy/10 ring-1 ring-slate-100 sm:p-8">
            <LeadForm variant="contact" submitLabel="Submit Now" />
          </div>
        </Container>
      </section>
    </>
  );
}
