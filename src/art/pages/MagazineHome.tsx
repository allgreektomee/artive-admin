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
      title: "TEST TITLE 01",
      summary: "TEST SUMMARY TEXT 01",
      img: images.work100_1,
    },
    {
      id: "2",
      tags: ["SPACE", "MAIN"],
      title: "TEST TITLE 02",
      summary: "TEST SUMMARY TEXT 02",
      img: images.studioView,
    },
    {
      id: "3",
      tags: ["EXHIBITION", "MAIN"],
      title: "TEST TITLE 03",
      summary: "TEST SUMMARY TEXT 03",
      img: images.work120_process,
    },
    {
      id: "4",
      tags: ["ESSAY"],
      title: "TEST TITLE 04",
      summary: "TEST SUMMARY TEXT 04",
      img: images.work9,
    },
    {
      id: "5",
      tags: ["INSIGHT"],
      title: "TEST TITLE 05",
      summary: "TEST SUMMARY TEXT 05",
      img: images.mentorView,
    },
    {
      id: "6",
      tags: ["SPACE"],
      title: "TEST TITLE 06",
      summary: "TEST SUMMARY TEXT 06",
      img: images.work10,
    },
  ];

  // 메인 랜덤 추출 (상단 노출용)
  const mainPool = dummyPosts.filter((post) => post.tags.includes("MAIN"));
  const mainPost = useMemo(() => {
    if (mainPool.length === 0) return null;
    return mainPool[Math.floor(Math.random() * mainPool.length)];
  }, [mainPool.length]);

  // 태그별 렌더링 카드 (이제 무조건 한 줄 차지)
  const renderPostCard = (post: any) => {
    const isArtist = post.tags.includes("ARTIST");
    const isEssay =
      post.tags.includes("ESSAY") || post.tags.includes("INSIGHT");

    // 1. ARTIST: 큰 이미지 중심의 피드
    if (isArtist) {
      return (
        <article
          key={post.id}
          onClick={() => navigate(`/art/contents/${post.id}`)}
          style={{ width: "100%", marginBottom: "60px", cursor: "pointer" }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <img
              src={post.img}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span style={{ fontSize: "11px", color: "#888", fontWeight: 700 }}>
            {post.tags[0]}
          </span>
          <h3 style={{ fontSize: "1.8rem", margin: "10px 0", fontWeight: 500 }}>
            {post.title}
          </h3>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.6 }}>
            {post.summary}
          </p>
        </article>
      );
    }

    // 2. ESSAY / INSIGHT: 가로형 (이미지 옆에 글) - 데스크탑에서도 한 줄로 크게
    if (isEssay) {
      return (
        <article
          key={post.id}
          onClick={() => navigate(`/art/contents/${post.id}`)}
          style={{
            width: "100%",
            display: "flex",
            gap: "30px",
            alignItems: "center",
            padding: "40px 0",
            borderBottom: "1px solid #eee",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: isMobile ? "100px" : "200px",
              height: isMobile ? "100px" : "200px",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={post.img}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "#aaa" }}>
              {post.tags[0]}
            </span>
            <h4
              style={{
                fontSize: isMobile ? "1.1rem" : "1.5rem",
                margin: "10px 0",
                fontWeight: 600,
              }}
            >
              {post.title}
            </h4>
            {!isMobile && (
              <p style={{ color: "#888", fontSize: "14px" }}>{post.summary}</p>
            )}
          </div>
        </article>
      );
    }

    // 3. 기본형 (SPACE, EXHIBITION): 시원한 한 줄 카드
    return (
      <article
        key={post.id}
        onClick={() => navigate(`/art/contents/${post.id}`)}
        style={{ width: "100%", marginBottom: "60px", cursor: "pointer" }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "4/3",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <img
            src={post.img}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <span style={{ fontSize: "11px", color: "#888", fontWeight: 600 }}>
          {post.tags[0]}
        </span>
        <h3 style={{ fontSize: "1.5rem", margin: "10px 0", fontWeight: 500 }}>
          {post.title}
        </h3>
      </article>
    );
  };

  return (
    <div
      style={{ backgroundColor: "#fff", color: "#1a1a1a", minHeight: "100vh" }}
    >
      {/* --- Section 1: Hero (메인 큐레이션) --- */}
      {mainPost && (
        <section
          style={{
            padding: isMobile ? "20px" : "60px 20px",
            maxWidth: "800px", // 피드처럼 보이기 위해 너비를 좁게 제한
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              overflow: "hidden",
              backgroundColor: "#fafafa",
            }}
          >
            <img
              src={mainPost.img}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              padding: "30px 0",
              textAlign: "center",
              borderBottom: "1px solid #eee",
            }}
          >
            <span
              style={{ fontSize: "12px", color: "#888", letterSpacing: "2px" }}
            >
              FEATURED
            </span>
            <h1
              style={{
                fontSize: isMobile ? "2rem" : "2.8rem",
                margin: "15px 0",
                fontWeight: 300,
              }}
            >
              {mainPost.title}
            </h1>
            <p
              style={{
                color: "#666",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              {mainPost.summary}
            </p>
          </div>
        </section>
      )}

      {/* --- Section 2: One Column Feed (한 줄 나열) --- */}
      <main
        style={{
          maxWidth: "800px", // 데스크탑에서도 이 너비를 넘지 않게 해서 1열 피드 유지
          margin: "0 auto",
          padding: isMobile ? "20px" : "40px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "11px",
            letterSpacing: "3px",
            marginBottom: "40px",
            color: "#ccc",
            textAlign: "center",
          }}
        >
          ARCHIVE FEED
        </h2>
        {dummyPosts.map((post) => renderPostCard(post))}
      </main>
    </div>
  );
};

export default MagazineHome;
