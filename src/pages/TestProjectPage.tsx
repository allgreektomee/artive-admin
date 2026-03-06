import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNativeBridge } from "../hooks/useNativeBridge";

const TestProjectPage = () => {
  const [status, setStatus] = useState("대기 중...");
  const navigate = useNavigate();

  // 🚀 리액트 스타일: 평면 구조(action, status)로 바로 판단
  const { sendToNative } = useNativeBridge((response) => {
    if (response.action === "REQ_FACE_ID") {
      if (response.status === "SUCCESS") {
        setStatus("인증 성공! 이동합니다...");
        setTimeout(() => navigate("/transfer-success"), 1000);
      } else {
        // 네이티브에서 보낸 에러 메시지가 있으면 보여주고, 없으면 기본 문구
        setStatus(response.message || "인증 실패나 취소됨");
      }
    }
  });

  const handleAuthStart = () => {
    setStatus("네이티브 인증 호출 중...");
    sendToNative("REQ_FACE_ID", { amount: "10,000" });
  };

  return (
    <div style={containerStyle}>
      <h2>Web-Driven 리뉴얼 테스트</h2>
      <div style={statusBoxStyle}>{status}</div>
      <button onClick={handleAuthStart} style={buttonStyle}>
        FaceID 인증 요청
      </button>

      {/* 🛠️ 개발자용 테스트 버튼도 변경된 구조에 맞게 수정 */}
      <button
        onClick={() =>
          (window as any).onNativeCallback?.({
            action: "REQ_FACE_ID",
            status: "SUCCESS",
            id: "debug-123",
          })
        }
        style={debugButtonStyle}
      >
        (브라우저 전용) 성공 강제 발생
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
const debugButtonStyle = {
  marginTop: "50px",
  display: "block",
  fontSize: "12px",
  color: "#ccc",
  background: "none",
  border: "none",
};

export default TestProjectPage;
