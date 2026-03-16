import type { ApiResponse, PageResponse } from "../types/common";
import type { LogEntry } from "../../01.domain/models/BaseEntry";
import client from "./client";

export const logApi = {
  // 목록 조회
  getLogs: async (page: number = 0, size: number = 10) => {
    const res = await client.get<ApiResponse<PageResponse<LogEntry>>>(
      "/admin/log",
      { params: { page, size } },
    );
    return res.data;
  },

  // 단건 조회
  getLog: async (id: number | string) => {
    const res = await client.get<ApiResponse<LogEntry>>(`/admin/log/${id}`);
    return res.data;
  },

  // 생성
  createLog: async (data: Partial<LogEntry>) => {
    const res = await client.post<ApiResponse<number>>("/admin/log", data);
    return res.data;
  },

  // 수정
  updateLog: async (id: number | string, data: Partial<LogEntry>) => {
    const res = await client.put<ApiResponse<number>>(`/admin/log/${id}`, data);
    return res.data;
  },

  // 삭제
  deleteLog: async (id: number | string) => {
    const res = await client.delete<ApiResponse<void>>(`/admin/log/${id}`);
    return res.data;
  },
};
