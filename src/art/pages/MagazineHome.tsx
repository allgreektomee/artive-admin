// import React from 'react';
import { useResponsive } from "../hook/useResponsive"; // 경로에 맞춰 수정해서 쓰세요!

const MagazineHome = () => {
  const { isMobile } = useResponsive(); // 아티브님이 만든 훅 호출

  const images = {
    first:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/first.png",
    work1:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png",
    work2:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png",
    work3:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
    work100_1:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/work100_1.png",
    studioView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/studio.png",
    work120_process:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
    work8:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_2.png",
    mentorView:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/jsh.jpg",
    love: "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/60.png",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
        color: "#1a1a1a",
        fontFamily: '"Noto Serif KR", serif',
      }}
    >
      {/* 1. BANNER: 화면 높이의 절반을 조금 넘게 (55vh) */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "55vh" : "65vh",
          overflow: "hidden",
          marginBottom: isMobile ? "20px" : "40px", // 여백을 줄여서 아트워크를 위로 바짝 붙임
        }}
      >
        <img
          src={images.first}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            /* 투명도를 다시 연하게(0.4) 조정하고 블러를 강화해서 고급스럽게 */
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",

            /* 글자 영역이 화면의 반 이상(75~80%)을 차지하도록 설정 */
            width: isMobile ? "80%" : "65%",
            padding: isMobile ? "50px 20px" : "70px 40px",
            textAlign: "center",
            boxSizing: "border-box",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Main Title: 폰트를 키우고 자간(letterSpacing)을 넓혀 가독성 확보 */}
          <h1
            style={{
              color: "#fff",
              fontSize: isMobile ? "1.8rem" : "2.8rem",
              fontWeight: 500,
              margin: 0,
              letterSpacing: "5px", // 자간을 넓혀서 면적을 더 차지하게 함
              lineHeight: "1.2",
              textTransform: "uppercase",
            }}
          >
            2026 SEOUL ART FAIR
            <br />
          </h1>

          {/* 구분선: 영역을 시각적으로 더 넓어 보이게 함 */}
          <div
            style={{
              width: "50px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.5)",
              margin: "25px auto",
            }}
          ></div>

          {/* Sub Title: 명조체의 느낌을 살려 우아하게 */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: isMobile ? "13px" : "16px",
              fontWeight: 300,
              letterSpacing: "2px",
              wordBreak: "keep-all",
            }}
          >
            선과 면의 기록, 아카이브의 시작
          </p>
        </div>
      </section>

      {/* 2. ARTWORK: 화면 높이에 비례하게 (약 20~25vh) */}
      <section style={{ marginBottom: isMobile ? "40px" : "80px" }}>
        <p
          style={{
            fontSize: "9px",
            color: "#bbb",
            letterSpacing: "2px",
            paddingLeft: "20px",
            marginBottom: "10px",
          }}
        >
          01 SELECTED WORKS
        </p>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            paddingLeft: "20px",
            paddingRight: "60px",
            gap: "12px",
            alignItems: "flex-end",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[
            images.work1,
            images.work2,
            images.work3,
            images.work100_1,
            images.work8,
          ].map((img, i) => (
            <div key={i} style={{ flex: "0 0 auto" }}>
              <img
                src={img}
                style={{
                  /* ★ 핵심: 기기 높이(vh)에 맞춤 + 최대/최소값(clamp)으로 가이드라인 형성 */
                  height: isMobile ? "clamp(140px, 22vh, 180px)" : "250px",
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <p
                style={{
                  fontSize: "9px",
                  color: "#ccc",
                  marginTop: "6px",
                  textAlign: "center",
                }}
              >
                0{i + 1}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LOG: 이미지 밀착형 (모바일에서 여백 더 타이트하게) */}
      <section style={{ padding: "0 20px", marginBottom: "100px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#aaa",
            letterSpacing: "2px",
            marginBottom: "25px",
          }}
        >
          02 LOG: PROCESS
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            marginBottom: "25px",
          }}
        >
          <img src={images.work120_process} style={{ width: "100%" }} />
          <img src={images.work8} style={{ width: "100%" }} />
        </div>
        <h3 style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: 500 }}>
          대작의 층위: 120호 기록
        </h3>
        <p style={{ color: "#444", fontSize: "14px", marginTop: "10px" }}>
          물감이 쌓이고 긁혀나가는 과정에서 발견된 질감.
        </p>
      </section>

      {/* 4. INSIGHT: 메시지 강조 (모바일 패딩 조절) */}
      <section style={{ marginBottom: "100px" }}>
        <div
          style={{
            backgroundColor: "#f6f6f6",
            padding: isMobile ? "80px 30px" : "120px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: 300,
              lineHeight: 1.6,
              margin: 0,
              wordBreak: "keep-all",
            }}
          >
            "작가는 정답을 내놓는 사람이 아니라,
            <br />
            끊임없이 질문을 던지는 사람이다."
          </h2>
        </div>
      </section>

      <footer
        style={{
          padding: "60px 0",
          textAlign: "center",
          borderTop: "1px solid #eee",
        }}
      >
        <p style={{ fontSize: "10px", color: "#bbb", letterSpacing: "2px" }}>
          © 2026 ARTIVE ARCHIVE
        </p>
      </footer>

      {/* 스크롤바 숨기기 */}
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default MagazineHome;
