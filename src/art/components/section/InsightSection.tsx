// import React from "react";
import { useNavigate } from "react-router-dom";

// 데이터 구조 (나중에 WordPress API로 교체 가능)
const insightData = [
  {
    id: "manifesto-1",
    category: "MANIFESTO",
    issueNo: "VOL.01",
    title: { ko: "색의 흔적이 머무는 자리", en: "Where Traces of Color Dwell" },
    description: {
      ko: "우리는 왜 캔버스 위의 붓터치에 집중하는가. 아티브가 지향하는 아카이빙의 본질에 대하여.",
      en: "Why we focus on brushstrokes on canvas. About the essence of archiving.",
    },
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000",
  },
  {
    id: "artist-park",
    category: "ARTIST",
    issueNo: "NO.05",
    title: { ko: "박재영: 쿨 차콜의 고요함", en: "Jae Young Park: Silence" },
    description: {
      ko: "공간 속에 스며든 노란빛을 통해 현대인의 고독을 재해석하는 작가 박재영을 만났습니다.",
      en: "Meeting artist Jae Young Park, who reinterprets loneliness through yellow light.",
    },
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000",
  },
];

const InsightSection = ({ lang = "ko" }: { lang?: "ko" | "en" }) => {
  const navigate = useNavigate();

  return (
    <section style={{ marginTop: "100px", padding: "0 10px", width: "100%" }}>
      {/* 1. INSIGHT (시선) 섹션 */}
      <div style={{ marginBottom: "40px" }}>
        <p
          style={{
            fontSize: "16px",
            color: "#bbb",
            letterSpacing: "3px",
            marginBottom: "5px",
          }}
        >
          INSIGHT
        </p>
        <p style={{ fontSize: "18px", color: "#444", fontWeight: "300" }}>
          시선
        </p>
      </div>

      {/* 모바일 1열 / PC 지그재그 대응을 위해 래퍼 생성 */}
      <div
        className="insight-grid-wrapper"
        style={{ display: "flex", flexDirection: "column", gap: "80px" }}
      >
        {insightData.map((item, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={item.id}
              onClick={() => navigate(`/insight/${item.id}`)}
              style={{
                width: "100%",
                cursor: "pointer",
                // PC에서 지그재그 느낌을 내고 싶다면 아래 스타일 시트를 참고하거나
                // 인라인에서는 margin으로 조절
                alignSelf: isEven ? "flex-end" : "flex-start",
              }}
            >
              {/* 이미지: 원본 비율 유지 (h-auto) */}
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                  marginBottom: "25px",
                }}
              >
                <img
                  src={item.image}
                  alt="insight"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              {/* 텍스트 정보 */}
              <div style={{ padding: "0 10px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "900",
                      color: "#0055ff",
                      letterSpacing: "2px",
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    style={{
                      width: "1px",
                      height: "10px",
                      backgroundColor: "#ddd",
                    }}
                  ></span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#aaa",
                      fontFamily: "monospace",
                    }}
                  >
                    {item.issueNo}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    marginBottom: "15px",
                    color: "#222",
                    lineHeight: "1.2",
                  }}
                >
                  {item.title[lang as keyof typeof item.title]}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                    wordBreak: "keep-all",
                  }}
                >
                  {item.description[lang as keyof typeof item.description]}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#bbb",
                    letterSpacing: "1px",
                  }}
                >
                  READ STORY —
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. LOG (기록) 섹션 - 지워졌던 리스트 복구 */}
      <div
        style={{
          marginTop: "120px",
          borderTop: "1px solid #eee",
          paddingTop: "60px",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "#bbb",
            letterSpacing: "3px",
            marginBottom: "40px",
          }}
        >
          LOG
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 10px",
                borderBottom: "1px solid #f5f5f5",
                cursor: "pointer",
              }}
            >
              <span
                style={{ fontSize: "15px", color: "#444", fontWeight: "300" }}
              >
                아카이빙의 순간 No.{i} (작업 노트 발췌)
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#ccc",
                  fontFamily: "monospace",
                }}
              >
                2026.03.12
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
