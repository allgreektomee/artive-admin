import { useEffect } from "react";
import MainBanner from "../components/home/MainBanner";
// import { useResponsive } from "../hook/useResponsive";
import ArtWorks from "../components/home/ArtworkGrid"; // 새로 만들 섹션

const ArtHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //   const { isMobile } = useResponsive();
  return (
    <div className="art-page-root">
      {/* 섹션 1: 메인 배너 */}
      <MainBanner />

      {/* 섹션 2 : artwork */}
      {/* <SelectedWorks isMobile={isMobile} limit={10} /> */}
      <ArtWorks />
      {/* 섹션 2: 매거진 리스트 (이런 식으로 확장) */}
      {/* <MagazineList /> */}
    </div>
  );
};

export default ArtHome;
