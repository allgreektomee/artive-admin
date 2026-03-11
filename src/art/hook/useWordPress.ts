import { useState, useEffect } from "react";

export const useWordPress = (categoryId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // $ 표시가 절대 들어가지 않게 주의!
        const url = `https://cms.artivefor.me/wp-json/wp/v2/posts?categories=${categoryId}&_embed`;
        const res = await fetch(url);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();

        if (Array.isArray(json)) {
          setData(json);
        } else {
          console.error("받아온 데이터가 배열이 아닙니다:", json);
          setData([]);
        }
      } catch (err: any) {
        console.error("Fetch Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchData();
  }, [categoryId]);

  return { data, loading, error };
};
