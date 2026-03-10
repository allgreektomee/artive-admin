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
    <div style={{ backgroundColor: "#fcfcfc", color: "#1a1a1a" }}>
      {/* --- Section 1: Hero (비대칭 레이아웃) --- */}
      <section
        style={{
          display: isMobile ? "block" : "flex",
          padding: isMobile ? "0" : "60px 50px",
          gap: "60px",
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            flex: 1.6,
            aspectRatio: "16/10",
            overflow: "hidden",
            backgroundColor: "#eee",
          }}
        >
          <img
            src={images.work100_1}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="Hero"
          />
        </div>
        <div style={{ flex: 1, padding: isMobile ? "30px 20px" : "0" }}>
          <span
            style={{
              fontSize: "11px",
              color: "#888",
              letterSpacing: "2px",
              fontWeight: 700,
            }}
          >
            FEATURED EXHIBITION
          </span>
          <h1
            style={{
              fontSize: isMobile ? "2rem" : "3.2rem",
              fontFamily: "'Nanum Myeongjo', serif",
              margin: "20px 0",
              lineHeight: 1.2,
              wordBreak: "keep-all",
            }}
          >
            테스트 메인 타이틀: 레이아웃 믹스 버전
          </h1>
          <p style={{ color: "#555", lineHeight: 1.8, fontSize: "15px" }}>
            단순한 그리드를 넘어 정보의 밀도를 조절합니다. 왼쪽의 큰 이미지가
            시선을 잡고, 오른쪽의 텍스트가 서사를 완성하는 비대칭 구조입니다.
          </p>
          <button
            onClick={() => navigate("/art/contents/1")}
            style={{
              marginTop: "20px",
              padding: "10px 0",
              border: "none",
              background: "none",
              borderBottom: "1px solid #000",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            READ MORE
          </button>
        </div>
      </section>

      {!isMobile && (
        <hr
          style={{
            border: "none",
            borderTop: "0.5px solid #eee",
            margin: "0 50px",
          }}
        />
      )}

      {/* --- Section 2: Small Grid (뉴스형 리스트) --- */}
      <section
        style={{
          padding: isMobile ? "40px 20px" : "80px 50px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "12px",
            letterSpacing: "3px",
            marginBottom: "40px",
            textAlign: isMobile ? "left" : "center",
          }}
        >
          LATEST RECORDS
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: "30px",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
                gap: "20px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/art/contents/${i}`)}
            >
              <div
                style={{
                  width: isMobile ? "100px" : "100%",
                  aspectRatio: "1/1",
                  overflow: "hidden",
                  backgroundColor: "#eee",
                }}
              >
                <img
                  src={images.work9}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="Latest"
                />
              </div>
              <div>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#aaa",
                    letterSpacing: "1px",
                  }}
                >
                  INSIGHT
                </span>
                <h4
                  style={{
                    fontSize: "15px",
                    margin: "5px 0",
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  작은 기사 타이틀 테스트 {i}
                </h4>
                <span style={{ fontSize: "11px", color: "#ccc" }}>
                  2026.03.10
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 3: Main Grid (모바일 2열 버전) --- */}
      <div style={{ backgroundColor: "#fff", borderTop: "1px solid #f0f0f0" }}>
        <main
          style={{
            padding: isMobile ? "30px 15px" : "100px 50px",
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            // [변경] 모바일에서 1fr -> 2fr(또는 repeat(2, 1fr))로 변경
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            // [변경] 간격을 조금 좁혀서 촘촘하게 만듦
            gap: isMobile ? "25px 15px" : "60px 40px",
          }}
        >
          {dummyPosts.map((post) => (
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
                  backgroundColor: "#f9f9f9",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={post.img}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="Thumb"
                />
              </div>

              {/* [조정] 모바일 2열에서는 텍스트가 작아야 예쁩니다 */}
              <div
                style={{
                  fontSize: "9px",
                  color: "#888",
                  letterSpacing: "1px",
                  marginBottom: "5px",
                  fontWeight: 600,
                }}
              >
                {post.tag}
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "1rem" : "1.4rem", // 폰트 크기 축소
                  fontFamily: "'Nanum Myeongjo', serif",
                  margin: "0 0 8px",
                  lineHeight: 1.3,
                  wordBreak: "keep-all",
                }}
              >
                {post.title}
              </h3>

              {/* [조정] 2열일 때는 요약글을 숨기거나 아주 짧게 처리하는 게 깔끔합니다 */}
              {!isMobile && (
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
              )}
            </article>
          ))}
        </main>
      </div>
    </div>
  );
};

export default MagazineHome;
