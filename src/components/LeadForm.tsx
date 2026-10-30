"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, journeySchema, newsletterSchema } from "@/lib/schemas";
import { BUDGETS, DISCLAIMER_AFTER, DISCLAIMER_BEFORE, PROJECT_TYPES } from "@/lib/site";

export type LeadFormProps = {
  variant: "journey" | "contact" | "newsletter";
  submitLabel: string;
  /** Journey-only extras present on the publishing landing pages. */
  showGenre?: boolean;
  showBudget?: boolean;
  /** Journey form on the cover LP asks Genre but not Project Type. */
  hideProjectType?: boolean;
  tone?: "light" | "dark";
  className?: string;
  /** Pre-selects the Project Type, e.g. on a service page. */
  defaultProjectType?: string;
};

type Values = {
  kind?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  projectType?: string;
  genre?: string;
  budget?: string;
  website?: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCHEMAS = { journey: journeySchema, contact: contactSchema, newsletter: newsletterSchema };

function Turnstile({ onToken }: { onToken: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    const el = ref.current;
    const mount = () => {
      if (window.turnstile && !el.hasChildNodes()) {
        window.turnstile.render(el, { sitekey: SITE_KEY, callback: onToken, "expired-callback": () => onToken("") });
      }
    };
    if (window.turnstile) return mount();
    let s = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
    if (!s) {
      s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.dataset.turnstile = "1";
      document.head.appendChild(s);
    }
    s.addEventListener("load", mount);
    return () => s?.removeEventListener("load", mount);
  }, [onToken]);
  return SITE_KEY ? <div ref={ref} className="mt-1" /> : null;
}

export function LeadForm({
  variant,
  submitLabel,
  showGenre,
  showBudget,
  hideProjectType,
  tone = "light",
  className = "",
  defaultProjectType,
}: LeadFormProps) {
  const router = useRouter();
  const uid = useId();
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(SCHEMAS[variant]) as unknown as Resolver<Values>,
    defaultValues: { kind: variant, projectType: defaultProjectType ?? "" } as Values,
  });

  async function onSubmit(values: Values) {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind: variant, page: window.location.pathname, turnstileToken: token }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? "Something went wrong.");
      router.push("/thank-you");
    } catch (e) {
      setStatus("error");
      setServerError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  }

  const dark = tone === "dark";
  const input = `w-full rounded-xl border bg-slate-50 px-4 py-3 text-[15px] text-ink placeholder:text-slate-500 transition hover:border-slate-400 focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/15 focus:outline-none ${
    dark ? "border-transparent" : "border-slate-200"
  }`;
  const label = `mb-1.5 block text-sm font-medium ${dark ? "text-white" : "text-ink"}`;
  const err = "mt-1 text-sm text-red-600";
  const field = (name: keyof Values) => `${uid}-${name}`;
  const e = (name: keyof Values) =>
    errors[name]?.message ? (
      <p id={`${field(name)}-err`} role="alert" className={dark ? "mt-1 text-sm text-amber" : err}>
        {String(errors[name]?.message)}
      </p>
    ) : null;
  const a11y = (name: keyof Values) => ({
    id: field(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${field(name)}-err` : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`grid gap-4 ${className}`}>
      {/* honeypot */}
      <input {...register("website")} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {variant !== "newsletter" && (
        <div>
          <label htmlFor={field("name")} className={label}>
            {variant === "contact" ? "Full Name" : "Name"}
            {variant === "contact" && " *"}
          </label>
          <input {...register("name")} {...a11y("name")} autoComplete="name" placeholder="Your name" className={input} />
          {e("name")}
        </div>
      )}

      <div>
        <label htmlFor={field("email")} className={`${label} ${variant === "newsletter" ? "sr-only" : ""}`}>
          {variant === "contact" ? "Business Email *" : "Email"}
        </label>
        <input
          {...register("email")}
          {...a11y("email")}
          type="email"
          autoComplete="email"
          placeholder={variant === "newsletter" ? "Enter your email address" : "you@example.com"}
          className={input}
        />
        {e("email")}
      </div>

      {variant !== "newsletter" && (
        <div>
          <label htmlFor={field("phone")} className={label}>
            Phone Number *
          </label>
          <input {...register("phone")} {...a11y("phone")} type="tel" autoComplete="tel" placeholder="+1 555 000 0000" className={input} />
          {e("phone")}
        </div>
      )}

      {variant === "journey" && !hideProjectType && (
        <div>
          <label htmlFor={field("projectType")} className={label}>
            Project Type
          </label>
          <select {...register("projectType")} {...a11y("projectType")} className={input}>
            <option value="">Select</option>
            {PROJECT_TYPES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      )}

      {variant === "journey" && showGenre && (
        <div>
          <label htmlFor={field("genre")} className={label}>
            Genre
          </label>
          <input {...register("genre")} {...a11y("genre")} placeholder="e.g. Romance, Memoir" className={input} />
        </div>
      )}

      {variant === "journey" && showBudget && (
        <div>
          <label htmlFor={field("budget")} className={label}>
            Budget
          </label>
          <select {...register("budget")} {...a11y("budget")} defaultValue="" className={input}>
            <option value="">Select budget</option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      )}

      {variant === "contact" && (
        <div>
          <label htmlFor={field("message")} className={label}>
            Message *
          </label>
          <textarea {...register("message")} {...a11y("message")} rows={4} placeholder="Tell us about your book" className={input} />
          {e("message")}
        </div>
      )}

      <Turnstile onToken={setToken} />

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-xl bg-gradient-to-b from-[#ffbb4d] to-amber px-6 py-4 text-sm font-bold tracking-wide text-navy uppercase shadow-[0_10px_20px_-8px_rgb(217_139_10/0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_24px_-8px_rgb(217_139_10/0.8)] focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending..." : submitLabel}
        </button>
        {status === "error" && (
          <p role="alert" className={`mt-2 text-sm ${dark ? "text-amber" : "text-red-600"}`}>
            {serverError}
          </p>
        )}
        <p className={`mt-3 text-xs leading-relaxed sm:text-right ${dark ? "text-white/75" : "text-slate-500"}`}>
          {DISCLAIMER_BEFORE}
          <a href="https://kdp.amazon.com" target="_blank" rel="noopener noreferrer" className="underline">
            kdp.amazon.com
          </a>
          {DISCLAIMER_AFTER}
        </p>
      </div>
    </form>
  );
}
