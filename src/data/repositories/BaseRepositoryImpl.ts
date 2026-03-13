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
    // 💡 기존 코드처럼 lang=ko와 _embed를 명확히 붙여줍니다.
    const baseUrl = `${this.API_URL}/posts?_embed&lang=ko`;
    const url = category ? `${baseUrl}&categories=${category}` : baseUrl;

    const { data } = await axios.get(url);

    return data.map((item: any): BaseEntry => {
      // 💡 WP 임베드 이미지 추출 (기존 방식 최적화)
      const featuredMedia = item._embedded?.["wp:featuredmedia"]?.[0];
      const thumb = featuredMedia?.source_url || "";

      return {
        id: item.id,
        category: (category as CategoryType) || "ARTWORK",
        lang: "ko",
        title: item.title.rendered,
        date: new Date(item.date).toLocaleDateString(),
        thumbnail: thumb,
        summary: item.excerpt.rendered.replace(/<[^>]*>?/gm, "").slice(0, 100),
      };
    });
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
