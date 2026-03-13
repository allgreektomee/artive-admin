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

// 💡 정렬 옵션 추가
export async function fetchPostsByCategory(
  categoryId: number,
  options?: { orderBy?: "slug" | "date"; order?: "asc" | "desc" },
): Promise<WpPost[]> {
  try {
    // 기본값: 최신순 (날짜 내림차순)
    const orderBy = options?.orderBy || "date";
    const order = options?.order || "desc";

    const response = await fetch(
      `${WP_API_URL}/posts?categories=${categoryId}&_embed&orderby=${orderBy}&order=${order}&per_page=100`, // 100개씩 가져오기
    );
    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("WordPress API 포스트 가져오기 실패:", error);
    return [];
  }
}
