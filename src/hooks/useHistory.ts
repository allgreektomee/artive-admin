import { useState } from "react";
import { message } from "antd";
import { historyApi } from "../api/historyApi"; // API 연동 필요
import type { HistoryFormValues, HistoryCreateRequest } from "../types/history";

export const useHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const createHistory = async (artworkId: number, values: HistoryFormValues, imageUrl: string) => {
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

  return { loading, createHistory, error };
};