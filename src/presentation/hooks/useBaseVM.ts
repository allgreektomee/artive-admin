import { useState, useEffect } from "react";
import { BaseEntry } from "../../domain/models/BaseEntry";
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
