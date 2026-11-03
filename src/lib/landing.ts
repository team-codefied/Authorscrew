import cover from "@/content/landing/book-cover-design-lp.json";
import lp1 from "@/content/landing/book-publishing-services-lp1.json";
import lp2 from "@/content/landing/book-publishing-services-lp2.json";
import children from "@/content/landing/childrens-book-publishing-illustration-lp.json";
import christian from "@/content/landing/christian-book-publishing-lp.json";
import { COVERS, GALLERY, IMG } from "./img";
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
  /** Cut-out covers fanned in the hero. */
  heroCovers: Pic[];
  /** Large hero picture shown beside the text. */
  heroVisual?: Pic;
  /** Pictures used beside content sections. */
  pics: Pic[];
  /** Image gallery inserted after the section whose title matches `after`. */
  gallery?: { after: string; images: string[]; portrait: boolean; label: string };
  /** Which cover strip to show between sections. */
  strip: "published" | "small" | "cutouts";
};

export const LANDING_PAGES = {
  "book-cover-design-lp": {
    content: cover as LandingContent,
    title: "Book Cover Design for Authors",
    description: "Custom book cover design for fiction, nonfiction and children's books. Get a cover that tells readers what kind of story awaits.",
    banner: "/images/services/banner-cover-design.webp",
    theme: "cover",
    heroCovers: [COVERS.lastFarewell, COVERS.thirdMom, COVERS.legends, COVERS.boxing, COVERS.bookOfAdam],
    heroVisual: IMG.coverSet,
    pics: [IMG.coverTablet, IMG.coverMock, IMG.coverGrid, IMG.coverBooks],
    gallery: { after: "visual language", images: [...GALLERY.smallCovers, ...GALLERY.published.slice(7)], portrait: true, label: "Your genre has a visual language" },
    strip: "small",
  },
  "book-publishing-services-lp1": {
    content: lp1 as LandingContent,
    title: "Get Your Book Published",
    description: "You wrote the book. Let Authors Crew help you publish it in print and digital editions.",
    banner: "/images/main-banner.webp",
    theme: "classic",
    heroCovers: [COVERS.worldCouldBe, COVERS.portuguese, COVERS.spirit, COVERS.mittLiv, COVERS.thirdMom],
    heroVisual: IMG.podium,
    pics: [IMG.libraryShelf, IMG.stack, IMG.distribution, IMG.openBook],
    gallery: { after: "From Manuscript to Publish", images: GALLERY.smallCovers, portrait: true, label: "Books published with Authors Crew" },
    strip: "published",
  },
  "book-publishing-services-lp2": {
    content: lp2 as LandingContent,
    title: "Turn Your Manuscript Into a Published Book",
    description: "Professional book publishing support for new and experienced authors, across fiction, nonfiction, memoirs and more.",
    banner: "/images/services/banner-publishing.webp",
    theme: "light",
    heroCovers: [COVERS.bookOfAdam, COVERS.lastFarewell, COVERS.portuguese],
    heroVisual: IMG.publishers,
    pics: [IMG.devices, IMG.books3, IMG.distribution, IMG.openBook],
    gallery: { after: "Every Detail Matters", images: GALLERY.smallCovers, portrait: true, label: "Books published with Authors Crew" },
    strip: "published",
  },
  "childrens-book-publishing-illustration-lp": {
    content: children as LandingContent,
    title: "Children's Book Publishing & Illustration",
    description: "Story development, illustration, layout and publishing support for children's books.",
    banner: "/images/services/banner-ghost-writing.webp",
    theme: "playful",
    heroCovers: [],
    heroVisual: IMG.kidsTable,
    pics: [IMG.kidsStories, IMG.kidsTrio, IMG.kidsSteps, IMG.kidsShelf],
    gallery: { after: "Stories We Transform", images: GALLERY.kids, portrait: true, label: "Stories we transform into magical children's books" },
    strip: "published",
  },
  "christian-book-publishing-lp": {
    content: christian as LandingContent,
    title: "Christian Book Publishing Services",
    description: "Editorial, design and publishing support for devotionals, testimonies, Christian memoirs and faith-centered books.",
    banner: "/images/services/banner-editing.webp",
    theme: "faith",
    heroCovers: [],
    heroVisual: IMG.christianTrio,
    pics: [IMG.christianBible, IMG.oldBooks, IMG.miracleLife, IMG.christianTrio],
    gallery: { after: "Christian Books We Help", images: GALLERY.christian, portrait: true, label: "Christian books we help bring to life" },
    strip: "cutouts",
  },
} satisfies Record<string, LandingMeta>;

export type LandingSlug = keyof typeof LANDING_PAGES;
