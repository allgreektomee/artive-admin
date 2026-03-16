import type { ApiResponse } from "../types/common";
import client from "./client";

export interface Category {
  id: number;
  type: "INSIGHT" | "LOG";
  name: string;
  code: string;
  displayOrder: number;
}

export const categoryApi = {
  // 타입별 목록 조회
  getByType: async (type: "INSIGHT" | "LOG") => {
    const res = await client.get<ApiResponse<Category[]>>("/admin/categories", {
      params: { type },
    });
    return res.data;
  },

  // 생성
  create: async (data: Partial<Category>) => {
    const res = await client.post<ApiResponse<Category>>(
      "/admin/categories",
      data,
    );
    return res.data;
  },

  // 삭제
  delete: async (id: number) => {
    const res = await client.delete<ApiResponse<void>>(
      `/admin/categories/${id}`,
    );
    return res.data;
  },
};
