import { useState } from 'react';
import { userApi } from '../api/userApi';
import { message } from 'antd';

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtworks: 0,
    pendingTranslations: 0,
    reports: 0,
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 실제로는 Promise.all을 사용하여 병렬로 호출하는 것이 효율적입니다.
      const userRes = await userApi.getUsers();
      const allUsers = userRes.data.data || userRes.data;
      
      setRecentUsers(allUsers.slice(0, 5));
      
      // 통계 가공 (나중에 통계 전용 API가 생기면 여기만 수정하면 됩니다)
      setStats({
        totalUsers: allUsers.length,
        totalArtworks: 85, 
        pendingTranslations: 12, 
        reports: 2,
      });
    } catch (error) {
      console.error("대시보드 데이터 로드 실패:", error);
      message.error("시스템 정보를 가져오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { stats, recentUsers, loading, fetchDashboardData };
};