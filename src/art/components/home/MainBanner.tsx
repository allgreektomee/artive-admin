import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWordPress } from "../../hook/useWordPress";
import { useResponsive } from "../../hook/useResponsive";

const MainBanner = () => {
  const navigate = useNavigate();
  // WordPress에서 카테고리 ID 32(배너) 데이터를 가져옴
  const { data, loading, error } = useWordPress(32);
  const { isMobile } = useResponsive();

  // 이미지 로딩 상태 관리 (검정 화면 방지용)
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const getBannerImage = (post: any) => {
    return post.acf?.art_image || "";
  };

  const handleBannerClick = (post: any) => {
    const categoryType = "banner";
    navigate(`/art/post/${categoryType}/${post.id}`);
  };

  // 이미지 로드 완료 핸들러
  const handleImageLoad = (postId: number) => {
    setLoadedImages((prev) => ({ ...prev, [postId]: true }));
  };

  // 로딩 중일 때 (검정색 대신 연한 회색 대기 화면)
  if (loading)
    return (
      <div
        style={{
          height: isMobile ? "55vh" : "65vh",
          backgroundColor: "#f9f9f9", // 검정 대신 화이트/연그레이
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#bbb",
          fontSize: "14px",
        }}
      >
        Loading...
      </div>
    );

  if (error || !data || data.length === 0) return null;

  return (
    <section className="main-banner">
      {data.map((post) => (
        <div
          key={post.id}
          onClick={() => handleBannerClick(post)}
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "55vh" : "65vh", // 이미지 비율 유지
            overflow: "hidden",
            marginBottom: "40px",
            cursor: "pointer",
            backgroundColor: "#f9f9f9", // 이미지 로딩 전 배경색
          }}
        >
          {/* 1. 배경 이미지 (비율 유지, 호버 효과 포함) */}
          <img
            src={getBannerImage(post)}
            alt={post.title?.rendered}
            onLoad={() => handleImageLoad(post.id)} // 로드 완료 시 상태 변경
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease, opacity 0.5s ease", // 부드러운 전환
              opacity: loadedImages[post.id] ? 1 : 0, // 로드 전에는 투명하게
            }}
            // 호버 시 부모 div의 scale 효과 대신 이미지 자체 scale 권장
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          />

          {/* 2. [변경] 배너 전체를 덮는 투명한 글자 배경 오버레이 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              // 이미지가 너무 어두워지지 않게 투명도 조절 (0.3 ~ 0.5 권장)
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(2px)", // 아주 미세한 블러로 고급스러움 추가
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // 글자를 세로 중앙 정렬
              alignItems: "center",
              textAlign: "center",
              padding: "0 20px",
              pointerEvents: "none", // 클릭 이벤트는 부모 div로 통과
            }}
          >
            {/* 글자 스타일 유지 */}
            <h1
              style={{
                color: "#fff",
                fontSize: isMobile ? "1.8rem" : "3.5rem", // 데스크탑 크기 살짝 확대
                fontWeight: 700, // 더 굵게
                margin: 0,
                letterSpacing: "5px",
                textTransform: "uppercase",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)", // 글자 그림자로 가독성 확보
              }}
            >
              {post.title?.rendered}
            </h1>

            <div
              style={{
                width: "60px",
                height: "2px", // 약간 더 두껍게
                backgroundColor: "rgba(255,255,255,0.8)",
                margin: "30px auto",
              }}
            ></div>

            <p
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                fontSize: isMobile ? "14px" : "18px", // 크기 살짝 확대
                fontWeight: 300,
                letterSpacing: "2px",
                margin: 0,
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {post.acf?.sub_title}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MainBanner;
