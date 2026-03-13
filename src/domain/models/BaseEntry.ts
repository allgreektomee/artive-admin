/**
 * [DOMAIN LAYER] Base Models
 * 역할: 서비스의 가장 순수한 데이터 규격(Schema)을 정의합니다.
 * 특징: 외부 라이브러리나 기술 스택에 의존하지 않으며, '아카이브' 시스템의 데이터 구조를 결정합니다.
 */

//모든 컨텐츠의 공통 부모 모델)
export type CategoryType = "ARTWORK" | "INSIGHT" | "LOG";
export type LanguageType = "ko" | "en" | "ja" | "zh";

// 목록용 공통 모델
export interface BaseEntry {
  id: string | number;
  category: CategoryType;
  lang: LanguageType;
  title: string;
  date: string;
  thumbnail: string;
  summary?: string;
}

// 상세 페이지용 확장 모델
export interface BaseDetail extends BaseEntry {
  content?: string; // 본문 (HTML)
  images?: string[]; // 추가 이미지 리스트
  // 아트워크 전용 (필요시)
  size?: string;
  material?: string;
}
