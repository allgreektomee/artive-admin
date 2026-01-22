// src/App.tsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ArtworkList from "./pages/ArtworkList";
import ArtworkPost from "./pages/ArtworkPost";
import LoginPage from "./pages/LoginPage";
import UserManagement from "./pages/UserManagement";
import ProfileSetting from "./pages/ProfileSetting";
import HistoryPost from "./pages/HistoryPost";

function App() {
  // 1. 초기값 설정 (localStorage에 토큰이 있으면 true, 없으면 false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("accessToken");
  });

  const handleLoginSuccess = () => setIsLoggedIn(true);
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            {/* 로그인 안 된 경우 */}
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            {/* 로그인 안 된 상태에서 다른 주소 접근 시 로그인으로 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          /* 로그인 된 경우 */
          <Route element={<AdminLayout onLogout={handleLogout} />}>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<ProfileSetting />} />
            <Route path="/admin/artworks" element={<ArtworkList />} />
            <Route path="/admin/artworks/post" element={<ArtworkPost />} />
            <Route path="/admin/artworks/edit/:id" element={<ArtworkPost />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/artworks/:artworkId/history/post/" element={<HistoryPost />} />
            {/* 잘못된 경로는 대시보드로 */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;