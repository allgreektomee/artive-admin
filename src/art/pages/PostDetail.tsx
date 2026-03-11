// import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  // URL에서 type(banner 등)과 id(1 등)를 가져옴
  const { type, id } = useParams();
  const navigate = useNavigate();

  // 워드프레스 고유주소 구조에 맞게 URL 생성
  // 예: https://cms.artivefor.me/banner/1/
  const wpUrl = `https://cms.artivefor.me/${type}/${id}/`;

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* 상단 네비게이션 (리액트 커스텀) */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #000", // 아까 디자인 컨셉 맞춰서 검정 선
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          ← {type?.toUpperCase()}
        </button>
      </div>

      {/* 워드프레스 본문 아이프레임 */}
      <iframe
        src={wpUrl}
        style={{ width: "100%", flex: 1, border: "none" }}
        title="Artive Content Detail"
      />
    </div>
  );
};

export default PostDetail;
