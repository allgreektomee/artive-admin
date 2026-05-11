# 8장. React 훅 종류별 정리

> **reactTestProject** 전체 파일·트리·원문은 **[14장 샘플 예제 분석](/dev?tab=react&rd=14-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

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

## `React.memo`가 일을 건너뛰는 조건

`memo`로 감싼 컴포넌트는 **props에 대해 얕은 비교**를 한 뒤, **이전 렌더와 같다고 판단하면** 그리기(update)를 건너뜁니다. 따라서 “부모 안에 state가 아주 많아도”, **그 자식에게 내려가는 props 참조·원시 값이 그대로**이면 자식은 조용히 남습니다. 반대로 **객체·배열·인라인 함수**를 매 렌더 새로 만들어 넘기면, 내용이 같아도 **참조가 달라져** memo가 매번 다시 그립니다. 디버깅할 때는 “지금 리렌더를 유발한 props가 무엇인가”를 **`noise`(부모만의 값)와 자식이 받는 props**로 나누어 보면 이해가 빨라집니다.
## `useReducer`

**`state + action → 새 state`** 패턴. 전이가 많거나, 다음 상태가 이전 상태에 강하게 묶이면 읽기 좋다.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "increment" });
```

Redux와 개념이 비슷하지만 **컴포넌트 로컬**에 둔다. 전역은 12장.

## Context에 `dispatch`만 싣는 패턴

여러 화면에서 **같은 전이(add / remove / reset)** 를 호출해야 하는데, 깊이가 깊어져 props로 `dispatch`만 계속 파고들기 싫다면 **Context에 `dispatch`만 올리는** 방식이 있다. state 전체를 Context에 넣을 수도 있지만, 읽기와 쓰기를 **`StateContext` / `DispatchContext`** 로 쪼개면 불필요한 리렌더를 줄이기도 쉽다(읽기가 필요 없는 컴포넌트는 dispatch만 구독). 아래 Live는 **`useReducer` + Provider + 깊은 자식 한 블록**만 보여 준 최소 버전이다.

## `useContext`

**트리 상위 `Provider`가 준 값을** 깊은 자식이 props drilling 없이 읽는다.

- 테마, 로케일, **인증 사용자**(단순하면 Provider+Context, 복잡하면 보관 [`11-auth-flow`](./_archive/11-auth-flow.md)·12장).
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

아래는 8장 훅을 **동작 위주**로 나눈 것이다. `useEffect`는 7장 예제를 참고한다.

1. **`useContext`** — Provider와 깊은 자식에서 같은 테마 값 읽기  
2. **`useCallback`과 `memo`** — 인라인 핸들러 vs 고정 참조로 자식 렌더 차이 보기  
3. **`memo`와 props 분리** — 부모만의 state(`noise`)와 자식이 구독하는 prop(`version`)을 나눠 언제 건너뛰는지 확인  
4. **`useReducer` + Context** — `dispatch`만 깊은 자식까지 내려 메모 목록 전이 실행  
5. **`useRef` · `useMemo` · `useReducer`** — 한 화면 쇼케이스  

```react-live
react.hooks.contextBasic
```

```react-live
react.hooks.callbackMemoBasic
```

```react-live
react.optimize.memoProp
```

```react-live
react.pattern.contextReducer
```

```react-live
react.hooks.showcase
```

## 요약

- 훅은 **최상위·고정 순서**로만 호출한다.
- `useState` / `useEffect` / `useRef` / `useMemo` / `useCallback` / `useReducer` / `useContext` 는 **역할이 다르다** — “성능용” 훅을 습관적으로 남용하지 않는다.
- `memo`는 **props가 같은지**가 기준이므로 **참조가 매번 새로 만들어지지 않게** 만드는 게 핵심이다.
- **커스텀 훅**으로 로직을 재사용하고, 깊은 트리에서 같은 전이라면 **`dispatch`만 Context로** 줄일 수 있다.
