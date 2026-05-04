# 4장. React 이벤트

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

사용자가 클릭·입력·키보드·포커스 등으로 브라우저 이벤트를 일으키면, React는 **props 형태의 `on*` 핸들러**로 그것을 연결할 수 있게 한다. DOM 표준 이벤트를 비슷하게 감싼 객체를 넘기는데, 이를 **합성 이벤트(SyntheticEvent)** 라고 부른다. 직접 DOM에 `addEventListener`를 붙이지 않고, JSX에서 **`onClick={...}`** 처럼 선언하는 방식이 기본이다.

## 이름 규칙: camelCase

HTML 속성은 보통 소문자(`onclick`)지만, React JSX에서는 **camelCase**다.

| 흔한 패턴 | 설명 |
|-----------|------|
| `onClick` | 마우스 클릭(또는 포인터 활성화에 해당하는 경우) |
| `onChange` | 입력값 변경(`input`, `select`, `textarea`, 체크박스 등) |
| `onSubmit` | 폼 제출 |
| `onFocus` / `onBlur` | 포커스 들어옴·나감 |
| `onKeyDown` 등 | 키보드 |

접근성·키보드 조작을 다룰 때는 `onClick`만이 아니라 `onKeyDown`(Enter/Space) 등을 같이 고려하기도 한다.

## 핸들러는 “호출 결과”가 아니라 “함수”를 넘긴다

`onClick={handleClick}` 처럼 **함수 참조**를 넘긴다. `onClick={handleClick()}`처럼 쓰면 렌더 시점에 **즉시 실행**되어 버리고, 반환값이 핸들러로 들어가 잘못 동작한다.

인라인으로 쓸 때는 실행을 미루기 위해 화살표 함수를 쓴다.

```jsx
<button type="button" onClick={() => setOpen(true)}>열기</button>
```

**인자가 필요한 경우**도 같은 방식으로 감싼다.

```jsx
{items.map((item) => (
  <button key={item.id} type="button" onClick={() => deleteItem(item.id)}>
    삭제
  </button>
))}
```

## 이벤트 객체에서 자주 쓰는 것

핸들러는 보통 첫 인자로 **이벤트 객체** `e`(또는 `event`)를 받는다.

- **`e.preventDefault()`**  
  브라우저 기본 동작을 막는다. 폼 제출 시 페이지 새로고침 막기, 링크 `href` 이동 막기 등에 사용한다.
- **`e.stopPropagation()`**  
  이벤트가 부모 쪽으로 더 올라가지 않게 막는다. 카드 전체 클릭과 안쪽 버튼 클릭을 나눌 때 가끔 쓴다.
- **`e.target`**  
  이벤트가 **일어난 DOM 요소**(예: 실제로 클릭된 노드). 위임된 클릭에서도 “진짜 눌린 것”에 가깝다.
- **`e.currentTarget`**  
  **지금 이 핸들러가 붙어 있는 요소**. `onClick`이 `div`에 있으면 `currentTarget`은 그 `div`다.

입력 요소에서는 값을 `e.target.value`, 체크박스는 `e.target.checked` 로 읽는다.

```jsx
<input
  type="checkbox"
  checked={agree}
  onChange={(e) => setAgree(e.target.checked)}
/>
```

## 폼과 `preventDefault`

`<form onSubmit={handler}>` 에서 `handler` 안에서 **`e.preventDefault()`** 를 호출하지 않으면, 브라우저가 기본적으로 폼을 **전송**하려 하면서 페이지가 새로고침될 수 있다. React SPA에서는 거의 항상 막고, `FormData`나 상태로 값을 읽어 처리한다.

```jsx
function SearchForm({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const q = new FormData(form).get("q");
    onSearch(String(q ?? ""));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="q" />
      <button type="submit">검색</button>
    </form>
  );
}
```

## 버튼 `type` 주의

`<button>`의 기본 `type`은 **`submit`** 이라서, 폼 안에 두면 클릭 시 폼이 제출될 수 있다. “그냥 클릭 동작만” 하게 하려면 **`type="button"`** 을 명시하는 습관이 안전하다.

## 자식에서 일어난 일을 부모가 알게 하기

이벤트는 **어디서 처리하느냐**를 정할 수 있다.

- **로컬 state만 바꾸면 될 때**: 그 컴포넌트 안에서 `useState` + `onChange` / `onClick` 으로 끝낸다(5장).
- **부모 데이터를 바꿔야 할 때**: 부모가 **`onSave`**, **`onSearch`**, **`onDelete`** 같이 **함수를 props로 내려주고**, 자식 핸들러 안에서 그 함수를 호출한다. 값은 인자로 넘긴다.

```jsx
function Toolbar({ onReset }) {
  return (
    <button type="button" onClick={() => onReset()}>
      초기화
    </button>
  );
}
```

3장에서 말한 것처럼 props는 직접 고치지 않고, **콜백으로 부모의 `setState`가 실행**되게 하는 패턴이다.

## 제어·비제어 입력과의 연결

입력값을 **state와 `value`/`onChange`로 묶으면** 제어 컴포넌트(5장). 이벤트만 연결해 두면서 ref나 DOM에만 두면 비제어에 가깝다. 이 연재에서는 관리자 화면·폼을 주로 **제어**로 맞출 예정이다.

## 흔한 실수 한 줄

- 렌더마다 **새 함수**를 `onClick={() => ...}` 로 만들면 디버깅은 쉽지만, 자식이 `memo`로 최적화될 때는 참조가 매번 바뀌어 재렌더가 늘 수 있다. 처음에는 신경 쓰지 않아도 되고, 느려지면 `useCallback`(8장)을 검토한다.

## Live 예제

검색 입력, 체크박스, 초기화 버튼이 **이벤트에 연결**되어 로컬 state를 바꾸는 흐름을 볼 수 있다.

```react-live
react.event.click
```

## 요약

- 이벤트는 JSX에서 **`on*` camelCase** 로 연결하고, 핸들러에는 **함수 참조**를 넘긴다.
- `preventDefault` / `stopPropagation`, `target` / `currentTarget`, `value` / `checked` 를 상황에 맞게 쓴다.
- 폼 제출은 기본 동작을 막고 처리한다. 폼 안 버튼은 **`type="button"`** 도 확인한다.
- 부모가 알아야 하면 **콜백 props**로 이벤트를 “올린다”.
- 입력은 5장의 **제어 컴포넌트**와 함께 쓰는 경우가 많다.
