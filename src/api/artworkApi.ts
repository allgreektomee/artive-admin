import client from "./client";

export const artworkApi = {
  // 작품 목록 조회
  getArtworks: () => client.get("/artworks"),
  
  // 작품 상세 조회
  getArtworkDetail: (id: number) => client.get(`/artworks/${id}`),
  
  // 작품 삭제
  deleteArtwork: (id: number) => client.delete(`/artworks/${id}`),
  
  // 작품 등록 (나중에 다국어 데이터가 포함될 곳)
  createArtwork: (data: any) => client.post("/artworks", data),
};