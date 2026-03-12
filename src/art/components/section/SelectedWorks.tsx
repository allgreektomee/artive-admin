// import React from "react";
import { useWordPress } from "../../hook/useWordPress";
import ArtworkCard from "../home/ArtworkCard";

const SelectedWorks = ({
  limit = 10,
}: {
  isMobile: boolean;
  limit?: number;
}) => {
  // 워드프레스 카테고리 3번(작품)에서 데이터 가져오기
  const { data, loading } = useWordPress(3);

  if (loading) return null;

  return (
    <section style={{ marginTop: "60px" }}>
      <p
        style={{
          fontSize: "16px",
          color: "#bbb",
          letterSpacing: "3px",
          paddingLeft: "10px",
          marginBottom: "20px",
        }}
      >
        ART WORKS
      </p>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          paddingLeft: "20px",
          paddingRight: "60px",
          gap: "30px",
          scrollbarWidth: "none",
        }}
      >
        {data?.slice(0, limit).map((post) => (
          <ArtworkCard
            key={post.id}
            id={post.id} // 👈 여기에 post.id를 넣습니다 (예: 63)
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
