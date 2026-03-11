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
  const FIXED_HEIGHT = "30vh"; // 아까 정한 콤팩트한 높이

  return (
    <div
      onClick={() => navigate(`/art/post/artwork/${id}`)}
      style={{
        flex: "0 0 auto",
        display: "flex",
        flexDirection: "column",
        textAlign: "right",
        cursor: "pointer",
        // 💡 중요: 카드의 너비가 자식 콘텐츠(이미지)에 딱 붙게 설정
        width: "max-content",
      }}
    >
      {/* --- 1. 이미지 박스 --- */}
      <div
        style={{
          height: FIXED_HEIGHT,
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#fcfcfc",
          marginBottom: "16px",
        }}
      >
        <img
          src={imageUrl}
          alt={artworkName}
          style={{
            height: "100%",
            width: "auto", // 이미지 비율 보존
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* --- 2. 텍스트 영역: 이미지 너비를 넘지 않게 고정 --- */}
      <div
        style={{
          paddingRight: "2px",
          // 💡 부모(이미지) 너비만큼만 텍스트 영역을 잡음
          maxWidth: "100%",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "#828282",
            fontStyle: "italic",
            margin: "0 0 6px 0",
            lineHeight: "1",
            // 글자가 이미지 너비보다 길어지면 자연스럽게 말줄임표 처리
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {artworkInfo}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#828282",
            fontStyle: "italic",
            margin: "0 0 6px 0",
            lineHeight: "1",
            // 글자가 이미지 너비보다 길어지면 자연스럽게 말줄임표 처리
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {artistName}
        </p>

        <h4
          style={{
            fontSize: "16px",
            color: "#444",
            fontWeight: 600,
            margin: 0,
            lineHeight: "1.2",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
