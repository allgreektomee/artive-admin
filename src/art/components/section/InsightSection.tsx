// import React from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";

const insightData = [
  {
    id: "exhibition-1",
    category: "EXHIBITION",
    issueNo: "MAR 2026", // 전시 월 또는 시즌
    title: {
      ko: "첫 번째 오프라인 전시: 색의 흔적",
      en: "First Offline Exhibition: Traces of Color",
    },
    description: {
      ko: "온라인을 넘어 실물로 마주하는 색의 깊이. 3월 20일부터 성수동 아티브 갤러리에서 첫 번째 기록을 시작합니다.",
      en: "The depth of color encountered beyond online. Starting our first record at Artive Gallery, Seongsu-dong from March 20th.",
    },
    image:
      "https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=1000", // 전시 포스터나 메인 작품 이미지
  },
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
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  return (
    <section
      style={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px", // 💡 전체 통일 여백값
        margin: "150px auto 0 auto",
        padding: isMobile ? "0 20px" : "0",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: "80px", textAlign: "left" }}>
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
        <p style={{ fontSize: "26px", color: "#333", fontWeight: 300 }}>시선</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "80px" : "180px",
          width: "100%",
        }}
      >
        {insightData.map((item, index) => {
          const isRight = index % 2 === 1; // 짝수번째는 우측 정렬
          return (
            <div
              key={item.id}
              style={{
                width: "100%",
                display: "flex",
                justifyContent:
                  isRight && !isMobile ? "flex-end" : "flex-start", // 💡 PC에서 우측 끝으로 밀기
              }}
            >
              <div
                onClick={() => navigate(`/insight/${item.id}`)}
                style={{
                  width: isMobile ? "100%" : "750px", // 💡 카드의 고정 너비 (라인을 맞추기 위함)
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
                      fontSize: "28px",
                      fontWeight: 700,
                      marginBottom: "20px",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title[lang as keyof typeof item.title]}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InsightSection;
