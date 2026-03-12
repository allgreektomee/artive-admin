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
        margin: isMobile ? "80px auto" : "40px auto 80px auto", // 모바일 상하 여백 더 확보
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
              // 💡 핵심: 이미지 높이를 슬림하게 조절 (회색 박스가 튀어나올 수 있도록)
              height: isMobile ? "240px" : "450px",
              // 💡 중요: 박스가 삐져나와야 하므로 overflow를 visible로 변경하거나
              // 내부 컨테이너 구조를 활용해야 하지만,
              // 이미지 자체를 슬림하게 보여주기 위해 높이값만 조정합니다.
              cursor: "pointer",
              marginBottom: "40px",
            }}
          >
            {/* 1. 배경 이미지 (슬림한 밴드 형태) */}
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

            {/* 2. 중앙 유리 효과 박스 (기존 크기 유지하며 이미지 위로 올라옴) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(10px)",
                width: isMobile ? "85%" : "75%",
                // 💡 아티브님이 원하시는 넉넉한 회색 박스 사이즈
                padding: isMobile ? "50px 20px" : "70px 40px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                pointerEvents: "none",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
                zIndex: 2, // 이미지 위로 확실히 올라오게
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "1.4rem" : "2.2rem",
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: isMobile ? "3px" : "6px",
                  textTransform: "uppercase",
                  wordBreak: "keep-all",
                }}
              >
                {post.title?.rendered}
              </h1>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  margin: "20px auto",
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
