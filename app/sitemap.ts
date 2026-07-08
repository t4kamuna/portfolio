import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://t4kamuna.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects", "/about", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
