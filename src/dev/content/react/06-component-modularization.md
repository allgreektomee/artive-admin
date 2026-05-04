# 6장. 컴포넌트 모듈화

> **reactTestProject**: 본문 **맨 아래**에 이 장과 연결된 파일 **전체 원문**(색 구문 강조)이 붙습니다. React 탭 홈 「소스 보기」에서도 같은 파일을 고를 수 있습니다.

화면이 커질수록 **한 파일·한 함수에 모든 JSX를 넣는 방식**은 읽기·수정·테스트가 어려워진다. **모듈화**는 “UI 조각을 어디까지 하나의 단위로 묶을지”와 “파일·폴더에 어떻게 나눌지”를 정하는 작업이다. 이번 장에서는 나누는 **이유·기준·폴더 감각·export 규칙·props drilling** 까지 정리한다.

## 왜 나누나

1. **한 눈에 들어오는 크기** — 함수·파일이 짧을수록 역할이 분명해진다.
2. **재사용** — 검색창, 카드, 빈 화면 메시지 등을 다른 페이지에서도 쓸 수 있다.
3. **병렬 작업** — 팀원이 서로 다른 컴포넌트 파일을 수정할 때 충돌이 줄어든다.
4. **테스트·스토리북** — 작은 단위로 격리해 동작을 검증하기 쉽다.

나누는 데 비용도 있다. 파일이 너무 잘게 쪼개지면 **뛰어다니며 읽는 비용**이 커진다. “항상 최선인 분해”는 없고, 팀 규모와 화면 복잡도에 맞는 **균형**을 맞춘다.

## 언제 하나의 컴포넌트를 자를까 (휴리스틱)

- **이름을 붙일 수 있는 UI 덩어리** — “검색 바”, “작품 카드”, “빈 목록 안내”처럼 말로 설명할 수 있으면 후보다.
- **같은 패턴이 두 번 이상** 반복되면 추출을 검토한다.
- **state와 이벤트가 한 덩어리**로 묶이면 그 경계를 컴포넌트로 두기 쉽다.
- 반대로 **한 페이지만 쓰는 5줄짜리**를 억지로 파일로 쪼개지 않아도 된다.

## 폴더 구조 감각 (`src/etc` 같은 프로젝트)

실무에서는 대략 다음처럼 역할을 나눈다.

| 폴더 | 용도 |
|------|------|
| `pages` 또는 `views` | 라우트 단위 화면. 데이터를 불러와 배치하는 **껍데기**에 가깝다. |
| `components` | 여러 페이지에서 쓰는 UI 조각. 도메인별 하위 폴더(`artwork`, `layout`)를 두기도 한다. |
| `hooks` | `useArtworkList`, `useDebounce`처럼 **상태·부수 효과 로직**만 모은다. |
| `api` | `fetch`/`axios` 호출, URL·쿼리 조립. 화면에서는 이 함수들만 부른다. |

**절대 규칙은 없다.** 중요한 것은 “어디에 무엇이 있는지”가 팀 안에서 일관되는 것이다.

## default export vs named export

```jsx
// ArtworkCard.jsx — default: 파일당 하나의 ‘주인’ 컴포넌트일 때 흔함
export default function ArtworkCard(props) { ... }

// SearchBar.jsx — named: 한 파일에서 여러 개를 내보낼 때
export function SearchBar(props) { ... }
export function SearchClearButton() { ... }
```

- **default** — `import ArtworkCard from "./ArtworkCard.jsx"` 처럼 이름을 바꿔 받기 쉽다. 다만 “이 파일의 주요 export가 무엇인가”를 파일마다 기억해야 한다.
- **named** — `import { SearchBar } from "./SearchBar.jsx"` 리팩터링·자동 완성에 유리한 경우가 많다.

팀 컨벤션을 하나 골라 통일하는 것이 좋다.

## `index.js` / 배럴(barrel) 파일

`components/artwork/index.js`에서 여러 컴포넌트를 다시 내보내면 import 경로가 짧아진다.

```jsx
// components/artwork/index.js
export { ArtworkCard } from "./ArtworkCard.jsx";
export { ArtworkRow } from "./ArtworkRow.jsx";
```

단점: **쓰지 않는 코드까지 번들에 들어갈 위험**(트리 쉐이킹이 막히는 경우)이 있어, 규모가 커지면 배럴을 과용하지 않는 팀도 있다.

## props drilling

**깊은 트리**에서 같은 값을 여러 단계에 걸쳐 props로만 전달하는 것을 **props drilling**이라 한다. 중간 컴포넌트들은 그 값을 쓰지 않아도 **전달 통로** 역할만 한다.

완화 방법은 나중 장에서 다룬다.

- **합성(composition)** — `children`이나 슬롯처럼 중간 단계를 건너뛰게 배치(React 공식 문서의 “children 패턴”).
- **상태 끌어올리기** — 이미 5장에서: 공통 부모에서 state를 두고 필요한 자식에만 나눠 준다.
- **Context** — 테마, 로그인 사용자 등 **진짜로 여러 깊이에 필요한 값**(8장, 11장).
- **전역 스토어(Redux 등)** — 많은 화면이 같은 도메인 데이터를 공유할 때(13장).

drilling이 **2~3단** 정도면 그대로 두는 경우가 많고, **고통스러워질 때** 위 도구를 꺼낸다.

## 파일 이름과 colocation

- 컴포넌트 파일명은 **PascalCase**(`ArtworkCard.jsx`)가 흔하다.
- 특정 페이지에서만 쓰는 하위 컴포넌트를 **`pages/ArtworkListPage/` 아래**에 두는 **colocation**(같이 두기)도 자주 쓰인다. “전역 재사용”이 아니면 `components` 뿌리에 올리지 않는다.

## Live 예제

한 파일 안에서 **검색창 / 행 / 빈 상태**를 나눈 뒤, 부에 페이지 역할의 컴포넌트가 이들을 조립하는 패턴을 볼 수 있다. 실무에서는 각 블록을 **별도 파일**로 옮기면 된다.

```react-live
react.module.artworkExplorer
```

## 요약

- 모듈화는 **읽기·재사용·협업**을 위해 UI를 경계 있게 나눈다.
- `pages` / `components` / `hooks` / `api` 는 역할 나누기의 한 가지 예시다.
- **default vs named export**, **index 배럴**은 팀 규칙에 맞춘 편이 낫다.
- **props drilling**은 합성·Context·스토어 등으로 단계적으로 완화한다.
- 전역이 아닌 조각은 **페이지 옆 colocation**도 후보다.
