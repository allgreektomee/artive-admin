import { useFaceIDAuth } from "../hooks/useFaceIDAuth";
import { useCamera } from "../hooks/useCamera";

const TestProjectPage = () => {
  const { status, authenticate } = useFaceIDAuth();
  const { photo, takePhoto } = useCamera();

  return (
    <div style={containerStyle}>
      <h2>Web-Driven 리뉴얼 테스트</h2>
      <div style={statusBoxStyle}>{status}</div>
      <button onClick={() => authenticate("10,000")} style={buttonStyle}>
        FaceID 인증 요청
      </button>

      <hr style={{ margin: "30px 0", opacity: 0.2 }} />

      {/* --- 카메라 영역 --- */}
      <h3>카메라 테스트</h3>
      {photo && (
        <img
          src={photo}
          alt="촬영된 사진"
          style={{ width: "200px", marginBottom: "10px" }}
        />
      )}
      <button
        onClick={takePhoto}
        style={{ ...buttonStyle, backgroundColor: "#34C759" }} // 초록색 버튼
      >
        사진 촬영하기
      </button>
    </div>
  );
};

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
