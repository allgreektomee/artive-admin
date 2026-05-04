import { Component, type ErrorInfo, type ReactNode, useMemo } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";
import { getLiveExampleEntry } from "../liveExamples/reactExamples";

hljs.registerLanguage("javascript", javascript);

type Props = {
  exampleId: string;
};

class LiveExampleErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("LiveExample render error:", error, info);
  }

  override render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderRadius: 8,
            border: "1px solid #fecaca",
            background: "#fef2f2",
            fontSize: 13,
            color: "#991b1b",
          }}
        >
          예제를 렌더링하는 중 오류가 났습니다: {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

export function LiveExample({ exampleId }: Props) {
  const entry = getLiveExampleEntry(exampleId.trim());
  const Example = entry?.Component;

  const highlighted = useMemo(() => {
    if (!entry?.sourceCode?.trim()) return null;
    try {
      return hljs.highlight(entry.sourceCode, { language: "javascript" }).value;
    } catch {
      return hljs.highlight(entry.sourceCode, { language: "plaintext" }).value;
    }
  }, [entry?.sourceCode]);

  if (!entry || !Example) {
    return (
      <div
        style={{
          margin: "1.25rem 0",
          padding: "1rem",
          borderRadius: 10,
          border: "1px dashed #d4d4d8",
          background: "#fafafa",
        }}
      >
        <span style={{ fontSize: 13, color: "#71717a" }}>
          등록되지 않은 Live 예제 ID입니다: <code>{exampleId}</code>
        </span>
      </div>
    );
  }

  return (
    <section
      style={{
        margin: "1.25rem 0",
        padding: "1.35rem 1.5rem",
        borderRadius: 12,
        border: "1px solid #e4e4e7",
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#71717a" }}>
          LIVE 예제
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#18181b", marginTop: 6 }}>
          {entry.title}
        </div>
        {entry.description ? (
          <span style={{ display: "block", marginTop: 8, fontSize: 14, color: "#71717a", lineHeight: 1.55 }}>
            {entry.description}
          </span>
        ) : null}
      </div>

      <div className="live-example-grid">
        {highlighted ? (
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#71717a",
                marginBottom: 10,
              }}
            >
              예제 코드
            </div>
            <pre className="live-example-code-pre">
              <code className="hljs" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
          </div>
        ) : null}
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#71717a",
              marginBottom: 10,
            }}
          >
            실행 결과
          </div>
          <div className="live-example-result-panel">
            <LiveExampleErrorBoundary>
              <Example />
            </LiveExampleErrorBoundary>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <code
          style={{
            fontSize: 11,
            color: "#71717a",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {entry.id}
        </code>
      </div>
    </section>
  );
}
