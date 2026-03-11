import React from "react";
import { useResponsive } from "../../hook/useResponsive";

interface ArtworkCardProps {
  imageUrl: string;
  artworkName: string; // acf.artwork_name
  artworkInfo: string; // acf.artwork_info
  artistName: string; // acf.artist_name
  index?: number;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  imageUrl,
  artworkName,
  artworkInfo,
  artistName,
  index,
}) => {
  const { isMobile } = useResponsive();

  return (
    <div
      style={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "200px" : "auto",
      }}
    >
      {/* --- 이미지 영역 (기존 와꾸 유지) --- */}
      <img
        src={imageUrl}
        alt={artworkName}
        style={{
          height: isMobile ? "clamp(150px, 25vh, 200px)" : "300px",
          width: "auto",
          display: "block",
          objectFit: "contain",
          backgroundColor: "#fcfcfc",
        }}
      />

      {/* --- 텍스트 영역 (새로운 레이아웃) --- */}
      <div style={{ marginTop: "12px" }}>
        {/* 1층: 우측 상단 인포 (Italic) */}
        <div style={{ textAlign: "right", marginBottom: "4px" }}>
          <p
            style={{
              fontSize: "10px",
              color: "#888",
              fontStyle: "italic",
              margin: 0,
              letterSpacing: "-0.2px",
            }}
          >
            {artworkInfo}
          </p>
        </div>

        {/* 2층: 좌측 하단 작품명 / 작가명 */}
        <div style={{ textAlign: "left" }}>
          <h4
            style={{
              fontSize: "13px",
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

          {/* 인덱스 표시 (선택사항, 아주 작게 아래나 위에 유지) */}
          <p
            style={{
              fontSize: "8px",
              color: "#ddd",
              marginTop: "4px",
              margin: 0,
            }}
          >
            {index !== undefined
              ? `NO. ${String(index + 1).padStart(2, "0")}`
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
