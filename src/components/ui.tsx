import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionHeading({
  title,
  intro,
  center = true,
  light = false,
  as: Tag = "h2",
}: {
  title: string;
  intro?: string;
  center?: boolean;
  light?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Tag className={`font-serif text-3xl leading-tight font-medium sm:text-4xl ${light ? "text-white" : "text-navy"}`}>{title}</Tag>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/90" : "text-slate-600"}`}>{intro}</p>}
    </div>
  );
}

const base = "inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-sm font-bold tracking-wide uppercase transition";
const variants = {
  amber: "bg-amber text-navy hover:bg-amber-dark",
  teal: "bg-teal text-navy hover:bg-teal-dark hover:text-white",
  outline: "border-2 border-white/70 text-white hover:bg-white/10",
  outlineDark: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
};

export function LinkButton({
  href,
  variant = "amber",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
}) {
  const cls = `${base} ${variants[variant]}`;
  return href.startsWith("tel:") || href.startsWith("http") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export const buttonClass = (variant: keyof typeof variants = "amber") => `${base} ${variants[variant]}`;
