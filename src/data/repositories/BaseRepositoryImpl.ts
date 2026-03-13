/**
 * [DATA LAYER] Repository Implementation
 * 역할: Domain의 인터페이스(IBaseRepository)를 실제로 구현하며, 외부 API(WordPress)와 통신합니다.
 * 특징: API 응답 데이터(JSON)를 우리 시스템의 'BaseEntry' 규격으로 다듬는 Mapper 역할을 수행합니다.
 */

import axios from "axios";
import type { IBaseRepository } from "../../domain/repositories/IBaseRepository";
import type {
  BaseEntry,
  BaseDetail,
  CategoryType,
} from "../../domain/models/BaseEntry";

export class BaseRepositoryImpl implements IBaseRepository {
  private readonly API_URL = "https://cms.artivefor.me/wp-json/wp/v2";

  // 목록 가져오기
  async fetchAll(category?: string): Promise<BaseEntry[]> {
    // 💡 category가 있을 경우 쿼리 파라미터로 추가하거나, 가져온 후 필터링에 사용합니다.
    const url = category
      ? `${this.API_URL}/posts?_embed&categories=${category}` // 카테고리 ID가 있을 때
      : `${this.API_URL}/posts?_embed`;

    const response = await axios.get(url);

    return response.data.map(
      (item: any): BaseEntry => ({
        id: item.id,

        category: (category as CategoryType) || "ARTWORK",
        lang: "ko",
        title: item.title.rendered,
        date: new Date(item.date).toLocaleDateString(),
        thumbnail:
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          item.jetpack_featured_media_url || // 제트팩 사용 시 대비
          "https://via.placeholder.com/300", // 없으면 임시 이미지

        summary: item.excerpt.rendered.replace(/<[^>]*>?/gm, "").slice(0, 100),
      }),
    );
  }

  // 상세 가져오기
  async fetchById(id: string | number): Promise<BaseDetail> {
    const response = await axios.get(`${this.API_URL}/posts/${id}?_embed`);
    const item = response.data;

    return {
      id: item.id,
      category: "ARTWORK",
      lang: "ko",
      title: item.title.rendered,
      date: new Date(item.date).toLocaleDateString(),
      thumbnail: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
      content: item.content.rendered,
      size: item.acf?.size || "",
      material: item.acf?.material || "",
    };
  }
}
