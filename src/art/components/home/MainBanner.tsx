// import React from "react";
import { useWordPress } from "../../hook/useWordPress";

const MainBanner = () => {
  // BANNER 카테고리 ID가 2번이 맞는지 꼭 확인하세요!
  const { data, loading, error } = useWordPress(2);

  if (loading) return <div style={{ padding: "20px" }}>로딩 중...</div>;
  if (error)
    return (
      <div style={{ padding: "20px", color: "red" }}>에러 발생: {error}</div>
    );
  if (!data || data.length === 0)
    return <div style={{ padding: "20px" }}>표시할 배너가 없습니다.</div>;

  return (
    <section className="main-banner">
      {data.map((post) => (
        <div
          key={post.id}
          style={{ border: "1px solid #eee", marginBottom: "10px" }}
        >
          {/* ACF 필드명 art_image가 맞는지 확인! */}
          {post.acf?.art_image && (
            <img
              src={post.acf.art_image}
              alt={post.title?.rendered}
              style={{ width: "100%", height: "auto" }}
            />
          )}
          <div style={{ padding: "15px" }}>
            <p style={{ color: "#666" }}>{post.acf?.sub_title}</p>
            <h2>{post.title?.rendered}</h2>
            <p>작가: {post.acf?.artist_name}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MainBanner;
