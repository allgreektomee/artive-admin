/**
 * [PRESENTATION LAYER] View (Page Component)
 * 역할: 사용자에게 실제로 보이는 화면을 렌더링합니다.
 * 특징: 로직은 ViewModel(Hook)에게 맡기고, 전달받은 Base 데이터를 시각적으로 표현하는 데 집중합니다.
 */

import React from "react";
import { useBaseVM } from "../hooks/useBaseVM";

const ArtHomeNew: React.FC = () => {
  const { data, loading } = useBaseVM();

  if (loading) return <div>Loading Archive...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Archive Base List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            style={{ border: "1px solid #eee", padding: "10px" }}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{ width: "100%" }}
            />
            <h3>{item.title}</h3>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtHomeNew;
