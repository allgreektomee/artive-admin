// import React from "react";
import { useResponsive } from "../hook/useResponsive";
import ArtworkCard from "../components/ArtworkCard";
import { TypeA, TypeB, TypeC, TypeD } from "../components/LogTemplates";

const MagazineHome = () => {
  const { isMobile } = useResponsive();

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
    work120_process:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
    work8:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_2.png",
  };

  // 2번 영역 데이터 (워드프레스 연동 대비)
  const artworks = [
    {
      id: 1,
      imgUrl: images.work1,
      title: "Trace of Yellow",
      size: "60P",
      material: "Acrylic on canvas",
    },
    {
      id: 2,
      imgUrl: images.work2,
      title: "Silence in Blue",
      size: "40F",
      material: "Oil on canvas",
    },
    {
      id: 3,
      imgUrl: images.work3,
      title: "Layered Memory",
      size: "100호",
      material: "Mixed media",
    },
    {
      id: 4,
      imgUrl: images.work100_1,
      title: "Untitled",
      size: "30P",
      material: "Acrylic",
    },
    {
      id: 5,
      imgUrl: images.work8,
      title: "Morning Mist",
      size: "120호",
      material: "Oil on canvas",
    },
  ];

  // 3번 영역 데이터 (Type 선택형)
  const logs = [
    {
      id: "log_01",
      type: "c", // 이미지 2개 밀착형 (Type C)
      tag: "PROCESS",
      title: "대작의 층위: 120호 기록",
      desc: "물감이 쌓이고 긁혀나가는 과정에서 발견된 질감.",
      imgUrl: images.work120_process,
      imgUrl2: images.work8,
    },
    {
      id: "log_02",
      type: "a", // 이미지 2개 밀착형 (Type C)
      tag: "SPACE",
      title: "대작의 층위: 120호 기록",
      desc: "물감이 쌓이고 긁혀나가는 과정에서 발견된 질감.",
      imgUrl: images.work8,
    },
    {
      id: "log_03",
      type: "b", // 이미지 2개 밀착형 (Type C)
      tag: "ESSAY",
      title: "대작의 층위: 120호 기록",
      desc: "물감이 쌓이고 긁혀나가는 과정에서 발견된 질감.",
      imgUrl: images.work120_process,
    },
    {
      id: "log_04",
      type: "d", // 이미지 2개 밀착형 (Type C)
      tag: "PROCESS",
      title: "대작의 층위: 기록",
      desc: "물감이 쌓이고 긁혀나가는 과정에서 발견된 질감.",
      imgUrl: images.work8,
    },
  ];

  // 로그 렌더러 함수
  const renderLog = (log: any, index: number) => {
    const props = { data: log, isMobile };
    switch (log.type) {
      case "a":
        return <TypeA key={index} {...props} />;
      case "b":
        return <TypeB key={index} {...props} />;
      case "c":
        return <TypeC key={index} {...props} />;
      case "d":
        return <TypeD key={index} {...props} />;
      default:
        return <TypeB key={index} {...props} />;
    }
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
        overflowX: "hidden",
      }}
    >
      {/* 1. BANNER: 임팩트 있는 첫 화면 */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "55vh" : "65vh",
          overflow: "hidden",
          marginBottom: isMobile ? "20px" : "40px",
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
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            width: isMobile ? "80%" : "65%",
            padding: isMobile ? "50px 20px" : "70px 40px",
            textAlign: "center",
            boxSizing: "border-box",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: isMobile ? "1.8rem" : "2.8rem",
              fontWeight: 500,
              margin: 0,
              letterSpacing: "5px",
              lineHeight: "1.2",
              textTransform: "uppercase",
            }}
          >
            2026 SEOUL ART FAIR
          </h1>
          <div
            style={{
              width: "50px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.5)",
              margin: "25px auto",
            }}
          ></div>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: isMobile ? "13px" : "16px",
              fontWeight: 300,
              letterSpacing: "2px",
            }}
          >
            선과 면의 기록, 아카이브의 시작
          </p>
        </div>
      </section>

      {/* 2. ARTWORK: ArtworkCard 컴포넌트 적용 (수정됨) */}
      <section
        style={{
          marginTop: isMobile ? "60px" : "100px",
          marginBottom: isMobile ? "80px" : "120px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "#bbb",
            letterSpacing: "3px",
            paddingLeft: "20px",
            marginBottom: "20px",
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
            gap: "20px",
            alignItems: "flex-start",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {artworks.map((art, i) => (
            <ArtworkCard
              key={art.id}
              index={i}
              imageUrl={art.imgUrl}
              title={art.title}
              size={art.size}
              material={art.material}
            />
          ))}
        </div>
      </section>

      {/* 3. LOG: 하나의 덩어리로 묶기 */}
      <section
        style={{
          padding: "0 0 120px 0", // 섹션 전체의 하단 여백만 크게
          backgroundColor: "#fff",
        }}
      >
        {/* 섹션 헤더: 여기서부터 LOG 시작임을 명시 */}
        <div style={{ paddingLeft: "20px", marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "10px",
              color: "#bbb",
              letterSpacing: "3px",
              margin: 0,
            }}
          >
            02 LOG: THE ARCHIVE
          </p>
          <div
            style={{
              width: "20px",
              height: "1px",
              backgroundColor: "#333",
              marginTop: "10px",
            }}
          ></div>
        </div>

        {/* 내부 아이템들을 묶는 컨테이너: 간격을 좁게 설정 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "40px" : "60px", // 아이템들끼리는 '이정도면 같은 팀'이다 싶을 정도의 간격
          }}
        >
          {logs.map((log) => (
            <div key={log.id}>{renderLog(log, 0)}</div>
          ))}
        </div>
      </section>

      {/* 4. INSIGHT: 나중에 이것도 컴포넌트화 가능 */}
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

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default MagazineHome;
