import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://regex.shuttlelab.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const bilingualPaths = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const bilingual = bilingualPaths.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}/`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${baseUrl}${path}/`,
        zh: `${baseUrl}/zh${path}/`,
        "x-default": `${baseUrl}${path}/`,
      },
    },
  }));

  const toolPaths = [
    "/tools/regex-tester",
    "/tools/regex-explainer",
    "/tools/regex-cheat-sheet",
    "/tools/email-regex",
    "/tools/phone-regex",
    "/tools/url-regex",
  ];

  const tools = toolPaths.map((path) => ({
    url: `${baseUrl}${path}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...bilingual, ...tools];
}
