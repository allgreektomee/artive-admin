import { useState } from 'react';
import { userApi } from '../api/userApi';
import { message } from 'antd';

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  // 전체 유저 목록 가져오기
  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userApi.getUsers();
      const data = res.data?.data || res.data || [];
      setAllUsers(data);
    } catch (err: any) {
      setError("유저 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 유저 권한 변경 (ADMIN <-> USER)
  const updateRole = async (userId: number, newRole: string) => {
    try {
      // userApi.updateUserRole(userId, newRole)이 있다고 가정
      await userApi.updateUserRole(userId, newRole);
      message.success(`권한이 ${newRole}(으)로 변경되었습니다.`);
      await fetchAllUsers(); // 목록 새로고침
    } catch (err) {
      message.error("권한 변경에 실패했습니다.");
    }
  };

  return { allUsers, loading, error, fetchAllUsers, updateRole };
};