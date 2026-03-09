import React from "react";

interface MagazineLayoutProps {
  children: React.ReactNode;
}

/**
 * 매거진 본문용 타이포그래피 레이아웃
 */
const MagazineLayout: React.FC<MagazineLayoutProps> = ({ children }) => {
  return <article className="magazine-layout">{children}</article>;
};

export default MagazineLayout;
