import Image from "next/image";
import { reviews } from "@/content/home";
import { IMG } from "@/lib/img";
import { Eyebrow, Wave } from "./Decor";
import { Container, SectionHeading } from "./ui";

export function Reviews({ title = "What Our Authors Say", intro, flat = false }: { title?: string; intro?: string; flat?: boolean }) {
  return (
    <section className="bg-hero relative isolate overflow-hidden py-24 text-white">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40" />
      {!flat && <Wave fill="#ffffff" flip />}
      <Container className={flat ? "" : "pt-6"}>
        <SectionHeading title={title} intro={intro ?? reviews.text} light eyebrow="Reviews" />
        <ul className="mb-10 flex flex-wrap justify-center gap-3">
          {reviews.badges.map((b) => (
            <li key={b.label}>
              <a href={b.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold ring-1 ring-white/25 transition hover:bg-white hover:text-navy">
                {b.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="grid gap-5 md:grid-cols-2">
          {reviews.items.map((r) => (
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
  );
}

export function Faq({ title, intro, items }: { title: string; intro?: string; items: { q: string; a: string }[] }) {
  return (
    <section className="bg-mist relative py-20 sm:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="reveal lg:sticky lg:top-8">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>}
          <Image src={IMG.faq.src} alt={IMG.faq.alt} width={500} height={400} sizes="320px" className="mt-6 hidden h-auto w-72 lg:block" />
        </div>
        <div className="grid gap-3">
          {items.map((f) => (
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
  );
}
