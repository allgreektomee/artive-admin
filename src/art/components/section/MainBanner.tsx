import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWordPress } from "../../hook/useWordPress";
import { useResponsive } from "../../hook/useResponsive";

const MainBanner = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useWordPress(32);
  const { isMobile } = useResponsive();

  // 개별 포스트의 이미지 로딩 상태 관리
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const getBannerImage = (post: any) => {
    return post.acf?.art_image || "";
  };

  const handleBannerClick = (post: any) => {
    const categoryType = "banner";
    navigate(`/art/post/${categoryType}/${post.id}`);
  };

  // 이미지 로드 완료 시 실행
  const handleImageLoad = (postId: number) => {
    setLoadedImages((prev) => ({ ...prev, [postId]: true }));
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
    <section
      className="main-banner"
      style={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px",
        // 💡 모바일 상단에도 여백을 주어 배너가 떠 있는 느낌을 강조
        margin: isMobile ? "20px auto 40px auto" : "40px auto 80px auto",
        padding: isMobile ? "0 20px" : "0", // 💡 모바일 좌우 여백 확보
        boxSizing: "border-box",
      }}
    >
      {data.map((post) => {
        const isLoaded = loadedImages[post.id];

        return (
          <div
            key={post.id}
            onClick={() => handleBannerClick(post)}
            style={{
              position: "relative",
              width: "100%",
              // 💡 모바일 높이를 살짝 줄여서 한눈에 들어오게 함
              height: isMobile ? "450px" : "500px",
              overflow: "hidden",
              marginBottom: "20px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              borderRadius: "2px", // 💡 모바일에서도 살짝 라운드 주면 부드러움
            }}
          >
            {/* 1. 배경 이미지 */}
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
                transform: isLoaded ? "scale(1.0)" : "scale(1.1)",
              }}
              alt={post.title?.rendered}
            />

            {/* 2. 중앙 유리 효과 박스 (모바일 최적화) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(12px)", // 💡 블러를 조금 더 줌
                width: isMobile ? "80%" : "70%",
                // 💡 상하 높이를 제한하여 이미지 영역을 더 많이 노출
                padding: isMobile ? "30px 20px" : "60px 40px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                pointerEvents: "none",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "1.2rem" : "2.2rem", // 💡 모바일 폰트 크기 살짝 축소
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: isMobile ? "4px" : "6px",
                  textTransform: "uppercase",
                  wordBreak: "keep-all",
                  lineHeight: 1.3,
                }}
              >
                {post.title?.rendered}
              </h1>
              <div
                style={{
                  width: "30px",
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  margin: isMobile ? "15px auto" : "20px auto",
                }}
              ></div>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: isMobile ? "10px" : "14px", // 💡 서브 텍스트 더 작게 해서 여백 강조
                  fontWeight: 300,
                  letterSpacing: "1.5px",
                  margin: 0,
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
