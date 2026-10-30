import cover from "@/content/landing/book-cover-design-lp.json";
import lp1 from "@/content/landing/book-publishing-services-lp1.json";
import lp2 from "@/content/landing/book-publishing-services-lp2.json";
import children from "@/content/landing/childrens-book-publishing-illustration-lp.json";
import christian from "@/content/landing/christian-book-publishing-lp.json";
import type { ServiceSection } from "./services";

export type LandingContent = {
  slug: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  bullets: string[];
  heroCtas: { label: string; to: string }[];
  heroOffer: string;
  /** Publishing LPs 1 and 2 ask Project Type, Genre and Budget in the hero form. */
  heroGenreBudget: boolean;
  platformsTitle: string;
  sections: ServiceSection[];
  faqTitle: string;
  faqIntro: string;
  faq: { q: string; a: string }[];
  reviewsTitle: string;
  reviewsIntro: string;
  bottomFormTitle: string;
};

export type LandingMeta = { content: LandingContent; title: string; description: string; banner: string };

export const LANDING_PAGES = {
  "book-cover-design-lp": {
    content: cover as LandingContent,
    title: "Book Cover Design for Authors",
    description: "Custom book cover design for fiction, nonfiction and children's books. Get a cover that tells readers what kind of story awaits.",
    banner: "/images/services/banner-cover-design.webp",
  },
  "book-publishing-services-lp1": {
    content: lp1 as LandingContent,
    title: "Get Your Book Published",
    description: "You wrote the book. Let Authors Crew help you publish it in print and digital editions.",
    banner: "/images/main-banner.webp",
  },
  "book-publishing-services-lp2": {
    content: lp2 as LandingContent,
    title: "Turn Your Manuscript Into a Published Book",
    description: "Professional book publishing support for new and experienced authors, across fiction, nonfiction, memoirs and more.",
    banner: "/images/services/banner-publishing.webp",
  },
  "childrens-book-publishing-illustration-lp": {
    content: children as LandingContent,
    title: "Children's Book Publishing & Illustration",
    description: "Story development, illustration, layout and publishing support for children's books.",
    banner: "/images/services/banner-ghost-writing.webp",
  },
  "christian-book-publishing-lp": {
    content: christian as LandingContent,
    title: "Christian Book Publishing Services",
    description: "Editorial, design and publishing support for devotionals, testimonies, Christian memoirs and faith-centered books.",
    banner: "/images/services/banner-editing.webp",
  },
} satisfies Record<string, LandingMeta>;

export type LandingSlug = keyof typeof LANDING_PAGES;
