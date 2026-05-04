/**
 * 16장 · HTTP 공용 클라이언트
 *
 * - baseURL: `VITE_API_BASE_URL` 또는 기본 운영 API.
 * - 요청: accessToken 있으면 Bearer(로그인 없이도 공개 조회는 백엔드 정책에 따름).
 * - 응답: 401 시 로그인 페이지로 보냄(샘플과 운영 공용 interceptor).
 */
import axios from "axios";
import { message } from "antd";

const SHOW_API_LOG =
  typeof import.meta !== "undefined" && import.meta.env?.DEV === true;

const baseURL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "https://api.artivefor.me/api/v1";

const client = axios.create({
  baseURL,
  withCredentials: true,
});

// 16장: 모든 API 모듈이 이 client 를 공유 — 헤더·로그·FormData 처리 일원화
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (SHOW_API_LOG) {
      console.log(
        `%c[REQ] ${config.method?.toUpperCase()} ${config.url}`,
        "color: #2196F3; font-weight: bold;",
        config.data || "No Body",
      );
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 16장: 공통 에러 피드백 — 403 메시지, 401 시 토큰 제거 후 /admin/login
client.interceptors.response.use(
  (response) => {
    if (SHOW_API_LOG) {
      console.log(
        `%c[RES] ${response.status} ${response.config.url}`,
        "color: #4CAF50; font-weight: bold;",
        response.data,
      );
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, config, data } = error.response;
      if (SHOW_API_LOG) {
        console.error(
          `%c[ERR] ${status} ${config.url}`,
          "color: #F44336; font-weight: bold;",
          data,
        );
      }
      if (status === 403) {
        message.error("해당 메뉴에 대한 권한이 없습니다.");
        return Promise.reject(error);
      }
      if (status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

export default client;
