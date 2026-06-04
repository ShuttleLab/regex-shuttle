import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Regex Shuttle | Free Online Regex Tester",
    short_name: "Regex Shuttle",
    description:
      "Test, explain, and learn regular expressions in your browser. Real-time matching, pattern library, substitution, and cheat sheet. 100% private.",
    start_url: "/",
    display: "standalone",
    background_color: "#f0fdf4",
    theme_color: "#16a34a",
    orientation: "any",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
