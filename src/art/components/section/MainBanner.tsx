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

  // 💡 [통일] 전 기기 동일 비율 (가로 2 : 세로 1)
  const bannerRatio = "2 / 1";
  const commonMargin = isMobile ? "60px auto" : "40px auto 120px auto";

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
            width: "100%",
            aspectRatio: bannerRatio,
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
            style={{
              width: "100%",
              aspectRatio: bannerRatio, // 💡 모바일/데탑 완전 통일
              position: "relative",
              cursor: "pointer",
              marginBottom: isMobile ? "60px" : "100px",
            }}
          >
            {/* 1. 배경 이미지 */}
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

            {/* 2. 중앙 검정 유리 박스 (겹쳐진 느낌 강조) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.55)",
                backdropFilter: "blur(15px)",

                // 💡 좌우는 좁게, 상하 패딩은 더 듬뿍 줘서 이미지를 위아래로 뚫고 나가는 느낌
                width: isMobile ? "75%" : "50%",
                padding: isMobile ? "60px 20px" : "110px 40px",

                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                opacity: isLoaded ? 1 : 0,
                transition: "all 0.5s ease",
                zIndex: 2,
                boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "1.2rem" : "2.4rem", // 💡 모바일 폰트는 가로폭에 맞춰 살짝 조정
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: isMobile ? "4px" : "10px",
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
                  margin: "20px auto",
                }}
              ></div>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: isMobile ? "9px" : "15px",
                  fontWeight: 300,
                  letterSpacing: "2px",
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
