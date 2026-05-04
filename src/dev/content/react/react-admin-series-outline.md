# React JavaScript 실무 연재 목차

이 연재는 React를 처음 배우는 사람이 JavaScript만으로 따라올 수 있게 구성한다. **앞쪽 1~8장은 `/dev` React 탭의 Live 예제 순서와 맞춘다.** 개념을 짧게 짚은 뒤 “이번 장에서 쓰는 예제가 이렇게 연결된다”로 이어진다. 9장 이후는 라우팅·API·폼·이미지·전역 상태 등 `src/etc`·`reactTestProject` 흐름을 참고한 실무 파트다. WebSocket·실시간은 **선택(15장)** 으로 두어도 전체 이해에 지장 없다.

## 시리즈 목표

React 문법을 외우는 것이 아니라 **“기본기 → 같은 맥락의 예제에서 어떻게 쓰이는지”**를 익힌다.

- **로그인까지 전부 돌려 보는 것은 필수가 아니다.** `/dev?tab=react`에서 각 장 본문·Live 실행·(같은 페이지에서 펼칠 수 있는) **전체 예제 소스**로 따라올 수 있다.
- **실전에 가깝게 가고 싶을 때**: JavaScript 참고 트리 `src/dev/reactTestProject/`(README 참고) · 데모 경로 [`/dev/react-test/artworks`](/dev/react-test/artworks) (목록·상세 조회, 수정·삭제·등록은 alert 처리)를 쓴다. 토큰이 있으면 API 목록·상세가 동작한다.
- 총 16장: **1~8장 = Live 예제 8개와 동일 순서**, 9~14장 = 라우터·API·인증(개념)·폼·Redux·이미지, **15장 WebSocket = 선택**, 16장 = 작은 앱으로 정리.

실제 운영 정적 사이트에서는 작품 **목록**과 **상세**가 이미 함께 제공된다. 서버 Read·라우팅을 말할 때는 “목록에서 찾고, 상세에서 본다”는 흐름을 기준으로 보면 된다.

- React 컴포넌트·JSX·props·이벤트·상태·모듈 나누기·`useEffect`·훅 조합을 **예제 순서대로** 익힌다.
- React Router로 여러 화면을 연결한다.
- API 모듈·`axios`/인증 헤더 개념을 익힌다. (로그인 구현은 **장 11에서 다루되, 시리즈 완주 조건은 아님**.)
- Redux Toolkit·이미지 업로드·정렬 등 관리자 패턴을 익힌다.
- 마지막에는 배운 구조를 작은 JavaScript 앱 단위로 정리한다. (WebSocket은 생략 가능.)

## 예제 기준

연재 예제는 JavaScript 기준으로 작성한다.

```text
파일 확장자: .jsx / .js
타입 문법: 사용하지 않음
UI 라이브러리: 처음에는 순수 HTML/CSS 중심
실무 파트: 현재 프로젝트 src/etc 흐름 참고
```

## 예제 코드·링크 (1~8장 = Live 데모 순서)

학습 페이지 **React 탭 홈**에서도 `src/dev/reactTestProject` 참고 트리를 **폴더별로** 펼쳐 볼 수 있다. 각 장 본문에는 해당 Live ID와 연결된 설명·실행 영역이 있다.

| 장 | Live 예제 ID | 본문으로 이동 |
|----|----------------|---------------|
| 1장 | `react.component.basic` | [`/dev?tab=react&rd=01-what-is-react`](/dev?tab=react&rd=01-what-is-react) |
| 2장 | `react.jsx.greeting` | [`/dev?tab=react&rd=02-jsx-and-components`](/dev?tab=react&rd=02-jsx-and-components) |
| 3장 | `react.props.artworkCard` | [`/dev?tab=react&rd=03-props`](/dev?tab=react&rd=03-props) |
| 4장 | `react.event.click` | [`/dev?tab=react&rd=04-react-events`](/dev?tab=react&rd=04-react-events) |
| 5장 | `react.state.counter` | [`/dev?tab=react&rd=05-state-usestate`](/dev?tab=react&rd=05-state-usestate) |
| 6장 | `react.module.artworkExplorer` | [`/dev?tab=react&rd=06-component-modularization`](/dev?tab=react&rd=06-component-modularization) |
| 7장 | `react.effect.lifecycle` | [`/dev?tab=react&rd=07-lifecycle-useeffect`](/dev?tab=react&rd=07-lifecycle-useeffect) |
| 8장 | `react.hooks.showcase` | [`/dev?tab=react&rd=08-hooks-overview`](/dev?tab=react&rd=08-hooks-overview) |

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

**이 장에서 쓰는 Live 예제**: ID `react.effect.lifecycle` — [본문·실행](/dev?tab=react&rd=07-lifecycle-useeffect)

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

예제 목표:

```text
useRef(포커스), useMemo(필터 합), useReducer(카운터)를 한 화면에서 확인한다.
```

**이 장에서 쓰는 Live 예제**: ID `react.hooks.showcase` — [본문·실행](/dev?tab=react&rd=08-hooks-overview)

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
2. API 함수 분리
3. loading, error, data 상태
4. 요청 실패 처리
5. `FormData` 업로드 요청
6. 토큰을 요청 헤더에 붙이기

예제 목표:

```text
artworkApi.js와 useArtwork.js를 만들어 목록 조회, 저장, 삭제를 분리한다.
```

참고 코드:

```text
src/etc/api/client.ts
src/etc/api/artworkApi.ts
src/etc/api/commonApi.ts
src/etc/hooks/useArtwork.ts
```

## 11장. 로그인과 인증 흐름

실무 앱에서 자주 필요한 로그인 흐름을 만든다. **연재 시리즈를 끝까지 ‘구동’하는 데 있어 로그인 구현은 필수는 아니다.** 다만 API·쿠키·토큰을 배울 때 참고로 두면 좋다.

1. 로그인 폼
2. 로그인 API 호출
3. 토큰 저장
4. 새로고침 후 로그인 복원
5. 로그아웃
6. 인증이 필요한 라우트 보호
7. 권한별 메뉴 표시

예제 목표:

```text
LoginPage, AuthProvider, ProtectedRoute를 만든다.
```

참고 코드:

```text
src/etc/pages/LoginPage.tsx
src/etc/hooks/useUser.ts
src/etc/components/layout/AdminLayout.tsx
```

## 12장. 폼과 등록·수정 화면

입력값이 많은 관리자 폼을 JavaScript 버전으로 만든다.

1. controlled input
2. select, checkbox, textarea
3. 검증 메시지
4. 등록 모드와 수정 모드
5. `useParams`로 id 읽기
6. 수정 데이터 불러오기
7. 저장 payload 만들기

예제 목표:

```text
ArtworkForm으로 등록과 수정을 같이 처리한다.
```

참고 코드:

```text
src/etc/pages/ArtworkPost.tsx
src/etc/pages/HistoryPost.tsx
```

## 13장. Redux Toolkit

컴포넌트 상태와 전역 상태를 구분하고, Redux Toolkit으로 전역 상태를 관리한다.

1. 전역 상태가 필요한 순간
2. Redux 기본 개념, store, action, reducer
3. Redux Toolkit이 줄여주는 코드
4. `configureStore`
5. `createSlice`
6. `useSelector`
7. `useDispatch`
8. 비동기 요청과 `createAsyncThunk`
9. 인증 상태와 아트워크 목록 상태를 slice로 나누기

예제 목표:

```text
authSlice와 artworkSlice를 만들고 로그인 상태와 아트워크 목록을 전역으로 관리한다.
```

## 14장. 이미지 업로드와 정렬

관리자 화면의 실무 기능인 이미지 업로드와 순서 정렬을 만든다.

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

## 15장. (선택) WebSocket과 실시간 UI

시리즈 필수는 아니다. 로그인·Live 예제·`reactTestProject` 만으로도 실무 입문 축은 충분하다. 실시간만 다루고 싶을 때 읽는다.

채팅 또는 실시간 알림처럼 서버와 연결을 유지하는 기능을 다룬다.

1. WebSocket 기본
2. 연결, 메시지 수신, 메시지 전송
3. `useRef`로 socket 보관
4. 연결 종료 처리
5. 재연결 전략
6. 메시지 목록 상태 관리
7. 채팅 UI 만들기

예제 목표:

```text
useChatSocket 훅과 AdminChatPage JavaScript 버전을 만든다.
```

참고 코드:

```text
src/etc/hooks/useChatWebSocket.ts
src/etc/chat/chatWsTypes.ts
src/etc/pages/AdminChatPage.tsx
```

## 16장. 작은 관리자 앱으로 마무리

지금까지 배운 내용을 합쳐 작은 JavaScript 버전 관리자 앱을 만든다.

구성 (로그인·채팅은 **권장 선택** — 미니 앱만 정리해도 목표 달성):

1. (선택) 로그인 — 장 11 참고
2. 관리자 레이아웃
3. 아트워크 목록
4. 아트워크 등록·수정
5. 이미지 업로드
6. Redux Toolkit 상태 관리
7. (선택) WebSocket 채팅 맛보기 — 15장

**실제 구동 중인 공개 `/art` 코드(`src/art`)**는 zip으로 받을 수 있다: [`/dev/art/art-site-source.zip`](/dev/art/art-site-source.zip)

위 7가지 주제만 적어 둔 **요약 문서**: [`/dev/react/16-capstone-topics.md`](/dev/react/16-capstone-topics.md)

목표는 실제 프로젝트 코드를 그대로 복사하는 것이 아니라, 같은 구조를 더 작은 JavaScript 예제로 재현하는 것이다.
