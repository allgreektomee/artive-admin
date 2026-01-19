// 서버 공통 에러 응답 DTO
export interface ApiErrorResponse {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;  // 백엔드: private boolean success
  message: string;   // 백엔드: private String message
  data: T;           // 백엔드: private T data
}

export interface PageResponse<T> {
  content: T[];          // 실제 데이터 리스트
  totalElements: number; // 전체 데이터 개수 (AntD Pagination의 total에 사용)
  totalPages: number;    // 전체 페이지 수
  size: number;          // 한 페이지당 사이즈
  number: number;        // 현재 페이지 번호 (0부터 시작)
  first: boolean;        // 첫 페이지 여부
  last: boolean;         // 마지막 페이지 여부
  numberOfElements: number; // 현재 페이지의 데이터 개수
}