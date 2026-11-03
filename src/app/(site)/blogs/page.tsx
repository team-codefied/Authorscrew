import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { PageHero } from "@/components/Decor";
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
      <PageHero
        title="Blogs"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
        eyebrow="Author insights"
        intro="Writing tips, publishing guidance and marketing strategies for every stage of your author journey."
      />

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
