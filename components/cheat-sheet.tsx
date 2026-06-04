"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface CheatEntry {
  syntax: string;
  description: string;
}

interface CheatSection {
  titleKey: string;
  entries: CheatEntry[];
}

const SECTIONS: CheatSection[] = [
  {
    titleKey: "characters",
    entries: [
      { syntax: ".", description: "Any character except newline" },
      { syntax: "\\d", description: "Digit (0-9)" },
      { syntax: "\\w", description: "Word character (a-z, A-Z, 0-9, _)" },
      { syntax: "\\s", description: "Whitespace (space, tab, newline)" },
      { syntax: "\\D", description: "Non-digit" },
      { syntax: "\\W", description: "Non-word character" },
      { syntax: "\\S", description: "Non-whitespace" },
    ],
  },
  {
    titleKey: "quantifiers",
    entries: [
      { syntax: "*", description: "Zero or more" },
      { syntax: "+", description: "One or more" },
      { syntax: "?", description: "Zero or one" },
      { syntax: "{n}", description: "Exactly n times" },
      { syntax: "{n,}", description: "n or more times" },
      { syntax: "{n,m}", description: "Between n and m times" },
      { syntax: "*?", description: "Zero or more (lazy)" },
      { syntax: "+?", description: "One or more (lazy)" },
    ],
  },
  {
    titleKey: "anchors",
    entries: [
      { syntax: "^", description: "Start of string/line" },
      { syntax: "$", description: "End of string/line" },
      { syntax: "\\b", description: "Word boundary" },
      { syntax: "\\B", description: "Non-word boundary" },
    ],
  },
  {
    titleKey: "groups",
    entries: [
      { syntax: "(…)", description: "Capturing group" },
      { syntax: "(?:…)", description: "Non-capturing group" },
      { syntax: "(?=…)", description: "Positive lookahead" },
      { syntax: "(?!…)", description: "Negative lookahead" },
      { syntax: "(?<=…)", description: "Positive lookbehind" },
      { syntax: "(?<!…)", description: "Negative lookbehind" },
      { syntax: "(?<name>…)", description: "Named capturing group" },
    ],
  },
  {
    titleKey: "charClasses",
    entries: [
      { syntax: "[abc]", description: "Match a, b, or c" },
      { syntax: "[^abc]", description: "Match anything except a, b, or c" },
      { syntax: "[a-z]", description: "Match a through z" },
      { syntax: "[a-zA-Z]", description: "Match a-z or A-Z" },
    ],
  },
  {
    titleKey: "flags",
    entries: [
      { syntax: "g", description: "Global (match all)" },
      { syntax: "i", description: "Case-insensitive" },
      { syntax: "m", description: "Multiline (^ and $ match lines)" },
      { syntax: "s", description: "Dotall (. matches newline)" },
      { syntax: "u", description: "Unicode support" },
    ],
  },
  {
    titleKey: "special",
    entries: [
      { syntax: "|", description: "Alternation (OR)" },
      { syntax: "\\", description: "Escape special character" },
      { syntax: "(…)\\1", description: "Back-reference to group 1" },
    ],
  },
];

export default function CheatSheet() {
  const t = useTranslations("cheatSheet");
  const tCommon = useTranslations("common");

  const handleCopy = async (syntax: string) => {
    try {
      await navigator.clipboard.writeText(syntax);
      toast.success(`${tCommon("copied")} ${syntax}`);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {SECTIONS.map((section) => (
          <div
            key={section.titleKey}
            className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-sm font-medium text-foreground mb-4">
              {t(section.titleKey as Parameters<typeof t>[0])}
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium text-muted-foreground w-24">
                    Syntax
                  </th>
                  <th className="pb-2 text-left font-medium text-muted-foreground pl-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {section.entries.map((entry) => (
                  <tr
                    key={entry.syntax}
                    className="border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleCopy(entry.syntax)}
                    title={t("clickToCopy")}
                  >
                    <td className="py-2 pr-3">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {entry.syntax}
                      </code>
                    </td>
                    <td className="py-2 pl-3 text-muted-foreground">
                      {entry.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
