// import React from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive"; // 경로 확인 필요

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
  const { isMobile } = useResponsive();

  return (
    <section
      style={{
        marginTop: isMobile ? "80px" : "150px",
        width: "100%",
        // 💡 PC에서는 패드 너비로 제한, 모바일은 꽉 차게
        maxWidth: isMobile ? "100%" : "1100px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: isMobile ? "0 20px" : "0 40px",
        boxSizing: "border-box",
      }}
    >
      {/* --- INSIGHT 헤더 --- */}
      <div
        style={{ marginBottom: isMobile ? "40px" : "80px", textAlign: "left" }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            letterSpacing: "4px",
            marginBottom: "8px",
          }}
        >
          INSIGHT
        </p>
        <p
          style={{
            fontSize: isMobile ? "20px" : "26px",
            color: "#333",
            fontWeight: 300,
          }}
        >
          시선
        </p>
      </div>

      {/* --- 매거진 리스트 (지그재그/1열) --- */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "80px" : "160px",
        }}
      >
        {insightData.map((item, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={item.id}
              onClick={() => navigate(`/insight/${item.id}`)}
              style={{
                width: "100%",
                // 💡 PC에서 카드가 너무 퍼지지 않게 하고 지그재그 배치
                maxWidth: isMobile ? "100%" : "800px",
                alignSelf: !isMobile && isEven ? "flex-end" : "flex-start",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                  marginBottom: "30px",
                }}
              >
                <img
                  src={item.image}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  alt="insight"
                />
              </div>

              <div style={{ padding: "0 5px" }}>
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
                      fontWeight: 900,
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
                    fontSize: isMobile ? "24px" : "30px",
                    fontWeight: 700,
                    marginBottom: "20px",
                    lineHeight: 1.25,
                  }}
                >
                  {item.title[lang as keyof typeof item.title]}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#666",
                    lineHeight: 1.7,
                    marginBottom: "25px",
                    wordBreak: "keep-all",
                  }}
                >
                  {item.description[lang as keyof typeof item.description]}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#bbb",
                    letterSpacing: "2px",
                  }}
                >
                  VIEW STORY —
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- LOG 섹션 --- */}
      <div
        style={{
          marginTop: isMobile ? "120px" : "200px",
          borderTop: "1px solid #eee",
          paddingTop: "80px",
          paddingBottom: "120px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            letterSpacing: "4px",
            marginBottom: "50px",
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
                padding: "25px 10px",
                borderBottom: "1px solid #f8f8f8",
                cursor: "pointer",
              }}
            >
              <span
                style={{ fontSize: "16px", color: "#444", fontWeight: 300 }}
              >
                아카이빙의 순간 No.{i}
              </span>
              <span
                style={{
                  fontSize: "12px",
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
