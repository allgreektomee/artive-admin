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
      {/* 카메라 영역에 사진 미리보기 추가 */}
      <div style={{ marginTop: "20px" }}>
        {photo ? (
          <div>
            <p style={{ fontSize: "12px", color: "#888" }}>📷 촬영된 이미지</p>
            <img
              src={photo}
              alt="미리보기"
              style={{
                width: "150px", // 작게 보여주기
                height: "auto",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "150px",
              height: "100px",
              backgroundColor: "#f0f0f0",
              margin: "0 auto",
              lineHeight: "100px",
              borderRadius: "8px",
              color: "#aaa",
            }}
          >
            사진 없음
          </div>
        )}
      </div>

      <button
        onClick={takePhoto}
        style={{
          ...buttonStyle,
          backgroundColor: "#34C759",
          marginTop: "10px",
        }}
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
