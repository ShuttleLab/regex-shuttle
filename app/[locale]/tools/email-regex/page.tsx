import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import RegexTester from "@/components/regex-tester";
import {
  Mail,
  Shield,
  Code2,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Copy,
  BookOpen,
  Zap,
  FileText,
} from "lucide-react";
import Link from "next/link";

const BASE_URL = "https://regex.shuttlelab.org";
const PATH = "/tools/email-regex";

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

  return {
    title:
      "Email Regex Pattern — Validate Email Addresses with Regular Expressions | Regex Shuttle",
    description:
      "Get the best email regex pattern for validating email addresses. Test email validation regex online with real-time matching. Includes RFC 5322 compliant patterns and simple alternatives.",
    keywords: [
      "email regex pattern",
      "email validation regex",
      "email regex",
      "regex email",
      "email address regex",
      "validate email regex",
      "email regular expression",
      "email pattern",
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
        "Email Regex Pattern — Validate Email Addresses with Regular Expressions",
      description:
        "Get the best email regex pattern and test it online. Real-time matching with instant feedback. Free and private.",
      url: canonical,
      siteName: "Regex Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Email Regex Pattern — Validate Email Addresses with Regular Expressions",
      description:
        "Get the best email regex pattern and test it online. Real-time matching, free, and private.",
    },
  };
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Validate Email Addresses with Regex",
  description:
    "Step-by-step guide to using regular expressions for email address validation.",
  step: [
    {
      "@type": "HowToStep",
      name: "Choose Your Email Regex Pattern",
      text: "Select an email regex pattern based on your needs. Use the standard pattern for most cases, or the RFC 5322 pattern for strict validation.",
    },
    {
      "@type": "HowToStep",
      name: "Test with Sample Emails",
      text: "Paste the regex into the tester and test it with valid emails (user@example.com) and invalid inputs (not-an-email) to verify it works correctly.",
    },
    {
      "@type": "HowToStep",
      name: "Check Edge Cases",
      text: "Test with edge cases like emails with subdomains (user@sub.domain.com), plus addressing (user+tag@gmail.com), and special characters.",
    },
    {
      "@type": "HowToStep",
      name: "Copy and Implement",
      text: "Copy the regex pattern and integrate it into your application's validation logic. Most languages support the same basic regex syntax.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best regex pattern for email validation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most commonly used email regex is [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}. This pattern matches most valid email addresses while being simple enough for practical use. It checks for the basic structure: username@domain.tld.",
      },
    },
    {
      "@type": "Question",
      name: "Can regex perfectly validate all email addresses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The full RFC 5322 specification for email addresses is extremely complex and cannot be perfectly expressed in a single regex. For most practical applications, a simplified pattern that checks for username@domain.tld structure is sufficient. For strict validation, consider using a dedicated email validation library.",
      },
    },
    {
      "@type": "Question",
      name: "Does the email regex support plus addressing (Gmail aliases)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The pattern [a-zA-Z0-9._%+-]+ includes the + character in the character class, so addresses like user+tag@gmail.com will match correctly. This supports Gmail-style plus addressing and similar alias systems.",
      },
    },
    {
      "@type": "Question",
      name: "How do I validate emails with subdomains?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standard email regex already supports subdomains. The domain part [a-zA-Z0-9.-]+ matches dots and hyphens, so user@mail.example.com will match. The \\.[a-zA-Z]{2,} at the end ensures there's at least a two-letter TLD.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use regex or a library for email validation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most web forms and basic validation, regex is sufficient and fast. Use a regex pattern for client-side validation to give users immediate feedback. For security-critical applications, combine regex with a server-side validation library that performs additional checks like DNS MX record lookups.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between simple and RFC-compliant email regex?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A simple email regex like [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,} covers 99% of real-world email addresses. An RFC 5322 compliant regex is hundreds of characters long and handles extremely rare edge cases. For practical purposes, the simple pattern is recommended.",
      },
    },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "Email Regex Pattern — Validate Email Addresses with Regular Expressions",
  description:
    "Learn how to validate email addresses using regular expressions. Includes practical patterns, edge case handling, and a free online tester.",
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
      name: "Email Regex",
      item: `${BASE_URL}${PATH}`,
    },
  ],
};

export default async function EmailRegexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
          <span className="text-foreground font-medium">Email Regex</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
              <Mail className="size-5 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Email Regex Pattern — Validate Email Addresses with Regular
              Expressions
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            The complete guide to email validation with regex. Get battle-tested
            patterns, understand how they work, and test them with your own data
            — all in one place.
          </p>
        </header>

        <section className="mb-8 rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Copy className="size-4" />
            Standard Email Regex Pattern
          </h2>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-md font-mono text-sm break-all">
            <code>
              [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"}
            </code>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            This pattern matches most standard email addresses including those
            with dots, underscores, percent signs, plus signs, and hyphens in
            the username, followed by a domain with at least a two-letter TLD.
          </p>
        </section>

        <section className="mb-12">
          <RegexTester />
        </section>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="size-6" />
              How the Email Regex Works
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The standard email regex pattern breaks down into three main
              parts: the local part (username), the @ symbol, and the domain
              part. Let&apos;s examine each component:
            </p>
            <div className="space-y-3 mb-4">
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  [a-zA-Z0-9._%+-]+
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Local part (username):</strong> Matches one or more
                  letters, digits, dots, underscores, percent signs, plus signs,
                  or hyphens. This covers standard usernames like
                  &quot;john.doe&quot;, &quot;user+tag&quot;, and
                  &quot;info%40&quot;.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  @
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>At symbol:</strong> The literal @ character separating
                  the local part from the domain. Every valid email address
                  requires exactly one @.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded font-mono">
                  [a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"}
                </code>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Domain part:</strong> Matches the domain name
                  (letters, digits, dots, hyphens) followed by a dot and a
                  top-level domain of at least two letters. This handles domains
                  like &quot;gmail.com&quot;, &quot;mail.company.co.uk&quot;,
                  etc.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="size-6" />
              Email Regex Patterns Compared
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Different use cases call for different levels of email validation.
              Here are the most common approaches:
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  Simple Pattern (Recommended for most uses)
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  \S+@\S+\.\S+
                </code>
                <p className="text-sm text-muted-foreground">
                  Quick and dirty: matches anything with @ and a dot. Good for
                  extracting emails from text, not for strict validation.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  Standard Pattern (Best balance)
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"}
                </code>
                <p className="text-sm text-muted-foreground">
                  The sweet spot: validates structure while remaining readable
                  and maintainable. Catches most typos and invalid formats.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold text-sm mb-2">
                  Strict Pattern (For maximum validation)
                </h3>
                <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono block mb-2 break-all">
                  ^[a-zA-Z0-9.!#$%&amp;&apos;*+/=?^_`{"{|}"}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{"{0,61}"}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{"{0,61}"}[a-zA-Z0-9])?)*$
                </code>
                <p className="text-sm text-muted-foreground">
                  Closer to RFC 5322 compliance. Handles more special characters
                  and enforces domain label length limits. Use when you need
                  stricter validation.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="size-6" />
              Common Email Validation Edge Cases
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Email addresses are more varied than most people expect. Here are
              edge cases your regex should handle:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                {
                  email: "user+tag@gmail.com",
                  valid: true,
                  note: "Plus addressing (Gmail aliases)",
                },
                {
                  email: "user.name@domain.com",
                  valid: true,
                  note: "Dots in local part",
                },
                {
                  email: "user@sub.domain.com",
                  valid: true,
                  note: "Subdomains in domain",
                },
                {
                  email: "user@domain.co.uk",
                  valid: true,
                  note: "Multi-part TLDs",
                },
                {
                  email: "user@domain",
                  valid: false,
                  note: "Missing TLD",
                },
                {
                  email: "@domain.com",
                  valid: false,
                  note: "Missing local part",
                },
                {
                  email: "user@@domain.com",
                  valid: false,
                  note: "Double @ symbol",
                },
                {
                  email: "user@.com",
                  valid: false,
                  note: "Domain starts with dot",
                },
              ].map((item) => (
                <div
                  key={item.email}
                  className="rounded-lg border bg-card p-3 flex items-start gap-2"
                >
                  {item.valid ? (
                    <CheckCircle2 className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="size-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <code className="text-xs font-mono">{item.email}</code>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="size-6" />
              Email Regex in Different Programming Languages
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The email regex pattern works across most programming languages
              with minimal modifications. Here&apos;s how to use it:
            </p>
            <div className="space-y-3">
              {[
                {
                  lang: "JavaScript",
                  code: `const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
const isValid = emailRegex.test("user@example.com");`,
                },
                {
                  lang: "Python",
                  code: `import re
email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
is_valid = re.match(email_regex, "user@example.com")`,
                },
                {
                  lang: "PHP",
                  code: `$email = "user@example.com";
$pattern = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/';
$isValid = preg_match($pattern, $email);`,
                },
              ].map((item) => (
                <div key={item.lang} className="rounded-lg border bg-card p-4">
                  <h3 className="font-semibold text-sm mb-2">{item.lang}</h3>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono">
                    {item.code}
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="size-6" />
              Best Practices for Email Validation
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Use regex for format validation only
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Regex checks that the email looks like a valid address. It
                    cannot verify that the email actually exists or can receive
                    mail.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Combine with confirmation emails
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The only way to truly verify an email address is to send a
                    confirmation email. Use regex as a first-pass filter, then
                    confirm via email.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Validate on both client and server
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Client-side regex validation gives instant feedback. Always
                    re-validate on the server since client-side checks can be
                    bypassed.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    Be permissive, not restrictive
                  </p>
                  <p className="text-sm text-muted-foreground">
                    It&apos;s better to accept a slightly invalid email (and let
                    the confirmation email fail) than to reject a valid one.
                    Overly strict regex can block real users.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </article>

        <section className="mt-12 mb-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Test Your Email Regex Now
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Paste the email regex pattern into the tester above and verify it
            with your own test data. Free, instant, and private.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 font-medium"
            >
              <Mail className="size-4" />
              Open Regex Tester
            </Link>
            <Link
              href="/tools/regex-explainer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border rounded-md hover:bg-accent font-medium"
            >
              <BookOpen className="size-4" />
              Explain This Pattern
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
