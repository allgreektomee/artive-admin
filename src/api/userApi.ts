import client from "./client";
import type {
  LoginRequest,
  LoginResponse,
  UpdateProfileRequest,
  UserProfile,
  AllUserResponse,
  UpdateUserRoleRequest,
  UserRole,
} from "../types/user";
import type { ApiResponse , PageResponse} from "../types/common";
/**
 * User 관련 API 통합 관리
 * 1단계: API 레이어 (통신 전담)
 */
export const userApi = {
  // [Auth & Profile] 일반 유저 관련
  login: (credentials: LoginRequest) =>
    client.post<ApiResponse<LoginResponse>>("/auth/login", credentials),

  getMyProfile: () => client.get<ApiResponse<UserProfile>>("/users/profile"),

  updateMyProfile: (data: UpdateProfileRequest) =>
    client.put<ApiResponse<UserProfile>>("/users/profile", data),

  // [Admin] 관리자 전용 (기존에 작성하신 코드)
  getUsers: () => client.get<ApiResponse<AllUserResponse[]>>("/admin/users"),

  updateUserRole: (userId: number, role: UserRole) =>
    client.patch<ApiResponse<AllUserResponse>>(`/admin/users/${userId}/role`, { role } as UpdateUserRoleRequest),
};
