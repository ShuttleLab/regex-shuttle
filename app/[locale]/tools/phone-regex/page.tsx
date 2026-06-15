import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import RegexTester from "@/components/regex-tester";
import {
  Phone,
  Globe,
  Code2,
  CheckCircle2,
  ChevronRight,
  Copy,
  BookOpen,
  AlertTriangle,
  Hash,
  Shield,
} from "lucide-react";
import Link from "next/link";

const BASE_URL = "https://regex.shuttlelab.org";
const PATH = "/tools/phone-regex";

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
      title: `${t("phoneRegex.title")} | Regex Shuttle`,
      description: t("phoneRegex.subtitle"),
      alternates: {
        canonical,
        languages: {
          en: `${BASE_URL}${PATH}`,
          zh: `${BASE_URL}/zh${PATH}`,
          "x-default": `${BASE_URL}${PATH}`,
        },
      },
      openGraph: {
        title: t("phoneRegex.title"),
        description: t("phoneRegex.subtitle"),
        url: canonical,
        siteName: "Regex Shuttle",
        type: "website",
        locale: "zh_CN",
        alternateLocale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: t("phoneRegex.title"),
        description: t("phoneRegex.subtitle"),
      },
    };
  }

  return {
    title:
      "Phone Number Regex — Match and Validate Phone Numbers | Regex Shuttle",
    description:
      "Get regex patterns for phone number validation. Match US, international, and custom phone number formats. Test phone regex patterns online with real-time matching.",
    keywords: [
      "phone number regex",
      "phone regex",
      "phone number validation regex",
      "regex phone number",
      "telephone regex",
      "phone number pattern",
      "validate phone number regex",
      "international phone regex",
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
      title: "Phone Number Regex — Match and Validate Phone Numbers",
      description:
        "Get regex patterns for phone number validation. Match US, international, and custom formats. Test online with real-time matching.",
      url: canonical,
      siteName: "Regex Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Phone Number Regex — Match and Validate Phone Numbers",
      description:
        "Get regex patterns for phone number validation. Test online, free, and private.",
    },
  };
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Validate Phone Numbers with Regex",
  description:
    "Step-by-step guide to using regular expressions for phone number validation.",
  step: [
    {
      "@type": "HowToStep",
      name: "Identify Your Phone Format",
      text: "Determine which phone number formats you need to support: US only, international, with or without country codes, with extensions, etc.",
    },
    {
      "@type": "HowToStep",
      name: "Choose a Regex Pattern",
      text: "Select a regex pattern that matches your target format. Use the US pattern for domestic applications or the international pattern for global users.",
    },
    {
      "@type": "HowToStep",
      name: "Test with Real Data",
      text: "Paste the pattern into the tester and test with actual phone numbers from your target format, including edge cases like extensions and formatting characters.",
    },
    {
      "@type": "HowToStep",
      name: "Handle Formatting Characters",
      text: "Decide whether your regex should match formatting characters (parentheses, dashes, spaces) or just digits. Adjust the pattern accordingly.",
    },
    {
      "@type": "HowToStep",
      name: "Implement with Normalization",
      text: "Copy the regex and consider normalizing phone numbers (stripping formatting) before validation for more reliable matching.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best regex pattern for phone numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best pattern depends on your needs. For US phone numbers: (\\\\+\\\\d{1,3}[- ]?)?\\\\(?\\\\d{3}\\\\)?[- ]?\\\\d{3}[- ]?\\\\d{4} matches formats like (555) 123-4567, +1-555-123-4567, and 5551234567. For international numbers, a more flexible pattern is needed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I validate international phone numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "International phone numbers vary widely in format. A flexible pattern like \\+?\\d{1,4}[-.\\s]?\\(?\\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9} can match many international formats. For strict validation, use a library like Google's libphonenumber.",
      },
    },
    {
      "@type": "Question",
      name: "Should phone regex match formatting characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your use case. If users enter phone numbers with formatting (parentheses, dashes, spaces), your regex should accept those characters. Consider normalizing the input by stripping non-digit characters before validation for more reliable matching.",
      },
    },
    {
      "@type": "Question",
      name: "Can regex validate phone number extensions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Add an optional extension group to your pattern: (ext|x|extension)\\s?\\d{1,5}. Combine it with the base phone pattern to match numbers like (555) 123-4567 ext 123.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between US and international phone regex?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "US phone regex is specific: it expects 10 digits, often with area code in parentheses and a dash separator. International regex must be more flexible to accommodate varying country codes, digit counts, and formatting conventions across different countries.",
      },
    },
    {
      "@type": "Question",
      name: "How do I handle phone numbers with country codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Make the country code optional with a group: (\\+\\d{1,3}[- ]?)?. This matches +1, +44, +86, etc. followed by an optional separator. The rest of the pattern handles the local number format.",
      },
    },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Phone Number Regex — Match and Validate Phone Numbers",
  description:
    "Learn how to validate phone numbers using regular expressions. Covers US formats, international numbers, extensions, and formatting variations.",
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
      item: `${BASE_URL}/tools/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Phone Regex",
      item: `${BASE_URL}${PATH}`,
    },
  ],
};

export default async function PhoneRegexPage({
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
              <Phone className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t("phoneRegex.title")}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("phoneRegex.subtitle")}
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
          <span className="text-foreground font-medium">Phone Regex</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Phone className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Phone Number Regex — Match and Validate Phone Numbers
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Everything you need to validate phone numbers with regular
            expressions. Patterns for US numbers, international formats, and
            custom layouts — with a free online tester.
          </p>
        </header>

        <section className="mb-8 rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Copy className="size-4" />
            US Phone Number Regex Pattern
          </h2>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-md font-mono text-sm break-all">
            <code>
              (\+\d{"{1,3}"}[- ]?)?\(?\d{"{3}"}\)?[- ]?\d{"{3}"}[- ]?\d{"{4}"}
            </code>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Matches US phone numbers with optional country code and various
            formatting: (555) 123-4567, +1-555-123-4567, 555.123.4567, and
            5551234567.
          </p>
        </section>

        <section className="mb-12">
          <RegexTester />
        </section>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="size-6" />
              How Phone Number Regex Works
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Phone number regex patterns need to handle multiple formatting
              conventions while still catching invalid input. The pattern is
              built from several optional and required groups:
            </p>
            <div className="space-y-3 mb-4">
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  (\+\d{"{1,3}"}[- ]?)?
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Country code (optional):</strong> Matches a + sign
                  followed by 1-3 digits and an optional separator (dash or
                  space). The entire group is optional with the ? quantifier.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  \(?\d{"{3}"}\)?
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Area code:</strong> Matches exactly 3 digits with
                  optional parentheses. The \( and \) escape the special
                  characters, and ? makes each optional.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  [- ]?\d{"{3}"}[- ]?\d{"{4}"}
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Phone number:</strong> Matches 3 digits, an optional
                  separator, then 4 digits. This handles the standard
                  XXX-XXXX format.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe className="size-6" />
              Phone Number Formats by Country
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Phone number formats vary significantly around the world. Here
              are regex patterns for common international formats:
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <span className="text-lg">🇺🇸</span> United States
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  (\+1[- ]?)?\(?\d{"{3}"}\)?[- ]?\d{"{3}"}[- ]?\d{"{4}"}
                </code>
                <p className="text-sm text-muted-foreground">
                  10 digits with optional +1 country code. Formats:
                  (555) 123-4567, +1-555-123-4567, 555.123.4567
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <span className="text-lg">🇬🇧</span> United Kingdom
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  (\+44[- ]?)?\d{"{4}"}[- ]?\d{"{6}"}
                </code>
                <p className="text-sm text-muted-foreground">
                  10 digits with optional +44 country code. Formats:
                  +44 20 7946 0958, 020 7946 0958
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <span className="text-lg">🌐</span> International (Generic)
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  \+?\d{"{1,4}"}[-.\s]?\(?\d{"{1,3}"}\)?[-.\s]?\d{"{1,4}"}[-.\s]?\d{"{1,9}"}
                </code>
                <p className="text-sm text-muted-foreground">
                  Flexible pattern that matches many international formats.
                  Good for general-purpose validation when you need to support
                  multiple countries.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Hash className="size-6" />
              Common Phone Number Patterns
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here are the most commonly needed phone regex patterns, ready to
              copy and use:
            </p>
            <div className="space-y-3">
              {[
                {
                  name: "US Phone (Flexible)",
                  pattern:
                    "(\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}",
                  desc: "Matches most US phone formats with optional country code",
                },
                {
                  name: "US Phone (Strict)",
                  pattern: "^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$",
                  desc: "Exactly 10 digits, no country code, common separators",
                },
                {
                  name: "International (with +)",
                  pattern: "^\\+\\d{1,3}\\d{4,14}$",
                  desc: "Country code starting with + followed by 4-14 digits",
                },
                {
                  name: "Phone with Extension",
                  pattern:
                    "(\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}(\\s?(ext|x|ext.)\\s?\\d{1,5})?",
                  desc: "US phone number with optional extension",
                },
                {
                  name: "Digits Only",
                  pattern: "^\\d{10,15}$",
                  desc: "Matches phone numbers that are 10-15 digits with no formatting",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                  </div>
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
              Phone Regex Edge Cases
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Phone number validation has many edge cases. Here&apos;s what to
              watch out for:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                {
                  case: "Formatting variations",
                  note: "Users may enter (555) 123-4567, 555-123-4567, 555.123.4567, or 5551234567",
                },
                {
                  case: "Country codes",
                  note: "+1 for US, +44 for UK, +86 for China — make them optional for domestic apps",
                },
                {
                  case: "Extensions",
                  note: "Some numbers include ext 123 or x456 at the end",
                },
                {
                  case: "Toll-free numbers",
                  note: "800, 888, 877, 866, 855, 844, 833 are US toll-free prefixes",
                },
                {
                  case: "Short codes",
                  note: "SMS short codes (like 12345) are only 5 digits",
                },
                {
                  case: "International prefixes",
                  note: "00 is the international dialing prefix in many countries (instead of +)",
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
              Best Practices for Phone Number Validation
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Normalize before validating</p>
                  <p className="text-sm text-muted-foreground">
                    Strip all non-digit characters (except leading +) before
                    applying regex. This handles different formatting
                    conventions automatically.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Be flexible with input format
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Accept multiple formats and normalize internally. Users
                    should be able to enter phone numbers however they&apos;re
                    comfortable.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Use regex for format, not existence
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Regex can verify a number looks valid but cannot confirm it
                    exists. For critical applications, use SMS or call
                    verification.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Consider using a specialized library
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For international phone validation, Google&apos;s
                    libphonenumber provides more accurate results than regex
                    alone.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="size-6" />
              Phone Regex in Code
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here&apos;s how to use phone number regex in popular programming
              languages:
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">JavaScript</h3>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono">
                  {`const phoneRegex = /^(\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}$/;
const isValid = phoneRegex.test("(555) 123-4567"); // true`}
                </pre>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">Python</h3>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono">
                  {`import re
phone_regex = r'^(\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}$'
is_valid = re.match(phone_regex, "+1-555-123-4567")`}
                </pre>
              </div>
            </div>
          </section>
        </article>

        <section className="mt-12 mb-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Test Your Phone Regex Now
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Use the tester above to verify your phone number regex with actual
            data. Free, instant, and private.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 font-medium"
            >
              <Phone className="size-4" />
              Open Regex Tester
            </Link>
            <Link
              href="/tools/email-regex"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border rounded-md hover:bg-accent font-medium"
            >
              <BookOpen className="size-4" />
              Email Regex Patterns
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
