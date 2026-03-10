// import React from "react";

/**
 * [LOG & INSIGHT 전용 컴포넌트]
 * 네이트의 효율적인 구조 + 매거진 B의 미니멀한 감성
 */

// 1. [LOG] 상단 2분할 그리드 카드 (Process, Space 등)
export const FixedGridSection = ({
  items,
}: {
  items: any[];
  isMobile?: boolean;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      padding: "0 20px",
      marginBottom: "25px",
    }}
  >
    {items.map((item, idx) => (
      <div key={idx} style={{ cursor: "pointer" }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 11",
            overflow: "hidden",
            backgroundColor: "#f7f7f7",
            marginBottom: "10px",
          }}
        >
          <img
            src={item.imgUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt={item.title}
          />
        </div>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: 1.4,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            letterSpacing: "-0.3px",
          }}
        >
          {item.title}
        </h3>
      </div>
    ))}
  </div>
);

// 2. [LOG] 하단 텍스트 리스트 (5개 제한)
export const TextListSection = ({ items }: { items: any[] }) => (
  <div style={{ padding: "0 20px", marginBottom: "50px" }}>
    {items.slice(0, 5).map((item, idx) => (
      <div
        key={idx}
        style={{
          padding: "15px 0",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#333",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            paddingRight: "20px",
          }}
        >
          {item.title}
        </p>
        <span style={{ fontSize: "12px", color: "#ddd", fontWeight: 300 }}>
          {"→"}
        </span>
      </div>
    ))}
  </div>
);

// 3. [INSIGHT] 2구 그리드 - 매거진 B 감성 (4:5 비율)
export const InsightGrid = ({ items }: { items: any[] }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
      padding: "0 20px",
      marginBottom: "30px",
    }}
  >
    {items.map((item: any, idx: number) => (
      <div key={idx} style={{ cursor: "pointer" }}>
        <div
          style={{
            aspectRatio: "4/5",
            overflow: "hidden",
            backgroundColor: "#f4f4f4",
            marginBottom: "10px",
          }}
        >
          <img
            src={item.imgUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt={item.title}
          />
        </div>
        <span
          style={{
            fontSize: "9px",
            color: "#999",
            letterSpacing: "1px",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "4px",
          }}
        >
          {item.tag}
        </span>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.4,
            color: "#222",
            margin: 0,
          }}
        >
          {item.title}
        </h4>
      </div>
    ))}
  </div>
);

// 4. [INSIGHT] 텍스트 리스트 - 도록 스타일
export const InsightTextList = ({ items }: { items: any[] }) => (
  <div style={{ padding: "0 20px", marginBottom: "80px" }}>
    {items.slice(0, 5).map((item: any, idx: number) => (
      <div
        key={idx}
        style={{
          padding: "14px 0",
          borderBottom: "0.5px solid #eee",
          display: "flex",
          alignItems: "baseline",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            color: "#ccc",
            marginRight: "12px",
            fontFamily: "serif",
            fontStyle: "italic",
          }}
        >
          0{idx + 1}
        </span>
        <p
          style={{
            fontSize: "14px",
            color: "#444",
            margin: 0,
            flex: 1,
            letterSpacing: "-0.3px",
            lineHeight: 1.4,
          }}
        >
          {item.title}
        </p>
      </div>
    ))}
  </div>
);

/** [INSIGHT 전용] 매거진 B 스타일 빅 카드 */
export const InsightBigCard = ({ item }: { item: any }) => (
  <div style={{ padding: "0 20px", marginBottom: "60px" }}>
    {/* 1. 메인 이미지 */}
    <div
      style={{
        width: "100%",
        aspectRatio: "3 / 2",
        overflow: "hidden",
        marginBottom: "20px",
      }}
    >
      <img
        src={item.imgUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt={item.title}
      />
    </div>

    {/* 2. 카테고리 & 넘버링 */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        {item.tag}
      </span>
      <span style={{ fontSize: "11px", color: "#888" }}>{item.subTag}</span>
    </div>

    {/* 3. 메인 타이틀 */}
    <h2
      style={{
        fontSize: "24px",
        fontWeight: 600,
        margin: "0 0 15px 0",
        letterSpacing: "-0.5px",
      }}
    >
      {item.title}
    </h2>

    {/* 4. 본문 요약 (매거진 B 스타일) */}
    <p
      style={{
        fontSize: "14px",
        color: "#444",
        lineHeight: "1.7",
        margin: 0,
        textAlign: "justify", // 양쪽 정렬로 잡지 느낌 극대화
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {item.desc}
    </p>
  </div>
);
