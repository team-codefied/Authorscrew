import Image from "next/image";
import Link from "next/link";
import { formatDate, getPostImage, type BlogPost } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  const img = getPostImage(post.slug);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blogs/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-navy" tabIndex={-1} aria-hidden>
        {img ? (
          <Image src={img} alt="" width={800} height={450} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-navy to-teal-dark p-6 text-center font-serif text-lg leading-snug text-white/90">{post.title}</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {post.published && <time dateTime={post.published} className="text-xs font-semibold tracking-wide text-teal-dark uppercase">{formatDate(post.published)}</time>}
        <h3 className="mt-2 flex-1 font-serif text-xl leading-snug text-navy">
          <Link href={`/blogs/${post.slug}`} className="hover:text-teal-dark">{post.title}</Link>
        </h3>
        <Link href={`/blogs/${post.slug}`} className="mt-4 font-semibold text-teal-dark hover:underline">Read Article &rarr;</Link>
      </div>
    </article>
  );
}
