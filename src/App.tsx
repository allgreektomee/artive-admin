import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Layouts
import AdminLayout from "./common/components/layout/AdminLayout";
import PublicLayout from "./common/pages/PublicLayout";

// =========================================
// 1. 핵심 매거진 & 에필로그 (Root & Profile)
// =========================================
import MagazineHome from "./common/pages/MagazineHome"; // 하드코딩 홈 유지
import ProfilePage from "./common/pages/ProfileTest"; // 에필로그

// =========================================
// 2. [NEW] ART 도메인 (워드프레스 연동 및 실전 전시)
// =========================================
import ArtLayout from "./art/ArtLayout"; // /art 레이아웃
import ArtHome from "./art/pages/ArtHome"; // /art 메인
import MagazineDetail from "./art/pages/MagazineDetail"; // /art/magazine/:slug (동적 SEO)
import PostDetail from "./art/pages/PostDetail";
import Artworks from "./art/pages/ArtworkList";

// =========================================
// 3. Common 도메인 (레거시/참조용)
// =========================================
import About from "./common/pages/About";
import GalleryPage from "./common/pages/GalleryPage";
import ReportPage from "./common/pages/ReportPage";
import CriticPage from "./common/pages/CriticPage";
import WorkDetail from "./common/pages/WorkDetail";

// =========================================
// 4. Admin 영역
// =========================================
import AdminDashboard from "./common/pages/AdminDashboard";
import UserManagement from "./common/pages/UserManagement";
import ArtworkList from "./common/pages/ArtworkList";
import ArtworkPost from "./common/pages/ArtworkPost";
import HistoryList from "./common/pages/HistoryList";
import HistoryPost from "./common/pages/HistoryPost";
import ProfileSetting from "./common/pages/ProfileSetting";
import LoginPage from "./common/pages/LoginPage";

// Standalone
import NotFound from "./common/pages/NotFound";
import TestPage from "./common/pages/TestProjectPage";

declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        iosBridge: {
          postMessage: (message: Record<string, any>) => void;
        };
      };
    };
    onNativeCallback: (response: Record<string, any>) => void;
  }
}

const App: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/admin/login";
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* =========================================
              PUBLIC 영역 (Magazine & Art)
             ========================================= */}
          <Route path="/" element={<PublicLayout />}>
            {/* [기존] 하드코딩된 루트 홈 */}
            <Route index element={<MagazineHome />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          {/* [NEW] ART 도메인 - 워드프레스 데이터 기반 */}
          {/* [변경] 매거진 전용 레이아웃 또는 독립 페이지 */}
          <Route path="/art" element={<ArtLayout />}>
            {/* 매거진 전용 헤더가 있는 껍데기 */}
            <Route index element={<ArtHome />} />
            <Route path="magazine/:slug" element={<MagazineDetail />} />
            {/* /art/post/banner/1 로 접속됨 */}
            <Route path="post/:type/:id" element={<PostDetail />} />
            {/* Artworks */}
            <Route path="works" element={<Artworks />} />
          </Route>

          {/* [참조] Common 도메인 */}
          <Route path="common">
            <Route path="work/:artworkId" element={<WorkDetail />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="critic" element={<CriticPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="office" element={<About />} />
          </Route>

          {/* =========================================
              STANDALONE & TEST
             ========================================= */}
          <Route path="/testpage" element={<TestPage />} />

          {/* =========================================
              ADMIN 영역
             ========================================= */}
          <Route path="/admin">
            <Route path="login" element={<LoginPage />} />
            <Route element={<AdminLayout onLogout={handleLogout} />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="profile" element={<ProfileSetting />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="artworks" element={<ArtworkList />} />
              <Route path="artworks/post" element={<ArtworkPost />} />
              <Route path="artworks/edit/:id" element={<ArtworkPost />} />
              <Route
                path="artworks/:artworkId/history"
                element={<HistoryList />}
              />
              <Route
                path="artworks/:artworkId/history/post"
                element={<HistoryPost />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
