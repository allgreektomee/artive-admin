import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWordPress } from "../../hook/useWordPress";
import { useResponsive } from "../../hook/useResponsive";
import BlurImage from "../../components/BlurImage";

const MainBanner = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useWordPress(32);
  const { isMobile } = useResponsive();

  // 개별 포스트의 이미지 로딩 상태 관리
  const [loadedImages] = useState<Record<number, boolean>>({});

  const getBannerImage = (post: any) => {
    return post.acf?.art_image || "";
  };

  const handleBannerClick = (post: any) => {
    const categoryType = "banner";
    navigate(`/art/post/${categoryType}/${post.id}`);
  };

  if (loading)
    return (
      <div
        style={{
          height: isMobile ? "55vh" : "65vh",
          backgroundColor: "#f0f0f0",
        }}
      />
    );
  if (error || !data || data.length === 0) return null;

  return (
    <section className="main-banner">
      {data.map((post) => {
        const isLoaded = loadedImages[post.id]; // 현재 포스트 이미지가 로드됐는지 확인

        return (
          <div
            key={post.id}
            onClick={() => handleBannerClick(post)}
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? "55vh" : "65vh",
              overflow: "hidden",
              marginBottom: "40px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0", // 로딩 전 배경색
            }}
          >
            {/* 1. 배경 이미지: 로딩 전후 상태에 따라 블러/투명도 조절 */}
            {/* 배경 이미지 컴포넌트 호출 */}
            <BlurImage
              src={getBannerImage(post)}
              alt={post.title?.rendered}
              hoverScale={1.03}
            />

            {/* 2. 기존 중앙 유리 효과 박스 (그대로 유지) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(8px)",
                width: isMobile ? "80%" : "65%",
                padding: isMobile ? "50px 20px" : "70px 40px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                pointerEvents: "none",
                // 이미지가 로드된 후에만 텍스트 박스가 나타나게 하려면 아래 줄 추가
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "1.8rem" : "2.8rem",
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                }}
              >
                {post.title?.rendered}
              </h1>

              <div
                style={{
                  width: "50px",
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  margin: "25px auto",
                }}
              ></div>

              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: isMobile ? "13px" : "16px",
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
