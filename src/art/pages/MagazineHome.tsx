import React from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../hook/useResponsive";

const MagazineHome: React.FC = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const images = {
    work100_1:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/work100_1.png",
    studioView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png",
    work120_process:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
    work9:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/rome.png",
    work10:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/home.png",
    mentorView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/jsh.jpg",
    first:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/first.png",
  };

  const dummyPosts = [
    {
      id: "1",
      tag: "ARTIST",
      title: "ARTIST 태그는 1열 와이드 강조형",
      summary: "작가가 강조되어야 하므로 크게 배치합니다.",
      img: images.studioView,
    },
    {
      id: "2",
      tag: "SPACE",
      title: "SPACE/EXHIBITION은 2열 그리드",
      summary: "일반적인 그리드 형태입니다.",
      img: images.work10,
    },
    {
      id: "3",
      tag: "EXHIBITION",
      title: "일반 그리드 테스트 03",
      summary: "테스트 내용입니다.",
      img: images.work120_process,
    },
    {
      id: "4",
      tag: "ESSAY",
      title: "ESSAY/INSIGHT는 가로형 리스트 스타일",
      summary: "글 중심의 콘텐츠입니다.",
      img: images.work9,
    },
    {
      id: "5",
      tag: "INSIGHT",
      title: "가로형 리스트 테스트 05",
      summary: "테스트 내용입니다.",
      img: images.mentorView,
    },
    {
      id: "6",
      tag: "SPACE",
      title: "일반 그리드 테스트 06",
      summary: "테스트 내용입니다.",
      img: images.first,
    },
  ];

  // --- 태그별 렌더링 로직 ---
  const renderPostCard = (post: any) => {
    // 1. ARTIST: 1열 와이드 (이미지 중심)
    if (post.tag === "ARTIST") {
      return (
        <article
          key={post.id}
          onClick={() => navigate(`/art/contents/${post.id}`)}
          style={{
            gridColumn: "span 2",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              overflow: "hidden",
              marginBottom: "15px",
            }}
          >
            <img
              src={post.img}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Artist"
            />
          </div>
          <span
            style={{
              fontSize: "10px",
              color: "#888",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            {post.tag}
          </span>
          <h3
            style={{
              fontSize: "1.5rem",
              fontFamily: "'Nanum Myeongjo', serif",
              margin: "10px 0",
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {post.summary}
          </p>
        </article>
      );
    }

    // 2. ESSAY / INSIGHT: 가로형 (이미지 작게, 텍스트 옆으로)
    if (post.tag === "ESSAY" || post.tag === "INSIGHT") {
      return (
        <article
          key={post.id}
          onClick={() => navigate(`/art/contents/${post.id}`)}
          style={{
            gridColumn: "span 2",
            display: "flex",
            gap: "15px",
            alignItems: "center",
            padding: "15px 0",
            borderBottom: "0.5px solid #eee",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={post.img}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Essay"
            />
          </div>
          <div>
            <span
              style={{ fontSize: "9px", color: "#aaa", letterSpacing: "1px" }}
            >
              {post.tag}
            </span>
            <h4
              style={{
                fontSize: "1.05rem",
                margin: "5px 0",
                lineHeight: 1.3,
                fontWeight: 600,
              }}
            >
              {post.title}
            </h4>
            <span style={{ fontSize: "11px", color: "#ccc" }}>2026.03.10</span>
          </div>
        </article>
      );
    }

    // 3. 기본형 (SPACE, EXHIBITION): 2열 그리드
    return (
      <article
        key={post.id}
        onClick={() => navigate(`/art/contents/${post.id}`)}
        style={{ cursor: "pointer" }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "4/5",
            overflow: "hidden",
            marginBottom: "12px",
          }}
        >
          <img
            src={post.img}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Default"
          />
        </div>
        <span style={{ fontSize: "9px", color: "#888", fontWeight: 600 }}>
          {post.tag}
        </span>
        <h3
          style={{
            fontSize: "1rem",
            margin: "5px 0",
            fontFamily: "'Nanum Myeongjo', serif",
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h3>
      </article>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#fcfcfc",
        color: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      {/* --- Section 1: Hero (비대칭 레이아웃) --- */}
      <section
        style={{
          display: isMobile ? "block" : "flex",
          padding: isMobile ? "0" : "60px 50px",
          gap: "40px",
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ flex: 1.5, aspectRatio: "16/9", overflow: "hidden" }}>
          <img
            src={images.work100_1}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Hero"
          />
        </div>
        <div style={{ flex: 1, padding: isMobile ? "30px 20px" : "0" }}>
          <span
            style={{ fontSize: "11px", color: "#888", letterSpacing: "2px" }}
          >
            FEATURED
          </span>
          <h1
            style={{
              fontSize: isMobile ? "1.8rem" : "2.8rem",
              fontFamily: "'Nanum Myeongjo', serif",
              margin: "15px 0",
              lineHeight: 1.2,
            }}
          >
            메인 타이틀 테스트
          </h1>
          <p style={{ color: "#666", lineHeight: 1.6, fontSize: "15px" }}>
            레이아웃 믹스 버전 테스트입니다. 상단은 시각적 임팩트를 위해
            비대칭으로 구성했습니다.
          </p>
        </div>
      </section>

      {/* --- Section 3: Main Grid (태그별 가변 레이아웃) --- */}
      <div
        style={{
          backgroundColor: "#fff",
          borderTop: "1px solid #f0f0f0",
          marginTop: "40px",
        }}
      >
        <main
          style={{
            padding: isMobile ? "30px 15px" : "80px 50px",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            // 모바일은 기본 2열(repeat(2, 1fr)), 데스크탑은 3열
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: isMobile ? "30px 15px" : "60px 40px",
          }}
        >
          {dummyPosts.map((post) => renderPostCard(post))}
        </main>
      </div>

      <footer
        style={{
          padding: "60px 20px",
          textAlign: "center",
          borderTop: "1px solid #eee",
          color: "#aaa",
          fontSize: "11px",
        }}
      >
        © 2026 ARTIVE.
      </footer>
    </div>
  );
};

export default MagazineHome;
