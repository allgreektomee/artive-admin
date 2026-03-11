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
  // 💡 기기 상관없이 모바일 최적화된 비율로 고정
  const fixedHeight = "380px";
  const cardWidth = "280px";

  return (
    <div
      style={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        width: cardWidth, // 카드 너비 고정
      }}
    >
      {/* --- 이미지 영역: 높이 380px로 완전 고정 --- */}
      <div
        style={{
          height: fixedHeight,
          width: "100%",
          backgroundColor: "#fcfcfc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt={artworkName}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain", // 어떤 비율이 와도 꽉 차거나 여백 생기며 정렬됨
            display: "block",
          }}
        />
      </div>

      {/* --- 텍스트 영역: 모바일에서 보던 크기 그대로 --- */}
      <div style={{ marginTop: "14px", paddingRight: "4px" }}>
        {/* 1층: 우측 상단 인포 (이탤릭) */}
        <div style={{ textAlign: "right", marginBottom: "4px" }}>
          <p
            style={{
              fontSize: "11px",
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
              fontSize: "15px",
              color: "#1a1a1a",
              fontWeight: 600,
              margin: 0,
              lineHeight: "1.2",
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
