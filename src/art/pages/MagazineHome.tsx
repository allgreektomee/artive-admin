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

  return (
    <div style={{ backgroundColor: "#fcfcfc" }}>
      {" "}
      {/* 완전 흰색보다 미색 추천 */}
      {/* --- Section 1: Hero (비대칭 레이아웃) --- */}
      <section
        style={{
          display: isMobile ? "block" : "flex",
          padding: isMobile ? "0" : "60px 50px",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1.5, aspectRatio: "16/9", overflow: "hidden" }}>
          <img
            src={images.work100_1}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: 1, padding: isMobile ? "20px" : "0" }}>
          <span
            style={{ fontSize: "11px", color: "#888", letterSpacing: "2px" }}
          >
            EXHIBITION
          </span>
          <h1
            style={{
              fontSize: isMobile ? "1.8rem" : "2.8rem",
              fontFamily: "serif",
              margin: "15px 0",
            }}
          >
            테스트 메인 타이틀: 레이아웃 믹스 버전
          </h1>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            여기에 메인 기사의 요약 내용이 들어갑니다. 뉴스 매거진처럼 정보를
            한쪽에 배치하여 시각적 밀도를 높입니다.
          </p>
        </div>
      </section>
      <hr
        style={{
          border: "none",
          borderTop: "0.5px solid #eee",
          margin: "0 50px",
        }}
      />
      {/* --- Section 2: Small Grid (정보 밀도 구간) --- */}
      <section style={{ padding: isMobile ? "40px 20px" : "60px 50px" }}>
        <h2
          style={{
            fontSize: "12px",
            letterSpacing: "3px",
            marginBottom: "30px",
          }}
        >
          LATEST RECORDS
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {/* 작은 썸네일과 제목만 있는 뉴스형 리스트 4개 배치 */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
                gap: "15px",
              }}
            >
              <div
                style={{
                  width: isMobile ? "80px" : "100%",
                  aspectRatio: "1/1",
                  backgroundColor: "#eee",
                }}
              >
                <img
                  src={images.work9}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "14px",
                    margin: "0 0 5px",
                    fontWeight: 600,
                  }}
                >
                  작은 기사 타이틀 테스트 {i}
                </h4>
                <span style={{ fontSize: "11px", color: "#aaa" }}>
                  2026.03.10
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* --- Section 3: Main Grid (기존 그리드) --- */}
      <main
        style={{
          padding: isMobile ? "20px" : "60px 50px",
          backgroundColor: "#fff",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: "40px",
        }}
      >
        {/* 기존에 만드신 dummyPosts 맵핑 */}
      </main>
    </div>
  );
};

export default MagazineHome;
