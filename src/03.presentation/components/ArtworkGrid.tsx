import React from "react";
import { useNavigate } from "react-router-dom";
import type { BaseEntry } from "../../01.domain/models/BaseEntry";
import { useResponsive } from "../../art/hook/useResponsive";
import ArtWorkCardHover from "../../art/components/home/ArtworkHoverCard";
import ViewMoreButton from "../../art/components/home/ViewMoreButton";

interface ArtworkGridProps {
  artworks: BaseEntry[];
}

/**
 * [VIEW] Artwork 섹션 전용 그리드 컴포넌트
 * 역할: /art 페이지의 복잡한 그리드 레이아웃을 재현합니다.
 */
const ArtworkGrid: React.FC<ArtworkGridProps> = ({ artworks }) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  // 기존 /art 페이지와 동일하게 6개 아이템을 표시합니다.
  const displayArtworks = artworks.slice(0, 6);
  const firstGroup = displayArtworks.slice(0, 3);
  const secondGroup = displayArtworks.slice(3, 6);

  // 기존 ArtworkSection.tsx의 스타일 로직
  const desktopHeight = "350px";
  const mobileHeight = "200px";

  const getBoxStyle = (isFull: boolean): React.CSSProperties => ({
    width: "100%",
    height: isMobile ? mobileHeight : desktopHeight,
    gridColumn: isFull ? "span 2" : "span 1",
    overflow: "hidden",
  });

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: isMobile ? "0 20px" : "0",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            letterSpacing: "4px",
            fontWeight: 900,
          }}
        >
          ARTWORKS
        </p>
      </div>

      {/* --- 상단 세트 (2-1) --- */}
      <div style={gridStyle}>
        {firstGroup.map((post, index) => (
          <div key={post.id} style={getBoxStyle(index === 2)}>
            <ArtWorkCardHover
              id={Number(post.id)}
              imageUrl={post.thumbnail}
              artworkName={post.title}
              artistName={"Artive"} // BaseEntry에 artistName이 없으므로 플레이스홀더 사용
            />
          </div>
        ))}
      </div>

      {/* --- 중앙 뷰모어 --- */}
      <ViewMoreButton
        label=" VIEW MORE ARTWORKS"
        onClick={() => navigate("/art/works")}
      />

      {/* --- 하단 세트 (1-2) --- */}
      <div style={gridStyle}>
        {secondGroup.map((post, index) => (
          <div key={post.id} style={getBoxStyle(index === 0)}>
            <ArtWorkCardHover
              id={Number(post.id)}
              imageUrl={post.thumbnail}
              artworkName={post.title}
              artistName={"Artive"} // BaseEntry에 artistName이 없으므로 플레이스홀더 사용
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtworkGrid;
