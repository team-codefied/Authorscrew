import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { QuoteButton } from "@/components/PopupProvider";
import { Container, LinkButton, SectionHeading, buttonClass } from "@/components/ui";
import * as c from "@/content/home";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Authors Crew | Book Publishing, Ghostwriting & Marketing Services" },
  description:
    "Ghostwriting, editing, cover design, publishing and marketing under one roof. Keep 100% of your rights and royalties with Authors Crew.",
  alternates: { canonical: "/" },
};

const check = (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="mt-1 shrink-0 text-teal">
    <path d="m3 9.5 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/images/logo.svg`, telephone: SITE.phone, email: SITE.email },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-navy pt-36 pb-20 text-white sm:pt-44 sm:pb-28">
        <Image src="/images/main-banner.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-right" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30" />
        <Container>
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] font-medium sm:text-6xl">{c.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{c.hero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <QuoteButton className={buttonClass("amber")}>Get a Free Quote</QuoteButton>
            <LinkButton href={SITE.phoneHref} variant="outline">Schedule a Call</LinkButton>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
            {c.hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-amber" aria-hidden>&#10003;</span> {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 2. Platforms */}
      <section className="py-14">
        <Container>
          <SectionHeading title={c.platforms.title} intro={c.platforms.text} />
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {c.platforms.logos.map((l) => (
              <li key={l.name}>
                <Image src={l.src} alt={l.name} width={140} height={50} className="h-10 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
              </li>
            ))}
            {c.platforms.textOnly.map((n) => (
              <li key={n} className="text-xl font-semibold text-slate-500">{n}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. Consultation form */}
      <section id="consultation" className="bg-mist py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">{c.consultation.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{c.consultation.text}</p>
            <Image src="/images/our-value.webp" alt="Books published with Authors Crew" width={520} height={400} className="mt-8 hidden h-auto w-full max-w-md lg:block" />
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-navy/10 sm:p-8">
            <LeadForm variant="journey" submitLabel={c.consultation.button} />
          </div>
        </Container>
      </section>

      {/* 4. Problem */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={c.problem.title} intro={c.problem.intro} />
          <ul className="grid gap-5 sm:grid-cols-2">
            {c.problem.items.map((i) => (
              <li key={i.q} className="rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-navy">{i.q}</h3>
                <p className="mt-2 text-slate-600">{i.a}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. Who we help */}
      <section className="bg-mist py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Image src="/images/abt-img-01.webp" alt="Authors meeting with a publishing consultant" width={640} height={520} className="h-auto w-full rounded-2xl object-cover" />
          <div>
            <SectionHeading title={c.whoWeHelp.title} center={false} />
            <ul className="grid gap-3">
              {c.whoWeHelp.items.map((i) => (
                <li key={i} className="flex gap-3 text-slate-700">{check}{i}</li>
              ))}
            </ul>
            <div className="mt-8"><LinkButton href="/contact-us">{c.whoWeHelp.button}</LinkButton></div>
          </div>
        </Container>
      </section>

      {/* 6. Global distribution */}
      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title={c.distribution.title} intro={c.distribution.text} center={false} />
            <QuoteButton className={buttonClass("amber")}>{c.distribution.button}</QuoteButton>
          </div>
          <Image src="/images/our-value-sec.webp" alt="Printed and digital editions of a published book" width={640} height={480} className="h-auto w-full" />
        </Container>
      </section>

      {/* 7. Services */}
      <section className="bg-navy py-16 text-white sm:py-20">
        <Container>
          <SectionHeading title={c.services.title} light />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.cards.map((s) => (
              <li key={s.title} className="flex flex-col rounded-2xl bg-white/5 p-7 ring-1 ring-white/15 transition hover:bg-white/10">
                <Image src={`/images/icons-imgs/home/${s.icon}.webp`} alt="" width={56} height={56} className="size-14" />
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-white/80">{s.text}</p>
                <Link href={s.href} className="mt-5 font-semibold text-amber hover:underline">Learn More &rarr;</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. Why us */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={c.why.title} />
          <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {c.why.items.map((i) => (
              <li key={i.h} className="flex gap-3">
                {check}
                <p className="text-slate-600"><strong className="block text-lg text-navy">{i.h}</strong>{i.t}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 9. Process */}
      <section className="bg-mist py-16 sm:py-20">
        <Container>
          <SectionHeading title={c.process.title} />
          <ol className="grid gap-5 md:grid-cols-5">
            {c.process.steps.map((s, i) => (
              <li key={s.h} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="grid size-10 place-items-center rounded-full bg-teal font-bold text-navy">{i + 1}</span>
                <h3 className="mt-4 font-semibold text-navy">{s.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.t}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center"><QuoteButton className={buttonClass("amber")}>{c.process.button}</QuoteButton></div>
        </Container>
      </section>

      {/* 10. Author showcase */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={c.authors.title} intro={c.authors.text} />
          <ul className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {c.authors.cards.map((a) => (
              <li key={a.name} className="rounded-2xl border border-slate-200 p-8">
                <h3 className="font-serif text-2xl text-navy">{a.name}</h3>
                <p className="mt-3 text-slate-600">{a.blurb}</p>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-semibold text-teal-dark hover:underline">
                  {c.authors.link} &rarr;
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 11. Genres */}
      <section className="bg-mist py-16 sm:py-20">
        <Container>
          <SectionHeading title={c.genres.title} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.genres.cards.map((g) => (
              <li key={g.h} className="rounded-2xl border-t-4 border-teal bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-navy">{g.h}</h3>
                <p className="mt-2 text-slate-600">{g.t}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 12 + 13. Marketing and ghostwriting */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading title={c.marketing.title} intro={c.marketing.text} center={false} />
              <LinkButton href="/book-marketing-services">{c.marketing.button}</LinkButton>
            </div>
            <Image src="/images/ghost-writing-hire.webp" alt="Book marketing across devices" width={640} height={480} className="h-auto w-full" />
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Image src="/images/wordsmiths-ghost-writing.webp" alt="A ghostwritten book" width={640} height={480} className="order-2 h-auto w-full lg:order-1" />
            <div className="order-1 lg:order-2">
              <SectionHeading title={c.ghost.title} intro={c.ghost.text} center={false} />
              <LinkButton href="/ghostwriting-services">{c.ghost.button}</LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 14. Published books */}
      <section className="bg-mist py-16 sm:py-20">
        <Container>
          <SectionHeading title={c.published.title} intro={c.published.text} />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {c.published.covers.map((b) => (
              <li key={b.src}>
                <a href={c.published.href} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl shadow-md transition hover:-translate-y-1">
                  <Image src={b.src} alt={b.alt} width={330} height={170} className="h-auto w-full" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center"><QuoteButton className={buttonClass("amber")}>{c.published.button}</QuoteButton></div>
        </Container>
      </section>

      {/* 15. Reviews */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title={c.reviews.title} intro={c.reviews.text} />
          <ul className="mb-10 flex flex-wrap justify-center gap-3">
            {c.reviews.badges.map((b) => (
              <li key={b.label}>
                <a href={b.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-navy hover:border-teal hover:text-teal-dark">
                  {b.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="grid gap-5 md:grid-cols-2">
            {c.reviews.items.map((r) => (
              <li key={r.name}>
                <figure className="h-full rounded-2xl bg-mist p-7">
                  <div className="text-amber" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <blockquote className="mt-3 leading-relaxed text-slate-700">&ldquo;{r.text}&rdquo;</blockquote>
                  <figcaption className="mt-4 font-semibold text-navy">{r.name} <span className="font-normal text-slate-500">&middot; {r.country}</span></figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 16. FAQ */}
      <section className="bg-mist py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading title={c.faq.title} />
          <div className="grid gap-3">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group rounded-xl bg-white p-5 shadow-sm open:ring-1 open:ring-teal/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                  {f.q}
                  <span aria-hidden className="text-2xl leading-none text-teal transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 17. Blog preview */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title="Blogs & Author Insights" />
          <ul className="grid gap-5 md:grid-cols-3">
            {c.blogPreview.map((b) => (
              <li key={b.href} className="flex flex-col rounded-2xl border border-slate-200 p-6">
                <h3 className="flex-1 font-serif text-xl leading-snug text-navy">{b.title}</h3>
                <Link href={b.href} className="mt-5 font-semibold text-teal-dark hover:underline">Read Article &rarr;</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 18. Final CTA */}
      <section id="contact" className="bg-navy py-16 text-white sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-tight font-medium sm:text-4xl">{c.finalCta.title}</h2>
            <p className="mt-4 text-lg text-white/90">{c.finalCta.text}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-ink sm:p-8">
            <LeadForm variant="contact" submitLabel={c.finalCta.button} />
          </div>
        </Container>
      </section>
    </>
  );
}
