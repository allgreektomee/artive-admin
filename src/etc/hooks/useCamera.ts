import { useState } from "react";
import { useNativeBridge } from "./useNativeBridge";

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const { sendToNative } = useNativeBridge();

  const takePhoto = async () => {
    try {
      const response: any = await sendToNative("REQ_CAMERA");
      if (response.data?.imageUrl) {
        // 🚀 네이티브가 준 Base64 문자열을 그대로 저장
        setPhoto(response.data.imageUrl);
      }
    } catch (error: any) {
      console.error("카메라 호출 실패:", error);
      alert(error.message || "카메라를 실행할 수 없습니다.");
    }
  };

  return { photo, takePhoto };
};
