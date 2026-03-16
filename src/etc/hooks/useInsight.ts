import { useState, useCallback } from "react";
import { message } from "antd";
import { insightApi } from "../api/insightApi";
import type { InsightEntry } from "../../01.domain/models/BaseEntry";

export const useInsight = () => {
  const [insight, setInsight] = useState<InsightEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // 목록 조회
  const fetchInsights = useCallback(async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await insightApi.getInsightList(page);
      if (res.success) {
        setInsight(res.data.content);
        setTotalElements(res.data.totalElements);
        setCurrentPage(res.data.number + 1);
      }
    } catch (err) {
      message.error("인사이트 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 삭제
  const deleteInsight = async (id: number | string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await insightApi.deleteInsight(id);
      message.success("삭제되었습니다.");
      fetchInsights(currentPage - 1); // 현재 페이지 리로드
    } catch (err) {
      message.error("삭제 실패");
    }
  };

  return {
    insight,
    loading,
    totalElements,
    currentPage,
    fetchInsights,
    deleteInsight,
  };
};
