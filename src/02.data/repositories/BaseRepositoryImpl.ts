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
    const rawPosts = await fetchPostsByCategory(categoryId);
    // 원본 데이터를 Domain 모델로 변환
    return rawPosts.map(toBaseEntry);
  }
}
