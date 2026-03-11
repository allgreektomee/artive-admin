import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div
      style={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        width: "300px", // 가로 너비 유지
        textAlign: "right",
        cursor: "pointer",
      }}
    >
      {/* --- 1. 이미지 박스: 화면 높이(vh)에 반응하도록 고정 --- */}
      <div
        style={{
          height: "45vh", // 👈 화면 높이의 45%로 고정. 어떤 기기든 한 화면에 쏙 들어옴
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          marginBottom: "16px",
          overflow: "hidden", // 혹시 모를 삐져나옴 방지
        }}
      >
        <img
          src={imageUrl}
          alt={artworkName}
          style={{
            maxWidth: "100%",
            maxHeight: "100%", // 박스 높이(45vh) 안에서만 움직임
            width: "auto",
            height: "auto",
            objectFit: "contain", // 👈 절대 안 잘리고 다 보여줌
            display: "block",
          }}
        />
      </div>

      {/* --- 2. 텍스트 영역: 아티브님 설정 그대로 --- */}
      <div style={{ paddingRight: "2px" }}>
        {/* 상단: 아티스트 / 정보 (ccc 색상) */}
        <p
          style={{
            fontSize: "13px",
            color: "#ccc",
            fontStyle: "italic",
            margin: "0 0 6px 0",
          }}
        >
          {artistName}
          <span style={{ fontWeight: 300, color: "#ccc", margin: "0 8px" }}>
            /
          </span>
          {artworkInfo}
        </p>

        {/* 하단: 작품명 (444 색상) */}
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
        </h4>
      </div>
    </div>
  );
};

export default ArtworkCard;
