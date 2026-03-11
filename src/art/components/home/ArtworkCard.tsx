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

  // 💡 높이는 화면의 45%로 딱 고정 (상하 라인 정렬의 기준)
  const FIXED_HEIGHT = "45vh";

  return (
    <div
      onClick={() => navigate(`/art/post/artwork/${id}`)}
      style={{
        flex: "0 0 auto", // 👈 가로 스크롤에서 너비가 찌그러지지 않게 방지
        display: "flex",
        flexDirection: "column",
        textAlign: "right",
        cursor: "pointer",
        // width: "300px" 👈 이걸 지워야 이미지 비율대로 너비가 늘어납니다!
      }}
    >
      {/* --- 1. 이미지 박스: 높이 고정 + 너비 자동 --- */}
      <div
        style={{
          height: FIXED_HEIGHT,
          // width: "auto" 👈 자식 이미지 크기에 따라 박스가 늘어남
          backgroundColor: "#fcfcfc",
          marginBottom: "16px",
          display: "flex",
          justifyContent: "flex-end", // 우측 정렬 유지
        }}
      >
        <img
          src={imageUrl}
          alt={artworkName}
          style={{
            height: "100%", // 👈 박스 높이에 꽉 채움 (45vh)
            width: "auto", // 👈 비율에 맞춰 가로 길이는 자동 계산 (안 잘림!)
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* --- 2. 텍스트 영역 --- */}
      <div style={{ paddingRight: "2px" }}>
        <p
          style={{
            fontSize: "13px",
            color: "#ccc",
            fontStyle: "italic",
            margin: "0 0 6px 0",
            whiteSpace: "nowrap", // 텍스트도 한 줄로 정갈하게
          }}
        >
          {artistName} / {artworkInfo}
        </p>

        <h4
          style={{
            fontSize: "16px",
            color: "#444",
            fontWeight: 600,
            margin: 0,
            lineHeight: "1.3",
            whiteSpace: "nowrap",
          }}
        >
          {artworkName}
        </h4>
      </div>
    </div>
  );
};

export default ArtworkCard;
