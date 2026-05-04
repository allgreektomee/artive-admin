# 9장. React Router

> **reactTestProject** 전체 파일·트리·원문은 **[16장 샘플 예제 분석](/dev?tab=react&rd=16-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

SPA(Single Page Application)는 **페이지 전체를 새로고침하지 않고** URL만 바꾸며 화면을 전환한다. **React Router**는 URL과 **컴포넌트 트리의 일부**를 매칭해, “지금 이 경로에서는 어떤 화면을 그릴지”를 선언적으로 적게 해 준다. 이 장은 v6 계열 기준 개념이다(현재 프로젝트의 `react-router-dom` 버전에 맞춰 API 이름을 확인하면 된다).

## `BrowserRouter`

앱 최상위(보통 `main.jsx`에서 `App`을 감싼다)에 둔다. **HTML5 History API**(`pushState`)로 주소를 바꾼다. 서버 설정에서 **`/artworks` 같은 경로로 직접 들어와도 `index.html`을 내려주는** 폴백이 필요하다(운영 Nginx/WAS 설정).

## `Routes`와 `Route`

```jsx
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/artworks" element={<ArtworkListPage />} />
  <Route path="/artworks/new" element={<ArtworkPostPage />} />
  <Route path="/artworks/:id/edit" element={<ArtworkEditPage />} />
</Routes>
```

- **`path`** — URL 패턴. `:id` 는 **동적 세그먼트**다.
- **`element`** — 해당 경로에서 마운트할 React 노드.

**매칭 우선순위**는 더 구체적인 경로가 위에 오도록 정리하는 습관이 좋다.

## `Link`와 `NavLink`

- **`Link`** — `<a href>` 대신 **클라이언트 내비게이션**. 전체 리로드 없음.
- **`NavLink`** — 현재 경로와 일치할 때 **className·스타일**을 다르게 줄 수 있어 메뉴에 흔하다.

```jsx
<Link to="/artworks/new">등록</Link>
<NavLink to="/artworks" className={({ isActive }) => (isActive ? "on" : "")}>
  목록
</NavLink>
```

## `useNavigate`

프로그램에서 “이동”할 때 — 폼 저장 후 목록으로, 로그인 후 대시보드로.

```jsx
const navigate = useNavigate();
navigate("/artworks");
navigate(-1); // 뒤로
```

## `useParams`

`/artworks/:id/edit` 에서 `id` 값 읽기.

```jsx
const { id } = useParams();
// 수정 모드에서 id로 상세 fetch
```

## 중첩 라우트와 `Outlet`

관리자 **레이아웃**(헤더·사이드바 고정, 안쪽만 바뀜)에 쓴다.

```jsx
<Route path="/admin" element={<AdminLayout />}>
  <Route path="artworks" element={<ArtworkListPage />} />
  <Route path="artworks/new" element={<ArtworkPostPage />} />
</Route>
```

`AdminLayout` 안에 **`Outlet`** 을 두면, 자식 `Route`의 `element`가 그 자리에 렌더된다.

## 404와 리다이렉트

- 존재하지 않는 경로 — `path="*"` 로 **NotFound** 페이지.
- 로그인 필요 — **래퍼 라우트**에서 세션 확인 후 `Navigate to="/login"` 또는 `Outlet`만 허용(11장).

## 이 프로젝트와 연결

실제 코드는 `src/App.tsx`, 레이아웃은 `PublicLayout`, `AdminLayout` 등을 참고하면 “URL 한 단마다 어떤 트리가 깔리는지”를 추적할 수 있다.

## 요약

- **BrowserRouter** + **Routes/Route** 로 URL ↔ 화면을 선언한다.
- **Link/NavLink** 로 이동, **useNavigate** 로 코드에서 이동.
- **useParams** 로 동적 id, **Outlet** 으로 중첩 레이아웃.
- 운영에서는 **직접 URL 진입** 시에도 SPA가 뜨도록 서버 폴백을 맞춘다.
