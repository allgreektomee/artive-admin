import { useState, useEffect, useCallback } from "react";
import * as authApi from "../api/auth";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const res = await authApi.getMyInfo();
      // 백엔드 응답 구조에 맞춰 data 추출
      const userData = res.data.data || res.data;
      setUser(userData);
    } catch (e) {
      console.error("Auth Error:", e);
      setError(true); // 에러 상태만 기록
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return { user, loading, error, isAdmin: user?.role === "ADMIN", refreshUser };
};