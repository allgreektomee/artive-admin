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
