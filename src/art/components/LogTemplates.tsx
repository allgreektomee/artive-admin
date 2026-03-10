import React from "react";

interface LogProps {
  data: {
    tag: string;
    title: string;
    desc: string;
    imgUrl?: string;
    imgUrl2?: string;
  };
  isMobile: boolean;
}

const TagLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontSize: "10px",
      color: "#bbb",
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      display: "block",
      marginBottom: "10px", // 15px -> 10px 단축
    }}
  >
    [{children}]
  </span>
);

/**
 * Type A: Full Image
 */
export const TypeA = ({ data }: LogProps) => (
  <div style={{ width: "100%", marginBottom: "40px" }}>
    {" "}
    {/* 100px -> 40px 단축 */}
    <div style={{ padding: "0 20px" }}>
      <TagLabel>{data.tag}</TagLabel>
    </div>
    <img
      src={data.imgUrl}
      style={{ width: "100%", display: "block", marginBottom: "20px" }}
      alt="A"
    />
    <div style={{ padding: "0 20px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 500, margin: "0 0 8px 0" }}>
        {data.title}
      </h3>
      <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}>
        {data.desc}
      </p>
    </div>
  </div>
);

/**
 * Type B: Split View
 */
export const TypeB = ({ data, isMobile }: LogProps) => (
  <div
    style={{
      width: "100%",
      marginBottom: "40px", // 100px -> 40px 단축
      padding: "0 20px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "15px" : "30px",
    }}
  >
    <div style={{ flex: 4 }}>
      <TagLabel>{data.tag}</TagLabel>
      <img
        src={data.imgUrl}
        style={{ width: "100%", display: "block" }}
        alt="B"
      />
    </div>
    <div
      style={{
        flex: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {!isMobile && <TagLabel>{data.tag}</TagLabel>}
      <h3
        style={{
          fontSize: "17px",
          fontWeight: 500,
          marginTop: isMobile ? "10px" : 0,
        }}
      >
        {data.title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#555",
          lineHeight: 1.6,
          marginTop: "6px",
        }}
      >
        {data.desc}
      </p>
    </div>
  </div>
);

/**
 * Type C: Image Focus (변형됨)
 */
export const TypeC = ({ data }: LogProps) => (
  <div
    style={{
      width: "100%",
      marginBottom: "40px", // 100px -> 40px 단축
      padding: "0 20px",
      boxSizing: "border-box",
    }}
  >
    <TagLabel>{data.tag}</TagLabel>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        marginBottom: "15px",
      }}
    >
      <img src={data.imgUrl} style={{ width: "100%" }} alt="C1" />
      {data.imgUrl2 && (
        <img src={data.imgUrl2} style={{ width: "100%" }} alt="C2" />
      )}
    </div>
    <h3 style={{ fontSize: "18px", fontWeight: 500 }}>{data.title}</h3>
    <p
      style={{
        fontSize: "14px",
        color: "#555",
        lineHeight: 1.6,
        marginTop: "8px",
      }}
    >
      {data.desc}
    </p>
  </div>
);

/**
 * Type D: Quote Focus
 */
export const TypeD = ({ data, isMobile }: LogProps) => (
  <div
    style={{
      width: "100%",
      margin: "20px 0 60px 0", // 상하 여백을 조절하여 섹션 내 변화를 줌
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      padding: isMobile ? "80px 30px" : "100px 60px",
      boxSizing: "border-box",
      borderTop: "1px solid #eee",
      borderBottom: "1px solid #eee",
    }}
  >
    <TagLabel>{data.tag}</TagLabel>
    <span
      style={{
        fontSize: "30px",
        color: "#ddd",
        fontFamily: "serif",
        display: "block",
        marginBottom: "5px",
      }}
    >
      "
    </span>
    <h2
      style={{
        fontSize: isMobile ? "1.1rem" : "1.3rem",
        fontWeight: 400,
        lineHeight: 1.7,
        color: "#333",
        margin: "0 auto",
        wordBreak: "keep-all",
        maxWidth: "500px",
      }}
    >
      {data.title}
    </h2>
    <p
      style={{
        fontSize: "11px",
        color: "#999",
        marginTop: "30px",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      — {data.desc}
    </p>
  </div>
);
