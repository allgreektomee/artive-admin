import client from "./client";

/**
 * 유저 목록 조회 API
 */
export const getUsers = () => client.get("/admin/users");

/**
 * 유저 권한 수정 API
 */
export const updateUserRole = (userId: number, role: string) => 
  client.patch(`/admin/users/${userId}/role`, { role });


/**
 * 1단계: API 레이어 (통신 전담)
파일 위치: src/api/user.ts

컴포넌트에서 직접 axios나 client를 호출하지 않습니다. 
나중에 백엔드 주소가 /admin/users에서 /v2/users로 바뀌면, 
이 파일 하나만 수정하면 모든 컴포넌트에 적용됩니다.

핵심 개념: "서버랑 대화하는 법은 나만 알고 있을게. 너희는 함수만 호출해.
 * 
 */