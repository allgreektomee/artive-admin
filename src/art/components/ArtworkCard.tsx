import React from "react";
import { useResponsive } from "../hook/useResponsive";

// 1. 여기서 약속(Interface)을 정의하고
interface ArtworkCardProps {
  imageUrl: string;
  title: string;
  size?: string;
  material?: string;
  // artist?: string;
  index?: number; // 에러난 index가 여기 들어있어야 함
}

// 2. 여기서 그 약속을 컴포넌트에 연결해줘야 합니다!
const ArtworkCard: React.FC<ArtworkCardProps> = ({
  imageUrl,
  title,
  size,
  material,
  // artist,
  index,
}) => {
  const { isMobile } = useResponsive();

  return (
    <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column" }}>
      <img
        src={imageUrl}
        alt={title}
        style={{
          height: isMobile ? "clamp(150px, 25vh, 200px)" : "300px",
          width: "auto",
          display: "block",
          objectFit: "contain",
          backgroundColor: "#fcfcfc",
        }}
      />
      <div style={{ marginTop: "12px", textAlign: "left" }}>
        <p style={{ fontSize: "9px", color: "#ccc", margin: 0 }}>
          {index !== undefined ? `NO. ${index + 1}` : ""}
        </p>
        <h4
          style={{
            fontSize: "12px",
            color: "#333",
            fontWeight: 600,
            margin: "2px 0",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: "10px",
            color: "#888",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          {size && `${size}. `}
          {material}
        </p>
      </div>
    </div>
  );
};

export default ArtworkCard;
