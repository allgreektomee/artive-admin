import type { ApiResponse, PageResponse } from "../types/common";
import type { InsightEntry } from "../../01.domain/models/BaseEntry";
import client from "./client";

export const insightApi = {
  // 목록 조회 (카테고리 필터 추가): GET /api/v1/articles?type=INSIGHT&page=0&categoryId=1
  getInsights: async (
    page: number = 0,
    size: number = 10,
    categoryId?: number,
  ) => {
    const res = await client.get<ApiResponse<PageResponse<InsightEntry>>>(
      "/articles",
      {
        params: {
          type: "INSIGHT",
          page,
          size,
          ...(categoryId && { categoryId }), // ID가 있을 때만 파람에 포함
        },
      },
    );
    return res.data;
  },

  getInsight: async (id: number | string) => {
    const res = await client.get<ApiResponse<InsightEntry>>(`/articles/${id}`);
    return res.data;
  },

  createInsight: async (data: Partial<InsightEntry>) => {
    const res = await client.post<ApiResponse<number>>("/articles", data, {
      params: { type: "INSIGHT" },
    });
    return res.data;
  },

  updateInsight: async (id: number | string, data: Partial<InsightEntry>) => {
    const res = await client.put<ApiResponse<number>>(`/articles/${id}`, data);
    return res.data;
  },

  deleteInsight: async (id: number | string) => {
    const res = await client.delete<ApiResponse<void>>(`/articles/${id}`);
    return res.data;
  },
};
