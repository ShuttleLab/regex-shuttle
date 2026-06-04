export interface PatternItem {
  name: string;
  regex: string;
  flags: string;
  description: { en: string; zh: string };
  example: string;
  category: string;
}

export const PATTERNS: PatternItem[] = [
  {
    name: "Email",
    regex: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    description: {
      en: "Matches standard email addresses like user@example.com",
      zh: "匹配标准邮箱地址，如 user@example.com",
    },
    example: "Contact us at hello@example.com or support@test.org",
    category: "common",
  },
  {
    name: "URL",
    regex: "https?:\\/\\/[^\\s]+",
    flags: "g",
    description: {
      en: "Matches HTTP and HTTPS URLs",
      zh: "匹配 HTTP 和 HTTPS 网址",
    },
    example: "Visit https://example.com or http://test.org/path?q=1",
    category: "common",
  },
  {
    name: "Phone",
    regex: "(\\+\\d{1,3}[- ]?)?\\(?\\d{3}\\)?[- ]?\\d{3}[- ]?\\d{4}",
    flags: "g",
    description: {
      en: "Matches US phone numbers with optional country code",
      zh: "匹配美国电话号码，可选国际区号",
    },
    example: "Call +1 (555) 123-4567 or 555-987-6543",
    category: "common",
  },
  {
    name: "IPv4",
    regex: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b",
    flags: "g",
    description: {
      en: "Matches IPv4 addresses like 192.168.1.1",
      zh: "匹配 IPv4 地址，如 192.168.1.1",
    },
    example: "Server at 192.168.1.1 and gateway 10.0.0.1",
    category: "dev",
  },
  {
    name: "Date",
    regex: "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])",
    flags: "g",
    description: {
      en: "Matches dates in YYYY-MM-DD format",
      zh: "匹配 YYYY-MM-DD 格式的日期",
    },
    example: "Born on 1990-05-15, updated 2024-12-31",
    category: "common",
  },
  {
    name: "Time",
    regex: "([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?",
    flags: "g",
    description: {
      en: "Matches 24-hour time format (HH:MM or HH:MM:SS)",
      zh: "匹配 24 小时制时间格式（HH:MM 或 HH:MM:SS）",
    },
    example: "Meeting at 14:30, alarm 07:00:00",
    category: "common",
  },
  {
    name: "Hex Color",
    regex: "#[0-9a-fA-F]{3,8}",
    flags: "gi",
    description: {
      en: "Matches hex color codes (#RGB, #RRGGBB, #RRGGBBAA)",
      zh: "匹配十六进制颜色代码（#RGB、#RRGGBB、#RRGGBBAA）",
    },
    example: "Colors: #fff, #ff5733, #000000ff",
    category: "dev",
  },
  {
    name: "HTML Tag",
    regex: "<([a-z]+)([^>]*)>(.*?)<\\/\\1>",
    flags: "gsi",
    description: {
      en: "Matches HTML tags with their content",
      zh: "匹配 HTML 标签及其内容",
    },
    example: "<div class='test'>Hello</div> and <p>World</p>",
    category: "dev",
  },
  {
    name: "Credit Card",
    regex: "\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}",
    flags: "g",
    description: {
      en: "Matches credit card number patterns",
      zh: "匹配信用卡号码格式",
    },
    example: "Card: 4111-1111-1111-1111 or 4111 1111 1111 1111",
    category: "common",
  },
  {
    name: "UUID",
    regex: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
    flags: "gi",
    description: {
      en: "Matches UUID/GUID format",
      zh: "匹配 UUID/GUID 格式",
    },
    example: "ID: 550e8400-e29b-41d4-a716-446655440000",
    category: "dev",
  },
  {
    name: "Slug",
    regex: "[a-z0-9]+(?:-[a-z0-9]+)*",
    flags: "g",
    description: {
      en: "Matches URL-friendly slug strings",
      zh: "匹配 URL 友好的 slug 字符串",
    },
    example: "my-blog-post and hello-world-123",
    category: "dev",
  },
  {
    name: "Username",
    regex: "^[a-zA-Z0-9_-]{3,20}$",
    flags: "m",
    description: {
      en: "Matches usernames (3-20 chars, alphanumeric, underscore, hyphen)",
      zh: "匹配用户名（3-20 个字符，字母、数字、下划线、连字符）",
    },
    example: "user_name and John-Doe and admin123",
    category: "validation",
  },
  {
    name: "Strong Password",
    regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    flags: "m",
    description: {
      en: "Requires uppercase, lowercase, digit, special char, min 8 chars",
      zh: "要求大小写字母、数字、特殊字符，最少 8 个字符",
    },
    example: "P@ssw0rd and Str0ng!Pass",
    category: "validation",
  },
  {
    name: "US Zip Code",
    regex: "^\\d{5}(-\\d{4})?$",
    flags: "m",
    description: {
      en: "Matches US ZIP codes (5-digit or ZIP+4)",
      zh: "匹配美国邮编（5 位或 ZIP+4 格式）",
    },
    example: "90210 and 10001-1234",
    category: "common",
  },
];

export const PATTERN_CATEGORIES = [
  { id: "common", label: { en: "Common", zh: "常用" } },
  { id: "dev", label: { en: "Developer", zh: "开发" } },
  { id: "validation", label: { en: "Validation", zh: "验证" } },
] as const;
