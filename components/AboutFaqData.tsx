type Bilingual = { zh: string; en: string };
type HowTo = { id: string; name: Bilingual; steps: Bilingual[] };
type FaqItem = { q: Bilingual; a: Bilingual };
type Persona = { name: Bilingual; icon: string; description: Bilingual };
type UseCase = {
  scenario: Bilingual;
  before: Bilingual;
  after: Bilingual;
};

export const WHO_FOR: Persona[] = [
  {
    name: { zh: "后端开发者", en: "Backend Developers" },
    icon: "🖥️",
    description: {
      zh: "在编写服务器端验证、日志解析或数据提取逻辑时，使用 Regex Shuttle 即时测试和调试正则表达式，无需反复运行单元测试。",
      en: "Instantly test and debug regex patterns for server-side validation, log parsing, or data extraction without repeatedly running unit tests.",
    },
  },
  {
    name: { zh: "前端开发者", en: "Frontend Developers" },
    icon: "🌐",
    description: {
      zh: "在构建表单验证、输入格式化或文本高亮功能时，实时预览正则匹配效果，确保客户端逻辑正确无误。",
      en: "Preview regex matches in real-time while building form validation, input formatting, or text highlighting features.",
    },
  },
  {
    name: { zh: "数据分析师", en: "Data Analysts" },
    icon: "📊",
    description: {
      zh: "清洗和转换数据集时，用正则表达式提取、替换和重构文本字段。在浏览器中本地处理，数据不会离开您的设备。",
      en: "Extract, replace, and restructure text fields when cleaning datasets. Process locally in your browser — your data never leaves your device.",
    },
  },
  {
    name: { zh: "学生与初学者", en: "Students & Beginners" },
    icon: "🎓",
    description: {
      zh: "通过逐 token 的自然语言解释和即时匹配反馈学习正则表达式。内置模式库和速查表帮助你快速上手。",
      en: "Learn regex through token-by-token natural language explanations and instant match feedback. The built-in pattern library and cheat sheet help you get started quickly.",
    },
  },
];

export const USE_CASES: UseCase[] = [
  {
    scenario: {
      zh: "验证用户输入（邮箱、手机号、URL）",
      en: "Validating user input (email, phone, URL)",
    },
    before: {
      zh: "编写正则后部署到服务器，通过 API 测试才知道是否匹配，迭代周期长",
      en: "Write regex, deploy to server, test via API to check matches — long iteration cycle",
    },
    after: {
      zh: "在 Regex Shuttle 中实时测试，秒级迭代，确认无误后直接复制到代码中",
      en: "Test in Regex Shuttle in real-time, iterate in seconds, copy directly to code when ready",
    },
  },
  {
    scenario: {
      zh: "解析服务器日志提取关键信息",
      en: "Parsing server logs to extract key information",
    },
    before: {
      zh: "在命令行用 grep 测试正则，反复调整参数，结果不够直观",
      en: "Test regex with grep in CLI, repeatedly adjust parameters, results are not visual enough",
    },
    after: {
      zh: "粘贴日志样例，高亮显示匹配结果，附带捕获组和索引详情",
      en: "Paste log samples, see highlighted matches with capture groups and index details",
    },
  },
  {
    scenario: {
      zh: "理解同事编写的复杂正则",
      en: "Understanding a complex regex written by a colleague",
    },
    before: {
      zh: "花大量时间阅读正则语法文档，逐字符手动分析含义",
      en: "Spend significant time reading regex docs, manually analyzing each character",
    },
    after: {
      zh: "粘贴正则到解释器，获得逐 token 的英文解释和整体摘要",
      en: "Paste regex into the explainer, get token-by-token English explanation and overall summary",
    },
  },
  {
    scenario: {
      zh: "在文本数据中批量查找和替换",
      en: "Batch find-and-replace in text data",
    },
    before: {
      zh: "使用编辑器的查找替换功能，无法使用捕获组引用，需要手动逐个替换",
      en: "Use editor's find-replace, no capture group references, manual replacement one by one",
    },
    after: {
      zh: "使用替换测试功能，支持 $1、$2 捕获组引用，实时预览替换结果",
      en: "Use substitution testing with $1, $2 capture group references, real-time replacement preview",
    },
  },
  {
    scenario: {
      zh: "快速查找常用正则模式",
      en: "Quickly finding common regex patterns",
    },
    before: {
      zh: "在搜索引擎和 Stack Overflow 间来回跳转，筛选过时或不可靠的答案",
      en: "Bounce between search engines and Stack Overflow, filtering outdated or unreliable answers",
    },
    after: {
      zh: "浏览内置模式库，按分类筛选，一键复制或跳转到测试页面",
      en: "Browse built-in Pattern Library, filter by category, one-click copy or jump to tester",
    },
  },
];

export const HOWTOS: HowTo[] = [
  {
    id: "test-regex",
    name: {
      zh: "如何测试正则表达式",
      en: "How to test a regular expression",
    },
    steps: [
      {
        zh: "打开 Regex Shuttle 网站（regex.shuttlelab.org）",
        en: "Open the Regex Shuttle website (regex.shuttlelab.org)",
      },
      {
        zh: "在「正则表达式」输入框中输入你的正则模式，如 \\d+@[a-z]+\\.com",
        en: "Type your regex pattern in the 'Regular Expression' field, e.g. \\d+@[a-z]+\\.com",
      },
      {
        zh: "在「测试字符串」区域粘贴或输入要匹配的文本",
        en: "Paste or type the text to match against in the 'Test String' area",
      },
      {
        zh: "查看实时高亮的匹配结果、分组信息和索引位置",
        en: "View real-time highlighted matches, group information, and index positions",
      },
    ],
  },
  {
    id: "use-pattern-library",
    name: {
      zh: "如何使用模式库",
      en: "How to use the Pattern Library",
    },
    steps: [
      {
        zh: "导航到「模式库」页面",
        en: "Navigate to the 'Pattern Library' page",
      },
      {
        zh: "按分类浏览：常用、开发者、验证等",
        en: "Browse by category: Common, Developer, Validation, etc.",
      },
      {
        zh: "点击「复制模式」直接复制正则到剪贴板",
        en: "Click 'Copy Pattern' to copy the regex directly to your clipboard",
      },
      {
        zh: "点击「测试模式」跳转到测试页面并自动填入该正则",
        en: "Click 'Test Pattern' to jump to the tester with the regex pre-filled",
      },
    ],
  },
  {
    id: "use-explainer",
    name: {
      zh: "如何使用正则解释器",
      en: "How to use the Regex Explainer",
    },
    steps: [
      {
        zh: "导航到「正则解释器」页面",
        en: "Navigate to the 'Regex Explainer' page",
      },
      {
        zh: "输入任意正则表达式，如 ^(?=.*[A-Z])(?=.*\\d).{8,}$",
        en: "Enter any regex, e.g. ^(?=.*[A-Z])(?=.*\\d).{8,}$",
      },
      {
        zh: "查看逐 token 的英文解释和整体摘要",
        en: "View token-by-token English explanation and overall summary",
      },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    q: {
      zh: "Regex Shuttle 是免费的吗？",
      en: "Is Regex Shuttle free?",
    },
    a: {
      zh: "是的，Regex Shuttle 完全免费，没有任何隐藏费用。所有功能都可以无限制使用，无需注册账户。",
      en: "Yes, Regex Shuttle is completely free with no hidden costs. All features can be used without limits and without creating an account.",
    },
  },
  {
    q: {
      zh: "我的正则表达式会被上传到服务器吗？",
      en: "Are my regular expressions uploaded to a server?",
    },
    a: {
      zh: "不会。Regex Shuttle 的所有处理都在您的浏览器中本地完成，使用 JavaScript 内置的 RegExp 引擎。您的正则和测试数据永远不会离开您的设备。",
      en: "No. All processing in Regex Shuttle happens locally in your browser using JavaScript's built-in RegExp engine. Your patterns and test data never leave your device.",
    },
  },
  {
    q: {
      zh: "支持哪些正则表达式功能？",
      en: "What regex features are supported?",
    },
    a: {
      zh: "Regex Shuttle 支持标准 JavaScript 正则表达式功能，包括捕获组、前瞻/后顾断言、命名捕获组和 Unicode 模式。标志切换面板提供五个常用标志：g（全局，查找所有匹配）、i（忽略大小写）、m（多行，^ 和 $ 匹配行边界）、s（dotAll，. 匹配换行符）和 u（Unicode）。",
      en: "Regex Shuttle supports standard JavaScript regular expression features, including capturing groups, lookahead/lookbehind assertions, named capturing groups, and Unicode patterns. The flag toggles offer five commonly used flags: g (global, find all matches), i (case-insensitive), m (multiline, where ^ and $ match line boundaries), s (dotAll, where . matches newlines), and u (Unicode).",
    },
  },
  {
    q: {
      zh: "正则解释器支持哪些语言？",
      en: "What languages does the Regex Explainer support?",
    },
    a: {
      zh: "目前正则解释器提供英文解释。界面支持英文和中文两种语言。",
      en: "Currently the Regex Explainer provides explanations in English. The interface supports both English and Chinese languages.",
    },
  },
  {
    q: {
      zh: "我可以离线使用 Regex Shuttle 吗？",
      en: "Can I use Regex Shuttle offline?",
    },
    a: {
      zh: "首次加载后，Regex Shuttle 可以在浏览器中离线使用。所有核心功能（测试、替换、解释）都完全在客户端运行，不需要网络连接。",
      en: "After the initial load, Regex Shuttle can work offline in your browser. All core features (testing, substitution, explanation) run entirely client-side and don't require a network connection.",
    },
  },
  {
    q: {
      zh: "Regex Shuttle 和其他在线正则测试工具有什么区别？",
      en: "What's the difference between Regex Shuttle and other online regex testers?",
    },
    a: {
      zh: "Regex Shuttle 的核心优势是隐私保护——所有处理都在浏览器本地完成，不上传任何数据。同时提供正则解释器、模式库、替换测试和速查表等完整工具集，且完全免费，无需注册。",
      en: "Regex Shuttle's key advantage is privacy — all processing happens locally in the browser with no data uploads. It also provides a complete toolset including a Regex Explainer, Pattern Library, substitution testing, and cheat sheet, all completely free with no registration required.",
    },
  },
  {
    q: {
      zh: "Regex Shuttle 如何展示捕获组？",
      en: "How does Regex Shuttle display capture groups?",
    },
    a: {
      zh: "每个匹配结果都会单独列出其捕获组。对于编号组（如 (\\d+)），Regex Shuttle 显示组的文本内容及其在原字符串中的索引位置。对于命名捕获组（如 (?<year>\\d{4})），还会同时显示组名，方便你确认引用是否正确。当你使用全局标志 g 时，每一个匹配都会展开显示各自的分组明细，让你一眼看清正则在整段文本中的实际捕获情况。",
      en: "Every match lists its capture groups individually. For numbered groups such as (\\d+), Regex Shuttle shows the captured text along with its index position in the original string. For named capture groups such as (?<year>\\d{4}), the group name is shown alongside the text so you can verify your references are correct. When you use the global g flag, every match expands to show its own group details, letting you see exactly what the pattern captures across the entire input.",
    },
  },
  {
    q: {
      zh: "为什么 Regex Shuttle 的结果可能与 PCRE 或 Python 不同？",
      en: "Why might Regex Shuttle's results differ from PCRE or Python?",
    },
    a: {
      zh: "Regex Shuttle 使用浏览器内置的 JavaScript RegExp 引擎，而非 PCRE、Python re 或 .NET 等其他正则方言。它们在语法和行为上存在差异，例如 JavaScript 对原子组、占有量词和递归的支持有限，转义和 Unicode 属性的处理也不尽相同。好处是：你在这里测试的就是 Node.js 和浏览器实际运行的引擎，所见即所得。如果你的代码运行在其他语言中，请以那门语言的正则文档为准。",
      en: "Regex Shuttle uses the browser's built-in JavaScript RegExp engine, not PCRE, Python's re, or .NET. These dialects differ in syntax and behavior — for example, JavaScript has limited support for atomic groups, possessive quantifiers, and recursion, and it handles escapes and Unicode properties differently. The upside: what you test here is exactly the engine that Node.js and browsers run, so the results match production. If your code runs in another language, defer to that language's regex documentation.",
    },
  },
];

export const COMPARISON = {
  zh: {
    heading: "Regex Shuttle 与同类工具对比（截至 2026-06）",
    columns: ["功能", "Regex Shuttle", "regex101.com", "regexr.com"],
    rows: [
      ["100% 本地处理", "✓", "✗", "✗"],
      ["无需注册", "✓", "✓", "✓"],
      ["正则解释器", "✓", "✓", "✓"],
      ["替换测试", "✓", "✓", "✓"],
      ["内置模式库", "✓", "✗", "✗"],
      ["正则速查表", "✓", "✗", "✓"],
      ["离线使用", "✓", "✗", "✗"],
      ["双语界面（中/英）", "✓", "✗", "✗"],
      ["完全免费无限制", "✓", "✓", "✓"],
    ],
  },
  en: {
    heading: "Regex Shuttle vs Similar Tools (as of 2026-06)",
    columns: ["Feature", "Regex Shuttle", "regex101.com", "regexr.com"],
    rows: [
      ["100% Local Processing", "✓", "✗", "✗"],
      ["No Registration Required", "✓", "✓", "✓"],
      ["Regex Explainer", "✓", "✓", "✓"],
      ["Substitution Testing", "✓", "✓", "✓"],
      ["Built-in Pattern Library", "✓", "✗", "✗"],
      ["Regex Cheat Sheet", "✓", "✗", "✓"],
      ["Offline Use", "✓", "✗", "✗"],
      ["Bilingual UI (EN/ZH)", "✓", "✗", "✗"],
      ["Completely Free", "✓", "✓", "✓"],
    ],
  },
};

export const HEADINGS = {
  whoFor: { zh: "谁在使用 Regex Shuttle？", en: "Who uses Regex Shuttle?" },
  whenUse: {
    zh: "何时使用 Regex Shuttle？",
    en: "When should I use Regex Shuttle?",
  },
  faq: { zh: "常见问题", en: "Frequently Asked Questions" },
};

export const aboutFaqData = { FAQS, HOWTOS, COMPARISON };
