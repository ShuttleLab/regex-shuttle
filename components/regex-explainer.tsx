"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { explainRegex, generateSummary } from "@/lib/regex-explainer";
import type { ExplanationToken } from "@/lib/regex-explainer";

export default function RegexExplainer() {
  const t = useTranslations("explainer");
  const [pattern, setPattern] = useState("");
  const [tokens, setTokens] = useState<ExplanationToken[]>([]);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setPattern(value);

    if (!value) {
      setTokens([]);
      setSummary("");
      setError(null);
      return;
    }

    try {
      new RegExp(value);
      const result = explainRegex(value);
      setTokens(result);
      setSummary(generateSummary(value));
      setError(null);
    } catch {
      setTokens([]);
      setSummary("");
      setError("Invalid regular expression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            {t("patternLabel")}
          </label>
          <div
            className={`flex items-center rounded-md border bg-background font-mono text-sm ${
              error ? "border-destructive" : "border-input"
            }`}
          >
            <span className="pl-3 text-muted-foreground">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={t("patternPlaceholder")}
              className="flex-1 bg-transparent px-1 py-2 outline-none placeholder:text-muted-foreground"
              spellCheck={false}
              autoComplete="off"
            />
            <span className="pr-3 text-muted-foreground">/</span>
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
      </div>

      {!pattern && !error && (
        <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">{t("noPattern")}</p>
        </div>
      )}

      {tokens.length > 0 && (
        <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-4">
            {t("tokens")}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium text-muted-foreground">
                    {t("raw")}
                  </th>
                  <th className="pb-2 text-left font-medium text-muted-foreground pl-4">
                    {t("description")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2.5 pr-4">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {token.raw}
                      </code>
                    </td>
                    <td className="py-2.5 pl-4 text-muted-foreground">
                      {token.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {summary && (
        <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <h3 className="text-sm font-medium text-foreground mb-2">
            {t("summary")}
          </h3>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>
      )}
    </div>
  );
}
