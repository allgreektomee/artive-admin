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
        margin: isMobile ? "50px auto 40px auto" : "40px auto 80px auto",
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
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? "450px" : "500px",
              overflow: "hidden",
              marginBottom: "20px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              borderRadius: "2px",
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

            {/* 2. 중앙 유리 효과 박스 (슬림화 핵심 수정) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.45)", // 💡 레퍼런스 느낌을 위해 어둡기를 살짝 높임
                backdropFilter: "blur(15px)", // 💡 블러를 조금 더 주어 질감을 살림
                width: isMobile ? "85%" : "70%", // 💡 모바일 좌우 꽉 채우기

                // 💡 핵심 수정: 상하 패딩을 좌우 패딩과 같거나 작게 조절
                // 모바일: 상하 10px, 좌우 20px | PC: 상하 15px, 좌우 40px
                padding: isMobile ? "10px 20px" : "15px 40px",

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
                  fontSize: isMobile ? "1.1rem" : "2.0rem", // 💡 레퍼런스처럼 텍스트를 살짝 더 작게
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: isMobile ? "4px" : "6px",
                  textTransform: "uppercase",
                  wordBreak: "keep-all",
                  lineHeight: 1.1, // 💡 텍스트 상하 간격도 타이트하게
                }}
              >
                {post.title?.rendered}
              </h1>

              {/* 💡 상하 여백이 줄었으므로 구분선 간격도 타이트하게 조정 */}
              <div
                style={{
                  width: "25px", // 💡 레퍼런스처럼 더 짧게
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  margin: isMobile ? "8px auto" : "12px auto",
                }}
              ></div>

              <p
                style={{
                  color: "rgba(255, 255, 255, 0.65)", // 💡 텍스트 어둡기를 살짝 높임
                  fontSize: isMobile ? "9px" : "13px", // 💡 텍스트를 더 작게
                  fontWeight: 300,
                  letterSpacing: "1.5px",
                  margin: 0,
                  lineHeight: 1, // 💡 텍스트 상하 간격 타이트하게
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
