"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PATTERNS } from "@/lib/patterns";
import { FLAG_OPTIONS } from "@/lib/constants";
import { Copy, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";

interface RegexInputProps {
  pattern: string;
  flags: string;
  onPatternChange: (pattern: string) => void;
  onFlagsChange: (flags: string) => void;
  error: string | null;
}

export default function RegexInput({
  pattern,
  flags,
  onPatternChange,
  onFlagsChange,
  error,
}: RegexInputProps) {
  const t = useTranslations("tester");
  const [showLibrary, setShowLibrary] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLibrary(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = async () => {
    const regexStr = `/${pattern}/${flags}`;
    try {
      await navigator.clipboard.writeText(regexStr);
      toast.success(t("copyRegex") + ": " + regexStr);
    } catch {
      toast.error(t("copyFailed"));
    }
  };

  const handleClear = () => {
    onPatternChange("");
    onFlagsChange("g");
  };

  const handleSelectPattern = (regex: string, pFlags: string) => {
    onPatternChange(regex);
    onFlagsChange(pFlags);
    setShowLibrary(false);
  };

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      onFlagsChange(flags.replace(flag, ""));
    } else {
      onFlagsChange(flags + flag);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {t("patternLabel")}
        </label>
        <div className="flex gap-2">
          <div className="relative" ref={dropdownRef}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowLibrary(!showLibrary)}
            >
              <BookOpen className="size-4" />
              <span className="hidden sm:inline">{t("fromLibrary")}</span>
            </Button>
            {showLibrary && (
              <div className="absolute right-0 top-full z-50 mt-1 max-h-64 w-72 overflow-y-auto rounded-md border bg-popover p-1 shadow-md">
                {PATTERNS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => handleSelectPattern(p.regex, p.flags)}
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-2 text-muted-foreground text-xs truncate">
                      /{p.regex}/
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!pattern}
          >
            <Copy className="size-4" />
            <span className="hidden sm:inline">{t("copyRegex")}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
          >
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">{t("clearAll")}</span>
          </Button>
        </div>
      </div>

      <div
        className={`flex items-center rounded-md border bg-background font-mono text-sm ${
          error ? "border-destructive" : "border-input"
        }`}
      >
        <span className="pl-3 text-muted-foreground">/</span>
        <input
          type="text"
          value={pattern}
          onChange={(e) => onPatternChange(e.target.value)}
          placeholder={t("patternPlaceholder")}
          className="flex-1 bg-transparent px-1 py-2 outline-none placeholder:text-muted-foreground"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="text-muted-foreground">/</span>
        <input
          type="text"
          value={flags}
          onChange={(e) => onFlagsChange(e.target.value.replace(/[^gimsu]/g, ""))}
          className="w-12 bg-transparent px-1 py-2 outline-none"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="text-sm text-destructive break-words">{t("invalidRegex")}: {error}</p>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm text-muted-foreground">{t("flags")}:</span>
        {FLAG_OPTIONS.map((opt) => (
          <label
            key={opt.flag}
            title={t(`flagTip_${opt.flag}`)}
            className="flex min-h-10 items-center gap-1.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={flags.includes(opt.flag)}
              onChange={() => toggleFlag(opt.flag)}
              className="size-4 rounded border-input"
            />
            <span className="text-sm font-mono">{opt.flag}</span>
            <span className="text-xs text-muted-foreground">
              ({t(`flagLabel_${opt.flag}`)})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
