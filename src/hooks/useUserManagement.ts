
import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import * as userApi from "../api/user";

export const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // 데이터 불러오기 로직 (useCallback으로 최적화)
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await userApi.getUsers();
      const data = res.data.data || res.data || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(true);
      message.error("유저 목록 로드 실패");
    } finally {
      setLoading(false);
    }
  }, []);

  // 권한 변경 로직
  const updateRole = async (userId: number, role: string) => {
    try {
      await userApi.updateUserRole(userId, role);
      message.success("권한 변경 완료");
      fetchUsers(); // 성공 후 다시 불러오기
    } catch (e) {
      message.error("변경 실패");
    }
  };

  // 훅이 시작될 때 실행
  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // 컴포넌트에서 사용할 것들만 내보내기
  return { users, loading, error, fetchUsers, updateRole };
};

/**
 * 
 * 여기서는 **"데이터를 어떻게 가공할지"**와 **"상태(loading, error)"**만 관리합니다.
 * HTML이나 CSS(Ant Design) 코드는 절대 들어가지 않습니다.
 * 
 * 핵심 개념: "데이터를 가져오고, 에러를 처리하고, 
 * 기다리는(loading) 로직은 내가 다 할게. 넌 화면만 그려."
 * 
 */