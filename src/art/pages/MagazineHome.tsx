import React, { useMemo } from "react";
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
      tags: ["ARTIST", "MAIN"],
      title: "아티브의 시선: 기록의 시작",
      summary: "메인 태그가 달린 첫 번째 테스트 콘텐츠입니다.",
      img: images.work100_1,
    },
    {
      id: "2",
      tags: ["SPACE", "MAIN"],
      title: "사유하는 공간, 화실 뷰",
      summary: "메인 태그가 달린 두 번째 테스트 콘텐츠입니다.",
      img: images.studioView,
    },
    {
      id: "3",
      tags: ["EXHIBITION", "MAIN"],
      title: "120호 대작 제작 프로세스",
      summary: "메인 태그가 달린 세 번째 테스트 콘텐츠입니다.",
      img: images.work120_process,
    },
    {
      id: "4",
      tags: ["ESSAY"],
      title: "로마에서 만난 카라바조",
      summary: "에세이 스타일의 테스트 글입니다.",
      img: images.work9,
    },
    {
      id: "5",
      tags: ["INSIGHT"],
      title: "현대 미술과 자본의 상관관계",
      summary: "인사이트 스타일의 테스트 글입니다.",
      img: images.mentorView,
    },
    {
      id: "6",
      tags: ["SPACE"],
      title: "작업실의 사계절",
      summary: "일반 그리드 형태의 테스트 글입니다.",
      img: images.work10,
    },
  ];

  // --- 메인 큐레이션 로직 ---
  // 1. MAIN 태그가 포함된 포스트만 필터링
  const mainPool = dummyPosts.filter((post) => post.tags.includes("MAIN"));

  // 2. 접속 시점에 랜덤으로 하나 선택 (useMemo로 렌더링 시 값 고정)
  const mainPost = useMemo(() => {
    if (mainPool.length === 0) return null;
    return mainPool[Math.floor(Math.random() * mainPool.length)];
  }, [mainPool.length]);

  // --- 태그별 그리드 렌더링 로직 ---
  const renderPostCard = (post: any) => {
    const isArtist = post.tags.includes("ARTIST");
    const isEssay =
      post.tags.includes("ESSAY") || post.tags.includes("INSIGHT");

    // 1. ARTIST: 1열 와이드 강조
    if (isArtist) {
      return (
        <article
          key={post.id}
          onClick={() => navigate(`/art/contents/${post.id}`)}
          style={{
            gridColumn: isMobile ? "span 2" : "span 3",
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
            ARTIST
          </span>
          <h3
            style={{
              fontSize: isMobile ? "1.4rem" : "1.8rem",
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

    // 2. ESSAY / INSIGHT: 가로형 리스트
    if (isEssay) {
      return (
        <article
          key={post.id}
          onClick={() => navigate(`/art/contents/${post.id}`)}
          style={{
            gridColumn: isMobile ? "span 2" : "span 1",
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
              width: "85px",
              height: "85px",
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
              {post.tags[0]}
            </span>
            <h4
              style={{
                fontSize: "1rem",
                margin: "5px 0",
                lineHeight: 1.3,
                fontWeight: 600,
              }}
            >
              {post.title}
            </h4>
          </div>
        </article>
      );
    }

    // 3. 기본형 (SPACE, EXHIBITION 등): 2열 그리드
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
          {post.tags[0]}
        </span>
        <h3
          style={{
            fontSize: "0.95rem",
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
      {/* --- Section 1: Hero (랜덤 메인 노출) --- */}
      {mainPost && (
        <section
          style={{
            display: isMobile ? "block" : "flex",
            padding: isMobile ? "20px" : "60px 50px",
            gap: "60px",
            alignItems: "center",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              flex: 1.5,
              aspectRatio: isMobile ? "4/3" : "16/9",
              overflow: "hidden",
            }}
          >
            <img
              src={mainPost.img}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Main Hero"
            />
          </div>
          <div style={{ flex: 1, padding: isMobile ? "30px 0" : "0" }}>
            <span
              style={{
                fontSize: "11px",
                color: "#888",
                letterSpacing: "2px",
                fontWeight: 700,
              }}
            >
              EDITOR'S PICK
            </span>
            <h1
              style={{
                fontSize: isMobile ? "1.8rem" : "3rem",
                fontFamily: "'Nanum Myeongjo', serif",
                margin: "20px 0",
                lineHeight: 1.2,
              }}
            >
              {mainPost.title}
            </h1>
            <p style={{ color: "#555", lineHeight: 1.8, fontSize: "15px" }}>
              {mainPost.summary}
            </p>
            <button
              onClick={() => navigate(`/art/contents/${mainPost.id}`)}
              style={{
                marginTop: "25px",
                padding: "10px 20px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              READ FULL STORY
            </button>
          </div>
        </section>
      )}

      {/* --- Section 2: 전체 아카이브 그리드 (중복 포함) --- */}
      <div
        style={{
          backgroundColor: "#fff",
          borderTop: "1px solid #f0f0f0",
          marginTop: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "11px",
            textAlign: "center",
            letterSpacing: "4px",
            paddingTop: "60px",
            color: "#aaa",
          }}
        >
          ARCHIVE
        </h2>
        <main
          style={{
            padding: isMobile ? "30px 15px 80px" : "60px 50px 120px",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: isMobile ? "35px 15px" : "80px 40px",
          }}
        >
          {dummyPosts.map((post) => renderPostCard(post))}
        </main>
      </div>
    </div>
  );
};

export default MagazineHome;
