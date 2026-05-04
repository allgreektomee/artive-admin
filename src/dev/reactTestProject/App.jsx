import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import ArtworkListPage from "./pages/ArtworkListPage";

/**
 * 연재 16장(reactTestProject 샘플) 진입점 — 라우팅만 담당.
 *
 * - monorepo 실서비스: `src/App.tsx`에 동일 path 가 붙음.
 * - 이 폴더만 복사해 쓸 때: 이 `App.jsx`가 루트 컴포넌트.
 * - HelmetProvider·AdminLayout 등은 생략(샘플 범위 밖).
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 16장: 목록 — ArtworkListPage + useArtwork 로 첫 fetch */}
        <Route path="/dev/react-test/artworks" element={<ArtworkListPage />} />
        {/* 16장: 상세 — URL의 :id 로 GET 상세 (페이지 내 직접 artworkApi 호출) */}
        <Route path="/dev/react-test/artworks/:id" element={<ArtworkDetailPage />} />
        <Route
          path="*"
          element={<Navigate to="/dev/react-test/artworks" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
