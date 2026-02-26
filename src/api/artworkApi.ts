import client from "./client";
import type { ApiResponse, PageResponse } from "../types/common";
import type { 
  ArtworkListResponse, 
  ArtworkCreate, 
  ArtworkUpdateResponse,
  ArtworkDetailResponse,
} from "../types/artwork";

export const artworkApi = {
  // --- [작품 본체 관련] ---

  // 내 작품 목록 (페이징)
  getMyArtworks: (page: number = 0) =>
  client.get<ApiResponse<PageResponse<ArtworkListResponse>>>(`/artworks?page=${page}`),

  // 작품 등록
  createArtwork: (data: ArtworkCreate) =>
  client.post<ApiResponse<number>>("/artworks", data),

  // 작품 수정
  updateArtwork: (id: number, data: ArtworkUpdateResponse) =>
  client.put<ApiResponse<void>>(`/artworks/${id}`, data),

  getArtworkDetail: (id: number) =>
  client.get<ApiResponse<ArtworkDetailResponse>>(`/artworks/${id}`),

  // 작품 삭제
  deleteArtwork: (id: number) =>
  client.delete<ApiResponse<void>>(`/artworks/${id}`),

  // --- [히스토리 관련] ---


};