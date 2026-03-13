import { useWordPress } from "../../hook/useWordPress";
import ArtWorkCardHover from "../home/ArtworkHoverCard";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";
import ViewMoreButton from "../home/ViewMoreButton";

const ArtworkGrid = () => {
  const { data, loading } = useWordPress(3);
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  if (loading) return null;

  // 💡 1. 부족한 3개를 채울 더미 데이터 (아카이브 느낌용)
  const dummyItems = [
    {
      id: "d1",
      acf: {
        art_image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
        artwork_name: "Archive Series 01",
        artist_name: "Artive",
      },
    },
    {
      id: "d2",
      acf: {
        art_image:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
        artwork_name: "Archive Series 02",
        artist_name: "Artive",
      },
    },
    {
      id: "d3",
      acf: {
        art_image: "https://images.unsplash.com/photo-1554188248-986adbb73be4",
        artwork_name: "Archive Series 03",
        artist_name: "Artive",
      },
    },
  ];

  // 💡 2. 데이터 합치기 (최대 6개)
  const allData = [...(data || []), ...dummyItems].slice(0, 6);

  // 💡 3. 그룹 쪼개기 (상단 3개 / 하단 3개)
  const firstGroup = allData.slice(0, 3); // 2-1 용
  const secondGroup = allData.slice(3, 6); // 1-2 용

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto", // 💡 부모 gap 관리를 위해 상하마진 제거
        padding: isMobile ? "0 20px" : "0",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            letterSpacing: "4px",
            fontWeight: 900,
          }}
        >
          ARTWORKS
        </p>
      </div>

      {/* --- 상단: 2-1 배치 --- */}
      <div style={gridContainerStyle}>
        {firstGroup.map((post, index) => (
          <div
            key={post.id}
            style={{ gridColumn: index === 2 ? "span 2" : "span 1" }}
          >
            <ArtWorkCardHover
              id={post.id}
              imageUrl={post.acf?.art_image}
              artworkName={post.acf?.artwork_name}
              artistName={post.acf?.artist_name}
            />
          </div>
        ))}
      </div>

      {/* --- 중앙: VIEW MORE 버튼 (배치 포인트) --- */}
      <ViewMoreButton
        label="VIEW MORE ARTWORKS"
        onClick={() => navigate("/art/works")}
      />

      {/* --- 하단: 1-2 배치 --- */}
      <div style={gridContainerStyle}>
        {secondGroup.map((post, index) => (
          <div
            key={post.id}
            style={{ gridColumn: index === 0 ? "span 2" : "span 1" }}
          >
            <ArtWorkCardHover
              id={post.id}
              imageUrl={post.acf?.art_image}
              artworkName={post.acf?.artwork_name}
              artistName={post.acf?.artist_name}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtworkGrid;
