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
    // 1. 서버 로직에 맞춰 INSIGHT -> insights, LOG -> logs로 변환
    const resource = type === "INSIGHT" ? "insights" : "logs";

    // 2. 주소 구조 변경: /admin/categories?type=... (X) -> /admin/insights/categories (O)
    // 서버 컨트롤러가 @RequestMapping("/api/v1/admin") 이고
    // 메서드가 @GetMapping("/{resource}/categories") 라고 가정할 때:
    const res = await client.get<ApiResponse<Category[]>>(
      `/admin/${resource}/categories`,
    );

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
