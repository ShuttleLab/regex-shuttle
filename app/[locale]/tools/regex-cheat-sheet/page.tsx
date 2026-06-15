import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CheatSheet from "@/components/cheat-sheet";
import {
  BookMarked,
  Hash,
  Type,
  Anchor,
  Braces,
  Flag,
  Sparkles,
  ChevronRight,
  Search,
  Code2,
} from "lucide-react";
import Link from "next/link";

const BASE_URL = "https://regex.shuttlelab.org";
const PATH = "/tools/regex-cheat-sheet";

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
      title: `${t("regexCheatSheet.title")} | Regex Shuttle`,
      description: t("regexCheatSheet.subtitle"),
      alternates: {
        canonical,
        languages: {
          en: `${BASE_URL}${PATH}`,
          zh: `${BASE_URL}/zh${PATH}`,
          "x-default": `${BASE_URL}${PATH}`,
        },
      },
      openGraph: {
        title: t("regexCheatSheet.title"),
        description: t("regexCheatSheet.subtitle"),
        url: canonical,
        siteName: "Regex Shuttle",
        type: "website",
        locale: "zh_CN",
        alternateLocale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: t("regexCheatSheet.title"),
        description: t("regexCheatSheet.subtitle"),
      },
    };
  }

  return {
    title:
      "Regex Cheat Sheet — Complete Regular Expression Reference | Regex Shuttle",
    description:
      "The complete regex cheat sheet with characters, quantifiers, anchors, groups, character classes, and flags. Click any syntax to copy. Free quick reference.",
    keywords: [
      "regex cheat sheet",
      "regular expression cheat sheet",
      "regex reference",
      "regex syntax",
      "regex quick reference",
      "regex guide",
      "regex symbols",
      "regex characters",
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
      title: "Regex Cheat Sheet — Complete Regular Expression Reference",
      description:
        "The complete regex cheat sheet. Characters, quantifiers, anchors, groups, and flags — all in one place. Click to copy any syntax.",
      url: canonical,
      siteName: "Regex Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Regex Cheat Sheet — Complete Regular Expression Reference",
      description:
        "The complete regex cheat sheet. Click any syntax to copy. Free quick reference.",
    },
  };
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Regex Cheat Sheet",
  description:
    "Quick guide to using Regex Shuttle's cheat sheet as a regular expression reference.",
  step: [
    {
      "@type": "HowToStep",
      name: "Browse by Category",
      text: "The cheat sheet is organized into categories: Characters, Quantifiers, Anchors, Groups, Character Classes, Flags, and Special syntax.",
    },
    {
      "@type": "HowToStep",
      name: "Find the Syntax You Need",
      text: "Scan the tables to find the regex syntax that matches your requirement. Each entry shows the syntax and a plain English description.",
    },
    {
      "@type": "HowToStep",
      name: "Click to Copy",
      text: "Click any row in the cheat sheet to copy that syntax to your clipboard. Paste it directly into your regex pattern.",
    },
    {
      "@type": "HowToStep",
      name: "Test Your Pattern",
      text: "After building your pattern using the cheat sheet, switch to the Regex Tester to verify it matches your test strings correctly.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a regex cheat sheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A regex cheat sheet is a quick reference guide that lists regular expression syntax elements and their meanings. It covers characters, quantifiers, anchors, groups, character classes, and flags — everything you need to write and understand regex patterns.",
      },
    },
    {
      "@type": "Question",
      name: "What regex syntax categories are included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cheat sheet covers seven categories: Characters (\\d, \\w, \\s, etc.), Quantifiers (*, +, ?, {n,m}), Anchors (^, $, \\b), Groups ((...), (?:...), (?=...)), Character Classes ([abc], [a-z]), Flags (g, i, m, s, u), and Special characters (|, \\, backreferences).",
      },
    },
    {
      "@type": "Question",
      name: "Can I copy regex syntax from the cheat sheet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Click any row in the cheat sheet to copy that syntax element to your clipboard. You can then paste it directly into your regex pattern or code editor.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between greedy and lazy quantifiers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Greedy quantifiers (*, +, ?) match as much as possible while still allowing the overall pattern to match. Lazy quantifiers (*?, +?) match as little as possible. For example, .* matches everything to the end of the line, while .*? matches the shortest possible string.",
      },
    },
    {
      "@type": "Question",
      name: "What is a capturing group vs a non-capturing group?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A capturing group (...) saves the matched text so you can reference it later with $1, $2, etc. A non-capturing group (?:...) groups the pattern without saving the match. Use non-capturing groups when you need grouping but don't need to extract the matched text.",
      },
    },
    {
      "@type": "Question",
      name: "How do lookahead and lookbehind assertions work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lookahead (?=...) checks if text follows without consuming it. Negative lookahead (?!...) checks that text does NOT follow. Lookbehind (?<=...) checks if text precedes without consuming it. Negative lookbehind (?<!...) checks that text does NOT precede. These are useful for context-dependent matching.",
      },
    },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Regex Cheat Sheet — Complete Regular Expression Reference",
  description:
    "Complete regex cheat sheet covering characters, quantifiers, anchors, groups, character classes, flags, and special syntax. Click-to-copy for quick reference.",
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
      name: "Regex Cheat Sheet",
      item: `${BASE_URL}${PATH}`,
    },
  ],
};

export default async function RegexCheatSheetPage({
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
              <BookMarked className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t("regexCheatSheet.title")}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("regexCheatSheet.subtitle")}
          </p>
        </header>

        <section className="mb-12">
          <CheatSheet />
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
          <span className="text-foreground font-medium">Regex Cheat Sheet</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <BookMarked className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Regex Cheat Sheet — Complete Regular Expression Reference
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your go-to quick reference for regular expression syntax. Browse by
            category, find the syntax you need, and click to copy. Covers
            characters, quantifiers, anchors, groups, and more.
          </p>
        </header>

        <section className="mb-12">
          <CheatSheet />
        </section>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Search className="size-6" />
              How to Use This Regex Cheat Sheet
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This cheat sheet is organized into seven categories of regular
              expression syntax. Each entry shows the syntax on the left and a
              plain English description on the right. Click any row to copy the
              syntax to your clipboard — ready to paste into your pattern.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you&apos;re new to regex, start with the Characters and
              Quantifiers sections. These building blocks form the foundation of
              most patterns. Once you&apos;re comfortable with those, explore
              Anchors, Groups, and Character Classes for more advanced matching
              capabilities.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Type className="size-6" />
              Character Classes Explained
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Character classes let you match specific types of characters
              without listing them all individually. The most commonly used are
              the shorthand classes:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  \d
                </code>
                <span className="text-muted-foreground">
                  Matches any digit from 0 to 9. Equivalent to [0-9].
                </span>
              </li>
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  \w
                </code>
                <span className="text-muted-foreground">
                  Matches any word character: letters (a-z, A-Z), digits (0-9),
                  and underscore (_). Equivalent to [a-zA-Z0-9_].
                </span>
              </li>
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  \s
                </code>
                <span className="text-muted-foreground">
                  Matches any whitespace character: space, tab, newline, carriage
                  return, form feed.
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              The uppercase versions (\D, \W, \S) match the opposite — any
              character that is NOT a digit, word character, or whitespace. Custom
              character classes use square brackets: [abc] matches a, b, or c;
              [a-z] matches any lowercase letter; [^abc] matches anything except
              a, b, or c.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Hash className="size-6" />
              Quantifiers: Controlling Match Count
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Quantifiers control how many times the preceding element must
              appear for a match to succeed. They are essential for building
              flexible patterns:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm mb-1">
                  <code className="bg-muted px-1 rounded">*</code> — Zero or
                  more
                </p>
                <p className="text-xs text-muted-foreground">
                  Matches the preceding element zero or more times.{" "}
                  <code>ab*c</code> matches ac, abc, abbc, etc.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm mb-1">
                  <code className="bg-muted px-1 rounded">+</code> — One or
                  more
                </p>
                <p className="text-xs text-muted-foreground">
                  Matches the preceding element one or more times.{" "}
                  <code>ab+c</code> matches abc, abbc, but NOT ac.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm mb-1">
                  <code className="bg-muted px-1 rounded">?</code> — Zero or
                  one
                </p>
                <p className="text-xs text-muted-foreground">
                  Makes the preceding element optional.{" "}
                  <code>colou?r</code> matches both color and colour.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="font-medium text-sm mb-1">
                  <code className="bg-muted px-1 rounded">{"{n,m}"}</code> —
                  Between n and m
                </p>
                <p className="text-xs text-muted-foreground">
                  Matches the preceding element between n and m times.{" "}
                  <code>\d{"{2,4}"}</code> matches 2 to 4 digits.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Anchor className="size-6" />
              Anchors: Matching Positions
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Unlike other regex tokens, anchors don&apos;t match characters —
              they match positions in the string. This makes them essential for
              enforcing where a pattern must occur:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  ^
                </code>
                <span className="text-muted-foreground">
                  Matches the start of the string (or start of a line in
                  multiline mode). Use it to ensure a pattern appears at the
                  beginning.
                </span>
              </li>
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  $
                </code>
                <span className="text-muted-foreground">
                  Matches the end of the string (or end of a line in multiline
                  mode). Use it to ensure a pattern appears at the end.
                </span>
              </li>
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  \b
                </code>
                <span className="text-muted-foreground">
                  Matches a word boundary — the position between a word character
                  and a non-word character. Useful for matching whole words.
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              For example, <code className="bg-muted px-1 rounded">^\d+$</code>{" "}
              ensures the entire string consists only of digits. Without the
              anchors, <code className="bg-muted px-1 rounded">\d+</code> would
              match digits anywhere in the string.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Braces className="size-6" />
              Groups and Lookaround Assertions
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Groups serve two purposes: they organize patterns into logical
              units and they capture matched text for later use. Understanding
              the different group types is crucial for advanced regex:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  (...)
                </code>
                <span className="text-muted-foreground">
                  Capturing group. Saves the matched text so you can reference it
                  with $1, $2, etc. in substitution or backreferences.
                </span>
              </li>
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  (?:...)
                </code>
                <span className="text-muted-foreground">
                  Non-capturing group. Groups the pattern without saving the
                  match. Use when you need grouping but don&apos;t need the
                  captured text.
                </span>
              </li>
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  (?=...)
                </code>
                <span className="text-muted-foreground">
                  Positive lookahead. Asserts that what follows matches the
                  pattern, without consuming characters.
                </span>
              </li>
              <li className="flex gap-2">
                <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
                  (?!...)
                </code>
                <span className="text-muted-foreground">
                  Negative lookahead. Asserts that what follows does NOT match the
                  pattern.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Flag className="size-6" />
              Regex Flags Reference
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Flags modify how the regex engine interprets and executes a
              pattern. In JavaScript, flags are appended after the closing slash:
              <code className="bg-muted px-1 rounded mx-1">/pattern/flags</code>
            </p>
            <div className="space-y-3">
              {[
                {
                  flag: "g",
                  name: "Global",
                  desc: "Find all matches instead of stopping at the first one.",
                },
                {
                  flag: "i",
                  name: "Case-Insensitive",
                  desc: "Ignore case when matching. [a-z] and [A-Z] become equivalent.",
                },
                {
                  flag: "m",
                  name: "Multiline",
                  desc: "^ and $ match the start/end of each line, not just the entire string.",
                },
                {
                  flag: "s",
                  name: "DotAll",
                  desc: "The dot (.) matches newline characters too, allowing patterns to span lines.",
                },
                {
                  flag: "u",
                  name: "Unicode",
                  desc: "Enable full Unicode support including Unicode property escapes.",
                },
              ].map((item) => (
                <div
                  key={item.flag}
                  className="flex items-start gap-3 rounded-lg border bg-card p-3"
                >
                  <code className="flex-shrink-0 bg-muted px-1.5 py-0.5 rounded font-mono text-xs font-bold">
                    {item.flag}
                  </code>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="size-6" />
              Tips for Writing Better Regex
            </h2>
            <div className="space-y-4">
              {[
                {
                  tip: "Be specific with character classes",
                  desc: "Use \\d instead of [0-9], \\w instead of [a-zA-Z0-9_]. Shorthand classes are shorter, more readable, and less error-prone.",
                },
                {
                  tip: "Use anchors to avoid partial matches",
                  desc: "Without ^ and $, your pattern may match substrings you didn't intend. Always consider whether you need to match the entire string.",
                },
                {
                  tip: "Prefer non-capturing groups when possible",
                  desc: "Use (?:...) instead of (...) when you don't need the captured text. It's more efficient and makes your intent clear.",
                },
                {
                  tip: "Watch out for greedy quantifiers",
                  desc: "By default, quantifiers are greedy — they match as much as possible. Add ? after a quantifier (*?, +?) to make it lazy.",
                },
                {
                  tip: "Test with edge cases",
                  desc: "Always test your regex with empty strings, strings with special characters, and very long strings to catch unexpected behavior.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border bg-card p-4">
                  <p className="font-medium text-sm mb-1">{item.tip}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <section className="mt-12 mb-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Need to Test a Pattern?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Use the cheat sheet to build your regex, then test it instantly with
            the Regex Shuttle tester.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 font-medium"
            >
              <Code2 className="size-4" />
              Test Your Regex
            </Link>
            <Link
              href="/tools/regex-explainer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border rounded-md hover:bg-accent font-medium"
            >
              <BookMarked className="size-4" />
              Explain a Pattern
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
