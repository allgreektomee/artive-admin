import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import * as profileApi from "../api/profile";

export const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null); // 로딩 시작 시 에러 초기화
    try {
      const res = await profileApi.getMyProfile();
      setProfile(res.data.data || res.data);
    } catch (e: any) {
      console.error(e);
      // 403 에러인 경우 권한 문제 메시지, 나머지는 일반 에러
      const status = e.response?.status;
      setError(status === 403 ? "FORBIDDEN" : "FAILED");
      message.error("프로필 정보를 가져오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdate = async (values: any) => {
    setLoading(true);
    try {
      await profileApi.updateProfile(values);
      message.success("프로필이 성공적으로 변경되었습니다.");
      loadProfile(); 
    } catch (e) {
      message.error("저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProfile(); }, [loadProfile]);

  return { profile, loading, error, loadProfile, handleUpdate };
};