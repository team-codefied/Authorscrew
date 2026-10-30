import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "./LeadForm";
import { NAV, SERVICES, SITE } from "@/lib/site";

const quick = [...NAV.filter((n) => n.label !== "Our Services"), { label: "Services", href: "/our-services" }].sort(
  (a, b) => ["Home", "About Us", "Services", "Blogs", "Contact Us"].indexOf(a.label) - ["Home", "About Us", "Services", "Blogs", "Contact Us"].indexOf(b.label),
);

const h = "mb-4 text-base font-semibold text-ink";
const link = "text-slate-500 transition hover:text-amber-text";

export function NewsletterCta() {
  return (
    <section aria-labelledby="nl-title" className="mx-auto max-w-6xl px-4">
      <div className="grid overflow-hidden rounded-2xl bg-navy md:grid-cols-[1fr_1.2fr]">
        <div className="relative hidden min-h-64 md:block">
          <Image src="/images/cta-img-1.webp" alt="" fill sizes="480px" className="object-cover" />
        </div>
        <div className="p-8 sm:p-12">
          <h2 id="nl-title" className="font-serif text-3xl leading-tight font-medium text-white sm:text-4xl">
            Ready to Become an Author? Start Here
          </h2>
          <p className="mt-4 mb-6 text-white/90">Publishing tips, guides and offers for authors, straight to your inbox.</p>
          <LeadForm variant="newsletter" submitLabel="Join the Author Community" tone="dark" />
        </div>
      </div>
    </section>
  );
}

export function Footer({ landing = false }: { landing?: boolean }) {
  return (
    <footer className="mt-20 bg-gradient-to-b from-white to-slate-100 pt-4">
      <NewsletterCta />
      <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Image src="/images/logo-dark.svg" alt="Authors Crew" width={188} height={64} className="h-16 w-auto" />
          <p className="mt-5 max-w-sm leading-relaxed text-slate-500">
            Authors Crew is a full-service self-publishing company helping authors write, publish and market their books, while keeping 100% of their rights and royalties.
          </p>
          <p className="mt-6 mb-3 font-semibold">Follow Us</p>
          <ul className="flex gap-3">
            {SITE.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full bg-amber text-xs font-bold text-navy transition hover:bg-amber-dark"
                >
                  {s.label[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {!landing && (
          <nav aria-label="Quick links">
            <h3 className={h}>Quick Links</h3>
            <ul className="grid gap-3">
              {quick.map((q) => (
                <li key={q.href}>
                  <Link href={q.href} className={link}>
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav aria-label="Services" className={landing ? "lg:col-span-2" : ""}>
          <h3 className={h}>Services</h3>
          <ul className="grid gap-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className={link}>
                  {s.label === "Ghostwriting" ? "Ghostwriting" : s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <h3 className={h}>Location</h3>
          <ul className="grid gap-3 text-slate-500">
            <li>Headquarters: {SITE.hq}</li>
            <li>Regional Office: {SITE.regional}</li>
            <li>
              <a href={SITE.phoneHref} className={link}>{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={link}>{SITE.email}</a>
            </li>
          </ul>
        </address>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4">
        <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-slate-500">
          Disclaimer: Authors Crew is an independent book publishing and publishing-services provider and is not affiliated with, endorsed by, sponsored by, or officially connected to Amazon KDP (Kindle Direct Publishing), Barnes &amp; Noble, or their related entities. Any mention of these platforms is solely for informational purposes regarding publishing and distribution services. All trademarks and brand names belong to their respective owners.
        </p>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 text-sm sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Authors Crew. All Rights Reserved</p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <li><Link href="/terms-conditions" className={link}>Terms of Use</Link></li>
            <li><Link href="/privacy-policy" className={link}>Privacy Policy</Link></li>
            <li><Link href="/copyright-intellectual-property" className={link}>Copyright &amp; Intellectual Property</Link></li>
          </ul>
          <Image src="/images/pymnt-mthds.webp" alt="Accepted payment methods" width={240} height={30} className="h-6 w-auto" />
        </div>
      </div>
    </footer>
  );
}
