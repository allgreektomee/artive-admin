import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ArtLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 정확히 "/art" 인지 확인 (홈인지 확인)
  const isArtHome =
    location.pathname === "/art" || location.pathname === "/art/";

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* --- 조건부 Header: 홈(/art)일 때만 보여줌 --- */}
      {isArtHome && (
        <header
          style={{
            padding: "15px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            borderBottom: "0.5px solid #f0f0f0",
          }}
        >
          <div
            onClick={() => navigate("/art")}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "20px",
              fontWeight: 900,
              cursor: "pointer",
              letterSpacing: "-1px",
              color: "#000",
            }}
          >
            ARTIVE
          </div>
        </header>
      )}

      {/* --- 메인 콘텐츠 --- */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ArtLayout;
