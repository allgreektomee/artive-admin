# 2장. JSX와 컴포넌트

> **reactTestProject**: 본문 **맨 아래**에 이 장과 연결된 파일 **전체 원문**(색 구문 강조)이 붙습니다. React 탭 홈 「소스 보기」에서도 같은 파일을 고를 수 있습니다.

**JSX**는 JavaScript 안에서 HTML과 비슷한 문법으로 UI를 적을 수 있게 해 주는 확장 문법이다. 파일에서는 보통 `.jsx` 확장자를 쓴다. 빌드 도구(Babel, Vite 내장 변환 등)가 JSX를 내부적으로 `React.createElement(타입, props, ...자식)` 호출로 바꿔 준다. 즉 “태그를 적는 것”과 “요소를 만드는 함수 호출”이 같은 의미가 된다.

## JSX와 HTML이 다른 곳

같아 보여도 몇 가지는 HTML과 다르게 쓴다.

| HTML / 습관 | JSX에서 |
|------------|---------|
| `class` | `className` (JS에서 `class`는 예약어에 가깝게 취급) |
| `for` (`<label>`) | `htmlFor` |
| `style="color:red"` | `style={{ color: "red" }}` — **객체** 한 개를 넘김, CSS 속성 이름은 **camelCase** (`font-size` → `fontSize`) |
| `onclick` | `onClick` — 이벤트 이름 전반이 **camelCase** (4장에서 자세히) |

닫는 태그가 없는 HTML 태그도 JSX에서는 **명시적으로 닫는다**.

```jsx
<img src="/logo.png" alt="로고" />
<br />
<input type="text" />
```

## 중괄호: 그 안은 “값”이다

JSX에서 `{ ... }` 안에는 **JavaScript 표현식**이 온다. 문자열 연산, 변수, 함수 호출 결과, 삼항 연산자 등이 가능하다.

```jsx
function Greeting({ userName }) {
  const hour = new Date().getHours();
  const mention = hour < 12 ? "좋은 아침" : "안녕하세요";

  return (
    <p>
      {mention}, <strong>{userName}</strong>님
    </p>
  );
}
```

**주석**은 JSX 안에서 `{/* 이렇게 */}` 한 줄·여러 줄 모두 가능하다. `{// 이런 식}`은 줄 끝 처리에 실패하기 쉬워 비추천이다.

## 컴포넌트는 함수다

함수 컴포넌트는 보통 **첫 번째 인자로 `props` 객체**를 받고, **UI에 해당하는 JSX**를 `return`한다. 컴포넌트 이름은 반드시 **대문자(PascalCase)** 로 시작해야 JSX에서 “내가 만든 컴포넌트”로 인식된다. **소문자로 시작하면** 브라우저 내장 HTML 태그로 처리된다.

```jsx
// 컴포넌트: 대문자
function Welcome() {
  return <p>안녕하세요</p>;
}

// 사용처
function App() {
  return (
    <div>
      <Welcome />
      <welcome /> {/* 의도와 다르게 동작하거나 경고 대상 — 쓰지 않는다 */}
    </div>
  );
}
```

`App` 안의 `<Welcome />`는 “Welcome이라는 함수를 호출해서 나온 UI 조각을 여기에 둔다”는 뜻이고, 1장에서 말한 **트리**로 보면 `App`의 **자식 노드**가 하나 생긴 셈이다.

## 컴포넌트 합성: 트리를 코드로 읽기

작은 컴포넌트를 합치면 부모가 자식을 여러 개 가진 트리가 된다.

```jsx
function Logo() {
  return <span className="logo">Artive</span>;
}

function TopBar() {
  return (
    <header>
      <Logo />
      <nav>메뉴</nav>
    </header>
  );
}

function App() {
  return (
    <div>
      <TopBar />
      <main>
        <h1>대시보드</h1>
      </main>
    </div>
  );
}
```

위 코드의 트리 감각은 대략 `App → div → [ TopBar, main ]`, `TopBar → header → [ Logo, nav ]` 처럼 읽으면 된다. **각 컴포넌트의 `return`** 이 곧 “그 노드에서 아래로 뻗는 가지”다.

## 한 루트 규칙과 Fragment

하나의 함수에서 `return`으로 **맞닿는 형제**를 여러 개만 던질 수 없다. 인접한 JSX 요소 두 개를 나란히 반환하면 문법 오류가 난다. 이때 **하나의 부모**로 감싼다.

- 의미 있는 래퍼가 필요하면 `<div>...</div>`.
- **추가 DOM 노드 없이** 묶고 싶으면 **Fragment** `<>...</>` 또는 `<React.Fragment>...</React.Fragment>`.

```jsx
function Header() {
  return (
    <>
      <h1>제목</h1>
      <p>부제</p>
    </>
  );
}
```

리스트를 `map`으로 돌릴 때 Fragment에 **`key`가 필요하면** 단축 문법 `<>...</>` 대신 `<React.Fragment key={item.id}>...</React.Fragment>`를 써야 한다(목록·컴포넌트 분리를 다루는 장에서도 `key`와 `map`을 다시 짚는다).

## 조건부 렌더링

자주 쓰는 패턴은 다음과 같다.

- **삼항**: `{isLoggedIn ? <Dashboard /> : <Login />}`
- **&&**: `{hasError && <p className="error">문제가 있습니다.</p>}`

`&&`를 쓸 때는 **왼쪽이 숫자 `0`**이면 React는 `0`을 화면에 그릴 수 있다. “없음”을 나타낼 때는 `items.length > 0 && ...`처럼 **불리언**을 왼쪽에 두는 습관이 안전하다.

## 리스트 렌더링과 `key`

배열을 화면에 펼칠 때는 `map`으로 JSX 배열을 만든다.

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

`key`는 **형제(li들) 사이에서 안정적으로 구분**할 수 있는 값이어야 한다. React가 항목이 **추가·삭제·재정렬**될 때 어떤 UI 상태를 어디에 맞출지 판단하는 데 쓴다. 인덱스를 `key`로 쓰는 것은 **목록이 자주 바뀌거나 정렬되면** 비추천이다(가능하면 데이터의 고유 id).

## 정리: 이 장에서 손에 쥐어야 할 것

1. JSX는 `className`, camelCase 이벤트, `style` 객체 등 HTML과 다른 규칙이 있다.
2. `{ }` 안에 표현식을 넣어 데이터를 UI에 녹인다.
3. 컴포넌트는 **PascalCase 함수**, 트리에서는 **부모가 자식을 포함**하는 구조로 읽는다.
4. 형제만 반환할 수 없으므로 **한 루트 또는 Fragment**로 묶는다.
5. 조건·리스트로 화면 가지를 늘리고, 리스트에는 **`key`** 를 준다.

## Live 예제

아래는 **한 컴포넌트 안에서** 제목·문단·중괄호 표현식이 섞인 JSX가 실제로 어떻게 보이는지 보여 준다.

```react-live
react.jsx.greeting
```

## 요약

- JSX는 UI를 표현하는 문법이고, 빌드 시 `createElement` 형태의 JavaScript로 변환된다.
- HTML과 속성·스타일·자기닫기 규칙이 다르니 표를 참고해 습관을 맞춘다.
- 컴포넌트는 UI 조각을 반환하는 함수이며, 이름은 **대문자**로 시작한다.
- 여러 형제만 반환할 수 없어 **Fragment**(`<>...</>`)나 래퍼 태그로 묶는다.
- 조건부·리스트로 트리를 풍부게 만들고, 리스트 항목에는 **안정적인 `key`** 를 붙인다.
