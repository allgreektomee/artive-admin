// import React from "react";
import { useWordPress } from "../../hook/useWordPress";
import ArtworkCard from "./ArtworkCard";

const SelectedWorks = ({
  limit = 10,
}: {
  isMobile: boolean;
  limit?: number;
}) => {
  // 워드프레스 카테고리 33번(작품)에서 데이터 10개 가져오기
  const { data, loading } = useWordPress(33);

  if (loading) return null; // 또는 로딩 스켈레톤

  return (
    <section style={{ marginTop: "40px", marginBottom: "60px" }}>
      {/* 섹션 타이틀 */}
      <p
        style={{
          fontSize: "10px",
          color: "#bbb",
          letterSpacing: "3px",
          paddingLeft: "20px",
          marginBottom: "20px",
        }}
      >
        01 SELECTED WORKS
      </p>

      {/* 가로 스크롤 영역 */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          paddingLeft: "20px",
          paddingRight: "60px", // 마지막 카드 여백
          gap: "30px",
          scrollbarWidth: "none", // 스크롤바 숨기기
        }}
      >
        {data?.slice(0, limit).map((post, index) => (
          <ArtworkCard
            key={post.id}
            index={index}
            imageUrl={post.acf?.art_image}
            artworkName={post.acf?.artwork_name}
            artworkInfo={post.acf?.artwork_info}
            artistName={post.acf?.artist_name}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;
