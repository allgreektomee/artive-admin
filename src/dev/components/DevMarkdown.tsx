import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import { splitMarkdownByExecutionResults } from "../lib/splitMarkdownByExecutionResults";

type Props = {
  source: string;
  className?: string;
  collapseExecutionResults?: boolean;
};

const markdownPlugins = {
  remark: [remarkGfm],
  rehype: [rehypeHighlight],
};

function ExecutionResultBlock({ code, info }: { code: string; info: string }) {
  return (
    <details className="dev-docs-exec" style={{ margin: "1.25rem 0" }}>
      <summary
        style={{
          cursor: "pointer",
          padding: "0.65rem 1rem",
          borderRadius: "0.5rem",
          border: "1px solid #e4e4e7",
          background: "#fafafa",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "#3f3f46",
        }}
      >
        <span style={{ marginRight: "0.35rem", color: "#a1a1aa" }} aria-hidden>
          ▸
        </span>
        실행 결과 보기
        {info ? (
          <code
            style={{
              marginLeft: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: 400,
              padding: "0.1rem 0.35rem",
              borderRadius: "0.25rem",
              background: "#e4e4e7",
            }}
          >
            {info}
          </code>
        ) : null}
      </summary>
      <div
        style={{
          marginTop: "0.5rem",
          padding: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid #e4e4e7",
          background: "#fff",
        }}
      >
        <pre
          style={{
            margin: 0,
            overflow: "auto",
            fontSize: "0.8125rem",
            lineHeight: 1.55,
            color: "#27272a",
          }}
        >
          <code>{code.replace(/\s+$/, "")}</code>
        </pre>
      </div>
    </details>
  );
}

export function DevMarkdown({
  source,
  className = "dev-docs-prose",
  collapseExecutionResults = true,
}: Props) {
  if (!collapseExecutionResults) {
    return (
      <article className={className}>
        <ReactMarkdown
          remarkPlugins={markdownPlugins.remark}
          rehypePlugins={markdownPlugins.rehype}
        >
          {source}
        </ReactMarkdown>
      </article>
    );
  }

  const segments = splitMarkdownByExecutionResults(source);

  if (segments.length === 1 && segments[0].type === "markdown") {
    return (
      <article className={className}>
        <ReactMarkdown
          remarkPlugins={markdownPlugins.remark}
          rehypePlugins={markdownPlugins.rehype}
        >
          {segments[0].body}
        </ReactMarkdown>
      </article>
    );
  }

  return (
    <article className={className}>
      {segments.map((seg, i) => (
        <Fragment key={i}>
          {seg.type === "markdown" ? (
            seg.body.trim() ? (
              <ReactMarkdown
                remarkPlugins={markdownPlugins.remark}
                rehypePlugins={markdownPlugins.rehype}
              >
                {seg.body}
              </ReactMarkdown>
            ) : null
          ) : (
            <ExecutionResultBlock code={seg.code} info={seg.info} />
          )}
        </Fragment>
      ))}
    </article>
  );
}
