

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
export interface ArtworkCreateRequest {
  koTitle: string;
  enTitle?: string;
  koDescription?: string;
  enDescription?: string;
  thumbnailUrl: string; // S3 업로드 후 받은 URL
  isPublic: boolean;
}


export type ArtworkUpdateRequest = ArtworkCreateRequest;

/** 🚀 작품 목록 아이템 DTO */
export interface ArtworkListResponse {
  id: number;
  thumbnailUrl: string;
  title: string;       // koTitle 대신 백엔드가 주는 'title'로 매칭
  status: string;      // ArtworkStatus (ING, COMPLETED 등)
  totalHistoryCount: number;
  createdAt: string;   // 필요시 추가
}



/** 🚀 히스토리 관련 DTO (HistoryCreateRequest / HistoryListResponse) */
export interface HistoryCreateRequest {
  year: string;  // 진행 연도 등
  koContent: string;
  enContent?: string;
}

export interface HistoryListResponse{
  id: number;
  year: string;
  content: string; // 요청 시 보낸 lang(KO, EN 등)에 따라 백엔드에서 번역해서 준 값
}

