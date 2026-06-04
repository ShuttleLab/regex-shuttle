import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import RegexTester from "@/components/regex-tester";
import {
  Link2,
  Globe,
  Code2,
  CheckCircle2,
  ChevronRight,
  Copy,
  BookOpen,
  AlertTriangle,
  Shield,
  FileText,
  Layers,
} from "lucide-react";
import Link from "next/link";

const BASE_URL = "https://regex.shuttlelab.org";
const PATH = "/tools/url-regex";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDefault = locale === routing.defaultLocale;
  const canonical = isDefault
    ? `${BASE_URL}${PATH}`
    : `${BASE_URL}/${locale}${PATH}`;

  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages" });
    return {
      title: `${t("urlRegex.title")} | Regex Shuttle`,
      description: t("urlRegex.subtitle"),
      alternates: {
        canonical,
        languages: {
          en: `${BASE_URL}${PATH}`,
          zh: `${BASE_URL}/zh${PATH}`,
          "x-default": `${BASE_URL}${PATH}`,
        },
      },
      openGraph: {
        title: t("urlRegex.title"),
        description: t("urlRegex.subtitle"),
        url: canonical,
        siteName: "Regex Shuttle",
        type: "website",
        locale: "zh_CN",
        alternateLocale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: t("urlRegex.title"),
        description: t("urlRegex.subtitle"),
      },
    };
  }

  return {
    title:
      "URL Regex Pattern — Match and Validate URLs with Regular Expressions | Regex Shuttle",
    description:
      "Get regex patterns for URL validation and extraction. Match HTTP, HTTPS, and custom URL formats. Test URL regex patterns online with real-time matching.",
    keywords: [
      "URL regex pattern",
      "URL regex",
      "URL validation regex",
      "regex URL",
      "match URL regex",
      "URL regular expression",
      "validate URL regex",
      "extract URLs regex",
    ],
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}${PATH}`,
        zh: `${BASE_URL}/zh${PATH}`,
        "x-default": `${BASE_URL}${PATH}`,
      },
    },
    openGraph: {
      title:
        "URL Regex Pattern — Match and Validate URLs with Regular Expressions",
      description:
        "Get regex patterns for URL validation and extraction. Match HTTP, HTTPS, and custom formats. Test online with real-time matching.",
      url: canonical,
      siteName: "Regex Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "URL Regex Pattern — Match and Validate URLs with Regular Expressions",
      description:
        "Get regex patterns for URL validation and extraction. Test online, free, and private.",
    },
  };
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Validate URLs with Regex",
  description:
    "Step-by-step guide to using regular expressions for URL validation and extraction.",
  step: [
    {
      "@type": "HowToStep",
      name: "Choose Your URL Pattern",
      text: "Select a URL regex pattern based on your needs. Use the simple pattern for basic URL detection or the strict pattern for form validation.",
    },
    {
      "@type": "HowToStep",
      name: "Test with Sample URLs",
      text: "Paste the regex into the tester and test with valid URLs (https://example.com/path?q=1) and invalid inputs to verify it works correctly.",
    },
    {
      "@type": "HowToStep",
      name: "Check Protocol Requirements",
      text: "Decide whether your regex should require http/https protocol or accept URLs without it. Adjust the pattern accordingly.",
    },
    {
      "@type": "HowToStep",
      name: "Test Edge Cases",
      text: "Test with URLs containing ports, fragments, query strings, and special characters to ensure your pattern handles all valid URLs.",
    },
    {
      "@type": "HowToStep",
      name: "Copy and Implement",
      text: "Copy the regex pattern and integrate it into your application. Consider whether you need to extract URLs from text or validate user input.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best regex pattern for URLs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most commonly used URL regex is https?:\\/\\/[^\\s]+ which matches HTTP and HTTPS URLs. For stricter validation, use a pattern that checks for valid domain structure, optional port, path, query string, and fragment.",
      },
    },
    {
      "@type": "Question",
      name: "How do I match URLs without the http:// prefix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use (https?:\\/\\/)? to make the protocol optional. The pattern (https?:\\/\\/)?www\\.[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(\\/[^\\s]*)? matches URLs with or without http:// or https://.",
      },
    },
    {
      "@type": "Question",
      name: "Can regex validate URL structure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A comprehensive URL regex can check for valid protocol, domain, port, path, query parameters, and fragment identifiers. However, for strict RFC 3986 compliance, consider using a dedicated URL parsing library.",
      },
    },
    {
      "@type": "Question",
      name: "How do I extract URLs from text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a regex like https?:\\/\\/[^\\s]+ with the global flag (g) to find all URLs in a text. This matches http and https URLs until it hits a whitespace character.",
      },
    },
    {
      "@type": "Question",
      name: "Does URL regex support query parameters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Add (\\?[a-zA-Z0-9._~:/?#\\[\\]@!$&'()*+,;=-]*)? to match query strings starting with ?. This handles parameters like ?key=value&other=123.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between URL matching and URL validation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "URL matching finds URLs in text (extracting them). URL validation checks if a string is a properly formatted URL. Matching patterns are more permissive; validation patterns are stricter and often use anchors (^ and $).",
      },
    },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "URL Regex Pattern — Match and Validate URLs with Regular Expressions",
  description:
    "Learn how to match and validate URLs using regular expressions. Covers HTTP/HTTPS, paths, query strings, fragments, and extraction from text.",
  author: {
    "@type": "Organization",
    name: "ShuttleLab",
    url: "https://shuttlelab.org",
  },
  publisher: {
    "@type": "Organization",
    name: "ShuttleLab",
  },
  datePublished: "2026-01-01",
  dateModified: "2026-06-01",
  proficiencyLevel: "Intermediate",
  dependencies: "Web browser with JavaScript enabled",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: `${BASE_URL}/tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "URL Regex",
      item: `${BASE_URL}${PATH}`,
    },
  ],
};

export default async function UrlRegexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages" });
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Link2 className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t("urlRegex.title")}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("urlRegex.subtitle")}
          </p>
        </header>

        <section className="mb-12">
          <RegexTester />
        </section>

        <p className="text-sm text-muted-foreground">
          <a href={PATH} className="hover:text-foreground underline underline-offset-4">
            {t("viewFullGuide")}
          </a>
        </p>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-muted-foreground/70">Tools</span>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium">URL Regex</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Link2 className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              URL Regex Pattern — Match and Validate URLs with Regular
              Expressions
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            The definitive guide to URL validation with regex. Get patterns for
            matching HTTP/HTTPS URLs, extracting links from text, and validating
            user-submitted URLs.
          </p>
        </header>

        <section className="mb-8 rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Copy className="size-4" />
            Standard URL Regex Pattern
          </h2>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-md font-mono text-sm break-all">
            <code>https?:\/\/[^\s]+</code>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Matches HTTP and HTTPS URLs. Captures everything after the protocol
            until the next whitespace character. Works for most URL extraction
            tasks.
          </p>
        </section>

        <section className="mb-12">
          <RegexTester />
        </section>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="size-6" />
              How URL Regex Works
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A URL has several distinct parts, and a comprehensive regex
              pattern can validate each one. Understanding URL structure helps
              you write better patterns:
            </p>
            <div className="space-y-3 mb-4">
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  https?
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Protocol:</strong> Matches http or https. The{" "}
                  <code className="bg-muted px-1 rounded">?</code> makes the{" "}
                  <code className="bg-muted px-1 rounded">s</code> optional,
                  so both protocols are matched.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  :\/\/
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Protocol separator:</strong> The literal{" "}
                  <code className="bg-muted px-1 rounded">://</code>. The
                  backslashes escape the forward slashes since{" "}
                  <code className="bg-muted px-1 rounded">/</code> is a regex
                  delimiter in some languages.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  [^\s]+
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>URL body:</strong> Matches one or more non-whitespace
                  characters. This captures the domain, path, query string,
                  and fragment — everything until a space or newline.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="size-6" />
              URL Regex Patterns Compared
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Different use cases require different levels of URL validation.
              Here are patterns ranging from simple to comprehensive:
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  Simple — URL Extraction
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  https?:\/\/[^\s]+
                </code>
                <p className="text-sm text-muted-foreground">
                  Quick extraction: finds all http/https URLs in text. Use the
                  global flag (g) to match all occurrences. Good for parsing
                  logs, messages, or documents.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  Standard — Basic Validation
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"}(\/[^\s]*)?
                </code>
                <p className="text-sm text-muted-foreground">
                  Validates protocol, optional www, domain with TLD, and
                  optional path. Good balance of strictness and flexibility for
                  most web applications.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  Strict — Full URL Validation
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  ^https?:\/\/(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{"{2,}"}(:\d{"{1,5}"})?(\/[^\s?#]*)?(\?[^\s#]*)?(#\S*)?$
                </code>
                <p className="text-sm text-muted-foreground">
                  Comprehensive validation with port, path, query string, and
                  fragment support. Enforces domain label rules and uses
                  anchors for full-string matching.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="size-6" />
              Anatomy of a URL
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Understanding URL structure helps you write better regex patterns.
              Here&apos;s a breakdown of a complete URL:
            </p>
            <div className="rounded-lg border bg-card p-4 font-mono text-sm mb-4">
              <p className="break-all">
                <span className="text-blue-500">https</span>
                <span className="text-muted-foreground">://</span>
                <span className="text-green-500">www.example.com</span>
                <span className="text-orange-500">:443</span>
                <span className="text-purple-500">/path/to/page</span>
                <span className="text-red-500">?key=value&amp;foo=bar</span>
                <span className="text-yellow-500">#section</span>
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm text-blue-500 mb-1">
                  Protocol
                </p>
                <p className="text-xs text-muted-foreground">
                  https — identifies the communication protocol
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm text-green-500 mb-1">
                  Domain
                </p>
                <p className="text-xs text-muted-foreground">
                  www.example.com — the hostname
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm text-orange-500 mb-1">
                  Port
                </p>
                <p className="text-xs text-muted-foreground">
                  :443 — optional port number (default: 80 for HTTP, 443 for
                  HTTPS)
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm text-purple-500 mb-1">
                  Path
                </p>
                <p className="text-xs text-muted-foreground">
                  /path/to/page — the resource location on the server
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm text-red-500 mb-1">
                  Query String
                </p>
                <p className="text-xs text-muted-foreground">
                  ?key=value&amp;foo=bar — parameters passed to the server
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm text-yellow-500 mb-1">
                  Fragment
                </p>
                <p className="text-xs text-muted-foreground">
                  #section — client-side anchor, not sent to server
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe className="size-6" />
              Common URL Regex Patterns
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here are ready-to-use URL regex patterns for common scenarios:
            </p>
            <div className="space-y-3">
              {[
                {
                  name: "HTTP/HTTPS URLs",
                  pattern: "https?:\\/\\/[^\\s]+",
                  desc: "Matches any HTTP or HTTPS URL — the most common extraction pattern",
                },
                {
                  name: "URLs with www",
                  pattern:
                    "(https?:\\/\\/)?www\\.[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(\\/[^\\s]*)?",
                  desc: "Matches URLs with optional protocol and required www prefix",
                },
                {
                  name: "Domain Only",
                  pattern:
                    "[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\\b(\\/[^\\s]*)?",
                  desc: "Matches domains with optional path, no protocol required",
                },
                {
                  name: "URL with Port",
                  pattern:
                    "https?:\\/\\/[a-zA-Z0-9.-]+:\\d{1,5}(\\/[^\\s]*)?",
                  desc: "Matches URLs that include a port number like :8080",
                },
                {
                  name: "URL with Query String",
                  pattern:
                    "https?:\\/\\/[^\\s?]+\\?[a-zA-Z0-9._~:/?#\\[\\]@!$&'()*+,;=-]+",
                  desc: "Matches URLs that include query parameters",
                },
                {
                  name: "Image URLs",
                  pattern:
                    "https?:\\/\\/[^\\s]+\\.(jpg|jpeg|png|gif|webp|svg)(\\?[^\\s]*)?",
                  desc: "Matches URLs pointing to image files",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                  <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                    {item.pattern}
                  </code>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="size-6" />
              URL Regex Edge Cases
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              URLs can be tricky to match correctly. Here are edge cases to
              consider:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                {
                  case: "URLs with authentication",
                  note: "https://user:pass@example.com — contains @ in the authority section",
                },
                {
                  case: "IP address URLs",
                  note: "http://192.168.1.1:8080/path — uses IP instead of domain name",
                },
                {
                  case: "URLs with fragments",
                  note: "https://example.com/page#section — hash fragments at the end",
                },
                {
                  case: "Encoded characters",
                  note: "https://example.com/path%20with%20spaces — percent-encoded characters",
                },
                {
                  case: "URLs ending with punctuation",
                  note: "Visit https://example.com. — period at end of sentence may be captured",
                },
                {
                  case: "Non-HTTP protocols",
                  note: "ftp://, file://, mailto: — other protocols need different patterns",
                },
              ].map((item) => (
                <div
                  key={item.case}
                  className="rounded-lg border bg-card p-3"
                >
                  <p className="font-medium text-sm mb-1">{item.case}</p>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="size-6" />
              Best Practices for URL Validation
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Choose the right pattern for your use case
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Use simple patterns for extraction and strict patterns for
                    validation. Don&apos;t over-validate if you just need to
                    find URLs in text.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Consider using URL parsing APIs
                  </p>
                  <p className="text-sm text-muted-foreground">
                    JavaScript&apos;s{" "}
                    <code className="bg-muted px-1 rounded">new URL()</code>{" "}
                    constructor provides robust URL parsing with built-in
                    validation. Use regex for extraction, URL APIs for parsing.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Handle trailing punctuation carefully
                  </p>
                  <p className="text-sm text-muted-foreground">
                    When extracting URLs from prose, periods, commas, and
                    parentheses at the end of a URL are usually not part of the
                    URL. Adjust your pattern or post-process matches.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Test with real-world URLs
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Test your pattern with URLs from your actual data — including
                    long paths, query strings, and special characters that your
                    users might submit.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="size-6" />
              URL Regex in Code
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here&apos;s how to use URL regex in popular programming languages:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  JavaScript — Extract URLs from text
                </h3>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono">
                  {`const text = "Visit https://example.com and http://test.org/path?q=1";
const urlRegex = /https?:\\/\\/[^\\s]+/g;
const urls = text.match(urlRegex);
// ["https://example.com", "http://test.org/path?q=1"]`}
                </pre>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  JavaScript — Validate a URL
                </h3>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono">
                  {`const urlRegex = /^https?:\\/\\/[^\\s]+$/;
const isValid = urlRegex.test("https://example.com/path"); // true
const isInvalid = urlRegex.test("not a url"); // false`}
                </pre>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  JavaScript — Using URL API (recommended for parsing)
                </h3>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono">
                  {`try {
  const url = new URL("https://example.com:8080/path?q=1#hash");
  console.log(url.hostname); // "example.com"
  console.log(url.port);     // "8080"
  console.log(url.pathname); // "/path"
} catch {
  console.log("Invalid URL");
}`}
                </pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              When to Use Regex vs. URL APIs
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2 text-primary">
                  Use Regex When:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Extracting URLs from text content</li>
                  <li>• Quick format validation in forms</li>
                  <li>• Finding links in log files</li>
                  <li>• Pattern matching in strings</li>
                  <li>• Working without URL parsing APIs</li>
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2 text-primary">
                  Use URL APIs When:
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Parsing URL components</li>
                  <li>• Modifying query parameters</li>
                  <li>• Building URLs programmatically</li>
                  <li>• Strict RFC-compliant validation</li>
                  <li>• Working with relative URLs</li>
                </ul>
              </div>
            </div>
          </section>
        </article>

        <section className="mt-12 mb-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Test Your URL Regex Now
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Use the tester above to verify your URL regex with actual data.
            Extract, validate, and debug — all in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 font-medium"
            >
              <Link2 className="size-4" />
              Open Regex Tester
            </Link>
            <Link
              href="/tools/regex-explainer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border rounded-md hover:bg-accent font-medium"
            >
              <BookOpen className="size-4" />
              Explain URL Pattern
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
