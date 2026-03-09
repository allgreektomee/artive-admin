import React from "react";
// import { useNavigate } from "react-router-dom";
import { useResponsive } from "../hook/useResponsive";

const MagazineHome: React.FC = () => {
  const { isMobile } = useResponsive();
  //   const navigate = useNavigate();

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
      title: "테스트 타이틀 01",
      summary: "본문 내용 요약 테스트입니다.",
      img: images.studioView,
    },
    {
      id: "2",
      tag: "SPACE",
      title: "테스트 타이틀 02",
      summary: "본문 내용 요약 테스트입니다.",
      img: images.work10,
    },
    {
      id: "3",
      tag: "EXHIBITION",
      title: "테스트 타이틀 03",
      summary: "본문 내용 요약 테스트입니다.",
      img: images.work120_process,
    },
    {
      id: "4",
      tag: "ESSAY",
      title: "테스트 타이틀 04",
      summary: "본문 내용 요약 테스트입니다.",
      img: images.work9,
    },
    {
      id: "5",
      tag: "INSIGHT",
      title: "테스트 타이틀 05",
      summary: "본문 내용 요약 테스트입니다.",
      img: images.mentorView,
    },
    {
      id: "6",
      tag: "ARTIST",
      title: "테스트 타이틀 06",
      summary: "본문 내용 요약 테스트입니다.",
      img: images.first,
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff", width: "100%" }}>
      {/* 배너 영역 */}
      <section
        style={{
          height: isMobile ? "70vh" : "60vh",
          width: "100%",
          position: "relative",
          backgroundColor: "#eee",
          marginTop: "0", // 상단 여백 제거
        }}
      >
        <img
          src={images.work100_1}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Hero"
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: isMobile ? "20px" : "50px",
            color: "#fff",
            zIndex: 2,
          }}
        >
          <h1 style={{ fontSize: isMobile ? "2rem" : "3.5rem", margin: 0 }}>
            MAIN TITLE TEST
          </h1>
          <p style={{ margin: "10px 0 0" }}>Subtitle content test text.</p>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
          }}
        />
      </section>

      {/* 태그 필터 */}
      {/* 2. 필터 영역: 배너 바로 밑에 붙임 */}
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "15px 20px",
          justifyContent: isMobile ? "flex-start" : "center",
          overflowX: "auto",
          borderBottom: "1px solid #f0f0f0",
          backgroundColor: "#fff",
        }}
      >
        {["ALL", "ARTIST", "SPACE", "EXHIBITION", "ESSAY", "INSIGHT"].map(
          (tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {tag}
            </span>
          ),
        )}
      </nav>

      {/* 그리드 리스트 */}
      {/* 3. 그리드 리스트 */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "30px 20px" : "60px 20px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "30px",
        }}
      >
        {dummyPosts.map((post) => (
          <article key={post.id} style={{ cursor: "pointer" }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "4/5",
                overflow: "hidden",
                marginBottom: "15px",
              }}
            >
              <img
                src={post.img}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt="Thumb"
              />
            </div>
            <h3 style={{ fontSize: "1.1rem", margin: "0 0 5px" }}>
              {post.title}
            </h3>
            <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>
              {post.summary}
            </p>
          </article>
        ))}
      </main>

      <footer
        style={{
          padding: "60px 20px",
          textAlign: "center",
          borderTop: "1px solid #eee",
          color: "#aaa",
          fontSize: "12px",
        }}
      >
        © 2026 ARTIVE.
      </footer>
    </div>
  );
};

export default MagazineHome;
