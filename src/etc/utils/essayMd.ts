export type EssayMeta = {
  slug: string;
  title: string;
  excerpt: string;
};

export type Essay = EssayMeta & {
  content: string;
};

function filenameToSlug(filePath: string) {
  // filePath looks like "../file/NAME.md" (from import.meta.glob keys)
  return filePath.split("/").pop()?.replace(/\.md$/i, "") ?? filePath;
}

function normalizeNewlines(s: string) {
  return s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function buildExcerpt(markdownBody: string, maxChars = 140) {
  const text = markdownBody
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/[#>*_~|-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trim()}…`;
}

function parseEssay(slug: string, raw: string): Essay {
  const normalized = normalizeNewlines(raw).trim();
  const lines = normalized.split("\n");
  const title = (lines[0] ?? slug).trim();
  const body = lines.slice(1).join("\n").trim();
  const excerpt = buildExcerpt(body);

  return { slug, title, excerpt, content: body };
}

// Vite: `?raw`로 마크다운을 문자열로만 번들(파싱하지 않음)
const modules = import.meta.glob("../file/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const essays: Essay[] = Object.entries(modules)
  .map(([path, raw]) => parseEssay(filenameToSlug(path), raw))
  // deterministic order: by slug (files are named ch01..ch05)
  .sort((a, b) => a.slug.localeCompare(b.slug, "en"));

export function getEssays(): Essay[] {
  return essays;
}

export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find((e) => e.slug === slug);
}

