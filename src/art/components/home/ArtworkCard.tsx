import React from "react";
import { useNavigate } from "react-router-dom";

interface ArtworkCardProps {
  id: number;
  imageUrl: string;
  artworkName: string;
  artworkInfo: string;
  artistName: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  id,
  imageUrl,
  artworkName,
  artworkInfo,
  artistName,
}) => {
  const navigate = useNavigate();

  // 💡 한 화면에 담기기 좋은 최적의 고정 높이와 너비
  const BOX_HEIGHT = "400px";
  const BOX_WIDTH = "300px";

  return (
    <div
      onClick={() => navigate(`/art/post/${id}`)}
      style={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        width: BOX_WIDTH,
        textAlign: "right", // 모든 텍스트 우측 정렬
        cursor: "pointer",
      }}
    >
      {/* --- 1. 이미지 박스 (여기 높이가 고정되어야 라인이 맞습니다) --- */}
      <div
        style={{
          height: BOX_HEIGHT, // 👈 모든 카드의 높이를 400px로 강제 고정
          width: "100%",
          display: "flex",
          alignItems: "center", // 이미지가 가로형일 때 세로 중앙 정렬
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          marginBottom: "16px",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt={artworkName}
          style={{
            maxWidth: "100%", // 박스 너비를 넘지 않게
            maxHeight: "100%", // 박스 높이를 넘지 않게 (자르지 않음)
            width: "auto",
            height: "auto",
            objectFit: "contain", // 👈 비율 유지하며 박스 안에 다 넣기
            display: "block",
          }}
        />
      </div>

      {/* --- 2. 텍스트 영역 (검정 & ccc 우측 정렬) --- */}
      <div style={{ paddingRight: "2px" }}>
        {/* 상세 정보 (ccc 색상) */}
        <p
          style={{
            fontSize: "11px",
            color: "#ccc",
            fontStyle: "italic",
            margin: "0 0 6px 0",
          }}
        >
          {artworkInfo}
        </p>

        {/* 작품명 / 작가명 (검정) */}
        <h4
          style={{
            fontSize: "16px",
            color: "#444",
            fontWeight: 600,
            margin: 0,
            lineHeight: "1.3",
          }}
        >
          {artworkName}
          <span style={{ fontWeight: 300, color: "#ccc", margin: "0 8px" }}>
            /
          </span>
          {artistName}
        </h4>
      </div>
    </div>
  );
};

export default ArtworkCard;
