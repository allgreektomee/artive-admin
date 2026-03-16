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
    // 1. 서버가 기대하는 단수형(INSIGHT, LOG)을 소문자로 변환
    // 굳이 뒤에 's'를 붙이지 않고 서버가 받는 변수명(resource)과 타입을 일치시킵니다.
    const resource = type.toLowerCase(); // "insight" 또는 "log"

    // 2. 최종 주소: /api/v1/admin/insight/categories
    const res = await client.get<ApiResponse<Category[]>>(
      `/admin/${resource}/categories`,
    );

    return res.data;
  },

  // 생성

  create: async (type: "INSIGHT" | "LOG", data: Partial<Category>) => {
    const resource = type.toLowerCase();
    const res = await client.post<ApiResponse<Category>>(
      `/admin/${resource}/categories`,
      data,
    );
    return res.data;
  },
  // 삭제
  delete: async (id: number, type: "INSIGHT" | "LOG") => {
    const resource = type.toLowerCase();
    const res = await client.delete<ApiResponse<void>>(
      `/admin/${resource}/categories/${id}`,
    );
    return res.data;
  },
};
