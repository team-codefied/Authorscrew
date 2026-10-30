import Image from "next/image";
import type { Metadata } from "next";
import { LeadForm } from "./LeadForm";
import { QuoteButton } from "./PopupProvider";
import { Section } from "./ServicePage";
import { Faq, Reviews } from "./sections";
import { Container, LinkButton, buttonClass } from "./ui";
import { LANDING_PAGES, type LandingSlug } from "@/lib/landing";
import { platforms } from "@/content/home";
import { SITE } from "@/lib/site";

export function landingMetadata(slug: LandingSlug): Metadata {
  const m = LANDING_PAGES[slug];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: m.title, description: m.description, url: `/${slug}`, images: [m.banner] },
  };
}

export function LandingPage({ slug }: { slug: LandingSlug }) {
  const { content: c, banner } = LANDING_PAGES[slug];
  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
        <Image src={banner} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/60" />
        <Container className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            {c.eyebrow && <p className="mb-3 text-sm font-semibold tracking-widest text-amber uppercase">{c.eyebrow}</p>}
            <h1 className="font-serif text-4xl leading-[1.1] font-medium sm:text-5xl">{c.h1}</h1>
            {c.intro.map((p) => (
              <p key={p} className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">{p}</p>
            ))}
            {c.bullets.length > 0 && (
              <ul className="mt-6 grid gap-2.5">
                {c.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-white/90">
                    <span className="mt-0.5 text-amber" aria-hidden>&#10003;</span>{b}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              {c.heroCtas.map((b, i) =>
                b.to === "popup" ? (
                  <QuoteButton key={b.label} className={buttonClass(i === 0 ? "amber" : "outline")}>{b.label}</QuoteButton>
                ) : (
                  <LinkButton key={b.label} href={b.to === "tel" ? SITE.phoneHref : b.to} variant={i === 0 ? "amber" : "outline"}>{b.label}</LinkButton>
                ),
              )}
            </div>
          </div>

          <div id="start" className="rounded-2xl bg-white p-6 text-ink shadow-2xl sm:p-8">
            {c.heroOffer && (
              <p className="mb-3 inline-block rounded-full bg-amber/15 px-3 py-1 text-xs font-bold tracking-wide text-amber-text uppercase">{c.heroOffer}</p>
            )}
            <h2 className="mb-5 font-serif text-2xl font-medium text-navy">Start Your Author Journey</h2>
            <LeadForm
              variant="journey"
              submitLabel="Get Consultation"
              showGenre
              showBudget={c.heroGenreBudget}
              hideProjectType={!c.heroGenreBudget}
            />
          </div>
        </Container>
      </section>

      {c.platformsTitle && (
        <section className="py-12">
          <Container>
            <h2 className="mb-8 text-center font-serif text-2xl font-medium text-navy sm:text-3xl">{c.platformsTitle}</h2>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {platforms.logos.map((l) => (
                <li key={l.name}>
                  <Image src={l.src} alt={l.name} width={140} height={50} className="h-9 w-auto object-contain opacity-80 grayscale" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {c.sections.map((s, i) => (
        <Section key={`${s.title}-${i}`} s={s} i={i} />
      ))}

      <Reviews title={c.reviewsTitle || "What Authors Say"} intro={c.reviewsIntro || undefined} />
      {c.faq.length > 0 && <Faq title={c.faqTitle || "Frequently Asked Questions"} intro={c.faqIntro || undefined} items={c.faq} />}

      <section className="py-16 sm:py-20">
        <Container className="max-w-xl">
          <h2 className="mb-6 text-center font-serif text-3xl font-medium text-navy">{c.bottomFormTitle}</h2>
          <LeadForm variant="journey" submitLabel="Get Consultation" />
          <QuoteButton className="mt-8 w-full rounded-xl bg-navy px-5 py-4 text-center font-semibold text-white hover:bg-teal-dark">
            New Author Special: Get 70% Off
          </QuoteButton>
        </Container>
      </section>
    </>
  );
}
