import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import RegexTester from "@/components/regex-tester";
import {
  Beaker,
  Zap,
  Shield,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Search,
  Code2,
  FileText,
} from "lucide-react";
import Link from "next/link";

const BASE_URL = "https://regex.shuttlelab.org";
const PATH = "/tools/regex-tester";

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
  const canonical = isDefault ? `${BASE_URL}${PATH}` : `${BASE_URL}/${locale}${PATH}`;

  if (locale === "zh") {
    const t = await getTranslations({ locale, namespace: "toolPages" });
    return {
      title: `${t("regexTester.title")} | Regex Shuttle`,
      description: t("regexTester.subtitle"),
      alternates: {
        canonical,
        languages: {
          en: `${BASE_URL}${PATH}`,
          zh: `${BASE_URL}/zh${PATH}`,
          "x-default": `${BASE_URL}${PATH}`,
        },
      },
      openGraph: {
        title: t("regexTester.title"),
        description: t("regexTester.subtitle"),
        url: canonical,
        siteName: "Regex Shuttle",
        type: "website",
        locale: "zh_CN",
        alternateLocale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: t("regexTester.title"),
        description: t("regexTester.subtitle"),
      },
    };
  }

  return {
    title: "Test Regex Online — Free Real-Time Regex Tester | Regex Shuttle",
    description:
      "Test regular expressions online with instant real-time matching. Free regex tester with highlight, capture groups, substitution, and pattern library. No sign-up required.",
    keywords: [
      "test regex online",
      "regex tester",
      "regular expression tester",
      "online regex tester",
      "regex debugger",
      "regex matcher",
      "test regular expression",
      "regex tool",
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
      title: "Test Regex Online — Free Real-Time Regex Tester",
      description:
        "Test regular expressions online with instant real-time matching. Highlight matches, view capture groups, and test substitution — all in your browser.",
      url: canonical,
      siteName: "Regex Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Test Regex Online — Free Real-Time Regex Tester",
      description:
        "Test regular expressions online with instant real-time matching. 100% private, no data uploaded.",
    },
  };
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Test a Regular Expression Online",
  description:
    "Step-by-step guide to testing regex patterns using Regex Shuttle's free online tester.",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter Your Regex Pattern",
      text: "Type or paste your regular expression into the pattern input field. Add flags like g (global), i (case-insensitive), or m (multiline) as needed.",
    },
    {
      "@type": "HowToStep",
      name: "Add Test String",
      text: "Enter or paste the text you want to test your regex against in the test string area.",
    },
    {
      "@type": "HowToStep",
      name: "View Matches",
      text: "See all matches highlighted in real time. Each match shows its position, length, and captured groups.",
    },
    {
      "@type": "HowToStep",
      name: "Test Substitution",
      text: "Optionally enter a replacement pattern to preview find-and-replace results with capture group references.",
    },
    {
      "@type": "HowToStep",
      name: "Copy and Use",
      text: "Copy the final regex pattern with flags to use in your code, application, or command-line tool.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I test a regex online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your regex pattern into the tester, enter your test string, and see matches highlighted instantly. Regex Shuttle processes everything in your browser with no data uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Is this regex tester free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Regex Shuttle is completely free with no sign-up required. You can test unlimited regex patterns with real-time matching, capture groups, and substitution.",
      },
    },
    {
      "@type": "Question",
      name: "What regex flags are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Regex Shuttle supports all standard JavaScript RegExp flags: g (global matching), i (case-insensitive), m (multiline), s (dotAll), and u (Unicode). Toggle them individually with checkboxes.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data safe when testing regex?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All regex testing happens locally in your browser using JavaScript's built-in RegExp engine. No patterns, test strings, or match results are ever uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I test regex substitution and replacement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Regex Shuttle includes a substitution panel where you can enter a replacement pattern with capture group references like $1, $2 and preview the result in real time.",
      },
    },
    {
      "@type": "Question",
      name: "Does the regex tester support capture groups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All capturing groups are displayed for each match, including numbered groups and named groups. You can see the full match and each group's value and position.",
      },
    },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Test Regex Online — Free Real-Time Regex Tester",
  description:
    "Learn how to test regular expressions online with a free, real-time regex tester. Covers pattern syntax, flags, capture groups, and substitution.",
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
  proficiencyLevel: "Beginner",
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
      name: "Regex Tester",
      item: `${BASE_URL}${PATH}`,
    },
  ],
};

export default async function RegexTesterPage({
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
              <Beaker className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t("regexTester.title")}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("regexTester.subtitle")}
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
          <span className="text-foreground font-medium">Regex Tester</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Beaker className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Test Regex Online — Free Real-Time Regex Tester
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Test any regular expression with instant real-time matching. See
            matches highlighted, view capture groups, and test substitution — all
            directly in your browser with zero data uploads.
          </p>
        </header>

        <section className="mb-12">
          <RegexTester />
        </section>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Search className="size-6" />
              Why Use an Online Regex Tester?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Regular expressions are one of the most powerful tools in a
              developer&apos;s toolkit, but writing them correctly can be
              challenging. A single misplaced character or forgotten escape
              sequence can cause your pattern to match nothing — or worse, match
              the wrong things. An online regex tester eliminates the guesswork
              by showing you exactly what your pattern matches in real time.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Instead of running your code, feeding in test data, and checking
              logs, you can paste your regex and test string into a browser-based
              tool and see results instantly. This tight feedback loop
              dramatically speeds up pattern development and debugging. Whether
              you&apos;re validating user input, parsing log files, or extracting
              data from text, a regex tester helps you iterate faster and catch
              errors before they reach production.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Regex Shuttle&apos;s online tester goes beyond simple matching. It
              highlights every match in your test string, shows you the exact
              index positions, displays all capture groups with their values, and
              even lets you test substitution patterns. All processing happens
              locally in your browser — your data never leaves your device.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="size-6" />
              Key Features of the Regex Shuttle Tester
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: Zap,
                  title: "Real-Time Matching",
                  desc: "See matches highlighted as you type. Results update instantly with a 150ms debounce for smooth performance, even with complex patterns.",
                },
                {
                  icon: Code2,
                  title: "Capture Group Support",
                  desc: "View all numbered and named capture groups for each match. See exactly which parts of your text each group captures.",
                },
                {
                  icon: FileText,
                  title: "Substitution Preview",
                  desc: "Test find-and-replace patterns with capture group references like $1 and $2. Preview replacement results in real time.",
                },
                {
                  icon: Shield,
                  title: "100% Private",
                  desc: "All regex execution uses JavaScript's built-in RegExp engine. No data is uploaded, stored, or shared with any third party.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="size-4 text-primary" />
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="size-6" />
              How to Test a Regular Expression Online
            </h2>
            <ol className="space-y-4 mb-6">
              {[
                {
                  step: "Enter your regex pattern",
                  desc: "Type or paste your regular expression into the pattern input field. You can use any valid JavaScript regex syntax including character classes, quantifiers, anchors, and groups.",
                },
                {
                  step: "Set your flags",
                  desc: "Toggle regex flags using the checkboxes: g for global matching (find all matches), i for case-insensitive matching, m for multiline mode, s for dotAll (dot matches newlines), and u for Unicode support.",
                },
                {
                  step: "Add your test string",
                  desc: "Paste or type the text you want to test against your regex. This can be any string — log entries, user input, CSV data, HTML, or any other text.",
                },
                {
                  step: "Review the matches",
                  desc: "See all matches highlighted in your test string. Each match shows its full text, start index, length, and any captured groups.",
                },
                {
                  step: "Test substitution (optional)",
                  desc: "Enter a replacement pattern in the substitution field to preview find-and-replace results. Use $1, $2, etc. to reference capture groups.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{item.step}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Common Regex Patterns to Test
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here are some frequently used regular expressions you can test
              right now. Click any pattern to load it into the tester above:
            </p>
            <div className="space-y-3">
              {[
                {
                  name: "Email Address",
                  pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
                  desc: "Matches standard email addresses like user@example.com",
                },
                {
                  name: "URL (HTTP/HTTPS)",
                  pattern: "https?:\\/\\/[^\\s]+",
                  desc: "Matches HTTP and HTTPS URLs",
                },
                {
                  name: "US Phone Number",
                  pattern: "(\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}",
                  desc: "Matches US phone numbers with optional country code",
                },
                {
                  name: "Date (YYYY-MM-DD)",
                  pattern: "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])",
                  desc: "Matches dates in ISO format",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">
                      {item.pattern}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Understanding Regex Flags
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Regex flags modify how a pattern is interpreted and matched. The
              right flag combination is essential for getting the results you
              expect. Here&apos;s what each flag does:
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong>g (Global):</strong>{" "}
                  <span className="text-muted-foreground">
                    Finds all matches instead of stopping at the first one. Essential
                    when you need to process every occurrence in your text.
                  </span>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong>i (Case-Insensitive):</strong>{" "}
                  <span className="text-muted-foreground">
                    Makes your pattern match both uppercase and lowercase letters.
                    &quot;hello&quot; would also match &quot;Hello&quot;, &quot;HELLO&quot;, etc.
                  </span>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong>m (Multiline):</strong>{" "}
                  <span className="text-muted-foreground">
                    Changes ^ and $ to match the start and end of each line instead
                    of the entire string. Useful for multi-line text processing.
                  </span>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong>s (DotAll):</strong>{" "}
                  <span className="text-muted-foreground">
                    Makes the dot (.) character match newline characters as well.
                    Without this flag, dot stops at line breaks.
                  </span>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong>u (Unicode):</strong>{" "}
                  <span className="text-muted-foreground">
                    Enables full Unicode matching support. Required for Unicode
                    property escapes and proper handling of surrogate pairs.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Why Regex Shuttle is the Best Online Regex Tester
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unlike other online regex testers that require account creation,
              display ads, or upload your data to external servers, Regex Shuttle
              processes everything locally in your browser. Your patterns and test
              strings never leave your device, making it safe to test sensitive
              data like log entries, user credentials, or proprietary text.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The tester uses JavaScript&apos;s native RegExp engine, which means
              the results you see are exactly what you&apos;ll get in your Node.js
              or browser code. No surprises, no differences between the tester and
              your production environment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With features like real-time matching, capture group visualization,
              substitution preview, and a built-in pattern library, Regex Shuttle
              provides everything you need to write, test, and debug regular
              expressions — all for free, with no sign-up required.
            </p>
          </section>
        </article>

        <section className="mt-12 mb-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Test Your Regex?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Start testing regular expressions right now — no sign-up, no
            downloads, no data uploads. Just paste and match.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 font-medium"
            >
              <Beaker className="size-4" />
              Test Your Regex Now
            </Link>
            <Link
              href="/tools/regex-explainer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border rounded-md hover:bg-accent font-medium"
            >
              <BookOpen className="size-4" />
              Try Regex Explainer
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
