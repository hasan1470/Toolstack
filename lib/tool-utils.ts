/** Strict, bounded PDF page selection. Preserve the requested order and deduplicate. */
export function parsePageSelection(value: string, max: number): number[] {
  if (!Number.isSafeInteger(max) || max < 1 || !value.trim()) throw new Error("Choose at least one page.");
  const pages = new Set<number>();
  for (const part of value.split(",")) {
    const match = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!match) throw new Error("Use page numbers or ranges, for example 1-3,5.");
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 1 || end < start || end > max) {
      throw new Error(`Use whole page numbers between 1 and ${max}.`);
    }
    for (let page = start; page <= end; page++) pages.add(page - 1);
  }
  return [...pages];
}

export function parseBaseInteger(value: string, base: number): bigint | null {
  const patterns: Record<number, RegExp> = { 2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^\d+$/, 16: /^[\da-f]+$/i };
  const text = value.trim();
  const negative = text.startsWith("-");
  const digits = text.replace(/^[+-]/, "");
  if (!patterns[base]?.test(digits)) return null;
  const prefixes: Record<number, string> = { 2: "0b", 8: "0o", 10: "", 16: "0x" };
  const number = BigInt(prefixes[base] + digits);
  return negative ? -number : number;
}

/** Storage restrictions or old/corrupt preferences must never stop a tool. */
export function readPreference(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
export function writePreference(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* Keep the current session usable. */ }
}
export function readList(key: string): string[] {
  try {
    const value: unknown = JSON.parse(readPreference(key) || "[]");
    return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === "string"))] : [];
  } catch { return []; }
}

/** Rejection sampling avoids the modulo bias of randomValue % poolSize. */
export function randomIndex(max: number): number {
  if (!Number.isInteger(max) || max < 1 || max > 0xffffffff) throw new Error("Invalid random range.");
  const limit = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);
  do { crypto.getRandomValues(buffer); } while (buffer[0] >= limit);
  return buffer[0] % max;
}

export function generatePassword(length: number, groups: string[]): string {
  if (!groups.length || groups.some(group => !group.length) || !Number.isInteger(length) || length < groups.length || length > 256) throw new Error("Invalid password settings.");
  const pool = groups.join("");
  const chars = groups.map(group => group[randomIndex(group.length)]);
  while (chars.length < length) chars.push(pool[randomIndex(pool.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}
