"use client";

import { usePathname } from "next/navigation";
import { LeadForm } from "./LeadForm";
import { NewsletterArt } from "./NewsletterArt";

/** Footer newsletter banner. The ghostwriting page uses a picture-free layout with the form on the right. */
export function NewsletterBanner() {
  const plain = usePathname() === "/ghostwriting-services";
  return (
    <div className={`grid overflow-hidden rounded-2xl bg-navy ${plain ? "md:grid-cols-2 md:items-center" : "md:grid-cols-[0.8fr_1.2fr]"}`}>
      {!plain && <NewsletterArt />}
      <div className={`p-6 sm:p-8 ${plain ? "md:p-10" : ""}`}>
        <h2 id="nl-title" className="font-serif text-2xl leading-tight font-medium text-white sm:text-3xl">
          Ready to Become an Author? Start Here
        </h2>
        <p className="mt-3 text-white/90">Publishing tips, guides and offers for authors, straight to your inbox.</p>
      </div>
      {plain && (
        <div className="p-6 pt-0 sm:p-8 md:p-10 md:pl-0">
          <LeadForm variant="newsletter" submitLabel="Join the Author Community" tone="dark" />
        </div>
      )}
      {!plain && (
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 md:col-start-2 md:-mt-2">
          <LeadForm variant="newsletter" submitLabel="Join the Author Community" tone="dark" />
        </div>
      )}
    </div>
  );
}
