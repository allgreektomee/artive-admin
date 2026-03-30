import { useState, useCallback} from "react";
import { indexPageApi } from "../api/indexPageApi";
import { message } from "antd";

export const useIndexPage = () => {
  const [loading, setLoading] = useState(false);
 const [data, setData] = useState<any>(null);

  // 1. 아카이브 등록
  const createIndexPage = async (values: any, onSuccess?: () => void) => {
    setLoading(true);
    try {
      await indexPageApi.saveIndexPage(values);
      message.success("아카이브가 성공적으로 등록되었습니다.");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Save Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. 특정 이슈 조회 (수정 시 사용 가능)
  const fetchByIssueNo = async (issueNo: string) => {
    setLoading(true);
    try {
      return await indexPageApi.getIndexPageByIssueNo(issueNo);
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 목록 가져오기 (useCallback으로 최적화)
  const fetchIndexPages = useCallback(async (page: number, size: number) => {
    setLoading(true);
    try {
      const result = await indexPageApi.getAllIndexPages(page, size);
      setData(result);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);



  return { createIndexPage, fetchByIssueNo, loading, fetchIndexPages, data };
};