import React from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../hook/useResponsive"; // 아까 만든 반응형 훅

const MagazineHome: React.FC = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const images = {
    studioView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png",
    mentorView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/jsh.jpg",
    work100_1:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/work100_1.png",
    work120_process:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
    first:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/first.png",
    love: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/60.png",
    work9:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/rome.png",
    work10:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/home.png",
  };

  // 큐레이션된 더미 데이터
  const dummyPosts = [
    {
      id: "1",
      tag: "ARTIST",
      title: "아티브: 캔버스 위에 쓰는 에필로그",
      img: images.studioView,
    },
    {
      id: "2",
      tag: "SPACE",
      title: "빛이 머무는 자리를 기록하다",
      img: images.work10,
    },
    {
      id: "3",
      tag: "EXHIBITION",
      title: "120호 대작, 그 거대한 시작",
      img: images.work120_process,
    },
    {
      id: "4",
      tag: "ESSAY",
      title: "로마의 밤, 카라바조를 만나다",
      img: images.work9,
    },
    {
      id: "5",
      tag: "INSIGHT",
      title: "예술과 자본: 현대 미술의 이면",
      img: images.mentorView,
    },
    {
      id: "6",
      tag: "ARTIST",
      title: "첫 번째 획이 그어지던 순간",
      img: images.first,
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* --- 1. Hero Banner (데탑/모바일 높이 다름) --- */}
      <section
        style={{
          height: isMobile ? "80vh" : "75vh",
          width: "100%",
          position: "relative",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <img
          src={images.work100_1}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.9,
          }}
          alt="Main Work"
        />
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "40px" : "80px",
            left: isMobile ? "20px" : "60px",
            color: "#fff",
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "3px",
              fontWeight: 300,
              marginBottom: "15px",
            }}
          >
            FEATURED STORY
          </p>
          <h1
            style={{
              fontSize: isMobile ? "2.4rem" : "4.5rem",
              fontFamily: "'Nanum Myeongjo', serif",
              lineHeight: 1.1,
              margin: 0,
              wordBreak: "keep-all",
            }}
          >
            영원함에 대한
            <br />
            예술적 갈망
          </h1>
        </div>
        {/* 비네팅 효과 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)",
          }}
        />
      </section>

      {/* --- 2. Minimal Filter Bar --- */}
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: isMobile ? "20px" : "40px 60px",
          justifyContent: isMobile ? "flex-start" : "center",
          overflowX: isMobile ? "auto" : "hidden",
          borderBottom: "0.5px solid #f0f0f0",
          position: "sticky",
          top: "60px",
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        {["ALL", "ARTIST", "SPACE", "EXHIBITION", "ESSAY", "INSIGHT"].map(
          (label) => (
            <span
              key={label}
              style={{
                fontSize: "11px",
                letterSpacing: "1px",
                cursor: "pointer",
                fontWeight: label === "ALL" ? 900 : 400,
                color: label === "ALL" ? "#000" : "#888",
                flexShrink: 0,
              }}
            >
              {label}
            </span>
          ),
        )}
      </nav>

      {/* --- 3. Content Grid (반응형 3열/1열) --- */}
      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "40px 20px" : "80px 60px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? "50px" : "80px 40px",
        }}
      >
        {dummyPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => navigate(`/art/contents/${post.id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* 이미지: 4:5 비율 고정 (매거진 느낌) */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4/5",
                overflow: "hidden",
                backgroundColor: "#f9f9f9",
                marginBottom: "20px",
              }}
            >
              <img
                src={post.img}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={post.title}
              />
            </div>

            {/* 메타데이터 */}
            <div style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "1.5px",
                  color: "#888",
                  fontWeight: 600,
                }}
              >
                {post.tag}
              </span>
            </div>

            {/* 제목: 명조체로 포인트 */}
            <h3
              style={{
                fontSize: isMobile ? "1.3rem" : "1.5rem",
                fontFamily: "'Nanum Myeongjo', serif",
                margin: 0,
                lineHeight: 1.4,
                wordBreak: "keep-all",
              }}
            >
              {post.title}
            </h3>
          </article>
        ))}
      </main>

      {/* --- 4. Simple Footer --- */}
      <footer
        style={{
          padding: "100px 20px 40px",
          textAlign: "center",
          borderTop: "0.5px solid #f0f0f0",
          backgroundColor: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <a
            href="https://www.instagram.com/artivefor.me"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "12px",
              color: "#000",
              textDecoration: "none",
              letterSpacing: "1px",
            }}
          >
            INSTAGRAM
          </a>
          <a
            href="https://www.youtube.com/@artiveforme"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "12px",
              color: "#000",
              textDecoration: "none",
              letterSpacing: "1px",
            }}
          >
            YOUTUBE
          </a>
        </div>
        <p style={{ fontSize: "10px", color: "#aaa", letterSpacing: "0.5px" }}>
          © 2026 ARTIVE. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};

export default MagazineHome;
