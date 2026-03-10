import React from "react";

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
      {/* 1. BANNER 영역 (Height 70vh + 센터 타이틀) */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "70vh",
          overflow: "hidden",
          marginBottom: "80px",
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "40px 60px",
            textAlign: "center",
            minWidth: "60%",
            backdropFilter: "blur(4px)",
            borderRadius: "2px",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "28px",
              margin: 0,
              fontWeight: 500,
              letterSpacing: "3px",
              lineHeight: "1.4",
            }}
          >
            2026 ART BUSAN
            <br />
            THE FIRST ARCHIVE
          </h1>
          <p
            style={{
              color: "#ccc",
              fontSize: "13px",
              marginTop: "15px",
              fontWeight: 300,
              letterSpacing: "1px",
            }}
          >
            선과 면의 기록, 아카이브의 시작
          </p>
        </div>
      </section>

      {/* 2. ARTWORK 영역 (높이 고정형 스와이프) */}
      <section style={{ marginBottom: "120px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#aaa",
            letterSpacing: "2px",
            paddingLeft: "20px",
            marginBottom: "25px",
          }}
        >
          01 SELECTED ARTWORK
        </p>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            paddingLeft: "20px",
            paddingRight: "40px", // 마지막 여유 공간
            gap: "15px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            alignItems: "flex-start",
          }}
        >
          {/* 높이를 400px로 고정하고 너비는 이미지 비율에 맞춤(auto) */}
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
                    height: "400px", // 높이 고정
                    width: "auto", // 너비는 원본 비율에 따라 가변
                    display: "block",
                    objectFit: "contain", // 이미지 잘리지 않게 보호
                    backgroundColor: "#f9f9f9", // 비율 차이로 생기는 여백 대비
                  }}
                />
                <p
                  style={{
                    fontSize: "11px",
                    color: "#888",
                    marginTop: "12px",
                    textAlign: "left",
                  }}
                >
                  Piece No. 0{i + 1}
                </p>
              </div>
            ),
          )}
        </div>

        {/* 스크롤바 숨기기 스타일 (실제 프로젝트 CSS에 추가 권장) */}
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
      </section>

      {/* 3. LOG 영역 (샘플) */}
      <section style={{ padding: "0 20px", marginBottom: "100px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#aaa",
            letterSpacing: "2px",
            marginBottom: "40px",
          }}
        >
          02 LOG: PROCESS
        </p>
        <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
          <div style={{ flex: 4 }}>
            <img src={images.studioView} alt="Studio" />
          </div>
          <div style={{ flex: 6 }}>
            <h3 style={{ fontSize: "18px", marginTop: 0 }}>작업실 기록</h3>
            <p style={{ color: "#444", fontSize: "13px" }}>
              빛이 가장 깊게 들어오는 시간의 기록.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MagazineHome;
