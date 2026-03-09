import { useState } from "react";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import type {  UserProfile, UpdateProfileRequest,LoginRequest } from "../types/user"; // 타입 전용

export const useUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null) // userData 대신 user로 명칭 통일



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

  const login = async (loginData: LoginRequest): Promise<boolean> => {
  setLoading(true);
  try {
    // 🚀 userApi.login의 리턴 타입은 ApiResponse<LoginResponse>여야 합니다.
    const res = await userApi.login(loginData);
    
    // ApiResponse 구조에 따라 res.data.data에서 추출
    const { accessToken, user: userInfo } = res.data.data;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      
      // 전역 상태(user) 업데이트 (선택 사항)
      setUser(userInfo as UserProfile);
      
      return true; 
    }
    return false;
  } catch (err) {
    console.error("로그인 실패:", err);
    throw err; 
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const updateProfile = async (values: UpdateProfileRequest) => {
    setLoading(true);
    try {
      // userApi.updateMyProfile(values)가 있다고 가정
      await userApi.updateMyProfile(values);
      message.success("프로필이 수정되었습니다.");
      setUser(prev => prev ? { ...prev, ...values } : null);

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
    loading,
    error,
    fetchMyProfile,
    logout,
    login,
    updateProfile,
    isAdmin: user?.role === 'ADMIN',
  };
};
