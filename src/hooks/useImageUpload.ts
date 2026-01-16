import { useState } from "react";
import { message } from "antd";
import imageCompression from "browser-image-compression";
import { commonApi } from "../api/commonApi";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadSingleImage = async (file: File, category: string = "artwork") => {
    setIsUploading(true);
    try {
      // 1. 이미지 압축 설정
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp" as const,
      };

      const compressedFile = await imageCompression(file, options);
      
      // 2. 공통 API 호출
      const result = await commonApi.uploadImage(compressedFile, category);
      
      message.success("이미지가 성공적으로 업로드되었습니다.");
      return result.imageUrl; // 업로드된 URL 반환

    } catch (error) {
      console.error("Upload Error:", error);
      message.error("이미지 업로드에 실패했습니다.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadSingleImage, isUploading };
};