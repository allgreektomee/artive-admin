import { useState, useEffect } from "react";

export const useWordPress = (categoryId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 주소가 정확한지 확인해 주세요! (https://cms.artivefor.me/...)
      const res = await fetch(
        `https://cms.artivefor.me/wp-json/wp/v2/posts?categories=${categoryId}&_embed`,
      );
      const json = await res.json();

      if (Array.isArray(json)) {
        setData(json);
      }
    } catch (err) {
      console.error("데이터 로딩 에러:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return { data, loading };
};
