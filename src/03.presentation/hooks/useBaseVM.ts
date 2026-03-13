import { useState, useEffect } from "react";
import type { BaseEntry } from "../../01.domain/models/BaseEntry";
import { baseRepo } from "../../core/di/ServiceLocator"; // ServiceLocator에서 인스턴스 가져오기

/**
 * [PRESENTATION LAYER] ViewModel (Custom Hook)
 * 역할: View(ArtHomeNew)에 필요한 데이터와 상태(로딩, 에러 등)를 관리하고 제공합니다.
 *      비즈니스 로직을 담당합니다.
 */
export const useBaseVM = () => {
  const [data, setData] = useState<BaseEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const entries = await baseRepo.getAllEntries(); // Repository를 통해 데이터 요청
        setData(entries);
      } catch (e) {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
