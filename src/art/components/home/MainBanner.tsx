import React from "react";
import { useWordPress } from "../../hook/useWordPress";

const MainBanner = () => {
  const { data, loading } = useWordPress(2); // BANNER 카테고리 ID

  if (loading) return <div className="skeleton">Banner Loading...</div>;

  return (
    <section className="main-banner">
      {data.map((post) => (
        <div key={post.id} className="banner-item">
          {post.acf.art_image && <img src={post.acf.art_image} alt="artwork" />}
          <div className="text-box">
            <span>{post.acf.sub_title}</span>
            <h2>{post.title.rendered}</h2>
            <p>{post.acf.artist_name}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MainBanner;
