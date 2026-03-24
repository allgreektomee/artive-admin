import client from "./client";

export const indexPageApi = {
  // 1. 아카이브 등록 (POST)
  saveIndexPage: async (data: any) => {
    const response = await client.post("/index", data);
    return response.data;
  },


 // 전체 목록 페이징 조회
  getAllIndexPages: async (page: number = 0, size: number = 10) => {
    // 백엔드 Pageable 규격에 맞춰 호출
    const response = await client.get(`/index?page=${page}&size=${size}&sort=id,desc`);
    return response.data;
  },

  // 3. 특정 IssueNo로 상세 조회 (GET)
  getIndexPageByIssueNo: async (issueNo: string) => {
    const response = await client.get(`/index/issue/${issueNo}`);
    return response.data;
  },
};