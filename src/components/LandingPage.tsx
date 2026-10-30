import Image from "next/image";
import type { Metadata } from "next";
import { BookFan, Eyebrow, FormCard, FramedImage, Wave } from "./Decor";
import { LeadForm } from "./LeadForm";
import { QuoteButton } from "./PopupProvider";
import { CoverStrip, Section } from "./ServicePage";
import { Faq, Reviews } from "./sections";
import { Container, LinkButton, buttonClass } from "./ui";
import { platforms } from "@/content/home";
import { LANDING_PAGES, type LandingSlug, type LandingTheme } from "@/lib/landing";
import { COVERS } from "@/lib/img";
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

/** Background, text colour and decoration for each landing page's hero. */
const THEMES: Record<LandingTheme, { hero: string; text: string; sub: string; chip: boolean; wave: string; ring: string }> = {
  cover: { hero: "bg-hero", text: "text-white", sub: "text-white/85", chip: true, wave: "#ffffff", ring: "from-amber/40 to-teal/30" },
  classic: { hero: "bg-hero", text: "text-white", sub: "text-white/85", chip: true, wave: "#ffffff", ring: "from-teal/40 to-amber/30" },
  light: { hero: "bg-paper", text: "text-navy", sub: "text-slate-600", chip: false, wave: "#ffffff", ring: "from-navy/10 to-teal/20" },
  playful: {
    hero: "bg-gradient-to-br from-[#fff1cf] via-[#e3f6fb] to-[#fde4ef]",
    text: "text-navy",
    sub: "text-slate-700",
    chip: false,
    wave: "#ffffff",
    ring: "from-amber/40 to-pink-300/40",
  },
  faith: {
    hero: "bg-[radial-gradient(50rem_30rem_at_80%_0%,rgb(245_166_35/0.22),transparent_60%),linear-gradient(165deg,#00182a,#00263a_55%,#003b52)]",
    text: "text-white",
    sub: "text-white/85",
    chip: true,
    wave: "#ffffff",
    ring: "from-amber/50 to-amber/10",
  },
};

export function LandingPage({ slug }: { slug: LandingSlug }) {
  const meta = LANDING_PAGES[slug];
  const { content: c, theme } = meta;
  const t = THEMES[theme];
  const dark = t.chip;
  const formFirst = theme === "light";

  let picIndex = 0;
  const kindSplits = (s: (typeof c.sections)[number]) => {
    const has = (k: string) => s.blocks.some((b) => b.k === k);
    const ps = s.blocks.filter((b) => b.k === "p").length;
    return !(has("cards") || has("chips") || has("tiers") || has("genres") || has("features")) && !(s.title && has("cta") && ps <= 2 && !has("ul")) && (has("ul") || ps >= 2);
  };

  return (
    <>
      <section className={`${t.hero} ${t.text} relative isolate overflow-hidden pt-14 pb-28 sm:pt-20 sm:pb-32`}>
        {dark && <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]" />}
        {!dark && <div aria-hidden className="bg-dots-dark absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />}
        {theme === "playful" && (
          <>
            <div aria-hidden className="absolute -top-16 -left-16 -z-10 size-72 rounded-full bg-amber/30 blur-2xl" />
            <div aria-hidden className="absolute right-10 bottom-20 -z-10 size-60 rounded-full bg-teal/25 blur-2xl" />
          </>
        )}
        {theme === "faith" && <div aria-hidden className="absolute top-10 left-1/2 -z-10 h-[40rem] w-px bg-gradient-to-b from-amber/40 to-transparent" />}

        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className={formFirst ? "lg:order-2" : ""}>
            {c.eyebrow && <Eyebrow light={dark}>{c.eyebrow}</Eyebrow>}
            <h1 className={`font-serif text-4xl leading-[1.08] font-medium sm:text-5xl ${theme === "faith" ? "tracking-tight" : ""}`}>{c.h1}</h1>
            {c.intro.map((p) => (
              <p key={p} className={`mt-5 max-w-xl text-lg leading-relaxed ${t.sub}`}>{p}</p>
            ))}
            {c.bullets.length > 0 && (
              <ul className="mt-6 grid gap-2.5">
                {c.bullets.map((b) => (
                  <li key={b} className={`flex gap-3 ${dark ? "text-white/90" : "text-slate-700"}`}>
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-amber text-[11px] font-bold text-navy" aria-hidden>&#10003;</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              {c.heroCtas.map((b, i) =>
                i === 0 ? (
                  <a key={b.label} href="#start" className={buttonClass("amber")}>{b.label}</a>
                ) : b.to === "popup" ? (
                  <QuoteButton key={b.label} className={buttonClass(dark ? "outline" : "outlineDark")}>{b.label}</QuoteButton>
                ) : (
                  <LinkButton key={b.label} href={b.to === "tel" ? SITE.phoneHref : b.to} variant={dark ? "outline" : "outlineDark"}>{b.label}</LinkButton>
                ),
              )}
            </div>

            {meta.heroCovers.length > 0 ? (
              <BookFan covers={meta.heroCovers} size="lg" className="mt-12 hidden sm:flex" />
            ) : (
              meta.heroVisual && (
                <FramedImage src={meta.heroVisual.src} alt={meta.heroVisual.alt} width={768} height={512} accent="teal" className="mt-12 hidden max-w-md sm:block" sizes="420px" />
              )
            )}
          </div>

          <div className={`relative ${formFirst ? "lg:order-1" : ""}`}>
            <div aria-hidden className={`absolute -inset-4 -z-10 rounded-[2.2rem] bg-gradient-to-br ${t.ring} blur-2xl`} />
            <FormCard
              id="start"
              badge={c.heroOffer || "Free consultation"}
              title="Start Your Author Journey"
              subtitle="Tell us about your book and a publishing consultant will reply within one business day."
              className={theme === "playful" ? "ring-4 ring-amber/50" : theme === "faith" ? "ring-1 ring-amber/50" : ""}
            >
              <LeadForm variant="journey" submitLabel="Get Consultation" showGenre showBudget={c.heroGenreBudget} hideProjectType={!c.heroGenreBudget} />
            </FormCard>
          </div>
        </Container>
        <Wave fill={t.wave} />
      </section>

      {c.platformsTitle && (
        <section className="pb-6 pt-2">
          <Container>
            <h2 className="mb-6 text-center font-serif text-2xl font-medium text-navy sm:text-3xl">{c.platformsTitle}</h2>
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {platforms.logos.map((l) => (
                <li key={l.name}>
                  <Image src={l.src} alt={l.name} width={140} height={50} className="h-9 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {c.sections.map((s, i) => {
        const splits = kindSplits(s);
        const pic = splits ? meta.pics[picIndex % meta.pics.length] : undefined;
        if (splits) picIndex++;
        if (s.blocks.length === 0 && /platform/i.test(s.title)) {
          return (
            <section key={`${s.title}-${i}`} className="py-12">
              <Container>
                <h2 className="mb-6 text-center font-serif text-2xl font-medium text-navy sm:text-3xl">{s.title}</h2>
                <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                  {platforms.logos.map((l) => (
                    <li key={l.name}><Image src={l.src} alt={l.name} width={140} height={50} className="h-9 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" /></li>
                  ))}
                </ul>
              </Container>
            </section>
          );
        }
        const galleryHere = meta.gallery && s.title.toLowerCase().includes(meta.gallery.after.toLowerCase());
        return (
          <div key={`${s.title}-${i}`}>
            <Section s={s} i={i} pic={pic} reverse={picIndex % 2 === 0} />
            {galleryHere && meta.gallery && (
              <section className="bg-mist py-14" aria-label={meta.gallery.label}>
                <Container>
                  <ul className={`grid gap-4 ${meta.gallery.images.length > 6 ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
                    {meta.gallery.images.map((src, n) => (
                      <li key={src} className="reveal">
                        <Image
                          src={src}
                          alt=""
                          width={300}
                          height={450}
                          sizes="(min-width:1024px) 180px, 45vw"
                          className={`aspect-[2/3] w-full rounded-xl object-cover shadow-[var(--shadow-book)] transition duration-300 hover:-translate-y-2 ${n % 2 ? "sm:translate-y-4" : ""}`}
                        />
                      </li>
                    ))}
                  </ul>
                </Container>
              </section>
            )}
            {i === 2 && <CoverStrip kind={meta.strip} />}
          </div>
        );
      })}

      <Reviews title={c.reviewsTitle || "What Authors Say"} intro={c.reviewsIntro || undefined} />
      {c.faq.length > 0 && <Faq title={c.faqTitle || "Frequently Asked Questions"} intro={c.faqIntro || undefined} items={c.faq} />}

      <section className="bg-hero relative isolate overflow-hidden py-24 text-white">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
        <Wave fill="#f4f8fb" flip />
        <Container className="grid items-center gap-12 pt-6 lg:grid-cols-2">
          <div className="reveal">
            <Eyebrow light>Ready when you are</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight font-medium sm:text-5xl">{c.bottomFormTitle}</h2>
            <p className="mt-5 max-w-lg text-lg text-white/85">Share a few details and get a clear plan and quote for your book.</p>
            <BookFan covers={[COVERS.manor, COVERS.finalCode, COVERS.stellar]} size="sm" className="mt-10 hidden justify-start sm:flex" />
            <QuoteButton className="mt-8 rounded-2xl bg-amber px-6 py-4 text-sm font-bold tracking-wide text-navy uppercase hover:bg-amber-dark">
              New Author Special: Get 70% Off
            </QuoteButton>
          </div>
          <div className="reveal rounded-[1.75rem] bg-white p-6 text-ink shadow-2xl sm:p-8">
            <LeadForm variant="journey" submitLabel="Get Consultation" />
          </div>
        </Container>
      </section>
    </>
  );
}
