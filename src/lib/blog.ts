import fs from "node:fs";
import path from "node:path";

export type BlogBlock =
  | { k: "p" | "h2" | "h3" | "h4" | "quote"; text: string }
  | { k: "ul" | "ol"; items: string[] }
  | { k: "table"; rows: string[][] }
  | { k: "calculator" };

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  published: string;
  modified: string;
  blocks: BlogBlock[];
};

const dir = path.join(process.cwd(), "src", "content", "blog");

/** Listing order from the live blog index (newest first). */
export function getPosts(): BlogPost[] {
  const index = JSON.parse(fs.readFileSync(path.join(dir, "index.json"), "utf8")) as { slug: string }[];
  return index.map(({ slug }) => getPost(slug)!);
}

export function getPost(slug: string): BlogPost | null {
  const file = path.join(dir, `${slug}.json`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  const post = JSON.parse(fs.readFileSync(file, "utf8")) as BlogPost;
  // A few live pages carry a placeholder meta description; fall back to the opening paragraph.
  if (post.description.length < 50) {
    const first = post.blocks.find((b) => b.k === "p" && b.text.replace(/\*\*/g, "").length >= 60);
    const text = first && "text" in first ? first.text.replace(/\*\*|_|\[([^\]]*)\]\([^)]*\)/g, "$1") : post.title;
    post.description = text.length > 155 ? `${text.slice(0, 152).replace(/\s+\S*$/, "")}...` : text;
  }
  return post;
}

/** Featured images live at public/images/blog/<slug>.<ext>; returns null until supplied. */
export function getPostImage(slug: string): string | null {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", "blog", `${slug}.${ext}`))) return `/images/blog/${slug}.${ext}`;
  }
  return null;
}

export const formatDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }) : "";

export function readingMinutes(post: BlogPost) {
  const words = post.blocks
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : "rows" in b ? b.rows.flat().join(" ") : ""))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
