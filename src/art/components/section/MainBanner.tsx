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
        margin: isMobile ? "80px auto" : "40px auto 80px auto",
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
              // 💡 이미지는 더 얇게 (슬림 배너 비율)
              height: isMobile ? "220px" : "400px",
              cursor: "pointer",
              marginBottom: "60px", // 박스가 삐져나올 것을 대비해 하단 여백 충분히
            }}
          >
            {/* 1. 배경 이미지 컨테이너 */}
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

            {/* 2. 중앙 검정 유리 박스 (상하 패딩 50% 추가 확장) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // 💡 조금 더 선명하게 대비
                backdropFilter: "blur(10px)",
                width: isMobile ? "75%" : "75%",

                // 💡 상하 패딩을 기존 50px에서 75px로 50% 확장
                padding: isMobile ? "90px 20px" : "100px 40px",

                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                pointerEvents: "none",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
                zIndex: 2,
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "1.6rem" : "2.2rem",
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
                  margin: "25px auto", // 💡 간격도 박스 크기에 맞춰 살짝 조정
                }}
              ></div>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: isMobile ? "12px" : "14px",
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
