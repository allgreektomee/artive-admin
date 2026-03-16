import axios from "axios";
import { message } from "antd";

// 🚀 로그 노출 여부 설정 (배포 시 false로 바꾸거나 env 사용)
const SHOW_API_LOG = true;

const client = axios.create({
  baseURL: "https://api.artivefor.me/api/v1",
  withCredentials: true,
});

// 1. 요청 인터셉터 (Request)
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // 📝 요청 로그 출력
    if (SHOW_API_LOG) {
      console.log(
        `%c🚀 [REQ] ${config.method?.toUpperCase()} ${config.url}`,
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

// 2. 응답 인터셉터 (Response)
client.interceptors.response.use(
  (response) => {
    // 📝 응답 성공 로그 출력
    if (SHOW_API_LOG) {
      console.log(
        `%c✅ [RES] ${response.status} ${response.config.url}`,
        "color: #4CAF50; font-weight: bold;",
        response.data,
      );
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, config, data } = error.response;

      // 📝 응답 에러 로그 출력
      if (SHOW_API_LOG) {
        console.error(
          `%c❌ [ERR] ${status} ${config.url}`,
          "color: #F44336; font-weight: bold;",
          data,
        );
      }

      // 403(권한없음)은 로그아웃 시키지 말고 경고만 띄우는 게 안전합니다.
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
