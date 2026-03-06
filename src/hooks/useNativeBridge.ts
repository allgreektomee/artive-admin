import { useEffect, useCallback } from "react";

// 네이티브에서 올 데이터 규격 정의
interface NativeResponse {
  action: string;
  status: "SUCCESS" | "FAIL" | "CANCEL";
  data?: any;
}

export const useNativeBridge = (
  onResponse?: (response: NativeResponse) => void,
) => {
  // 1. 웹 -> 네이티브 (명령 전달)
  const sendToNative = useCallback((action: string, params: any = {}) => {
    // 네이티브가 알아먹을 수 있는 통합 규격
    const payload = {
      action: action,
      params: params,
    };

    if (window.webkit?.messageHandlers?.iosBridge) {
      // iOS 전송
      window.webkit.messageHandlers.iosBridge.postMessage(payload);
    } else if ((window as any).androidBridge) {
      // 안드로이드 전송 (나중에 확장 대비)
      (window as any).androidBridge.postMessage(JSON.stringify(payload));
    } else {
      console.warn(`[NativeBridge] ${action} 호출 시도 (현재 브라우저 환경)`);
    }
  }, []);

  // useNativeBridge.ts 내부 수신부 개선
  useEffect(() => {
    const handleNativeEvent = (event: any) => {
      const response = event.detail; // 위에서 정의한 표준 JSON 구조

      // 1. 공통 에러 처리 (로그 남기기 등)
      if (response.body.status === "ERROR") {
        console.error(
          `[Native Error] ${response.header.action}: ${response.body.message}`,
        );
      }
      
      // 2. 개별 컴포넌트로 데이터 전달
      onResponse?.(response);
    };

    window.addEventListener("fromNative", handleNativeEvent);
    return () => window.removeEventListener("fromNative", handleNativeEvent);
  }, [onResponse]);

  return { sendToNative };
};
