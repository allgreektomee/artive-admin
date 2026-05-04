# 3장. props

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

**props**(properties)는 **부모 컴포넌트가 자식 컴포넌트에게 넘기는 입력값**이다. React가 자식 함수를 호출할 때, JSX에 적어 둔 속성들을 **하나의 객체**로 모아 첫 번째 인자로 넘긴다. 그 객체가 곧 `props`다.

## 무엇이 props인가

자식이 **커스텀 컴포넌트**(대문자로 시작하는 태그)일 때, 여는 태그에 적은 **이름 있는 속성**이 전부 props의 키가 된다.

```jsx
// 부모
<ArtworkCard title="풍경" artist="Kim" isPublic={true} />
```

위 한 줄은, React 입장에서 대략 다음과 같은 의미다.

- 자식 함수 `ArtworkCard`를 호출할 때
- 첫 번째 인자로 `{ title: "풍경", artist: "Kim", isPublic: true }` 같은 객체를 넘긴다.

그래서 “props가 뭐냐”고 하면 **“부모→자식으로 내려온 그 객체(의 각 프로퍼티)”** 라고 보면 된다. HTML 네이티브 태그(`<div>`, `<input>`)의 속성은 브라우저 DOM용이고, **우리가 만든 컴포넌트**에 붙인 속성만이 이 장에서 말하는 props다.

## 어떻게 전달하고, 어떻게 받나

### 전달(부모 쪽)

- **문자열**은 따옴표로: `title="풍경"`
- **숫자·불리언·배열·객체·함수**는 중괄호로 JavaScript 값을 넘긴다: `year={2024}`, `isPublic={true}`, `tags={["a", "b"]}`, `onSave={handleSave}`
- **불리언 true**는 속성 이름만 써도 됨: `isPublic` 는 `isPublic={true}` 와 같다.

```jsx
<UserCard
  name="이영희"
  age={30}
  isVip
  hobbies={["독서", "영화"]}
  onDetailClick={() => console.log("클릭")}
/>
```

여러 props를 객체로 모아 **펼쳐서** 넘길 수도 있다.

```jsx
const artwork = { title: "바다", artist: "Kim", isPublic: false };
<ArtworkCard {...artwork} />
```

### 수신(자식 쪽)

함수 컴포넌트는 **첫 번째 매개변수**로 props 객체를 받는다.

```jsx
function ArtworkCard(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.artist}</p>
    </article>
  );
}
```

보통은 **구조 분해**로 필요한 키만 꺼내 쓴다.

```jsx
function ArtworkCard({ title, artist, isPublic = false }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{artist}</p>
      {isPublic ? <span>공개</span> : null}
    </article>
  );
}
```

`isPublic = false`처럼 **기본값**은 구조 분해 안에서 지정할 수 있다. (부모가 해당 prop을 안 넘기면 이 값이 쓰인다.)

나머지를 한꺼번에 모으려면 `...rest`를 쓴다.

```jsx
function Box({ title, ...rest }) {
  return <div {...rest}>{title}</div>;
}
```

## `children`

여는/닫는 태그 **사이에 둔 JSX**는 특별한 prop인 **`children`**으로 넘어온다.

```jsx
function Panel({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="body">{children}</div>
    </section>
  );
}

<Panel title="공지">
  <p>오늘 점검 있습니다.</p>
</Panel>;
```

`children`은 하나의 노드일 수도, 여러 노드·배열일 수도 있다.

## props는 읽기 전용이다

자식 컴포넌트 안에서 **props 객체를 바꾸거나**, props로 받은 **객체·배열의 내용을 직접 수정(mutation)** 해서는 안 된다. “화면에 보여 줄 값”은 부모가 다시 렌더할 때 **새 props**로 내려주도록 하는 것이 규칙에 맞다.

```jsx
// 나쁜 예: 자식이 props를 직접 고침
function Bad({ artwork }) {
  artwork.title = "다른 제목"; // props로 받은 객체를 mutate — 피할 것
  return <span>{artwork.title}</span>;
}
```

## 상태(state) 변경은 누가 하나? — props와의 관계

**props**와 **state**를 헷갈리지 않게 정리하면 다음과 같다.

| | props | state (`useState` 등, 5장) |
|---|--------|---------------------------|
| **주인** | 부모가 넘겨 준다 | 해당 컴포넌트가 소유 |
| **자식이 직접 바꿀 수 있나** | 아니오(읽기만) | 예(setter로 갱신) |
| **바뀌면** | 부모가 다시 그리면서 새 값을 넘김 | 그 컴포넌트가 다시 그려짐 |

**화면에 보이는 데이터를 바꾸는 두 가지 길**을 구분하면 된다.

1. **값이 부모가 갖고 있다**  
   - 부모는 `useState` 등으로 **state**를 갖고, state를 바꾼다(`setX(...)`).  
   - 부모가 다시 렌더되며 자식에게 **새 props**가 전달된다.  
   - 자식은 props만 읽는다.

2. **값이 이 컴포넌트만 쓴다**  
   - 이 컴포넌트 안에서 `useState`로 state를 두고 setter로 바꾼다.  
   - props와 무관하게 자기 화면만 갱신할 수 있다.

즉, **“props를 바꾼다”**는 표현보다 **“부모의 state를 바꿔서, 내려오는 props가 바뀌게 한다”**가 맞다.

## 자식이 “바꿔 달라”고 요청하는 방법(미리보기)

자식이 직접 props를 수정할 수는 없지만, 부모가 **함수를 props로 내려주면** 자식은 그 함수를 **호출**해서 부모에게 “이렇게 바꿔 주세요”라고 알릴 수 있다. 이 패턴이 **콜백 prop**이고, 폼·버튼 이벤트에서 자주 쓴다(4장 이벤트, 5장 state와 이어짐).

```jsx
function Parent() {
  const [title, setTitle] = useState("초기 제목");

  return (
    <Child title={title} onTitleChange={(next) => setTitle(next)} />
  );
}

function Child({ title, onTitleChange }) {
  return (
    <button type="button" onClick={() => onTitleChange("새 제목")}>
      현재: {title} (클릭 시 부모 state 변경)
    </button>
  );
}
```

여기서 `title`은 **props**, `setTitle`으로 바뀌는 값은 **부모의 state**다. 자식은 `onTitleChange`만 호출할 뿐, props 객체를 직접 고치지 않는다.

## Live 예제

아래 Live 영역의 카드는 **부모가 넘긴 것과 같은 값**(`title`, `artist`, `imageUrl`, `isPublic`)을 props로 받는 패턴을 화면에 구현해 둔 것이다. 예제 앱 코드에서는 등록 컴포넌트 안쪽에서 그 값들이 고정되어 있지만, 실제 앱에서는 위처럼 부모 JSX에서 속성으로 넘기면 동일하게 동작한다.

```react-live
react.props.artworkCard
```

## 요약

- **props**는 부모가 커스텀 컴포넌트 태그에 적은 속성들이 모인 **읽기 전용** 객체다.
- 문자열/표현식/`{...spread}`/`children`으로 전달하고, 자식은 **`props` 또는 구조 분해**로 받는다.
- **상태 변경**은 props를 직접 고치는 것이 아니라, **state를 가진 쪽(보통 부모)** 이 setter로 바꾸고 → 다시 렌더 → **새 props**가 내려오게 한다.
- 자식이 값 변경에 참여하려면 **`onSomething` 같은 함수 props**로 부모의 state 갱신을 요청한다.
