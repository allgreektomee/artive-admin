// src/art/pages/MagazineHome.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtSEO from "../components/ArtSEO";

const MagazineHome: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 실제 워드프레스 API 연동 시 주석 해제
    // fetch('https://your-wp-site.com/wp-json/wp/v2/posts?_embed')
    //   .then(res => res.json())
    //   .then(data => setPosts(data));

    // 테스트용 목업 데이터 (작가 3인 부스 컨셉)
    setPosts([
      {
        id: 1,
        slug: "artive-solitude",
        title: "The Solitude: 아티브 개인전",
        thumb: "/sample1.jpg",
        excerpt: "시니어 개발자의 시선으로 본 고독...",
      },
      {
        id: 2,
        slug: "writer-a-light",
        title: "작가 A: 빛의 파편",
        thumb: "/sample2.jpg",
        excerpt: "이번 아트페어 부스 참여 작가 A의 세계관...",
      },
      {
        id: 3,
        slug: "writer-b-space",
        title: "작가 B: 기억의 공간",
        thumb: "/sample3.jpg",
        excerpt: "공간을 재해석하는 작가 B의 작업 노트...",
      },
    ] as any);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <ArtSEO
        title="서울아트페어(SAF)05.14-17"
        description="화실숲 작가들의 기록"
        image="https://artive-uploads.s3.ap-southeast-2.amazonaws.com/test/jsh.jpg"
        url="https://www.artivefor.me/art"
      />

      {/* Hero Section */}
      <section style={{ marginBottom: "80px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "serif", fontSize: "3rem", fontWeight: 300 }}>
          The Archive & Magazine
        </h1>
        <p style={{ color: "#888", letterSpacing: "2px" }}>ARTIVE FOR ME</p>
      </section>

      {/* Magazine Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "60px 40px",
        }}
      >
        {posts.map((post: any) => (
          <article
            key={post.id}
            onClick={() => navigate(`/art/magazine/${post.slug}`)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#f9f9f9",
                marginBottom: "20px",
                overflow: "hidden",
              }}
            >
              <img
                src={post.thumb}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "0.5s",
                }}
                className="hover-zoom"
              />
            </div>
            <h2
              style={{
                fontFamily: "serif",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              {post.title}
            </h2>
            <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6" }}>
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MagazineHome;
