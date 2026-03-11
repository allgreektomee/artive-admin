import { useState, useEffect, useCallback } from "react";

// 아티브님이 등록하신 모든 ACF 필드를 옵셔널(?)로 정의
export interface WPPostACF {
  sub_title?: string;
  link_url?: string;
  exhibition_date?: string;
  location?: string;
  artist_name?: string;
  artwork_name?: string;
  artwork_info?: string;
  artwork_year?: string;
  note?: string;
  status?: string;
  art_image?: string; // S3 이미지 URL
}

export interface WPPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: WPPostACF;
  slug: string;
}

export const useWordPress = (categoryId: number) => {
  const [data, setData] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // _embed는 카테고리명이나 미디어 정보가 필요할 때를 대비해 유지
      const response = await fetch(
        `https://cms.artivefor.me/wp-json/wp/v2/posts?categories=${categoryId}&_embed&per_page=10`,
      );

      if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");

      const json: WPPost[] = await response.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
