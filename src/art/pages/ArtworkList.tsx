import { useWordPress } from "../hook/useWordPress";
import ArtworkCard from "../components/home/ArtworkCard";
import { useEffect } from "react";

const ArtworkList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, loading } = useWordPress(3); // 모든 작품 가져오기

  if (loading)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>
    );

  return (
    <div style={{ paddingTop: "80px", paddingBottom: "100px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: 700,
          marginBottom: "60px",
          letterSpacing: "4px",
        }}
      >
        ART WORKS
      </h2>

      {/* 리스트는 시원시원하게 1열 또는 2열로 도록처럼 배치 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "80px", // 작품 사이 간격을 넉넉히 줘서 도록 느낌 극대화
          padding: "0 20px",
        }}
      >
        {data?.map((post) => (
          <div
            key={post.id}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ArtworkCard
              id={post.id}
              imageUrl={post.acf?.art_image}
              artworkName={post.acf?.artwork_name}
              artworkInfo={post.acf?.artwork_info}
              artistName={post.acf?.artist_name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkList;
