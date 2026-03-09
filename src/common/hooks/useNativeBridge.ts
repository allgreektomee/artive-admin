import { useEffect, useCallback } from "react";

// 성공(resolve)과 실패(reject) 함수를 쌍으로 저장
const pendingRequests = new Map<
  string,
  {
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }
>();

export const useNativeBridge = () => {
  useEffect(() => {
    (window as any).onNativeCallback = (response: any) => {
      const { id, status } = response;

      if (pendingRequests.has(id)) {
        const { resolve, reject } = pendingRequests.get(id)!;

        // 🚀 상태에 따라 다른 문으로 내보냅니다.
        if (status === "SUCCESS") {
          resolve(response);
        } else {
          reject(response); // status가 FAIL이거나 CANCEL이면 에러로 취급
        }
        // self.bridgeResponse = [
        //           "action": action,
        //           "id": id,
        //           "status": status,
        //           "data": data,
        //           "message": message ?? ""
        //       ]
        pendingRequests.delete(id);
      }
    };
    return () => {
      (window as any).onNativeCallback = null;
    };
  }, []);

  const sendToNative = useCallback((action: string, params: any = {}) => {
    return new Promise((resolve, reject) => {
      // 🚀 resolve와 reject 둘 다 생성!
      const id = Date.now().toString();
      pendingRequests.set(id, { resolve, reject });

      const payload = {
        header: { id, platform: "iOS" },
        action,
        params,
      };

      window.webkit?.messageHandlers?.iosBridge?.postMessage(payload);
    });
  }, []);

  return { sendToNative };
};
