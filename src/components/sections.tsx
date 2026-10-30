import { reviews } from "@/content/home";
import { Container, SectionHeading } from "./ui";

export function Reviews({ title = "Our Client Reviews", intro }: { title?: string; intro?: string }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={title} intro={intro ?? reviews.text} />
        <ul className="mb-10 flex flex-wrap justify-center gap-3">
          {reviews.badges.map((b) => (
            <li key={b.label}>
              <a href={b.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-navy hover:border-teal hover:text-teal-dark">
                {b.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="grid gap-5 md:grid-cols-2">
          {reviews.items.map((r) => (
            <li key={r.name}>
              <figure className="h-full rounded-2xl bg-mist p-7">
                <div className="text-amber" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote className="mt-3 leading-relaxed text-slate-700">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-4 font-semibold text-navy">
                  {r.name} <span className="font-normal text-slate-500">&middot; {r.country}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Faq({ title, intro, items }: { title: string; intro?: string; items: { q: string; a: string }[] }) {
  return (
    <section className="bg-mist py-16 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading title={title} intro={intro} />
        <div className="grid gap-3">
          {items.map((f) => (
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
  );
}
