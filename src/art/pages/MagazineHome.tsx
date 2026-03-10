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
      {/* 1. BANNER: isMobile에 따라 높이와 폰트 크기 가변 적용 */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "65vh" : "75vh", // 모바일은 살짝 낮게, 데스크탑은 웅장하게
          overflow: "hidden",
          marginBottom: "60px",
        }}
      >
        <img
          src={images.first}
          alt="Main Banner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(20, 20, 20, 0.65)",
            padding: isMobile ? "30px 20px" : "50px 70px", // 훅으로 패딩 조절
            textAlign: "center",
            width: isMobile ? "85%" : "70%", // 훅으로 너비 조절
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: isMobile ? "1.5rem" : "2.2rem", // 훅으로 폰트 크기 픽스
              margin: 0,
              fontWeight: 500,
              letterSpacing: "3px",
              lineHeight: "1.3",
            }}
          >
            2026 ART BUSAN
            <br />
            THE FIRST ARCHIVE
          </h1>
          <div
            style={{
              width: "30px",
              height: "1px",
              backgroundColor: "#fff",
              margin: "20px auto",
            }}
          ></div>
          <p
            style={{
              color: "#ccc",
              fontSize: "12px",
              fontWeight: 300,
              letterSpacing: "1px",
            }}
          >
            선과 면의 기록, 아카이브의 시작
          </p>
        </div>
      </section>

      {/* 2. ARTWORK: isMobile에 따라 이미지 고정 높이(Height) 조절 */}
      <section style={{ marginBottom: "100px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#aaa",
            letterSpacing: "2px",
            paddingLeft: "20px",
            marginBottom: "20px",
          }}
        >
          01 SELECTED ARTWORK
        </p>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            paddingLeft: "20px",
            paddingRight: "60px",
            gap: "15px",
            alignItems: "flex-end",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[images.work1, images.work2, images.work3, images.work100_1].map(
            (img, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={img}
                  alt={`Work ${i}`}
                  style={{
                    height: isMobile ? "350px" : "450px", // ★ 훅을 사용하여 높이 최적화
                    width: "auto",
                    display: "block",
                    objectFit: "contain",
                  }}
                />
                <p
                  style={{ fontSize: "10px", color: "#888", marginTop: "10px" }}
                >
                  Piece No. 0{i + 1}
                </p>
              </div>
            ),
          )}
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
