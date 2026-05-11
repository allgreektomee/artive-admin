# 9장. React Router

> **reactTestProject** 전체 파일·트리·원문은 **[14장 샘플 예제 분석](/dev?tab=react&rd=14-sample-app-walkthrough)** 에서 본다. 이 장은 Live·개념 위주다.

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
- 로그인 필요 — **래퍼 라우트**에서 세션 확인 후 `Navigate to="/login"` 또는 `Outlet`만 허용(보관 [`11-auth-flow`](./_archive/11-auth-flow.md)·`LoginPage` 참고).

## 이 프로젝트와 연결

실제 코드는 `src/App.tsx`, 레이아웃은 `PublicLayout`, `AdminLayout` 등을 참고하면 “URL 한 단마다 어떤 트리가 깔리는지”를 추적할 수 있다.

## 배포·정적 호스팅에서의 라우팅

로컬에서는 `npm run dev`가 내부적으로 `index.html`을 골라 줘서 `/artworks/edit/3`처럼 새로고침해도 잘 나온다고 느낄 수 있다. **빌드 산출물**(`dist` 등)을 nginx, S3·CloudFront 정적 배킷, GitHub Pages처럼 **정적 파일 서버**만으로 올리면, 서버는 **요청 경로에 해당하는 파일이 없을 때 404**를 돌려 주는 경우가 많다. 그 상태에서 주소창에 깊은 경로를 직접 치거나 새로고침하면 **SPA가 아니라 404 HTML**이 뜰 수 있다.

실무에서 흔한 대응은 다음과 같다.

1. **`try_files` / SPA 폴백** — 존재하는 정적 파일이 없으면 **`index.html` 한 번 더 시도**(nginx `try_files $uri /index.html` 계열).
2. **배포 플랫폼별 리라이트 규칙** — 같은 의미로 “모든 경로를 index로” 같은 설정을 둔다.
3. **`<BrowserRouter basename={...}>`** — 자산이 **`https://예시.com/admin/`처럼 하위 경로**에 붙일 때 **`basename`** 을 맞추지 않으면 자산 URL·매칭이 어긋난다. `import.meta.env.BASE_URL`(Vite) 등 빌드 시스템이 주는 접두와 일치하는지 확인한다.
4. **API 주소** — 프로덕션에서 `fetch` 대상이 **같은 출처**가 아니면 CORS·프록시를 이미 10장에서 다룬 것처럼 맞춘다. **환경 변수**(`VITE_API_ORIGIN` 등)로 개발/운영을 나누는 팀이 많다.

이 연재는 배포 스크립트까지 자동화하지 않지만, “라우터를 쓰는 SPA를 올릴 때 **서버가 index를 돌려줘야 한다**”는 점만 기억해 두면 현장 이슈의 절반은 줄어든다.

## 요약

- **BrowserRouter** + **Routes/Route** 로 URL ↔ 화면을 선언한다.
- **Link/NavLink** 로 이동, **useNavigate** 로 코드에서 이동.
- **useParams** 로 동적 id, **Outlet** 으로 중첩 레이아웃.
- 운영에서는 **직접 URL 진입** 시에도 SPA가 뜨도록 서버 폴백을 맞춘다.
