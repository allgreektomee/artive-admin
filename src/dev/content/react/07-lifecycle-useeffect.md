# 7장. 생명주기와 `useEffect`

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

**생명주기**는 컴포넌트가 **마운트**(DOM에 붙음)되고, **업데이트**(props/state 변화로 다시 그려짐)되고, **언마운트**(DOM에서 제거)되는 흐름을 말한다. 클래스 컴포넌트 시절에는 `componentDidMount` 등 이름이 정해진 메서드가 있었다. **함수 컴포넌트**에서는 이 역할의 대부분을 **`useEffect`** 한 훅으로 표현한다(“부수 효과 side effect”를 다룬다는 뜻).

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
- **의존 배열에 값** — 해당 값이 **이전 렌더와 달라지면** effect가 다시 돌고, 그 전에 이전 cleanup이 호출된다.

## “언제 effect 안에 넣나”

effect에 넣기 좋은 것:

- 데이터 **fetch**, WebSocket **구독**, `setInterval` / `setTimeout`.
- 외부 시스템과의 **동기화**(문서 제목, 외부 위젯 API).
- 렌더 중에 하면 안 되는 **DOM 측정**(레이아웃 이후 `getBoundingClientRect` 등).

effect에 넣지 말고 **렌더 본문 또는 `useMemo`**로 처리하는 것이 나은 것:

- props/state만으로 **바로 계산 가능한 값**(필터된 목록 등).
- **이벤트 핸들러에서만** 필요한 동작(버튼 클릭 시 요청 등). 무분별하게 effect로 옮기면 의존성 지옥이 된다.

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

## Live 예제

의존 배열이 바뀔 때 **다시 로드**하는 패턴, **인터벌**과 **cleanup**을 함께 볼 수 있다.

```react-live
react.effect.lifecycle
```

## 요약

- 생명주기는 **mount / update / unmount** 흐름이고, 함수 컴포넌트에서는 주로 **`useEffect`**로 표현한다.
- **의존 배열**로 “언제 다시 실행할지”를 선언한다.
- **cleanup**으로 타이머·구독·stale 응답을 정리한다.
- **계산 가능한 값**은 effect가 아니라 렌더·`useMemo`로 둔다.
- Strict Mode에서 개발 시 effect가 두 번 도는 것처럼 보일 수 있으니 **cleanup 필수**다.
