import cover from "@/content/landing/book-cover-design-lp.json";
import lp1 from "@/content/landing/book-publishing-services-lp1.json";
import lp2 from "@/content/landing/book-publishing-services-lp2.json";
import children from "@/content/landing/childrens-book-publishing-illustration-lp.json";
import christian from "@/content/landing/christian-book-publishing-lp.json";
import { IMG } from "./img";
import type { Pic, ServiceSection } from "./services";

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

export type LandingTheme = "cover" | "classic" | "light" | "playful" | "faith";

export type LandingMeta = {
  content: LandingContent;
  title: string;
  description: string;
  banner: string;
  /** Each landing page keeps its own visual character. */
  theme: LandingTheme;
  /** Large hero picture shown beside the text. */
  heroVisual?: Pic;
  /** Pictures used beside content sections. */
  pics: Pic[];
  /** The page's one book-cover section, inserted after the section whose title matches `after`. */
  covers: { after: string; set: "default" | "kids" | "faith"; title?: string; intro?: string };
};

export const LANDING_PAGES = {
  "book-cover-design-lp": {
    content: cover as LandingContent,
    title: "Book Cover Design for Authors",
    description: "Custom book cover design for fiction, nonfiction and children's books. Get a cover that tells readers what kind of story awaits.",
    banner: "/images/services/banner-cover-design.webp",
    theme: "cover",
    heroVisual: IMG.coverSet,
    pics: [IMG.coverStack, IMG.coverMock, IMG.coverGrid, IMG.coverTablet],
    covers: { after: "visual language", set: "default" },
  },
  "book-publishing-services-lp1": {
    content: lp1 as LandingContent,
    title: "Get Your Book Published",
    description: "You wrote the book. Let Authors Crew help you publish it in print and digital editions.",
    banner: "/images/main-banner.webp",
    theme: "classic",
    heroVisual: IMG.podium,
    pics: [IMG.libraryShelf, IMG.stack, IMG.distribution, IMG.openBook],
    covers: { after: "From Manuscript to Publish", set: "default" },
  },
  "book-publishing-services-lp2": {
    content: lp2 as LandingContent,
    title: "Turn Your Manuscript Into a Published Book",
    description: "Professional book publishing support for new and experienced authors, across fiction, nonfiction, memoirs and more.",
    banner: "/images/services/banner-publishing.webp",
    theme: "light",
    heroVisual: IMG.publishers,
    pics: [IMG.devices, IMG.books3, IMG.distribution, IMG.shelf],
    covers: { after: "Every Detail Matters", set: "default" },
  },
  "childrens-book-publishing-illustration-lp": {
    content: children as LandingContent,
    title: "Children's Book Publishing & Illustration",
    description: "Story development, illustration, layout and publishing support for children's books.",
    banner: "/images/services/banner-ghost-writing.webp",
    theme: "playful",
    heroVisual: IMG.kidsTable,
    pics: [IMG.kidsStories, IMG.kidsShelf, IMG.kidsSteps, IMG.ebookDesk],
    covers: { after: "Stories We Transform", set: "kids" },
  },
  "christian-book-publishing-lp": {
    content: christian as LandingContent,
    title: "Christian Book Publishing Services",
    description: "Editorial, design and publishing support for devotionals, testimonies, Christian memoirs and faith-centered books.",
    banner: "/images/services/banner-editing.webp",
    theme: "faith",
    heroVisual: IMG.christianTrio,
    pics: [IMG.christianBible, IMG.openBook, IMG.miracleLife, IMG.ebookDesk],
    covers: { after: "Christian Books We Help", set: "faith" },
  },
} satisfies Record<string, LandingMeta>;

export type LandingSlug = keyof typeof LANDING_PAGES;
