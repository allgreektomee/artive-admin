import client from "./client";
import type { ApiResponse, PageResponse } from "../types/common";
import type { 
  ArtworkListResponse, 
  ArtworkCreateRequest, 
  ArtworkUpdateRequest,
  HistoryCreateRequest,
  HistoryListResponse,
  LanguageCode
} from "../types/artwork";

export const artworkApi = {
  // --- [작품 본체 관련] ---
  
  // 내 작품 목록 (페이징)
 getMyArtworks: (page: number = 0) =>
    client.get<ApiResponse<PageResponse<ArtworkListResponse>>>(`/artworks?page=${page}`),

  // 작품 등록
  createArtwork: (data: ArtworkCreateRequest) =>
    client.post<ApiResponse<number>>("/artworks", data),

  // 작품 수정
  updateArtwork: (id: number, data: ArtworkUpdateRequest) =>
    client.put<ApiResponse<void>>(`/artworks/${id}`, data),

  // 작품 삭제
  deleteArtwork: (id: number) =>
    client.delete<ApiResponse<void>>(`/artworks/${id}`),

  // --- [히스토리 관련] ---

  // 히스토리 추가
  addHistory: (artworkId: number, data: HistoryCreateRequest) =>
    client.post<ApiResponse<number>>(`/artworks/${artworkId}/histories`, data),

  // 특정 작품의 히스토리 목록 조회 (언어 선택 가능)
  getArtworkHistories: (artworkId: number, lang: LanguageCode = 'KO', page: number = 0) =>
    client.get<ApiResponse<HistoryListResponse[]>>(
      `/artworks/${artworkId}/histories?lang=${lang}&page=${page}`
    ),

  // 히스토리 삭제
  deleteHistory: (historyId: number) =>
    client.delete<ApiResponse<void>>(`/artworks/histories/${historyId}`),
};