"use client";

import { useTranslations } from "next-intl";
import type { MatchResult } from "@/lib/regex-engine";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface MatchResultsProps {
  matches: MatchResult[];
  testString: string;
  tooManyMatches: boolean;
}

const MATCH_COLORS = [
  "bg-yellow-200 dark:bg-yellow-900/60",
  "bg-blue-200 dark:bg-blue-900/60",
  "bg-green-200 dark:bg-green-900/60",
  "bg-pink-200 dark:bg-pink-900/60",
  "bg-purple-200 dark:bg-purple-900/60",
  "bg-orange-200 dark:bg-orange-900/60",
];

export default function MatchResults({
  matches,
  testString,
  tooManyMatches,
}: MatchResultsProps) {
  const t = useTranslations("tester");
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null);

  const renderHighlightedText = () => {
    if (!testString) return null;
    if (matches.length === 0) {
      return <span className="text-foreground">{testString}</span>;
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`pre-${i}`} className="text-foreground">
            {testString.slice(lastIndex, match.index)}
          </span>
        );
      }
      const colorClass = MATCH_COLORS[i % MATCH_COLORS.length];
      parts.push(
        <span
          key={`match-${i}`}
          className={`${colorClass} rounded-sm px-0.5 font-mono`}
          title={t("matchLabel", { n: i + 1 })}
        >
          {match.text}
        </span>
      );
      lastIndex = match.index + match.length;
    });

    if (lastIndex < testString.length) {
      parts.push(
        <span key="post" className="text-foreground">
          {testString.slice(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">
          {matches.length > 0
            ? t("matchesFound", { count: matches.length })
            : t("noMatches")}
        </h3>
      </div>

      {tooManyMatches && (
        <div className="rounded-md border border-yellow-300 bg-yellow-50 p-2 text-sm text-yellow-800 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200">
          {t("tooManyMatches", { max: 1000 })}
        </div>
      )}

      {testString && (
        <div className="rounded-md border bg-muted/30 p-3 font-mono text-sm break-all whitespace-pre-wrap">
          {renderHighlightedText()}
        </div>
      )}

      {matches.length > 0 && (
        <div className="space-y-2">
          {matches.map((match, i) => (
            <div
              key={i}
              className="rounded-md border bg-card overflow-hidden"
            >
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent/50"
                onClick={() =>
                  setExpandedMatch(expandedMatch === i ? null : i)
                }
              >
                {expandedMatch === i ? (
                  <ChevronDown className="size-4 shrink-0" />
                ) : (
                  <ChevronRight className="size-4 shrink-0" />
                )}
                <span
                  className={`inline-block max-w-[40%] truncate rounded-sm px-1.5 py-0.5 font-mono text-xs ${
                    MATCH_COLORS[i % MATCH_COLORS.length]
                  }`}
                >
                  {match.text}
                </span>
                <span className="ml-auto shrink-0 whitespace-nowrap text-xs text-muted-foreground">
                  {t("index")}: {match.index} &middot; {t("length")}:{" "}
                  {match.length}
                </span>
              </button>
              {expandedMatch === i && (
                <div className="border-t px-3 py-2 text-sm space-y-1">
                  <div className="flex gap-4 text-muted-foreground">
                    <span>
                      {t("index")}: <span className="text-foreground font-mono">{match.index}</span>
                    </span>
                    <span>
                      {t("length")}: <span className="text-foreground font-mono">{match.length}</span>
                    </span>
                  </div>
                  {match.groups.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {t("groups")}:
                      </span>
                      {match.groups.map((group, gi) => (
                        <div
                          key={gi}
                          className="ml-3 flex items-start gap-2 text-xs"
                        >
                          <span className="shrink-0 text-muted-foreground">
                            {group.name ? `${group.name}` : `#${gi + 1}`}:
                          </span>
                          <span className="font-mono bg-muted rounded px-1 break-all min-w-0">
                            {group.text}
                          </span>
                          <span className="shrink-0 text-muted-foreground">
                            @{group.index}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {matches.length === 0 && testString && (
        <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          {t("noMatches")}
        </div>
      )}
    </div>
  );
}
