import { MAX_MATCHES } from "./constants";

export interface MatchResult {
  text: string;
  index: number;
  length: number;
  groups: { name: string | null; text: string; index: number }[];
}

export interface RegexExecuteResult {
  matches: MatchResult[];
  error: string | null;
  executionTime: number;
  tooManyMatches: boolean;
}

export function executeRegex(pattern: string, flags: string, testString: string): RegexExecuteResult {
  const start = performance.now();

  if (!pattern) {
    return { matches: [], error: null, executionTime: 0, tooManyMatches: false };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    return {
      matches: [],
      error: e instanceof Error ? e.message : "Invalid regular expression",
      executionTime: 0,
      tooManyMatches: false,
    };
  }

  const matches: MatchResult[] = [];
  let tooManyMatches = false;

  if (flags.includes("g")) {
    let match: RegExpExecArray | null;
    let safety = 0;
    while ((match = regex.exec(testString)) !== null && safety < MAX_MATCHES + 1) {
      if (safety >= MAX_MATCHES) {
        tooManyMatches = true;
        break;
      }
      const groups: MatchResult["groups"] = [];
      for (let i = 1; i < match.length; i++) {
        if (match[i] !== undefined) {
          let groupName: string | null = null;
          if (match.groups) {
            for (const [name, val] of Object.entries(match.groups)) {
              if (val === match[i]) {
                groupName = name;
                break;
              }
            }
          }
          groups.push({ name: groupName, text: match[i], index: match.index + (match[0].indexOf(match[i])) });
        }
      }
      matches.push({
        text: match[0],
        index: match.index,
        length: match[0].length,
        groups,
      });
      if (match[0].length === 0) {
        regex.lastIndex++;
      }
      safety++;
    }
  } else {
    const match = regex.exec(testString);
    if (match) {
      const groups: MatchResult["groups"] = [];
      for (let i = 1; i < match.length; i++) {
        if (match[i] !== undefined) {
          let groupName: string | null = null;
          if (match.groups) {
            for (const [name, val] of Object.entries(match.groups)) {
              if (val === match[i]) {
                groupName = name;
                break;
              }
            }
          }
          groups.push({ name: groupName, text: match[i], index: match.index + (match[0].indexOf(match[i])) });
        }
      }
      matches.push({
        text: match[0],
        index: match.index,
        length: match[0].length,
        groups,
      });
    }
  }

  return {
    matches,
    error: null,
    executionTime: performance.now() - start,
    tooManyMatches,
  };
}

export function executeSubstitution(pattern: string, flags: string, testString: string, replacement: string): { result: string; error: string | null } {
  if (!pattern) return { result: testString, error: null };

  try {
    const regex = new RegExp(pattern, flags);
    const result = testString.replace(regex, replacement);
    return { result, error: null };
  } catch (e) {
    return { result: testString, error: e instanceof Error ? e.message : "Invalid regular expression" };
  }
}
