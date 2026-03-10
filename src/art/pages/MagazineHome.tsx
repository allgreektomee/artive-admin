import React from "react";
import { useResponsive } from "../hook/useResponsive";
import ArtworkCard from "../components/ArtworkCard";
// 새로 만든 컴포넌트들 임포트
import {
  FixedGridSection,
  TextListSection,
  InsightGrid,
  InsightTextList,
} from "../components/LogTemplates";

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

  // 02 LOG 데이터: 고정 그리드(2개) + 리스트(5개)
  const logGridItems = [
    { title: "대작의 층위: 120호 작업 기록", imgUrl: images.work120_process },
    { title: "연산동 화실의 오전 10시", imgUrl: images.work1 },
  ];

  const logListItems = [
    { title: "불완전한 선이 주는 위로에 대하여" },
    { title: "아크릴 과슈와 젯소를 섞는 시간" },
    { title: "2026 전시 라인업 구상" },
    { title: "작업실 근처 조용한 카페 발견" },
    { title: "비 오는 날의 캔버스 텐션 조절" },
  ];

  // 03 INSIGHT 데이터: 인사이트 그리드(2개) + 리스트(5개)
  const insightGridItems = [
    {
      tag: "EXHIBITION",
      title: "Layered Silence 개인전",
      imgUrl: images.work8,
    },
    {
      tag: "CLASS",
      title: "작가와 함께하는 유화 클래스",
      imgUrl: images.work100_1,
    },
  ];

  const insightListItems = [
    { title: "MANIFESTO: 예술은 질문이다" },
    { title: "ARTIST: 작가 아티브 소개" },
    { title: "ARCHIVE: 지난 작업들 다시보기" },
    { title: "CONTACT: 협업 및 작업 문의" },
    { title: "MEMBERSHIP: 아카이브 구독 서비스" },
  ];

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
      {/* 1. BANNER */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "55vh" : "65vh",
          overflow: "hidden",
          marginBottom: "40px",
        }}
      >
        <img
          src={images.first}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="main"
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
              textTransform: "uppercase",
            }}
          >
            2026 ARTIVE
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

      {/* 2. ARTWORK (가로 스크롤) */}
      <section style={{ marginTop: "60px", marginBottom: "80px" }}>
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
            scrollbarWidth: "none",
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

      {/* 3. LOG: 네이트온 스타일 고정 레이아웃 */}
      <section style={{ marginBottom: "60px" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#bbb",
            letterSpacing: "3px",
            paddingLeft: "20px",
            marginBottom: "20px",
          }}
        >
          02 LOG: THE ARCHIVE
        </p>
        <FixedGridSection items={logGridItems} isMobile={isMobile} />
        <TextListSection items={logListItems} />
      </section>

      {/* 4. INSIGHT: 매거진 B 스타일 감성 레이아웃 */}
      <section>
        <p
          style={{
            fontSize: "10px",
            color: "#bbb",
            letterSpacing: "3px",
            paddingLeft: "20px",
            marginBottom: "20px",
          }}
        >
          03 INSIGHT: VISION
        </p>
        <InsightGrid items={insightGridItems} />
        <InsightTextList items={insightListItems} />
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
