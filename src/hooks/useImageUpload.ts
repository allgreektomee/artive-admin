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

      // API 호출
      const result = await commonApi.uploadImage(compressedFile, category);

      // 🚀 로그를 찍어서 result의 실체를 확인합니다.
      console.log("commonApi.uploadImage 결과(result):", result);

      // 1. result가 곧바로 서버 응답 본체인 경우 (성공 시 data 배열이 바로 있는 경우)
      if (result && result.success && Array.isArray(result.data)) {
        message.success("이미지가 성공적으로 업로드되었습니다.");
        return result.data[0]; // 배열의 첫 번째 요소인 URL 반환
      }

      // 2. 만약 result.data 안에 또 data가 있는 구조인 경우 (Axios의 기본 response 객체일 때)
      if (
        result.data &&
        result.data.success &&
        Array.isArray(result.data.data)
      ) {
        message.success("이미지가 성공적으로 업로드되었습니다.");
        return result.data.data[0];
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
