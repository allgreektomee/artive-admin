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
        lineHeight: 0, // 👈 이미지 아래 미세한 틈새 제거
        overflow: "hidden",
      }}
    >
      {/* 1. 기본 이미지 */}
      <img
        src={imageUrl}
        style={{ width: "100%", height: "auto", display: "block" }}
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
