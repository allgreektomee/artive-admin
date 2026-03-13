import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWordPress } from "../../hook/useWordPress";
import { useResponsive } from "../../hook/useResponsive";

const MainBanner = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useWordPress(32);
  const { isMobile } = useResponsive();
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const getBannerImage = (post: any) => post.acf?.art_image || "";
  const handleBannerClick = (post: any) =>
    navigate(`/art/post/banner/${post.id}`);
  const handleImageLoad = (postId: number) =>
    setLoadedImages((prev) => ({ ...prev, [postId]: true }));

  if (!loading && (error || !data || data.length === 0)) return null;

  // 💡 [핵심] 모든 기기에서 동일한 비율 유지 (가로 대비 세로 높이)
  // aspect-ratio를 지원하지 않는 브라우저를 위해 padding-top 방식 대신 최신 CSS 활용
  const bannerStyle: React.CSSProperties = {
    width: "100%",
    aspectRatio: isMobile ? "1.2 / 1" : "2.5 / 1", // 💡 모바일은 너무 얇으면 글자가 깨지니 살짝만 더 높게, 나머지는 동일 비율
    position: "relative",
    overflow: "visible", // 💡 박스가 삐져나와야 하므로 visible
    cursor: "pointer",
    marginBottom: isMobile ? "100px" : "120px", // 박스가 아래로 삐져나오니 마진 넉넉히
  };

  const commonMargin = isMobile ? "80px auto" : "40px auto 120px auto";

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: commonMargin,
          padding: isMobile ? "0 20px" : "0",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            ...bannerStyle,
            backgroundColor: "#f0f0f0",
            borderRadius: "2px",
          }}
        />
      </div>
    );
  }

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: commonMargin,
        padding: isMobile ? "0 20px" : "0",
        boxSizing: "border-box",
      }}
    >
      {data.map((post) => {
        const isLoaded = loadedImages[post.id];
        return (
          <div
            key={post.id}
            onClick={() => handleBannerClick(post)}
            style={bannerStyle}
          >
            {/* 1. 배경 이미지 (슬림한 고정 비율) */}
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "2px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <img
                src={getBannerImage(post)}
                onLoad={() => handleImageLoad(post.id)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.6s ease",
                  filter: isLoaded ? "none" : "blur(20px)",
                  opacity: isLoaded ? 1 : 0.7,
                }}
                alt={post.title?.rendered}
              />
            </div>

            {/* 2. 중앙 검정 유리 박스 (겹쳐진 느낌 극대화) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(12px)",

                // 💡 아티브님이 요청하신 "좌우는 줄이고 높이는 더 늘린" 비율
                width: isMobile ? "70%" : "50%",
                padding: isMobile ? "80px 20px" : "120px 40px",

                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
                zIndex: 2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)", // 💡 겹쳐진 느낌을 위해 그림자 살짝
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "1.3rem" : "2.2rem",
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: isMobile ? "4px" : "8px",
                  textTransform: "uppercase",
                  wordBreak: "keep-all",
                  lineHeight: 1.2,
                }}
              >
                {post.title?.rendered}
              </h1>
              <div
                style={{
                  width: "30px",
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  margin: "25px auto",
                }}
              ></div>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: isMobile ? "11px" : "14px",
                  fontWeight: 300,
                  letterSpacing: "2px",
                }}
              >
                {post.acf?.sub_title}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MainBanner;
