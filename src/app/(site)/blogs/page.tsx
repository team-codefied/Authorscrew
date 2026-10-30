import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { Container } from "@/components/ui";
import { getPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Expert insights, writing tips, publishing guidance and marketing strategies for aspiring and published authors.",
  alternates: { canonical: "/blogs" },
};

export default function Blogs() {
  const posts = getPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Authors Crew Blog",
    url: `${SITE.url}/blogs`,
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE.url}/blogs/${p.slug}`, datePublished: p.published })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate overflow-hidden bg-navy pt-36 pb-16 text-white sm:pt-44 sm:pb-24">
        <Image src="/images/services/blog-banner.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/75">
            <Link href="/" className="hover:underline">Home</Link> <span aria-hidden>/</span> Blogs
          </nav>
          <h1 className="font-serif text-4xl font-medium sm:text-5xl">Blogs</h1>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">Insights for Aspiring &amp; Published Authors</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Explore expert insights, writing tips, publishing guidance, and marketing strategies designed to help you grow as an author. From idea development to book promotion, our blog is built to support every stage of your publishing journey.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}><BlogCard post={p} /></li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
