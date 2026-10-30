import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { SERVICES, SITE } from "@/lib/site";

const PATHS = [
  "",
  "/about-us",
  "/our-services",
  ...SERVICES.map((s) => `/${s.slug}`),
  "/blogs",
  ...getPosts().map((p) => `/blogs/${p.slug}`),
  "/contact-us",
  "/privacy-policy",
  "/terms-conditions",
  "/copyright-intellectual-property",
  "/book-cover-design-lp",
  "/book-publishing-services-lp1",
  "/book-publishing-services-lp2",
  "/childrens-book-publishing-illustration-lp",
  "/christian-book-publishing-lp",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date() }));
}
