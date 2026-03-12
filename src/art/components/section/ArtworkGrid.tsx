// import React from "react";
import { useWordPress } from "../../hook/useWordPress";
import ArtWorkCardHover from "../home/ArtworkHoverCard";

import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";

const ArtworkGrid = ({
  limit = 9, // 2-1-2 패턴이라 3의 배수로 맞추는 게 예쁩니다.
}: {
  limit?: number;
}) => {
  // 워드프레스 카테고리 3번(작품) 데이터 가져오기
  const { data, loading } = useWordPress(3);
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  if (loading) return null;

  return (
    <section
      style={{
        marginTop: "60px",
        marginBottom: "80px",
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px", // 💡 라인 통일
        margin: "60px auto 80px auto", // 💡 중앙 정렬
        padding: isMobile ? "0 4px" : "0", // PC에서는 그리드가 1100px에 딱 맞게
        boxSizing: "border-box",
      }}
    >
      {/* 섹션 타이틀 (기존 스타일 유지) */}
      <p
        style={{
          fontSize: "16px",
          color: "#bbb",
          letterSpacing: "3px",
          paddingLeft: "10px",
          marginBottom: "20px",
        }}
      >
        ARTWORKS
        <p style={{ fontSize: "26px", color: "#333", fontWeight: 300 }}>흔적</p>
      </p>

      {/* 2-1-2-1 그리드 레이아웃 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // 기본 2열
          gap: "4px", // 갤러리 느낌을 위해 좁은 간격
          padding: "0 4px", // 전체 외곽 여백
        }}
      >
        {data?.slice(0, limit).map((post, index) => {
          // 3, 6, 9... 번째 포스트는 가로로 꽉 채우기 (2칸 차지)
          const isFullWidth = (index + 1) % 3 === 0;

          return (
            <div
              key={post.id}
              style={{
                gridColumn: isFullWidth ? "span 2" : "span 1",
                // 2개짜리 높이는 300px, 1개짜리(Full)는 450px로 시원하게 배치
                height: "auto",
              }}
            >
              <ArtWorkCardHover
                id={post.id}
                imageUrl={post.acf?.art_image}
                artworkName={post.acf?.artwork_name}
                artistName={post.acf?.artist_name}
              />
            </div>
          );
        })}
      </div>
      {/* 💡 VIEW ALL 버튼 추가 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <button
          onClick={() => navigate("/art/works")} // 리스트 페이지 주소
          style={{
            padding: "12px 40px",
            fontSize: "12px",
            letterSpacing: "2px",
            color: "#444",
            backgroundColor: "transparent",
            border: "1px solid #444",
            cursor: "pointer",
            transition: "all 0.3s ease",
            borderRadius: "0", // 아티브님 취향은 각진 느낌이죠?
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#444";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#444";
          }}
        >
          VIEW ALL WORKS
        </button>
      </div>
    </section>
  );
};

export default ArtworkGrid;
