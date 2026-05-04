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

/** 의존 배열 생략 / [] / [state] 를 같은 화면에서 횟수로 비교한다. */
const LiveEffectDepsCompare = () => {
  const [bump, setBump] = useState(0);
  const [dep, setDep] = useState(0);

  const noDepsRuns = useRef(0);
  const emptyDepsRuns = useRef(0);
  const stateDepsRuns = useRef(0);

  // ① 배열 생략: (실무에서 거의 쓰지 않음) 커밋이 일어날 때마다 다시 실행
  useEffect(() => {
    noDepsRuns.current += 1;
  });

  // ② []: 마운트 직후 한 번(개발 Strict Mode에서는 mount 시뮬로 더 늘 수 있음)
  useEffect(() => {
    emptyDepsRuns.current += 1;
  }, []);

  // ③ [dep]: dep가 이전과 달라진 커밋마다 실행
  useEffect(() => {
    stateDepsRuns.current += 1;
  }, [dep]);

  const col = {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e4e4e7",
    background: "#fff",
    flex: "1 1 200px",
    minWidth: 180,
  };

  return (
    <div style={{ fontSize: 13, color: "#3f3f46" }}>
      <div
        style={{
          marginBottom: 12,
          padding: "10px 12px",
          borderRadius: 8,
          background: "#f4f4f5",
          border: "1px solid #e4e4e7",
          fontSize: 12,
          lineHeight: 1.55,
        }}
      >
        <strong>세 가지 의존성만 다릅니다.</strong> 아래 숫자는 각 effect 본문이 지금까지 실행된
        횟수( ref 누적 )입니다. 화면은 <code>bump</code>나 <code>dep</code>가 바뀔 때 다시 그려지며, 그
        시점의 ref 값이 보입니다.
        <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
          <li>
            <strong>배열 생략</strong> — 리렌더만 나도( <code>bump</code> 또는 <code>dep</code> 변경 ) 매번
            실행됩니다.
          </li>
          <li>
            <strong>[]</strong> — 이 카드가 붙은 뒤로는 <code>bump</code>만으로는 다시 실행되지 않습니다.
          </li>
          <li>
            <strong>[dep]</strong> — 마운트 때 한 번 + <code>dep</code>가 바뀔 때마다 실행됩니다.
          </li>
        </ul>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => setBump((b) => b + 1)}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #d4d4d8",
            background: "#fff",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          다른 state만 리렌더 (bump +1, dep 그대로)
        </button>
        <button
          type="button"
          onClick={() => setDep((d) => d + 1)}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #9333ea",
            background: "#f5f3ff",
            cursor: "pointer",
            fontSize: 13,
            color: "#5b21b6",
          }}
        >
          의존 대상 state (dep +1)
        </button>
      </div>

      <div style={{ fontSize: 12, marginBottom: 10, color: "#71717a" }}>
        현재 <code>bump</code>={bump}, <code>dep</code>={dep}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "stretch" }}>
        <div style={col}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>① 배열 생략</div>
          <code style={{ fontSize: 11, display: "block" }}>useEffect(() =&gt; {"{ ... }"})</code>
          <div style={{ marginTop: 10 }}>
            실행 횟수: <strong>{noDepsRuns.current}</strong>
          </div>
        </div>
        <div style={col}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>② 빈 배열</div>
          <code style={{ fontSize: 11, display: "block" }}>useEffect(() =&gt; {"{ ... }"}, [])</code>
          <div style={{ marginTop: 10 }}>
            실행 횟수: <strong>{emptyDepsRuns.current}</strong>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "#71717a" }}>
            개발 모드 Strict에서는 마운트 시뮬로 2가 될 수 있음
          </div>
        </div>
        <div style={col}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>③ [dep] 상태 의존</div>
          <code style={{ fontSize: 11, display: "block" }}>useEffect(() =&gt; {"{ ... }"}, [dep])</code>
          <div style={{ marginTop: 10 }}>
            실행 횟수: <strong>{stateDepsRuns.current}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const LiveEffectLifecycle = () => {
  const [items, setItems] = useState(null);
  const [loadVersion, setLoadVersion] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loadEffectRuns, setLoadEffectRuns] = useState(0);

  // ① 의존성 [loadVersion]: 값이 바뀔 때마다 → 이전 cleanup → effect 다시 실행 (DidUpdate에 가깝다)
  useEffect(() => {
    let cancelled = false;
    setLoadEffectRuns((n) => n + 1);
    setItems(null);
    const timer = setTimeout(() => {
      if (!cancelled) {
        setItems([
          { id: "a", label: `첫 데이터 (불러오기 #${loadVersion})` },
          { id: "b", label: `둘째 데이터 (불러오기 #${loadVersion})` },
        ]);
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [loadVersion]);

  // ② 의존성 []: 이 컴포넌트가 화면에 처음 붙었을 때만 실행 → 언마운트 시 cleanup까지 한 세트
  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div style={{ fontSize: 13, color: "#3f3f46" }}>
      <div
        style={{
          marginBottom: 12,
          padding: "10px 12px",
          borderRadius: 8,
          background: "#f4f4f5",
          border: "1px solid #e4e4e7",
          fontSize: 12,
          lineHeight: 1.55,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 6 }}>이 화면에 useEffect가 두 개</div>
        <ul style={{ margin: "0 0 8px", paddingLeft: 18 }}>
          <li>
            <strong>첫 번째</strong> — 의존성 <code style={{ fontSize: 11 }}>[loadVersion]</code>. 아래
            「목록만 다시 불러오기」로 <code>loadVersion</code>만 바꾸면, <strong>타이머·요청 cleanup</strong> 후
            로딩부터 다시 시뮬레이션합니다. (
            <span style={{ color: "#52525b" }}>클래스의 componentDidUpdate(특정 props/state 변경)에 가까움</span>)
          </li>
          <li style={{ marginTop: 6 }}>
            <strong>두 번째</strong> — 의존성 <code style={{ fontSize: 11 }}>[]</code>. 컴포넌트가{' '}
            <strong>처음 마운트될 때 한 번만</strong> 1초 인터벌을 걸고, 이 카드 전체가 사라질 때(unmount){' '}
            <strong>clearInterval</strong>합니다. (
            <span style={{ color: "#52525b" }}>componentDidMount + componentWillUnmount 쌍</span>)
          </li>
        </ul>
        <div style={{ color: "#71717a", fontSize: 11 }}>
          그래서 「목록만 다시 불러오기」를 여러 번 해도 <strong>경과 초는 멈추지 않고 계속 증가</strong>합니다.
          부모가 이 Live 블록 전체를 없애지 않는 한 두 번째 effect는 다시 안 돌기 때문입니다.
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: "#52525b" }}>
          <strong>①의 결과</strong>는 화면에 “항상 같은 두 줄 목록”만 있어서 헷갈리기 쉽습니다. 실제로는{' '}
          <strong>잠깐 로딩 → 0.4초 뒤 다시 그리기</strong>를 반복하고, 아래 목록의{' '}
          <strong>(불러오기 #N)</strong>과 <strong>① 실행 횟수</strong>가 늘어나는지로 재실행 여부를 확인하면 됩니다.
        </div>
      </div>

      <div style={{ marginBottom: 8, fontSize: 12 }}>
        <code>loadVersion</code>: <strong>{loadVersion}</strong>
        {' · '}
        <span style={{ color: "#71717a" }}>
          ① effect가 돈 횟수(마운트 포함): <strong>{loadEffectRuns}</strong>
          <span style={{ fontWeight: 400 }}> — 개발 Strict Mode에선 시작 시 2일 수 있음</span>
        </span>
      </div>

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
        목록만 다시 불러오기 (loadVersion +1 → 첫 effect만 재실행)
      </button>
      <div style={{ marginBottom: 8 }}>
        경과 초: <strong>{seconds}</strong> — 두 번째 effect(<code>[]</code>). 컴포넌트가 사라질 때 인터벌 정리.
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
    description:
      "의존성이 바뀔 때만 다시 도는 effect와, []로 마운트 때만 도는 effect를 나란히 둡니다. 「목록만 다시 불러오기」는 첫 effect만 재실행 — 초 시계는 계속 돕니다.",
    sourceCode: `// ① [loadVersion] — loadVersion이 바뀔 때마다 cleanup 후
//    setItems(null) → 400ms 뒤 목록 채움 (화면은 "로딩…" 깜빡임 + #N 갱신)
useEffect(() => {
  let cancelled = false;
  setLoadEffectRuns((n) => n + 1);
  setItems(null);
  const t = setTimeout(() => {
    if (!cancelled) {
      setItems([
        { id: "a", label: \`첫 데이터 (불러오기 #\${loadVersion})\` },
        { id: "b", label: \`둘째 데이터 (불러오기 #\${loadVersion})\` },
      ]);
    }
  }, 400);
  return () => { cancelled = true; clearTimeout(t); };
}, [loadVersion]);

// ② [] — 첫 마운트에만 1초 인터벌, 언마운트 때 clearInterval
useEffect(() => {
  const id = setInterval(() => setSeconds((s) => s + 1), 1000);
  return () => clearInterval(id);
}, []);`,
    Component: LiveEffectLifecycle,
  },
  {
    id: "react.effect.depsCompare",
    title: "useEffect: 의존 배열 생략 · [] · [state] 비교",
    description:
      "같은 컴포넌트에서 effect 실행 횟수만 세서 비교합니다. 배열 생략은 리렌더마다, []는 마운트 때만, [dep]은 dep 변경 시에만 추가 실행됩니다.",
    sourceCode: `const noDepsRuns = useRef(0);
const emptyDepsRuns = useRef(0);
const stateDepsRuns = useRef(0);

// ① 생략 — 커밋이 날 때마다
useEffect(() => {
  noDepsRuns.current += 1;
});

// ② [] — 마운트 시( Strict 개발에선 2번일 수 있음 )
useEffect(() => {
  emptyDepsRuns.current += 1;
}, []);

// ③ dep가 바뀔 때마다
useEffect(() => {
  stateDepsRuns.current += 1;
}, [dep]);`,
    Component: LiveEffectDepsCompare,
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
