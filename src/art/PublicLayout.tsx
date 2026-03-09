import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 /art 인지 /stock 인지에 따라 테마 컬러를 바꿀 수도 있습니다.
  const isArtMode = location.pathname.startsWith("/art");

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* --- Header: Magazine Style --- */}
      <header
        style={{
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline", // 텍스트 높이 정렬
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)", // 시각적 고급스러움 추가
          borderBottom: "0.5px solid #e0e0e0",
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "24px",
            fontWeight: 900,
            cursor: "pointer",
            letterSpacing: "-1.5px",
            color: "#000",
          }}
        >
          ARTIVE
        </div>

        <nav style={{ display: "flex", gap: "30px" }}>
          <span
            onClick={() => navigate("/art/magazine")}
            style={{
              fontFamily: "'Nanum Myeongjo', serif", // 명조체 사용
              fontSize: "15px",
              cursor: "pointer",
              color: isArtMode ? "#000" : "#888",
              transition: "0.3s",
            }}
          >
            매거진
          </span>
          <span
            onClick={() => navigate("/profile")}
            style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: "15px",
              cursor: "pointer",
              color: "#888",
              transition: "0.3s",
            }}
          >
            에필로그
          </span>
        </nav>
      </header>

      {/* --- Main Content --- */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* --- Footer: Minimal --- */}
      <footer
        style={{
          padding: "60px 40px 30px",
          fontSize: "12px",
          color: "#aaa",
          textAlign: "left",
          letterSpacing: "1px",
        }}
      >
        <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
          © 2026 ARTIVE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
