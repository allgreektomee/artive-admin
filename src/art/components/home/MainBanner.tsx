import React from "react";
import { useWordPress } from "../../hook/useWordPress";
import { useResponsive } from "../../hook/useResponsive"; // 이미 만들어두신 훅 사용

const MainBanner = () => {
  // 1. 깃에 있는 훅들 그대로 호출
  const { data, loading, error } = useWordPress(32);
  const { isMobile } = useResponsive();

  // 2. 깃에 있는 이미지 추출 로직 (S3 대응)
  const getBannerImage = (post: any) => {
    const artImage = post.acf?.art_image;
    if (typeof artImage === "number") {
      // _embed 파라미터 덕분에 가능한 S3 주소 추출
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
      {/* 3. 깃 구조 그대로 .map 렌더링 */}
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
          {/* S3 이미지 배경 */}
          <img
            src={getBannerImage(post)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt={post.title?.rendered}
          />

          {/* 중앙 유리 효과 박스 (요청하신 스타일) */}
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
              {post.acf?.sub_title || "선과 면의 기록, 아카이브의 시작"}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MainBanner;
