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

  // 💡 더미 데이터 (이미지 6개를 맞추기 위함)
  const dummyItems = [
    {
      id: "d1",
      acf: {
        art_image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
        artwork_name: "Archive 01",
        artist_name: "Artive",
      },
    },
    {
      id: "d2",
      acf: {
        art_image:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
        artwork_name: "Archive 02",
        artist_name: "Artive",
      },
    },
    {
      id: "d3",
      acf: {
        art_image: "https://images.unsplash.com/photo-1554188248-986adbb73be4",
        artwork_name: "Archive 03",
        artist_name: "Artive",
      },
    },
  ];

  const allData = [...(data || []), ...dummyItems].slice(0, 6);
  const firstGroup = allData.slice(0, 3);
  const secondGroup = allData.slice(3, 6);

  // 💡 [핵심] 모든 이미지 카드의 비율을 통일 (가로2:세로1)
  // 만약 1개짜리가 너무 얇아보이면 1.5/1 정도로 조절 가능합니다.
  // const cardAspectRatio = "2 / 1";

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
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

      {/* --- 상단: 2개(반반) + 1개(전체) --- */}
      <div style={gridStyle}>
        {firstGroup.map((post, index) => (
          <div
            key={post.id}
            style={{
              gridColumn: index === 2 ? "span 2" : "span 1",
              aspectRatio: index === 2 ? "2 / 1" : "1 / 1", // 💡 1개짜리는 2:1, 2개짜리는 1:1로 하면 정사각형 느낌나서 더 이쁩니다.
              overflow: "hidden",
            }}
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

      {/* --- 중앙: VIEW MORE --- */}
      <ViewMoreButton
        label="VIEW MORE ARTWORKS"
        onClick={() => navigate("/art/works")}
      />

      {/* --- 하단: 1개(전체) + 2개(반반) --- */}
      <div style={gridStyle}>
        {secondGroup.map((post, index) => (
          <div
            key={post.id}
            style={{
              gridColumn: index === 0 ? "span 2" : "span 1",
              aspectRatio: index === 0 ? "2 / 1" : "1 / 1", // 💡 뷰모어 바로 아래 '1' 영역도 2:1 고정!
              overflow: "hidden",
            }}
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
