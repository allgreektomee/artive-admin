

/** 🚀 언어 코드 타입 */
export type LanguageCode = 'KO' | 'EN' | 'JP' | 'CH';

/** 🚀 작품 목록 조회 응답 (ArtworkListResponse.java) */
export interface ArtworkListResponse {
  id: number;
  thumbnailUrl: string;
  title: string;           // 백엔드에서 KO 번역본을 추출해서 주는 필드명
  status: string;          // ArtworkStatus (ING, COMPLETED 등)
  totalHistoryCount: number; //
  createdAt: string;
}

/** 🚀 작품 생성 요청 (ArtworkCreateRequest.java) */
export interface ArtworkCreate {
  koTitle: string;
  enTitle?: string;
  koDescription?: string;
  enDescription?: string;
  thumbnailUrl: string; // S3 업로드 후 받은 URL
  isPublic: boolean;
}



export type ArtworkUpdateResponse = ArtworkCreate;
export interface ArtworkDetailResponse {
  id: number;
  thumbnailUrl: string;
  medium?: string;
  size?: string;
  status: string;        // IN_PROGRESS, COMPLETED 등 (WorkStatus enum 사용 가능)
  startedAt?: string;    // ISO Date String
  finishedAt?: string;   // ISO Date String
  visibility: "PUBLIC" | "PRIVATE"; // 백엔드 Visibility Enum과 매칭
  
  // 다국어 정보 (백엔드 Service에서 Flatten해서 보내주는 구조)
  koTitle: string;
  koDescription: string;
  enTitle?: string;
  enDescription?: string;

  // 필요 시 추가
  createdAt?: string;
  updatedAt?: string;
}


/** 🚀 히스토리 관련 DTO (HistoryCreateRequest / HistoryListResponse) */
export interface HistoryCreateResponse {
  year: string;  // 진행 연도 등
  koContent: string;
  enContent?: string;
}

export interface HistoryListResponse{
  id: number;
  year: string;
  content: string; // 요청 시 보낸 lang(KO, EN 등)에 따라 백엔드에서 번역해서 준 값
}

