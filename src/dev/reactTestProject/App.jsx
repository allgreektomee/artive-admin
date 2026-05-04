import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ArtworkDetailPage from "./pages/ArtworkDetailPage";
import ArtworkListPage from "./pages/ArtworkListPage";

/**
 * 연재·복사용 참고 앱 껍데기.
 * monorepo에서는 `src/App.tsx`에 동일 경로가 붙어 있고, 여기 파일은
 * 이 폴더만 따로 떼어 쓸 때의 최소 라우팅 예시다.
 *
 * 합류 시: HelmetProvider·AdminLayout 등은 생략하고 아래 두 Route만 보면 된다.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dev/react-test/artworks" element={<ArtworkListPage />} />
        <Route path="/dev/react-test/artworks/:id" element={<ArtworkDetailPage />} />
        <Route
          path="*"
          element={<Navigate to="/dev/react-test/artworks" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
