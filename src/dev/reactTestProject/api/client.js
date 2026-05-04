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
