import { useCallback, useState } from "react";

/**
 * @typedef {Object} LiveExampleEntry
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {import("react").ComponentType} Component
 */

const LiveBasicApp = () => (
  <div
    style={{
      padding: "1rem",
      borderRadius: 8,
      background: "linear-gradient(135deg, #eef2ff 0%, #fae8ff 100%)",
      border: "1px solid #e4e4e7",
    }}
  >
    <strong style={{ fontSize: 15, color: "#3f3f46" }}>첫 React 컴포넌트</strong>
    <p style={{ margin: "8px 0 0", color: "#52525b", fontSize: 14 }}>
      이 박스는 등록된 예제 컴포넌트로 렌더링된 결과입니다.
    </p>
  </div>
);

const LiveJsxGreeting = () => (
  <div
    style={{
      padding: "1rem",
      borderRadius: 8,
      border: "1px solid #e4e4e7",
      background: "#fff",
    }}
  >
    <h3 style={{ margin: 0, fontSize: 17, color: "#18181b" }}>Artive 관리</h3>
    <p style={{ margin: "8px 0 0", color: "#71717a", fontSize: 14, lineHeight: 1.5 }}>
      JSX로 제목과 문단을 한 함수 컴포넌트에서 함께 반환합니다. HTML처럼 보이지만 JavaScript
      표현식은 <code style={{ fontSize: 13 }}>{"{ }"}</code> 안에 둘 수 있습니다.{" "}
      <strong>{new Date().getFullYear()}</strong>년 예시
    </p>
  </div>
);

function ArtworkCard({ title, artist, imageUrl, isPublic }) {
  return (
    <div
      style={{
        maxWidth: 280,
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #e4e4e7",
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          height: 120,
          background: `url(${imageUrl}) center/cover`,
          backgroundColor: "#e4e4e7",
        }}
        role="img"
        aria-label={title}
      />
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#18181b" }}>{title}</div>
        <div style={{ fontSize: 13, color: "#71717a", marginTop: 4 }}>{artist}</div>
        <span
          style={{
            display: "inline-block",
            marginTop: 10,
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 8px",
            borderRadius: 999,
            background: isPublic ? "#dcfce7" : "#fee2e2",
            color: isPublic ? "#166534" : "#991b1b",
          }}
        >
          {isPublic ? "공개" : "비공개"}
        </span>
      </div>
    </div>
  );
}

const LivePropsArtworkCard = () => (
  <ArtworkCard
    title="바다 위의 오후"
    artist="홍길동"
    imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=60&auto=format&fit=crop"
    isPublic
  />
);

const LiveEventDemo = () => {
  const [query, setQuery] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
        <span style={{ fontWeight: 600, color: "#3f3f46" }}>검색</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목 검색"
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #d4d4d8",
            fontSize: 14,
          }}
        />
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        공개 작품만
      </label>
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          background: "#fafafa",
          border: "1px solid #e4e4e7",
          fontSize: 13,
          color: "#52525b",
        }}
      >
        <div>
          검색어: <code>{query || "(비어 있음)"}</code>
        </div>
        <div style={{ marginTop: 6 }}>
          필터: <code>{isPublic ? "공개" : "전체"}</code>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setIsPublic(true);
        }}
        style={{
          alignSelf: "flex-start",
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid #d4d4d8",
          background: "#fff",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        초기화
      </button>
    </div>
  );
};

const LiveStateCounter = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        padding: "12px 14px",
        borderRadius: 10,
        background: "#f4f4f5",
        border: "1px solid #e4e4e7",
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 600, color: "#18181b", minWidth: 48 }}>
        {count}
      </span>
      <button
        type="button"
        onClick={decrement}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #d4d4d8",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        −
      </button>
      <button
        type="button"
        onClick={increment}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #d4d4d8",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        +
      </button>
    </div>
  );
};

/** @type {LiveExampleEntry[]} */
const ENTRIES = [
  {
    id: "react.component.basic",
    title: "기본 컴포넌트",
    description: "함수 컴포넌트가 JSX를 반환해 화면에 그리는 최소 예제입니다.",
    Component: LiveBasicApp,
  },
  {
    id: "react.jsx.greeting",
    title: "JSX로 제목·문단 묶기",
    description: "하나의 컴포넌트가 여러 JSX 노드를 트리로 반환하는 형태입니다.",
    Component: LiveJsxGreeting,
  },
  {
    id: "react.props.artworkCard",
    title: "props로 ArtworkCard",
    description: "부모가 title, artist, imageUrl, isPublic을 내려줍니다.",
    Component: LivePropsArtworkCard,
  },
  {
    id: "react.event.click",
    title: "이벤트: 입력·체크박스·버튼",
    description: "onChange, onClick으로 로컬 상태를 갱신합니다.",
    Component: LiveEventDemo,
  },
  {
    id: "react.state.counter",
    title: "useState 카운터",
    description: "setState 호출 후 화면이 다시 그려지는 흐름을 확인합니다.",
    Component: LiveStateCounter,
  },
];

const byId = new Map(ENTRIES.map((e) => [e.id, e]));

/**
 * @param {string} id
 * @returns {LiveExampleEntry | null}
 */
export function getLiveExampleEntry(id) {
  return byId.get(id) ?? null;
}
