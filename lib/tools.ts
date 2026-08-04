export type ToolCategory = "Developer" | "Text" | "Security" | "Image" | "Color" | "Time";

export type ToolDefinition = {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  accent: string;
  popular?: boolean;
  new?: boolean;
  tags: string[];
};

export const tools: ToolDefinition[] = [
  { slug: "json-formatter", name: "JSON Formatter", description: "Format, minify and validate JSON instantly.", category: "Developer", icon: "{ }", accent: "lime", popular: true, tags: ["json", "format", "validate", "minify"] },
  { slug: "base64", name: "Base64 Studio", description: "Encode and decode text without sending it anywhere.", category: "Developer", icon: "64", accent: "blue", popular: true, tags: ["base64", "encode", "decode"] },
  { slug: "url-codec", name: "URL Encoder", description: "Safely encode or decode URLs and query values.", category: "Developer", icon: "%", accent: "orange", tags: ["url", "uri", "encode", "decode"] },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate one or many secure UUID v4 identifiers.", category: "Developer", icon: "#", accent: "violet", new: true, tags: ["uuid", "guid", "identifier", "random"] },
  { slug: "hash-generator", name: "Hash Generator", description: "Create SHA-256, SHA-384 or SHA-512 hashes locally.", category: "Security", icon: "⌁", accent: "red", tags: ["hash", "sha", "security", "checksum"] },
  { slug: "password-generator", name: "Password Generator", description: "Create strong, customizable passwords and passphrases.", category: "Security", icon: "✦", accent: "lime", popular: true, tags: ["password", "secure", "random", "passphrase"] },
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences and reading time.", category: "Text", icon: "Aa", accent: "blue", popular: true, tags: ["words", "characters", "reading", "writing"] },
  { slug: "case-converter", name: "Case Converter", description: "Switch text between eight useful naming styles.", category: "Text", icon: "aA", accent: "orange", tags: ["uppercase", "lowercase", "camel", "slug"] },
  { slug: "lorem-ipsum", name: "Lorem Ipsum", description: "Generate clean placeholder paragraphs on demand.", category: "Text", icon: "¶", accent: "violet", tags: ["lorem", "placeholder", "copy", "paragraph"] },
  { slug: "regex-tester", name: "Regex Tester", description: "Test expressions with live matches and common flags.", category: "Developer", icon: ".*", accent: "red", new: true, tags: ["regex", "pattern", "match", "developer"] },
  { slug: "color-converter", name: "Color Converter", description: "Convert HEX colors to RGB and HSL with a live preview.", category: "Color", icon: "◒", accent: "orange", popular: true, tags: ["color", "hex", "rgb", "hsl"] },
  { slug: "timestamp-converter", name: "Timestamp Converter", description: "Convert Unix timestamps and human-readable dates.", category: "Time", icon: "◷", accent: "blue", tags: ["unix", "timestamp", "date", "timezone"] },
  { slug: "number-base", name: "Number Base Converter", description: "Convert decimal, binary, octal and hexadecimal values.", category: "Developer", icon: "01", accent: "violet", tags: ["binary", "decimal", "hex", "octal"] },
  { slug: "image-compressor", name: "Image Compressor", description: "Resize and compress images privately in your browser.", category: "Image", icon: "▧", accent: "lime", new: true, tags: ["image", "compress", "resize", "jpeg", "webp"] },
];

export const categories: Array<"All" | ToolCategory> = ["All", "Developer", "Text", "Security", "Image", "Color", "Time"];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
