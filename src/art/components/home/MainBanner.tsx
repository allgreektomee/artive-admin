// import React from "react";
import { useNavigate } from "react-router-dom"; // 1. 라우터 훅 추가
import { useWordPress } from "../../hook/useWordPress";
import { useResponsive } from "../../hook/useResponsive";

const MainBanner = () => {
  const navigate = useNavigate(); // 2. 네비게이트 함수 초기화
  const { data, loading, error } = useWordPress(32);
  const { isMobile } = useResponsive();

  const getBannerImage = (post: any) => {
    return post.acf?.art_image || "";
  };

  // 3. 클릭 핸들러: 상세 페이지로 이동
  const handleBannerClick = (post: any) => {
    // 현재는 banner 카테고리로 고정 (나중에 데이터에서 추출 가능)
    const categoryType = "banner";
    navigate(`/post/${categoryType}/${post.id}`);
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
      {data.map((post) => (
        <div
          key={post.id}
          // 4. 전체 배너 영역에 클릭 이벤트 부여
          onClick={() => handleBannerClick(post)}
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "55vh" : "65vh",
            overflow: "hidden",
            marginBottom: "40px",
            cursor: "pointer", // 마우스 올리면 클릭 가능함을 표시
          }}
        >
          {/* 배경 이미지 */}
          <img
            src={getBannerImage(post)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease", // 부드러운 효과
            }}
            alt={post.title?.rendered}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            } // 호버 효과
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          />

          {/* 중앙 유리 효과 박스 */}
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
              pointerEvents: "none", // 박스 클릭 시에도 부모 div의 onClick이 작동하도록 설정
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
