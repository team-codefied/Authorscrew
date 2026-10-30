"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SERVICES, SITE } from "@/lib/site";
import { useQuotePopup } from "./PopupProvider";

const btn = "whitespace-nowrap rounded-md px-4 py-2.5 text-[13px] font-bold tracking-wide uppercase transition";

export function Header() {
  const path = usePathname();
  const { openQuote } = useQuotePopup();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSub(false);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  // Close menus after navigating.
  useEffect(() => {
    setSub(false);
    setOpen(false);
  }, [path]);
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-black/60 to-transparent text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-white focus:p-2 focus:text-ink">
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 lg:px-8">
        <Link href="/" aria-label="Authors Crew home" className="shrink-0">
          <Image src="/images/logo.svg" alt="Authors Crew" width={188} height={64} priority className="h-14 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[15px] whitespace-nowrap xl:gap-9">
            {NAV.map((item) =>
              "children" in item ? (
                <li key={item.href} className="group relative" onMouseLeave={() => setSub(false)}>
                  <button
                    type="button"
                    aria-expanded={sub}
                    onClick={() => setSub((v) => !v)}
                    onMouseEnter={() => setSub(true)}
                    className={`flex items-center gap-1.5 py-3 transition hover:text-teal ${active(item.href) ? "text-teal" : ""}`}
                  >
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className={`transition ${sub ? "rotate-180" : ""}`}>
                      <path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>
                  {sub && (
                    <div className="absolute top-full -left-8 pt-2">
                      <ul className="grid w-[640px] grid-cols-3 gap-x-4 gap-y-5 rounded-[2rem] bg-white p-8 text-ink shadow-2xl">
                        {SERVICES.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/${s.slug}`}
                              onClick={() => setSub(false)}
                              className="flex items-center gap-3 text-[15px] transition hover:text-teal-dark"
                            >
                              <Image src={`/images/menu-icons/${s.icon}.webp`} alt="" width={24} height={24} className="size-6" />
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active(item.href) ? "page" : undefined} className={`transition hover:text-teal ${active(item.href) ? "text-teal" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button type="button" onClick={openQuote} className={`${btn} bg-teal text-navy hover:bg-teal-dark hover:text-white`}>
            Live Chat Now
          </button>
          <a href={SITE.phoneHref} className={`${btn} bg-amber text-navy hover:bg-amber-dark`}>
            {SITE.phone}
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-md border border-white/40 lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path d={open ? "M4 4l14 14M18 4 4 18" : "M3 6h16M3 11h16M3 16h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="max-h-[80vh] overflow-y-auto bg-navy px-4 pb-6 lg:hidden">
          <ul className="divide-y divide-white/10 text-lg">
            {NAV.map((item) => (
              <li key={item.href} className="py-3">
                <Link href={item.href} onClick={() => setOpen(false)} className={active(item.href) ? "text-teal" : ""}>
                  {item.label}
                </Link>
                {"children" in item && (
                  <ul className="mt-3 grid gap-3 pl-4 text-base text-white/85">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${s.slug}`} onClick={() => setOpen(false)}>
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={() => { setOpen(false); openQuote(); }} className={`${btn} bg-teal text-navy`}>
              Live Chat Now
            </button>
            <a href={SITE.phoneHref} className={`${btn} bg-amber text-center text-navy`}>
              {SITE.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/** Simplified header for landing pages: no main navigation. */
export function LandingHeader() {
  const { openQuote } = useQuotePopup();
  return (
    <header className="absolute inset-x-0 top-0 z-40 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:px-8">
        <Link href="/" aria-label="Authors Crew home">
          <Image src="/images/logo.svg" alt="Authors Crew" width={188} height={64} priority className="h-12 w-auto sm:h-14" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <button type="button" onClick={openQuote} className={`${btn} hidden bg-teal text-navy hover:bg-teal-dark hover:text-white sm:block`}>
            Live Chat Now
          </button>
          <a href={SITE.phoneHref} className={`${btn} bg-amber text-navy hover:bg-amber-dark`}>
            {SITE.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
