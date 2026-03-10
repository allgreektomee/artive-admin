import React from "react";
import { useResponsive } from "../hook/useResponsive";
import ArtworkCard from "../components/ArtworkCard";
import { TypeA, TypeB, TypeC, TypeD } from "../components/LogTemplates";

const MagazineHome = () => {
  const { isMobile } = useResponsive();

  // 1. 배너 데이터 (워드프레스 'MAIN' 태그 최신글 1개 가정)
  const bannerData = {
    imgUrl:
      "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/first.png",
    mainTitle: "2026 ART BUSAN",
    subTitle: "THE FIRST ARCHIVE",
    desc: "선과 면의 기록, 아카이브의 시작",
  };

  // 2. 아트워크 데이터 (워드프레스 'ARTWORK' 태그 최신글 5개 가정)
  const artworks = [
    {
      id: 1,
      imgUrl:
        "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/123.png",
      title: "Trace of Yellow",
      size: "60P",
      material: "Acrylic on canvas",
    },
    {
      id: 2,
      imgUrl:
        "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/456.png",
      title: "Silence in Blue",
      size: "40F",
      material: "Oil on canvas",
    },
    {
      id: 3,
      imgUrl:
        "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/678.png",
      title: "Layered Memory",
      size: "100호",
      material: "Mixed media",
    },
    {
      id: 4,
      imgUrl:
        "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/work100_1.png",
      title: "Untitled",
      size: "30P",
      material: "Acrylic",
    },
    {
      id: 5,
      imgUrl:
        "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_2.png",
      title: "Morning Mist",
      size: "120호",
      material: "Oil on canvas",
    },
  ];

  // 3. 로그 데이터 (워드프레스 LOG 관련 태그들 + layoutType 포함)
  const logs = [
    {
      type: "b",
      tag: "PROCESS",
      title: "대작의 층위: 120호 기록",
      desc: "물감이 쌓이고 긁혀나가는 과정에서 발견된 질감.",
      imgUrl:
        "https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/120_1.png",
    },
    {
      type: "d",
      tag: "ESSAY",
      title: "물감이 쌓이고 긁혀나가는 과정에서 발견된 질감.물감이 쌓이고 ",
      desc: "ARTIVE MANIFESTO / 2026",
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
      {/* SECTION 1: BANNER */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "55vh" : "65vh",
          overflow: "hidden",
        }}
      >
        <img
          src={bannerData.imgUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Main"
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
            }}
          >
            {bannerData.mainTitle}
            <br />
            <span
              style={{
                fontSize: isMobile ? "1.2rem" : "1.8rem",
                fontWeight: 300,
                letterSpacing: "8px",
              }}
            >
              {bannerData.subTitle}
            </span>
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
            {bannerData.desc}
          </p>
        </div>
      </section>

      {/* SECTION 2: ARTWORK (여백 추가) */}
      <section
        style={{
          marginTop: isMobile ? "80px" : "120px", // 배너와의 간격을 더 시원하게 벌림
          marginBottom: isMobile ? "100px" : "140px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "#bbb",
            letterSpacing: "3px",
            paddingLeft: "20px",
            marginBottom: "25px",
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

      {/* SECTION 3: LOG */}
      <section style={{ paddingBottom: "100px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#bbb",
            letterSpacing: "3px",
            paddingLeft: "20px",
            marginBottom: "40px",
          }}
        >
          02 LOG: THE ARCHIVE
        </p>
        {logs.map((log, index) => renderLog(log, index))}
      </section>

      <footer
        style={{
          padding: "80px 0",
          textAlign: "center",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <p style={{ fontSize: "10px", color: "#ccc", letterSpacing: "3px" }}>
          © 2026 ARTIVE ARCHIVE
        </p>
      </footer>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default MagazineHome;
