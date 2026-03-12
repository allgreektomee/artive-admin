// import { useEffect } from "react";
import MainBanner from "../components/section/MainBanner";
// import { useResponsive } from "../hook/useResponsive";
import ArtWorksSection from "../components/section/ArtworkSection"; // 새로 만들 섹션
import InsightSection from "../components/section/InsightSection";
import LogSection from "../components/section/LogSection";

const ArtHome = () => {
  //   const { isMobile } = useResponsive();
  return (
    <div className="art-page-root">
      {/* 섹션 1: 메인 배너 */}
      <MainBanner />

      {/* 섹션 2 : artwork */}
      {/* <SelectedWorks isMobile={isMobile} limit={10} /> */}
      <ArtWorksSection />
      {/* 섹션 2: 매거진 리스트 (이런 식으로 확장) */}
      {/* <MagazineList /> */}
      <InsightSection />
      <LogSection />
    </div>
  );
};

export default ArtHome;
