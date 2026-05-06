import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

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
        경과 초: <strong>{seconds}</strong> — <strong>② effect(<code>[]</code>)가 만드는 화면 결과</strong>(1초마다 +1). 인터벌 정리(<code>clearInterval</code>)는 이 카드가 언마운트될 때.
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

const HooksThemeContext = createContext(null);

function HooksThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const toggleTheme = useCallback(() => setDark((d) => !d), []);
  const value = useMemo(() => ({ dark, toggleTheme }), [dark, toggleTheme]);

  return <HooksThemeContext.Provider value={value}>{children}</HooksThemeContext.Provider>;
}

function HooksThemeToolbar() {
  const ctx = useContext(HooksThemeContext);
  if (ctx == null) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <span style={{ fontSize: 13, fontWeight: 600 }}>
        테마: <code>{ctx.dark ? "dark" : "light"}</code>
      </span>
      <button
        type="button"
        onClick={ctx.toggleTheme}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #6366f1",
          background: "#eef2ff",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
          color: "#312e81",
        }}
      >
        토글
      </button>
    </div>
  );
}

function HooksThemeDeepChild() {
  const ctx = useContext(HooksThemeContext);
  if (ctx == null) return null;
  return (
    <div
      style={{
        marginTop: 10,
        padding: 12,
        borderRadius: 8,
        border: "1px solid #e4e4e7",
        background: ctx.dark ? "#27272a" : "#fafafa",
        color: ctx.dark ? "#fafafa" : "#18181b",
        fontSize: 12,
        lineHeight: 1.55,
      }}
    >
      더 깊은 자식도 같은 Context를 읽어 배경색을 맞춥니다. 실무에서는 테마·로케일·인증 요약 등을 이렇게 공유합니다.
    </div>
  );
}

const LiveHooksContextBasic = () => (
  <HooksThemeProvider>
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
        <strong>useContext</strong>는 상위 <code>Provider</code>가 넘긴 값을 props drilling 없이 읽습니다. 값 바구니는 보통{' '}
        <code>useMemo</code>로 안정화합니다.
      </div>
      <HooksThemeToolbar />
      <HooksThemeDeepChild />
    </div>
  </HooksThemeProvider>
);

const postUrl = (id) => `https://jsonplaceholder.typicode.com/posts/${id}`;

const LiveJsonFetch = () => {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);

    (async () => {
      try {
        const res = await fetch(postUrl(postId), { signal: ac.signal });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (e?.name === "AbortError") return;
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [postId]);

  const btnStyle = {
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid #d4d4d8",
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
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
        <strong>JSONPlaceholder</strong> 공개 API에 <code>fetch</code>로 요청합니다. 응답은{' '}
        <code>Content-Type: application/json</code> 본문이며, <code>res.json()</code>으로 객체로
        변환한 뒤 state에 넣습니다. <code>postId</code>가 바뀌면 이전 요청은{' '}
        <code>AbortController</code>로 끊습니다.
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <span style={{ fontSize: 12, marginRight: 4 }}>글 id:</span>
        {[1, 2, 5].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setPostId(id)}
            style={{
              ...btnStyle,
              borderColor: postId === id ? "#6366f1" : "#d4d4d8",
              background: postId === id ? "#eef2ff" : "#fff",
            }}
          >
            {id}
          </button>
        ))}
      </div>

      <div
        style={{
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid #e4e4e7",
          background: "#fafafa",
          minHeight: 120,
        }}
      >
        {loading ? (
          <em>요청 중…</em>
        ) : error ? (
          <span style={{ color: "#991b1b" }}>오류: {error}</span>
        ) : data ? (
          <div>
            <div style={{ fontSize: 11, color: "#71717a", marginBottom: 6 }}>
              <code>GET {postUrl(postId)}</code>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{String(data.title)}</div>
            <div style={{ fontSize: 12, color: "#52525b", lineHeight: 1.5 }}>{String(data.body)}</div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#71717a" }}>
              JSON 필드: <code>userId</code>={String(data.userId)}, <code>id</code>={String(data.id)}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ARTIVE_API_ORIGIN = "https://api.artivefor.me";

/** Artive 운영 API — Swagger: https://api.artivefor.me/swagger-ui/index.html */
const LiveArtiveArtworksFetch = () => {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPayload(null);

    (async () => {
      try {
        const url = `${ARTIVE_API_ORIGIN}/api/v1/artworks?page=0`;
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        if (!cancelled) setPayload(json);
      } catch (e) {
        if (e?.name === "AbortError") return;
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, []);

  const items =
    payload?.success === true && Array.isArray(payload?.data?.content)
      ? payload.data.content
      : [];
  const totalElements =
    payload?.success === true && typeof payload?.data?.totalElements === "number"
      ? payload.data.totalElements
      : null;

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
        <strong>Artive API</strong> 작품 목록(<code>GET /api/v1/artworks?page=0</code>)을 불러옵니다.
        응답은 OpenAPI 기준 <code>ApiResponse</code> 래퍼 안에 Spring Page 형태의{' '}
        <code>data.content</code> 배열이 들어 있습니다. 명세는{" "}
        <a
          href="https://api.artivefor.me/swagger-ui/index.html"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#4f46e5" }}
        >
          Swagger UI
        </a>
        에서 확인할 수 있습니다.
      </div>

      <div
        style={{
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid #e4e4e7",
          background: "#fafafa",
          minHeight: 120,
        }}
      >
        {loading ? (
          <em>요청 중…</em>
        ) : error ? (
          <span style={{ color: "#991b1b" }}>
            오류: {error}
            <span style={{ display: "block", marginTop: 8, fontSize: 11, color: "#71717a" }}>
              다른 출처(도메인)에서 열면 CORS 때문에 실패할 수 있습니다. 로컬 Vite에서는 보통 동작합니다.
            </span>
          </span>
        ) : payload?.success === false ? (
          <span style={{ color: "#991b1b" }}>
            API가 실패 응답을 반환했습니다.
            {payload?.message ? (
              <>
                {" "}
                메시지: <code>{String(payload.message)}</code>
              </>
            ) : null}
          </span>
        ) : (
          <div>
            <div style={{ fontSize: 11, color: "#71717a", marginBottom: 10 }}>
              <code>
                GET {ARTIVE_API_ORIGIN}/api/v1/artworks?page=0
              </code>
              {totalElements != null ? (
                <span style={{ marginLeft: 8 }}>
                  전체 <strong>{totalElements}</strong>건 · 현재 페이지 항목 {items.length}개
                </span>
              ) : null}
            </div>
            {items.length === 0 ? (
              <em>표시할 작품이 없습니다.</em>
            ) : (
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((row) => (
                  <li
                    key={String(row.id)}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid #e4e4e7",
                      background: "#fff",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        flexShrink: 0,
                        borderRadius: 6,
                        overflow: "hidden",
                        border: "1px solid #e4e4e7",
                        background: "#e4e4e7",
                      }}
                    >
                      {row.thumbnailUrl ? (
                        <img
                          src={String(row.thumbnailUrl)}
                          alt={`작품 ${String(row.id)} 썸네일`}
                          width={56}
                          height={56}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : null}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.35 }}>
                        {String(row.title ?? "")}
                      </div>
                      <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>
                        id <code>{String(row.id)}</code>
                        {row.status != null ? (
                          <>
                            {" "}
                            · 상태 <code>{String(row.status)}</code>
                          </>
                        ) : null}
                        {row.totalHistoryCount != null ? (
                          <>
                            {" "}
                            · 히스토리 <code>{String(row.totalHistoryCount)}</code>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function LiveArtworkFormDraft() {
  const [form, setForm] = useState({
    koTitle: "",
    koDescription: "",
    visibility: "PUBLIC",
    medium: "",
    status: "IN_PROGRESS",
  });
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      koTitle: form.koTitle.trim(),
      koDescription: form.koDescription.trim(),
      visibility: form.visibility,
      medium: form.medium.trim() || undefined,
      status: form.status,
      images: [],
      thumbnailUrl: "",
    };
    setPreview(JSON.stringify(payload, null, 2));
    setSubmitting(false);
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 12,
    fontSize: 13,
  };
  const inputStyle = {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #d4d4d8",
    fontSize: 14,
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
        <strong>Artive Swagger</strong> 의{' '}
        <a
          href="https://api.artivefor.me/swagger-ui/index.html"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#4f46e5" }}
        >
          Swagger UI
        </a>
        에서 <code>ArtworkCreateRequest</code> / <code>ArtworkUpdateRequest</code> 에 가까운 필드만 모았다. 실제{' '}
        <code>POST /api/v1/artworks</code> 는 Bearer 등 서버 정책이 필요하므로 여기서는{' '}
        <strong>전송 직전 JSON</strong>만 확인한다.
      </div>

      <form onSubmit={handleSubmit}>
        <label style={fieldStyle}>
          <span style={{ fontWeight: 600 }}>koTitle</span>
          <input
            style={inputStyle}
            value={form.koTitle}
            onChange={(e) => setForm((s) => ({ ...s, koTitle: e.target.value }))}
            placeholder="한글 제목"
          />
        </label>
        <label style={fieldStyle}>
          <span style={{ fontWeight: 600 }}>koDescription</span>
          <textarea
            style={{ ...inputStyle, minHeight: 72, resize: "vertical" }}
            value={form.koDescription}
            onChange={(e) => setForm((s) => ({ ...s, koDescription: e.target.value }))}
            placeholder="한글 설명"
            rows={3}
          />
        </label>
        <label style={fieldStyle}>
          <span style={{ fontWeight: 600 }}>visibility</span>
          <select
            style={inputStyle}
            value={form.visibility}
            onChange={(e) => setForm((s) => ({ ...s, visibility: e.target.value }))}
          >
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
        </label>
        <label style={fieldStyle}>
          <span style={{ fontWeight: 600 }}>medium (선택)</span>
          <input
            style={inputStyle}
            value={form.medium}
            onChange={(e) => setForm((s) => ({ ...s, medium: e.target.value }))}
            placeholder="예: oil on canvas"
          />
        </label>
        <label style={fieldStyle}>
          <span style={{ fontWeight: 600 }}>status</span>
          <select
            style={inputStyle}
            value={form.status}
            onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
          >
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FOR_SALE">FOR_SALE</option>
            <option value="SOLD_OUT">SOLD_OUT</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            border: "1px solid #6366f1",
            background: submitting ? "#e4e4e7" : "#eef2ff",
            cursor: submitting ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: 13,
            color: "#312e81",
          }}
        >
          payload 미리보기
        </button>
      </form>

      {preview ? (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#71717a", marginBottom: 8 }}>
            JSON (실제 전송 전)
          </div>
          <pre
            style={{
              margin: 0,
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #e4e4e7",
              background: "#fafafa",
              fontSize: 12,
              lineHeight: 1.5,
              overflow: "auto",
            }}
          >
            <code>{preview}</code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}

const ApiVerboseContext = createContext(null);

function ApiVerboseProvider({ children }) {
  const [verbose, setVerbose] = useState(false);
  const toggleVerbose = useCallback(() => {
    setVerbose((v) => !v);
  }, []);

  const value = useMemo(() => ({ verbose, toggleVerbose }), [verbose, toggleVerbose]);

  return <ApiVerboseContext.Provider value={value}>{children}</ApiVerboseContext.Provider>;
}

function VerboseToggleToolbar() {
  const ctx = useContext(ApiVerboseContext);
  if (ctx == null) return null;
  return (
    <div
      style={{
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid #e4e4e7",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600 }}>
        API 로그 상세: <code>{String(ctx.verbose)}</code>
      </span>
      <button
        type="button"
        onClick={ctx.toggleVerbose}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #6366f1",
          background: "#eef2ff",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
          color: "#312e81",
        }}
      >
        토글
      </button>
    </div>
  );
}

function NestedStatusBadge() {
  const ctx = useContext(ApiVerboseContext);
  if (ctx == null) return null;
  return (
    <div style={{ marginTop: 10, fontSize: 12, color: "#52525b", lineHeight: 1.5 }}>
      깊은 자식도 같은 Context를 읽습니다(현재 상세 로그: <strong>{String(ctx.verbose)}</strong>). 실무에서는 axios 인터셉터 옵션,
      요청 추적 플래그, 현재 환경(dev/staging) 같은 값을 Provider 한 번으로 묶어 내려보냅니다.
    </div>
  );
}

const LiveApiVerboseContext = () => (
  <ApiVerboseProvider>
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
        <strong>useContext</strong>는 트리 위쪽 <code>Provider</code>가 준 값을 props drilling 없이 읽습니다.
        여기서는 “요청 로그 상세 여부”를 예시로 둡니다.
      </div>
      <VerboseToggleToolbar />
      <NestedStatusBadge />
    </div>
  </ApiVerboseProvider>
);

const MemoActionRow = memo(function MemoActionRow({ label, onAction }) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid #e4e4e7",
        background: "#fff",
        marginBottom: 8,
      }}
    >
      <button
        type="button"
        onClick={onAction}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px solid #d4d4d8",
          background: "#fafafa",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        {label}
      </button>
      <span style={{ fontSize: 11, color: "#71717a" }}>
        이 행 렌더 누적: <strong>{renders.current}</strong>
      </span>
    </div>
  );
});

const LiveApiCallbackMemo = () => {
  const [parentBump, setParentBump] = useState(0);

  const stableRetry = useCallback(() => {
    window.alert("같은 함수 참조 — memo 자식은 불필요 리렌더를 줄일 수 있음");
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
        부모만 바뀌는 state(<code>parentBump</code>)가 있을 때, 자식이 <code>memo</code>로 감싸져 있으면{' '}
        <strong>props 참조가 같을 때</strong> 리렌더를 건너뜁니다.{' '}
        <code>useCallback</code>으로 핸들러 참조를 고정하면 그 조건을 만들기 쉽습니다.
      </div>

      <div style={{ marginBottom: 10 }}>
        부모 카운터: <strong>{parentBump}</strong>
        <button
          type="button"
          onClick={() => setParentBump((n) => n + 1)}
          style={{
            marginLeft: 10,
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #d4d4d8",
            background: "#fff",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          부모만 리렌더
        </button>
      </div>

      <MemoActionRow
        label="매 렌더 새 함수 (언제나 리렌더)"
        onAction={() => {
          window.alert("인라인 핸들러는 참조가 매번 달라짐");
        }}
      />
      <MemoActionRow label="useCallback 고정 핸들러" onAction={stableRetry} />
    </div>
  );
};

const LiveHooksCallbackMemoBasic = () => {
  const [parentBump, setParentBump] = useState(0);

  const stablePing = useCallback(() => {
    window.alert("이 핸들러 참조는 부모가 리렌더돼도 유지됩니다.");
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
        <code>memo</code>로 감싼 자식은 props가 같으면 리렌더를 건너뜁니다. 버튼의 <code>onAction</code>을 매 렌더 새 함수로
        넘기면 항상 “다른 props”가 되고, <code>useCallback</code>으로 참조를 고정하면 건너뛰기 쉬워집니다.
      </div>

      <div style={{ marginBottom: 10 }}>
        부모 숫자: <strong>{parentBump}</strong>
        <button
          type="button"
          onClick={() => setParentBump((n) => n + 1)}
          style={{
            marginLeft: 10,
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #d4d4d8",
            background: "#fff",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          부모만 리렌더
        </button>
      </div>

      <MemoActionRow label="인라인 함수 (매번 새 참조)" onAction={() => window.alert("새 함수 참조")} />
      <MemoActionRow label="useCallback 고정" onAction={stablePing} />
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
    id: "react.api.jsonFetch",
    title: "fetch + JSON: 공개 API에서 글 하나",
    description:
      "JSONPlaceholder에서 게시글 JSON을 받아 res.ok·res.json()·loading/error/data를 나눕니다. postId 변경 시 AbortController로 이전 요청을 취소합니다.",
    sourceCode: `const postUrl = (id) => \`https://jsonplaceholder.typicode.com/posts/\${id}\`;

useEffect(() => {
  const ac = new AbortController();
  let cancelled = false;
  setLoading(true);
  setError(null);
  setData(null);
  (async () => {
    try {
      const res = await fetch(postUrl(postId), { signal: ac.signal });
      if (!res.ok) throw new Error(\`\${res.status} \${res.statusText}\`);
      const json = await res.json();
      if (!cancelled) setData(json);
    } catch (e) {
      if (e?.name === "AbortError") return;
      if (!cancelled) setError(e instanceof Error ? e.message : String(e));
    } finally {
      if (!cancelled) setLoading(false);
    }
  })();
  return () => { cancelled = true; ac.abort(); };
}, [postId]);`,
    Component: LiveJsonFetch,
  },
  {
    id: "react.api.artiveArtworks",
    title: "fetch + JSON: Artive 작품 목록 (운영 API)",
    description:
      "Swagger에 게시된 Artive API(https://api.artivefor.me)에서 작품 목록을 받아 ApiResponse 래퍼와 Spring Page(data.content)를 풀어 화면에 그립니다.",
    sourceCode: `const ARTIVE_API_ORIGIN = "https://api.artivefor.me";

useEffect(() => {
  const ac = new AbortController();
  let cancelled = false;
  setLoading(true);
  setError(null);
  setPayload(null);
  (async () => {
    try {
      const url = \`\${ARTIVE_API_ORIGIN}/api/v1/artworks?page=0\`;
      const res = await fetch(url, { signal: ac.signal });
      if (!res.ok) throw new Error(\`\${res.status} \${res.statusText}\`);
      const json = await res.json();
      if (!cancelled) setPayload(json);
    } catch (e) {
      if (e?.name === "AbortError") return;
      if (!cancelled) setError(e instanceof Error ? e.message : String(e));
    } finally {
      if (!cancelled) setLoading(false);
    }
  })();
  return () => { cancelled = true; ac.abort(); };
}, []);

const items =
  payload?.success === true && Array.isArray(payload?.data?.content)
    ? payload.data.content
    : [];`,
    Component: LiveArtiveArtworksFetch,
  },
  {
    id: "react.api.sharedContext",
    title: "useContext: 공유 설정(예: 로그 상세)",
    description:
      "Provider 아래 깊은 컴포넌트가 같은 값을 props 없이 읽습니다. API 클라이언트 옵션·환경 플래그 등을 묶을 때 자주 씁니다.",
    sourceCode: `const ApiVerboseContext = createContext(null);

function ApiVerboseProvider({ children }) {
  const [verbose, setVerbose] = useState(false);
  const toggleVerbose = useCallback(() => setVerbose((v) => !v), []);
  const value = useMemo(() => ({ verbose, toggleVerbose }), [verbose, toggleVerbose]);
  return <ApiVerboseContext.Provider value={value}>{children}</ApiVerboseContext.Provider>;
}

function Toolbar() {
  const ctx = useContext(ApiVerboseContext);
  return (
    <>
      <span>상세 로그: {String(ctx.verbose)}</span>
      <button type="button" onClick={ctx.toggleVerbose}>토글</button>
    </>
  );
}`,
    Component: LiveApiVerboseContext,
  },
  {
    id: "react.api.memoCallback",
    title: "useCallback + memo: 불필요 리렌더 줄이기",
    description:
      "부모 state만 바뀔 때 memo 자식은 props 참조가 같으면 건너뜁니다. 자식에 넘기는 핸들러는 useCallback으로 고정하는 경우가 많습니다.",
    sourceCode: `const Row = memo(function Row({ label, onAction }) {
  const n = useRef(0);
  n.current += 1;
  return (
    <div>
      <button type="button" onClick={onAction}>{label}</button>
      <span>렌더 누적: {n.current}</span>
    </div>
  );
});

function Parent() {
  const [bump, setBump] = useState(0);
  const stable = useCallback(() => alert("stable"), []);
  return (
    <>
      <button type="button" onClick={() => setBump((x) => x + 1)}>부모만 갱신</button>
      <Row label="인라인 핸들러" onAction={() => alert("new ref each render")} />
      <Row label="useCallback" onAction={stable} />
    </>
  );
}`,
    Component: LiveApiCallbackMemo,
  },
  {
    id: "react.form.artworkDraft",
    title: "폼 → Swagger 계약에 맞는 작품 payload",
    description:
      "ArtworkCreateRequest에 가까운 필드를 채우고 전송 직전 JSON을 확인합니다. 실제 POST는 토큰 등 정책 때문에 실행하지 않습니다.",
    sourceCode: `const [form, setForm] = useState({
  koTitle: "",
  koDescription: "",
  visibility: "PUBLIC",
  medium: "",
  status: "IN_PROGRESS",
});

function handleSubmit(e) {
  e.preventDefault();
  const payload = {
    koTitle: form.koTitle.trim(),
    koDescription: form.koDescription.trim(),
    visibility: form.visibility,
    medium: form.medium.trim() || undefined,
    status: form.status,
    images: [],
    thumbnailUrl: "",
  };
  setPreview(JSON.stringify(payload, null, 2));
}`,
    Component: LiveArtworkFormDraft,
  },
  {
    id: "react.hooks.contextBasic",
    title: "useContext 기본 (테마)",
    description: "Provider·useContext·value 안정화(useMemo)를 테마 토글 최소 예제로 확인합니다.",
    sourceCode: `const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const toggleTheme = useCallback(() => setDark((d) => !d), []);
  const value = useMemo(() => ({ dark, toggleTheme }), [dark, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function Toolbar() {
  const ctx = useContext(ThemeContext);
  return (
    <>
      <span>{ctx.dark ? "dark" : "light"}</span>
      <button type="button" onClick={ctx.toggleTheme}>토글</button>
    </>
  );
}`,
    Component: LiveHooksContextBasic,
  },
  {
    id: "react.hooks.callbackMemoBasic",
    title: "useCallback + memo 기본",
    description: "부모 state만 바뀔 때 memo 자식의 렌더 누적 차이를 인라인 핸들러와 useCallback으로 비교합니다.",
    sourceCode: `const Row = memo(function Row({ label, onClick }) {
  const n = useRef(0);
  n.current += 1;
  return (
    <div>
      <button type="button" onClick={onClick}>{label}</button>
      <span>렌더 누적: {n.current}</span>
    </div>
  );
});

function Parent() {
  const [bump, setBump] = useState(0);
  const stable = useCallback(() => {}, []);
  return (
    <>
      <button type="button" onClick={() => setBump((x) => x + 1)}>부모만 갱신</button>
      <Row label="인라인" onClick={() => {}} />
      <Row label="useCallback" onClick={stable} />
    </>
  );
}`,
    Component: LiveHooksCallbackMemoBasic,
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
