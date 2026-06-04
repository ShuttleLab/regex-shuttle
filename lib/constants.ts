export const MAX_MATCHES = 1000;
export const DEBOUNCE_MS = 150;

export const FLAG_OPTIONS = [
  { flag: "g", label: "Global", description: "Find all matches" },
  { flag: "i", label: "Case Insensitive", description: "Case-insensitive matching" },
  { flag: "m", label: "Multiline", description: "^ and $ match line boundaries" },
  { flag: "s", label: "DotAll", description: ". matches newlines" },
  { flag: "u", label: "Unicode", description: "Enable Unicode support" },
] as const;
