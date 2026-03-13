// import React from "react";
import { useWordPress } from "../../hook/useWordPress";
import ArtWorkCardHover from "../home/ArtworkHoverCard";

import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";
import ViewMoreButton from "../home/ViewMoreButton";

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
        marginTop: "30px",
        marginBottom: "80px",
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px", // 💡 핵심: 1100px로 제한
        margin: "0 auto", // 💡 핵심: 중앙 정렬
        padding: isMobile ? "0 20px" : "0", // 💡 모바일에서만 좌우 여백, PC는 1100px 안에서 정렬
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          marginBottom: isMobile ? "30px" : "50px",
          paddingTop: "10px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            letterSpacing: "4px",
            marginBottom: "8px",
          }}
        >
          ARTWORKS
        </p>
      </div>

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
      <ViewMoreButton
        label="VIEW MORE ARTWORKS"
        onClick={() => navigate("/art/works")}
      />
    </section>
  );
};

export default ArtworkGrid;
