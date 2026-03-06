import { useEffect, useCallback } from "react";

interface NativeResponse {
  action: string;
  status: "SUCCESS" | "FAIL" | "CANCEL";
  id: string;
  data?: any;
  message?: string;
}

export const useNativeBridge = (
  onResponse?: (response: NativeResponse) => void,
) => {
  useEffect(() => {
    // 🚀 네이티브가 호출할 창구 단일화
    (window as any).onNativeCallback = (response: any) => {
      if (onResponse) onResponse(response);
    };
    return () => {
      (window as any).onNativeCallback = null;
    };
  }, [onResponse]);

  const sendToNative = useCallback((action: string, params: any = {}) => {
    const payload = {
      action: action, // 🚀 1층 (관리자님 스타일)
      header: {
        id: Date.now().toString(), // 🚀 헤더 안 (관리자님 스타일)
        platform: "iOS",
      },
      params: params,
    };

    window.webkit?.messageHandlers?.iosBridge?.postMessage(payload);
  }, []);

  return { sendToNative };
};
