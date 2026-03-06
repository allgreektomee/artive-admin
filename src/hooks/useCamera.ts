import { useState } from "react";
import { useNativeBridge } from "./useNativeBridge";

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const { sendToNative } = useNativeBridge();

  const takePhoto = async () => {
    try {
      // 🚀 엔진을 통해 카메라 호출 (규격: action은 밖으로!)
      const response: any = await sendToNative("REQ_CAMERA", {
        allowEdit: true,
        saveToAlbum: false,
      });

      // 네이티브에서 보내준 이미지 데이터(base64 등) 저장
      if (response.data?.imageUrl) {
        setPhoto(response.data.imageUrl);
      }
      return response.data;
    } catch (error: any) {
      console.error("카메라 호출 실패:", error);
      alert(error.message || "카메라를 실행할 수 없습니다.");
    }
  };

  return { photo, takePhoto };
};
