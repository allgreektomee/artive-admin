const outlineModules = import.meta.glob("../content/js-blog-es6-outline.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const articleModules = import.meta.glob("../content/javascript/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const serverDocModules = import.meta.glob("../content/server/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const JAVASCRIPT_PARTS = [
  { id: 1 as const, slug: "part-1-basics", title: "JavaScript 기본기" },
  {
    id: 2 as const,
    slug: "part-2-standard-library",
    title: "표준 라이브러리와 고급 문법",
  },
  {
    id: 3 as const,
    slug: "part-3-runtime-and-tools",
    title: "실행 환경과 실무 JavaScript",
  },
];

export type OutlinePart = {
  id: 1 | 2 | 3;
  headingLine: string;
  body: string;
};

export type JavaScriptPartSlug = (typeof JAVASCRIPT_PARTS)[number]["slug"];

export type JavaScriptArticle = {
  partId: 1 | 2 | 3;
  partSlug: JavaScriptPartSlug;
  partTitle: string;
  slug: string;
  title: string;
  order: number;
  body: string;
  href: string;
};

export type JavaScriptArticleGroup = {
  id: 1 | 2 | 3;
  slug: JavaScriptPartSlug;
  title: string;
  articles: JavaScriptArticle[];
};

export type ServerDoc = {
  slug: string;
  title: string;
  order: number;
  body: string;
  href: string;
};

function getOutlineRaw(): string {
  const keys = Object.keys(outlineModules);
  if (keys.length === 0) return "# 목차\n\n내용이 없습니다.\n";
  const first = keys[0];
  return first ? outlineModules[first] : "";
}

function findPartIndex(md: string, part: 1 | 2 | 3): number {
  return md.indexOf(`## ${part}부.`);
}

function endOfCurrentSection(md: string, start: number): number {
  const lineEnd = md.indexOf("\n", start);
  const searchFrom = lineEnd === -1 ? start : lineEnd;
  const idx = md.indexOf("\n## ", searchFrom);
  return idx === -1 ? md.length : idx;
}

export function readOutlineMarkdown(): string {
  return getOutlineRaw();
}

export function getPreamble(md: string): string {
  const i1 = findPartIndex(md, 1);
  if (i1 === -1) return md;
  return md.slice(0, i1).trimEnd();
}

export function getPart(md: string, part: 1 | 2 | 3): OutlinePart | null {
  const start = findPartIndex(md, part);
  if (start === -1) return null;

  const end = endOfCurrentSection(md, start);
  const block = md.slice(start, end).trim();
  const firstNl = block.indexOf("\n");
  const headingLine =
    firstNl === -1 ? block : block.slice(0, firstNl).trim();
  return { id: part, headingLine, body: block };
}

export function listParts(md: string): OutlinePart[] {
  return ([1, 2, 3] as const)
    .map((id) => getPart(md, id))
    .filter((p): p is OutlinePart => p != null);
}

function titleFromMarkdown(md: string, fallback: string): string {
  const heading = md
    .split("\n")
    .find((line) => line.startsWith("# ") && line.trim().length > 2);
  return heading?.replace(/^#\s+/, "").trim() || fallback;
}

function orderFromSlug(slug: string): number {
  const order = Number(slug.match(/^\d+/)?.[0]);
  return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

let articlesCache: JavaScriptArticle[] | null = null;
let serverDocsCache: ServerDoc[] | null = null;

function buildArticles(): JavaScriptArticle[] {
  const list: JavaScriptArticle[] = [];
  for (const [path, raw] of Object.entries(articleModules)) {
    if (path.includes("README.md")) continue;
    const m = path.match(/javascript\/([^/]+)\/([^/]+)\.md$/i);
    if (!m) continue;
    const partSlug = m[1] as JavaScriptPartSlug;
    const slug = m[2]!;
    const part = JAVASCRIPT_PARTS.find((p) => p.slug === partSlug);
    if (!part) continue;
    const body = raw as string;
    list.push({
      partId: part.id,
      partSlug: part.slug,
      partTitle: part.title,
      slug,
      title: titleFromMarkdown(body, slug),
      order: orderFromSlug(slug),
      body,
      href: `/dev?tab=js&ps=${encodeURIComponent(part.slug)}&as=${encodeURIComponent(slug)}`,
    });
  }
  return list.sort(
    (a, b) => a.order - b.order || a.slug.localeCompare(b.slug, "en"),
  );
}

function allArticles(): JavaScriptArticle[] {
  if (!articlesCache) articlesCache = buildArticles();
  return articlesCache;
}

export function listJavaScriptArticles(): JavaScriptArticle[] {
  return allArticles();
}

export function listJavaScriptArticleGroups(): JavaScriptArticleGroup[] {
  return JAVASCRIPT_PARTS.map((part) => ({
    ...part,
    articles: allArticles()
      .filter((a) => a.partSlug === part.slug)
      .sort(
        (a, b) => a.order - b.order || a.slug.localeCompare(b.slug, "en"),
      ),
  }));
}

export function getJavaScriptArticle(
  partSlug: string,
  articleSlug: string,
): JavaScriptArticle | null {
  return (
    allArticles().find(
      (a) => a.partSlug === partSlug && a.slug === articleSlug,
    ) ?? null
  );
}

function serverDocOrder(slug: string): number {
  if (slug.includes("tomcat")) return 1;
  if (slug.includes("nginx")) return 2;
  if (slug.includes("redis")) return 3;
  return Number.MAX_SAFE_INTEGER;
}

function buildServerDocs(): ServerDoc[] {
  const docs: ServerDoc[] = [];
  for (const [path, raw] of Object.entries(serverDocModules)) {
    if (path.includes("README.md")) continue;
    const m = path.match(/server\/([^/]+)\.md$/i);
    if (!m) continue;

    const slug = m[1]!;
    const body = raw as string;
    docs.push({
      slug,
      title: titleFromMarkdown(body, slug),
      order: serverDocOrder(slug),
      body,
      href: `/dev?tab=server&sd=${encodeURIComponent(slug)}`,
    });
  }

  return docs.sort(
    (a, b) => a.order - b.order || a.slug.localeCompare(b.slug, "en"),
  );
}

function allServerDocs(): ServerDoc[] {
  if (!serverDocsCache) serverDocsCache = buildServerDocs();
  return serverDocsCache;
}

export function listServerDocs(): ServerDoc[] {
  return allServerDocs();
}

export function getServerDoc(slug: string): ServerDoc | null {
  return allServerDocs().find((doc) => doc.slug === slug) ?? null;
}
