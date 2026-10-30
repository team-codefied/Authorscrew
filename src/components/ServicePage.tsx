import Image from "next/image";
import Link from "next/link";
import { BookFan, Eyebrow, FormCard, FramedImage, Wave } from "./Decor";
import { LeadForm } from "./LeadForm";
import { QuoteButton } from "./PopupProvider";
import { Faq, Reviews } from "./sections";
import { Container, LinkButton, buttonClass } from "./ui";
import { COVERS, GALLERY, IMG } from "@/lib/img";
import type { Block, Pic, ServiceMeta, ServiceSection } from "@/lib/services";
import { SITE } from "@/lib/site";

const check = (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="mt-0.5 shrink-0 text-teal">
    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15" />
    <path d="m5.5 10.5 3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Cta({ label, to, light = false }: { label: string; to: string; light?: boolean }) {
  if (to === "popup") return <QuoteButton className={buttonClass("amber")}>{label}</QuoteButton>;
  if (to === "tel") return <LinkButton href={SITE.phoneHref} variant={light ? "outline" : "amber"}>{label}</LinkButton>;
  return <LinkButton href={to} variant={light ? "outline" : "amber"}>{label}</LinkButton>;
}

export function Blocks({ blocks, center, light = false }: { blocks: Block[]; center: boolean; light?: boolean }) {
  const ctas = blocks.filter((b): b is Extract<Block, { k: "cta" }> => b.k === "cta");
  const body = light ? "text-white/85" : "text-slate-600";
  return (
    <div className="grid gap-5">
      {blocks.map((b, i) => {
        switch (b.k) {
          case "p":
            // Short, unpunctuated lines on the live site are eyebrow labels, not body copy.
            if (b.text.split(" ").length <= 6 && !/[.!?:]$/.test(b.text)) {
              return (
                <p key={i} className={`text-sm font-semibold tracking-widest uppercase ${light ? "text-amber" : "text-teal-dark"} ${center ? "text-center" : ""}`}>
                  {b.text}
                </p>
              );
            }
            return (
              <p key={i} className={`text-lg leading-relaxed ${body} ${center ? "mx-auto max-w-3xl text-center" : ""}`}>
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className={`grid gap-x-8 gap-y-3 ${b.items.length > 5 ? "sm:grid-cols-2" : ""} ${center ? "mx-auto max-w-3xl" : ""}`}>
                {b.items.map((t) => (
                  <li key={t} className={`flex gap-3 ${light ? "text-white/90" : "text-slate-700"}`}>{check}{t}</li>
                ))}
              </ul>
            );
          case "chips":
            return (
              <ul key={i} className="flex flex-wrap justify-center gap-3">
                {b.items.map((t) => (
                  <li key={t} className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-card)]">{t}</li>
                ))}
              </ul>
            );
          case "cards":
            return (
              <ul key={i} className={`grid gap-5 sm:grid-cols-2 ${b.items.length % 3 === 0 || b.items.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                {b.items.map((c, n) => (
                  <li key={c.title} className="reveal group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                    <span aria-hidden className="absolute -top-3 right-3 font-serif text-6xl font-bold text-teal/10 transition group-hover:text-amber/30">{n + 1}</span>
                    <span aria-hidden className="mb-4 block h-1 w-10 rounded-full bg-gradient-to-r from-teal to-amber transition-all duration-300 group-hover:w-16" />
                    <h3 className="relative text-lg font-semibold text-navy">{c.title}</h3>
                    {c.text && <p className="relative mt-2 leading-relaxed text-slate-600">{c.text}</p>}
                  </li>
                ))}
              </ul>
            );
          case "tiers":
            return (
              <ul key={i} className="grid gap-6 lg:grid-cols-3">
                {b.items.map((t, n) => (
                  <li key={t.name} className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-[var(--shadow-card)] ring-1 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${n === 1 ? "ring-2 ring-amber lg:-translate-y-3" : "ring-slate-200"}`}>
                    {n === 1 && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-amber px-4 py-1 text-xs font-bold tracking-wide text-navy uppercase">Most popular</span>}
                    <h3 className="font-serif text-2xl text-navy">{t.name}</h3>
                    <ul className="mt-5 grid flex-1 gap-2.5">
                      {t.features.map((f) => (
                        <li key={f} className="flex gap-3 text-sm text-slate-700">{check}{f}</li>
                      ))}
                    </ul>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
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
                  <li key={g.title} className="reveal flex flex-col rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                    <h3 className="text-lg font-semibold text-navy">{g.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{g.text}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <QuoteButton className="rounded-lg bg-amber px-4 py-2 text-xs font-bold tracking-wide text-navy uppercase hover:bg-amber-dark">Get A Quote</QuoteButton>
                      <a href={SITE.phoneHref} className="rounded-lg border-2 border-navy px-4 py-2 text-xs font-bold tracking-wide text-navy uppercase hover:bg-navy hover:text-white">Schedule a Call</a>
                    </div>
                  </li>
                ))}
              </ul>
            );
          case "features":
            return (
              <ul key={i} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {b.items.map((f) => (
                  <li key={f.title} className="rounded-2xl bg-gradient-to-br from-navy to-[#00506b] p-5 text-center text-white shadow-[var(--shadow-card)]">
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
          {ctas.map((c, n) => (
            <Cta key={c.label} {...c} light={light && n > 0} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Mid-page strip of covers that gives long pages visual rhythm. */
export function CoverStrip({ kind }: { kind: "published" | "small" | "cutouts" }) {
  const list = kind === "small" ? GALLERY.smallCovers : kind === "cutouts" ? GALLERY.cutouts : GALLERY.published;
  const doubled = [...list, ...list];
  return (
    <div className="marquee relative overflow-hidden bg-navy py-10" aria-label="Books published with Authors Crew">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
      <ul className="marquee-track relative gap-6">
        {doubled.map((src, i) => (
          <li key={i} className="shrink-0 pr-6" aria-hidden={i >= list.length}>
            <Image src={src} alt="" width={200} height={300} sizes="160px" className={kind === "published" ? "h-52 w-36 rounded-md object-cover shadow-[var(--shadow-book)]" : "book-tilt h-52 w-auto"} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type Kind = "band" | "cards" | "split" | "center";

function kindOf(s: ServiceSection): Kind {
  const has = (k: Block["k"]) => s.blocks.some((b) => b.k === k);
  const ps = s.blocks.filter((b) => b.k === "p").length;
  if (has("cards") || has("chips") || has("tiers") || has("genres") || has("features")) return "cards";
  if (s.title && has("cta") && ps <= 2 && !has("ul")) return "band";
  if (has("ul") || ps >= 2) return "split";
  return "center";
}

export function Section({ s, i, pic, reverse = false }: { s: ServiceSection; i: number; pic?: Pic; reverse?: boolean }) {
  const kind = kindOf(s);
  const tint = i % 2 === 1 ? "bg-paper" : "";
  const heading = (cls: string) =>
    s.title ? <h2 className={`font-serif text-3xl leading-tight font-medium sm:text-4xl ${cls}`}>{s.title}</h2> : null;

  if (kind === "band") {
    return (
      <section className="bg-hero relative isolate overflow-hidden py-16 text-white sm:py-20">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
        <div aria-hidden className="absolute -top-20 -right-20 -z-10 size-72 rounded-full bg-teal/20 blur-3xl" />
        <Container className="max-w-3xl text-center">
          {heading("mb-5 text-white")}
          <Blocks blocks={s.blocks} center light />
        </Container>
      </section>
    );
  }

  if (kind === "split" && pic) {
    return (
      <section className={`py-16 sm:py-20 ${tint}`}>
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={`reveal ${reverse ? "lg:order-2" : ""}`}>
            {heading("mb-6 text-navy")}
            <Blocks blocks={s.blocks} center={false} />
          </div>
          <FramedImage
            src={pic.src}
            alt={pic.alt}
            width={768}
            height={560}
            accent={i % 3 === 0 ? "teal" : i % 3 === 1 ? "amber" : "navy"}
            className={`reveal mx-auto w-full max-w-xl ${reverse ? "lg:order-1" : ""}`}
          />
        </Container>
      </section>
    );
  }

  return (
    <section className={`py-16 sm:py-20 ${tint}`}>
      <Container>
        {s.title && (
          <div className="mx-auto mb-8 max-w-3xl text-center">
            {heading("text-navy")}
            <span aria-hidden className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-teal to-amber" />
          </div>
        )}
        <Blocks blocks={s.blocks} center={kind !== "split"} />
      </Container>
    </section>
  );
}

export function ServicePage({ meta }: { meta: ServiceMeta }) {
  const { content } = meta;
  // A first section with a title but no body is the hero sub-heading.
  const [first, ...rest] = content.sections;
  const isLabel = (b: Block) => b.k === "p" && b.text.split(" ").length <= 6 && !/[.!?:]$/.test(b.text);
  const heroSub = first && first.title && first.blocks.every(isLabel) ? first.title : "";
  const sections = heroSub ? rest : content.sections;
  const stripAt = Math.max(1, sections.findIndex((s) => /genres we cater|featured|genre gallery/i.test(s.title)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: content.h1, provider: { "@type": "Organization", name: SITE.name, url: SITE.url }, description: meta.description },
      ...(content.faq.length
        ? [{ "@type": "FAQPage", mainEntity: content.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
        : []),
    ],
  };

  let picIndex = 0;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-hero relative isolate overflow-hidden pt-32 pb-28 text-white sm:pt-40 sm:pb-32">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_25%_40%,black,transparent_70%)]" />
        <div aria-hidden className="absolute -top-24 right-[-8rem] -z-10 size-[28rem] rounded-full border border-white/10" />
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(400px,460px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_520px] xl:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
              <Link href="/" className="hover:underline">Home</Link> <span aria-hidden>/</span>{" "}
              <Link href="/our-services" className="hover:underline">Services</Link> <span aria-hidden>/</span> {meta.label}
            </nav>
            <Eyebrow light>{meta.label}</Eyebrow>
            <h1 className="font-serif text-4xl leading-[1.07] font-medium sm:text-5xl lg:text-[3.4rem]">{content.h1}</h1>
            {heroSub && <p className="mt-5 max-w-xl text-xl leading-relaxed text-white/85">{heroSub}</p>}
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#service-form" className={buttonClass("amber")}>Get A Quote</a>
              <LinkButton href={SITE.phoneHref} variant="outline">Schedule a Call</LinkButton>
            </div>
            <div className="relative mt-12 hidden h-64 max-w-xl sm:block">
              <Image src={meta.hero[0].src} alt={meta.hero[0].alt} width={640} height={420} sizes="360px" priority className="absolute top-0 left-0 h-56 w-[68%] rounded-3xl object-cover shadow-2xl ring-4 ring-white/10" />
              <Image src={meta.hero[1].src} alt={meta.hero[1].alt} width={480} height={360} sizes="260px" className="absolute right-0 bottom-0 h-44 w-[48%] rounded-3xl object-cover shadow-2xl ring-4 ring-white/20" />
              <span aria-hidden className="bg-dots absolute -bottom-6 left-[40%] size-20 opacity-60" />
            </div>
          </div>

          <div className="relative">
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2.2rem] bg-gradient-to-br from-teal/40 to-amber/30 blur-2xl" />
            <FormCard
              id="service-form"
              badge="Free quote, no obligation"
              title={`Get Your ${meta.label} Quote`}
              subtitle="Share a few details and a specialist will reply within one business day."
            >
              <LeadForm variant="journey" submitLabel="Get My Free Quote" defaultProjectType={meta.label} />
            </FormCard>
          </div>
        </Container>
        <Wave fill="#ffffff" />
      </section>

      {sections.map((s, i) => {
        const wantsPic = kindOf(s) === "split";
        const pic = wantsPic ? meta.pics[picIndex % meta.pics.length] : undefined;
        if (wantsPic) picIndex++;
        return (
          <div key={`${s.title}-${i}`}>
            <Section s={s} i={i} pic={pic} reverse={picIndex % 2 === 0} />
            {i === stripAt && <CoverStrip kind={meta.strip} />}
          </div>
        );
      })}

      {content.reviews && <Reviews />}
      {content.faq.length > 0 && <Faq title={content.faqTitle || "Frequently Asked Questions"} items={content.faq} />}

      {content.contact && (
        <section className="bg-hero relative isolate overflow-hidden py-24 text-white">
          <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
          <Wave fill="#f4f8fb" flip />
          <Container className="grid items-center gap-12 pt-6 lg:grid-cols-2">
            <div className="reveal">
              <Eyebrow light>Let&apos;s talk</Eyebrow>
              <h2 className="font-serif text-3xl leading-tight font-medium sm:text-5xl">{content.contact.title}</h2>
              {content.contact.text && <p className="mt-5 max-w-lg text-lg text-white/85">{content.contact.text}</p>}
              <BookFan covers={[COVERS.manor, COVERS.finalCode, COVERS.stellar]} size="sm" className="mt-10 hidden justify-start sm:flex" />
            </div>
            <div className="reveal rounded-[1.75rem] bg-white p-6 text-ink shadow-2xl sm:p-8">
              <LeadForm variant="contact" submitLabel="Submit Now" />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-paper py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal text-center lg:text-left">
            <Eyebrow>Start your author journey</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">Ready When You Are</h2>
            <p className="mt-4 text-lg text-slate-600">One short form is all it takes to get a clear plan and a fixed quote for your book.</p>
            <Image src={IMG.publishers.src} alt={IMG.publishers.alt} width={400} height={400} sizes="320px" className="mx-auto mt-6 hidden h-auto w-72 lg:mx-0 lg:block" />
          </div>
          <div className="reveal rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-lift)] ring-1 ring-slate-100 sm:p-8">
            <LeadForm variant="journey" submitLabel="Get Consultation" defaultProjectType={meta.label} />
          </div>
        </Container>
      </section>
    </>
  );
}
