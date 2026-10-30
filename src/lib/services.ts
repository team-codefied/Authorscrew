import { IMG } from "./img";
import ghost from "@/content/services/ghostwriting-services.json";
import ebook from "@/content/services/ebook-writing.json";
import cover from "@/content/services/book-cover-design.json";
import publishing from "@/content/services/book-publishing-services.json";
import audiobook from "@/content/services/audiobook-publishing-services.json";
import editing from "@/content/services/book-editing-services.json";
import marketing from "@/content/services/book-marketing-services.json";

export type Block =
  | { k: "p"; text: string }
  | { k: "ul"; items: string[] }
  | { k: "cards"; items: { title: string; text: string }[] }
  | { k: "chips"; items: string[] }
  | { k: "cta"; label: string; to: string }
  | { k: "tiers"; items: { name: string; features: string[] }[] }
  | { k: "genres"; items: { title: string; text: string }[] }
  | { k: "features"; items: { title: string; text: string }[] };

export type ServiceSection = { title: string; blocks: Block[] };

export type ServiceContent = {
  slug: string;
  h1: string;
  sections: ServiceSection[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  reviews: boolean;
  contact: { title: string; text: string } | null;
};

export type Pic = { src: string; alt: string };

export type ServiceMeta = {
  content: ServiceContent;
  title: string;
  description: string;
  /** Hero background (from the supplied assets). */
  banner: string;
  /** Short label for the hero eyebrow and the form's pre-selected project type. */
  label: string;
  /** Two pictures composed in the hero. */
  hero: [Pic, Pic];
  /** Pictures used beside content sections, in order. */
  pics: Pic[];
  /** Which kind of cover strip to show mid-page. */
  strip: "published" | "small" | "cutouts";
};

const BANNER_FALLBACK = "/images/services/banner-publishing.webp";

export const SERVICE_PAGES: Record<string, ServiceMeta> = {
  "ghostwriting-services": {
    content: ghost as ServiceContent,
    title: "Professional Ghostwriting Services",
    description: "Hire professional ghostwriters to turn your ideas into a publish-ready book in your own voice, with full ownership and confidentiality.",
    banner: "/images/services/banner-ghost-writing.webp",
    label: "Ghostwriting",
    hero: [IMG.ghostwriter, IMG.writer],
    pics: [IMG.writer, IMG.ghostwriter, IMG.stack, IMG.publishers, IMG.books3],
    strip: "published",
  },
  "ebook-writing": {
    content: ebook as ServiceContent,
    title: "eBook Writing Services",
    description: "Professional eBook writing, editing and formatting for Amazon Kindle and every major digital platform.",
    banner: BANNER_FALLBACK,
    label: "eBook Writing",
    hero: [IMG.ebookDevices, IMG.ereader],
    pics: [IMG.kindleScreen, IMG.ebookDesk, IMG.ebookDesk2, IMG.ebookHand, IMG.devices, IMG.ereader],
    strip: "published",
  },
  "book-cover-design": {
    content: cover as ServiceContent,
    title: "Book Cover Design Services",
    description: "Custom book cover design for print and eBook, built for your genre and ready for Amazon KDP and every major retailer.",
    banner: "/images/services/banner-cover-design.webp",
    label: "Book Cover Design",
    hero: [IMG.coverSet, IMG.coverStack],
    pics: [IMG.coverTablet, IMG.coverMock, IMG.coverGrid, IMG.coverGrid2, IMG.coverBooks, IMG.coverFlatlay],
    strip: "small",
  },
  "book-publishing-services": {
    content: publishing as ServiceContent,
    title: "Book Publishing Services",
    description: "Complete book publishing services: editing, cover design, formatting, ISBN help and worldwide distribution while you keep your rights.",
    banner: "/images/services/banner-publishing.webp",
    label: "Book Publishing",
    hero: [IMG.podium, IMG.publishers],
    pics: [IMG.libraryShelf, IMG.stack, IMG.distribution, IMG.openBook, IMG.books3],
    strip: "published",
  },
  "audiobook-publishing-services": {
    content: audiobook as ServiceContent,
    title: "Audiobook Publishing Services",
    description: "Professional audiobook narration, production and global distribution for your book.",
    banner: BANNER_FALLBACK,
    label: "Audiobook Publishing",
    hero: [IMG.audioPhone, IMG.audioProduction],
    pics: [IMG.audioStudio, IMG.audioBooks, IMG.audioDistribution, IMG.audioPlatforms, IMG.audioProduction],
    strip: "small",
  },
  "book-editing-services": {
    content: editing as ServiceContent,
    title: "Book Editing Services",
    description: "Developmental editing, line editing, copy editing and proofreading from professional book editors.",
    banner: "/images/services/banner-editing.webp",
    label: "Book Editing",
    hero: [IMG.editing, IMG.redPen],
    pics: [IMG.redPen, IMG.glasses, IMG.oldBooks, IMG.editing, IMG.openBook],
    strip: "cutouts",
  },
  "book-marketing-services": {
    content: marketing as ServiceContent,
    title: "Book Marketing Services",
    description: "Author branding, launch campaigns and book marketing that help you reach more readers and sell more books.",
    banner: "/images/services/banner-marketing.webp",
    label: "Book Marketing",
    hero: [IMG.billboard, IMG.socialMedia],
    pics: [IMG.publicity, IMG.launchEmail, IMG.amazonBest, IMG.bookstore, IMG.billboard],
    strip: "published",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES);
