import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNativeBridge } from "../hooks/useNativeBridge";

const TestProjectPage = () => {
  const [status, setStatus] = useState("대기 중...");
  const navigate = useNavigate();
  const { sendToNative } = useNativeBridge();

  // 🚀 이제 핸들러 자체가 async 함수가 됩니다.
  const handleAuthStart = async () => {
    setStatus("네이티브 인증 호출 중...");

    try {
      // 1. 던지고 기다린다 (await)
      const response: any = await sendToNative("REQ_FACE_ID", {
        amount: "10,000",
      });

      console.log("네이티브가 준 선물:", response.data);

      // 2. 성공 시 로직 (여기로 왔다는 건 status가 SUCCESS라는 뜻)
      setStatus("인증 성공! 이동합니다...");
      setTimeout(() => navigate("/transfer-success"), 1000);
    } catch (error: any) {
      // 3. 실패 시 로직 (FAIL이나 에러가 발생하면 일로 튕겨져 들어옴)
      console.error("인증 실패 로그:", error);
      setStatus(error.message || "인증 실패나 취소됨");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Web-Driven 리뉴얼 테스트</h2>
      <div style={statusBoxStyle}>{status}</div>
      <button onClick={handleAuthStart} style={buttonStyle}>
        FaceID 인증 요청
      </button>
    </div>
  );
};

// 스타일은 관리자님 기존 코드 그대로 유지합니다.
const containerStyle = { padding: "50px", textAlign: "center" as const };
const statusBoxStyle = {
  margin: "20px",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};
const buttonStyle = {
  padding: "12px 24px",
  backgroundColor: "#007AFF",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default TestProjectPage;
