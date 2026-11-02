"use client";

import { usePathname } from "next/navigation";
import { BookFan } from "./Decor";
import { COVERS } from "@/lib/img";

// Each set pairs different titles, so no two books are shown together on more than one page
// and the banner doesn't look the same everywhere on the site.
const SETS = [
  [COVERS.relentless, COVERS.forever, COVERS.legends],
  [COVERS.stellar, COVERS.manor, COVERS.peakHabits],
  [COVERS.shadowStrike, COVERS.finalCode, COVERS.whisperingHouse],
  [COVERS.shadowfell, COVERS.jackLucy, COVERS.spirit],
  [COVERS.peakHabits, COVERS.relentless, COVERS.jackLucy],
  [COVERS.manor, COVERS.legends, COVERS.shadowfell],
];

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Decorative book composition for the newsletter banner; the set rotates by page. */
export function NewsletterArt() {
  const path = usePathname() || "/";
  const set = SETS[hash(path) % SETS.length];
  return (
    <div aria-hidden className="relative isolate hidden min-h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-teal/40 via-navy to-navy-deep md:flex">
      <div className="bg-dots absolute inset-0 -z-10 opacity-50" />
      <div className="absolute -bottom-16 -left-10 -z-10 size-56 rounded-full bg-amber/25 blur-2xl" />
      <div className="absolute -top-10 -right-6 -z-10 size-48 rounded-full border border-white/15" />
      <BookFan covers={set} size="xl" className="px-6 py-10" />
    </div>
  );
}
