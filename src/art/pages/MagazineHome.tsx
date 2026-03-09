// src/art/pages/MagazineHome.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ArtSEO from "../components/ArtSEO";

// 아티브님이 워드프레스에서 만드실 태그 정보 (ID는 확인 후 수정하세요)
const TAGS = [
  { id: null, label: "ALL", color: "#000" },
  { id: 10, label: "ARTIST", color: "#3b82f6" },
  { id: 11, label: "SPACE", color: "#10b981" },
  { id: 12, label: "EXHIBITION", color: "#f59e0b" },
  { id: 13, label: "ESSAY", color: "#8b5cf6" },
  { id: 14, label: "INSIGHT", color: "#ef4444" },
];

const MagazineHome = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTag = searchParams.get("tag");

  useEffect(() => {
    // 매거진 전체 태그(예: 5)는 기본으로 하고, 선택된 태그가 있다면 추가 필터링
    const baseTag = "5";
    const tagQuery = activeTag ? `&tags=${activeTag}` : `&tags=${baseTag}`;

    fetch(`https://your-wp-site.com/wp-json/wp/v2/posts?_embed${tagQuery}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [activeTag]);

  return (
    <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <ArtSEO
        title="Artive Magazine"
        description="아티스트와 공간의 기록"
        image="/og-mag.jpg"
        url="https://artivefor.me/art"
      />

      {/* 태그 필터 메뉴 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "50px",
          flexWrap: "wrap",
        }}
      >
        {TAGS.map((tag) => (
          <button
            key={tag.label}
            onClick={() =>
              tag.id
                ? setSearchParams({ tag: String(tag.id) })
                : setSearchParams({})
            }
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              border: "1px solid #eee",
              borderRadius: "20px",
              fontSize: "13px",
              backgroundColor:
                activeTag === String(tag.id) || (!activeTag && !tag.id)
                  ? "#000"
                  : "#fff",
              color:
                activeTag === String(tag.id) || (!activeTag && !tag.id)
                  ? "#fff"
                  : "#000",
              transition: "0.3s",
            }}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* 리스트 영역 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "40px",
        }}
      >
        {posts.map((post: any) => {
          const featuredImg =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          return (
            <article
              key={post.id}
              onClick={() => navigate(`/art/contents/${post.slug}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  marginBottom: "15px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={featuredImg || "/placeholder.jpg"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontFamily: "serif",
                  marginBottom: "10px",
                }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div
                style={{ color: "#888", fontSize: "14px" }}
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered.slice(0, 80) + "...",
                }}
              />
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default MagazineHome;
