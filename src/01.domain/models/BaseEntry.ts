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

/**
 * [확장 모델] Artwork (작품) - ACF 필드 기반
 */
export interface ArtworkEntry extends BaseEntry {
  type: "Artwork";
  subtitle: string;
  linkUrl: string;
  artistName: string;
  artworkName: string; // ACF의 artwork_name
  info: string; // ACF의 artwork_info
  year: string; // ACF의 artwork_year
}

/**
 * [확장 모델] Insight (인사이트/아티클)
 */
export interface InsightEntry extends BaseEntry {
  type: "Insight";
  summary: string; // 요약글 (excerpt)
}

// 모든 아카이브 타입을 통합한 유니언 타입
// 타입 가드를 통해 특정 타입의 속성에 접근할 수 있음
export type ArchiveEntry = ArtworkEntry | InsightEntry | BaseEntry;
