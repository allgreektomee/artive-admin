import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";
import ViewMoreButton from "../home/ViewMoreButton";

const logData = [
  // --- 1. PROCESS (연습 흔적) ---
  {
    id: "p1",
    category: "PROCESS",
    date: "2026.03.12",
    title: {
      ko: "두꺼운 마티에르 실험: 나이프의 궤적",
      en: "Matière Experiment: Trajectory of the Knife",
    },
  },
  {
    id: "p2",
    category: "PROCESS",
    date: "2026.03.05",
    title: {
      ko: "캔버스 뒷면, 우리가 놓친 기록들",
      en: "Back of the Canvas: Records We Missed",
    },
  },
  {
    id: "p3",
    category: "PROCESS",
    date: "2026.02.18",
    title: {
      ko: "미완성 드로잉: 선의 망설임에 대하여",
      en: "Incomplete Drawings: On the Hesitation of Lines",
    },
  },

  // --- 2. SPACE (일상) ---
  {
    id: "s1",
    category: "SPACE",
    date: "2026.03.10",
    title: {
      ko: "오후 3시의 성수동, 갤러리에 스며든 빛",
      en: "Seongsu-dong at 3 PM: Light Seeping into the Gallery",
    },
  },
  {
    id: "s2",
    category: "SPACE",
    date: "2026.02.24",
    title: {
      ko: "작업실의 낡은 나무 책상이 주는 안정감",
      en: "Stability from the Old Wooden Desk in the Studio",
    },
  },
  {
    id: "s3",
    category: "SPACE",
    date: "2026.02.12",
    title: {
      ko: "비 오는 날의 아카이브실 소음",
      en: "Noise from the Archive Room on a Rainy Day",
    },
  },

  // --- 3. ESSAY (감상) ---
  {
    id: "e1",
    category: "ESSAY",
    date: "2026.03.01",
    title: {
      ko: "무너진 것들에서 발견한 기록의 가치",
      en: "The Value of Records Found in Broken Things",
    },
  },
  {
    id: "e2",
    category: "ESSAY",
    date: "2026.02.15",
    title: {
      ko: "예술을 기록한다는 것의 무게",
      en: "The Weight of Archiving Art",
    },
  },
  {
    id: "e3",
    category: "ESSAY",
    date: "2026.01.30",
    title: {
      ko: "완벽함보다 소중한 미완의 순간들",
      en: "Moments of Incompleteness More Precious Than Perfection",
    },
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
                      {log.title[lang as keyof typeof log.title]}
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
