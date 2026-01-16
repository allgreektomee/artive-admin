import client from "./client";

// 로그인한 내 상세 정보 가져오기 (Role 확인용)
export const getMyInfo = () => client.get("/api/v1/users/me");

// 로그인 요청
export const login = (data: any) => client.post("/api/v1/auth/login", data);