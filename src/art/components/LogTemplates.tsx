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

// 공통 태그 스타일
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontSize: "9px",
      color: "#aaa",
      letterSpacing: "1.5px",
      marginBottom: "8px",
      display: "block",
    }}
  >
    {children}
  </span>
);

/** Type A: 왼쪽 이미지 + 오른쪽 텍스트 */
export const TypeA = ({ data }: LogProps) => (
  <div
    style={{
      display: "flex",
      gap: "20px",
      padding: "0 20px",
      marginBottom: "50px",
      alignItems: "center",
    }}
  >
    <div style={{ flex: "0 0 110px", height: "110px", overflow: "hidden" }}>
      <img
        src={data.imgUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt="A"
      />
    </div>
    <div style={{ flex: 1 }}>
      <Tag>{data.tag}</Tag>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          margin: "0 0 5px 0",
          lineHeight: 1.4,
        }}
      >
        {data.title}
      </h3>
      <p
        style={{ fontSize: "12px", color: "#777", margin: 0, lineHeight: 1.5 }}
      >
        {data.desc}
      </p>
    </div>
  </div>
);

/** Type B: 왼쪽 텍스트 + 오른쪽 이미지 */
export const TypeB = ({ data }: LogProps) => (
  <div
    style={{
      display: "flex",
      gap: "20px",
      padding: "0 20px",
      marginBottom: "50px",
      alignItems: "center",
    }}
  >
    <div style={{ flex: 1 }}>
      <Tag>{data.tag}</Tag>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          margin: "0 0 5px 0",
          lineHeight: 1.4,
        }}
      >
        {data.title}
      </h3>
      <p
        style={{ fontSize: "12px", color: "#777", margin: 0, lineHeight: 1.5 }}
      >
        {data.desc}
      </p>
    </div>
    <div style={{ flex: "0 0 110px", height: "110px", overflow: "hidden" }}>
      <img
        src={data.imgUrl}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt="B"
      />
    </div>
  </div>
);

/** Type C: 이미지 하단 오버랩 (카드형) */
export const TypeC = ({ data }: LogProps) => (
  <div
    style={{ padding: "0 20px", marginBottom: "50px", position: "relative" }}
  >
    <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
      <img
        src={data.imgUrl}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.9,
        }}
        alt="C"
      />
    </div>
    <div
      style={{
        marginTop: "-30px",
        marginLeft: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        borderLeft: "2px solid #333",
        boxShadow: "10px 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <Tag>{data.tag}</Tag>
      <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>
        {data.title}
      </h3>
    </div>
  </div>
);

/** Type D: 미니멀 박스형 (텍스트만 있을 때도 버튼처럼 보이게) */
export const TypeD = ({ data }: LogProps) => (
  <div style={{ padding: "0 20px", marginBottom: "50px" }}>
    <div
      style={{
        padding: "30px",
        border: "1px solid #eee",
        textAlign: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <Tag>{data.tag}</Tag>
      <h3
        style={{
          fontSize: "17px",
          fontWeight: 500,
          margin: "10px 0",
          wordBreak: "keep-all",
        }}
      >
        {data.title}
      </h3>
      <div
        style={{
          width: "20px",
          height: "1px",
          backgroundColor: "#ccc",
          margin: "15px auto",
        }}
      ></div>
      <p style={{ fontSize: "12px", color: "#999", letterSpacing: "1px" }}>
        READ ARCHIVE —
      </p>
    </div>
  </div>
);
