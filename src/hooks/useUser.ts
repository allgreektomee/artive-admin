import { useState } from "react";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const useUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // userData 대신 user로 명칭 통일

  // 관리자 여부 계산 (Role이 ADMIN인지 확인)
  const isAdmin = user?.role === "ADMIN" || user?.role === "ROLE_ADMIN";

  const fetchMyProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userApi.getMyProfile();
      // 백엔드 응답 구조에 따라 res.data 또는 res.data.data
      const data = res.data.data || res.data;
      setUser(data);
    } catch (err: any) {
      console.error("프로필 로딩 실패:", err);
      setError(
        err.response?.data?.message || "사용자 정보를 불러오는데 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: any) => {
    setLoading(true);
    try {
      const res = await userApi.login(loginData);
      // 백엔드 응답 구조: res.data.data.accessToken
      const accessToken = res.data.data.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        return true; // 성공 시 true 반환
      }
      return false;
    } catch (err) {
      console.error("로그인 실패:", err);
      throw err; // 에러를 던져서 컴포넌트에서 처리하게 함
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const updateProfile = async (values: any) => {
    setLoading(true);
    try {
      // userApi.updateMyProfile(values)가 있다고 가정
      await userApi.updateMyProfile(values);
      message.success("프로필이 수정되었습니다.");
      await fetchMyProfile(); // 수정 후 최신 데이터로 갱신
      return true;
    } catch (err) {
      console.error("프로필 수정 실패:", err);
      message.error("수정 중 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAdmin,
    loading,
    error,
    fetchMyProfile,
    logout,
    login,
    updateProfile,
  };
};
