export type ReactTestProjectChapterRef = { path: string; note: string };

/** React 문서 slug → 연계 파일(저장소 기준 상대 경로) + 장별 한 줄 설명 */
export const REACT_DOC_SLUG_TO_TEST_PROJECT: Record<string, ReactTestProjectChapterRef[]> = {
  "01-what-is-react": [
    { path: "App.jsx", note: "1장: 앱 진입 — BrowserRouter·Routes 최소 연결." },
  ],
  "02-jsx-and-components": [
    { path: "pages/ArtworkListPage.jsx", note: "2장: JSX로 목록·테이블 UI." },
    { path: "components/artwork/SortableItem.jsx", note: "2장: 재사용 가능한 작은 컴포넌트(.jsx)." },
  ],
  "03-props": [
    { path: "components/artwork/SortableItem.jsx", note: "3장: 부모가 넘기는 props(artwork, DnD 속성 등)." },
  ],
  "04-react-events": [
    { path: "pages/ArtworkListPage.jsx", note: "4장: 목록에서 버튼·링크 onClick." },
    { path: "pages/ArtworkDetailPage.jsx", note: "4장: 상세 화면 입력·뒤로 가기 등 이벤트." },
  ],
  "05-state-usestate": [
    { path: "pages/ArtworkListPage.jsx", note: "5장: 목록·로딩 등 로컬 state." },
    { path: "pages/ArtworkDetailPage.jsx", note: "5장: 필드 값·UI state." },
  ],
  "06-component-modularization": [
    { path: "App.jsx", note: "6장: 라우트만 모은 진입." },
    { path: "api/client.js", note: "6장: API 클라이언트 모듈." },
    { path: "hooks/useArtwork.js", note: "6장: 데이터 로직을 훅으로 분리." },
    { path: "pages/ArtworkListPage.jsx", note: "6장: 화면은 페이지 컴포넌트에만." },
  ],
  "07-lifecycle-useeffect": [
    { path: "hooks/useArtwork.js", note: "7장: fetch·의존 배열과 effect." },
    { path: "pages/ArtworkDetailPage.jsx", note: "7장: id 변경에 따른 상세 갱신." },
  ],
  "08-hooks-overview": [
    { path: "hooks/useArtwork.js", note: "8장: 목록·상세용 커스텀 훅." },
    { path: "hooks/useImageUpload.js", note: "8장: 업로드 전용 훅." },
  ],
  "09-react-router": [
    { path: "App.jsx", note: "9장: BrowserRouter·Route·목록/상세 path." },
  ],
  "10-api-modules": [
    { path: "api/client.js", note: "10장: axios 인스턴스." },
    { path: "api/commonApi.js", note: "10장: 이미지 업로드 요청." },
    { path: "api/artworkApi.js", note: "10장: 작품 CRUD 함수." },
  ],
  "11-auth-flow": [
    { path: "api/client.js", note: "11장: Bearer·401 처리 등 인증 헤더 패턴." },
  ],
  "12-forms-crud": [
    { path: "pages/ArtworkDetailPage.jsx", note: "12장: 폼 필드·수정 흐름(등록/삭제는 안내용 alert)." },
  ],
  "13-redux-toolkit": [
    { path: "types/artwork.js", note: "13장: 도메인 모델 모양(JS). RTK 전역 예제는 본 저장소 etc 참고." },
    { path: "hooks/useArtwork.js", note: "13장: 여기서는 훅+로컬/요청 상태로 묶은 실무 타협 예." },
  ],
  "14-image-upload-sort": [
    { path: "hooks/useImageUpload.js", note: "14장: 압축·FormData 업로드." },
    { path: "components/artwork/SortableItem.jsx", note: "14장: @dnd-kit 정렬 행." },
  ],
  "15-websocket-realtime": [],
};

export function listReactTestProjectRefsForDocSlug(slug: string): ReactTestProjectChapterRef[] {
  return REACT_DOC_SLUG_TO_TEST_PROJECT[slug] ?? [];
}

/** React 홈 「소스 보기」 안내 — 경로별 어떤 장과 같이 보면 좋은지 */
export const REACT_TEST_PROJECT_SOURCE_GUIDE: { path: string; hint: string }[] = [
  { path: "App.jsx", hint: "1·2·6·9장 — 진입, JSX·모듈 구성, 라우트" },
  { path: "api/", hint: "10·11장 — axios, Bearer·401" },
  { path: "hooks/useArtwork.js", hint: "6·7·8·13장 — 커스텀 훅, effect, 상태" },
  { path: "hooks/useImageUpload.js", hint: "8·14장 — 이미지 업로드" },
  { path: "components/artwork/SortableItem.jsx", hint: "2·3·14장 — 컴포넌트, props, 정렬 UI" },
  { path: "pages/", hint: "2·4·5·12장 — 화면, 이벤트, state, 폼" },
  { path: "types/artwork.js", hint: "13장 — 도메인 필드 모양" },
  { path: "README.md", hint: "폴더 전체·확장자 규칙" },
];
