import client from "./client";
import type { ApiResponse, PageResponse } from "../types/common";
import type { HistoryCreateRequest, HistoryDetailResponse } from "../types/history";


export const historyApi = {
  // 히스토리 생성
  createHistory: (artworkId: number, data: HistoryCreateRequest) => 
    client.post<ApiResponse>(`/artworks/${artworkId}/histories`, data),

  // 히스토리 목록 조회 (언어 설정 포함)
  getArtworkHistories: (artworkId: number, lang: string = 'KO', page: number = 0) =>
    client.get<ApiResponse<PageResponse<HistoryDetailResponse>>>(`/artworks/${artworkId}/histories?lang=${lang}&page=${page}`),

  // 히스토리 삭제
  deleteHistory: (historyId: number) => 
    client.delete(`/histories/${historyId}`),

    // 히스토리 추가
  addHistory: (artworkId: number, data: HistoryCreateRequest) =>
    client.post<ApiResponse<number>>(`/artworks/${artworkId}/histories`, data),

  // 특정 작품의 히스토리 목록 조회 (언어 선택 가능)



};