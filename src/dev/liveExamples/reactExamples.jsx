import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

/**
 * @typedef {Object} LiveExampleEntry
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {string} [sourceCode]
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

const MOCK_ARTWORKS = [
  { id: "1", title: "바다 위의 오후", artist: "김민수" },
  { id: "2", title: "도시의 밤", artist: "이영희" },
  { id: "3", title: "산책", artist: "박철수" },
];

function ModuleSearchBar({ value, onChange, placeholder }) {
  return (
    <input
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        maxWidth: 280,
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid #d4d4d8",
        fontSize: 14,
        marginBottom: 12,
      }}
    />
  );
}

function ModuleEmptyState({ hasFilter }) {
  return (
    <p style={{ color: "#71717a", fontSize: 14, margin: 0 }}>
      {hasFilter ? "검색 결과가 없습니다." : "표시할 작품이 없습니다."}
    </p>
  );
}

function ModuleArtworkRow({ title, artist }) {
  return (
    <li
      style={{
        listStyle: "none",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #e4e4e7",
        marginBottom: 8,
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#71717a", marginTop: 4 }}>{artist}</div>
    </li>
  );
}

const LiveModularArtworkExplorer = () => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_ARTWORKS;
    return MOCK_ARTWORKS.filter(
      (a) =>
        a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <ModuleSearchBar value={query} onChange={setQuery} placeholder="제목·작가 검색" />
      {filtered.length === 0 ? (
        <ModuleEmptyState hasFilter={Boolean(query.trim())} />
      ) : (
        <ul style={{ margin: 0, padding: 0 }}>
          {filtered.map((item) => (
            <ModuleArtworkRow key={item.id} title={item.title} artist={item.artist} />
          ))}
        </ul>
      )}
    </div>
  );
};

const LiveEffectLifecycle = () => {
  const [items, setItems] = useState(null);
  const [loadVersion, setLoadVersion] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setItems(null);
    const timer = setTimeout(() => {
      if (!cancelled) {
        setItems([
          { id: "a", label: "첫 데이터" },
          { id: "b", label: "둘째 데이터" },
        ]);
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [loadVersion]);

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div style={{ fontSize: 13, color: "#3f3f46" }}>
      <button
        type="button"
        onClick={() => {
          setLoadVersion((v) => v + 1);
        }}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #d4d4d8",
          background: "#fff",
          cursor: "pointer",
          marginBottom: 10,
        }}
      >
        다시 불러오기 (마운트 유사)
      </button>
      <div style={{ marginBottom: 8 }}>
        경과 초: <strong>{seconds}</strong> — 훅 cleanup으로 언마운트 시 인터벌 정리
      </div>
      <div>
        목록:{" "}
        {items == null ? (
          <em>로딩 중…</em>
        ) : (
          <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
            {items.map((row) => (
              <li key={row.id}>{row.label}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

function counterReducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + 1 };
    case "dec":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

const LiveHooksShowcase = () => {
  const inputRef = useRef(null);
  const [bigNumbers] = useState(() =>
    Array.from({ length: 400 }, (_, i) => i + 1),
  );
  const [onlyMultipleOf, setOnlyMultipleOf] = useState(5);
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const filteredSum = useMemo(() => {
    const filtered = bigNumbers.filter((n) => n % onlyMultipleOf === 0);
    return filtered.reduce((a, b) => a + b, 0);
  }, [bigNumbers, onlyMultipleOf]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 13 }}>
      <div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>useRef — 포커스</div>
        <input
          ref={inputRef}
          type="text"
          placeholder="입력"
          style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #d4d4d8" }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          style={{ marginLeft: 8, padding: "6px 10px", borderRadius: 6, cursor: "pointer" }}
        >
          포커스
        </button>
      </div>
      <div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>useMemo — 배수 합</div>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          배수:
          <select
            value={onlyMultipleOf}
            onChange={(e) => setOnlyMultipleOf(Number(e.target.value))}
            style={{ padding: 4 }}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={7}>7</option>
          </select>
        </label>
        <div style={{ marginTop: 6, color: "#52525b" }}>
          1…400 중 배수의 합: <strong>{filteredSum}</strong>
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>useReducer — 카운터</div>
        <span style={{ marginRight: 12 }}>{state.count}</span>
        <button type="button" onClick={() => dispatch({ type: "dec" })}>
          −
        </button>
        <button type="button" onClick={() => dispatch({ type: "inc" })} style={{ marginLeft: 4 }}>
          +
        </button>
        <button type="button" onClick={() => dispatch({ type: "reset" })} style={{ marginLeft: 8 }}>
          reset
        </button>
      </div>
    </div>
  );
};

/** @type {LiveExampleEntry[]} */
const ENTRIES = [
  {
    id: "react.component.basic",
    title: "기본 컴포넌트",
    description: "함수 컴포넌트가 JSX를 반환해 화면에 그리는 최소 예제입니다.",
    sourceCode: `const LiveBasicApp = () => (
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
);`,
    Component: LiveBasicApp,
  },
  {
    id: "react.jsx.greeting",
    title: "JSX로 제목·문단 묶기",
    description: "하나의 컴포넌트가 여러 JSX 노드를 트리로 반환하는 형태입니다.",
    sourceCode: `const LiveJsxGreeting = () => (
  <div style={{ padding: "1rem", border: "1px solid #e4e4e7" }}>
    <h3 style={{ margin: 0 }}>Artive 관리</h3>
    <p style={{ marginTop: 8, color: "#71717a" }}>
      JSX와 중괄호 표현식: <strong>{new Date().getFullYear()}</strong>년
    </p>
  </div>
);`,
    Component: LiveJsxGreeting,
  },
  {
    id: "react.props.artworkCard",
    title: "props로 ArtworkCard",
    description: "부모가 title, artist, imageUrl, isPublic을 내려줍니다.",
    sourceCode: `function ArtworkCard({ title, artist, imageUrl, isPublic }) {
  return (
    <div>
      <div style={{ backgroundImage: \`url(\${imageUrl})\` }} />
      <h2>{title}</h2>
      <p>{artist}</p>
      {isPublic ? <span>공개</span> : <span>비공개</span>}
    </div>
  );
}

<ArtworkCard
  title="바다 위의 오후"
  artist="홍길동"
  imageUrl="https://..."
  isPublic
/>`,
    Component: LivePropsArtworkCard,
  },
  {
    id: "react.event.click",
    title: "이벤트: 입력·체크박스·버튼",
    description: "onChange, onClick으로 로컬 상태를 갱신합니다.",
    sourceCode: `const [query, setQuery] = useState("");
const [isPublic, setIsPublic] = useState(true);

<input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
<input
  type="checkbox"
  checked={isPublic}
  onChange={(e) => setIsPublic(e.target.checked)}
/>
<button type="button" onClick={() => { setQuery(""); setIsPublic(true); }}>
  초기화
</button>`,
    Component: LiveEventDemo,
  },
  {
    id: "react.state.counter",
    title: "useState 카운터",
    description: "setState 호출 후 화면이 다시 그려지는 흐름을 확인합니다.",
    sourceCode: `import { useCallback, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const inc = useCallback(() => setCount((c) => c + 1), []);
  const dec = useCallback(() => setCount((c) => c - 1), []);

  return (
    <>
      <span>{count}</span>
      <button type="button" onClick={dec}>−</button>
      <button type="button" onClick={inc}>+</button>
    </>
  );
}`,
    Component: LiveStateCounter,
  },
  {
    id: "react.module.artworkExplorer",
    title: "모듈처럼 나눈 목록 탐색",
    description: "SearchBar, List, Row, Empty를 파일 하나에 나눈 패턴(실무는 파일별 분리).",
    sourceCode: `function ModuleSearchBar({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function LiveModularArtworkExplorer() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() =>
    MOCK_ARTWORKS.filter((a) =>
      a.title.includes(query) || a.artist.includes(query)
    ), [query]);

  return (
    <>
      <ModuleSearchBar value={query} onChange={setQuery} />
      {filtered.length === 0
        ? <ModuleEmptyState />
        : <ul>{filtered.map((item) => <ModuleArtworkRow key={item.id} ... />)}</ul>}
    </>
  );
}`,
    Component: LiveModularArtworkExplorer,
  },
  {
    id: "react.effect.lifecycle",
    title: "useEffect: 로딩·인터벌·cleanup",
    description: "의존 배열로 재요청, cleanup으로 타이머·요청 취소를 시뮬레이션합니다.",
    sourceCode: `useEffect(() => {
  let cancelled = false;
  setItems(null);
  const t = setTimeout(() => {
    if (!cancelled) setItems([...]);
  }, 400);
  return () => { cancelled = true; clearTimeout(t); };
}, [loadVersion]);

useEffect(() => {
  const id = setInterval(() => setSeconds((s) => s + 1), 1000);
  return () => clearInterval(id);
}, []);`,
    Component: LiveEffectLifecycle,
  },
  {
    id: "react.hooks.showcase",
    title: "useRef · useMemo · useReducer",
    description: "8장에서 정리하는 훅을 한 화면에서 동작만 확인합니다.",
    sourceCode: `const inputRef = useRef(null);
<input ref={inputRef} />
<button type="button" onClick={() => inputRef.current?.focus()}>포커스</button>

const filteredSum = useMemo(() => {
  return bigNumbers.filter((n) => n % onlyMultipleOf === 0).reduce((a, b) => a + b, 0);
}, [bigNumbers, onlyMultipleOf]);

const [state, dispatch] = useReducer(counterReducer, { count: 0 });
dispatch({ type: "inc" });`,
    Component: LiveHooksShowcase,
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
