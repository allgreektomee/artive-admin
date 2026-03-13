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

  const handleImageLoad = (postId: number) => {
    setLoadedImages((prev) => ({ ...prev, [postId]: true }));
  };

  // 에러가 났거나 데이터가 아예 없을 때만 null 처리
  if (!loading && (error || !data || data.length === 0)) return null;

  return (
    <section
      className="main-banner"
      style={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px",
        // 💡 로딩 중에도 마진을 동일하게 유지해서 배너가 툭 떨어지는 현상 방지
        margin: isMobile ? "80px auto" : "40px auto 80px auto",
        padding: isMobile ? "0 20px" : "0",
        boxSizing: "border-box",
        // 💡 배너가 들어올 자리를 미리 확보
        minHeight: isMobile ? "220px" : "400px",
      }}
    >
      {/* 💡 로딩 중일 때는 틀만 유지하고 내부에 스켈레톤 노출 */}
      {loading ? (
        <div
          style={{
            width: "100%",
            height: isMobile ? "220px" : "400px",
            backgroundColor: "#f0f0f0",
            borderRadius: "2px",
          }}
        />
      ) : (
        data.map((post) => {
          const isLoaded = loadedImages[post.id];

          return (
            <div
              key={post.id}
              onClick={() => handleBannerClick(post)}
              style={{
                position: "relative",
                width: "100%",
                height: isMobile ? "220px" : "400px",
                cursor: "pointer",
                marginBottom: "60px",
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

              {/* 2. 중앙 검정 유리 박스 (아티브님 커스텀 비율 적용) */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(10px)",

                  // 💡 좌우 박스를 더 줄여서 겹쳐진 느낌 강조 (75% -> 65%)
                  // 💡 상하 높이는 기존보다 더 넉넉하게 (90px -> 110px)
                  width: isMobile ? "65%" : "55%",
                  padding: isMobile ? "110px 20px" : "130px 40px",

                  textAlign: "center",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  pointerEvents: "none",
                  // 💡 이미지가 로드되기 전까지는 박스를 숨겨서 깜빡임 방지
                  opacity: isLoaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  zIndex: 2,
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
                    lineHeight: 1.2,
                  }}
                >
                  {post.title?.rendered}
                </h1>
                <div
                  style={{
                    width: "40px",
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
        })
      )}
    </section>
  );
};

export default MainBanner;
