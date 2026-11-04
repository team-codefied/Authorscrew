/**
 * Visual assets reused from the live Authors Crew site (downloaded into /public/images/live).
 * Keys describe what the picture shows so sections can pick by purpose, not by file name.
 */
const L = (n: string) => `/images/live/${n}`;
/** Non-cover scenes (photos, illustrations, graphics) in public/images/scenes. */
const SC = (n: string) => `/images/scenes/${n}.webp`;

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
  team: { src: SC("team"), alt: "The Authors Crew team" },
  ghostwriter: { src: SC("ghostword"), alt: "A pen, glasses and manuscript spelling ghostwriter" },
  writer: { src: SC("woman"), alt: "A writer working on a laptop beside an open book" },
  bookstore: { src: SC("bookstore"), alt: "Readers browsing a bookstore" },
  billboard: { src: SC("meeting"), alt: "A team planning around a table" },
  launchEmail: { src: SC("email"), alt: "Book launch email on a laptop" },
  editing: { src: SC("hands"), alt: "Hands editing a printed page with a pencil" },
  redPen: { src: SC("redpen"), alt: "A manuscript being edited with a red pen" },
  glasses: { src: SC("glasses"), alt: "Reading glasses on an open book" },
  oldBooks: { src: SC("oldbooks"), alt: "Old leather-bound books" },
  ereader: { src: SC("ereader"), alt: "An e-reader beside a stack of books" },
  kindleScreen: { src: SC("kindle"), alt: "An eBook open on a Kindle" },
  ebookDevices: { src: SC("laptop"), alt: "Typing on a laptop" },
  ebookDesk: { src: SC("notebook"), alt: "A notebook and laptop on a desk" },
  ebookDesk2: { src: SC("handwrite"), alt: "Writing by hand with a pen" },
  ebookHand: { src: SC("typewriter"), alt: "A vintage typewriter" },
  audioPhone: { src: SC("phone"), alt: "A listener enjoying an audiobook on a phone" },
  audioBooks: { src: SC("headset"), alt: "Headphones resting on a laptop" },
  audioStudio: { src: SC("studio"), alt: "A recording microphone in a warm studio" },
  audioProduction: { src: SC("production"), alt: "Audio production with headphones and a laptop" },
  audioDistribution: { src: SC("distribution"), alt: "Audiobook distribution on Audible and ACX" },
  audioPlatforms: { src: SC("platforms"), alt: "Audiobook retailers and platforms" },
  faq: { src: SC("faq"), alt: "Frequently asked questions illustration" },
  kidsStories: { src: SC("kidsstories"), alt: "One character illustrated in many story styles" },
  kidsSteps: { src: SC("kidssteps"), alt: "Five easy steps to publish a children's book" },
  kidsBoy: { src: SC("kidsboy"), alt: "An illustrated boy reading a book" },
  kidsPanda: { src: SC("panda"), alt: "A cheerful illustrated panda" },
  kidsTable: { src: SC("kidsboy"), alt: "An illustrated boy reading a book" },
  kidsShelf: { src: SC("panda"), alt: "A cheerful illustrated panda" },
  kidsTrio: { src: SC("kidsstories"), alt: "One character illustrated in many story styles" },
  christianTrio: { src: SC("oldbooks"), alt: "Old leather-bound books" },
  christianBible: { src: SC("glasses"), alt: "Reading glasses on an open book" },
  miracleLife: { src: SC("handwrite"), alt: "Writing by hand with a pen" },
  podium: { src: SC("bookstore"), alt: "Readers browsing a bookstore" },
  stack: { src: SC("typewriter"), alt: "A vintage typewriter" },
  publishers: { src: SC("team"), alt: "The Authors Crew team" },
  books3: { src: SC("hands"), alt: "Hands editing a printed page with a pencil" },
  stackBig: { src: SC("meeting"), alt: "A team planning around a table" },
  globalAuthors: { src: SC("handwrite"), alt: "Writing by hand with a pen" },
  libraryShelf: { src: SC("oldbooks"), alt: "Old leather-bound books" },
  shelf: { src: SC("openbook"), alt: "A stack of printed pages" },
  rowAdventure: { src: SC("handwrite"), alt: "Writing by hand with a pen" },
  devices: { src: SC("ereader"), alt: "An e-reader beside a stack of books" },
  amazonBest: { src: SC("laptop"), alt: "Typing on a laptop" },
  publicity: { src: SC("email"), alt: "Book launch email on a laptop" },
  socialMedia: { src: SC("marketing"), alt: "A marketing plan on a laptop" },
  distribution: { src: SC("warehouse"), alt: "Books being packed and shipped" },
  openBook: { src: SC("openbook"), alt: "A stack of printed pages" },
  coverSet: { src: SC("design-palette"), alt: "A colour palette for a book design" },
  coverStack: { src: SC("design-type"), alt: "Typography samples for a book design" },
  coverMock: { src: SC("design-layout"), alt: "Layout wireframes for a book design" },
  coverBooks: { src: SC("notebook"), alt: "A notebook and laptop on a desk" },
  coverGrid: { src: SC("meeting"), alt: "A team planning around a table" },
  coverGrid2: { src: SC("typewriter"), alt: "A vintage typewriter" },
  coverFlat: { src: SC("design-layout"), alt: "Layout wireframes for a book design" },
  coverTablet: { src: SC("laptop"), alt: "Typing on a laptop" },
  coverFlatlay: { src: SC("handwrite"), alt: "Writing by hand with a pen" },
  ghostwriterWord: { src: SC("ghostword"), alt: "A pen, glasses and manuscript spelling ghostwriter" },
};

export type CarouselItem = { src: string; alt: string; flat?: boolean };

const flat = (src: string, alt: string): CarouselItem => ({ src, alt, flat: true });
const FLAT = {
  efimera: flat(L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.08-PM.webp"), "La Efímera by Thomas Mild"),
  papal: flat(L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.09-PM.webp"), "The Papal Bull"),
  kings: flat(L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.13-PM.webp"), "The Three Kings"),
  daisy: flat(L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.14-PM.webp"), "Moon Daisy"),
  single: flat(L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.15-PM.webp"), "Single or Spinster"),
  always: flat(L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.15-PM-1.webp"), "It Has Always Been You by Ana M. Mincov"),
  newOne: flat(L("2026_06_WhatsApp-Image-2026-05-04-at-11.56.16-PM.webp"), "New ONE Way by Jan B Lysgaard"),
  russian: flat(L("2026_06_a8.webp"), "A children's book cover"),
  fox: flat(L("2026_06_a9.webp"), "The Button Fox & Other Stories"),
  montego: flat(L("2026_06_a13.webp"), "Montego Bay"),
};

/** The one book-cover section each page shows (real Authors Crew covers only). */
export const CAROUSELS: Record<"default" | "kids" | "faith", CarouselItem[]> = {
  default: Object.values(COVERS),
  kids: [FLAT.fox, FLAT.russian, FLAT.montego, FLAT.daisy, FLAT.single, FLAT.efimera],
  faith: [FLAT.newOne, FLAT.always, COVERS.spirit, FLAT.papal, FLAT.kings, FLAT.daisy],
};

export const PROCESS_ICONS = {
  consult: L("2026_05_Weekly-interview.webp"),
  writing: L("2026_05_Writing-and-Draft.webp"),
  design: L("2026_05_Book-Cover-Design.webp"),
  publishing: L("2026_05_Publishing.webp"),
  marketing: L("2026_05_Feed-Back.webp"),
};
