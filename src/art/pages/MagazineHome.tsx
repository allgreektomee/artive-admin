import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../hook/useResponsive";

const MagazineHome: React.FC = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const dummyPosts = [
    {
      id: "1",
      tags: ["ART", "MAIN"],
      title: "ART TEST TITLE",
      summary: "아트 연재물 테스트 텍스트입니다.",
      img: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/work100_1.png",
    },
    {
      id: "2",
      tags: ["STOCK"],
      title: "STOCK TEST TITLE",
      summary: "주식 연재물 테스트 텍스트입니다.",
      img: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png",
    },
    {
      id: "3",
      tags: ["EVENT"],
      title: "GALLERY OPEN (COMING SOON)",
      summary: "미래의 오프라인 행사/전시 공지 레이아웃 테스트",
      img: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
    },
    {
      id: "4",
      tags: ["ESSAY"],
      title: "ESSAY TEST TITLE",
      summary: "에세이 테스트 텍스트입니다.",
      img: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/rome.png",
    },
  ];

  const mainPool = dummyPosts.filter((post) => post.tags.includes("MAIN"));
  const mainPost = useMemo(() => {
    if (mainPool.length === 0) return null;
    return mainPool[Math.floor(Math.random() * mainPool.length)];
  }, [mainPool.length]);

  const renderPostCard = (post: any) => {
    // 공통 스타일: 800px 너비 안에서 꽉 차는 1열 피드
    return (
      <article
        key={post.id}
        onClick={() => navigate(`/art/contents/${post.id}`)}
        style={{
          width: "100%",
          marginBottom: isMobile ? "40px" : "80px", // 피드 간 간격을 넓게 주어 기록 하나하나에 집중
          cursor: "pointer",
          borderBottom: isMobile ? "1px solid #eee" : "none",
          paddingBottom: isMobile ? "30px" : "0",
        }}
      >
        {/* 태그 & 날짜 (상단 배치로 정보 전달력 강화) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1px",
              color: "#000",
            }}
          >
            {post.tags[0]}
          </span>
          <span style={{ fontSize: "10px", color: "#aaa" }}>2026.03.10</span>
        </div>

        {/* 메인 이미지 */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/10",
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
          }}
        >
          <img
            src={post.img}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Content"
          />
        </div>

        {/* 텍스트 영역 */}
        <div style={{ marginTop: "20px" }}>
          <h3
            style={{
              fontSize: isMobile ? "1.4rem" : "1.8rem",
              margin: "0 0 10px",
              fontWeight: 500,
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </h3>
          <p
            style={{
              fontSize: "15px",
              color: "#666",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {post.summary}
          </p>
        </div>
      </article>
    );
  };

  return (
    <div style={{ backgroundColor: "#fff", color: "#1a1a1a" }}>
      {/* --- Section 1: Hero (EDITOR'S PICK) --- */}
      {mainPost && (
        <section
          style={{
            padding: isMobile ? "40px 20px" : "80px 20px",
            maxWidth: "800px",
            margin: "0 auto",
            borderBottom: "1px solid #000", // 메인과 아카이브의 경계를 확실히
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "3px",
              color: "#888",
              display: "block",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            FEATURED RECORD
          </span>
          <div
            onClick={() => navigate(`/art/contents/${mainPost.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                overflow: "hidden",
                marginBottom: "30px",
              }}
            >
              <img
                src={mainPost.img}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: isMobile ? "2rem" : "3rem",
                  margin: "0 0 15px",
                  fontWeight: 300,
                }}
              >
                {mainPost.title}
              </h1>
              <p style={{ color: "#666", fontSize: "15px" }}>
                {mainPost.summary}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* --- Section 2: Archive Feed (1열 리스트) --- */}
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: isMobile ? "40px 20px" : "100px 20px",
        }}
      >
        {dummyPosts.map((post) => renderPostCard(post))}
      </main>
    </div>
  );
};

export default MagazineHome;
