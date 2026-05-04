# reactTestProject (JavaScript, 아트워크 위주)

`src/etc`와 비슷한 **폴더 역할**(`api`, `hooks`, `components/artwork`, `pages`)을 두고, **작품(아트워크) CRUD·이미지 업로드·DnD 정렬**에 쓰는 코드만 JavaScript로 옮긴 참고 트리입니다.

**연재 16장**에서 이 트리 전체를 분석한다. 주요 파일 상단·구간에 `16장` 맥락의 주석을 달아 두었다.

## 포함 범위와 확장자

### 확장자 규칙 (배포 vs 연재)

- **`.jsx`**: 타입 문법 없는 **자바스크립트 + JSX**. Vite가 JSX를 변환하므로 **배포·빌드에 적합**. 연재·복사용으로 보여 줄 때도 “JavaScript 예제”로 보면 된다.  
  **주의**: UI가 있는 파일에 JSX를 쓸 때는 **`.js`가 아니라 `.jsx`** 로 둔다. (`.js` 안의 JSX는 rolldown 등 환경에서 파싱 오류가 날 수 있음.)
- **`.js`**: 로직·API·훅처럼 **JSX가 없는** 순수 자바스크립트.
- **`App.jsx`**: 루트에 두는 **최소 라우팅** 예시. 저장소 실제 진입은 `src/App.tsx`의 `/dev/react-test/artworks` 두 줄과 같다.
- **`App.tsx`에서만** 이 페이지들을 import할 때 타입이 필요하면 `src/vite-env.d.ts`에 모듈 선언을 둔다. 연재·복사용으로 볼 때는 **`.jsx` / `.js`만** 보면 된다.

| 경로 | 설명 |
|------|------|
| `App.jsx` | `BrowserRouter` + 목록·상세 두 Route만 (연재·단독 구동 참고) |
| `api/client.js` | axios 인스턴스, Bearer, 401 처리 |
| `api/commonApi.js` | `/images/upload` (썸네일·갤러리 업로드) |
| `api/artworkApi.js` | `/artworks` CRUD |
| `hooks/useArtwork.js` | 목록·상세·저장·삭제 (등 타입스크립트 훅 JS 포트) |
| `hooks/useImageUpload.js` | 압축 + 업로드 |
| `components/artwork/SortableItem.jsx` | `@dnd-kit` 정렬 행 |
| `pages/ArtworkListPage.jsx` | 작품 목록 — **소스는 JS** |
| `pages/ArtworkDetailPage.jsx` | 작품 상세 — **소스는 JS** |

## 의존성

본 모노레포(artive-admin) 기준: `axios`, `antd`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `browser-image-compression`.

## 환경 변수

- API 베이스: `VITE_API_BASE_URL` (미설정 시 `https://api.artivefor.me/api/v1`)
- REST 명세 확인: [Swagger UI](https://api.artivefor.me/swagger-ui/index.html)

이 디렉터리는 **단독 빌드 대상이 아니라** 복사·참조·연재용으로 두었습니다.

## 앱에서 열기 (목록·상세)

`VITE_API_BASE_URL`(미설정 시 위 기본값)으로 목록·상세 요청이 나간다. `localStorage`의 `accessToken`이 있으면 `api/client.js` 인터셉터가 Authorization 헤더에 붙인다(토큰 없이도 공개 조회가 허용되면 같은 데모 경로로 확인 가능).

- 목록: [`/dev/react-test/artworks`](/dev/react-test/artworks)
- 상세: `/dev/react-test/artworks/:id`

**수정·삭제·새 작품 등록** 버튼은 실제 API/라우트를 호출하지 않고 `window.alert` 만 띄웁니다. (실제 코드는 주석으로 남김)
