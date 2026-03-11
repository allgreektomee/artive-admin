import React from "react";
import MainBanner from "../components/home/MainBanner";
// import MagazineList from '../components/MagazineList'; // 나중에 추가

const ArtHome = () => {
  return (
    <div className="art-page-root">
      {/* 섹션 1: 메인 배너 */}
      <MainBanner />

      {/* 섹션 2: 매거진 리스트 (이런 식으로 확장) */}
      {/* <MagazineList /> */}
    </div>
  );
};

export default ArtHome;
