import { useState, useCallback } from "react";
import { message } from "antd";
import { logApi } from "../api/logApi";
import type { LogEntry } from "../../01.domain/models/BaseEntry";

export const useLog = () => {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = useCallback(async (page: number = 0) => {
    setLoading(true);
    try {
      const res = await logApi.getLogList(page);
      if (res.success) {
        setLog(res.data.content);
        setTotalElements(res.data.totalElements);
        setCurrentPage(res.data.number + 1);
      }
    } catch (err) {
      message.error("로그 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLog = async (id: number | string) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await logApi.deleteLog(id);
      message.success("삭제되었습니다.");
      fetchLogs(currentPage - 1);
    } catch (err) {
      message.error("삭제 실패");
    }
  };

  return {
    log,
    loading,
    totalElements,
    currentPage,
    fetchLogs,
    deleteLog,
  };
};
