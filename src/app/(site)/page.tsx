import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { BookFan, Eyebrow, FloatingBook, FormCard, FramedImage, Wave } from "@/components/Decor";
import { LeadForm } from "@/components/LeadForm";
import { QuoteButton } from "@/components/PopupProvider";
import { Container, LinkButton, SectionHeading, buttonClass } from "@/components/ui";
import * as c from "@/content/home";
import { getPost } from "@/lib/blog";
import { COVERS, GALLERY, IMG, PROCESS_ICONS } from "@/lib/img";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Authors Crew | Book Publishing, Ghostwriting & Marketing Services" },
  description:
    "Ghostwriting, editing, cover design, publishing and marketing under one roof. Keep 100% of your rights and royalties with Authors Crew.",
  alternates: { canonical: "/" },
};

const check = (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="mt-0.5 shrink-0 text-teal">
    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15" />
    <path d="m5.5 10.5 3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const heroCovers = [COVERS.shadowfell, COVERS.forever, COVERS.legends, COVERS.stellar, COVERS.whisperingHouse];
const genreCovers = [COVERS.forever, COVERS.peakHabits, COVERS.spirit, COVERS.manor, COVERS.finalCode, COVERS.jackLucy];
const processIcons = Object.values(PROCESS_ICONS);

export default function Home() {
  const posts = c.blogPreview.map((b) => getPost(b.href.split("/").pop()!)).filter((p): p is NonNullable<typeof p> => !!p);
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

      {/* 1. Hero: message on the left, inquiry form on the right */}
      <section className="bg-hero relative isolate overflow-hidden pt-32 pb-28 text-white sm:pt-40 sm:pb-36">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_30%_30%,black,transparent_70%)]" />
        <div aria-hidden className="absolute -top-24 right-[-8rem] -z-10 size-[28rem] rounded-full border border-white/10" />
        <div aria-hidden className="absolute -top-8 right-[-3rem] -z-10 size-[20rem] rounded-full border border-teal/20" />

        <Container className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div>
            <Eyebrow light>Full-service self-publishing</Eyebrow>
            <h1 className="font-serif text-[2.6rem] leading-[1.05] font-medium sm:text-6xl">
              We Build <span className="text-gradient-amber italic">Authors,</span> Not Just Books.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{c.hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#hero-form" className={buttonClass("amber")}>Get a Free Quote</a>
              <LinkButton href={SITE.phoneHref} variant="outline">Schedule a Call</LinkButton>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
              {c.hero.trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-amber text-[11px] font-bold text-navy" aria-hidden>&#10003;</span>
                  {t}
                </li>
              ))}
            </ul>
            <BookFan covers={heroCovers} className="mt-12 hidden sm:flex lg:mt-14" size="lg" />
          </div>

          <div className="relative">
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2.2rem] bg-gradient-to-br from-teal/40 to-amber/30 blur-2xl" />
            <FormCard
              id="hero-form"
              badge="Free quote, no obligation"
              title="Tell Us About Your Book"
              subtitle="A publishing consultant will reply within one business day with honest advice and a clear quote."
            >
              <LeadForm variant="journey" submitLabel="Get My Free Quote" />
            </FormCard>
            <div aria-hidden className="absolute -top-6 -right-3 hidden rotate-6 rounded-2xl bg-amber px-4 py-2 text-center text-navy shadow-xl sm:block">
              <p className="font-serif text-2xl leading-none font-bold">100%</p>
              <p className="text-[10px] font-bold tracking-wide uppercase">rights &amp; royalties</p>
            </div>
          </div>
        </Container>
        <Wave fill="#ffffff" />
      </section>

      {/* 2. Platforms */}
      <section className="relative -mt-2 pt-4 pb-14">
        <Container>
          <SectionHeading title={c.platforms.title} intro={c.platforms.text} eyebrow="Worldwide distribution" />
          <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <ul className="marquee-track items-center gap-14 py-4">
              {[...c.platforms.logos, ...c.platforms.logos, ...c.platforms.logos, ...c.platforms.logos].map((l, i) => (
                <li key={i} className="shrink-0 pr-14" aria-hidden={i >= c.platforms.logos.length}>
                  <Image src={l.src} alt={i < c.platforms.logos.length ? l.name : ""} width={150} height={50} className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
                </li>
              ))}
              {[...c.platforms.textOnly, ...c.platforms.textOnly, ...c.platforms.textOnly, ...c.platforms.textOnly].map((n, i) => (
                <li key={`t${i}`} className="shrink-0 pr-14 text-2xl font-semibold text-slate-400" aria-hidden>{n}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 3. Consultation */}
      <section id="consultation" className="bg-paper relative py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <Eyebrow>Free consultation</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-5xl">{c.consultation.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{c.consultation.text}</p>
            <FramedImage src={IMG.podium.src} alt={IMG.podium.alt} width={768} height={512} accent="amber" className="mt-10 hidden max-w-lg lg:block" />
          </div>
          <div className="reveal rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-lift)] ring-1 ring-slate-100 sm:p-8">
            <LeadForm variant="journey" submitLabel={c.consultation.button} />
          </div>
        </Container>
      </section>

      {/* 4. Problem */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <SectionHeading title={c.problem.title} intro={c.problem.intro} eyebrow="Why books stall" />
          <ul className="grid gap-5 sm:grid-cols-2">
            {c.problem.items.map((i, n) => (
              <li key={i.q} className="reveal group relative overflow-hidden rounded-3xl bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span aria-hidden className="absolute -top-4 -right-1 font-serif text-[7rem] leading-none font-bold text-teal/10 transition group-hover:text-teal/20">{n + 1}</span>
                <h3 className="relative text-xl font-semibold text-navy">{i.q}</h3>
                <p className="relative mt-2 max-w-sm leading-relaxed text-slate-600">{i.a}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. Who we help */}
      <section className="bg-mist relative py-20 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <FramedImage src={IMG.team.src} alt={IMG.team.alt} width={768} height={768} accent="teal" className="reveal mx-auto w-full max-w-lg" sizes="(min-width:1024px) 480px, 90vw" />
          <div className="reveal">
            <SectionHeading title={c.whoWeHelp.title} center={false} eyebrow="Who we help" />
            <ul className="grid gap-3 sm:grid-cols-1">
              {c.whoWeHelp.items.map((i) => (
                <li key={i} className="flex gap-3 rounded-2xl bg-white px-5 py-3.5 text-slate-700 shadow-[var(--shadow-card)]">{check}{i}</li>
              ))}
            </ul>
            <div className="mt-8"><LinkButton href="/contact-us">{c.whoWeHelp.button}</LinkButton></div>
          </div>
        </Container>
      </section>

      {/* 6. Global distribution */}
      <section className="bg-hero relative isolate overflow-hidden py-24 text-white sm:py-28">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-50" />
        <Wave fill="#f4f8fb" flip />
        <Container className="grid items-center gap-12 pt-6 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading title={c.distribution.title} intro={c.distribution.text} center={false} light eyebrow="eBook · paperback · hardcover" />
            <QuoteButton className={buttonClass("amber")}>{c.distribution.button}</QuoteButton>
          </div>
          <div className="reveal relative mx-auto w-full max-w-xl">
            <div aria-hidden className="absolute inset-6 rounded-full bg-teal/30 blur-3xl" />
            <Image src={IMG.distribution.src} alt={IMG.distribution.alt} width={768} height={512} sizes="(min-width:1024px) 540px, 90vw" className="relative h-auto w-full rounded-3xl shadow-2xl ring-1 ring-white/20" />
          </div>
        </Container>
        <Wave fill="#ffffff" />
      </section>

      {/* 7. Services */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <SectionHeading title={c.services.title} eyebrow="Our services" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.cards.map((s, i) => (
              <li key={s.title} className="reveal group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-[#00506b] p-8 text-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]">
                <div aria-hidden className="bg-dots absolute inset-0 opacity-30" />
                <div aria-hidden className="absolute -right-10 -bottom-10 size-40 rounded-full bg-teal/20 transition duration-500 group-hover:scale-150" />
                <span className="relative grid size-16 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                  <Image src={`/images/icons-imgs/home/${s.icon}.webp`} alt="" width={44} height={44} className="size-11" />
                </span>
                <span aria-hidden className="absolute top-6 right-7 font-serif text-5xl font-bold text-white/10">0{i + 1}</span>
                <h3 className="relative mt-6 text-2xl font-semibold">{s.title}</h3>
                <p className="relative mt-2 flex-1 leading-relaxed text-white/80">{s.text}</p>
                <Link href={s.href} className="relative mt-6 inline-flex items-center gap-2 font-semibold text-amber">
                  Learn More <span aria-hidden className="transition group-hover:translate-x-1.5">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. Why us */}
      <section className="bg-paper relative py-20 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal relative mx-auto max-w-sm">
            <div aria-hidden className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[2rem] bg-amber/25" />
            <Image src={IMG.publishers.src} alt={IMG.publishers.alt} width={1024} height={1024} sizes="(min-width:1024px) 400px, 80vw" className="h-auto w-full rounded-[2rem] bg-white object-contain p-4 shadow-[var(--shadow-lift)]" />
          </div>
          <div>
            <SectionHeading title={c.why.title} center={false} eyebrow="Our promise" />
            <ul className="grid gap-4 sm:grid-cols-2">
              {c.why.items.map((i) => (
                <li key={i.h} className="reveal rounded-2xl bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="flex gap-3">
                    {check}
                    <p className="text-sm leading-relaxed text-slate-600"><strong className="mb-1 block text-base text-navy">{i.h}</strong>{i.t}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 9. Process */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <SectionHeading title={c.process.title} eyebrow="How it works" />
          <ol className="relative grid gap-6 md:grid-cols-5">
            <div aria-hidden className="absolute top-12 right-[10%] left-[10%] hidden border-t-2 border-dashed border-teal/40 md:block" />
            {c.process.steps.map((s, i) => (
              <li key={s.h} className="reveal relative text-center">
                <div className="relative mx-auto grid size-24 place-items-center rounded-full bg-white shadow-[var(--shadow-card)] ring-4 ring-teal/15">
                  <Image src={processIcons[i]} alt="" width={56} height={56} className="size-14" />
                  <span className="absolute -top-1 -right-1 grid size-8 place-items-center rounded-full bg-amber text-sm font-bold text-navy shadow">{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy">{s.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.t}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center"><QuoteButton className={buttonClass("amber")}>{c.process.button}</QuoteButton></div>
        </Container>
      </section>

      {/* 10. Author showcase */}
      <section className="bg-mist relative py-20 sm:py-24">
        <Container>
          <SectionHeading title={c.authors.title} intro={c.authors.text} eyebrow="Author stories" />
          <ul className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {[COVERS.spirit, COVERS.legends].map((cover, i) => {
              const a = c.authors.cards[i === 0 ? 0 : 1];
              return (
                <li key={a.name} className="reveal relative flex items-center gap-6 overflow-hidden rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
                  <div aria-hidden className="absolute -right-12 -bottom-12 size-48 rounded-full bg-teal/10" />
                  <Image src={cover.src} alt={cover.alt} width={300} height={450} sizes="150px" className="book-tilt-soft relative h-auto w-28 shrink-0 sm:w-36" style={{ ["--r" as string]: i ? "4deg" : "-4deg" }} />
                  <div className="relative">
                    <h3 className="font-serif text-2xl text-navy">{a.name}</h3>
                    <p className="mt-2 text-slate-600">{a.blurb}</p>
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-teal-dark hover:underline">{c.authors.link} &rarr;</a>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 11. Genres */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <SectionHeading title={c.genres.title} eyebrow="Every genre" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.genres.cards.map((g, i) => (
              <li key={g.h} className="reveal group relative flex items-center gap-5 overflow-hidden rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-navy">{g.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.t}</p>
                </div>
                <Image src={genreCovers[i].src} alt="" width={300} height={450} sizes="90px" className="book-tilt-soft h-auto w-20 shrink-0 transition duration-300 group-hover:-translate-y-2 group-hover:rotate-3" style={{ ["--r" as string]: "-4deg" }} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 12 + 13. Marketing and ghostwriting */}
      <section className="bg-paper relative py-20 sm:py-24">
        <Container className="grid gap-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal">
              <SectionHeading title={c.marketing.title} intro={c.marketing.text} center={false} eyebrow="Book marketing" />
              <LinkButton href="/book-marketing-services">{c.marketing.button}</LinkButton>
            </div>
            <div className="reveal relative mx-auto grid w-full max-w-xl grid-cols-5 grid-rows-2 gap-3">
              <Image src={IMG.billboard.src} alt={IMG.billboard.alt} width={768} height={512} sizes="320px" className="col-span-3 row-span-2 h-full w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]" />
              <Image src={IMG.socialMedia.src} alt={IMG.socialMedia.alt} width={400} height={400} sizes="200px" className="col-span-2 h-full w-full rounded-3xl bg-white object-cover shadow-[var(--shadow-card)]" />
              <Image src={IMG.launchEmail.src} alt={IMG.launchEmail.alt} width={400} height={400} sizes="200px" className="col-span-2 h-full w-full rounded-3xl object-cover shadow-[var(--shadow-card)]" />
            </div>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FramedImage src={IMG.ghostwriter.src} alt={IMG.ghostwriter.alt} width={600} height={400} accent="amber" className="reveal order-2 mx-auto w-full max-w-xl lg:order-1" />
            <div className="reveal order-1 lg:order-2">
              <SectionHeading title={c.ghost.title} intro={c.ghost.text} center={false} eyebrow="Ghostwriting" />
              <LinkButton href="/ghostwriting-services">{c.ghost.button}</LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 14. Published books */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <Container>
          <SectionHeading title={c.published.title} intro={c.published.text} eyebrow="Our books" />
        </Container>
        <div className="marquee overflow-hidden py-6">
          <ul className="marquee-track gap-6">
            {[...GALLERY.published, ...GALLERY.published].map((src, i) => (
              <li key={i} className="shrink-0 pr-6" aria-hidden={i >= GALLERY.published.length}>
                <a href={c.published.href} target="_blank" rel="noopener noreferrer" tabIndex={i >= GALLERY.published.length ? -1 : 0} aria-label="Browse Authors Crew books on Amazon">
                  <Image src={src} alt="" width={200} height={300} sizes="200px" className="h-72 w-48 rounded-lg object-cover shadow-[var(--shadow-book)] transition duration-300 hover:-translate-y-3 hover:rotate-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 text-center"><QuoteButton className={buttonClass("amber")}>{c.published.button}</QuoteButton></div>
      </section>

      {/* 15. Reviews */}
      <section className="bg-hero relative isolate overflow-hidden py-24 text-white">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
        <Wave fill="#ffffff" flip />
        <Container className="pt-6">
          <SectionHeading title={c.reviews.title} intro={c.reviews.text} light eyebrow="Reviews" />
          <ul className="mb-10 flex flex-wrap justify-center gap-3">
            {c.reviews.badges.map((b) => (
              <li key={b.label}>
                <a href={b.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold ring-1 ring-white/25 transition hover:bg-white hover:text-navy">{b.label}</a>
              </li>
            ))}
          </ul>
          <ul className="grid gap-5 md:grid-cols-2">
            {c.reviews.items.map((r) => (
              <li key={r.name} className="reveal">
                <figure className="relative h-full rounded-3xl bg-white p-8 text-ink shadow-xl">
                  <span aria-hidden className="absolute top-3 right-6 font-serif text-8xl leading-none text-teal/20">&rdquo;</span>
                  <div className="text-amber" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <blockquote className="relative mt-3 leading-relaxed text-slate-700">{r.text}</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-navy font-semibold text-white">{r.name[0]}</span>
                    <span><strong className="block text-navy">{r.name}</strong><span className="text-sm text-slate-500">{r.country}</span></span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
        <Wave fill="#f4f8fb" />
      </section>

      {/* 16. FAQ */}
      <section className="bg-mist relative py-20 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="reveal lg:sticky lg:top-8">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">{c.faq.title}</h2>
            <Image src={IMG.faq.src} alt={IMG.faq.alt} width={500} height={400} sizes="320px" className="mt-6 hidden h-auto w-72 lg:block" />
          </div>
          <div className="grid gap-3">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white p-5 shadow-[var(--shadow-card)] open:ring-2 open:ring-teal/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                  {f.q}
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-teal/10 text-xl leading-none text-teal-dark transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 17. Blog preview */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <SectionHeading title="Blogs & Author Insights" eyebrow="From the blog" />
          <ul className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug} className="reveal"><BlogCard post={p} /></li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 18. Final CTA */}
      <section id="contact" className="bg-hero relative isolate overflow-hidden py-24 text-white">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-50" />
        <Wave fill="#ffffff" flip />
        <FloatingBook cover={COVERS.peakHabits} className="top-24 left-[3%] hidden opacity-90 2xl:block" rotate={-10} width={120} slow />
        <Container className="grid items-center gap-12 pt-8 lg:grid-cols-2">
          <div className="reveal">
            <Eyebrow light>Start today</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight font-medium sm:text-5xl">{c.finalCta.title}</h2>
            <p className="mt-5 max-w-lg text-lg text-white/85">{c.finalCta.text}</p>
            <BookFan covers={[COVERS.finalCode, COVERS.manor, COVERS.shadowStrike]} className="mt-10 hidden sm:flex lg:justify-start" size="sm" />
          </div>
          <div className="reveal rounded-[1.75rem] bg-white p-6 text-ink shadow-2xl sm:p-8">
            <LeadForm variant="contact" submitLabel={c.finalCta.button} />
          </div>
        </Container>
      </section>
    </>
  );
}
