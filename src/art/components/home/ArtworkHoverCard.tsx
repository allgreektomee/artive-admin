import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ArtworkHoverCardProps {
  id: number;
  imageUrl: string;
  artworkName: string;
  artistName: string;
}

const ArtworkHoverCard: React.FC<ArtworkHoverCardProps> = ({
  id,
  imageUrl,
  artworkName,
  artistName,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`/art/post/artwork/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%", // 그리드 시스템에 맞춰 100%
        aspectRatio: "1 / 1", // 오픈갤러리처럼 정사각 그리드 유지 시 사용
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* 1. 기본 이미지 */}
      <img
        src={imageUrl}
        alt={artworkName}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s ease",
          transform: isHovered ? "scale(1.05)" : "scale(1)", // 호버 시 살짝 확대
        }}
      />

      {/* 2. 호버 오버레이 (오픈갤러리 스타일) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // 어두운 반투명
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transition: "opacity 0.3s ease",
          opacity: isHovered ? 1 : 0, // 호버 시에만 나타남
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h4
          style={{
            color: "#fff",
            fontSize: "18px",
            fontWeight: 600,
            margin: "0 0 8px 0",
          }}
        >
          {artworkName}
        </h4>
        <div
          style={{
            width: "20px",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.6)",
            marginBottom: "10px",
          }}
        />
        <p
          style={{
            color: "#eee",
            fontSize: "14px",
            margin: 0,
          }}
        >
          {artistName}
        </p>
      </div>
    </div>
  );
};

export default ArtworkHoverCard;
