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
        width: "100%",

        height: "100%",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#000",
      }}
    >
      {/* 1. 기본 이미지 */}
      <img
        src={imageUrl}
        alt={artworkName}
        style={{
          width: "100%",
          height: "100%", // 박스 높이에 맞춤

          // 💡 핵심: 비율 깨지지 않게 꽉 채우되 넘치면 잘라냄
          objectFit: "cover",

          // 💡 핵심: 자를 때 그림의 정중앙을 기준으로 자름
          objectPosition: "center",

          display: "block",
          transition:
            "transform 0.6s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.5s ease",
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          opacity: isHovered ? 0.6 : 1,
        }}
      />

      {/* 2. 호버 오버레이  */}
      {/* 오버레이 레이어 */}
      <div
        style={{
          position: "absolute",
          inset: 0, // 👈 상하좌우 0으로 꽉 채움
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: isHovered ? 1 : 0, // 호버 상태에 따라 보임/안보임
          transition: "opacity 0.3s ease",
          zIndex: 2, // 👈 이미지보다 위에 오도록
        }}
      >
        <h4 style={{ color: "#fff", margin: 0 }}>{artworkName}</h4>
        <p style={{ color: "#ccc", margin: 0 }}>{artistName}</p>
      </div>
    </div>
  );
};

export default ArtworkHoverCard;
