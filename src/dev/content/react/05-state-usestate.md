# 5장. 상태, useState

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

**state**(상태)는 컴포넌트 안에서 **시간에 따라 바뀌는 데이터**다. 화면에 그릴 내용이 state에 의존하면, state를 바꿀 때마다 React가 그 컴포넌트를 **다시 렌더링**해서 DOM을 최신 내용에 맞춘다. props가 “부모가 내려준 입력”이라면, state는 **이 컴포넌트가 스스로 들고 있는 기억**에 가깝다.

## useState 한 줄 요약

```jsx
import { useState } from "react";

const [value, setValue] = useState(초기값);
```

- `value`: 지금 렌더에서 읽는 현재 상태.
- `setValue`: 상태를 바꿀 때 부르는 함수. 호출되면 **다음 렌더**에서 `value`가 갱신된다.
- `useState`는 **컴포넌트 함수의 최상위**에서만 호출한다(조건·반복 안쪽에 두면 안 된다 — 이 규칙은 훅 공통이다).

## 왜 setter를 쓰나 — 직접 변수를 바꾸면 안 되나

컴포넌트 함수 안의 일반 지역 변수를 고쳐도 React는 “바뀌었다”고 알지 못한다. **`setValue`** 를 호출해야 React가 **다음 렌더를 예약**하고, 그때 새 `value`로 함수 컴포넌트가 다시 실행된다. 그래서 UI와 동기화되는 숫자·문자열·객체는 state로 둔다.

## 함수형 업데이트

이전 상태를 기준으로 갱신할 때는 setter에 **함수**를 넘기는 편이 안전하다.

```jsx
setCount((c) => c + 1);
```

여러 번 연속으로 증가시키거나, 같은 이벤트에서 두 번 갱신할 때, **최신 값**을 기준으로 계산하게 해 준다. `setCount(count + 1)`를 여러 번 호출해도 배치에 묶이면 기대와 다를 수 있어서, “이전 값 기준”이면 함수형 업데이트를 쓴다.

## 초기값이 비싼 계산일 때

초기값을 매 렌더마다 다시 계산하면 낭비다. **함수를 넘기면** React가 첫 마운트 때만 그 함수를 실행해 초기값을 만든다.

```jsx
const [data, setData] = useState(() => readHeavyFromStorage());
```

## 객체·배열 state — 불변 업데이트

state로 객체·배열을 들고 있으면, **원본을 직접 고치지 말고** 새 참조를 만들어 setter에 넘긴다. 그래야 React가 “바뀌었다”고 판단하고, 이후 최적화도 예측 가능하다.

```jsx
const [user, setUser] = useState({ name: "Kim", score: 0 });

// 좋은 예: 새 객체
function addPoint() {
  setUser((u) => ({ ...u, score: u.score + 1 }));
}

// 나쁜 예: 같은 객체 mutate
function bad() {
  user.score += 1;
  setUser(user);
}
```

배열에 항목 추가:

```jsx
setItems((prev) => [...prev, newItem]);
```

필터·맵으로 하나 수정:

```jsx
setItems((prev) => prev.map((it) => (it.id === id ? { ...it, done: true } : it)));
```

항목 삭제:

```jsx
setItems((prev) => prev.filter((it) => it.id !== id));
```

## 제어 컴포넌트

입력값을 state가 **유일한 진실 공급원**으로 두고, `value`와 `onChange`로 묶으면 **제어 컴포넌트**다.

```jsx
const [text, setText] = useState("");

return <input value={text} onChange={(e) => setText(e.target.value)} />;
```

한 파일 안에서는 `input`을 컴포넌트 `return` 안에 두면 된다.

- 화면에 보이는 글자 = 항상 `text`.
- 검증 메시지, 글자 수 제한, 서버 전송 직전 포맷 등을 state 한 곳에서 처리하기 쉽다.

`textarea`는 `value`/`onChange`, `select`는 `value`와 옵션들, 체크박스는 `checked`/`onChange`로 맞춘다.

## props를 state에 그대로 복사하지 말기

부모가 내려준 `props.someId`를 `useState(props.someId)`로만 받아 두고 props가 바뀌어도 **자식 state는 예전 값**에 머물 수 있다. “항상 부모와 같아야 한다”면 **props를 그대로 쓰거나**, props 변화에 맞춰 동기화할 특별한 이유가 있을 때만 `useEffect` 등으로 맞춘다(7장). **같은 정보를 props와 state에 이중으로 두는 것**은 버그의 흔한 원인이다.

## state를 어디에 둘까 — 올리기(lifting state up)

**같은 데이터**를 여러 자식이 쓰거나, 형제끼리 공유해야 하면 state를 **공통 부모**로 올린다. 부모가 state를 들고, 자식에는 **props + 콜백**으로 넘긴다(3·4장). “검색어”가 목록과 필터 둘 다에 필요하면 검색어 state는 그 둘의 부모에 두는 식이다.

## 렌더와 비동기

`setX(newValue)` 직후에 바로 아래 줄에서 `x`를 읽으면 **아직 이전 렌더의 값**일 수 있다. “갱신된 값으로 이어서 계산”은 `setX` 안의 함수형 업데이트나, `useEffect`로 `x` 변화를 감시하는 방식으로 나눈다(7장).

## 여러 개의 useState

관련 없는 값은 `useState`를 여러 번 쓰는 것이 읽기 쉽다.

```jsx
const [name, setName] = useState("");
const [age, setAge] = useState(0);
```

한 객체로 묶어도 되지만, 필드 하나만 바꿀 때마다 전개 연산자로 새 객체를 만드는 패턴이 반복된다. 팀 규칙·데이터 크기에 맞게 선택하면 된다.

## Live 예제

카운터는 **state + `onClick`** 만으로 화면 숫자가 바뀌는 최소 예이다.

```react-live
react.state.counter
```

## 요약

- **`useState`** 로 로컬 state를 만들고, **`setter`** 로만 반응형 갱신을 트리거한다.
- 이전 값 기준 갱신은 **`setX((prev) => ...)`** .
- 객체·배열은 **불변 업데이트**(새 참조)로 바꾼다.
- 입력은 **`value`/`onChange`(또는 `checked`)** 로 제어 컴포넌트로 묶는 경우가 많다.
- 공유가 필요하면 state를 **부모로 올리고** props·콜백으로 내린다.
- props를 **중복 state**로 복제하지 않는다.
