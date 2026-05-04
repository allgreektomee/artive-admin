/**
 * 16장 · 공통 업로드 — `useImageUpload` 가 compress 후 여기로 넘김.
 */
import client from "./client.js";

export const commonApi = {
  /**
   * @param {File|Blob} file
   * @param {string} [category]
   */
  uploadImage: async (file, category = "general") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const response = await client.post("/images/upload", formData);
    return response.data?.data || response.data;
  },
};
