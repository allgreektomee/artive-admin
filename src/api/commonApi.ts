import client from "./client";

export const commonApi = {
  /**
   * 이미지 업로드 공통 함수
   * @param file 업로드할 파일 객체
   * @param category 폴더 구분 (artwork, profile, notice 등)
   */
  uploadImage: async (file: File | Blob, category: string = "general") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const response = await client.post("/images/upload", formData);
    // 백엔드 응답 구조에 맞춰 return (보통 response.data.imageUrl)
    return response.data?.data || response.data;
  },
};