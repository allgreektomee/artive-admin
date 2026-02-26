import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Spin } from "antd";

// Hooks
import { useUser } from "./hooks/useUser";

// Layouts (신규 생성)
import AdminLayout from "./pages/AdminLayout";
import PublicLayout from "./pages/PublicLayout";

// Admin Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ArtworkList from "./pages/ArtworkList";
import ArtworkPost from "./pages/ArtworkPost";
import HistoryList from "./pages/HistoryList";
import HistoryPost from "./pages/HistoryPost";
import ProfileSetting from "./pages/ProfileSetting";

// Public Pages (신규 생성)
import MagazineHome from "./pages/MagazineHome";
import WorkDetail from "./pages/WorkDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

/**
 * 관리자 전용 라우트를 보호하는 컴포넌트입니다.
 * useUser 훅을 사용하여 인증 상태를 확인하고,
 * 로그인되어 있지 않으면 로그인 페이지로 리디렉션합니다.
 */
const AdminRoute: React.FC = () => {
  // useUser 훅이 초기 사용자 정보를 가져오는 동안 loading 상태를 관리한다고 가정합니다.
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading && !user) {
    return <Spin fullscreen tip="인증 정보를 확인 중입니다..." />;
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================================================================
         * 1. 사용자용 공개 라우트 (Public Routes)
         * ================================================================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<MagazineHome />} />
          <Route path="/work/:artworkId" element={<WorkDetail />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* =================================================================
         * 2. 관리자 전용 라우트 (Admin Routes)
         * ================================================================= */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* /admin 경로 하위의 모든 라우트는 AdminRoute에 의해 보호됩니다. */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/profile" element={<ProfileSetting />} />

            {/* 작품 관리 */}
            <Route path="/admin/artworks" element={<ArtworkList />} />
            <Route path="/admin/artworks/post" element={<ArtworkPost />} />
            <Route path="/admin/artworks/edit/:id" element={<ArtworkPost />} />

            {/* 히스토리 관리 */}
            <Route
              path="/admin/artworks/:artworkId/history"
              element={<HistoryList />}
            />
            <Route
              path="/admin/artworks/:artworkId/history/post"
              element={<HistoryPost />}
            />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;