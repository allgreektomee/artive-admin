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
      marginBottom: "15px",
    }}
  >
    [{children}]
  </span>
);

export const TypeA = ({ data }: LogProps) => (
  <div style={{ width: "100%", marginBottom: "100px" }}>
    <div style={{ padding: "0 20px" }}>
      <TagLabel>{data.tag}</TagLabel>
    </div>
    <img
      src={data.imgUrl}
      style={{ width: "100%", display: "block", marginBottom: "25px" }}
      alt="A"
    />
    <div style={{ padding: "0 20px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: 500, margin: "0 0 10px 0" }}>
        {data.title}
      </h3>
      <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7 }}>
        {data.desc}
      </p>
    </div>
  </div>
);

export const TypeB = ({ data, isMobile }: LogProps) => (
  <div
    style={{
      width: "100%",
      marginBottom: "100px",
      padding: "0 20px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "30px",
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
          fontSize: "18px",
          fontWeight: 500,
          marginTop: isMobile ? "15px" : 0,
        }}
      >
        {data.title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#555",
          lineHeight: 1.7,
          marginTop: "10px",
        }}
      >
        {data.desc}
      </p>
    </div>
  </div>
);

export const TypeC = ({ data }: LogProps) => (
  <div
    style={{
      width: "100%",
      marginBottom: "100px",
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
        marginBottom: "25px",
      }}
    >
      <img src={data.imgUrl} style={{ width: "100%" }} alt="C1" />
      {data.imgUrl2 && (
        <img src={data.imgUrl2} style={{ width: "100%" }} alt="C2" />
      )}
    </div>
    <h3 style={{ fontSize: "19px", fontWeight: 500 }}>{data.title}</h3>
    <p
      style={{
        fontSize: "14px",
        color: "#555",
        lineHeight: 1.7,
        marginTop: "10px",
      }}
    >
      {data.desc}
    </p>
  </div>
);

export const TypeD = ({ data, isMobile }: LogProps) => (
  <div
    style={{
      width: "100%",
      marginBottom: "100px",
      textAlign: "center",
      backgroundColor: "#f8f8f8",
      padding: isMobile ? "80px 25px" : "120px 60px",
      boxSizing: "border-box",
    }}
  >
    <TagLabel>{data.tag}</TagLabel>
    <h2
      style={{
        fontSize: isMobile ? "1.2rem" : "1.5rem",
        fontWeight: 300,
        lineHeight: 1.8,
        wordBreak: "keep-all",
      }}
    >
      "{data.title}"
    </h2>
    <p style={{ fontSize: "13px", color: "#888", marginTop: "30px" }}>
      {data.desc}
    </p>
  </div>
);
