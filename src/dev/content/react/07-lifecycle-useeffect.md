# 7장. 생명주기와 `useEffect`

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

**생명주기**는 컴포넌트가 **마운트**(DOM에 붙음)되고, **업데이트**(props/state 변화로 다시 그려짐)되고, **언마운트**(DOM에서 제거)되는 흐름을 말한다. 클래스 컴포넌트 시절에는 `componentDidMount` 등 이름이 정해진 메서드가 있었다. **함수 컴포넌트**에서는 이 역할의 대부분을 **`useEffect`** 한 훅으로 표현한다(“부수 효과 side effect”를 다룬다는 뜻).

## 클래스 메서드와 `useEffect` 대응 (참고)

완전 1:1은 아니지만, 감을 잡을 때는 아래처럼 보면 된다.

| 클래스 컴포넌트 | `useEffect`로 옮길 때 |
|------------------|-------------------------|
| `componentDidMount` | 의존 배열 **`[]`** — effect 본문은 “마운트 직후 한 번”, cleanup은 “언마운트 직전 한 번”. |
| `componentDidUpdate` | 의존 배열에 **바뀌는 값**을 넣음 — 그 값이 이전 렌더와 달라질 때마다, **먼저 이전 cleanup** → **다시 effect 본문**. (mount 직후 첫 실행은 “이전 값 없음”으로 한 번 돈다.) |
| `componentWillUnmount` | effect가 **반환한 함수**(`return () => { ... }`) — 언마운트 시, 또는 **같은 effect가 다시 돌기 전** 에 항상 호출된다. |

정리하면, **`[]` effect 하나**는 “DidMount + WillUnmount 쌍”에 가깝고, **`[userId]` 같은 effect**는 “`userId`가 바뀔 때마다 이전 구독/타이머를 정리하고 새로 잡는 DidUpdate 류”에 가깝다.

## 클래스 생명주기를 감으로만 잡기

- **mount 직후 한 번** — API 호출, 구독 시작, DOM 측정.
- **update** — 특정 값이 바뀔 때마다 다시 실행할 일.
- **unmount 직전** — 타이머 해제, 구독 해제, 진행 중 요청 취소.

함수 컴포넌트는 **매 렌더**마다 함수 본문이 다시 실행되므로, “렌더 결과를 만드는 순수한 계산”과 “브라우저·네트워크·타이머와 맞닿는 일”을 **`useEffect`로 분리**하는 것이 읽기 쉽다.

## `useEffect` 기본 형태

```jsx
import { useEffect, useState } from "react";

useEffect(() => {
  // 이 블록: 커밋 이후(화면 반영 뒤) 비동기적으로 실행된다고 생각하면 된다.

  return () => {
    // cleanup: 다음 effect 실행 전, 또는 언마운트 시
  };
}, [dep1, dep2]); // 의존 값 목록
```

- **의존 배열이 `[]`** — 마운트 시 한 번, 언마운트 시 cleanup 한 번(업데이트에는 반응 안 함).
- **의존 배열 생략** — (React 18 권장과 다를 수 있음) 거의 모든 렌더 뒤에 실행될 수 있어 **실무에서는 거의 쓰지 않는다**. 명시적 배열을 쓴다.
- **의존 배열에 값** — 해당 값이 **이전 렌더와 달라지면**(Object.is 기준) effect가 다시 돌고, 그 전에 **이전 cleanup**이 호출된다.  
  흐름: `(렌더) → (값 변경 감지) → cleanup → 새 effect 본문`. 첫 마운트 뒤에는 “비교할 이전 의존값”이 없으므로 cleanup 없이 본문만 실행된다.

## 의존 값이 바뀔 때마다 일어나는 일 (타임라인)

의존 배열이 `[a, b]`일 때, **`a` 또는 `b`가 바뀐 그 커밋이 끝난 뒤**:

1. React가 “이전 effect”의 **cleanup**을 실행한다(있다면).
2. 그다음 **새 effect 본문**을 실행한다.

그래서 **같은 컴포넌트 인스턴스가 화면에 남아 있는 동안**에도, 의존 값만 바꿔서 “구독 해제 → 새 구독”, “타이머 해제 → 새 타이머”를 안전하게 반복할 수 있다.

**의존 배열이 `[]`인 effect**는 “의존 값 변화”가 없으므로, **마운트 때 본문 한 번**, **언마운트 때 cleanup 한 번**만 이어진다. 중간에 state가 아무리 바뀌어도 이 effect는 **다시 실행되지 않는다**(타이머도 그대로 유지).

## 언제 effect 안에 넣나

effect에 넣기 좋은 것:

- 데이터 **fetch**, WebSocket **구독**, `setInterval` / `setTimeout`.
- 외부 시스템과의 **동기화**(문서 제목, 외부 위젯 API).
- 렌더 중에 하면 안 되는 **DOM 측정**(레이아웃 이후 `getBoundingClientRect` 등).

effect에 넣지 말고 **렌더 본문 또는 `useMemo`**로 처리하는 것이 나은 것:

- props/state만으로 **바로 계산 가능한 값**(필터된 목록 등).
- **이벤트 핸들러에서만** 필요한 동작(버튼 클릭 시 요청 등). 무분별하게 effect로 옮기면 의존성 지옥이 된다.

## Live: 의존 배열 생략 · `[]` · `[state]`

아래 예제는 **같은 컴포넌트**에 `useEffect` 세 줄만 두고, **실행 횟수**로 차이를 봅니다.

- **배열 생략** — `setState`로 리렌더가 날 때마다 effect도 다시 돕니다 (`bump`만 올려도 왼쪽 열만 크게 증가).
- **`[]`** — 마운트할 때만 늘고, 그 뒤로는 `bump`로만 리렌더해도 **가운데 열은 그대로**입니다.
- **`[dep]`** — 처음 한 번 + **`dep`가 바뀔 때만** 오른쪽 열이 늘어납니다. `bump`만 바꾸면 오른쪽은 안 늘고, **생략** 열은 리렌더마다 늘어납니다.

```react-live
react.effect.depsCompare
```

## cleanup이 필요한 이유

1. **메모리 누수 방지** — 인터벌·리스너를 해제하지 않으면 컴포넌트가 사라진 뒤에도 돈다.
2. **오래된 요청 결과** — `fetch` 후 `setState`가 늦게 도착하면 이미 다른 화면인데 이전 데이터를 그릴 수 있다. **AbortController** 또는 **취소 플래그**로 막는다.

```jsx
useEffect(() => {
  let cancelled = false;
  async function run() {
    const res = await fetch("/api/items");
    const data = await res.json();
    if (!cancelled) setItems(data);
  }
  run();
  return () => {
    cancelled = true;
  };
}, []);
```

## 흔한 실수

1. **의존 배열 누락** — ESLint `react-hooks/exhaustive-deps`가 잡아 주는 경우가 많다. 정말 “한 번만”이면 `[]`와 함께 주석으로 이유를 남긴다.
2. **stale closure** — effect 안에서 오래된 `count`를 참조한다. `count`를 의존에 넣거나, 함수형 업데이트(`setCount(c => c+1)`)로 피한다.
3. **렌더마다 새 객체/함수를 의존에 넣음** — 불필요한 재실행. `useMemo` / `useCallback` 또는 상태 구조를 단순화(8장).
4. **Strict Mode(개발)** — React 18 개발 모드에서 mount → **즉시 cleanup → 다시 mount**를 시뮬레이션해, cleanup 없으면 버그가 드러난다. 운영 빌드와 다르게 **두 번 돈 것처럼 보일 수 있다**는 점을 알아 둔다.

## 이벤트 vs effect

“**사용자가 버튼을 눌렀을 때만** 요청한다”면 `onClick`에 두는 것이 자연스럽다. “**검색어가 바뀔 때마다 자동**으로 디바운스 후 요청한다”면 effect + debounce가 맞다. 둘을 섞지 않도록 **UX 요구**부터 나눈다.

## Live 예제에서 헷갈리기 쉬운 점: 「다시 불러와도」초 시계는 왜 계속 도나

Live에는 **`useEffect`가 두 개** 있다.

1. **의존성 `[loadVersion]`**  
   - 「목록만 다시 불러오기」로 `loadVersion`만 올리면, **이 effect만** cleanup → 다시 실행된다.  
   - 목록이 잠깐 `로딩 중`이 됐다가 다시 채워지는 것은 **전체 컴포넌트가 새로 마운트된 것이 아니라**, “특정 state가 바뀌어서 그에 매달린 effect가 한 바퀴 더 도는 것”이다. → 클래스로 치면 **componentDidUpdate에 가까운 패턴**.

2. **의존성 `[]`**  
   - 이 카드가 **처음 화면에 붙을 때만** 1초마다 `초`를 올리는 `setInterval`을 건다.  
   - **`loadVersion`만 바꾸는 것**은 `[]` effect의 의존성이 아니므로, **두 번째 effect는 다시 실행되지 않는다**. 그래서 **초 숫자는 멈추지 않고 계속 증가**한다.  
   - `setInterval`을 끄려면 **cleanup**(`clearInterval`)이 돌아야 하는데, 그건 **이 Live 블록 전체가 언마운트될 때**(또는 Strict Mode 개발 시 시뮬레이션)에 해당한다. → **componentDidMount + componentWillUnmount**에 가까운 패턴.

즉, **“다시 불러오기” = 전체 리마운트가 아니라, 첫 번째 effect만 재실행**이라는 뜻이다. 타이머를 0부터 다시 돌리고 싶다면 `[]` effect 안의 로직을 **다시 태울 별도 state**를 의존 배열에 넣거나, **키(key)를 바꿔 컴포넌트를 통째로 교체**하는 식으로 설계해야 한다.

```react-live
react.effect.lifecycle
```

## 요약

- 생명주기는 **mount / update / unmount** 흐름이고, 함수 컴포넌트에서는 주로 **`useEffect`**로 표현한다.
- **의존 배열**로 “언제 다시 실행할지”를 선언한다.
- **cleanup**으로 타이머·구독·stale 응답을 정리한다.
- **계산 가능한 값**은 effect가 아니라 렌더·`useMemo`로 둔다.
- Strict Mode에서 개발 시 effect가 두 번 도는 것처럼 보일 수 있으니 **cleanup 필수**다.
