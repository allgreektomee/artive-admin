// import React from "react";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hook/useResponsive";
import ViewMoreButton from "../home/ViewMoreButton";

export const insightData = [
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

  // 1. 카테고리 리스트 (이 순서대로 화면에 나옵니다)
  const categories = ["EXHIBITION", "MANIFESTO", "ARTIST"];

  return (
    <section
      style={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "1100px",
        margin: "150px auto 0 auto",
        padding: isMobile ? "0 20px" : "0",
        boxSizing: "border-box",
      }}
    >
      {/* 섹션 전체 헤더 */}
      <div style={{ marginBottom: "80px" }}>
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

      {categories.map((cat) => {
        // 2. 각 카테고리별로 데이터 필터링 (메인 1 + 서브 2)
        const categoryData = insightData.filter(
          (item) => item.category === cat,
        );
        const mainItem = categoryData[0];
        const subItems = categoryData.slice(1, 3);

        if (!mainItem) return null; // 데이터가 없으면 패스

        return (
          <div key={cat} style={{ marginBottom: "120px" }}>
            {/* 카테고리 소제목 (선택사항) */}
            <div
              style={{
                marginBottom: "30px",
                borderBottom: "1px solid #eee",
                pb: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 900,
                  color: "#0055ff",
                  letterSpacing: "2px",
                }}
              >
                {cat}
              </span>
            </div>

            {/* 메인 콘텐츠 (크게) */}
            <div
              onClick={() => navigate(`/insight/${mainItem.id}`)}
              style={{ marginBottom: "40px", cursor: "pointer" }}
            >
              <img
                src={mainItem.image}
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
                alt="main"
              />
              <h3
                style={{
                  fontSize: isMobile ? "22px" : "28px",
                  fontWeight: 700,
                  marginBottom: "15px",
                }}
              >
                {mainItem.title[lang as keyof typeof mainItem.title]}
              </h3>
              <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.7 }}>
                {
                  mainItem.description[
                    lang as keyof typeof mainItem.description
                  ]
                }
              </p>
            </div>

            {/* 서브 콘텐츠 2개 (가로 나열) */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "30px",
              }}
            >
              {subItems.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => navigate(`/insight/${sub.id}`)}
                  style={{ flex: 1, cursor: "pointer" }}
                >
                  <img
                    src={sub.image}
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      marginBottom: "15px",
                    }}
                    alt="sub"
                  />
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    {sub.title[lang as keyof typeof sub.title]}
                  </h4>
                  <p
                    style={{ fontSize: "13px", color: "#888", lineHeight: 1.6 }}
                  >
                    {sub.description[
                      lang as keyof typeof sub.description
                    ].slice(0, 80)}
                    ...
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <ViewMoreButton
        label="VIEW MORE INSIGHTS"
        onClick={() => navigate("/art/insights")}
      />
    </section>
  );
};

export default InsightSection;
