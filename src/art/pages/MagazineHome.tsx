import { useWordPress } from "../hook/useWordPress";

const MainBanner = ({ isMobile }: { isMobile: boolean }) => {
  // 아까 확인한 카테고리 ID 32 (BANNER)
  const { data, loading } = useWordPress(32);

  if (loading)
    return (
      <div
        style={{
          height: isMobile ? "55vh" : "65vh",
          backgroundColor: "#f5f5f5",
        }}
      />
    );

  // 첫 번째 배너 데이터 가져오기 (없으면 기본값 처리)
  const banner = data[0];

  // 데이터가 없을 때를 대비한 방어 로직
  if (!banner) return null;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "55vh" : "65vh",
        overflow: "hidden",
        marginBottom: "40px",
      }}
    >
      {/* 1. 이미지: ACF의 art_image 필드 사용 */}
      <img
        src={banner.acf?.art_image || "/default-banner.jpg"}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt={banner.title?.rendered}
      />

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
        {/* 2. 메인 타이틀: 워드프레스 글 제목 */}
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
          {banner.title?.rendered || "ARTIVE EXHIBITION"}
        </h1>

        <div
          style={{
            width: "50px",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.5)",
            margin: "25px auto",
          }}
        ></div>

        {/* 3. 서브 타이틀: ACF의 sub_title 필드 사용 */}
        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: isMobile ? "13px" : "16px",
            fontWeight: 300,
            letterSpacing: "2px",
          }}
        >
          {banner.acf?.sub_title || "선과 면의 기록, 아카이브의 시작"}
        </p>
      </div>
    </section>
  );
};

export default MainBanner;
