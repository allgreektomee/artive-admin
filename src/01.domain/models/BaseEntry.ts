/**
 * [DOMAIN LAYER] Model
 * 역할: 모든 기록물(Artwork, Insight, Log)의 공통 속성을 정의하는 최상위 추상 모델.
 * 특징: 이 모델은 순수하며, 특정 API(WordPress, Spring)의 데이터 구조에 의존하지 않습니다.
 */
export interface BaseEntry {
  id: string | number;
  type: "Artwork" | "Insight" | "Log" | "Banner" | "Unknown"; // 콘텐츠 유형
  title: string;
  date: string;
  thumbnail: string; // 썸네일 이미지 URL (가장 중요한 부분!)
}
