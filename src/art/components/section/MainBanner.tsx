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
        maxWidth: isMobile ? "100%" : "1100px", // 💡 인사이트 섹션과 동일한 가이드 라인
        margin: isMobile ? "0 auto 40px auto" : "40px auto 80px auto", // 💡 PC에서 중앙 정렬 및 위아래 여백
        padding: isMobile ? "0" : "0", // 배너는 좌우 패딩 없이 1100px 꽉 채우기
        boxSizing: "border-box",
      }}
    >
      {data.map((post) => {
        const isLoaded = loadedImages[post.id]; // 현재 포스트 이미지가 로드됐는지 확인

        return (
          <div
            key={post.id}
            onClick={() => handleBannerClick(post)}
            style={{
              position: "relative",
              width: "100%",
              // 💡 PC에서 너무 길어지지 않게 고정 높이 혹은 비율 최적화
              height: isMobile ? "55vh" : "500px",
              overflow: "hidden",
              marginBottom: "20px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              // 💡 PC에서 배너에도 약간의 라운드를 주면 더 고급스럽습니다 (취향따라 삭제 가능)
              borderRadius: isMobile ? "0" : "2px",
            }}
          >
            {/* 1. 배경 이미지: 로딩 전후 상태에 따라 블러/투명도 조절 */}
            <img
              src={getBannerImage(post)}
              onLoad={() => handleImageLoad(post.id)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "all 0.6s ease", // 블러와 투명도 전환 효과
                filter: isLoaded ? "none" : "blur(20px)", // 로딩 전엔 전체 블러
                opacity: isLoaded ? 1 : 0.7, // 로딩 전엔 살짝 투명하게
                transform: isLoaded ? "scale(1.0)" : "scale(1.1)", // 로딩 전엔 약간 확대해서 블러 외곽선 방지
              }}
              alt={post.title?.rendered}
              // 기존 호버 효과 유지 (로드 완료 후에만 작동하도록 조건 추가 가능)
              onMouseOver={(e) =>
                isLoaded && (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                isLoaded && (e.currentTarget.style.transform = "scale(1.0)")
              }
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
                width: isMobile ? "85%" : "70%", // 💡 모바일에서 조금 더 넓게
                padding: isMobile ? "40px 20px" : "60px 40px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                pointerEvents: "none",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "1.5rem" : "2.2rem", // 💡 타이포 크기 살짝 조정
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
