import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import PublicLayout from './pages/PublicLayout';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import ArtworkList from './pages/ArtworkList';
import ArtworkPost from './pages/ArtworkPost';
import HistoryList from './pages/HistoryList';
import HistoryPost from './pages/HistoryPost';
import ProfileSetting from './pages/ProfileSetting';

// Public Pages (Magazine)
import MagazineHome from './pages/MagazineHome';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';

// Standalone Pages
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  // 로그아웃 핸들러 (AdminLayout에 전달)
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
            1. 사용자 매거진 영역 (Public) - 로그인 불필요
            - PublicLayout이 공통 UI(헤더, 푸터)를 제공합니다.
           ========================================= */}
        <Route element={<PublicLayout />}>
          <Route index element={<MagazineHome />} />
          <Route path="work/:artworkId" element={<WorkDetail />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* =========================================
            2. 스탠드얼론 페이지 (레이아웃 없음)
           ========================================= */}
        <Route path="/login" element={<LoginPage />} />

        {/* =========================================
            3. 관리자 영역 (Admin) - 로그인 필요
            - /admin 경로로 접근 시 AdminLayout이 인증을 확인합니다.
           ========================================= */}
        <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
          {/* /admin 접속 시 대시보드로 이동 */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<ProfileSetting />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="artworks" element={<ArtworkList />} />
          <Route path="artworks/post" element={<ArtworkPost />} />
          <Route path="artworks/edit/:id" element={<ArtworkPost />} />
          <Route path="artworks/:artworkId/history" element={<HistoryList />} />
          <Route path="artworks/:artworkId/history/post" element={<HistoryPost />} />
        </Route>

        {/* 404 처리: 일치하는 경로가 없으면 NotFound 페이지 표시 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;