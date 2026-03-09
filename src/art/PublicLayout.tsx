import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  //   const location = useLocation();

  // 현재 /art 경로에 있는지 확인 (필요 시 스타일 분기용)
  //   const isArtMode = location.pathname.startsWith("/art");

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* --- Header: Magazine Minimal --- */}
      <header
        style={{
          padding: "15px 20px", // 모바일에 맞춰 패딩 축소
          display: "flex",
          justifyContent: "center", // 로고 중앙 정렬 (매거진 느낌)
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "0.5px solid #f0f0f0", // 아주 연하게 구분선
        }}
      >
        <div
          onClick={() => navigate("/art")} // 클릭 시 매거진 홈으로 바로 이동
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "20px", // 모바일 적정 사이즈
            fontWeight: 900,
            cursor: "pointer",
            letterSpacing: "-1px",
            color: "#000",
            textAlign: "center",
          }}
        >
          ARTIVE
        </div>
      </header>

      {/* --- Main Content --- */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* --- Footer: Minimal --- */}
      <footer
        style={{
          padding: "40px 20px 30px", // 모바일 여백 조정
          fontSize: "11px",
          color: "#bbb",
          textAlign: "center", // 모바일은 중앙 정렬이 깔끔합니다
          letterSpacing: "0.5px",
        }}
      >
        <div style={{ borderTop: "1px solid #f9f9f9", paddingTop: "20px" }}>
          © 2026 ARTIVE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
