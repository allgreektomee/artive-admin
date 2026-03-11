import React, { useState } from "react";

interface BlurImageProps {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  hoverScale?: number;
}

const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  style,
  hoverScale = 1.03,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0", // 로딩 전 배경
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt || ""}
        onLoad={() => setIsLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 0.7s ease-in-out",
          filter: isLoaded ? "none" : "blur(20px)",
          opacity: isLoaded ? 1 : 0.6,
          transform: isLoaded ? "scale(1.0)" : "scale(1.1)",
          ...style, // 외부에서 넘겨주는 추가 스타일 합치기
        }}
        // 호버 시 효과도 로직에 포함 가능
        onMouseOver={(e) => {
          if (isLoaded && hoverScale !== 1) {
            e.currentTarget.style.transform = `scale(${hoverScale})`;
          }
        }}
        onMouseOut={(e) => {
          if (isLoaded) {
            e.currentTarget.style.transform = "scale(1.0)";
          }
        }}
      />
    </div>
  );
};

export default BlurImage;
