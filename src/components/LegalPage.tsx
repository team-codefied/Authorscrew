import type { Metadata } from "next";
import Link from "next/link";
import privacy from "@/content/legal/privacy-policy.json";
import terms from "@/content/legal/terms-conditions.json";
import copyright from "@/content/legal/copyright-intellectual-property.json";
import { Inline } from "./Inline";
import { PageHero } from "./Decor";
import { Container } from "./ui";

type LegalBlock =
  | { k: "h2"; text: string }
  | { k: "h3"; text: string }
  | { k: "p"; text: string }
  | { k: "ul"; items: string[] }
  | { k: "ol"; items: string[] };
type LegalDoc = { blocks: LegalBlock[] };

export const LEGAL = {
  "privacy-policy": {
    heading: "Privacy Policy",
    description: "How Authors Crew collects, uses and protects your personal information.",
    doc: privacy as LegalDoc,
  },
  "terms-conditions": {
    heading: "Terms & Conditions",
    description: "The terms that govern your use of the Authors Crew website and publishing services.",
    doc: terms as LegalDoc,
  },
  "copyright-intellectual-property": {
    heading: "Copyright & Intellectual Property",
    description: "Copyright, trademark and intellectual property information for Authors Crew content and client work.",
    doc: copyright as LegalDoc,
  },
} as const;

export type LegalSlug = keyof typeof LEGAL;

export function legalMetadata(slug: LegalSlug): Metadata {
  const l = LEGAL[slug];
  return { title: l.heading, description: l.description, alternates: { canonical: `/${slug}` } };
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const { heading, doc } = LEGAL[slug];

  // Un-numbered h2s that follow numbered sections are sub-sections on the live pages.
  let seenNumbered = false;
  const blocks = doc.blocks.map((b) => {
    if (b.k === "h2") {
      if (/^\d+\./.test(b.text)) seenNumbered = true;
      else if (seenNumbered) return { ...b, k: "h3" as const };
    }
    return b;
  });
  const toc = blocks.filter((b): b is Extract<LegalBlock, { k: "h2" }> => b.k === "h2" && /^\d+\./.test(b.text));

  return (
    <>
      <PageHero title={heading} crumbs={[{ label: "Home", href: "/" }, { label: heading }]} eyebrow="Legal" />

      <section className="py-14 sm:py-18">
        <Container className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {toc.length > 4 && (
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-6 max-h-[80vh] overflow-y-auto rounded-xl bg-mist p-5 text-sm">
                <p className="mb-3 font-semibold text-navy">On this page</p>
                <ol className="grid gap-2">
                  {toc.map((t) => (
                    <li key={t.text}>
                      <a href={`#${slugify(t.text)}`} className="text-slate-600 hover:text-teal-dark">{t.text}</a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          )}
          <article className={`max-w-3xl leading-relaxed text-slate-700 ${toc.length > 4 ? "" : "lg:col-span-2"}`}>
            {blocks.map((b, i) => {
              switch (b.k) {
                case "h2":
                  return (
                    <h2 key={i} id={slugify(b.text)} className="mt-10 mb-3 scroll-mt-6 font-serif text-2xl font-medium text-navy first:mt-0">
                      {b.text}
                    </h2>
                  );
                case "h3":
                  return <h3 key={i} className="mt-6 mb-2 text-lg font-semibold text-navy">{b.text}</h3>;
                case "ul":
                case "ol": {
                  const List = b.k;
                  return (
                    <List key={i} className={`my-4 grid gap-2 pl-6 ${b.k === "ul" ? "list-disc" : "list-decimal"} marker:text-teal`}>
                      {b.items.map((it, j) => (
                        <li key={j}><Inline text={it} /></li>
                      ))}
                    </List>
                  );
                }
                default:
                  return <p key={i} className="my-4"><Inline text={b.text} /></p>;
              }
            })}
          </article>
        </Container>
      </section>
    </>
  );
}
