import { useState } from "react";
import { message } from "antd";
import imageCompression from "browser-image-compression";
import { commonApi } from "../api/commonApi.js";

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);

  /**
   * @param {File} file
   * @param {string} [category]
   * @returns {Promise<string|null>}
   */
  const uploadSingleImage = async (file, category = "artwork") => {
    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(file, options);
      const result = await commonApi.uploadImage(compressedFile, category);

      if (Array.isArray(result) && result.length > 0 && result[0].imageUrl) {
        message.success("이미지가 성공적으로 업로드되었습니다.");
        return result[0].imageUrl;
      }

      throw new Error("응답 데이터에 imageUrl이 없습니다.");
    } catch (error) {
      console.error("Upload Error:", error);
      message.error("이미지 업로드에 실패했습니다.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadSingleImage, isUploading };
}
