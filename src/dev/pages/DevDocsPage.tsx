import React, { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, Typography } from "antd";
import { Helmet } from "react-helmet-async";
import { DevMarkdown } from "../components/DevMarkdown";
import {
  getJavaScriptArticle,
  getPart,
  getPreamble,
  listJavaScriptArticleGroups,
  listParts,
  readOutlineMarkdown,
  type JavaScriptArticleGroup,
  type OutlinePart,
} from "../lib/devOutline";
import "../devDocs.css";

const { Text, Title } = Typography;

type TabId = "js" | "react" | "spring";

const TABS: { id: TabId; label: string }[] = [
  { id: "js", label: "JavaScript" },
  { id: "react", label: "React" },
  { id: "spring", label: "Spring" },
];

function parseTab(raw: string | null): TabId {
  if (raw === "react" || raw === "spring") return raw;
  return "js";
}

function excerptFromPartBody(body: string, maxLen = 220): string {
  const lines = body.split("\n").filter((l) => l.trim().length > 0);
  const skipHeading = lines[0]?.startsWith("##") ? lines.slice(1) : lines;
  const text = skipHeading.join(" ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen)}…`;
}

const DevDocsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const md = useMemo(() => readOutlineMarkdown(), []);
  const preamble = useMemo(() => getPreamble(md), [md]);
  const parts = useMemo(() => listParts(md), [md]);
  const articleGroups = useMemo(() => listJavaScriptArticleGroups(), []);

  const tab = parseTab(searchParams.get("tab"));
  const outlineRaw = searchParams.get("outline");
  const outlineId =
    outlineRaw === "1" || outlineRaw === "2" || outlineRaw === "3"
      ? (Number(outlineRaw) as 1 | 2 | 3)
      : null;
  const ps = searchParams.get("ps");
  const as = searchParams.get("as");

  const article = useMemo(() => {
    if (!ps || !as) return null;
    return getJavaScriptArticle(ps, as);
  }, [ps, as]);

  const outlineSection = useMemo(() => {
    if (!outlineId) return null;
    return getPart(md, outlineId);
  }, [md, outlineId]);

  const setQuery = useCallback(
    (next: Record<string, string | undefined>) => {
      const q = new URLSearchParams(searchParams);
      for (const [k, v] of Object.entries(next)) {
        if (v === undefined || v === "") q.delete(k);
        else q.set(k, v);
      }
      setSearchParams(q, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const goHomeJs = useCallback(() => {
    setQuery({
      tab: "js",
      outline: undefined,
      ps: undefined,
      as: undefined,
    });
  }, [setQuery]);

  const onTab = (id: TabId) => {
    if (id === "js") {
      setQuery({
        tab: "js",
        outline: undefined,
        ps: undefined,
        as: undefined,
      });
    } else {
      setQuery({
        tab: id,
        outline: undefined,
        ps: undefined,
        as: undefined,
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        color: "#18181b",
        paddingBottom: "4rem",
      }}
    >
      <Helmet>
        <title>학습 정리 | Artive</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div style={{ maxWidth: 768, margin: "0 auto", padding: "1.5rem 1rem" }}>
        <Text type="secondary" style={{ fontSize: 11, letterSpacing: "0.15em" }}>
          ARTIVE
        </Text>
        <Title level={2} style={{ marginTop: 8, marginBottom: 8 }}>
          학습 정리
        </Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 28 }}>
          JavaScript·React·Spring을 한 페이지에서 탭으로 전환합니다.
        </Text>

        <div
          role="tablist"
          aria-label="문서 종류"
          style={{
            display: "flex",
            gap: 4,
            borderBottom: "1px solid #e4e4e7",
            marginBottom: 32,
          }}
        >
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTab(t.id)}
                style={{
                  padding: "10px 16px",
                  marginBottom: -1,
                  border: "none",
                  borderBottom: active ? "2px solid #18181b" : "2px solid transparent",
                  background: "transparent",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#18181b" : "#71717a",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "react" && (
          <Placeholder title="React" body="React 정리 문서를 이 탭에 추가할 예정입니다." />
        )}
        {tab === "spring" && (
          <Placeholder
            title="Spring"
            body="Spring Boot 등 백엔드 정리를 이 탭에 추가할 예정입니다."
          />
        )}

        {tab === "js" && ps && as && !article && (
          <Card size="small" style={{ marginBottom: 16 }}>
            <Text>요청한 글을 찾을 수 없습니다.</Text>
            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={goHomeJs} style={linkBtn}>
                JavaScript 홈으로
              </button>
            </div>
          </Card>
        )}

        {tab === "js" && article && (
          <div>
            <nav style={{ marginBottom: 16, fontSize: 14 }}>
              <button type="button" onClick={goHomeJs} style={linkBtn}>
                ← JavaScript 홈
              </button>
              <Text type="secondary" style={{ margin: "0 8px" }}>
                ·
              </Text>
              <button
                type="button"
                onClick={() =>
                  setQuery({
                    tab: "js",
                    outline: String(article.partId),
                    ps: undefined,
                    as: undefined,
                  })
                }
                style={linkBtn}
              >
                {article.partId}부. {article.partTitle}
              </button>
            </nav>
            <Card>
              <DevMarkdown source={article.body} />
            </Card>
          </div>
        )}

        {tab === "js" && outlineSection && !article && (
          <div>
            <nav style={{ marginBottom: 16, fontSize: 14 }}>
              <button type="button" onClick={goHomeJs} style={linkBtn}>
                ← JavaScript 홈
              </button>
              <Text type="secondary" style={{ margin: "0 8px" }}>
                |
              </Text>
              <Text type="secondary">{outlineSection.headingLine}</Text>
            </nav>
            <Card>
              <DevMarkdown source={outlineSection.body} />
            </Card>
          </div>
        )}

        {tab === "js" && !article && !outlineSection && (
          <JavaScriptHome
            preamble={preamble}
            parts={parts}
            articleGroups={articleGroups}
            setQuery={setQuery}
          />
        )}
      </div>
    </div>
  );
};

const linkBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  color: "#3f3f46",
  cursor: "pointer",
  textDecoration: "underline",
  fontSize: 14,
};

function Placeholder({ title, body }: { title: string; body: string }) {
  return (
    <Card
      style={{
        borderStyle: "dashed",
      }}
    >
      <Title level={4}>{title}</Title>
      <Text type="secondary">{body}</Text>
    </Card>
  );
}

function JavaScriptHome({
  preamble,
  parts,
  articleGroups,
  setQuery,
}: {
  preamble: string;
  parts: OutlinePart[];
  articleGroups: JavaScriptArticleGroup[];
  setQuery: (next: Record<string, string | undefined>) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <Title level={3} style={{ marginTop: 0 }}>
          JavaScript ES6+ 시리즈 목차
        </Title>
        <Text type="secondary" style={{ display: "block" }}>
          <code style={{ fontSize: 12, padding: "2px 6px", background: "#f4f4f5" }}>
            src/dev/content/js-blog-es6-outline.md
          </code>
        </Text>
      </div>

      <Card title="시리즈 앞부분" size="small">
        <DevMarkdown source={preamble} />
      </Card>

      <div>
        <Text strong style={{ fontSize: 12, letterSpacing: "0.08em", color: "#71717a" }}>
          목차 (1 · 2 · 3부)
        </Text>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          {parts.map((p) => (
            <Card
              key={p.id}
              hoverable
              onClick={() =>
                setQuery({
                  tab: "js",
                  outline: String(p.id),
                  ps: undefined,
                  as: undefined,
                })
              }
              size="small"
              title={`${p.id}부`}
            >
              <Text type="secondary" style={{ fontSize: 13 }}>
                {p.headingLine.replace(/^##\s*\d+부\.\s*/, "")}
              </Text>
              <ParagraphEllipsis text={excerptFromPartBody(p.body)} />
              <Text style={{ fontSize: 12, marginTop: 8, display: "block" }}>
                전체 보기 →
              </Text>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Text strong style={{ fontSize: 12, letterSpacing: "0.08em", color: "#71717a" }}>
          작성된 콘텐츠
        </Text>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          {articleGroups.map((group) => (
            <Card key={group.slug} size="small" title={`${group.id}부. ${group.title}`}>
              {group.articles.length === 0 ? (
                <Text type="secondary">아직 작성된 글이 없습니다.</Text>
              ) : (
                <ol style={{ margin: 0, paddingLeft: 18 }}>
                  {group.articles.map((article) => (
                    <li key={article.href} style={{ marginBottom: 6 }}>
                      <Link to={article.href} style={{ fontSize: 14 }}>
                        <Text code style={{ fontSize: 11, marginRight: 8 }}>
                          {String(article.order).padStart(2, "0")}
                        </Text>
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParagraphEllipsis({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 12, color: "#71717a", margin: "8px 0 0", lineHeight: 1.5 }}>
      {text}
    </p>
  );
}

export default DevDocsPage;
