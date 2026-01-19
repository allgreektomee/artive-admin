import { useState } from "react";
import { userApi } from "../api/userApi";
import { message } from "antd";

import type {  UserRole  } from "../types/user"; 

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  // 🚀 대시보드용 상태 추가
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtworks: 0,
    pendingTranslations: 0,
    reports: 0,
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  // 🚀 대시보드 데이터 가져오기 함수 추가
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 실제 API가 구현 전이라면 더미 데이터로 테스트하세요.
      // const res = await userApi.getAdminStats();
      setStats({
        totalUsers: 120,
        totalArtworks: 45,
        pendingTranslations: 12,
        reports: 2,
      });
      // 임시 데이터
      setRecentUsers([
        {
          id: 1,
          nickname: "테스트",
          email: "test@test.com",
          role: "USER",
          createdAt: "2026-01-16",
        },
      ]);
    } catch (err) {
      setError("대시보드 데이터를 가져오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const res = await userApi.getUsers();
      setAllUsers(res.data?.data || []);
    } catch (err) {
      setError("유저 목록 로드 실패");
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: number, newRole: string) => {
    try {
      await userApi.updateUserRole(userId, {role: newRole as UserRole});
      message.success("권한 변경 성공");
      await fetchAllUsers();
    } catch (err) {
      message.error("변경 실패");
    }
  };

  // 🚀 AdminDashboard에서 쓰이는 모든 변수를 return에 포함시켜야 에러가 사라집니다!
  return {
    allUsers,
    loading,
    error,
    stats, // 추가됨
    recentUsers, // 추가됨
    fetchAllUsers,
    fetchDashboardData, // 추가됨
    updateRole,
  };
};
