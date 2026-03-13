/**
 * [CORE LAYER] Dependency Injection (DI)
 * 역할: 전역에서 사용할 인스턴스를 관리하고 주입해주는 '중앙 관리소'입니다.
 * 특징: 리포지토리 등을 싱글톤으로 관리하여 메모리 효율을 높이고 데이터 일관성을 유지합니다.
 */

import { BaseRepositoryImpl } from "../../02.data/repositories/BaseRepositoryImpl";

// 리포지토리 싱글톤 인스턴스
export const baseRepo = new BaseRepositoryImpl();
