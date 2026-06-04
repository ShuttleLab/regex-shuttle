"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { PATTERNS, PATTERN_CATEGORIES } from "@/lib/patterns";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const ALL_TAB = { id: "all", label: { en: "All", zh: "全部" } };
const TABS = [ALL_TAB, ...PATTERN_CATEGORIES];

const CATEGORY_TO_I18N: Record<string, "common" | "developer" | "validation"> = {
  common: "common",
  dev: "developer",
  validation: "validation",
};

export default function PatternLibrary() {
  const t = useTranslations("patterns");
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? PATTERNS
      : PATTERNS.filter((p) => p.category === activeTab);

  const handleCopy = async (regex: string, flags: string) => {
    const str = `/${regex}/${flags}`;
    try {
      await navigator.clipboard.writeText(str);
      toast.success(`${t("copyPattern")}: ${str}`);
    } catch {
      toast.error(t("copyFailed"));
    }
  };

  const handleTestPattern = async (regex: string, flags: string) => {
    const str = `/${regex}/${flags}`;
    try {
      await navigator.clipboard.writeText(str);
      toast.success(`${t("testPattern")}: ${str}`);
    } catch {
      toast.error(t("copyFailed"));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id === "all" ? t("all") : t(CATEGORY_TO_I18N[tab.id])}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((pattern) => (
          <div
            key={pattern.name}
            className="rounded-lg border bg-card p-4 shadow-sm flex flex-col"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-sm font-medium text-foreground">
                {pattern.name}
              </h3>
              <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {t(CATEGORY_TO_I18N[pattern.category] ?? pattern.category)}
              </span>
            </div>

            <code className="mb-3 rounded bg-muted/50 px-2 py-1.5 font-mono text-xs break-all">
              /{pattern.regex}/{pattern.flags}
            </code>

            <p className="mb-3 text-sm text-muted-foreground">
              {locale === "zh" ? pattern.description.zh : pattern.description.en}
            </p>

            <div className="mb-3 rounded-md border bg-muted/30 p-2">
              <p className="text-xs text-muted-foreground mb-1">{t("example")}:</p>
              <p className="font-mono text-xs break-all">{pattern.example}</p>
            </div>

            <div className="mt-auto flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleCopy(pattern.regex, pattern.flags)}
              >
                <Copy className="size-3.5" />
                {t("copyPattern")}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => handleTestPattern(pattern.regex, pattern.flags)}
              >
                <ExternalLink className="size-3.5" />
                {t("testPattern")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
