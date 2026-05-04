import { listReactTestProjectSourceFiles } from "./reactTestProjectSources";

export type ReactTestProjectChapterRef = { path: string; note: string };

/** 16장 본문과 매칭 — `listReactTestProjectRefsForDocSlug`는 이 슬러그에서만 목록을 반환한다. */
export const REACT_TEST_PROJECT_WALKTHROUGH_SLUG = "16-sample-app-walkthrough";

export const REACT_TEST_PROJECT_WALKTHROUGH_HREF = `/dev?tab=react&rd=${encodeURIComponent(REACT_TEST_PROJECT_WALKTHROUGH_SLUG)}`;

/** 경로별 한 줄 역할 (없으면 기본 문구) */
const PATH_HINTS: Record<string, string> = {
  "App.jsx": "앱 진입 — BrowserRouter·Routes·목록/상세 경로",
  "README.md": "폴더 규칙·의존성·데모 URL",
  "api/client.js": "axios 인스턴스 — Bearer, 401 처리",
  "api/commonApi.js": "이미지 업로드 API",
  "api/artworkApi.js": "작품 CRUD API 함수",
  "hooks/useArtwork.js": "목록·상세 fetch·mutation — useEffect·state",
  "hooks/useImageUpload.js": "압축 후 FormData 업로드",
  "types/artwork.js": "도메인 필드 모양(JSDoc)",
  "components/artwork/SortableItem.jsx": "@dnd-kit 정렬 행 — props",
  "pages/ArtworkListPage.jsx": "목록 화면 — 라우팅·이벤트",
  "pages/ArtworkDetailPage.jsx": "상세·폼 — state·저장(일부 alert)",
};

export function listReactTestProjectRefsForDocSlug(slug: string): ReactTestProjectChapterRef[] {
  if (slug !== REACT_TEST_PROJECT_WALKTHROUGH_SLUG) return [];
  const files = listReactTestProjectSourceFiles();
  return files.map((f) => ({
    path: f.relativePath,
    note: PATH_HINTS[f.relativePath] ?? "샘플 앱 구성 파일",
  }));
}
