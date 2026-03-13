// import { useEffect } from "react";
import MainBanner from "../components/section/MainBanner";
import { useResponsive } from "../hook/useResponsive";
import ArtWorksSection from "../components/section/ArtworkSection"; // 새로 만들 섹션
import InsightSection from "../components/section/InsightSection";
import LogSection from "../components/section/LogSection";

const ArtHome = () => {
  const { isMobile } = useResponsive();
  return (
    <div
      className="art-page-root"
      style={{
        display: "flex",
        flexDirection: "column",
        // 💡 여기서 섹션 간 간격을 조절합니다.
        gap: isMobile ? "100px" : "180px",
        paddingTop: isMobile ? "40px" : "80px", // 첫 섹션 위쪽 여백
        paddingBottom: "120px", // 마지막 섹션 아래쪽 여백
      }}
    >
      {/* 섹션 1: 메인 배너 */}

      {/* 섹션 2 : artwork */}
      {/* <SelectedWorks isMobile={isMobile} limit={10} /> */}
      <ArtWorksSection />
      {/* 섹션 2: 매거진 리스트 (이런 식으로 확장) */}
      {/* <MagazineList /> */}
      <MainBanner />
      <InsightSection />
      <LogSection />
    </div>
  );
};

export default ArtHome;
