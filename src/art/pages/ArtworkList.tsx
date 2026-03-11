import { useWordPress } from "../hook/useWordPress";
import ArtWorkCardHover from "../components/home/ArtworkHoverCard";
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
    <div style={{ padding: "80px 10px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // 리스트는 2열로 깔끔하게
          gap: "10px",
        }}
      >
        {data?.map((post) => (
          <div key={post.id} style={{ height: "300px" }}>
            {" "}
            {/* 높이 고정으로 칼정렬 */}
            <ArtWorkCardHover
              id={post.id}
              imageUrl={post.acf?.art_image}
              artworkName={post.acf?.artwork_name}
              artistName={post.acf?.artist_name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkList;
