import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYou() {
  return (
    <section className="bg-navy px-4 pt-40 pb-24 text-center text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-amber text-3xl text-navy">&#10003;</div>
        <h1 className="font-serif text-4xl font-medium sm:text-5xl">Thank You, We&apos;ve Got Your Request</h1>
        <p className="mt-5 text-lg text-white/90">
          A publishing consultant will get back to you within one business day. If your project is urgent, call us on{" "}
          <a href={SITE.phoneHref} className="font-semibold text-amber underline">{SITE.phone}</a>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/our-services" className="rounded-lg bg-amber px-6 py-3 text-sm font-bold text-navy uppercase hover:bg-amber-dark">Explore Our Services</Link>
          <Link href="/blogs" className="rounded-lg border border-white/50 px-6 py-3 text-sm font-bold uppercase hover:bg-white/10">Read Author Insights</Link>
        </div>
      </div>
    </section>
  );
}
