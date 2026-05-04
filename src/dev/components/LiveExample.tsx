import { Component, type ErrorInfo, type ReactNode } from "react";
import { getLiveExampleEntry } from "../liveExamples/reactExamples";

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
        padding: "1rem",
        borderRadius: 10,
        border: "1px solid #e4e4e7",
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "#71717a" }}>
          LIVE 예제
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#18181b", marginTop: 4 }}>
          {entry.title}
        </div>
        {entry.description ? (
          <span
            style={{ display: "block", marginTop: 6, fontSize: 13, color: "#71717a" }}
          >
            {entry.description}
          </span>
        ) : null}
      </div>
      <div
        style={{
          padding: "1rem",
          borderRadius: 8,
          border: "1px solid #f4f4f5",
          background: "#fafafa",
        }}
      >
        <LiveExampleErrorBoundary>
          <Example />
        </LiveExampleErrorBoundary>
      </div>
      <div style={{ marginTop: 10 }}>
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
