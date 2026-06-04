export interface ExplanationToken {
  raw: string;
  description: string;
}

function describeCharClass(content: string): string {
  let desc = "";
  if (content.startsWith("^")) {
    desc = "Match any character NOT in: ";
    content = content.slice(1);
  } else {
    desc = "Match any character in: ";
  }

  const parts: string[] = [];
  let i = 0;
  while (i < content.length) {
    if (content[i] === "\\") {
      const next = content[i + 1];
      switch (next) {
        case "d": parts.push("digit (0-9)"); break;
        case "D": parts.push("non-digit"); break;
        case "w": parts.push("word character (a-z, A-Z, 0-9, _)"); break;
        case "W": parts.push("non-word character"); break;
        case "s": parts.push("whitespace"); break;
        case "S": parts.push("non-whitespace"); break;
        case "b": parts.push("word boundary"); break;
        case "n": parts.push("newline"); break;
        case "t": parts.push("tab"); break;
        case "r": parts.push("carriage return"); break;
        default: parts.push(`"${next}"`); break;
      }
      i += 2;
    } else if (i + 2 < content.length && content[i + 1] === "-") {
      parts.push(`"${content[i]}" to "${content[i + 2]}"`);
      i += 3;
    } else {
      parts.push(`"${content[i]}"`);
      i++;
    }
  }

  return desc + parts.join(", ");
}

export function explainRegex(pattern: string): ExplanationToken[] {
  const tokens: ExplanationToken[] = [];
  let i = 0;
  let groupCount = 0;

  while (i < pattern.length) {
    const ch = pattern[i];

    if (ch === "\\") {
      const next = pattern[i + 1];
      switch (next) {
        case "d": tokens.push({ raw: "\\d", description: "Match any digit (0-9)" }); break;
        case "D": tokens.push({ raw: "\\D", description: "Match any non-digit character" }); break;
        case "w": tokens.push({ raw: "\\w", description: "Match any word character (a-z, A-Z, 0-9, _)" }); break;
        case "W": tokens.push({ raw: "\\W", description: "Match any non-word character" }); break;
        case "s": tokens.push({ raw: "\\s", description: "Match any whitespace character" }); break;
        case "S": tokens.push({ raw: "\\S", description: "Match any non-whitespace character" }); break;
        case "b": tokens.push({ raw: "\\b", description: "Match a word boundary" }); break;
        case "B": tokens.push({ raw: "\\B", description: "Match a non-word boundary" }); break;
        case "n": tokens.push({ raw: "\\n", description: "Match a newline character" }); break;
        case "t": tokens.push({ raw: "\\t", description: "Match a tab character" }); break;
        case "r": tokens.push({ raw: "\\r", description: "Match a carriage return" }); break;
        case "f": tokens.push({ raw: "\\f", description: "Match a form feed" }); break;
        case "v": tokens.push({ raw: "\\v", description: "Match a vertical tab" }); break;
        case "0": tokens.push({ raw: "\\0", description: "Match a null character" }); break;
        default:
          if (next === undefined) {
            tokens.push({ raw: "\\", description: "Trailing backslash" });
          } else {
            tokens.push({ raw: `\\${next}`, description: `Escape character: literal "${next}"` });
          }
          break;
      }
      i += 2;
    } else if (ch === "[") {
      const end = pattern.indexOf("]", i + 1);
      if (end === -1) {
        tokens.push({ raw: pattern.slice(i), description: "Unclosed character class" });
        i = pattern.length;
      } else {
        const content = pattern.slice(i, end + 1);
        tokens.push({ raw: content, description: describeCharClass(content.slice(1, -1)) });
        i = end + 1;
      }
    } else if (ch === "(") {
      if (pattern[i + 1] === "?") {
        if (pattern[i + 2] === ":") {
          tokens.push({ raw: "(?:", description: "Start of non-capturing group" });
          i += 3;
        } else if (pattern[i + 2] === "=") {
          tokens.push({ raw: "(?=", description: "Start of positive lookahead" });
          i += 3;
        } else if (pattern[i + 2] === "!") {
          tokens.push({ raw: "(?!", description: "Start of negative lookahead" });
          i += 3;
        } else if (pattern[i + 2] === "<" && pattern[i + 3] === "=") {
          tokens.push({ raw: "(?<=", description: "Start of positive lookbehind" });
          i += 4;
        } else if (pattern[i + 2] === "<" && pattern[i + 3] === "!") {
          tokens.push({ raw: "(?<!", description: "Start of negative lookbehind" });
          i += 4;
        } else if (pattern[i + 2] === "<") {
          const nameEnd = pattern.indexOf(">", i + 3);
          if (nameEnd !== -1) {
            const name = pattern.slice(i + 3, nameEnd);
            tokens.push({ raw: `(?<${name}>`, description: `Start of named capturing group "${name}"` });
            i = nameEnd + 1;
          } else {
            groupCount++;
            tokens.push({ raw: "(", description: `Start of capturing group #${groupCount}` });
            i++;
          }
        } else {
          groupCount++;
          tokens.push({ raw: "(", description: `Start of capturing group #${groupCount}` });
          i++;
        }
      } else {
        groupCount++;
        tokens.push({ raw: "(", description: `Start of capturing group #${groupCount}` });
        i++;
      }
    } else if (ch === ")") {
      tokens.push({ raw: ")", description: "End of group" });
      i++;
    } else if (ch === "{") {
      const end = pattern.indexOf("}", i + 1);
      if (end === -1) {
        tokens.push({ raw: "{", description: 'Literal "{" character' });
        i++;
      } else {
        const content = pattern.slice(i + 1, end);
        const parts = content.split(",");
        let desc: string;
        if (parts.length === 1) {
          desc = `Exactly ${parts[0]} times`;
        } else if (parts[1] === "") {
          desc = `${parts[0]} or more times`;
        } else {
          desc = `Between ${parts[0]} and ${parts[1]} times`;
        }
        tokens.push({ raw: `{${content}}`, description: desc });
        i = end + 1;
      }
    } else if (ch === "*") {
      const next = pattern[i + 1];
      if (next === "?") {
        tokens.push({ raw: "*?", description: "Zero or more times (lazy)" });
        i += 2;
      } else {
        tokens.push({ raw: "*", description: "Zero or more times" });
        i++;
      }
    } else if (ch === "+") {
      const next = pattern[i + 1];
      if (next === "?") {
        tokens.push({ raw: "+?", description: "One or more times (lazy)" });
        i += 2;
      } else {
        tokens.push({ raw: "+", description: "One or more times" });
        i++;
      }
    } else if (ch === "?") {
      const next = pattern[i + 1];
      if (next === "?") {
        tokens.push({ raw: "??", description: "Zero or one time (lazy)" });
        i += 2;
      } else {
        tokens.push({ raw: "?", description: "Zero or one time" });
        i++;
      }
    } else if (ch === ".") {
      tokens.push({ raw: ".", description: "Match any character (except newline by default)" });
      i++;
    } else if (ch === "^") {
      tokens.push({ raw: "^", description: "Start of string (or line in multiline mode)" });
      i++;
    } else if (ch === "$") {
      tokens.push({ raw: "$", description: "End of string (or line in multiline mode)" });
      i++;
    } else if (ch === "|") {
      tokens.push({ raw: "|", description: "Alternation (OR)" });
      i++;
    } else {
      tokens.push({ raw: ch, description: `Literal "${ch}" character` });
      i++;
    }
  }

  return tokens;
}

export function generateSummary(pattern: string): string {
  const hasEmail = /@\w|\\.\+|@\[/.test(pattern) || (pattern.includes("@") && pattern.includes("\\."));
  const hasUrl = /https?/.test(pattern) || /:\/\/|\\b/.test(pattern);
  const hasPhone = /\\d.*\\d.*\\d/.test(pattern) && (/\(|\+/.test(pattern) || /\{3\}/.test(pattern));
  const hasIp = /\\d.*\\.\\d.*\\.\\d/.test(pattern);
  const hasDate = /\\d{4}/.test(pattern) && /[-/]/.test(pattern);

  if (hasEmail) return "Matches an email address pattern";
  if (hasUrl) return "Matches a URL pattern";
  if (hasPhone) return "Matches a phone number pattern";
  if (hasIp) return "Matches an IPv4 address pattern";
  if (hasDate) return "Matches a date pattern";

  const tokens = explainRegex(pattern);
  const hasAnchors = tokens.some((t) => t.raw === "^" || t.raw === "$");
  const hasGroups = tokens.some((t) => t.raw === "(" || t.raw.startsWith("(?"));
  const hasQuantifiers = tokens.some((t) => ["*", "+", "?", "*?", "+?"].includes(t.raw) || t.raw.startsWith("{"));

  let summary = "Matches ";
  if (hasAnchors) summary += "a string that ";
  if (hasGroups) summary += "captures ";
  if (hasQuantifiers) summary += "repeated ";
  summary += "text matching the specified pattern";

  return summary;
}
