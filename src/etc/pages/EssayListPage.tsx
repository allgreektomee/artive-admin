import React, { useEffect, useMemo } from "react";
import { Card, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getEssays } from "../utils/essayMd";

const { Title, Paragraph, Text } = Typography;

const EssayListPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const essays = useMemo(() => getEssays(), []);

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        fontFamily: "'Noto Serif KR', serif",
        padding: "60px 0 100px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 25px" }}>
        <Text
          style={{
            letterSpacing: "6px",
            fontSize: "0.85rem",
            marginBottom: "18px",
            fontWeight: "bold",
            color: "#999",
            display: "block",
          }}
        >
          ESSAY
        </Text>
        <Title
          level={2}
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 900,
            letterSpacing: "-1px",
            marginTop: 0,
            marginBottom: 18,
          }}
        >
          JUST ART
        </Title>
        <Paragraph style={{ color: "#666", marginBottom: 34, lineHeight: 1.9 }}>
          저장된 마크다운 원고를 그대로 불러와 보여줍니다.
        </Paragraph>

        <Row gutter={[16, 16]}>
          {essays.slice(0, 5).map((essay) => (
            <Col key={essay.slug} xs={24} sm={12} md={12} lg={8}>
              <Card
                hoverable
                onClick={() => navigate(`/essay/${encodeURIComponent(essay.slug)}`)}
                styles={{
                  body: {
                    padding: 20,
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  },
                }}
              >
                <div>
                  <Title level={4} style={{ marginTop: 0, marginBottom: 10 }}>
                    {essay.title}
                  </Title>
                  <Paragraph style={{ color: "#666", marginBottom: 0 }}>
                    {essay.excerpt || " "}
                  </Paragraph>
                </div>
                <Text style={{ color: "#999", marginTop: 16, fontSize: 12 }}>
                  {essay.slug}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default EssayListPage;

