import React from "react";

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
  // 💡 이미지와 카드의 크기를 고정 (모바일/데스크탑 공용)
  const FIXED_HEIGHT = "400px";
  const FIXED_WIDTH = "300px";

  return (
    <div
      style={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        width: FIXED_WIDTH,
        textAlign: "right", // 👈 모든 텍스트 기본 우측 정렬
      }}
    >
      {/* --- 이미지 영역: 높이 완전 고정 --- */}
      <div
        style={{
          height: FIXED_HEIGHT,
          width: "100%",
          backgroundColor: "#f7f7f7", // 배경색 살짝 조절
          overflow: "hidden",
          marginBottom: "16px", // 이미지와 텍스트 간격
        }}
      >
        <img
          src={imageUrl}
          alt={artworkName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // 👈 영역을 빈틈없이 채워 높이를 맞춤
            display: "block",
          }}
        />
      </div>

      {/* --- 텍스트 영역: 우측 정렬 --- */}
      <div style={{ paddingRight: "2px" }}>
        {/* 1층: 상세 정보 (Italic) */}
        <p
          style={{
            fontSize: "11px",
            color: "#888",
            fontStyle: "italic",
            margin: "0 0 6px 0",
            letterSpacing: "-0.2px",
          }}
        >
          {artworkInfo}
        </p>

        {/* 2층: 작품명 / 작가명 */}
        <h4
          style={{
            fontSize: "16px",
            color: "#444",
            fontWeight: 600,
            margin: 0,
            lineHeight: "1.3",
            letterSpacing: "-0.5px",
          }}
        >
          {artworkName}
          <span style={{ fontWeight: 300, color: "#ccc", margin: "0 6px" }}>
            /
          </span>
          {artistName}
        </h4>
      </div>
    </div>
  );
};

export default ArtworkCard;
