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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("accessToken"));

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
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          /* AdminLayout으로 한 번만 감싸야 합니다 */
          <Route element={<AdminLayout onLogout={handleLogout} />}>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<ProfileSetting />} />
            <Route path="/admin/artworks" element={<ArtworkList />} />
            <Route path="/admin/artworks/post" element={<ArtworkPost />} />
            <Route path="/admin/artworks/edit/:id" element={<ArtworkPost />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;