import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { QuoteButton } from "@/components/PopupProvider";
import { Faq } from "@/components/sections";
import { Container, LinkButton, SectionHeading, buttonClass } from "@/components/ui";
import faq from "@/content/our-services-faq.json";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description: "From ghostwriting to global distribution, Authors Crew handles every step of your book journey: writing, editing, cover design, publishing, audiobooks and marketing.",
  alternates: { canonical: "/our-services" },
};

const cards = [
  { title: "Ghostwriting", text: "Transform your ideas into compelling manuscripts, professionally written in your unique authentic voice.", href: "/ghostwriting-services", cta: "Start Writing", icon: "ghostwriting" },
  { title: "Book Publishing", text: "End-to-end publishing services, including formatting, ISBN registration, print production, and global book distribution.", href: "/book-publishing-services", cta: "Publish Your Book", icon: "book-publishing" },
  { title: "Book Marketing", text: "Strategic marketing and author branding that increase visibility, reader engagement, and lasting sales.", href: "/book-marketing-services", cta: "Grow Your Audience", icon: "book-marketing" },
  { title: "Editing & Proofreading", text: "Professional editing and proofreading that enhance clarity, strengthen structure.", href: "/book-editing-services", cta: "Polish Your Manuscript", icon: "editing-and-proofreading" },
  { title: "Book Cover Design", text: "Custom book cover designs that capture attention, reflect your story, and inspire readers.", href: "/book-cover-design", cta: "Design Your Cover", icon: "book-cover-design" },
  { title: "Audiobook Publishing", text: "Professional audiobook production, narration, and global distribution for your audiobook.", href: "/audiobook-publishing-services", cta: "Create Your Audiobook", icon: "ebook-writing" },
];

const why = ["Author-Focused Approach", "Expert Creative Team", "Global Publishing Reach", "End-to-End Support"];

export default function OurServices() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy pt-36 pb-16 text-white sm:pt-44 sm:pb-24">
        <Image src="/images/services/banner-publishing.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/75">
            <Link href="/" className="hover:underline">Home</Link> <span aria-hidden>/</span> Our Services
          </nav>
          <h1 className="font-serif text-4xl font-medium sm:text-5xl">Our Services</h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <QuoteButton className={buttonClass("amber")}>Get A Quote</QuoteButton>
            <LinkButton href={SITE.phoneHref} variant="outline">Schedule a Call</LinkButton>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="360° Author Services, One Expert Crew"
            intro="From ghostwriting to global distribution, we handle every step of your journey so you can focus on becoming the author you’re meant to be."
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <li key={c.title} className="flex flex-col rounded-2xl bg-navy p-7 text-white">
                <Image src={`/images/icons-imgs/home/${c.icon}.webp`} alt="" width={56} height={56} className="size-14" />
                <h2 className="mt-5 text-xl font-semibold">
                  <Link href={c.href} className="hover:underline">{c.title}</Link>
                </h2>
                <p className="mt-2 flex-1 leading-relaxed text-white/80">{c.text}</p>
                <Link href={c.href} className="mt-5 font-semibold text-amber hover:underline">{c.cta} &rarr;</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Why Authors Choose Us"
            intro="We don’t just publish books, we help build successful authors. Every project is shaped around your unique voice, creative vision, and publishing goals. From manuscript to market, our experienced team delivers the guidance, craftsmanship, and strategic support needed to create a book that makes a lasting impact."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <li key={w} className="rounded-2xl border-t-4 border-teal bg-white p-6 text-center text-lg font-semibold text-navy shadow-sm">{w}</li>
            ))}
          </ul>
        </Container>
      </section>

      <Faq title="Your Publishing Questions, Answered" items={faq} />

      <section className="bg-navy py-16 text-white sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-tight font-medium sm:text-4xl">Turn Your Vision Into a Published Success</h2>
            <p className="mt-4 text-lg text-white/90">From concept to publication, we provide the professional services and expert support needed to bring your book to readers worldwide.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-ink sm:p-8">
            <LeadForm variant="contact" submitLabel="Submit" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-xl">
          <h2 className="mb-6 text-center font-serif text-3xl font-medium text-navy">Start Your Author Journey</h2>
          <LeadForm variant="journey" submitLabel="Get Consultation" />
        </Container>
      </section>
    </>
  );
}
