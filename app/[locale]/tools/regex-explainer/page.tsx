import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import RegexExplainer from "@/components/regex-explainer";
import {
  BookOpen,
  Lightbulb,
  Code2,
  Layers,
  ChevronRight,
  HelpCircle,
  GraduationCap,
  Braces,
  Eye,
} from "lucide-react";
import Link from "next/link";

const BASE_URL = "https://regex.shuttlelab.org";
const PATH = "/tools/regex-explainer";

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
      title: `${t("regexExplainer.title")} | Regex Shuttle`,
      description: t("regexExplainer.subtitle"),
      alternates: {
        canonical,
        languages: {
          en: `${BASE_URL}${PATH}`,
          zh: `${BASE_URL}/zh${PATH}`,
          "x-default": `${BASE_URL}${PATH}`,
        },
      },
      openGraph: {
        title: t("regexExplainer.title"),
        description: t("regexExplainer.subtitle"),
        url: canonical,
        siteName: "Regex Shuttle",
        type: "website",
        locale: "zh_CN",
        alternateLocale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: t("regexExplainer.title"),
        description: t("regexExplainer.subtitle"),
      },
    };
  }

  return {
    title:
      "Regex Explainer Online — Understand Any Regular Expression | Regex Shuttle",
    description:
      "Get plain English explanations of any regular expression. Paste a regex pattern and see a token-by-token breakdown with meanings. Free, instant, and private.",
    keywords: [
      "regex explainer online",
      "regex explainer",
      "regular expression explainer",
      "regex decoder",
      "understand regex",
      "regex translator",
      "regex parser",
      "explain regex",
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
      title: "Regex Explainer Online — Understand Any Regular Expression",
      description:
        "Paste any regex pattern and get a plain English explanation. Token-by-token breakdown with meanings. Free and private.",
      url: canonical,
      siteName: "Regex Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Regex Explainer Online — Understand Any Regular Expression",
      description:
        "Paste any regex pattern and get a plain English explanation. Free, instant, and private.",
    },
  };
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Understand a Regular Expression",
  description:
    "Step-by-step guide to understanding any regex pattern using Regex Shuttle's free online explainer.",
  step: [
    {
      "@type": "HowToStep",
      name: "Find the Regex Pattern",
      text: "Copy the regular expression you want to understand from your code, documentation, or any online source.",
    },
    {
      "@type": "HowToStep",
      name: "Paste into the Explainer",
      text: "Paste the regex pattern into the input field. The explainer works with any valid JavaScript regular expression.",
    },
    {
      "@type": "HowToStep",
      name: "Read the Token Breakdown",
      text: "View a table showing each token in the regex with its plain English meaning. Characters, quantifiers, anchors, and groups are all explained.",
    },
    {
      "@type": "HowToStep",
      name: "Review the Summary",
      text: "Read the overall summary that describes what the entire pattern matches in simple terms.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a regex explainer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A regex explainer is a tool that takes a regular expression pattern and breaks it down into plain English explanations. It shows what each part of the pattern does, making complex regex readable even for beginners.",
      },
    },
    {
      "@type": "Question",
      name: "How does the regex explainer work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The explainer parses the regex pattern token by token. Each token — whether it's a character class, quantifier, anchor, group, or escape sequence — is matched with its meaning. A summary is generated that describes the overall pattern behavior.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this to learn regular expressions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. The regex explainer is an excellent learning tool. Paste any regex you find online and study the token breakdown to understand how it works. Over time, you'll recognize common patterns and build your regex skills.",
      },
    },
    {
      "@type": "Question",
      name: "Does the explainer support all regex features?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The explainer supports all standard JavaScript regex features including character classes, quantifiers, anchors, capturing groups, non-capturing groups, lookahead, lookbehind, and named groups.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit to how many patterns I can explain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can explain unlimited regex patterns for free. There are no rate limits, no account requirements, and no hidden fees. All processing happens in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between a regex explainer and a regex tester?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A regex explainer tells you what a pattern means in plain English. A regex tester shows you what a pattern matches against specific test text. Both tools complement each other — use the explainer to understand patterns and the tester to verify they work correctly.",
      },
    },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Regex Explainer Online — Understand Any Regular Expression",
  description:
    "Learn how to decode and understand any regular expression with a free online regex explainer. Token-by-token breakdown with plain English meanings.",
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
      name: "Regex Explainer",
      item: `${BASE_URL}${PATH}`,
    },
  ],
};

export default async function RegexExplainerPage({
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
              <BookOpen className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t("regexExplainer.title")}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("regexExplainer.subtitle")}
          </p>
        </header>

        <section className="mb-12">
          <RegexExplainer />
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
          <span className="text-foreground font-medium">Regex Explainer</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Regex Explainer Online — Understand Any Regular Expression
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Paste any regular expression and get a plain English explanation.
            See a token-by-token breakdown with meanings so you can understand
            exactly what a pattern matches.
          </p>
        </header>

        <section className="mb-12">
          <RegexExplainer />
        </section>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="size-6" />
              Why Use a Regex Explainer?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Regular expressions are notoriously difficult to read. A pattern
              like{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                {"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"}
              </code>{" "}
              might look like gibberish, but it actually enforces password
              rules: at least one lowercase letter, one uppercase letter, one
              digit, and a minimum length of 8 characters.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A regex explainer bridges the gap between cryptic pattern syntax
              and human understanding. Instead of spending minutes or hours
              decoding a pattern character by character, you get instant,
              accurate explanations for every token in the expression. This is
              invaluable when reviewing code written by others, debugging
              validation rules, or learning regex from scratch.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Regex Shuttle&apos;s explainer doesn&apos;t just tell you what each
              character means in isolation — it understands context. A{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                +
              </code>{" "}
              after a character class means &quot;one or more of the preceding
              characters,&quot; not just &quot;plus sign.&quot; This contextual
              understanding makes the explanations genuinely useful.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="size-6" />
              What the Explainer Breaks Down
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: Braces,
                  title: "Character Classes",
                  desc: "\\d, \\w, \\s, [abc], [a-z], [^...] — each class is explained with the exact set of characters it matches.",
                },
                {
                  icon: Code2,
                  title: "Quantifiers",
                  desc: "*, +, ?, {n}, {n,m} — understand how many times each element must appear for a match.",
                },
                {
                  icon: Eye,
                  title: "Anchors & Boundaries",
                   desc: "^, $, \\b — learn where in the string each anchor matches without consuming characters.",
                },
                {
                  icon: GraduationCap,
                  title: "Groups & Assertions",
                  desc: "(...), (?:...), (?=...), (?<name>...) — see which groups capture text and which are lookaround assertions.",
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
              <Lightbulb className="size-6" />
              Regex Explained: Common Patterns Decoded
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here are some commonly used regex patterns and what they mean.
              Paste any of these into the explainer above for a detailed
              token-by-token breakdown:
            </p>
            <div className="space-y-4">
              {[
                {
                  pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
                  meaning:
                    "Matches an email address: one or more alphanumeric characters (with dots, underscores, percent, plus, or hyphen), followed by @, then a domain name, a dot, and a two-or-more letter TLD.",
                },
                {
                  pattern: "^\\d{4}-\\d{2}-\\d{2}$",
                  meaning:
                    "Matches a date in YYYY-MM-DD format. The ^ and $ anchors ensure the entire string must be exactly this format, not just contain it.",
                },
                {
                  pattern: "(https?:\\/\\/)?[^\\s]+\\.[a-z]{2,}",
                  meaning:
                    "Matches a URL with an optional http:// or https:// protocol, followed by non-whitespace characters, a dot, and a two-or-more letter domain extension.",
                },
                {
                  pattern: "(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}",
                  meaning:
                    "A password validator using lookaheads: requires at least one uppercase letter, one lowercase letter, one digit, and a minimum length of 8 characters.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                    {item.pattern}
                  </code>
                  <p className="text-sm text-muted-foreground">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Regex Explainer vs. Regex Tester: When to Use Each
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              These two tools serve different but complementary purposes:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2">Regex Explainer</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Tells you what a pattern means</li>
                  <li>• Useful when reading unfamiliar code</li>
                  <li>• Helps you learn regex syntax</li>
                  <li>• Breaks down complex patterns</li>
                </ul>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2">Regex Tester</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Shows what a pattern matches</li>
                  <li>• Useful when writing new patterns</li>
                  <li>• Highlights matches in text</li>
                  <li>• Tests capture groups and substitution</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              For the best workflow, use the explainer to understand a pattern
              first, then switch to the tester to verify it works with your
              specific test data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Learning Regular Expressions with the Explainer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you&apos;re new to regular expressions, the explainer is one of
              the best learning tools available. Here&apos;s how to use it
              effectively:
            </p>
            <ol className="space-y-3 mb-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  1
                </span>
                <div>
                  <p className="font-medium">Start with simple patterns</p>
                  <p className="text-sm text-muted-foreground">
                    Try{" "}
                    <code className="bg-muted px-1 rounded">\d+</code>,{" "}
                    <code className="bg-muted px-1 rounded">[a-z]+</code>, or{" "}
                    <code className="bg-muted px-1 rounded">^hello</code> to see
                    how basic tokens work.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  2
                </span>
                <div>
                  <p className="font-medium">Combine tokens</p>
                  <p className="text-sm text-muted-foreground">
                    Add quantifiers to classes:{" "}
                    <code className="bg-muted px-1 rounded">
                      {"[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,}"}
                    </code>{" "}
                    to see how patterns build up.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  3
                </span>
                <div>
                  <p className="font-medium">Study real-world patterns</p>
                  <p className="text-sm text-muted-foreground">
                    Find regex in documentation or Stack Overflow answers and
                    paste them into the explainer to understand what they do.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  4
                </span>
                <div>
                  <p className="font-medium">Experiment and iterate</p>
                  <p className="text-sm text-muted-foreground">
                    Modify parts of a pattern and see how the explanation
                    changes. This builds intuition for regex syntax.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Privacy-First Regex Explanation
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your regex patterns may contain sensitive information — validation
              rules for proprietary systems, patterns that match internal data
              formats, or expressions derived from confidential requirements.
              Regex Shuttle processes all explanations locally in your browser.
              No patterns are uploaded to any server, no data is logged, and no
              third parties can see what you&apos;re working with.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This privacy-first approach means you can safely paste any regex
              pattern — even one from a production codebase — without worrying
              about data exposure. Everything stays on your device.
            </p>
          </section>
        </article>

        <section className="mt-12 mb-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Decode Any Regex Instantly
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Stop guessing what patterns mean. Paste any regex and get a clear,
            token-by-token explanation in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 font-medium"
            >
              <BookOpen className="size-4" />
              Open Regex Explainer
            </Link>
            <Link
              href="/tools/regex-tester"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border rounded-md hover:bg-accent font-medium"
            >
              <Code2 className="size-4" />
              Try Regex Tester
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
