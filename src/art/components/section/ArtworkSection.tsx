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

  // 더미 데이터 3개 추가 (총 6개 유지)
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

  // 💡 [핵심] 이미지 원본 무시! 박스 높이를 pixel로 고정 (데탑 기준)
  // 모바일에서는 비율로 작동하게 해서 깨짐 방지
  const desktopHeight = "350px";
  const mobileHeight = "200px";

  const getBoxStyle = (isFull: boolean) => ({
    width: "100%",
    // 💡 1개짜리든 2개짜리든 높이를 똑같이 고정 (아티브님이 원하신 '똑같은 박스 형태')
    height: isMobile ? mobileHeight : desktopHeight,
    gridColumn: isFull ? "span 2" : "span 1",
    overflow: "hidden",
  });

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

      {/* --- 상단 세트 (2-1) --- */}
      <div style={gridStyle}>
        {firstGroup.map((post, index) => (
          <div key={post.id} style={getBoxStyle(index === 2)}>
            <ArtWorkCardHover
              id={post.id}
              imageUrl={post.acf?.art_image}
              artworkName={post.acf?.artwork_name}
              artistName={post.acf?.artist_name}
            />
          </div>
        ))}
      </div>

      {/* --- 중앙 뷰모어 --- */}
      {/* --- 💡 아트워크 전용: 박스형 뷰모어 버튼 --- */}
      <div
        style={{ margin: isMobile ? "60px 0" : "100px 0", textAlign: "center" }}
      >
        <button
          onClick={() => navigate("/art/works")}
          style={{
            background: "none",
            border: "1px solid #ddd", // 테두리 추가
            color: "#888",
            fontSize: "11px",
            letterSpacing: "3px",
            cursor: "pointer",
            fontWeight: 700,
            padding: "16px 45px", // 박스 형태를 위한 패딩
            textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#000";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#ddd";
            e.currentTarget.style.color = "#888";
          }}
        >
          VIEW MORE ARTWORKS +
        </button>
      </div>

      {/* --- 하단 세트 (1-2) --- */}
      <div style={gridStyle}>
        {secondGroup.map((post, index) => (
          <div key={post.id} style={getBoxStyle(index === 0)}>
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
