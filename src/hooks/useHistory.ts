import { useState } from "react";
import { message } from "antd";
import { historyApi } from "../api/historyApi"; // API 연동 필요
import type {
  HistoryFormValues,
  HistoryCreateRequest,
  HistoryDetailResponse,
} from "../types/history";

export const useHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [histories, setHistories] = useState<HistoryDetailResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArtworkHistories = async (artworkid: number, page: number = 0) => {
    setLoading(true);
    setError(false);
    try {
      const res = await historyApi.getArtworkHistories(artworkid, "KO", page);
      if (res.data.success) {
        const { content, totalElements, number } = res.data.data;
        setHistories(content);

        setTotal(totalElements || 0); // 페이징용 전체 개수
        setCurrentPage(number + 1);
      }
    } catch (err) {
      message.error("목록을 불러오지 못했습니다.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const createHistory = async (
    artworkId: number,
    values: HistoryFormValues,
    imageUrl: string,
  ) => {
    const payload: HistoryCreateRequest = {
      ...values,
      artworkId,
      imageUrl,
      visibility: values.isPublic ? "PUBLIC" : "PRIVATE",
    };

    setLoading(true);
    setError(false);
    try {
      const res = await historyApi.createHistory(artworkId, payload);
      if (res.data.success) {
        message.success("기록이 추가되었습니다.");
        return true;
      }
    } catch (err) {
      message.error("기록 추가 중 오류가 발생했습니다.");
      setError(true);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const deleteHistory = async (id: number) => {
    setLoading(true);
    setError(false);
    try {
      const res = await historyApi.deleteHistory(id);
      if (res.data.success) {
        message.success("삭제되었습니다.");
        await fetchArtworkHistories(currentPage - 1);
      }
    } catch (err) {
      message.error("삭제 실패");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createHistory,
    error,
    deleteHistory,
    fetchArtworkHistories,
    histories,
    currentPage,
    total,
  };
};
