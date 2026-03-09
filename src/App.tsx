import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// Layouts
import AdminLayout from "./common/components/layout/AdminLayout";
import PublicLayout from "./common/pages/PublicLayout";

// =========================================
// 1. 핵심 매거진 & 에필로그 (Root & Profile)
// =========================================
import MagazineHome from "./common/pages/MagazineHome"; // 하드코딩 유지
import ProfilePage from "./common/pages/ProfileTest"; // 에필로그(Profile)

// =========================================
// 2. Common 도메인 (기능 및 정보 페이지)
// =========================================
import About from "./common/pages/About";
import GalleryPage from "./common/pages/GalleryPage";
import ReportPage from "./common/pages/ReportPage";
import CriticPage from "./common/pages/CriticPage";
import WorkDetail from "./common/pages/WorkDetail";

// =========================================
// 3. Admin 영역
// =========================================
import AdminDashboard from "./common/pages/AdminDashboard";
import UserManagement from "./common/pages/UserManagement";
import ArtworkList from "./common/pages/ArtworkList";
import ArtworkPost from "./common/pages/ArtworkPost";
import HistoryList from "./common/pages/HistoryList";
import HistoryPost from "./common/pages/HistoryPost";
import ProfileSetting from "./common/pages/ProfileSetting";

// Standalone
import LoginPage from "./common/pages/LoginPage";
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
    window.location.href = "/login";
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* =========================================
            PUBLIC 영역 (사용자 페이지)
           ========================================= */}
          <Route element={<PublicLayout />}>
            {/* 하드코딩된 메인 홈 */}
            <Route index element={<MagazineHome />} />

            {/* 에필로그 (작가 프로필) */}
            <Route path="profile" element={<ProfilePage />} />

            {/* Common 도메인 - 하위 경로 정리 */}
            <Route path="common">
              <Route path="work/:artworkId" element={<WorkDetail />} />
              <Route path="report" element={<ReportPage />} />
              <Route path="critic" element={<CriticPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="office" element={<About />} />
            </Route>
          </Route>

          {/* =========================================
            STANDALONE 영역
           ========================================= */}

          <Route path="/testpage" element={<TestPage />} />

          {/* =========================================
            ADMIN 영역 (관리자 페이지)
           ========================================= */}
          <Route
            path="/admin"
            element={<AdminLayout onLogout={handleLogout} />}
          >
            {/* 로그인 페이지를 /admin/login으로 배치 */}
            <Route path="login" element={<LoginPage />} />
            {/* 관리자 레이아웃 적용 구간 */}
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

          {/* 404 처리 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
