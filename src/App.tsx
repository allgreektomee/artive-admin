import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import AdminLayout from './components/layout/AdminLayout';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import HistoryList from './pages/HistoryList';
import ProfileSetting from './pages/ProfileSetting';
// import UserManagement from './pages/UserManagement'; // 파일이 있다면 import

// Public Pages (Magazine)
import MagazineHome from './pages/MagazineHome';
import WorkDetail from './pages/WorkDetail';
import About from './pages/About';
import Login from './pages/Login'; // 로그인 페이지가 있다고 가정

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
            1. 사용자 매거진 영역 (Public)
            - 별도의 로그인 없이 접근 가능
            - 잡지처럼 깔끔한 UI 제공
           ========================================= */}
        <Route path="/" element={<Outlet />}>
          <Route index element={<MagazineHome />} />
          <Route path="work/:artworkId" element={<WorkDetail />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* =========================================
            2. 관리자 영역 (Admin)
            - /admin 프리픽스 사용
            - AdminLayout이 로그인 여부를 체크하여 리다이렉트 처리
           ========================================= */}
        <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
          {/* /admin 접속 시 대시보드로 이동 */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="settings" element={<ProfileSetting />} />
          
          {/* 작품 히스토리 관리 */}
          <Route path="history/:artworkId" element={<HistoryList />} />
          
          {/* 유저 관리 (파일이 있다면 연결) */}
          {/* <Route path="users" element={<UserManagement />} /> */}
        </Route>

        {/* 404 처리: 없는 페이지는 메인으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;