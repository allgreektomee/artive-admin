# 16장. 샘플 예제 분석 (reactTestProject)

1~15장까지는 **개념·Live 예제** 위주로 잡고, 여기서는 저장소 안의 **`src/dev/reactTestProject`** 한 덩어리를 **어떻게 돌아가는지** 파일 단위로 정리한다. 각 소스 파일에는 **16장**을 염두에 둔 한국어 주석이 들어 있다. 아래 본문을 읽은 뒤, 화면 하단의 **파일 트리**에서 같은 경로를 눌러 **원문 전체**를 열어 보면 된다.

## API 스펙 (Swagger)

백엔드가 제공하는 **경로·메서드·요청/응답 모양**은 Swagger UI에서 바로 확인할 수 있다.

- **Swagger UI**: [https://api.artivefor.me/swagger-ui/index.html](https://api.artivefor.me/swagger-ui/index.html)

이 샘플 코드의 `api/artworkApi.js`(예: `GET/POST /artworks`, `GET/PUT/DELETE /artworks/{id}`)나 `api/commonApi.js`의 `POST /images/upload` 가 문서의 어떤 엔드포인트와 맞는지 펼쳐 보면, **화면에서 호출하는 함수 ↔ 서버 계약**을 한눈에 맞출 수 있다.

## 이 샘플이 하는 일

- **라우팅**: 목록 `/dev/react-test/artworks`, 상세 `/dev/react-test/artworks/:id` (`App.jsx`).
- **데이터**: `hooks/useArtwork.js` 가 목록·저장·삭제 등을 묶고, 상세 페이지는 같은 `artworkApi` 를 **페이지 안에서 직접** 호출해 두 패턴을 비교할 수 있다(일부 버튼은 연재용 `alert`).
- **HTTP**: `api/client.js` 공용 axios 인스턴스 + `artworkApi.js` / `commonApi.js` 에 **함수만** 모은다.
- **UI**: 목록·상세는 `pages/*.jsx`, 갤러리에서 쓰는 정렬 행은 `components/artwork/SortableItem.jsx` (`@dnd-kit`).
- **이미지**: `hooks/useImageUpload.js` 에서 브라우저에서 압축한 뒤 업로드 API로 보낸다.

모노레포 실제 진입은 `src/App.tsx` 에 같은 경로가 붙어 있다. 이 폴더만 복사해 쓸 때는 루트의 `App.jsx` 가 그 역할이다.

## 읽는 순서 제안 (상세)

### 1. `App.jsx` — 경로와 어떤 페이지가 붙는지

- **`BrowserRouter`** 로 SPA 전체를 감싼다.
- **`Routes` / `Route`** 로 URL 문자열과 컴포넌트를 1:1로 매핑한다.
- `/dev/react-test/artworks` → **`ArtworkListPage`**: 첫 화면, 목록·테이블·페이지네이션.
- `/dev/react-test/artworks/:id` → **`ArtworkDetailPage`**: URL의 `id` 파라미터로 상세 조회.
- 그 외 모든 path → **`Navigate`** 로 목록으로 보내 잘못된 URL을 정리한다.
- 여기에는 레이아웃·헬멧·인증 래퍼가 없다. “**라우트만 최소로**” 보려는 연재용 껍데기다.

### 2. `ArtworkListPage.jsx` → `ArtworkDetailPage.jsx` — 화면·이벤트·state

- **목록**
  - `useArtwork()` 에서 `fetchArtworks`, `artworks`, `loading`, `error` 등을 받는다.
  - **`useEffect`** 로 마운트 직후 `fetchArtworks(0)` 을 한 번 호출해 첫 페이지 데이터를 채운다.
  - antd **`Table`** + `columns` 정의: 썸네일, 제목, 상태 태그, 행별 **상세/수정/삭제** 버튼. 상세만 `navigate(\`${LIST_BASE}/${record.id}\`)` 로 이동하고, 수정·삭제·신규 등록은 **alert** 로 막아 두었다(실무 경로는 alert 문구에 적음).
  - **페이지네이션** `onChange` 에서 `fetchArtworks(page - 1)` 로 서버 페이지 인덱스와 맞춘다.
- **상세**
  - **`useParams`** 로 문자열 `id` 를 받아 숫자로 바꾼 뒤 유효하지 않으면 404 류 UI.
  - **`useEffect`** 의존성 `[numericId]`: id 가 바뀔 때마다 `artworkApi.getArtworkDetail` 을 호출한다. **cleanup** 플래그(`cancelled`)로 느린 응답이 뒤늦게 도착해 obsolete state 를 쓰는 것을 막는다.
  - 목록과 달리 **커스텀 훅 없이** 페이지 로컬 `useState` + 직접 API 호출 — “**훅으로 모으기 vs 페이지에서 직접**” 차이를 읽을 수 있게 의도한 구조다.

### 3. `hooks/useArtwork.js` — API 호출 시점·`useEffect`·반환 값

- **`useState`** 로 `loading`, `artworks`, `totalElements`, `currentPage`, `imageList`, `error` 등을 들고 있다.
- **`fetchArtworks(page)`**: 목록용. `artworkApi.getMyArtworks` 응답의 `content`, `totalElements`, `number` 를 state에 반영한다. 목록 페이지의 `useEffect`와 페이지네이션에서만 호출된다.
- **`getArtworkForEdit(id)`**: 편집 폼 초기 로드용(실제 연재 UI에서는 목록이 alert 로 막혀 있어도, 훅 안 로직은 운영과 같은 형태). 상세 데이터 + `images` 배열을 맞춘다.
- **`saveArtwork` / `createArtwork` / `updateArtwork`**: 날짜 필드를 API payload 형태로 맞추고 `imageList` 를 붙인 뒤 POST 또는 PUT. **이미지 최소 1장** 검증 등이 여기 있다.
- **`deleteArtwork`**: 삭제 후 `fetchArtwork` 로 현재 페이지 목록을 다시 맞춘다.
- 훅 **반환 객체**에 위 동작과 state 세터가 모여 있어, 폼이 있는 화면에서는 이 한 객체만으로 데이터 레이어를 묶을 수 있다.

### 4. `api/client.js` → `api/artworkApi.js` — 요청이 어떻게 만들어지는지

- **`client.js`**
  - `axios.create({ baseURL, withCredentials })` 로 **단 하나의 인스턴스**를 쓴다. `VITE_API_BASE_URL` 이 없으면 기본 호스트(README 참고).
  - **요청 인터셉터**: `localStorage` 의 `accessToken` 이 있으면 `Authorization: Bearer` 를 붙인다. `FormData` 일 때는 `Content-Type` 을 건드리지 않도록 처리한다. 개발 모드에서는 콘솔 로그.
  - **응답 인터셉터**: 403/401 처리, 401 시 토큰 제거 후 로그인 경로로 보내는 등 **공통 정책**을 한곳에 둔다.
- **`artworkApi.js`**
  - 위 `client` 에 대해 **경로와 메서드만** 얇게 감싼다: 목록, 생성, 수정, 상세, 삭제. 화면/훅은 이 객체의 함수만 알면 된다.
- **`commonApi.js`**
  - `uploadImage`: `FormData` 로 파일·category 를 실어 `POST /images/upload`. `useImageUpload` 와 짝을 이룬다.

### 5. `hooks/useImageUpload.js`, `components/artwork/SortableItem.jsx` — 업로드·정렬

- **`useImageUpload`**
  - `browser-image-compression` 으로 용량·해상도를 줄인 뒤 `commonApi.uploadImage` 로 보낸다.
  - 성공 시 응답에서 **`imageUrl`** 을 꺼내 문자열로 반환하고, antd `message` 로 피드백한다.
- **`SortableItem`**
  - `@dnd-kit/sortable` 의 **`useSortable`** 로 각 행 id 에 transform/transition 을 붙인다.
  - **손잡이** 영역에만 `listeners` 를 걸어, 삭제 버튼 클릭과 드래그가 서로 간섭하지 않게 했다.
  - 부모 쪽에서 `DndContext` + `SortableContext` 와 배열 순서를 바꾸는 핸들러를 두면 갤러리 순서 UI 가 완성된다(운영 `ArtworkPost` 흐름과 동일한 조각).

### 6. `types/artwork.js`, `README.md` — 필드 모양·폴더 규칙

- **`types/artwork.js`**
  - 런타임 클래스가 아니라 **JSDoc `@typedef`** 만으로 “서버가 주고받는 필드 이름·모양”을 문서화한다. TypeScript 를 쓰지 않을 때도 IDE 가 보강해 줄 수 있다.
  - 목록 아이템(`ArtworkListResponse`), 생성 payload(`ArtworkCreate`), 상세(`ArtworkDetailResponse`) 등 **어느 API 응답과 대응하는지** 이름으로 구분한다. Swagger 스키마와 같이 펼쳐 보면 이해가 빨라진다.
- **`README.md`**
  - 이 폴더의 **역할**: `api` / `hooks` / `pages` 분리, `.jsx` vs `.js` 규칙, 데모 URL, 환경 변수 `VITE_API_BASE_URL`, 단독 빌드가 아닌 **참고·복사용**이라는 점을 적어 둔다. 트리를 처음 열었을 때 **맵**으로 읽으면 좋다.

## 본문 아래: 전체 소스 보기

화면 **맨 아래**에 폴더 트리가 있고, 항목을 고르면 **그 파일 원문**이 한 패널에 표시된다.

**데모**: [`/dev/react-test/artworks`](/dev/react-test/artworks)
