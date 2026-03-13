/**
 * [PRESENTATION LAYER] ViewModel (Custom Hook)
 * 역할: View(React Component)에 필요한 데이터와 상태(Loading, Error)를 관리합니다.
 * 특징: UI 로직과 데이터 요청 로직을 분리하여 View가 '어떻게 보여줄지'에만 집중하게 만듭니다.
 */

import { useState, useEffect } from "react";
import type { BaseEntry } from "../../domain/models/BaseEntry";
import { baseRepo } from "../../core/di/ServiceLocator";

export const useBaseVM = (category?: string) => {
  const [data, setData] = useState<BaseEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await baseRepo.fetchAll(category);
        setData(result);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [category]);

  return { data, loading, error };
};
