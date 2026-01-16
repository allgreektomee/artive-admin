import client from "./client";

/**
 * User 관련 API 통합 관리
 * 1단계: API 레이어 (통신 전담)
 */
export const userApi = {
  // [Auth & Profile] 일반 유저 관련
  login: (data: any) => client.post("/auth/login", data),
  
  getMyProfile: () => client.get("/users/profile"),
  
  updateMyProfile: (data: any) => client.put("/users/profile", data),

  // [Admin] 관리자 전용 (기존에 작성하신 코드)
  getUsers: () => client.get("/admin/users"),
  
  updateUserRole: (userId: number, role: string) => 
    client.patch(`/admin/users/${userId}/role`, { role }),
};