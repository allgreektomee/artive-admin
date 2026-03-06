import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNativeBridge } from "./useNativeBridge";

export const useFaceIDAuth = () => {
  const [status, setStatus] = useState("대기 중...");
  const { sendToNative } = useNativeBridge(); // 엔진(Layer 1) 호출
  //   const navigate = useNavigate();

  const authenticate = async (amount: string = "0") => {
    setStatus("네이티브 인증 호출 중...");

    try {
      // 🚀 엔진을 통해 네이티브와 통신
      await sendToNative("REQ_FACE_ID", { amount });

      // ✅ 성공 시 로직
      setStatus("인증 성공! ");
      //   setTimeout(() => navigate("/transfer-success"), 1000);
    } catch (error: any) {
      // ❌ 실패/취소 시 로직
      console.error("인증 실패:", error);
      setStatus(error.message || "인증 실패나 취소됨");
    }
  };

  return { status, authenticate };
};
