// import React from "react";

interface ViewMoreButtonProps {
  label: string;
  onClick: () => void;
}

const ViewMoreButton = ({ label, onClick }: ViewMoreButtonProps) => (
  <div style={{ marginTop: "60px", textAlign: "center", width: "100%" }}>
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color: "#aaa",
        fontSize: "11px",
        letterSpacing: "3px",
        cursor: "pointer",
        fontWeight: 700,
        padding: "20px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
    >
      {label} +
    </button>
  </div>
);

export default ViewMoreButton; // 💡 이걸 꼭 써줘야 다른 파일에서 쓸 수 있어요!
