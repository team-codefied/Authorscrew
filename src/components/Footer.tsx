import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LeadForm } from "./LeadForm";
import { Wave } from "./Decor";
import { NAV, SERVICES, SITE } from "@/lib/site";

const quick = [...NAV.filter((n) => n.label !== "Our Services"), { label: "Services", href: "/our-services" }].sort(
  (a, b) => ["Home", "About Us", "Services", "Blogs", "Contact Us"].indexOf(a.label) - ["Home", "About Us", "Services", "Blogs", "Contact Us"].indexOf(b.label),
);

const h = "mb-5 text-sm font-bold tracking-[0.14em] text-amber uppercase";
const link = "group inline-flex items-center gap-2 text-white/75 transition hover:text-white";

const icon = (d: ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 shrink-0 text-amber">
    {d}
  </svg>
);

const SOCIAL_ICONS: Record<string, ReactNode> = {
  Facebook: <path fill="currentColor" stroke="none" d="M13.5 21v-7.5h2.6l.5-3h-3.1V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21z" />,
  Instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  Twitter: <path fill="currentColor" stroke="none" d="M17.7 4h2.9l-6.3 7.2L21.7 20h-5.8l-4.5-5.9L6.2 20H3.3l6.7-7.7L2.9 4h5.9l4.1 5.4zm-1 14.2h1.6L7.8 5.7H6.1z" />,
};

export function Footer({ landing = false }: { landing?: boolean }) {
  return (
    <footer className="relative mt-24 isolate">
      {/* Subscribe card straddling the footer edge */}
      <section aria-labelledby="nl-title" className="relative z-10 mx-auto -mb-20 max-w-[1280px] px-4">
        <div className="relative overflow-hidden rounded-3xl bg-white p-7 shadow-[0_30px_70px_-20px_rgba(0,24,42,0.45)] ring-1 ring-slate-100 sm:p-10">
          <div aria-hidden className="absolute inset-x-10 top-0 h-1.5 rounded-b-full bg-gradient-to-r from-teal via-amber to-teal" />
          <div aria-hidden className="bg-dots-dark absolute -top-4 -right-4 size-40 opacity-60" />
          <div aria-hidden className="absolute -bottom-16 -left-12 size-48 rounded-full bg-amber/15 blur-2xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div className="flex items-start gap-5">
              <span aria-hidden className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy to-teal text-white shadow-lg sm:grid">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <div>
                <h2 id="nl-title" className="font-serif text-2xl leading-tight font-medium text-navy sm:text-3xl">
                  Ready to Become an Author? Start Here
                </h2>
                <p className="mt-2 text-slate-600">Subscribe for publishing tips, guides and offers for authors, straight to your inbox.</p>
              </div>
            </div>
            <LeadForm variant="newsletter" submitLabel="Subscribe" />
          </div>
        </div>
      </section>

      <div className="bg-hero relative overflow-hidden pt-36 text-white">
        <Wave fill="#ffffff" className="!top-0 !bottom-auto" />
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_20%_30%,black,transparent_70%)]" />
        <div aria-hidden className="absolute -right-24 bottom-10 -z-10 size-[26rem] rounded-full border border-white/10" />
        <div aria-hidden className="absolute -right-8 bottom-24 -z-10 size-[16rem] rounded-full border border-teal/25" />

        <div className="mx-auto grid max-w-[1280px] gap-12 px-4 pb-14 lg:grid-cols-[1.5fr_0.8fr_1fr_1.4fr]">
          <div>
            <Image src="/images/logo.svg" alt="Authors Crew" width={188} height={64} className="h-16 w-auto" />
            <p className="mt-5 max-w-sm leading-relaxed text-white/75">
              Authors Crew is a full-service self-publishing company helping authors write, publish and market their books, while keeping 100% of their rights and royalties.
            </p>
            <p className={`${h} mt-7 mb-3`}>Follow us</p>
            <ul className="flex gap-3">
              {SITE.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-amber hover:text-navy"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {SOCIAL_ICONS[s.label]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {!landing ? (
            <nav aria-label="Quick links">
              <h3 className={h}>Quick links</h3>
              <ul className="grid gap-3">
                {quick.map((q) => (
                  <li key={q.href}>
                    <Link href={q.href} className={link}>
                      <span aria-hidden className="h-px w-3 bg-amber/70 transition-all group-hover:w-5" />
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <div className="hidden lg:block" />
          )}

          <nav aria-label="Services">
            <h3 className={h}>Services</h3>
            <ul className="grid gap-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className={link}>
                    <span aria-hidden className="h-px w-3 bg-amber/70 transition-all group-hover:w-5" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <h3 className={h}>Get in touch</h3>
            <ul className="grid gap-4 text-white/75">
              <li className="flex gap-3">
                {icon(<><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>)}
                <span><span className="block text-xs font-semibold tracking-wide text-white/50 uppercase">Headquarters</span>{SITE.hq}</span>
              </li>
              <li className="flex gap-3">
                {icon(<><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>)}
                <span><span className="block text-xs font-semibold tracking-wide text-white/50 uppercase">Regional office</span>{SITE.regional}</span>
              </li>
              <li className="flex gap-3">
                {icon(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />)}
                <a href={SITE.phoneHref} className="transition hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex gap-3">
                {icon(<><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>)}
                <a href={`mailto:${SITE.email}`} className="transition hover:text-white">{SITE.email}</a>
              </li>
            </ul>
          </address>
        </div>

        <div className="border-t border-white/10 bg-black/15">
          <div className="mx-auto max-w-[1280px] px-4">
            <p className="mx-auto max-w-4xl py-7 text-center text-xs leading-relaxed text-white/55">
              Disclaimer: Authors Crew is an independent book publishing and publishing-services provider and is not affiliated with, endorsed by, sponsored by, or officially connected to Amazon KDP (Kindle Direct Publishing), Barnes &amp; Noble, or their related entities. Any mention of these platforms is solely for informational purposes regarding publishing and distribution services. All trademarks and brand names belong to their respective owners.
            </p>
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/70 lg:flex-row">
              <p>&copy; {new Date().getFullYear()} Authors Crew. All Rights Reserved</p>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <li><Link href="/terms-conditions" className="transition hover:text-amber">Terms of Use</Link></li>
                <li><Link href="/privacy-policy" className="transition hover:text-amber">Privacy Policy</Link></li>
                <li><Link href="/copyright-intellectual-property" className="transition hover:text-amber">Copyright &amp; Intellectual Property</Link></li>
              </ul>
              <span className="rounded-full bg-white px-4 py-1.5">
                <Image src="/images/pymnt-mthds.webp" alt="Accepted payment methods" width={240} height={30} className="h-5 w-auto" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
