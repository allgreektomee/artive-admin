// src/art/pages/MagazineDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtSEO from "../components/ArtSEO";

const MagazineDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`https://your-wp-site.com/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then((res) => res.json())
      .then((data) => setPost(data[0]));
  }, [slug]);

  if (!post) return null;

  return (
    <div style={{ maxWidth: "700px", margin: "80px auto", padding: "0 20px" }}>
      <ArtSEO
        title={`${post.title.rendered} | Artive`}
        description={post.excerpt.rendered.replace(/<[^>]*>?/gm, "")}
        image={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
        url={window.location.href}
      />

      <h1
        style={{
          fontSize: "2.5rem",
          fontFamily: "serif",
          marginBottom: "40px",
        }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className="content-body"
        style={{ lineHeight: "1.8", fontSize: "18px" }}
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
};

export default MagazineDetail;
