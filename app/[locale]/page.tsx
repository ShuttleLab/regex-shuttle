import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Zap,
  BookOpen,
  Library,
  Replace,
  FileText,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import RegexTester from "@/components/regex-tester";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical:
        locale === "en"
          ? "https://regex.shuttlelab.org/"
          : `https://regex.shuttlelab.org/${locale}`,
      languages: {
        en: "https://regex.shuttlelab.org/",
        zh: "https://regex.shuttlelab.org/zh",
        "x-default": "https://regex.shuttlelab.org/",
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const features = [
    { icon: Zap, title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: BookOpen, title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: Library, title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: Replace, title: t("feature4Title"), desc: t("feature4Desc") },
    { icon: FileText, title: t("feature5Title"), desc: t("feature5Desc") },
    { icon: Lock, title: t("feature6Title"), desc: t("feature6Desc") },
  ];

  const steps = [
    { num: "1", title: t("step1Title"), desc: t("step1Desc") },
    { num: "2", title: t("step2Title"), desc: t("step2Desc") },
    { num: "3", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#tester" className="inline-flex items-center justify-center gap-2 h-10 rounded-md px-8 bg-primary text-primary-foreground shadow hover:bg-primary/90 text-sm font-medium transition-colors">
            {t("cta")}
            <ArrowRight className="ml-2 size-4" />
          </a>
          <a href="#patterns" className="inline-flex items-center justify-center gap-2 h-10 rounded-md px-8 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors">
            {t("secondaryCta")}
          </a>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why a Regex Tester Matters */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          {t("whyRegexTitle")}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>{t("whyRegexP1")}</p>
          <p>{t("whyRegexP2")}</p>
        </div>
      </section>

      {/* How Regex Shuttle Is Different */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          {t("howDifferentTitle")}
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>{t("howDifferentP1")}</p>
          <p>{t("howDifferentP2")}</p>
        </div>
      </section>

      {/* Regex Tester embedded */}
      <section id="tester" className="mb-16 scroll-mt-20">
        <RegexTester />
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          {t("howItWorks")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground text-xl font-bold mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Badge */}
      <section className="text-center">
        <div className="inline-flex items-center gap-3 bg-muted rounded-full px-6 py-3">
          <ShieldCheck className="size-5 text-primary" />
          <span className="text-sm font-medium">{t("privacyBadge")}</span>
        </div>
      </section>
    </div>
  );
}
