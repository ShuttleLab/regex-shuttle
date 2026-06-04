"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { executeRegex } from "@/lib/regex-engine";
import { DEBOUNCE_MS } from "@/lib/constants";
import type { MatchResult } from "@/lib/regex-engine";
import RegexInput from "@/components/regex-input";
import TestString from "@/components/test-string";
import MatchResults from "@/components/match-results";
import Substitution from "@/components/substitution";

export default function RegexTester() {
  const t = useTranslations("tester");

  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tooManyMatches, setTooManyMatches] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);

  const executeWithDebounce = useCallback(() => {
    const timer = setTimeout(() => {
      const result = executeRegex(pattern, flags, testString);
      setMatches(result.matches);
      setError(result.error);
      setTooManyMatches(result.tooManyMatches);
      setExecutionTime(result.executionTime);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [pattern, flags, testString]);

  useEffect(() => {
    const cleanup = executeWithDebounce();
    return cleanup;
  }, [executeWithDebounce]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <RegexInput
            pattern={pattern}
            flags={flags}
            onPatternChange={setPattern}
            onFlagsChange={setFlags}
            error={error}
          />
        </div>

        <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <TestString
            value={testString}
            onChange={setTestString}
          />
        </div>

        <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <Substitution
            pattern={pattern}
            flags={flags}
            testString={testString}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          <MatchResults
            matches={matches}
            testString={testString}
            tooManyMatches={tooManyMatches}
          />
          {pattern && !error && (
            <p className="mt-3 text-xs text-muted-foreground">
              {t("executionTime", { time: executionTime.toFixed(2) })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
