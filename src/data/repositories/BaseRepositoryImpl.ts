import axios from "axios";
import { IBaseRepository } from "../../domain/repositories/IBaseRepository";
import { BaseEntry, BaseDetail } from "../../domain/models/BaseEntry";

export class BaseRepositoryImpl implements IBaseRepository {
  private readonly API_URL = "https://cms.artivefor.me/wp-json/wp/v2";

  // 목록 가져오기
  async fetchAll(category?: string): Promise<BaseEntry[]> {
    const response = await axios.get(`${this.API_URL}/posts?_embed`);

    return response.data.map(
      (item: any): BaseEntry => ({
        id: item.id,
        category: "ARTWORK", // 우선 기본값, 나중에 WP 카테고리 ID와 매핑 가능
        lang: "ko",
        title: item.title.rendered,
        date: new Date(item.date).toLocaleDateString(),
        thumbnail: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
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
