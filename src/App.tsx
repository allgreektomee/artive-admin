import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Layouts
import AdminLayout from "./etc/components/layout/AdminLayout";
import PublicLayout from "./etc/pages/PublicLayout";

// =========================================
// 1. 핵심 매거진 & 에필로그 (Root & Profile)
// =========================================
import MagazineHome from "./etc/pages/MagazineHome"; // 하드코딩 홈 유지
import ProfilePage from "./etc/pages/ProfileTest"; // 에필로그
import EssayListPage from "./etc/pages/EssayListPage";
import EssayViewerPage from "./etc/pages/EssayViewerPage";

// =========================================
// 2. [NEW] ART 도메인 (워드프레스 연동 및 실전 전시)
// =========================================
import ArtLayout from "./art/ArtLayout"; // /art 레이아웃
import ArtHome from "./art/pages/ArtHome"; // /art 메인
import MagazineDetail from "./art/pages/MagazineDetail"; // /art/magazine/:slug (동적 SEO)
import PostDetail from "./art/pages/PostDetail";
import Artworks from "./art/pages/ArtworkList";
// import HistoryDetailPage from "./presentation/pages/HistoryDetailPage";

// =========================================
// 3. Common 도메인 (레거시/참조용)
// =========================================
import About from "./etc/pages/About";
import GalleryPage from "./etc/pages/GalleryPage";
import ReportPage from "./etc/pages/ReportPage";
import CriticPage from "./etc/pages/CriticPage";
import WorkDetail from "./etc/pages/WorkDetail";

// =========================================
// 4. Admin 영역
// =========================================
import AdminDashboard from "./etc/pages/AdminDashboard";
import UserManagement from "./etc/pages/UserManagement";
import ArtworkList from "./etc/pages/ArtworkList";
import ArtworkPost from "./etc/pages/ArtworkPost";
import HistoryList from "./etc/pages/HistoryList";
import HistoryPost from "./etc/pages/HistoryPost";
import ProfileSetting from "./etc/pages/ProfileSetting";
import CategoryManagement from "./etc/pages/CategoryManagement";
import InsightList from "./etc/pages/InsightList";
import InsightPost from "./etc/pages/InsightPost";
import LogList from "./etc/pages/LogList";
import LogPost from "./etc/pages/LogPost";
import LoginPage from "./etc/pages/LoginPage";
import IndexPageList from "./etc/pages/IndexPageList";
import AdminChatPage from "./etc/pages/AdminChatPage";

// Standalone
import NotFound from "./etc/pages/NotFound";
import TestPage from "./etc/pages/TestProjectPage";

//test
import ArtHomeNew from "./03.presentation/pages/ArtHomeNew";

import SewHaJungArchive from "./name/SewHaJungArchive";

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
            <Route path="essay" element={<EssayListPage />} />
            <Route path="essay/:slug" element={<EssayViewerPage />} />
          </Route>

          {/* 🚀 [TEST] 신규 아키텍처 테스트 경로 추가 */}
          <Route path="/test-art" element={<ArtHomeNew />} />
          <Route path="/sewhajung" element={<SewHaJungArchive />} />


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
            {/* 🚀 신규 아키텍처 기반 히스토리 상세 페이지
            // <Route path="history/:historyId" element={<HistoryDetailPage />} /> */}
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
              <Route path="chat" element={<AdminChatPage />} />
              <Route path="profile" element={<ProfileSetting />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="artworks" element={<ArtworkList />} />
              <Route path="artworks/post" element={<ArtworkPost />} />
              <Route path="artworks/edit/:id" element={<ArtworkPost />} />

                {/* Insight index */}
              <Route path="indexpage" element={<IndexPageList />} />

              {/* Insight Routes */}
              <Route path="insight" element={<InsightList />} />
              <Route path="insight/post" element={<InsightPost />} />
              <Route path="insight/:id" element={<InsightPost />} />

              {/* Log Routes */}
              <Route path="log" element={<LogList />} />
              <Route path="log/post" element={<LogPost />} />
              <Route path="log/:id" element={<LogPost />} />

              {/* Category Management */}
              <Route path="categories" element={<CategoryManagement />} />

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
