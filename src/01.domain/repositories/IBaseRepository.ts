//  (Repository의 기능 명세서 역할을 하는 인터페이스 파일

import type { BaseEntry } from "../models/BaseEntry";

/**
 * [DOMAIN] Repository Interface
 * 역할: 데이터 접근 행위를 정의함. "무엇을 할 것인가"에 대한 명세.
 * 특징: 실제 구현(어떻게)은 Data Layer에 위임함.
 */
export interface IBaseRepository {
  getAllEntries(): Promise<BaseEntry[]>;
  getEntriesByCategory(categoryId: number): Promise<BaseEntry[]>;
}
