import { useState, useEffect } from "react";

/**
 * 워드프레스 API 호출 및 데이터 가공 로직
 */
export const useWordPress = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with your WordPress API URL
        const response = await fetch(
          `https://your-wordpress-site.com/wp-json/wp/v2/${endpoint}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
