const WP_API_URL = "https://cms.artivefor.me/wp-json/wp/v2";

// WP API 원본 데이터 타입
export interface WpPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    art_image?: string;
  };
  categories: number[];
}

export async function fetchPostsByCategory(
  categoryId: number,
): Promise<WpPost[]> {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts?categories=${categoryId}&_embed`,
    );
    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("WordPress API 포스트 가져오기 실패:", error);
    return []; // 에러 시 빈 배열 반환
  }
}
