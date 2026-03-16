// import React from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";
import ViewMoreButton from "../home/ViewMoreButton";

const insightData = [
  // --- 1. EXHIBITION (전시) ---
  {
    id: "exh-1",
    category: "EXHIBITION",
    issueNo: "MAR 2026",
    title: {
      ko: "색의 흔적: 첫 번째 기록",
      en: "Traces of Color: The First Record",
    },
    description: {
      ko: "온라인을 넘어 실물로 마주하는 색의 깊이. 성수동 아티브 갤러리에서 시작되는 첫 번째 오프라인 전시를 만나보세요.",
      en: "Experience the depth of color beyond the screen. Join us for our first offline exhibition in Seongsu-dong.",
    },
    image:
      "https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=1000",
  },
  {
    id: "exh-2",
    category: "EXHIBITION",
    issueNo: "UPCOMING",
    title: {
      ko: "빛의 파편: 미디어 아트 예고",
      en: "Fragments of Light: Media Art Preview",
    },
    description: {
      ko: "디지털과 아날로그의 경계에서 탄생한 새로운 시각적 경험. 아티브의 두 번째 프로젝트를 미리 공개합니다.",
      en: "A new visual experience born at the boundary of digital and analog. A preview of Artive's second project.",
    },
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000",
  },
  {
    id: "exh-3",
    category: "EXHIBITION",
    issueNo: "ARCHIVE",
    title: {
      ko: "디지털 캔버스: 온라인 기획전",
      en: "Digital Canvas: Online Exhibition",
    },
    description: {
      ko: "전 세계 아티스트들과 함께한 아티브의 시작점. 초기 기획 전시의 기록을 다시 살펴봅니다.",
      en: "The starting point of Artive with artists worldwide. Revisiting the records of our initial exhibitions.",
    },
    image:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1000",
  },

  // --- 2. MANIFESTO (철학) ---
  {
    id: "man-1",
    category: "MANIFESTO",
    issueNo: "VOL.01",
    title: {
      ko: "우리가 붓터치에 집착하는 이유",
      en: "Why We Are Obsessed with Brushstrokes",
    },
    description: {
      ko: "매끈한 디지털 이미지보다 거친 물성의 흔적을 쫓는 아티브의 아카이빙 철학에 대하여.",
      en: "About Artive's philosophy of chasing raw textures over sleek digital images.",
    },
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000",
  },
  {
    id: "man-2",
    category: "MANIFESTO",
    issueNo: "VOL.02",
    title: {
      ko: "아카이빙: 예술을 기억하는 방식",
      en: "Archiving: A Way to Remember Art",
    },
    description: {
      ko: "작품은 완성되는 순간부터 변하기 시작합니다. 그 변화의 과정을 기록하는 것의 가치를 이야기합니다.",
      en: "Art begins to change from the moment it is finished. We discuss the value of recording that process.",
    },
    image:
      "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=1000",
  },
  {
    id: "man-3",
    category: "MANIFESTO",
    issueNo: "VOL.03",
    title: {
      ko: "수집가의 시선: 무엇을 남길 것인가",
      en: "Collector's Eye: What to Leave Behind",
    },
    description: {
      ko: "수많은 예술 속에서 아티브만의 기준을 세우는 법. 우리가 '흔적'이라 부르는 것들에 대하여.",
      en: "How to set Artive's standards amidst countless art. About what we call 'traces'.",
    },
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000",
  },

  // --- 3. ARTIST (작가) ---
  {
    id: "art-1",
    category: "ARTIST",
    issueNo: "NO.05",
    title: {
      ko: "박재영: 쿨 차콜의 고요함",
      en: "Jae Young Park: Silence of Cool Charcoal",
    },
    description: {
      ko: "현대인의 고독을 짙은 회색조의 레이어로 풀어내는 작가 박재영의 작업실을 방문했습니다.",
      en: "Visiting the studio of artist Jae Young Park, who unravels modern solitude through dark grey layers.",
    },
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000",
  },
  {
    id: "art-2",
    category: "ARTIST",
    issueNo: "NO.06",
    title: {
      ko: "이수진: 빛을 낚는 화가",
      en: "Su Jin Lee: The Painter Who Fishes for Light",
    },
    description: {
      ko: "캔버스 위에 겹겹이 쌓아 올린 투명한 색채들. 빛의 산란을 그리는 이수진 작가의 인터뷰.",
      en: "Transparent colors layered on canvas. An interview with artist Su Jin Lee who paints light scattering.",
    },
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000",
  },
  {
    id: "art-3",
    category: "ARTIST",
    issueNo: "NO.07",
    title: {
      ko: "김민우: 질감의 언어",
      en: "Min Woo Kim: The Language of Texture",
    },
    description: {
      ko: "만지고 싶은 회화. 나이프로 깎아낸 물감의 조각들이 전하는 침묵의 메시지를 들어봅니다.",
      en: "Paintings you want to touch. Listening to the silent messages conveyed by carved pieces of paint.",
    },
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000",
  },
];

const InsightSection = ({ lang = "ko" }: { lang?: "ko" | "en" }) => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const categories = ["EXHIBITION", "MANIFESTO", "ARTIST"];

  return (
    <section
      style={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px",
        margin: " 0 auto",
        padding: isMobile ? "0 20px" : "0",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            letterSpacing: "4px",
            marginBottom: "8px",
            fontWeight: 900,
          }}
        >
          INSIGHT
        </p>
      </div>

      {categories.map((cat, index) => {
        const categoryData = insightData.filter(
          (item) => item.category === cat,
        );
        const mainItem = categoryData[0];
        const subItems = categoryData.slice(1, 3);
        const isEven = index % 2 === 1;

        if (!mainItem) return null;

        return (
          <div key={cat} style={{ marginBottom: isMobile ? "100px" : "180px" }}>
            {/* 1. 메인 인사이트 (초기 디자인 복구 + 이슈 번호) */}
            <div
              onClick={() => navigate(`/insight/${mainItem.id}`)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile
                  ? "flex-start"
                  : isEven
                    ? "flex-end"
                    : "flex-start",
                cursor: "pointer",
                textAlign: isMobile ? "left" : isEven ? "right" : "left",
              }}
            >
              <div
                style={{
                  width: isMobile ? "100%" : "85%",
                  backgroundColor: "#f9f9f9",
                  marginBottom: "30px",
                }}
              >
                <img
                  src={mainItem.image}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  alt="main"
                />
              </div>
              {/* 카테고리 + 이슈번호 조합 */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "baseline",
                  marginBottom: "25px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 900,
                    color: "#0055ff",
                    letterSpacing: "3px",
                  }}
                >
                  {mainItem.category}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#bbb",
                    letterSpacing: "1px",
                  }}
                >
                  {mainItem.issueNo}
                </span>
              </div>
              <div style={{ maxWidth: "650px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "24px" : "32px",
                    fontWeight: 700,
                    marginBottom: "15px",
                    lineHeight: 1.2,
                  }}
                >
                  {mainItem.title[lang as keyof typeof mainItem.title]}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    lineHeight: 1.8,
                    marginBottom: "45px",
                  }}
                >
                  {
                    mainItem.description[
                      lang as keyof typeof mainItem.description
                    ]
                  }
                </p>
              </div>
            </div>

            {/* 2. 서브 리스트 (선 굵기 연하게 + 디스크립션 한 줄) */}
            {subItems.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMobile
                    ? "flex-start"
                    : isEven
                      ? "flex-end"
                      : "flex-start",
                  width: "100%",
                }}
              >
                {subItems.map((sub, subIndex) => (
                  <div
                    key={sub.id}
                    onClick={() => navigate(`/insight/${sub.id}`)}
                    style={{
                      width: isMobile ? "100%" : "650px",
                      padding: "24px 0",
                      borderTop: "1px solid #eee", // 💡 훨씬 연하고 얇은 선으로 변경 (로그 섹션 느낌)
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#ccc",
                            fontWeight: 500,
                          }}
                        >
                          0{subIndex + 1}
                        </span>
                        <h4
                          style={{
                            fontSize: "17px",
                            fontWeight: 600,
                            color: "#222",
                          }}
                        >
                          {sub.title[lang as keyof typeof sub.title]}
                        </h4>
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#0055ff",
                          opacity: 0.7,
                        }}
                      >
                        →
                      </span>
                    </div>

                    {/* 💡 디스크립션 1줄 (말줄임표) */}
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#999",
                        paddingLeft: "26px", // 번호 너비만큼 들여쓰기
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {sub.description[lang as keyof typeof sub.description]}
                    </p>
                  </div>
                ))}
                <div
                  style={{
                    width: isMobile ? "100%" : "650px",
                    borderTop: "1px solid #eee",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <ViewMoreButton
        label="VIEW MORE INSIGHT"
        onClick={() => navigate("/art/insight")}
      />
    </section>
  );
};
export default InsightSection;
