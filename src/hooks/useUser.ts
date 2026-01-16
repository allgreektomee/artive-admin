import { useState } from 'react';
import { userApi } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

export const useUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // userData 대신 user로 명칭 통일

  // 관리자 여부 계산 (Role이 ADMIN인지 확인)
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN';


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
      setError(err.response?.data?.message || "사용자 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return { user, isAdmin, loading, error, fetchMyProfile, logout };
};