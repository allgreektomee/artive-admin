import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { highlightDevSource } from "../lib/highlightDevSource";
import {
  listReactTestProjectRefsForDocSlug,
  REACT_TEST_PROJECT_WALKTHROUGH_SLUG,
} from "../lib/reactTestProjectChapterRefs";
import { getReactTestProjectRawContent } from "../lib/reactTestProjectSources";

const { Text, Title } = Typography;

type Props = {
  docSlug: string;
};

type RefRow = { path: string; note: string };

function groupRefsByTopFolder(files: RefRow[]) {
  const groups = new Map<string, RefRow[]>();
  for (const f of files) {
    const top = f.path.includes("/") ? (f.path.split("/")[0] ?? "(root)") : "(root)";
    const arr = groups.get(top) ?? [];
    arr.push(f);
    groups.set(top, arr);
  }
  return [...groups.entries()].sort((a, b) => {
    if (a[0] === "(root)") return -1;
    if (b[0] === "(root)") return 1;
    return a[0].localeCompare(b[0], "en");
  });
}

export function ReactTestProjectChapterPanel({ docSlug }: Props) {
  const refs = useMemo(() => listReactTestProjectRefsForDocSlug(docSlug), [docSlug]);

  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPath((prev) => {
      if (prev != null && refs.some((r) => r.path === prev)) return prev;
      return refs[0]?.path ?? null;
    });
  }, [refs]);

  const sourcesByTopFolder = useMemo(() => groupRefsByTopFolder(refs), [refs]);

  const selectedRaw = selectedPath ? getReactTestProjectRawContent(selectedPath) : null;
  const selectedHtml = useMemo(() => {
    if (!selectedPath || selectedRaw == null) return "";
    return highlightDevSource(selectedPath, selectedRaw);
  }, [selectedPath, selectedRaw]);

  if (docSlug !== REACT_TEST_PROJECT_WALKTHROUGH_SLUG || refs.length === 0) {
    return null;
  }

  return (
    <section className="react-test-project-chapter-panel" style={{ marginTop: 28 }}>
      <Title level={4} style={{ marginBottom: 6 }}>
        reactTestProject — 전체 소스 (샘플 예제 분석)
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 14 }}>
        <code>src/dev/reactTestProject</code> 의 파일을 트리에서 고른 뒤 아래에{" "}
        <strong>원문 전체</strong>가 열립니다. JavaScript·JSX·Markdown은 highlight.js로 색을 입혔다. 데모
        실행: <Link to="/dev/react-test/artworks">/dev/react-test/artworks</Link>
      </Text>

      <div className="react-test-project-files-list">
        {sourcesByTopFolder.map(([folder, rows]) => (
          <div key={folder} className="react-test-project-tree-block">
            <div className="react-test-project-tree-folder">
              {folder === "(root)" ? "(루트)" : `${folder}/`}
            </div>
            <div className="react-test-project-tree-files">
              {rows.map((r) => (
                <button
                  key={r.path}
                  type="button"
                  className={
                    selectedPath === r.path
                      ? "react-test-project-tree-item react-test-project-tree-item--selected"
                      : "react-test-project-tree-item"
                  }
                  onClick={() => setSelectedPath(r.path)}
                  title={r.note}
                >
                  {r.path}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="react-test-project-source-pane" style={{ marginTop: 14 }}>
        <div className="react-test-project-source-pane-head">
          {selectedPath ? (
            <>
              <code>{selectedPath}</code>
              <Text type="secondary" style={{ display: "block", fontSize: 12, marginTop: 6 }}>
                {refs.find((r) => r.path === selectedPath)?.note}
              </Text>
            </>
          ) : (
            <span className="react-test-project-source-pane-placeholder">파일을 선택하세요</span>
          )}
        </div>
        {selectedPath && selectedRaw != null ? (
          <pre className="react-live-source-file-pre react-test-project-source-pane-pre">
            <code className="hljs" dangerouslySetInnerHTML={{ __html: selectedHtml }} />
          </pre>
        ) : (
          <Text type="secondary">원문을 불러오지 못했습니다.</Text>
        )}
      </div>
    </section>
  );
}
