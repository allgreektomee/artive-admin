import React, { useCallback, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, Typography } from "antd";
import { Helmet } from "react-helmet-async";
import { DevMarkdown } from "../components/DevMarkdown";
import { ReactTestProjectChapterPanel } from "../components/ReactTestProjectChapterPanel";
import {
  getJavaScriptArticle,
  getPart,
  getPreamble,
  getReactDoc,
  getServerDoc,
  listJavaScriptArticleGroups,
  listParts,
  listReactDocs,
  listReactOutlineChapters,
  listServerDocs,
  readOutlineMarkdown,
  readReactOutlineMarkdown,
  type JavaScriptArticle,
  type JavaScriptArticleGroup,
  type OutlinePart,
  type ReactDoc,
  type ServerDoc,
} from "../lib/devOutline";
import {
  REACT_TEST_PROJECT_WALKTHROUGH_HREF,
  REACT_TEST_PROJECT_WALKTHROUGH_SLUG,
} from "../lib/reactTestProjectChapterRefs";
import "../devDocs.css";

const { Text, Title } = Typography;

type TabId = "js" | "react" | "spring" | "server";

const LANGUAGE_TAB_LABEL = "lang";

const TABS: { id: TabId; label: string }[] = [
  { id: "js", label: LANGUAGE_TAB_LABEL },
  { id: "react", label: "React" },
  { id: "spring", label: "Spring" },
  { id: "server", label: "Server" },
];

function parseTab(raw: string | null): TabId {
  if (raw === "cicd") return "server"; // 과거 북마크; URL 정규화 effect가 tab=server로 교체함
  if (raw === "react" || raw === "spring" || raw === "server") return raw;
  return "js";
}

function excerptFromPartBody(body: string, maxLen = 220): string {
  const lines = body.split("\n").map((line) => line.trim());
  const startIndex = lines.findIndex((line) => line.length > 0 && !line.startsWith("##"));
  const paragraphLines: string[] = [];

  for (const line of lines.slice(startIndex === -1 ? 0 : startIndex)) {
    if (line.length === 0 || /^\d+\.\s/.test(line)) break;
    paragraphLines.push(line);
  }

  const text = paragraphLines.join(" ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen)}…`;
}

const DevDocsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const md = useMemo(() => readOutlineMarkdown(), []);
  const reactOutline = useMemo(() => readReactOutlineMarkdown(), []);
  const preamble = useMemo(() => getPreamble(md), [md]);
  const parts = useMemo(() => listParts(md), [md]);
  const articleGroups = useMemo(() => listJavaScriptArticleGroups(), []);
  const serverDocs = useMemo(() => listServerDocs(), []);
  const reactDocs = useMemo(() => listReactDocs(), []);

  const tabParam = searchParams.get("tab");
  const tab = parseTab(tabParam);
  const outlineRaw = searchParams.get("outline");
  const outlineId =
    outlineRaw === "1" || outlineRaw === "2" || outlineRaw === "3"
      ? (Number(outlineRaw) as 1 | 2 | 3)
      : null;
  const ps = searchParams.get("ps");
  const as = searchParams.get("as");
  const sd =
    searchParams.get("sd") ??
    (tabParam === "cicd" ? searchParams.get("cd") : null);
  const rd = searchParams.get("rd");

  const article = useMemo(() => {
    if (!ps || !as) return null;
    return getJavaScriptArticle(ps, as);
  }, [ps, as]);

  const serverDoc = useMemo(() => {
    if (!sd) return null;
    return getServerDoc(sd);
  }, [sd]);

  const reactDoc = useMemo(() => {
    if (!rd) return null;
    return getReactDoc(rd);
  }, [rd]);

  useEffect(() => {
    if (tabParam !== "cicd") return;
    const q = new URLSearchParams(searchParams);
    q.set("tab", "server");
    const legacyCd = q.get("cd");
    if (legacyCd && !q.get("sd")) q.set("sd", legacyCd);
    q.delete("cd");
    setSearchParams(q, { replace: true });
  }, [tabParam, searchParams, setSearchParams]);

  useEffect(() => {
    if ((!ps || !as) && !sd && !rd) return;
    window.scrollTo({ top: 0 });
  }, [ps, as, sd, rd]);

  const adjacentReactDocs = useMemo(() => {
    if (!reactDoc) return { prev: null, next: null };
    const idx = reactDocs.findIndex((d) => d.slug === reactDoc.slug);
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: reactDocs[idx - 1] ?? null,
      next: reactDocs[idx + 1] ?? null,
    };
  }, [reactDoc, reactDocs]);

  const adjacentArticles = useMemo(() => {
    if (!article) return { prev: null, next: null };

    const articles = articleGroups.flatMap((group) => group.articles);
    const currentIndex = articles.findIndex(
      (item) => item.partSlug === article.partSlug && item.slug === article.slug,
    );

    if (currentIndex === -1) return { prev: null, next: null };

    return {
      prev: articles[currentIndex - 1] ?? null,
      next: articles[currentIndex + 1] ?? null,
    };
  }, [article, articleGroups]);

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
      sd: undefined,
      rd: undefined,
      cd: undefined,
    });
  }, [setQuery]);

  const goHomeServer = useCallback(() => {
    setQuery({
      tab: "server",
      outline: undefined,
      ps: undefined,
      as: undefined,
      sd: undefined,
      rd: undefined,
      cd: undefined,
    });
  }, [setQuery]);

  const goHomeReact = useCallback(() => {
    setQuery({
      tab: "react",
      outline: undefined,
      ps: undefined,
      as: undefined,
      sd: undefined,
      rd: undefined,
      cd: undefined,
    });
  }, [setQuery]);

  const onTab = (id: TabId) => {
    if (id === "js") {
      setQuery({
        tab: "js",
        outline: undefined,
        ps: undefined,
        as: undefined,
        sd: undefined,
        rd: undefined,
        cd: undefined,
      });
    } else {
      setQuery({
        tab: id,
        outline: undefined,
        ps: undefined,
        as: undefined,
        sd: undefined,
        rd: undefined,
        cd: undefined,
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
        <Title level={2} style={{ marginTop: 8, marginBottom: 28 }}>
          학습 정리
        </Title>

        <div className="dev-docs-tablist-scroll" style={{ marginBottom: 32 }}>
          <div role="tablist" aria-label="문서 종류" className="dev-docs-tablist">
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
                    padding: "10px 14px",
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
        </div>

        {tab === "react" && rd && !reactDoc && (
          <Card size="small" style={{ marginBottom: 16 }}>
            <Text>요청한 React 문서를 찾을 수 없습니다.</Text>
            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={goHomeReact} style={linkBtn}>
                React 홈으로
              </button>
            </div>
          </Card>
        )}
        {tab === "react" && reactDoc && (
          <div>
            <nav style={{ marginBottom: 16, fontSize: 14 }}>
              <button type="button" onClick={goHomeReact} style={linkBtn}>
                ← React 홈
              </button>
            </nav>
            <Card>
              <DevMarkdown source={reactDoc.body} />
              <ReactTestProjectChapterPanel docSlug={reactDoc.slug} />
            </Card>
            <ReactDocNavigationCards
              prev={adjacentReactDocs.prev}
              next={adjacentReactDocs.next}
            />
          </div>
        )}
        {tab === "react" && !rd && (
          <ReactHome reactDocs={reactDocs} outlineSource={reactOutline} />
        )}
        {tab === "spring" && (
          <Placeholder
            title="Spring"
            body="Spring Boot 등 백엔드 정리를 이 탭에 추가할 예정입니다."
          />
        )}
        {tab === "server" && sd && !serverDoc && (
          <Card size="small" style={{ marginBottom: 16 }}>
            <Text>요청한 서버 문서를 찾을 수 없습니다.</Text>
            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={goHomeServer} style={linkBtn}>
                Server 홈으로
              </button>
            </div>
          </Card>
        )}
        {tab === "server" && serverDoc && (
          <div>
            <nav style={{ marginBottom: 16, fontSize: 14 }}>
              <button type="button" onClick={goHomeServer} style={linkBtn}>
                ← Server 홈
              </button>
            </nav>
            <Card>
              <DevMarkdown source={serverDoc.body} />
            </Card>
          </div>
        )}
        {tab === "server" && !sd && <ServerHome docs={serverDocs} />}

        {tab === "js" && ps && as && !article && (
          <Card size="small" style={{ marginBottom: 16 }}>
            <Text>요청한 글을 찾을 수 없습니다.</Text>
            <div style={{ marginTop: 12 }}>
              <button type="button" onClick={goHomeJs} style={linkBtn}>
                {LANGUAGE_TAB_LABEL} 목차로
              </button>
            </div>
          </Card>
        )}

        {tab === "js" && article && (
          <div>
            <nav style={{ marginBottom: 16, fontSize: 14 }}>
              <button type="button" onClick={goHomeJs} style={linkBtn}>
                ← {LANGUAGE_TAB_LABEL}
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
                    sd: undefined,
                    rd: undefined,
                    cd: undefined,
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
            <ArticleNavigationCards
              prev={adjacentArticles.prev}
              next={adjacentArticles.next}
            />
          </div>
        )}

        {tab === "js" && outlineSection && !article && (
          <div>
            <nav style={{ marginBottom: 16, fontSize: 14 }}>
              <button type="button" onClick={goHomeJs} style={linkBtn}>
                ← {LANGUAGE_TAB_LABEL}
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
          <LanguageGrammarHome
            preamble={preamble}
            parts={parts}
            articleGroups={articleGroups}
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

function LanguageSectionPlaceholder({ body }: { body: string }) {
  return (
    <Card style={{ borderStyle: "dashed" }} size="small">
      <Text type="secondary">{body}</Text>
    </Card>
  );
}

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

function ServerHome({ docs }: { docs: ServerDoc[] }) {
  const infraDocs = docs.filter((d) => !d.slug.includes("docker-local-cicd"));
  const cicdDockerDocs = docs.filter((d) => d.slug.includes("docker-local-cicd"));

  const renderDocGrid = (list: ServerDoc[]) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
      {list.map((doc) => (
        <Link key={doc.slug} to={doc.href} style={{ textDecoration: "none" }}>
          <Card hoverable size="small">
            <Text code style={{ fontSize: 11, marginRight: 8 }}>
              {String(doc.order).padStart(2, "0")}
            </Text>
            <Text strong style={{ color: "#27272a" }}>
              {doc.title}
            </Text>
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Card size="small" style={{ marginBottom: 4 }}>
        <Title level={4} style={{ marginTop: 0, marginBottom: 12 }}>
          서버 구성도
        </Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 13 }}>
          Nginx · Tomcat · Redis · CI/CD만 넣은 <strong>가장 단순한 그림</strong>입니다. 실제 회사 환경은 DB,
          로드밸런서, 폐쇄망이 더 얹힙니다.
        </Text>

        <pre className="dev-server-overview-diagram" aria-label="서버 구성도">
{`
  [ 사용자 PC · 모바일 ]  (브라우저 앱)
            │
            │  인터넷 / 사내망
            │  보통 HTTPS 443 또는 HTTP 80  ←── "웹 접속 포트"(방화벽에서 허용)
            ▼
  ┌─────────────────────────────┐
  │ Nginx                       │   웹 최전방. SSL 종료·정적 파일·역방향 프록시
  │ (리버스 프록시 / 웹 서버)     │   ──→ 받은 요청을 뒷단 앱 포트로 넘김
  └─────────────┬───────────────┘
                │ 예: 프록시 → http://127.0.0.1:8080
                ▼
  ┌─────────────────────────────┐        TCP (예: 6379 / Enterprise DB 포트 등)
  │ Tomcat · WAS · Spring Boot │◄─────────────────────┐
  │ (실제 비즈니스 앱 실행)      │                       │
  └─────────────────────────────┘                       │
                │ 세션 ID·토큰이 Redis에 저장될 수 있음 │  ┌───────────────┐
                └──────────────────────────────────────►│ Redis         │
                                                        │ 세션 · 캐시     │
                                                        └───────────────┘


  ┌─────────────────────────────┐
  │ CI/CD (GitLab ↔ Jenkins…)   │   코드 push → 빌드·테스트 → 배포(SSH·패키지)
  └─────────────┬───────────────┘
                │ 새 WAR/JAR 또는 설정 반영 ──► Tomcat(또는 앱 서버)
`}
        </pre>

        <Title level={5} style={{ marginTop: 20, marginBottom: 8, fontSize: 14 }}>
          네트워크 말머리 (완전 처음일 때만)
        </Title>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 13,
            color: "#3f3f46",
            lineHeight: 1.65,
          }}
        >
          <li style={{ marginBottom: 6 }}>
            <Text strong style={{ fontSize: 13 }}>IP / 도메인</Text>: 서버 “집 주소”.
            <Text strong style={{ fontSize: 13, marginLeft: 4 }}>포트</Text>: 그 주소의 “문 번호”. 같은 서버여도 포트마다 다른
            프로그램이 받는다 (예: 443 Nginx, 8080 Tomcat).
          </li>
          <li style={{ marginBottom: 6 }}>
            <Text strong style={{ fontSize: 13 }}>클라이언트 / 서버</Text>: 요청하는 쪽이 클라이언트(브라우저 등), 받아서 처리하는 게
            서버(Nginx·Tomcat·Redis).
          </li>
          <li style={{ marginBottom: 6 }}>
            <Text strong style={{ fontSize: 13 }}>localhost · 127.0.0.1</Text>: 같은 머신 안에서만 붙을 때 쓰는 주소.
            Nginx와 Tomcat이 같은 서버에 있으면 프록시는 여기로 넘긴다고 보면 된다.
          </li>
          <li style={{ marginBottom: 6 }}>
            <Text strong style={{ fontSize: 13 }}>방화벽</Text>: 허용한 포트로만 바깥에서 들어온다. 8443 같은 관리 포트도 별도
            오픈이 필요할 수 있다.
          </li>
          <li>
            <Text strong style={{ fontSize: 13 }}>HTTPS</Text>: 보통 사용자↔Nginx 구간만 암호화. Nginx 안쪽으로 Tomcat까지는
            HTTP로 두는 패턴도 많다 (사설망).
          </li>
        </ul>
      </Card>

      <div>
        <Title level={3} style={{ marginTop: 0 }}>
          Server 설치 가이드
        </Title>
        <Text type="secondary" style={{ display: "block" }}>
          Tomcat, Nginx, Redis 설치 및 설정 문서를 분리해서 정리합니다.
        </Text>
      </div>

      {renderDocGrid(infraDocs)}

      {cicdDockerDocs.length > 0 ? (
        <>
          <div style={{ marginTop: 16 }}>
            <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
              CI/CD · 로컬 Docker
            </Title>
            <Text type="secondary" style={{ display: "block" }}>
              GitLab, Jenkins, Nexus 등 로컬 스택 설치·연동 절차입니다. 비밀번호·토큰은 문서에 넣지 않습니다.
            </Text>
          </div>
          {renderDocGrid(cicdDockerDocs)}
        </>
      ) : null}
    </div>
  );
}

function LanguageGrammarHome({
  preamble,
  parts,
  articleGroups,
}: {
  preamble: string;
  parts: OutlinePart[];
  articleGroups: JavaScriptArticleGroup[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <Title level={3} style={{ marginTop: 0 }}>
          {LANGUAGE_TAB_LABEL}
        </Title>
        <Text type="secondary" style={{ display: "block" }}>
          JavaScript는 기존 ES6+ 시리즈를 유지하고, Kotlin·Swift·Java 문법 정리는 순차적으로 채웁니다.
        </Text>
      </div>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Title level={4} style={{ marginTop: 0, marginBottom: 0 }}>
          JavaScript
        </Title>
        <JavaScriptSeriesHome preamble={preamble} parts={parts} articleGroups={articleGroups} />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Title level={4} style={{ marginTop: 0, marginBottom: 0 }}>
          Kotlin
        </Title>
        <LanguageSectionPlaceholder body="문법·관용구 정리를 이 섹션에 추가할 예정입니다." />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Title level={4} style={{ marginTop: 0, marginBottom: 0 }}>
          Swift
        </Title>
        <LanguageSectionPlaceholder body="문법·관용구 정리를 이 섹션에 추가할 예정입니다." />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Title level={4} style={{ marginTop: 0, marginBottom: 0 }}>
          Java
        </Title>
        <LanguageSectionPlaceholder body="문법·모던 Java 정리를 이 섹션에 추가할 예정입니다." />
      </section>
    </div>
  );
}

function JavaScriptSeriesHome({
  preamble,
  parts,
  articleGroups,
}: {
  preamble: string;
  parts: OutlinePart[];
  articleGroups: JavaScriptArticleGroup[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <Title level={5} style={{ marginTop: 0, fontSize: 16 }}>
          ES6+ 시리즈 목차
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
          작성된 콘텐츠
        </Text>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          {articleGroups.map((group) => {
            const part = parts.find((p) => p.id === group.id);

            return (
              <Card key={group.slug} size="small" title={`${group.id}부. ${group.title}`}>
                {part ? (
                  <ParagraphEllipsis text={excerptFromPartBody(part.body, 140)} />
                ) : null}
                {group.articles.length === 0 ? (
                  <Text type="secondary">아직 작성된 글이 없습니다.</Text>
                ) : (
                  <ol style={{ margin: "14px 0 0", paddingLeft: 18 }}>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ArticleNavigationCards({
  prev,
  next,
}: {
  prev: JavaScriptArticle | null;
  next: JavaScriptArticle | null;
}) {
  if (!prev && !next) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        marginTop: 20,
      }}
    >
      {prev ? (
        <ArticleNavigationCard label="이전 글" article={prev} direction="prev" />
      ) : null}
      {next ? (
        <ArticleNavigationCard label="다음 글" article={next} direction="next" />
      ) : null}
    </div>
  );
}

function ArticleNavigationCard({
  label,
  article,
  direction,
}: {
  label: string;
  article: JavaScriptArticle;
  direction: "prev" | "next";
}) {
  return (
    <Link to={article.href} style={{ textDecoration: "none" }}>
      <Card hoverable size="small" style={{ height: "100%" }}>
        <Text
          type="secondary"
          style={{
            display: "block",
            marginBottom: 8,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {direction === "prev" ? "← " : ""}
          {label}
          {direction === "next" ? " →" : ""}
        </Text>
        <Text strong style={{ color: "#27272a" }}>
          {article.title}
        </Text>
        <Text type="secondary" style={{ display: "block", marginTop: 6, fontSize: 12 }}>
          {article.partId}부 · {String(article.order).padStart(2, "0")}
        </Text>
      </Card>
    </Link>
  );
}

function ReactHome({
  reactDocs,
  outlineSource,
}: {
  reactDocs: ReactDoc[];
  outlineSource: string;
}) {
  const chapters = useMemo(() => listReactOutlineChapters(outlineSource), [outlineSource]);
  const docByOrder = useMemo(() => {
    const m = new Map<number, ReactDoc>();
    for (const d of reactDocs) {
      m.set(d.order, d);
    }
    return m;
  }, [reactDocs]);

  const walkthroughDoc = useMemo(
    () => reactDocs.find((d) => d.slug === REACT_TEST_PROJECT_WALKTHROUGH_SLUG) ?? null,
    [reactDocs],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <Title level={3} style={{ marginTop: 0 }}>
          React 연재
        </Title>
        <Text type="secondary" style={{ display: "block" }}>
          <strong>장별 미리보기</strong>로 각 장 제목·항목을 확인하고, 하단{" "}
          <strong>예제 목표</strong> 회색 박스를 누르면 본문(설명 + Live 예제 코드·실행 결과)으로
          들어갑니다. <strong>로그인 없이도</strong> 1~8장 Live만으로 기본 축을 따라갈 수 있습니다.
        </Text>
        <Text type="secondary" style={{ display: "block", marginTop: 12 }}>
          JavaScript 샘플 전체 소스 트리·원문은{" "}
          <Link to={walkthroughDoc?.href ?? REACT_TEST_PROJECT_WALKTHROUGH_HREF}>
            14장 · 샘플 예제 분석 (reactTestProject)
          </Link>
          에서만 펼칩니다. (1~15장 홈에서는 목차·링크만.)
        </Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {chapters.length === 0 ? (
          <Text type="secondary">목차에서 장 헤더를 찾지 못했습니다.</Text>
        ) : (
          chapters.map((ch) => {
              const doc = docByOrder.get(ch.order);
              const goalText =
                ch.exampleGoal?.trim() || "본문에서 상세히 다룹니다.";
              const goalInner = (
                <>
                  <div className="react-outline-goal-label">
                    예제 목표
                  </div>
                  <div className="react-outline-goal-text">
                    {goalText}
                  </div>
                  {!doc ? (
                    <Text type="secondary" style={{ display: "block", marginTop: 8, fontSize: 12 }}>
                      본문 문서 준비 중입니다.
                    </Text>
                  ) : null}
                </>
              );

              return (
                <div key={ch.order} className="react-outline-chapter-block">
                  <Title level={4} style={{ marginTop: 0, marginBottom: 12, fontSize: 18 }}>
                    {ch.heading}
                  </Title>
                  {ch.intro ? (
                    <p
                      style={{
                        margin: "0 0 14px",
                        fontSize: 14,
                        color: "#3f3f46",
                        lineHeight: 1.65,
                      }}
                    >
                      {ch.intro}
                    </p>
                  ) : null}
                  {ch.topics.length > 0 ? (
                    <ol
                      style={{
                        margin: "0 0 4px",
                        paddingLeft: 22,
                        fontSize: 14,
                        color: "#27272a",
                        lineHeight: 1.65,
                      }}
                    >
                      {ch.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} style={{ marginBottom: 6 }}>
                          {topic.replace(/^\d+\.\s*/, "")}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {doc ? (
                    <Link
                      to={doc.href}
                      style={{ textDecoration: "none", color: "inherit", display: "block" }}
                      aria-label={`${ch.heading} 본문으로 이동`}
                    >
                      <div className="react-outline-goal-box react-outline-goal-box--clickable">
                        {goalInner}
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="react-outline-goal-box"
                      style={{ opacity: 0.85, cursor: "default" }}
                    >
                      {goalInner}
                    </div>
                  )}
                </div>
              );
            })
          )}
      </div>
    </div>
  );
}

function ReactDocNavigationCards({
  prev,
  next,
}: {
  prev: ReactDoc | null;
  next: ReactDoc | null;
}) {
  if (!prev && !next) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        marginTop: 20,
      }}
    >
      {prev ? <ReactDocNavigationCard label="이전 장" doc={prev} direction="prev" /> : null}
      {next ? <ReactDocNavigationCard label="다음 장" doc={next} direction="next" /> : null}
    </div>
  );
}

function ReactDocNavigationCard({
  label,
  doc,
  direction,
}: {
  label: string;
  doc: ReactDoc;
  direction: "prev" | "next";
}) {
  return (
    <Link to={doc.href} style={{ textDecoration: "none" }}>
      <Card hoverable size="small" style={{ height: "100%" }}>
        <Text
          type="secondary"
          style={{
            display: "block",
            marginBottom: 8,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {direction === "prev" ? "← " : ""}
          {label}
          {direction === "next" ? " →" : ""}
        </Text>
        <Text strong style={{ color: "#27272a" }}>
          {doc.title}
        </Text>
        <Text type="secondary" style={{ display: "block", marginTop: 6, fontSize: 12 }}>
          {String(doc.order).padStart(2, "0")}
        </Text>
      </Card>
    </Link>
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
