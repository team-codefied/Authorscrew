import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "./LeadForm";
import { QuoteButton } from "./PopupProvider";
import { Faq, Reviews } from "./sections";
import { Container, LinkButton, buttonClass } from "./ui";
import type { Block, ServiceMeta, ServiceSection } from "@/lib/services";
import { SITE } from "@/lib/site";

const check = (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="mt-1 shrink-0 text-teal">
    <path d="m3 9.5 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Cta({ label, to }: { label: string; to: string }) {
  if (to === "popup") return <QuoteButton className={buttonClass("amber")}>{label}</QuoteButton>;
  if (to === "tel") return <LinkButton href={SITE.phoneHref}>{label}</LinkButton>;
  return <LinkButton href={to}>{label}</LinkButton>;
}

export function Blocks({ blocks, center }: { blocks: Block[]; center: boolean }) {
  const ctas = blocks.filter((b): b is Extract<Block, { k: "cta" }> => b.k === "cta");
  return (
    <div className="grid gap-5">
      {blocks.map((b, i) => {
        switch (b.k) {
          case "p":
            // Short, unpunctuated lines on the live site are eyebrow labels, not body copy.
            if (b.text.split(" ").length <= 6 && !/[.!?:]$/.test(b.text)) {
              return (
                <p key={i} className={`text-sm font-semibold tracking-widest text-teal-dark uppercase ${center ? "text-center" : ""}`}>
                  {b.text}
                </p>
              );
            }
            return (
              <p key={i} className={`text-lg leading-relaxed text-slate-600 ${center ? "mx-auto max-w-3xl text-center" : ""}`}>
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className={`grid gap-x-8 gap-y-3 ${b.items.length > 5 ? "sm:grid-cols-2" : ""} ${center ? "mx-auto max-w-3xl" : ""}`}>
                {b.items.map((t) => (
                  <li key={t} className="flex gap-3 text-slate-700">{check}{t}</li>
                ))}
              </ul>
            );
          case "chips":
            return (
              <ul key={i} className="flex flex-wrap justify-center gap-3">
                {b.items.map((t) => (
                  <li key={t} className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white">{t}</li>
                ))}
              </ul>
            );
          case "cards":
            return (
              <ul key={i} className={`grid gap-5 sm:grid-cols-2 ${b.items.length % 3 === 0 || b.items.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                {b.items.map((c) => (
                  <li key={c.title} className="rounded-2xl border-t-4 border-teal bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-navy">{c.title}</h3>
                    {c.text && <p className="mt-2 leading-relaxed text-slate-600">{c.text}</p>}
                  </li>
                ))}
              </ul>
            );
          case "tiers":
            return (
              <ul key={i} className="grid gap-6 lg:grid-cols-3">
                {b.items.map((t) => (
                  <li key={t.name} className="flex flex-col rounded-2xl bg-white p-7 shadow-md ring-1 ring-slate-200">
                    <h3 className="font-serif text-2xl text-navy">{t.name}</h3>
                    <ul className="mt-5 grid flex-1 gap-2.5">
                      {t.features.map((f) => (
                        <li key={f} className="flex gap-3 text-sm text-slate-700">{check}{f}</li>
                      ))}
                    </ul>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <LinkButton href={SITE.phoneHref}>Order Now</LinkButton>
                      <LinkButton href="/contact-us" variant="outlineDark">Chat now</LinkButton>
                    </div>
                  </li>
                ))}
              </ul>
            );
          case "genres":
            return (
              <ul key={i} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {b.items.map((g) => (
                  <li key={g.title} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-lg font-semibold text-navy">{g.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{g.text}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <QuoteButton className="rounded-md bg-amber px-4 py-2 text-xs font-bold tracking-wide text-navy uppercase hover:bg-amber-dark">Get A Quote</QuoteButton>
                      <a href={SITE.phoneHref} className="rounded-md border-2 border-navy px-4 py-2 text-xs font-bold tracking-wide text-navy uppercase hover:bg-navy hover:text-white">Schedule a Call</a>
                    </div>
                  </li>
                ))}
              </ul>
            );
          case "features":
            return (
              <ul key={i} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {b.items.map((f) => (
                  <li key={f.title} className="rounded-xl bg-navy p-5 text-center text-white">
                    <p className="font-semibold">{f.title}</p>
                    <p className="mt-1 text-sm text-white/75">{f.text}</p>
                  </li>
                ))}
              </ul>
            );
          default:
            return null; // ctas are rendered together below
        }
      })}
      {ctas.length > 0 && (
        <div className={`mt-2 flex flex-wrap gap-4 ${center ? "justify-center" : ""}`}>
          {ctas.map((c) => (
            <Cta key={c.label} {...c} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Section({ s, i, side }: { s: ServiceSection; i: number; side?: string }) {
  const tinted = i % 2 === 1;
  const hasCards = s.blocks.some((b) => b.k === "cards" || b.k === "chips");
  const long = s.blocks.filter((b) => b.k === "ul").some((b) => b.k === "ul" && b.items.length > 8);
  const split = !hasCards && !long && s.blocks.some((b) => b.k === "ul");
  const showImage = side && i === 0;
  return (
    <section className={`py-14 sm:py-18 ${tinted ? "bg-mist" : ""}`}>
      <Container>
        {showImage ? (
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              {s.title && <h2 className="mb-6 font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">{s.title}</h2>}
              <Blocks blocks={s.blocks} center={false} />
            </div>
            <Image src={side} alt="" width={640} height={520} className="h-auto w-full" />
          </div>
        ) : (
          <>
            {s.title && (
              <h2 className={`mb-6 font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl ${split ? "" : "mx-auto max-w-3xl text-center"}`}>
                {s.title}
              </h2>
            )}
            <Blocks blocks={s.blocks} center={!split} />
          </>
        )}
      </Container>
    </section>
  );
}

export function ServicePage({ meta }: { meta: ServiceMeta }) {
  const { content } = meta;
  // A first section with a title but no body is the hero sub-heading.
  const [first, ...rest] = content.sections;
  const heroSub = first && first.blocks.length === 0 ? first.title : "";
  const sections = heroSub ? rest : content.sections;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: content.h1, provider: { "@type": "Organization", name: SITE.name, url: SITE.url }, description: meta.description },
      ...(content.faq.length
        ? [{ "@type": "FAQPage", mainEntity: content.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate overflow-hidden bg-navy pt-36 pb-16 text-white sm:pt-44 sm:pb-24">
        <Image src={meta.banner} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/75">
            <Link href="/" className="hover:underline">Home</Link> <span aria-hidden>/</span> {content.h1}
          </nav>
          <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] font-medium sm:text-5xl">{content.h1}</h1>
          {heroSub && <p className="mt-5 max-w-2xl text-xl text-white/90">{heroSub}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            <QuoteButton className={buttonClass("amber")}>Get A Quote</QuoteButton>
            <LinkButton href={SITE.phoneHref} variant="outline">Schedule a Call</LinkButton>
          </div>
        </Container>
      </section>

      {sections.map((s, i) => (
        <Section key={`${s.title}-${i}`} s={s} i={i} side={meta.side} />
      ))}

      {content.reviews && <Reviews />}
      {content.faq.length > 0 && <Faq title={content.faqTitle || "Frequently Asked Questions"} items={content.faq} />}

      {content.contact && (
        <section className="bg-navy py-16 text-white sm:py-20">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl leading-tight font-medium sm:text-4xl">{content.contact.title}</h2>
              {content.contact.text && <p className="mt-4 text-lg text-white/90">{content.contact.text}</p>}
            </div>
            <div className="rounded-2xl bg-white p-6 text-ink sm:p-8">
              <LeadForm variant="contact" submitLabel="Submit Now" />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 sm:py-20">
        <Container className="max-w-xl">
          <h2 className="mb-6 text-center font-serif text-3xl font-medium text-navy">Start Your Author Journey</h2>
          <LeadForm variant="journey" submitLabel="Get Consultation" />
        </Container>
      </section>
    </>
  );
}
