// import React from "react";
import { useWordPress } from "../../hook/useWordPress"; // 깃에 있는 경로
import { useResponsive } from "../../hook/useResponsive"; // 깃에 있는 훅

const MainBanner = () => {
  // 1. 깃의 기존 훅 호출 구조 유지
  const { data, loading, error } = useWordPress(32);
  const { isMobile } = useResponsive();

  // 2. 깃에 정의된 S3 이미지 추출 로직 (수정 없이 그대로 사용)
  const getBannerImage = (post: any) => {
    const artImage = post.acf?.art_image;
    if (typeof artImage === "number") {
      return (
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        post._embedded?.["wp:attachment"]?.[0]?.source_url ||
        ""
      );
    }
    return artImage || "";
  };

  if (loading)
    return (
      <div
        style={{ height: isMobile ? "55vh" : "65vh", backgroundColor: "#000" }}
      />
    );
  if (error || !data || data.length === 0) return null;

  return (
    <section className="main-banner">
      {/* 3. 깃에 있는 .map 리스트 렌더링 구조 유지 */}
      {data.map((post) => (
        <div
          key={post.id}
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "55vh" : "65vh",
            overflow: "hidden",
            marginBottom: "40px",
          }}
        >
          {/* 배경 이미지: S3 연동 주소 */}
          <img
            src={getBannerImage(post)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt={post.title?.rendered}
          />

          {/* 중앙 유리 효과 박스 (요청하신 레이아웃 추가) */}
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
      ))}
    </section>
  );
};

export default MainBanner;
