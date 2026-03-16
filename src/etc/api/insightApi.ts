import type { ApiResponse, PageResponse } from "../types/common";
import type { InsightEntry } from "../../01.domain/models/BaseEntry";
import client from "./client";

export const insightApi = {
  // 목록 조회
  getInsights: async (page: number = 0, size: number = 10) => {
    const res = await client.get<ApiResponse<PageResponse<InsightEntry>>>(
      "/admin/insight",
      { params: { page, size } },
    );
    return res.data;
  },

  // 단건 조회
  getInsight: async (id: number | string) => {
    const res = await client.get<ApiResponse<InsightEntry>>(
      `/admin/insight/${id}`,
    );
    return res.data;
  },

  // 생성
  createInsight: async (data: Partial<InsightEntry>) => {
    const res = await client.post<ApiResponse<number>>("/admin/insight", data);
    return res.data;
  },

  // 수정
  updateInsight: async (id: number | string, data: Partial<InsightEntry>) => {
    const res = await client.put<ApiResponse<number>>(
      `/admin/insight/${id}`,
      data,
    );
    return res.data;
  },

  // 삭제
  deleteInsight: async (id: number | string) => {
    const res = await client.delete<ApiResponse<void>>(`/admin/insights/${id}`);
    return res.data;
  },
};
