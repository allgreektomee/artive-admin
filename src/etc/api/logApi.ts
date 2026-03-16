import type { ApiResponse, PageResponse } from "../types/common";
import type { LogEntry } from "../../01.domain/models/BaseEntry";
import client from "./client";

export const logApi = {
  // 목록 조회: GET /api/v1/articles?type=LOG
  getLogList: async (
    page: number = 0,
    size: number = 10,
    categoryId?: number,
  ) => {
    const res = await client.get<ApiResponse<PageResponse<LogEntry>>>(
      "/articles",
      {
        params: {
          type: "LOG",
          page,
          size,
          ...(categoryId && { categoryId }),
        },
      },
    );
    return res.data;
  },

  getLogDetail: async (id: number | string) => {
    const res = await client.get<ApiResponse<LogEntry>>(`/articles/${id}`);
    return res.data;
  },

  createLog: async (data: Partial<LogEntry>) => {
    const res = await client.post<ApiResponse<number>>("/articles", data, {
      params: { type: "LOG" },
    });
    return res.data;
  },

  updateLog: async (id: number | string, data: Partial<LogEntry>) => {
    const res = await client.put<ApiResponse<number>>(`/articles/${id}`, data);
    return res.data;
  },

  deleteLog: async (id: number | string) => {
    const res = await client.delete<ApiResponse<void>>(`/articles/${id}`);
    return res.data;
  },
};
