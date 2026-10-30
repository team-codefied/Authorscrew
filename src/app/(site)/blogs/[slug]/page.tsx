import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { PageHero } from "@/components/Decor";
import { CoverCalculator } from "@/components/CoverCalculator";
import { Inline } from "@/components/Inline";
import { LeadForm } from "@/components/LeadForm";
import { Container } from "@/components/ui";
import { formatDate, getPost, getPostImage, getPosts, readingMinutes } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const img = getPostImage(post.slug);
  return {
    // The site template appends " | Authors Crew"; skip it when the title is already long.
    title: (post.seoTitle || post.title).length > 58 ? { absolute: post.seoTitle || post.title } : post.seoTitle || post.title,
    description: post.description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.description,
      url: `/blogs/${post.slug}`,
      publishedTime: post.published || undefined,
      modifiedTime: post.modified || undefined,
      images: [img ?? "/images/services/blog-banner.webp"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const img = getPostImage(post.slug);
  const related = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published || undefined,
    dateModified: post.modified || post.published || undefined,
    mainEntityOfPage: `${SITE.url}/blogs/${post.slug}`,
    image: img ? `${SITE.url}${img}` : undefined,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/images/logo.svg` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        title={post.title}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }, { label: "Article" }]}
        visual={img ? { src: img, alt: post.title, width: 800, height: 450 } : undefined}
      >
        <p className="mt-5 text-sm text-white/80">
          {post.published && <time dateTime={post.published}>{formatDate(post.published)}</time>}
          {post.published && " · "}
          {readingMinutes(post)} min read · By Authors Crew
        </p>
      </PageHero>

      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="text-[17px] leading-[1.8] text-slate-700">
            {post.blocks.map((b, i) => {
              switch (b.k) {
                case "h2":
                  return <h2 key={i} className="mt-12 mb-4 font-serif text-3xl leading-tight font-medium text-navy">{b.text}</h2>;
                case "h3":
                  return <h3 key={i} className="mt-8 mb-3 text-xl font-semibold text-navy">{b.text}</h3>;
                case "h4":
                  return <h4 key={i} className="mt-6 mb-2 font-semibold text-navy">{b.text}</h4>;
                case "quote":
                  return <blockquote key={i} className="my-6 border-l-4 border-teal bg-mist p-5 italic"><Inline text={b.text} /></blockquote>;
                case "ul":
                case "ol": {
                  const List = b.k;
                  return (
                    <List key={i} className={`my-5 grid gap-2 pl-6 ${b.k === "ul" ? "list-disc" : "list-decimal"} marker:text-teal`}>
                      {b.items.map((it, j) => (
                        <li key={j}><Inline text={it} /></li>
                      ))}
                    </List>
                  );
                }
                case "table": {
                  const [head, ...rows] = b.rows;
                  return (
                    <div key={i} className="my-8 overflow-x-auto rounded-xl ring-1 ring-slate-200">
                      <table className="w-full min-w-[32rem] text-left text-[15px]">
                        <thead className="bg-navy text-white">
                          <tr>{head.map((c, j) => <th key={j} scope="col" className="px-4 py-3 font-semibold"><Inline text={c.replace(/\*\*/g, "")} /></th>)}</tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {rows.map((r, j) => (
                            <tr key={j} className="odd:bg-white even:bg-mist">
                              {r.map((c, k) => <td key={k} className={`px-4 py-3 align-top ${k === 0 ? "font-medium text-navy" : ""}`}><Inline text={c} /></td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                case "calculator":
                  return <CoverCalculator key={i} />;
                default:
                  return <p key={i} className="my-5"><Inline text={b.text} /></p>;
              }
            })}
          </div>
        </Container>
      </article>

      <section className="bg-mist py-14 sm:py-16">
        <Container className="max-w-xl">
          <h2 className="mb-2 text-center font-serif text-3xl font-medium text-navy">Start Your Author Journey</h2>
          <p className="mb-6 text-center text-slate-600">Tell us about your book and a publishing consultant will get back to you within one business day.</p>
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <LeadForm variant="journey" submitLabel="Get Consultation" />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <h2 className="mb-8 text-center font-serif text-3xl font-medium text-navy">More From the Blog</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}><BlogCard post={p} /></li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
