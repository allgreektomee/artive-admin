// import React from "react";

import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";
import ViewMoreButton from "../home/ViewMoreButton";
// 임시 데이터 (나중에 API 연결하기 좋습니다)
const logData = [
  { id: 1, title: "아카이빙의 순간 No.3 (작업 노트 발췌)", date: "2026.03.12" },
  {
    id: 2,
    title: "색의 흔적: 첫 번째 오프라인 전시 준비 기록",
    date: "2026.02.28",
  },
  {
    id: 3,
    title: "MANIFESTO: 우리가 캔버스 뒤의 이야기를 쫓는 이유",
    date: "2026.01.15",
  },
];

const LogSection = () => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  return (
    <section
      style={{
        marginTop: isMobile ? "100px" : "180px",
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px", // PC 너비 제한 (Insight와 통일)
        marginLeft: "auto",
        marginRight: "auto",
        padding: isMobile ? "0 20px" : "0 40px",
        paddingBottom: "120px",
        boxSizing: "border-box",
      }}
    >
      {/* --- LOG 헤더 --- */}
      <div
        style={{
          marginBottom: isMobile ? "30px" : "50px",
          borderTop: "1px solid #eee",
          paddingTop: "60px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            letterSpacing: "4px",
            marginBottom: "8px",
          }}
        >
          LOG
        </p>
        <p
          style={{
            fontSize: isMobile ? "18px" : "22px",
            color: "#333",
            fontWeight: 300,
          }}
        >
          기록
        </p>
      </div>

      {/* --- LOG 리스트 --- */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {logData.map((log) => (
          <div
            key={log.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: isMobile ? "20px 5px" : "30px 10px",
              borderBottom: "1px solid #f8f8f8",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#fafafa")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <span
              style={{
                fontSize: isMobile ? "15px" : "17px",
                color: "#444",
                fontWeight: 300,
                letterSpacing: "-0.3px",
              }}
            >
              {log.title}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#ccc",
                fontFamily: "monospace",
                letterSpacing: "0.5px",
              }}
            >
              {log.date}
            </span>
          </div>
        ))}
      </div>

      {/* 💡 더보기 버튼 (필요시) */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#aaa",
            fontSize: "11px",
            letterSpacing: "2px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          VIEW MORE LOGS +
        </button>
      </div>
      <ViewMoreButton
        label="VIEW MORE INSIGHTS"
        onClick={() => navigate("/art/insights")} // 👈 인사이트 모아보기 주소
      />
    </section>
  );
};

export default LogSection;
