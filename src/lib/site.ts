export const SITE = {
  name: "Authors Crew",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://authorscrew.com",
  phone: "+1 626-562-1861",
  phoneHref: "tel:+16265621861",
  email: "info@authorscrew.com",
  tagline: "We Build Authors, Not Just Books.",
  hq: "790 Clearwood Ct, Aurora, IL 60504, USA",
  regional: "1055 Wilshire Blvd, 90017, Los Angeles, United States",
  // TODO: confirm real social profile URLs with the client
  social: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Twitter", href: "https://twitter.com/" },
  ],
} as const;

export const SERVICES = [
  { slug: "ghostwriting-services", label: "Ghostwriting", icon: "ghostwriting" },
  { slug: "ebook-writing", label: "eBook Writing", icon: "e-book" },
  { slug: "book-cover-design", label: "Book Cover Design", icon: "book-cover-design" },
  { slug: "book-publishing-services", label: "Book Publishing", icon: "book-publishing" },
  { slug: "audiobook-publishing-services", label: "Audiobook Publishing", icon: "audio-book" },
  { slug: "book-editing-services", label: "Book Editing", icon: "book-editing" },
  { slug: "book-marketing-services", label: "Book Marketing", icon: "book-marketing" },
] as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Services", href: "/our-services", children: true },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export const PROJECT_TYPES: string[] = SERVICES.map((s) => s.label);
export const BUDGETS = ["Less than $499", "$499-$1,199", "$1,199-$1,999", "Above $1,999"];

export const DISCLAIMER_BEFORE =
  "Independent Service: We are an independent service provider and are not affiliated with, endorsed by, or associated with Amazon. You can publish your book on Amazon KDP independently and for free at ";
export const DISCLAIMER_AFTER = ". Our fees apply only to the optional services you choose to purchase from us.";
