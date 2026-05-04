import { useMemo } from "react";
import { Typography } from "antd";
import { highlightDevSource } from "../lib/highlightDevSource";
import {
  listReactTestProjectRefsForDocSlug,
} from "../lib/reactTestProjectChapterRefs";
import { getReactTestProjectRawContent } from "../lib/reactTestProjectSources";

const { Text, Title } = Typography;

type Props = {
  docSlug: string;
};

export function ReactTestProjectChapterPanel({ docSlug }: Props) {
  const refs = useMemo(() => listReactTestProjectRefsForDocSlug(docSlug), [docSlug]);

  if (refs.length === 0) {
    if (docSlug === "15-websocket-realtime") {
      return (
        <section className="react-test-project-chapter-panel" style={{ marginTop: 28 }}>
          <Title level={4} style={{ marginBottom: 8 }}>
            reactTestProject
          </Title>
          <Text type="secondary">
            이 장(WebSocket·실시간)은 <code>src/dev/reactTestProject</code> 범위에 넣지 않았다. 본문과{" "}
            <code>src/etc</code> 채팅·훅 코드를 참고하면 된다.
          </Text>
        </section>
      );
    }
    return null;
  }

  return (
    <section className="react-test-project-chapter-panel" style={{ marginTop: 28 }}>
      <Title level={4} style={{ marginBottom: 6 }}>
        reactTestProject 전체 코드 (이 장 연계 파일)
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        아래는 <code>src/dev/reactTestProject</code> 의 파일{" "}
        <strong>원문 전체</strong>이며, JavaScript·JSX·Markdown은 highlight.js로 색을 입혔다. React 탭 홈의
        「소스 보기」 트리에서도 동일 파일을 고를 수 있다.
      </Text>
      {refs.map(({ path, note }) => {
        const raw = getReactTestProjectRawContent(path);
        if (raw == null) return null;
        const html = highlightDevSource(path, raw);
        return (
          <div key={path} className="react-test-project-chapter-file" style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 8 }}>
              <code style={{ fontSize: "0.9em" }}>{path}</code>
              <Text type="secondary" style={{ display: "block", fontSize: 12, marginTop: 4 }}>
                {note}
              </Text>
            </div>
            <pre
              className="live-example-code-pre react-test-project-chapter-pre"
              style={{ margin: 0, maxHeight: "min(85vh, 56rem)" }}
            >
              <code className="hljs" dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
          </div>
        );
      })}
    </section>
  );
}
