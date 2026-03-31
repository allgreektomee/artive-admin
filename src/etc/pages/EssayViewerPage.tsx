import React, { useEffect, useMemo } from "react";
import { Button, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getEssayBySlug } from "../utils/essayMd";

const { Title, Text } = Typography;

const DEFAULT_OG_IMAGE =
  "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png";

function buildMetaDescription(excerpt: string, title: string, body: string) {
  const base = excerpt.trim() || body.replace(/\s+/g, " ").trim();
  const text = base || title;
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).trim()}…`;
}

function useEssayPageUrl(slug: string) {
  return useMemo(() => {
    const path = `/essay/${encodeURIComponent(slug)}`;
    if (typeof window === "undefined") return path;
    return `${window.location.origin}${path}`;
  }, [slug]);
}

const EssayViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const slug = params.slug ? decodeURIComponent(params.slug) : "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const essay = useMemo(() => (slug ? getEssayBySlug(slug) : undefined), [slug]);
  const pageUrl = useEssayPageUrl(slug);

  const description = essay
    ? buildMetaDescription(essay.excerpt, essay.title, essay.content)
    : "";
  const fullTitle = essay ? `${essay.title} | JUST ART` : "JUST ART";

  const jsonLd = essay
    ? JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: essay.title,
          inLanguage: "ko-KR",
          description: description || undefined,
          url: pageUrl,
        },
        null,
        0,
      )
    : "";

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        fontFamily: "'Noto Serif KR', serif",
        padding: "40px 0 100px 0",
      }}
    >
      {essay && (
        <Helmet prioritizeSeoTags>
          <title>{fullTitle}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={pageUrl} />

          <meta property="og:type" content="article" />
          <meta property="og:title" content={essay.title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:image" content={DEFAULT_OG_IMAGE} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={essay.title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

          {jsonLd ? (
            <script type="application/ld+json">{jsonLd}</script>
          ) : null}
        </Helmet>
      )}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 25px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <Button onClick={() => navigate(-1)}>뒤로</Button>
          <Button type="link" onClick={() => navigate("/essay")} style={{ padding: 0 }}>
            목록
          </Button>
        </div>

        {essay ? (
          <>
            <Text style={{ color: "#999", display: "block", marginBottom: 10 }}>
              {essay.slug}
            </Text>
            <Title level={2} style={{ marginTop: 0, marginBottom: 28 }}>
              {essay.title}
            </Title>

            {/* 원고(.md) 줄바꿈·빈 줄을 그대로 반영 (마크다운 단일 개행 병합 없음) */}
            <article
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                wordBreak: "keep-all",
                lineHeight: 2.15,
                color: "#333",
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                paddingBottom: "4rem",
                marginBottom: "2rem",
              }}
            >
              {essay.content}
            </article>
          </>
        ) : (
          <>
            <Title level={3} style={{ marginTop: 0 }}>
              글을 찾을 수 없습니다.
            </Title>
            <Text style={{ color: "#666" }}>요청한 slug: {slug || "(empty)"}</Text>
          </>
        )}
      </div>
    </div>
  );
};

export default EssayViewerPage;
