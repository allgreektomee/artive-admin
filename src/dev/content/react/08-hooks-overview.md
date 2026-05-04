# 8장. React 훅 종류별 정리

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

**훅**은 함수 컴포넌트 안에서만 호출되는 React API 모음이다. `use`로 시작하는 이름 규칙이 있고, **컴포넌트 최상위**에서 호출해야 한다(조건문·반복문 안에서 호출 금지). 이 장에서는 자주 쓰는 훅의 **목적·때·주의점**을 정리한다.

## 훅의 공통 규칙

1. **같은 순서**로 매 렌더에 호출되어야 해서, `if (x) useState(...)` 처럼 가드 안에 두면 안 된다.
2. **커스텀 훅**(`useSomething`)도 컴포넌트나 다른 커스텀 훅의 최상위에서만 다른 훅을 호출한다.

## `useState`

**컴포넌트 로컬 상태.** UI가 시간에 따라 바뀌는 값. setter로만 갱신(5장).

- 여러 값이 서로 독립이면 `useState`를 여럿 쓰는 편이 읽기 쉽다.
- 여러 전이가 묶이면 `useReducer`를 검토한다.

## `useEffect`

**렌더 밖의 세계와 맞물리는 일.** fetch, 구독, 타이머, DOM 동기화(7장).

- “렌더로 끝날 수 있는 계산”과 섞지 않는다.
- 의존 배열·cleanup을 습관화한다.

## `useRef`

**`.current`에 값을 붙여 두는 상자.**

- **DOM 참조** — `<input ref={inputRef} />`, `inputRef.current.focus()`.
- **렌더 간에 유지되지만, 바뀌어도 리렌더를 일으키지 않는 값** — 이전 props 저장, 타이머 id, “몇 번째 렌더인지” 같은 디버그 카운터.

`useState`와 달리 `ref.current = x`는 **리렌더를 트리거하지 않는다**. 화면에 반영돼야 하는 값이면 state다.

## `useMemo`

**비용 큰 계산 결과를 “의존 값이 같을 때” 재사용.**

```jsx
const visible = useMemo(() => heavyFilter(items, query), [items, query]);
```

남용하면 오히려 코드만 복잡해진다. **측정하거나**, 필터·정렬이 눈에 띄게 무거울 때만 쓴다.

## `useCallback`

**함수 참조를 “의존이 같을 때” 유지**한다.

```jsx
const onSave = useCallback(() => doSave(id, draft), [id, draft]);
```

주 목적은 **`memo`로 감싼 자식**에 넘기는 콜백이 **매 렌더마다 바뀌지 않게** 하여 불필요한 재렌더를 줄이는 것이다. 자식이 `memo`가 아니면 이득이 제한적일 수 있다.

## `useReducer`

**`state + action → 새 state`** 패턴. 전이가 많거나, 다음 상태가 이전 상태에 강하게 묶이면 읽기 좋다.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "increment" });
```

Redux와 개념이 비슷하지만 **컴포넌트 로컬**에 둔다. 전역은 13장.

## `useContext`

**트리 상위 `Provider`가 준 값을** 깊은 자식이 props drilling 없이 읽는다.

- 테마, 로케일, **인증 사용자**(단순하면 Provider+Context, 복잡하면 11장·13장).
- Context 값이 바뀌면 **그 Consumer를 구독하는 컴포넌트는 리렌더**된다. 큰 객체를 매 렌더 새로 만들면 하위 전부가 흔들릴 수 있어 **value를 `useMemo`로 안정화**하는 패턴이 있다.

## 커스텀 훅

`useArtworkList`, `useDebounce`, `usePrevious`처럼 **이름을 `use`로 시작**하는 함수로, 내부에서 다른 훅을 호출한다.

- **목적** — 같은 상태+effect 로직을 여러 컴포넌트에서 **복붙 없이** 공유.
- **주의** — 커스텀 훅끼리 **상태를 공유하지 않는다**. 호출한 **컴포넌트마다 별도의 state**다. 진짜 전역은 Context/Redux.

## 언제 뭘 쓰나(요약 표)

| 상황 | 후보 |
|------|------|
| 화면에 보이는 변하는 값 | `useState` / `useReducer` |
| API·타이머·구독 | `useEffect` + cleanup |
| DOM 포인터, 리렌더 없이 저장 | `useRef` |
| 무거운 파생 데이터 | `useMemo` |
| memo 자식에 넘기는 함수 | `useCallback` |
| 트리 깊게 공유 | `useContext` |

## Live 예제

`useRef`(포커스), `useMemo`(합 계산), `useReducer`(카운터)를 한 화면에서 확인한다. `useEffect`는 7장 예제를 참고한다.

```react-live
react.hooks.showcase
```

## 요약

- 훅은 **최상위·고정 순서**로만 호출한다.
- `useState` / `useEffect` / `useRef` / `useMemo` / `useCallback` / `useReducer` / `useContext` 는 **역할이 다르다** — “성능용” 훅을 습관적으로 남용하지 않는다.
- **커스텀 훅**으로 로직을 재사용하고, 전역 공유는 Context·스토어로 옮긴다.
