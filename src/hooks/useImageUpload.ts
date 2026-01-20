import { useState } from "react";
import { message } from "antd";
import imageCompression from "browser-image-compression";
import { commonApi } from "../api/commonApi";

// useImageUpload.ts

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadSingleImage = async (file: File, category: string = "artwork") => {
    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp" as const,
      };

      const compressedFile = await imageCompression(file, options);
      
      // 1. API 호출 결과 받기
      const response = await commonApi.uploadImage(compressedFile, category);
      
      // 2. 로그 기반 구조 분석: response.data.data가 배열 [ "url" ] 형태임
      if (response.data && response.data.success) {
        const imageUrls = response.data.data; // 이것이 Array(1)
        
        if (Array.isArray(imageUrls) && imageUrls.length > 0) {
          message.success("이미지가 성공적으로 업로드되었습니다.");
          // 🚀 배열의 첫 번째 요소(URL 문자열)를 반환
          return imageUrls[0]; 
        }
      }
      
      throw new Error("응답 데이터 형식이 올바르지 않습니다.");

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