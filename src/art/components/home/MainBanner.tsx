// import React from "react";
import { useWordPress } from "../hooks/useWordPress";

const MainBanner = () => {
  const { data, loading } = useWordPress(2); // 2번이 BANNER 카테고리 맞죠?

  if (loading)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        데이터 불러오는 중...
      </div>
    );
  if (!data || data.length === 0)
    return <div style={{ padding: "50px" }}>등록된 배너가 없습니다.</div>;

  return (
    <section className="main-banner">
      {data.map((post) => (
        <div
          key={post.id}
          style={{ marginBottom: "20px", border: "1px solid #ddd" }}
        >
          {/* acf가 없을 경우를 대비해 ?. 사용 */}
          {post.acf?.art_image && (
            <img
              src={post.acf.art_image}
              alt="artwork"
              style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
            />
          )}
          <div style={{ padding: "20px" }}>
            <span style={{ color: "#888" }}>{post.acf?.sub_title}</span>
            <h2 style={{ fontSize: "2rem" }}>{post.title?.rendered}</h2>
            <p>Artist: {post.acf?.artist_name}</p>
            <p>Date: {post.acf?.exhibition_date}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MainBanner;
