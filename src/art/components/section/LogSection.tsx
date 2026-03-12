import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";
import ViewMoreButton from "../home/ViewMoreButton";

// 카테고리별 3개씩, 총 9개의 데이터를 상정합니다.
const logData = [
  // PROCESS
  {
    id: "p1",
    category: "PROCESS",
    title: "두꺼운 마티에르 실험",
    date: "2026.03.12",
  },
  {
    id: "p2",
    category: "PROCESS",
    title: "캔버스 뒷면의 흔적들",
    date: "2026.03.05",
  },
  {
    id: "p3",
    category: "PROCESS",
    title: "나이프 드로잉 연습 노트",
    date: "2026.02.20",
  },
  // SPACE
  {
    id: "s1",
    category: "SPACE",
    title: "오후 3시의 성수동 채광",
    date: "2026.03.10",
  },
  {
    id: "s2",
    category: "SPACE",
    title: "작업실의 낡은 나무 책상",
    date: "2026.02.25",
  },
  {
    id: "s3",
    category: "SPACE",
    title: "전시 준비 중인 갤러리 풍경",
    date: "2026.02.10",
  },
  // ESSAY
  {
    id: "e1",
    category: "ESSAY",
    title: "무너진 것들에서 발견한 미학",
    date: "2026.03.01",
  },
  {
    id: "e2",
    category: "ESSAY",
    title: "예술을 기록한다는 것의 의미",
    date: "2026.02.15",
  },
  {
    id: "e3",
    category: "ESSAY",
    title: "완벽함보다 소중한 미완성",
    date: "2026.01.20",
  },
];

const LogSection = ({ lang = "ko" }: { lang?: "ko" | "en" }) => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const categories = ["PROCESS", "SPACE", "ESSAY"];

  return (
    <section
      style={{
        marginTop: isMobile ? "100px" : "180px",
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: isMobile ? "0 20px" : "0", // 인사이트와 동일하게 좌우 여백 정렬
        paddingBottom: "120px",
        boxSizing: "border-box",
      }}
    >
      {/* --- LOG 헤더 --- */}
      <div
        style={{
          marginBottom: isMobile ? "40px" : "60px",
          borderTop: "1px solid #eee",
          paddingTop: "60px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            letterSpacing: "4px",
            marginBottom: "8px",
            fontWeight: 900,
          }}
        >
          LOG
        </p>
        <p
          style={{
            fontSize: isMobile ? "20px" : "26px",
            color: "#333",
            fontWeight: 300,
          }}
        >
          기록
        </p>
      </div>

      {/* --- LOG 그리드 레이아웃 --- */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "60px" : "40px",
          marginBottom: "60px",
        }}
      >
        {categories.map((cat) => (
          <div key={cat} style={{ flex: 1 }}>
            {/* 카테고리 소제목 */}
            <h3
              style={{
                fontSize: "12px",
                fontWeight: 900,
                color: "#0055ff",
                letterSpacing: "2px",
                marginBottom: "25px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {cat}
              <span
                style={{
                  width: "20px",
                  height: "1px",
                  backgroundColor: "#0055ff",
                  display: "inline-block",
                }}
              />
            </h3>

            {/* 해당 카테고리 리스트 */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {logData
                .filter((item) => item.category === cat)
                .slice(0, 3) // 각 카테고리별 3개씩
                .map((log) => (
                  <div
                    key={log.id}
                    onClick={() => navigate(`/art/log/${log.id}`)}
                    style={{
                      padding: "18px 0",
                      borderBottom: "1px solid #f2f2f2",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.6")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#ccc",
                        fontFamily: "monospace",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      {log.date}
                    </span>
                    <h4
                      style={{
                        fontSize: "15px",
                        color: "#444",
                        fontWeight: 400,
                        lineHeight: 1.4,
                        wordBreak: "keep-all",
                      }}
                    >
                      {log.title}
                    </h4>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <ViewMoreButton
        label="VIEW MORE LOGS"
        onClick={() => navigate("/art/log")}
      />
    </section>
  );
};

export default LogSection;
