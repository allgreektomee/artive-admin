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

  return (
    <div
      // 💡 주소 중간에 'artwork'를 확실히 박아서 63번으로 보냅니다.
      onClick={() => navigate(`/art/post/artwork/${id}`)}
      style={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        width: "300px",
        textAlign: "right",
        cursor: "pointer",
      }}
    >
      {/* --- 이미지 박스 (반응형 vh 고정) --- */}
      <div
        style={{
          height: "45vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
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
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* --- 텍스트 (아티브님 설정: #444 / #ccc) --- */}
      <div style={{ paddingRight: "2px" }}>
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
        <h4
          style={{
            fontSize: "16px",
            color: "#444",
            fontWeight: 600,
            margin: 0,
          }}
        >
          {artworkName}
        </h4>
      </div>
    </div>
  );
};

export default ArtworkCard;
