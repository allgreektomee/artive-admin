// import React from "react";

interface ViewMoreButtonProps {
  label: string;
  onClick: () => void;
}

const ViewMoreButton = ({ label, onClick }: ViewMoreButtonProps) => (
  <div
    style={{
      // 💡 모든 섹션에서 버튼 위아래 간격을 동일하게 고정 (아트워크와 맞춤)
      margin: "60px 0",
      textAlign: "center",
      width: "100%",
      display: "block",
      clear: "both", // 혹시 모를 float 방지
    }}
  >
    <button
      onClick={onClick}
      style={{
        background: "none",
        // 💡 아트워크 섹션과 동일한 박스 보더 스타일로 통일
        border: "1px solid #ddd",
        color: "#888",
        fontSize: "11px",
        letterSpacing: "3px",
        cursor: "pointer",
        fontWeight: 700,
        padding: "16px 45px",
        transition: "all 0.3s ease",
        borderRadius: "0px",
        textTransform: "uppercase",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#000";
        e.currentTarget.style.borderColor = "#000";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#888";
        e.currentTarget.style.borderColor = "#ddd";
      }}
    >
      {label} +
    </button>
  </div>
);

export default ViewMoreButton;
