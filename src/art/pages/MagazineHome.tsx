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
      {/* 1. BANNER: 조금 더 컴팩트하게 조절 (55vh~60vh) */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "55vh" : "65vh", // 배너 높이를 살짝 줄여 아래 아트워크를 끌어올림
          overflow: "hidden",
          marginBottom: "40px", // 간격을 좁혀서 아트워크가 바로 보이게
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
            backgroundColor: "rgba(20, 20, 20, 0.7)",
            padding: "30px 20px",
            textAlign: "center",
            width: "80%",
            backdropFilter: "blur(10px)",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "1.3rem",
              margin: 0,
              letterSpacing: "3px",
            }}
          >
            2026 ART BUSAN
            <br />
            ARCHIVE
          </h1>
        </div>
      </section>

      {/* 2. ARTWORK: 150px 콤팩트 스와이프 (Index View) */}
      <section style={{ marginBottom: "80px" }}>
        <p
          style={{
            fontSize: "9px",
            color: "#bbb",
            letterSpacing: "2px",
            paddingLeft: "20px",
            marginBottom: "15px",
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
            gap: "12px", // 간격도 좁혀서 오밀조밀하게
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
                  height: isMobile ? "150px" : "220px", // ★ 아티브님 제안: 150px 적용
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)", // 살짝 그림자 주면 작아도 고급스러움
                }}
              />
              <p
                style={{
                  fontSize: "9px",
                  color: "#ccc",
                  marginTop: "8px",
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
