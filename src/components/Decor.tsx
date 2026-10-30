import Image from "next/image";
import type { ReactNode } from "react";

/** Curved divider that sits at the bottom edge of a section and blends into the next one. */
export function Wave({ className = "", fill = "#ffffff", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 h-[48px] w-full sm:h-[72px] ${flip ? "top-0 rotate-180" : "bottom-0"} ${className}`}
    >
      <path d="M0 52C180 12 360 0 560 20s380 62 560 54 240-34 320-48v64H0z" fill={fill} />
    </svg>
  );
}

type Cover = { src: string; alt: string };

/** An overlapping, gently fanned row of book covers used as a hero or section visual. */
export function BookFan({ covers, className = "", size = "md" }: { covers: Cover[]; className?: string; size?: "sm" | "md" | "lg" }) {
  const w = { sm: "w-16 sm:w-20", md: "w-20 sm:w-28 lg:w-32", lg: "w-24 sm:w-32 lg:w-40" }[size];
  const mid = (covers.length - 1) / 2;
  return (
    <ul className={`flex items-end justify-center ${className}`} aria-label="Books published with Authors Crew">
      {covers.map((c, i) => {
        const off = i - mid;
        return (
          <li
            key={c.src}
            className={`${w} -mx-2 shrink-0 transition duration-300 hover:z-20 hover:-translate-y-3 sm:-mx-3`}
            style={{ zIndex: 10 - Math.abs(Math.round(off)), transform: `translateY(${Math.abs(off) * 10}px)` }}
          >
            <Image
              src={c.src}
              alt={c.alt}
              width={300}
              height={450}
              sizes="160px"
              className="book-tilt h-auto w-full"
              style={{ ["--r" as string]: `${off * 5}deg` }}
            />
          </li>
        );
      })}
    </ul>
  );
}

/** A single cover floating beside content; animation is disabled for reduced motion. */
export function FloatingBook({
  cover,
  className = "",
  rotate = 0,
  width = 140,
  slow = false,
  priority = false,
}: {
  cover: Cover;
  className?: string;
  rotate?: number;
  width?: number;
  slow?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${slow ? "animate-float-slow" : "animate-float"} ${className}`}
      style={{ ["--r" as string]: `${rotate}deg`, width }}
    >
      <Image src={cover.src} alt="" width={300} height={450} sizes={`${width}px`} priority={priority} className="book-tilt h-auto w-full" />
    </div>
  );
}

/** Framed photo with an offset accent block behind it. */
export function FramedImage({
  src,
  alt,
  className = "",
  accent = "teal",
  width = 760,
  height = 600,
  sizes = "(min-width:1024px) 540px, 100vw",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  accent?: "teal" | "amber" | "navy";
  width?: number;
  height?: number;
  sizes?: string;
  children?: ReactNode;
}) {
  const bg = { teal: "bg-teal/25", amber: "bg-amber/30", navy: "bg-navy/15" }[accent];
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className={`absolute -right-3 -bottom-3 size-full rounded-3xl sm:-right-5 sm:-bottom-5 ${bg}`} />
      <div aria-hidden className="bg-dots-dark absolute -top-5 -left-5 hidden size-24 sm:block" />
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="relative h-auto w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]" />
      {children}
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.14em] uppercase ${
        light ? "bg-white/10 text-amber ring-1 ring-white/20" : "bg-teal/10 text-teal-dark ring-1 ring-teal/20"
      }`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${light ? "bg-amber" : "bg-teal"}`} />
      {children}
    </span>
  );
}

/** Container for a form that sits inside a hero. */
export function FormCard({
  title,
  subtitle,
  children,
  id,
  className = "",
  badge,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
  className?: string;
  badge?: string;
}) {
  return (
    <div id={id} className={`glass relative scroll-mt-28 rounded-[1.75rem] p-6 text-ink sm:p-8 ${className}`}>
      <div aria-hidden className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-gradient-to-r from-teal via-amber to-teal" />
      {badge && (
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber/15 px-3 py-1 text-xs font-bold tracking-wide text-amber-text uppercase">
          {badge}
        </p>
      )}
      <h2 className="font-serif text-2xl leading-tight font-semibold text-navy sm:text-[1.7rem]">{title}</h2>
      {subtitle && <p className="mt-1.5 mb-5 text-sm leading-relaxed text-slate-600">{subtitle}</p>}
      {!subtitle && <div className="mb-5" />}
      {children}
      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 5V4a3 3 0 0 1 6 0v1h.5v6h-7V5zm1.2 0h3.6V4a1.8 1.8 0 0 0-3.6 0z" fill="currentColor" /></svg>
        Your details stay private. No spam, no obligation.
      </p>
    </div>
  );
}

type Crumb = { label: string; href?: string };

/** Shared hero for inner pages: dark gradient, breadcrumb, headline and an optional picture on the right. */
export function PageHero({
  title,
  crumbs,
  eyebrow,
  intro,
  visual,
  children,
}: {
  title: string;
  crumbs: Crumb[];
  eyebrow?: string;
  intro?: string;
  visual?: { src: string; alt: string; width?: number; height?: number };
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero relative isolate overflow-hidden pt-32 pb-24 text-white sm:pt-40 sm:pb-28">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_25%_40%,black,transparent_70%)]" />
      <div aria-hidden className="absolute -top-24 right-[-8rem] -z-10 size-[28rem] rounded-full border border-white/10" />
      <div aria-hidden className="absolute -top-8 right-[-3rem] -z-10 size-[20rem] rounded-full border border-teal/20" />
      <div className={`mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 ${visual ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        <div>
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {i > 0 && <span aria-hidden> / </span>}
                {c.href ? <a href={c.href} className="hover:underline">{c.label}</a> : c.label}
              </span>
            ))}
          </nav>
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
          <h1 className="font-serif text-4xl leading-[1.07] font-medium sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">{intro}</p>}
          {children}
        </div>
        {visual && (
          <div className="relative hidden lg:block">
            <div aria-hidden className="absolute inset-6 rounded-full bg-teal/25 blur-3xl" />
            <Image src={visual.src} alt={visual.alt} width={visual.width ?? 768} height={visual.height ?? 512} sizes="440px" priority className="relative h-auto w-full rounded-3xl shadow-2xl ring-4 ring-white/10" />
          </div>
        )}
      </div>
      <Wave fill="#ffffff" />
    </section>
  );
}
