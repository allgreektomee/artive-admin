import type { IBaseRepository } from "../../01.domain/repositories/IBaseRepository";
import type { BaseEntry } from "../../01.domain/models/BaseEntry";
import { fetchPostsByCategory } from "../api/wp-api"; // API 호출 함수 가져옴
import { toBaseEntry } from "../mappers/BaseMapper"; // 데이터 변환 함수 가져옴

/**
 * [DATA] Repository 구현체
 * 역할: IBaseRepository의 실제 구현. API 통신 및 데이터 정제.
 */
export class BaseRepositoryImpl implements IBaseRepository {
  async getAllEntries(): Promise<BaseEntry[]> {
    // 기본으로 작품 목록(ID: 3)을 가져옴
    return this.getEntriesByCategory(3);
  }

  async getEntriesByCategory(categoryId: number): Promise<BaseEntry[]> {
    // 💡 작품(ID:3)은 슬러그 순서로, 나머지는 최신순으로 가져오도록 분기
    if (categoryId === 3) {
      // 슬러그(slug) 오름차순(asc)으로 정렬하여 포스트 순서를 제어합니다.
      const rawPosts = await fetchPostsByCategory(categoryId, {
        orderBy: "slug",
        order: "asc",
      });
      return rawPosts.map(toBaseEntry);
    }
    // 그 외 카테고리는 기본값(최신순)으로 가져옵니다.
    const rawPosts = await fetchPostsByCategory(categoryId);
    // 원본 데이터를 Domain 모델로 변환
    return rawPosts.map(toBaseEntry);
  }
}
