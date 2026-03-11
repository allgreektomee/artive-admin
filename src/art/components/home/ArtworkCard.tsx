import React from "react";
import { useResponsive } from "../../hook/useResponsive";

interface ArtworkCardProps {
  imageUrl: string;
  artworkName: string;
  artworkInfo: string;
  artistName: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  imageUrl,
  artworkName,
  artworkInfo,
  artistName,
}) => {
  const { isMobile } = useResponsive();

  return (
    <div
      style={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        // 모바일에서도 카드가 너무 작지 않게 너비 확보
        width: isMobile ? "75vw" : "auto",
        maxWidth: isMobile ? "320px" : "none",
      }}
    >
      {/* --- 이미지 영역: 비율 유지하며 시원하게 --- */}
      <img
        src={imageUrl}
        alt={artworkName}
        style={{
          // 모바일에서 높이를 350px~400px 정도로 넉넉히 주거나 auto로 비율 유지
          height: isMobile ? "380px" : "420px",
          width: "100%",
          display: "block",
          objectFit: "contain", // 이미지 전체가 잘리지 않게
          backgroundColor: "#fcfcfc",
        }}
      />

      {/* --- 텍스트 영역 (넘버링 삭제) --- */}
      <div style={{ marginTop: "16px" }}>
        {/* 1층: 우측 상단 인포 */}
        <div style={{ textAlign: "right", marginBottom: "6px" }}>
          <p
            style={{
              fontSize: isMobile ? "11px" : "10px",
              color: "#888",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            {artworkInfo}
          </p>
        </div>

        {/* 2층: 좌측 하단 작품명 / 작가명 */}
        <div style={{ textAlign: "left" }}>
          <h4
            style={{
              fontSize: isMobile ? "16px" : "14px",
              color: "#1a1a1a",
              fontWeight: 600,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            {artworkName}{" "}
            <span style={{ fontWeight: 300, color: "#bbb", margin: "0 4px" }}>
              /
            </span>{" "}
            {artistName}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
