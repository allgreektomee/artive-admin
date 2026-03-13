import { useState, useEffect } from "react";
import type { BaseEntry } from "../../01.domain/models/BaseEntry";
import { baseRepo } from "../../00.core/di/ServiceLocator"; // ServiceLocator에서 인스턴스 가져오기

/**
 * [PRESENTATION LAYER] ViewModel (Custom Hook)
 *      비즈니스 로직을 담당합니다.
 */
export const useBaseVM = (categoryId: number) => {
  const [data, setData] = useState<BaseEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 선택한 카테고리(Artwork=3, Insight=4 등)의 데이터를 가져옵니다.
        const entries = await baseRepo.getEntriesByCategory(categoryId);
        setData(entries);
      } catch (e) {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]); // categoryId가 바뀌면 데이터를 다시 불러옵니다.

  return { data, loading, error };
};
