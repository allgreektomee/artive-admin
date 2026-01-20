import { useState } from "react";
import { message } from "antd";
import imageCompression from "browser-image-compression";
import { commonApi } from "../api/commonApi";

// useImageUpload.ts

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  // useImageUpload.ts

  const uploadSingleImage = async (
    file: File,
    category: string = "artwork"
  ) => {
    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp" as const,
      };

      const compressedFile = await imageCompression(file, options);

      // API 호출 (현재 result 자체가 [{imageUrl: '...'}] 배열입니다)
      const result = await commonApi.uploadImage(compressedFile, category);

      console.log("실제 데이터 구조 확인:", result);

      // 🚀 수정된 로직: 배열이고 첫 번째 요소에 imageUrl이 있는지 확인
      if (Array.isArray(result) && result.length > 0 && result[0].imageUrl) {
        message.success("이미지가 성공적으로 업로드되었습니다.");
        return result[0].imageUrl; // S3 URL 문자열만 반환
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
};
