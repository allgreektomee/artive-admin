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

  // 기존 태그 활용 데이터
  const dummyPosts = [
    {
      id: "1",
      tags: ["ARTIST", "MAIN"],
      title: "TEST TITLE 01",
      summary: "TEST SUMMARY 01",
      img: images.work100_1,
    },
    {
      id: "2",
      tags: ["SPACE", "MAIN"],
      title: "TEST TITLE 02",
      summary: "TEST SUMMARY 02",
      img: images.studioView,
    },
    {
      id: "3",
      tags: ["EXHIBITION"],
      title: "TEST TITLE 03",
      summary: "TEST SUMMARY 03",
      img: images.work120_process,
    },
    {
      id: "4",
      tags: ["ESSAY"],
      title: "TEST TITLE 04",
      summary: "TEST SUMMARY 04",
      img: images.work9,
    },
    {
      id: "5",
      tags: ["INSIGHT"],
      title: "TEST TITLE 05",
      summary: "TEST SUMMARY 05",
      img: images.mentorView,
    },
  ];

  const mainPost = useMemo(() => {
    const mainPool = dummyPosts.filter((post) => post.tags.includes("MAIN"));
    return mainPool[Math.floor(Math.random() * mainPool.length)];
  }, []);

  return (
    <div style={{ backgroundColor: "#fff", color: "#1a1a1a" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0",
        }}
      >
        {/* --- 1. HERO BANNER --- */}
        {mainPost && (
          <section
            style={{ padding: "60px 0", borderBottom: "1px solid #eee" }}
          >
            <div
              onClick={() => navigate(`/art/contents/${mainPost.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
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
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "3px",
                    color: "#aaa",
                  }}
                >
                  FEATURED
                </span>
                <h1
                  style={{
                    fontSize: isMobile ? "1.8rem" : "2.5rem",
                    margin: "10px 0",
                    fontWeight: 300,
                  }}
                >
                  {mainPost.title}
                </h1>
              </div>
            </div>
          </section>
        )}

        {/* --- 2. ARTWORK SECTION (배너 바로 아래) --- */}
        <section style={{ padding: "80px 0" }}>
          <h2
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              color: "#000",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            SELECTED ARTWORK
          </h2>
          <div style={{ display: "grid", gap: "40px" }}>
            {/* 나중에 여러 작품일 때 이곳을 슬라이더나 그룹 커버로 구현 */}
            <div
              onClick={() => navigate(`/artwork/1`)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  overflow: "hidden",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={images.work120_process}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <p
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "15px",
                  color: "#888",
                }}
              >
                WORK_TITLE_01 / ARTIST_NAME
              </p>
            </div>
          </div>
        </section>

        {/* --- 3. MAGAZINE FEED (기존 태그 기반) --- */}
        <section style={{ borderTop: "1px solid #eee", padding: "80px 0" }}>
          <h2
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              color: "#000",
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            ARCHIVE
          </h2>
          {dummyPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/art/contents/${post.id}`)}
              style={{ width: "100%", marginBottom: "80px", cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span style={{ fontSize: "11px", fontWeight: 700 }}>
                  {post.tags[0]}
                </span>
                <span style={{ fontSize: "11px", color: "#ccc" }}>
                  2026.03.10
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/10",
                  overflow: "hidden",
                }}
              >
                <img
                  src={post.img}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: "1.6rem",
                    margin: "0 0 10px",
                    fontWeight: 500,
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.7 }}>
                  {post.summary}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MagazineHome;
