import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-sync";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0fdf4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1f0a" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Regex Shuttle",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Test, explain, and learn regular expressions in your browser. Real-time matching, pattern library, substitution, and cheat sheet. 100% private.",
  url: "https://regex.shuttlelab.org",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://regex.shuttlelab.org"),
  title: "Regex Shuttle — Free Online Regex Tester, Explainer & Cheat Sheet",
  description:
    "Test, explain, and learn regular expressions in your browser. Real-time matching, pattern library, substitution, and cheat sheet. 100% private. Free forever.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Regex Shuttle — Free Online Regex Tester, Explainer & Cheat Sheet",
    description:
      "Test, explain, and learn regular expressions in your browser. 100% private. Free forever.",
    siteName: "Regex Shuttle",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regex Shuttle — Free Online Regex Tester, Explainer & Cheat Sheet",
    description:
      "Test, explain, and learn regular expressions in your browser. 100% private. Free forever.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Regex Shuttle",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          {children}
          <Toaster position="top-center" richColors closeButton duration={3000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
