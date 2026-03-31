import React, { useEffect, useMemo } from "react";
import { Button, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getEssayBySlug } from "../utils/essayMd";

const { Title, Text } = Typography;

const EssayViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const slug = params.slug ? decodeURIComponent(params.slug) : "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const essay = useMemo(() => (slug ? getEssayBySlug(slug) : undefined), [slug]);

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        fontFamily: "'Noto Serif KR', serif",
        padding: "40px 0 100px 0",
      }}
    >
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
            <Title level={2} style={{ marginTop: 0, marginBottom: 24 }}>
              {essay.title}
            </Title>

            <div
              style={{
                lineHeight: 2,
                color: "#333",
                fontSize: "1.05rem",
                wordBreak: "keep-all",
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{essay.content}</ReactMarkdown>
            </div>
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

