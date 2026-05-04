/**
 * React 학습 홈에서 `reactTestProject` 소스 트리를 펼쳐 보여 줄 때 사용.
 * `chat/` 은 제외 (채팅 예제 비표시).
 */
const rawModules = import.meta.glob<string>("../reactTestProject/**/*", {
  query: "?raw",
  import: "default",
  eager: true,
});

const SOURCE_EXT = /\.(js|jsx|md)$/i;

function stripPrefix(vitePath: string): string {
  return vitePath.replace(/^\.\.\/reactTestProject\//, "");
}

export type ReactTestProjectRawFile = {
  /** `api/client.js` 처럼 reactTestProject 기준 상대 경로 */
  relativePath: string;
  content: string;
};

export function listReactTestProjectSourceFiles(): ReactTestProjectRawFile[] {
  const out: ReactTestProjectRawFile[] = [];
  for (const [vitePath, content] of Object.entries(rawModules)) {
    if (!SOURCE_EXT.test(vitePath)) continue;
    const rel = stripPrefix(vitePath);
    if (rel.startsWith("chat/")) continue;
    out.push({ relativePath: rel, content });
  }
  return out.sort((a, b) =>
    a.relativePath.localeCompare(b.relativePath, "en", { sensitivity: "base" }),
  );
}

/**
 * 폴더별 파일명을 `export const … = { … } as const` 형태의 한 덩어리 JS로 표현한다.
 * 학습 화면에서 highlight.js로 동일한 문법 강조를 적용하기 위함.
 */
export function formatReactTestProjectLayoutAsModule(files: ReactTestProjectRawFile[]): string {
  const byDir = new Map<string, string[]>();
  for (const f of files) {
    const i = f.relativePath.lastIndexOf("/");
    const dir = i === -1 ? "" : f.relativePath.slice(0, i);
    const name = i === -1 ? f.relativePath : f.relativePath.slice(i + 1);
    const arr = byDir.get(dir) ?? [];
    arr.push(name);
    byDir.set(dir, arr);
  }

  const dirs = [...byDir.keys()].sort((a, b) => {
    if (a === "") return -1;
    if (b === "") return 1;
    return a.localeCompare(b, "en", { sensitivity: "base" });
  });

  const lines: string[] = [
    "/**",
    " * @fileoverview src/dev/reactTestProject — 참고 트리 레이아웃 (chat 제외)",
    " * 키: 상대 디렉터리(루트는 \".\"). 값: 그 안의 파일명만.",
    " */",
    "",
    "export const reactTestProjectLayout = {",
  ];

  for (const dir of dirs) {
    const names = [...(byDir.get(dir) ?? [])].sort((a, b) =>
      a.localeCompare(b, "en", { sensitivity: "base" }),
    );
    const keyLit = JSON.stringify(dir === "" ? "." : dir);
    const elems = names.map((n) => JSON.stringify(n)).join(", ");
    lines.push(`  ${keyLit}: [${elems}],`);
  }

  lines.push("} as const;");
  lines.push("");
  lines.push("export type ReactTestProjectDir = keyof typeof reactTestProjectLayout;");

  return lines.join("\n");
}
