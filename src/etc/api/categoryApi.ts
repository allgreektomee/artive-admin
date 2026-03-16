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
  // 타입별 목록 조회: GET /api/v1/articles/categories?type=INSIGHT
  getByType: async (type: "INSIGHT" | "LOG") => {
    const res = await client.get<ApiResponse<Category[]>>(
      "/articles/categories",
      { params: { type } },
    );
    return res.data;
  },

  // 생성: POST /api/v1/articles/categories?type=INSIGHT
  create: async (type: "INSIGHT" | "LOG", data: Partial<Category>) => {
    const res = await client.post<ApiResponse<Category>>(
      "/articles/categories",
      data,
      { params: { type } },
    );
    return res.data;
  },

  // 삭제: DELETE /api/v1/articles/categories/{id}
  // 삭제는 ID가 고유하므로 type 파람이 없어도 되지만, 서버 구조에 따라 추가 가능합니다.
  delete: async (id: number) => {
    const res = await client.delete<ApiResponse<void>>(
      `/articles/categories/${id}`,
    );
    return res.data;
  },
};
