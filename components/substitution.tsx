"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { executeSubstitution } from "@/lib/regex-engine";

interface SubstitutionProps {
  pattern: string;
  flags: string;
  testString: string;
}

export default function Substitution({
  pattern,
  flags,
  testString,
}: SubstitutionProps) {
  const t = useTranslations("tester");
  const [replacement, setReplacement] = useState("");

  const { result, error } = useMemo(() => {
    if (!pattern || !replacement) {
      return { result: testString, error: null };
    }
    return executeSubstitution(pattern, flags, testString, replacement);
  }, [pattern, flags, testString, replacement]);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">
        {t("substitution")}
      </h3>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">
          {t("replaceWith")}
        </label>
        <input
          type="text"
          value={replacement}
          onChange={(e) => setReplacement(e.target.value)}
          placeholder={t("replacePlaceholder")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {replacement && (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            {t("result")}
          </label>
          <div className="rounded-md border bg-muted/30 p-3 font-mono text-sm break-all whitespace-pre-wrap min-h-[60px]">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
