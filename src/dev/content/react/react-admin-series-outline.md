# React JavaScript 실무 연재 목차

이 연재는 React를 처음 배우는 사람이 JavaScript만으로 따라올 수 있게 구성한다. **앞쪽 1~7장은 `/dev` React 탭 Live 예제와 1:1로 짝을 맞추고, 8장은 훅별 기본 Live가 여러 블록이다.** 개념을 짧게 짚은 뒤 “이번 장에서 쓰는 예제가 이렇게 연결된다”로 이어진다. 9장 이후는 라우팅·API·폼·이미지·전역 상태 등 `src/etc`·`reactTestProject` 흐름을 참고한 실무 파트다. 로그인·WebSocket 등 일부 주제는 **`react/_archive/`에만 보관**해 두었다.

## 시리즈 목표

React 문법을 외우는 것이 아니라 **“기본기 → 같은 맥락의 예제에서 어떻게 쓰이는지”**를 익힌다.

- **로그인까지 전부 돌려 보는 것은 필수가 아니다.** `/dev?tab=react`에서 각 장 본문·Live 실행으로 따라올 수 있다. **JavaScript 샘플 전체 원문·파일 트리**는 **[14장](/dev?tab=react&rd=14-sample-app-walkthrough)** 에만 모아 두었다.
- **실전에 가깝게 가고 싶을 때**: `reactTestProject` · 데모 [`/dev/react-test/artworks`](/dev/react-test/artworks) (목록·상세 조회, 일부 버튼은 alert). 기본 API 베이스로 요청이 나가며, 로그인 없이도 읽기 흐름을 볼 수 있다.
- 총 **공개 14장**(본문 파일 `01`~`14`): **1~7장은 Live 예제 순서와 1:1**, **8장**은 테마 Context·callback/memo·`memo`/props 분리·Context+reducer·쇼케이스 등 **훅·최적화 패턴 확인용 Live가 여러 블록**, 9장 이후는 라우터·API·폼·Redux·이미지·샘플 분석 순이다. **10장**에는 JSONPlaceholder `fetch`, Artive 목록 요청, API 맥락 **`useContext`·`useCallback`/`memo`**, 그리고 **localStorage·JSON 저장** Live가 있다. **14장**은 `reactTestProject` 샘플 전체 분석(소스 트리·원문). 로그인·WebSocket 원고는 [`react/_archive/`](./_archive/README.md) 에만 남긴다.

실제 운영 정적 사이트에서는 작품 **목록**과 **상세**가 이미 함께 제공된다. 서버 Read·라우팅을 말할 때는 “목록에서 찾고, 상세에서 본다”는 흐름을 기준으로 보면 된다.

- React 컴포넌트·JSX·props·이벤트·상태·모듈 나누기·`useEffect`·훅 조합을 **예제 순서대로** 익힌다.
- React Router로 여러 화면을 연결한다.
- API 모듈·`axios`/Bearer 헤더 개념을 익힌다. (로그인 구현은 공개 목차에서 빼 두었고, 필요하면 [`_archive/11-auth-flow.md`](./_archive/11-auth-flow.md)·`src/etc/pages/LoginPage.tsx`를 본다.)
- Redux Toolkit·이미지 업로드·정렬 등 관리자 패턴을 익힌다.
- 통합 흐름·전체 파일 원문은 [**14장**](/dev?tab=react&rd=14-sample-app-walkthrough)과 데모 [`/dev/react-test/artworks`](/dev/react-test/artworks)로 묶어 본다.

## 예제 기준

연재 예제는 JavaScript 기준으로 작성한다.

```text
파일 확장자: .jsx / .js
타입 문법: 사용하지 않음
UI 라이브러리: 처음에는 순수 HTML/CSS 중심
실무 파트: 현재 프로젝트 src/etc 흐름 참고
```

## 예제 코드·링크 (1~8장 Live 데모)

**React 탭 홈**에서는 장 목차·링크만 보이고, `reactTestProject` **파일 트리·전체 원문**은 **[14장](/dev?tab=react&rd=14-sample-app-walkthrough)** 에서 본다. 1~13장 본문에는 해당 Live ID와 연결된 설명·실행 영역이 있다.

| 장 | Live 예제 ID | 본문으로 이동 |
|----|----------------|---------------|
| 1장 | `react.component.basic` | [`/dev?tab=react&rd=01-what-is-react`](/dev?tab=react&rd=01-what-is-react) |
| 2장 | `react.jsx.greeting` | [`/dev?tab=react&rd=02-jsx-and-components`](/dev?tab=react&rd=02-jsx-and-components) |
| 3장 | `react.props.artworkCard` | [`/dev?tab=react&rd=03-props`](/dev?tab=react&rd=03-props) |
| 4장 | `react.event.click` | [`/dev?tab=react&rd=04-react-events`](/dev?tab=react&rd=04-react-events) |
| 5장 | `react.state.counter` | [`/dev?tab=react&rd=05-state-usestate`](/dev?tab=react&rd=05-state-usestate) |
| 6장 | `react.module.artworkExplorer` | [`/dev?tab=react&rd=06-component-modularization`](/dev?tab=react&rd=06-component-modularization) |
| 7장 | `react.effect.lifecycle`, `react.effect.depsCompare` | [`/dev?tab=react&rd=07-lifecycle-useeffect`](/dev?tab=react&rd=07-lifecycle-useeffect) |
| 8장 | `react.hooks.contextBasic`, `react.hooks.callbackMemoBasic`, `react.optimize.memoProp`, `react.pattern.contextReducer`, `react.hooks.showcase` | [`/dev?tab=react&rd=08-hooks-overview`](/dev?tab=react&rd=08-hooks-overview) |
| 10장 | `react.api.jsonFetch`, `react.api.artiveArtworks`, `react.api.sharedContext`, `react.api.memoCallback`, `react.storage.draftTags` | [`/dev?tab=react&rd=10-api-modules`](/dev?tab=react&rd=10-api-modules) |
| 11장 | `react.form.artworkDraft` | [`/dev?tab=react&rd=11-forms-crud`](/dev?tab=react&rd=11-forms-crud) |

소스 파일(저장소): `src/dev/liveExamples/reactExamples.jsx` · JS 참고 트리: `src/dev/reactTestProject/` (README에 경로 설명).

## 1장. React가 무엇인지 이해하기

React를 시작하기 전에 필요한 개념을 잡는다.

1. React는 라이브러리인가 프레임워크인가
2. React가 해결하려는 문제, 화면과 상태
3. DOM 직접 조작과 React 방식의 차이
4. Vite로 React 프로젝트 만들기
5. `main.jsx`, `App.jsx`의 역할

예제 목표:

```text
빈 React 앱을 만들고 App 컴포넌트에 첫 화면을 출력한다.
```

**이 장에서 쓰는 Live 예제**: ID `react.component.basic` — [본문·실행](/dev?tab=react&rd=01-what-is-react)

## 2장. JSX와 컴포넌트

React의 기본 단위인 컴포넌트를 배운다.

1. JSX는 JavaScript 안에서 UI를 표현하는 문법이다.
2. 컴포넌트는 UI 조각을 반환하는 함수다.
3. 컴포넌트 이름은 대문자로 시작한다.
4. 하나의 컴포넌트는 하나의 루트 값을 반환한다.
5. 조건부 렌더링과 리스트 렌더링의 기초

예제 목표:

```text
Header, ProfileCard, ArtworkCard 컴포넌트를 만든다.
```

**이 장에서 쓰는 Live 예제**: ID `react.jsx.greeting` — [본문·실행](/dev?tab=react&rd=02-jsx-and-components)

## 3장. props

부모 컴포넌트가 자식 컴포넌트에 값을 전달하는 방법을 다룬다.

1. props의 정의
2. 문자열, 숫자, 불리언, 배열, 객체 전달
3. props 구조 분해
4. 기본값 처리
5. children으로 내부 콘텐츠 전달
6. props는 자식이 직접 바꾸지 않는다.

예제 목표:

```text
ArtworkCard에 title, artist, imageUrl, isPublic 값을 props로 전달한다.
```

**이 장에서 쓰는 Live 예제**: ID `react.props.artworkCard` — [본문·실행](/dev?tab=react&rd=03-props)

## 4장. React 이벤트

사용자의 행동에 반응하는 방법을 배운다.

1. `onClick`, `onChange`, `onSubmit`
2. 이벤트 핸들러 함수 분리
3. 이벤트 객체 읽기
4. 폼 제출에서 `preventDefault()`
5. 부모 콜백으로 자식 이벤트 올리기

예제 목표:

```text
검색 input, 공개 여부 toggle, 삭제 버튼 이벤트를 만든다.
```

**이 장에서 쓰는 Live 예제**: ID `react.event.click` — [본문·실행](/dev?tab=react&rd=04-react-events)

## 5장. 상태, `useState`

React에서 화면을 바꾸는 핵심인 상태를 다룬다.

1. 상태란 무엇인가
2. `useState` 기본 사용법
3. 상태 변경이 렌더링을 다시 일으키는 이유
4. 객체와 배열 상태 업데이트
5. 원본을 직접 바꾸면 안 되는 이유
6. 입력값을 상태와 연결하는 controlled component

예제 목표:

```text
카운터처럼 상태가 바뀔 때 화면이 갱신되는 흐름을 확인한다.
```

**이 장에서 쓰는 Live 예제**: ID `react.state.counter` — [본문·실행](/dev?tab=react&rd=05-state-usestate)

## 6장. 컴포넌트 모듈화

커지는 화면을 파일과 컴포넌트로 나누는 기준을 잡는다.

1. 컴포넌트를 나누는 이유
2. `components`, `pages`, `hooks`, `api` 폴더 감각
3. default export와 named export
4. index 파일을 사용할 때와 안 사용할 때
5. props drilling이 생기는 지점

예제 목표:

```text
검색·목록·빈 상태를 작은 컴포넌트로 나눈다 (파일 한 덩어리에서 패턴 연습).
```

**이 장에서 쓰는 Live 예제**: ID `react.module.artworkExplorer` — [본문·실행](/dev?tab=react&rd=06-component-modularization)

## 7장. 생명주기와 `useEffect`

컴포넌트가 화면에 나타나고, 업데이트되고, 사라지는 흐름을 이해한다.

1. 클래스 컴포넌트 생명주기 감각
2. 함수 컴포넌트에서는 `useEffect`로 부수 효과를 다룬다.
3. mount, update, unmount를 `useEffect`로 표현하기
4. dependency array
5. cleanup 함수
6. `useEffect`에서 자주 하는 실수

예제 목표:

```text
의존 배열·cleanup으로 로딩 시뮬레이션과 타이머를 다룬다.
```

**이 장에서 쓰는 Live 예제**: ID `react.effect.lifecycle`(로딩·인터벌), `react.effect.depsCompare`(의존 배열 세 가지 비교) — [본문·실행](/dev?tab=react&rd=07-lifecycle-useeffect)

## 8장. React 훅 종류별 정리

React에서 자주 쓰는 훅을 목적별로 정리한다.

1. `useState`: 컴포넌트 상태
2. `useEffect`: 부수 효과
3. `useRef`: DOM 참조와 렌더링과 무관한 값 보관
4. `useMemo`: 계산 결과 메모이제이션
5. `useCallback`: 함수 메모이제이션
6. `useReducer`: 복잡한 상태 전환
7. `useContext`: 전역처럼 공유하는 값
8. 커스텀 훅: 반복되는 상태 로직 분리
9. `React.memo`와 props 얕은 비교(언제 리렌더를 건너뜀)
10. Context에 `dispatch`만 싣는 패턴

예제 목표:

```text
테마 Context, 인라인 vs useCallback+memo, noise/version으로 memo 건너뛰기,
Context+useReducer 메모 목록, useRef·useMemo·useReducer 쇼케이스를 Live로 확인한다.
```

**이 장에서 쓰는 Live 예제**: ID `react.hooks.contextBasic` · `react.hooks.callbackMemoBasic` · `react.optimize.memoProp` · `react.pattern.contextReducer` · `react.hooks.showcase` — [본문·실행](/dev?tab=react&rd=08-hooks-overview)

## 9장. React Router

여러 페이지가 있는 React 앱을 만든다.

1. `BrowserRouter`
2. `Routes`와 `Route`
3. `Link`와 `NavLink`
4. `useNavigate`
5. `useParams`
6. 중첩 라우트와 `Outlet`
7. 없는 페이지와 리다이렉트
8. 관리자 레이아웃 라우팅
9. 정적 배포·SPA 폴백·`basename`과의 관계(개념)

예제 목표:

```text
/artworks, /artworks/new, /artworks/:id/edit 라우트를 만든다.
```

참고 코드:

```text
src/App.tsx
src/etc/pages/PublicLayout.tsx
src/etc/components/layout/AdminLayout.tsx
```

## 10장. 서버 연동과 API 모듈

화면 컴포넌트에서 API 호출 코드를 분리한다.

1. `fetch`와 `axios` 차이
2. **브라우저에서 JSON 처리 순서**(`res.ok`, `res.json()`)
3. API 함수 분리
4. loading, error, data 상태
5. **TanStack Query(React Query)와 SWR** — 캐시·재조회
6. 요청 실패 처리
7. `FormData` 업로드 요청
8. 토큰을 요청 헤더에 붙이기
9. **브라우저 저장소**로 가벼운 UI 상태 보관(localStorage·JSON·보안 감각)

예제 목표:

```text
artworkApi.js와 useArtwork.js를 만들어 목록 조회, 저장, 삭제를 분리한다.
localStorage 직렬화 Live로 저장·복원 흐름을 확인한다.
```

**이 장에서 쓰는 Live 예제**: ID `react.api.jsonFetch`(JSONPlaceholder) · `react.api.artiveArtworks`([Swagger UI](https://api.artivefor.me/swagger-ui/index.html)의 작품 목록 실요청) · `react.api.sharedContext`(`useContext`) · `react.api.memoCallback`(`useCallback` + `memo`) · `react.storage.draftTags`(localStorage·JSON) — [본문·실행](/dev?tab=react&rd=10-api-modules)

참고 코드:

```text
src/etc/api/client.ts
src/etc/api/artworkApi.ts
src/etc/api/commonApi.ts
src/etc/hooks/useArtwork.ts
```

## 11장. 폼과 등록·수정 화면

입력값이 많은 관리자 폼을 JavaScript 버전으로 만든다. 저장 요청은 [Swagger UI](https://api.artivefor.me/swagger-ui/index.html)의 `POST /api/v1/artworks`, `PUT /api/v1/artworks/{artworkId}` 등과 계약을 맞춘다.

1. controlled input
2. select, checkbox, textarea
3. 검증 메시지
4. 등록 모드와 수정 모드
5. `useParams`로 id 읽기
6. 수정 데이터 불러오기 — 응답 래퍼(`success`·`data`)를 풀어 state에 반영
7. 저장 payload 만들기 — 필드명을 스펙의 `ArtworkCreateRequest`·`ArtworkUpdateRequest`와 맞춘다

예제 목표:

```text
ArtworkForm으로 등록과 수정을 같이 처리한다.
```

**이 장에서 쓰는 Live 예제**: ID `react.form.artworkDraft` — [본문·실행](/dev?tab=react&rd=11-forms-crud)(Swagger 계약에 맞춘 payload 미리보기)

참고 코드:

```text
src/etc/pages/ArtworkPost.tsx
src/etc/pages/HistoryPost.tsx
```

## 12장. Redux Toolkit

컴포넌트 상태와 전역 상태를 구분하고, Redux Toolkit으로 전역 상태를 관리한다.

1. 전역 상태가 필요한 순간
2. Redux 기본 개념, store, action, reducer
3. Redux Toolkit이 줄여주는 코드
4. `configureStore`
5. `createSlice`
6. `useSelector`
7. `useDispatch`
8. 비동기 요청과 `createAsyncThunk`
9. 도메인별 slice 나누기 (예: 작품 목록). 인증 전역 상태가 필요하면 보관 원고·`src/etc` 코드를 참고한다.
10. 앱당 스토어 하나(싱글톤 패턴과의 유사·차이), 테스트에서의 store 재생성

예제 목표:

```text
artworkSlice 등 도메인 slice를 만들고, thunk로 목록을 불러와 로딩·에러·페이지 상태를 전역으로 관리한다.
```

## 13장. 이미지 업로드와 정렬

관리자 화면의 실무 기능인 이미지 업로드와 순서 정렬을 만든다. 업로드 경로는 Swagger의 `POST /api/v1/images/upload` 와 맞춘다.

1. file input
2. 미리보기 URL
3. `FormData` 업로드
4. 업로드된 이미지 URL 목록 상태
5. 이미지 삭제
6. 드래그 앤 드롭 정렬
7. 저장 payload에 이미지 순서 포함하기

예제 목표:

```text
ArtworkImageUploader와 SortableImageList를 만든다.
```

참고 코드:

```text
src/etc/hooks/useImageUpload.ts
src/etc/components/artwork/SortableItem.tsx
src/etc/pages/ArtworkPost.tsx
```

## 14장. 샘플 예제 분석 (reactTestProject)

1~13장 개념을 **한 바퀴 돌린 뒤**, 저장소의 JavaScript 참고 앱 `src/dev/reactTestProject` 를 파일 단위로 읽는다. 라우팅·API·훅·페이지·업로드·정렬이 어떻게 이어지는지, 화면 하단 **트리 + 원문**으로 따라간다. REST 명세는 [Swagger UI](https://api.artivefor.me/swagger-ui/index.html) 와 맞춰 보면 된다.

1. `App.jsx` 진입과 경로
2. `pages/*` 화면과 이벤트·state
3. `hooks/useArtwork.js` 데이터 흐름
4. `api/*` 모듈 경계
5. `useImageUpload` · `SortableItem`
6. 데모 경로로 실제 동작 확인

예제 목표:

```text
14장 본문과 하단 트리를 보며 샘플 프로젝트 전체 동작을 verbal로 설명할 수 있다.
```

**이 장에서 쓰는 문서**: [`/dev?tab=react&rd=14-sample-app-walkthrough`](/dev?tab=react&rd=14-sample-app-walkthrough) · 데모 [`/dev/react-test/artworks`](/dev/react-test/artworks) · API [Swagger UI](https://api.artivefor.me/swagger-ui/index.html)

## 부록. 로그인·WebSocket 보관 원고

`/dev` React 장 목차 번호에는 넣지 않고 **`react/_archive/`** 에만 둔다. 요약은 [`_archive/README.md`](./_archive/README.md) 참고.

- 로그인·인증: [`react/_archive/11-auth-flow.md`](./_archive/11-auth-flow.md) · 코드 참고 `src/etc/pages/LoginPage.tsx`
- WebSocket: [`react/_archive/15-websocket-realtime.md`](./_archive/15-websocket-realtime.md) · 코드 참고 `src/etc/hooks/useChatWebSocket.ts`
