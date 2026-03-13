/**
 * [DOMAIN LAYER] Repository Interface
 * 역할: 데이터에 접근하기 위한 '행위'를 정의하는 약속(Interface)입니다.
 * 특징: 데이터가 어디서(WP, Spring, Local) 오는지 모르더라도, 어떤 함수를 호출할지 결정합니다.
 */

import type { BaseEntry, BaseDetail } from "../models/BaseEntry";

export interface IBaseRepository {
  fetchAll(category?: string): Promise<BaseEntry[]>;
  fetchById(id: string | number): Promise<BaseDetail>;
}
