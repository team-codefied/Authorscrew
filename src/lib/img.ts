/**
 * Visual assets reused from the live Authors Crew site (downloaded into /public/images/live).
 * Keys describe what the picture shows so sections can pick by purpose, not by file name.
 */
const L = (n: string) => `/images/live/${n}`;
/** Composites built only from real Authors Crew covers (see public/images/covers). */
const CV = (n: string) => `/images/covers/${n}.webp`;

/** Transparent 3D cut-out covers of real Authors Crew books, taken from the live homepage. */
export const COVERS = {
  thirdMom: { src: L("2026_06_B-1.webp"), alt: "The Third Biological Mom by Shani Roffeh" },
  worldCouldBe: { src: L("2026_06_B-2.webp"), alt: "The World That Could Be by Krzysztof Lukewski" },
  bookOfAdam: { src: L("2026_06_B-3.webp"), alt: "The Book of Adam by Constantin" },
  portuguese: { src: L("2026_06_B-4.webp"), alt: "Learn European Portuguese by Ana Baltazar" },
  boxing: { src: L("2026_06_B-5.webp"), alt: "Boxing Fundamentals by Allen Pevec" },
  lastFarewell: { src: L("2026_06_B-6.webp"), alt: "The Last Farewell by Gudmund Lindbaek" },
  mittLiv: { src: L("2026_06_B-7.webp"), alt: "Mitt liv uten uvenner by Gudmund Lindbaek" },
  spirit: { src: L("2026_06_13.webp"), alt: "It Will All Make Sense When You're Dead by Priscilla A. Keresey" },
  legends: { src: L("2026_06_14.webp"), alt: "Legends of the Soul by S.Q. Peake" },
};

export const IMG = {
  // Mockups and scenes
  shelf: { src: CV("shelf"), alt: "Authors Crew books on a shelf" },
  rowAdventure: { src: CV("row-adventure"), alt: "Three published Authors Crew books" },
  podium: { src: CV("shelf"), alt: "Authors Crew books on a shelf" },
  stack: { src: CV("row-five"), alt: "A row of published Authors Crew books" },
  publishers: { src: CV("fan-teal"), alt: "Published Authors Crew books" },
  team: { src: L("2026_06_3-5.webp"), alt: "The Authors Crew team" },
  ghostwriter: { src: L("2026_06_ChatGPT-Image-Jun-11-2026-07_45_27-PM-600x400-1.webp"), alt: "A ghostwriter's desk with pen and manuscript" },
  writer: { src: L("2026_06_authors-crew-ghost-writing-service-2.webp"), alt: "An author writing in a warm study" },
  books3: { src: CV("row-story"), alt: "Three published Authors Crew books" },
  devices: { src: CV("devices-ebook"), alt: "Authors Crew books on a tablet and phone" },
  libraryShelf: { src: CV("row-spirit"), alt: "Authors Crew books on a shelf" },
  openBook: { src: CV("fan-warm"), alt: "A fan of published Authors Crew books" },
  bookstore: { src: L("2026_06_3-4.webp"), alt: "Readers browsing a bookstore" },
  billboard: { src: L("2026_06_2-5.webp"), alt: "A book promoted on a city billboard" },
  socialMedia: { src: CV("grid-eight"), alt: "Authors Crew book covers" },
  publicity: { src: CV("grid-six"), alt: "Authors Crew book covers" },
  amazonBest: { src: CV("grid-ten"), alt: "Authors Crew book covers" },
  launchEmail: { src: L("2026_06_7-4.webp"), alt: "Book launch email on a laptop" },
  distribution: { src: CV("distribution"), alt: "An Authors Crew book on global retail stores" },
  editing: { src: L("2026_08_compressed_7346328b-0eac-4a81-8831-87aea7d8ce32.webp"), alt: "Professional book editing tools and books" },
  redPen: { src: L("2026_06_4-3.webp"), alt: "A manuscript being edited with a red pen" },
  glasses: { src: L("2026_06_6-3.webp"), alt: "Reading glasses on an open book" },
  oldBooks: { src: L("2026_08_compressed_81fbf0d5-1134-4084-b31b-319a9c35f454.webp"), alt: "Old leather-bound books" },
  ereader: { src: L("2026_06_8-1.webp"), alt: "An e-reader on a stack of books" },
  kindleScreen: { src: L("2026_06_7-3.webp"), alt: "An eBook open on a Kindle" },
  ebookDevices: { src: L("2026_06_authors-crew-ebook-writing-service1.webp"), alt: "eBooks displayed on tablets" },
  ebookDesk: { src: L("2026_06_authors-crew-ebook-writers-service-6.webp"), alt: "An eBook on a colourful desk" },
  ebookDesk2: { src: L("2026_06_authors-crew-ebook-writing-service-3.webp"), alt: "An eBook on a writer's desk" },
  ebookHand: { src: L("2026_06_authors-crew-ebook-writing-service-4.webp"), alt: "A reader holding an eBook" },
  audioPhone: { src: L("2026_06_2-3.webp"), alt: "A listener enjoying an audiobook on a phone" },
  audioBooks: { src: L("2026_06_5-3.webp"), alt: "Audiobook player beside printed books" },
  audioStudio: { src: L("2026_06_compressed_3-1.webp"), alt: "A podcast-style recording microphone" },
  audioProduction: { src: L("2026_06_compressed_5-1.webp"), alt: "Audio production with headphones and a laptop" },
  audioDistribution: { src: L("2026_06_compressed_1-1.webp"), alt: "Audiobook distribution on Audible and ACX" },
  audioPlatforms: { src: L("2026_06_9-1.webp"), alt: "Audiobook retailers and platforms" },
  coverFlatlay: { src: CV("devices-fox"), alt: "Book covers on a tablet and phone" },
  coverTablet: { src: CV("devices-fox"), alt: "A book cover on a tablet" },
  coverSet: { src: CV("fan-warm"), alt: "A set of designed book covers" },
  coverStack: { src: CV("grid-ten"), alt: "A selection of designed book covers" },
  coverMock: { src: CV("row-five"), alt: "Designed book covers" },
  coverBooks: { src: CV("row-spirit"), alt: "Designed hardcover books" },
  coverGrid: { src: CV("grid-eight"), alt: "Different book genres and cover designs" },
  coverGrid2: { src: CV("grid-six"), alt: "Different book genres and cover designs" },
  coverFlat: { src: CV("faith-pair"), alt: "Designed book covers" },
  kidsShelf: { src: CV("kids"), alt: "A trio of children's picture books" },
  kidsTable: { src: CV("kids-table"), alt: "Children's books side by side" },
  kidsStories: { src: L("2026_08_compressed_chatgpt_image_aug_7__2026__10_41_28_pm_1024.webp"), alt: "One character illustrated in many story styles" },
  kidsSteps: { src: L("2026_10_compressed_WhatsApp-Image-2026-10-02-at-10.19.26-PM.webp"), alt: "Five easy steps to publish a children's book" },
  kidsBoy: { src: L("2026_08_compressed_chatgpt_image_aug_7__2026__10_05_20_pm_1024-e1786122393733.webp"), alt: "An illustrated boy reading a book" },
  kidsPanda: { src: L("2026_08_9.webp"), alt: "A cheerful illustrated panda" },
  kidsTrio: { src: L("2026_06_ChatGPT-Image-May-20-2026-07_09_44-PM-768x512-1.webp"), alt: "Three illustrated children's books" },
  christianTrio: { src: CV("faith"), alt: "Spiritual and inspirational books" },
  christianBible: { src: CV("faith-pair"), alt: "Inspirational books" },
  miracleLife: { src: L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.16-PM.webp"), alt: "Your invitation to New ONE Way book cover" },
  faq: { src: L("2026_06_faq.webp"), alt: "Frequently asked questions illustration" },
  globalAuthors: { src: CV("grid-ten"), alt: "Authors Crew book covers" },
  stackBig: { src: CV("row-adventure"), alt: "Three published Authors Crew books" },
  ghostwriterWord: { src: L("2026_06_ChatGPT-Image-Jun-11-2026-07_45_27-PM-600x400-1.webp"), alt: "A pen, glasses and manuscript spelling ghostwriter" },
};

/** Flat covers that carry their own background (for galleries and marquees). */
export const GALLERY = {
  published: [
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.08-PM.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.09-PM.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.13-PM.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.14-PM.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.15-PM.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.15-PM-1.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.16-PM.webp"),
    L("2026_06_a8.webp"),
    L("2026_06_a9.webp"),
    L("2026_06_a13.webp"),
  ],
  cutouts: Object.values(COVERS).map((c) => c.src),
  kids: [L("2026_06_a9.webp"), L("2026_06_a8.webp"), L("2026_06_a13.webp")],
  christian: [
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.16-PM.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.15-PM-1.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.14-PM.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.09-PM.webp"),
    L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.13-PM.webp"),
  ],
  smallCovers: ["B-1", "B-2", "B-3", "B-4", "B-5", "B-6", "B-7", "B-8"].map((n) => L(`2026_06_${n}.webp`)),
};

export const PROCESS_ICONS = {
  consult: L("2026_05_Weekly-interview.webp"),
  writing: L("2026_05_Writing-and-Draft.webp"),
  design: L("2026_05_Book-Cover-Design.webp"),
  publishing: L("2026_05_Publishing.webp"),
  marketing: L("2026_05_Feed-Back.webp"),
};
