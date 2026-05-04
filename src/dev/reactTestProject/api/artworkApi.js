/**
 * 16장 · 작품(artwork) REST 래퍼 — `client` 만 쓰고 URL/메서드만 모음.
 * 화면은 이 객체를 거쳐 서버와 통신(목록 훅은 useArtwork, 상세 페이지는 직접 호출 병행).
 */
import client from "./client.js";

export const artworkApi = {
  getMyArtworks: (page = 0) => client.get(`/artworks?page=${page}`),

  createArtwork: (data) => client.post("/artworks", data),

  updateArtwork: (id, data) => client.put(`/artworks/${id}`, data),

  getArtworkDetail: (id) => client.get(`/artworks/${id}`),

  deleteArtwork: (id) => client.delete(`/artworks/${id}`),
};
