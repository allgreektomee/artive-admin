import React from "react";

interface LogProps {
  data: {
    tag: string;
    title: string;
    desc: string;
    imgUrl?: string;
  };
  isMobile: boolean;
}

// 공통 태그 스타일 (매거진 B 스타일의 미니멀함)
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontSize: "9px",
      color: "#aaa",
      letterSpacing: "1.5px",
      marginBottom: "8px",
      display: "block",
      textTransform: "uppercase",
    }}
  >
    {children}
  </span>
);

/** * [LOG 섹션용]
 * FixedGridSection & TextListSection
 * 네이트온의 자동차 섹션 구조를 계승
 */

export const FixedGridSection = ({
  items,
}: {
  items: any[];
  isMobile: boolean;
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

/** * [INSIGHT 섹션용]
 * InsightGrid & InsightTextList
 * 매거진 B의 미니멀한 감성 강조
 */

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
