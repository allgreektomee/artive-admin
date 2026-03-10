// import React from 'react';

const MagazineHome = () => {
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
      {/* 1. BANNER: 모바일 대응 높이 및 텍스트 박스 */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "75vh",
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
            padding: "40px 30px", // 모바일 고려 패딩 축소
            textAlign: "center",
            width: "85%", // 모바일에서 박스가 넉넉히 차지하도록
            maxWidth: "500px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "1.6rem",
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
              margin: "15px auto",
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

      {/* 2. ARTWORK: 가로 스와이프 (높이 고정형) */}
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
          className="artwork-scroll"
          style={{
            display: "flex",
            overflowX: "auto",
            paddingLeft: "20px",
            paddingRight: "60px",
            gap: "15px",
            alignItems: "flex-end",
            WebkitOverflowScrolling: "touch", // iOS 부드러운 스크롤
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
                  className="artwork-img"
                  style={{
                    height: "380px", // 모바일 가독성을 위해 살짝 조절 (데스크탑에선 미디어쿼리로 키움)
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

      {/* 3. LOG & OTHERS (중략 - 이전과 동일하되 텍스트 크기 미세 조정) */}
      <section style={{ padding: "0 20px", marginBottom: "80px" }}>
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
            marginBottom: "20px",
          }}
        >
          <img src={images.work120_process} style={{ width: "100%" }} />
          <img src={images.work8} style={{ width: "100%" }} />
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: 500 }}>
          대작의 층위: 120호 기록
        </h3>
        <p style={{ color: "#444", fontSize: "13px", marginTop: "8px" }}>
          물감이 쌓이고 긁혀나가는 과정에서 발견된 질감.
        </p>
      </section>

      {/* 미디어 쿼리 스타일링 */}
      <style>{`
        .artwork-scroll::-webkit-scrollbar { display: none; }
        
        @media (min-width: 600px) {
          .artwork-img { height: 450px !important; }
          h1 { fontSize: '30px' !important; }
        }

        /* 모바일 텍스트 가독성 */
        @media (max-width: 480px) {
          p { font-size: 13px !important; line-height: 1.6 !important; }
        }
      `}</style>

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
    </div>
  );
};

export default MagazineHome;
