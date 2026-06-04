"use client";

import { useTranslations } from "next-intl";

interface TestStringProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TestString({
  value,
  onChange,
  placeholder,
}: TestStringProps) {
  const t = useTranslations("tester");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {t("testStringLabel")}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || t("testStringPlaceholder")}
        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
        spellCheck={false}
      />
    </div>
  );
}
