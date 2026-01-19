export type UserRole = "USER" | "ADMIN";

/**
 * UI에서 표시할 한글 이름 매핑 (Spring의 description과 일치)
 */
export const RoleLabels: Record<UserRole, string> = {
  ADMIN: "관리자",
  USER: "일반 사용자",
};

/**
 * 유저 프로필 DTO
 */
export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  role: UserRole; // 🚀 Spring의 Role Enum 값 ('ADMIN' | 'USER')
  bio?: string; // 자기소개
  profileImageUrl?: string;
  createdAt: string; // ISO Date String
}

/**
 * 프로필 수정 요청 DTO
 */
export interface UpdateProfileRequest {
  nickname: string;
  bio: string;
}

// 로그인 요청 시 (ID/PW)
export interface LoginRequest {
  email: string;
  password?: string; // 소셜 로그인 병합 시 선택사항이 될 수 있음
}

// 로그인 성공 시 서버에서 내려주는 데이터
export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    role: "ADMIN" | "USER";
  };
}

//전체목록
export interface AllUserResponse {
  id: number;
  email: string;
  slug: string; // 유저 고유 슬러그
  role: UserRole; // 'ADMIN' | 'USER'
  createdAt: string; // LocalDateTime은 JSON 변환 시 ISO 문자열로 옵니다.
}


export interface UpdateUserRoleRequest {
  role: UserRole; // 'ADMIN' | 'USER' (string 대신 정의한 타입 사용)
}


export interface AdminUserDetail {
  userInfo: AllUserResponse; // 에 정의된 유저 정보
  artworkTitles: string[];   // 유저가 보유한 작품 제목 리스트
}