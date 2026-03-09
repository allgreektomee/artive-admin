// src/types/index.ts

export const LanguageCode = {
  KO: "KO",
  EN: "EN",
  JP: "JP",
  ZH: "ZH",
} as const;

export type LanguageCodeType = (typeof LanguageCode)[keyof typeof LanguageCode];

// 작품 상태 Enum
export const WorkStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  FOR_SALE: "FOR_SALE",
  SOLD_OUT: "SOLD_OUT",
} as const;

export type WorkStatusType = (typeof WorkStatus)[keyof typeof WorkStatus];

// 화면 표시용 라벨 (다국어 확장을 고려한다면 이 부분도 나중에 처리 가능)
export const WorkStatusLabels: Record<WorkStatusType, string> = {
  [WorkStatus.IN_PROGRESS]: "작업 중",
  [WorkStatus.COMPLETED]: "완성",
  [WorkStatus.FOR_SALE]: "판매 중",
  [WorkStatus.SOLD_OUT]: "판매 완료",
};

export interface Translation {
  title: string;
  description: string;
}

// 작품 등록 시 서버로 보낼 객체 구조
export interface ArtworkUploadRequest {
  thumbnailUrl: string;
  translations: Partial<Record<LanguageCodeType, Translation>>;
  isPublic: boolean;
}

// 로그인 성공 시 서버에서 받을 유저 정보 (필요시)
export interface LoginResponse {
  email: string;
  role: string;
  accessToken?: string; // JWT 사용 시
}


